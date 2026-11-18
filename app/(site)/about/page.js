import Link from "next/link";
import Crosshair from "@/components/Crosshair";
import Rise from "@/components/Rise";
import Scramble from "@/components/Scramble";
import PlayerCard from "@/components/game/PlayerCard";
import { getSite } from "@/lib/content";

export const metadata = {
  title: "About — БОГMODE",
  description: "Bogdan, a builder in Winnipeg. Drone sims, science toys, data machines and small worlds. Say hi.",
  alternates: { canonical: "/about" },
};

export default async function AboutPage() {
  const site = await getSite();
  const email = site.contact?.email;
  return (
    <section className="about-v2">
      <Rise mode="mount">
        <div className="sec-head">
          <span className="xh"><Crosshair size={16} /></span>
          <h1 className="about-title"><Scramble text="Hi, I'm Bogdan." /></h1>
        </div>
      </Rise>
      <div className="about-grid">
        <div className="about-body">
          {site.about.map((para, i) => (
            <Rise mode="mount" delay={90 + i * 70} key={i}>
              <p className="lede">{para}</p>
            </Rise>
          ))}
          <Rise mode="mount" delay={420}>
            <div className="about-connect">
              <span className="about-connect-label">PRESS START</span>
              <div className="hero-actions">
                {email && <a className="action primary" href={`mailto:${email}`}>SAY HI →</a>}
                <Link className="action secondary" href="/contact">SEND A NOTE →</Link>
              </div>
              <div className="about-links">
                {site.links?.linkedin && <a href={site.links.linkedin}>LINKEDIN <span>· full CV, roles, dates</span></a>}
                {site.links?.github && <a href={site.links.github}>GITHUB <span>· the code</span></a>}
                {site.instagramUrl && <a href={site.instagramUrl}>INSTAGRAM <span>· the behind-the-scenes</span></a>}
              </div>
            </div>
          </Rise>
        </div>
        <Rise mode="mount" delay={160}>
          <PlayerCard portrait={site.portrait} />
        </Rise>
      </div>
    </section>
  );
}
