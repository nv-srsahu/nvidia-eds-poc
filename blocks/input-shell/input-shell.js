import React from "react";
import { flushSync } from "react-dom";
import { createRoot } from "react-dom/client";
import { InputShell, InputDismissButton } from "@kui/foundations-react";
import { parseButton, renderButton } from "../button/button.js";

const h = React.createElement;
const { useId, useRef, useState } = React;

const KINDS = ["flat", "floating"];
const SIZES = ["small", "medium", "large"];
const LAYOUTS = ["horizontal", "vertical"];
const INPUT_TYPES = ["text", "email", "search", "tel", "url", "password", "number"];

function dataOption(value, allowed, fallback) {
  return allowed.includes(value) ? value : fallback;
}

// Submit cell is authored as: "Label (size, kind, color)"  e.g. "Submit (large, secondary)"
function parseSubmit(text, fallbackSize) {
  const trimmed = (text || "").trim();
  if (!trimmed) return null;
  return parseButton(trimmed, { label: "Submit", size: fallbackSize });
}

// Authored row cells: [0] label, [1] placeholder, [2] optional submit button.
function readField(block) {
  const row = block.firstElementChild;
  const cells = row ? [...row.children] : [];
  const size = dataOption(block.dataset.inputSize, SIZES, "medium");

  return {
    dismissible: block.dataset.dismissible !== "false",
    kind: dataOption(block.dataset.inputKind, KINDS, "flat"),
    label: cells[0]?.textContent.trim() || "",
    layout: dataOption(block.dataset.inputLayout, LAYOUTS, "horizontal"),
    name: block.dataset.name || "",
    placeholder: cells[1]?.textContent.trim() || "",
    size,
    submit: parseSubmit(cells[2]?.textContent, size),
    type: dataOption(block.dataset.inputType, INPUT_TYPES, "text"),
  };
}

function InputField({ dismissible, kind, label, layout, name, placeholder, size, submit, type }) {
  const [value, setValue] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const inputRef = useRef(null);
  const fieldId = useId();

  const clear = () => {
    setValue("");
    setSubmitted(false);
    inputRef.current?.focus();
  };
  const doSubmit = () => {
    if (value.trim()) setSubmitted(true);
  };

  return h(
    "div",
    { className: "input-shell-field" },
    label && h("label", { className: "input-shell-label", htmlFor: fieldId }, label),
    h(
      "div",
      { className: "input-shell-row" },
      h(
        InputShell,
        { kind, layout, size },
        h("input", {
          "aria-label": label || undefined,
          id: fieldId,
          name: name || undefined,
          onChange: (event) => { setValue(event.target.value); setSubmitted(false); },
          onKeyDown: (event) => { if (event.key === "Enter") doSubmit(); },
          placeholder,
          ref: inputRef,
          type,
          value,
        }),
        dismissible && h(InputDismissButton, { "aria-label": "Clear", onClick: clear }),
      ),
      submit
        && renderButton({ ...submit, onClick: doSubmit }),
    ),
    submitted && h("p", { className: "input-shell-success" }, `Thanks — we'll be in touch at ${value}.`),
  );
}

export default function decorate(block) {
  const field = readField(block);

  block.classList.add("nv-theme-kui11");

  flushSync(() => {
    createRoot(block).render(h(InputField, field));
  });
}
