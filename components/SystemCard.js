import Link from "next/link";
import Crosshair from "./Crosshair";

export default function SystemCard({ s }) {
  return (
    <Link href={`/systems/${s.slug}`} className="panel-link">
      <article className="panel">
        <div className="scan" />
        <div className="card-signal" aria-hidden="true"><span /><span /><span /></div>
        {s.live && <span className="target"><Crosshair size={20} /></span>}
        <div className="meta">
          <span className="cat">{s.cat}</span>
          <span className={"status" + (s.live ? " live" : "")}>{s.status}</span>
        </div>
        <h3>{s.title}</h3>
        <p>{s.body}</p>
        <div className="chips">{s.chips.map((c) => <span className="chip" key={c}>{c}</span>)}</div>
        <span className="accent-line" />
      </article>
    </Link>
  );
}
