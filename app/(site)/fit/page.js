import Crosshair from "@/components/Crosshair";
import Rise from "@/components/Rise";
import FitEngine from "@/components/FitEngine";
import { getSite, getSystems } from "@/lib/content";

export const metadata = {
  title: "Fit engine — БОГMODE",
  description: "Pick the role and the problems. Get the matching proof, tools, and a first-90-days plan.",
};

export default async function FitPage() {
  const [site, systems] = await Promise.all([getSite(), getSystems()]);
  const slim = systems.map(({ slug, title, cat, status }) => ({ slug, title, cat, status }));
  return (
    <section>
      <Rise mode="mount">
        <div className="sec-head">
          <span className="xh"><Crosshair size={16} /></span>
          <h1 className="page-title">Fit engine</h1>
          <span className="tag">FOR HIRING TEAMS</span>
        </div>
      </Rise>
      <Rise mode="mount" delay={80}>
        <p className="lede">Skip the scroll. Tell the engine what you are hiring for and what is breaking. It pulls the closest work I have done, the tools involved, and how I would spend the first 90 days.</p>
      </Rise>
      <Rise mode="mount" delay={160}>
        <FitEngine systems={slim} email={site.contact.email} />
      </Rise>
    </section>
  );
}
