import React from "react";
import { flushSync } from "react-dom";
import { createRoot } from "react-dom/client";
import { Badge, Button, Card, Flex, Grid, Text } from "@kui/foundations-react";

const h = React.createElement;
const { useState } = React;

const BUTTON_COLORS = ["brand", "neutral", "danger"];
const BUTTON_KINDS = ["primary", "secondary", "tertiary"];
const BUTTON_SIZES = ["tiny", "small", "medium", "large"];
const CARD_DENSITIES = ["compact", "standard", "spacious"];
const CARD_KINDS = ["solid", "float", "gradient"];
const CARD_LAYOUTS = ["horizontal", "vertical"];
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

// Collect option tokens + the first real text paragraph (body).
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

function parseButtonOptions(t) {
  const om = t.match(/\(([^)]*)\)/);
  const opts = om ? om[1].split(",").map((o) => o.trim().toLowerCase()) : [];
  return {
    label: t.replace(/\([^)]*\)/, "").trim(),
    kind: opts.find((o) => BUTTON_KINDS.includes(o)),
    color: opts.find((o) => BUTTON_COLORS.includes(o)),
    size: opts.find((o) => BUTTON_SIZES.includes(o)),
  };
}
function buttonKind(link) {
  const k = dataOption(link.dataset.buttonKind, BUTTON_KINDS);
  if (k) return k;
  if (link.classList.contains("secondary")) return "secondary";
  if (link.classList.contains("accent")) return "tertiary";
  return "primary";
}
function buttonColor(link) { return dataOption(link.dataset.buttonColor, BUTTON_COLORS, "brand"); }
function buttonSize(link) { return dataOption(link.dataset.buttonSize, BUTTON_SIZES, "medium"); }

const line = (kind, tag, value, className) =>
  value && h(Text, { asChild: true, kind }, h(tag, className ? { className } : null, value));

function readCard(row) {
  const icon = row.querySelector("img");
  const link = row.querySelector("a[href]");
  const { opt, body } = collectText(row);
  const btn = link && parseButtonOptions(link.textContent.trim());
  return {
    badge: text(row.querySelector("h5")),
    body,
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

function media(card) {
  const { badge, icon } = card;
  if (!icon) return undefined;
  return h("div", { className: "cards-media", style: MEDIA_STYLE },
    h("img", { alt: icon.alt, loading: "lazy", src: icon.src, style: IMG_STYLE }),
    badge && h("span", { className: "cards-badge" }, h(Badge, { color: "gray", kind: "solid" }, badge)));
}

function CardView(card) {
  const {
    body, density, kind, layout, link, onSelect, publisher, selected, subheader, title,
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
      slotHeader: media(card),
      tabIndex: onSelect ? 0 : undefined,
    },
    h(
      Flex,
      { direction: "col", gap: "3" },
      line("label/regular/sm", "p", publisher, "cards-publisher"),
      line("title/lg", "h3", title),
      line("body/bold/md", "h4", subheader),
      line("body/regular/sm", "p", body),
      link && h("div", { className: "cards-cta" },
        h(Button, {
          asChild: true,
          color: link.color,
          kind: link.kind,
          onClick: (e) => e.stopPropagation(),
          size: link.size,
        }, h("a", { href: link.href, rel: link.rel, target: link.target }, link.text))),
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
