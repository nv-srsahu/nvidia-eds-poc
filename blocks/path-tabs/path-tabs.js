import {
  React,
  SegmentedControl,
  createRoot,
  flushSync,
} from "@kui/foundations-react";
import { decorateBlock, loadBlock, toClassName } from "../../scripts/aem.js";

const h = React.createElement;
const { useState } = React;

function lines(row) {
  return [...row.querySelectorAll("p, li")]
    .map((el) => ({
      label: el.textContent.trim(),
      selected: !!el.querySelector("strong, b"),
    }))
    .filter(({ label }) => label);
}

function tabName(panel, fallback) {
  const marker = [...panel.querySelectorAll("p")]
    .find((p) => p.textContent.trim().startsWith("Tab:"));
  const label = marker?.textContent.replace(/^Tab:\s*/i, "").trim() || fallback;
  marker?.remove();
  return label;
}

function showPanel(panels, value) {
  panels.forEach((panel) => {
    panel.hidden = panel.dataset.tab !== value;
  });
}

function Tabs({ initial, items, onChange }) {
  const [value, setValue] = useState(initial);

  return h(SegmentedControl, {
    "aria-label": "Choose your path",
    className: "path-tabs-control",
    items,
    name: "path-tabs",
    onValueChange: (next) => {
      setValue(next);
      onChange(next);
    },
    size: "large",
    value,
  });
}

async function loadNestedBlocks(panel) {
  await Promise.all(
    [...panel.querySelectorAll(":scope > div[class]")]
      .filter((block) => !block.dataset.blockName)
      .map(async (block) => {
        decorateBlock(block);
        await loadBlock(block);
      }),
  );
}

function adoptNextBlock(block, panel) {
  if (!panel) return;
  if (panel.textContent.trim() || panel.querySelector(":scope > div[class]")) return;

  const wrapper = block.parentElement.nextElementSibling;
  const nextBlock = wrapper?.children.length === 1 ? wrapper.firstElementChild : null;
  if (!nextBlock?.classList.contains("block")) return;

  panel.append(nextBlock);
  wrapper.remove();
}

export default async function decorate(block) {
  const [headingRow, tabRow, ...panelRows] = [...block.children];
  const labels = lines(tabRow || headingRow);
  const panels = panelRows.map((row, index) => {
    const panel = document.createElement("div");
    const label = tabName(row, labels[index]?.label || `Tab ${index + 1}`);
    const value = toClassName(label) || `tab-${index}`;

    panel.className = "path-tabs-panel";
    panel.dataset.tab = value;
    panel.id = `path-tabs-panel-${value}`;
    panel.setAttribute("role", "tabpanel");
    panel.append(...[...row.children].flatMap((col) => [...col.childNodes]));

    return { label, panel, value };
  });
  const selected = labels.find((item) => item.selected)?.label || panels[0]?.label;
  const initial = toClassName(selected) || panels[0]?.value;
  const head = document.createElement("div");
  const controls = document.createElement("div");
  const body = document.createElement("div");

  head.className = "path-tabs-head";
  head.append(...(headingRow?.firstElementChild?.childNodes || []));
  controls.className = "path-tabs-controls";
  body.className = "path-tabs-body";
  body.append(...panels.map(({ panel }) => panel));

  block.textContent = "";
  block.classList.add("nv-theme-kui11");
  block.append(head, controls, body);
  adoptNextBlock(block, panels[0]?.panel);

  showPanel(panels.map(({ panel }) => panel), initial);
  flushSync(() => {
    createRoot(controls).render(h(Tabs, {
      initial,
      items: panels.map(({ label, value }) => ({ children: label, value })),
      onChange: (value) => showPanel(panels.map(({ panel }) => panel), value),
    }));
  });

  await Promise.all(panels.map(({ panel }) => loadNestedBlocks(panel)));
}
