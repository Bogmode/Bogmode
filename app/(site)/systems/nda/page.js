import Link from "next/link";
import Crosshair from "@/components/Crosshair";
import SystemCard from "@/components/SystemCard";
import Rise from "@/components/Rise";
import { getSystems } from "@/lib/content";

export const metadata = { title: "NDA folder — БОГMODE" };

export default async function NdaPage() {
  const systems = (await getSystems()).filter((s) => s.nda);
  return (
    <section>
      <Rise mode="mount">
        <Link href="/systems" className="tag-link nda-back">← WORK</Link>
        <div className="sec-head">
          <span className="xh"><Crosshair size={16} /></span>
          <h1 className="page-title">NDA folder</h1>
          <span className="tag">PROFESSIONAL WORK</span>
        </div>
        <p className="section-intro">Systems I built and run in my day job in B2B ingredients. Company names, clients and numbers are removed. Happy to go deeper in conversation.</p>
      </Rise>
      <div className="sys-grid featured-case-grid">
        {systems.map((s, i) => (
          <Rise key={s.slug} delay={i * 90}><SystemCard s={s} /></Rise>
        ))}
      </div>
    </section>
  );
}
