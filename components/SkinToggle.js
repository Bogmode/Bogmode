"use client";
import { useSkin } from "./SkinProvider";

export default function SkinToggle() {
  const { skin, setSkin } = useSkin();
  return (
    <div className="skin" role="group" aria-label="Color theme">
      <span className="lbl">SKIN</span>
      <button aria-pressed={skin === "asiimov"} className={skin === "asiimov" ? "on" : ""} onClick={() => setSkin("asiimov")}>ASIIMOV</button>
      <button aria-pressed={skin === "vulcan"} className={skin === "vulcan" ? "on" : ""} onClick={() => setSkin("vulcan")}>VULCAN</button>
    </div>
  );
}
