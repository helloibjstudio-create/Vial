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
    src: "/media/hero-poster.jpg",
    alt: "A person praying alone in a dim room by a curtained window",
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
    src: "/images/home/bento-phone.png",
    alt: "The VIAL app shown on a phone",
    figma: "ed8a6cf9… (bento crop)",
    suggestedPath: "/images/home/bento-phone.png",
    tone: "ghost",
  }),
  /** Full cut-out (transparent PNG) — Prayer Wall card strips + Resource card 1. */
  prayerHands: asset({
    src: "/images/shared/prayer-hands.png",
    alt: "Hands pressed together in prayer",
    figma: "30a3342d…",
    suggestedPath: "/images/shared/prayer-hands.png",
    tone: "ghost",
    width: 1076,
    height: 1466,
  }),
  prayerPortrait: asset({
    src: "/images/home/bento-prayer.png",
    alt: "Hands folded in prayer",
    figma: "30a3342d…",
    suggestedPath: "/images/shared/prayer-portrait-01.jpg",
    tone: "warm",
  }),
  nations: asset({
    src: "/images/home/bento-nations.png",
    alt: "Believers from many nations",
    figma: "780ec90e…",
    suggestedPath: "/images/home/nations.jpg",
    tone: "warm",
  }),
  nightWatch: asset({
    src: "/images/home/bento-night-watch.png",
    alt: "A candle burning through the night watch",
    figma: "10e2ea81…",
    suggestedPath: "/images/home/night-watch.jpg",
    tone: "dark",
  }),
  whyVialBg: asset({
    src: "/images/home/why-vial-bg.jpg",
     alt: "Golden light over a gathering in worship",
    figma: "40455686…",
    suggestedPath: "/images/home/why-vial-bg.jpg",
    tone: "gold",
  }),
  watch01: asset({
    src: "/images/home/watch-01.jpg",
    alt: "A figure with arms raised on a mountaintop under a stormy, lightning-lit sky",
    figma: "8f163512…",
    suggestedPath: "/images/home/watch-01.jpg",
    tone: "warm",
  }),
  watch02: asset({
    src: "/images/shared/watch-02.jpg",
    alt: "Cupped hands lifted in prayer as incense smoke rises",
    figma: "c8f669e6…",
    suggestedPath: "/images/shared/watch-02.jpg",
    tone: "warm",
  }),
  watch03: asset({
    src: "/images/home/watch-03.jpg",
    alt: "An open Bible and a steaming cup on a wooden table in morning light",
    figma: "2e89fd2c…",
    suggestedPath: "/images/home/watch-03.jpg",
    tone: "warm",
  }),
  testimonialDeborah: asset({
    src: "/images/shared/testimonial-deborah.jpg",
    alt: "A smiling woman embracing a recovering patient in a hospital ward",
    figma: "6e16ba71…",
    suggestedPath: "/images/shared/testimonial-deborah.jpg",
    tone: "warm",
  }),
  testimonialEsther: asset({
    src: "/images/shared/testimonial-esther.jpg",
    alt: "A woman sitting by a window at night overlooking city lights",
    figma: "e68b9eee…",
    suggestedPath: "/images/shared/testimonial-esther.jpg",
    tone: "warm",
  }),
  resourceSounds: asset({
    src: "/images/shared/resource-sounds.png",
    alt: "A gold musical note",
    figma: "95be9632… (gold Color blend baked in)",
    suggestedPath: "/images/shared/resource-sounds.png",
    tone: "warm",
    width: 200,
    height: 345,
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
    src: "/images/shared/give-band.jpg",
    alt: "A hand planting a seed in dark soil",
    figma: "47190027…",
    suggestedPath: "/images/shared/give-band.jpg",
    tone: "gold",
  }),

  // ---------- About ----------
  aboutHero: asset({
    src: "/images/about/oil and hand.svg",
    alt: "Golden oil poured from an ornate vessel into an open hand",
    figma: "cf2dd450…",
    suggestedPath: "/images/about/about-hero.jpg",
    tone: "light",
  }),
  altarFire: asset({
    src: "/images/about/kneel-pray.svg",
    alt: "A person kneeling with arms raised in prayer beside a lit candle and a Bible, others praying in the light behind",
    figma: "33ebad6c…",
    suggestedPath: "/images/shared/altar-fire.jpg",
    tone: "gold",
  }),
  missionBg: asset({
    src: "/images/about/pray-hand.svg",
    alt: "Hands clasped together in prayer",
    figma: "7aa96754…",
    suggestedPath: "/images/shared/mission-bg.jpg",
    tone: "dark",
  }),

  // ---------- Inner page heroes ----------
  joinHero: asset({
    src: "/images/join/hands.svg",
    alt: "Four hands reaching toward a glowing golden vial",
    figma: "e6ebf196…",
    suggestedPath: "/images/join/join-hero.jpg",
    tone: "light",
  }),
  prayerWallHero: asset({
    src: "/images/prayer/pray-glass.svg",
    alt: "A woman placing a note on a glowing wall of paper prayer requests",
    figma: "3920ca88…",
    suggestedPath: "/images/prayer-wall/prayer-wall-hero.jpg",
    tone: "light",
  }),
  prayerWatchHero: asset({
    src: "/images/watch/earth-pray.svg",
    alt: "The earth at night, wrapped in threads of golden light",
    figma: "8ca3db60…",
    suggestedPath: "/images/prayer-watch/prayer-watch-hero.jpg",
    tone: "warm",
  }),
  resourcesHero: asset({
    src: "/images/watch/open-hands.svg",
    alt: "Open, cupped hands with smoke rising between them",
    figma: "83d28387…",
    suggestedPath: "/images/resources/resources-hero.jpg",
    tone: "light",
  }),
  getInvolvedHero: asset({
    src: "/images/watch/ZoomPlayer.svg",
    alt: "A live video prayer call with 3,235 people joined while the host speaks",
    figma: "3728bcd5…",
    suggestedPath: "/images/get-involved/get-involved-hero.jpg",
    tone: "warm",
  }),
} satisfies Record<string, ImageAsset>;

export type AssetKey = keyof typeof assets;

/**
 * The hero background video — hosted outside the repo and loaded by URL.
 *
 * The file (1080p, 30 fps, H.264, no audio, 4 MB, compressed from the 128 MB 4K master)
 * lives on the `media` branch of the GitHub repo and is served by the jsDelivr CDN with
 * the correct `video/mp4` type. The URL is pinned to that branch's commit, so it never
 * changes under the site. To swap the video, set NEXT_PUBLIC_HERO_VIDEO_URL (and optionally
 * NEXT_PUBLIC_HERO_VIDEO_WEBM_URL) or push a new file to `media` and update the commit below.
 */
const HERO_VIDEO_CDN =
  "https://cdn.jsdelivr.net/gh/helloibjstudio-create/Vial@89dc091b732cd7105435bfe0d78949f88dd084f5/vial-hero-1080p.mp4";

export const heroVideo: { src: string | null; webm: string | null; poster: AssetKey } = {
  src: process.env.NEXT_PUBLIC_HERO_VIDEO_URL || HERO_VIDEO_CDN,
  webm: process.env.NEXT_PUBLIC_HERO_VIDEO_WEBM_URL || null,
  poster: "heroVideoPoster",
};
