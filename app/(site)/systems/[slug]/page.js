import Link from "next/link";
import { notFound } from "next/navigation";
import Crosshair from "@/components/Crosshair";
import Rise from "@/components/Rise";
import CaseStudyContent from "@/app/components/CaseStudyContent";
import { getSystems, getSystem } from "@/lib/content";

export async function generateStaticParams() {
  const systems = await getSystems();
  return systems.map((system) => ({ slug: system.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const sys = await getSystem(slug);
  return { title: sys ? sys.title + " — Bogmode" : "System not found — Bogmode" };
}

export default async function SystemDetail({ params }) {
  const { slug } = await params;
  const sys = await getSystem(slug);
  if (!sys) notFound();

  return (
    <article className="detail">
      <Rise mode="mount">
        <Link href="/systems" className="back-link">← All systems</Link>
      </Rise>
      <Rise mode="mount" delay={80}>
        <p className="eyebrow">{sys.cat} <span>—</span> {sys.status}</p>
        <h1>{sys.title}</h1>
        <p className="lede">{sys.body}</p>
      </Rise>
      {sys.live && (
        <Rise mode="mount" delay={180}>
          <div className="demo-slot"><Crosshair /><span>Live system available on request</span></div>
        </Rise>
      )}
      <Rise mode="mount" delay={sys.live ? 260 : 180}>
        <p className="detail-body">{sys.detail}</p>
        <div className="chips">{sys.chips.map((chip) => <span className="chip" key={chip}>{chip}</span>)}</div>
      </Rise>
      <Rise mode="mount" delay={sys.live ? 320 : 240}>
        <CaseStudyContent sys={sys} />
      </Rise>
    </article>
  );
}
