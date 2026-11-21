import Link from "next/link";
import ProjectIdentity from "./ProjectIdentity";

export function formatDate(d) {
  if (!d) return "";
  const [y, m, day] = String(d).split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, day)).toLocaleDateString("en-CA", {
    year: "numeric", month: "short", day: "numeric", timeZone: "UTC",
  }).toUpperCase();
}

export default function NewsList({ posts }) {
  return (
    <div className="news-list">
      {posts.map((p) => (
        <Link key={p.slug} href={`/news/${p.slug}`} className={`news-item${p.art ? " has-art" : ""}`}>
          <span className="news-date">{formatDate(p.date)}</span>
          {p.art && <div className="news-thumb"><ProjectIdentity kind={p.art} thumb /></div>}
          <div>
            <h3>{p.title}</h3>
            <p>{p.summary}</p>
          </div>
          <span className="news-arrow" aria-hidden="true">→</span>
        </Link>
      ))}
    </div>
  );
}
