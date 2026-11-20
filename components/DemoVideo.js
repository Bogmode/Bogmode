"use client";
import { useEffect, useRef, useState } from "react";

// Click-to-play demo video. Sources attach only when the player nears the
// viewport (lazy). Never autoplays; pauses off-screen and in background tabs.
export default function DemoVideo({ sources, poster, captions, label }) {
  const ref = useRef(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") { setNear(true); return; }
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setNear(true);
      else if (!el.paused) el.pause();
    }, { rootMargin: "300px 0px" });
    io.observe(el);
    const onHidden = () => { if (document.hidden && !el.paused) el.pause(); };
    document.addEventListener("visibilitychange", onHidden);
    return () => { io.disconnect(); document.removeEventListener("visibilitychange", onHidden); };
  }, []);

  return (
    <video ref={ref} className="demo-video" controls playsInline preload={near ? "metadata" : "none"} poster={poster} aria-label={label}>
      {near && sources.map((s) => <source key={s.src} src={s.src} type={s.type} />)}
      {near && captions && <track kind="captions" src={captions} srcLang="en" label="English" default />}
    </video>
  );
}
