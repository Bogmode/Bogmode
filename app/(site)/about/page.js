import Credentials from "@/components/Credentials";
import IndependentProjects from "@/components/IndependentProjects";
import Link from "next/link";
import Crosshair from "@/components/Crosshair";
import Rise from "@/components/Rise";
import ModelBay from "@/components/ModelBay";
import { getSite } from "@/lib/content";

export const metadata = { title: "About — БОГMODE" };

export default async function AboutPage() {
  const site = await getSite();
  return (
    <section>
      <Rise mode="mount">
        <div className="sec-head">
          <span className="xh"><Crosshair size={16} /></span>
          <h1 className="about-title">Operator profile.</h1>
        </div>
      </Rise>
      <div className="about-grid">
        <div className="about-body">
          {site.about.map((para, i) => (
            <Rise mode="mount" delay={90 + i * 80} key={i}>
              <p className="lede">{para}</p>
            </Rise>
          ))}
        </div>
        <div className="about-model">
          <Rise mode="mount" delay={140}>
            <ModelBay />
          </Rise>
          <Rise mode="mount" delay={220}>
            <div className="about-skill-note"><span>PERSONAL SYSTEM</span><p>The Skills Rose in the Playground is a living map of the same practice: systems, story, and play feeding each other.</p><Link href="/playground" className="tag-link">OPEN THE SKILLS ROSE →</Link></div>
          </Rise>
        </div>
      </div>
      <Credentials />
      <IndependentProjects droneUrl={site.dronewasheresUrl} />
      {site.instagramUrl && <a className="action secondary" href={site.instagramUrl}>FIND ME ON INSTAGRAM →</a>}
    </section>
  );
}
