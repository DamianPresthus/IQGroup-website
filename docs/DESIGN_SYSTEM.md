# IQ Group design system (v5, locked)

**Status.** Locked on 2026-11-07 as git tag `design-v5-final`, after 38 review rounds (`docs/V4_DIRECTION.md`). The production site in `site/` (Astro) must match it. `site/tests/visual.spec.ts` compares every page at 1440, 820 and 390px against screenshots of the locked design, so any visual drift fails the tests.

**Source of truth.** The code. Tokens are in `site/src/styles/tokens.css` and component styles in `site/src/styles/global.css`. Content is in `site/src/content/*.yaml`. This document explains the rules behind the code. If the two disagree, the code is right and this file needs updating.

**Direction.** "Quiet institutional confidence": the audience is board members, promoters, CEOs and CHROs, and restraint is the quality signal. References: Mercury, Stripe Press, Carta, Index Ventures, Benchmark.

---

## 1. Principles

1. **The sector names and the people lead.** Decoration (icons, map, glass) supports them and never competes. The icons sit at 42–45% opacity until hovered.
2. **Colour by role, not by hierarchy.** Every colour has one job (§2). Saturated plum means "act here" and nothing else.
3. **One material, one light.** Glass appears only on floating chrome (the nav) and the 3D icons, lit from the top-left (`--glass-angle: 150deg`).
4. **Solid first, enhance where supported.** Glass, scroll-driven motion and view transitions are progressive. Without them, the page is complete and correct.
5. **Motion explains or confirms, never decorates.** 180–520 ms, easing out, one thing at a time. Everything respects `prefers-reduced-motion` (§7).
6. **Per page:** at most one dark band (`--surface-dark`) and one tinted band (`--tint`).

## 2. Colour roles

| Token | Value | Role | Contrast |
|---|---|---|---|
| `--bg` | #FAF9F5 | Page (warm alabaster) | — |
| `--bg-2` | #F2EFE9 | Cards: quotes, spotlight, candidate path, form switch | — |
| `--ink` | #12051A | Headings, names | 18.8:1 on bg |
| `--ink-body` | #2B0F2A | Body text | 16.5:1 |
| `--ink-muted` | #6E4165 | Secondary text, all small labels | 7.6:1 (7.0:1 on bg-2) |
| `--accent` | #8F1F78 | **Attention only:** primary CTA, link underlines, timeline progress, HQ on the map | 7.6:1; on-dark text on it 7.6:1 |
| `--accent-hover` | #6E1A5D | Primary CTA hover | on-dark text 10.1:1 |
| `--accent-on-dark` | #E9B3DD | Accent on dark surfaces (plain accent is only 2.5:1 there) | 11.3:1 |
| `--tint` | #F6EEF3 | The one tinted band per page (plum mist) | ink-muted 7.1:1 |
| `--surface-dark` | #12051A | Sector strip, organisations card, footer | — |
| `--on-dark` / `--on-dark-muted` | #FAF9F5 / #D1A1C7 | Text on dark | 18.8:1 / 9.1:1 |
| `--line` / `--line-strong` | ink 12% / 22% | Hairlines / section rules | — |
| `--focus` | #0F766E | Focus ring only (2px, 3px offset) | 5.2:1 |
| `--error` | #B42318 | Form errors only | 6.2:1 |

**No second accent hue.** Gold and mint were trialled and rejected. Client logos rest as `--ink-muted` silhouettes and show their own colour only on hover.

## 3. Typography

- **Newsreader** (serif, variable 300–600, optical sizing on) for headings, names, quotes and roles in ledgers. **Plus Jakarta Sans** (300–700) for body text, UI and labels. Both are self-hosted (`site/public/fonts/`, SIL OFL).
- **Fluid scale,** from 390 to 1440px: hero 44→78, h2 32→50, h3-lg 26→34, h3 22→28, h4 20→24, quote 22→30, lead 17→20, body 16, small 14, tag 13 (px).
- **Headings:** line-height 1.02–1.15, letter-spacing −0.015 to −0.03em. **Body:** 1.6.
- **One label style** for every small category label: sans, 600 weight, `--fs-small`, `--ink-muted`. No eyebrows, no italics, no all-caps.

## 4. Layout

