**For Codex.** Read `AGENTS.md` first. Branch from `main`, open a PR.

### Goal
Catch breakage before it goes live: add **Playwright smoke tests** and run them in GitHub Actions on every PR.

### Tests
- Pages return 200 with no console errors: `/`, `/systems`, `/systems/nda`, `/divisions/swarm`, `/work/drone-sim`, `/news`, `/about`.
- No visible text starting with "TODO" on any of them.
- Totem select: open with **◆ TOTEM**, arrow right, Enter → `data-skin` changes.
- Cheat: typing `godmode` sets `data-cheat="god"` on `.bm`.
- Reduced motion (`reducedMotion: "reduce"`): pages still render.

### CI
- `.github/workflows/smoke.yml`: install, `npm run build`, start, run tests. Note: `next/font` fetches Google Fonts at build time; make sure CI has network or mock fonts.

### Done when
- [ ] Workflow green on the PR
- [ ] `npm run test:smoke` works locally
