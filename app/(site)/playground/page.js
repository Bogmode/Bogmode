import Dronewasheres from "@/components/Dronewasheres";
import PlaygroundTile from "@/components/PlaygroundTile";
import Crosshair from "@/components/Crosshair";
import Rise from "@/components/Rise";
import SkillsRose from "@/components/SkillsRose";
import { getPlayground, getSite } from "@/lib/content";

export const metadata = { title: "Playground — БОГMODE" };

export default async function PlaygroundPage() {
  const [playground, site] = await Promise.all([getPlayground(), getSite()]);
  return (
    <section>
      <Rise mode="mount">
        <div className="sec-head">
          <span className="xh"><Crosshair size={16} /></span>
          <h2>Playground</h2>
          <span className="tag">RANGE / OFF-HOURS</span>
        </div>
      </Rise>
      <Dronewasheres url={site.dronewasheresUrl} />
      <Rise mode="mount" delay={80}>
        <div className="play-experiment">
          <div className="experiment-kicker"><span>LIVE EXPERIMENT / 001</span><span>SKILLS ROSE</span></div>
          <SkillsRose />
        </div>
      </Rise>
      <div className="play-grid">
        {playground.map((p, i) => (
          <Rise key={p.slug} mode="mount" delay={100 + i * 90}>
            <PlaygroundTile item={p} />
          </Rise>
        ))}
      </div>
    </section>
  );
}
