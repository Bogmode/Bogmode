import SystemFlow from "./SystemFlow";

export default function IndependentProjects({ droneUrl }) {
  return (
    <section id="independent-work" className="independent-work">
      <div className="sec-head"><h2>Ideas I’m putting into practice.</h2><span className="tag">INDEPENDENT PROJECTS</span></div>
      <p className="section-intro">Different problems. The same drive to build something useful.</p>
      <div className="project-grid">
        <article className="project-card">
          <SystemFlow kind="upstreams" compact />
          <div className="project-copy"><span className="project-type">LOCAL MARKETPLACE / PHASE 1</span><h3>Upstreams</h3><p>A directory-first Winnipeg marketplace that matches recurring business byproducts with local makers, growers, and producers who can use them.</p><a href="https://upstreams.ca/">EXPLORE UPSTREAMS <span aria-hidden="true">↗</span></a></div>
        </article>
        <article className="project-card">
          <SystemFlow kind="fiend" compact />
          <div className="project-copy"><span className="project-type">CONSUMER APP / LIVE PROJECT</span><h3>Fiend</h3><p>A behavior-tracking app built around individual logs, stats, and weekly reports. An exploration of everyday habits through a direct, distinctive interface.</p><a href="https://bogmode.github.io/fiend/">EXPLORE FIEND <span aria-hidden="true">↗</span></a></div>
        </article>
        <article className="project-card">
          <SystemFlow kind="dronewashers" compact />
          <div className="project-copy"><span className="project-type">SERVICE BRAND / WEBSITE CONCEPT</span><h3>DroneWashers</h3><p>A drone-cleaning service concept brought to life through a complete website: a clear offer, service discovery, and a quote journey.</p>{droneUrl ? <a href={droneUrl}>EXPLORE DRONEWASHERS <span aria-hidden="true">↗</span></a> : <span className="project-pending">PROJECT LINK COMING SOON</span>}</div>
        </article>
      </div>
    </section>
  );
}
