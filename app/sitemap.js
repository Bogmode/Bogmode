import { getProjects, getNews } from "@/lib/content";

export default async function sitemap() {
  const [projects, news] = await Promise.all([getProjects(), getNews()]);
  return ["", "/fit", "/about", "/contact", "/systems", "/playground", "/playground/gmail-outreach", "/feeds", "/privacy", "/terms", "/systems/business-intelligence", "/systems/upstreams", "/systems/fiend", "/systems/dronewashers", "/systems/nda", "/news", ...projects.map((p) => `/work/${p.slug}`), ...news.map((n) => `/news/${n.slug}`)].map(path => ({ url: "https://bogmode.ca" + path }));
}
