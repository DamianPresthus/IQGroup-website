# v3 Research, part 2 — Modern effects and layouts that stay classy

> Status: research, 2026-11-06. This is a companion to [`DESIGN_RESEARCH_V3.md`](DESIGN_RESEARCH_V3.md) and assumes its principles: paper ground, rules over cards, real artefacts, quiet motion.
> The question: which **fresh, technically modern** techniques make the site feel current and well-made **without** pulling it back towards "sleek" or "slides"?
> Support status comes from MDN, caniuse and Chrome for Developers, as cited. Anything marked `[INFERENCE]` is my judgement and was not verified.

---

## 1. Framing: "modern" ≠ "sleek"

v2 was modern through **surface**: glow, grain, gradients, blur. The 2026 award circuit pushes the same way, further. Code Barcelona's [2027 trends round-up](https://codewebbarcelona.com/en/web-design-trends-2027) leads with oversized kinetic lettering, "maximalism and colour that doesn't ask permission" and 3D worlds, and Toimi lists [bento grids and WebGL shaders](https://toimi.pro/blog/web-design-trends-what-works) as mainstream. All of these are the wrong signal for a 30-year search firm.

The alternative is to be modern through **behaviour and precision**. Effects that feel like print, but responsive:
- type that sits exactly on its baseline;
- rules that draw themselves in;
- an index that tells you where you are;
- photographs that arrive calmly;
- a page that moves like turning pages, not like a product launch.

Most of these are now **native CSS**, with no libraries, so they are cheap, fast and degrade gracefully. They also suit this codebase: v2's runtime serialises inline styles, but we already ship a `<helmet>` stylesheet (the mobile `@media` block), and every effect below can live there.

The test for each effect: **would it survive in a well-made printed annual report, if paper could move?**

---

## 2. Effect catalogue

### 2.1 Recommended

