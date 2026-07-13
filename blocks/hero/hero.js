import React from "react";
import { flushSync } from "react-dom";
import { createRoot } from "react-dom/client";
import { Hero } from "@kui/foundations-react";
import { readButtonLink, renderButton } from "../button/button.js";

const h = React.createElement;

const HERO_MEDIA_THEMES = ["dark", "light"];

const ATTRIBUTE_ALIASES = {
  class: "className",
  srcset: "srcSet",
};

function dataOption(value, allowed, fallback) {
  return allowed.includes(value) ? value : fallback;
}

function reactProps(element) {
  return [...element.attributes].reduce((props, { name, value }) => {
    props[ATTRIBUTE_ALIASES[name] || name] = value;
    return props;
  }, {});
}

function mediaTheme(block) {
  const themeElement = block.querySelector("[data-hero-media-theme]");
  return dataOption(
    block.dataset.heroMediaTheme || themeElement?.dataset.heroMediaTheme,
    HERO_MEDIA_THEMES,
    "dark",
  );
}

function imageElement(img, key) {
  const props = reactProps(img);
  props.alt = props.alt || "";
  props.loading = props.loading || "eager";
  if (key !== undefined) props.key = key;
  return h("img", props);
}

function heroMedia(block) {
  const picture = block.querySelector("picture");
  if (picture) {
    return h(
      "picture",
      reactProps(picture),
      [...picture.children].map((child, index) => {
        if (child.tagName === "SOURCE") {
          return h("source", { ...reactProps(child), key: index });
        }
        if (child.tagName === "IMG") return imageElement(child, index);
        return null;
      }),
    );
  }

  const img = block.querySelector("img");
  return img && imageElement(img);
}

function readHero(block) {
  const heading = block.querySelector("h1, h2, h3, h4, h5, h6");
  const links = [...block.querySelectorAll("a[href]")];
  const paragraphs = [...block.querySelectorAll("p")]
    .filter((paragraph) => !paragraph.querySelector("a[href]"));

  return {
    actions: links.map((link) => readButtonLink(link)),
    body: paragraphs.map((paragraph) => paragraph.textContent.trim()).filter(Boolean).join(" "),
    heading: heading?.textContent.trim() || "",
    media: heroMedia(block),
    mediaTheme: mediaTheme(block),
  };
}

function HeroActions({ actions }) {
  if (!actions.length) return null;

  return actions.map((action) =>
    h(React.Fragment, { key: action.href }, renderButton(action)),
  );
}

function HeroView({ actions, body, heading, media, mediaTheme: theme }) {
  return h(Hero, {
    mediaTheme: theme,
    slotActions: h(HeroActions, { actions }),
    slotBody: body,
    slotHeading: heading,
    slotMedia: media,
  });
}

export default function decorate(block) {
  const hero = readHero(block);

  block.closest(".section")?.classList.add("hero-section");
  block.classList.add("nv-theme-kui11");

  flushSync(() => {
    createRoot(block).render(h(HeroView, hero));
  });
}
