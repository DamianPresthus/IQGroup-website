# IQ Group website — development handoff

Working extraction for continued refinement in VS Code. **This is not a finished design system.**

## Contents
```
source/
  IQ Group Website v2.dc.html   ← LATEST (redesigned sections below the hero, EB Garamond + Plus Jakarta Sans)
  IQ Group Website.dc.html      ← v1 (kept for comparison; same hero, earlier lower sections; now also on the new fonts)
  support.js                    ← runtime required by both .dc.html files (exported as-is, do not edit)
  index.html                    ← redirects to v2
tokens.css                      ← extracted tokens (reference only; the site does not import it)
docs/COMPONENTS.md              ← component inventory + missing states
docs/USAGE.md                   ← observed rules vs. proposed rules
docs/DESIGN.md                  ← creative direction & design brief
docs/PROJECT_BRIEF.md           ← project brief
reference/                      ← reference images + claude-design-hero.jpg & claude-design-fullpage.png
prototypes/                     ← earlier standalone HTML prototypes (v1 constellation, v2 sirva duotone, v3 true bento, golden-angle comparison)
.thumbnail                      ← 16:9 hero preview image from the design tool
```

## Run locally
No build step, no framework. Serve the `source/` folder over HTTP (opening via file:// may be blocked by the browser):
```
cd source
python3 -m http.server 8000      # or: npx serve .
```
Open http://localhost:8000 (v2). In VS Code, the "Live Server" extension also works: right-click `index.html` → Open with Live Server.
Each .dc.html is a single file: markup in `<x-dc>`, logic in the `<script type="text/x-dc">` block at the bottom (class `Component`), props in its `data-props` attribute (v2: `motion`, `logoBar`; v1 also has `defaultView`).

## Fonts & assets
- EB Garamond (400/500/600, italic 400/500) and Plus Jakarta Sans (300–600): loaded from Google Fonts CDN via `<link>`. **Internet is needed; not self-hosted.**
- No raster images, SVG files or logo files. Grain textures are inline SVG data-URIs (feTurbulence). Client logos are typeset text. Portraits are replaced by initials.

## Dependencies
Only `support.js` (bundled with React inside it, as provided by the design environment) and Google Fonts. I have not verified support.js works with no network.

## Known issues
Accessibility
- v2 has mint `:focus-visible` outlines; v1 has none. Pill toggles lack aria-pressed/tablist roles; nav and toggles are `<button>`s without labels beyond text.
- v1 only: team filter dims cards to .25 opacity (fails contrast). v2 has no team filter.
- 11px uppercase labels in lilac/mulberry; verify contrast against each surface.
- No prefers-reduced-motion handling; hero canvas has no aria-hidden.
- Quote marks and decorative numerals are plain text (not hidden from screen readers).
Responsive
- v2: at ≤900px the desktop nav and "Begin a search" are replaced by a "Menu" button that opens a full-screen sheet (nav, CTA, email). Esc or Close shuts it, and the page scroll is locked while it's open. v1 still has no mobile menu.
- v2 mobile overrides (≤720px) live in one `@media` block in the `<helmet>` style: tighter section padding, compact method rows, shorter mandate cards, a swipeable partner carousel, a fade hint on the client bar, larger tap targets on contact links. The Pillars sticky column turns static at ≤900px.
- Hero uses 100svh with min-height 460px; short viewports tighten spacing via clamp(vh).
Code
- Leftover dead code in the logic class (v1 + v2): `marqueeRef`, `offset`, `logoLoop`/`logos`, `steps` accordion state, `mandates`, `quotes`/`quoteTabs`/`stepNum`/`stepTitle`, `focus`, team stagger `offset` (v1 also `filterTags`). Not rendered; left untouched.
- Grain SVG data-URI duplicated 10+ times; gradient recipes duplicated; spacing values not on a strict scale (see tokens.css notes).
- Fonts: some inline rules use `'Plus Jakarta Sans',sans-serif`, others add `system-ui`.

## Content flags (unchanged, need owner decision)
- Founding year omitted (1992 vs 1994 unresolved).
- Tilak Mukherji shown as "Advisor to IQ Group"; confirm. On-page quote is shortened.
- Hero logo list differs from the original brief.
- Contact details (email, phones, address, cities) and partner bios are as placed in the design; verify against the live site.

## Not exportable / missing
Nothing is missing from the source. Two caveats: fonts are CDN-only (no files in the package), and the original DESIGN.md brief was not available in this project, so token naming/values come only from the code and your messages.
