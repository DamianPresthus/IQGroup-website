# v3 Hero Research — still image vs. moving waves

> Status: research, 2026-11-06. Builds on [`DESIGN_RESEARCH_V3.md`](DESIGN_RESEARCH_V3.md) and [`DESIGN_RESEARCH_V3_EFFECTS.md`](DESIGN_RESEARCH_V3_EFFECTS.md).
> Peer heroes captured at 1440×900 in `reference/hero-research/` (2026-11-06). Several are partly covered by cookie banners. Bain blocked the capture with a bot check, and McKinsey, Spencer Stuart, Leathwaite, Dalberg and Oliver Wyman timed out. Leathwaite's hero was read from its HTML earlier: an MP4 gradient loop (`Leathwaites_Loop_StaticGrad_v5.mp4`).

---

## 1. What peers do now (observed)

| Firm | Hero | Pattern |
| :--- | :--- | :--- |
| **Egon Zehnder** (`egonzehnder.png`) | A full-width, soft-focus photo or video still (office blinds), a serif headline "Leadership matters. Let's get it right.", and a play button. | **Atmospheric photo or video** |
| **Korn Ferry** (`kornferry.png`) | A soft-focus photo of an office interior (plant, chair), a green headline "Growth Starts Here". | **Atmospheric photo** |
| **Boyden** (`boyden.png`) | Split: text over a blurred image on the left, an architectural stock photo (glass staircase) on the right. | **Split, stock architecture** |
| **Heidrick & Struggles** (`heidrick.png`) | White, a large sans headline "We help our clients change the world", an abstract animated line and circle graphic. | **Abstract tech graphic** |
| **BCG** (`bcg.png`) | A row of editorial image tiles (articles, indices) as the hero. | **Content-led hero** |
| **Odgers Berndtson** (`odgers.png`) | Flat navy panel, a short headline, and a 5-slide carousel. | **Carousel** (dated) |
| **Leathwaite** (HTML) | Looping gradient video. | **Abstract motion loop** |
| **IQ v2** | Dark gradient with animated canvas ribbons. | **Abstract motion loop** |

**Reading:**
- **Abstract motion loops are the commodity option.** Heidrick, Leathwaite and IQ v2 all use one, and it reads as "tech-forward", which is the sleekness the stakeholders flagged. It also says nothing about *this* firm.
- **The big firms have moved to photographs,** but mostly generic, soft-focus stock (an office plant, blinds, a glass staircase). They are calm but anonymous. A boutique can beat them on **specificity**.
- **Carousels look dated** (Odgers).
- The strongest heroes in part 1 were **C. Hoare & Co.** (a flat colour panel next to a real photo of *their own* premises) and **Rothschild & Co** (a real historic interior). Both are **real, owned, specific places**.

## 2. Recommendation: yes, replace the waves with a still photograph, but make it specific

