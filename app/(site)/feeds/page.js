import Link from "next/link";
import FeedEmbed from "@/components/FeedEmbed";
import { getFeed, feedConfig } from "@/lib/feeds";
export const metadata = { title: "Feeds — БОГMODE", description: "Follow Bogdan: ideas, work, and life outside the brief." };
export const revalidate = 1800;
function FeedList({ feed, provider, profile }) {
  return <>{feed.items.length ? <div className="feed-list">{feed.items.map(item => <article key={item.url}><a href={item.url} rel="noreferrer" target="_blank"><h3>{item.title} ↗</h3></a>{item.date && !Number.isNaN(Date.parse(item.date)) && <time dateTime={item.date}>{new Date(item.date).toLocaleDateString("en-CA",{year:"numeric",month:"short",day:"numeric",timeZone:"UTC"})}</time>}{provider === "YouTube" && item.videoId && <FeedEmbed provider="YouTube" videoId={item.videoId} />}</article>)}</div> : <p className="contact-note">{feed.state === "empty" ? "No public posts yet." : "Posts aren’t loading right now. Visit the original channel below."}</p>}<a className="tag-link" href={profile} target="_blank" rel="noreferrer">OPEN {provider.toUpperCase()} →</a></>;
}
export default async function FeedsPage() {
  const [medium,youtube] = await Promise.all([getFeed("medium"),getFeed("youtube")]);
  const posts = (feedConfig.linkedinPosts || []).filter(post => /^\d{15,22}$/.test(post.id));
  return <section className="feeds-page">
    <div className="sec-head"><h1 className="page-title">Elsewhere, in real life.</h1><span className="tag">FEEDS / FIND ME</span></div>
    <p className="lede">Work in progress, ideas in the wild, and things worth sharing.</p>
    <div className="social-accounts">
      <a className="social-account linkedin-account" href={feedConfig.linkedinProfile} target="_blank" rel="noreferrer"><span>in</span><div><h2>LinkedIn</h2><p>Bogdan Tkachuk · Work, ideas & conversations</p></div><b aria-hidden="true">↗</b></a>
      <a className="social-account instagram-account" href={feedConfig.instagramProfile} target="_blank" rel="noreferrer"><span>ig</span><div><h2>Instagram</h2><p>@bogmoder · Life, finds & reposts</p></div><b aria-hidden="true">↗</b></a>
    </div>
    <nav className="feed-jump" aria-label="Feed channels"><a href="#linkedin">LinkedIn</a><a href="#instagram">Instagram</a>{feedConfig.mediumProfile && <a href="#medium">Medium</a>}{feedConfig.youtubeProfile && <a href="#youtube">YouTube</a>}</nav>
    <section id="linkedin" className="feed-section"><span className="case-label">WORK & IDEAS</span><h2>On LinkedIn</h2>{posts.length ? posts.map(post => <FeedEmbed key={post.id} provider="LinkedIn" postId={post.id} />) : <p>Building things, sharing ideas, and meeting people doing interesting work.</p>}<a className="action secondary" href={feedConfig.linkedinProfile} target="_blank" rel="noreferrer">SEE MY POSTS ON LINKEDIN ↗</a></section>
    <section id="instagram" className="feed-section"><span className="case-label">DAILY FINDS</span><h2>Instagram · @bogmoder</h2><FeedEmbed provider="Instagram" /></section>
    {feedConfig.mediumProfile && <section id="medium" className="feed-section"><span className="case-label">WRITING</span><h2>On Medium</h2><FeedList feed={medium} provider="Medium" profile={feedConfig.mediumProfile} /></section>}
    {feedConfig.youtubeProfile && <section id="youtube" className="feed-section"><span className="case-label">IN MOTION</span><h2>On YouTube</h2><FeedList feed={youtube} provider="YouTube" profile={feedConfig.youtubeProfile} /></section>}
    <p className="contact-note">Embedded media loads only when you choose. <Link href="/privacy">Privacy & cookies →</Link></p>
  </section>;
}
