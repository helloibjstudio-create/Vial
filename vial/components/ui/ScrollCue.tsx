"use client";

import { cn } from "@/lib/cn";
import { ArrowDown } from "./icons";

/**
 * Inner-page scroll cue (98px badge centred at the bottom of each hero).
 * The original is a masked raster animation (Figma image 4e4b094f…) that has not
 * been exported; this CSS rendition keeps size, colours and behaviour.
 * Prototype: scroll to next section, "Gentle" easing, ~1s (audit §6).
 */
export function ScrollCue({ targetId, className, label = "Scroll to the next section" }: { targetId: string; className?: string; label?: string }) {
  return (
    <a
      href={`#${targetId}`}
      aria-label={label}
      onClick={(e) => {
        const el = document.getElementById(targetId);
        if (!el) return;
        e.preventDefault();
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
      }}
      className={cn("group relative grid size-[4.5rem] place-items-center rounded-full lg:size-[6.125rem]", className)}
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 rounded-full border border-dashed border-brown/45 motion-safe:animate-[spin_14s_linear_infinite]"
      />
      <span className="grid size-[3.4rem] place-items-center rounded-full bg-brown text-white transition-transform duration-500 group-hover:translate-y-1 lg:size-[4.1rem]">
        <ArrowDown className="size-6 lg:size-7" />
      </span>
    </a>
  );
}
