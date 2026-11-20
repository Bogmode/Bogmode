import Link from "next/link";
import Crosshair from "@/components/Crosshair";
import Rise from "@/components/Rise";
import Scramble from "@/components/Scramble";
import NumberRain from "@/components/NumberRain";
import GlitchMark from "@/components/GlitchMark";
import DemoVideo from "@/components/DemoVideo";
import { getSite } from "@/lib/content";

const DEMO_URL = "https://drone-sim-gilt.vercel.app";
// TODO: no published release on Bogmode/drone-sim yet — point at the .dmg asset once one exists.
const MAC_URL = "https://github.com/Bogmode/drone-sim/releases";

const TITLE = "ProvenSky: Plan it. Prove it. Fly it.";
const DESCRIPTION = "Multi-drone mission planning for Canada, checked against the rules, real terrain and a physics simulator before you take off.";

export const metadata = {
  title: `${TITLE} — БОГMODE`,
  description: DESCRIPTION,
  alternates: { canonical: "/provensky" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/provensky", images: ["/provensky/provensky-demo-poster.jpg"] },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: ["/provensky/provensky-demo-poster.jpg"] },
};

const STEPS = [
  { k: "PLAN", t: "Draw the area, pick the drones and mission type, then check it against Canadian rules and real terrain." },
  { k: "SIMULATE", t: "Fly the plan in a physics simulator and run a wind test before anyone takes off." },
  { k: "FLY", t: "Open it on your phone in the field. Go/no-go and the pre-flight checklist go item by item." },
  { k: "REVIEW", t: "Compare the real flight with the plan, waypoint by waypoint, and export the evidence pack as a PDF." },
];

const AUDIENCE = [
  { k: "SPRAY / AGRICULTURE", t: "Operators covering fields with more than one aircraft." },
  { k: "INSPECTION & SURVEY", t: "Companies flying repeat routes around sites and structures." },
  { k: "SFOC / BVLOS", t: "Applicants who need a plan, a rules check and evidence on paper." },
];

export default async function ProvenSkyPage() {
  const site = await getSite();
  const email = site.contact?.email || "hello@bogmode.ca";
  const mailto = `mailto:${email}?subject=${encodeURIComponent("ProvenSky founding operator")}&body=${encodeURIComponent("What I fly, where, and how many aircraft:\n\n")}`;

  return (
    <article className="detail provensky">
      <NumberRain />
      <Rise mode="mount">
        <Link href="/divisions/swarm" className="back">← SWARM</Link>
        <div className="eyebrow"><Crosshair size={13} /> DRONES · MISSION PLANNING · BY <GlitchMark /></div>
      </Rise>
      <Rise mode="mount" delay={90}>
        <h1><Scramble text="ProvenSky" /><span className="ps-claim">Plan it. Prove it. Fly it.</span></h1>
        <p className="lede">{DESCRIPTION}</p>
      </Rise>
      <Rise mode="mount" delay={150}>
        <div className="hero-actions">
          <a className="action primary" href={DEMO_URL}>TRY THE DEMO →</a>
          <a className="action secondary" href={MAC_URL}>DOWNLOAD FOR MAC →</a>
          <a className="action secondary" href="#phone">ADD TO YOUR PHONE ↓</a>
        </div>
      </Rise>

      <Rise mode="mount" delay={200}>
        <figure className="ps-video">
          <DemoVideo
            label="ProvenSky demo: plan, simulate, review and fly a mission in Winnipeg"
            poster="/provensky/provensky-demo-poster.jpg"
            captions="/provensky/provensky-demo.vtt"
            sources={[
              { src: "/provensky/provensky-demo.webm", type: "video/webm" },
              { src: "/provensky/provensky-demo.mp4", type: "video/mp4" },
            ]}
          />
          <figcaption>DEMO · CAPTIONS ON ·EXAMPLE MISSION, NOT A REAL AUTHORIZATION</figcaption>
        </figure>
      </Rise>

      <Rise>
        <section className="ps-section" aria-labelledby="ps-how">
          <div className="sec-head"><span className="xh"><Crosshair size={16} /></span><h2 id="ps-how">How it works</h2></div>
          <ol className="ps-steps">
            {STEPS.map((s, i) => (
              <li key={s.k}><span className="ps-k">{String(i + 1).padStart(2, "0")} · {s.k}</span><p>{s.t}</p></li>
            ))}
          </ol>
        </section>
      </Rise>

      <Rise>
        <section className="ps-section" aria-labelledby="ps-proof">
          <div className="sec-head"><span className="xh"><Crosshair size={16} /></span><h2 id="ps-proof">Proof</h2><span className="tag">REAL FLIGHTS</span></div>
          <p className="ps-proof">Tested against 20 real flights from Carnegie Mellon University: battery use within 7 % on average, path within 34 m.</p>
          <p className="ps-limits">Limits: 20 flights from one research dataset; your aircraft, site and weather will differ. ProvenSky is decision support, not an authorization; the pilot in command remains responsible.</p>
        </section>
      </Rise>

      <Rise>
        <section className="ps-section" aria-labelledby="ps-who">
          <div className="sec-head"><span className="xh"><Crosshair size={16} /></span><h2 id="ps-who">Who it’s for</h2></div>
          <ul className="ps-audience">
            {AUDIENCE.map((a) => <li key={a.k} className="panel"><span className="ps-k">{a.k}</span><p>{a.t}</p></li>)}
          </ul>
        </section>
      </Rise>

      <Rise>
        <section className="ps-section" id="phone" aria-labelledby="ps-phone">
          <div className="sec-head"><span className="xh"><Crosshair size={16} /></span><h2 id="ps-phone">Add to your phone</h2></div>
          <ol className="ps-howto">
            <li>Open <a href={DEMO_URL}>the demo</a> on your phone.</li>
            <li><b>iPhone (Safari):</b> tap Share, then Add to Home Screen.</li>
            <li><b>Android (Chrome):</b> tap ⋮, then Install app or Add to Home screen.</li>
          </ol>
        </section>
      </Rise>

      <Rise>
        <div className="case-contact ps-founding">
          <h2>Founding operators wanted.</h2>
          <p>I’m looking for a few Canadian operators to fly ProvenSky on real jobs and tell me what breaks. Tell me what you fly and where.</p>
          <a className="action primary" href={mailto}>EMAIL ME →</a>
        </div>
      </Rise>
    </article>
  );
}
