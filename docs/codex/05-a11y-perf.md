**For Codex.** Read `AGENTS.md` first. Branch from `main`, open a PR.

### Goal
An **accessibility + performance pass** across the site, then fix what's found.

### Check
- Lighthouse (mobile) on `/`, `/systems`, `/work/drone-sim`: performance, accessibility, best practices, SEO.
- Keyboard: tab order, visible focus, the totem select dialog traps focus and returns it on close, the quest panel closes with Esc.
- Screen readers: GlitchMark announces "БОГMODE" once (not twice), canvases are `aria-hidden`, toasts are polite.
- Weight: lazy-load `three` only where needed; no layout shift from the hero core or ASCII strip.

### Done when
- [ ] Before/after Lighthouse scores in the PR
- [ ] Fixes don't change the look (screenshots)
