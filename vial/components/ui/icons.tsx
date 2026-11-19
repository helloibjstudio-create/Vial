import { useId, type SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

/**
 * Eyebrow sparkle (Figma "Image [h-3]", 16×16, radial gradient #FFBC00 → brown/white).
 * `tone="light"` is used on dark sections where the outer stop is white.
 */
export function Sparkle({ tone = "brown", ...props }: IconProps & { tone?: "brown" | "light" | "gold" }) {
  const id = useId();
  const outer = tone === "light" ? "#FFFFFF" : tone === "gold" ? "#C9A84C" : "#5C4510";
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" {...props}>
      <defs>
        <radialGradient id={id} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFBC00" />
          <stop offset="100%" stopColor={outer} />
        </radialGradient>
      </defs>
      <path
        d="M8 0C8.55 4.35 11.65 7.45 16 8C11.65 8.55 8.55 11.65 8 16C7.45 11.65 4.35 8.55 0 8C4.35 7.45 7.45 4.35 8 0Z"
        fill={`url(#${id})`}
      />
    </svg>
  );
}

/** Gold circular "go" badge used inside the glass Download pill. */
export function CircleChevron(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="9.25" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10.5 8.5 14 12l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ArrowRight(props: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ArrowUpRight(props: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}>
      <path d="M6 14 14 6M7.5 6H14v6.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ArrowDown(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M12 4v15M5.5 12.5 12 19l6.5-6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Iconly "Arrow – Down 2" (select chevron). */
export function ChevronDown(props: IconProps) {
  return (
    <svg viewBox="0 0 16 10" fill="none" aria-hidden="true" {...props}>
      <path d="M1.5 1.75 8 8.25l6.5-6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Check(props: IconProps) {
  return (
    <svg viewBox="0 0 12 12" fill="none" aria-hidden="true" {...props}>
      <path d="M2.5 6.25 5 8.75l4.5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M4 8h16M4 16h16" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

/** Generic store glyphs. Official Apple/Google badge artwork is pending (audit §7). */
export function PlayGlyph(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M6 3.8v16.4a.8.8 0 0 0 1.2.7l14-8.2a.8.8 0 0 0 0-1.4l-14-8.2a.8.8 0 0 0-1.2.7Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

export function PhoneGlyph(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <rect x="6" y="2.75" width="12" height="18.5" rx="2.75" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10.5 18h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
