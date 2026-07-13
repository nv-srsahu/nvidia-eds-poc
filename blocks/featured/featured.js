import React from "react";
import { flushSync } from "react-dom";
import { createRoot } from "react-dom/client";
import { Card, Flex, Grid } from "@kui/foundations-react";
import { readButtonLink, renderButton } from "../button/button.js";
import { renderText } from "../text/text.js";

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
    more: readButtonLink(moreLink, { kind: "secondary" }),
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
    tags.map((tag, i) => renderText(tag, {
      className: "featured-tag", key: i, kind: "label/regular/sm", tag: "span",
    })),
  );

const mediaImg = (image) =>
  image && h("img", { alt: image.alt, className: "featured-img", loading: "lazy", src: image.src });

// Card body (tags, date, title, optional description) built from Kaizen Text.
function articleBody(a, titleKind) {
  return h(
    Flex,
    { direction: "col", gap: "3" },
    tagPills(a.tags),
    renderText(a.date, { className: "featured-date", kind: "label/regular/md", tag: "p" }),
    renderText(a.title, { kind: titleKind, tag: "h3" }),
    renderText(a.desc, { kind: "body/regular/md", tag: "p" }),
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
      renderText(heading, { kind: "display/sm", tag: "h2" }),
      more && renderButton(more),
    ),
    renderText(intro, { className: "featured-intro", kind: "body/regular/lg", tag: "p" }),
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
