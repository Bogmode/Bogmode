"use client";
import { createContext, useContext, useState } from "react";

const SkinCtx = createContext({ skin: "asiimov", setSkin: () => {} });
export function useSkin() { return useContext(SkinCtx); }

export default function SkinProvider({ children }) {
  const [skin, setSkin] = useState("asiimov");
  return (
    <SkinCtx.Provider value={{ skin, setSkin }}>
      <div className="bm" data-skin={skin}>{children}</div>
    </SkinCtx.Provider>
  );
}
