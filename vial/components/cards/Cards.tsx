import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";
import { assets, type AssetKey } from "@/content/assets";
import type { PrayerRequest, Resource, Testimonial } from "@/content/collections";
import { cn } from "@/lib/cn";
import { ArrowLink } from "@/components/ui/Button";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { LabelPill } from "@/components/ui/Pills";
import { Sparkle } from "@/components/ui/icons";

/**
 * Object art placement on the 321×330 resource card, in Figma px (matched against the
 * frame render): the cut-out bleeds off the right / bottom edges and the card clips it.
 */
const resourceArt: Partial<Record<AssetKey, { left: number; top: number; width: number }>> = {
  prayerHands: { left: 87, top: -52, width: 320 },
  resourceSounds: { left: 142, top: 64, width: 180 },
};

/** Resource card — 321×330, Incense Gold, radius 40, 3D gold object (Home Section 9 / Resources Hub). */
export function ResourceCard({ resource, withCta = false, className }: { resource: Resource; withCta?: boolean; className?: string }) {
  const art = resourceArt[resource.image];
  const img = assets[resource.image];
  // Card keeps Figma's 321×330 proportions at every width so the object art scales with it (it can still grow taller for longer copy).
  return (
    <article className={cn("relative isolate aspect-[321/330] overflow-hidden rounded-card bg-gold", className)}>
      {art && img.src ? (
        <Image
          src={img.src}
          alt=""
          width={img.width ?? 600}
          height={img.height ?? 800}
          sizes="(min-width: 1024px) 320px, 60vw"
          className="pointer-events-none absolute -z-10 h-auto max-w-none"
          style={{ left: `${(art.left / 321) * 100}%`, top: `${(art.top / 330) * 100}%`, width: `${(art.width / 321) * 100}%` }}
        />
      ) : (
        <span hidden data-asset-pending={resource.image} title={`Asset pending — Figma ${img.figma}`} />
      )}
      <div className="relative flex h-full flex-col gap-[0.8rem] px-[2.56rem] pt-[4.4rem] pb-[2.75rem] text-white lg:pt-[5.875rem]">
        <h3 className="font-display text-h4 font-semibold whitespace-pre-line italic">{resource.cardTitle}</h3>
        <p className="max-w-[15.2rem] text-lg leading-[1.125rem] tracking-[-0.05em]">{resource.description}</p>
        {withCta && (
          <ArrowLink href={resource.href} className="mt-1 text-white">
            {resource.cta}
          </ArrowLink>
        )}
      </div>
    </article>
  );
}

/** Testimonial card — 659×458 white, photo right with shadow (Home / Prayer Wall Section 6). */
export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="relative flex min-h-[28.6rem] flex-col overflow-hidden rounded-card bg-white">
      {/*
        Figma "Rectangle 40488" is a vector, not a rectangle: the photo's left edge is a diagonal that
        leans right at the top (116px in at y=0 → 0 at y=458 on the 350×458 frame), with rounded corners.
        The clip is applied to the image; the shadow sits on the wrapper so the clip doesn't cut it off.
        The photo overlays the right 350/659 of the card, so the quote keeps Figma's 297px measure beside the diagonal.
      */}
      <svg aria-hidden="true" width="0" height="0" className="absolute">
        <defs>
          <clipPath id={`slant-${testimonial.image}`} clipPathUnits="objectBoundingBox">
            <path d="M0.445 0 L0.886 0 Q1 0 1 0.087 L1 0.913 Q1 1 0.886 1 L0.114 1 Q0 1 0.028 0.915 L0.303 0.085 Q0.331 0 0.445 0 Z" />
          </clipPath>
        </defs>
      </svg>
      <div className="sm:absolute sm:inset-y-0 sm:right-0 sm:w-[53.1%] sm:drop-shadow-[-14px_0_28px_rgb(0_0_0/0.2)]">
        <div className="h-full sm:[clip-path:var(--slant)]" style={{ "--slant": `url(#slant-${testimonial.image})` } as CSSProperties}>
          <MediaFrame asset={testimonial.image} className="h-60 rounded-card sm:h-full sm:rounded-none" sizes="(min-width: 640px) 350px, 100vw" />
        </div>
      </div>
      <div className="relative flex flex-1 flex-col justify-between gap-12 px-8 pt-10 pb-12 sm:w-[57.2%] sm:px-10 sm:pt-[6.75rem] sm:pb-[4.75rem]">
        <blockquote className="text-xl leading-[1.3rem] font-medium tracking-[-0.05em] text-brown italic">
          &ldquo;{testimonial.quote}&rdquo;
        </blockquote>
        <figcaption className="flex flex-col gap-2.5">
          <span className="font-display text-2xl leading-[1.3rem] font-semibold tracking-[-0.03em] text-brown">{testimonial.name}</span>
          <span className="text-lg leading-[1.3rem] font-medium tracking-[-0.05em] text-black">
            <span className={testimonial.location.accentColor === "nigeria" ? "text-nigeria" : "text-crimson"}>
              {testimonial.location.accent}
            </span>
            {testimonial.location.rest}
          </span>
        </figcaption>
      </div>
    </figure>
  );
}