**Why a still image wins for IQ:**
1. **Credibility.** Stanford guideline 2: "Show that there's a real organization… posting a photo of your offices" ([Fogg 2002](https://credibility.stanford.edu/guidelines.html)). Waves can't do that. A real place or a real person can.
2. **Down to earth.** Motion graphics read as a product launch. A still photograph reads as a firm.
3. **Timeless.** Abstract loops date with each design cycle. A good photograph of a real place doesn't.
4. **Performance.** v2's canvas runs `requestAnimationFrame` every frame for as long as the hero is open (`source/IQ Group Website v2.dc.html`, `tick()`), which costs battery on phones. A single well-compressed image (AVIF/WebP, `srcset`, `fetchpriority="high"`) costs only its download, roughly 150–250 KB `[INFERENCE: target, not measured]`.

**What *not* to use:** generic stock (glass towers, handshakes, blurred office plants, skylines at dusk). That is what Korn Ferry and Boyden do, and it would make IQ look like a small version of them.

## 2b. Update 2026-11-06: place-neutral imagery

Two candidates were dropped. The Gateway of India (Unsplash) wasn't free to use, and any single-city landmark narrows an international firm. A jali/mashrabiya lattice spans India and the Gulf, but it means nothing in **Oslo**, which is now launching. **New direction:** a *place-neutral* hero image of **raking light on natural stone or plaster**: texture, light and shadow, no landmark, no culture-specific motif. Toned into plum and darkened so it reads as a surface, not a picture. Place-specific photos move to the **offices/contact section**, one small image per city (Mumbai, Oslo…). The ranked options below are superseded for the hero.

## 3. Image options, ranked

| Rank | Image | Why | Dependency |
| :-- | :--- | :--- | :--- |
| **1** | **A commissioned documentary photo:** Ashmita or the partners at work in the Mumbai office, natural light, unposed. Duotone treatment (see Effects E6). | The most honest signal: real people, a real place. It shows the firm is partner-led. | A photo shoot (open question since PROJECT_BRIEF R7). |
| **2** | **Mumbai Art Deco / Victorian architecture detail.** A facade, stair rail or window of the city's heritage buildings, close-cropped. Mumbai's *Victorian Gothic and Art Deco Ensembles* are a UNESCO World Heritage site. | Place, India and timelessness in one image. Distinctive among global peers, who all use glass and steel. It feels like an institution without claiming false age. Works as the **interim** image before a shoot. | A licensed photo or a short local shoot. Pick a building with no legible signage. |
| **3** | **The office itself:** the Sunshine Towers entrance, a meeting-room table, a bookshelf, a window onto Dadar. | Directly satisfies "photo of your offices". | Access and a photographer. Office quality is unknown `[INFERENCE]`. |
| — | Abstract waves (current) / stock | Rejected (above). | — |

## 4. Hero layouts to test with the image

| Variant | Layout | Feel |
| :--- | :--- | :--- |
| **H1 — Split panel** (Hoare's pattern) | Left 45%: flat Plum Obsidian or paper panel with the headline, subheadline, dateline row (*Mumbai · 30+ years · Member, ERA*) and one CTA ledger row. Right 55%: the photograph, edge to edge. On mobile the photo stacks on top at 4:3. | The most classy and institutional. Text is always legible, with no overlay tricks. |
| **H2 — Masthead with plate** | Paper ground. Wordmark and text nav, a hairline, a large serif headline across 8 columns, and below it a wide photographic "plate" (about 21:9) with a small italic caption: *"Kala Ghoda, Mumbai."* | Editorial, like a magazine opener. Least "website". The caption alone signals care. |
| **H3 — Full-bleed photo** (Egon Zehnder / Rothschild pattern) | A full-bleed duotone photo with a soft dark gradient on the text side, and the headline over it. | Most dramatic, closest to v2's mood. Text legibility depends on the image, so it's the riskiest with photos not yet shot. |

**My pick:** **H1** with option 2 (Mumbai Art Deco) as the interim image, swapping in option 1 once a shoot happens. H2 is the alternative if you want to go furthest from "slides".

## 5. Other ways to lift the hero (independent of the image)

- **Shorter:** 75–85% of the viewport, not 100svh, so the next section shows and the page reads as one document instead of a cover slide.
- **Smaller headline:** 56–72px instead of 108px. Confidence comes from the setting, not the size.
- **Dateline row:** *Mumbai · 30+ years · Member, ERA*. Quiet proof in one line (the ERA wording waits on confirmation, PROJECT_BRIEF Q2).
- **One CTA,** set as a ledger row or a text link with an arrow, not two pills.
- **Clients:** replace the scrolling logo bar with a static, typeset line, "Trusted by UBS, BCG, J.P. Morgan…", or move clients below the hero. The bar implies endorsements the client hasn't cleared yet (PROJECT_BRIEF R2).
- **Motion:** at most a 400ms fade-in of the photo on load. No loops. Respect `prefers-reduced-motion`.
- **Caption or credit line** under the photo (H2). It's a small editorial touch that signals a real, owned image.

## 6. Decision (2026-11-06)

**On hold:** keep the current animated wave hero until IQ Group sends team portraits or office photos (requested). Then swap in a real photograph using the split layout (H1) with the toned treatment (§2b, §4).

Settled along the way:
- No stock landmark (licence, and it narrows an international firm), no jali (doesn't travel to Oslo), no colonnade (cliché).
- A pine or growth pairing was rejected because it illustrates the headline literally and collides with Korn Ferry's "Growth Starts Here".
- Headline stays *Hires that move your organisation forward.*

Resolved: the hero subheadline now reads "…across India, the Middle East, South Asia and Europe…" (PROJECT_BRIEF §5.1).
