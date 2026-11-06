# v4 direction — "Quiet institutional confidence"

**Status:** first build, 2026-11-06, for review. Live preview: `…/IQGroup-website/v4/` (marked `noindex`). v2 stays the live site. v3 (all-serif, paper) is parked: the user did not like it.

**Source:** the user's brief, which draws on modern wealth management, elite venture capital and high-trust fintech. Reference screenshots are in `reference/v4-research/`. Thrive Capital and Carta could not be captured (blank page / bot check).

**Build:** plain HTML + CSS + a small JS file in `source/v4/` (`index.html`, `tokens.css`, `styles.css`, `app.js`). It is seeded with the v2 copy, so v2 itself is untouched.

## What is taken from each reference

| Section | Reference | Pattern used in v4 |
| :--- | :--- | :--- |
| Overall | Mercury, Stripe Press, Anthropic | Warm alabaster `#FAF9F5` / stone `#F2EFE9`, hairline borders, editorial serif + clean sans, zero stock photography |
| Navigation | Mercury | Floating glass pill nav: 4 links (Practices, Methodology, About, Contact) plus one dark pill CTA. Scrollspy highlight. Menu sheet ≤860px. |
| Hero | Mercury | High-whitespace typographic hero on the left. On the right, a "product panel": a ledger card of **real recent mandates**, in place of Mercury's dashboard. |
| Track record | Carta | Four-cell stat bar with light 100px serif numerals: 30+ years · 6 practices · 4 regions · C‑suite |
| Practices | Stripe Enterprise | 1px-gap bento. Banking, PE & Financial Services takes half the weight (6×2). Four smaller tiles, then a full-width dark IQ Social tile. Tags (real mandates or the leading partner) reveal on hover; they are always visible on touch. |
| Services | Watershed | Sticky left index with scrollspy, plus three service panels |
| Methodology | Linear / Watershed | Horizontal five-step stepper (ARIA tabs, arrow keys) with a progress line and a detail panel. Vertical list on mobile. |
| Proof | Ramp | Two editorial pull-quote cards, attributed by name and role |
| Leadership | Benchmark, Index Ventures | Founder spotlight (verified bio facts), then Index's large serif name roster with **small round inline portraits**. Hover or focus a name to show role and practice. |
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

1. Palette: IQ plum (default) or navy + brass?
2. Section headlines are new copy and need approval: "Specialist practices, one standard of search." · "Three services, one partner accountable." · "Trusted with difficult mandates." · "Every mandate is led by a partner." · "In quest of leadership?" · "Join our leadership network."
3. Practice descriptions for Legal, Media/Hospitality and Consulting are deliberately minimal. The practice leads should supply one line each.
4. IQ Social client names are taken from the live site. The global BFSI and consulting names stay hidden until permission is given (R2).
