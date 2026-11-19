import { prayerWatches, type PrayerWatch, WATCH_TIME_ZONE } from "@/content/watches";

const DAY = 24 * 60;

/** Minutes after midnight for `date` in the given IANA time zone. */
export function minutesInZone(date: Date, timeZone: string = WATCH_TIME_ZONE): number {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const hour = Number(parts.find((p) => p.type === "hour")?.value ?? 0);
  const minute = Number(parts.find((p) => p.type === "minute")?.value ?? 0);
  return hour * 60 + minute;
}

export type WatchStatus = { kind: "live" } | { kind: "upcoming"; startsIn: number };

export function getWatchStatus(watch: PrayerWatch, nowMinutes: number): WatchStatus {
  if (nowMinutes >= watch.start && nowMinutes < watch.end) return { kind: "live" };
  return { kind: "upcoming", startsIn: (watch.start - nowMinutes + DAY) % DAY };
}

/** The watch running now, or `undefined` during an uncovered hour (see scheduleGaps). */
export function getCurrentWatch(nowMinutes: number): PrayerWatch | undefined {
  return prayerWatches.find((w) => nowMinutes >= w.start && nowMinutes < w.end);
}

/** "3h 41m" */
export function formatCountdown(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m}m`;
  return `${h}h ${m}m`;
}
