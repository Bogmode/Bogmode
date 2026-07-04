"use client";
// Boot-in "rise" per the design system: translateY(14px) + fade,
// .6s cubic-bezier(.2,.7,.2,1), staggered via the `delay` prop (ms).
// mode="mount"  → fires on page load (hero, detail headers)
// mode="scroll" → fires when scrolled into view (cards, sections)
// Reduced-motion users get instant reveal (transition is killed in CSS).
import { useEffect, useRef, useState } from "react";

export default function Rise({ children, delay = 0, mode = "scroll", as: Tag = "div", className = "", ...rest }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (mode === "mount" || typeof IntersectionObserver === "undefined") {
      const t = requestAnimationFrame(() => setInView(true));
      return () => cancelAnimationFrame(t);
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
    );
    io.observe(el);
    // Safety net: never leave content hidden (e.g. IO edge cases).
    const t = setTimeout(() => setInView(true), 1800);
    return () => { io.disconnect(); clearTimeout(t); };
  }, [mode]);

  return (
    <Tag
      ref={ref}
      className={`rise${inView ? " in" : ""}${className ? " " + className : ""}`}
      style={{ transitionDelay: inView ? `${delay}ms` : "0ms" }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
