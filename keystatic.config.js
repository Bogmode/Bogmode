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
        dronewasheresUrl: fields.text({ label: "DroneWashers project URL or local path" }),
        instagramUrl: fields.url({ label: "Instagram profile URL", validation: { isRequired: false } }),
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
        live: fields.checkbox({ label: "Live project indicator" }),
        body: fields.text({ label: "Card body", multiline: true }),
        chips: fields.array(fields.text({ label: "Chip" }), {
          label: "Chips",
          itemLabel: (p) => p.value,
        }),
        detail: fields.text({ label: "Detail page write-up", multiline: true }),
        projectUrl: fields.text({ label: "Project URL or local path" }),
        projectLabel: fields.text({ label: "Project link label" }),
        sections: fields.array(
          fields.object({
            label: fields.text({ label: "Section label (UPPERCASE)" }),
            copy: fields.text({ label: "Section copy", multiline: true }),
          }),
          {
            label: "Case study sections",
            itemLabel: (p) => p.fields.label.value || "Untitled section",
          }
        ),
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
        resources: fields.array(fields.object({
          name: fields.text({ label: "Resource name" }),
          description: fields.text({ label: "What it helps with" }),
          url: fields.url({ label: "Link" }),
        }), { label: "Useful links", itemLabel: (p) => p.fields.name.value || "New resource" }),
      },
    }),
    projects: collection({
      label: "Projects",
      path: "content/projects/*",
      slugField: "title",
      format: { contentField: "body" },
      entryLayout: "content",
      columns: ["title", "status", "category"],
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        summary: fields.text({
          label: "One-line summary",
          description: "What it is and why it matters. Shown on project cards.",
          validation: { length: { min: 1, max: 140 } },
        }),
        category: fields.select({
          label: "Category",
          options: [
            { label: "Interactive / Education", value: "interactive" },
            { label: "Games & 3D", value: "games" },
            { label: "Drones & Simulation", value: "drones" },
            { label: "Web & Brand", value: "web-brand" },
            { label: "Tools & Data Pipelines", value: "tools" },
            { label: "Concepts", value: "concept" },
          ],
          defaultValue: "tools",
        }),
        status: fields.select({
          label: "Status",
          options: [
            { label: "Live", value: "live" },
            { label: "In progress", value: "in-progress" },
            { label: "Prototype", value: "prototype" },
            { label: "Paused", value: "paused" },
            { label: "Concept", value: "concept" },
          ],
          defaultValue: "in-progress",
        }),
        featured: fields.checkbox({ label: "Featured on home", defaultValue: false }),
        order: fields.integer({ label: "Sort order (low = first)", defaultValue: 100 }),
        year: fields.integer({ label: "Year", validation: { isRequired: false } }),
        role: fields.text({ label: "My role" }),
        stack: fields.array(fields.text({ label: "Tech" }), {
          label: "Stack",
          itemLabel: (p) => p.value,
        }),
        links: fields.object({
          live: fields.url({ label: "Live URL", validation: { isRequired: false } }),
          repo: fields.url({ label: "Repo URL", validation: { isRequired: false } }),
          video: fields.url({ label: "Demo video URL", validation: { isRequired: false } }),
        }, { label: "Links" }),
        cover: fields.image({
          label: "Cover image (16:9)",
          directory: "public/images/projects",
          publicPath: "/images/projects/",
          validation: { isRequired: false },
        }),
        related: fields.array(
          fields.relationship({ label: "Project", collection: "projects" }),
          { label: "Related projects", itemLabel: (p) => p.value ?? "" },
        ),
        notes: fields.text({ label: "Internal notes (not rendered)", multiline: true }),
        body: fields.markdoc({ label: "Case study" }),
      },
    }),
  },
});
