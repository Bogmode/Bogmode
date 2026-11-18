**For Codex.** Read `AGENTS.md` first. Branch from `main`, open a PR.

### Goal
Project identities (card art) are hard-coded in `components/ProjectIdentity.js`. Make them editable in Keystatic so new projects get art without code.

### Build
- Add an `identity` object to the `projects` schema: `wordmark`, `tagline`, `background`, `ink`, `accent`, `motif` (select: orbits, reticle, route, barcode, film, video-table, pace, cards, totem).
- Move each current hard-coded identity into its project's content file; keep the existing visuals pixel-identical.
- `ProjectIdentity` renders from the data; motif components stay in code.

### Done when
- [ ] Work page looks identical before/after (screenshots)
- [ ] A new test project shows art after only editing content
