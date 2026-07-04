// Single content access layer. Everything reads from the Keystatic-managed
// files in content/ (git-based — no external CMS). Edit via /keystatic or
// directly in the JSON files; both are the same source of truth.
import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "../keystatic.config";

const reader = createReader(process.cwd(), keystaticConfig);

const FALLBACK_SITE = {
  headline: "I build the systems you can't afford to hire for yet.",
  subhead: "Digital infrastructure for founders and creatives coming up from nothing.",
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
