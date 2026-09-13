import Link from "next/link";
import { notFound } from "next/navigation";
import Crosshair from "@/components/Crosshair";
import Rise from "@/components/Rise";
import SystemFlow from "@/components/SystemFlow";
import { getSystems, getSystem } from "@/lib/content";

export async function generateStaticParams() {
  const systems = await getSystems();
  return systems.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const sys = await getSystem(slug);
  return { title: sys ? `${sys.title} — БОГMODE` : "БОГMODE" };
}

export default async function SystemDetail({ params }) {
  const { slug } = await params;
  const sys = await getSystem(slug);
  if (!sys) notFound();

  return (
    <article className="detail">
      <Rise mode="mount">
        <Link href="/systems" className="back">← SYSTEMS</Link>
        <div className="eyebrow"><Crosshair size={13} /> {sys.cat}</div>
      </Rise>
      <Rise mode="mount" delay={90}>
        <h1>{sys.title}</h1>
        <p className="lede">{sys.body}</p>
      </Rise>
      {sys.projectUrl && (
        <Rise mode="mount" delay={150}>
          <a className="action primary" href={sys.projectUrl}>{sys.projectLabel || "EXPLORE PROJECT"} →</a>
        </Rise>
      )}
      <Rise mode="mount" delay={sys.live ? 260 : 180}>
        <div className="detail-flow"><SystemFlow kind={slug} /></div>
        <p className="detail-intro">{sys.detail}</p>
        {sys.sections?.length ? (
          <div className="case-sections">
            {sys.sections.map((section) => (
              <section className="case-section" key={section.label}>
                <span className="case-label">{section.label}</span>
                <p>{section.copy}</p>
              </section>
            ))}
          </div>
        ) : (
          <div className="detail-body">{sys.detail}</div>
        )}
        <div className="case-contact"><h2>Have a related challenge?</h2><p>Tell me what needs to work better. Let’s figure out the next step.</p><Link className="action primary" href="/contact">LET’S TALK →</Link></div>
        <div className="chips">{sys.chips.map((c) => <span className="chip" key={c}>{c}</span>)}</div>
      </Rise>
    </article>
  );
}
