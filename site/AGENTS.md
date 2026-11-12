# Editing the IQ Group website (guide for AI agents)

You will usually be asked to change **content**: a new hire, a person joining or leaving, a quote, a client, a phone number. Content is in `src/content/*.yaml`. Change those files, verify, and leave the design alone.

## Where content lives

| Request | File | Notes |
|---|---|---|
| New placement / "recent hire" | `hires.yaml` | Add at the **top** (newest first) and drop the last entry, so 5 remain. Never name the client: "A leading Indian private equity firm". `sector` must be a sector id. |
| Person joins, leaves, changes title | `people.yaml` | `group`: partner, associate or advisor. New people need a 160×160 greyscale-friendly JPEG in `src/assets/team-face/<face>.jpg`. If a partner leaves, re-point any `lead:` in `sectors.yaml`. The Home sentence "one of our four partners, with five associates" counts automatically. |
| Sector copy, areas, sector lead | `sectors.yaml` | `title` uses `\u00a0` (non-breaking space) to keep "&\u00a0Financial" together. Keep at most 5 `tags` (tile line). `icon` must be one of the six Phosphor icons in `src/assets/icons/`. |
| Client quote | `quotes.yaml` | Only with the person's written consent. Disclose any relationship with IQ in `role` (e.g. "Advisor to IQ Group"). |
| Trust-bar logo | `clients.yaml` + `src/assets/clients/` | Single-colour artwork (SVG preferred). `height` balances optical weight (17–34 px today). Logo permission is still unconfirmed for all logos. |
| Phone, email, address, enquiry recipient, "Last reviewed" | `site.yaml` | `enquiryEmail` is shown in the form fallback. The address that actually *receives* form emails is the `ENQUIRY_TO` setting in Cloudflare (tell the user if both should change). |
| Process steps, services, pillars | `method.yaml`, `services.yaml`, `pillars.yaml` | |

Page-level copy that is not in YAML (hero headline, section headings, contact-card text) is in `src/pages/*.astro` and `src/components/*.astro`. Edit the text only.

## Rules

- **Facts.** Never invent clients, hires, numbers, credentials or quotes. Everything must come from IQ (the user). If a request needs a fact you do not have, ask.
- **Voice.** British English. Short, plain, confident. No hype or superlatives ("world-class", "leading-edge"), no exclamation marks. Write "C‑suite" with a non-breaking hyphen (‑), as in the existing files.
- **YAML.** Each file is a list of entries. Every entry has a unique `id` in lowercase-with-dashes. List order is display order. Quote any value that contains `: ` or starts with `&`, `*`, `"`, `'`.
- **Design is locked.** Do not change `src/styles/`, layout markup or the icons unless the user explicitly asks for a design change. Design rules: `../docs/DESIGN_SYSTEM.md`.
- **Never** edit `dist/`, `node_modules/`, `.astro/` or `tests/__screenshots__/` by hand.

## Verify every change

```sh
npm run check   # content schemas and types: a typo, a missing field or an unknown id fails here with the file and field
npm test        # builds, then accessibility and visual tests
```

- **Content changes** often change page height. The visual test then fails on the affected pages. That is expected. Look at the diff images in `test-results/` to confirm only the intended text moved, then run `npm run test:update` and include the updated screenshots in the commit.
- **Accessibility failures** are never expected. Fix the cause; do not update or skip the test.
- Start `npm run dev` and look at the changed page at desktop and phone widths before reporting the change as done.

## Development notes

- Astro 7, Node 24. The dev server: `npm run dev` (Astro may start it in the background when it detects an agent; manage it with `npx astro dev stop|status|logs`).
- Docs: https://docs.astro.build (content collections, components, routing).
