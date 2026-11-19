import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Documented placeholder for Figma sections that could not be inspected before
 * the MCP rate limit (audit §10). It states exactly what is pending so the
 * final design is never invented.
 */
export function PendingDesign({
  title,
  figmaRef,
  children,
  tone = "light",
  className,
}: {
  title: string;
  figmaRef: string;
  children?: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <div
      data-pending-design={figmaRef}
      className={cn(
        "rounded-card-sm border border-dashed p-8 lg:p-12",
        tone === "light" ? "border-brown/30 bg-white/60 text-brown" : "border-white/30 bg-white/5 text-white",
        className,
      )}
    >
      <p className="text-eyebrow font-semibold tracking-[0.08em] uppercase opacity-70">Design pending</p>
      <p className="mt-3 font-display text-h5 font-medium">{title}</p>
      <p className="mt-2 text-body-sm opacity-80">
        This part of the Figma design ({figmaRef}) has not been inspected yet. It will be built from the original frame as
        soon as Figma access resumes.
      </p>
      {children && <div className="mt-4 text-body-sm opacity-80">{children}</div>}
    </div>
  );
}
