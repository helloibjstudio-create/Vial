import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Chip-style choices built on native radio / checkbox inputs, so they submit
 * with forms, are keyboard accessible and work without JavaScript.
 *
 * Variants (audit §4.2):
 *  pill      rounded, gold stroke; selected = gold fill + white text (Prayer Wall category)
 *  rect      radius 10, gold stroke; selected = gold fill (Visibility, Reminder preference)
 *  soft      rounded, brown@22% stroke; selected = brown fill (Volunteer roles)
 *  soft-ink  rounded, brown@20% stroke on white@50%; selected = gold fill + ink text (Contact subject)
 */
export type ChoiceVariant = "pill" | "rect" | "soft" | "soft-ink";

const chip: Record<ChoiceVariant, string> = {
  pill: "h-9 min-w-[7.4rem] rounded-full border border-gold bg-white px-6 text-base font-semibold tracking-[-0.03em] text-brown peer-checked:bg-gold peer-checked:text-white",
  rect: "h-[2.8rem] min-w-[7.4rem] rounded-chip border border-gold px-4 text-base font-semibold tracking-[-0.03em] text-brown peer-checked:bg-gold peer-checked:text-white",
  soft: "h-[2.45rem] rounded-full border border-brown/22 px-4 text-sm font-semibold tracking-[-0.015em] text-brown peer-checked:border-brown peer-checked:bg-brown peer-checked:text-white",
  "soft-ink":
    "h-9 rounded-full border border-brown/20 bg-white/50 px-4 text-[0.8125rem] font-semibold tracking-[-0.015em] text-brown peer-checked:border-gold peer-checked:bg-gold peer-checked:text-ink",
};

interface ChoiceGroupProps {
  name: string;
  legend: ReactNode;
  options: readonly string[];
  type?: "radio" | "checkbox";
  defaultValue?: string | string[];
  variant?: ChoiceVariant;
  legendClassName?: string;
  className?: string;
  error?: string;
  /** Render option labels with a custom formatter (e.g. values ≠ labels). */
  labels?: Record<string, string>;
}

export function ChoiceGroup({
  name,
  legend,
  options,
  type = "radio",
  defaultValue,
  variant = "pill",
  legendClassName,
  className,
  error,
  labels,
}: ChoiceGroupProps) {
  const defaults = Array.isArray(defaultValue) ? defaultValue : defaultValue ? [defaultValue] : [];
  const errorId = error ? `${name}-error` : undefined;
  return (
    <fieldset className={cn("min-w-0", className)} aria-describedby={errorId}>
      <legend className={cn("mb-5", legendClassName)}>{legend}</legend>
      <div className={cn("flex flex-wrap", variant === "soft" || variant === "soft-ink" ? "gap-2.5" : "gap-x-5 gap-y-5")}>
        {options.map((option) => (
          <label key={option} className="relative inline-flex cursor-pointer">
            <input
              type={type}
              name={name}
              value={option}
              defaultChecked={defaults.includes(option)}
              className="peer sr-only"
            />
            <span
              className={cn(
                "inline-flex items-center justify-center whitespace-nowrap transition-colors duration-200 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gold hover:border-gold",
                chip[variant],
              )}
            >
              {labels?.[option] ?? option}
            </span>
          </label>
        ))}
      </div>
      {error && (
        <p id={errorId} className="mt-2 text-sm text-crimson">
          {error}
        </p>
      )}
    </fieldset>
  );
}
