import Crosshair from "@/components/Crosshair";
import Rise from "@/components/Rise";
import NewsList from "@/components/NewsList";
import { getNews } from "@/lib/content";

export const metadata = { title: "News — БОГMODE", description: "Weekly updates on what I'm building." };

export default async function NewsPage() {
  const posts = await getNews();
  return (
    <section>
      <Rise mode="mount">
        <div className="sec-head">
          <span className="xh"><Crosshair size={16} /></span>
          <h1 className="page-title">News</h1>
          <span className="tag">WEEKLY</span>
        </div>
        <p className="section-intro">A short update every week: what I'm building, what shipped, what I learned.</p>
      </Rise>
      <Rise delay={90}><NewsList posts={posts} /></Rise>
    </section>
  );
}
