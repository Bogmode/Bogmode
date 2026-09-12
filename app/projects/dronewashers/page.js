import Link from "next/link";
import styles from "./preview.module.css";

export const metadata = {
  title: "DroneWashers — Project preview | БОГMODE",
  description: "A drone-cleaning service website concept by Bogdan, under the БОГMODE umbrella.",
  robots: { index: false, follow: false },
};

export default function DroneWashersPreview() {
  return (
    <main className={styles.preview}>
      <header className={styles.bar}>
        <Link href="/#independent-work" className={styles.back}>← БОГMODE</Link>
        <div><h1>DroneWashers <span>Website concept</span></h1><p>Interactive preview. Service claims, pricing, and testimonials are draft content. Quote requests are not sent.</p></div>
      </header>
      <iframe className={styles.frame} src="/project-previews/dronewashers.html" title="DroneWashers interactive website concept" sandbox="allow-scripts" />
    </main>
  );
}
