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

---

## 2026-11-26 — Landing-page images from Figma
- Exported the original source images through the Figma MCP (`download_assets`, read-only) and wired them into `content/assets.ts`:
  - Watch carousel: `watch-01.jpg` (8f163512, node 259:474), `watch-02.jpg` (c8f669e6), `watch-03.jpg` (2e89fd2c, node 259:510).
  - Donation band: `give-band.jpg` (47190027, node 292:8696). Also used on About.
  - Testimonials: `testimonial-deborah.jpg` (6e16ba71), `testimonial-esther.jpg` (e68b9eee).
- Converted PNG → progressive JPEG (q85). Alt text rewritten to describe the actual photos.
- **Still pending on home:** resource cards `resourceSounds` (c2a21523), `resourceTeaching` (2e016a33), `resourceFasting` (194da84d), and the Flutterwave logo (node 305:8903). The Starter-plan MCP limit was hit again before these could be exported. Resource-card nodes: 288:8633, 288:8637, 288:8642.
- Note: the Figma home frame now contains designs for Section 7 (rest) and Section 8 (Prayer Wall cards). The site still shows placeholders there.

---

## 2026-11-26 — Landing-page images from Figma (exact treatment)
Source: Figma MCP `download_assets` (read-only) on 239:8140 and individual nodes. Every image's placement was **matched numerically against Figma's own renders** (correlation search), not eyeballed.

**Images now live**
| Where | File | Figma | Treatment |
|---|---|---|---|
| Watch carousel ×3 | `images/home/watch-01.jpg`, `images/shared/watch-02.jpg`, `images/home/watch-03.jpg` | 8f163512, c8f669e6, 2e89fd2c | cover, `object-position 50% 72%`, **gold Color blend** |
| Donation band (home + About) | `images/shared/give-band.jpg` | 47190027 / 292:8696 | cover, `50% 65%`, **gold Color blend** |
| Testimonials | `testimonial-deborah.jpg`, `testimonial-esther.jpg` | 6e16ba71, e68b9eee | natural colour |
| Prayer Wall cards (home §8 + /prayer-wall) | `images/shared/prayer-hands.png` | 30a3342d | 185×512 strip, starts 76px above the text, clipped by the card bottom |
| Resource card 1 | `prayer-hands.png` | 30a3342d | 320px wide at (87, −52) on the 321×330 card |
| Resource card 2 | `images/shared/resource-sounds.png` | 95be9632 | gold Color blend baked in; 180px wide at (142, 64) |
| Hero poster | `media/hero-poster.jpg` | 62515ae6 (4K still) | — |
| Powered By | `partners/{flutterwave,paypal,stripe}.png` | 7cfb3c71, 55eba15b; Flutterwave from Wikimedia Commons (official mark) | — |

