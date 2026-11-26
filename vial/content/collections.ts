/**
 * Reusable content collections, transcribed from the Figma frames (audit §5).
 * Sample/engagement figures are design placeholders until a backend exists.
 */
import type { AssetKey } from "./assets";

// ---------- Testimonials (Home Section 6, Prayer Wall Section 6) ----------
export interface Testimonial {
  quote: string;
  name: string;
  /** First part is coloured (country/city accent), second part neutral. */
  location: { accent: string; accentColor: "nigeria" | "crimson"; rest: string };
  image: AssetKey;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "I posted a request for my brother in surgery. Within 3 hours, 500 people had prayed. Two days later full recovery. I came back to mark this answered and could not stop weeping",
    name: "Deborah",
    location: { accent: "Nigeria", accentColor: "nigeria", rest: " · Healing" },
    image: "testimonialDeborah",
  },
  {
    quote:
      "I joined a midnight watch alone at 2AM, restless and unsettled. The intercession from Korea lifted me instantly. I did not expect to be held by strangers halfway across the world",
    name: "Esther",
    location: { accent: "New York", accentColor: "crimson", rest: " · Watch 8" },
    image: "testimonialEsther",
  },
];

// ---------- Resources (Home Section 9, Resources Hub) ----------
export interface Resource {
  id: "guides" | "sounds" | "teaching" | "fasting";
  title: string;
  /** Title as broken on the 321×330 card in Figma (line breaks as "\n"). */
  cardTitle: string;
  filterLabel: string;
  description: string;
  cta: string;
  image: AssetKey;
  /** Destination not designed yet (audit §10) — null renders a non-link CTA. */
  href: string | null;
}

export const resources: Resource[] = [
  {
    id: "guides",
    title: "Prayer Guides",
    cardTitle: "Prayer\nGuides",
    filterLabel: "Prayer Guides",
    description: "Thematic PDF guides for healing, nations, the church, and personal breakthrough.",
    cta: "Browse Guides",
    image: "prayerHands",
    href: null,
  },
  {
    id: "sounds",
    title: "Soaking Sounds",
    cardTitle: "Soaking\nSounds",
    filterLabel: "Soaking Sounds",
    description: "Curated worship instrumentals and prayer soundscapes. Soft piano, strings, rainfall.",
    cta: "Open Player",
    image: "resourceSounds",
    href: null,
  },
  {
    id: "teaching",
    title: "Teaching & Sermon",
    cardTitle: "Teaching\n& Sermon",
    filterLabel: "Sermons",
    description: "Short messages from seasoned prayer warriors on intercession, fasting, and spiritual warfare.",
    cta: "Watch Now",
    image: "resourceTeaching",
    href: null,
  },
  {
    id: "fasting",
    title: "Fasting Plans",
    cardTitle: "Fasting\nPlans",
    filterLabel: "Fasting Plans",
    description: "3-day, 7-day, and 21-day guided plans with daily scriptures, prayer focus, and reminders.",
    cta: "Start a Fast",
    image: "resourceFasting",
    href: null,
  },
];

// ---------- Prayer requests (Prayer Wall Section 8) ----------
export interface PrayerRequest {
  id: string;
  name: string;
  country: string;
  request: string;
  prayedCount: number;
  theme: "cream" | "gold" | "brown";
}

export const prayerRequests: PrayerRequest[] = [
  { id: "pr-1", name: "Maria", country: "Brazil", request: "Praying for peace over Ukraine and every nation at war.", prayedCount: 847, theme: "cream" },
  { id: "pr-2", name: "James", country: "Kenya", request: "My mother is in hospital. Please stand with us.", prayedCount: 422, theme: "gold" },
  { id: "pr-3", name: "Grace", country: "Nigeria", request: "Healing. Please just pray.", prayedCount: 1221, theme: "brown" },
];

export const prayerCategories = ["Health", "Family", "Nation", "Provision", "Church", "Others"] as const;
export const prayerVisibility = ["Public", "Group Only", "Anonymous"] as const;

// ---------- Giving (Get Involved — Donate) ----------
export const givingCauses = [
  { id: "missions", emoji: "🌍", title: "Global Missions", description: "Supporting prayer networks in underserved nations." },
  { id: "tech", emoji: "💻", title: "Tech Development", description: "Keeping the VIAL app and website built, maintained, and growing." },
  { id: "media", emoji: "📡", title: "Media Outreach", description: "Producing content that carries the vision across social platforms." },
  { id: "houses", emoji: "🏠", title: "Prayer Houses", description: "Funding physical and digital spaces dedicated to sustained intercession." },
] as const;

export const givingAmounts = [10, 25, 50, 100] as const;
export const givingFrequencies = ["Give Once", "Give Monthly"] as const;

/** Payment partners shown under "Powered by" (official logos pending, audit §7). */
export const paymentPartners = ["Flutterwave", "PayPal", "Stripe"] as const;

// ---------- Volunteer / Contact ----------
export const volunteerRoles = ["Content Writing", "Translation", "Regional Leadership", "Tech", "Media", "Other"] as const;
export const contactSubjects = ["General", "Partnership", "Testimony", "Media", "Tech"] as const;