| # | Effect | What it looks like on IQ | Technique | Support (cited) |
| :-- | :--- | :--- | :--- | :--- |
| E1 | **Scroll-linked reveal (text and rules)** | As a section enters the viewport, its hairline rule draws from left to right and the heading's lines rise 8–12px out of a clip mask, one after another. It happens once, quietly, then stays still. | `animation-timeline: view()` with `animation-range: entry 0% entry 60%`. Animate only `clip-path`, `transform` and `opacity`. | `animation-timeline` and `view()`: **Baseline 2026, newly available since October 2026** ([MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/animation-timeline)). Wrap in `@supports (animation-timeline: view())` so older browsers simply show the content. |
| E2 | **Chapter index rail = scroll progress** | A thin left rail with one short tick per chapter (Firm · Method · Mandates · Partners · Contact). The current tick is longer and plum, so the rail is both navigation and a "you are here" marker. Taken from Stripe Press's tick-mark rail ([teardown](https://pageproofer.com/inspiration/warm-editorial/stripe-press)). It replaces the pill nav on desktop. | `position: sticky` rail. Active tick via a named view timeline per section (CSS) or `IntersectionObserver` (JS, ~15 lines). | Same as E1 for the CSS route. The IO fallback works everywhere. |
| E3 | **Typographic precision layer** | Headings sit flush on their rules with no phantom space above caps. Balanced headline wraps, no orphans in paragraphs, old-style figures in prose, tabular figures in the mandates ledger, real small caps for labels. Display sizes use the display optical cut automatically. | `text-box: trim-both cap alphabetic`; `text-wrap: balance` / `pretty`; `font-variant-numeric: oldstyle-nums` / `tabular-nums`; `font-variant-caps: small-caps`; `font-optical-sizing: auto` with an `opsz` font (Newsreader, Source Serif 4, Literata). | `text-box-trim`: **Baseline 2026, since August 2026** ([MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/text-box-trim)). The others are long-standing. `text-wrap: pretty` coverage is uneven `[INFERENCE]`; it degrades to a normal wrap. |
| E4 | **Name index with portrait reveal** | Partners appear as a plain list of names in large serif, not as cards. The hovered or focused name goes to full ink, the others drop to 40% (pattern seen on CoMinVi in the [2027 round-up](https://codewebbarcelona.com/en/web-design-trends-2027): "typography becomes the selector without needing a row of cards"). The partner's portrait and two-line bio appear beside the list. On mobile it becomes a stacked list with portraits inline. | `:has()` and `:hover`/`:focus-visible` for the dimming. Portrait placement via CSS anchor positioning or a fixed grid cell. | `anchor()`: **Baseline 2026, newly available** ([MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/anchor)). A grid-cell fallback needs no anchor support. |
| E5 | **Founder's note with drawn signature** | A short, signed letter from Ashmita: a drop cap opening, a measure of about 62 characters, and her signature drawn in ink as the note scrolls into view. It is the single "hand-made mark" this direction calls for. | Signature as an SVG path, `stroke-dashoffset` animated on the E1 view timeline. Drop cap via `initial-letter: 3`, with a `float` fallback. | SVG stroke animation works everywhere. `initial-letter` is not in Firefox `[INFERENCE]`; the float fallback looks nearly the same. **Needs a real signature scan from the client.** |
| E6 | **Duotone photography** | Partner portraits and office photos from different sources (phones, old shoots) are unified into one tone: ink shadows and paper highlights, with a faint plum cast. This is how a mixed photo supply still looks commissioned. | `filter: grayscale(1) contrast(1.05)` plus `mix-blend-mode: multiply` over a plum or paper layer, or a pre-processed duotone at export (better for performance). | Universal. |
| E7 | **Ledger rows as actions** | Contact options and "Begin a search" appear as ledger rows: square corners, 1px plum hairline, label on the left, a small ↗ in a divided right cell. Hover fills the row with a 4% plum tint. This replaces the pill buttons (Stripe Press purchase table pattern, [teardown](https://pageproofer.com/inspiration/warm-editorial/stripe-press)). | Plain CSS grid. `color-mix(in oklch, var(--plum) 4%, transparent)` for the tint. | Universal (`color-mix` has been Baseline since 2023). |
| E8 | **Calm page transitions** (when the site becomes multi-page, e.g. partner profiles) | A 250ms cross-fade between pages. The partner's name or portrait morphs from the index to the profile header. | `@view-transition { navigation: auto; }` and `view-transition-name` on the portrait. | **Limited availability** on MDN ([@view-transition](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@view-transition)). About **88% global usage** on caniuse ([cross-document VT](https://caniuse.com/wf-cross-document-view-transitions)). Unsupported browsers navigate normally, so there is no downside. |

### 2.2 Optional or later

| Effect | Note |
| :--- | :--- |
| **Scroll-triggered animations** (`animation-trigger`, `timeline-trigger`) | Time-based animations that fire when crossing a scroll offset, purely in CSS. It replaces IntersectionObserver for E1/E2-style reveals. Shipped in **Chrome 145** ([Chrome blog](https://developer.chrome.com/blog/scroll-triggered-animations)). Chrome-only today, so it can only be an enhancement on top of an IO fallback. |
| **Header that compacts when stuck** | `@container scroll-state(stuck: top)` ([MDN](http://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Conditional_rules/Container_scroll-state_queries)). Chromium-only `[INFERENCE]`. Nice-to-have only. |
| **Single highlighter or underline mark** | One hand-drawn underline under one phrase per page, drawn on reveal. Warm & Editorial sites ration this to "one hand-made mark per section" ([PageProofer](https://pageproofer.com/inspiration/warm-editorial/)). For IQ, at most one on the whole page, or E5 covers it. |
| **One plum "chapter" band** | Stripe Press gives each item a full-bleed colour band. IQ could give **IQ Social** (or the founder's note) one flat plum chapter with paper-coloured type. It's the single dark moment on an otherwise paper page. |
| **"Last reviewed" colophon** | A footer line reading "Last reviewed November 2026". Stanford guideline 8: show the site is updated, or at least reviewed ([guidelines](https://credibility.stanford.edu/guidelines.html)). It costs nothing and is quietly institutional. |

### 2.3 Rejected, and why

| Effect | Why not |
| :--- | :--- |
| WebGL or shader backgrounds, animated canvas ribbons (v2) | This is exactly the "sleek" signal. Fogg: sites lose credibility when showing "dazzling things they can do with web technology." It also costs battery on mid-range Android. |
| Bento grids | Now an "industry standard" ([Toimi](https://toimi.pro/blog/web-design-trends-what-works)), and therefore generic. It's also the card-heavy look we are leaving. |
| Oversized or kinetic type, variable-weight toys | Reads as studio portfolio or fashion, not institution. |
| Scroll-jacking, horizontal scroll sections, parallax | They take control from the reader, are a known accessibility and nausea issue, and make the page feel like slides again. |
| Cursor followers, magnetic buttons, auto-scrolling logo marquees | Gimmick. A marquee also implies a client endorsement the client hasn't granted (PROJECT_BRIEF R2). |
| Glassmorphism, glow, heavy grain | Already identified as v2's sleekness. |

---

## 3. Layout patterns

| # | Pattern | Use on IQ | Reference |
| :-- | :--- | :--- | :--- |
| L1 | **Annual-report grid.** A 12-column grid: columns 1–3 are a margin for labels, notes and dates; 4–10 hold content; 11–12 are air or asides. Labels hang in the margin instead of uppercase eyebrows stacked above headings. | Every section. This is the main fix for the "slide" feel: one continuous grid down the page instead of eight centred boxes. | Annual reports; Are.na's "hanging list markers" ([PageProofer](https://pageproofer.com/inspiration/warm-editorial/)) |
| L2 | **Masthead hero.** The wordmark and text nav, a thin rule, a dateline row (*Mumbai · 30+ years · Member, ERA*), the statement at 56–72px (not 108), then a photograph or flat panel. Roughly 70–80% of the viewport, so the next section shows. | The top of the page. | Newspaper mastheads; C. Hoare & Co. split (see part 1) |
| L3 | **Sticky split.** One side stays fixed (a portrait or office photo) while the text scrolls past on the other. | The founder's note (E5) and IQ Social. | Stripe Press: "large 3D-rendered book cover (sticky while the text scrolls)" ([teardown](https://pageproofer.com/inspiration/warm-editorial/stripe-press)) |
| L4 | **Ledger / index lists.** Ruled rows with tabular figures: *Role · Sector · Year*. Clients as a multi-column typeset list (`columns: 3`). | Mandates and clients, replacing cards and the logo strip. | Cravath and Slaughter and May's dated activity lists (part 1) |
| L5 | **Name index** (E4). | Partners. | CoMinVi ([round-up](https://codewebbarcelona.com/en/web-design-trends-2027)) |
| L6 | **Section label = 40px hairline + italic word**, instead of an uppercase eyebrow plus a big H2. | All sections. Not every section needs a heading at all. | Stripe Press ([teardown](https://pageproofer.com/inspiration/warm-editorial/stripe-press)) |
| L7 | **Rhythm by density, not by colour bands.** Alternate dense (ledger), airy (one-line statement) and reading (prose) sections on the same paper ground. Separate them with rules. Gaps of 100–200px. | Whole page. | PageProofer, Warm & Editorial: "Sections are separated by hairlines… rather than by alternating background bands" |
| L8 | **Colophon footer.** The address set like a letterhead, the ERA line, "Last reviewed…", and a full index of links. | Footer and contact. | Stanford guidelines 2, 5 and 8 |

---

## 4. A proposed v3 kit (what I'd actually build)

1. **Grid and labels:** L1 + L6 + L7. This is the structural cure for the slide feel.
2. **Top:** L2 masthead with a duotone photograph (E6). Placeholder until the shoot.
3. **Motion:** only E1 (rules draw in, headings rise once) and E2 (index rail). All CSS, gated by `@supports`, disabled under `prefers-reduced-motion`.
4. **Type:** the E3 precision layer on the serif-throughout option A from part 1 (EB Garamond display with Source Serif 4 or Newsreader text, both of which have an `opsz` axis and small caps).
5. **Content blocks:** L4 ledger for mandates, L5/E4 name index for partners, L3/E5 founder's note with signature, E7 ledger rows for contact and the CTA.
6. **Colour:** paper ground; plum as ink (rules, links, active tick); one flat plum chapter at most; mint only as the focus ring.

## 5. Engineering rules for these effects

- **Content first, effect second:** every reveal starts from a *visible* state in unsupported browsers. Hide-then-reveal only inside `@supports (animation-timeline: view())`.
- **Reduced motion:** `@media (prefers-reduced-motion: reduce)` removes all scroll-linked animation and the signature draw (show it fully drawn).
- **Compositor-only properties:** `transform`, `opacity` and `clip-path` only. Never animate layout. Each reveal is ≤ 400ms of perceived motion.
- **No new dependencies:** no GSAP, Lenis or Three.js. Everything above is native CSS plus at most ~30 lines of JS (the IO fallback for E2).
- **Performance budget:** dropping the hero canvas and the grain data-URIs should *lower* cost compared with v2 `[INFERENCE: not measured]`. Measure LCP and CLS on a mid-range Android once v3 exists (PROJECT_BRIEF §11 targets).

## 6. Decisions needed

1. Approve the v3 kit (§4), or strike items. E5 depends on getting a signature scan and Ashmita's agreement to a signed note.
2. Index rail (E2) as the desktop navigation in place of a top nav: yes or no? It is the most distinctive move, and slightly less conventional.
3. One plum chapter band: on IQ Social, on the founder's note, or none?
4. Should I build a small **effects lab** page (`prototypes/v3-effects-lab.html`) to demo E1–E7 on real IQ copy before committing to a full v3 layout?
