import Link from "next/link";

export default function NdaFolder({ count }) {
  return (
    <Link href="/systems/nda" className="panel-link" aria-label="Open the NDA folder">
      <article className="panel system-card nda-card">
        <span className="nda-tab" aria-hidden="true">NDA</span>
        <div className="meta">
          <span className="cat">PROFESSIONAL WORK</span>
          <span className="status">UNDER NDA</span>
        </div>
        <h3>NDA folder</h3>
        <p>{count} case studies from my day job in B2B ingredients: sales pipeline, reporting and product data systems. Names and numbers removed.</p>
        <span className="tag-link">OPEN FOLDER →</span>
      </article>
    </Link>
  );
}
