import Crosshair from "@/components/Crosshair";
import SystemCard from "@/components/SystemCard";
import Rise from "@/components/Rise";
import { getSystems } from "@/lib/content";

const PROFESSIONAL_SYSTEMS = new Set([
  "revenue-lifecycle-engine",
  "business-intelligence",
  "ai-product-intelligence",
]);

export const metadata = { title: "GTM Systems — БОГMODE" };

export default async function SystemsPage() {
  const systems = await getSystems();
  return (
    <section>
      <Rise mode="mount">
        <div className="sec-head">
          <span className="xh"><Crosshair size={16} /></span>
          <h1 className="page-title">Systems behind revenue.</h1>
        </div>
        <p className="section-intro">I design and operate CRM architecture, lifecycle automation, commercial data systems, and AI-assisted internal tools. The first three are sanitized examples from live business operations. The rest are independent products and prototypes.</p>
      </Rise>
      <div className="sys-grid featured-case-grid">
        {systems.filter((s) => PROFESSIONAL_SYSTEMS.has(s.slug)).map((s) => <SystemCard key={s.slug} s={s} />)}
      </div>
      <div className="sec-head experiments-heading"><h2>Independent products and prototypes.</h2></div>
      <div className="sys-grid">
        {systems.filter((s) => !PROFESSIONAL_SYSTEMS.has(s.slug)).map((s) => <SystemCard key={s.slug} s={s} />)}
      </div>
    </section>
  );
}
