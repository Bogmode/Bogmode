import Crosshair from "@/components/Crosshair";
import ProjectCard from "@/components/ProjectCard";
import Rise from "@/components/Rise";
import { getProjects } from "@/lib/content";

export const metadata = {
  title: "Independent Projects — БОГMODE",
  description: "A selection of independent products, prototypes, and experiments by Bogdan Tkachuk.",
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <section className="portfolio-page">
      <Rise mode="mount">
        <div className="sec-head">
          <span className="xh"><Crosshair size={16} /></span>
          <h1 className="page-title">Independent projects.</h1>
        </div>
        <p className="section-intro">Products, prototypes, and experiments built to make an idea tangible. Each project is labeled by its current stage.</p>
      </Rise>
      <div className="portfolio-grid">
        {projects.map((project, index) => (
          <Rise key={project.slug} delay={Math.min(index, 4) * 55}>
            <ProjectCard project={project} />
          </Rise>
        ))}
      </div>
    </section>
  );
}
