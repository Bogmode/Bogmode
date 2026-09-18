"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./SystemFlow.module.css";

const flows = {
  hero: {
    title: "FROM FRICTION TO WORKING SYSTEM",
    stages: ["Messy process", "Rules + data", "Automation", "Clear next action"],
    note: "Map the work, structure the data, automate the repeatable parts, and keep people in control.",
    glyphs: ["records", "logic", "tools", "people"],
  },
  "revenue-lifecycle-engine": {
    title: "INQUIRY → OWNED NEXT ACTION",
    stages: ["New inquiry", "Qualification rules", "Owner + handoff", "Follow-up visibility"],
    note: "A commercial lifecycle works when every stage has clear data, ownership, and a next action.",
    glyphs: ["records", "logic", "people", "report"],
  },
  "business-intelligence": {
    title: "SCATTERED CONTEXT → SHARED SOURCE",
    stages: ["Commercial information", "Structure + maintain", "Shared context", "Team decisions"],
    note: "Bring important information together, keep it current, and make it useful to the people doing the work.",
    glyphs: ["records", "logic", "tools", "report"],
  },
  "ai-product-intelligence": {
    title: "DOCUMENT → REVIEWED RECORD",
    stages: ["Product source", "AI extraction", "Human review", "Structured record"],
    note: "Use AI to accelerate extraction while keeping validation and judgment in the loop.",
    glyphs: ["records", "search", "people", "report"],
  },
  automation: {
    title: "REPEAT REQUEST → RELIABLE HANDOFF",
    stages: ["Incoming request", "Check the rules", "Run the steps", "Review exceptions"],
    note: "An illustrative approach: automate routine steps and route exceptions to a person.",
    glyphs: ["records", "logic", "tools", "people"],
  },
  agents: {
    title: "CLEAR TASK → USEFUL ACTION",
    stages: ["Define the task", "Retrieve context", "Use the tools", "Check + hand off"],
    note: "An illustrative agent workflow, with review and human judgment where needed.",
    glyphs: ["records", "search", "tools", "people"],
  },
  upstreams: {
    title: "BYPRODUCT → POSSIBILITY",
    stages: ["Useful byproducts", "Create a listing", "Local discovery", "Potential recipient"],
    note: "A business lists a useful material. Someone nearby discovers a new possibility.",
    glyphs: ["material", "records", "search", "people"],
  },
  fiend: {
    title: "SMALL LOGS → VISIBLE PATTERNS",
    stages: ["Daily logs", "Collect entries", "Spot patterns", "Weekly report"],
    note: "Individual entries build a history. Stats and weekly reports make patterns visible.",
    glyphs: ["records", "material", "chart", "report"],
  },
  dronewashers: {
    title: "SERVICE IDEA → QUOTE JOURNEY",
    stages: ["Choose a service", "Project details", "Sample quote", "Demo preview"],
    note: "Explore the sample quote journey. This concept does not send service requests.",
    glyphs: ["tools", "records", "logic", "report"],
  },
};

function Glyph({ type }) {
  const paths = {
    records: "M-15-16H9V12H-15Z M-9-10H3 M-9-4H3 M-9 2H0 M-9 17H15V-11",
    logic: "M0-19L19 0 0 19-19 0Z M-9 0H9 M0-9V9",
    tools: "M-18-14H-4V0H-18Z M4 0H18V14H4Z M-4-7H11V0 M-11 0V7H4",
    report: "M-17-19H17V19H-17Z M-10 10V2 M0 10V-5 M10 10V-12 M-10 14H10",
    material: "M0-18L18-8V12L0 22-18 12V-8Z M-18-8L0 2 18-8 M0 2V22 M-9-13L9-3",
    search: "M9 9L21 21 M14 0A14 14 0 1 0-14 0A14 14 0 1 0 14 0 M-6 0H6 M0-6V6",
    people: "M-6-9A6 6 0 1 0-18-9A6 6 0 1 0-6-9 M18-9A6 6 0 1 0 6-9A6 6 0 1 0 18-9 M-22 17V10Q-12-3-2 10V17 M2 17V10Q12-3 22 10V17",
    chart: "M-20 16H20 M-17 10L-6-3 4 3 18-16 M-17 10V16 M-6-3V16 M4 3V16 M18-16V16",
  };
  return <path d={paths[type]} />;
}

export default function SystemFlow({ kind = "hero", compact = false }) {
  const flow = flows[kind];
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(true);
  useEffect(() => {
    if (!ref.current) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotion = () => setReduced(media.matches);
    syncMotion();
    let intersecting = false;
    const syncVisibility = () => setVisible(intersecting && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => {
      intersecting = entry.isIntersecting;
      syncVisibility();
    });
    observer.observe(ref.current);
    media.addEventListener("change", syncMotion);
    document.addEventListener("visibilitychange", syncVisibility);
    return () => {
      observer.disconnect();
      media.removeEventListener("change", syncMotion);
      document.removeEventListener("visibilitychange", syncVisibility);
    };
  }, []);
  if (!flow) return null;
  const running = visible && !paused && !reduced;
  return (
    <figure ref={ref} className={`${styles.flow} ${compact ? styles.compact : ""}`} data-kind={kind} data-running={running} data-reduced={reduced}>
      <div className={styles.header}>
        <span>{flow.title}</span>
        <button type="button" onClick={() => setPaused(!paused)} aria-label={`${paused ? "Play" : "Pause"} ${flow.title.toLowerCase()} animation`} aria-pressed={paused} disabled={reduced}>
          {reduced ? "STATIC" : paused ? "PLAY" : "PAUSE"}
        </button>
      </div>
      <div className={styles.stage}>
        <svg viewBox="0 0 560 184" fill="none" aria-hidden="true">
          <path className={styles.grid} d="M0 145H560 M0 168H560 M0 122H560 M0 99H560 M0 76H560 M0 53H560 M0 30H560 M0 184L130 0 M112 184L205 0 M224 184L280 0 M336 184L355 0 M448 184L430 0 M560 184L505 0" />
          {[0, 1, 2].map((i) => {
            const x = 70 + i * 140;
            const route = `M${x + 36} 93 H${x + 63} V${i === 1 ? 120 : 66} H${x + 89} V93 H${x + 104}`;
            return <g key={i} style={{ "--delay": `${i * 2}s` }}>
              <path className={styles.route} d={route} />
              <path className={styles.packet} d={route} pathLength="100" />
              <path className={styles.arrow} d={`M${x + 98} 89L${x + 104} 93 ${x + 98} 97`} />
            </g>;
          })}
          {flow.glyphs.map((glyph, i) => <g key={i} transform={`translate(${70 + i * 140} 93)`} style={{ "--delay": `${i * 2}s` }}>
            <path className={styles.cubeBack} d="M-36-28L-23-41H49V15L36 28 M36-28L49-41 M-36 28L-23 15H49" />
            <rect className={styles.node} x="-36" y="-28" width="72" height="56" />
            <g className={styles.glyph}><Glyph type={glyph} /></g>
            <path className={styles.indicator} d="M-24 40H24" pathLength="100" />
          </g>)}
        </svg>
        <ol className={styles.labels}>{flow.stages.map((stage, i) => <li key={stage}><span>0{i + 1}</span>{stage}</li>)}</ol>
      </div>
      <figcaption className={styles.caption}><span>{kind === "hero" ? "HOW I THINK" : "ILLUSTRATIVE FLOW"}</span><p>{flow.note}</p></figcaption>
    </figure>
  );
}
