import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { ArrowRight, ArrowUpRight, CircleChevron } from "./icons";

/**
 * Button family — audit §4.2.
 *  glass          "Download the Vial" pill: brown glass + gold circular icon (component `Download Neutral`)
 *  outline-light  white 1px outline on dark backgrounds
 *  outline-brown  brown 1px outline on light backgrounds
 *  gold           solid gold, white label (Submit Application, Post to the Prayer Wall, …)
 *  gold-ink       solid gold, ink label (Get Involved page)
 *  brown          solid brown, white label (Join, Submit, Explore All Resources)
 *  rect-brown     radius-10 brown (Set Reminder)
 *  rect-outline   radius-10 brown outline (Add to Calendar)
 */
export type ButtonVariant =
  | "glass"
  | "outline-light"
  | "outline-brown"
  | "gold"
  | "gold-ink"
  | "brown"
  | "rect-brown"
  | "rect-outline";

export type ButtonSize = "lg" | "md" | "sm";
type TrailingIcon = "download" | "arrow" | "arrow-up-right" | "none";

const base =
  "group/button relative inline-flex shrink-0 items-center justify-center gap-3 whitespace-nowrap font-sans font-medium text-button transition-[background-color,color,border-color,box-shadow,transform] duration-300 ease-[var(--ease-vial-out)] disabled:cursor-not-allowed aria-disabled:cursor-not-allowed";

const variants: Record<ButtonVariant, string> = {
  glass: "glass-brown rounded-full text-white hover:bg-brown/60",
  "outline-light": "rounded-full border border-white text-white hover:bg-white hover:text-brown",
  "outline-brown": "rounded-full border border-brown text-brown hover:bg-brown hover:text-white",
  gold: "rounded-full bg-gold text-white hover:bg-[#b8973f] disabled:bg-disabled",
  "gold-ink": "rounded-full bg-gold font-semibold text-ink hover:bg-[#d6b75e] disabled:bg-disabled",
  brown: "rounded-full bg-brown text-white hover:bg-[#4a370c] disabled:bg-disabled",
  "rect-brown": "rounded-chip bg-brown text-white hover:bg-[#4a370c] disabled:bg-disabled",
  "rect-outline":
    "rounded-chip border border-brown text-brown hover:bg-brown hover:text-white disabled:border-disabled disabled:text-disabled disabled:hover:bg-transparent",
};

const sizes: Record<ButtonSize, string> = {
  lg: "h-[3.5625rem] px-[1.1875rem]",
  md: "h-[3.25rem] px-7",
  sm: "h-[2.625rem] px-6 text-base",
};

interface CommonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: TrailingIcon;
  className?: string;
  children: ReactNode;
}

type ButtonAsLink = CommonProps & { href: string } & Omit<ComponentPropsWithoutRef<"a">, "href" | "className" | "children">;
type ButtonAsButton = CommonProps & { href?: undefined } & Omit<ComponentPropsWithoutRef<"button">, "className" | "children">;

function Trailing({ icon, variant }: { icon: TrailingIcon; variant: ButtonVariant }) {
  if (icon === "none") return null;
  if (icon === "download") {
    return (
      <span className="grid size-10 place-items-center rounded-full bg-gold text-white transition-transform duration-[800ms] ease-[var(--ease-vial-in)] group-hover/button:translate-x-0.5 group-hover/button:rotate-[-45deg]">
        <CircleChevron className="size-6" />
      </span>
    );
  }
  const soft = variant === "brown" ? "bg-white/15" : "bg-ink/20";
  return (
    <span className={cn("grid size-[2.125rem] place-items-center rounded-full transition-transform duration-300 group-hover/button:translate-x-0.5", soft)}>
      {icon === "arrow" ? <ArrowRight className="size-4" /> : <ArrowUpRight className="size-4" />}
    </span>
  );
}

export function Button(props: ButtonAsLink | ButtonAsButton) {
  const { variant = "outline-brown", size = "lg", icon, className, children, ...rest } = props;
  const resolvedIcon: TrailingIcon = icon ?? (variant === "glass" ? "download" : "none");
  const classes = cn(
    base,
    variants[variant],
    sizes[size],
    resolvedIcon === "download" && "pl-[1.8125rem] pr-[0.5625rem]",
    resolvedIcon !== "download" && resolvedIcon !== "none" && "pr-2.5 pl-7",
    className,
  );
  const content = (
    <>
      <span>{children}</span>
      <Trailing icon={resolvedIcon} variant={variant} />
    </>
  );

  if (rest.href !== undefined) {
    const { href, ...anchorProps } = rest as ButtonAsLink;
    return (
      <Link href={href} className={classes} {...anchorProps}>
        {content}
      </Link>
    );
  }
  const { type = "button", ...buttonProps } = rest as ButtonAsButton;
  return (
    <button type={type} className={classes} {...buttonProps}>
      {content}
    </button>
  );
}

/** "Browse Guides →" text link. With no `href` it renders as inert text (destination pending). */
export function ArrowLink({ href, children, className }: { href: string | null; children: ReactNode; className?: string }) {
  const classes = cn("group/link inline-flex items-center gap-2 text-[0.9375rem] font-semibold tracking-[-0.02em]", className);
  const inner = (
    <>
      {children}
      <ArrowRight className="size-4 transition-transform duration-300 group-hover/link:translate-x-1" />
    </>
  );
  if (!href) {
    return (
      <span className={classes} title="Coming soon">
        {inner}
        <span className="sr-only"> (coming soon)</span>
      </span>
    );
  }
  return (
    <Link href={href} className={classes}>
      {inner}
    </Link>
  );
}
