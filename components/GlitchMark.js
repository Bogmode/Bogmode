"use client";
import { useEffect, useState } from "react";

// БОГMODE wordmark that melts into GODMODE and back.
// One shared clock: every wordmark on the page melts at the same moment (and on hover, locally).

const subscribers = new Set();
let loop = 0;
function startClock() {
  if (loop || typeof window === "undefined") return;
  const tick = () => {
    loop = setTimeout(() => { if (!document.hidden) subscribers.forEach((fn) => fn()); tick(); }, 6500 + Math.random() * 4500);
  };
  setTimeout(() => subscribers.forEach((fn) => fn()), 1200);
  tick();
}

export default function GlitchMark({ className = "" }) {
  const [god, setGod] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timers = [];
    const fire = () => {
      setBusy(true); setGod(true);
      timers.push(setTimeout(() => setGod(false), 1500));
      timers.push(setTimeout(() => setBusy(false), 2300));
    };
    subscribers.add(fire);
    startClock();
    return () => { subscribers.delete(fire); timers.forEach(clearTimeout); };
  }, []);

  const onHover = () => {
    if (busy || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setBusy(true); setGod(true);
    setTimeout(() => setGod(false), 1500);
    setTimeout(() => setBusy(false), 2300);
  };

  return (
    <span className={`glitch${god ? " is-god" : ""} ${className}`} aria-label="БОГMODE" onMouseEnter={onHover}>
      <span className="g-word g-bog" aria-hidden="true"><span className="cy">БОГ</span>MODE</span>
      <span className="g-word g-god" aria-hidden="true"><span className="cy">GOD</span>MODE</span>
    </span>
  );
}

// CSS-only version (no JS needed): melts on its own loop. Used where the page is still loading.
export function GlitchMarkAuto({ className = "" }) {
  return (
    <span className={`glitch glitch-auto ${className}`} aria-label="БОГMODE">
      <span className="g-word g-bog" aria-hidden="true"><span className="cy">БОГ</span>MODE</span>
      <span className="g-word g-god" aria-hidden="true"><span className="cy">GOD</span>MODE</span>
    </span>
  );
}
