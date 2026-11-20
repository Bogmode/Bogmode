import { getProjects, getNews, getDivisions } from "@/lib/content";

export default async function sitemap() {
  const [projects, news, divisions] = await Promise.all([getProjects(), getNews(), getDivisions()]);
  return ["", "/fit", "/about", "/contact", "/systems", "/playground", "/playground/gmail-outreach", "/feeds", "/privacy", "/terms", "/systems/business-intelligence", "/systems/upstreams", "/systems/fiend", "/systems/dronewashers", "/systems/nda", "/news", ...divisions.map((d) => `/divisions/${d.slug}`), ...projects.map((p) => p.href), ...news.map((n) => `/news/${n.slug}`)].map(path => ({ url: "https://bogmode.ca" + path }));
}
