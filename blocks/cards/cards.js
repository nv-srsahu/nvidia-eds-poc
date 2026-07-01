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

const LIST_RESET = { listStyle: "none", margin: 0, padding: 0 };

const ICON_STYLE = {
  display: "block",
  height: "64px",
  marginInline: "auto",
  objectFit: "contain",
  width: "auto",
};

function dataOption(value, allowed, fallback) {
  return allowed.includes(value) ? value : fallback;
}

function cardDataOption(row, key, allowed, fallback) {
  return dataOption(row.dataset[key] || row.firstElementChild?.dataset[key], allowed, fallback);
}

function cardSelected(row) {
  return (row.dataset.cardSelected || row.firstElementChild?.dataset.cardSelected) === "true";
}

// Parse author options from the link text, e.g. "Get Support (primary, small)".
// Returns the clean label plus any kind/color/size found inside the parentheses.
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

// EDS decorateButtons maps <strong>/<em>/<strong><em> link wrappers to the
// primary/secondary/accent classes; translate those to KUI button kinds.
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

function readCard(row) {
  const icon = row.querySelector("img");
  const link = row.querySelector("a[href]");
  const body = [...row.querySelectorAll("p")].find(
    (paragraph) => !paragraph.querySelector("a[href]"),
  );
  // Author options in the link text take priority; otherwise fall back to the
  // bold/italic + data-attribute behaviour. Label is cleaned of any "(...)".
  const opts = link && parseButtonOptions(link.textContent.trim());

  return {
    body: body?.textContent.trim(),
    density: cardDataOption(row, "cardDensity", CARD_DENSITIES),
    icon: icon && { alt: icon.alt || "", src: icon.currentSrc || icon.src },
    kind: cardDataOption(row, "cardKind", CARD_KINDS, "solid"),
    layout: cardDataOption(row, "cardLayout", CARD_LAYOUTS),
    link: link && {
      color: opts.color || buttonColor(link),
      href: link.href,
      kind: opts.kind || buttonKind(link),
      rel: link.rel || undefined,
      size: opts.size || buttonSize(link),
      target: link.target || undefined,
      text: opts.label || link.textContent.trim(),
    },
    selected: cardSelected(row),
    title: row.querySelector("h1, h2, h3, h4, h5, h6")?.textContent.trim(),
  };
}

const text = (kind, tag, value) =>
  value && h(Text, { asChild: true, kind }, h(tag, null, value));

const button = (kind, color, size, link) =>
  link &&
  h(
    Button,
    { asChild: true, color, kind, size },
    h("a", { href: link.href, rel: link.rel, target: link.target }, link.text),
  );

function CardView({ body, density, icon, kind, layout, link, selected, title }) {
  return h(
    Card,
    {
      density,
      kind,
      layout,
      selected,
      slotHeader:
        icon &&
        h("img", {
          alt: icon.alt,
          loading: "lazy",
          src: icon.src,
          style: ICON_STYLE,
        }),
    },
    h(
      Flex,
      {
        align: "center",
        direction: "col",
        gap: "4",
        style: { textAlign: "center" },
      },
      text("body/bold/xl", "h3", title),
      text("body/regular/sm", "p", body),
      button(link?.kind || "primary", link?.color || "brand", link?.size || "medium", link),
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
        { asChild: true, colMinWidth: 260, gap: "6" },
        h(
          "ul",
          { style: LIST_RESET },
          cards.map((card, index) =>
            h(
              "li",
              { key: index, style: { display: "grid" } },
              h(CardView, card),
            ),
          ),
        ),
      ),
    );
  });
}