- Page max 1200px, side padding 20→56px, gutter 16→28px, section rhythm 80→140px (64px on phones).
- **Section head:** serif title on the left (7fr), an optional one-line sans note on the right (5fr).
- **Breakpoints:**
  - **≥1025px:** full-bleed slanted sector strip and a full-height hero.
  - **≤1024px:** sector tiles in a 2-column card, logos in a 4-column grid.
  - **≤860px:** single column, Menu button, and the CTA stays in the nav.
  - **≤560px:** stacked tiles, the enquiry dialog becomes a bottom sheet.
  - **≤380px:** wordmark drops "Group".
- Radii: cards 16px, pills 999px, fields 10px.

## 5. Glass

- **Where:** the floating nav only (plus the rendered icons, §6). Never on content, buttons, full-screen surfaces or modal scrims; the enquiry scrim is a flat 45% plum.
- **How:** solid nav first. Inside `@supports (backdrop-filter)`: 72% fill (84% once scrolled), `blur(16px) saturate(1.3)`, and a 1px rim (masked `::before`) that is brightest on the lit top-left edge.
- **Fallbacks:** `prefers-reduced-transparency` gives the solid nav. `forced-colors` gives Canvas/CanvasText.

## 6. Sector icons (3D)

- **Six icons:** bank, chart, factory (FMCG, Healthcare & Industrials), scales, megaphone, heart. They are rendered with Blender/Cycles by `tools/icons3d/render.py` as transparent 384px WebP files (`site/src/assets/icons-3d/`).
- **Style** (rounds 37–38):
  - **Form:** slim layered plates with fully rounded edges.
  - **Material:** frosted lilac-white glass (#F8F0F6 → #C48DB8), with deep-plum accents (#9E3A8C → #4A0E42) and a clear-coat edge highlight.
  - **Pose:** upright, turned 16° about the vertical axis only, no tilt.
- **Usage:**
  - **Dark strip:** cropped watermark behind the copy at 45% (42% on cards), rising to 90% (80%) with a lift on hover.
  - **Light backgrounds:** small, with a plum-tinted drop shadow.
  - **Recent hires rows (36px):** no shadow.
- **Regenerating:** run `blender -b -P tools/icons3d/render.py -- all site/src/assets/icons-3d 256`. Astro hashes the file names, so no manual cache-busting is needed.

## 7. Motion

**Tokens:** `--ease: cubic-bezier(0.2, 0.7, 0.2, 1)`, `--fast: 180ms`, `--slow: 520ms`. Both durations become 0 under reduced motion, and every keyframe animation sits inside `prefers-reduced-motion: no-preference`.

| Where | Motion | Mechanism |
|---|---|---|
| Hero map | Arcs draw from Mumbai; dots and labels fade in; Mumbai pulses | CSS keyframes |
| Headings and blocks (`.rise`) | Fade and rise 14px on entry | CSS scroll-driven (`animation-timeline: view()`) |
| Method timeline | The line draws and the step dots fill as the section scrolls in | CSS scroll-driven |
| Sector strip | Hover: the column widens, details reveal, the portrait warms, the icon brightens and lifts | CSS transitions |
| Buttons | The arrow moves 3px right on hover | CSS transitions |
| Nav | A shadow appears once the page is scrolled | Class toggle |
| Enquiry dialog | Right-hand drawer on desktop; bottom sheet on phones that can be dragged down to close | CSS `@starting-style` + script |

**Excluded:** smooth-scroll hijacking, animated counters, particle effects, logo marquees, live WebGL.

## 8. Components

`site/src/components/`:
- `Nav`: glass bar and phone menu sheet.
- `SectorTiles`: dark strip or card.
- `Quotes`
- `Method`: timeline; light by default, `band` on About.
- `Contact`: two paths plus the office address.
- `Footer`
- `EnquiryDialog`: two forms (hiring / open to roles).
- `Face`: greyscale portrait that warms to colour on hover.

Page-level patterns in `site/src/pages/`:
- **Home:** hero map, trust bar, Recent hires ledger (icon · role · organisation · sector), Partners.
- **About:** founder spotlight, roster of names with inline portraits, pillars, services.
- **Sectors:** detail rows.

## 9. Accessibility

WCAG 2.2 AA:
- Every text colour pair above is ≥4.5:1.
- Visible focus rings, and 44px hit areas on text links.
- Real `<dialog>` with focus return, and real tabs in the enquiry switch.
- `.sr-only` labels where a name stands alone (roster).
- Decorative images use `alt=""`.

## 10. Changing the design

1. Change the code in `site/`.
2. Run `npm test` in `site/`. Visual tests that fail show exactly what moved.
3. If the change is intended, run `npm run test:update` to accept the new screenshots, and log the change as a new round in `docs/V4_DIRECTION.md`.
