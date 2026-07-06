import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
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

const BUTTON_COLORS = ["brand", "neutral", "danger"];
const BUTTON_KINDS = ["primary", "secondary", "tertiary"];
const BUTTON_SIZES = ["tiny", "small", "medium", "large"];
const TEXT_SIZES = ["default", "compact"];
const AUTO_ROTATE_MS = 6000;
const PROGRESS_TICK_MS = 100;

const PICTURE_ATTRIBUTES = {
  class: "className",
  srcset: "srcSet",
};

const HERO_ATTRIBUTES = {
  HeroMedia: {
    className: "home-banner-hero-media",
  },
  HeroContent: {
    className: "home-banner-hero-content",
  },
  HeroHeading: {
    className: "home-banner-title",
  },
  HeroSubheading: {
    className: "home-banner-eyebrow",
  },
  HeroBody: {
    className: "home-banner-description",
  },
  HeroFooter: {
    className: "home-banner-actions",
  },
};

function dataOption(value, allowed, fallback) {
  return allowed.includes(value) ? value : fallback;
}

function toOption(value) {
  return value.trim().toLowerCase().replace(/\s+/g, "-");
}

function reactProps(element) {
  return [...element.attributes].reduce((props, { name, value }) => {
    props[PICTURE_ATTRIBUTES[name] || name] = value;
    return props;
  }, {});
}

function textContent(element) {
  return element?.textContent?.trim() || "";
}

function metadataName(label) {
  return toOption(label.match(/^([^:]+)\s*:/)?.[1] || "");
}

function isCategoryMetadata(label) {
  return ["selected", "text-size"].includes(metadataName(label));
}

function metadataValue(labels, name) {
  const expression = new RegExp(`^${name}\\s*:`, "i");
  const label = labels.find((item) => expression.test(item));
  return label?.replace(expression, "").trim() || "";
}

function categoriesFrom(row) {
  let selectedLabel = "";
  const items = [...row.querySelectorAll("p, li")]
    .map((element, index) => {
      const label = textContent(element);
      const selectedMatch = label.match(/^selected\s*:\s*(.+)$/i);
      if (selectedMatch) {
        selectedLabel = selectedMatch[1].trim();
        return null;
      }
      if (isCategoryMetadata(label)) return null;

      return {
        label,
        selected: !!element.querySelector("strong, b"),
        value: toClassName(label) || `category-${index}`,
      };
    })
    .filter((item) => item?.label);

  if (selectedLabel) {
    items.forEach((item) => {
      item.selected = item.label.toLowerCase() === selectedLabel.toLowerCase();
    });
  }

  if (items.length > 1) return items;

  const labels = textContent(row)
    .split(/\n|,/)
    .map((label) => label.trim())
    .filter(Boolean);

  selectedLabel = metadataValue(labels, "selected");

  return labels
    .filter((label) => !isCategoryMetadata(label))
    .map((label, index) => ({
      label,
      selected: selectedLabel && label.toLowerCase() === selectedLabel.toLowerCase(),
      value: toClassName(label) || `category-${index}`,
    }));
}

function bannerOptionsFrom(row) {
  const labels = [...row.querySelectorAll("p, li")]
    .map(textContent)
    .filter(Boolean);
  const textSize = toOption(metadataValue(labels, "text size") || "default");

  return {
    textSize: dataOption(textSize, TEXT_SIZES, "default"),
  };
}

function isCategoryRow(row) {
  return categoriesFrom(row).length > 1
    && !row.querySelector("h1, h2, h3, h4, h5, h6, a[href], img, picture");
}

function imageElement(img, key) {
  const props = reactProps(img);
  props.alt = props.alt || "";
  props.loading = props.loading || "lazy";
  if (key !== undefined) props.key = key;
  return h("img", props);
}

function pictureElement(picture) {
  return h(
    "picture",
    { ...reactProps(picture), className: "home-banner-picture" },
    [...picture.children].map((child, index) => {
      if (child.tagName === "SOURCE") return h("source", { ...reactProps(child), key: index });
      if (child.tagName === "IMG") return imageElement(child, index);
      return null;
    }),
  );
}

function mediaFrom(row, imageMeta = "") {
  const picture = row.querySelector("picture");
  if (picture) return pictureElement(picture);

  const img = row.querySelector("img");
  if (img) return imageElement(img);

  const [src, alt = ""] = imageMeta.split("|").map((part) => part.trim());
  return src && h("img", { alt, loading: "lazy", src });
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
  return dataOption(link.dataset.buttonSize, BUTTON_SIZES, "large");
}

