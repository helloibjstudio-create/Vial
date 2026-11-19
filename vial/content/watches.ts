/**
 * Prayer Watch schedule — the single source of truth for every watch shown on
 * the site (home carousel, Prayer Watch grid, hero card, commit form).
 *
 * Source: Prayer Watch frame 382:9888 (audit §5.5). Times are taken verbatim
 * from the design. Nothing has been invented:
 *   - Watch VIII ends at 23:00 as designed, so 23:00–24:00 is NOT covered.
 *     `scheduleGaps` documents this; the UI shows "between watches" in that hour.
 *   - The home carousel in Figma showed different times (e.g. Morning Prayer
 *     6–7am). Per the approved decision, the home page now reads from this file.
 *
 * Reference time zone: the design labels times "WAT" and defaults the time-zone
 * picker to Africa/Lagos, so the schedule is anchored to West Africa Time.
 */

export const WATCH_TIME_ZONE = "Africa/Lagos";
export const WATCH_TIME_ZONE_LABEL = "WAT";

export interface PrayerWatch {
  id: string;
  number: number;
  numeral: string;
  /** Start/end in minutes after midnight, WAT. */
  start: number;
  end: number;
  title: string;
  /** Sample engagement figures from the design (static until a backend exists). */
  stats: { praying?: number; nationsActive?: number };
}

const h = (hours: number) => hours * 60;

export const prayerWatches: PrayerWatch[] = [
  { id: "watch-1", number: 1, numeral: "I", start: h(0), end: h(3), title: "Warfare & Protection", stats: { praying: 2341, nationsActive: 42 } },
  { id: "watch-2", number: 2, numeral: "II", start: h(3), end: h(6), title: "Consecration", stats: { praying: 241, nationsActive: 29 } },
  { id: "watch-3", number: 3, numeral: "III", start: h(6), end: h(9), title: "Morning Prayer", stats: { praying: 1203, nationsActive: 54 } },
  { id: "watch-4", number: 4, numeral: "IV", start: h(9), end: h(12), title: "Kingdom Advancement", stats: { praying: 994 } },
  { id: "watch-5", number: 5, numeral: "V", start: h(12), end: h(15), title: "Intercession for Nations", stats: {} },
  { id: "watch-6", number: 6, numeral: "VI", start: h(15), end: h(18), title: "Revival & Harvest", stats: {} },
  { id: "watch-7", number: 7, numeral: "VII", start: h(18), end: h(21), title: "Healing & Restoration", stats: {} },
  { id: "watch-8", number: 8, numeral: "VIII", start: h(21), end: h(23), title: "Night Watch", stats: {} },
];

/** Hours the design leaves uncovered (pending a decision from the VIAL team). */
export const scheduleGaps = [{ start: h(23), end: h(24) }];

/** Watches featured in the home "The altar is always lit." carousel (Figma showed I–III). */
export const featuredWatchIds = ["watch-1", "watch-2", "watch-3"] as const;

export function getWatch(id: string) {
  return prayerWatches.find((w) => w.id === id);
}

function formatClock(minutes: number, style: "short" | "long") {
  const hh24 = Math.floor(minutes / 60) % 24;
  const mm = minutes % 60;
  const suffix = hh24 < 12 ? "AM" : "PM";
  const hh12 = hh24 % 12 === 0 ? 12 : hh24 % 12;
  if (style === "long") return `${hh12}:${String(mm).padStart(2, "0")} ${suffix}`;
  return mm === 0 ? `${hh12} ${suffix}` : `${hh12}:${String(mm).padStart(2, "0")} ${suffix}`;
}

/** "12 AM – 3 AM" (grid cards) */
export const formatWatchRange = (w: PrayerWatch) =>
  `${formatClock(w.start, "short")} – ${formatClock(w.end, "short")}`;

/** "12:00 AM – 3:00 AM" (commit panel) */
export const formatWatchRangeLong = (w: PrayerWatch) =>
  `${formatClock(w.start, "long")} – ${formatClock(w.end, "long")}`;

/** "12am – 3am" (pills on the home carousel) */
export const formatWatchRangeCompact = (w: PrayerWatch) =>
  formatWatchRange(w).replace(/ (AM|PM)/g, (_, s: string) => s.toLowerCase());
