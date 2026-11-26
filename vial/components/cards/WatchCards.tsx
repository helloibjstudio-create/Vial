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
  brown: { bg: "bg-brown", title: "text-gold", globe: "text-gold" },
  gold: { bg: "bg-gold", title: "text-white", globe: "text-white" },
  black: { bg: "bg-sacred", title: "text-gold", globe: "text-gold" },
};

/** Globe mark — the exact vector from Figma (node 257:430, 73×73, in card coordinates). */
function GlobeIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="385 29 73 73" fill="currentColor" className={className}>
      <path d="M455.972 77.4881C458.454 70.3539 458.66 62.625 456.56 55.369C454.46 48.113 450.159 41.6881 444.251 36.9819C444.129 36.8564 443.991 36.7477 443.841 36.6585C440.531 34.0856 436.802 32.1034 432.817 30.7991C432.733 30.7647 432.646 30.7364 432.557 30.7143C425.324 28.4148 417.553 28.429 410.327 30.7549C403.102 33.0809 396.782 37.6028 392.249 43.6905C392.139 43.8094 392.043 43.9412 391.965 44.083C389.119 47.9978 387.082 52.4401 385.972 57.1506C384.862 61.8612 384.701 66.7457 385.499 71.5191C386.296 76.2925 388.037 80.8592 390.619 84.9528C393.2 89.0463 396.571 92.5847 400.535 95.3614C400.649 95.4615 400.774 95.5481 400.907 95.6196C404.362 97.9916 408.201 99.7482 412.254 100.812C412.34 100.841 412.428 100.864 412.518 100.88C421.326 103.113 430.65 101.982 438.669 97.7067C446.687 93.4316 452.823 86.3201 455.878 77.7621C455.916 77.6733 455.948 77.5817 455.972 77.4881ZM428.143 33.6758L427.941 33.9058C427.491 34.4215 427.025 34.9552 426.528 35.4544C426.23 35.7763 425.867 36.0313 425.463 36.2029C425.059 36.3744 424.623 36.4585 424.184 36.4497C423.943 36.4308 423.709 36.356 423.502 36.2312C423.295 36.1064 423.119 35.935 422.99 35.7307C422.348 34.7594 421.621 33.8466 420.819 33.0031C421.045 32.9984 421.271 32.9945 421.499 32.9945C423.731 32.993 425.957 33.2213 428.143 33.6758ZM415.413 33.5659C415.905 33.9984 416.319 34.3461 416.664 34.6357C417.868 35.5708 418.898 36.7103 419.707 38.0022C420.169 38.6872 420.778 39.2603 421.49 39.6795C422.202 40.0988 422.999 40.3535 423.822 40.4253C423.998 40.442 424.174 40.4501 424.352 40.4496C426.237 40.408 428.031 39.6281 429.348 38.2777C429.944 37.6828 430.454 37.1004 430.948 36.5321C431.428 35.9625 431.936 35.4176 432.471 34.8995C434.982 35.8032 437.373 37.0135 439.588 38.503C439.195 38.8225 438.911 39.0423 438.794 39.1223C436.349 40.8075 435.202 42.6238 435.289 44.674C435.361 46.4165 436.334 47.8411 437.191 49.0978C438.633 51.21 438.761 51.7508 438.038 52.7084C437.213 53.8073 435.983 55.1275 434.811 55.1856C433.308 55.2641 431.427 53.3583 429.63 51.4039C428.092 49.7375 426.027 47.838 423.642 47.995C421.156 48.152 419.612 50.3246 417.824 52.8395C417.642 53.0946 417.456 53.3567 417.262 53.6244C416.565 54.6111 415.918 55.6329 415.325 56.6855C414.646 57.8559 414.156 58.702 413.57 59.0403C412.926 59.41 411.692 59.4375 409.803 59.1243C407.913 58.8111 406.917 56.9179 405.521 53.8394C404.216 50.9643 402.737 47.7061 399.377 46.8396C398.176 46.5746 397.08 45.9617 396.224 45.0775C401.058 39.092 407.857 35.0134 415.413 33.5659ZM393.885 48.367C395.165 49.5065 396.709 50.309 398.377 50.7021C399.887 51.0946 400.856 53.2272 401.881 55.4901C403.275 58.5591 405.008 62.3777 409.146 63.063C410.09 63.2293 411.046 63.3183 412.004 63.3291C415.857 63.3291 417.167 61.4704 418.778 58.6918C419.307 57.7511 419.883 56.8378 420.505 55.9556C420.703 55.6803 420.894 55.4124 421.078 55.1518C422.072 53.7547 423.308 52.0122 423.895 51.9784C423.979 51.9784 424.736 51.9902 426.692 54.1134C429.233 56.8739 431.781 59.3378 435.012 59.1784C437.223 59.0685 439.257 57.7381 441.231 55.1126C441.777 54.4445 442.156 53.6564 442.337 52.8132C442.518 51.97 442.497 51.0958 442.274 50.2626C441.878 49.0318 441.275 47.8776 440.491 46.8498C439.92 46.1686 439.506 45.37 439.279 44.5107C439.249 43.7753 440.384 42.8805 441.063 42.4127C441.398 42.1811 442.077 41.6387 442.84 40.9998C447.558 45.1032 450.991 50.4814 452.728 56.4886C454.464 62.4957 454.429 68.8763 452.628 74.8642C450.116 74.58 448.013 73.6946 444.441 70.8909C442.12 69.0691 436.814 68.9012 434.159 71.3116C433.701 71.715 433.33 72.2066 433.067 72.7571C432.804 73.3076 432.655 73.9055 432.63 74.5149C432.625 75.8886 433.048 77.2297 433.838 78.3531C434.293 79.0595 434.78 79.6874 435.208 80.2369C435.536 80.642 435.843 81.0638 436.127 81.5006C434.959 82.1435 433.702 82.6101 432.398 82.8852C431.563 83.1065 430.696 83.1775 429.836 83.0948C426.836 82.9331 425.035 83.51 420.385 89.7014C417.873 93.0443 415.344 95.3669 412.671 96.7829C409.994 96.0262 407.426 94.9266 405.03 93.5114C406.282 92.0357 407.256 90.1904 406.492 88.473C405.576 86.4134 407.3 84.3404 410.036 81.4135C411.194 80.2719 412.223 79.0054 413.102 77.6373C414.453 75.2825 413.879 73.5243 413.159 72.4647C411.672 70.4494 409.565 68.9782 407.161 68.2772C404.713 67.4467 402.059 67.4467 399.611 68.2772C395.059 69.9584 392.233 69.1178 389.087 68.0213C389.023 67.1866 388.99 66.3442 388.99 65.4939C388.984 59.4389 390.681 53.5044 393.885 48.367ZM389.74 72.438C393.426 73.6129 397.406 73.4672 400.997 72.0259C403.836 70.9773 408.226 72.3069 409.858 74.7111C410.272 75.3194 408.376 77.3484 407.121 78.6914C404.499 81.4975 400.926 85.3216 402.735 89.8372C402.468 90.3642 402.118 90.8447 401.698 91.2602C395.622 86.5888 391.387 79.9238 389.74 72.438ZM421.499 98.005C420.404 98.0051 419.311 97.9503 418.222 97.8409C420.228 96.1481 422.026 94.2234 423.579 92.1071C425.493 89.5577 426.895 88.0177 427.865 87.3977C428.388 87.0664 429.02 86.9537 429.625 87.0837C430.904 87.191 432.192 87.0763 433.432 86.7446C436.92 85.8106 439.383 84.7713 440.068 82.7321C440.713 80.8146 439.464 79.2079 438.363 77.7872C437.97 77.2785 437.559 76.7527 437.202 76.1969C436.288 74.7684 436.707 74.3916 436.844 74.2621C437.907 73.2975 441.03 73.2841 441.976 74.0266C445.773 77.0093 448.449 78.211 451.205 78.6859C448.649 84.4314 444.483 89.3134 439.211 92.7418C433.939 96.1702 427.787 97.9983 421.499 98.005Z" />
    </svg>
  );
}

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
      <div className="relative flex flex-col gap-8 px-7 pt-[5.5rem] pb-10 lg:gap-[2.4rem] lg:px-[2.3rem] lg:pb-0">
        {/* Figma 257:430 — 73×73 globe in the top-right corner (x 385, y 29). */}
        <GlobeIcon className={cn("absolute top-[1.8rem] right-[1.75rem] size-14 lg:size-[4.56rem]", t.globe)} />
        <div className="flex flex-wrap gap-3 lg:gap-5">
          <TimePill range={formatWatchRangeCompact(watch)} zone={WATCH_TIME_ZONE_LABEL} />
          <WatchStatusPill status={status} />
        </div>
        <div className="flex flex-col gap-[0.95rem]">
          <h3 className={cn("max-w-[17.3rem] text-h3 font-semibold", t.title)}>{watch.title}</h3>
          {watch.stats.nationsActive !== undefined && (
            <p className={cn("text-lg font-medium tracking-[-0.05em]", t.title)}>
              <span aria-hidden="true">🌍 </span>
              <span className="font-display text-2xl font-medium tracking-[-0.02em]">{watch.stats.nationsActive}</span>{" "}
              <span className="text-xl">nations active</span>
            </p>
          )}
        </div>
      </div>
      {/* Figma: image FILL, gold "Color" blend, photo framed ~72 % down (matched against the node export). */}
      <MediaFrame
        asset={image}
        tint="gold"
        imgClassName="object-[50%_72%]"
        className="relative mt-auto h-[21rem] rounded-card lg:absolute lg:inset-x-0 lg:bottom-0 lg:mt-0 lg:h-[28.4rem]"
        sizes="(min-width: 1024px) 485px, 85vw"
        labelPosition="top-right"
      >
        <div className="absolute bottom-[2.9rem] left-[2.3rem]">
          {/* Figma: the live watch says "Join This Watch"; the others say "Set Reminder". */}
          {status?.kind === "live" ? (
            <Button href={downloadHref} variant="glass">
              Join This Watch
            </Button>
          ) : (
            <Button href="/prayer-watch#commit" variant="glass">
              Set Reminder
            </Button>
          )}
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
    <div className="flex flex-wrap gap-2">
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
