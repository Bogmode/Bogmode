import Link from "next/link";
import { notFound } from "next/navigation";
import Crosshair from "@/components/Crosshair";
import Rise from "@/components/Rise";
import Scramble from "@/components/Scramble";
import NumberRain from "@/components/NumberRain";
import TotemMark from "@/components/TotemMark";
import ProjectCard from "@/components/ProjectCard";
import SystemCard from "@/components/SystemCard";
import DivisionPipeline from "@/components/DivisionPipeline";
import { getDivisions, getEcosystem } from "@/lib/content";

export async function generateStaticParams() {
  const divisions = await getDivisions();
  return divisions.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { divisions } = await getEcosystem();
  const d = divisions.find((x) => x.slug === slug);
  return d ? { title: `${d.name} — БОГMODE`, description: d.tagline } : { title: "БОГMODE" };
}

export default async function DivisionPage({ params }) {
  const { slug } = await params;
  const { divisions, bySlug } = await getEcosystem();
  const d = divisions.find((x) => x.slug === slug);
  if (!d) notFound();
  const others = divisions.filter((x) => x.slug !== slug);

  return (
    <article className="detail division-page">
      <NumberRain />
      <Rise mode="mount">
        <Link href="/systems" className="back">← WORK</Link>
        <div className="eyebrow"><Crosshair size={13} /> БОГMODE DIVISION · {d.focus}</div>
      </Rise>
      <Rise mode="mount" delay={90}>
        <div className="division-hero">
          <div>
            <h1><Scramble text={d.name} /></h1>
            <p className="lede">{d.tagline}</p>
            <p className="detail-intro">{d.intro}</p>
          </div>
          <TotemMark totem={d.totem} size={168} className="division-hero-totem" />
        </div>
      </Rise>
      {d.pipeline?.length > 0 && (
        <Rise mode="mount" delay={150}><DivisionPipeline division={d} bySlug={bySlug} /></Rise>
      )}
      <Rise mode="mount" delay={200}>
        {d.items.length > 0 ? (
          <div className="sys-grid division-grid">
            {d.items.map((i) => (i.kind === "project" ? <ProjectCard key={i.slug} p={i.data} /> : <SystemCard key={i.slug} s={i.data} />))}
          </div>
        ) : (
          <p className="division-empty">In the workshop. First pieces land here soon.</p>
        )}
      </Rise>
      <div className="division-others" role="navigation" aria-label="Other divisions">
        {others.map((o) => (
          <Link key={o.slug} href={`/divisions/${o.slug}`}><TotemMark totem={o.totem} size={26} /><span>{o.name}</span></Link>
        ))}
      </div>
    </article>
  );
}
