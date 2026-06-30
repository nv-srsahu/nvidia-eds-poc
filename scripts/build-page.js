#!/usr/bin/env node
/*
 * build-page.js — render an EDS page from a Google Doc (.docx).
 * =============================================================
 *
 * Auto-detects the doc type:
 *
 *  A. ARTICLE (no tables) — a metadata header (Headline / Strapline / Author /
 *     Tags / SEO …) followed by body content. Renders headings, paragraphs,
 *     numbered lists, YouTube embeds, and extracts embedded images to /assets.
 *
 *  B. COMPONENT MODEL (tables) — each component is a 2-column table whose first
 *     row is "Component | <Type>" plus Property | Value rows; a Container owns
 *     the Title/Text/Button components after it and compiles to a Hero block.
 *
 *  C. BLOCK-NAME MODEL (tables) — first cell of the first row is the block name
 *     (Cards, Accordion, Input Shell); remaining rows are content rows.
 *
 * Usage:  node scripts/build-page.js [input.docx] [output.html]
 * Zero runtime dependencies — reads the .docx zip with Node's built-in zlib.
 */

import fs from "fs";
import path from "path";
import zlib from "zlib";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function readZipEntry(buffer, entryName) {
  const EOCD_SIG = 0x06054b50;
  const CEN_SIG = 0x02014b50;
  let eocd = -1;
  for (let i = buffer.length - 22; i >= 0; i -= 1) {
    if (buffer.readUInt32LE(i) === EOCD_SIG) { eocd = i; break; }
  }
  if (eocd < 0) throw new Error("Not a valid .docx (no EOCD found)");
  const cdCount = buffer.readUInt16LE(eocd + 10);
  let p = buffer.readUInt32LE(eocd + 16);
  for (let n = 0; n < cdCount; n += 1) {
    if (buffer.readUInt32LE(p) !== CEN_SIG) break;
    const method = buffer.readUInt16LE(p + 10);
    const compSize = buffer.readUInt32LE(p + 20);
    const nameLen = buffer.readUInt16LE(p + 28);
    const extraLen = buffer.readUInt16LE(p + 30);
    const commentLen = buffer.readUInt16LE(p + 32);
    const localOff = buffer.readUInt32LE(p + 42);
    const name = buffer.toString("utf8", p + 46, p + 46 + nameLen);
    if (name === entryName) {
      const lhNameLen = buffer.readUInt16LE(localOff + 26);
      const lhExtraLen = buffer.readUInt16LE(localOff + 28);
      const dataStart = localOff + 30 + lhNameLen + lhExtraLen;
      const raw = buffer.subarray(dataStart, dataStart + compSize);
      return method === 0 ? raw : zlib.inflateRawSync(raw);
    }
    p += 46 + nameLen + extraLen + commentLen;
  }
  throw new Error("Entry not found in .docx: " + entryName);
}

