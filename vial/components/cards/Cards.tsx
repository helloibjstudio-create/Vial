import type { ReactNode } from "react";
import type { PrayerRequest, Resource, Testimonial } from "@/content/collections";
import { cn } from "@/lib/cn";
import { ArrowLink } from "@/components/ui/Button";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { LabelPill } from "@/components/ui/Pills";
import { Sparkle } from "@/components/ui/icons";

/** Resource card — 321×330, gold + photo, radius 40 (Home Section 9 / Resources Hub). */
export function ResourceCard({ resource, withCta = false, className }: { resource: Resource; withCta?: boolean; className?: string }) {
  return (
    <MediaFrame
      asset={resource.image}
      label={false}
      sizes="(min-width: 1024px) 321px, (min-width: 640px) 50vw, 100vw"
      className={cn("min-h-[20.6rem] rounded-card bg-gold", className)}
    >
      {/* Light top scrim keeps white type legible on real photography. */}
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-brown/30 via-brown/5 to-transparent" />
      <div className="relative flex h-full flex-col gap-[0.8rem] px-[2.56rem] pt-[4.4rem] pb-[2.75rem] text-white lg:pt-[5.875rem]">
        <h3 className="max-w-[12.3rem] font-display text-h4 font-semibold italic">{resource.title}</h3>
        <p className="max-w-[15.2rem] text-lg leading-[1.125rem] tracking-[-0.05em]">{resource.description}</p>
        {withCta && (
          <ArrowLink href={resource.href} className="mt-1 text-white">
            {resource.cta}
          </ArrowLink>
        )}
      </div>
    </MediaFrame>
  );
}

/** Testimonial card — 659×458 white, photo right with shadow (Home / Prayer Wall Section 6). */
export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="relative grid min-h-[28.6rem] overflow-hidden rounded-card bg-white sm:grid-cols-[minmax(0,1fr)_minmax(0,21.9rem)]">
      <MediaFrame
        asset={testimonial.image}
        className="order-first h-60 rounded-card shadow-photo sm:order-last sm:h-auto"
        sizes="(min-width: 640px) 350px, 100vw"
      />
      <div className="flex flex-col justify-between gap-12 px-8 pt-10 pb-12 sm:px-10 sm:pt-[6.75rem] sm:pb-[4.75rem]">
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

const nf = new Intl.NumberFormat("en-US");

/** Prayer Wall request card — radius 60, photo strip, count (Prayer Wall Section 8). */
export function PrayerRequestCard({ request, className }: { request: PrayerRequest; className?: string }) {
  const t = requestThemes[request.theme];
  return (
    <article className={cn("relative overflow-hidden rounded-[2.5rem] lg:rounded-panel", t.bg, className)}>
      <div className="flex flex-col gap-7 p-6 sm:flex-row sm:items-center sm:gap-[1.7rem] sm:py-10 sm:pr-10 sm:pl-[2.4rem] lg:py-[5.5rem] lg:pr-[6.5rem]">
        <MediaFrame asset="prayerPortrait" label={false} className="h-48 w-full shrink-0 rounded-[1.5rem] sm:h-[22.5rem] sm:w-[11.6rem] sm:rounded-none" sizes="190px" />
        <div className="flex flex-1 flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="flex max-w-[27.2rem] flex-col items-start gap-[2.2rem]">
            <LabelPill className={t.pill}>{request.country}</LabelPill>
            <div className="flex flex-col gap-[0.95rem]">
              <h3 className={cn("text-h3 font-semibold", t.text)}>{request.name}</h3>
              <p className={cn("text-lead font-medium", t.text)}>&ldquo;{request.request}&rdquo;</p>
            </div>
          </div>
          <p className={cn("flex flex-col gap-2.5", t.text)}>
            <span className="font-display text-[2.75rem] leading-[0.9] font-semibold tracking-[-0.05em] italic">{nf.format(request.prayedCount)}</span>
            <span className="text-[2rem] leading-[0.9] font-semibold tracking-[-0.05em]">Prayed</span>
          </p>
        </div>
      </div>
    </article>
  );
}
