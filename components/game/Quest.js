"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useSkin } from "../SkinProvider";
import TotemMark from "../TotemMark";

// Exploration meter, achievements and the GODMODE cheat. Progress lives in this browser only.

const KEY = "bm-quest-v1";
const PLACES = ["/", "/systems", "/divisions/swarm", "/divisions/worlds", "/divisions/lab", "/divisions/tools", "/divisions/ventures", "/news", "/about", "/systems/nda"];
const ACHIEVEMENTS = [
  { id: "first-steps", name: "FIRST STEPS", hint: "Open any project", totem: "hare" },
  { id: "pack-leader", name: "PACK LEADER", hint: "Visit all five divisions", totem: "wolf" },
  { id: "scatterbrain", name: "SCATTERBRAIN", hint: "Scatter the swarm 10 times", totem: "manticore" },
  { id: "seen-god", name: "SAW GOD", hint: "Catch GODMODE with your cursor", totem: "dragon" },
  { id: "shapeshifter", name: "SHAPESHIFTER", hint: "Play as every form", totem: "bear" },
  { id: "cheater", name: "CHEATER", hint: "Find the cheat code", totem: "manticore" },
  { id: "cartographer", name: "CARTOGRAPHER", hint: "Explore the whole map", totem: "wolf" },
];
const KONAMI = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];

const load = () => {
  try { return { visited: [], ach: [], scatters: 0, totems: [], cheat: false, ...JSON.parse(localStorage.getItem(KEY) || "{}") }; }
  catch { return { visited: [], ach: [], scatters: 0, totems: [], cheat: false }; }
};
const save = (s) => { try { localStorage.setItem(KEY, JSON.stringify(s)); } catch {} };

export default function Quest() {
  const pathname = usePathname();
  const { skin } = useSkin();
  const [state, setState] = useState(null);
  const [toasts, setToasts] = useState([]);
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const update = useCallback((fn) => {
    setState((prev) => {
      if (!prev) return prev;
      const next = fn({ ...prev, visited: [...prev.visited], ach: [...prev.ach], totems: [...prev.totems] });
      const fresh = next.ach.filter((a) => !prev.ach.includes(a));
      if (fresh.length) {
        setToasts((t) => [...t, ...fresh.filter((id) => !t.some((x) => x.id === id)).map((id) => ({ id, key: `${id}-${Date.now()}` }))]);
      }
      save(next);
      return next;
    });
  }, []);

  const unlock = (s, id) => { if (!s.ach.includes(id)) s.ach.push(id); return s; };
  const checkMap = (s) => {
    const divs = PLACES.filter((p) => p.startsWith("/divisions/"));
    if (divs.every((d) => s.visited.includes(d))) unlock(s, "pack-leader");
    if (PLACES.every((p) => s.visited.includes(p))) unlock(s, "cartographer");
    return s;
  };

  // Load once.
  useEffect(() => { setState(load()); }, []);

  // Apply the cheat to the skin root.
  useEffect(() => {
    if (!state) return;
    const root = ref.current?.closest(".bm");
    if (!root) return;
    if (state.cheat) root.setAttribute("data-cheat", "god"); else root.removeAttribute("data-cheat");
    window.dispatchEvent(new Event("bm:recolor"));
  }, [state?.cheat]); // eslint-disable-line react-hooks/exhaustive-deps

  // Track pages.
  useEffect(() => {
    if (!state || !pathname) return;
    update((s) => {
      if (PLACES.includes(pathname) && !s.visited.includes(pathname)) s.visited.push(pathname);
      if (pathname.startsWith("/work/") || (pathname.startsWith("/systems/") && pathname !== "/systems/nda")) unlock(s, "first-steps");
      return checkMap(s);
    });
  }, [pathname, state === null]); // eslint-disable-line react-hooks/exhaustive-deps

  // Track totems played.
  useEffect(() => {
    if (!state) return;
    update((s) => {
      if (!s.totems.includes(skin)) s.totems.push(skin);
      if (s.totems.length >= 5) unlock(s, "shapeshifter");
      return s;
    });
  }, [skin, state === null]); // eslint-disable-line react-hooks/exhaustive-deps

  // Events from the scene and the wordmark, plus the cheat code.
  useEffect(() => {
    if (!state) return;
    const onScatter = () => update((s) => { s.scatters += 1; if (s.scatters >= 10) unlock(s, "scatterbrain"); return s; });
    const onGod = () => update((s) => unlock(s, "seen-god"));
    let buf = [], typed = "";
    const onKey = (e) => {
      if (e.target?.closest?.("input, textarea, [contenteditable]")) return;
      buf = [...buf, e.key.length === 1 ? e.key.toLowerCase() : e.key].slice(-KONAMI.length);
      typed = (typed + (e.key.length === 1 ? e.key.toLowerCase() : "")).slice(-7);
      if (KONAMI.every((k, i) => buf[i] === k) || typed === "godmode") {
        buf = []; typed = "";
        update((s) => { s.cheat = !s.cheat; return unlock(s, "cheater"); });
      }
    };
    window.addEventListener("bm:scatter", onScatter);
    window.addEventListener("bm:god", onGod);
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("bm:scatter", onScatter); window.removeEventListener("bm:god", onGod); window.removeEventListener("keydown", onKey); };
  }, [state === null, update]); // eslint-disable-line react-hooks/exhaustive-deps

  // Toasts fade out.
  useEffect(() => {
    if (!toasts.length) return;
    const t = setTimeout(() => setToasts((x) => x.slice(1)), 3600);
    return () => clearTimeout(t);
  }, [toasts]);

  if (!state) return <span ref={ref} hidden />;
  const seen = state.visited.filter((p) => PLACES.includes(p)).length;
  const pct = Math.round((seen / PLACES.length) * 100);

  return (
    <>
      <span ref={ref} hidden />
      <div className="quest-hud">
        <button className="quest-chip" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-controls="quest-panel">
          <span>EXPLORED {seen}/{PLACES.length}</span>
          <span className="quest-bar" aria-hidden="true"><i style={{ width: `${pct}%` }} /></span>
          <span className="quest-ach">★ {state.ach.length}/{ACHIEVEMENTS.length}</span>
          {state.cheat && <span className="quest-cheat">CHEATS ENABLED</span>}
        </button>
        {open && (
          <div className="quest-panel" id="quest-panel">
            <div className="quest-panel-head"><span>ACHIEVEMENTS</span><button onClick={() => setOpen(false)} aria-label="Close">✕</button></div>
            <ul>
              {ACHIEVEMENTS.map((a) => {
                const got = state.ach.includes(a.id);
                return (
                  <li key={a.id} className={got ? "got" : ""}>
                    <TotemMark totem={a.totem} size={26} />
                    <span><b>{got ? a.name : "???"}</b><small>{a.hint}</small></span>
                    <em>{got ? "UNLOCKED" : "LOCKED"}</em>
                  </li>
                );
              })}
            </ul>
            <p className="quest-tip">Saved in this browser only.</p>
          </div>
        )}
      </div>
      <div className="quest-toasts" aria-live="polite">
        {toasts.slice(0, 1).map((t) => {
          const a = ACHIEVEMENTS.find((x) => x.id === t.id);
          return (
            <div className="quest-toast" key={t.key}>
              <TotemMark totem={a.totem} size={34} />
              <span><small>ACHIEVEMENT UNLOCKED</small><b>{a.name}</b><em>{a.hint}</em></span>
            </div>
          );
        })}
      </div>
    </>
  );
}
