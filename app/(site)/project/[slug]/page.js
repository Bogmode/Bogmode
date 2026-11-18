import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DocumentRenderer } from "@keystatic/core/renderer";
import Crosshair from "@/components/Crosshair";
import Rise from "@/components/Rise";
import { getProject, getProjects } from "@/lib/content";

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return { title: "Project — БОГMODE" };
  return {
    title: `${project.title} — БОГMODE`,
    description: project.summary,
    openGraph: {
      title: project.title,
      description: project.summary,
      type: "article",
      images: [{ url: `/project/${slug}/opengraph-image`, width: 1200, height: 630, alt: project.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.summary,
      images: [`/project/${slug}/opengraph-image`],
    },
  };
}

export default async function ProjectDetailPage({ params }) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  return (
    <article className="detail portfolio-detail">
      <Rise mode="mount">
        <Link href="/projects" className="back">← ALL PROJECTS</Link>
        <div className="eyebrow"><Crosshair size={13} /> {project.category} · {project.status}</div>
        <h1>{project.title}</h1>
        <p className="lede">{project.summary}</p>
        {project.cover && (
          <div className="portfolio-hero-image">
            <Image src={project.cover} alt={`${project.title} project artwork`} fill priority sizes="(max-width: 900px) 100vw, 900px" />
          </div>
        )}
      </Rise>
      <Rise mode="mount" delay={100}>
        {project.role && <p className="portfolio-role"><span>ROLE</span>{project.role}</p>}
        {project.stack?.length > 0 && (
          <div className="chips" aria-label="Technology used">
            {project.stack.map((item) => <span className="chip" key={item}>{item}</span>)}
          </div>
        )}
        <div className="portfolio-markdoc"><DocumentRenderer document={project.body} /></div>
        <div className="portfolio-links">
          {project.links?.live && <a className="action primary" href={project.links.live}>OPEN LIVE PROJECT ↗</a>}
          {project.links?.video && <a className="action secondary" href={project.links.video}>WATCH DEMO ↗</a>}
          {project.links?.repo && <a className="tag-link" href={project.links.repo}>SOURCE CODE ↗</a>}
        </div>
        {project.related?.length > 0 && (
          <section className="portfolio-related">
            <h2>Related projects</h2>
        <div className="chips">{project.related.map((relatedSlug) => <Link className="chip" key={relatedSlug} href={`/project/${relatedSlug}`}>{relatedSlug.replaceAll("-", " ")}</Link>)}</div>
          </section>
        )}
        <div className="case-contact"><h2>Have a related challenge?</h2><p>Tell me what needs to work better. Let’s figure out the next step.</p><Link className="action primary" href="/work-with-me">DISCUSS A PROJECT →</Link></div>
      </Rise>
    </article>
  );
}
