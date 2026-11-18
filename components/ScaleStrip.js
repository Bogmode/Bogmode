import Link from "next/link";
import AsciiScene from "./AsciiScene";
import Crosshair from "./Crosshair";
import Rise from "./Rise";

const SCALES = [
  { kind: "atom", tag: "10⁻¹⁰ M", name: "Atom", line: "Nine nucleons, three orbits, never still." },
  { kind: "microbe", tag: "10⁻⁶ M", name: "Microbe", line: "A gut bacterium, swimming in place." },
  { kind: "planet", tag: "10⁷ M", name: "Planet", line: "Rings, a moon, one slow day." },
];

export default function ScaleStrip() {
  return (
    <section id="scales">
      <Rise>
        <div className="sec-head">
          <span className="xh"><Crosshair size={16} /></span>
          <h2>Everything at every scale.</h2>
          <Link href="/work/scales-of-existence" className="tag-link">SCALES OF EXISTENCE →</Link>
        </div>
      </Rise>
      <div className="scale-strip">
        {SCALES.map((s, i) => (
          <Rise key={s.kind} delay={i * 90}>
            <figure className="panel scale-tile">
              <div className="scale-head"><span>{s.name.toUpperCase()}</span><span>{s.tag}</span></div>
              <AsciiScene kind={s.kind} label={`${s.name}, animated in ASCII`} />
              <figcaption>{s.line}</figcaption>
            </figure>
          </Rise>
        ))}
      </div>
    </section>
  );
}
