"use client";
import { useEffect, useRef, useState } from "react";

export default function SystemPulse() {
  const ref = useRef(null);
  const [running, setRunning] = useState(false);
  useEffect(() => {
    let visible = false;
    const update = () => setRunning(visible && !document.hidden);
    const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; update(); });
    io.observe(ref.current);
    document.addEventListener("visibilitychange", update);
    return () => { io.disconnect(); document.removeEventListener("visibilitychange", update); };
  }, []);
  return (
    <div ref={ref} className="system-pulse" data-running={running} aria-label="Animated system signal" role="img">
      <div className="pulse-head"><span className="pulse-dot" aria-hidden="true" /><span>SYSTEM SIGNAL</span><span className="pulse-state">ACTIVE</span></div>
      <svg className="pulse-diagram" viewBox="0 0 240 88" aria-hidden="true">
        <path className="signal-route" d="M30 52 L96 24 L156 64 L210 32" />
        <path className="signal-packet" d="M30 52 L96 24 L156 64 L210 32" pathLength="100" />
        {[[30,52],[96,24],[156,64],[210,32]].map(([x,y]) => <rect key={x} className="signal-node" x={x-3} y={y-3} width="6" height="6" />)}
      </svg>
    </div>
  );
}
