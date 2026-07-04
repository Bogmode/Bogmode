import Crosshair from "@/components/Crosshair";
import Rise from "@/components/Rise";
import PhotoFrame from "@/components/PhotoFrame";
import { getSite } from "@/lib/content";

export const metadata = { title: "About — БОГMODE" };

export default async function AboutPage() {
  const site = await getSite();
  return (
    <section>
      <Rise mode="mount">
        <div className="sec-head">
          <span className="xh"><Crosshair size={16} /></span>
          <h2>About</h2>
        </div>
      </Rise>
      <div className="about-grid">
        <div className="about-body">
          {site.about.map((para, i) => (
            <Rise mode="mount" delay={90 + i * 80} key={i}>
              <p className="lede">{para}</p>
            </Rise>
          ))}
        </div>
        <div className="about-photos">
          <Rise mode="mount" delay={140}>
            <PhotoFrame src={site.portrait} alt="Bogdan" label="OPERATOR" ratio="4 / 5" />
          </Rise>
          <Rise delay={90}>
            <PhotoFrame src={site.workshop} alt="Workshop" label="WORKSHOP" ratio="4 / 3" />
          </Rise>
        </div>
      </div>
    </section>
  );
}
