import Link from "next/link";
import Crosshair from "@/components/Crosshair";
import SystemCard from "@/components/SystemCard";
import ProjectCard from "@/components/ProjectCard";
import NdaFolder from "@/components/NdaFolder";
import TotemMark from "@/components/TotemMark";
import DivisionPipeline from "@/components/DivisionPipeline";
import Rise from "@/components/Rise";
import { getSystems, getEcosystem } from "@/lib/content";

export const metadata = { title: "Work — БОГMODE" };

export default async function SystemsPage() {
  const [systems, { divisions, bySlug }] = await Promise.all([getSystems(), getEcosystem()]);
  const nda = systems.filter((s) => s.nda);
  return (
    <section>
      <Rise mode="mount">
        <div className="sec-head">
          <span className="xh"><Crosshair size={16} /></span>
          <h1 className="page-title">Work</h1>
        </div>
        <p className="section-intro">One studio, five divisions. Each has its own animal and its own kind of work. Professional work sits in the NDA folder at the end.</p>
      </Rise>
      {divisions.map((d) => (
        <div className="division-block" key={d.slug} id={d.slug}>
          <Rise>
            <Link href={`/divisions/${d.slug}`} className="division-head">
              <TotemMark totem={d.totem} size={46} />
              <div>
                <span className="division-focus">{d.focus}</span>
                <h2>{d.name}</h2>
                <p>{d.tagline}</p>
              </div>
              <span className="tag-link">DIVISION →</span>
            </Link>
          </Rise>
          {d.pipeline?.length > 0 && <Rise delay={60}><DivisionPipeline division={d} bySlug={bySlug} /></Rise>}
          {d.items.length > 0 ? (
            <div className="sys-grid">
              {d.items.map((i, k) => (
                <Rise key={i.slug} delay={(k % 3) * 70}>{i.kind === "project" ? <ProjectCard p={i.data} /> : <SystemCard s={i.data} />}</Rise>
              ))}
            </div>
          ) : (
            <p className="division-empty">In the workshop. First pieces land here soon.</p>
          )}
        </div>
      ))}
      {nda.length > 0 && (
        <div className="division-block">
          <div className="sec-head experiments-heading"><h2>Professional work.</h2></div>
          <div className="sys-grid"><NdaFolder count={nda.length} /></div>
        </div>
      )}
    </section>
  );
}
