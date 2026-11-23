"use client";
import { useState } from "react";

// The embed follows the visitor's skin.
const withSkin = (src) => {
  const skin = typeof document !== "undefined" && document.querySelector(".bm")?.dataset.skin;
  return skin ? `${src}${src.includes("?") ? "&" : "?"}skin=${skin}` : src;
};

// Demo-first: the project page opens on something you can touch.
// Nothing loads until the visitor asks for it, so the page stays light and still.
export default function DemoStage({ src, poster, title, fullHref }) {
  const [on, setOn] = useState(false);
  return (
    <div className="demo-stage">
      {on ? (
        <iframe src={withSkin(src)} title={`${title} — interactive demo`} sandbox="allow-scripts" allow="autoplay" />
      ) : (
        <button type="button" className="demo-start" onClick={() => setOn(true)} style={poster ? { backgroundImage: `url(${poster})` } : undefined}>
          <span className="demo-play">PLAY {title.toUpperCase()} →</span>
        </button>
      )}
      <div className="demo-bar">
        <span>{on ? "LIVE" : "TAP TO LOAD"}</span>
        {fullHref && <a href={fullHref}>FULL SCREEN →</a>}
      </div>
    </div>
  );
}
