import Crosshair from "@/components/Crosshair";
import SystemCard from "@/components/SystemCard";
import ProjectCard from "@/components/ProjectCard";
import NdaFolder from "@/components/NdaFolder";
import Rise from "@/components/Rise";
import { getSystems, getProjects } from "@/lib/content";

export const metadata = { title: "Work — БОГMODE" };

export default async function SystemsPage() {
  const [systems, projects] = await Promise.all([getSystems(), getProjects()]);
  const nda = systems.filter((s) => s.nda);
  const own = systems.filter((s) => !s.nda);
  return (
    <section>
      <Rise mode="mount">
        <div className="sec-head">
          <span className="xh"><Crosshair size={16} /></span>
          <h1 className="page-title">Work</h1>
        </div>
        <p className="section-intro">My own projects: simulators, explorers, data tools and products. Professional work sits in the NDA folder at the end.</p>
      </Rise>
      <div className="sys-grid">
        {projects.map((p, i) => <Rise key={p.slug} delay={(i % 3) * 70}><ProjectCard p={p} /></Rise>)}
      </div>
      <div className="sec-head experiments-heading"><h2>Products and prototypes.</h2></div>
      <div className="sys-grid">
        {own.map((s) => <SystemCard key={s.slug} s={s} />)}
      </div>
      {nda.length > 0 && (
        <>
          <div className="sec-head experiments-heading"><h2>Professional work.</h2></div>
          <div className="sys-grid"><NdaFolder count={nda.length} /></div>
        </>
      )}
    </section>
  );
}
