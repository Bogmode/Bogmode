"use client";
import Link from "next/link";
import { useState } from "react";
import Crosshair from "./Crosshair";

const STATUS = {
  idle: null,
  sending: "TRANSMITTING…",
  sent: "SENT — I read everything myself. Expect a reply.",
  error: null, // uses server-provided message
};

export default function ContactForm({ toEmail, deliveryAvailable = false }) {
  const [state, setState] = useState("idle");
  const [draft, setDraft] = useState("");
  const [errMsg, setErrMsg] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    if (state === "sending") return;
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    if (!deliveryAvailable) {
      setDraft(`mailto:${toEmail}?subject=${encodeURIComponent(`[bogmode.ca] ${data.name}`)}&body=${encodeURIComponent(`From: ${data.name} <${data.email}>\n\n${data.message}`)}`);
      setState("draft");
      return;
    }
    setState("sending");
    setErrMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || "Transmission failed.");
      setState("sent");
      form.reset();
    } catch (err) {
      setState("error");
      setErrMsg(err.message || "Transmission failed.");
    }
  }

  return (
    <form className="cform" onSubmit={onSubmit} onChange={() => { if (state === "draft") { setDraft(""); setState("idle"); } }}>
      {!deliveryAvailable && <p className="contact-note">Write your message here, then open it in your email app to send. Nothing is submitted through this form.</p>}
      {/* honeypot — bots fill it, humans never see it */}
      <input type="text" name="company_site" className="hp" tabIndex={-1} autoComplete="off" aria-hidden="true" />

      <div className="cf-row">
        <label className="cf-field">
          <span className="cf-label">NAME</span>
          <input name="name" autoComplete="name" type="text" required maxLength={120} placeholder="Your name" />
        </label>
        <label className="cf-field">
          <span className="cf-label">EMAIL</span>
          <input name="email" autoComplete="email" type="email" required maxLength={200} placeholder="you@yours.com" />
        </label>
      </div>

      <label className="cf-field">
        <span className="cf-label">MESSAGE</span>
        <textarea
          name="message"
          required
          minLength={10}
          maxLength={4000}
          rows={7}
          placeholder="What are you building, and where is it stuck?"
        />
      </label>

      <div className="cf-actions">
        <button type="submit" className="cf-send" disabled={state === "sending"}>
          <Crosshair size={13} />
          {state === "sending" ? "TRANSMITTING…" : deliveryAvailable ? "SEND" : "PREPARE EMAIL"}
        </button>
        <a className="cf-alt" href={`mailto:${toEmail}`}>OR EMAIL DIRECT → {toEmail}</a>
      </div>

      <p className="contact-note">Your details are used to respond to your inquiry. <Link href="/privacy">Privacy & cookies</Link>.</p>
      <div className="cf-status" role="status" aria-live="polite">
        {state === "draft" && <p>Email prepared — not sent. <a href={draft}>OPEN IN YOUR EMAIL APP →</a></p>}
        {state === "sent" && <span className="ok">▮ {STATUS.sent}</span>}
        {state === "error" && <span className="err">▮ FAILED — {errMsg}</span>}
      </div>
    </form>
  );
}
