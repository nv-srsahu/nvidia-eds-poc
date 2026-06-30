import React from "react";
import { flushSync } from "react-dom";
import { createRoot } from "react-dom/client";
import { InputShell, InputDismissButton, Button } from "@kui/foundations-react";

const h = React.createElement;
const { useId, useRef, useState } = React;

const KINDS = ["flat", "floating"];
const SIZES = ["small", "medium", "large"];
const LAYOUTS = ["horizontal", "vertical"];
const INPUT_TYPES = ["text", "email", "search", "tel", "url", "password", "number"];

function dataOption(value, allowed, fallback) {
  return allowed.includes(value) ? value : fallback;
}

// Authored row cells: [0] label, [1] placeholder, [2] optional submit label.
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
    submitLabel: cells[2]?.textContent.trim() || "",
    type: dataOption(block.dataset.inputType, INPUT_TYPES, "text"),
  };
}

function InputField({ dismissible, kind, label, layout, name, placeholder, size, submitLabel, type }) {
  const [value, setValue] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const inputRef = useRef(null);
  const fieldId = useId();

  const clear = () => {
    setValue("");
    setSubmitted(false);
    inputRef.current?.focus();
  };
  const submit = () => {
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
          onKeyDown: (event) => { if (event.key === "Enter") submit(); },
          placeholder,
          ref: inputRef,
          type,
          value,
        }),
        dismissible && h(InputDismissButton, { "aria-label": "Clear", onClick: clear }),
      ),
      submitLabel
        && h(Button, { color: "brand", kind: "primary", onClick: submit, size }, submitLabel),
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
