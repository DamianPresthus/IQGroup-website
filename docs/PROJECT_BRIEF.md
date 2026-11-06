# IQ Group Website Redesign — Project Brief

> Status: **Draft v1 · 2026-11-06** · Owner: Damian · Client: IQ Group (Mumbai)
> Scope of this doc: *why* and *what*. No layouts or visual design here. Creative direction lives in [`DESIGN.md`](DESIGN.md).
> Every factual claim below is tagged **[Verified-live]** (on iqgroup.co.in today), **[Client-supplied]** (from the stakeholder brief, not yet publicly verifiable), or **[Conflict]** (the sources disagree).

---

## 1. Summary

IQ Group is a partner-led executive search, leadership advisory and HR firm in Mumbai. It has been running for 30+ years. The current site was built around 2013 on a Bootstrap 2 template. It undersells the firm: the copy still says "20 years", the home page shows placeholder testimonials, and the services page has unfilled blanks. Clients like UBS, BCG, J.P. Morgan, GSK and Oxfam India appear nowhere on the site.

**Objective:** ship a site that, within about 5 seconds, tells a Board member, Promoter, CEO or CHRO three things: IQ has decades of C-suite credibility, it does search at institutional grade, and a senior partner leads every mandate. The site should look clearly bespoke and editorial. It should not look like a SaaS template or generic "AI" output.

**Primary conversion:** a qualified mandate enquiry sent to a named partner (email, phone or form).

---

## 2. The Firm

| Item | Detail | Source |
| :--- | :--- | :--- |
| Legal/brand name | IQ Group (`iqgroup.co.in`) | Verified-live |
| Founded | **1992** per the founder bio on the live site ("In 1992, Ashmita took the plunge… and founded IQ"). **1994** per the stakeholder brief. | **Conflict** |
| Founder & MD | Ashmita Ray Sarkar. BA (Hons) English, MA Sociology. Previously at TNS Mode (research) and Price Waterhouse Coopers (management consulting). On the organiser team of the Kala Ghoda Arts Festival. | Verified-live |
| HQ | 806, Sunshine Towers, Senapati Bapat Marg, Dadar (West), Mumbai 400 013 | Verified-live |
| Phones / email | +91 22 6588 5932 · +91 98200 61329 · ashmita@iqgroup.co.in | Verified-live |
| Footprint | "Network of offices in Mumbai, Delhi, Bangalore, Kolkata, Dubai and Singapore" (live About page). **New 2026-11-06 (stakeholder):** launching in **Oslo, Norway**. | Verified-live + Client-supplied |
| Affiliation | Member, Executive Recruiters Association (ERA, India) | Verified-live (self-declared). **Not confirmed** in the public ERA directory at eraindia.org, which is JS-paginated and could not be fully searched. |
| Old tagline | "Managed Professional Recruitment Outsourcing" | Verified-live (footer) |

**Heritage claim:** both founding dates support "30+ years" (34 or 32 years in 2026). The site must not print a specific founding year or "since 19xx" until the client confirms which date is correct.

---

## 3. Problem Statement (evidence from the live site)

Audit of `iqgroup.co.in`, 2026-11-06:

1. **Undersold tenure.** Every page still says "20 years". The firm is now 32–34 years old.
2. **Placeholder content is live.** The home page testimonials are lorem-style copy about *Eli Lilly and Sheffield Hallam*, attributed to "John Doe" and "Jane Doe". The client-logo strip loads `placeholders/logo-client/logo-1..5.jpg`. The Services page contains the literal text *"We have conducted ____ searches in __ years.. OR SOME IMPRESSIVE % .."*.
3. **No proof of tier-1 clients.** The only client names shown are in IQ Social (NGOs). None of the BFSI, consulting or FMCG names in the stakeholder brief appear.
4. **Positioning drift.** The current copy describes job boards (Naukri, Facebook, Google AdWords), "No job is too small", and volume-hiring tasks. That reads as a placement agency, which contradicts retained, partner-led C-suite search.
5. **Text walls.** Practice pages contain long sector essays with stale statistics (e.g. M&E "CAGR of 18% through 2017", "Recent RBI announcement giving licenses to new banks").
6. **Technical debt.** Bootstrap 2 and jQuery plugins. Fonts are loaded over `http://`. Meta description is just "IQ Group" and keywords are "Placement Services". The contact page depends on Google Maps JS. Social links point to `#`. There's no structured data.
7. **Brand collision in search.** Searching "IQ Group" returns unrelated firms, e.g. IT/IQ Group (Vancouver tech staffing). The new site needs strong entity signals for discoverability (see §10).

