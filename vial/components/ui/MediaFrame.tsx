import Image from "next/image";
import type { ReactNode } from "react";
import { assets, type AssetKey, type AssetTone } from "@/content/assets";
import { cn } from "@/lib/cn";

/**
 * Renders a registered image asset. While the asset is not yet exported from
 * Figma (`src: null`), a branded, clearly labelled placeholder is rendered in
 * its place so layouts stay faithful and missing assets are easy to spot.
 */
const tones: Record<AssetTone, string> = {
  dark: "bg-[radial-gradient(120%_90%_at_70%_20%,rgb(201_168_76/0.28)_0%,transparent_55%),linear-gradient(160deg,#2a1f0b_0%,#120d05_55%,#0a0a0a_100%)]",
  warm: "bg-[radial-gradient(90%_80%_at_30%_25%,rgb(245_237_216/0.35)_0%,transparent_60%),linear-gradient(150deg,#8a6a2a_0%,#5c4510_60%,#3a2b0a_100%)]",
  light: "bg-[radial-gradient(80%_70%_at_75%_35%,rgb(201_168_76/0.35)_0%,transparent_60%),linear-gradient(160deg,#fbf6ea_0%,#f5edd8_55%,#eadcb8_100%)]",
  gold: "bg-[radial-gradient(90%_80%_at_50%_20%,rgb(255_255_255/0.35)_0%,transparent_55%),linear-gradient(150deg,#d9bd6c_0%,#c9a84c_45%,#8f7124_100%)]",
  /** Transparent cut-out art (e.g. the phone mockup): outline only, so it never hides the layout behind it. */
  ghost: "rounded-[inherit] border border-dashed border-white/30 bg-white/5",
};

interface MediaFrameProps {
  asset: AssetKey;
  className?: string;
  /** Responsive `sizes` for next/image. */
  sizes?: string;
  /** LCP images: eager loading + high fetch priority (`priority` is deprecated in Next 16). */
  eager?: boolean;
  /** Show the "Image pending" caption on the placeholder. */
  label?: boolean;
  labelPosition?: "bottom-left" | "top-right" | "bottom-right";
  imgClassName?: string;
  /** Override the asset's placeholder tone while `src` is null (e.g. "ghost" on gradient cards). */
  pendingTone?: AssetTone;
  children?: ReactNode;
}

export function MediaFrame({
  asset: key,
  className,
  sizes = "100vw",
  eager,
  label = true,
  labelPosition = "bottom-left",
  imgClassName,
  pendingTone,
  children,
}: MediaFrameProps) {
  const a = assets[key];
  return (
    <div className={cn("relative overflow-hidden", className)}>
      {a.src ? (
        <Image
          src={a.src}
          alt={a.alt}
          fill
          sizes={sizes}
          className={cn("object-cover", imgClassName)}
          loading={eager ? "eager" : "lazy"}
          fetchPriority={eager ? "high" : "auto"}
        />
      ) : (
        <div
          role="img"
          aria-label={a.alt}
          data-asset-pending={key}
          title={`Asset pending — Figma ${a.figma} → ${a.suggestedPath}`}
          className={cn("absolute inset-0", tones[pendingTone ?? a.tone])}
        >
          {label && (
            <span
              className={cn(
                "pointer-events-none absolute z-[1] max-w-[80%] truncate rounded-full bg-black/25 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-white/80 backdrop-blur-sm",
                labelPosition === "bottom-left" && "bottom-3 left-3",
                labelPosition === "bottom-right" && "right-3 bottom-3",
                labelPosition === "top-right" && "top-3 right-3",
              )}
            >
              Image pending · {a.alt}
            </span>
          )}
        </div>
      )}
      {children}
    </div>
  );
}
