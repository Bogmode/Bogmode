import Dronewasheres from "@/components/Dronewasheres";
import PlaygroundTile from "@/components/PlaygroundTile";
import Crosshair from "@/components/Crosshair";
import Rise from "@/components/Rise";
import ProblemExplorer from "@/components/ProblemExplorer";
import Link from "next/link";
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
      <Rise mode="mount" delay={50}>
        <Link className="play-feature" href="/playground/gmail-outreach">
          <div className="play-feature-meta"><span>NEW / USABLE TOOL</span><span>LOCAL-FIRST · GMAIL API READY</span></div>
          <div className="play-feature-body">
            <div>
              <span className="play-feature-index">OUTREACH / 01</span>
              <h2>Gmail Outreach Studio</h2>
              <p>Import recipients, personalize messages, build HTML layouts, attach files, and inspect every email before anything can be sent.</p>
            </div>
            <span className="play-feature-cta">OPEN THE STUDIO →</span>
          </div>
        </Link>
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
