# v3 Plan — "Down to earth and classy"

> Status: plan, 2026-11-06. Awaiting the decisions in §2 before any build work.
> Inputs: stakeholder feedback ("too sleek", "work with content"), [`DESIGN_RESEARCH_V3.md`](DESIGN_RESEARCH_V3.md), [`DESIGN_RESEARCH_V3_EFFECTS.md`](DESIGN_RESEARCH_V3_EFFECTS.md), [`HERO_RESEARCH_V3.md`](HERO_RESEARCH_V3.md).
> Goal: be seen as **trustworthy, timeless, an institution**, with less sleekness and less PowerPoint.
> Scope: **design and feel only.** Copy stays as approved in v2 until the LinkedIn drafts arrive. v3 is designed with clear content slots so the new copy drops in later.

---

## 1. Does the design system need to change? Yes.

`docs/DESIGN.md` is meant to be the source of truth, but it still describes the v1/v2 direction. Several parts now contradict v3:

| DESIGN.md section | Today | v3 change |
| :--- | :--- | :--- |
| §1 Brand identity | Footprint without Oslo, "established 1994" | Add Europe/Oslo. Remove the founding year until 1992 vs 1994 is confirmed (PROJECT_BRIEF Q1). |
| §2 Design philosophy | Apple principles. "Deference" names **silk waves and grain gradients** as the materiality. | Keep reduction and clarity. Replace the materiality with **paper, rules, real photographs**. Add the "anti-slide" rules (§3 below). |
| §3 Colour (60–30–5–5) | Hex values are right. *Roles* push dark/light alternation, plum gradients, and mint glints in surfaces. | **Keep every hex.** Change the roles: paper is the dominant ground, Plum Obsidian is used for 1–2 deliberate moments plus the footer, plum is used like *ink* (rules, links, active states), no gradients, mint only for focus rings. |
| §4 Typography | Literata + Poppins (no longer used; v2 is EB Garamond + Plus Jakarta Sans). | Replace with the chosen v3 pairing (decision D2). Add the precision rules: small caps, old-style and tabular figures, `text-box` trim, optical sizing. |
| §5 References | Leathwaite, Adaption Labs, YC grain gradients. | Replace with C. Hoare & Co., Cravath / Slaughter and May, Stripe Press, Wellcome Collection. Keep Leathwaite only as a "don't become this" note. |
| §6 Copy bank | Mostly current. Leadership lists 4 people. | Add the associates and advisor (PROJECT_BRIEF Q6) and Oslo. Mark which lines are placeholders awaiting the LinkedIn drafts. |
| *(missing)* | — | New sections: **Layout system** (grid, margin column, rhythm), **Imagery** (portrait treatment, photo rules), **Motion**, **Do / Don't**. |

The other design-system files:
- **`tokens.css`** describes v2 as built (gradients, grain, 28px radii, pill shapes). Keep it frozen as the **v2 record**, and add a new **`source/v3/tokens-v3.css`** that the v3 build actually imports.
- **`docs/COMPONENTS.md` and `docs/USAGE.md`** are inventories of v2. Keep them as the v2 record, and write v3 versions once components are built. Don't pre-write them.

## 2. Decisions (all approved 2026-11-06)

