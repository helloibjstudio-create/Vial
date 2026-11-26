import type { Metadata } from "next";
import { resources } from "@/content/collections";
import { downloadHref } from "@/content/site";
import { Reveal } from "@/components/motion/Reveal";
import { ResourceCard } from "@/components/cards/Cards";
import { Button } from "@/components/ui/Button";
import { ComingSoonButton } from "@/components/ui/ComingSoon";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { Display, Eyebrow } from "@/components/ui/Typography";
import { Check, Sparkle } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "Resources Hub",
  description: "Guides, soundscapes, sermons, and fasting plans curated for intercessors at every stage of the watch.",
};

const psalmsDays = [
  { day: "Day 1", text: "Psalm 91 — Protection", done: true },
  { day: "Day 2", text: "Psalm 46 — Strength", done: true },
  { day: "Day 3", text: "Psalm 23 — Rest", done: false },
];

/** Resources Hub — Figma frame 404:871 (audit §5.6). */
export default function ResourcesPage() {
  return (
    <>
      {/* Hero (1176px in Figma) */}
      <section className="relative isolate overflow-hidden bg-cream">
        <MediaFrame asset="resourcesHero" eager className="absolute inset-0 -z-10" labelPosition="top-right">
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/35 to-white" />
        </MediaFrame>
        <div className="container-vial relative pt-32 pb-16 sm:pt-40 lg:pt-[16.25rem] lg:pb-[4.75rem]">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex max-w-[42.9rem] flex-col gap-10">
              <div className="flex flex-col items-start gap-5">
                <Eyebrow>Tools That Equip Intercessors</Eyebrow>
                <Display as="h1" size="hero">
                  Everything you need <span className="text-gold">to pray deeper.</span>
                </Display>
                <p className="max-w-[27.25rem] text-body">
                  Guides, soundscapes, sermons, and fasting plans curated for intercessors at every stage of the watch.
                </p>
                <Button href={downloadHref} variant="glass">
                  Download the Vial
                </Button>
              </div>
              {/* Category chips jump to (and highlight) the matching card below. */}
              <nav aria-label="Resource categories">
                <ul className="flex flex-wrap gap-2.5">
                  {resources.map((r) => (
                    <li key={r.id}>
                      <a
                        href={`#resource-${r.id}`}
                        className="inline-flex h-[2.3rem] items-center rounded-full border border-brown/20 bg-gold/8 px-4 text-sm font-medium tracking-[-0.015em] text-brown transition-colors hover:border-brown/50 hover:bg-gold/20"
                      >
                        {r.filterLabel}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            <div className="flex items-center gap-6 lg:mt-[8.9rem] lg:mr-[5.3rem] lg:gap-[2.9rem]">
              <div className="flex flex-col gap-1 rounded-tile bg-white px-[1.375rem] py-4 shadow-brown-sm">
                <span className="text-[1.75rem] leading-[2.6rem] font-bold tracking-[-0.035em]">200+</span>
                <span className="text-[0.8125rem] leading-5 tracking-[-0.015em] text-brown/65">Free Resources</span>
              </div>
              <div className="flex flex-col gap-0.5 rounded-xl bg-brown px-[1.125rem] py-3 shadow-brown-md">
                <span className="text-xl leading-[1.875rem] font-bold tracking-[-0.025em] text-gold">New</span>
                <span className="text-[0.6875rem] leading-4 text-white/65">This week</span>
              </div>
            </div>
          </div>

          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:mt-[10.75rem] xl:grid-cols-4 xl:gap-0.5">
            {resources.map((r, i) => (
              <Reveal key={r.id} delay={i * 80}>
                <div id={`resource-${r.id}`} className="rounded-card target:ring-4 target:ring-gold target:ring-offset-4 target:ring-offset-white">
                  <ResourceCard resource={r} withCta className="w-full" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Featured This Week */}
      <section id="featured" className="relative isolate overflow-hidden bg-brown py-20 lg:py-[2.2rem]">
        <div aria-hidden="true" className="absolute top-[1.2rem] -right-[6.25rem] -z-10 size-[43.75rem] rounded-full bg-[radial-gradient(circle,rgb(201_168_76/0.08)_0%,transparent_65%)]" />
        <div className="container-vial grid items-center gap-14 lg:min-h-[41.9rem] lg:grid-cols-[minmax(0,45.4rem)_minmax(0,21.25rem)] lg:justify-between lg:pr-[8.5rem]">
          <Reveal className="flex flex-col items-start">
            <p className="flex items-center gap-2 text-[0.9375rem] leading-[1.4rem] font-semibold tracking-[0.05em] text-gold uppercase">
              <Sparkle tone="gold" className="size-4" /> Featured This Week
            </p>
            <Display tone="white" className="mt-[1.6rem]">
              Praying the Psalms —
              <br />
              <span className="text-gold">A 7-Day Scripture Journey</span>
            </Display>
            <p className="mt-7 max-w-[30rem] text-lg leading-7 tracking-[-0.03em] text-cream-muted/85">
              Each day, one psalm. One prayer focus. One declaration. Built for intercessors who want to anchor their watch in the living Word.
            </p>
            <ul className="mt-7 flex flex-wrap gap-3">
              {["7 Days", "Daily Psalms", "Free PDF"].map((tag) => (
                <li key={tag} className="inline-flex h-[2.125rem] items-center gap-1.5 rounded-full border border-gold/30 bg-gold/8 px-3.5 text-[0.8125rem] font-medium tracking-[-0.015em] text-white/75">
                  <span aria-hidden="true" className="size-1.5 rounded-full bg-gold" />
                  {tag}
                </li>
              ))}
            </ul>
            <ComingSoonButton
              className="mt-9"
              variant="gold"
              icon="arrow"
              buttonClassName="h-14 font-semibold"
              message="The free guide will be available to download soon."
              messageClassName="text-cream-muted/80"
            >
              Download Free Guide
            </ComingSoonButton>
          </Reveal>

          <Reveal delay={120} className="relative mx-auto w-full max-w-[21.25rem]">
            <div aria-hidden="true" className="absolute -inset-x-20 -inset-y-8 -z-10 bg-[radial-gradient(closest-side,rgb(201_168_76/0.12),transparent)]" />
            <article className="overflow-hidden rounded-card-sm bg-brown shadow-deep">
              <MediaFrame asset="watch02" className="h-[17.5rem] opacity-85" sizes="340px" label={false}>
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-brown/0 from-40% to-brown" />
                <span className="absolute top-4 left-4 inline-flex h-[2.125rem] items-center rounded-full bg-gold px-3.5 text-[0.6875rem] font-bold tracking-[0.045em] text-ink uppercase">
                  7-Day Guide
                </span>
              </MediaFrame>
              <div className="px-7 pt-6 pb-8">
                {/* Figma used Cormorant Garamond here; the display face is used for consistency (audit §3.2). */}
                <h3 className="font-display text-[1.625rem] leading-[1.1] font-medium tracking-[-0.03em] text-white italic">Praying the Psalms</h3>
                <p className="mt-2 text-[0.8125rem] leading-5 tracking-[-0.015em] text-white/50">A Scripture-anchored prayer journey</p>
                <ul className="mt-5 flex flex-col gap-2.5">
                  {psalmsDays.map((d) => (
                    <li key={d.day} className="flex items-center gap-2.5">
                      <span
                        className={
                          d.done
                            ? "grid size-[1.375rem] place-items-center rounded-full border border-gold bg-gold text-brown"
                            : "size-[1.375rem] rounded-full border border-white/15 bg-white/10"
                        }
                      >
                        {d.done && <Check className="size-2.5" />}
                        <span className="sr-only">{d.done ? "Completed" : "Not started"}</span>
                      </span>
                      <span className={d.done ? "text-xs text-white/75" : "text-xs text-white/35"}>
                        <span className={d.done ? "mr-1 text-[0.6875rem] font-semibold tracking-[0.03em] text-gold uppercase" : "mr-1 text-[0.6875rem] font-semibold tracking-[0.03em] uppercase"}>
                          {d.day}
                        </span>
                        {d.text}
                      </span>
                    </li>
                  ))}
                  <li className="pl-8 text-xs text-white/30">+ 4 more days…</li>
                </ul>
              </div>
            </article>
          </Reveal>
        </div>
      </section>

      {/* Build your intercessor toolkit */}
      <section className="border-t border-brown/10 bg-cream py-16 lg:pt-[5.06rem] lg:pb-12">
        <div className="container-vial flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-3">
            <Display>
              Build your intercessor toolkit.
            </Display>
            <p className="text-[1.0625rem] leading-[1.6rem] tracking-[-0.02em] text-brown/70">All resources are free. No account required.</p>
          </div>
          <ComingSoonButton variant="brown" icon="arrow" buttonClassName="h-14 text-base font-semibold" message="The full resource library is coming soon." messageClassName="text-brown/70">
            Explore All Resources
          </ComingSoonButton>
        </div>
      </section>
    </>
  );
}