function unescapeXml(s) {
  return s
    .replace(/&#x([0-9a-fA-F]+);/g, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(parseInt(d, 10)))
    .replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'").replace(/&amp;/g, "&");
}
function escapeHtml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function escapeAttr(s) { return escapeHtml(s).replace(/"/g, "&quot;"); }

const HEADING_TAGS = {
  Title: "h1", Heading1: "h1", Heading2: "h2", Heading3: "h3",
  Heading4: "h4", Heading5: "h5", Heading6: "h6",
};

function parseRels(relsXml) {
  const rels = {};
  const re = /<Relationship\b[^>]*?\bId="(rId\d+)"[^>]*?\bTarget="([^"]+)"/g;
  let m;
  while ((m = re.exec(relsXml))) rels[m[1]] = unescapeXml(m[2]);
  return rels;
}
function runText(runXml) {
  let text = "";
  const re = /<w:t\b[^>]*>([\s\S]*?)<\/w:t>/g;
  let m;
  while ((m = re.exec(runXml))) text += unescapeXml(m[1]);
  return text;
}
function renderInline(pXml, rels) {
  let html = "";
  const re = /<w:hyperlink\b[\s\S]*?<\/w:hyperlink>|<w:r\b[\s\S]*?<\/w:r>/g;
  let m;
  while ((m = re.exec(pXml))) {
    const chunk = m[0];
    if (chunk.startsWith("<w:hyperlink")) {
      const idMatch = chunk.match(/r:id="(rId\d+)"/);
      const href = idMatch ? rels[idMatch[1]] : null;
      const text = escapeHtml(runText(chunk));
      html += href ? '<a href="' + escapeAttr(href) + '">' + text + "</a>" : text;
    } else {
      const text = escapeHtml(runText(chunk));
      if (!text) continue;
      const bold = /<w:b\b[^>]*\/?>/.test((chunk.split("</w:rPr>")[0] || ""));
      html += bold ? "<strong>" + text + "</strong>" : text;
    }
  }
  return html;
}
function renderParagraph(pXml, rels) {
  if (/o:hr="t"/.test(pXml)) return { hr: true };
  const styleMatch = pXml.match(/<w:pStyle w:val="([^"]+)"/);
  const tag = (styleMatch && HEADING_TAGS[styleMatch[1]]) || "p";
  const html = renderInline(pXml, rels);
  return { tag, html, text: unescapeXml(html.replace(/<[^>]+>/g, "")).trim() };
}
function matchAll(xml, re) {
  const out = [];
  let m;
  while ((m = re.exec(xml))) out.push(m[0]);
  return out;
}
function indent(text, spaces) {
  const pad = " ".repeat(spaces);
  return text.split("\n").map((line) => (line ? pad + line : line)).join("\n");
}

// ─── ARTICLE MODE ────────────────────────────────────────────────────────────
const META_SKIP = /^(seo meta tags|aem [^:]*url|jira request|download assets from|launch|approvals)$/;

function buildArticle(documentXml, rels, buffer, assetDirAbs, assetUrlBase, meta) {
  const bodyMatch = documentXml.match(/<w:body>([\s\S]*)<\/w:body>/);
  const body = bodyMatch ? bodyMatch[1] : documentXml;
  const paras = matchAll(body, /<w:p\b[\s\S]*?<\/w:p>/g);

  let phase = 0; // 0 = preamble, 1 = metadata, 2 = body
  const parts = [];
  let listBuf = [];
  const flushList = () => {
    if (listBuf.length) {
      parts.push("<ol>\n" + listBuf.map((li) => "  <li>" + li + "</li>").join("\n") + "\n</ol>");
      listBuf = [];
    }
  };

  paras.forEach((pXml) => {
    const r = renderParagraph(pXml, rels);
    const text = r.text || "";
    const blip = pXml.match(/<a:blip r:embed="(rId\d+)"/);

    if (phase === 0) {
      if (/^headline\s*:/i.test(text)) phase = 1; else return;
    }
    if (phase === 1) {
      const m = text.match(/^([^:]+):\s*([\s\S]*)$/);
      const key = m ? m[1].trim().toLowerCase() : "";
      if (key === "headline") { meta.headline = m[2].trim(); return; }
      if (key === "strapline") { meta.strapline = m[2].trim(); return; }
      if (key === "author") { meta.author = m[2].trim(); return; }
      if (key === "tags") { meta.tags = m[2].trim(); return; }
      if (key === "seo meta title") { meta.title = m[2].trim(); return; }
      if (key === "seo meta description") { meta.description = m[2].trim(); return; }
      if (META_SKIP.test(key)) return;
      phase = 2; // first non-metadata paragraph starts the body
    }

    // body
    if (blip) {
      flushList();
      const target = rels[blip[1]];
      if (target) {
        const fname = target.split("/").pop();
        try {
          const data = readZipEntry(buffer, "word/" + target);
          fs.writeFileSync(path.join(assetDirAbs, fname), data);
          parts.push('<p><img src="' + assetUrlBase + "/" + fname + '" alt="" loading="lazy"></p>');
        } catch { /* skip missing media */ }
      }
      return;
    }
    const yt = text.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/);
    if (yt) {
      flushList();
      parts.push('<p><iframe src="https://www.youtube.com/embed/' + yt[1] +
        '" title="YouTube video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="width:100%;aspect-ratio:16/9;border:0;"></iframe></p>');
      return;
    }
    if (/<w:numPr>/.test(pXml)) { if (r.html) listBuf.push(r.html); return; }
    flushList();
    if (text) parts.push("<" + r.tag + ">" + r.html + "</" + r.tag + ">");
  });
  flushList();

  const byline = [meta.author ? "By " + meta.author : "", meta.tags ? "Tags: " + meta.tags : ""]
    .filter(Boolean).join("  •  ");
  const header = "<div>\n" +
    "  <h1>" + escapeHtml(meta.headline || "Untitled") + "</h1>\n" +
    (meta.strapline ? "  <p>" + escapeHtml(meta.strapline) + "</p>\n" : "") +
    (byline ? "  <p><em>" + escapeHtml(byline) + "</em></p>\n" : "") +
    "</div>";
  return header + "\n\n<div>\n" + parts.join("\n") + "\n</div>";
}

