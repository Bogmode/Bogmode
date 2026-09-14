"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

// Basic consent mode: no Google script or measurement request before acceptance.
export default function GoogleAnalytics({ measurementId = "" }) {
  const pathname = usePathname();
  const [choice, setChoice] = useState(null);
  const [open, setOpen] = useState(false);
  const initialized = useRef(false);
  const lastPage = useRef("");
  const valid = /^G-[A-Z0-9]+$/.test(measurementId);
  const key = "analytics-consent-v1";
  useEffect(() => {
    try { const saved = JSON.parse(localStorage.getItem(key) || "null");
      if (saved && Date.now() - saved.at < 180 * 86400000 && ["accepted", "declined"].includes(saved.value)) { setChoice(saved.value); return; }
    } catch {}
    setOpen(true);
  }, []);
  useEffect(() => {
    if (!valid || choice !== "accepted") return;
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
    window["ga-disable-" + measurementId] = false;
    if (!initialized.current) {
      window.gtag("consent", "default", { analytics_storage: "denied", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" });
      window.gtag("consent", "update", { analytics_storage: "granted" });
      window.gtag("js", new Date());
      window.gtag("config", measurementId, { send_page_view: false, allow_google_signals: false, allow_ad_personalization_signals: false, cookie_expires: 15552000 });
      const script = document.createElement("script");
      script.src = "https://www.googletagmanager.com/gtag/js?id=" + measurementId;
      script.async = true;
      document.head.appendChild(script);
      initialized.current = true;
    }
    // Exclude private routes and strip queries/fragments, which can contain form or auth data.
    if (/^\/(api|auth|account|login|signin|signup|keystatic)(\/|$)/.test(pathname)) return;
    if (lastPage.current !== pathname) {
      window.gtag("event", "page_view", { page_location: location.origin + pathname, page_title: pathname, page_referrer: "" });
      lastPage.current = pathname;
    }
  }, [choice, pathname, valid, measurementId]);
  function save(value) {
    try { localStorage.setItem(key, JSON.stringify({ value, at: Date.now() })); } catch {}
    setChoice(value); setOpen(false);
    if (value === "declined") {
      window["ga-disable-" + measurementId] = true;
      // Remove first-party GA cookies without touching login/session cookies.
      for (const cookie of document.cookie.split(";")) {
        const name = cookie.split("=")[0].trim();
        if (!/^_ga(?:_|$)/.test(name)) continue;
        for (const domain of ["", location.hostname, "." + location.hostname]) {
          document.cookie = name + "=; Max-Age=0; path=/" + (domain ? "; domain=" + domain : "");
        }
      }
      if (initialized.current) location.reload();
    }
  }
  if (!valid) return null;
  return <aside className="analytics-consent" aria-label="Analytics privacy choices">
    {open ? <div className="analytics-consent-panel"><p>Allow usage statistics?</p><p>Google Analytics helps us understand which pages are useful. It uses cookies and receives technical browser information. It stays off unless you accept. <a href="/privacy">Privacy details</a></p><div><button type="button" onClick={() => save("accepted")}>Accept analytics</button><button type="button" onClick={() => save("declined")}>Decline analytics</button></div></div> : <button className="analytics-settings" type="button" onClick={() => setOpen(true)}>Analytics choices</button>}
  </aside>;
}
