"use client";
import { useEffect, useState } from "react";
import Script from "next/script";
import { useSkin } from "../SkinProvider";
import TotemMark from "../TotemMark";
import { TOTEM_CARDS } from "./totemData";

// About-page player card: studio photo or a live 3D half-body model. The totem follows the visitor's skin.
export default function PlayerCard({ portrait, model = "/models/bogdan-half.glb" }) {
  const { skin } = useSkin();
  const card = TOTEM_CARDS.find((c) => c.skin === skin) || TOTEM_CARDS[0];
  const [view, setView] = useState("photo");
  const [status, setStatus] = useState("idle");
  const [reduce, setReduce] = useState(false);
  useEffect(() => { setReduce(matchMedia("(prefers-reduced-motion: reduce)").matches); }, []);

  const rows = [
    ["CLASS", "Builder"],
    ["BASE", "Winnipeg, MB"],
    ["TOTEM", `${card.totem[0].toUpperCase()}${card.totem.slice(1)} (yours, not mine)`],
    ["LANGUAGES", "EN · UA · RU"],
    ["SIDE QUESTS", "FPV drones · Muay Thai"],
    ["STATUS", "Open to good ideas"],
  ];

  return (
    <figure className="player-card">
      <div className="pc-head">
        <span>PLAYER PROFILE</span>
        <span className="pc-views" role="tablist" aria-label="Portrait view">
          <button role="tab" aria-selected={view === "photo"} className={view === "photo" ? "on" : ""} onClick={() => setView("photo")}>PHOTO</button>
          <button role="tab" aria-selected={view === "3d"} className={view === "3d" ? "on" : ""} onClick={() => { setView("3d"); if (status === "idle") setStatus("loading"); }}>3D</button>
        </span>
      </div>
      <div className={`pc-photo pc-${view}`}>
        {view === "photo" && portrait && <img src={portrait} alt="Bogdan, studio portrait in orange-tinted glasses and a navy work jacket" />}
        {view === "3d" && (
          <>
            <Script type="module" src="https://ajax.googleapis.com/ajax/libs/model-viewer/4.1.0/model-viewer.min.js" strategy="afterInteractive" onError={() => setStatus("error")} />
            <model-viewer
              src={model}
              alt="3D half-body model of Bogdan"
              camera-controls
              disable-zoom
              disable-pan
              touch-action="pan-y"
              {...(reduce ? {} : { "auto-rotate": "" })}
              auto-rotate-delay="800"
              rotation-per-orbit="22deg"
              camera-orbit="0deg 82deg 105%"
              min-camera-orbit="auto 70deg auto"
              max-camera-orbit="auto 95deg auto"
              field-of-view="26deg"
              interaction-prompt="none"
              shadow-intensity="0.6"
              exposure="1.05"
              onLoad={() => setStatus("ready")}
              ref={(el) => { if (el && !el.__bound) { el.__bound = true; el.addEventListener("load", () => setStatus("ready")); el.addEventListener("error", () => setStatus("error")); } }}
            />
            {status !== "ready" && <div className="pc-loading" role="status"><span>{status === "error" ? "3D UNAVAILABLE" : "LOADING MODEL"}</span></div>}
            <span className="pc-hint">DRAG TO TURN</span>
          </>
        )}
        <TotemMark totem={card.totem} size={58} className="pc-totem" />
      </div>
      <dl className="pc-stats">
        {rows.map(([k, v]) => (<div key={k}><dt>{k}</dt><dd>{v}</dd></div>))}
      </dl>
    </figure>
  );
}
