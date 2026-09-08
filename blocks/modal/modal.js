import { Button, Modal, React, createRoot, flushSync } from "@kui/foundations-react";
import { readBlockConfig } from "../../scripts/aem.js";
import { loadFragment } from "../fragment/fragment.js";

const h = React.createElement;

function FragmentContent({ fragment }) {
  const ref = React.useRef(null);

  React.useEffect(() => {
    if (ref.current && fragment) ref.current.replaceChildren(...fragment.childNodes);
  }, [fragment]);

  return h("div", { className: "modal-fragment", ref });
}

export default async function decorate(block) {
  const config = readBlockConfig(block);
  const path = block.querySelector("a")?.getAttribute("href") || config.content;
  const fragment = await loadFragment(path);

  if (!fragment) return;

  block.classList.add("nv-theme-kui11");
  flushSync(() => {
    createRoot(block).render(h(Modal, {
      forceMount: true,
      slotHeading: config.heading || "",
      slotTrigger: h(Button, null, config.trigger || "Open modal"),
    }, h(FragmentContent, { fragment })));
  });
}
