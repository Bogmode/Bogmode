"use client";
import { useEffect, useState } from "react";
import useModelMotion from "./useModelMotion";
import Script from "next/script";
const models = [
  { id: "golden-hour", label: "Golden hour", src: "/models/golden-hour.glb" },
  { id: "neon-summer", label: "Neon summer", src: "/models/neon-summer.glb" },
  { id: "golden-recline", label: "Golden recline", src: "/models/golden-recline.glb" },
  { id: "tropical", label: "Tropical", src: "/models/tropical.glb" },
];
export default function ModelBay() {
  const [selected, setSelected] = useState(0);
  const [status, setStatus] = useState("loading");
  const [spinning, setSpinning] = useState(true);
  const model = models[selected];
  const modelRef = useModelMotion(model.id, spinning);
  useEffect(() => {
    const viewer = modelRef.current;
    const loaded = () => setStatus("ready");
    const failed = () => setStatus("error");
    viewer.addEventListener("load", loaded);
    viewer.addEventListener("error", failed);
    if (viewer.loaded) loaded();
    return () => { viewer.removeEventListener("load", loaded); viewer.removeEventListener("error", failed); };
  }, [selected, modelRef]);
  return <figure className="model-bay" id="bogdan-in-3d">
    <Script type="module" src="https://ajax.googleapis.com/ajax/libs/model-viewer/4.1.0/model-viewer.min.js" strategy="afterInteractive" onError={() => setStatus("error")} />
    <div className="model-topline"><span>THE HUMAN BEHIND THE WIZARDRY</span><span>3D / {String(selected + 1).padStart(2,"0")}</span></div>
    <div className="model-stage">
      {status !== "ready" && <div className="model-fallback" role="status"><span className="model-loading-mark" aria-hidden="true">3D</span><p className="model-status">{status === "error" ? "This model could not load. Try another portrait." : "Loading 3D portrait…"}</p></div>}
      <model-viewer ref={modelRef} key={model.id} src={model.src} alt={`A playful 3D portrait of Bogdan: ${model.label}`} camera-controls touch-action="pan-y" auto-rotate-delay="1800" rotation-per-orbit="30deg" camera-orbit="0deg 80deg 105%" min-camera-orbit="auto 45deg 75%" max-camera-orbit="auto 100deg 140%" field-of-view="28deg" interaction-prompt="none" shadow-intensity="0.8" exposure="1" loading="lazy" />
    </div>
    <div className="model-choices" role="group" aria-label="Choose a 3D portrait">{models.map((item,i) => <button key={item.id} type="button" aria-pressed={selected===i} onClick={() => { if (i!==selected) { setStatus("loading"); setSelected(i); } }}>{item.label}</button>)}<button type="button" aria-pressed={!spinning} onClick={() => setSpinning(!spinning)}>{spinning ? "Pause rotation" : "Rotate"}</button></div>
    <figcaption><span>DRAG TO TURN · SCROLL TO ZOOM</span><span>A DIFFERENT DIMENSION.</span></figcaption>
  </figure>;
}
