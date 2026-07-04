import Crosshair from "@/components/Crosshair";
import Rise from "@/components/Rise";
import { getPlayground } from "@/lib/content";

export const metadata = { title: "Playground — БОГMODE" };

export default async function PlaygroundPage() {
  const playground = await getPlayground();
  return (
    <section>
      <Rise mode="mount">
        <div className="sec-head">
          <span className="xh"><Crosshair size={16} /></span>
          <h2>Playground</h2>
          <span className="tag">RANGE / OFF-HOURS</span>
        </div>
      </Rise>
      <div className="play-grid">
        {playground.map((p, i) => (
          <Rise key={p.slug} mode="mount" delay={100 + i * 90}>
            <div className="tile">
              <div className="glyph">{p.glyph}</div>
              <h4>{p.title}</h4>
              <p>{p.body}</p>
            </div>
          </Rise>
        ))}
      </div>
    </section>
  );
}
