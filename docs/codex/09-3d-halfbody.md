**For Codex.** Read `AGENTS.md` first. Branch from `main`, open a PR.

### Goal
Bring back Bogdan's 3D half-body on the About player card. A Meshy GLB compressed with meshopt + WebP showed "3D unavailable" in `<model-viewer>` on production, so it was removed.

### Investigate + build
- Ask Bogdan for the original Meshy GLB (30 MB, not in the repo).
- Find out why `<model-viewer>` 4.1 failed (meshopt decoder location? WebP? CSP? the script failing to load?). Check the browser console on a preview deploy.
- Produce a web version under 3 MB that model-viewer loads: try Draco geometry + JPEG textures at 1024–2048, simplified to ~80k vertices.
- Re-add the PHOTO / 3D switch in `components/game/PlayerCard.js` (see git history, commit "About: studio portrait + PHOTO/3D switch"), opening on the photo.

### Done when
- [ ] 3D view loads on a Vercel preview (screen recording in PR)
- [ ] Photo still default; reduced motion = no auto-rotate
