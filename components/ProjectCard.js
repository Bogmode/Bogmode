import Image from "next/image";
import Link from "next/link";

const categoryLabels = {
  interactive: "INTERACTIVE / EDUCATION",
  games: "GAMES / 3D",
  drones: "DRONES / SIMULATION",
  "web-brand": "WEB / BRAND",
  tools: "TOOLS / DATA",
  concept: "CONCEPT",
};

const statusLabels = {
  live: "LIVE",
  "in-progress": "IN PROGRESS",
  prototype: "PROTOTYPE",
  paused: "PAUSED",
  concept: "CONCEPT",
};

export default function ProjectCard({ project }) {
  return (
    <article className="portfolio-card">
      <Link className="portfolio-card-art" href={`/project/${project.slug}`} aria-label={`View ${project.title}`}>
        {project.cover ? (
          <Image src={project.cover} alt="" fill sizes="(max-width: 820px) 100vw, (max-width: 1200px) 50vw, 33vw" />
        ) : (
          <div className={`portfolio-art-fallback category-${project.category || "tools"}`} aria-hidden="true">
            <span>{project.title}</span>
            <small>{categoryLabels[project.category] || "INDEPENDENT PROJECT"}</small>
          </div>
        )}
        <span className="portfolio-status">{statusLabels[project.status] || "PROJECT"}</span>
      </Link>
      <div className="portfolio-card-copy">
        <span className="project-type">{categoryLabels[project.category] || "INDEPENDENT PROJECT"}{project.year ? ` · ${project.year}` : ""}</span>
        <h2><Link href={`/project/${project.slug}`}>{project.title}</Link></h2>
        <p>{project.summary}</p>
        <Link className="portfolio-card-link" href={`/project/${project.slug}`}>OPEN PROJECT <span aria-hidden="true">→</span></Link>
      </div>
    </article>
  );
}
