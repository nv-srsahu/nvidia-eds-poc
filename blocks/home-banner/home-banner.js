import React, { useEffect, useMemo, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { createRoot } from "react-dom/client";
import {
  Button,
  Flex,
  Grid,
  Hero,
  ProgressBar,
  SegmentedControl,
} from "@kui/foundations-react";
import { toClassName } from "../../scripts/aem.js";

const h = React.createElement;

const AUTO_ROTATE_MS = 6000;
const PROGRESS_TICK_MS = 100;
const HEADINGS = "h1, h2, h3, h4, h5, h6";
const LINK_PARAGRAPH = "a[href]";
const BUTTON_COLORS = ["brand", "neutral", "danger"];
const BUTTON_KINDS = ["primary", "secondary", "tertiary"];
const BUTTON_SIZES = ["tiny", "small", "medium", "large"];
const TEXT_ALIGNS = ["default", "left", "center", "right"];
const TEXT_SIZES = ["default", "compact"];
const SOURCE_PROPS = { class: "className", srcset: "srcSet" };
const ALIGN_CLASSES = {
  center: "text-center",
  left: "text-left",
  right: "text-right",
};

const HERO_PARTS = {
  HeroMedia: { className: "home-banner-hero-media" },
  HeroContent: { className: "home-banner-hero-content" },
  HeroHeading: { className: "home-banner-title" },
  HeroSubheading: { className: "home-banner-eyebrow" },
  HeroBody: { className: "home-banner-description" },
  HeroFooter: { className: "home-banner-actions" },
};

const choose = (value, allowed, fallback) =>
  allowed.includes(value) ? value : fallback;
const option = (value = "") => value.trim().toLowerCase().replace(/\s+/g, "-");
const text = (element) =>
  (element?.innerText || element?.textContent || "").trim();
const textLines = (element) =>
  text(element)
    .split(/\n+/)
    .map((value) => value.trim())
    .filter(Boolean);

function elementProps(element) {
  return [...element.attributes].reduce((props, { name, value }) => {
    props[SOURCE_PROPS[name] || name] = value;
    return props;
  }, {});
}

function metaKey(value) {
  return option(value.match(/^([^:]+)\s*:/)?.[1] || "");
}

function readText(row, selector = "p", skipLinks = true) {
  return [...row.querySelectorAll(selector)].reduce(
    (data, element) => {
      if (skipLinks && element.querySelector(LINK_PARAGRAPH)) return data;

      textLines(element).forEach((value) => {
        const key = metaKey(value);

        if (key) data.meta[key] = value.replace(/^([^:]+)\s*:/, "").trim();
        else data.body.push(value);
      });

      return data;
    },
    { body: [], meta: {} },
  );
}

function readCategories(row) {
  const { meta } = readText(row, "p, li", false);
  const selected = meta.selected?.toLowerCase();
  const items = [...row.querySelectorAll("p, li")]
    .map((element, index) => {
      const label = text(element);
      if (!label || metaKey(label)) return null;

      return {
        label,
        selected: selected
          ? label.toLowerCase() === selected
          : !!element.querySelector("strong, b"),
        value: toClassName(label) || `category-${index}`,
      };
    })
    .filter(Boolean);

  if (items.length > 1) return items;

  return text(row)
    .split(/\n|,/)
    .map((label) => label.trim())
    .filter((label) => label && !metaKey(label))
    .map((label, index) => ({
      label,
      selected: selected && label.toLowerCase() === selected,
      value: toClassName(label) || `category-${index}`,
    }));
}

function readOptions(row) {
  const { meta } = readText(row, "p, li", false);

  return {
    textSize: choose(
      option(meta["text-size"] || "default"),
      TEXT_SIZES,
      "default",
    ),
  };
}

function isCategoryRow(row) {
  return (
    readCategories(row).length > 1 &&
    !row.querySelector(`${HEADINGS}, ${LINK_PARAGRAPH}, img, picture`)
  );
}

function buttonKind(link) {
  const authored = choose(link.dataset.buttonKind, BUTTON_KINDS);
  if (authored) return authored;
  if (link.classList.contains("secondary")) return "secondary";
  if (link.classList.contains("accent")) return "tertiary";
  return "primary";
}

function linkCta(row, metaCta) {
  const link = row.querySelector(LINK_PARAGRAPH);
  if (link) {
    return {
      color: choose(link.dataset.buttonColor, BUTTON_COLORS, "brand"),
      href: link.href,
      kind: buttonKind(link),
      rel: link.rel || undefined,
      size: choose(link.dataset.buttonSize, BUTTON_SIZES, "large"),
      target: link.target || undefined,
      text: text(link),
    };
  }

  if (!metaCta) return null;

  const [label, href, kind = "primary", color = "brand", size = "large"] =
    metaCta.split("|").map((part) => part.trim());

  return (
    href && {
      color: choose(color, BUTTON_COLORS, "brand"),
      href,
      kind: choose(kind, BUTTON_KINDS, "primary"),
      size: choose(size, BUTTON_SIZES, "large"),
      text: label,
    }
  );
}

function imageFromElement(img, key) {
  return h("img", {
    ...elementProps(img),
    alt: img.alt || "",
    key,
    loading: img.loading || "lazy",
  });
}

function pictureFromElement(picture) {
  return h(
    "picture",
    { ...elementProps(picture), className: "home-banner-picture" },
    [...picture.children].map((child, key) => {
      if (child.tagName === "SOURCE")
        return h("source", { ...elementProps(child), key });
      if (child.tagName === "IMG") return imageFromElement(child, key);
      return null;
    }),
  );
}

function imageMeta(value = "") {
  const [src, alt = ""] = value.split("|").map((part) => part.trim());
  return { alt, src };
}

function imageFromMetadata(meta) {
  const images = {
    default: imageMeta(meta.image),
    desktop: imageMeta(meta["image-desktop"]),
    mobile: imageMeta(meta["image-mobile"]),
    tablet: imageMeta(meta["image-tablet"]),
  };
  const fallback = [
    images.desktop,
    images.default,
    images.tablet,
    images.mobile,
  ].find((image) => image.src);

  if (!fallback) return null;

  const hasSources =
    images.mobile.src || images.tablet.src || images.desktop.src;
  const alt =
    fallback.alt ||
    images.default.alt ||
    images.tablet.alt ||
    images.mobile.alt ||
    "";

  if (!hasSources) {
    return h("img", { alt, loading: "lazy", src: fallback.src });
  }

  return h(
    "picture",
    { className: "home-banner-picture" },
    images.mobile.src &&
      h("source", {
        key: "mobile",
        media: "(max-width: 600px)",
        srcSet: images.mobile.src,
      }),
    images.tablet.src &&
      h("source", {
        key: "tablet",
        media: "(max-width: 960px)",
        srcSet: images.tablet.src,
      }),
    h("img", {
      alt,
      key: "fallback",
      loading: "lazy",
      src: fallback.src,
    }),
  );
}

function readMedia(row, meta) {
  const picture = row.querySelector("picture");
  if (picture) return pictureFromElement(picture);

  const img = row.querySelector("img");
  if (img) return imageFromElement(img);

  return imageFromMetadata(meta);
}

function readSlide(row, index) {
  const heading = text(row.querySelector(HEADINGS));
  const { body, meta } = readText(row);
  const authoredEyebrow = meta.eyebrow || meta.subheading;
  let eyebrowIndex = -1;

  if (!authoredEyebrow) {
    eyebrowIndex = body.findIndex((value) => value.includes("|"));
    if (heading && eyebrowIndex < 0 && body.length > 1) eyebrowIndex = 0;
  }

  const eyebrow = authoredEyebrow || body[eyebrowIndex] || "";
  const copy = body.filter((_, bodyIndex) => bodyIndex !== eyebrowIndex);
  const category =
    row.dataset.category ||
    row.querySelector("[data-category]")?.dataset.category ||
    meta.category ||
    eyebrow.split("|")[0]?.trim() ||
    "";
  const textAlign =
    row.dataset.textAlign ||
    row.querySelector("[data-text-align]")?.dataset.textAlign ||
    meta["text-align"] ||
    "default";

  return {
    categoryLabel: category,
    categoryValue: toClassName(category),
    cta: linkCta(row, meta.cta),
    description: meta.description || copy[heading || meta.title ? 0 : 1] || "",
    eyebrow,
    media: readMedia(row, meta),
    textAlign: choose(option(textAlign), TEXT_ALIGNS, "default"),
    textSize: choose(option(meta["text-size"] || ""), TEXT_SIZES, ""),
    title: meta.title || heading || copy[0] || `Slide ${index + 1}`,
    value: `slide-${index}`,
  };
}

function slideMatchesCategory(slide, category) {
  if (!slide || !category) return false;
  if (slide.categoryValue === category.value) return true;

  const slideCategory = slide.categoryLabel.toLowerCase();
  const categoryLabel = category.label.toLowerCase();
  return (
    !!slideCategory &&
    (slideCategory.includes(categoryLabel) ||
      categoryLabel.includes(slideCategory))
  );
}

function slidesForCategory(categoryValue, categories, slides) {
  const category = categories.find((item) => item.value === categoryValue);
  const matches = slides.filter((slide) =>
    slideMatchesCategory(slide, category),
  );
  return matches.length ? matches : slides;
}

function readHomeBanner(block) {
  const rows = [...block.children];
  const categoryRow = rows[0] && isCategoryRow(rows[0]) ? rows.shift() : null;
  const categories = categoryRow ? readCategories(categoryRow) : [];

  return {
    activeCategory:
      categories.find((category) => category.selected)?.value ||
      categories[0]?.value,
    categories,
    options: categoryRow ? readOptions(categoryRow) : {},
    slides: rows.map(readSlide).filter((slide) => slide.title || slide.media),
  };
}

function alignment(textAlign) {
  if (textAlign === "center") {
    return {
      HeroContent: {
        style: { alignItems: "center", marginInline: "auto", textAlign },
      },
      HeroFooter: { style: { justifyContent: "center" } },
    };
  }
  if (textAlign === "right") {
    return {
      HeroContent: {
        style: { alignItems: "flex-end", marginInline: "auto 0", textAlign },
      },
      HeroFooter: { style: { justifyContent: "flex-end" } },
    };
  }
  if (textAlign === "left") {
    return {
      HeroContent: { style: { alignItems: "flex-start", textAlign } },
      HeroFooter: { style: { justifyContent: "flex-start" } },
    };
  }
  return {};
}

function heroAttributes(textSize, textAlign) {
  const compact = textSize === "compact" ? " home-banner-text-compact" : "";
  const align = alignment(textAlign);

  return {
    ...HERO_PARTS,
    HeroContent: { ...HERO_PARTS.HeroContent, ...align.HeroContent },
    HeroHeading: { className: `${HERO_PARTS.HeroHeading.className}${compact}` },
    HeroSubheading: {
      className: `${HERO_PARTS.HeroSubheading.className}${compact}`,
    },
    HeroBody: { className: `${HERO_PARTS.HeroBody.className}${compact}` },
    HeroFooter: { ...HERO_PARTS.HeroFooter, ...align.HeroFooter },
  };
}

function SlideActions({ cta }) {
  return (
    cta &&
    h(
      Button,
      {
        asChild: true,
        color: cta.color,
        kind: cta.kind,
        size: cta.size,
      },
      h("a", { href: cta.href, rel: cta.rel, target: cta.target }, cta.text),
    )
  );
}

function StoryRail({ activeIndex, onSelect, paused, progress, slides }) {
  return h(
    Grid,
    {
      colMinWidth: 180,
      className: `home-banner-story-rail${paused ? " is-paused" : ""}`,
      gap: "7",
    },
    slides.map((slide, index) =>
      h(
        "button",
        {
          "aria-current": activeIndex === index ? "true" : undefined,
          className: "home-banner-story",
          key: slide.value,
          onClick: () => onSelect(index),
          type: "button",
        },
        h(ProgressBar, {
          "aria-label": `${slide.title} progress`,
          className: "home-banner-story-progress",
          size: "small",
          value: activeIndex === index ? progress : 0,
        }),
        h("span", { className: "home-banner-story-title" }, slide.title),
      ),
    ),
  );
}

function ControlButton({ icon, label, onClick }) {
  return h(
    Button,
    {
      "aria-label": label,
      color: "brand",
      kind: "secondary",
      onClick,
      type: "button",
    },
    h("span", {
      "aria-hidden": "true",
      className: `home-banner-control-icon home-banner-control-icon-${icon}`,
    }),
  );
}

function HomeBanner({ activeCategory, categories, options, slides }) {
  const [category, setCategory] = useState(activeCategory);
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef(0);
  const activeSlides = useMemo(
    () => slidesForCategory(category, categories, slides),
    [categories, category, slides],
  );
  const slide = activeSlides[activeIndex] || activeSlides[0];
  const segmentItems = useMemo(
    () =>
      categories.map((item) => ({
        children: h(
          "span",
          {
            className: `home-banner-segment-label${item.value === category ? " is-selected" : ""}`,
          },
          item.label,
        ),
        value: item.value,
      })),
    [categories, category],
  );

  useEffect(() => {
    if (paused || activeSlides.length <= 1) return undefined;

    let timer;
    const startedAt =
      window.performance.now() - (progressRef.current / 100) * AUTO_ROTATE_MS;
    const update = () => {
      const nextProgress = Math.min(
        ((window.performance.now() - startedAt) / AUTO_ROTATE_MS) * 100,
        100,
      );

      progressRef.current = nextProgress;
      setProgress(nextProgress);

      if (nextProgress >= 100) {
        progressRef.current = 0;
        setProgress(0);
        setActiveIndex((index) => (index + 1) % activeSlides.length);
        window.clearInterval(timer);
      }
    };

    timer = window.setInterval(update, PROGRESS_TICK_MS);
    update();

    return () => window.clearInterval(timer);
  }, [activeIndex, activeSlides.length, category, paused]);

  if (!slide) return null;

  const resetProgress = () => {
    progressRef.current = 0;
    setProgress(0);
  };
  const selectSlide = (index) => {
    resetProgress();
    setActiveIndex((index + activeSlides.length) % activeSlides.length);
  };
  const selectCategory = (value) => {
    resetProgress();
    setCategory(value);
    setActiveIndex(0);
  };
  const heroClassName = `home-banner-hero${ALIGN_CLASSES[slide.textAlign] ? ` ${ALIGN_CLASSES[slide.textAlign]}` : ""}`;

  return h(
    Flex,
    {
      className: "home-banner-shell nv-theme-kui11",
      direction: "col",
      gap: "5",
    },
    !!segmentItems.length &&
      h(
        "div",
        { className: "home-banner-segments-scroll" },
        h(SegmentedControl, {
          className: "home-banner-segments",
          items: segmentItems,
          name: "home-banner-category",
          onValueChange: selectCategory,
          size: "large",
          value: category,
        }),
      ),
    h(Hero, {
      attributes: heroAttributes(
        slide.textSize || options.textSize,
        slide.textAlign,
      ),
      className: heroClassName,
      mediaTheme: "dark",
      slotActions: h(SlideActions, { cta: slide.cta }),
      slotBody: slide.description,
      slotHeading: slide.title,
      slotMedia: slide.media,
      slotSubheading: slide.eyebrow,
    }),
    h(
      Flex,
      {
        align: "start",
        className: "home-banner-footer",
        gap: "7",
        wrap: "nowrap",
      },
      h(StoryRail, {
        activeIndex,
        onSelect: selectSlide,
        paused,
        progress,
        slides: activeSlides,
      }),
      h(
        Flex,
        {
          className: "home-banner-controls",
          gap: "3",
          justify: "center",
          wrap: "nowrap",
        },
        h(ControlButton, {
          icon: "previous",
          label: "Previous story",
          onClick: () => selectSlide(activeIndex - 1),
        }),
        h(ControlButton, {
          icon: paused ? "play" : "pause",
          label: paused ? "Resume stories" : "Pause stories",
          onClick: () => setPaused(!paused),
        }),
        h(ControlButton, {
          icon: "next",
          label: "Next story",
          onClick: () => selectSlide(activeIndex + 1),
        }),
      ),
    ),
  );
}

export default function decorate(block) {
  block.classList.add("nv-theme-kui11");
  flushSync(() =>
    createRoot(block).render(h(HomeBanner, readHomeBanner(block))),
  );
}
