/**
 * Asset registry — every image / video used on the site is declared here.
 *
 * Source of truth: docs/vial-design-audit.md §7. The original files have NOT been
 * exported from Figma yet (MCP rate limit), so `src` is `null` and the UI renders a
 * clearly-labelled branded placeholder (components/ui/MediaFrame.tsx).
 *
 * To add a real asset: drop the file under /public (see suggested path) and set
 * `src`. Nothing else needs to change.
 */

export type AssetTone = "dark" | "warm" | "light" | "gold" | "ghost";

export interface ImageAsset {
  /** Public path, e.g. "/images/home/why-vial-bg.jpg". `null` until exported. */
  src: string | null;
  alt: string;
  /** Figma image hash prefix (for export) or node id. */
  figma: string;
  /** Suggested destination path once exported. */
  suggestedPath: string;
  /** Placeholder palette that matches the photo's role in the layout. */
  tone: AssetTone;
  /** Intrinsic size when known (needed by next/image for non-fill usage). */
  width?: number;
  height?: number;
}

const asset = (a: ImageAsset) => a;

export const assets = {
  // ---------- Brand ----------
  logoMark: asset({
    src: "/Layer 2.svg",
    alt: "VIAL mark — a vial holding a gold flame",
    figma: "node 353:8471 (footer logo group)",
    suggestedPath: "/brand/logo-mark.svg",
    tone: "gold",
  }),

  // ---------- Home ----------
  heroVideoPoster: asset({
    src: null, // poster IMAGE only (shown while the video loads), e.g. "/media/hero-poster.jpg"
    alt: "A person kneeling in prayer in a dimly lit room",
    figma: "VIDEO fill on 239:7971 (poster frame)",
    suggestedPath: "/media/hero-poster.jpg",
    tone: "dark",
  }),
  appMockup: asset({
    src: "/images/shared/app-mockup.png", // full mockup, extracted from iphone-1.svg
    alt: "The VIAL app shown on a phone",
    figma: "ed8a6cf9…",
    suggestedPath: "/images/shared/app-mockup.png",
    tone: "ghost",
  }),
  /** Bento card 1 crop (Figma export, 413×334, sits at the bottom of the card). */
  bentoPhone: asset({
    src: "/iphone-1.svg",
    alt: "The VIAL app shown on a phone",
    figma: "ed8a6cf9… (bento crop)",
    suggestedPath: "/iphone-1.svg",
    tone: "ghost",
  }),
  prayerPortrait: asset({
    src: "/Pray.svg",
    alt: "Hands folded in prayer",
    figma: "30a3342d…",
    suggestedPath: "/images/shared/prayer-portrait-01.jpg",
    tone: "warm",
  }),
  nations: asset({
    src: "/earth.svg",
    alt: "Believers from many nations",
    figma: "780ec90e…",
    suggestedPath: "/images/home/nations.jpg",
    tone: "warm",
  }),
  nightWatch: asset({
    src: "/fire.svg",
    alt: "A candle burning through the night watch",
    figma: "10e2ea81…",
    suggestedPath: "/images/home/night-watch.jpg",
    tone: "dark",
  }),
  whyVialBg: asset({
    src: "/hand.svg",
     alt: "Golden light over a gathering in worship",
    figma: "40455686…",
    suggestedPath: "/images/home/why-vial-bg.jpg",
    tone: "gold",
  }),
  watch01: asset({
    src: null,
    alt: "Intercessor praying",
    figma: "8f163512…",
    suggestedPath: "/images/home/watch-01.jpg",
    tone: "warm",
  }),
  watch02: asset({
    src: null,
    alt: "Intercessor praying at dawn",
    figma: "c8f669e6…",
    suggestedPath: "/images/shared/watch-02.jpg",
    tone: "warm",
  }),
  watch03: asset({
    src: null,
    alt: "Morning prayer",
    figma: "2e89fd2c…",
    suggestedPath: "/images/home/watch-03.jpg",
    tone: "warm",
  }),
  testimonialDeborah: asset({
    src: null,
    alt: "Portrait of Deborah",
    figma: "6e16ba71…",
    suggestedPath: "/images/shared/testimonial-deborah.jpg",
    tone: "warm",
  }),
  testimonialEsther: asset({
    src: null,
    alt: "Portrait of Esther",
    figma: "e68b9eee…",
    suggestedPath: "/images/shared/testimonial-esther.jpg",
    tone: "warm",
  }),
  resourceSounds: asset({
    src: null,
    alt: "Soaking sounds — instruments at rest",
    figma: "c2a21523…",
    suggestedPath: "/images/shared/resource-sounds.jpg",
    tone: "warm",
  }),
  resourceTeaching: asset({
    src: null,
    alt: "A teacher sharing a message",
    figma: "2e016a33…",
    suggestedPath: "/images/shared/resource-teaching.jpg",
    tone: "warm",
  }),
  resourceFasting: asset({
    src: null,
    alt: "A simple table set for a fast",
    figma: "194da84d…",
    suggestedPath: "/images/shared/resource-fasting.jpg",
    tone: "warm",
  }),
  giveBand: asset({
    src: null,
    alt: "Hands lifted in worship",
    figma: "47190027…",
    suggestedPath: "/images/shared/give-band.jpg",
    tone: "gold",
  }),

  // ---------- About ----------
  aboutHero: asset({
    src: null,
    alt: "An open Bible in warm light",
    figma: "cf2dd450…",
    suggestedPath: "/images/about/about-hero.jpg",
    tone: "light",
  }),
  altarFire: asset({
    src: null,
    alt: "Fire burning on an altar",
    figma: "33ebad6c…",
    suggestedPath: "/images/shared/altar-fire.jpg",
    tone: "gold",
  }),
  missionBg: asset({
    src: null,
    alt: "A crowd gathered in prayer",
    figma: "7aa96754…",
    suggestedPath: "/images/shared/mission-bg.jpg",
    tone: "dark",
  }),

  // ---------- Inner page heroes ----------
  joinHero: asset({
    src: null,
    alt: "An intercessor at prayer",
    figma: "e6ebf196…",
    suggestedPath: "/images/join/join-hero.jpg",
    tone: "light",
  }),
  prayerWallHero: asset({
    src: null,
    alt: "Prayer requests gathered on a wall",
    figma: "3920ca88…",
    suggestedPath: "/images/prayer-wall/prayer-wall-hero.jpg",
    tone: "light",
  }),
  prayerWatchHero: asset({
    src: null,
    alt: "An intercessor keeping watch",
    figma: "8ca3db60…",
    suggestedPath: "/images/prayer-watch/prayer-watch-hero.jpg",
    tone: "warm",
  }),
  resourcesHero: asset({
    src: null,
    alt: "Prayer resources laid out on a table",
    figma: "83d28387…",
    suggestedPath: "/images/resources/resources-hero.jpg",
    tone: "light",
  }),
  getInvolvedHero: asset({
    src: null,
    alt: "Volunteers serving together",
    figma: "3728bcd5…",
    suggestedPath: "/images/get-involved/get-involved-hero.jpg",
    tone: "warm",
  }),
} satisfies Record<string, ImageAsset>;

export type AssetKey = keyof typeof assets;

/**
 * The hero background video. Approved: a static background is used until the
 * original video is supplied. Set `src` (MP4) and optionally `webm` to enable it.
 */
export const heroVideo: { src: string | null; webm: string | null; poster: AssetKey } = {
  src: "/Upscaled%20hero%20video.mp4", // public/Upscaled hero video.mp4
  webm: null,
  poster: "heroVideoPoster",
};