---

## 4. Audience & Jobs-to-be-Done

| Segment | What they need to see before they reach out |
| :--- | :--- |
| Promoters / Founders / Board members | Discretion, seniority of who will run the search, and C-suite placements in companies like theirs |
| CEOs / MDs / CHROs (corporates & MNCs) | Sector depth, speed, a clear process and named-partner accountability |
| PE / VC Operating Partners | BFSI and PE pedigree (e.g. VP Investments mandates) and portfolio-hire speed |
| Foundation / CSR / NGO leaders | A dedicated social-impact practice (IQ Social), mission alignment and real NGO clients |
| Senior candidates (secondary) | Credibility and a discreet way to share a CV. This audience should not dilute the client-facing story. |

Geography: India first (Mumbai, Delhi NCR, Bangalore, Kolkata), then Dubai/Middle East and Singapore/South-East Asia. **Oslo, Norway is launching (2026-11-06).** The hero subheadline now names Europe, and Oslo is in the contact footprint. An EU/EEA audience brings GDPR alongside India's DPDP Act (R8).

---

## 5. Positioning

**One-line positioning (working):** *A partner-led boutique that has placed leaders for three decades, often where the global search firms could not.*

**Differentiators (from the client):**
1. **Partnership.** The boutique gives each client its full attention and learns the organisation at the cultural, strategic and tactical level. Senior partners lead every mandate; it is never handed off to juniors. (The live site already says "understand deeply your business objectives at the cultural, strategic and tactical levels.")
2. **People.** Deep functional experience and a proprietary network of CEOs, MDs and domain heads.
3. **Performance.** Complex, niche placements delivered quickly, including where larger firms failed.

**Mission (client-supplied, replaces the live version):** *"To provide deeply personalized service from a dedicated, high-caliber team — helping you make impactful hires from specialist roles to the C-suite."*

**Tone:** confident, understated, specific. Use short declarative headlines. Don't use superlatives without proof. Don't describe job-board sourcing.

### 5.1 Approved hero copy (2026-11-06)
- **Headline:** *Hires that move your organisation forward.* ("forward." is the accent word)
- **Subheadline:** *Partner-led executive search and HR advisory — from specialist roles to the C‑suite, across India, the Middle East, South Asia and Europe for 30+ years.* (Europe added 2026-11-06 for the Oslo launch.)
- **Rationale:** the headline opens with "Hires" so it says straight away what IQ does. "Organisation" covers corporates and IQ Social's NGOs and foundations. The subheadline leads with the partner-led differentiator.
- **Locked wording:** "for 30+ years" (never "since 19xx" until the founding year is confirmed). "From specialist roles to the C‑suite" (never "entry level"), which matches the mission.
- **Statement section (approved):** eyebrow *How we work* · *Every mandate is led by a partner — from the first brief to the day your hire walks in.* This replaces the Leathwaite-derived line (R1) and stops repeating "30+ years", which the hero already says.

---

## 6. Offering (to be reflected in site structure)

### 6.1 Services [Client-supplied]
1. Retained Executive & Board Search (C-suite to specialist)
2. HR Advisory & Systems (compensation structuring, appraisal frameworks)
3. Turnkey Project RPO (rapid team scaling)
4. Career Transition & Executive Outplacement

*Live-site equivalents:* "Recruiting & HR", "Leadership & CxO Placements", and "Onboarding, Training & Retention", the last delivered with training partner **Abozzo**. RPO and Outplacement are **not on the live site**. Confirm they are active offerings, and confirm whether the Abozzo partnership still exists.

