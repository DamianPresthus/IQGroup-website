# Component inventory (as implemented in v2)

Source of truth: `source/IQ Group Website v2.dc.html`. All styling is inline; none of these are reusable components in code yet.
Legend: **Implemented** = present in code. **MISSING** = not implemented; not invented here.

## Buttons
| Variant | Where | Spec |
|---|---|---|
| Primary (header) | "Begin a search" | 13px/500, pad 10×20, pill, bg alabaster, text obsidian |
| Primary (hero) | "Explore our practices" | 14px/500, pad 13×24, same colours |
| Outline (hero) | "How we search" | as above, transparent, 1px lilac .5 border |
| Primary link-button | "Write to Ashmita" | an `<a>`, 14px/500, 13×24, pill |

States — Hover: primary bg → #F3E7F0 (all three); outline border → alabaster. Transition: **none** on buttons.
MISSING: focus-visible, active/pressed, disabled. Native button outlines are the only focus indication.

## Navigation (header)
- Logo: "IQ" Garamond 28/500 + "GROUP" 12px caps, lilac. Link to #top.
- Pill nav: double-ring (outer track 1px lilac .22 border + blur 10; inner active pill 1px lilac .5 border, bg alabaster .08). Items: Practices, Method, Mandates, People, Contact. 13px/500, pad 8×16.
- States: active (set on click only), inactive. Inactive hover: **MISSING**. Active state is not driven by scroll position.
- Responsive: hidden entirely at ≤900px (JS). **No mobile menu exists**; only the "Begin a search" button remains.
- Not sticky: header scrolls away with hero.

## Pill toggles (light) — v1 only
- v2 has no light pill toggles. The Method section shows only the 5 steps. The Practice areas view is kept in the markup behind `showPractices: false` (in `renderVals`). The team grid has no filter.
- v1: Practice areas / Our method (14px/500, pad 10×22); Team filter All / Corporate / Social Impact (13px/500, pad 9×16).
- Track: white, 1px mulberry .25 border, radius 999, pad 4. Active: bg #F3E7F0, 1px plum .45 border, ink text. Inactive: transparent, mulberry text. Transition all .25s.
- Behaviour (v1): view toggle swaps list/steps; team filter does NOT remove cards — non-matching cards dim to opacity .25 (transition .35s).
- MISSING: hover, focus-visible, aria-pressed / role=tablist. Responsive: sits beside heading, wraps below at narrow widths (flex-wrap).

## Hero client bar
- Dark translucent bar (obsidian .55, blur 12, top hairline). Label "TRUSTED BY" + 8 monochrome typeset wordmarks (UBS, BCG, J.P.Morgan, Deutsche Bank, pwc, Johnson&Johnson, gsk, Unilever) in lilac-100 at .72.
- Static, not a ticker. Wordmarks are styled text, not real logo files. Overflows horizontally with hidden scrollbar on narrow screens.
- NOTE: list differs from brief (no Bayer, Asian Paints, Dalberg, Oxfam, GSK is lowercase, "Unilever" not "HUL").

## Section header block
Eyebrow (12px caps .22em) + H2 (Garamond 400). Variants: with 2px accent bar (mandates, contact); sticky left column (pillars, top 40px). v1 only: right-aligned toggle (practices, people) and a right-hand note on mandates.

## Rows
- **Pillar row**: 56px numeral column + H3 + 15px/300 body, top hairline, last row also bottom. No hover.
- **Practice row**: 4:3 grain thumb (72–112px) + tag + H3 + client line; top hairline. Hover: horizontal fading lilac band (.3s). Rows are not links (cursor default). Plus "Beyond search" outline-chip row.
- **Method step** (5 in light panel): hairline with dot marker, 56px plum numeral, title, description. Dot 1 is alabaster with mint-700 ring; dots 2–5 plum with alabaster ring (inconsistent by design? flag: needs a decision). Static; no hover. Wraps via auto-fit 180px.
- **Contact row**: 120px label column + value; hairline dividers; links are alabaster.

## Cards
- **Mandate feature card**: spans 2 grid rows, min-h 400, radius 28, grain gradient, outline tag pill.
- **Mandate small card** ×4: min-h 190, radius 24, aubergine .45 fill, lilac .16 border; hover border → .45 (.3s).
- **Partner profile card** ×4: #260B24, radius 26, pad 8; grain-gradient header (5:4) with initials in Garamond 64; name, role, one-sentence bio, practice tag chips. Variants: none. Hover: **MISSING**. Photos: none (initials stand in; there are no portraits).
- Mandate roles/clients are anonymised on purpose (no on-page note in v2).

## Testimonials
Two-column figure: top hairline, 88px plum quote mark, Garamond 24–32 quote, name 15/600, title 13px. Static; no carousel. The second attribution reads "Advisor to IQ Group · Chairman, Sigma Research & Consulting".

## Footer
Hairline, "IQ" Garamond 20/500 + "© 2026 IQ Group · Mumbai", right: "Member, Executive Recruiters Association". No links, no nav, no legal/privacy.

## Grain surfaces
Hero, 4 practice thumbs, feature mandate card, 4 partner headers, contact section. Two recipes (see tokens.css): the original soft-light 140px noise (practice thumbs, contact) and, in v2, a visible two-layer stochastic grain (white specks overlay + black specks) on the feature mandate card and the 4 partner headers. Inline ×10+ (DUP).

## Hero canvas ribbons
Canvas 2D hairline waves, edge to edge, 3 layers, slow. Prop `motion` toggles animation; with it off a static frame is drawn at t=4000ms.
