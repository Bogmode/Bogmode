import IndependentProjects from "@/components/IndependentProjects";
import Link from "next/link";
import Crosshair from "@/components/Crosshair";
import ProjectCard from "@/components/ProjectCard";
import NdaFolder from "@/components/NdaFolder";
import NewsList from "@/components/NewsList";
import ScaleStrip from "@/components/ScaleStrip";
import Rise from "@/components/Rise";
import HeroScene from "@/components/HeroScene";
import Scramble from "@/components/Scramble";
import GlitchMark from "@/components/GlitchMark";
import { getSite, getSystems, getProjects, getNews } from "@/lib/content";

export default async function Home() {
  const [site, systems, projects, news] = await Promise.all([
    getSite(),
    getSystems(),
    getProjects(),
    getNews(),
  ]);
  const featured = projects.filter((p) => p.featured).slice(0, 5);
  const ndaCount = systems.filter((s) => s.nda).length;

  return (
    <>
      <header className="hero">
        <div>
          <Rise mode="mount">
            <div className="eyebrow"><Crosshair size={13} /> <Scramble text="BOGDAN / BUILDER · WINNIPEG" /></div>
          </Rise>
          <Rise mode="mount" delay={90}>
            <h1>{site.headline}<span className="thin">{site.subhead}</span></h1>
          </Rise>
          <Rise mode="mount" delay={200}>
            <p className="lede">{site.lede}</p>
          </Rise>
          <Rise mode="mount" delay={260}>
            <div className="hero-actions">
              <Link href="#systems" className="action primary">SEE THE WORK →</Link>
              <Link href="/about" className="action secondary">ABOUT ME →</Link>
            </div>
          </Rise>
        </div>
        <div className="hero-side">
          <Rise mode="mount" delay={140}>
            <HeroScene />
          </Rise>
          <Rise mode="mount" delay={320} className="telemetry">
            {site.telemetry.map(({ k, v }) => (
              <div key={k}><span className="k">{k}</span> — {v}</div>
            ))}
          </Rise>
          <Rise mode="mount" delay={390}>
            <p className="hero-note"><GlitchMark /> A LITTLE WIZARDRY. A RELIABLE SYSTEM.</p>
          </Rise>
          <Rise mode="mount" delay={460}>
            <p className="hero-specialty">A swarming mind.</p>
          </Rise>
        </div>
      </header>

      <section id="systems">
        <Rise>
          <div className="sec-head">
            <span className="xh"><Crosshair size={16} /></span>
            <h2>Selected work</h2>
            <Link href="/systems" className="tag-link">ALL WORK →</Link>
          </div>
        </Rise>
        <div className="sys-grid">
          {featured.map((p, i) => (
            <Rise key={p.slug} delay={(i % 3) * 90}>
              <ProjectCard p={p} />
            </Rise>
          ))}
          {ndaCount > 0 && (
            <Rise delay={(featured.length % 3) * 90}>
              <NdaFolder count={ndaCount} />
            </Rise>
          )}
        </div>
      </section>

      <ScaleStrip />

      {news.length > 0 && (
        <section id="news">
          <Rise>
            <div className="sec-head">
              <span className="xh"><Crosshair size={16} /></span>
              <h2>Latest news</h2>
              <Link href="/news" className="tag-link">ALL NEWS →</Link>
            </div>
          </Rise>
          <Rise delay={80}><NewsList posts={news.slice(0, 3)} /></Rise>
        </section>
      )}

      <section className="method-section">
        <Rise>
          <div className="sec-head">
            <span className="xh"><Crosshair size={16} /></span>
            <h2>How I work</h2>
            <Scramble className="tag" text="OPERATOR → SYSTEMS BUILDER" />
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

      <IndependentProjects droneUrl={site.dronewasheresUrl} />

      <section className="home-personal">
        <div><span className="drone-kicker">THE PERSON BEHIND THE WORK</span><h2>Everything, all at once.</h2><p>Business and technology. Cameras and communities. A broad range of interests, with one thread running through them: I like making things happen.</p><Link href="/about" className="tag-link">MEET BOGDAN →</Link></div>
        <div className="home-invitation"><h3>Looking at this for a specific role?</h3><p>Pick the role and the problems your team has. The fit engine pulls the most relevant work from this portfolio.</p><Link href="/fit" className="action secondary">MATCH THE WORK →</Link></div>
      </section>
    </>
  );
}
