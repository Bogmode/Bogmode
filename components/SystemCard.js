import Link from "next/link";
import SystemFlow from "./SystemFlow";

export default function SystemCard({ s }) {
  return (
    <article className="panel system-card">
      <Link href={`/systems/${s.slug}`} className="panel-link" aria-label={`Explore ${s.title}`}>
        <div className="meta">
          <span className="cat">{s.cat}</span>
          <span className={"status" + (s.live ? " live" : "")}>{s.status}</span>
        </div>
        <h3>{s.title}</h3>
        <p>{s.body}</p>
      </Link>
      <SystemFlow kind={s.slug} compact />
      <div className="system-card-footer">
        <div className="chips">{s.chips.map((c) => <span className="chip" key={c}>{c}</span>)}</div>
        <Link href={`/systems/${s.slug}`} className="tag-link" aria-label={`See how ${s.title} works`}>SEE HOW IT WORKS →</Link>
      </div>
    </article>
  );
}
