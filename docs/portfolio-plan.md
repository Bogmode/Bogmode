# bogmode.ca — Projects collection

## Install
1. Copy `keystatic/projects.collection.ts` into your repo and register it in `keystatic.config.ts`:
   ```ts
   import { projects } from './keystatic/projects.collection';
   export default config({ /* ... */ collections: { projects /*, ...existing */ } });
   ```
2. Copy `content/projects/*.mdoc` into `content/projects/`.
3. Open `/keystatic` → Projects to edit.

## Positioning
bogmode.ca is a showroom, not a CV pitch. The home page is a grid of live demos.
"Systems behind revenue" becomes one case study, not the headline.

## Home page order
1. **About intro (first screen):** headline, one intro line, 3 quick facts, short bio, 3D scene behind it.
   Two buttons: "Explore the work" (scrolls to the grid) and "Start here" (opens the `startHere` project's demo).
2. **Featured demos:** 4–5 large tiles.
3. **All projects:** filter by category.
4. **Ideas strip:** concepts, low-key.
Edit the intro in `/keystatic` → About (`keystatic/about.singleton.ts`, `content/about.mdoc`).

## Demo-first
- Every project has a `demo` (embed, 3D scene, or video loop) plus a poster image.
- One shared `<DemoStage>` component renders all three: lazy-load, poster first, respects reduced-motion.
- Each demo gets its own shareable URL (`/play/<slug>`) and an OG video preview.
- 3D scenes reuse the real-time scene workflow from earlier 3D work. Rebuild the assets fresh, because employer models stay with the employer.

## Presentation rules
- **Card = title + summary + cover + status.** If any of the four is weak, keep `featured: false`.
- **Feature 4–5 max.** Pre-set: Scales of Existence, Drone Sim, Mission Planner, Label Pipeline, bogmode.ca.
- **Every featured project needs a visual**: a 16:9 cover plus a 20–40s screen capture. No visual, no feature.
- **Case study shape:** Problem → What I built → Outcome. Keep it short; the visuals do the work.
- **Concepts** render in a separate low-key "Ideas" strip, or stay hidden — they never sit beside shipped work.
- **Status is honest.** "Paused" reads better than a dead link.
- `notes` is never rendered — use it for private context.

## Fill-in queue (TODOs)
FORKED, ROUTE, 2.5D prototype, Godot Work, DroneWashers, Fiend, Social Tracker need a one-line summary.
DroneWashers and Fiend: paste in the existing exhibit copy.
All entries: covers, Outcome sections, missing stacks.

## About intro (draft copy — not wired yet)
Headline: БОГMODE
Intro: I'm Bogdan. I build things you can play with — simulators, explorers and data tools.
Facts: Winnipeg, Canada · English · Українська · Русский · GPS and FPV drone pilot
Bio: Every project here opens on a live demo. Observe, map, build, measure, learn — then ship something you can touch.
Buttons: "Explore the work" → project grid · "Start here" → scales-of-existence
Plan: replace the current "I build the systems behind revenue" hero in content/site.json once the projects grid renders.
