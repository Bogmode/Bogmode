import Crosshair from "@/components/Crosshair";
import SystemCard from "@/components/SystemCard";
import Rise from "@/components/Rise";
import { getSystems } from "@/lib/content";

export const metadata = { title: "Systems — БОГMODE" };

export default async function SystemsPage() {
  const systems = await getSystems();
  return (
    <section>
      <Rise mode="mount">
        <div className="sec-head">
          <span className="xh"><Crosshair size={16} /></span>
          <h1 className="page-title">Systems that make work easier.</h1>
        </div>
        <p className="section-intro">I solve problems with data, AI agents, and automation. Start with a system in everyday use, then explore the products and concepts I’m building.</p>
      </Rise>
      <div className="sys-grid featured-case-grid">
        {systems.filter((s) => s.slug === "business-intelligence").map((s) => <SystemCard key={s.slug} s={s} />)}
      </div>
      <div className="sec-head experiments-heading"><h2>Independent products &amp; experiments</h2></div>
      <div className="sys-grid">
        {systems.filter((s) => s.slug !== "business-intelligence").map((s) => <SystemCard key={s.slug} s={s} />)}
      </div>
    </section>
  );
}