- "Gold tint" = Figma layer #C9A84C in **Color** blend at 100 %. Reproduced with `MediaFrame tint="gold"` (CSS `mix-blend-mode: color`); mean error vs the Figma export ≈ 0.9 %.
- Home §7 (story + 01–03) and §8 (Prayer Wall stack) were built from the updated Figma frame; the placeholders are gone. The stack is shared with /prayer-wall (`PrayerWallStack`).
- Resource cards were redesigned to the new Figma style (gold card + 3D gold object), which also applies on /resources.
- Watch cards: button reads "Join This Watch" when live, otherwise "Set Reminder" (→ /prayer-watch#commit), as in Figma.

**Still missing** (Starter-plan MCP limit): resource art for *Teaching & Sermon* (gold book) and *Fasting Plans*. Nodes 288:8637 and 288:8642.
- Testimonial photos ("He hears. He answers.", also on /prayer-wall): Figma's "Rectangle 40488" is a vector whose left edge is a diagonal leaning right at the top (116px in at y=0, 0 at y=458 on the 350×458 frame), with rounded corners. Reproduced with an SVG `clipPath` (objectBoundingBox) + drop-shadow on a wrapper. The photo now overlays the right 53 % of the card so the quote keeps Figma's 297px measure. Below `sm` the photo stacks on top as a plain rounded image.

### Section-by-section pass against the Figma render (239:8140)
Compared every home section side by side with Figma's full-frame render at 1440px; section heights now match within ~10px.
- **He hears (§6):** heading breaks onto 2 lines as in Figma. Cards are 659px wide from x=120 and the row runs off the right edge (horizontal scroll), as designed.
- **Prayer Wall (§8):** heading on 3 lines; card heights 550/520/490 with ~60px gaps; counts shown as in Figma ("1221", no separator).
- **Story (§7):** 01–03 cards use the gold **left** edge + soft shadow from Figma (no full border).
- **Resources (§9):** 1329px row of 321px cards; titles break onto 2 lines as in Figma (`cardTitle`).
- **Watch cards (§4):** title box 277px ("Morning Prayer" wraps as in Figma); corner mark is now a globe line icon (Figma 257:430). The icon is redrawn, since the vector couldn't be exported (MCP limit).
- **Footer:** "Vial" watermark moved/scaled to Figma's position.

Intentionally not changed (open decisions):
- Watch card times/status: Figma shows 9am–12pm "Live Now" / "Active". The site keeps the central schedule and live status (decision #10; "Active" undefined).
- Display-font glyphs differ until Editor's Note is supplied (Cormorant is the stand-in).

## 2026-11-26 — Globe icon, resource art, responsive pass
- **Watch-card globe:** replaced the redrawn icon with the exact Figma vector (257:430), extracted from the card-frame SVG Figma exported (`9e7b0e7b…`).
- **Resource cards:** now keep Figma's 321×330 proportions at every width (`aspect-[321/330]`), so the object art scales with the card instead of being cropped. /resources no longer forces a fixed height.
- **Still missing:** art for *Teaching & Sermon* (288:8637) and *Fasting Plans* (288:8642). The Figma MCP Starter limit still blocks the export.

### Responsive pass (all 7 routes at 320 / 375 / 414 / 768 / 1024 / 1280 / 1440 / 1920)
Automated check: no horizontal page overflow, no element past the viewport, no console errors at any width. Visual review at 375 / 768 / 1024 / 1280.
- Header: full nav from `xl` (1280); menu button below. At 1024 the six links were wrapping onto two lines.
- Footer: below `xl` the "Vial" watermark sits at the bottom of the card (it overlapped the link columns); 4-column layout from `xl`, 2×2 below.
- Inner heroes with a side image (Prayer Watch, Get Involved): copy limited to the left half between 1024 and 1440 (heading ran under the image). From 1440 the Figma geometry is used.
- Home bento: "The Watch Never Goes Dark." scales and wraps below `xl` (it was clipped).
- Resource grids: 1 → 2 → 4 columns (4 from `xl`).
- Watch feature cards: photo pinned to the card bottom, so the cards line up on tablet.
- Prayer Watch grid card: buttons wrap at 320px. The commit section's column no longer grows past the viewport.
- Get Involved newsletter: the email field collapsed to ~20px tall on mobile (`flex-1` in a column); fixed.
- Prayer Wall page headings use the Figma 3-line break.

## 2026-11-26 — Hero video hosted by URL
- The 128 MB 4K master (`public/Upscaled hero video.mp4`, Git LFS) was replaced by a link. Compressed to 1080p / 30 fps / H.264 / no audio (the video is muted) / faststart: **4.0 MB**, visually identical at display size.
- Hosted on the repo's **`media` branch** (media only, not merged into main) and served by **jsDelivr**:
  `https://cdn.jsdelivr.net/gh/helloibjstudio-create/Vial@89dc091b732cd7105435bfe0d78949f88dd084f5/vial-hero-1080p.mp4`
  Verified: `content-type: video/mp4`, range requests (206), CORS `*`, plays in the hero. Pinned to the commit, so the CDN caches it permanently.
- Override without code changes: `NEXT_PUBLIC_HERO_VIDEO_URL` / `NEXT_PUBLIC_HERO_VIDEO_WEBM_URL` (`content/assets.ts`).
- The original master was moved to `/media-source/` (git-ignored) so it stays on disk but is never committed or served again. Older commits still hold it in LFS.

## 2026-11-26 — Scroll-driven hero intro (phone + desktop)
- The "Incense Rising / from the Nations" intro now **holds until the visitor scrolls**, and the first screen of scrolling opens the video pill to full screen (words exit, headline and nav enter). The second screen runs stage 2 → 3 ("More Than an App"), then the page continues. It replays whenever you return to the top (no once-per-session autoplay). Click/tap on the intro plays the opening.
- Layout: the stage-2 copy sticks inside a 200lvh track (`data-hero-track`); one scrubbed GSAP timeline drives both phases. With reduced motion the track collapses to 100lvh and the hero is static.
- Root-cause fix: `gsap.matchMedia().add()` only fires when one of its queries matches. The old `{reduce, lg}` conditions never matched on phones (< 1024px, motion allowed), so the intro animation never ran on mobile. Both motion states are now listed.
- Header: on home, the "scrolled"/auto-hide thresholds start after the opening screen, so the transparent nav sits over the full-screen video as in Figma.
- Follow-up: the opening now plays **once per page load**. When it completes, the extra screen of scroll is removed (track → 100lvh) and the scroll position shifted to match, so scrolling back to the top shows the open video. A reload at the top shows the intro again. Landing mid-page (restored scroll) skips it. Click/tap anywhere on the intro opens it.

## 2026-11-26 — Smoothness pass (hero video + animation)
Measured with Playwright at 4× CPU throttle (long-animation-frame + rAF timing). Script work was small; the cost was compositing/decoding:
- **Heavy SVGs replaced:** the bento + Why-VIAL images were Figma SVG exports embedding 1.3–16 MP PNGs (`fire.svg` 2607×4094 for a 414×563 card, `iphone-1.svg` 4000×2668 for 413×334). next/image can't optimise SVG, so each was decoded at full size right as the intro animates. Rasterised at 2× display size to `images/home/bento-*.png` + `why-vial-bg.jpg` (~1.3 MB total, down from 12.4 MB, and served as WebP by next/image). The SVGs were removed.
- **Blur over the playing video:** removed the invisible 2px backdrop blur on the four bento cards; the header's dark state uses a 12px blur with a denser tint instead of 24px (re-blurred every video frame).
- **Video:** clip-path is cleared (`none`) once the intro has opened; the video only plays while the hero is on screen (IntersectionObserver).
- **Scroll:** scrub 0.6 → 0.4 (tracks the scroll more tightly); `ignoreMobileResize` so the phone address bar doesn't trigger recalculation mid-scroll; header scroll handler throttled to one update per frame.
- Result (same throttled test): ~30–40% more frames rendered while scrolling the hero, on desktop and phone. Production build verified; behaviour unchanged.
