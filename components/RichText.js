import React from "react";
import Markdoc from "@markdoc/markdoc";

const textOf = (n) =>
  n.type === "text" ? n.attributes?.content || "" : (n.children || []).map(textOf).join("");

// Drop unfinished "TODO" blocks, and any heading left with nothing under it.
function clean(node) {
  const kept = (node.children || []).filter((k) => !/^\s*TODO/i.test(textOf(k)));
  node.children = kept.filter((k, i) => {
    if (k.type !== "heading") return true;
    const next = kept[i + 1];
    return next && next.type !== "heading";
  });
  return node;
}

export default function RichText({ node }) {
  if (!node) return null;
  const tree = Markdoc.transform(clean(node));
  return <div className="rich">{Markdoc.renderers.react(tree, React)}</div>;
}
