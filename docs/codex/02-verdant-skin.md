**For Codex.** Read `AGENTS.md` first. Branch from `main`, open a PR.

### Goal
The site has no real green. Add a sixth skin, **VERDANT**, with a proper green range, and give it its own totem: a **stag**.

### Build
- CSS `.bm[data-skin="verdant"]` with the full variable set (`--paper --panel --ink --block --muted --line --accent --accent-ink --glow`). Direction: deep forest paper, moss panels, bright leaf-green accent. Text must pass WCAG AA.
- Add `verdant` to the skin lists (`components/SkinToggle.js`, `components/SkinProvider.js`) and to `components/game/totemData.js` (division: suggest **Lab** or ask in the PR), with three joke stats and a one-liner.
- Draw a **stag** silhouette in `components/totems.js` in the same low-poly 0–100 polygon style as the others (side view, antlers clearly readable). Map `verdant: "stag"` in `SKIN_TOTEM`.
- Check the hero core (dark or light stage) and the ASCII strip in the new skin.

### Done when
- [ ] Particles gather into a readable stag in the hero core
- [ ] Skin looks right on home, Work, a division page and a project page (screenshots in PR)
- [ ] Contrast checked
