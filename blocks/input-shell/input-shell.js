import React from "react";
import { flushSync } from "react-dom";
import { createRoot } from "react-dom/client";
import { InputShell, InputDismissButton } from "@kui/foundations-react";

const h = React.createElement;
const { useId, useRef, useState } = React;

const KINDS = ["flat", "floating"];
const SIZES = ["small", "medium", "large"];
const LAYOUTS = ["horizontal", "vertical"];
const INPUT_TYPES = ["text", "email", "search", "tel", "url", "password", "number"];

function dataOption(value, allowed, fallback) {
  return allowed.includes(value) ? value : fallback;
}

// Authored as a single row of cells:
//   cell[0] = label   cell[1] = placeholder
// Behaviour options come from data-* attributes on the block.
function readField(block) {
  const row = block.firstElementChild;
  const cells = row ? [...row.children] : [];

  return {
    dismissible: block.dataset.dismissible !== "false",
    kind: dataOption(block.dataset.inputKind, KINDS, "flat"),
    label: cells[0]?.textContent.trim() || "",
    layout: dataOption(block.dataset.inputLayout, LAYOUTS, "horizontal"),
    name: block.dataset.name || "",
    placeholder: cells[1]?.textContent.trim() || "",
    size: dataOption(block.dataset.inputSize, SIZES, "medium"),
    type: dataOption(block.dataset.inputType, INPUT_TYPES, "text"),
  };
}

function InputField({ dismissible, kind, label, layout, name, placeholder, size, type }) {
  const [value, setValue] = useState("");
  const inputRef = useRef(null);
  const fieldId = useId();

  const clear = () => {
    setValue("");
    inputRef.current?.focus();
  };

  return h(
    "div",
    { className: "input-shell-field" },
    label && h("label", { className: "input-shell-label", htmlFor: fieldId }, label),
    h(
      InputShell,
      { kind, layout, size },
      h("input", {
        "aria-label": label || undefined,
        id: fieldId,
        name: name || undefined,
        onChange: (event) => setValue(event.target.value),
        placeholder,
        ref: inputRef,
        type,
        value,
      }),
      dismissible && h(InputDismissButton, { "aria-label": "Clear", onClick: clear }),
    ),
  );
}

export default function decorate(block) {
  const field = readField(block);

  block.classList.add("nv-theme-kui11");

  flushSync(() => {
    createRoot(block).render(h(InputField, field));
  });
}