### 6.2 Practices & client proof
| Practice | Clients | Source |
| :--- | :--- | :--- |
| Banking, PE & Financial Services | UBS, J.P. Morgan, Deutsche Bank, Baring PE, YES BANK, SBI Ventures, India Ratings (Fitch) | Client-supplied. The live site names BFSI as the historic core practice but lists no clients. |
| Management Consulting & Advisory | BCG, PwC, Dalberg, Sigma Research, Chain IQ | Client-supplied |
| FMCG, Healthcare, Life Sciences & Industrials | J&J, GSK, Bayer, HUL, Asian Paints, Rossari Biotech, MTAR Technologies, Welspun, Tata Housing | Client-supplied. The live team page mentions FMCG, ITES and Realty lead areas. |
| IQ Social (CSR, NGO, Foundations) | Oxfam India, NASSCOM Foundation, HelpAge India, TechnoServe, Kotak Education Foundation, Ambuja Cement Foundation, Concern India, Educo | Verified-live. The live site also lists CanKids KidsCan, ZAYA, Aangan Trust, Morris Foundation, Samhita and UnLtd India. |
| Legal | — | Verified-live (practice exists, no clients listed) |
| Media, Advertising & Hospitality | — | Verified-live (practice exists, no clients listed) |

### 6.3 Methodology [Client-supplied]
1. Understand your business → 2. Shortlist candidates → 3. Identify the match → 4. Hire & onboard → 5. Monitor & iterate.

The live site supports steps 2–4 (market mapping, database research, assessment, onboarding/retention) and step 5 ("We consistently assess client satisfaction after assignments").

### 6.4 Recent mandates [Client-supplied, anonymised]
CEO of a specialty chemicals manufacturer · CFO of a precision engineering company · VP Investments at an Indian PE firm · CMO of a private-sector bank · Head of CSR India at a European multinational bank.

### 6.5 Endorsements [Client-supplied]
- **Ajay Mahajan**, former MD, UBS. Public records also show him later as MD & CEO of CARE Ratings and in a senior role at IDFC, which matches the quote's mention of UBS, Yes Bank and IDFC. Confirm the title he wants used and get written consent.
- **Tilak Mukherji**, Chairman, Sigma Research & Consulting. ⚠ The live site lists Tilak as an **IQ Group Advisor** ("He also plays the role of mentor for IQ Group"). Showing his quote as an independent client testimonial without disclosing that relationship is a credibility and ethics risk. Either label him as an advisor, or swap in an arm's-length client quote.

### 6.6 People
- **Client-supplied (feature):** Ashmita Ray Sarkar (Founder & MD), Annu Paul (Director), Shirin Gulrajani Talwar (Director), Christine Gomes (Managing Associate, IQ Social).
- **Live site also lists:** 8 associates (Mallika Sen Varma, Bijal Joshi, Shharran Das, Tanushree Kundu, Neha Beswal, Wasim Shaikh, Dipannita Das, Meenu Dhru) and 3 advisors (Tilak Mukherji, Priya Agrawal, Naina Subberwal Batra). Decide whether they appear, are condensed, or are removed. Partner-led positioning argues for featuring the four leaders and possibly a separate advisors row.
- Live profile photos are low-resolution placeholders. A **new portrait shoot** is a dependency.

---

## 7. Reference Research

| Reference | Observed facts | Take | Avoid |
| :--- | :--- | :--- | :--- |
| **Leathwaite** (leathwaite.com) | WordPress theme. Uses `Literata` (36 declarations) and `Poppins` (29) from its `app.css`. Palette is aubergine-grey (`#1b1321`, `#312538`, lilac `#a78bbc`), which is very close to IQ's plum family. The `.highlight` bar is a 2px (`.125rem`) **raster image** (`highlight.png`), not a CSS gradient. The hero is an MP4 loop (`Leathwaites_Loop_StaticGrad_v5.mp4`). Sections: hero → one-sentence statement → services → consultant finder → insights. | Editorial rhythm, the statement pause, the left-rule heading device, partner-finder IA | **Copy.** See §9 R1. With the same fonts and an adjacent purple palette, IQ risks reading as a Leathwaite clone. IQ needs at least one ownable signature element. |
| **Adaption Labs** (adaptionlabs.ai) | Next.js. Type is STK Bureau Sans plus PP Mondwest (licensed, not Google Fonts). Uses SVG `feDisplacementMap` / chromatic filters for material effects. Content is presented as nested product cards. | Segmented double-ring pill controls; outer shell card with nested white sub-cards for scannable practice data | Its AI-lab tone, animated metric counters and flag clouds. These are wrong for a discreet search firm. |
| **Stochastic grain gradients** | — | Tactile, printed-feeling surfaces in place of stock photography | Heavy noise that hurts text contrast or file weight |

