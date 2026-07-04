// БОГMODE — Keystatic config.
// Git-based CMS: everything writes to files in content/ and images to public/photos/.
// Dev: `npm run dev` → open /keystatic to edit with a GUI.
// Prod editing (optional later): switch storage to { kind: "github", repo: "you/bogmode" }.
import { config, fields, singleton, collection } from "@keystatic/core";

export default config({
  storage: { kind: "local" },

  ui: {
    brand: { name: "БОГMODE" },
  },

  singletons: {
    site: singleton({
      label: "Site",
      path: "content/site",
      format: { data: "json" },
      schema: {
        headline: fields.text({ label: "Hero headline" }),
        subhead: fields.text({ label: "Hero subhead" }),
        lede: fields.text({ label: "Hero lede", multiline: true }),
        telemetry: fields.array(
          fields.object({
            k: fields.text({ label: "Key (UPPERCASE)" }),
            v: fields.text({ label: "Value" }),
          }),
          { label: "Telemetry", itemLabel: (p) => `${p.fields.k.value} — ${p.fields.v.value}` }
        ),
        about: fields.array(fields.text({ label: "Paragraph", multiline: true }), {
          label: "About paragraphs",
          itemLabel: (p) => p.value.slice(0, 60) + "…",
        }),
        portrait: fields.image({
          label: "Portrait photo",
          directory: "public/photos",
          publicPath: "/photos/",
          validation: { isRequired: false },
        }),
        workshop: fields.image({
          label: "Second photo (desk / workshop / city)",
          directory: "public/photos",
          publicPath: "/photos/",
          validation: { isRequired: false },
        }),
        links: fields.object({
          linkedin: fields.url({ label: "LinkedIn", validation: { isRequired: false } }),
          youtube: fields.url({ label: "YouTube", validation: { isRequired: false } }),
          github: fields.url({ label: "GitHub", validation: { isRequired: false } }),
        }),
        contact: fields.object({
          email: fields.text({ label: "Public contact email (shown on site)" }),
          formIntro: fields.text({ label: "Contact page intro line", multiline: true }),
        }),
      },
    }),
  },

  collections: {
    systems: collection({
      label: "Systems",
      path: "content/systems/*",
      slugField: "title",
      format: { data: "json" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        order: fields.integer({ label: "Order (lower = first)", defaultValue: 0 }),
        cat: fields.text({ label: "Category label (mono, e.g. DATA TOOL · LIVE)" }),
        status: fields.text({ label: "Status tag (DEPLOYED / LIVE / BUILDING)" }),
        live: fields.checkbox({ label: "Live demo card (pulsing target + demo slot)" }),
        body: fields.text({ label: "Card body", multiline: true }),
        chips: fields.array(fields.text({ label: "Chip" }), {
          label: "Chips",
          itemLabel: (p) => p.value,
        }),
        detail: fields.text({ label: "Detail page write-up", multiline: true }),
      },
    }),
    playground: collection({
      label: "Playground",
      path: "content/playground/*",
      slugField: "title",
      format: { data: "json" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        order: fields.integer({ label: "Order (lower = first)", defaultValue: 0 }),
        glyph: fields.text({ label: "Mono glyph label (e.g. ▚ GODOT)" }),
        body: fields.text({ label: "Body", multiline: true }),
      },
    }),
  },
});
