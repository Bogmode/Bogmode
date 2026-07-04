"use client";
import { useSkin } from "./SkinProvider";

export default function SkinToggle() {
  const { skin, setSkin } = useSkin();
  return (
    <div className="skin">
      <span className="lbl">SKIN</span>
      <button className={skin === "asiimov" ? "on" : ""} onClick={() => setSkin("asiimov")}>ASIIMOV</button>
      <button className={skin === "vulcan" ? "on" : ""} onClick={() => setSkin("vulcan")}>VULCAN</button>
    </div>
  );
}
