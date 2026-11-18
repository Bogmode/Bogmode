**For Codex.** Read `AGENTS.md` first. Branch from `main`, open a PR.

### Goal
Every project page opens on something you can touch. Build a shared **DemoStage** player and wire it into project pages.

### Context
- Keystatic `projects` already has a `demo` field: `{ kind: none | embed | scene | video, src, poster }` (`keystatic.config.js`).
- Project page: `app/(site)/work/[slug]/page.js`.

### Build
- `components/DemoStage.js` (client):
  - `embed` → lazy iframe (`loading="lazy"`, sandboxed, `allow="fullscreen"`), shown only after a click on the poster ("▶ RUN DEMO").
  - `video` → muted, looping, `playsInline`, plays only while on screen.
  - `scene` → reserved for three.js scenes by id; render a "SCENE COMING SOON" placeholder for now.
  - `none` → render nothing.
  - Poster image first, framed like `.hero-scene` (head bar + caption, corner brackets).
- Show it on the project page between the lede and the case study.
- Reduced motion: no autoplay, poster only until clicked.

### Done when
- [ ] Works for embed, video, none (test with one dummy entry, then revert content)
- [ ] Desktop + mobile screenshots in the PR
- [ ] `npm run build` passes, no console errors
