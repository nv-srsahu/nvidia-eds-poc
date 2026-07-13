import React from "react";
import { flushSync } from "react-dom";
import { createRoot } from "react-dom/client";
import { Badge, Card, Flex, Grid } from "@kui/foundations-react";
import { readButtonLink, renderButton } from "../button/button.js";
import { renderText } from "../text/text.js";

const h = React.createElement;
const { useState } = React;

const CARD_DENSITIES = ["compact", "standard", "spacious"];
const CARD_KINDS = ["solid", "float", "gradient"];
const CARD_LAYOUTS = ["horizontal", "vertical"];
const CARD_TOKENS = new Set([...CARD_KINDS, ...CARD_LAYOUTS, ...CARD_DENSITIES, "selected"]);

// Kaizen Badge's own props (used stock).
const BADGE_COLORS = ["green", "red", "yellow", "purple", "teal", "gray", "blue"];
const BADGE_KINDS = ["solid", "outline"];

const LIST_RESET = { listStyle: "none", margin: 0, padding: 0 };

function dataOption(value, allowed, fallback) {
  return allowed.includes(value) ? value : fallback;
}
function cardDataOption(row, key, allowed, fallback) {
  return dataOption(row.dataset[key] || row.firstElementChild?.dataset[key], allowed, fallback);
}
function text(el) {
  return el?.textContent.trim() || undefined;
}

// Per-card options like "[gradient, selected]" (anywhere in the card text).
function parseCardOptions(str) {
  const match = (str || "").match(/[[(]\s*([^\])]+?)\s*[\])]/);
  if (!match) return null;
  const tokens = match[1].split(",").map((t) => t.trim().toLowerCase()).filter(Boolean);
  if (tokens.length && tokens.every((t) => CARD_TOKENS.has(t))) return { match: match[0], tokens };
  return null;
}

function collectText(scope) {
  const paras = [...scope.querySelectorAll("p")]
    .filter((p) => !p.querySelector("a[href], img, picture") && p.textContent.trim());
  let opt = [];
  let body;
  paras.forEach((p) => {
    let t = p.textContent.trim();
    const found = parseCardOptions(t);
    if (found) { opt = opt.concat(found.tokens); t = t.replace(found.match, "").trim(); }
    if (!body && t) body = t;
  });
  return { opt, body };
}

// One tag: "Label" or "Label (color)" or "Label (color, outline)".
// color/kind map straight to the Kaizen Badge props; defaults gray + solid.
function parseTag(raw) {
  const m = raw.match(/\(([^)]*)\)/);
  const opts = m ? m[1].split(/[\s,]+/).map((o) => o.trim().toLowerCase()).filter(Boolean) : [];
  return {
    label: raw.replace(/\([^)]*\)/, "").trim(),
    color: opts.find((o) => BADGE_COLORS.includes(o)) || "gray",
    kind: opts.find((o) => BADGE_KINDS.includes(o)) || "solid",
  };
}

// Split the Heading 5 line on top-level commas (commas inside "(...)" stay put).
function parseTags(str) {
  if (!str) return [];
  return str.split(/,(?![^(]*\))/).map((s) => s.trim()).filter(Boolean).map(parseTag)
    .filter((t) => t.label);
}

// Tags -> stock Kaizen Badge pills (color/kind authored per tag).
const tagList = (tags) =>
  tags.length > 0
  && h("div", { className: "cards-tags" },
    tags.map((tag, i) => h(Badge, { color: tag.color, key: i, kind: tag.kind }, tag.label)));

const line = (kind, tag, value, className) =>
  renderText(value, { className, kind, tag });

// UNIVERSAL card. Every field is optional; author only what you need:
//   Image        -> card image (Kaizen Card media)
//   Heading 5    -> tag(s): comma-separated -> Kaizen Badge pills.
//                   Per tag: "Label (color)" / "Label (color, outline)".
//                   color = green|red|yellow|purple|teal|gray|blue (default gray)
//   Heading 6    -> eyebrow (publisher / date / category)
//   Heading 3    -> title
//   Heading 4    -> sub-header
//   Normal text  -> body
//   Bold link    -> CTA button, options in parens e.g. "Read More (secondary, neutral)"
//   "[...]" line -> card options: kind (solid/float/gradient), layout, density, selected
function readCard(row) {
  const icon = row.querySelector("img");
  const link = row.querySelector("a[href]");
  const tagsEl = row.querySelector("h5");
  const { opt, body } = collectText(row);
  return {
    tags: parseTags(tagsEl?.textContent),
    eyebrow: text(row.querySelector("h6")),
    title: text(row.querySelector("h1, h2, h3")),
    subheader: text(row.querySelector("h4")),
    body,
    image: icon && { alt: icon.alt || "", src: icon.currentSrc || icon.src },
    link: readButtonLink(link),
    density: opt.find((t) => CARD_DENSITIES.includes(t)) || cardDataOption(row, "cardDensity", CARD_DENSITIES),
    kind: opt.find((t) => CARD_KINDS.includes(t)) || cardDataOption(row, "cardKind", CARD_KINDS, "solid"),
    layout: opt.find((t) => CARD_LAYOUTS.includes(t)) || cardDataOption(row, "cardLayout", CARD_LAYOUTS),
    selected: opt.includes("selected")
      || (row.dataset.cardSelected || row.firstElementChild?.dataset.cardSelected) === "true",
  };
}

function CardView(card) {
  const {
    body, density, eyebrow, image, kind, layout, link, onSelect, selected, subheader, tags, title,
  } = card;
  const handleKey = onSelect
    ? (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onSelect(); } }
    : undefined;
  return h(
    Card,
    {
      density,
      kind,
      layout,
      onClick: onSelect,
      onKeyDown: handleKey,
      role: onSelect ? "button" : undefined,
      selected,
      slotHeader: image && h("img", {
        alt: image.alt, className: "cards-img", loading: "lazy", src: image.src,
      }),
      tabIndex: onSelect ? 0 : undefined,
    },
    h(
      Flex,
      { direction: "col", gap: "3" },
      tagList(tags),
      line("label/regular/md", "p", eyebrow, "cards-eyebrow"),
      line("title/lg", "h3", title),
      line("body/bold/md", "h4", subheader),
      line("body/regular/sm", "p", body),
      link && h("div", { className: "cards-cta" },
        renderButton({ ...link, onClick: (e) => e.stopPropagation() })),
    ),
  );
}

function CardsApp({ cards }) {
  const [selected, setSelected] = useState(cards.findIndex((c) => c.selected));
  return h(Grid, { asChild: true, colMinWidth: 280, gap: "6" },
    h("ul", { style: LIST_RESET },
      cards.map((card, i) => h("li", { key: i, style: { display: "grid" } },
        h(CardView, {
          ...card,
          onSelect: () => setSelected(i === selected ? -1 : i),
          selected: i === selected,
        })))));
}

export default function decorate(block) {
  const cards = [...block.children].map(readCard);

  block.classList.add("nv-theme-kui11");
  flushSync(() => {
    createRoot(block).render(h(CardsApp, { cards }));
  });
}
