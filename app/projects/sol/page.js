import GlitchMark from "@/components/GlitchMark";
import Link from "next/link";
import styles from "./sol.module.css";

export const metadata = {
  title: "SOL — play | БОГMODE",
  description: "A gold sun you can poke. Tap a side to turn it. Five quick taps give it ten seconds of fire.",
  alternates: { canonical: "/projects/sol" },
};

export default function SolPlay() {
  return (
    <main className={styles.play}>
      <header className={styles.bar}>
        <Link href="/work/sol" className={styles.back}>← <GlitchMark /></Link>
        <p>SOL · TAP A SIDE · FIVE QUICK TAPS</p>
      </header>
      <iframe className={styles.frame} src="/project-previews/sol.html" title="SOL — interactive sun" sandbox="allow-scripts" allow="autoplay" />
    </main>
  );
}
