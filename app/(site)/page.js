import IndependentProjects from "@/components/IndependentProjects";
import Link from "next/link";
import Crosshair from "@/components/Crosshair";
import SystemCard from "@/components/SystemCard";
import Rise from "@/components/Rise";
import SystemPulse from "@/components/SystemPulse";
import HeroModel from "@/components/HeroModel";
import { getSite, getSystems } from "@/lib/content";

export default async function Home() {
  const [site, systems] = await Promise.all([
    getSite(),
    getSystems(),
  ]);

  return (
    <>
      <header className="hero">
        <div>
          <Rise mode="mount">
            <div className="eyebrow"><Crosshair size={13} /> BOGDAN · WINNIPEG, MB</div>
          </Rise>
          <Rise mode="mount" delay={90}>
            <h1>{site.headline}<span className="thin">{site.subhead}</span></h1>
          </Rise>
          <Rise mode="mount" delay={200}>
            <p className="lede">{site.lede}</p>
          </Rise>
          <Rise mode="mount" delay={260}>
            <div className="hero-actions">
              <Link href="/contact" className="action primary">BRING YOUR PROBLEM →</Link>
              <Link href="#systems" className="action secondary">EXPLORE MY WORK →</Link>
            </div>
          </Rise>
        </div>
        <div className="hero-side">
          <Rise mode="mount" delay={140}>
            <HeroModel />
          </Rise>
          <Rise mode="mount" delay={320} className="telemetry">
            {site.telemetry.map(({ k, v }) => (
              <div key={k}><span className="k">{k}</span> — {v}</div>
            ))}
          </Rise>
          <Rise mode="mount" delay={390}>
            <p className="hero-note"><span>БОГMODE</span> EVERYTHING, ALL AT ONCE.</p>
          </Rise>
          <Rise mode="mount" delay={460}>
            <SystemPulse />
          </Rise>
        </div>
      </header>

      <section id="systems">
        <Rise>
          <div className="sec-head">
            <span className="xh"><Crosshair size={16} /></span>
            <h2>Useful work. Real responsibility.</h2>
            <Link href="/systems" className="tag-link">VIEW ALL →</Link>
          </div>
        </Rise>
        <div className="sys-grid featured-case-grid">
          {systems.filter((s) => s.slug === "business-intelligence").map((s, i) => (
            <Rise key={s.slug} delay={i * 90}>
              <SystemCard s={s} />
            </Rise>
          ))}
        </div>
      </section>

      <IndependentProjects droneUrl={site.dronewasheresUrl} />

      <section className="method-section">
        <Rise>
          <div className="sec-head">
            <span className="xh"><Crosshair size={16} /></span>
            <h2>How I work</h2>
            <span className="tag">OPERATOR → BUILDER</span>
          </div>
        </Rise>
        <div className="method-grid">
          {[
            ["01", "Find the friction", "Locate the broken handoff, unclear decision, or missing source of truth."],
            ["02", "Design the system", "Model the data, owners, and rules around how work actually happens."],
            ["03", "Make it run", "Build the workflow, automation, and interface that moves the work forward."],
            ["04", "Keep it useful", "Keep information current and make sure people can confidently use what we build."],
          ].map(([num, title, body]) => (
            <Rise key={num} delay={Number(num) * 55}>
              <article className="method-step">
                <span>{num}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            </Rise>
          ))}
        </div>
      </section>

      <section className="home-personal">
        <div><span className="drone-kicker">THE PERSON BEHIND THE WORK</span><h2>Everything, all at once.</h2><p>Business and technology. Cameras and communities. A broad range of interests, with one thread running through them: I like making things happen.</p><Link href="/about" className="tag-link">MEET BOGDAN →</Link></div>
        <div className="home-invitation"><h3>Something needs to move?</h3><p>A system, a launch, an idea—or the right role. Let’s start with a conversation.</p><Link href="/contact" className="action primary">LET’S TALK →</Link></div>
      </section>
    </>
  );
}