| # | Decision | Recommendation |
| :-- | :--- | :--- |
| D1 | Approve the v3 principles (§3), including **mint back to focus rings only** (this reverses the last round's extra mint). | Approve. |
| D2 | Type pairing to test. | **EB Garamond** (display) + **Source Serif 4** (text, has `opsz` and small caps). Fallback: Garamond + IBM Plex Sans if all-serif reads too bookish on screen. |
| D3 | Hero. | **Revised:** the portraits are too low-resolution for a hero (source photo area 174×263px; a half-width hero panel at 1440px on a 2× screen needs about 1440px, an 8× upscale). Launch with a **typographic masthead** (paper or flat plum panel, no photo) and reserve the image half for office photos, at which point it becomes the H1 split. v2 keeps its waves meanwhile. |
| D4 | Navigation on desktop: top text links, or the **chapter index rail** (Effects E2)? | Top text links for launch (conventional and safe). Prototype the rail and decide visually. |
| D5 | One plum "chapter" band: IQ Social, the founder's note, or none? | The founder's note. |
| D6 | Build technology for v3 (see §5). | Plain HTML + CSS with classes, no design-tool runtime. |
| D7 | Ask Ahaan one question: "too sleek" compared with what? | **Answered:** "too sleek compared to a trustworthy, timeless institution." That is the yardstick for every v3 choice. |

## 3. v3 principles (to go into DESIGN.md)

1. **Paper, not screen.** Warm alabaster ground for most of the page. Dark is a moment, not a rhythm.
2. **One continuous grid.** A 12-column annual-report grid: columns 1–3 are a margin for labels, dates and notes; 4–10 hold content. Every section shares it, so the page reads as one document, not eight slides.
3. **Rules, not cards.** Hairline rules and ruled lists. Corner radius 0–4px. Cards only where something really is an object (portraits).
4. **Rhythm by density.** Alternate dense (ledger), airy (one line) and reading (prose) sections on the same ground. Not every section gets an eyebrow and an H2.
5. **Typography carries the voice.** Smaller, closer sizes (H1 56–72px, not 108px). Section labels are a 40px hairline plus an italic word, replacing uppercase eyebrows.
6. **Real artefacts.** Real portraits (now available), real names, the office address set like a letterhead, the ERA line (once confirmed), and later office photos and a signature.
7. **Quiet motion.** Rules draw in and headings rise once (CSS scroll-driven, `@supports`-gated). No loops. Respect `prefers-reduced-motion`.
8. **Plum as ink, mint as focus.** No glows, no radial gradients, no decorative grain.

## 4. v3 page structure (draft)

Content stays as approved in v2 unless marked **[slot]** (awaiting LinkedIn drafts).

| # | Section | Layout | Content source |
| :-- | :--- | :--- | :--- |
| 1 | **Masthead hero** | Typographic masthead (D3): paper or flat plum panel, headline (≈64px), subheadline paragraph with bold key phrases, dateline row *Mumbai · Oslo · 30+ years*, one ledger-row CTA. Image half reserved for office photos. ≈75vh. See [`SECTION_REFERENCES_V3.md`](SECTION_REFERENCES_V3.md) §1. | Approved hero copy |
| 2 | **Note under the hero** (directly after the hero) | The one plum chapter (D5). A letter-format note: margin label plus prose at a reading measure. **For now** it carries the approved statement ("Every mandate is led by a partner…") under the label *How we work*, with **no byline**: it isn't Ashmita's words. When her note arrives, it gets the label *A note from our founder*, her signature and portrait. | Approved statement now; **[slot]** for her words |
| 3 | **Why IQ** | Three ruled rows: Partnership / People / Performance. Labels in the margin column. | v2 copy |
| 4 | **Method** | Numbered ruled list across the margin and content columns. | v2 copy |
| 5 | **Mandates** | Ledger table: Role · Sector · (Year **[slot]**). Tabular figures. | v2 copy |
| 6 | **Endorsements** | Two quotes set like epigraphs: italic serif, attribution in small caps. Tilak shown as "Advisor to IQ Group". | v2 copy |
| 7 | **People** | Partners (4 portraits, plain grid, no dark card shells), then associates (5), then the advisor (1). Same portrait treatment as v2. | Roster from PROJECT_BRIEF Q6 |
| 8 | **Clients** | A typeset list in columns, "Clients include…". No marquee. | **[slot]**: needs logo/name permission (R2). Hidden until cleared. |
| 9 | **Offices & contact** | Letterhead layout: Mumbai address, phones, email; Oslo **[slot]** (address/contact not yet known); one ledger-row CTA. | v2 contact |
| 10 | **Colophon footer** | Wordmark, index of links, ERA line (if confirmed), "Last reviewed November 2026". | — |

## 5. Build approach

**Recommendation: build v3 as plain HTML + CSS** (`source/v3/index.html`, `source/v3/base.css`, `source/v3/tokens-v3.css`, `source/v3/fonts.css`), not as another `.dc.html` file. Everything lives under `source/` so GitHub Pages serves it.

- The `.dc.html` runtime (`support.js`, about 69 KB including React) serialises inline styles. That forced the v2 mobile work to target structural selectors like `#method > div > div:last-child`, which is fragile.
- v3 needs real classes, a shared grid, tokens and `@supports` blocks. All of that is plain CSS.
- No React for a static page: faster first load, fewer moving parts, which suits "down to earth".
- **Cost:** v3 can't be edited in the design tool. If design-tool round-tripping matters, say so (D6) and I'll keep the `.dc` format and accept the selector workarounds.

**Branching and publishing:**
- Work on a `v3` branch. `main` and Pages keep serving v2, untouched.
- Publish a preview at `…github.io/IQGroup-website/v3/` (a `v3/` folder on `gh-pages`), so stakeholders can compare v2 and v3 side by side via two links.
- When v3 is approved, `index.html` redirects to v3 and v2 stays reachable for reference.

## 6. Phases

| Phase | Work | Output | Depends on |
| :-- | :--- | :--- | :--- |
| **0. Decide** | D1–D7 | Answers recorded in this file | You, plus Ahaan for D7 |
| **1. Design system** ✅ 2026-11-06 | Rewrote DESIGN.md (v3) and created `tokens-v3.css` (paper/ink/plum roles, type scale, grid, rule weights, radii 0–4, motion tokens). | DESIGN.md v3, tokens | Phase 0 |
| **2. Type and grid specimen** — round 2 built 2026-11-06, awaiting sign-off | Round 1 feedback: italics read as AI slop, sections felt like slides, the hero needed a visual, Method was boring, cut-out portraits looked bad. Round 2: all roman, no eyebrow labels, split sections (heading left), paper texture, run-in prose, a five-step route for Method, a typeset roster with no portraits until a photoshoot, and a hero visual choice between A (engraved map) and B (embossed seal). | `source/v3/specimen.html` (`?hero=map` / `?hero=seal`) | Phase 1 |
| **3. Page build** | Sections 1–7, 9 and 10 from §4 (section 2 uses the approved statement for now). Section 8 (Clients) stays out until permission is cleared. | `source/v3/` | Phase 2 sign-off |
| **4. Effects** | Effects E1 (draw-in), E3 (type precision), E7 (ledger CTAs); E2 rail if D4 says yes | Same files | Phase 3 |
| **5. QA** | 390/768/1440 widths, keyboard and focus, reduced motion, contrast (paper/ink/plum pairs), LCP/CLS on a mid-range Android profile | Checklist in PR | Phase 4 |
| **6. Review** | Publish the `/v3/` preview, send v2 and v3 links to the stakeholders | Feedback | Phase 5 |
| **7. Content drop-in** | When the LinkedIn drafts arrive: fill the slots (founder's note, mandate years, clients, Oslo), revise headlines | — | Client |

## 7. Risks

- **All-serif reads as "law firm" or too bookish.** Judged at the specimen stage (Phase 2), with a sans fallback ready.
- **"Less sleek" overshoots into "dated".** Modernity comes from precision and behaviour (Effects doc §1), not decoration. Check against Ahaan's answer (D7).
- **Portrait quality.** The current photos are 312px web images, so they will look soft on retina screens. The full-size originals are still needed.
- **Content slots stay empty for a long time.** The layout must work without the Clients section and with the interim note text. It does, because each section is optional in the flow.
