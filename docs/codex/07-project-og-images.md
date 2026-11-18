**For Codex.** Read `AGENTS.md` first. Branch from `main`, open a PR.

### Goal
When a project link is shared, the preview card should show that project's own identity, not the generic site image.

### Build
- `app/(site)/work/[slug]/opengraph-image.js` using `ImageResponse` (read `node_modules/next/dist/docs/` for this Next version first).
- 1200×630: project identity background colour, wordmark, tagline, motif, the БОГMODE wordmark small in a corner, "bogmode.ca".
- Bundle a font file that covers Cyrillic (for БОГ).
- Remove the explicit `images` override in that page's `generateMetadata` so the generated image is used.

### Done when
- [ ] `/work/drone-sim/opengraph-image` renders for every visible project (attach 3 examples)
- [ ] Build passes
