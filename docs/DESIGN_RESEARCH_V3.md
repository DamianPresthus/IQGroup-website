# v3 Design Research — "Down to earth and classy"

> Status: research, 2026-11-06. No design work done yet. Content stays on hold until IQ Group sends the LinkedIn drafts.
> Goal: be seen as **trustworthy, timeless, an institution**. The site should feel less sleek and less like a PowerPoint deck.
> Screenshots: `reference/v3-research/` (1440×900, captured 2026-11-06; several are partly covered by cookie banners).

---

## 1. Stakeholder feedback, interpreted

| Said | Meaning |
| :--- | :--- |
| "Good shi" / "Too sleek make it uglier" (Ahaan Ray Sarkar) | The craft is fine, but it reads as a polished agency or SaaS template, not as the firm. "Uglier" means more human, plain and specific. It does not mean careless. |
| "Looks nice. Have to work with content. Already doing it… for LinkedIn." | The visuals are accepted. The content is weak, and they are rewriting it themselves. |
| Our own diagnosis | Every section reads as a slide (see §2). |

## 2. Why v2 reads as slides

- **One section template, eight times:** an eyebrow, a big serif H2 and a block of cards. Every section uses the same width (1,180px) and the same padding.
- **Strict dark/light alternation,** so each section looks like a separate slide.
- **A full-screen hero,** with a 108px headline over animated ribbons.
- **Too much finish:** glows, gradient fields, grain on everything, 28px rounded cards, pill buttons and a pill nav. This is the visual language of tech products in 2024–26, and it dates quickly.
- **No real artefacts:** no photographs, initials in place of faces, typeset logos and anonymised mandates. With nothing real on the page, the polish reads as generic.

## 3. What research says builds trust

