**For Codex.** Read `AGENTS.md` first. Branch from `main`, open a PR. Depends on 01 (DemoStage).

### Goal
Give DemoStage's `scene` kind real content: small live three.js scenes per project, in the same style as the project's card art (`components/ProjectIdentity.js`).

### Build
- `components/scenes/` with one scene per project, registered by id: `planner-routes` (multi-drone routes drawing themselves between waypoints), `dronesim-hover` (a quad holding position over a grid, wobbling in wind), `scales-orbits` (nested orbits, atom → planet).
- Use each identity's colours (`--id-accent`, background). Pause off-screen, still frame for reduced motion, 20 fps cap on mobile.
- Set `demo.kind: scene` + `demo.src` on those three projects in `content/projects/`.

### Done when
- [ ] Three scenes running on their project pages (desktop + mobile screenshots)
- [ ] No console errors, build passes