**Peer landscape (Indian search boutiques, 2026):** sites like ASTC, Executive Principles ("thirty years") and Hirearcchy use the same claims: "founder-led", "boutique", "30 years". These claims don't differentiate IQ on their own. What does: **named tier-1 clients, IQ Social as a dedicated wing, the founder's research and consulting background, and specific anonymised mandates.**

---

## 8. Brand & Accessibility Constraints

The 60–30–5–5 palette is locked per `DESIGN.md`. Contrast checks (WCAG 2.x, computed):

| Pair | Ratio | Verdict |
| :--- | ---: | :--- |
| White on Obsidian `#12051A` | 19.8 : 1 | AAA |
| White on Royal Plum `#8F1F78` | 8.0 : 1 | AAA |
| Royal Plum on Alabaster `#FAF8FA` | 7.5 : 1 | AAA |
| Mulberry `#6E4165` on Alabaster / Soft Lilac | 7.6 / 6.7 : 1 | AAA / AA |
| Dusty Lilac `#D1A1C7` on Obsidian | 9.1 : 1 | AAA |
| Mint `#1AD1BE` on Obsidian | 10.3 : 1 | AAA |
| Mint-light `#0F766E` on Alabaster / Soft Lilac | 5.2 / 4.6 : 1 | AA / AA (borderline) |
| **Royal Plum on Obsidian** | **2.5 : 1** | **Fail.** Decorative use only on dark, never as text. |
| Mint on Royal Plum | 4.1 : 1 | Fail for body text. Already banned by the palette rules. |

Corrections to `DESIGN.md`:
- The aqua hue is Royal Plum **−137.5°** (312.3° → 174.8°). Rotating +137.5° gives about 90° (yellow-green).
- White on Obsidian is 19.8:1, not 18:1.

**Accent decision (2026-11-06):** keep Aqua-Mint (−137.5°). Two alternatives were compared in `prototypes/golden-angle-comparison.html` and rejected: Chartreuse `#75D019` (+137.5°), which clashes with the purple and feels like gaming or crypto, and Champagne Gold `#E5A93B` (44°), which feels traditional, like a law firm. To stop the page reading as monochrome plum, v2 now places mint in more spots, still within the 5% budget: a 6px dot on the statement eyebrow; category labels and hover borders on the small mandate cards; a faint rim glow in the mandate feature card (top-right), the partner headers (bottom-right) and the contact background (bottom-right); hover colour on the contact links; and `:focus-visible` outlines (`#1AD1BE` on dark sections, `#0F766E` on light ones). The glows always sit on the opposite side from the saturated plum glow.

Accessibility baseline: WCAG 2.2 AA. Support `prefers-reduced-motion` for all silk and grain animation. Use real `<button>`/tab semantics with arrow-key support for the segmented controls. Logo marquees must pause on hover or focus and be hidden from screen readers in favour of a readable client list.

---

## 9. Risks & Mitigations

| # | Risk | Mitigation |
| :--- | :--- | :--- |
| R1 | **Copy plagiarism.** The `DESIGN.md` copy bank reused Leathwaite's live copy almost word for word: hero "Discovering exceptional / Shaping the future of enterprise leadership", and statement "We know the corporate officer and corporate function landscape better than anyone…". | **Resolved 2026-11-06:** the hero and statement are now original (§5.1). Keep Leathwaite as a structural reference only. |
| R2 | **Client-logo and name permissions.** Showing UBS, BCG, J.P. Morgan etc. implies an endorsement, and many of these firms restrict trademark use. | Get written confirmation per logo, or fall back to text-only sector lists or "clients include" wording that the client has approved. |
| R3 | Undisclosed advisor testimonial (Tilak Mukherji) | See §6.5 |
| R4 | Unconfirmed founding year and ERA status | Use "30+ years" and confirm before printing a year or an ERA badge |
| R5 | Visual derivativeness (same fonts and palette family as Leathwaite) | Define an IQ-owned signature in design. Consider a different serif cut or weight if the client wants distance. |
| R6 | Heavy shaders/video slowing load on Indian mobile networks | Performance budget (§11). Static fallback for the hero. |
| R7 | Asset gaps (logos, portraits, IQ wordmark in vector) | Request them in week 1. The current logo is a raster `placeholders/logo.png`. |
| R8 | DPDP Act 2023 (India) compliance for enquiry and CV forms | Consent copy, a privacy notice, and minimal data collection |

