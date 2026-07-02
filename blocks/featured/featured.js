import React from "react";
import { flushSync } from "react-dom";
import { createRoot } from "react-dom/client";
import { Button, Text } from "@kui/foundations-react";

const h = React.createElement;

function text(el) {
  return el?.textContent.trim() || undefined;
}

// Parse an "article" row: [image] | [H6 tags, H5 date, H3 title, Normal desc, optional link].
function parseArticle(row) {
  const img = row.querySelector("img");
  const details = [...row.children][1] || row;
  const tagsEl = details.querySelector("h6");
  const linkEl = details.querySelector("a[href]");
  return {
    image: img && { alt: img.alt || "", src: img.currentSrc || img.src },
    tags: tagsEl ? tagsEl.textContent.split(",").map((t) => t.trim()).filter(Boolean) : [],
    date: text(details.querySelector("h5")),
    title: text(details.querySelector("h3, h2, h4")),
    desc: text([...details.querySelectorAll("p")]
      .find((p) => !p.querySelector("a[href]") && p.textContent.trim())),
    href: linkEl?.href,
  };
}

// Authoring (2-column "featured" table, rows after the name row):
//   Row 1: [Heading 2 = section title] | [link = "View More Blogs"]
//   Row 2: [Normal = intro paragraph]  | (empty)
//   Row 3: hero article  [Image] | [H6 tags, H5 date, H3 title, Normal desc]
//   Row 4+: grid articles (same shape) -> render as a 3-up card grid below
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
    tags.map((tag, i) => h("span", { className: "featured-tag", key: i }, tag)),
  );

function maybeLink(href, children, className) {
  return href
    ? h("a", { className, href }, children)
    : h("div", { className }, children);
}

function GridCard(item) {
  return maybeLink(
    item.href,
    [
      item.image && h(
        "div",
        { className: "featured-card-media", key: "m" },
        h("img", { alt: item.image.alt, loading: "lazy", src: item.image.src }),
      ),
      tagPills(item.tags),
      item.date && h(Text, { asChild: true, key: "d", kind: "label/regular/md" },
        h("p", { className: "featured-date" }, item.date)),
      item.title && h(Text, { asChild: true, key: "t", kind: "title/md" },
        h("h3", null, item.title)),
    ],
    "featured-card",
  );
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
        "div",
        { className: "featured-more" },
        h(
          Button,
          { asChild: true, color: "brand", kind: "secondary" },
          h("a", { href: more.href, rel: more.rel, target: more.target }, more.text),
        ),
      ),
    ),
    intro && h(Text, { asChild: true, kind: "body/regular/lg" },
      h("p", { className: "featured-intro" }, intro)),
    hero && h(
      "div",
      { className: "featured-article" },
      hero.image && h(
        "div",
        { className: "featured-media" },
        h("img", { alt: hero.image.alt, loading: "lazy", src: hero.image.src }),
      ),
      h(
        "div",
        { className: "featured-details" },
        tagPills(hero.tags),
        hero.date && h(Text, { asChild: true, kind: "label/regular/md" },
          h("p", { className: "featured-date" }, hero.date)),
        hero.title && h(Text, { asChild: true, kind: "title/xl" }, h("h3", null, hero.title)),
        hero.desc && h(Text, { asChild: true, kind: "body/regular/md" }, h("p", null, hero.desc)),
      ),
    ),
    items.length > 0 && h(
      "div",
      { className: "featured-grid" },
      items.map((item, i) => h(GridCard, { ...item, key: i })),
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
