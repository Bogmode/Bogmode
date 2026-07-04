# БОГMODE — bogmode.ca

Personal hub. White-technical aesthetic (CS:GO Asiimov / Vulcan), Next.js App Router,
content managed as files in this repo (your git-based CMS). No external service, no subscription.

## Stack
- Next.js 16 (App Router) + React 19
- next/font (Space Grotesk / Inter / JetBrains Mono — Inter & Mono include Cyrillic for the БОГ mark)
- Plain CSS design system in `app/globals.css`
- Node.js 20+ required (22 LTS recommended)

## Run it
```bash
npm install
npm run dev        # http://localhost:3000
```
Build check before deploy:
```bash
npm run build
```

## Your CMS = the content/ folder
There is no admin panel and nothing to pay for. To update the site, edit these files and commit:
- `content/site.js` — hero copy, telemetry, about text, social links
- `content/systems.js` — your project catalog (one object per project; `slug` is the URL)
- `content/playground.js` — the off-hours tiles

Add a project = add an object to `content/systems.js`. It automatically gets a card on
`/` and `/systems`, plus its own page at `/systems/<slug>`.

## Routes
- `/`               home (hero + featured systems + playground)
- `/systems`        full grid
- `/systems/[slug]` per-project detail (the LIVE card has a demo slot)
- `/playground`     range / off-hours
- `/about`          the human page
- Contact           mailto in the nav + footer

## The skin toggle
Bottom-right control flips the whole site between ASIIMOV (orange) and VULCAN (cyan).
It swaps one CSS variable (`--accent`), so recoloring is a one-line change in `globals.css`.

## Deploy to Vercel
1. Push this folder to a GitHub repo.
2. On vercel.com: New Project → import the repo → framework auto-detects Next.js → Deploy.
3. Add your domain: Project → Settings → Domains → add `bogmode.ca` and point your DNS as shown.

## Step 2 (optional): Keystatic admin UI
When you want to edit content through a GUI instead of the files directly, add Keystatic.
It's free, open-source, and stores content in this same repo (commits to git for you) — so
you keep full ownership and still pay nothing. Point it at the `content/` collections and
it serves an editor at `/keystatic`.

## Step 3 (optional): a live demo
The `label-intelligence-extractor` project is flagged `live: true` and its detail page
renders a demo slot. Drop an interactive React component there to turn the portfolio into
proof. If that demo needs to store data, wire Supabase to *that component only* — keep it
separate from the content layer so nothing else gains a dependency.
