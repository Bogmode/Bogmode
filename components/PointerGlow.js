"use client";
import { useEffect } from "react";

// Feeds the cursor position into the hovered card so its glow follows the pointer.
export default function PointerGlow() {
  useEffect(() => {
    if (matchMedia("(hover: none)").matches) return;
    const onMove = (e) => {
      const card = e.target.closest?.(".bm .panel, .bm .news-item");
      if (!card) return;
      const b = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - b.left}px`);
      card.style.setProperty("--my", `${e.clientY - b.top}px`);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);
  return null;
}
