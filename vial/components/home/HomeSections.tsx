import type { ReactNode } from "react";
import { resources } from "@/content/collections";
import { featuredWatchIds, getWatch } from "@/content/watches";
import type { AssetKey } from "@/content/assets";
import { cn } from "@/lib/cn";
import { Reveal } from "@/components/motion/Reveal";
import { ResourceCard } from "@/components/cards/Cards";
import { WatchFeatureCard } from "@/components/cards/WatchCards";
import { Button } from "@/components/ui/Button";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { PendingDesign } from "@/components/ui/PendingDesign";
import { StoreBadges } from "@/components/ui/StoreBadges";
import { Display, Eyebrow, SectionHeading } from "@/components/ui/Typography";
import { Sparkle } from "@/components/ui/icons";

/* =========================================================================
   Stage 3 — "More Than an App." + bento (top of frame 239:8140, Section 2)
   ========================================================================= */

function BentoCard({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div
      className={cn(
        "relative isolate overflow-hidden rounded-[2.75rem] border border-white/15 shadow-[inset_0_1px_0_rgb(255_255_255/0.18)] backdrop-blur-[2px]",
        className,
      )}
    >
      {/* Dark glass at the top fading to Incense Gold at the bottom (Figma "Rectangle 40485"). */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-b from-[#1f1708]/45 via-brown/60 via-55% to-gold" />
      {children}
    </div>
  );
}

function BentoLabel({ lead, accent, className }: { lead: ReactNode; accent: string; className?: string }) {
  return (
    <p className={cn("relative z-10 flex flex-col text-white", className)}>
      <span className="text-[clamp(1.75rem,1.4rem+1vw,2.1875rem)] leading-[0.95] font-medium tracking-[-0.02em]">{lead}</span>
      <span className="font-display text-[clamp(2.75rem,2.2rem+1.6vw,3.4375rem)] leading-[0.9] font-semibold tracking-[-0.03em] italic">{accent}</span>
    </p>
  );
}

export function MoreThanAnApp() {
  return (
    <div className="mx-auto max-w-[90rem] px-[clamp(1.25rem,4.7vw,4.25rem)]">
      <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
        <div className="flex flex-col items-start gap-5">
          <Display tone="white">More Than an App.</Display>
          <Button href="/join" variant="outline-light">
            Join the Movement
          </Button>
        </div>
        <p className="max-w-[31.4rem] text-body text-white">
          VIAL is not built as a social platform or content feed. It is designed as a spiritual system. A place where prayer is
          structured, intentional, and consistent. Whether you are starting your journey or seeking deeper discipline, VIAL gives you
          the tools to remain present, focused, and connected.
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:mx-[0.94rem] lg:grid-cols-[413fr_367fr_414fr] lg:gap-x-10 lg:gap-y-[1.2rem]">
        <BentoCard className="min-h-[30rem] md:row-span-2 lg:h-[35.2rem]">
          <BentoLabel lead={<>Installs<br />across all</>} accent="Platforms" className="pt-[5.8rem] pl-[clamp(2rem,4.5vw,4.06rem)]" />
          {/* Figma export is pre-cropped to the card (413×334), anchored to the card bottom. */}
          <MediaFrame asset="bentoPhone" pendingTone="ghost" className="absolute inset-x-0 bottom-0 aspect-[413/334]" sizes="(min-width: 1024px) 413px, 50vw" labelPosition="top-right" />
          <div className="absolute inset-x-0 bottom-[1.7rem] flex justify-center">
            <StoreBadges style="solid" size="sm" />
          </div>
        </BentoCard>

        <BentoCard className="min-h-[18.8rem] lg:h-[18.8rem]">
          {/* Figma export (250×301) spans the full card height, centred. */}
          <MediaFrame asset="prayerPortrait" pendingTone="ghost" className="absolute inset-y-0 left-1/2 aspect-[250/301] -translate-x-1/2" sizes="250px" label={false} />
          <BentoLabel lead="All Intercessors" accent="Active" className="gap-0 pt-11 pl-[2.3rem] [&>span:last-child]:-mt-1.5" />
        </BentoCard>

        <BentoCard className="min-h-[15.2rem] md:col-start-2 lg:col-start-2 lg:row-start-2 lg:h-[15.2rem]">
          {/* Figma export (366×155) is the bottom strip of the card. */}
          <MediaFrame asset="nations" pendingTone="ghost" className="absolute inset-x-0 bottom-0 aspect-[366/155]" sizes="(min-width: 1024px) 366px, 50vw" label={false} />
          <BentoLabel lead="All Nations" accent="Represented" className="pt-[2.6rem] pl-[1.94rem] [&>span:last-child]:-mt-1.5" />
        </BentoCard>

        <BentoCard className="min-h-[30rem] md:col-span-2 lg:col-span-1 lg:col-start-3 lg:row-span-2 lg:row-start-1 lg:h-[35.2rem]">
          {/* Figma export (414×563) covers the whole card. */}
          <MediaFrame asset="nightWatch" pendingTone="ghost" className="absolute inset-0" imgClassName="object-bottom" sizes="(min-width: 1024px) 414px, 100vw" labelPosition="bottom-right" />
          <p className="relative z-10 pt-[5.56rem] pl-[2.3rem] font-display text-[clamp(2.5rem,2rem+1.4vw,3.4375rem)] leading-[0.89] font-semibold tracking-[-0.04em] whitespace-nowrap text-white italic">
            The Watch
            <br />
            Never Goes Dark.
          </p>
        </BentoCard>
      </div>
    </div>
  );
}

/* =========================================================================
   Section 3 — "Why VIAL Exists / One calling. A Thousand Tongues."
   ========================================================================= */

export function WhyVialExists() {
  return (
    <section className="relative isolate overflow-hidden bg-sacred">
      <MediaFrame asset="whyVialBg" className="absolute inset-0 -z-10" labelPosition="bottom-right">
        {/* hand.svg already has the gold colour blend baked in, so no extra gold overlay. */}
        {/* Overall dim: mutes the gold to the deep olive-brown of the design. */}
        <div aria-hidden="true" className="absolute inset-0 bg-sacred/30" />
        {/* Dark top so this section blends out of "More Than an App" (black). */}
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-[60%] bg-gradient-to-b from-sacred via-sacred/70 via-30% to-sacred/0" />
        {/* Darker right side; the light stays on the left, as in the design. */}
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-l from-sacred/70 via-sacred/20 via-45% to-sacred/0" />
      </MediaFrame>
      <Reveal className="container-vial flex min-h-[42rem] flex-col items-center justify-center gap-[1.875rem] py-24 text-center text-white">
        <p className="font-display text-[2rem] leading-[0.9] tracking-[-0.01em] italic">Why VIAL Exists</p>
        <h2 className="max-w-[47rem] text-[clamp(2.5rem,1.6rem+3vw,4rem)] leading-[0.9] font-medium tracking-[-0.01em]">
          One calling.
          <br />
          <span className="font-display font-semibold italic">A Thousand Tongues.</span>
        </h2>
        <div className="max-w-[47rem] text-body">
          <p>
            In Revelation 5:8, Golden Vials filled with incense were held before the throne and that incense was the prayers of the
            saints. VIAL was built on that image. A global vessel, gathering intercession from every nation, filling heaven with the
            fragrance of unified prayer.
          </p>
          <p>This is not an app. It is an altar you carry.</p>
        </div>
      </Reveal>
    </section>
  );
}

/* =========================================================================
   Section 4 — "The altar is always lit." + watch carousel
   ========================================================================= */

const featureCards: { theme: "brown" | "gold" | "black"; image: AssetKey }[] = [
  { theme: "brown", image: "watch01" },
  { theme: "gold", image: "watch02" },
  { theme: "black", image: "watch03" },
];

export function AltarAlwaysLit() {
  return (
    <section className="bg-fade-cream-brown overflow-hidden pt-20 pb-20 lg:pt-[9.9rem] lg:pb-[8.1rem]">
      <Reveal className="container-vial flex flex-col items-center gap-5 text-center">
        <Display>The altar is always lit.</Display>
        <Button href="/join" variant="outline-brown">
          Join the Movement
        </Button>
      </Reveal>
      <div
        role="region"
        aria-label="Prayer watches"
        tabIndex={0}
        className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-[1.875rem] overflow-x-auto scroll-px-6 px-6 pb-2 lg:mt-[5.1rem] min-[1440px]:justify-center min-[1440px]:overflow-visible min-[1440px]:px-0"
      >
        {featuredWatchIds.map((id, i) => {
          const watch = getWatch(id);
          if (!watch) return null;
          return <WatchFeatureCard key={id} watch={watch} theme={featureCards[i].theme} image={featureCards[i].image} />;
        })}
      </div>
    </section>
  );
}

/* =========================================================================
   Section 5 — "The VIAL App — Carry the altar everywhere you go." (brown)
   ========================================================================= */

const appFeatures = [
  { title: "Prayer Watches", body: "Time-zone aware watches with 15-minute reminders and live headcount." },
  { title: "Guided Prayer Rooms", body: "Scripture-led sessions with soaking sounds for healing, nations, revival, and more." },
  { title: "Prayer Journal", body: "Private, searchable, tagged entries with an answered prayer timeline." },
  { title: "Live Global Events", body: "Zoom-integrated prayer conferences and global nights of prayer." },
];

export function AppShowcase() {
  return (
    <section id="app" className="relative isolate overflow-hidden bg-brown py-20 lg:pt-[14.3rem] lg:pb-[14rem]">
      <div
        aria-hidden="true"
        className="absolute top-[41rem] left-[46rem] -z-10 size-[54.7rem] bg-[linear-gradient(45deg,#c9a84c,#ffffff)] opacity-90 blur-[220px]"
      />
      <MediaFrame
        asset="appMockup"
        className="-z-10 mx-auto mt-0 mb-12 aspect-[1598/1066] w-[min(100%,40rem)] lg:absolute lg:top-[22.4rem] lg:left-[11.2rem] lg:mb-0 lg:w-[99.9rem] lg:max-w-none"
        sizes="(min-width: 1024px) 1600px, 100vw"
        labelPosition="bottom-right"
      />
      <div className="container-vial">
        <div className="flex max-w-[44.8rem] flex-col gap-20 lg:pl-0">
          <Reveal className="flex flex-col gap-10">
            <div className="flex flex-col gap-5">
              <Eyebrow tone="white">The VIAL App</Eyebrow>
              <Display tone="white">
                Carry the altar
                <br />
                everywhere you go.
              </Display>
            </div>
            <ul className="flex max-w-[24.75rem] flex-col gap-10">
              {appFeatures.map((f) => (
                <li key={f.title} className="flex gap-2.5">
                  <Sparkle tone="light" className="mt-0.5 size-4 shrink-0" />
                  <div className="flex flex-col gap-2.5 text-white">
                    <h3 className="text-h5 font-semibold capitalize">{f.title}</h3>
                    <p className="text-body">{f.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
          <StoreBadges style="outline" size="lg" />
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   Section 7 — partially inspected (frame 239:8140, y≈5558–6667)
   ========================================================================= */

export function AppStoryPartial() {
  return (
    <section className="bg-fade-cream-white py-20 lg:py-24">
      <div className="container-vial grid items-center gap-12 lg:grid-cols-[minmax(0,36rem)_1fr] lg:gap-[5.6rem]">
        <Reveal>
          <SectionHeading
            eyebrow="The VIAL App"
            title={
              <>
                Carry the altar
                <br />
                everywhere you go.
              </>
            }
          />
        </Reveal>
        <PendingDesign title="Golden Vials Initiative story — remainder of Section 7" figmaRef="frame 239:8140 · Section 7 (node 275:8272)">
          Known so far: the eyebrow and heading shown here, followed by a paragraph that begins “The Golden Vials Initiative was born in
          prayer from a deep encounter with the image i…” (truncated in the inspection) and a right-hand column of unknown content.
        </PendingDesign>
      </div>
    </section>
  );
}

/* =========================================================================
   Section 8 — not inspected (frame 239:8140, y≈6667–8987, ≈2,320px)
   ========================================================================= */

export function HomeSection8Pending() {
  return (
    <section className="bg-white py-20 lg:py-24">
      <div className="container-vial">
        <PendingDesign title="Home — Section 8" figmaRef="frame 239:8140 · Section 8 (y ≈ 6,667–8,987)">
          This ≈2,320px section between the Section 7 story and the Resources Hub preview could not be read before the Figma
          limit. Its content and layout will be implemented from the original frame.
        </PendingDesign>
      </div>
    </section>
  );
}

/* =========================================================================
   Section 9 — "Resources Hub / Everything you need to pray deeper."
   ========================================================================= */

export function ResourcesPreview() {
  return (
    <section className="bg-fade-white-cream pt-20 pb-24 lg:pt-[5.45rem] lg:pb-[7.2rem]">
      <div className="container-vial">
        <Reveal>
          <SectionHeading align="center" eyebrow="Resources Hub" title="Everything you need to pray deeper." className="mx-auto max-w-[45rem]" />
        </Reveal>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4 lg:gap-[0.94rem]">
          {resources.map((r, i) => (
            <Reveal key={r.id} delay={i * 90}>
              <ResourceCard resource={r} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

