import Image from "next/image";
import type { ReactNode } from "react";
import type { AssetKey } from "@/content/assets";
import { prayerRequests, testimonials } from "@/content/collections";
import { cn } from "@/lib/cn";
import { Reveal } from "@/components/motion/Reveal";
import { PrayerRequestCard, TestimonialCard } from "@/components/cards/Cards";
import { DonationWidget } from "@/components/forms/DonationWidget";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { ScrollCue } from "@/components/ui/ScrollCue";
import { Display, Eyebrow, SectionHeading } from "@/components/ui/Typography";

/* ------------------------------------------------------------------ */
/* Inner-page hero (About, Join, Prayer Wall, Prayer Watch, Resources…) */
/* ------------------------------------------------------------------ */

interface InnerHeroProps {
  asset?: AssetKey;
  /** White wash over the photo: "left" (Prayer Wall), "bottom" (Resources). */
  fade?: "none" | "left" | "bottom";
  eyebrow: string;
  title: ReactNode;
  titleClassName?: string;
  body?: ReactNode;
  actions?: ReactNode;
  scrollTarget?: string;
  /** Extra content positioned over the hero (e.g. right-hand imagery). */
  aside?: ReactNode;
  children?: ReactNode;
  className?: string;
}

export function InnerHero({
  asset,
  fade = "none",
  eyebrow,
  title,
  titleClassName,
  body,
  actions,
  scrollTarget,
  aside,
  children,
  className,
}: InnerHeroProps) {
  return (
    <section className={cn("relative isolate overflow-hidden bg-cream lg:min-h-[56.625rem]", className)}>
      {asset && (
        <MediaFrame asset={asset} eager className="absolute inset-0 -z-10" labelPosition="bottom-right">
          {fade === "left" && <div className="absolute inset-0 bg-gradient-to-r from-white via-white/70 to-white/0" />}
          {fade === "bottom" && <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/40 to-white" />}
        </MediaFrame>
      )}
      {aside}
      <div className="container-vial relative pt-32 pb-28 sm:pt-40 lg:pt-[16.25rem] lg:pb-[12rem]">
        {/* With a right-hand image (aside), keep the copy in the left half until there is room for the full measure. */}
        <div className={cn("flex max-w-[54.25rem] flex-col gap-5", aside && "lg:max-w-[46%] 2xl:max-w-[54.25rem]")}>
          <Eyebrow>{eyebrow}</Eyebrow>
          <Display as="h1" size="hero" className={cn("max-w-[42rem]", titleClassName)}>
            {title}
          </Display>
          {body && <div className="max-w-[22rem] text-body text-brown sm:max-w-[27.25rem]">{body}</div>}
          {actions && <div className="mt-0 flex flex-wrap gap-4 lg:gap-5">{actions}</div>}
        </div>
        {children}
      </div>
      {scrollTarget && (
        <div className="absolute inset-x-0 bottom-0 flex justify-center pb-0">
          <ScrollCue targetId={scrollTarget} />
        </div>
      )}
    </section>
  );
}

/* ------------------------------------------------ */
/* Testimonials — "He hears. He answers."            */
/* ------------------------------------------------ */

export function TestimonialsSection({ id }: { id?: string }) {
  return (
    <section id={id} className="bg-cream py-20 lg:pt-[11rem] lg:pb-[6.75rem]">
      <div className="container-vial">
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="From the Prayer Wall"
            title={
              <>
                He hears.
                <br />
                He answers.
              </>
            }
            className="mx-auto max-w-[45rem]"
          />
        </Reveal>
      </div>
      {/* Figma 275:8271: 659×458 cards, 40px apart, starting at x=120 — the row runs off the right edge (scrolls horizontally). */}
      <div
        role="region"
        aria-label="Testimonies"
        tabIndex={0}
        className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-px-5 px-5 pb-2 lg:mt-[7.2rem] lg:gap-10 lg:scroll-pl-[max(1.25rem,calc((100vw-90rem)/2+7.5rem))] lg:pl-[max(1.25rem,calc((100vw-90rem)/2+7.5rem))]"
      >
        {testimonials.map((t, i) => (
          <Reveal key={t.name} delay={i * 120} className="w-[min(88vw,41.2rem)] shrink-0 snap-start">
            <TestimonialCard testimonial={t} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------ */
/* Give section — "Every gift keeps the altar burning." */
/* ------------------------------------------------ */

/** "Powered By" partner logos — Figma 305:8906 (Flutterwave 207 · PayPal 48 · Stripe 92 px wide, ~58 px gaps). */
const partnerLogos = [
  { name: "Flutterwave", src: "/partners/flutterwave.png", width: 207, height: 33 },
  { name: "PayPal", src: "/partners/paypal.png", width: 40, height: 48 },
  { name: "Stripe", src: "/partners/stripe.png", width: 92, height: 38 },
] as const;

export function PoweredBy({ tone = "dark", className }: { tone?: "dark" | "light"; className?: string }) {
  return (
    <ul className={cn("flex flex-wrap items-center justify-center gap-x-[3.6rem] gap-y-4", className)}>
      {partnerLogos.map((p) => (
        <li key={p.name} className={cn(tone === "light" && "rounded-lg bg-white/90 px-3 py-2")}>
          <Image src={p.src} alt={p.name} width={p.width} height={p.height} className="h-auto" style={{ width: p.width }} />
        </li>
      ))}
    </ul>
  );
}

export function GiveSection({ id }: { id?: string }) {
  return (
    <section id={id} className="bg-fade-cream-white pt-20 pb-16 lg:pt-14 lg:pb-[1.1rem]">
      <div className="container-vial">
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="Give to the Movement"
            title="Every gift keeps the altar burning."
            body="VIAL is sustained by the generosity of believers who understand that prayer and the infrastructure that carries it must be supported."
            className="mx-auto max-w-[45rem]"
            bodyClassName="max-w-[33.5rem]"
          />
        </Reveal>
        <div className="relative mt-12 lg:mt-[2.875rem]">
          <Reveal className="relative z-10 mx-auto w-full max-w-[55.6rem]">
            <DonationWidget />
          </Reveal>
          <MediaFrame asset="giveBand" tint="gold" imgClassName="object-[50%_65%]" className="-mt-16 h-[17rem] rounded-card lg:-mt-[6.6rem] lg:mx-0 lg:h-[23.5rem]" sizes="(min-width: 1280px) 1242px, 100vw" />
        </div>
        <div className="mt-16 flex flex-col items-center gap-5 lg:mt-[7.9rem]">
          <p className="text-[1.625rem] font-semibold tracking-[-0.03em] text-black">Powered By</p>
          <PoweredBy />
        </div>
      </div>
    </section>
  );
}

/** Small helper for the many "eyebrow + heading + body" left-aligned blocks. */
export function SplitIntro({ eyebrow, title, children, tone = "brown" }: { eyebrow: string; title: ReactNode; children?: ReactNode; tone?: "brown" | "white" }) {
  return <SectionHeading eyebrow={eyebrow} title={title} body={children} tone={tone} />;
}

/** Progressive widths of the stacked cards (Figma: 1200 → 1220 → 1240). */
const stackInset = ["lg:mx-[1.25rem]", "lg:mx-[0.625rem]", "lg:mx-0"];
/** Figma card heights: 550 → 520 → 490. */
const stackHeight = ["lg:min-h-[34.375rem]", "lg:min-h-[32.5rem]", "lg:min-h-[30.625rem]"];

/** Sticky "card stack" of prayer requests — each card pins slightly lower than the last (Home Section 8 / Prayer Wall). */
export function PrayerWallStack({ className }: { className?: string }) {
  return (
    <ol className={cn("mx-auto flex max-w-[77.5rem] flex-col gap-6 lg:gap-[3.75rem]", className)}>
      {prayerRequests.map((request, i) => (
        <li key={request.id} className={cn("lg:sticky", stackInset[i])} style={{ top: `calc(8.5rem + ${i * 2.25}rem)` }}>
          <PrayerRequestCard request={request} className={cn("shadow-soft lg:shadow-none", stackHeight[i])} />
        </li>
      ))}
    </ol>
  );
}
