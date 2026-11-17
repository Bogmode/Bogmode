import Link from "next/link";
import { notFound } from "next/navigation";
import Crosshair from "@/components/Crosshair";
import Rise from "@/components/Rise";
import RichText from "@/components/RichText";
import { formatDate } from "@/components/NewsList";
import { getNews, getNewsPost } from "@/lib/content";

export async function generateStaticParams() {
  const posts = await getNews();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = await getNewsPost(slug);
  return p ? { title: `${p.title} — БОГMODE`, description: p.summary } : { title: "БОГMODE" };
}

export default async function NewsPost({ params }) {
  const { slug } = await params;
  const p = await getNewsPost(slug);
  if (!p) notFound();
  return (
    <article className="detail">
      <Rise mode="mount">
        <Link href="/news" className="back">← NEWS</Link>
        <div className="eyebrow"><Crosshair size={13} /> {formatDate(p.date)}</div>
      </Rise>
      <Rise mode="mount" delay={90}>
        <h1>{p.title}</h1>
        <p className="lede">{p.summary}</p>
      </Rise>
      <Rise mode="mount" delay={160}><RichText node={p.body} /></Rise>
    </article>
  );
}
