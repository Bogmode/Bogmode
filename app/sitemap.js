import { getProjects, getSystems } from "@/lib/content";

export default async function sitemap() {
  const [systems, projects] = await Promise.all([getSystems(), getProjects()]);
  const paths = ["", "/about", "/contact", "/work-with-me", "/systems", "/projects", "/playground", "/playground/gmail-outreach", "/projects/dronewashers", "/feeds", "/privacy", "/terms", ...systems.map(({ slug }) => `/systems/${slug}`), ...projects.map(({ slug }) => `/project/${slug}`)];
  return paths.map((path) => ({ url: `https://bogmode.ca${path}` }));
}
