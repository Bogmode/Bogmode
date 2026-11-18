"use client";
import { createContext, useContext, useEffect, useState } from "react";

const SkinCtx = createContext({ skin: "asiimov", setSkin: () => {} });
export function useSkin() { return useContext(SkinCtx); }

export default function SkinProvider({ children }) {
  const [skin, setSkin] = useState("asiimov");
  const [hasSelectedSkin, setHasSelectedSkin] = useState(false);
  // Remember the chosen totem between visits.
  useEffect(() => {
    try {
      const saved = localStorage.getItem("bm-skin");
      if (saved && ["asiimov", "vulcan", "manticore", "donatello", "mono"].includes(saved)) setSkin(saved);
    } catch {}
  }, []);
  const selectSkin = (nextSkin) => {
    setHasSelectedSkin(true);
    setSkin(nextSkin);
    try { localStorage.setItem("bm-skin", nextSkin); } catch {}
  };
  return (
    <SkinCtx.Provider value={{ skin, setSkin: selectSkin, hasSelectedSkin }}>
      <div className="bm" data-skin={skin}>{children}</div>
    </SkinCtx.Provider>
  );
}
