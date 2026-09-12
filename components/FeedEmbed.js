"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
export default function FeedEmbed({ provider, videoId }) {
  const [allowed, setAllowed] = useState(false);
  const [timedOut, setTimedOut] = useState(false);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { if (!allowed || loaded) return; const timer = setTimeout(() => setTimedOut(true), 10000); return () => clearTimeout(timer); }, [allowed, loaded]);
  const youtube = provider === "YouTube";
  const src = youtube ? `https://www.youtube-nocookie.com/embed/${videoId}` : "https://www.instagram.com/bogmoder/embed/";
  return <div className="feed-embed">
    {allowed ? <><p className="contact-note">{youtube ? "Video provided by YouTube." : <>Instagram preview. <a href="https://www.instagram.com/bogmoder/" target="_blank" rel="noreferrer">Open @bogmoder directly</a> if nothing appears.</>}</p>{timedOut ? <p role="status">The preview could not be loaded. Please use the original channel link.</p> : <iframe onLoad={() => setLoaded(true)} src={src} title={youtube ? "YouTube video" : "Instagram profile: @bogmoder"} className={youtube ? "video-embed" : "instagram-embed"} allow="fullscreen; picture-in-picture" referrerPolicy="strict-origin-when-cross-origin" />}<button className="feed-control" onClick={() => { setAllowed(false); setLoaded(false); setTimedOut(false); }}>UNLOAD {provider.toUpperCase()}</button></> : <div className="feed-consent"><p>Load {provider} here? It will receive your IP address and browser information and may use cookies or similar storage.</p><button className="action secondary" onClick={() => setAllowed(true)}>LOAD {provider.toUpperCase()}</button><Link href="/privacy">Privacy details</Link></div>}
    <p className="contact-note">{youtube ? "You can also watch using the video link above." : <>If the profile preview is unavailable, <a href="https://www.instagram.com/bogmoder/" rel="noreferrer" target="_blank">open @bogmoder on Instagram</a>. Reposts may only be visible on Instagram.</>}</p>
  </div>;
}
