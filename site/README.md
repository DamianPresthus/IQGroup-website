# IQ Group website (production)

Astro + TypeScript static site with one Cloudflare Pages Function (the enquiry form). The design is locked to the v5 prototype (`design-v5-final` tag; rules in `../docs/DESIGN_SYSTEM.md`). Content lives in `src/content/*.yaml`; see `AGENTS.md` for how to edit it.

## Develop

Node 24 (`.nvmrc`).

```sh
npm install
npm run dev          # http://localhost:4321, live reload
npm run check        # types + content schemas
npm test             # build, then accessibility (axe, WCAG 2.2 AA) and visual tests
npm run test:update  # accept intended visual changes (review the diff first)
```

To try the enquiry form locally, run it through Cloudflare's runtime: `npx astro build && npx wrangler pages dev`. Put test settings in `.dev.vars` (git-ignored), e.g. `ENQUIRY_TO=you@example.com` and `RESEND_API_KEY=…`.

## Layout

| Path | What |
|---|---|
| `src/content/*.yaml` + `src/content.config.ts` | All copy and data, validated by schema at build time |
| `src/pages/` | Home, Sectors, About, 404, robots.txt |
| `src/components/` | Nav, SectorTiles, Quotes, Method, Contact, Footer, EnquiryDialog, Face, Seo |
| `src/styles/` | `tokens.css` (design tokens), `global.css` (component styles, ported unchanged from v5) |
| `src/scripts/app.ts` | Menu, roster captions, enquiry dialog |
| `src/assets/` | Sector icons (`tools/icons3d/render.py`), portraits, client logos, hero map, brand mark |
| `functions/api/enquiry.ts` | `POST /api/enquiry`: validate, spam-check, email the firm |
| `public/` | Fonts, `_redirects` (old site URLs), `_headers`, favicon and share images (`scripts/brand-images.mjs`) |
| `tests/` | `visual.spec.ts` (screenshots locked to v5), `a11y.spec.ts` |

## Deploying (Cloudflare Pages)

One-time setup, in the Cloudflare dashboard:

1. **Workers & Pages → Create → Pages → Connect to Git** and choose this repository. Settings: production branch `main`, root directory `site`, build command `npm run build`, output directory `dist`. Under Settings → Environment variables, add `NODE_VERSION = 24`.
2. **Variables and secrets** (Settings → Variables and secrets):

   | Name | Environment | Value |
   |---|---|---|
   | `ENQUIRY_TO` | Production + Preview | `ashmita@iqgroup.co.in` |
   | `RESEND_API_KEY` | Production (secret) | API key from [resend.com](https://resend.com) |
   | `ENQUIRY_FROM` | Production | e.g. `IQ Group website <enquiries@iqgroup.co.in>`, once the domain is verified in Resend |
   | `PUBLIC_TURNSTILE_SITE_KEY` | Production | Turnstile site key (Cloudflare → Turnstile → add widget) |
   | `TURNSTILE_SECRET_KEY` | Production (secret) | Turnstile secret key |
   | `PUBLIC_INDEXABLE` | Production | `true`, **only after** the domain points here (until then the site asks search engines not to list it) |

   Without `RESEND_API_KEY` the form still works: it opens the visitor's email app with the message filled in.
3. Every push to `main` deploys to production. Every other branch gets a preview URL (`<branch>.iq-group.pages.dev`, never indexed). GitHub Actions (`.github/workflows/site.yml`) runs the checks on each push.

**Domain switch** (when whoever controls the `iqgroup.co.in` registrar account is found):
1. Pages project → Custom domains → add `www.iqgroup.co.in` and `iqgroup.co.in`, and follow the DNS instructions.
2. Verify the domain in Resend (DNS records) and set `ENQUIRY_FROM`.
3. Set `PUBLIC_INDEXABLE=true` and redeploy.
4. In Google Search Console, submit `https://www.iqgroup.co.in/sitemap-index.xml`.

The 25 old URLs (`aboutus.html`, `theteam.html`, profile pages…) redirect permanently, so their search ranking carries over.
