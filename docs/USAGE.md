# Usage rules

Two parts. **A** is evident in the code. **B** are recommendations needing approval — not rules yet.

## A. Evident in the implementation

**Colour roles**
- Page rhythm alternates dark / light: Hero (dark) → Statement (dark) → Pillars + Practices (light alabaster) → Mandates (dark) → Testimonials (soft lilac) → People (alabaster) → Contact (dark).
- Dark text: alabaster (headings), #E9D9E5 (body), #D1A1C7 (eyebrows, secondary, links). Light text: #12051A (headings), #4A2B44 (body), #6E4165 (eyebrows/tags), #2B0F2A (names/chips).
- Royal Plum #8F1F78 is used for: step numerals, quote marks, gradients, selection highlight, small dots. It is never body-text colour.
- Interactive pill active state: dark = alabaster 8% fill + lilac border; light = #F3E7F0 fill + plum border.
- No box-shadows anywhere; depth comes from surface contrast, hairlines and blur.

**Mint accent (observed)**
- Used in only three places: top stop of the 2px vertical accent bar (hero, mandates, contact); a 30%-alpha glint on one hero ribbon; the ring of method dot 01 (#0F766E on light).
- Never as text, never as a fill/background, never touching saturated plum as a solid. (The accent bar gradient runs mint → lilac → plum, so mint blends into lilac before reaching plum.)
- #85DDD2 Ice Mint is not used.

**Typography**
- Serif (EB Garamond) for hero, section titles, row titles, quotes, numerals, names, logo. Weights 400 mostly; 300 on statement; 500–600 on small wordmarks.
- Sans (Plus Jakarta Sans) for UI, body, labels. Weights 300 (long lead-ins), 400, 500 (buttons, pills), 600 (names, wordmarks).
- Accent words ("forward." in the hero headline, "conversation." in the contact heading) are set in light sans (Plus Jakarta Sans 300, -0.03em), lilac #D1A1C7, never italic serif.
- Eyebrows: 12px caps +0.22em; small labels: 11px caps +0.2em. Headings use slight negative tracking (-0.01 to -0.025em). `text-wrap: balance` on headings, `pretty` on paragraphs.

**Spacing & layout**
- Container 1180px, centered; side gutter clamp(20,4vw,56). Section vertical padding clamp(90,11vw,160). Header-to-content gap clamp(40,5vw,64).
- Layouts reflow with CSS grid `repeat(auto-fit, minmax(min(100%, N), 1fr))` — no media queries.
- Radii step down by nesting: 32 / 28 / 26 / 24 / 20 / 16, pills 999.
- Hairlines (1px, alpha lilac or mulberry) separate content in place of boxes, except in cards.

**Motion**
- Hover/state transitions .25–.35s `ease`. Smooth scroll for nav. Hero ribbons are very slow by design (user request: "a second thought").

**Content**
- Copy is short and declarative. Client names appear in the hero client bar; mandates are anonymised (the Practice areas client lists are hidden for now in v2). No founding year is printed (unresolved 1992 vs 1994 — keep omitted until confirmed).

## B. Recommendations — need approval
1. Consolidate the near-duplicate colours (#260B24 / #2B0F2A; #F3EFF5 / #F3E7F0) or document why both exist.
2. Add a visible `:focus-visible` style for all buttons and links.
3. Add a mobile navigation (the nav disappears ≤900px).
4. Honour `prefers-reduced-motion` for the hero canvas.
5. (v1 only) Make the team filter hide/reorder cards, or rename it; dimmed cards at .25 opacity fail contrast. v2 removed the filter.
6. Decide the method dot styling (first dot differs from the rest).
7. Replace typeset wordmarks with licensed logo files if client permission exists, and reconcile list with the brief.
8. Bump 11px labels to 12px+ if accessibility is a priority.
9. Move grain and gradients to named CSS variables/classes during the rebuild.
10. Confirm Tilak Mukherji attribution wording and shorten of his quote (the on-page text is a trimmed version of the longer source quote).
