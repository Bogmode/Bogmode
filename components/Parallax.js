"use client";
import { useEffect } from "react";

// Scroll-linked depth: [data-parallax="0.05"] elements drift at their own rate,
// and the page grid shifts slowly behind everything.
export default function Parallax() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const apply = () => {
      raf = 0;
      const vh = window.innerHeight, y = window.scrollY;
      document.documentElement.style.setProperty("--sy", `${y}px`);
      document.documentElement.style.setProperty("--syn", `${y}`);
      document.querySelectorAll("[data-parallax]").forEach((el) => {
        const r = el.getBoundingClientRect();
        const rate = parseFloat(el.dataset.parallax) || 0;
        const offset = (r.top + r.height / 2 - vh / 2) * rate;
        el.style.setProperty("--py", `${offset.toFixed(1)}px`);
      });
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(apply); };
    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); cancelAnimationFrame(raf); };
  }, []);
  return null;
}
