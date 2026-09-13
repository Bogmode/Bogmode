import Dronewasheres from "@/components/Dronewasheres";
import PlaygroundTile from "@/components/PlaygroundTile";
import Crosshair from "@/components/Crosshair";
import Rise from "@/components/Rise";
import ProblemExplorer from "@/components/ProblemExplorer";
import { getPlayground, getSite } from "@/lib/content";

export const metadata = { title: "Playground — БОГMODE" };

export default async function PlaygroundPage() {
  const [playground, site] = await Promise.all([getPlayground(), getSite()]);
  return (
    <section>
      <Rise mode="mount">
        <div className="sec-head">
          <span className="xh"><Crosshair size={16} /></span>
          <h1 className="page-title">Playground</h1>
          <span className="tag">EXPERIMENTS / OFF-HOURS</span>
        </div>
      </Rise>
      <Dronewasheres url={site.dronewasheresUrl} />
      <Rise mode="mount" delay={80}>
        <div className="play-experiment">
          <ProblemExplorer />
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
