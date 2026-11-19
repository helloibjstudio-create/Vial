"use client";

import { useState } from "react";
import {
  formatWatchRange,
  formatWatchRangeCompact,
  WATCH_TIME_ZONE,
  WATCH_TIME_ZONE_LABEL,
  type PrayerWatch,
} from "@/content/watches";
import { cn } from "@/lib/cn";
import { downloadWatchIcs } from "@/lib/ics";
import { useNow } from "@/lib/use-now";
import { formatCountdown, getCurrentWatch, getWatchStatus, minutesInZone, type WatchStatus } from "@/lib/watch-time";
import { downloadHref } from "@/content/site";
import { BrandMark } from "@/components/ui/Brand";
import { Button } from "@/components/ui/Button";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { StatusPill, TimePill } from "@/components/ui/Pills";
import type { AssetKey } from "@/content/assets";

/**
 * Watch status is computed live from the central schedule (content/watches.ts):
 *   live      the current window (WAT)  → "Live Now"
 *   upcoming  every other watch         → "Upcoming" + countdown
 * The design's third label, "Active", has no documented rule, so it is not
 * inferred (see docs/progress-log.md — open decisions).
 */
export function useWatchStatus(watch: PrayerWatch): WatchStatus | null {
  const now = useNow();
  if (!now) return null;
  return getWatchStatus(watch, minutesInZone(now, WATCH_TIME_ZONE));
}

export function useCurrentWatch(): { ready: boolean; watch: PrayerWatch | undefined } {
  const now = useNow();
  if (!now) return { ready: false, watch: undefined };
  return { ready: true, watch: getCurrentWatch(minutesInZone(now, WATCH_TIME_ZONE)) };
}

export function WatchStatusPill({ status, size }: { status: WatchStatus | null; size?: "md" | "sm" }) {
  if (!status) {
    return (
      <StatusPill kind="upcoming" size={size} className="invisible">
        Upcoming
      </StatusPill>
    );
  }
  return status.kind === "live" ? (
    <StatusPill kind="live" size={size}>
      Live Now
    </StatusPill>
  ) : (
    <StatusPill kind="upcoming" size={size}>
      Upcoming
    </StatusPill>
  );
}

const nf = new Intl.NumberFormat("en-US");

/* ------------------------------------------------------------------ */
/* Home "The altar is always lit." carousel card — 485×792 (Section 4) */
/* ------------------------------------------------------------------ */

const featureThemes = {
  brown: { bg: "bg-brown", title: "text-gold", mark: "gold" as const },
  gold: { bg: "bg-gold", title: "text-white", mark: "light" as const },
  black: { bg: "bg-sacred", title: "text-gold", mark: "gold" as const },
};

export function WatchFeatureCard({
  watch,
  theme,
  image,
}: {
  watch: PrayerWatch;
  theme: keyof typeof featureThemes;
  image: AssetKey;
}) {
  const status = useWatchStatus(watch);
  const t = featureThemes[theme];
  return (
    <article
      className={cn(
        "relative flex w-[min(85vw,30.3rem)] shrink-0 snap-start flex-col overflow-hidden rounded-card lg:h-[49.5rem]",
        t.bg,
      )}
    >
      <div className="relative flex flex-col gap-8 px-7 pt-[5.5rem] lg:gap-[2.4rem] lg:px-[2.3rem]">
        <span className="absolute top-[1.8rem] right-[1.7rem] block size-14 lg:size-[4.5rem]">
          <BrandMark tone={t.mark} />
        </span>
        <div className="flex flex-wrap gap-3 lg:gap-5">
          <TimePill range={formatWatchRangeCompact(watch)} zone={WATCH_TIME_ZONE_LABEL} />
          <WatchStatusPill status={status} />
        </div>
        <div className="flex flex-col gap-[0.95rem]">
          <h3 className={cn("max-w-[18rem] text-h3 font-semibold", t.title)}>{watch.title}</h3>
          {watch.stats.nationsActive !== undefined && (
            <p className={cn("text-lg font-medium tracking-[-0.05em]", t.title)}>
              <span aria-hidden="true">🌍 </span>
              <span className="font-display text-2xl font-medium tracking-[-0.02em]">{watch.stats.nationsActive}</span>{" "}
              <span className="text-xl">nations active</span>
            </p>
          )}
        </div>
      </div>
      <MediaFrame asset={image} className="relative mt-10 h-[21rem] rounded-card lg:absolute lg:inset-x-0 lg:bottom-0 lg:mt-0 lg:h-[28.4rem]" sizes="(min-width: 1024px) 485px, 85vw" labelPosition="top-right">
        <div className="absolute bottom-[2.9rem] left-[2.3rem]">
          <Button href={downloadHref} variant="glass">
            Download the Vial
          </Button>
        </div>
      </MediaFrame>
    </article>
  );
}

/* ------------------------------------------------------------ */
/* Prayer Watch grid card — 317×424, roman numeral (Section 9)  */
/* ------------------------------------------------------------ */

