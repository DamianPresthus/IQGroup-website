# IQ Group — Creative Direction & Design Brief (`DESIGN.md`)

> **Purpose of this document:** This is a **Creative Direction & Strategic Design Brief** for designing the new **IQ Group (`iqgroup.co.in`)** website in Claude Design. It establishes the brand truths, Apple design philosophy guardrails, mathematical color harmony, and visual inspiration references while leaving **full creative freedom** for layout composition, spatial choreography, and component craft.

---

## 1. Brand Identity & Strategic Positioning

- **Company:** **IQ Group** (`https://www.iqgroup.co.in/`)
- **What They Do:** A Mumbai-headquartered **boutique Executive Search, Leadership Advisory, and HR Transformation firm** with **30+ years of heritage** (established 1994; proud member of the Executive Recruiters Association — ERA).
- **Geographic Footprint:** Headquartered in Mumbai (Sunshine Towers, Dadar West) with active search execution across **Mumbai, New Delhi, Bangalore, Kolkata, Dubai (Middle East), and Singapore (South Asia)**.
- **Core Value Proposition:**
  - *Mission:* *"To provide deeply personalized service from a dedicated, high-caliber team — helping you make impactful hires from specialist roles to the C-suite."*
  - Unlike rigid global search behemoths where mandates are handed off to junior researchers, IQ Group provides **partner-led, high-velocity, deeply researched search** for complex and mission-critical roles.
- **Target Audience:** Board Members, Promoters, CEOs, CHROs, Managing Directors, Private Equity Operating Partners, and International Foundation Heads.

---

## 2. Design Philosophy (The Apple + Editorial Filter)

Every design decision should pass through five core principles:

1. **Simplicity Through Reduction ("Less is More"):**
   - Avoid info-dumping or walls of text. Every section should communicate **one unmistakable idea** in a single glance.
   - Strip away decorative SaaS clutter (no fake dashboards, no status-pill spam, no redundant search bars where a one-tap filter suffices).
2. **Deference (Materiality Serves the Content):**
   - Visual effects—such as flowing silk waves or grainy stochastic gradients—must create atmospheric depth and luxury **without competing with typography or legibility**.
3. **Clarity & Progressive Disclosure:**
   - Show clean, scannable headlines and primary groupings first; let users reveal deeper layers (such as the 5-Step Search Methodology or sector-specific client rosters) through tactile interactive switches or expandable rows.
4. **Depth & Spatial Rhythm:**
   - Alternate deliberately between **deep, immersive dark stages** (for authority and gravitas) and **warm, breathable light editorial surfaces** (for reading practice areas and leadership bios).
5. **Anti-Generic / Anti-AI-Slop Mandate:**
   - No generic 3-equal-column SaaS feature boxes with Lucide icons, no neon cyberpunk glows, no stock handshakes, and no arbitrary UI gimmicks (like event tickets or fake metric widgets) that don't belong to an elite executive search firm.

---

## 3. Color Direction — The 60–30–5–5 Golden Ratio Royal Plum System

Built mathematically from IQ Group's heritage **Royal Plum (`#8F1F78`, Hue `312.3°`)** using the **Golden Angle (`-137.5°` counter-clockwise / `+222.5°` clockwise → `174.8°`)** and a **`-60%` saturation support step**.

### Color Palette Roles (Creative Freedom in Application, Strict Harmony in Ratio)

