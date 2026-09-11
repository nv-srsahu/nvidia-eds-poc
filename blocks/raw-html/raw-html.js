import { readBlockConfig } from "../../scripts/aem.js";

function runScripts(block) {
  block.querySelectorAll("script").forEach((script) => {
    const replacement = document.createElement("script");
    [...script.attributes].forEach(({ name, value }) =>
      replacement.setAttribute(name, value),
    );
    replacement.textContent = script.textContent;
    if (replacement.src && !replacement.hasAttribute("async"))
      replacement.async = false;
    script.replaceWith(replacement);
  });
}

export default function decorate(block) {
  const { html } = readBlockConfig(block);
  if (!html) return;

  const template = document.createElement("template");
  template.innerHTML = html;
  block.replaceChildren(template.content);
  runScripts(block);
}
