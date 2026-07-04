import Link from "next/link";
import { notFound } from "next/navigation";
import Crosshair from "@/components/Crosshair";
import Rise from "@/components/Rise";
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
      {sys.live && (
        <Rise mode="mount" delay={180}>
          <div className="demo-slot">
            <Crosshair size={22} />
            <span>LIVE DEMO SLOT — mount the interactive component here.</span>
          </div>
        </Rise>
      )}
      <Rise mode="mount" delay={sys.live ? 260 : 180}>
        <div className="detail-body">{sys.detail}</div>
        <div className="chips">{sys.chips.map((c) => <span className="chip" key={c}>{c}</span>)}</div>
      </Rise>
    </article>
  );
}
