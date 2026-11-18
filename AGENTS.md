<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# bogmode.ca — rules for agents (Claude, Codex)

**What this is:** БОГMODE, Bogdan Tkachuk's studio site. Next.js (app router) + Keystatic (content in `content/`) + three.js, deployed on Vercel from `main`.

**Look & feel — keep it coherent**
- Five skins (`components/SkinProvider.js`, CSS `.bm[data-skin=…]` in `app/globals.css`): asiimov, vulcan, manticore, donatello, mono. Each has a totem animal (`components/totems.js`) and a division (`content/divisions/`).
- Zero border-radius, mono labels in caps, crosshair/corner-bracket motifs, faint grid, film grain.
- The wordmark is always `<GlitchMark />` (БОГMODE ⇄ GODMODE melt). Never hard-code "БОГMODE" as plain text in UI.
- Colours come from CSS variables (`--paper --panel --ink --muted --line --accent --accent-ink --glow`). No hard-coded colours in components except inside dark overlays.

**Motion rules (non-negotiable)**
- Every animation pauses off-screen (IntersectionObserver) and in background tabs.
- `prefers-reduced-motion: reduce` → still frame / final state, no loops.
- Mobile: cap frame rate (15–20 fps for canvas/ASCII), DPR ≤ 1.5.

**Content rules**
- Never render text that starts with "TODO" — `getProjects()` and `RichText` already filter it; keep it that way.
- Professional (day-job) work stays in the NDA folder (`nda: true`), never named.
- Copy is short, plain, first person.

**Workflow**
- Branch from `main`, open a PR, include desktop + mobile screenshots for any visual change.
- Check: `npm run build` passes; no console errors on `/`, `/systems`, `/divisions/swarm`, `/work/drone-sim`, `/news`.
- Log notable changes in `docs/devlog/` (Logseq outline format).
