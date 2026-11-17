import Link from "next/link";
import { notFound } from "next/navigation";
import Crosshair from "@/components/Crosshair";
import Rise from "@/components/Rise";
import RichText from "@/components/RichText";
import { CATEGORY_LABEL, STATUS_LABEL } from "@/components/ProjectCard";
import { getProjects, getProject } from "@/lib/content";

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = await getProject(slug);
  return p ? { title: `${p.title} — БОГMODE`, description: p.summary } : { title: "БОГMODE" };
}

export default async function ProjectDetail({ params }) {
  const { slug } = await params;
  const p = await getProject(slug);
  if (!p) notFound();
  const links = [
    p.links?.live && { href: p.links.live, label: "OPEN PROJECT", primary: true },
    p.links?.repo && { href: p.links.repo, label: "SOURCE CODE" },
    p.links?.video && { href: p.links.video, label: "WATCH DEMO" },
  ].filter(Boolean);

  return (
    <article className="detail">
      <Rise mode="mount">
        <Link href="/systems" className="back">← WORK</Link>
        <div className="eyebrow"><Crosshair size={13} /> {CATEGORY_LABEL[p.category] || p.category} · {STATUS_LABEL[p.status] || p.status}{p.year ? ` · ${p.year}` : ""}</div>
      </Rise>
      <Rise mode="mount" delay={90}>
        <h1>{p.title}</h1>
        <p className="lede">{p.summary}</p>
        {p.role && <p className="project-role">{p.role}</p>}
      </Rise>
      {links.length > 0 && (
        <Rise mode="mount" delay={150}>
          <div className="hero-actions">
            {links.map((l) => (
              <a key={l.href} className={`action ${l.primary ? "primary" : "secondary"}`} href={l.href}>{l.label} →</a>
            ))}
          </div>
        </Rise>
      )}
      <Rise mode="mount" delay={200}>
        <RichText node={p.body} />
        {p.stack?.length > 0 && <div className="chips">{p.stack.map((c) => <span className="chip" key={c}>{c}</span>)}</div>}
        <div className="case-contact"><h2>Questions about this project?</h2><p>Happy to walk through it.</p><Link className="action secondary" href="/contact">CONTACT →</Link></div>
      </Rise>
    </article>
  );
}
