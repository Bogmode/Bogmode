"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import config from "@/content/feeds.json";
export default function FeedEmbed({ provider, videoId, postId }) {
  const [allowed, setAllowed] = useState(false);
  const [timedOut, setTimedOut] = useState(false);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { if (!allowed || loaded) return; const timer = setTimeout(() => setTimedOut(true), 10000); return () => clearTimeout(timer); }, [allowed, loaded]);
  const youtube = provider === "YouTube";
  const linkedin = provider === "LinkedIn";
  const profile = youtube ? `https://www.youtube.com/watch?v=${videoId}` : linkedin ? config.linkedinProfile : config.instagramProfile;
  const src = youtube ? `https://www.youtube-nocookie.com/embed/${videoId}` : linkedin ? `https://www.linkedin.com/embed/feed/update/urn:li:activity:${postId}` : `${config.instagramProfile.replace(/\/$/, "")}/embed/`;
  return <div className="feed-embed">
    {allowed ? <><p className="contact-note">{provider} preview · <a href={profile} target="_blank" rel="noreferrer">Open original ↗</a></p>{timedOut ? <p role="status">The preview could not be loaded. Use the original link below.</p> : <iframe onLoad={() => setLoaded(true)} src={src} title={`${provider} ${youtube ? "video" : linkedin ? "post" : "profile: @bogmoder"}`} className={youtube ? "video-embed" : "instagram-embed"} allow="fullscreen; picture-in-picture" referrerPolicy="strict-origin-when-cross-origin" />}<button className="feed-control" onClick={() => { setAllowed(false); setLoaded(false); setTimedOut(false); }}>UNLOAD {provider.toUpperCase()}</button></> : <div className="feed-consent"><p>Load the {provider} preview? {provider} receives your browser information and may use cookies.</p><button className="action secondary" onClick={() => setAllowed(true)}>LOAD {provider.toUpperCase()}</button><Link href="/privacy">Privacy details</Link></div>}
    <p className="contact-note"><a href={profile} rel="noreferrer" target="_blank">OPEN {provider.toUpperCase()} ↗</a>{!youtube && !linkedin && " · Reposts are best viewed on Instagram."}</p>
  </div>;
}
