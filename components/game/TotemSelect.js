"use client";
import { useEffect, useRef, useState } from "react";
import { useSkin } from "../SkinProvider";
import TotemMark from "../TotemMark";
import { TOTEM_CARDS } from "./totemData";

// "Choose your totem" screen. Arrow keys move, Enter picks, Esc closes.
export default function TotemSelect({ open, onClose }) {
  const { skin, setSkin } = useSkin();
  const start = Math.max(0, TOTEM_CARDS.findIndex((c) => c.skin === skin));
  const [focus, setFocus] = useState(start);
  const cards = useRef([]);

  useEffect(() => { if (open) setFocus(start); }, [open]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => { if (open) cards.current[focus]?.focus(); }, [open, focus]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" || e.key === "ArrowDown") { e.preventDefault(); setFocus((f) => (f + 1) % TOTEM_CARDS.length); }
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") { e.preventDefault(); setFocus((f) => (f - 1 + TOTEM_CARDS.length) % TOTEM_CARDS.length); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;
  const pick = (c) => { setSkin(c.skin); onClose(); };

  return (
    <div className="totem-select" role="dialog" aria-modal="true" aria-label="Choose your totem" onClick={onClose}>
      <div className="ts-panel" onClick={(e) => e.stopPropagation()}>
        <div className="ts-head">
          <span>PLAYER 1</span>
          <strong>CHOOSE YOUR TOTEM</strong>
          <button className="ts-close" onClick={onClose} aria-label="Close">ESC ✕</button>
        </div>
        <div className="ts-grid">
          {TOTEM_CARDS.map((c, i) => (
            <button
              key={c.skin}
              ref={(el) => (cards.current[i] = el)}
              data-skin-preview={c.skin}
              className={`ts-card${c.skin === skin ? " current" : ""}${i === focus ? " focus" : ""}`}
              onMouseEnter={() => setFocus(i)}
              onFocus={() => setFocus(i)}
              onClick={() => pick(c)}
            >
              <span className="ts-skin">{c.skin.toUpperCase()}</span>
              <TotemMark totem={c.totem} size={92} />
              <span className="ts-name">{c.totem.toUpperCase()}</span>
              <span className="ts-div">{c.division} · {c.role}</span>
              <span className="ts-stats">
                {c.stats.map(([k, v]) => (
                  <span className="ts-stat" key={k}><span>{k}</span><i style={{ "--v": v }} /><b>{v}</b></span>
                ))}
              </span>
              <span className="ts-line">{c.line}</span>
              <span className="ts-pick">{c.skin === skin ? "SELECTED" : "PRESS TO SELECT"}</span>
            </button>
          ))}
        </div>
        <p className="ts-foot">← → MOVE · ENTER SELECT · ESC CLOSE</p>
      </div>
    </div>
  );
}