| Proportion | Role | Hex Codes | Creative Direction & Guardrails |
| :--- | :--- | :--- | :--- |
| **60% Foundation** | **Dark & Light Architectural Surfaces** | **Dark Anchor:** `#12051A` *(Plum Obsidian, `19.8:1` vs white)* / `#1A0826` *(`18.0:1`)*<br>**Light Surfaces:** `#FAF8FA` *(Warm Alabaster)* & `#F3E7F0` *(Soft Lilac Wash)* | Never use cold `#000000` black or sterile `#FFFFFF` everywhere. Alternate between deep Plum Obsidian stages (`19.8:1` contrast) and warm Alabaster/Lilac editorial sections. |
| **30% Brand Core** | **IQ Royal Plum & Deep Aubergine** | **Primary:** `#8F1F78` *(IQ Royal Plum)*<br>**Deep Surface:** `#2B0F2A` *(Aubergine)* | **Contrast Rule:** On light `#FAF8FA` surfaces, `#8F1F78` has `6.8:1` contrast and works for eyebrows/links/buttons. On dark `#12051A` (`2.4:1` contrast), `#8F1F78` must only be used for **surfaces, button fills (with white text), gradients, and waves** — never for small text on dark. |
| **5% Support** | **Desaturated Plum (`-60%` Sat)** | **On Dark:** `#D1A1C7` *(Dusty Rose-Lilac, `9.8:1` on `#12051A`)*<br>**On Light:** `#6E4165` *(Muted Mulberry, `6.7:1` on `#FAF8FA`)* | Used for section eyebrows, metadata, secondary captions, and subtle hairline dividers. |
| **5% Surgical Accent** | **Golden Angle Aqua-Mint (`174.8°`)** | **On Dark Only:** `#1AD1BE` *(`10.6:1` on `#12051A`)*<br>**On Light Only:** `#0F766E` *(`5.2:1` on `#FAF8FA`)* | **Must be used with extreme subtlety.** A whisper-quiet rim light in a grainy gradient, the top tip of a vertical `.highlight` bar, or a tiny focus indicator. **Never** use as a large background fill and **never** place `#1AD1BE` directly on saturated `#8F1F78`. |

---

## 4. Typography Direction

- **Editorial Serif (Headings & Monumental Statements):** **`Literata`** (or similar warm, high-trust editorial serif)
  - Used at confident, large scale with tight tracking and generous whitespace.
  - Headlines should be short, declarative, and human (2 to 7 words).
- **Geometric Humanist Sans (Body, UI Chrome & Navigation):** **`Poppins`** (or clean geometric sans)
  - Used at light/regular weights (`300`/`400`) for body copy and medium (`500`) for pill buttons and segmented controls.

---

## 5. Curated Visual References & What to Synthesize from Each

Rather than copying a single template, synthesize the strongest DNA from these three references:

### Reference A: [Leathwaite Executive Search (`https://www.leathwaite.com/`)](https://www.leathwaite.com/)
- **What to take:**
  - **The Hero Stage:** Full-height dark stage with **slow, flowing deep-plum/obsidian silk waves**, a concise left-aligned `Literata` headline with a thin vertical gradient bar (`.highlight`) on its left, pill CTAs, and a **subtle sliding monochrome client logo bar docked at the bottom of the hero**.
  - **The Monumental Statement Pause:** Following the hero with a spacious dark section containing a single, bold `Literata` sentence that anchors the firm's 30-year authority.
  - **The Staggered Consultant Grid:** Asymmetric 2-column layout with a sticky left filter/intro column and a staggered masonry right column for the leadership team.

### Reference B: Adaption Labs (`adaptionlabs.ai`)
- **What to take:**
  - **Navigation & Segmented Pill Controls:** Crisp **double-ring segmented pill navigation and view switches** (an outer pill track with a `1px` border housing inner pill buttons where the active tab carries its own crisp inner border).
  - **Nested Container Card Architecture:** Airy outer container cards (`#F3EFF5`) that frame clean, tactile visual headers on top and crisp white nested sub-cards (`#FFFFFF`) underneath—keeping complex practice areas effortless to scan.

### Reference C: Y Combinator / Paper-Style Stochastic Grain Gradients
- **What to take:**
  - **Tactile Risograph / Stochastic Grain Materiality:** Instead of flat CSS gradients or stock photos, use **crisp, fine-grained stochastic/risograph gradients** (blending Deep Obsidian `#12051A`, Royal Plum `#8F1F78`, Soft Lilac `#D1A1C7`, and a subtle 5% glint of Aqua-Mint `#1AD1BE`) as refined visual surfaces, card headers, or ambient light fields.

---

## 6. Verified IQ Group Content & Copy Bank (Use Only Real Data)

