import ProjectIdentity from "./ProjectIdentity";
import SystemFlow from "./SystemFlow";

export default function IndependentProjects({ droneUrl }) {
  return (
    <section id="independent-work" className="independent-work">
      <div className="sec-head"><h2>Ideas, brought to life.</h2><span className="tag">INDEPENDENT PROJECTS</span></div>
      <p className="section-intro">A spark of an idea. A little wizardry. Something you can actually use.</p>
      <div className="project-grid">
        <article className="project-card">
          <ProjectIdentity kind="upstreams" />
          <div className="project-copy"><span className="project-type">LOCAL MARKETPLACE / PHASE 1</span><h3>Upstreams</h3><p>What if one business’s leftovers could start someone else’s next project? A Winnipeg marketplace prototype for useful byproducts.</p><details className="project-how"><summary>HOW IT WORKS</summary><SystemFlow kind="upstreams" compact /></details><a href="https://upstreams.ca/">EXPLORE UPSTREAMS <span aria-hidden="true">↗</span></a></div>
        </article>
        <article className="project-card">
          <ProjectIdentity kind="fiend" />
          <div className="project-copy"><span className="project-type">CONSUMER APP / LIVE PROJECT</span><h3>Fiend</h3><p>An idea about noticing everyday patterns, made into an app with personal logs, stats, and weekly reports.</p><details className="project-how"><summary>HOW IT WORKS</summary><SystemFlow kind="fiend" compact /></details><a href="https://bogmode.github.io/fiend/">EXPLORE FIEND <span aria-hidden="true">↗</span></a></div>
        </article>
        <article className="project-card">
          <ProjectIdentity kind="dronewashers" />
          <div className="project-copy"><span className="project-type">SERVICE BRAND / WEBSITE CONCEPT</span><h3>DroneWashers</h3><p>A service idea, made tangible: brand, website, and an interactive sample quote journey.</p><details className="project-how"><summary>HOW IT WORKS</summary><SystemFlow kind="dronewashers" compact /></details>{droneUrl ? <a href={droneUrl}>EXPLORE DRONEWASHERS <span aria-hidden="true">↗</span></a> : <span className="project-pending">PROJECT LINK COMING SOON</span>}</div>
        </article>
      </div>
    </section>
  );
}