**Stanford Web Credibility guidelines** ([Fogg, 2002](https://credibility.stanford.edu/guidelines.html); based on 4,500+ participants). These are the points that bear on v3:

1. *Show that there's a real organization.* "Listing a physical address… posting a photo of your offices or listing a membership" (e.g. ERA).
2. *Highlight the expertise.* Give credentials.
3. *Show that honest and trustworthy people stand behind your site.* Real people, and bios with some personal detail.
4. *Make it easy to contact you.* Phone, address and email, visible.
5. *Design for the site's purpose.* "Not all sites gain credibility by looking like IBM.com."
6. Sites lose credibility when they "try to show the dazzling things they can do with web technology."
7. *Use restraint… be clear, direct, and sincere.*

The [Making Good summary](https://www.makinggood.ac.nz/methods/web-credibility) of the same research says sites need to look appealing "but not too 'slick'". That is almost word for word Ahaan's note.

**Implication:** trust comes from evidence of reality (people, place, record, contact). Visual effects don't create it, and too much effect costs trust.

## 4. Reference sites (observed)

| Site | What we saw | Take | Leave |
| :--- | :--- | :--- | :--- |
| **C. Hoare & Co.** (`hoares.png`), private bank since 1672 | Split screen: a flat deep-green panel with a serif all-caps headline on one side, a large **real photograph of their own premises** on the other. "Private bankers since 1672" sits under the wordmark. | **The strongest match for "down to earth and classy."** Flat colour, real place photography, heritage as a quiet line under the logo, no effects. | Very old-world. IQ is 30 years old, not 350. |
| **Cravath** (`cravath.png`), law firm | White ground, letterspaced serif wordmark, a deal headline in serif as the hero, a dated "Recent news & insights" row. | Institution = **a visible record of activity**, with dates. A plain white surface and a restrained serif. | Its oversized background lettering. |
| **Slaughter and May** (`slaughtermay.png`) | Letterspaced caps wordmark, plain white, a deal and its value as the headline, plain text nav. | Proof (deals, case studies) leads. Plain text nav, no pills. | The purple ribbon graphic in the hero, which is the kind of effect we're removing. |
| **Rothschild & Co** (`rothschild.png`) | Full-bleed dark photograph of a historic interior detail, light serif statement. | Photography of an actual place carries the gravitas, not gradients. | Heavy darkness. Too sombre for a boutique. |
| **Egon Zehnder** (`egonzehnder.png`), search, peer | A serif heading ("Why Choose Egon Zehnder?") on white with plenty of air. | The category leader is calm and white, with serif headings. | Corporate scale and mega-menus. |
| **Wellcome Collection** (`wellcome.png`) | A plain sans heading, a real exhibition photo, flat colour blocks, a strict grid. | **Down to earth:** honest photos, flat panels, legible type, no gloss. | Its public-museum tone. |
| **Cyril Amarchand Mangaldas** (`cyrilshroff.png`), Indian law firm | A plum/aubergine brand, but stock imagery, a generic gradient card and a slider. | Plum works for Indian professional services, which validates our palette. | **Cautionary example:** stock photos and gradients make a top firm look generic. |
| **Russell Reynolds** (`russellreynolds.png`), search, peer | Dark full-bleed hero with a serif headline. | — | **Counter-example:** this is where v2 is today. A dark cinematic hero is the category default, not a differentiator. |

Also worth studying, though not captured: Sequoia Capital (an institution expressed through a single serif, Rosart, and text-led pages), Stripe Press (classic book typography on the web) and Monocle (editorial density, warm paper tones).

## 5. Design principles for v3

1. **Paper, not screen.** Warm alabaster (`#FAF8FA`, or warmer) is the main ground for most of the page. Dark plum becomes a deliberate moment (one or two sections, plus the footer), not every other slide.
2. **Typography does the work.** Fewer sizes, closer together. Drop the 108px display size. Use the classic document tools: small caps labels, real italics, old-style and tabular figures, and a 60–70 character measure for prose.
3. **Rules and columns, not cards.** Hairline rules, a left margin column for labels (as in an annual report or letterhead) and ruled lists. Rounded cards only where something is truly an object, if anywhere.
4. **Real artefacts over effects.** Photographs of the partners (documentary, natural light, toned or black and white) and of the place (Mumbai, the office). A founder's note with her signature. The ERA membership as a plain line. Until the shoot happens, use clearly marked placeholders, not stock.
5. **Record over rhetoric.** Mandates as a dated ledger (role · sector · year), and clients as a plain typeset list in columns ("Clients include"). The heritage line under the wordmark waits on confirming 1992 vs 1994 (PROJECT_BRIEF Q1).
6. **Vary the rhythm.** Some sections are a single line, some are dense lists, some are a column of prose. Sections can run into each other without a background change. Not every section gets an eyebrow and an H2.
7. **Quiet motion.** No animated ribbons. At most, short fades. Respect `prefers-reduced-motion`.
8. **Flat colour.** Plum as ink: wordmark, rules, links and one or two flat panels. No glows or radial gradients. Grain, if kept, only on a single flat panel. Mint shrinks back to focus states only (this reverses the extra mint added in v2 and needs your approval).

## 6. Concrete component changes (v2 → v3)

| v2 | v3 direction |
| :--- | :--- |
| Full-screen dark hero, canvas ribbons, pill CTAs, logo marquee | A masthead-style top: wordmark and plain text nav, a statement at a modest size, a row of quiet facts (Mumbai · 30+ years · ERA member), and one photograph or a flat panel. The hero is not 100vh. |
| Double-ring pill nav | Plain text links with an underline for the active page. |
| Pill buttons | Text links with an arrow, or rectangular buttons with a 2–4px radius. |
| Statement on a dark slide | The statement sits in the flow as a pull quote with a rule above it. |
| Method in a rounded panel with dots | A numbered ruled list across the margin and content columns. |
| Mandate cards with a grain gradient | A ledger table: role, sector, and later the year. |
| Endorsements with a big plum quote mark | Quotes set like a book's epigraph: serif italic, with attribution in small caps. |
| Partner cards with gradient headers and initials | Portrait photo, name, role and a two-line bio. Plain grid, no card container. |
| Contact on a glowing dark section | The address set like a letterhead: address, phone, email and a small map or building photo. |

## 7. Typography options to test

The current pair is EB Garamond and Plus Jakarta Sans. Plus Jakarta is a geometric startup sans and is a large part of the "sleek" feel. All options below are free on Google Fonts.

- **A. Serif throughout:** EB Garamond for display and **Source Serif 4** or **Newsreader** for text, with small caps labels. The most "institution" of the three; reads like a printed report.
- **B. Serif with a humanist sans:** EB Garamond with **IBM Plex Sans** or **Public Sans** for UI and labels. Plainer and more down to earth than Jakarta.
- **C. Libre Caslon** for display with **Source Sans 3**. Classic and a touch warmer. Caslon has strong legal and publishing associations.

Recommendation: test **A** first, because it is the most direct answer to "less sleek, more institution".

## 8. Open decisions before building v3

1. Approve the principles in §5, including scaling mint back to focus states only.
2. Pick the type option to test (§7).
3. Photography: is a partner and office shoot possible? If not, what can IQ supply? This is the biggest lever for "down to earth".
4. Should v3 be built as a separate file (`source/IQ Group Website v3.dc.html`) on a branch, keeping v2 live on Pages until v3 is approved? (Recommended.)
