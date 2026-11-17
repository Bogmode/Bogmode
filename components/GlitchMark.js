"use client";
import { useEffect, useRef, useState } from "react";

// БОГMODE wordmark that melts into GODMODE and back every few seconds (and on hover).
export default function GlitchMark({ className = "" }) {
  const [god, setGod] = useState(false);
  const [busy, setBusy] = useState(false);
  const timers = useRef([]);
  const fire = useRef(() => {});
  fire.current = () => {
    const t = timers.current;
    setBusy(true);
    setGod(true);
    t.push(setTimeout(() => setGod(false), 1500));
    t.push(setTimeout(() => setBusy(false), 2300));
  };

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = timers.current;
    let loop;
    const schedule = () => {
      loop = setTimeout(() => { if (!document.hidden) fire.current(); schedule(); }, 6500 + Math.random() * 4500);
    };
    t.push(setTimeout(() => fire.current(), 1200));
    schedule();
    return () => { clearTimeout(loop); t.forEach(clearTimeout); t.length = 0; };
  }, []);

  return (
    <span
      className={`glitch${god ? " is-god" : ""} ${className}`}
      aria-label="БОГMODE"
      onMouseEnter={() => { if (!busy && !matchMedia("(prefers-reduced-motion: reduce)").matches) fire.current(); }}
    >
      <span className="g-word g-bog" aria-hidden="true"><span className="cy">БОГ</span>MODE</span>
      <span className="g-word g-god" aria-hidden="true"><span className="cy">GOD</span>MODE</span>
    </span>
  );
}
