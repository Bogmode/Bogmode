import Link from "next/link";
import Crosshair from "@/components/Crosshair";
import SystemCard from "@/components/SystemCard";
import Rise from "@/components/Rise";
import { getSite, getSystems, getPlayground } from "@/lib/content";

export default async function Home() {
  const [site, systems, playground] = await Promise.all([
    getSite(),
    getSystems(),
    getPlayground(),
  ]);

  return (
    <>
      <header className="hero">
        <div>
          <Rise mode="mount">
            <div className="eyebrow"><Crosshair size={13} /> BOGDAN · WINNIPEG, MB</div>
          </Rise>
          <Rise mode="mount" delay={90}>
            <h1>{site.headline}<br /><span className="thin">{site.subhead}</span></h1>
          </Rise>
          <Rise mode="mount" delay={200}>
            <p className="lede">{site.lede}</p>
          </Rise>
        </div>
        <Rise mode="mount" delay={320} className="telemetry">
          {site.telemetry.map(({ k, v }) => (
            <div key={k}><span className="k">{k}</span> — {v}</div>
          ))}
        </Rise>
      </header>

      <section id="systems">
        <Rise>
          <div className="sec-head">
            <span className="xh"><Crosshair size={16} /></span>
            <h2>Systems</h2>
            <Link href="/systems" className="tag-link">VIEW ALL →</Link>
          </div>
        </Rise>
        <div className="sys-grid">
          {systems.map((s, i) => (
            <Rise key={s.slug} delay={i * 90}>
              <SystemCard s={s} />
            </Rise>
          ))}
        </div>
      </section>

      <section id="playground">
        <Rise>
          <div className="sec-head">
            <span className="xh"><Crosshair size={16} /></span>
            <h2>Playground</h2>
            <Link href="/playground" className="tag-link">VIEW ALL →</Link>
          </div>
        </Rise>
        <div className="play-grid">
          {playground.map((p, i) => (
            <Rise key={p.slug} delay={i * 90}>
              <div className="tile">
                <div className="glyph">{p.glyph}</div>
                <h4>{p.title}</h4>
                <p>{p.body}</p>
              </div>
            </Rise>
          ))}
        </div>
      </section>
    </>
  );
}