// ─── COMPONENT MODEL ─────────────────────────────────────────────────────────
function parseTable(tblXml, rels) {
  return matchAll(tblXml, /<w:tr\b[\s\S]*?<\/w:tr>/g).map((tr) =>
    matchAll(tr, /<w:tc\b[\s\S]*?<\/w:tc>/g).map((tc) => {
      const paras = matchAll(tc, /<w:p\b[\s\S]*?<\/w:p>/g)
        .map((p) => renderParagraph(p, rels)).filter((r) => !r.hr);
      const html = paras.map((r) => "<" + r.tag + ">" + r.html + "</" + r.tag + ">").join("\n");
      const text = paras.map((r) => r.text).filter(Boolean).join(" ").trim();
      const inline = paras.map((r) => r.html).filter(Boolean).join(" ").trim();
      return { text, html, inline };
    }));
}
function tagFromSeo(value) { const m = (value || "").match(/h[1-6]/i); return m ? m[0].toLowerCase() : "p"; }
function buttonKind(value) {
  const v = (value || "").toLowerCase();
  if (v.includes("secondary")) return "secondary";
  if (v.includes("tertiary")) return "tertiary";
  return "primary";
}
function buttonSize(value) {
  const v = (value || "").toLowerCase();
  if (v.includes("tiny")) return "tiny";
  if (v.includes("small")) return "small";
  if (v.includes("large")) return "large";
  return "medium";
}
function parseComponentTable(rows) {
  const type = (rows[0][1] ? rows[0][1].text : "").toLowerCase().trim();
  const props = {};
  for (let i = 1; i < rows.length; i += 1) {
    const key = (rows[i][0] ? rows[i][0].text : "").toLowerCase().trim();
    const cell = rows[i][1] || rows[i][0];
    if (key) props[key] = cell;
  }
  return { type, props };
}
function pxFromValue(value) { const m = (value || "").match(/(\d{2,4})/); return m ? m[1] : null; }
function hexFromValue(value) { const m = (value || "").match(/#[0-9a-fA-F]{3,8}/); return m ? m[0] : null; }
function compileContainer(group) {
  const styles = (group.props.styles || group.props.theme || {}).text || "";
  const theme = /dark/i.test(styles) ? "dark" : "light";
  let media = null;
  const contentChildren = group.children.filter((c) => {
    if (c.type === "banner" || c.type === "image") {
      const src = (c.props["cut graphics"] || c.props.image || c.props.src || c.props.content || {}).text;
      const alt = (c.props["alt text"] || c.props.alt || {}).text || "";
      if (src) media = { src, alt };
      return false;
    }
    return true;
  });
  if (!media) {
    const src = (group.props["banner image"] || group.props["cut graphics"] || {}).text;
    if (src) media = { src, alt: (group.props["banner alt"] || group.props["alt text"] || {}).text || "" };
  }
  const parts = [];
  if (media) parts.push('<picture><img src="' + escapeAttr(media.src) + '" alt="' + escapeAttr(media.alt) + '" loading="eager"></picture>');
  contentChildren.forEach((child) => {
    if (child.type === "button") {
      const href = (child.props.link || child.props.href || {}).text || "#";
      const label = (child.props.label || child.props.content || {}).inline || "Button";
      const kind = buttonKind((child.props.type || {}).text);
      const size = buttonSize((child.props.size || {}).text);
      parts.push('<p><strong><a href="' + escapeAttr(href) + '" data-button-kind="' + kind + '" data-button-size="' + size + '">' + label + "</a></strong></p>");
    } else {
      const tag = child.type === "text" ? "p" : tagFromSeo((child.props["seo hierarchy"] || {}).text);
      const html = (child.props.content || child.props.text || {}).inline || "";
      parts.push("<" + tag + ">" + html + "</" + tag + ">");
    }
  });
  const heightKey = Object.keys(group.props).find((k) => k.includes("height") || k.includes("desktop"));
  const minH = heightKey ? pxFromValue(group.props[heightKey].text) : null;
  const bgKey = Object.keys(group.props).find((k) => k.includes("bg") || k.includes("background"));
  const bg = bgKey ? hexFromValue(group.props[bgKey].text) : null;
  const styleBits = [];
  if (minH) styleBits.push("min-height:" + minH + "px");
  if (bg) styleBits.push("background-color:" + bg);
  const styleAttr = styleBits.length ? ' style="' + styleBits.join(";") + '"' : "";
  const inner = indent(parts.join("\n"), 6);
  return '  <div class="hero" data-hero-media-theme="' + theme + '"' + styleAttr + ">\n    <div>\n" + inner + "\n    </div>\n  </div>";
}

// ─── BLOCK-NAME MODEL ────────────────────────────────────────────────────────
const INPUT_TYPES = ["text", "email", "search", "tel", "url", "password", "number"];
function blockAttributes(className, options) {
  const classes = [className];
  const data = [];
  if (className === "input-shell") {
    options.forEach((opt) => {
      if (INPUT_TYPES.includes(opt)) data.push('data-input-type="' + opt + '"');
      else if (opt === "dismissible") data.push('data-dismissible="true"');
      else if (opt === "no-dismiss") data.push('data-dismissible="false"');
    });
  } else { options.forEach((opt) => classes.push(opt.replace(/\s+/g, "-"))); }
  return ['class="' + classes.join(" ") + '"', ...data].join(" ");
}
function compileNameBlock(rows) {
  const raw = (rows[0][0] ? rows[0][0].text : "").trim();
  const optMatch = raw.match(/\(([^)]*)\)/);
  const name = raw.replace(/\([^)]*\)/, "").trim();
  const options = optMatch ? optMatch[1].split(",").map((o) => o.trim().toLowerCase()).filter(Boolean) : [];
  const className = name.toLowerCase().replace(/\s+/g, "-");
  const attrs = blockAttributes(className, options);
  const body = rows.slice(1).map((cells) =>
    "    <div>\n" + cells.map((c) => "      <div>\n" + indent(c.html, 8) + "\n      </div>").join("\n") + "\n    </div>").join("\n");
  return "  <div " + attrs + ">\n" + body + "\n  </div>";
}

