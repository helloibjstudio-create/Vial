import type { Metadata } from "next";
import { prayerWatches, WATCH_TIME_ZONE_LABEL } from "@/content/watches";
import { downloadHref } from "@/content/site";
import { Reveal } from "@/components/motion/Reveal";
import { LiveWatchCard, LocalTimeWidget, WatchGridCard } from "@/components/cards/WatchCards";
import { CommitWatchForm } from "@/components/forms/CommitWatchForm";
import { InnerHero } from "@/components/sections/shared";
import { Button } from "@/components/ui/Button";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { PendingDesign } from "@/components/ui/PendingDesign";
import { SectionHeading } from "@/components/ui/Typography";

export const metadata: Metadata = {
  title: "Prayer Watch",
  description: "Eight watches. Twenty-four hours. Every time zone covered. Find your watch and take your place.",
};

function HeroVisual() {
  return (
    <div className="relative flex w-full max-w-[27rem] flex-col gap-[1.44rem] drop-shadow-[0_9px_30px_rgb(0_0_0/0.2)]">
      <LiveWatchCard />
      <LocalTimeWidget />
    </div>
  );
}

/** Prayer Watch — Figma frame 382:9888 (audit §5.5). */
export default function PrayerWatchPage() {
  return (
    <>
      <InnerHero
        className="bg-white"
        eyebrow="The Watch Calendar"
        title="Somewhere on earth, it is always time to pray."
        body={
          <p>
            Eight watches. Twenty-four hours. Every time zone covered. <em className="font-semibold italic">Find your watch. Take your place.</em>
          </p>
        }
        actions={
          <>
            <Button href={downloadHref} variant="glass">
              Download the Vial
            </Button>
            <Button href="#watches" variant="outline-brown">
              See Live Events
            </Button>
          </>
        }
        scrollTarget="watches"
        aside={
          <div aria-hidden={false} className="pointer-events-none absolute inset-y-0 right-0 hidden w-[52%] lg:block">
            <MediaFrame asset="prayerWatchHero" className="absolute -top-[12rem] left-0 h-[76.4rem] w-[71.6rem]" sizes="1145px" labelPosition="bottom-left" />
            <div className="pointer-events-auto absolute top-[18.8rem] left-[8.4rem]">
              <HeroVisual />
            </div>
          </div>
        }
      >
        <div className="mt-14 lg:hidden">
          <HeroVisual />
        </div>
      </InnerHero>

      {/* The Eight Watches */}
      <section id="watches" className="bg-white py-20 lg:pt-[4.4rem] lg:pb-[4.4rem]">
        <div className="container-vial flex flex-col gap-[3.75rem]">
          <Reveal className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading eyebrow="The Eight Watches" title="Every hour is holy ground." className="max-w-[25rem]" />
            <p className="text-sm text-brown/70">All watch times are shown in West Africa Time ({WATCH_TIME_ZONE_LABEL}).</p>
          </Reveal>
          <div className="grid gap-2.5 sm:grid-cols-2 xl:grid-cols-4">
            {prayerWatches.map((w) => (
              <WatchGridCard key={w.id} watch={w} />
            ))}
          </div>
        </div>
      </section>

      {/* Commit to a Watch */}
      <section id="commit" className="bg-fade-white-cream py-20 lg:py-[4.56rem]">
        <div className="container-vial grid grid-cols-[minmax(0,1fr)] items-center gap-12 lg:grid-cols-[minmax(0,33rem)_minmax(0,38rem)] lg:justify-between lg:gap-[6.9rem]">
          <Reveal className="flex flex-col gap-5">
            <SectionHeading
              eyebrow="Commit to a Watch"
              title="Choose your hour. Hold it faithfully."
              body="Committed intercessors select one or more watches and receive automatic reminders 15 minutes before their watch begins. Your consistency builds the altar."
              bodyClassName="max-w-[27.9rem]"
            />
            <blockquote className="max-w-[19.7rem] rounded-chip border border-gold bg-white px-5 py-3 text-lg leading-[1.06rem] font-medium tracking-[-0.05em] italic">
              &ldquo;I have posted watchmen on your walls, Jerusalem; they will never be silent day or night.&rdquo;
              <footer className="mt-1">— Isaiah 62:6</footer>
            </blockquote>
          </Reveal>
          <CommitWatchForm />
        </div>
      </section>

      {/* Section 6 — not inspected */}
      <section className="bg-cream py-20 lg:py-24">
        <div className="container-vial">
          <PendingDesign title="Prayer Watch — Section 6" figmaRef="frame 382:9888 · Section 6 (y ≈ 3,102–4,207)">
            This ≈1,100px section above the footer could not be read before the Figma limit. Its content and layout will be implemented from
            the original frame.
          </PendingDesign>
        </div>
      </section>
    </>
  );
}
