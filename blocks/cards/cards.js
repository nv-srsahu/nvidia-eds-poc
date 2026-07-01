import React from "react";
import { flushSync } from "react-dom";
import { createRoot } from "react-dom/client";
import { Button, Card, Flex, Grid, Text } from "@kui/foundations-react";

const h = React.createElement;

const BUTTON_COLORS = ["brand", "neutral", "danger"];
const BUTTON_KINDS = ["primary", "secondary", "tertiary"];
const BUTTON_SIZES = ["tiny", "small", "medium", "large"];
const CARD_DENSITIES = ["compact", "standard", "spacious"];
const CARD_KINDS = ["solid", "float", "gradient"];
const CARD_LAYOUTS = ["horizontal", "vertical"];
// Every keyword allowed inside a per-card options line, e.g. "[gradient, selected]".
const CARD_TOKENS = new Set([...CARD_KINDS, ...CARD_LAYOUTS, ...CARD_DENSITIES, "selected"]);

const LIST_RESET = { listStyle: "none", margin: 0, padding: 0 };

const MEDIA_STYLE = { display: "block", position: "relative" };
const IMG_STYLE = { display: "block", height: "auto", objectFit: "cover", width: "100%" };

function dataOption(value, allowed, fallback) {
  return allowed.includes(value) ? value : fallback;
}

function cardDataOption(row, key, allowed, fallback) {
  return dataOption(row.dataset[key] || row.firstElementChild?.dataset[key], allowed, fallback);
}

// A card can carry options like "[gradient, selected]" anywhere in its text
// (own line, trailing spaces, or appended to the body line). Returns the matched
// substring (to strip from the body) and the recognized tokens.
function parseCardOptions(str) {
  const match = (str || "").match(/[[(]\s*([^\])]+?)\s*[\])]/);
  if (!match) return null;
  const tokens = match[1].split(",").map((t) => t.trim().toLowerCase()).filter(Boolean);
  if (tokens.length && tokens.every((t) => CARD_TOKENS.has(t))) {
    return { match: match[0], tokens };
  }
  return null;
}

// Parse author options from the link text, e.g. "Get Support (primary, small)".
function parseButtonOptions(text) {
  const optsMatch = text.match(/\(([^)]*)\)/);
  const opts = optsMatch ? optsMatch[1].split(",").map((o) => o.trim().toLowerCase()) : [];
  return {
    label: text.replace(/\([^)]*\)/, "").trim(),
    kind: opts.find((o) => BUTTON_KINDS.includes(o)),
    color: opts.find((o) => BUTTON_COLORS.includes(o)),
    size: opts.find((o) => BUTTON_SIZES.includes(o)),
  };
}

function buttonKind(link) {
  const authoredKind = dataOption(link.dataset.buttonKind, BUTTON_KINDS);
  if (authoredKind) return authoredKind;
  if (link.classList.contains("secondary")) return "secondary";
  if (link.classList.contains("accent")) return "tertiary";
  return "primary";
}

function buttonColor(link) {
  return dataOption(link.dataset.buttonColor, BUTTON_COLORS, "brand");
}

function buttonSize(link) {
  return dataOption(link.dataset.buttonSize, BUTTON_SIZES, "medium");
}

function text(el) {
  return el?.textContent.trim() || undefined;
}

// Authoring convention (per card, via the Google Docs paragraph-style menu):
//   Image        -> media (Badge overlays it)
//   Heading 5    -> Badge (pill on the image)
//   Heading 6    -> Publisher (eyebrow above the title)
//   Heading 3    -> Title
//   Heading 4    -> Sub-Header
//   Normal text  -> Body
//   Normal text  -> Options line: "[gradient, selected]" (kind/layout/density/selected)
//   Bold link    -> CTA button; options in parens, e.g. "Get Support (primary, small)"
function readCard(row) {
  const icon = row.querySelector("img");
  const link = row.querySelector("a[href]");
  const textParas = [...row.querySelectorAll("p")]
    .filter((p) => !p.querySelector("a[href], img, picture") && p.textContent.trim());
  let opt = [];
  let bodyText;
  textParas.forEach((p) => {
    let t = p.textContent.trim();
    const found = parseCardOptions(t);
    if (found) {
      opt = opt.concat(found.tokens);
      t = t.replace(found.match, "").trim();
    }
    if (!bodyText && t) bodyText = t;
  });
  const btn = link && parseButtonOptions(link.textContent.trim());

  return {
    badge: text(row.querySelector("h5")),
    body: bodyText || undefined,
    density: opt.find((t) => CARD_DENSITIES.includes(t)) || cardDataOption(row, "cardDensity", CARD_DENSITIES),
    icon: icon && { alt: icon.alt || "", src: icon.currentSrc || icon.src },
    kind: opt.find((t) => CARD_KINDS.includes(t)) || cardDataOption(row, "cardKind", CARD_KINDS, "solid"),
    layout: opt.find((t) => CARD_LAYOUTS.includes(t)) || cardDataOption(row, "cardLayout", CARD_LAYOUTS),
    link: link && {
      color: btn.color || buttonColor(link),
      href: link.href,
      kind: btn.kind || buttonKind(link),
      rel: link.rel || undefined,
      size: btn.size || buttonSize(link),
      target: link.target || undefined,
      text: btn.label || link.textContent.trim(),
    },
    publisher: text(row.querySelector("h6")),
    selected: opt.includes("selected")
      || (row.dataset.cardSelected || row.firstElementChild?.dataset.cardSelected) === "true",
    subheader: text(row.querySelector("h4")),
    title: text(row.querySelector("h1, h2, h3")),
  };
}

const line = (kind, tag, value, className) =>
  value && h(Text, { asChild: true, kind }, h(tag, className ? { className } : null, value));

function media(card) {
  const { badge, icon } = card;
  if (!icon) return undefined;
  return h(
    "div",
    { className: "cards-media", style: MEDIA_STYLE },
    h("img", { alt: icon.alt, loading: "lazy", src: icon.src, style: IMG_STYLE }),
    badge && h("span", { className: "cards-badge" }, badge),
  );
}

function CardView(card) {
  const {
    body, density, kind, layout, link, publisher, selected, subheader, title,
  } = card;
  return h(
    Card,
    { density, kind, layout, selected, slotHeader: media(card) },
    h(
      Flex,
      { direction: "col", gap: "3" },
      line("label/regular/sm", "p", publisher, "cards-publisher"),
      line("title/lg", "h3", title),
      line("body/bold/md", "h4", subheader),
      line("body/regular/sm", "p", body),
      link
        && h(
          "div",
          { className: "cards-cta" },
          h(
            Button,
            { asChild: true, color: link.color, kind: link.kind, size: link.size },
            h("a", { href: link.href, rel: link.rel, target: link.target }, link.text),
          ),
        ),
    ),
  );
}

export default function decorate(block) {
  const cards = [...block.children].map(readCard);

  block.classList.add("nv-theme-kui11");
  flushSync(() => {
    createRoot(block).render(
      h(
        Grid,
        { asChild: true, colMinWidth: 280, gap: "6" },
        h(
          "ul",
          { style: LIST_RESET },
          cards.map((card, index) =>
            h("li", { key: index, style: { display: "grid" } }, h(CardView, card))),
        ),
      ),
    );
  });
}