function ctaFrom(row, ctaMeta = "") {
  const link = row.querySelector("a[href]");
  if (link) {
    return {
      color: buttonColor(link),
      href: link.href,
      kind: buttonKind(link),
      rel: link.rel || undefined,
      size: buttonSize(link),
      target: link.target || undefined,
      text: textContent(link),
    };
  }

  if (!ctaMeta) return null;

  const [text, href, kind = "primary", color = "brand", size = "large"] = ctaMeta
    .split("|")
    .map((part) => part.trim());

  return href && {
    color: dataOption(color, BUTTON_COLORS, "brand"),
    href,
    kind: dataOption(kind, BUTTON_KINDS, "primary"),
    size: dataOption(size, BUTTON_SIZES, "large"),
    text,
  };
}

function metaFrom(paragraphs, label) {
  const expression = new RegExp(`^${label}\\s*:`, "i");
  const index = paragraphs.findIndex((paragraph) => expression.test(paragraph));
  if (index < 0) {
    return {
      index: -1,
      value: "",
    };
  }

  return {
    index,
    value: paragraphs[index].replace(expression, "").trim(),
  };
}

function slideCategoryFrom(row, category, eyebrow) {
  const authoredCategory = row.dataset.category || row.querySelector("[data-category]")?.dataset.category;
  const label = authoredCategory || category || eyebrow.split("|")[0]?.trim() || "";

  return {
    categoryLabel: label,
    categoryValue: toClassName(label),
  };
}

function slideFrom(row, index) {
  const heading = row.querySelector("h1, h2, h3, h4, h5, h6");
  const paragraphs = [...row.querySelectorAll("p")]
    .filter((paragraph) => !paragraph.querySelector("a[href]"))
    .map(textContent)
    .filter(Boolean);
  const categoryMeta = metaFrom(paragraphs, "category");
  const imageMeta = metaFrom(paragraphs, "image");
  const ctaMeta = metaFrom(paragraphs, "cta");
  const metaIndexes = [categoryMeta.index, imageMeta.index, ctaMeta.index];
  const eyebrowIndex = paragraphs.findIndex((paragraph, idx) => (
    !metaIndexes.includes(idx) && paragraph.includes("|")
  ));
  const fallbackEyebrowIndex = heading && eyebrowIndex < 0 && paragraphs.length > 1
    ? paragraphs.findIndex((paragraph, idx) => !metaIndexes.includes(idx))
    : -1;
  const eyebrow = eyebrowIndex >= 0
    ? paragraphs[eyebrowIndex]
    : paragraphs[fallbackEyebrowIndex] || "";
  const contentParagraphs = paragraphs
    .filter((paragraph, idx) => (
      !metaIndexes.includes(idx) && idx !== eyebrowIndex && idx !== fallbackEyebrowIndex
    ));
  const title = textContent(heading) || contentParagraphs[0] || `Slide ${index + 1}`;

  return {
    cta: ctaFrom(row, ctaMeta.value),
    description: contentParagraphs[heading ? 0 : 1] || "",
    eyebrow,
    media: mediaFrom(row, imageMeta.value),
    ...slideCategoryFrom(row, categoryMeta.value, eyebrow),
    title,
    value: `slide-${index}`,
  };
}

function slideMatchesCategory(slide, category) {
  if (!slide || !category) return false;
  if (slide.categoryValue && slide.categoryValue === category.value) return true;

  const categoryLabel = category.label.toLowerCase();
  const slideCategory = slide.categoryLabel.toLowerCase();
  return !!slideCategory && (
    categoryLabel.includes(slideCategory)
    || slideCategory.includes(categoryLabel)
  );
}

function slidesForCategory(value, categories, slides) {
  const category = categories.find((item) => item.value === value);
  const matchingSlides = slides.filter((slide) => slideMatchesCategory(slide, category));
  return matchingSlides.length > 0 ? matchingSlides : slides;
}

function readHomeBanner(block) {
  const rows = [...block.children];
  const categoryRow = rows[0] && isCategoryRow(rows[0]) ? rows.shift() : null;
  const categories = categoryRow ? categoriesFrom(categoryRow) : [];
  const options = categoryRow ? bannerOptionsFrom(categoryRow) : {};
  const slides = rows.map(slideFrom).filter((slide) => slide.title || slide.media);
  const activeCategory = categories.find((category) => category.selected)?.value
    || categories[0]?.value;

  return {
    activeCategory,
    categories,
    options,
    slides,
  };
}

