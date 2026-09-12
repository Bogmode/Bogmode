"use client";
import { createContext, useContext, useState } from "react";

const SkinCtx = createContext({ skin: "asiimov", setSkin: () => {} });
export function useSkin() { return useContext(SkinCtx); }

export default function SkinProvider({ children }) {
  const [skin, setSkin] = useState("asiimov");
  const [hasSelectedSkin, setHasSelectedSkin] = useState(false);
  const selectSkin = (nextSkin) => {
    setHasSelectedSkin(true);
    setSkin(nextSkin);
  };
  return (
    <SkinCtx.Provider value={{ skin, setSkin: selectSkin, hasSelectedSkin }}>
      <div className="bm" data-skin={skin}>{children}</div>
    </SkinCtx.Provider>
  );
}
