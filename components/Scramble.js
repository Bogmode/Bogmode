"use client";
import { useEffect, useRef } from "react";

const GLYPHS = "▚▞░▒/\\<>_-+=*#01";

// Mono label that decodes into place once, the first time it scrolls into view.
export default function Scramble({ text, as: Tag = "span", className = "", delay = 0 }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0, timer = 0;
    const run = () => {
      const start = performance.now(), dur = Math.min(900, 220 + text.length * 28);
      let lastSwap = 0;
      const step = (now) => {
        if (now - lastSwap < 45 && now - start < dur) { raf = requestAnimationFrame(step); return; }
        lastSwap = now;
        const p = Math.min((now - start) / dur, 1);
        const settled = Math.floor(p * text.length);
        el.textContent = text.split("").map((ch, i) =>
          i < settled || ch === " " ? ch : GLYPHS[(Math.random() * GLYPHS.length) | 0]).join("");
        if (p < 1) raf = requestAnimationFrame(step); else el.textContent = text;
      };
      raf = requestAnimationFrame(step);
    };
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { io.disconnect(); timer = setTimeout(run, delay); }
    });
    io.observe(el);
    return () => { io.disconnect(); clearTimeout(timer); cancelAnimationFrame(raf); el.textContent = text; };
  }, [text, delay]);
  return <Tag ref={ref} className={className} aria-label={text}>{text}</Tag>;
}
