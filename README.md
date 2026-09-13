# БОГMODE — bogmode.ca

Next.js portfolio for Bogdan Tkachuk. Systems, independent projects, credentials, personal interests, and optional social feeds.

## Develop

Use Node.js 22 or later. Run `npm ci`, then `npm run dev`. Validate changes with `npm run build` and `npm audit`.

## Content

- `content/site.json`: introduction, biography, contact details, social links.
- `content/systems/*.json`: case studies, status, project links.
- `content/playground/*.json`: personal interests and resources.
- `content/feeds.json`: Medium profile URL, YouTube channel ID/profile, Instagram profile.
- Credentials are in `components/Credentials.js`, with source links.

Keystatic is available locally. The editor and its API are disabled in production.

## Feeds

Medium and YouTube use server-fetched RSS with a 30-minute cache and a timeout. Configure the owner's actual profiles before claiming those feeds are connected. Instagram's optional public profile embed may be blocked by the provider; the original profile link is always available. Social embeds make no requests until a visitor chooses to load one. Consent lasts only for that page view and can be withdrawn by unloading the embed. Reposts are not guaranteed to be exposed by Instagram embeds.

## Contact

Without all three mail settings, the form prepares a local email draft. It does not send or save that draft. To enable server delivery, configure `RESEND_API_KEY`, `CONTACT_TO`, and a verified `CONTACT_FROM` in the hosting environment. Never commit credentials. Successful provider acceptance is not proof of inbox delivery; verify delivery with an authorized test after configuration.

## Production

The `main` branch deploys through the existing GitHub/Vercel integration. Production checks must include `/privacy`, `/terms`, `/feeds`, contact behavior, and 404 responses for `/keystatic` and `/api/keystatic/*`.

Keep professional examples anonymous. Do not add employer or ingredient names, internal systems, records, screenshots, counts, or proprietary details. Project concepts must remain clearly distinguished from live services and verified results.

## System flow diagrams

`components/SystemFlow.js` contains public, illustrative four-stage flows for the hero and each current system. Update the labels, glyphs, and explanation together when adding a system. Keep professional flows generic; they must not reveal internal architecture. The diagrams appear in system cards, detail pages, and independent project sections. Motion follows an eight-second sequence, pauses offscreen or in hidden tabs, and has a per-diagram pause control. Reduced-motion preferences render static diagrams with the same text explanation. Styles use the existing theme variables and add no runtime dependency.
