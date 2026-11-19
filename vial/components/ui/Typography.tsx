import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Sparkle } from "./icons";

type Tone = "brown" | "white";

/** Uppercase eyebrow with the gradient sparkle — the recurring section label (audit §4.2). */
export function Eyebrow({ children, tone = "brown", className }: { children: ReactNode; tone?: Tone | "gold"; className?: string }) {
  return (
    <p
      className={cn(
        "flex items-center gap-2 text-eyebrow font-semibold uppercase",
        tone === "brown" && "text-brown",
        tone === "white" && "text-white",
        tone === "gold" && "text-gold",
        className,
      )}
    >
      <Sparkle tone={tone === "brown" ? "brown" : tone === "gold" ? "gold" : "light"} className="size-4 shrink-0" />
      <span>{children}</span>
    </p>
  );
}

/** Italic emphasis inside display headings ("The *Prayers Of…*"). `gold` matches the gold italic words. */
export function Em({ children, gold }: { children: ReactNode; gold?: boolean }) {
  return <em className={cn("italic", gold && "text-gold")}>{children}</em>;
}

interface DisplayProps {
  as?: ElementType;
  size?: "intro" | "hero" | "h2";
  tone?: Tone;
  className?: string;
  children: ReactNode;
}

/**
 * Editor's Note display heading (Cormorant Garamond substitute).
 * Figma sets these in TITLE case (`textCase: TITLE`), reproduced with `capitalize`.
 */
export function Display({ as: Tag = "h2", size = "h2", tone = "brown", className, children }: DisplayProps) {
  return (
    <Tag
      className={cn(
        "font-display font-medium text-balance capitalize",
        size === "intro" && "text-intro",
        size === "hero" && "text-hero",
        size === "h2" && "text-h2",
        tone === "brown" ? "text-brown" : "text-white",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

interface SectionHeadingProps {
  eyebrow?: ReactNode;
  title: ReactNode;
  body?: ReactNode;
  align?: "left" | "center";
  tone?: Tone;
  as?: ElementType;
  size?: "hero" | "h2";
  className?: string;
  bodyClassName?: string;
}

/** Eyebrow → Display heading → body stack (20px gaps, audit §3.3). */
export function SectionHeading({
  eyebrow,
  title,
  body,
  align = "left",
  tone = "brown",
  as = "h2",
  size = "h2",
  className,
  bodyClassName,
}: SectionHeadingProps) {
  return (
    <div className={cn("flex flex-col gap-5", align === "center" && "items-center text-center", className)}>
      {eyebrow && <Eyebrow tone={tone}>{eyebrow}</Eyebrow>}
      <Display as={as} size={size} tone={tone}>
        {title}
      </Display>
      {body && (
        <div className={cn("max-w-[33.5rem] text-body", tone === "brown" ? "text-brown" : "text-white", bodyClassName)}>
          {body}
        </div>
      )}
    </div>
  );
}
