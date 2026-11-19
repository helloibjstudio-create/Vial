# VIAL — Design Audit & Website Implementation Blueprint

Source: Figma file `YaPkRs5mGYVwUCE6OJ8axu` ("VIAL — Brand System & Digital Experience"), inspected read-only on 2026-11-17 through the Figma MCP Plugin API. Nothing in Figma was modified.

> **Audit status: partial.** Partway through, the Figma MCP **Starter-plan tool-call limit** was reached. Everything below comes from data actually read. Anything that could not be read is listed in §10 *Gaps & access limitations*. Values marked **[needs confirmation]** are inconsistencies found in the file, not guesses.

---

## 1. File inventory

| Page | ID | Contents | Status |
|---|---|---|---|
| Logo and Branding | `0:1` | 112 top-level nodes: logo concept explorations (concepts 1–3), a 1920×1080 **Brand Identity Guidelines** deck, flyers, posters, app-store creatives, billboards, mockups, and the `Store download button` component set | Top level listed; deck text partly read |
| Website Design | `3:2` | 13 top-level nodes: 8 desktop website frames (1440 wide), 1 legacy component set, 2 **empty** device frames (iPad Pro 12.9", iPhone 14/15 Pro Max) | Deep-inspected (two frames only partly, see §10) |
| UI/UX | `3:3` | **Empty — 0 nodes** | Nothing to inspect |

### 1.1 Website Design frames (desktop, 1440 px wide)

| Frame | ID | Height | Role |
|---|---|---|---|
| Landing page — **Intro state** | `199:9948` | 1024 | Animation state 1 (white intro, "Incense Rising from the Nations") |
| Landing page — **Hero state** | `239:7970` | 1024 | Animation state 2 (video hero with nav + headline). This is the URL's node. |
| Landing page — **Full page** | `239:8140` | 11 845 | Animation state 3 + the full scrolling home page |
| About Page | `310:9042` | 5 185 | `/about` |
| Join The Movement | `356:8559` | 4 436 | `/join` |
| Prayer Wall | `369:9336` | 6 359 | `/prayer-wall` |
| Prayer Watch | `382:9888` | 5 185 | `/prayer-watch` |
| Resources Hub | `404:871` | 3 033 | `/resources` |
| VOLUNTEER · DONATE · CONTACT | `407:2000` | 4 866 | `/get-involved` (+ `#volunteer`, `#donate`, `#contact`) |
| iPad Pro 12.9" – 1 | `15:10277` | 1366 | **Empty** (no tablet design) |
| iPhone 14 & 15 Pro Max – 1 | `15:10279` | 932 | **Empty** (no mobile design) |
| Landing page (component set) | `118:8022` | 7 393 | 3 variants (`Default`, `Variant2`, `Variant3`). Looks like an earlier iteration; not inspected (rate limit) |
| Rectangle 40485 | `118:8198` | — | Stray canvas rectangle; ignore |

**Not website sections:** the duplicated hero blocks, nav bars and the "More Than an App" block found off-canvas inside the three Landing frames are **Smart Animate states** (see §6). They are not separate sections.

---

## 2. Brand identity (from the Brand Guidelines deck on page `0:1`)

### 2.1 Positioning (verbatim from the cover, frame `41:7613`)
> "This document is not a rulebook. It is a stewardship guide. VIAL was not designed to look spiritual. It was designed to be spiritual… a global house of prayer made digital, built for the intercessor in Lagos at midnight, the student in Chicago at dawn, the businesswoman in Singapore at noon. Every person who opens this product should feel that something set-apart is waiting for them."

Anchor scripture: **Revelation 5:8**, the golden vials full of incense, which are the prayers of the saints.

### 2.2 Personality & visual direction
- **Reverent, set-apart, timeless rather than trendy.** In the deck's words: "a global spiritual platform, not a casual wellness app".
- **Restraint with gold.** Gold "marks what matters… Its power lives in restraint." It is not a fill colour for big surfaces. (The website does use gold card fills in places; follow the frames.)
- **Warm darkness.** The night-watch mood: deep black, candle-lit, "darkness that is not empty but full of presence".
- **Editorial typography.** A high-contrast serif display face (Editor's Note) mixes upright and *italic* words inside one headline, paired with a clean grotesque body face (DM Sans).
- **Imagery:** low-key, moody photography of people in prayer, hands, candlelight and warm gold grading. Soft gradient fades blend photos into backgrounds.
- **Surfaces:** large radii (20–60 px), frosted "glass" pills and panels tinted gold or brown, soft single drop shadows.
- **Motion:** slow, smooth, cinematic. Smart-Animate transitions of 0.8–2 s with ease-out or custom bezier curves (§6).

### 2.3 Deck sections
`1 Cover` · `2 Table of Contents` · `3/4 Mission & Vision` (4 frames) · `5–8.1 The Logo` (rationale, construction, mockups) · `9–11 Color Palette` · `12–14 Typography` · `15–16 Social Media` · `17–19 Photography Guide` · `20–36 Brand Application` (mockups: posters, billboard, merch, app icon) · `end` ("Thank you — Designed by IBJ. Studio").
Only the cover, the colour-palette text and the logo rationale text were read in full. The other deck slides were listed but not opened (§10).

### 2.4 Logo
- **Final mark** (used in the site footer and nav): a vial/flask silhouette in white with a **gold flame inside it**, plus a small flame/drop above. The wordmark is **"Vial"** set in *Editor's Note Semibold* (≈31 px in the footer). Footer node: `353:8471` (4 vectors + text).
- **Rationale (frame `41:7700`, "6 Logo 1"):** "a vial pouring upward, almost like incense rising… elevation, movement, and offering… The shape also subtly resembles a flame and a drop."
- Concepts 1, 2 and 3 with variants (`5:33`…`5:221`, `6:10093`, `7:10152`) are explorations.
- **Not exported yet:** SVG of the final logo, logo lockups, app icon (§10).

---

## 3. Design system specification

### 3.1 Colour tokens

The file defines **no Figma variables and no paint styles**. All colours are hard-coded. The core palette is documented in the brand deck (`48:9124`) and confirmed by usage across the frames.

| Token (proposed) | Hex | Brand name / usage |
|---|---|---|
| `gold` | `#C9A84C` | **Incense Gold**: accents, primary CTA fill, active chips, selected states, italic emphasis words |
| `brown` | `#5C4510` | **Altar Brown**: primary text on light backgrounds, dark section fill, outline-button stroke, brown buttons |
| `white` | `#FFFFFF` | **Pure White** |
| `black` | `#0A0A0A` | **Sacred Black**: dark hero overlay, form headings |
| `cream` | `#F5EDD8` | Parchment: section backgrounds, footer gradient, footer watermark, input strokes in Join/Prayer Wall forms (`#F5EDD9` appears once; treat as a typo) |
| `cream-muted` | `#E8DFC8` | Muted text on brown (used at 70–85 % opacity) |
| `ink` | `#1C1008` | Text on gold buttons on the Get-Involved page |
| `spark` | `#FFBC00` | Inner stop of the eyebrow icon's radial gradient |
| `live` | `#EA4335` | "Live Now" dot |
| `active` | `#40FF06` | "Active" dot |
| `disabled` | `#888888` | Disabled / unavailable buttons (Prayer Watch) |
| `placeholder` | `#C2C2C2` | Select placeholders (donation widget) |
| `border-neutral` | `#D4D4D4` | Select borders (donation widget) |
| `text-secondary` | `#4A5565` | Form helper paragraph (Join form) |
| `badge-border` | `#A6A6A6` | Store-badge stroke |
| Accent text | `#008751`, `#C60300` | Country/location names in testimonials (Nigeria green, New York red) |

**Gradients**
| Use | Definition |
|---|---|
| Dark fade over hero video / photo | linear top→bottom, `#0A0A0A` 0 % → `#0A0A0A` 100 % alpha |
| Gold fade inside bento cards | linear top→bottom, `#C9A84C` 0 % → 100 % alpha |
| Section "The altar is always lit." | linear top→bottom `#F5EDD8` → `#5C4510` |
| Light sections | linear `#F5EDD8` → `#FFFFFF`, `#FFFFFF` → `#F5EDD8` |
| Footer | linear `#FFFFFF` → `#F5EDD8` |
| White photo fades (Prayer Wall / Resources hero) | image + linear `#FFFFFF` 0 % → 100 % |
| Glow blob (home "VIAL App" section) | 875×875 linear `#C9A84C` → `#FFFFFF`, **layer blur 555 px** |
| Featured section glows (Resources) | radial `#C9A84C` @ 8–12 % → transparent at 65 % |
| Eyebrow sparkle icon | radial `#FFBC00` → `#5C4510` (light bg) or → `#FFFFFF` (dark bg) |
| Leviticus banner (Get Involved) | image @ 70 % + horizontal `#1C1008`@85 % → transparent → `#1C1008`@85 % |

### 3.2 Typography

**Families**
1. **Editor's Note** (display serif). Styles used: Medium, Medium Italic, Italic, Semibold, Semibold Italic. **A commercial font that is not on Google Fonts. Licensed web font files (WOFF2) are required.**
2. **DM Sans** (body/UI). Variable, with optical-size axis; the "DM Sans 9pt" optical size is used on Resources and Get-Involved. Weights: Regular 400, Medium 500, SemiBold 600, Bold 700, and italics. Available on Google Fonts.
3. **Cormorant Garamond** Medium Italic, **used once** (Resources featured card title "Praying the Psalms") **[needs confirmation: likely an import artefact; should probably be Editor's Note Medium Italic]**.

**Text styles defined in Figma (3)**
| Style | Spec |
|---|---|
| `Editors Sections` | Editor's Note Medium 65 / line-height 100 % / letter-spacing −4 % / Title Case |
| `Header` | DM Sans SemiBold 64 / 90 % / −1 % |
| `Desktop Content Font` | DM Sans Regular 18 / 24 px / −5 % |

**Type scale observed (desktop)**
| Role | Family / style | Size | Line height | Letter spacing | Notes |
|---|---|---|---|---|---|
| Hero H1 | Editor's Note Medium + Medium Italic | 80 | 100 % | −4 % | Title Case; italic words mid-line ("The *Prayers Of The Saints Are Rising.*") |
| Intro display | DM Sans Medium + Editor's Note Medium/Italic | 90 | auto | −3/−4 % | "Incense Rising / from the *Nations*" (gold italic word) |
| Section H2 | Editor's Note Medium (+ Italic gold emphasis) | 65 | 100 % | −4 % (−3 % in About mission) | Title Case |
| Eyebrow | DM Sans SemiBold | 16 | 24 px | +0.8 px | UPPERCASE, 16 px sparkle icon, 8 px gap |
| Body | DM Sans Regular | 18 | 24 px | −5 % | the `Desktop Content Font` style |
| Body (Resources / Get-Involved import) | DM Sans 9pt Regular | 15–18 | 22–28 px | −0.3 to −0.5 px | |
| Button label | DM Sans Medium | 18 | auto | −1 % | |
| Hero side copy | DM Sans Regular | 18 (22 in intro state) | 24 px | −5 % | |
| Bento label | DM Sans SemiBold 35 + Editor's Note Medium Italic 55 | 35 / 55 | 90 % | −5 % | two-line combo |
| Card title (watch cards) | DM Sans SemiBold | 44 (34 on Prayer Watch) | 90 % | −3 % | |
| Watch time | Editor's Note Semibold Italic | 34 | 90 % | −9 % (−5 % in form) | |
| Roman numeral / step number | Editor's Note Italic / Medium Italic | 44 | 100 % / 24 px | −4 % / −2 px | |
| Feature title | DM Sans SemiBold | 26–28 | 24 px | −2 px | Title Case |
| Resource card title | Editor's Note Semibold Italic | 38 | 90 % | −5 % | |
| Testimonial quote | DM Sans Medium Italic | 20 | 21 px | −5 % | |
| Testimonial name | Editor's Note Semibold | 24 | 21 px | −3 % | |
| Prayer request quote | DM Sans Medium | 24 | 103 % | −5 % | |
| Prayer count | Editor's Note Semibold Italic 44 + DM Sans SemiBold 32 | | 90 % | −5 % | "847 / Prayed" |
| Pill / chip | DM Sans SemiBold | 16 (20 for country pill) | 90 % | −3 % | Title Case |
| Footer column head | DM Sans SemiBold | 20 | 24 px | +0.8 px | UPPERCASE |
| Footer link | DM Sans Regular | 16 | auto | 0 | |
| Footer tagline | Editor's Note Medium | 24 | 96 % | −3 % | cream |
| Footer verse | DM Sans Medium | 22 | 103 % | −5 % | brown |
| Footer watermark | Editor's Note Semibold Italic | 800 | auto | −6 % | `#F5EDD8` on gold, clipped |
| Legal bar | DM Sans SemiBold | 16 | 24 px | +0.8 px | UPPERCASE |
| Form section heading | DM Sans Medium | ≈23 | 32 px | −0.5 px | |
| Form label | DM Sans Medium | ≈16 (14 on Get-Involved) | ≈23 / 21 px | −0.2 px | |
| Form input text | DM Sans Regular | ≈18 (15 on Get-Involved) | auto | −0.3/−0.4 px | placeholder @ 40–50 % |

Join and Prayer Wall form sizes are scaled by ×1.145 (16.03, 18.32, 22.90, 34.35 px), which suggests a pasted import. **Proposal:** normalise to 16 / 18 / 23 / 34 px **[needs confirmation]**.

### 3.3 Layout & spacing
- **Desktop canvas:** 1440 px. Grid style **"Web view Grid"**: 12 columns, column 90 px, gutter 20 px, centred (1 300 px content width).
- **Horizontal margins** vary by page: 68–120 px (common values 97/98, 104, 113, 120). **Proposal:** standardise on a 1 240–1 300 px container with ~100 px side padding at 1440 **[needs confirmation]**.
- **Hero (inner pages):** 906 px tall (Resources 1 176, Get-Involved 842). Copy block starts at x 113, y 260; nav overlays the top 115 px.
- **Section rhythm:** vertical padding ≈70–100 px. Heading stacks use auto-layout gaps of 20 (eyebrow → H2 → body), 40 (heading → content) and 60 (heading → grid).
- **Common spacings:** 8, 10, 12, 15, 16, 20, 30, 40, 46, 60, 80, 90, 100.

### 3.4 Radii
| Value | Use |
|---|---|
| 120 / 100 / 68.7 / 60 | Pill buttons, chips, status pills (fully rounded) |
| 60 | Prayer-wall request cards |
| 40 | Hero video card, bento cards, resource cards, testimonial cards, donation panel, form panels (Prayer Wall / Prayer Watch), footer card |
| 45 | About "How it began" image |
| 35.7 | Small watch card (Prayer Watch hero) |
| 24 | Get-Involved forms |
| 20 | Feature/step cards, watch grid cards, image cards, Local Time widget |
| 16 | Giving cards, stat card |
| 12 | Small stat card |
| 10 | Chips (rectangular toggles), quote boxes, inputs (Get-Involved) |
| ≈9.2 | Inputs (Join / Prayer Wall forms) |

### 3.5 Borders
- Outline button: 1 px inside, white (on dark) or `#5C4510` (on light).
- Cards: 1 px `#C9A84C` (step/mandate cards); 1 px `#5C4510` (watch grid cards).
- Inputs: 1.15 px `#F5EDD8` (Join / Prayer Wall), 1 px `#5C4510`@20–25 % (Get-Involved), 1 px `#D4D4D4` (donation selects).
- Chips: 1 px `#C9A84C`; Get-Involved chips 1 px `#5C4510`@22 %.

### 3.6 Shadows & effects
| Name / use | CSS equivalent |
|---|---|
| **"Testimonial shades"** (effect style; step cards, forms, watch panel) | `0 9px 30px rgba(0,0,0,.20)` |
| Testimonial photo edge | `-14px 0 28px rgba(0,0,0,.20)` |
| Application form container | `0 2.3px 4.6px -2.3px rgba(0,0,0,.10), 0 4.6px 6.9px -1.1px rgba(0,0,0,.10)` |
| Resources stat card (white) | `0 8px 32px rgba(92,69,16,.14)` |
| Resources stat card (brown) | `0 8px 24px rgba(92,69,16,.25)` |
| Featured guide card | `0 24px 64px rgba(0,0,0,.50)` |
| Contact form card | `0 4px 32px rgba(92,69,16,.08)` |
| "app shadow 1" / "inner" (effect styles) | Brand mockup shadows only, not used on the site |
| **Glass (Figma GLASS effect)** | Download pill: `#5C4510`@40 % + glass r 8. Nav (inner pages): `#C9A84C`@20 % + glass r 14. Bento cards: `#5C4510`@20 % + glass r 4. Local Time widget: `#C9A84C`@60 % + glass r 12. In CSS: `backdrop-filter: blur(Npx) saturate(...)` + translucent fill + 1 px light inner highlight. Figma's refraction/dispersion parameters have no exact CSS equivalent. |

---

## 4. Components

### 4.1 Figma components found
| Component | ID | Variants | Notes |
|---|---|---|---|
| `Nav Bar` | variants `114:7890` (`Property 1=Default`), `114:7915` (`Property 1=Full Scroll`) | ≥2 | Default = transparent over the home video. Full Scroll = gold-glass bar used on all inner pages. Master internals **not read** (§10). |
| `Download Neutral` | `114:7814` → hover `114:7816` | Default / hover | 255×57 glass pill, `#5C4510`@40 %, radius 120, padding 7/9/5/29. Label "Download the Vial" + gold circular arrow icon (from screenshot). Hover state contents **not read**. |
| `footer` | `365:8929` | 1 | Fully read (§5.8) |
| `Local Time` | `390:13055` → hover `390:13057` | Default / hover | 433×106 gold-glass widget on Prayer Watch hero. Contents **not read**. |
| `Store download button` | set `83:9595` | Store (App Store / Google Play) × Type (Dark / Light) × Language (EN / FR / NL / DE), 16 total | Website uses Dark/English, restyled per context (fill `#5C4510`, or transparent with `#A6A6A6` / `#F5EDD8` stroke) |
| `Landing page` (set) | `118:8022` | Default / Variant2 / Variant3 | Earlier landing iteration; not read |

### 4.2 Recurring patterns (not Figma components, but repeated; to become React components)
- **Eyebrow:** 16 px sparkle icon (radial-gradient vector clipped to a star/sparkle path) + uppercase label.
- **SectionHeading:** eyebrow + H2 (Editor's Note 65) + optional body; left or centre aligned.
- **Buttons:** (a) `GlassPillButton` "Download the Vial" with circular icon; (b) `OutlinePillButton` (white or brown); (c) `SolidPillButton` gold (`Submit Application`, `Post to the Prayer Wall`, `Commit to This Watch`, `Donate`, `Give Now`, `Send Message`, `Subscribe`) and brown (`Join`, `Submit`, `Explore All Resources`); (d) rectangular `Set Reminder` (brown fill) / `Add to Calendar` (brown outline), plus grey disabled variants; (e) `ArrowLink` ("Browse Guides →").
- **StatusPill:** white pill with coloured dot (Live Now / Active / Active Now / Upcoming) and time-range pill ("9am – 12pm *WAT*").
- **Chip / ToggleChip group:** single-select chips, rounded or radius 10, selected = gold fill + white text.
- **Cards:** BentoCard, WatchFeatureCard (home carousel, 485×792), WatchGridCard (Prayer Watch, 317×424, roman numeral), PrayerRequestCard (stacked deck), TestimonialCard, ResourceCard, StepCard/MandateCard (01/02/03), GivingCard, StatCard, FeaturedGuideCard.
- **Form controls:** text input, email, date picker, number, textarea, select/dropdown (Iconly Arrow-Down-2 chevron), checkbox, chip selectors.
- **ScrollCue:** 98 px circular animated badge (masked raster animation, image `4e4b094f…`) on inner-page heroes. Prototype: scroll to next section, "Gentle" easing, 1.02 s. Home uses a 62 px gold circle with an arrow, rotated 135°.
- **DonationWidget** (home + About): "Make a [Monthly ▾] Donation of [Amount ▾] [Donate ↗]" white panel over an image band + "Powered By" Flutterwave / PayPal / Stripe.
- **TestimonialsSection** (home + Prayer Wall): identical.
- **GiveSection** (home Section 10 + About Section 10): identical.

---

## 5. Page-by-page specification (desktop)

Coordinates are px relative to each frame. Sections are listed in **visual order (y)**, which differs from the Figma layer order.

### 5.1 Home `/` (frames `199:9948` → `239:7970` → `239:8140`)
1. **Intro + Hero (animated, see §6).**
   - State 1: white page, "Incense Rising" / "from the *Nations*" at 90 px, black text with a gold italic word, small rounded video pill (198×78) centred.
   - State 2: the video expands to a 1404×978 radius-40 card inset 18/33 px. Nav slides in from the top. The headline block slides in from the left: "The *Prayers Of / The Saints Are Rising.*" at 80 px white, with `Download the Vial` (glass) + `Join the Movement` (white outline). Side copy slides in from the right at x 1061, y 200: "VIAL is a global altar connecting intercessors across every nation, every time zone, every hour of the day." Gold 62 px scroll-down button at bottom right.
   - State 3 (top of `239:8140`): video grows full-bleed (1722×1244, bleeding past the edges) with a black bottom fade. Hero copy exits left, nav exits up, side copy exits right. **"More Than an App."** (65 px) + outline button + paragraph ("VIAL is not built as a social platform…") + **bento grid** slide up into view.
   - **Bento grid** (1274×563, 4 cards, radius 40, brown-glass + gold fade + photo): "Installs across all *Platforms*" (with store badges), "All Intercessors *Active*", "All Nations *Represented*", "*The Watch Never Goes Dark.*"
2. **Section 3** (y 1210, 674 tall): full-bleed photo (`404556…`) with gold overlay and black bottom fade. Centred: "*Why VIAL Exists*" (Editor's Note Italic 32), "One calling. / *A Thousand Tongues.*" (64), Rev 5:8 paragraph ending "This is not an app. It is an altar you carry."
3. **Section 4** (y 1884, 1322 tall): gradient cream → brown. "The altar is always lit." (brown 65) + brown outline `Join the Movement`. A **horizontal card row that overflows the viewport** (3 × 485×792 cards, 30 gap, starting at x −38) suggests a **carousel / horizontal scroll**. Cards (brown / gold / black backgrounds): time pill + status pill, title (44), "🌍 42 nations active", corner icon 73 px, photo panel with a glass Download button. Content: Warfare & Protection (9am–12pm WAT, Live Now), Consecration (3am–6am WAT, Active), Morning Prayer (6am–7am WAT, Active).
4. **Section 5** (y 3206, 1322 tall, brown): blurred gold glow blob. Large phone-mockup image (`ed8a6c…`). Eyebrow "THE VIAL APP", "Carry the altar / everywhere you go." Four features with sparkle icons: Prayer Watches · Guided Prayer Rooms · Prayer Journal · Live Global Events. Store badges 263×88 (transparent, grey stroke, radius 20).
5. **Section 6** (y 4528, 1030 tall, cream): "FROM THE PRAYER WALL / He hears. He answers." + 2 testimonial cards (659×458, white, radius 40, photo on the right with a shadow). Deborah — *Nigeria* · Healing; Esther — *New York* · Watch 8.
6. **Section 7** (y 5558, 1109 tall, gradient cream → white): eyebrow "THE VIAL APP", "Carry the altar everywhere you go." (brown) + paragraph "The Golden Vials Initiative was born in prayer…". **Remainder not read** (§10).
7. **Section 8** (y ≈6667–8987, ≈2 320 tall): **not read** (§10).
8. **Section 9** (y 8987, 785 tall): "RESOURCES HUB / Everything you need to pray deeper." + 4 resource cards (321×330, radius 40, gold + photo): Prayer Guides · Soaking Sounds · Teaching & Sermon · Fasting Plans.
9. **Section 10** (y 9772, 1083 tall): "GIVE TO THE MOVEMENT / Every gift keeps the altar burning." + paragraph + DonationWidget + "Powered By" logos.
10. **Footer** (≈ y 10 855): see §5.8. (The home page has its own `footer` *frame* rather than the component instance; contents not read separately.)

### 5.2 About `/about` (`310:9042`)
1. **Hero** (906): photo `cf2dd4…` full-bleed. "OUR STORY / This began with one image in scripture." (80, brown) + "'Golden vials full of incense the prayers of the saints.' *Revelation 5:8*". ScrollCue centred at the bottom.
2. **How It Began** (y 906, 740, white): "Not an idea. A calling." Drop cap "T" in Editor's Note Italic 65. Two paragraphs, glass Download button. Right column: italic pull-quote "VIAL is the vessel built to carry that mandate into the digital age." (DM Sans Italic 24, right-aligned) + image 562×568 radius 45 (`33ebad…`).
3. **Our Mission** (y 1646, 630): photo `7aa967…` + gold + 50 % black overlay. Centred "To mobilize a global army of intercessors filling heaven *with the incense of prayer.*" (gold italic) + "One house of prayer. Every nation. Every hour…"
4. **Our Mandate** (y 2276, 848, cream): "What we are built to do." + 3 joined cards (411×448, white, gold stroke, radius 20): 01 Daily Prayer Watches · 02 Strategic Intercession · 03 Technology & Unity.
5. **Give section** (y 3124): same as home Section 10.
6. **Footer** (y 4207).

### 5.3 Join The Movement `/join` (`356:8559`)
1. **Hero** (906): photo `e6ebf1…`. "YOU ARE CALLED / The watch needs your voice." + "Vial is building a verified global network…" + brown outline `Apply to Join`. ScrollCue.
2. **The Process** (y 906, 845): "Three steps / to the altar." + subline. 3 step cards 377×457 with shadow: 01 Apply · 02 Verified (with a cream callout about the "Intercessor Certificate") · 03 Activated.
3. **Your Application** (y 1751, 1691, cream): "Tell us who you are." + intro. **Application form card** (931 wide, white, radius 11.5):
   - *Personal Information:* First Name\*, Last Name\*, Email Address\* (**placeholder reads "Country" [needs confirmation]**), Church / Denomination, Date of Birth\*, Prayer Availability (placeholder "Morning · Afternoon · Evening · Night Watch").
   - *Intercession Information:* How long have you been interceding? (number), "Share your journey with prayer — in your own words." (**drawn as a 45 px "Dropdown"; reads like a textarea [needs confirmation]**), Languages Spoken\* ("e.g., English, French").
   - Checkbox. **Layer named "I agree to the $19.99 charge to run a background check", but the visible text is "Applications are reviewed within 3–5 business days…" [needs confirmation]**.
   - `Submit Application` (gold pill, right-aligned).
   - Below: "Who is this for?" + paragraph.
4. **Footer** (y 3458).

### 5.4 Prayer Wall `/prayer-wall` (`369:9336`)
1. **Hero** (906): photo `3920ca…` with a white gradient fade. "THE PRAYER WALL / Every need. Every nation. Every prayer counted." + glass Download (275 wide) + brown outline `Share a Testimony`. ScrollCue.
2. **Wall** (y 906, 2317): centred heading repeated (65) + Download + `Load More`. **Stacked prayer-request cards** that overlap and widen progressively (1200 → 1220 → 1240 wide; cream / gold / brown; radius 60). This reads as a **sticky "card stack" scroll effect**. Each card: photo strip, country pill, name (44), request quote (24), count ("847 / Prayed"). Data: Maria (Brazil, 847) · James (Kenya, 422) · Grace (Nigeria, 1221).
3. **Bring Your Need** (y 3223, 1183): "No request is too small. No burden too heavy." + paragraph. **Request form** (639×950, white, radius 40, shadow): Your Name (or stay Anonymous), Prayer Request (textarea 215 tall), Category (single-select chips: Health\* selected / Family / Nation / Provision / Church / Others), Visibility (Public / Group Only / Anonymous\* selected, radius-10 chips), `Post to the Prayer Wall`.
4. **Testimonials** (y 4406): same as home Section 6.
5. **Footer** (y 5381).

### 5.5 Prayer Watch `/prayer-watch` (`382:9888`)
1. **Hero** (906): "THE WATCH CALENDAR / Somewhere on earth, it is always time to pray." + "Eight watches. Twenty-four hours… *Find your watch. Take your place.*" + glass Download + outline `See Live Events`. Right: photo `8ca3db…`, a floating gold watch card ("Live Now · 3am – 6am WAT · Warfare & Protection · 🌍 3,847 nations active") and the **Local Time** glass widget (hover variant). ScrollCue.
2. **The Eight Watches** (y 906, 1224): "Every hour is holy ground." + 4×2 grid of 317×424 cards (10 gap, radius 20, brown stroke). Card 1 is gold ("Live Now"); the rest are cream. Each card: status pill, time (Editor's Note Semibold Italic 34), title, "🌍 N praying" / "Starts in Xh Ym", `Join` (brown, or grey when not live), `Set Reminder` + `Add to Calendar`, and a roman numeral top-right.

   | # | Time | Title | State in design |
   |---|---|---|---|
   | I | 12 AM – 3 AM | Warfare & Protection | Live Now · 2,341 praying |
   | II | 3 AM – 6 AM | Consecration | Active · 241 |
   | III | 6 AM – 9 AM | Morning Prayer | Active · 1,203 |
   | IV | 9 AM – 12 PM | Kingdom Advancement | Active · 994 |
   | V | 12 PM – 3 PM | Intercession for Nations | Upcoming · starts in 3h 41m |
   | VI | 3 PM – 6 PM | Revival & Harvest | Upcoming · 6h 41m |
   | VII | 6 PM – 9 PM | Healing & Restoration | Upcoming · 9h 41m |
   | VIII | 9 PM – 11 PM | Night Watch | Upcoming · 12h 41m |

   **VIII ends at 11 PM, leaving 11 PM–12 AM uncovered; the home page also shows different times (e.g. Morning Prayer 6am–7am) [needs confirmation].** In cards II–IV, the Set Reminder / Add to Calendar buttons are grey (disabled) while Join is brown. **The state logic needs confirmation.**
3. **Commit to a Watch** (y 2130, 972): "Choose your hour. Hold it faithfully." + paragraph + Isaiah 62:6 quote box. Form panel (608×825, radius 40): "Active Now" pill, "Watch I / 12:00 AM – 3:00 AM / Warfare & Protection", Select Your Watch ("Watch 1 - !2AM - 3AM", **typo**), Your Time Zone ("Africa/Lagos - GMT+1" + `Auto-detect`), Reminder Preference (Email / App Notification / Both\*), `Commit to This Watch`. **Rest of the section not read.**
4. **Section 6** (y 3102–4207): **not read** (§10).
5. **Footer** (y 4207).

### 5.6 Resources Hub `/resources` (`404:871`)
1. **Hero** (1176): photo `83d283…` + white fade. "TOOLS THAT EQUIP INTERCESSORS / Everything You Need *To Pray Deeper.*" (second line gold) + paragraph + glass Download + filter chips (Prayer Guides / Soaking Sounds / Sermons / Fasting Plans; gold @ 8 % fill, brown @ 20 % stroke). Stat cards at right: "200+ Free Resources" (white) and "New / This week" (brown). Bottom: 4 resource cards (321×330) flush in a row, with CTAs Browse Guides → / Open Player → / Watch Now → / Start a Fast →.
2. **Featured** (y 1176, 738, brown): "✦ FEATURED THIS WEEK / Praying the Psalms — / *A 7-Day Scripture Journey*" + paragraph + tag pills (7 Days · Daily Psalms · Free PDF) + `Download Free Guide` (gold, inner icon circle). Right: guide preview card (340×538) with photo, "7-Day Guide" badge, day checklist (Day 1 Psalm 91 — Protection ✓, Day 2 Psalm 46 — Strength ✓, Day 3 Psalm 23 — Rest, "+ 4 more days…").
3. **CTA band** (y 1914, 243, cream): "Build your intercessor toolkit." + "All resources are free. No account required." + `Explore All Resources →` (brown).
4. **Footer** (y 2055).

### 5.7 Get Involved `/get-involved` (`407:2000`)
1. **Hero** (842): "GET INVOLVED / The movement grows / *because people give.*" + paragraph + anchor pills (gold): Volunteer · Donate · Contact. Large image at right (`3728bc…`, 957×957).
2. **Volunteer** (y 842, 871): "SERVE THE VISION / Your gift might not be prayer — *it might be the table that holds it.*" + paragraph + image card with the quote "'Carry the altar in a different way.'" **Volunteer form** (646 wide, radius 24): Full Name, Email, "How would you like to serve?" (chips: Content Writing / Translation / Regional Leadership / Tech / Media / Other), `Submit` (brown, full width).
3. **Donate** (y 1713, 1166, brown): "GIVE TO THE MOVEMENT / Every gift *keeps the altar burning.*" + paragraph. 4 GivingCards (🌍 Global Missions — *Selected* / 💻 Tech Development / 📡 Media Outreach / 🏠 Prayer Houses). Give Once | Give Monthly segmented toggle. Amount chips $10 / $25 / $50 / $100 / Custom + `Give Now`. "Powered by" Stripe · PayPal · Flutterwave. Banner "'The fire shall never go out.' — Leviticus 6:13".
4. **Contact** (y 2879, 1092, cream): "GET IN TOUCH / Questions, partnerships, or testimonies we are here." + "We read every message…". Contact details: ✉️ hello@vial.prayer · 🌍 vial.prayer · 📍 Global — 24 Time Zones. **Contact form:** Full Name, Email Address, Subject chips (General\* / Partnership / Testimony / Media / Tech), Message, `Send Message`. **Mailing list card:** "Stay connected." + email + `Subscribe`.
5. **Footer** (y 3888).

### 5.8 Shared: Nav & Footer
- **Nav** (1440×115, padding 29/104): logo (mark + "Vial"); links **About · Join The Movement · Prayer Wall · Prayer Watch · Resources Hub · Contact**; CTA `Download the Vial` (glass pill with gold circular arrow). Home hero: transparent (Default). Inner pages: **gold glass** (`Full Scroll`: `#C9A84C`@20 % + glass blur 14). The variant name implies the bar switches style on scroll.
- **Footer** (`365:8929`, 978 tall, gradient white → cream). Gold card (1401×656, radius 40) with a giant clipped "Vial" watermark. It contains:
  - Column 1: logo, tagline "A global altar — gathering the fragrance of intercession from every nation, filling heaven with the prayers of the saints.", and "'My house shall be called a house of prayer for all nations.' — Isaiah 56:7".
  - **Navigate:** About, Prayer Watches, Prayer Wall, Resources.
  - **Get Involved:** Join the Movement, Donate, Volunteer, Partner.
  - Store badges (outline cream).
  - Legal bar: "© 2026 VIAL · GOLDEN VIALS INITIATIVE · ALL RIGHTS RESERVED." + Privacy Policy · Terms of Use · Contact.

---

## 6. Prototype & animation audit

No prototype flows are defined (`flowStartingPoints` is empty), but these reactions exist:

| Trigger (node) | Action | Transition |
|---|---|---|
| Intro frame `199:9948`: mouse down | Navigate → Hero `239:7970` | Smart Animate, ease-out, **1.5 s** |
| Hero video `239:7971`: **on media end** | Navigate → Full page `239:8140` | Smart Animate, ease-out, **0.8 s** |
| Hero frame `239:7970`: mouse down | Navigate → `239:8140` | Smart Animate, ease-out, 1.5 s |
| Hero scroll button `412:2656`: click | Navigate → `239:8140` | Smart Animate, **cubic-bezier(0.43, −0.01, 0.14, 1)**, **2 s** |
| `Download Neutral` (all instances): hover | Change to hover variant `114:7816` | Smart Animate, ease-in, 0.8 s |
| `Local Time`: hover | Change to `390:13057` | Smart Animate, ease-out, 0.8 s |
| Inner-page ScrollCue: click | Scroll to (no destination set) | Scroll animate, "Gentle", 1.02 s |
| Full page `239:8140` root: click | Scroll to `239:8151` (node not located) | instant |

**Animation states vs. real sections.** The off-canvas copies inside the three Landing frames are Smart-Animate keyframes:
- *Nav*: y −230 → −210 (hidden) → 20 (visible) → −210 (hidden again).
- *Headline block*: x −1040 → 70 (visible) → −930 (exits left).
- *Side copy*: x 1561/1700 → 1061 (visible) → 1700 (exits right).
- *"Incense Rising"* (centre) → x 1545 (exits right); *"from the Nations"* (centre) → x −735 (exits left); text colour black → white.
- *Video*: 198×78 pill (centre) → 1404×978 card → 1722×1244 full-bleed.
- *"More Than an App" + bento*: y 1134/1140 (below fold) → y 220 (visible).

Exactly one copy of each is real content. **Recommended web translation:** a scroll-driven ("scrollytelling") pinned hero built with Motion. Progress 0 → 1 drives the three keyframes; an auto-advance on load or on video end follows the prototype's timing. Respect `prefers-reduced-motion` by jumping straight to the final state.

**Implied (not prototyped) interactions to implement:** nav style change on scroll; horizontal card carousel (home Section 4); stacked-card scroll (Prayer Wall); chip single-select states; Give Once / Monthly toggle; Local Time live clock; watch status/countdown logic; `Load More`; anchor scrolling on Get-Involved.

**Not defined in Figma:** hover / focus / active / disabled states for nav links, outline buttons, cards, inputs and chips (only the Download pill and Local Time have hover variants, and their contents were not read). Mobile menu. Error/success states for all forms.

---

## 7. Asset inventory

Images are referenced by Figma image hash. **None have been exported yet** (rate limit). All are raster fills, to be exported at original resolution.

| Hash (prefix) | Where | Suggested file |
|---|---|---|
| **VIDEO fill** (`239:7971`, `295:8862`, `199:9949`) | Home hero video | `public/media/hero.mp4` + `.webm` + poster. **The source video must be supplied or exported manually; the MCP cannot export video fills.** |
| `ed8a6cf9…` | Home bento 1 + Section 5 phone mockup (1598×1066) | `app-mockup.png` |
| `30a3342d…` | Bento 2, home resource card 1, Prayer-Wall card strips, Resources card 1 | `prayer-portrait-01.jpg` |
| `780ec90e…` | Bento 3 (nations) | `nations.jpg` |
| `10e2ea81…` | Bento 4 "Watch never goes dark" | `night-watch.jpg` |
| `40455686…` | Home Section 3 background | `why-vial-bg.jpg` |
| `8f163512…`, `c8f669e6…`, `2e89fd2c…` | Home watch carousel photos (`c8f669e6…` also Prayer-Watch hero card + Resources featured) | `watch-01..03.jpg` |
| `6e16ba71…`, `e68b9eee…` | Testimonial photos (Deborah, Esther) | `testimonial-deborah.jpg`, `testimonial-esther.jpg` |
| `c2a21523…`, `2e016a33…`, `194da84d…` | Resource cards 2–4 | `resource-sounds.jpg`, `resource-teaching.jpg`, `resource-fasting.jpg` |
| `47190027…` | Donation band image | `give-band.jpg` |
| `248810dc…`, `7cfb3c71…`, `55eba15b…` | Flutterwave, PayPal, Stripe logos | prefer official SVGs |
| `cf2dd450…` | About hero | `about-hero.jpg` |
| `33ebad6c…` | About "How it began" image + Get-Involved Leviticus banner | `altar-fire.jpg` |
| `7aa96754…` | About mission bg + Get-Involved volunteer card | `mission-bg.jpg` |
| `e6ebf196…` | Join hero | `join-hero.jpg` |
| `3920ca88…` | Prayer-Wall hero | `prayer-wall-hero.jpg` |
| `8ca3db60…` | Prayer-Watch hero | `prayer-watch-hero.jpg` |
| `83d28387…` | Resources hero | `resources-hero.jpg` |
| `3728bcd5…` | Get-Involved hero | `get-involved-hero.jpg` |
| `4e4b094f…` | ScrollCue animated badge (masked) | needs the original animation (GIF/Lottie/video?) |

**Vectors / icons:** final logo mark + wordmark (`353:8471`); eyebrow sparkle (radial-gradient vector, used ~40×); GoldSparkle; ArrowRight (1.5 px stroke); Iconly "Arrow – Down 2"; Donate arrow (rotated −45°); watch-card corner mark (73 px, likely the logo flame); check icon; scroll-down arrow; store badges (component `83:9595`, prefer official Apple/Google badge SVGs). **Emoji** are used as icons (🌍 💻 📡 🏠 ✉️ 📍). Keep them, or swap for an icon set **[needs confirmation]**.

**Asset organisation (proposed):**
```
public/
  brand/      logo.svg, logo-mark.svg, wordmark.svg, favicon assets, og-image.png
  media/      hero.mp4, hero.webm, hero-poster.jpg, scroll-cue.(webm|gif|json)
  images/
    home/ about/ join/ prayer-wall/ prayer-watch/ resources/ get-involved/ shared/
  partners/   stripe.svg, paypal.svg, flutterwave.svg
  stores/     app-store.svg, google-play.svg
app/fonts/    editors-note-*.woff2   (licensed files — to be supplied)
```

---

## 8. Responsive design

- **No tablet or mobile designs exist.** The iPad (`15:10277`) and iPhone (`15:10279`) frames are empty, and the UI/UX page is empty. Every frame is desktop 1440 px.
- **Responsive behaviour therefore has to be derived. That requires your sign-off.** Proposed approach (mobile-first Tailwind, breakpoints `sm 640 / md 768 / lg 1024 / xl 1280 / 2xl 1440`):
  - Fluid type with `clamp()`: H1 80 → ~44 px, H2 65 → ~38 px, intro display 90 → ~48 px. Body stays 16–18 px.
  - Max-width container 1300 px with side padding 20 → 40 → 100 px.
  - Multi-column grids collapse: bento 3-col → 2 → 1; mandate/step cards 3 → 1; watch grid 4 → 2 → 1; resource cards 4 → 2 → 1 (or horizontal scroll); testimonials 2 → 1; footer columns stack.
  - Forms: two-column field rows → single column below `md`.
  - Nav: links collapse into a menu sheet below `lg` (**not designed**).
  - Hero intro animation: simplified on small screens (video card fills the viewport; no 3-stage pin) **[needs confirmation]**.

---

## 9. Proposed Next.js architecture

**Current repo state** (`/workspaces/Vial/vial`): untouched `create-next-app` scaffold. Next **16.4.6**, React **19.3.0**, Tailwind **4.3.3** (CSS-first `@theme`, loaded through `@tailwindcss/turbopack`), TypeScript strict, ESLint 9 (`core-web-vitals` + `typescript`). `next.config.ts` enables `cacheComponents`, `partialPrefetching`, and `experimental.agentFeedback`. `AGENTS.md` requires reading `node_modules/next/dist/docs/` before coding; see §9.6 for the version-specific notes.

### 9.1 Routes
| Route | Figma frame | Notes |
|---|---|---|
| `/` | `199:9948`, `239:7970`, `239:8140` | animated hero |
| `/about` | `310:9042` | |
| `/join` | `356:8559` | application form |
| `/prayer-wall` | `369:9336` | request form, stacked cards |
| `/prayer-watch` | `382:9888` | watch grid, commit form, live clock |
| `/resources` | `404:871` | |
| `/get-involved` | `407:2000` | `#volunteer`, `#donate`, `#contact`. The nav "Contact" link and the footer Donate / Volunteer / Partner / Contact links point here. |
| `/privacy`, `/terms` | — | linked in the footer, **no design** |
| `not-found` | — | **no design** |

### 9.2 Folder structure
```
app/
  layout.tsx                 fonts, <SiteHeader/>, <SiteFooter/>, metadata
  globals.css                Tailwind v4 @theme tokens (colours, fonts, radii, shadows)
  page.tsx                   Home
  about/page.tsx
  join/page.tsx
  prayer-wall/page.tsx
  prayer-watch/page.tsx
  resources/page.tsx
  get-involved/page.tsx
  privacy/page.tsx  terms/page.tsx  not-found.tsx
  fonts/                     Editor's Note woff2 files (next/font/local)
components/
  layout/   SiteHeader, MobileNav, SiteFooter, Container, Section
  ui/       Button (glass | outline | solid-gold | solid-brown | rect), ArrowLink,
            Eyebrow, SectionHeading, Chip, ChipGroup, SegmentedToggle, StatusPill,
            TimePill, StoreBadges, Logo, ScrollCue, Field, TextInput, Textarea, Select,
            Checkbox, DatePicker
  cards/    BentoCard, WatchFeatureCard, WatchGridCard, PrayerRequestCard,
            TestimonialCard, ResourceCard, StepCard, GivingCard, StatCard, FeaturedGuideCard
  sections/ home/*, about/*, join/*, prayer-wall/*, prayer-watch/*, resources/*,
            get-involved/*, shared/ (TestimonialsSection, GiveSection, DonationWidget)
  motion/   Reveal, Stagger, PinnedHeroSequence, HorizontalScroller, CardStack
content/    nav.ts, watches.ts, testimonials.ts, prayer-requests.ts, resources.ts,
            giving.ts, features.ts (typed static data mirroring the Figma copy)
lib/        cn.ts, time.ts (watch status / countdown / timezone), validation.ts (form schemas)
app/actions/ (or app/**/actions.ts) server actions for forms — stubbed until backends exist
```

### 9.3 Styling
- Tailwind v4 `@theme` tokens: `--color-gold`, `--color-brown`, `--color-cream`, `--color-black`, …; `--font-display` (Editor's Note), `--font-sans` (DM Sans); radius tokens 10/16/20/24/40/60/full; shadow tokens (`--shadow-card` = 0 9px 30px rgb(0 0 0/.2), …).
- `.glass-gold` / `.glass-brown` utilities for the GLASS effect (backdrop blur + translucent fill + inner highlight).
- Remove the scaffold's Geist fonts, dark-mode media query, and starter assets **when implementation starts** (this is a replacement; nothing gets deleted now).

### 9.4 Dependencies (proposed, for approval)
| Package | Why |
|---|---|
| `motion` (Motion for React) | Smart-Animate-style layout transitions, the pinned hero sequence, scroll-linked reveals, stacked cards, hover springs |
| `clsx` + `tailwind-merge` | variant class composition |
| `zod` | shared client/server form validation |
| *(optional)* `lenis` | smooth scrolling to match the cinematic feel. Skip unless you want it. |
| *(dev)* `@playwright/test`, `vitest` + `@testing-library/react`, `@axe-core/playwright` | testing (§9.7) |

No CMS, payments, or email provider is assumed. Forms post to stubbed server actions until you choose providers (§10).

### 9.5 Animation strategy
- **Hero sequence:** a pinned `PinnedHeroSequence` (sticky container ≈300 vh). `useScroll` progress drives three keyframes that reproduce the Figma positions (§6). Optional autoplay: start the 1.5 s intro → hero transition on load, and advance on video `ended`. Easing: ease-out for the intro; `cubic-bezier(.43,-.01,.14,1)` for the 2 s scroll-button transition.
- **Section reveals:** fade + 24–40 px rise, 0.8 s ease-out, staggered 80–120 ms, triggered once at ~20 % in view.
- **Hover:** Download pill hover transition 0.8 s (exact end state to confirm once the variant is read). Cards get a subtle lift or scale.
- **Home watch carousel:** horizontal scroll with drag / scroll-snap, or scroll-linked translate.
- **Prayer-Wall card stack:** sticky stacked cards that scale slightly as the next card arrives.
- **Nav:** transparent → gold glass after leaving the hero (`Default` → `Full Scroll`).
- **Accessibility:** all motion gated on `prefers-reduced-motion`; never hide content that depends on animation completing.

### 9.6 Next.js 16.4 notes (from `node_modules/next/dist/docs/`)
- **Typed routes:** `LayoutProps<'/'>`, `PageProps<'/x'>` and `RouteContext` are global helpers generated by `next dev`, `next build` or `next typegen`. `params` and `searchParams` are **Promises** and must be awaited.
- **`cacheComponents: true`:** static marketing content prerenders automatically, with no `'use cache'` needed. During prerender, **`new Date()`, `Date.now()` and `Math.random()` are build errors**. That affects:
  - the footer "© year": hard-code 2026 as in the design, or use a client component;
  - the watch countdown / live status;
  - the Local Time clock.

  Put those in Client Components or behind `connection()` + `<Suspense>`. `usePathname` (active nav link) is fine on static routes. `useSearchParams` needs `<Suspense>`.
- **Activity-preserved navigation:** previous routes stay mounted but hidden. **Pause the hero `<video>` in a `useLayoutEffect` cleanup.** Reset form success messages yourself. In tests, prefer `getByRole` / `getByLabel`.
- **`partialPrefetching`:** a default `<Link>` prefetches the route shell (production only). This is fine for static pages.
- **Fonts:** `next/font/google` `DM_Sans` (variable, has an `opsz` axis) + `next/font/local` for Editor's Note. Expose both as CSS variables on `<html>` and map them in `@theme inline`. Remove the scaffold's `body { font-family: Arial }` override.
- **Images:** `priority` is **deprecated**; use `preload` (or `loading="eager"` / `fetchPriority="high"`) for the hero poster and LCP images. `images.qualities` defaults to `[75]`; add values in `next.config.ts` if we want e.g. 90 for photography. Static imports get automatic blur placeholders.
- **Video:** no built-in component. Use `<video autoPlay muted loop playsInline preload="none" poster>` with MP4 + WebM sources, a fixed aspect ratio, and captions where relevant.
- **Metadata:** set `metadataBase`, `title.template`; use `export const viewport` for theme colour. Use `opengraph-image.png` (< 8 MB).
- **Forms:** `'use server'` actions + `useActionState` (`[state, formAction, pending]`). `next/form` is only for GET navigation. Validate every action, because each one is a public POST endpoint. The default body limit is 1 MB.
- **View transitions:** built in through React 19.3 `<ViewTransition>` and `<Link transitionTypes>`. These can give page-to-page crossfades. There is no built-in scroll animation, so Motion is still needed.
- **Renamed or removed:** middleware → `proxy.ts`; `next lint` removed (run `eslint` directly, which `package.json` already does); smooth scrolling needs `data-scroll-behavior="smooth"` on `<html>` if CSS `scroll-behavior: smooth` is used.
- **`experimental.agentFeedback`:** `next dev` writes a managed `nextjs-agent-feedback` block into `AGENTS.md` (which explains the uncommitted AGENTS.md edits).
- **Tailwind:** the project's `@tailwindcss/turbopack` loader rule is **not documented** in the bundled docs (they show `@tailwindcss/postcss`). Keep it while it works, and fall back to the documented PostCSS setup if CSS fails to build.

### 9.7 Testing & QA
- **Static checks:** `tsc --noEmit`, `eslint`, `next build` (catches cache-components violations).
- **Visual:** Playwright screenshots at 1440 px compared against Figma frame exports per section (needs the Figma screenshots, §10). Plus 390 / 768 / 1024 px snapshots once the responsive rules are approved.
- **Behaviour:** Playwright e2e for nav links and anchors, chip selection, toggles, form validation and success states, reduced-motion path, hero sequence end state.
- **Unit:** Vitest for `lib/time.ts` (watch status, countdown, time-zone conversion) and the zod schemas.
- **Accessibility:** axe on every route. Colour-contrast check: **gold `#C9A84C` text on white fails WCAG AA for body text (~2.3:1)**, so it is OK for large display words only. Keyboard navigation, focus rings (not designed), form labels and errors.
- **Performance:** Lighthouse budgets (LCP < 2.5 s on the hero: poster image with priority, video lazy-started), image sizing through `next/image`, fonts with `display: swap` and subsetting.

### 9.8 Milestones
| # | Milestone | Deliverables |
|---|---|---|
| M0 | **Unblock** | Resolve §10: Figma call quota, remaining reads + screenshots + asset exports, Editor's Note font files, hero video, responsive decisions |
| M1 | Foundation | Tokens in `globals.css`, fonts, Container/Section, Button family, Eyebrow, SectionHeading, Logo, SiteHeader (both styles), SiteFooter, base layout, metadata, asset pipeline |
| M2 | Home (static) | All home sections in static form, shared Testimonials / Give / Donation components |
| M3 | Home motion | Pinned hero sequence + video, reveals, carousel, nav scroll state |
| M4 | About + Join | Including the application form (client + server validation, stubbed submit) |
| M5 | Prayer Wall + Prayer Watch | Card stack, request form, watch grid with live status / countdown / time-zone logic, commit form, Local Time widget |
| M6 | Resources + Get Involved | Filters, featured guide, volunteer / donate / contact / newsletter forms, anchor nav |
| M7 | Responsive pass | Tablet / mobile per the approved rules, mobile nav |
| M8 | QA & polish | a11y, performance, visual diff vs. Figma, cross-browser (Safari backdrop-filter), reduced motion |
| M9 | Integrations (when chosen) | Form backends (email/CRM), payments (Stripe / PayPal / Flutterwave), store links, analytics |

---

## 10. Gaps & access limitations

**Blocking / important**
1. **Figma MCP rate limit (Starter plan).** These reads were blocked and are still outstanding:
   - Home `239:8140`: rest of Section 7, **all of Section 8 (≈2 320 px)**, the home footer frame, and node `239:8151`.
   - Prayer Watch `382:9888`: rest of Section 7 and **all of Section 6** (y 3102–4207).
   - Component masters: **Nav Bar** (`114:7890`, `114:7915` and any other variants; link styles, logo sizing), **Download Neutral hover** (`114:7816`), **Local Time** (`390:13055` / `390:13057`).
   - Legacy `Landing page` component set `118:8022`.
   - Brand deck slides: Mission & Vision, logo construction / clear-space, typography slides, social, photography guide.
   - **Screenshots** of all frames except `239:7970`.
   - **All asset exports** (images, logo SVGs, icons).
2. **Hero video:** the frame uses a VIDEO fill. The source file has to be supplied, or exported from Figma by hand.
3. **Editor's Note font:** commercial and not on Google Fonts. Licensed WOFF2 files are needed (Medium, Medium Italic, Italic, Semibold, Semibold Italic).
4. **No responsive designs:** the tablet and mobile frames and the UI/UX page are empty.
5. **No interaction states** beyond two hover variants: no focus, active, disabled, error or success states; no mobile menu; no loading states.

**Content / design inconsistencies to confirm**
- Join form: "Email Address" field shows placeholder "Country"; "Share your journey" drawn as a dropdown; checkbox layer mentions a **$19.99 background-check charge** that the visible text does not.
- Watch times: Watch VIII is 9–11 PM (gap until midnight); the home carousel times differ from the Prayer Watch page; typo "!2AM".
- One Cormorant Garamond usage (Resources featured card).
- Form type sizes scaled by ×1.145 (import artefact).
- Inconsistent side margins (68–120 px).
- "Prayer Watch" (nav) vs. "Prayer Watches" (footer); "Resources Hub" vs. "Resources".
- Get-Involved headings reuse a layer name from another heading. The rendered text is correct.

**Product decisions needed (not in the design)**
- Where forms submit (email service, CRM, database); whether the Prayer Wall / watch counts are live data or static.
- Payment provider(s) for "Give Now" / "Donate" (Stripe / PayPal / Flutterwave are shown).
- App Store / Google Play URLs; social links (none in the design).
- Privacy Policy and Terms content; domain (contact shows `vial.prayer` / `hello@vial.prayer`).
- Analytics.
