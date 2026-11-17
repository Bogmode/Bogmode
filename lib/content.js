// Single content access layer. Everything reads from the Keystatic-managed
// files in content/ (git-based — no external CMS). Edit via /keystatic or
// directly in the JSON files; both are the same source of truth.
import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "../keystatic.config";

const reader = createReader(process.cwd(), keystaticConfig);

const FALLBACK_SITE = {
  headline: "Your messy business problem.",
  subhead: "My kind of magic.",
  lede: "",
  telemetry: [],
  about: [],
  portrait: null,
  workshop: null,
  links: { linkedin: null, youtube: null, github: null },
  contact: { email: "hello@bogmode.ca", formIntro: "" },
};

export async function getSite() {
  const site = await reader.singletons.site.read();
  return site ? { ...FALLBACK_SITE, ...site } : FALLBACK_SITE;
}

export async function getSystems() {
  const all = await reader.collections.systems.all();
  return all
    .map(({ slug, entry }) => ({ slug, ...entry }))
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

export async function getSystem(slug) {
  const entry = await reader.collections.systems.read(slug);
  return entry ? { slug, ...entry } : null;
}

export async function getPlayground() {
  const all = await reader.collections.playground.all();
  return all
    .map(({ slug, entry }) => ({ slug, ...entry }))
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

// ── Portfolio projects ─────────────────────────────────────────────
// Entries still being written (summary starts with TODO), concepts, and
// projects that already have a Systems case study are kept off the site.
const HIDDEN_PROJECTS = new Set(["upstreams", "fiend", "dronewashers", "bogmode-site"]);

function isPresentable(slug, p) {
  return !HIDDEN_PROJECTS.has(slug)
    && p.category !== "concept"
    && p.summary && !/^\s*TODO/i.test(p.summary);
}

export async function getProjects() {
  const all = await reader.collections.projects.all();
  return all
    .filter(({ slug, entry }) => isPresentable(slug, entry))
    .map(({ slug, entry }) => ({ slug, ...entry }))
    .sort((a, b) => (a.order ?? 100) - (b.order ?? 100));
}

export async function getProject(slug) {
  const entry = await reader.collections.projects.read(slug);
  if (!entry || !isPresentable(slug, entry)) return null;
  const { node } = await entry.body();
  return { slug, ...entry, body: node };
}

// ── News ───────────────────────────────────────────────────────────
export async function getNews() {
  const all = await reader.collections.news.all();
  return all
    .map(({ slug, entry }) => ({ slug, ...entry }))
    .sort((a, b) => String(b.date).localeCompare(String(a.date)));
}

export async function getNewsPost(slug) {
  const entry = await reader.collections.news.read(slug);
  if (!entry) return null;
  const { node } = await entry.body();
  return { slug, ...entry, body: node };
}
