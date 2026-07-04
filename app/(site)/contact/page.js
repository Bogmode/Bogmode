import Crosshair from "@/components/Crosshair";
import Rise from "@/components/Rise";
import ContactForm from "@/components/ContactForm";
import { getSite } from "@/lib/content";

export const metadata = { title: "Contact — БОГMODE" };

export default async function ContactPage() {
  const site = await getSite();
  return (
    <section>
      <Rise mode="mount">
        <div className="sec-head">
          <span className="xh"><Crosshair size={16} /></span>
          <h2>Contact</h2>
          <span className="tag">CHANNEL — OPEN</span>
        </div>
      </Rise>
      <div className="contact-grid">
        <Rise mode="mount" delay={80}>
          <p className="lede">{site.contact.formIntro}</p>
          <div className="telemetry contact-tel">
            <div><span className="k">EMAIL</span> — {site.contact.email}</div>
            <div><span className="k">BASE</span> — Winnipeg, MB · CST</div>
            <div><span className="k">LANG</span> — EN · UK · RU</div>
          </div>
        </Rise>
        <Rise mode="mount" delay={160}>
          <ContactForm toEmail={site.contact.email} />
        </Rise>
      </div>
    </section>
  );
}
