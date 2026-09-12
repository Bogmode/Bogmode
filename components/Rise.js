"use client";
import { useEffect, useRef } from "react";

export default function Rise({ children, delay = 0, mode = "scroll", as: Tag = "div", className = "", style, ...rest }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!el || motion.matches || typeof IntersectionObserver === "undefined") return;
    let animation;
    const reveal = () => {
      animation = el.animate([
        { opacity: 0, transform: "translateY(14px)" },
        { opacity: 1, transform: "none" },
      ], { duration: 600, delay, easing: "cubic-bezier(.2,.7,.2,1)", fill: "backwards" });
    };
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { reveal(); io.disconnect(); }
    }, { threshold: 0.05 });
    if (mode === "mount") reveal(); else io.observe(el);
    const stop = () => { if (motion.matches) { animation?.cancel(); io.disconnect(); } };
    motion.addEventListener("change", stop);
    return () => { animation?.cancel(); io.disconnect(); motion.removeEventListener("change", stop); };
  }, [mode, delay]);
  return <Tag ref={ref} className={`rise ${className}`} style={style} {...rest}>{children}</Tag>;
}