function heroAttributes({ textSize = "default" } = {}) {
  const textSizeClass = textSize === "compact" ? " home-banner-text-compact" : "";

  return {
    ...HERO_ATTRIBUTES,
    HeroHeading: {
      className: `${HERO_ATTRIBUTES.HeroHeading.className}${textSizeClass}`,
    },
    HeroSubheading: {
      className: `${HERO_ATTRIBUTES.HeroSubheading.className}${textSizeClass}`,
    },
    HeroBody: {
      className: `${HERO_ATTRIBUTES.HeroBody.className}${textSizeClass}`,
    },
  };
}

function SlideActions({ cta }) {
  if (!cta) return null;

  return h(
    Button,
    {
      asChild: true,
      color: cta.color,
      kind: cta.kind,
      size: cta.size,
    },
    h("a", { href: cta.href, rel: cta.rel, target: cta.target }, cta.text),
  );
}

function StoryRail({
  activeIndex,
  onSelect,
  paused,
  progress,
  slides,
}) {
  return h(
    Grid,
    {
      colMinWidth: 180,
      className: `home-banner-story-rail${paused ? " is-paused" : ""}`,
      gap: "7",
    },
    slides.map((slide, index) => (
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
      )
    )),
  );
}

function HomeBanner({
  activeCategory,
  categories,
  options,
  slides,
}) {
  const [category, setCategory] = useState(activeCategory);
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progress, setProgressState] = useState(0);
  const progressRef = useRef(0);

  const segmentItems = useMemo(() => categories.map((item) => ({
    children: h("span", {
      className: `home-banner-segment-label${item.value === category ? " is-selected" : ""}`,
    }, item.label),
    value: item.value,
  })), [categories, category]);

  const activeSlides = useMemo(
    () => slidesForCategory(category, categories, slides),
    [categories, category, slides],
  );
  const slide = activeSlides[activeIndex] || activeSlides[0];

  useEffect(() => {
    if (paused || activeSlides.length <= 1) return undefined;

    let timer;
    const startedAt = window.performance.now() - ((progressRef.current / 100) * AUTO_ROTATE_MS);

    const update = () => {
      const time = window.performance.now();
      const nextProgress = Math.min(((time - startedAt) / AUTO_ROTATE_MS) * 100, 100);
      progressRef.current = nextProgress;
      setProgressState(nextProgress);

      if (nextProgress >= 100) {
        progressRef.current = 0;
        setProgressState(0);
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
    setProgressState(0);
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

  return h(
    Flex,
    { className: "home-banner-shell nv-theme-kui11", direction: "col", gap: "5" },
    segmentItems.length > 0 && h(
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
    h(
      Hero,
      {
        attributes: heroAttributes(options),
        className: "home-banner-hero",
        mediaTheme: "dark",
        slotActions: h(SlideActions, { cta: slide.cta }),
        slotBody: slide.description,
        slotHeading: slide.title,
        slotMedia: slide.media,
        slotSubheading: slide.eyebrow,
      },
    ),
    h(
      Flex,
      {
        align: "start",
        className: "home-banner-footer",
        gap: "7",
        wrap: "wrap",
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
          gap: "2",
          justify: "center",
          wrap: "nowrap",
        },
        h(Button, {
          "aria-label": "Previous story",
          color: "brand",
          kind: "secondary",
          onClick: () => selectSlide(activeIndex - 1),
          type: "button",
        }, h("span", {
          "aria-hidden": "true",
          className: "home-banner-control-icon home-banner-control-icon-previous",
        })),
        h(Button, {
          "aria-label": paused ? "Resume stories" : "Pause stories",
          color: "brand",
          kind: "secondary",
          onClick: () => setPaused(!paused),
          type: "button",
        }, h("span", {
          "aria-hidden": "true",
          className: `home-banner-control-icon home-banner-control-icon-${paused ? "play" : "pause"}`,
        })),
        h(Button, {
          "aria-label": "Next story",
          color: "brand",
          kind: "secondary",
          onClick: () => selectSlide(activeIndex + 1),
          type: "button",
        }, h("span", {
          "aria-hidden": "true",
          className: "home-banner-control-icon home-banner-control-icon-next",
        })),
      ),
    ),
  );
}

export default function decorate(block) {
  const data = readHomeBanner(block);

  block.classList.add("nv-theme-kui11");
  flushSync(() => {
    createRoot(block).render(h(HomeBanner, data));
  });
}
