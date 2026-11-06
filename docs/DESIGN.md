# IQ Group — Design Direction (`DESIGN.md`)

> **Status:** v3 direction, approved 2026-11-06 (decisions D1–D7 in [`V3_PLAN.md`](V3_PLAN.md)). This file is the **source of truth for design intent**. Tokens live in [`../source/v3/tokens-v3.css`](../source/v3/tokens-v3.css); the base and component CSS is in [`../source/v3/base.css`](../source/v3/base.css); the specimen is [`../source/v3/specimen.html`](../source/v3/specimen.html).
> **Supersedes** the v1/v2 direction (Leathwaite hero, silk waves, grain gradients, Adaption-style pills). The v2 record is kept in `tokens.css`, [`COMPONENTS.md`](COMPONENTS.md) and [`USAGE.md`](USAGE.md).
> **Evidence behind this file:** [`DESIGN_RESEARCH_V3.md`](DESIGN_RESEARCH_V3.md) · [`DESIGN_RESEARCH_V3_EFFECTS.md`](DESIGN_RESEARCH_V3_EFFECTS.md) · [`HERO_RESEARCH_V3.md`](HERO_RESEARCH_V3.md) · [`SECTION_REFERENCES_V3.md`](SECTION_REFERENCES_V3.md) · [`PROJECT_BRIEF.md`](PROJECT_BRIEF.md).

---

## 1. Brand facts

- **Company:** IQ Group (`iqgroup.co.in`). A partner-led boutique for **executive search, HR advisory and leadership hiring**, with **30+ years** of practice.
  - **Founding year: not printed** until 1992 vs 1994 is confirmed (PROJECT_BRIEF Q1).
  - **ERA membership:** shown only once confirmed (Q2).
- **Where:** headquartered in Mumbai (806, Sunshine Towers, Dadar West). Search across Mumbai, New Delhi, Bangalore, Kolkata, Dubai and Singapore. **Launching in Oslo, Norway.** Regions in copy: *India, the Middle East, South Asia and Europe*.
- **Mission:** *"To provide deeply personalized service from a dedicated, high-caliber team — helping you make impactful hires from specialist roles to the C-suite."*
- **Difference:** every mandate is led by a partner, never handed down to junior researchers.
- **Audience:** board members, promoters, CEOs, CHROs, MDs, PE operating partners, and foundation and CSR leaders, in India, the Gulf, South-East Asia and Europe.

## 2. Design stance

**Yardstick** (stakeholder, 2026-11-06): v2 was *"too sleek compared to a trustworthy, timeless institution."* Every decision is checked against that sentence.

**Keywords:** down to earth · classy · trustworthy · timeless · institution.

**Principles**
1. **Paper, not screen.** Warm alabaster is the ground for most of the page. Dark is a *moment* (one section plus the footer), not an alternating rhythm.
2. **One continuous grid.** Every section sits on the same 12-column grid, with a left margin column for labels. The page reads as one document, not as slides.
3. **Rules, not cards.** Hairline rules and ruled lists. Corners 0–4px. No floating card containers.
4. **Rhythm by density.** Alternate dense (ledger), airy (one line) and reading (prose) sections on the same ground. Not every section needs a heading.
5. **Typography carries the voice.** Serif throughout, at calm sizes. Hierarchy comes from size, italic and colour, not from weight jumps or uppercase eyebrows.
6. **Real artefacts, never decoration.** Real portraits, real names, the real address, facts and dates. No stock photography, no abstract graphics.
7. **Quiet motion.** Things arrive once and stay still. No loops.
8. **Plum is ink, mint is focus.** No gradients, no glows, no decorative grain.

