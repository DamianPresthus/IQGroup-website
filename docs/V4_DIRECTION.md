# v4 direction — "Quiet institutional confidence"

**Status:** round 7, 2026-11-06, for review. Live preview: `…/IQGroup-website/v4/` (marked `noindex`). v2 stays the live site. v3 (all-serif, paper) is parked: the user did not like it.

**Source:** the user's brief, which draws on modern wealth management, elite venture capital and high-trust fintech. Reference screenshots are in `reference/v4-research/`. Thrive Capital and Carta could not be captured (blank page / bot check).

**Build:** plain HTML + CSS + a small JS file in `source/v4/` (`index.html`, `tokens.css`, `styles.css`, `app.js`). It is seeded with the v2 copy, so v2 itself is untouched.

## Round 25: homepage information architecture (2026-11-07)

**Why: referred buyers are checking whether to bother.** Most buyers of professional services come by referral (Hinge: 71%). About 81% then check the firm's website, and about 52% have ruled out a referred firm before ever speaking to it. So the homepage answers the referred buyer's questions in order:
1. What and where?
2. Credible?
3. Do they know my sector?
4. Have they filled roles like mine?
5. Who would I work with?
6. What do others say?
7. What happens next?
8. How do I start?

**New Home order.**

| # | Section | Background |
|---|---|---|
| 1 | Hero | Light |
| 2 | Client names | Light |
| 3 | Sectors | Dark |
| 4 | Recent hires | Light |
| 5 | **Partners** (new) | Stone |
| 6 | Testimonial | Light |
| 7 | **How a search runs** | Light |
| 8 | Contact | Light |

**Partners (new on Home).**
- **Heading:** "A partner on every search." It does not repeat About's h1.
- **Content:** one sentence (four partners, five associates, an advisor), then four round portraits with name and title, then "Meet the team" → `about.html#people`.
- **No sectors:** the Sectors band already names each lead, so the portraits carry titles only.
- **Portraits:** capped at 80px (64px on phones) because the sources are 160px, which keeps them sharp on 2x screens.
- **Ring:** a stone gap plus a hairline, like the sector-column faces.
- **Hover:** greyscale to colour.

**How a search runs** is now on Home too, using the same component as About. It is light on Home because the stone band is Partners.

**What sets us apart** moved from Home to About, after the people section. It is light there because Method is About's stone band.

**Rejected.**
- **Services on Home:** the hero subline already says "executive search and HR advisory", and the three-item list is too thin for a section. It stays on About.

**Dark band stays on Sectors.** Alternatives considered:

| Candidate | Why not |
|---|---|
| Testimonial | One quote can't fill a full-width dark band |
| Partners | Low-res portraits look gloomy on dark |
| Contact | The dark organisations card would disappear |

**Housekeeping:** removed a duplicated "Sub-pages" CSS block (an identical copy at the end of `styles.css`).

**Measured length at 1440px:**

| Page | Screens |
|---|---|
| Home | 6.3 |
| About | 5.3 |
| Sectors | 6.1 |

## Round 24: taller columns, two zones, finishing details (2026-11-07)

**Fix: names never collide with icons.**
- **Taller columns:** 24rem → 30rem.
- **Two zones:** a text zone from the top (name → reveal → lead) and an icon zone in the bottom third, where the 3D watermark stands on the column floor, cropped by it.
- **The lead moved up:** it follows the content instead of sitting at the bottom.
- **Measured clearance** between the lead line and the icon:

| Width | Collapsed | Hovered |
|---|---|---|
| 1440px | ≥160px | ≥50px, worst case Banking (the longest name and tags) |
| 1280px | – | ≥82px |

**Finishing details.**
- **Hover rule:** a 2px plum rule lights along the top edge of the hovered parallelogram (an animated `background-size` on `::before`).
- **Dividers:** the "/" hairlines fade out at both ends instead of stopping hard.
- **Smooth reveal:** areas and "Read more" open with a `grid-template-rows: 0fr → 1fr` transition, so the lead glides down instead of jumping.
- **Staggered fade-ins:** tags 140ms, "Read more" 220ms, lead name 180ms.
- **Underline:** "Read more" draws its underline left to right; the arrow nudges.
- **Portraits:** lead portraits get a hairline ring and warm from greyscale to colour on hover, as in the roster.
- **Slashes:** area tags are separated by muted slashes ("Investment banking / Wealth management"), echoing the slant. This applies at every width.
- **Ampersands:** a no-break space keeps "&" with the next word in sector names, so "&" is never stranded on its own line in narrow columns.
- **Long lead names** wrap (rather than clip) in narrow expanded columns at 1280px.
- **Motion:** column growth uses a softer ease-out (0.6s); the icon lifts and tilts 3°.

**Housekeeping:** removed a stale duplicate of the round-23 desktop block that was overriding the height.

## Round 23: slanted expanding columns, 3D icons (2026-11-07)

