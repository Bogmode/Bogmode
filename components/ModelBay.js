"use client";

import useModelMotion from "./useModelMotion";
import Script from "next/script";
import { useSkin } from "./SkinProvider";

const models = {
  asiimov: "/models/bogdan-asiimov.glb",
  vulcan: "/models/bogdan-vulcan.glb",
};

export default function ModelBay() {
  const { skin } = useSkin();
  const isAsiimov = skin === "asiimov";

  const modelRef = useModelMotion(skin);

  return (
    <figure className="model-bay">
      <Script type="module" src="https://ajax.googleapis.com/ajax/libs/model-viewer/4.1.0/model-viewer.min.js" strategy="afterInteractive" />
      <div className="model-topline"><span>OPERATOR MODEL</span><span>{isAsiimov ? "ASIIMOV LOADOUT" : "VULCAN LOADOUT"}</span></div>
      <div className="model-stage">
        <model-viewer ref={modelRef}
          key={skin}
          src={models[skin]}
          alt={`3D model of Bogdan in the ${isAsiimov ? "Asiimov" : "Vulcan"} loadout`}
          camera-controls touch-action="pan-y" auto-rotate-delay="1800" rotation-per-orbit="35deg"
          camera-orbit="35deg 78deg 105%" min-camera-orbit="auto 55deg 78%" max-camera-orbit="auto 90deg 135%"
          field-of-view="28deg" interaction-prompt="none" shadow-intensity="0.8" exposure="1" loading="lazy"
        />
        <span className="model-axis axis-x" aria-hidden="true" /><span className="model-axis axis-y" aria-hidden="true" /><span className="model-reticle" aria-hidden="true" />
      </div>
      <figcaption><span>DRAG TO INSPECT</span><span>MODEL 01 / {isAsiimov ? "ORANGE" : "CYAN"}</span></figcaption>
    </figure>
  );
}