export function WatchGridCard({ watch }: { watch: PrayerWatch }) {
  const status = useWatchStatus(watch);
  const live = status?.kind === "live";
  const tone = live ? "text-white" : "text-brown";
  return (
    <article
      aria-label={`Watch ${watch.numeral}: ${watch.title}`}
      className={cn(
        "relative flex min-h-[26.5rem] flex-col justify-center rounded-card-sm border border-brown px-[1.375rem] py-[2.06rem] transition-colors duration-500",
        live ? "bg-gold" : "bg-cream",
      )}
    >
      <span aria-hidden="true" className={cn("absolute top-[1.6rem] right-[1.375rem] font-display text-[2.75rem] leading-none font-normal tracking-[-0.04em] italic", tone === "text-white" ? "text-brown" : "text-brown")}>
        {watch.numeral}
      </span>
      <div className="flex flex-col gap-10">
        <div className="flex flex-col items-start gap-5">
          <WatchStatusPill status={status} />
          <div className="flex flex-col gap-5">
            <p className={cn("font-display text-[2.125rem] leading-[0.9] font-semibold tracking-[-0.06em] italic", tone)}>
              {formatWatchRange(watch)}
            </p>
            <h3 className={cn("text-[2.125rem] leading-[0.9] font-semibold tracking-[-0.03em]", tone)}>{watch.title}</h3>
            <p className={cn("min-h-[1em] text-base leading-[0.9] font-medium tracking-[-0.05em]", tone)}>
              {status?.kind === "live" && watch.stats.praying !== undefined && <>🌍 {nf.format(watch.stats.praying)} praying now</>}
              {status?.kind === "upcoming" && <>Starts in {formatCountdown(status.startsIn)}</>}
            </p>
          </div>
          <Button
            href={live ? "#commit" : undefined}
            disabled={!live}
            variant="brown"
            size="sm"
            className="w-[6.9rem] px-0"
            aria-label={live ? `Join watch ${watch.numeral}` : `Watch ${watch.numeral} has not started`}
          >
            Join
          </Button>
        </div>
        <WatchActions watch={watch} />
      </div>
    </article>
  );
}

function WatchActions({ watch }: { watch: PrayerWatch }) {
  const [added, setAdded] = useState(false);
  return (
    <div className="flex gap-2">
      <Button href={`#commit`} variant="rect-brown" size="sm" className="h-[3.625rem] min-w-0 flex-1 px-2 text-[0.95rem]">
        Set Reminder
      </Button>
      <Button
        variant="rect-outline"
        size="sm"
        className="h-[3.625rem] min-w-0 flex-1 px-2 text-[0.95rem]"
        onClick={() => {
          downloadWatchIcs(watch);
          setAdded(true);
        }}
        aria-label={`Add watch ${watch.numeral} to your calendar`}
      >
        {added ? "Added ✓" : "Add to Calendar"}
      </Button>
    </div>
  );
}

/* ------------------------------------------------------ */
/* Prayer Watch hero floating card (gold, live watch)      */
/* ------------------------------------------------------ */

export function LiveWatchCard({ className }: { className?: string }) {
  const { ready, watch } = useCurrentWatch();
  return (
    <article className={cn("relative overflow-hidden rounded-[2.2rem] bg-gold px-8 pt-[3.8rem] pb-[11rem]", className)}>
      <span className="absolute top-[1.6rem] right-6 block size-16">
        <BrandMark tone="light" />
      </span>
      <div className="relative flex flex-col gap-[2.2rem]">
        <div className="flex flex-wrap gap-4">
          {ready && watch ? (
            <StatusPill kind="live" size="sm">
              Live Now
            </StatusPill>
          ) : (
            <StatusPill kind="upcoming" size="sm" className={cn(!ready && "invisible")}>
              Between watches
            </StatusPill>
          )}
          {watch && <TimePill range={formatWatchRangeCompact(watch)} zone={WATCH_TIME_ZONE_LABEL} className="h-[1.55rem] text-[0.9rem]" />}
        </div>
        <div className={cn("flex flex-col gap-3", !ready && "invisible")}>
          <h2 className="text-[2.125rem] leading-[0.9] font-semibold tracking-[-0.03em] text-white">
            {watch ? watch.title : "The next watch begins soon"}
          </h2>
          {watch?.stats.nationsActive !== undefined && (
            <p className="text-base font-medium tracking-[-0.05em] text-white">
              🌍 <span className="font-display text-[1.34rem] tracking-[-0.02em]">{watch.stats.nationsActive}</span> nations active
            </p>
          )}
        </div>
      </div>
      <MediaFrame asset="watch02" className="absolute inset-x-0 -bottom-6 h-[11.5rem] rounded-[2.2rem]" sizes="440px" label={false} />
    </article>
  );
}

/** "Local Time" glass widget (Figma component 390:13055; contents not inspected — see progress log). */
export function LocalTimeWidget({ className }: { className?: string }) {
  const now = useNow();
  const zone = now ? Intl.DateTimeFormat().resolvedOptions().timeZone : "";
  const time = now ? new Intl.DateTimeFormat(undefined, { hour: "numeric", minute: "2-digit" }).format(now) : "";
  return (
    <div
      className={cn(
        "glass-gold-strong flex items-center justify-between gap-4 rounded-card-sm px-6 py-6 text-white sm:gap-6 sm:px-8 transition-transform duration-[800ms] ease-[var(--ease-vial-out)] hover:-translate-y-1",
        className,
      )}
    >
      <div className="flex flex-col gap-1">
        <span className="text-eyebrow font-semibold tracking-[0.05em] uppercase">Your local time</span>
        <span className="text-sm text-white/80" suppressHydrationWarning>
          {zone.replace(/_/g, " ") || " "}
        </span>
      </div>
      <span className="font-display text-[2rem] leading-none font-semibold whitespace-nowrap italic sm:text-[2.6rem]" suppressHydrationWarning>
        {time || " "}
      </span>
    </div>
  );
}
