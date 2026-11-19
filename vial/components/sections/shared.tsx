import type { ReactNode } from "react";
import type { AssetKey } from "@/content/assets";
import { paymentPartners, testimonials } from "@/content/collections";
import { cn } from "@/lib/cn";
import { Reveal } from "@/components/motion/Reveal";
import { TestimonialCard } from "@/components/cards/Cards";
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
        <div className="flex max-w-[54.25rem] flex-col gap-5">
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
          <SectionHeading align="center" eyebrow="From the Prayer Wall" title="He hears. He answers." className="mx-auto max-w-[45rem]" />
        </Reveal>
        <div className="mt-12 grid gap-10 lg:mt-[7.2rem] lg:grid-cols-2">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 120}>
              <TestimonialCard testimonial={t} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------ */
/* Give section — "Every gift keeps the altar burning." */
/* ------------------------------------------------ */

export function PoweredBy({ tone = "dark", className }: { tone?: "dark" | "light"; className?: string }) {
  // Official partner logos pending (audit §7); wordmarks are set in type until supplied.
  return (
    <ul className={cn("flex flex-wrap items-center justify-center gap-x-14 gap-y-4", className)}>
      {paymentPartners.map((p) => (
        <li
          key={p}
          className={cn(
            "text-[1.9rem] font-semibold tracking-[-0.03em]",
            tone === "dark" ? "text-sacred/80" : "text-white/70",
            p === "PayPal" && "italic",
          )}
          title={`${p} logo pending`}
        >
          {p}
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
          <MediaFrame asset="giveBand" className="-mt-16 h-[17rem] rounded-card lg:-mt-[6.6rem] lg:mx-0 lg:h-[23.5rem]" sizes="(min-width: 1280px) 1242px, 100vw" />
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
