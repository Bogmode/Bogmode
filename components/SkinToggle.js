"use client";
import { useSkin } from "./SkinProvider";
export default function SkinToggle() {
  const { skin, setSkin } = useSkin();
  return <div className="skin" role="group" aria-label="Color theme"><span className="lbl">SKIN</span>{["asiimov","vulcan","manticore","donatello"].map(name => <button key={name} aria-pressed={skin === name} className={skin === name ? "on" : ""} onClick={() => setSkin(name)}>{name.toUpperCase()}</button>)}</div>;
}
