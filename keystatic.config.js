// БОГMODE — Keystatic config.
// Git-based CMS: everything writes to files in content/ and images to public/photos/.
import { config, fields, singleton, collection } from "@keystatic/core";

const imageField = (label) => fields.image({
  label,
  directory: "public/photos",
  publicPath: "/photos/",
  validation: { isRequired: false },
});

export default config({
  storage: { kind: "local" },
  ui: { brand: { name: "БОГMODE" } },
  singletons: {
    site: singleton({
      label: "Site",
      path: "content/site",
      format: { data: "json" },
      schema: {
        headline: fields.text({ label: "Hero headline" }),
        subhead: fields.text({ label: "Hero subhead" }),
        lede: fields.text({ label: "Hero lede", multiline: true }),
        telemetry: fields.array(fields.object({
          k: fields.text({ label: "Key (UPPERCASE)" }),
          v: fields.text({ label: "Value" }),
        }), { label: "Telemetry", itemLabel: (p) => p.fields.k.value + " — " + p.fields.v.value }),
        about: fields.array(fields.text({ label: "Paragraph", multiline: true }), {
          label: "About paragraphs", itemLabel: (p) => p.value.slice(0, 60) + "…",
        }),
        portrait: imageField("Portrait photo"),
        workshop: imageField("Second photo (desk / workshop / city)"),
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
        cat: fields.text({ label: "Category label" }),
        status: fields.text({ label: "Status tag" }),
        live: fields.checkbox({ label: "Live demo card" }),
        body: fields.text({ label: "Card body", multiline: true }),
        chips: fields.array(fields.text({ label: "Chip" }), {
          label: "Chips", itemLabel: (p) => p.value,
        }),
        detail: fields.text({ label: "Detail page write-up", multiline: true }),
        role: fields.text({ label: "Your role", validation: { isRequired: false } }),
        scope: fields.text({ label: "Scope", validation: { isRequired: false } }),
        heroImage: imageField("Hero artifact image"),
        context: fields.text({ label: "Context", multiline: true, validation: { isRequired: false } }),
        problem: fields.text({ label: "Problem", multiline: true, validation: { isRequired: false } }),
        approach: fields.text({ label: "Build / approach", multiline: true, validation: { isRequired: false } }),
        system: fields.text({ label: "What now exists", multiline: true, validation: { isRequired: false } }),
        results: fields.array(fields.object({
          value: fields.text({ label: "Result value" }),
          label: fields.text({ label: "What it measures" }),
        }), { label: "Evidence / outcomes", itemLabel: (p) => p.fields.value.value + " — " + p.fields.label.value }),
        gallery: fields.array(imageField("Artifact image"), { label: "Artifact gallery" }),
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
        glyph: fields.text({ label: "Mono glyph label" }),
        body: fields.text({ label: "Body", multiline: true }),
      },
    }),
  },
});