function buildMain(documentXml, rels) {
  const bodyMatch = documentXml.match(/<w:body>([\s\S]*)<\/w:body>/);
  let body = bodyMatch ? bodyMatch[1] : documentXml;
  body = body.replace(/<w:sectPr\b[\s\S]*?<\/w:sectPr>/g, "");
  const tokenRe = /<w:tbl\b[\s\S]*?<\/w:tbl>|<w:p\b[\s\S]*?<\/w:p>/g;
  const sections = [];
  let current = [];
  let group = null;
  const flushGroup = () => { if (group) { current.push(compileContainer(group)); group = null; } };
  let m;
  while ((m = tokenRe.exec(body))) {
    const token = m[0];
    if (token.startsWith("<w:tbl")) {
      const rows = parseTable(token, rels);
      if (!rows.length) continue;
      const isComponent = (rows[0][0] ? rows[0][0].text : "").toLowerCase().trim() === "component";
      if (isComponent) {
        const comp = parseComponentTable(rows);
        if (comp.type === "container") { flushGroup(); group = { props: comp.props, children: [] }; }
        else if (group) group.children.push(comp);
        else group = { props: {}, children: [comp] };
      } else { flushGroup(); current.push(compileNameBlock(rows)); }
    } else {
      const para = renderParagraph(token, rels);
      if (para.hr) { flushGroup(); sections.push(current); current = []; }
      else if (para.text) { flushGroup(); current.push("  <" + para.tag + ">" + para.html + "</" + para.tag + ">"); }
    }
  }
  flushGroup();
  sections.push(current);
  return sections.filter((p) => p.length).map((p) => "<div>\n" + p.join("\n") + "\n</div>").join("\n\n");
}

