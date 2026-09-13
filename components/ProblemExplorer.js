"use client";

import { useState } from "react";
import Link from "next/link";
import SystemFlow from "./SystemFlow";
import styles from "./ProblemExplorer.module.css";

const problems = [
  {
    id: "data",
    label: "My data is scattered",
    title: "Get everyone working from the same information.",
    problem: "The answer is somewhere in a spreadsheet, a document, or someone’s head. Finding it means asking around again.",
    approach: "Bring the relevant information together, give it a clear structure, and define how it stays current.",
    result: "A shared place to find context and reporting, without reconstructing the story every time.",
    flow: "business-intelligence",
    link: "/systems/business-intelligence",
    linkLabel: "SEE A SYSTEM I BUILT →",
  },
  {
    id: "automation",
    label: "I keep doing this manually",
    title: "Give the repeatable work a repeatable process.",
    problem: "The same request arrives, the same details get copied, and the same follow-up depends on someone remembering.",
    approach: "Define the trigger, check the inputs, connect the tools, and make exceptions visible to the right person.",
    result: "Routine steps can run consistently. People handle the cases that need judgment.",
    flow: "automation",
    link: "/contact",
    linkLabel: "TELL ME ABOUT YOUR WORKFLOW →",
  },
  {
    id: "agents",
    label: "I want an AI agent that helps",
    title: "Give the agent a job, context, and clear boundaries.",
    problem: "A chatbot can produce an answer. Your task also needs relevant information, a useful next step, and a way to check the result.",
    approach: "Start with one task. Connect the context and tools it needs, define when a person should review, and test the result.",
    result: "An agent designed for a specific workflow, with a clear handoff when it needs your judgment.",
    flow: "agents",
    link: "/contact",
    linkLabel: "TALK THROUGH AN AGENT IDEA →",
  },
];

export default function ProblemExplorer() {
  const [selected, setSelected] = useState("data");
  const problem = problems.find((item) => item.id === selected);
  return (
    <div className={styles.explorer} id="problem-explorer">
      <div className={styles.intro}>
        <span className={styles.kicker}>HOW I APPROACH A PROBLEM</span>
        <h2>What’s getting in the way?</h2>
        <p>Pick a familiar problem. See where data, automation, or an AI agent could help.</p>
      </div>
      <div className={styles.choices} role="group" aria-label="Choose a problem">
        {problems.map((item, i) => <button key={item.id} type="button" aria-pressed={selected === item.id} aria-controls="problem-explanation" onClick={() => setSelected(item.id)}><span>0{i + 1}</span>{item.label}</button>)}
      </div>
      <div id="problem-explanation" className={styles.content}>
        <div className={styles.explanation} aria-live="polite" aria-atomic="true">
          <h3>{problem.title}</h3>
          <dl>
            <dt>THE FRICTION</dt><dd>{problem.problem}</dd>
            <dt>MY APPROACH</dt><dd>{problem.approach}</dd>
            <dt>THE AIM</dt><dd>{problem.result}</dd>
          </dl>
          <Link className="tag-link" href={problem.link}>{problem.linkLabel}</Link>
        </div>
        <SystemFlow key={problem.id} kind={problem.flow} />
      </div>
    </div>
  );
}
