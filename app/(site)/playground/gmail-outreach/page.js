import Link from "next/link";
import Crosshair from "@/components/Crosshair";
import GmailOutreachStudio from "@/components/GmailOutreachStudio";
import Rise from "@/components/Rise";

export const metadata = {
  title: "Gmail Outreach Studio — БОГMODE Playground",
  description: "A local-first campaign composer with CSV personalization, HTML preview, attachments, dry-run checks, and guarded Gmail sending.",
};

export default function GmailOutreachPage() {
  return (
    <section>
      <Rise mode="mount">
        <div className="sec-head">
          <span className="xh"><Crosshair size={16} /></span>
          <h1 className="page-title">Gmail Outreach Studio</h1>
          <span className="tag">PLAYGROUND / USABLE TOOL</span>
        </div>
      </Rise>
      <Rise mode="mount" delay={60}>
        <div className="tool-intro">
          <Link href="/playground">← BACK TO PLAYGROUND</Link>
          <p>Prepare thoughtful, personalized outreach without handing your recipient list to a third party. Import, compose, preview, validate, and export locally. Direct Gmail sending stays locked behind OAuth and an explicit final confirmation.</p>
          <div><span>LOCAL-FIRST</span><span>MAX 25 / RUN</span><span>NO TRACKING PIXELS</span><span>DRY-RUN DEFAULT</span></div>
        </div>
      </Rise>
      <Rise mode="mount" delay={100}>
        <GmailOutreachStudio />
      </Rise>
    </section>
  );
}
