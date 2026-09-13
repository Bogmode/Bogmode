"use client";

import useModelMotion from "./useModelMotion";
import Script from "next/script";
import { useSkin } from "./SkinProvider";

const models = {
  green: "/models/bogdan-asiimov.glb",
  asiimov: "/models/bogdan-asiimov.glb",
  vulcan: "/models/bogdan-vulcan.glb",
  manticore: "/models/golden-hour.glb",
  donatello: "/models/neon-summer.glb",
};

export default function HeroModel() {
  const { skin, hasSelectedSkin } = useSkin();
  const loadout = hasSelectedSkin ? skin : "green";
  const label = loadout === "green" ? "FIELD / GREEN" : loadout === "asiimov" ? "ASIIMOV / ORANGE" : loadout === "vulcan" ? "VULCAN / CYAN" : loadout === "manticore" ? "MANTICORE / LIME" : "DONATELLO / PINK";

  const modelRef = useModelMotion(loadout);

  return (
    <figure className={`hero-model ${loadout}`}>
      <Script type="module" src="https://ajax.googleapis.com/ajax/libs/model-viewer/4.1.0/model-viewer.min.js" strategy="afterInteractive" />
      <div className="hero-model-head"><span>BOGDAN / 3D</span><span>{label}</span></div>
      <div className="hero-model-stage">
        <model-viewer ref={modelRef} key={loadout} src={models[loadout]} alt={`3D model of Bogdan, ${label.toLowerCase()} loadout`} camera-controls touch-action="pan-y" auto-rotate-delay="1300" rotation-per-orbit="28deg" camera-orbit="28deg 76deg 108%" min-camera-orbit="auto 55deg 80%" max-camera-orbit="auto 90deg 135%" field-of-view="26deg" interaction-prompt="none" shadow-intensity="0.7" exposure="1" loading="lazy" />
        <span className="hero-model-crosshair" aria-hidden="true" />
      </div>
      <figcaption>DRAG TO INSPECT <span>SKIN-SYNCED</span></figcaption>
    </figure>
  );
}
