"use client";
import { useEffect, useRef } from "react";

// Faint lab-readout band: slow columns of running numbers behind a page header.
const CHARS = "0123456789.:-+";

export default function NumberRain() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = matchMedia("(max-width: 820px)").matches;
    const STEP = 16, LINE = 15, FPS = mobile ? 12 : 20;
    let cols = [], w = 0, h = 0, color = "#888", accent = "#f60";

    const readColors = () => {
      const cs = getComputedStyle(canvas.closest(".bm") || document.body);
      color = cs.getPropertyValue("--muted").trim() || color;
      accent = cs.getPropertyValue("--accent").trim() || accent;
    };
    const rand = () => CHARS[(Math.random() * CHARS.length) | 0];
    const setup = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.ceil(w / STEP), rows = Math.ceil(h / LINE) + 2;
      cols = Array.from({ length: n }, () => ({
        y: Math.random() * h, speed: 6 + Math.random() * 22,
        chars: Array.from({ length: rows }, rand),
        hot: Math.random() < 0.08,
      }));
      readColors();
    };
    const draw = (dt) => {
      ctx.clearRect(0, 0, w, h);
      ctx.font = "11px ui-monospace, SFMono-Regular, Menlo, monospace";
      ctx.textBaseline = "top";
      cols.forEach((c, i) => {
        c.y = (c.y + c.speed * dt) % LINE;
        if (Math.random() < 0.04) c.chars[(Math.random() * c.chars.length) | 0] = rand();
        ctx.fillStyle = c.hot ? accent : color;
        for (let k = 0; k < c.chars.length; k++) {
          const y = c.y + (k - 1) * LINE;
          ctx.globalAlpha = (c.hot ? 0.26 : 0.13) * (0.35 + 0.65 * Math.abs(Math.sin(k * 0.7 + i)));
          ctx.fillText(c.chars[k], i * STEP + 2, y);
        }
      });
      ctx.globalAlpha = 1;
    };

    setup();
    const ro = new ResizeObserver(() => { setup(); draw(0); });
    ro.observe(canvas);
    const mo = new MutationObserver(readColors);
    const skinEl = canvas.closest(".bm");
    if (skinEl) mo.observe(skinEl, { attributes: true, attributeFilter: ["data-skin", "data-cheat"] });
    if (reduce) { draw(0); return () => { ro.disconnect(); mo.disconnect(); }; }

    let raf = 0, last = 0, acc = 0, visible = true;
    const loop = (now) => {
      const dt = Math.min((now - (last || now)) / 1000, 0.1); last = now; acc += dt;
      if (acc >= 1 / FPS) { draw(acc); acc = 0; }
      raf = requestAnimationFrame(loop);
    };
    const play = () => { cancelAnimationFrame(raf); last = 0; raf = requestAnimationFrame(loop); };
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; visible && !document.hidden ? play() : cancelAnimationFrame(raf); });
    io.observe(canvas);
    const onVis = () => (visible && !document.hidden ? play() : cancelAnimationFrame(raf));
    document.addEventListener("visibilitychange", onVis);
    return () => { cancelAnimationFrame(raf); io.disconnect(); ro.disconnect(); mo.disconnect(); document.removeEventListener("visibilitychange", onVis); };
  }, []);
  return <canvas ref={ref} className="number-rain" aria-hidden="true" />;
}
