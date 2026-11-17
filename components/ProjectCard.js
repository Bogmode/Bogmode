import Link from "next/link";

export const CATEGORY_LABEL = {
  interactive: "INTERACTIVE / EDUCATION",
  games: "GAMES & 3D",
  drones: "DRONES & SIMULATION",
  "web-brand": "WEB & BRAND",
  tools: "TOOLS & DATA",
  concept: "CONCEPT",
};

export const STATUS_LABEL = {
  live: "LIVE",
  "in-progress": "BUILDING",
  prototype: "PROTOTYPE",
  paused: "PAUSED",
  concept: "CONCEPT",
};

export default function ProjectCard({ p }) {
  return (
    <article className="panel system-card project-entry-card">
      <Link href={`/work/${p.slug}`} className="panel-link" aria-label={`Explore ${p.title}`}>
        <div className="meta">
          <span className="cat">{CATEGORY_LABEL[p.category] || p.category}</span>
          <span className={"status" + (p.status === "live" ? " live" : "")}>{STATUS_LABEL[p.status] || p.status}</span>
        </div>
        <h3>{p.title}</h3>
        <p>{p.summary}</p>
      </Link>
      <div className="system-card-footer">
        <div className="chips">{(p.stack || []).slice(0, 4).map((c) => <span className="chip" key={c}>{c}</span>)}</div>
        <Link href={`/work/${p.slug}`} className="tag-link">SEE PROJECT →</Link>
      </div>
    </article>
  );
}
