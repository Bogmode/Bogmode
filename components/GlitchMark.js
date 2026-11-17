"use client";
import { useEffect, useRef, useState } from "react";

// БОГMODE wordmark that glitches into GODMODE every few seconds (and on hover).
export default function GlitchMark({ className = "" }) {
  const [glitch, setGlitch] = useState(false);
  const [god, setGod] = useState(false);
  const timers = useRef([]);

  const fire = useRef(() => {});
  fire.current = () => {
    const t = timers.current;
    setGlitch(true);
    t.push(setTimeout(() => setGod(true), 80));
    t.push(setTimeout(() => setGod(false), 420));
    t.push(setTimeout(() => setGlitch(false), 560));
  };

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = timers.current;
    let loop;
    const schedule = () => {
      loop = setTimeout(() => { if (!document.hidden) fire.current(); schedule(); }, 3800 + Math.random() * 4200);
    };
    t.push(setTimeout(() => fire.current(), 900));
    schedule();
    return () => { clearTimeout(loop); t.forEach(clearTimeout); t.length = 0; };
  }, []);

  const head = god ? "GOD" : "БОГ";
  return (
    <span
      className={`glitch${glitch ? " is-glitching" : ""} ${className}`}
      data-text={`${head}MODE`}
      aria-label="БОГMODE"
      onMouseEnter={() => { if (!glitch && !matchMedia("(prefers-reduced-motion: reduce)").matches) fire.current(); }}
    >
      <span aria-hidden="true"><span className="cy">{head}</span>MODE</span>
    </span>
  );
}