**Idea (the user's), refined.** Six full-width columns separated by "/" hairlines. They apply at ≥1025px, on both the home Sectors band and the Sectors page overview.
- **Shape:** each column is a parallelogram (`clip-path`, slant 8°, `--d = h/2 · tan 8°`). The background is a `::before` extended by `--d` so neighbours tile exactly. The hairlines are `skewX(-8deg)` 1px pseudo-elements on the right edge.
- **At rest:** the sector name, the cropped 3D watermark icon and the lead's face are always visible, so the band scans without hover.
- **On hover or keyboard focus** (`:focus-visible`):
  - the column grows (`flex-grow: 2.4`, `--slow` ease) and its surface lifts towards plum;
  - the areas, "Read more →" and the lead's name fade in after 120ms;
  - the icon brightens and tilts slightly.
- **Click:** opens `sectors.html#id`.
- **Kept from the original idea:** columns expand, use the full width, and link through.
- **Changed:** the slant is in the dividers, not the text, so the text stays upright and unclipped. Names stay visible at rest.
- **≤1024px:** the stacked tile grid remains (no hover on touch).

**3D icons, built from the existing Phosphor glyphs (no new artwork).**
- **Face:** each glyph is a CSS mask over a lit gradient (`#F4DDF0` → `--on-dark-muted` → `--accent`, light from top-left).
- **Depth:** the wrapper carries five 1px `drop-shadow`s in deep plum (`#4A1640`) to extrude a solid edge, plus one soft cast shadow.
- **Where:** home and Sectors-page tiles (watermark at 55% opacity, 90% on hover) and the Sectors-page detail icons (full strength).
- **Considered and not used:** Microsoft's Fluent 3D emoji (MIT). They are full-colour and glossy, and would clash with the plum palette and the institutional tone.

**Verified.**
- **Rendering:** 1440 rest and hover, 1280 hover, plus the 1024 and 390 fallbacks.
- **Keyboard:** Tab focus expands a column and reveals its content.
- **Layout:** no horizontal overflow, and every lead line stays inside its column on hover (≥20px clearance).

## Round 22: split into Home, Sectors and About (2026-11-07)

**Pages** (plain HTML; nav, footer, contact section and enquiry dialog are repeated in each page):

| Page | Contents |
|---|---|
| `index.html` (Home) | Hero + map, client names, Sectors (dark band; tiles now link to `sectors.html#…`, with hover and arrow), Recent hires, What sets us apart (stone), one client quote (Ajay Mahajan), contact, footer |
| `sectors.html` | Page hero; the same dark tile grid as a jump list; one detail row per sector (icon, name, lead, copy, areas, recent hires, clients); contact |
| `about.html` | Page hero "Every mandate is led by a partner."; Ashmita spotlight + roster; How a search runs (the page's stone band); Services; both quotes; contact |

**Navigation.**
- **Nav:** Sectors · About · Contact + "Begin a search", with `aria-current="page"` on the current page. The mobile menu adds Home.
- **Footer:** Sectors · About · How a search runs.
- **Scrollspy removed:** the nav now points at pages, so there is nothing left for it to track.

**Colour rule** (round 21 research): at most one dark and one stone band per page, plus the dark footer, and never two coloured sections next to each other.

**Length:**

| Page | 1440px | 390px |
|---|---|---|
| Home | 5.6 screens (was 7.8) | – |
| Sectors | 6.1 screens | 8.6 screens |
| About | 4.9 screens | 6.0 screens |

**Where the sector-page copy comes from.** No new claims; everything is drawn from IQ's live site and the 2026 deck.
- **Banking:** the old site's BFSI "benefits" (associates worked in the sector, senior-management network, placements who reached the C‑suite, board/CEO assessment) and its sample-position areas.
- **Legal:** the old site's in-house-shift paragraph and the "in-house counsel to whole practice groups" range.
- **Media, Advertising & Hospitality:** the old site's agency focus (senior management, account planning and management, digital strategy, FMCG/consumer clients) and its hospitality line.
- **IQ Social:** the old site's points (team worked in nonprofits, research each organisation, roles evolve, long-term partnerships) and its full 14-client list.
- **Consulting:** only the approved line, plus Ashmita's TNS / Price Waterhouse Coopers background from her bio.
- **FMCG, Healthcare & Industrials:** only the approved line.
- **Restored here** after being dropped from the overview in round 18: "Our historic core practice" and the IQ Social clients.

**Recent hires by sector** (deck slide 6):

| Sector | Hires |
|---|---|
| Banking | CMO (private bank); VP, Investments (PE firm) |
| FMCG, Healthcare & Industrials | CEO (specialty chemicals); CFO (precision engineering) |
| IQ Social | Head of CSR, India (European bank) |

**[INFERENCE] to confirm with Ashmita:** the Head of CSR placement is filed under IQ Social because it is a CSR role. It may have been handled by the banking team instead.

## Round 21: "Practices" renamed "Sectors" (2026-11-07)

**Why.** Clients scan for their industry, and "Practices" is insider law and consulting language. Peers say "Industries" or "Industry Expertise"; Odgers uses "sectors". "Sectors" also matches IQ's British/Indian usage ("BFSI sector", "social sector").

**Renamed:**
- **Labels:** the section heading, the nav link, the mobile menu link and the footer link.
- **Anchor and title:** `#practices` → `#sectors`, `practices-title` → `sectors-title`.
- **Copy:**
  - Ashmita's bio: "She leads every sector…".
  - Her roster role: "All sectors, C‑suite".
  - The roster hint: "Select a name for their role and sectors."
- **Code comments.**

**Not renamed:** the Legal tag "Practice groups", which is the legal-industry term.

## Round 20: icons baked in, dark plum band (2026-11-07)

**Feedback.** The icons sat in the tiles as separate badges, as if stuck on, rather than part of the design.

**Explored.** Five treatments, rendered at 1440px:

| Variant | Result |
|---|---|
| Large accent icon top-right | Collided with titles |
| Light watermark | Overlapped the tag text, and the plum tint was weak on alabaster |
| Inline glyph before the name | Tidy, but small and generic |
| Icon "plate" above each tile | Clear, but app-store-like and +280px tall |
| **Dark band + watermark** | **Chosen** |

**Chosen: dark band + watermark.**
- **Band:** Practices becomes a `--surface-dark` band right after the client names, so the page alternates light hero / dark practices / light services.
- **Tiles:** dark, with `--on-dark-line` hairlines.
- **Icon:** each sector icon is a 8.5rem duotone watermark (6.5rem on phones) in `--on-dark-muted` at 24%, cropped by the tile's bottom-right corner and sitting behind the text (`z-index: -1`, isolation). It works as texture and as a scan cue at once.
- **Text:** the right padding is widened so tags never run over the icon.
- **Colours:** names `--on-dark`, tags `--on-dark-muted`, lead line `--on-dark`.
- **Phones:** the beside-icon grid from round 19 is removed.

## Round 19: sector icons, checkerboard removed (2026-11-07)

**Library: [Phosphor Icons](https://phosphoricons.com), duotone weight, v2.1.1, MIT.**
- **Licence and files:** the SVGs are copied into `source/assets/icons/` with `phosphor-LICENSE.txt`, and inlined in the page so they inherit `currentColor`.
- **Why Phosphor:**
  - A consistent 1.5px-equivalent line that sits well beside Newsreader.
  - A duotone weight whose 20% fill picks up the plum tint.
  - 1,500+ icons, so every sector has a literal match.
- **Alternatives considered:** Lucide (no duotone), Tabler (heavier geometry), Material Symbols (a Google look).
- **Ruled out:** illustration packs such as unDraw and Open Peeps, which read as generic SaaS.

**Icon per sector:**

| Sector | Icon |
|---|---|
| Banking | bank |
| Consulting | presentation-chart |
| FMCG / Healthcare / Industrials | package |
| Legal | scales |
| Media / Advertising / Hospitality | megaphone |
| IQ Social | hand-heart |

**Treatment.**
- **Badge:** a 44px rounded-square badge in `--surface-dark` (aubergine), with the icon in `--on-dark-muted` (plum pink). This is the scan cue, and it brings dark plum into the section six times with equal weight.
- **Surfaces:** all tiles are alabaster; the checkerboard is gone.
- **Phones:** the icon sits beside the content (two-column grid), which keeps each tile short.

## Round 18: six equal tiles (2026-11-07)

Both research-backed tweaks are applied: Banking is the same size as the others, and IQ Social is an ordinary tile (Spencer Stuart precedent).
- **Grid:** 3 × 2 on desktop, 2 × 3 at ≤1024px, stacked at ≤560px.
- **Tiles:** every tile has the same name (`--fs-h4`), area tags as one comma-separated line, and the lead partner.
- **Colour:** surfaces alternate alabaster / stone in a checkerboard, re-paired at 2 columns so no two neighbours match. Colour is for rhythm only and encodes nothing.
- **Dropped from the overview:** "Our historic core practice." and the IQ Social client names. Both belong on the Practices page (step 2).
- **Height:** the section is 1010 → 763px at 1440 and 1263 → 1142px at 390 (about 25% and 10% shorter).

## Round 17 research: how peers present sectors (2026-11-07)

Screenshots are in `reference/v4-research/sectors/`, taken at 1440px on 2026-11-07. Bain and Odgers blocked headless capture, and ABC Consultants has no sector overview page.

| Site | Pattern |
|---|---|
| Spencer Stuart | One card per sector: heading + sub-sectors as inline links. Equal weight. "Education & Social Impact" is a peer card. |
| Egon Zehnder | Quick-link row at the top, then per sector a short paragraph, an illustration and its sub-sectors in two columns. Equal weight. |
| Heidrick & Struggles | Plain two-column link list. |
| Stanton Chase | Single-column link list beside an intro paragraph. |
| McKinsey | Three-column grid of name + one-line description. |
| Russell Reynolds | Photo cards with a paragraph each. |
| Korn Ferry | Three image cards labelled "Featured industries", then an "All industries" list. |
| BCG | Photo tile grid. |

**What the peers have in common:**
- **No one sizes a sector up without saying why.** Korn Ferry is the only one with featured sectors, and it labels them explicitly.
- **The common pattern is sector + sub-sectors.** Round 17's area tags match it.
- **Social impact is treated as an ordinary peer sector** (Spencer Stuart).
- **Every overview links to sector pages.**
- **Photo-led cards** (BCG, RRA, Korn Ferry) depend on stock imagery, which v4 excludes.
- **No one uses a mind map or diagram.**
- **Partner names:** no peer puts them on the overview. IQ's "Led by" line is a boutique differentiator worth keeping.

## Round 17: practices, equal weight (2026-11-07)

**Feedback.** Banking and IQ Social had larger headings, and IQ Social had a dark fill. Both read as "more important", which made the other four harder to read. The hover effect implied the tiles were links when they weren't.

**Change (option A + C from the brainstorm):**
- **Equal tiles:** every tile has the same `--fs-h3` heading, the same `--bg` surface and the same parts: name, area tags, lead partner.
- **Banking** leads by size only: a tall tile spanning two rows on the left, plus "Our historic core practice."
- **Area tags** replace the one-line descriptions. They stack one per line on desktop and tablet; on phones they run as one comma-separated line to keep the stack short. The tags come from the existing approved copy (no new claims).
- **IQ Social** becomes a full-width stone band beneath the grid: name + "Our dedicated wing for CSR teams, NGOs and foundations." | clients | lead. The different surface now has a stated reason.
- **No hover:** tile hover is removed until the tiles link to sector pages (step 3).
- **Height:** the desktop section is ~190px taller (stacked tags), and the phone section is about the same. Page length is addressed by the planned Home / Practices / About split (step 2).

## Round 16: preview switch removed (2026-11-06)

Final choices: **map hero** and **IQ plum palette**. Removed:
- the preview switch (HTML, CSS, JS);
- the head script that read `?palette` / `?hero`;
- the team-portrait hero variant (`.hero-visual`, `.team-cluster`);
- the `[data-palette="navy"]` token block.

The query parameters no longer do anything.

## Round 15: Oslo visible on the mobile map (2026-11-06)

At ≤860px the map was 170% wide and shifted -75%, which cropped Oslo off the left edge.
- **Fix:** it is now sized to the labelled span. Oslo's label (viewBox x≈355) to Singapore's label (x≈1000) is 645 of 1200 units, so the map is 177% wide with a -50% left offset, which fits the span to any phone width.
- **Margins:** the top margin is now -0.5rem, so Oslo's label clears the CTAs; the bottom margin is -4rem to trim empty ocean.
- **Checked** at 360, 390 and 430px: all seven cities and labels are in view.

## Round 14: swipe down to close the sheet (2026-11-06)

On phones (≤560px) the enquiry bottom sheet shows a grab handle and follows the finger downwards.
- **Where a drag can start:** the header at any time, or the form body when it is scrolled to the top. Upward drags and drags inside the message textarea scroll or select as normal.
- **Release:** a pull of more than 25% of the sheet height (max 140px), or a flick faster than 0.5px/ms over 40px, closes the sheet. It animates off-screen, then the native `dialog.close()` returns focus to the trigger. Anything shorter snaps back.
- **Reduced motion:** falls back to a 320ms timeout because no transition runs.
- **Desktop:** the drawer is unchanged.
- **Verified with CDP touch emulation at 390px:**
  - a short slow drag snaps back;
  - a long drag and a fast flick both close;
  - a drag on the body while it is scrolled does nothing;
  - focus returns to the trigger;
  - the sheet reopens cleanly with no leftover inline styles.

## Round 13: mobile optimisation (2026-11-06)

Measured at 360 and 390px with a CDP script: no horizontal overflow, no text under 13px, and every tap target now 44px or larger.
- **Nav:** "Begin a search" stays in the pill on phones, next to Menu (before, it was hidden behind Menu). Menu and the wordmark are 44px tall. Below 380px the wordmark shows only "IQ".
- **Tap targets:** text links get a 44px hit area through an invisible pseudo-element, with no visual change. This covers the hero "Share your profile" link, the phone numbers, the office email, footer links and sheet links.
- **Roster:** touch has no hover, so on phones each name lists vertically with its role and practice underneath. The hover caption is hidden.
- **Footer:** Firm and Contact sit side by side; the brand and address span both columns.
- **Rhythm:** section padding is 4rem at ≤560px (was 5rem), and the hero top padding is 7rem.
- **Hero subline:** at ≤560px the forced break after "HR advisory" is dropped. At 360–390px that phrase can't fit on one line, so the break left a one-word orphan line. A trailing space keeps the words apart.

## Round 12: consistency pass (2026-11-06)

**Type scale.** Every serif heading now uses a token, with no one-off clamps left:

| Token | Size | Used for |
|---|---|---|
| `--fs-hero` | 44→78px | H1 |
| `--fs-h2` | 32→50px | Section titles, contact card headlines, roster names, mobile menu links |
| `--fs-h3-lg` | 26→34px | Wide practice tiles (BFSI, IQ Social), spotlight name, sheet title |
| `--fs-h3` | 22→28px | Services, Recent hires, What sets us apart |
| `--fs-h4` | 20→24px | Practice tiles, method steps (now serif, like every other list heading), office name |
| `--fs-lead` | 17→20px | Hero subline, section side line, card copy, bio |

- **Removed:** the unused `--fs-stat`.
- **Line height and tracking follow size:** large serif uses 1.08 / -0.02em, small serif 1.15 / -0.015em, lead text 1.55.

**Weights.**
- **Serif:** 400 everywhere (the wordmark keeps 500).
- **Sans:** 600 for labels and buttons, 500 for nav links and "optional" hints, 400 for body. The done-mark dropped from 700 to 600.

**Labels.** One shared rule (`--fs-small`, 600, `--ink-muted`) covers four places: the trust label, roster groups, contact-card labels and footer headings. Before, these mixed 13 and 14px. Role lines (spotlight title, quote captions, roster caption) are 400 muted.

**Colour.**
- **Accent:** links, active states, method nodes and the map only. The candidate card label and the spotlight title no longer use it.
- **Muted text on dark:** always `--on-dark-muted` (the organisations card no longer uses a one-off mix).
- **Errors:** form errors use the new `--error` token.
- **Focus:** form fields use the global `--focus` ring instead of an accent glow.

**Elements.**
- **Radii:** cards and the bottom sheet use `--r-card` (the contact cards were 20px, the sheet 20px). Inputs use the new `--r-field`.
- **Card padding:** contact cards match quotes and the spotlight.
- **Wide tiles:** BFSI and IQ Social share one rule.
- **Removed:** the `!important` on lead-by.
- **Hover timing:** tile hover uses `--fast` like every other hover.
- **Buttons:**
  - Every primary button has the animated arrow; the menu-sheet CTA was a plain "→".
  - The submit button reads "Share your profile", matching the CTA.
  - `.btn-block` uses the standard button size.
- **Breakpoints:** Services, What sets us apart and Recent hires all collapse at 860px (two were at 760px). The collapse rules sit after the component rules; before, pillars and hires failed to stack on phones because of cascade order.
- **Code cleanup:**
  - Inline styles moved to CSS: section padding, footer brand, sheet close button.
  - Dead mobile selectors (`.services`, `.svc ul`) removed.

## Round 11: candidate path renamed (2026-11-06)

"For executives" contradicted the positioning: IQ fills roles "from specialist roles to the C‑suite", and the deck says "entry level to C‑suite". The user chose **"Share your profile"**.
- **Hero secondary CTA and footer link:** "Share your profile".
- **Contact card:** "For candidates" / "Join our network." / "Share your profile in confidence, from specialist roles to the C‑suite. We will be in touch when a mandate fits."
- **Sheet:** the tab reads "Open to roles" and the title "Join our network".
- **Internals renamed:** `data-enquiry`/`data-mode` `exec` → `profile`, `#executives` → `#candidates`, `.path.exec` → `.path.candidate`. The email subject stays "Confidential profile: {name}, {role}".

## Round 10: one column system, separated (2026-11-06)

**Problem.** "What sets us apart" and "Services" sat back to back. Both were three-column rows, but they used different heading sizes and rules, so the pair read as redundant and inconsistent at once.

**Fix.**
- **Order:** Practices → Services → Recent hires → How a search runs → What sets us apart (stone band) → Testimonials → People → Contact. This reads as *what / evidence / how / why / proof / who*.
- **One component:** `.pillars` now shares `.svc-row`'s structure (top rule, vertical dividers, `--fs-h3` headings), so both rows read as the same system. Pillars keep sentence-length muted text; Services keep short item lists.

## Round 9: recent hires and pillars (2026-11-06)

- **Recent hires** (`#hires`), placed after Practices. The five anonymised placements from the June 2026 deck, slide 6, laid out as an Index-style ledger: the role set in serif, the organisation description in muted text, hairline rules between rows. Update this list yearly from IQ's own record.
- **What sets us apart:** a stone band placed before Services, with the deck's slide 3 pillars:
  - **Partnership:** full boutique attention; cultural, strategic and tactical understanding.
  - **People:** a network of CEOs and MDs built over decades.
  - **Performance:** 30+ year record, exceptionally fast turnaround.

  The band background keeps it visually distinct from the plain three-column Services row.

## Round 8: trims (2026-11-06)

- **Offices:** the Oslo office card and the Delhi/Bangalore/Kolkata/Dubai/Singapore office line are removed. The contact section lists Mumbai only, plus the ERA line. The hero map still shows those cities as search locations, not as offices.
- **No em dashes anywhere on the page:**
  - **Hero subline:** a line break after "HR advisory" replaces the dash.
  - **Title:** now uses "·".
  - **Roster caption and search email subject:** now use a comma.
- **Removed:** the People subline "From the first brief to the day your hire walks in." and the Methodology intro line.

## Round 7: content carried over from the live site (2026-11-06)

User decision: everything on the current iqgroup.co.in is publishable. Stale figures ("20 years", the 2013–2017 market statistics) and the volume-agency material (job boards, the 11-task list, "no job too small") stay out.

- **Practice lines now use IQ's own copy.**
  - **BFSI:** "Investment banking, wealth management, private equity, retail banking and risk."
  - **Legal:** "In-house counsel, law-firm partners and whole practice groups."
  - **Media:** "Agency leadership, account planning and digital strategy; hotels and hospitality."
  - **IQ Social:** "…for clients including Oxfam India, NASSCOM Foundation, HelpAge India and TechnoServe."
- **Methodology:**
  - **Intro:** "Who you need, where they sit and how to win them. We keep you informed at every step." This draws on the old opening questions and "communication and transparency".
  - **Step 2:** "Market mapping: we know where everyone sits."
  - **Step 5:** "…and a client review after every assignment."
- **Services:** "Training with Abozzo" added to Onboarding & retention.
- **Offices and ERA:** a line under the offices reads "Offices in Mumbai, Delhi, Bangalore, Kolkata, Dubai and Singapore, with Oslo opening. Member of the Executive Recruiters Association (ERA)." The footer legal line also names ERA.
- **Footer tagline:** "In quest of talent: partner-led executive search and HR advisory for 30+ years."
- **Boilerplate:** the meta description is rewritten, and `ProfessionalService` JSON-LD is added (address, areaServed, founder, memberOf ERA).

## Round 6: enquiry sheets (2026-11-06)

**Problem.** "Begin a search" and "For executives" both scrolled to the contact section, where two more buttons opened a bare `mailto:`. That meant three steps before anything was written, and the visitor's intent was lost along the way.

**UX plan: the minimum path is click → 3 fields → Send.**
- **Entry:** every CTA opens one sheet, already in the right mode. This covers the nav button, the hero CTAs, the contact cards and the footer links (`data-enquiry="search"` / `"exec"`).
- **Fields:** three required fields per mode, with `autocomplete` set so browsers can fill them in one tap. Below them is a visible **Message (optional)** box. The remaining optional details sit behind one collapsed "Add … optional" row.
  - **Hiring:** name, work email, role to fill. Visible optional: message. Collapsed: organisation, phone.
  - **Executive:** name, email, current role. Visible optional: message (placeholder "Roles or sectors you'd consider"). Collapsed: LinkedIn.
- **Recovery:** a "Hiring / An executive" switch at the top fixes a wrong click without closing the sheet.
- **Validation:** inline, after blur or on submit. Focus moves to the first missing field, and each field shows a one-line plain-language message.
- **Sending (for now):** submit composes an email to `ashmita@iqgroup.co.in` and opens the visitor's mail app. The subject depends on the path:
  - **Hiring:** `Search enquiry: {role} — {organisation}`
  - **Executive:** `Confidential profile: {name}, {current role}`
  - **Body:** the fields, one per line.
- **After sending:** a confirmation state says "Press Send". It offers "Copy message" (clipboard fallback), "Email didn't open?" (the same `mailto:` link) and Done. Done returns focus to the button that opened the sheet.
- **Escape hatches:** the sheet shows the phone number ("Prefer to talk?"), and the contact section keeps its phone numbers and address.
- **Mechanics:** native `<dialog>` (focus trap, Esc, inert page). Right-hand drawer on desktop, bottom sheet on phones (≤560px). Slide-in via `@starting-style`, off under reduced motion. Without JS, the links fall back to `#contact` and plain `mailto:`.

**Limits and next step.**
- **Mail app required:** `mailto:` needs a mail app and the visitor still has to press Send. A CV can't be attached automatically; the sheet tells executives to attach it in the email.
- **True one-click sending needs a form endpoint.** Options: Formspree, Web3Forms, Netlify Forms, or IQ's own mail server. Swapping it in only changes the submit handler; the fields and states stay.
- **Copy to confirm:** "A partner replies personally" and "Used only to reply to you" are promises Ashmita should confirm. Under GDPR (Oslo) the second one needs a privacy notice once a backend stores data.

## Round 5 changes (2026-11-06)

- **No index numbers** on practices or services. The methodology steps keep theirs, because there the order carries meaning.
- **Practices bento, made scannable.** Every tile now has the same three parts: the practice name, one line on who IQ hires for, and "Led by" with the partner's round portrait. The mixed pills (some tiles had them, some didn't) and the hover-revealed tags are gone.
  - **Layout:** two rows instead of three. BFSI (light) and IQ Social (dark) are the two wide tiles, set on a diagonal; Consulting, FMCG/Healthcare, Legal and Media/Hospitality fill the remaining cells. This removes the empty space the double-height BFSI tile left.
  - **Leads:** taken from the roster's focus areas. Ashmita (all practices) leads BFSI, Consulting and FMCG; Shirin leads Legal; Annu leads Media/Hospitality; Christine leads IQ Social. Ashmita should confirm, especially whether an associate should be named on BFSI.

## Round 4 changes (2026-11-06)

- **The flat map is final** (user: "perfect"). A globe variant was tried and discarded.
- **Trust bar: client names as text, not logos.** Logo permission is unconfirmed (R2), and having logos in the pitch deck doesn't establish website rights. The label is "Clients include", followed by UBS · BCG · J.P. Morgan · Deutsche Bank · PwC · Johnson & Johnson · GSK · Hindustan Unilever.
  - **Type:** set in Plus Jakarta Sans 600 at 20px, each name in its brand colour (sampled from the official artwork). PwC (#D04A02) and GSK (#C85A00) are darkened to pass 3:1 for large text on alabaster.
  - **HUL, not Unilever:** the client is Hindustan Unilever Limited, so the global Unilever mark is no longer used.
  - **Removed:** the logo files in `source/assets/clients/`.
  - **Still open:** naming clients publicly can still conflict with engagement confidentiality. Ashmita should confirm the list.

## Round 3 changes (user review, 2026-11-06)

- **Map is the hero** (the Team option stays in the preview switch).
  - **Coverage:** now spans the Atlantic to the South China Sea and down to southern Africa, so all of Africa and western Europe are in frame. It is a background layer of the hero, anchored to the page centre, and runs behind the headline column.
  - **Fades:** the dots fade out westwards (fully transparent under the headline), at the far right and at the top and bottom, via SVG masks on the dot layer only. Arcs, markers and labels stay crisp, so Oslo remains legible.
  - **Visibility:** dots are larger and darker (ink 34% at 3.3px, previously 22% at 2.6px).
  - **Refinements:** a staggered (hexagonal) dot grid instead of a square one; IQ's footprint countries (India, UAE, Singapore, Norway) picked out in accent dots; halo rings on every city; Mumbai marked as HQ with a slow pulse; arcs that draw in sequence, then markers and labels fade in. All motion is off under reduced motion.
  - **Smaller screens:** on tablet (861–1100px) the map is re-anchored so labels clear the headline. On phones it sits below the text, cropped to the Gulf–Asia arc, with labels scaled up.
  - **Size:** about 60 KB inline (≈17 KB gzipped).
- **Trust bar logos were switched to the real colour wordmarks** (superseded in round 4 by coloured text names). The SVGs come from Wikimedia Commons / English Wikipedia (UBS and GSK are non-free there), trimmed to their artwork. GSK's 1.5 MB SVG is rasterised to an 8 KB WebP. Heights are balanced optically per logo. **Trademark use still needs each client's permission (R2).**

## Round 2 changes (user review, 2026-11-06)

- **Hero:** the mandate-ledger card is gone (too much text). It is replaced by a visual, with two options switchable at the bottom-left:
  - **A · Map** (default): a dotted footprint map with arcs from Mumbai to New Delhi, Kolkata, Bangalore, Dubai, Singapore and Oslo. The arcs draw once and Mumbai has a quiet pulse; both are off under reduced motion. Generated by `tools/v4-map/dots.mjs` and inlined (39 KB, 9 KB gzipped).
  - **B · Team:** the ten people as round warm-monochrome portraits, with Ashmita larger. It is visibly soft at the large size, because the sources are 312px avatars.
- **Trust bar** replaces the stat bar. It reads "Trusted by" followed by UBS · BCG · J.P.Morgan · Deutsche Bank · pwc · Johnson&Johnson · gsk · Unilever, typeset as in v2. It is a 4×2 grid on tablet and 2 columns on phone. Logo and name permission (R2) is still open.
- **Section headers:** short and plain ("Practices", "Services", "How a search runs"), with no side text. "Trusted with difficult mandates." and the People header are kept, as approved.
- **Practices:** same bento, more compact (rows 15rem → 11rem, smaller padding and titles).
- **Services:** the sticky index and the panels are gone. Three columns, each a number, a title and one line.
- **Methodology:** the click-through stepper is gone. All five steps are visible on one line, and the connecting line and nodes fill as the section scrolls into view (CSS scroll-driven animation; fully visible without it). Vertical on mobile.
- **Ashmita card:** the Before IQ / Education / Beyond work facts are removed.

## Palette: verdict

The plum default is still the IQ brand palette, but used differently: warm alabaster/stone neutrals, plum only as accent ink, obsidian for the two dark surfaces. That is **better** than v2, where plum and obsidian dominated the surfaces and read "sleek". Navy + brass is the private-bank default (generic, and the brass is too light for text). The recommendation is to keep the plum accent on the warm neutrals.

## What is taken from each reference

| Section | Reference | Pattern used in v4 |
| :--- | :--- | :--- |
| Overall | Mercury, Stripe Press, Anthropic | Warm alabaster `#FAF9F5` / stone `#F2EFE9`, hairline borders, editorial serif + clean sans, zero stock photography |
| Navigation | Mercury | Floating glass pill nav: 4 links (Practices, Methodology, About, Contact) plus one dark pill CTA. Scrollspy highlight. Menu sheet ≤860px. |
| Hero | Mercury, Stripe | High-whitespace typographic hero on the left; a dotted footprint map (or the team) on the right. |
| Trust bar | v2 | "Trusted by" plus eight typeset client wordmarks |
| Practices | Stripe Enterprise | 1px-gap bento. Banking, PE & Financial Services takes half the weight (6×2). Four smaller tiles, then a full-width dark IQ Social tile. Tags (real mandates or the leading partner) reveal on hover; they are always visible on touch. |
| Services | Watershed (simplified) | Three columns: number, title, one line |
| Methodology | Linear / Watershed | All five steps visible on one line, which fills on scroll. Vertical on mobile. |
| Proof | Ramp | Two editorial pull-quote cards, attributed by name and role |
| Leadership | Benchmark, Index Ventures | Founder spotlight (verified bio), then Index's large serif name roster with **small round inline portraits**. Hover or focus a name to show role and practice. |
| Contact | Wise, Wealthfront | Dual pathway: a dark card for organisations ("In quest of leadership?") and a stone card for executives ("Join our leadership network"). Offices row below. |

## Where v4 departs from the brief, and why

- **"20 years" / "Twenty years of placing leadership…"** The brief's numbers are wrong: the firm is 30+ years old (PROJECT_BRIEF §2 and the locked wording). v4 keeps the approved hero copy and "30+".
- **Fabricated testimonial** ("IQ Group built our entire compliance leadership team…"). Not used. v4 uses the two real quotes (Ajay Mahajan, Tilak Mukherji as "Advisor to IQ Group").
- **Role micro-tags** ("CxO, Risk & Compliance, Managing Partners…"). Not invented. Tags come from the real anonymised mandates, or name the partner who leads the practice.
- **Four practices** (Banking, Legal, Hospitality, Social Impact). The firm has six (PROJECT_BRIEF §6.2), so v4 shows all six, with BFSI weighted as the core.
- **Services: "Talent advisory & employer branding".** Not a stated offering. v4 uses the client-supplied and live-site services: Retained executive & board search · HR advisory & systems · Onboarding, training & retention. RPO and Outplacement are left out until PROJECT_BRIEF Q5 confirms them.
- **Four-step methodology** (Cultural Briefing → Post-Placement Integration). v4 keeps the client-supplied five steps.
- **Palette.** The brief proposes navy + brass, but the IQ brand palette (plum family) was locked. v4 defaults to the brand plum on the brief's warm neutrals, and ships the navy + brass proposal as a preview (`?palette=navy`, or the switch at the bottom-left). Muted brass `#B48E55` is only 2.9:1 on alabaster, so brass text uses a darkened `#7A5B2C` (5.9:1); the original brass stays on dark surfaces only.
- **Fonts.** The brief suggests Newsreader / Instrument Serif / Fraunces with Inter / Plus Jakarta Sans / Switzer. v4 uses **Newsreader** (opsz 6–72, weights 300–600) and **Plus Jakarta Sans** (300–700, continuity with v2). Both are self-hosted (`source/assets/fonts/`, about 150 KB together, OFL), which avoids the Google Fonts CDN (GDPR, for Oslo).
- **Portraits.** Large editorial portraits need a photoshoot: the sources are 312px avatars. v4 uses 160px face crops from the uncut originals (`source/assets/team-face/`), shown small (round, warm monochrome). At those sizes the resolution holds up.
- **Candidate pathway.** It is a `mailto:` with the subject "Confidential profile". No form backend exists, and a candidate portal is out of scope (PROJECT_BRIEF §11).

## Open decisions

1. Palette: IQ plum (default, recommended) or navy + brass?
2. Hero visual: A · Map (recommended) or B · Team?
3. Contact-card headlines are new copy and need approval: "In quest of leadership?" · "Join our leadership network."
4. Practice descriptions for Legal, Media/Hospitality and Consulting are deliberately minimal. The practice leads should supply one line each.
5. IQ Social client names and the trust-bar names are taken from the live site. The global BFSI and consulting names stay hidden until permission is given (R2).
