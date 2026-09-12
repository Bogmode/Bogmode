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
          <h2>Systems</h2>
          <span className="tag">WORK, PRODUCTS &amp; PROTOTYPES</span>
        </div>
      </Rise>
      <p className="section-intro">Business systems, independent products, and service concepts. Different problems, brought into working form.</p>
      <div className="sys-grid">
        {systems.map((s, i) => (
          <Rise key={s.slug} mode="mount" delay={100 + i * 90}>
            <SystemCard s={s} />
          </Rise>
        ))}
      </div>
    </section>
  );
}
