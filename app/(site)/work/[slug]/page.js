import Link from "next/link";
import { notFound } from "next/navigation";
import Crosshair from "@/components/Crosshair";
import Rise from "@/components/Rise";
import Scramble from "@/components/Scramble";
import NumberRain from "@/components/NumberRain";
import RichText from "@/components/RichText";
import ProjectIdentity from "@/components/ProjectIdentity";
import { CATEGORY_LABEL, STATUS_LABEL } from "@/components/ProjectCard";
import DivisionBadge from "@/components/DivisionBadge";
import DivisionPipeline from "@/components/DivisionPipeline";
import DemoStage from "@/components/DemoStage";
import { getProjects, getProject, getEcosystem } from "@/lib/content";

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = await getProject(slug);
  return p ? { title: `${p.title} — БОГMODE`, description: p.summary, alternates: { canonical: `/work/${slug}` }, openGraph: { title: `${p.title} — БОГMODE`, description: p.summary, url: `/work/${slug}`, images: ["/opengraph-image.png"] }, twitter: { card: "summary_large_image", title: `${p.title} — БОГMODE`, description: p.summary, images: ["/opengraph-image.png"] } } : { title: "БОГMODE" };
}

export default async function ProjectDetail({ params }) {
  const { slug } = await params;
  const p = await getProject(slug);
  if (!p) notFound();
  const { divisions, bySlug } = await getEcosystem();
  const division = divisions.find((d) => d.slug === p.division);
  const siblings = division ? division.items.filter((i) => i.slug !== slug) : [];
  const links = [
    p.links?.live && { href: p.links.live, label: "OPEN PROJECT", primary: true },
    p.links?.repo && { href: p.links.repo, label: "SOURCE CODE" },
    p.links?.video && { href: p.links.video, label: "WATCH DEMO" },
  ].filter(Boolean);

  return (
    <article className="detail">
      <NumberRain />
      <Rise mode="mount">
        <Link href="/systems" className="back">← WORK</Link>
        <DivisionBadge division={division} />
        <div className="eyebrow"><Crosshair size={13} /> {CATEGORY_LABEL[p.category] || p.category} · {STATUS_LABEL[p.status] || p.status}{p.year ? ` · ${p.year}` : ""}</div>
      </Rise>
      <Rise mode="mount" delay={90}>
        <h1><Scramble text={p.title} /></h1>
        <p className="lede">{p.summary}</p>
        {p.role && <p className="project-role">{p.role}</p>}
      </Rise>
      <Rise mode="mount" delay={130}><ProjectIdentity kind={p.slug} title={p.title} division={p.division} banner /></Rise>
      {p.demo?.kind === "embed" && p.demo.src && (
        <Rise mode="mount" delay={140}><DemoStage src={p.demo.src} poster={p.demo.poster} title={p.title} fullHref={p.links?.live || undefined} /></Rise>
      )}
      {links.length > 0 && (
        <Rise mode="mount" delay={150}>
          <div className="hero-actions">
            {links.map((l) => (
              <a key={l.href} className={`action ${l.primary ? "primary" : "secondary"}`} href={l.href}>{l.label} →</a>
            ))}
          </div>
        </Rise>
      )}
      {division?.pipeline?.some((st) => st.project === slug) && (
        <Rise mode="mount" delay={170}><DivisionPipeline division={division} bySlug={bySlug} current={slug} /></Rise>
      )}
      <Rise mode="mount" delay={200}>
        <RichText node={p.body} />
        {p.links?.video?.endsWith(".mp4") && (
          <figure className="demo-video">
            <video src={p.links.video.replace("https://bogmode.ca", "")} controls playsInline preload="metadata" />
            <figcaption>HOW TO PLAY · 25 SEC</figcaption>
          </figure>
        )}

        {p.stack?.length > 0 && <div className="chips">{p.stack.map((c) => <span className="chip" key={c}>{c}</span>)}</div>}
        {siblings.length > 0 && (
          <div className="siblings">
            <span className="siblings-label">MORE IN {division.name.toUpperCase()}</span>
            {siblings.map((s) => <Link key={s.slug} href={s.href}>{s.title} →</Link>)}
          </div>
        )}
        <div className="case-contact"><h2>Questions about this project?</h2><p>Happy to walk through it.</p><Link className="action secondary" href="/contact">CONTACT →</Link></div>
      </Rise>
    </article>
  );
}
