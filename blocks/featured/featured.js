import React from "react";
import { flushSync } from "react-dom";
import { createRoot } from "react-dom/client";
import { Button, Card, Flex, Grid, Text } from "@kui/foundations-react";

const h = React.createElement;

const LIST_RESET = { listStyle: "none", margin: 0, padding: 0 };

function text(el) {
  return el?.textContent.trim() || undefined;
}

// Parse an "article" row: [image] | [H6 tags, H5 date, H3 title, Normal desc, optional link].
function parseArticle(row) {
  const image = row.querySelector("img");
  const details = [...row.children][1] || row;
  const tagsEl = details.querySelector("h6");
  const linkEl = details.querySelector("a[href]");
  return {
    image: image && { alt: image.alt || "", src: image.currentSrc || image.src },
    tags: tagsEl ? tagsEl.textContent.split(",").map((t) => t.trim()).filter(Boolean) : [],
    date: text(details.querySelector("h5")),
    title: text(details.querySelector("h3, h2, h4")),
    desc: text([...details.querySelectorAll("p")]
      .find((p) => !p.querySelector("a[href]") && p.textContent.trim())),
    href: linkEl?.href,
  };
}

// Authoring ("featured" table): row1 header, row2 intro, row3 hero article,
// rows 4+ grid articles. See CLAUDE.md for the full field->style mapping.
function readFeatured(block) {
  const rows = [...block.children];
  const [headRow, introRow] = rows;
  const moreLink = headRow?.querySelector("a[href]");
  return {
    heading: text(headRow?.querySelector("h1, h2, h3")) || text(headRow?.firstElementChild),
    more: moreLink && {
      href: moreLink.href,
      rel: moreLink.rel || undefined,
      target: moreLink.target || undefined,
      text: moreLink.textContent.replace(/\([^)]*\)/, "").trim() || "View More",
    },
    intro: text(introRow?.firstElementChild) || text(introRow),
    hero: rows[2] ? parseArticle(rows[2]) : null,
    items: rows.slice(3).map(parseArticle),
  };
}

const tagPills = (tags) =>
  tags.length > 0
  && h(
    "div",
    { className: "featured-tags" },
    tags.map((tag, i) => h(Text, { asChild: true, key: i, kind: "label/regular/sm" },
      h("span", { className: "featured-tag" }, tag))),
  );

const mediaImg = (image) =>
  image && h("img", { alt: image.alt, className: "featured-img", loading: "lazy", src: image.src });

// Card body (tags, date, title, optional description) built from Kaizen Text.
function articleBody(a, titleKind) {
  return h(
    Flex,
    { direction: "col", gap: "3" },
    tagPills(a.tags),
    a.date && h(Text, { asChild: true, kind: "label/regular/md" },
      h("p", { className: "featured-date" }, a.date)),
    a.title && h(Text, { asChild: true, kind: titleKind }, h("h3", null, a.title)),
    a.desc && h(Text, { asChild: true, kind: "body/regular/md" }, h("p", null, a.desc)),
  );
}

function gridCard(a) {
  const card = h(Card, { kind: "solid", slotHeader: mediaImg(a.image) }, articleBody(a, "title/md"));
  return a.href ? h("a", { className: "featured-card-link", href: a.href }, card) : card;
}

function FeaturedView({ heading, hero, intro, items, more }) {
  return h(
    "div",
    { className: "featured-inner" },
    h(
      "div",
      { className: "featured-head" },
      heading && h(Text, { asChild: true, kind: "display/sm" }, h("h2", null, heading)),
      more && h(
        Button,
        { asChild: true, color: "brand", kind: "secondary" },
        h("a", { href: more.href, rel: more.rel, target: more.target }, more.text),
      ),
    ),
    intro && h(Text, { asChild: true, kind: "body/regular/lg" },
      h("p", { className: "featured-intro" }, intro)),
    // Hero: image beside content (2-column layout), Kaizen Text inside.
    hero && h(
      "div",
      { className: "featured-hero" },
      hero.image && h("div", { className: "featured-hero-media" }, mediaImg(hero.image)),
      h("div", { className: "featured-hero-body" }, articleBody(hero, "title/xl")),
    ),
    // 3-up row: Kaizen Grid of Kaizen Cards.
    items.length > 0 && h(
      "div",
      { className: "featured-grid-wrap" },
      h(
        Grid,
        { asChild: true, colMinWidth: 300, gap: "6" },
        h("ul", { style: LIST_RESET },
          items.map((item, i) => h("li", { key: i, style: { display: "grid" } }, gridCard(item)))),
      ),
    ),
  );
}

export default function decorate(block) {
  const data = readFeatured(block);

  block.classList.add("nv-theme-kui11");
  flushSync(() => {
    createRoot(block).render(h(FeaturedView, data));
  });
}
