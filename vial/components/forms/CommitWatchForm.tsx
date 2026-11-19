"use client";

import { useState } from "react";
import { commitToWatch } from "@/app/actions/forms";
import { formatWatchRangeLong, getWatch, prayerWatches, WATCH_TIME_ZONE } from "@/content/watches";
import { cn } from "@/lib/cn";
import { ChoiceGroup } from "@/components/ui/Choice";
import { FormMessage } from "@/components/ui/Field";
import { ChevronDown } from "@/components/ui/icons";
import { WatchStatusPill, useWatchStatus } from "@/components/cards/WatchCards";
import { useFormAction } from "./use-form-action";

const heading = "text-[1.43rem] leading-8 font-medium tracking-[-0.02em] text-sacred";
const chip = "h-[2.8rem] rounded-chip border border-gold bg-white text-base font-semibold tracking-[-0.03em] text-brown outline-none focus:border-brown";

/** "Commit to a Watch" panel (Prayer Watch Section 7, audit §5.5). */
export function CommitWatchForm() {
  const { state, pending, formRef, formAction, onSubmit, error } = useFormAction(commitToWatch);
  const [watchId, setWatchId] = useState(prayerWatches[0].id);
  const [timeZone, setTimeZone] = useState(WATCH_TIME_ZONE);
  const watch = getWatch(watchId) ?? prayerWatches[0];
  const status = useWatchStatus(watch);

  return (
    <form
      ref={formRef}
      action={formAction}
      onSubmit={onSubmit}
      noValidate
      aria-label="Commit to a watch"
      className="relative flex flex-col gap-[3.75rem] rounded-card bg-white px-6 py-10 shadow-soft sm:px-10 lg:pt-[3.56rem] lg:pr-[4.4rem] lg:pb-[4.7rem] lg:pl-[5.5rem]"
    >
      <div className="absolute top-6 right-6 lg:top-[3.56rem] lg:right-[4.4rem]">
        <WatchStatusPill status={status} />
      </div>

      <div className="flex flex-col gap-10 pt-10 lg:pt-7">
        <div className="flex flex-col gap-5" aria-live="polite">
          <p className="font-display text-[2.75rem] leading-none font-normal tracking-[-0.04em] text-brown italic">Watch {watch.numeral}</p>
          <p className="font-display text-[2.125rem] leading-[0.9] font-semibold tracking-[-0.05em] text-gold italic">{formatWatchRangeLong(watch)}</p>
          <p className="max-w-[18rem] text-[2.125rem] leading-[0.9] font-semibold tracking-[-0.03em] text-gold">{watch.title}</p>
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-5">
            <label htmlFor="commit-watch" className={heading}>
              Select Your Watch
            </label>
            <div className="relative">
              <select
                id="commit-watch"
                name="watch"
                value={watchId}
                onChange={(e) => setWatchId(e.target.value)}
                className={cn(chip, "w-full appearance-none pr-12 pl-8")}
              >
                {prayerWatches.map((w) => (
                  <option key={w.id} value={w.id}>
                    Watch {w.number} - {formatWatchRangeLong(w).replace(/:00 /g, "").replace(/ – /, " - ")}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute top-1/2 right-6 h-2.5 w-4 -translate-y-1/2 text-brown" />
            </div>
            {error("watch") && <p className="text-sm text-crimson">{error("watch")}</p>}
          </div>

          <div className="flex flex-col gap-5">
            <label htmlFor="commit-tz" className={heading}>
              Your Time Zone
            </label>
            <div className="flex flex-wrap items-center gap-4">
              <input
                id="commit-tz"
                name="timeZone"
                value={timeZone}
                onChange={(e) => setTimeZone(e.target.value)}
                className={cn(chip, "min-w-0 flex-1 px-8 text-center")}
                aria-describedby="commit-tz-hint"
                aria-invalid={error("timeZone") ? true : undefined}
              />
              <button
                type="button"
                onClick={() => setTimeZone(Intl.DateTimeFormat().resolvedOptions().timeZone)}
                className="h-9 rounded-full bg-gold px-4 text-base font-semibold tracking-[-0.03em] text-white transition-colors hover:bg-[#b8973f]"
              >
                Auto-detect
              </button>
            </div>
            <p id="commit-tz-hint" className="sr-only">
              Watch times are shown in West Africa Time. Reminders will use your time zone.
            </p>
            {error("timeZone") && <p className="text-sm text-crimson">{error("timeZone")}</p>}
          </div>

          <ChoiceGroup
            name="reminder"
            legend={<span className={heading}>Reminder Preference</span>}
            options={["Email", "App Notification", "Both"]}
            defaultValue="Both"
            variant="rect"
            error={error("reminder")}
          />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <FormMessage status={state.status} message={state.message} />
        <button
          type="submit"
          disabled={pending}
          className="h-[3.45rem] self-start rounded-full bg-gold px-7 text-lg font-medium tracking-[-0.02em] text-white transition-colors hover:bg-[#b8973f] disabled:opacity-70"
        >
          {pending ? "Saving…" : "Commit to This Watch"}
        </button>
      </div>
    </form>
  );
}
