# Handoff: IQ Group website

Paste this into a fresh session as context. Repo: `/Users/damian/Projects/IQGroup-website` (GitHub `DamianPresthus/IQGroup-website`, branch `main`).

## What this is

New website for **IQ Group**, an executive-search firm in Mumbai. The audience is boards, CEOs and HR heads, so the design is deliberately restrained: plum and ink palette, Newsreader serif headings, frosted-glass details. The brief is in `docs/PROJECT_BRIEF.md`.

## The main version: `site/` (Astro on Cloudflare)

**All work happens in `site/` from now on.** It is the production site.

- **Live (preview address, no domain yet):** https://iq-group.pages.dev. It is set to "don't index" on `pages.dev`.
- **Stack:** Astro 7 + TypeScript (strict), plain CSS (`site/src/styles/tokens.css` + `global.css`), Cloudflare Pages with one Pages Function.
- **Node 24 required.** nvm is installed, but the shell may still pick up Node 22. Prefix commands with:
  `export PATH="$HOME/.nvm/versions/node/v24.22.2/bin:$PATH"`
- **Read first:** `site/README.md` (setup and deploy), `site/AGENTS.md` (content rules for AI edits), `docs/DESIGN_SYSTEM.md` (tokens, components, glass, colour roles, motion rules, breakpoints 1025/860/560/380).

### Layout
| Path | Contents |
|---|---|
| `site/src/content/*.yaml` | All copy and data: `sectors`, `hires`, `people`, `quotes`, `clients`, `method`, `services`, `pillars`, `site` (contact details, enquiry address) |
| `site/src/content.config.ts` | Strict Zod schemas. A wrong or misspelled reference fails the build with the file and field named |
| `site/src/lib/content.ts` | Ordered getters and image lookups (fail loudly on a missing image) |
| `site/src/components/` | Nav, SectorTiles, Quotes, Method, Contact, Footer, EnquiryDialog, Face, Seo |
| `site/src/pages/` | `index`, `about`, `sectors`, `404`, `robots.txt.ts` |
| `site/src/scripts/app.ts` | Mobile menu, enquiry dialog, roster, icon tilt, view-transition tagging |
| `site/functions/api/enquiry.ts` | Form → Turnstile check + honeypot → Resend email to `ENQUIRY_TO`. If the email service isn't configured, the client falls back to opening the visitor's own email app |
| `site/public/_redirects`, `_headers` | About 25 legacy URL redirects (301), security and caching headers |
| `site/src/assets/icons-3d/*.webp` | 3D glass sector icons (rendered by Blender, see below) |
| `site/tests/` | `visual.spec.ts` (screenshot lock against v5 baselines at 1440/820/390) and `a11y.spec.ts` (axe, WCAG 2.2 AA) |
| `.github/workflows/site.yml` | CI: type check, accessibility, visual lock |

### Commands (inside `site/`)
- `npx astro check`: types (currently 0 errors)
- `npm test`: build + Playwright (14 tests)
- `npx astro build`, then `npx wrangler pages dev --port 8788 --ip 127.0.0.1`: local server including the function
- **Deploy (manual for now):** `npx wrangler pages deploy dist --project-name iq-group --branch main --commit-dirty=true`. Wrangler is already logged in to the user's Cloudflare account.
- Gotcha: `astro preview` refuses to run in agent shells without `--ignore-lock`; the Playwright config already handles this.

### Status
- **Done:** v5 ported one-to-one, SEO (canonical URLs, link previews, structured company/people data, sitemap), redirects, enquiry function, motion (hero map sequence, tile → Sectors view transition, icon tilt, scroll reveals, reduced-motion handling), performance (Lighthouse on a simulated mid-range phone: LCP 2.2–2.4s, performance 98–99, accessibility 100, CLS 0).
- **IQ Social icon trial:** the IQ Social sector currently shows a **dove** (`icon: dove` in `sectors.yaml`) as a trial. `heart.webp` is still in the repo; to revert, set `icon: heart`. The visual lock fails on Home and Sectors until the icon is settled, then refresh the baselines (`npx playwright test --update-snapshots`).

### Open items
1. **Auto-deploy:** pushes to `main` do not deploy. Either connect the repo in the Cloudflare dashboard (root `site/`, build `npm run build`, output `dist`, `NODE_VERSION=24`) or add a deploy step to CI with a Cloudflare API token.
2. **Enquiry email:** set `RESEND_API_KEY` and `ENQUIRY_TO=ashmita@iqgroup.co.in` in Cloudflare (Settings → Variables and Secrets). Turnstile keys are optional.
3. **Domain:** nobody knows yet who controls the `iqgroup.co.in` registrar/DNS. Once it moves, point it at the `iq-group` project and set `PUBLIC_INDEXABLE=true`.
4. **Content sign-off:** client logo permissions (UBS, GSK and Hindustan Unilever logos are not free to use), quote consent, and the sector labels on Recent hires (inferred; IQ must confirm).
5. **Phase 2:** an insights/blog section using the same content-collection pattern.

## 3D icons (Blender)
- **Script:** `tools/icons3d/render.py`, run with `blender -b -P tools/icons3d/render.py -- <icon|all> <out_dir> <samples>`. Blender is installed at `/Applications/Blender.app`, uses the Metal GPU, and renders each icon in a few seconds.
- **Icons:** bank, chart, factory, scales, megaphone, heart, plus the trial icons `hands` and `dove`.
- **Style:** frosted lilac glass with deep-plum accents, upright with a slight turn, light from the top-left, rounded edges.
- **Dove:** drawn first as a flat SVG master (`tools/icons3d/dove.svg`, ids map to layers in `DOVE_LAYERS`), then extruded.
- **Output:** render to `site/src/assets/icons-3d/` (and `source/assets/icons-3d/` only if the v5 prototype also needs it).
- **Where icons appear:** the dark sector strip at 45% opacity (90% on hover), and 36px on light in Recent hires.
- **Gotcha:** Blender's outward bevel grows shapes by the edge radius; `slab(..., inset=True)` keeps the drawn outline.

## Legacy (reference only, do not develop)
- **`source/v5/`:** the hand-written HTML prototype, live at https://damianpresthus.github.io/IQGroup-website/v5/. Its design is frozen at git tag `design-v5-final`.
- **`source/v4/`:** the older live version at `/v4/`. Do not overwrite it.
- **GitHub Pages:** serves the `gh-pages` branch. Earlier deploys were additive copies made through a temporary worktree.
- **History:** `docs/V4_DIRECTION.md` records the design decisions (rounds 1–38).

## Working preferences (from the user)
- Plain, concise reports. Show visuals (screenshots or comparisons) for design changes.
- Design work: draft first, show it, then ask before putting it live, unless the user says "put it on the site".
- After live changes, verify on the live URL.
- Untracked files `DESIGN_SYSTEM_OPTIONS.md`, `claude-design-prompt.md`, `design-system-checklist.md` and `source/assets/brand/iq-mark-white-square.png` are the user's. Leave them alone.
