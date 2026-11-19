import Image from "next/image";
import Link from "next/link";
import { assets } from "@/content/assets";
import { cn } from "@/lib/cn";
import { Sparkle } from "./icons";

/**
 * The VIAL mark. The final logo SVG (Figma node 353:8471) is not exported yet;
 * until `assets.logoMark.src` is set, the brand sparkle stands in for the mark.
 */
export function BrandMark({ className, tone = "gold" }: { className?: string; tone?: "gold" | "light" }) {
  const mark = assets.logoMark;
  if (mark.src) {
    return <Image src={mark.src} alt="" width={40} height={58} className={cn("h-full w-auto", className)} />;
  }
  return <Sparkle tone={tone === "light" ? "light" : "gold"} className={cn("size-full", className)} data-asset-pending="logoMark" />;
}

/** Full VIAL logo (mark + wordmark in one SVG, 75×44). The light file has white
 *  letters for dark/photo backgrounds; the dark copy swaps them to Altar Brown. */
const LOGO_SRC = { light: "/Layer%202.svg", brown: "/brand/logo-dark.svg" } as const;

export function Logo({ tone = "light", className, href = "/" }: { tone?: "light" | "brown"; className?: string; href?: string | null }) {
  const content = (
    <Image src={LOGO_SRC[tone]} alt={href ? "" : "VIAL"} width={75} height={44} loading="eager" className="h-10 w-auto lg:h-14" />
  );
  if (!href) return <span className={cn("inline-flex items-center", className)}>{content}</span>;
  return (
    <Link href={href} aria-label="VIAL — home" className={cn("inline-flex shrink-0 items-center", className)}>
      {content}
    </Link>
  );
}
