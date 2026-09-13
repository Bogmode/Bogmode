"use client";

import { useState } from "react";
import Link from "next/link";
import SystemFlow from "./SystemFlow";
import styles from "./ProblemExplorer.module.css";

const problems = [
  {
    id: "data",
    label: "Data",
    color: "#ff855a",
    title: "Scattered data. Clear answers.",
    approach: "Connect the sources. Organize the information. Keep the team in sync.",
    flow: "business-intelligence",
    link: "/systems/business-intelligence",
    linkLabel: "SEE A SYSTEM I BUILT →",
  },
  {
    id: "automation",
    label: "Automation",
    color: "#b69cff",
    title: "Less repetition. More momentum.",
    approach: "Connect the tools. Automate routine steps. Flag the exceptions.",
    flow: "automation",
    link: "/contact",
    linkLabel: "LET’S AUTOMATE IT →",
  },
  {
    id: "agents",
    label: "AI agents",
    color: "#58d5e5",
    title: "An agent with a useful job.",
    approach: "Give it context and tools. Define the task. Keep human judgment in the loop.",
    flow: "agents",
    link: "/contact",
    linkLabel: "LET’S BUILD AN AGENT →",
  },
];

export default function ProblemExplorer() {
  const [selected, setSelected] = useState("data");
  const problem = problems.find((item) => item.id === selected);
  return (
    <div className={styles.explorer} id="problem-explorer" style={{ "--accent": problem.color }}>
      <div className={styles.intro}>
        <span className={styles.kicker}>THE TOOLKIT</span>
        <h2>A little wizardry. Useful work.</h2>
        <p>Pick a tool. Follow the flow.</p>
      </div>
      <div className={styles.choices} role="group" aria-label="Choose a capability">
        {problems.map((item, i) => <button key={item.id} style={{ "--choice": item.color }} type="button" aria-pressed={selected === item.id} aria-controls="problem-explanation" onClick={() => setSelected(item.id)}><span>0{i + 1}</span>{item.label}</button>)}
      </div>
      <div id="problem-explanation" className={styles.content}>
        <div className={styles.explanation} aria-live="polite" aria-atomic="true">
          <h3>{problem.title}</h3>
          <p>{problem.approach}</p>
          <Link className="tag-link" href={problem.link}>{problem.linkLabel}</Link>
        </div>
        <SystemFlow key={problem.id} kind={problem.flow} />
      </div>
    </div>
  );
}
