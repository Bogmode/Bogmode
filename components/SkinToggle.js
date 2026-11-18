"use client";
import { useState } from "react";
import { useSkin } from "./SkinProvider";
import TotemSelect from "./game/TotemSelect";

export default function SkinToggle() {
  const { skin, setSkin } = useSkin();
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="skin" role="group" aria-label="Color theme">
        <button className="skin-select" onClick={() => setOpen(true)} aria-haspopup="dialog">◆ FORM</button>
        <span className="lbl">SKIN</span>
        {["asiimov","vulcan","manticore","donatello","mono"].map(name => <button key={name} aria-pressed={skin === name} className={skin === name ? "on" : ""} onClick={() => setSkin(name)}>{name.toUpperCase()}</button>)}
      </div>
      <TotemSelect open={open} onClose={() => setOpen(false)} />
    </>
  );
}
