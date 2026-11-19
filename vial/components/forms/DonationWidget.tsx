"use client";

import { startDonation } from "@/app/actions/forms";
import { givingAmounts } from "@/content/collections";
import { cn } from "@/lib/cn";
import { ArrowUpRight } from "@/components/ui/icons";
import { ChevronDown } from "@/components/ui/icons";
import { FormMessage } from "@/components/ui/Field";
import { useFormAction } from "./use-form-action";

/**
 * "Make a [Monthly ▾] Donation of [Amount ▾] [Donate ↗]" panel (Home / About Section 10).
 * Payments are stubbed (approved decision #7); the action validates and reports that
 * online giving is not yet connected.
 */
export function DonationWidget() {
  const { state, pending, formRef, formAction, onSubmit, error } = useFormAction(startDonation);
  const selectClass =
    "h-[3.45rem] w-full appearance-none rounded-full border border-line bg-white pr-12 pl-6 text-lg font-medium tracking-[-0.01em] text-sacred outline-none invalid:text-placeholder focus:border-gold";

  return (
    <form
      ref={formRef}
      action={formAction}
      onSubmit={onSubmit}
      noValidate
      aria-label="Make a donation"
      className="flex flex-col gap-4 rounded-card bg-white px-6 py-8 shadow-soft sm:px-10 lg:px-[4.6rem] lg:py-12 lg:pl-[5.875rem] lg:shadow-none"
    >
      <div className="flex flex-col items-stretch gap-6 md:flex-row md:items-end md:gap-10">
        <div className="flex flex-1 flex-col gap-5">
          <label htmlFor="donation-frequency" className="text-[1.625rem] leading-tight font-semibold tracking-[-0.03em] text-black">
            Make a
          </label>
          <div className="relative">
            <select id="donation-frequency" name="frequency" required defaultValue="" className={selectClass} aria-invalid={!!error("frequency")}>
              <option value="" disabled>
                Monthly
              </option>
              <option value="Give Monthly">Monthly</option>
              <option value="Give Once">One-time</option>
            </select>
            <ChevronDown className="pointer-events-none absolute top-1/2 right-6 h-2.5 w-4 -translate-y-1/2 text-black" />
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-5">
          <label htmlFor="donation-amount" className="text-[1.625rem] leading-tight font-semibold tracking-[-0.03em] text-black">
            Donation of
          </label>
          <div className="relative">
            <select id="donation-amount" name="amount" required defaultValue="" className={selectClass} aria-invalid={!!error("amount")}>
              <option value="" disabled>
                Amount
              </option>
              {givingAmounts.map((a) => (
                <option key={a} value={a}>
                  ${a}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute top-1/2 right-6 h-2.5 w-4 -translate-y-1/2 text-black" />
          </div>
        </div>
        <button
          type="submit"
          disabled={pending}
          className={cn(
            "inline-flex h-[3.125rem] items-center justify-center gap-[5px] self-start rounded-[23px] bg-gold px-[2.4rem] text-lg font-medium tracking-[-0.01em] text-white transition-colors hover:bg-[#b8973f] disabled:opacity-70 md:mb-[0.15rem] md:self-auto",
          )}
        >
          {pending ? "Please wait…" : "Donate"}
          <ArrowUpRight className="size-5" />
        </button>
      </div>
      {(error("frequency") || error("amount")) && (
        <p className="text-sm text-crimson">{error("frequency") ?? error("amount")}</p>
      )}
      <FormMessage status={state.status === "error" ? "idle" : state.status} message={state.message} />
    </form>
  );
}
