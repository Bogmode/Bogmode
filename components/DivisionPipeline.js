import Link from "next/link";

// Stage strip for a division's pipeline (e.g. SWARM: Plan → Simulate → Fly).
export default function DivisionPipeline({ division, bySlug, current }) {
  if (!division?.pipeline?.length) return null;
  return (
    <ol className="pipeline" aria-label={`${division.name} pipeline`}>
      {division.pipeline.map((st, i) => {
        const item = bySlug[st.project];
        const on = current && st.project === current;
        const inner = (
          <>
            <span className="pipeline-step">{String(i + 1).padStart(2, "0")} · {st.stage.toUpperCase()}</span>
            <strong>{item?.title || st.project}</strong>
            <span className="pipeline-note">{st.note}</span>
          </>
        );
        return (
          <li key={st.stage} className={on ? "on" : ""}>
            {item && !on ? <Link href={item.href}>{inner}</Link> : <div>{inner}</div>}
          </li>
        );
      })}
    </ol>
  );
}