---

## 10. Scope

### In scope
- Responsive marketing site covering: Home, Firm/About, Services, Practices (including IQ Social), Approach, People (with partner profiles), Contact/Enquiry. Home may need to stand alone first as a single-page launch.
- Copywriting rewrite (original, short, editorial)
- Accessibility (WCAG 2.2 AA), SEO foundation, analytics
- SEO/entity signals: proper `<title>`/meta, `Organization` + `ProfessionalService` + `Person` JSON-LD, `LocalBusiness` address for Dadar, an OG image, and consistent "IQ Group — Executive Search, Mumbai" naming to separate the brand from IT/IQ and other "IQ Group" entities
- Redirect map from legacy URLs (`aboutus.html`, `theteam.html`, `services.html`, `practiceareas.html`, `contactus.html`, `iqbfsi.html`, `iqsocial.html`, `iqlegal.html`, `iqhospitality.html`, individual `<name>.html` profiles)

### Out of scope (unless added)
- Candidate portal / ATS integration, job board
- Insights/blog CMS. Recommended as phase 2: thought leadership is Leathwaite's third pillar, and IQ currently has none.
- Multilingual content

---

## 11. Success Criteria

| Area | Target |
| :--- | :--- |
| Trust | A first-time visitor can name IQ's tenure, a tier-1 client and the founder within one scroll of the hero (moderated test, ≥ 4 of 5 participants) |
| Conversion | Enquiry path ≤ 2 interactions from any page. Every enquiry routes to a named partner. |
| Content | Zero placeholder, stale (pre-2020) or unverified claims live |
| Performance | LCP < 2.5 s and CLS < 0.1 on a mid-range Android over 4G. Hero shader degrades to a static image under `prefers-reduced-motion` or low power. |
| Accessibility | WCAG 2.2 AA (axe: zero serious/critical issues) |
| SEO | Ranks #1 for "IQ Group executive search" and "IQ Group Mumbai". Rich results validate. |

---

## 12. Open Questions for IQ Group

1. Founding year: **1992** (live bio) or **1994** (brief)?
2. Is ERA membership current? May the ERA name or mark be shown?
3. Written permission for each client name and logo (§6.2), particularly the global banks and consulting firms.
4. Testimonials: confirm Ajay Mahajan's preferred title and consent. How should Tilak Mukherji's advisor relationship be handled?
5. Are RPO and Outplacement active services? Is the Abozzo partnership still current?
6. ~~Team: feature 4 leaders only, or include associates and advisors?~~ **Answered 2026-11-06:** current team = 4 leaders (Ashmita, Annu, Shirin, Christine), 5 associates (Mallika Sen Varma, Bijal Joshi, Shharran Das, Tanushree Kundu, Neha Beswal) and 1 advisor (Tilak Mukherji). Wasim Shaikh, Dipannita Das, Meenu Dhru, Priya Agrawal and Naina Subberwal Batra, listed on the live site, are not in the current roster. Neha's lead areas (BFSI · ITES) come from the live site; confirm.
7. Do Delhi, Bangalore, Kolkata, Dubai and Singapore have physical offices, partner associates, or mandate coverage only? This affects the `LocalBusiness` schema and the wording.
8. Any quantifiable proof that can be published (number of searches, average time-to-shortlist, repeat-client rate)? This would replace the "____ searches" placeholder honestly.
9. Brand assets: vector logo, any brand guidelines, availability for a portrait shoot.
10. Hosting, domain/DNS ownership and the preferred stack. The current site is static HTML.
11. Which inbox and person should handle enquiries, and what response SLA should be stated?

---

## 13. Repo State (as of this brief)

| File | What it is |
| :--- | :--- |
| `DESIGN.md` | Creative direction, palette, type and copy bank (see R1 and the §8 corrections) |
| `index.html` | Byte-identical copy of `prototype-v1-constellation.html` (Literata/Poppins, Leathwaite-style) |
| `prototype-v2-sirva-duotone.html` | Exploration: Instrument Serif, Plus Jakarta Sans, JetBrains Mono, Tailwind |
| `prototype-v3-true-bento.html` | Exploration: bento grid with a dither shader, same type stack as v2 |

The prototypes are explorations made before this brief. None has been approved as a direction.
