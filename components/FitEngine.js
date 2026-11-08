"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import SystemFlow from "./SystemFlow";
import engine from "@/content/engine.json";
import styles from "./FitEngine.module.css";

const roleById = Object.fromEntries(engine.roles.map((r) => [r.id, r]));
const problemById = Object.fromEntries(engine.problems.map((p) => [p.id, p]));

function rank(selected, systems) {
  const scores = {};
  selected.forEach((id) => {
    problemById[id].systems.forEach((slug, i) => {
      scores[slug] = (scores[slug] || 0) + (3 - Math.min(i, 2));
    });
  });
  const max = Math.max(1, ...Object.values(scores));
  return systems
    .filter((s) => scores[s.slug])
    .map((s) => ({
      ...s,
      score: scores[s.slug] / max,
      why: selected.filter((id) => problemById[id].systems.includes(s.slug)).map((id) => problemById[id].label),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}

export default function FitEngine({ systems, email }) {
  const [role, setRole] = useState(null);
  const [selected, setSelected] = useState([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const r = q.get("role");
    const p = (q.get("p") || "").split(",").filter((id) => problemById[id]);
    if (roleById[r]) setRole(r);
    if (p.length) setSelected(p);
    else if (roleById[r]) setSelected(roleById[r].problems);
  }, []);

  useEffect(() => {
    const q = new URLSearchParams();
    if (role) q.set("role", role);
    if (selected.length) q.set("p", selected.join(","));
    const qs = q.toString();
    window.history.replaceState(null, "", qs ? `?${qs}` : window.location.pathname);
  }, [role, selected]);

  function pickRole(id) {
    setRole(id);
    setSelected(roleById[id].problems);
  }

  function toggle(id) {
    setSelected((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]));
  }

  const matches = useMemo(() => rank(selected, systems), [selected, systems]);
  const skills = useMemo(() => [...new Set(selected.flatMap((id) => problemById[id].skills))], [selected]);
  const moves = selected.map((id) => problemById[id].move);
  const roleLabel = role ? roleById[role].label : "your team";

  const brief = [
    `Role: ${roleLabel}`,
    `What needs fixing: ${selected.map((id) => problemById[id].label).join(" · ")}`,
    "",
    "Hi Bogdan — I used the fit engine on bogmode.ca. Here's a bit more context about the team and the role:",
    "",
  ].join("\n");

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className={styles.engine}>
      <div className={styles.step}>
        <span className={styles.num}>01</span>
        <div>
          <h2>Which role are you hiring for?</h2>
          <div className={styles.chips} role="group" aria-label="Choose a role">
            {engine.roles.map((r) => (
              <button key={r.id} type="button" aria-pressed={role === r.id} onClick={() => pickRole(r.id)}>{r.label}</button>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.step}>
        <span className={styles.num}>02</span>
        <div>
          <h2>What is breaking right now?</h2>
          <p className={styles.hint}>Pick a role to preselect the usual suspects, or choose your own.</p>
          <div className={styles.chips} role="group" aria-label="Choose problems">
            {engine.problems.map((p) => (
              <button key={p.id} type="button" aria-pressed={selected.includes(p.id)} onClick={() => toggle(p.id)}>{p.label}</button>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.readout} aria-live="polite">
        {selected.length === 0 ? (
          <div className={styles.empty}>
            <span className={styles.kicker}>READOUT — STANDBY</span>
            <p>Select a role or a problem. The engine will pull the matching proof, the tools involved, and a first-90-days plan.</p>
          </div>
        ) : (
          <>
            <div className={styles.readHead}>
              <span className={styles.kicker}>READOUT — {roleLabel.toUpperCase()}</span>
              <button type="button" className={styles.copy} onClick={copyLink}>{copied ? "LINK COPIED ✓" : "COPY SHAREABLE LINK"}</button>
            </div>

            <h3 className={styles.blockTitle}>Closest proof</h3>
            <div className={styles.matches}>
              {matches.map((m) => (
                <Link key={m.slug} href={`/systems/${m.slug}`} className={styles.match}>
                  <div className={styles.matchMeta}><span>{m.cat}</span><span>{m.status}</span></div>
                  <h4>{m.title}</h4>
                  <div className={styles.bar} aria-label={`Relevance ${Math.round(m.score * 100)} percent`}><i style={{ width: `${Math.round(m.score * 100)}%` }} /></div>
                  <p className={styles.why}>Relevant to: {m.why.join(" · ")}</p>
                  <span className={styles.open}>OPEN CASE →</span>
                </Link>
              ))}
            </div>
            {matches[0] && <SystemFlow key={matches[0].slug} kind={matches[0].slug} compact />}

            <h3 className={styles.blockTitle}>Tools and skills that apply</h3>
            <div className="chips">{skills.map((s) => <span className="chip" key={s}>{s}</span>)}</div>

            <h3 className={styles.blockTitle}>First 90 days</h3>
            <ol className={styles.plan}>
              {engine.plan.map((p) => (
                <li key={p.phase}>
                  <span className={styles.phase}>{p.phase}</span>
                  <strong>{p.label}</strong>
                  {p.copy.includes("{moves}") ? (
                    <>
                      <p>{p.copy.replace("{moves}", "")}</p>
                      <ul>{moves.map((m) => <li key={m}>{m}</li>)}</ul>
                    </>
                  ) : <p>{p.copy}</p>}
                </li>
              ))}
            </ol>
            <p className={styles.fine}>An illustrative starting plan. The real one starts by listening to your team.</p>

            <div className={styles.cta}>
              <Link href={`/contact?brief=${encodeURIComponent(brief)}`} className="action primary">SEND THIS BRIEF →</Link>
              <a href={`mailto:${email}?subject=${encodeURIComponent(`[bogmode.ca] ${roleLabel}`)}&body=${encodeURIComponent(brief)}`} className="action secondary">EMAIL DIRECT</a>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
