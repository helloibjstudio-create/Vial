import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** White status pill with coloured dot: Live Now / Active / Upcoming (audit §4.2). */
export function StatusPill({
  kind,
  children,
  className,
  size = "md",
}: {
  kind: "live" | "active" | "upcoming";
  children: ReactNode;
  className?: string;
  size?: "md" | "sm";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-[5px] rounded-full bg-white font-semibold text-brown capitalize",
        size === "md" ? "h-7 px-[1.75rem] text-base leading-[0.9] tracking-[-0.03em]" : "h-[1.55rem] px-6 text-[0.9rem] tracking-[-0.03em]",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "size-2.5 shrink-0 rounded-full",
          kind === "live" && "bg-live motion-safe:animate-pulse",
          kind === "active" && "bg-active",
          kind === "upcoming" && "bg-brown",
        )}
      />
      {children}
    </span>
  );
}

/** "9am – 12pm *WAT*" pill. */
export function TimePill({ range, zone, className }: { range: string; zone?: string; className?: string }) {
  return (
    <span className={cn("inline-flex h-7 items-center rounded-full bg-white px-[1.75rem] text-base leading-[0.9] font-semibold tracking-[-0.03em] text-brown", className)}>
      {range}
      {zone && <em className="ml-1 italic">{zone}</em>}
    </span>
  );
}

/** Rounded label pill (country on prayer cards, filter tags). */
export function LabelPill({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn("inline-flex h-8 items-center rounded-full bg-white px-8 text-xl leading-[0.9] font-semibold tracking-[-0.03em] capitalize", className)}>
      {children}
    </span>
  );
}
