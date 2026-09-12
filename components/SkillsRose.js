"use client";

import { useRef } from "react";

const config = {
  title: "The Bogmode operating system.",
  subtitle: "Three disciplines. Nine working instincts. One evolving practice.",
  domains: [
    { name: "Systems", color: "#FF5A1F", skills: [{ name: "System design", value: 92 }, { name: "Data clarity", value: 86 }, { name: "Automation", value: 89 }] },
    { name: "Story", color: "#B69CFF", skills: [{ name: "Brand thinking", value: 82 }, { name: "Creative direction", value: 78 }, { name: "Communication", value: 84 }] },
    { name: "Play", color: "#05B6CB", skills: [{ name: "3D worlds", value: 68 }, { name: "Generative art", value: 76 }, { name: "Sound design", value: 64 }] },
  ],
};

export default function SkillsRose() {
  const frame = useRef(null);
  const personalize = () => {
    const rose = frame.current?.contentDocument?.querySelector("skills-rose");
    if (rose) rose.config = config;
  };

  return (
    <div className="skills-rose-frame">
      <iframe ref={frame} src="/skills-rose.html" title="Interactive Bogmode skills rose" onLoad={personalize} />
    </div>
  );
}
