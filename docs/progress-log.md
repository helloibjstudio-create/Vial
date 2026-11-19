# VIAL website — development progress log

Spec: `docs/vial-design-audit.md`. App: `vial/` (Next.js 16.4.6, React 19.3, Tailwind 4.3, TypeScript).
Nothing has been committed or pushed. The Figma file has not been touched, and no Figma calls were made during development (decision #1).

---

## 2026-11-17 — M0 to M9 (first full pass)

### M0 — Preparation
- Re-read `AGENTS.md` and the installed Next 16.4 docs (audit §9.6). Existing configs are unchanged (`next.config.ts`, `tsconfig.json`, `eslint.config.mjs`, Tailwind turbopack loader).
- Added runtime dependencies: `gsap`, `@gsap/react`, `zod`, `clsx`, `tailwind-merge`. No other runtime or dev dependencies were added.
- QA tooling (Playwright + Chromium) is installed in the session scratchpad only, not in the project.
- The starter files in `public/` were left in place (unused).

### M1 — Design system (`app/globals.css`, `app/fonts.ts`, `lib/cn.ts`)
- Colour, type-scale, radius, shadow and easing tokens are defined in Tailwind v4 `@theme`, as given in audit §3.
- Utilities: `container-vial` (1440 canvas, about 100px gutters), `glass-gold` / `glass-gold-strong` / `glass-brown` / `glass-brown-soft` (CSS take on Figma's GLASS effect), and section gradients.
- Fonts:
  - DM Sans (variable, with the `opsz` axis).
  - **Cormorant Garamond as the temporary display face** (decision #3). Swapping it is a single-file change in `app/fonts.ts`; the instructions are written there.
- Display headings use `capitalize` to reproduce Figma's TITLE text case.

### M2 — Shared components
- `components/layout/SiteHeader.tsx`: transparent "overlay" style on the home hero, gold-glass style elsewhere. It hides when scrolling down and returns when scrolling up. Includes a **mobile menu** (decision #6) with focus trap, Escape to close, scroll lock and focus return.
- `components/layout/SiteFooter.tsx`: built to the Figma `footer` component, including the watermark, columns, store badges and legal bar.
- `components/ui/*`:
  - `Button` (glass / outline / gold / brown / rectangular), `ArrowLink`.
  - `Eyebrow`, `Display`, `SectionHeading`, `Em`.
  - `MediaFrame` (asset placeholders), `Logo` / `BrandMark`, `StoreBadges`.
  - Pills, `ChoiceGroup` (native radio/checkbox chips), form `Field`s, `ScrollCue`, `ComingSoonButton`, `PendingDesign`.
- `components/cards/*`: watch cards (live status), resource, testimonial, numbered, and prayer-request cards.
- `components/motion/Reveal.tsx`: fade and rise on entry. Content is hidden only when scripting is on and motion is allowed.

### M3–M6 — Pages (all 7 approved routes; every page is static-prerendered)
| Route | Frame | Notes |
|---|---|---|
| `/` | 199:9948 → 239:7970 → 239:8140 | GSAP three-stage hero; sections 3, 4, 5, 6, 9, 10. **Section 7 is partial and Section 8 is pending** (documented placeholders). |
| `/about` | 310:9042 | All sections |
| `/join` | 356:8559 | Application form. Email placeholder is now "Email Address" (decision #8); the $19.99 charge is **not** shown (decision #9). |
| `/prayer-wall` | 369:9336 | Sticky stacked request cards, request form, testimonials |
| `/prayer-watch` | 382:9888 | Hero card + local time, 8-watch grid, commit form. **Section 6 is pending.** |
| `/resources` | 404:871 | Category chips jump to and highlight cards, featured guide, CTA band |
| `/get-involved` | 407:2000 | Volunteer, donate and contact forms, newsletter, `#volunteer` / `#donate` / `#contact` anchors |

- **Watch schedule is centralised** in `content/watches.ts` (decision #10). The home carousel, grid, hero card and commit form all read from it.
  - Times are taken verbatim from the Prayer Watch frame and anchored to WAT.
  - Watch VIII ends at 23:00. The 23:00–24:00 gap is **not** filled; it is recorded in `scheduleGaps`, and the UI shows "Between watches" during that hour.
  - Statuses are computed on the client: **Live Now** for the current window, otherwise **Upcoming** with a countdown.
- **Integrations are stubbed** (decision #7). All forms post to server actions in `app/actions/forms.ts`, which validate with Zod (`lib/schemas.ts`) and return a message without storing or sending anything. Each one has a `TODO(integration)` marker. "Give Now" / "Donate" report that no payment was taken.
- "Add to Calendar" works without a backend: it generates a daily recurring `.ics` file with a 15-minute alarm.

### M7 — Responsive
Every page was built mobile-first and checked at 390, 768 and 1440 px. There is no horizontal overflow on any route.
- Bento: 1 → 2 → 3 columns.
- Watch grid: 1 → 2 → 4 columns.
- Home carousel: scrolls horizontally with snapping below 1440px, and bleeds off both edges as in Figma at 1440px and wider.
- Forms: one column on narrow screens.
- Footer columns stack.
- Mobile nav replaces the links below `lg`.

### M8 — Animation (audit §6)
- **Hero, stage 1 → 2:** the video pill (198×78, centred) expands to the inset card (33/18/13px, radius 40; 12px / radius 28 on mobile). The nav drops in, the headline enters from the left, the side copy from the right, and the intro words exit to either side. **1.5s ease-out**, starting after a 1.1s hold.
- **Stage 2 → 3:** driven by scroll over one viewport height. The media goes full-bleed, a black fade comes up, the hero copy exits and "More Than an App" rises into view. The gold cue scrolls there over **2s with `cubic-bezier(.43,-.01,.14,1)`** (GSAP CustomEase).
- An inline `<head>` script sets the intro state before first paint, so there is no flash. The intro plays once per browser session; any click, wheel, touch or key skips it.
- Other motion:
  - Download pill hover: 0.8s ease-in on the icon (the end state is assumed; see open items).
  - Section reveals, Local Time widget hover lift, sticky card stack, nav hide/show.
- **Reduced motion:** the intro and scroll scene are skipped, reveals and transitions are disabled, and smooth scrolling is turned off.

### M9 — QA
- `tsc --noEmit` passes. `eslint .` reports 0 problems. `next build` succeeds with 10/10 pages static.
- 37 automated browser checks all pass, with no console errors. They cover:
  - all routes and internal links;
  - form validation errors, input kept after an error, and success messages;
  - the email placeholder, and the $19.99 text being absent;
  - the commit panel updating with the selected watch, and the `.ics` download;
  - opening, closing and navigating with the mobile menu;
  - intro play, skip and once-per-session; the reduced-motion path.
- Visual comparison: compared against the only Figma screenshot available (hero `239:7970`); the layout, type and positions match closely. Every other frame was checked against the audit spec values only, because no other Figma screenshots exist yet.

---

## Missing assets (all registered in `content/assets.ts`, shown as labelled placeholders)
- Hero **video**: set `heroVideo.src` (MP4) and optionally `webm`.
- About 23 photographs (Figma image IDs are listed per entry, with suggested `/public` paths).
- Final **logo** SVG (node 353:8471). Until then the brand sparkle stands in for the mark next to the "Vial" wordmark.
- **Editor's Note** WOFF2 files.
- Official App Store / Google Play badges and links; Stripe, PayPal and Flutterwave logos; the animated scroll-cue asset (image 4e4b094f…).

## Unresolved design decisions / pending Figma reads
1. Home Section 7 (rest of it) and Section 8; Prayer Watch Section 6 (placeholders in place).
2. Nav Bar master (link styles on inner pages are assumed **brown on gold glass**), the Download pill's hover variant, and the Local Time widget contents (built as "Your local time" + clock + time zone).
3. The meaning of the "Active" watch status in the design (not inferred), and the 23:00–24:00 schedule gap.
4. Destinations for Browse Guides / Open Player / Watch Now / Start a Fast, Download Free Guide, Explore All Resources and Load More. These use clearly labelled "coming soon" behaviour.
5. Privacy Policy and Terms pages (no route was approved; the footer shows them as plain text).
6. "See Live Events" scrolls to the watch grid, and "Share a Testimony" goes to the contact form, because neither has its own design.
7. Accessibility notes from the design:
   - Gold text on white fails AA for body text (it is only used at display sizes).
   - The glass Download pill has low contrast on light backgrounds; it was kept as designed.
8. The Figma intro advances on click or when the video ends; on the web it auto-plays after a short hold. When the video is supplied, advancing on `ended` can be added.
