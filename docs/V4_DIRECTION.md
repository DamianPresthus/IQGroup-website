# v4 direction — "Quiet institutional confidence"

**Status:** round 6, 2026-11-06, for review. Live preview: `…/IQGroup-website/v4/` (marked `noindex`). v2 stays the live site. v3 (all-serif, paper) is parked: the user did not like it.

**Source:** the user's brief, which draws on modern wealth management, elite venture capital and high-trust fintech. Reference screenshots are in `reference/v4-research/`. Thrive Capital and Carta could not be captured (blank page / bot check).

**Build:** plain HTML + CSS + a small JS file in `source/v4/` (`index.html`, `tokens.css`, `styles.css`, `app.js`). It is seeded with the v2 copy, so v2 itself is untouched.

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
