import React from "react";
import { flushSync } from "react-dom";
import { createRoot } from "react-dom/client";
import { Text } from "@kui/foundations-react";

const h = React.createElement;

const TAGS = ["p", "h1", "h2", "h3", "h4", "h5", "h6", "span"];
// A valid Kaizen Text kind looks like family/size (+weight), e.g. title/lg,
// body/regular/md, body/bold/xl, label/regular/sm, display/lg, mono/sm.
const KIND_RE = /^(display|title|body|label|mono)\/[a-z0-9/]+$/;

// Style options can be authored in a second cell (or data-style), e.g.
// "title/lg h1" or "body/regular/md, p". Order/commas don't matter.
function parseStyle(styleText) {
  const tokens = (styleText || "")
    .split(/[\s,]+/).map((t) => t.trim().toLowerCase()).filter(Boolean);
  return {
    tag: tokens.find((t) => TAGS.includes(t)) || "p",
    kind: tokens.find((t) => KIND_RE.test(t)) || null,
  };
}

// Authored anywhere as a "Text" block:
//   one cell  → the content (renders as a paragraph, body/regular/md), or
//   two cells → content | style   (style = a Kaizen kind and/or an h1–h6/p tag)
export default function decorate(block) {
  const row = block.firstElementChild;
  const cells = row ? [...row.children] : [];
  const contentEl = cells[0];
  const html = (contentEl?.innerHTML || "").trim();
  const { tag, kind } = parseStyle(cells[1]?.textContent || block.dataset.style);

  block.textContent = "";
  block.classList.add("nv-theme-kui11");

  flushSync(() => {
    createRoot(block).render(
      h(
        Text,
        { asChild: true, kind: kind || "body/regular/md" },
        h(tag, { dangerouslySetInnerHTML: { __html: html } }),
      ),
    );
  });
}