/** Numbered card — About "Our Mandate" (01–03) and Join "The Process" steps. */
export function NumberedCard({
  number,
  title,
  children,
  shadow,
  className,
}: {
  number: string;
  title: string;
  children: ReactNode;
  shadow?: boolean;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "flex h-full rounded-card-sm border border-gold bg-white px-[2.65rem] py-14 lg:py-[5.25rem]",
        shadow && "shadow-soft",
        className,
      )}
    >
      <div className="flex gap-5">
        <Sparkle className="mt-1 size-4 shrink-0" />
        <div className="flex flex-col gap-5">
          <p className="font-display text-[2.75rem] leading-6 font-medium tracking-[-0.045em] italic">{number}</p>
          <div className="flex flex-col gap-2.5">
            <h3 className="text-h5 font-semibold text-brown capitalize">{title}</h3>
            <div className="text-body text-brown">{children}</div>
          </div>
        </div>
      </div>
    </article>
  );
}

const requestThemes = {
  cream: { bg: "bg-cream", text: "text-brown", pill: "text-brown" },
  gold: { bg: "bg-gold", text: "text-white", pill: "text-gold" },
  brown: { bg: "bg-brown", text: "text-white", pill: "text-brown" },
};


/** Prayer Wall request card — radius 60, photo strip, count (Prayer Wall Section 8). */
export function PrayerRequestCard({ request, className }: { request: PrayerRequest; className?: string }) {
  const t = requestThemes[request.theme];
  return (
    <article className={cn("relative flex flex-col justify-center overflow-hidden rounded-[2.5rem] lg:rounded-panel", t.bg, className)}>
      <div className="flex flex-col gap-7 p-6 sm:flex-row sm:items-center sm:gap-[1.7rem] sm:py-10 sm:pr-10 sm:pl-[2.4rem] lg:py-[5.5rem] lg:pr-[6.5rem]">
        {/* Figma "Rectangle 40490": 185×512 hands cut-out, starting 76px above the text block and clipped by the card's bottom edge. */}
        <div className="relative h-48 w-full shrink-0 sm:h-[22.5rem] sm:w-[11.6rem]">
          <MediaFrame
            asset="prayerHands"
            label={false}
            className="!absolute inset-0 sm:top-[-4.75rem] sm:bottom-[-2.5rem] lg:bottom-[-5.5rem]"
            imgClassName="object-contain object-bottom sm:object-cover sm:object-top"
            sizes="(min-width: 640px) 380px, 100vw"
          />
        </div>
        <div className="flex flex-1 flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="flex max-w-[27.2rem] flex-col items-start gap-[2.2rem]">
            <LabelPill className={t.pill}>{request.country}</LabelPill>
            <div className="flex flex-col gap-[0.95rem]">
              <h3 className={cn("text-h3 font-semibold", t.text)}>{request.name}</h3>
              <p className={cn("text-lead font-medium", t.text)}>&ldquo;{request.request}&rdquo;</p>
            </div>
          </div>
          <p className={cn("flex flex-col gap-2.5", t.text)}>
            <span className="font-display text-[2.75rem] leading-[0.9] font-semibold tracking-[-0.05em] italic">{request.prayedCount}</span>
            <span className="text-[2rem] leading-[0.9] font-semibold tracking-[-0.05em]">Prayed</span>
          </p>
        </div>
      </div>
    </article>
  );
}
