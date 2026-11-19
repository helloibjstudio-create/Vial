import { storeLinks } from "@/content/site";
import { cn } from "@/lib/cn";
import Image from "next/image";

/**
 * App store badges (Figma component set `Store download button` 83:9595).
 * Official Apple/Google badge artwork and the store URLs are pending (audit §7, §10);
 * badges render as inert elements until `storeLinks` are set.
 */
type BadgeStyle = "solid" | "outline" | "cream";

const styles: Record<BadgeStyle, string> = {
  solid: "bg-brown border-badge-line/80 text-white",
  outline: "border-badge-line text-white",
  cream: "border-cream text-cream",
};

function Badge({
  store,
  style,
  size,
}: {
  store: "googlePlay" | "appStore";
  style: BadgeStyle;
  size: "sm" | "md" | "lg";
}) {
  const href = storeLinks[store];
  const isPlay = store === "googlePlay";
  const label = isPlay ? "Google Play" : "App Store";
  const kicker = isPlay ? "Get it on" : "Download on the";
  const classes = cn(
    "inline-flex items-center border font-sans transition-colors",
    styles[style],
    size === "sm" && "h-[2.15rem] gap-1.5 rounded-[5px] border-[0.85px] px-2.5",
    size === "md" && "h-[3.4rem] gap-2.5 rounded-[12px] px-4",
    size === "lg" && "h-[4.5rem] gap-3 rounded-[20px] border-2 px-6 lg:h-[5.5rem] lg:px-7",
    href && "hover:bg-white/10",
  );
  // Store logos exported from Figma at 18×21 (native size for the small badge); scaled by height for larger badges.
  const glyph = size === "sm" ? "h-[21px]" : size === "md" ? "h-[29px]" : "h-[37px] lg:h-[46px]";
  const inner = (
    <>
      <Image
        src={isPlay ? "/Playstore.png" : "/Apple.png"}
        alt=""
        width={18}
        height={21}
        className={cn("w-auto shrink-0", glyph)}
      />
      <span className="flex flex-col leading-none">
        <span className={cn("uppercase tracking-[0.04em] opacity-85", size === "sm" ? "text-[6px]" : size === "md" ? "text-[9px]" : "text-[11px] lg:text-[13px]")}>
          {kicker}
        </span>
        <span className={cn("font-semibold tracking-[-0.01em]", size === "sm" ? "text-[11px]" : size === "md" ? "text-[17px]" : "text-[22px] lg:text-[27px]")}>
          {label}
        </span>
      </span>
    </>
  );
  if (!href) {
    return (
      <span className={classes} aria-label={`${label} — coming soon`} role="img" title="Store link coming soon">
        {inner}
      </span>
    );
  }
  return (
    <a href={href} className={classes} target="_blank" rel="noreferrer" aria-label={`${kicker} ${label}`}>
      {inner}
    </a>
  );
}

export function StoreBadges({
  style = "solid",
  size = "md",
  direction = "row",
  className,
}: {
  style?: BadgeStyle;
  size?: "sm" | "md" | "lg";
  direction?: "row" | "column";
  className?: string;
}) {
  return (
    <div className={cn("flex flex-wrap items-center", direction === "column" ? "flex-col items-start gap-8" : size === "lg" ? "gap-6 lg:gap-[3.35rem]" : "gap-5", className)}>
      <Badge store="googlePlay" style={style} size={size} />
      <Badge store="appStore" style={style} size={size} />
    </div>
  );
}