Credibility basis: the [Stanford Web Credibility guidelines](https://credibility.stanford.edu/guidelines.html) (show a real organisation and real people, make contact easy, avoid "dazzling" technology) and the summary that a credible site looks appealing "but not too 'slick'".

## 3. Colour

The hex values are **unchanged** from the locked 60–30–5–5 palette (Royal Plum `#8F1F78` at hue 312.3°; the accent is Royal Plum −137.5° → 174.8°). v3 changes **how colours are used**.

| Role | Token | Hex | Use | Contrast |
| :--- | :--- | :--- | :--- | :--- |
| Paper | `--paper` | `#FAF8FA` | Page ground (most of the page) | — |
| Paper 2 | `--paper-2` | `#F3E7F0` | Quiet bands, table zebra. Rare. | — |
| Ink | `--ink` | `#12051A` | Headings, names | 18.7:1 on paper |
| Body ink | `--ink-body` | `#2B0F2A` | Running text | 16.5:1 on paper |
| Muted ink | `--ink-muted` | `#6E4165` | Labels, roles, metadata | 7.6:1 on paper · 6.7:1 on paper 2 |
| Accent ink | `--ink-accent` | `#8F1F78` | Links, active nav, numerals, CTA border, accent rules | 7.5:1 on paper · 6.6:1 on paper 2 |
| Focus | `--focus` | `#0F766E` | Focus ring **only** | 5.2:1 on paper · 4.6:1 on paper 2 |
| Dark ground | `--dark-ground` | `#1A0826` | The one dark section (founder's note) and the footer | — |
| Dark ink | `--dark-ink` | `#FAF8FA` | Text on dark | 18.0:1 |
| Dark muted | `--dark-ink-muted` | `#D1A1C7` | Labels and accents on dark | 8.7:1 |
| Dark focus | `--dark-focus` | `#1AD1BE` | Focus ring on dark | 9.9:1 |

**Proportion (v3 reading of 60–30–5–5):** about 60% paper; about 30% ink and aubergine (text, rules, the dark moment); 5% muted plum (labels, metadata); 5% accent (plum links, numerals and rules, plus the mint focus ring).

**Rules**
- Royal Plum on dark is **2.5:1**. Never use it as text on dark; on dark, accents switch to lilac.
- Mint appears **only** as the focus ring. *This reverses v2's extra mint glints and labels.*
- **No gradients of any kind.** No radial glows, no gradient text, no gradient bars. The v2 "highlight" gradient bar becomes a solid 1–2px plum rule.
- No pure `#000` or `#FFF` surfaces.

## 4. Typography

| Role | Family | Notes |
| :--- | :--- | :--- |
| Display (hero, section headings, names, numerals) | **EB Garamond** 400–500, italic 400 | Tight tracking (−0.02em), line-height 1.04–1.12 |
| Text (body, UI, labels, buttons) | **Source Serif 4** 300–600, `opsz` 8–60 | `font-optical-sizing: auto`. One family for UI too; no sans. |

**Scale** (fluid, 390 → 1440px; tokens `--fs-*`): display 44–68px · H2 32–46px (optional) · H3 24–30px · lead 20–23px · body 17–18px · small 15px · label 16px italic · micro 13px (legal only).

**Details**
- **Section label** = a 40px hairline plus an *italic word* in muted ink (e.g. "— *Method*"). This replaces the v2 uppercase tracked eyebrows.
- **Figures:** tabular (`tnum`) in ledgers, counts and phone numbers.
- **Measure:** prose ≤ 62ch. `text-wrap: balance` on headings, `pretty` on paragraphs.
- **Bold key phrases** (2–3 per block at most) carry emphasis in hero and note prose, following the Tiger Global pattern. No italics for emphasis inside headings; the italic is reserved for labels and quotes.
- **Accent word in the hero headline:** stays ("forward."), now in **italic EB Garamond in accent ink**, not light sans.

**Font delivery: self-hosted** (`source/assets/fonts/`, `source/v3/fonts.css`). The Google Fonts CDN builds of both families **lack `smcp` (small caps) and `onum` (old-style figures)**; checked 2026-11-06, they expose only `liga`, `tnum`, `pnum`, `frac` and similar. v3 therefore ships the full upstream builds (from `google/fonts`, SIL Open Font License), subset to Latin + Latin‑1 with `smcp`, `c2sc`, `onum`, `lnum`, `tnum`, `pnum` and `frac` kept, and weights limited to what is used: about 266 KB in total. Self-hosting also removes the Google Fonts CDN request, which matters for EU/EEA visitors (GDPR) after the Oslo launch.
- **Italics** use EB Garamond Italic (labels, quotes, the accent word). Source Serif 4 Italic is not shipped: it has no small caps and would add about 130 KB.
- **Small caps** (`.caps`, quote names, the dateline) are real `smcp`. Never set `font-variant-caps` on a font that lacks it.

## 5. Layout system

- **Container:** max 1240px, side padding 20–56px.
- **Grid:** 12 columns, gutter 16–28px.
  - **Margin columns 1–3** hold section labels, dates and short notes.
  - **Content columns 4–10** hold headings, prose, lists and ledgers.
  - **Columns 11–12** are air (or a wide table running across 4–12).
- **Mobile (< 720px):** one column. The label sits above its content.

**Section anatomy:** a strong rule at the top, the label in the margin, content in the content columns. Optional H2. No background change between most sections.

**Rhythm:** section gap 72–128px by default, 40–64px between related sections. Follow a dense section with an airy one.

**Hero:**
- **Typographic masthead** at about 75vh: text nav, a hairline, the headline, a lead paragraph with bold key phrases, the dateline row (*Mumbai · Oslo · 30+ years*) and one ledger-row CTA.
- **The image half is reserved.** It becomes a split layout with a photograph when real office photos arrive.
- **No photo before then.** The current portraits are too small: 174×263px source against the roughly 1440px needed (D3).

**Page order** (V3_PLAN §4): hero → note (the dark moment) → Why IQ → Method → Mandates → Endorsements → People → Clients (hidden until permission) → Offices & contact → colophon footer.

## 6. Component vocabulary

The detailed inventory is written as components get built (it will replace the v2 `COMPONENTS.md`). The vocabulary:

| Component | Definition | Reference |
| :--- | :--- | :--- |
| **Text nav** | Wordmark plus 4 text links. The active link is underlined in accent ink. Below 900px, a "Menu" text button opens a full-screen sheet (v2 behaviour, restyled). | Cravath, Slaughter and May |
| **Section label** | 40px hairline + italic word, in the margin column | Stripe Press |
| **Ruled row** | Hairline above; title (H3) plus one sentence; optional margin number | Pentagram, Are.na |
| **Ledger row** | A 1px rule; columns such as Role · Sector · Region (· Year); tabular figures; hover fills with a 5% plum tint | Basecamp index, Stripe Press |
| **Ledger CTA** | A ledger row used as a button: label on the left, a ↗ in a divided right cell, 1px accent border, square corners | Stripe Press |
| **Epigraph quote** | Italic serif quote, a 28px rule, the name, then the role in muted ink. No box, no giant quote mark. | Stripe Press |
| **Portrait** | Greyscale + plum multiply (28%), on a shared dark studio backdrop. Partners at 4:5, associates and advisor at 1:1. Radius 2px. Name and role below in ink, on paper. No dark card shell. | Pentagram |
| **Letterhead block** | Office name, address, phones, email, set like stationery | Hoare's |
| **Colophon** | Wordmark, link index, ERA line (if confirmed), privacy, "Last reviewed {month year}" | Tiger Global |

**Retired from v2:** pill nav, pill buttons, segmented toggles, rounded cards (24–32px), gradient card headers, grain overlays, the logo marquee, the canvas wave hero (it stays in v2 only), mint labels and mint glows.

## 7. Imagery

- **Allowed:** real, owned photographs of IQ people and IQ places.
- **Not allowed:** stock, city landmarks, abstract graphics or AI imagery. Reasons: they are generic, and a single city narrows an international firm (see HERO_RESEARCH §2b).
- **Portraits:**
  - All portraits share one treatment, `--portrait-filter` + `--portrait-tint`, so photos from different shoots read as one set.
  - Backgrounds are replaced with a single dark studio backdrop (current process: `rembg`, with edge colours unmixed from the old backdrop).
  - **Minimum source size:** 1200px on the long edge (current files are 312px, so higher-resolution originals are requested).
- **Hero / office photo (future):** at least 2400px wide, a real IQ office or people at work. Toned to the palette, calm, with a quiet area on the text side.

## 8. Motion

- **Allowed:**
  - section rules draw in from left to right once, on entry;
  - headings rise 10px once;
  - hover and focus at 160ms.
- **Technique:** CSS scroll-driven animations (`animation-timeline: view()`, Baseline 2026) inside `@supports`. Content is visible without them.
- **Off under `prefers-reduced-motion`:** the tokens set durations to 0.
- **Not allowed:** loops, parallax, scroll-jacking, marquees, cursor effects, WebGL or canvas backgrounds.

## 9. References

**Take from:**
- **C. Hoare & Co.:** flat panel, real premises, quiet heritage line.
- **Cravath / Slaughter and May:** plain ground, text nav, a dated record of activity.
- **Tiger Global:** a statement paragraph as the hero, plain colophon.
- **Pentagram:** split heading and prose, a uniform partner portrait row.
- **Stripe Press:** italic labels, ledger rows, epigraph quotes.
- **Are.na and Basecamp:** ordered lists, the em-dash index, a founder letter.

**Don't become:**
- **Leathwaite / Russell Reynolds:** dark cinematic hero, the category default.
- **Korn Ferry / Boyden:** generic stock.
- **Heidrick:** abstract tech graphics.
- **Sequoia:** pill toggles and oversized spaced-out capitals.

## 10. Do / Don't

**Do**
- Set most of the page on paper, and use the dark ground once.
- Put labels in the margin column, and use rules between rows.
- Show real names, faces, dates and the real address.
- Use one CTA per view, written as a ledger row or a text link with ↗.
- Keep every claim specific ("30+ years", a named sector), never a superlative.

**Don't**
- Alternate dark and light every section.
- Use uppercase tracked eyebrows, pills, toggles, rounded cards or gradients.
- Print a founding year, an ERA badge, client logos or a signed founder quote until each one is confirmed.
- Add motion that loops or that hides content when unsupported.

## 11. Copy bank (approved v2 copy; slots marked)

**Hero**
- **Headline:** *Hires that move your organisation forward.* ("forward." is the accent word)
- **Lead:** *Partner-led executive search and HR advisory — from specialist roles to the C‑suite, across India, the Middle East, South Asia and Europe for 30+ years.*

**Note under the hero**
- **For now:** label *How we work* with *"Every mandate is led by a partner — from the first brief to the day your hire walks in."* No byline.
- **[slot]** Ashmita's own note. Her signature and portrait go in only with her text.

**Why IQ**
- **Partnership:** undivided attention; we learn your organisation at the cultural, strategic and tactical level.
- **People:** a proprietary network of CEOs, managing directors and domain heads, built over three decades.
- **Performance:** complex, niche placements in remarkably fast turnaround times.

**Method:** 1. Understand your business · 2. Shortlist candidates · 3. Identify the match · 4. Hire & onboard · 5. Monitor & iterate.

**Mandates (anonymised):**
- Chief Executive Officer — specialty chemicals manufacturer, India
- Chief Financial Officer — precision engineering company, India
- Vice President, Investments — private equity firm, India
- Chief Marketing Officer — private-sector bank, India
- Head of CSR, India — European multinational bank

**[slot]** years per mandate.

**Endorsements**
- *"Over a decade, IQ helped me build teams of strong professionals at UBS, Yes Bank and IDFC. I have been impressed by their speed, professionalism, responsiveness and cost-effective service."* — Ajay Mahajan, former Managing Director, UBS
- *"IQ may be a small firm but more than makes up with its talent, connections and never-say-die attitude…"* — Tilak Mukherji, **Advisor to IQ Group** · Chairman, Sigma Research & Consulting

**People**
- **Partners:**
  - Ashmita Ray Sarkar — Founder & Managing Director (all practices, C‑suite)
  - Annu Paul — Director (hospitality, media, social impact, business development)
  - Shirin Gulrajani Talwar — Director (legal, social impact)
  - Christine Gomes — Managing Associate, IQ Social (CSR, NGOs, foundations)
- **Associates:**
  - Mallika Sen Varma — Senior Associate (BFSI, hospitality & media)
  - Bijal Joshi — Senior Associate (BFSI, social impact & NGO)
  - Shharran Das — Associate (media, BFSI)
  - Tanushree Kundu — Associate (BFSI, hospitality, FMCG, ITES)
  - Neha Beswal — Associate (BFSI, ITES; confirm)
- **Advisor:** Tilak Mukherji — Chairman, Sigma Research & Consulting.

**Clients [slot]:** shown only after name/logo permission (PROJECT_BRIEF R2). Candidate list in PROJECT_BRIEF §6.2.

**Contact**
- **Mumbai:** 806, Sunshine Towers, Senapati Bapat Marg, Dadar (West), Mumbai 400 013 · +91 22 6588 5932 · +91 98200 61329 · ashmita@iqgroup.co.in
- **Oslo [slot]:** address and contact to come.