function pageHtml(mainHtml, meta) {
  const title = (meta && meta.title) || "NVIDIA — from Google Doc";
  const desc = (meta && meta.description) || "Rendered from a Google Doc via Edge Delivery Services blocks.";
  return '<!DOCTYPE html>\n<html lang="en">\n<head>\n' +
    '  <meta charset="utf-8">\n' +
    '  <meta name="viewport" content="width=device-width, initial-scale=1">\n' +
    '  <meta name="description" content="' + escapeAttr(desc) + '">\n' +
    "  <title>" + escapeHtml(title) + "</title>\n" +
    '  <link rel="icon" href="/icons/icon.svg" type="image/svg+xml">\n' +
    '  <link rel="stylesheet" href="/styles/styles.css">\n' +
    '  <link rel="stylesheet" href="/scripts/kui/foundations-react.bundle.css">\n' +
    '  <script nonce="aem" type="importmap">\n  {\n    "imports": {\n' +
    '      "react": "https://esm.sh/react@19.2.7",\n' +
    '      "react/jsx-runtime": "https://esm.sh/react@19.2.7/jsx-runtime",\n' +
    '      "react-dom": "https://esm.sh/react-dom@19.2.7?external=react",\n' +
    '      "react-dom/client": "https://esm.sh/react-dom@19.2.7/client?external=react",\n' +
    '      "@kui/foundations-react": "/scripts/kui/foundations-react.bundle.js"\n' +
    "    }\n  }\n  </script>\n" +
    '  <script nonce="aem" src="/scripts/scripts.js" type="module"></script>\n' +
    "</head>\n<body>\n  <header></header>\n  <main>\n\n" +
    indent(mainHtml, 4) + "\n\n  </main>\n  <footer></footer>\n</body>\n</html>\n";
}

function slugify(s) { return s.toLowerCase().replace(/\.docx$/i, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""); }

function main() {
  const root = path.resolve(__dirname, "..");
  const input = path.resolve(root, process.argv[2] || "page-source.docx");
  const output = path.resolve(root, process.argv[3] || "doc.html");
  if (!fs.existsSync(input)) { console.error("Input .docx not found: " + input); process.exit(1); }
  const buffer = fs.readFileSync(input);
  const documentXml = readZipEntry(buffer, "word/document.xml").toString("utf8");
  let rels = {};
  try { rels = parseRels(readZipEntry(buffer, "word/_rels/document.xml.rels").toString("utf8")); } catch { /* none */ }

  const meta = {};
  let mainHtml;
  let mode;
  if (/<w:tbl>/.test(documentXml)) {
    mode = "blocks";
    mainHtml = buildMain(documentXml, rels);
  } else {
    mode = "article";
    const slug = slugify(path.basename(input));
    const assetDirAbs = path.join(root, "assets", slug);
    fs.mkdirSync(assetDirAbs, { recursive: true });
    mainHtml = buildArticle(documentXml, rels, buffer, assetDirAbs, "/assets/" + slug, meta);
  }
  fs.writeFileSync(output, pageHtml(mainHtml, meta));
  const blocks = (mainHtml.match(/<div class="/g) || []).length;
  const imgs = (mainHtml.match(/<img /g) || []).length;
  console.log("OK [" + mode + "] " + path.basename(input) + " -> " + path.basename(output) +
    " (" + blocks + " blocks, " + imgs + " images)");
}

main();