### A. Core Narrative & Differentiators
- **Hero Headline (approved):** *"Hires that move your organisation forward."*
- **Hero Subheadline (approved):** *"Partner-led executive search and HR advisory — from specialist roles to the C‑suite, across India, the Middle East, South Asia and Europe for 30+ years."*
- **Statement (approved):** eyebrow *"How we work"* · *"Every mandate is led by a partner — from the first brief to the day your hire walks in."*
- **3 Core Pillars (Partnership, People, Performance):**
  1. **Partnership:** Undivided boutique attention — learning your organization at the cultural, strategic, and tactical level.
  2. **People:** Deep industry experience and a proprietary network of CEOs, Managing Directors, and domain heads built over three decades.
  3. **Performance:** A 30+ year track record of delivering complex, niche placements within remarkably fast turnaround times.

### B. Practice Areas & Capabilities
1. **Banking, Private Equity & Financial Services (BFSI):**
   - *Clients:* UBS, J.P. Morgan, Deutsche Bank, Baring Private Equity Partners India, YES BANK, SBI Ventures, India Ratings & Research (Fitch Group).
2. **Management Consulting, Strategy & Advisory:**
   - *Clients:* Boston Consulting Group (BCG), PwC, Dalberg, Sigma Research & Consulting, Chain IQ.
3. **FMCG, Healthcare, Life Sciences & Industrials:**
   - *Clients:* Johnson & Johnson, GSK, Bayer, Hindustan Unilever (HUL), Asian Paints, Rossari Biotech, MTAR Technologies, Welspun, Tata Housing.
4. **IQ Social (Dedicated CSR, Philanthropy & International Foundations Wing):**
   - *Clients:* Oxfam India, NASSCOM Foundation, HelpAge India, TechnoServe, Kotak Education Foundation, Ambuja Cement Foundation, Concern India Foundation, Educo, CanKids.
5. **HR Advisory, Turnkey Project RPO & Career Transition / Outplacement.**

### C. 5-Step End-to-End Search Methodology (Ideal for Progressive Disclosure)
1. **Understand your business** (strategic priorities, mandate goals, culture)
2. **Shortlist candidates** (proprietary databases, market mapping, direct outreach)
3. **Identify the match** (competency evaluation & 360° reference checks)
4. **Hire & onboard** (offer negotiation, closing facilitation, transition support)
5. **Monitor & iterate** (post-placement check-ins to ensure lasting impact)

### D. Recent Completed C-Suite Mandates & Verified Client Endorsements
- **Recent Hires:**
  - *Chief Executive Officer (CEO)* — Leading Indian specialty chemicals manufacturer
  - *Chief Financial Officer (CFO)* — Indian precision engineering company
  - *Vice President, Investments* — Leading Indian private equity firm
  - *Chief Marketing Officer (CMO)* — Leading private sector Indian bank
  - *Head of CSR, India* — Large European multinational bank
- **Verified Client Quotes:**
  - *"Over a decade, IQ helped me build teams of strong professionals at UBS, Yes Bank, and IDFC. I have been impressed by their speed, professionalism, responsiveness, and cost-effective service."* — **Ajay Mahajan, former Managing Director, UBS**
  - *"IQ may be a small firm but more than makes up with its talent, connections, and never-say-die attitude. IQ takes pride in accepting difficult and complex placements and has delivered where its behemoth competitors have not."* — **Tilak Mukherji, Chairman, Sigma Research & Consulting**

### E. Leadership Team & Contact Details
- **Ashmita Ray Sarkar** — Founder & Managing Director *(All Practices & C-Suite · Mumbai)*
- **Annu Paul** — Director *(Hospitality, Media, Social Impact & Business Development · Mumbai)*
- **Shirin Gulrajani Talwar** — Director *(Legal & Social Impact · Mumbai)*
- **Christine Gomes** — Managing Associate, IQ Social *(CSR, NGOs & Foundations · Mumbai)*
- **Headquarters:** 806, Sunshine Towers, Senapati Bapat Marg, Dadar (West), Mumbai – 400 013, India
- **Direct Contact:** `ashmita@iqgroup.co.in` · `+91 22 6588 5932` · `+91 98200 61329`
