import Parser from "rss-parser";
import config from "@/content/feeds.json";
const parser = new Parser({ customFields: { item: ["yt:videoId"] } });
export { config as feedConfig };
export async function getFeed(provider) {
  let url;
  if (provider === "medium") {
    let profile;
    try { profile = new URL(config.mediumProfile); } catch { return { state: "unconfigured", items: [] }; }
    if (profile.protocol !== "https:" || profile.hostname !== "medium.com" || !/^\/@[a-zA-Z0-9_.-]+\/?$/.test(profile.pathname)) return { state: "unconfigured", items: [] };
    url = `https://medium.com/feed${profile.pathname.replace(/\/$/, "")}`;
  } else if (provider === "youtube" && /^UC[a-zA-Z0-9_-]{22}$/.test(config.youtubeChannelId)) {
    url = `https://www.youtube.com/feeds/videos.xml?channel_id=${config.youtubeChannelId}`;
  } else return { state: "unconfigured", items: [] };
  try {
    const response = await fetch(url, { next: { revalidate: 1800 }, signal: AbortSignal.timeout(8000), redirect: "error" });
    if (!response.ok) throw new Error("Feed unavailable");
    const xml = await response.text();
    if (xml.length > 2000000) throw new Error("Feed too large");
    const feed = await parser.parseString(xml);
    const items = feed.items.slice(0,6).flatMap(item => {
      let link;
      try { link = new URL(item.link); } catch { return []; }
      if (link.protocol !== "https:" || !(provider === "medium" ? link.hostname === "medium.com" || link.hostname.endsWith(".medium.com") : ["www.youtube.com","youtube.com"].includes(link.hostname))) return [];
      const videoId = item["yt:videoId"] || link.searchParams.get("v");
      return [{ title: String(item.title || "Untitled").slice(0,200), url: link.href, date: item.isoDate || null, videoId: /^[a-zA-Z0-9_-]{11}$/.test(videoId || "") ? videoId : null }];
    });
    return { state: items.length ? "ready" : "empty", items };
  } catch { return { state: "unavailable", items: [] }; }
}
