import { WATCH_TIME_ZONE, type PrayerWatch } from "@/content/watches";

const pad = (n: number) => String(n).padStart(2, "0");

/** Build a daily-recurring iCalendar event for a watch, anchored to WAT. */
export function buildWatchIcs(watch: PrayerWatch, now: Date): string {
  const y = now.getUTCFullYear();
  const m = pad(now.getUTCMonth() + 1);
  const d = pad(now.getUTCDate());
  const time = (mins: number) => `${pad(Math.floor(mins / 60) % 24)}${pad(mins % 60)}00`;
  const stamp = now.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//VIAL//Prayer Watch//EN",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:${watch.id}-${stamp}@vial.prayer`,
    `DTSTAMP:${stamp}`,
    `DTSTART;TZID=${WATCH_TIME_ZONE}:${y}${m}${d}T${time(watch.start)}`,
    `DTEND;TZID=${WATCH_TIME_ZONE}:${y}${m}${d}T${time(watch.end)}`,
    "RRULE:FREQ=DAILY",
    `SUMMARY:VIAL Watch ${watch.numeral} — ${watch.title}`,
    "DESCRIPTION:Take your place on the watch. vial.prayer",
    "BEGIN:VALARM",
    "TRIGGER:-PT15M",
    "ACTION:DISPLAY",
    `DESCRIPTION:Watch ${watch.numeral} begins in 15 minutes`,
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

export function downloadWatchIcs(watch: PrayerWatch) {
  const blob = new Blob([buildWatchIcs(watch, new Date())], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `vial-watch-${watch.number}.ics`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
