"use client";
import { useEffect, useRef } from "react";
export default function useModelMotion(key, enabled = true) {
  const ref = useRef(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    const update = () => node.toggleAttribute("auto-rotate", enabled && visible && !document.hidden && !preference.matches);
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; update(); });
    observer.observe(node);
    preference.addEventListener("change", update);
    document.addEventListener("visibilitychange", update);
    return () => { observer.disconnect(); preference.removeEventListener("change", update); document.removeEventListener("visibilitychange", update); node.removeAttribute("auto-rotate"); };
  }, [key, enabled]);
  return ref;
}
