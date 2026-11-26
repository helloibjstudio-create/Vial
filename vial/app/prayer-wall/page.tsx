import type { Metadata } from "next";
import { downloadHref } from "@/content/site";
import { Reveal } from "@/components/motion/Reveal";
import { PrayerRequestForm } from "@/components/forms/PrayerRequestForm";
import { InnerHero, PrayerWallStack, TestimonialsSection } from "@/components/sections/shared";
import { Button } from "@/components/ui/Button";
import { ComingSoonButton } from "@/components/ui/ComingSoon";
import { SectionHeading } from "@/components/ui/Typography";

export const metadata: Metadata = {
  title: "Prayer Wall",
  description: "Every need. Every nation. Every prayer counted. Bring your request to the VIAL Prayer Wall.",
};

/** Prayer Wall — Figma frame 369:9336 (audit §5.4). */
export default function PrayerWallPage() {
  return (
    <>
      <InnerHero
        asset="prayerWallHero"
        eyebrow="The Prayer Wall"
        title={
          <>
            Every need.
            <br />
            Every nation.
            <br />
            Every prayer counted.
          </>
        }
        actions={
          <>
            <Button href={downloadHref} variant="glass">
              Download the Vial
            </Button>
            <Button href="/get-involved#contact" variant="outline-brown">
              Share a Testimony
            </Button>
          </>
        }
        scrollTarget="wall"
      />

      {/* The wall — stacked request cards */}
      <section id="wall" className="bg-white pt-20 pb-24 lg:pt-[5.4rem] lg:pb-[5.4rem]">
        <div className="container-vial">
          <Reveal className="flex flex-col items-center gap-5">
            <SectionHeading align="center" eyebrow="The Prayer Wall" title={
          <>
            Every need.
            <br />
            Every nation.
            <br />
            Every prayer counted.
          </>
        } className="max-w-[36rem]" />
            <div className="flex flex-wrap items-start justify-center gap-5">
              <Button href={downloadHref} variant="glass">
                Download the Vial
              </Button>
              <ComingSoonButton variant="outline-brown" message="More requests will appear here once the live Prayer Wall is connected." messageClassName="max-w-[14rem] text-brown/70">
                Load More
              </ComingSoonButton>
            </div>
          </Reveal>

          <PrayerWallStack className="mt-14 lg:mt-24" />
        </div>
      </section>

      {/* Bring Your Need */}
      <section id="request" className="bg-fade-white-cream py-20 lg:py-[7.25rem]">
        <div className="container-vial grid items-center gap-12 lg:grid-cols-[minmax(0,33rem)_minmax(0,40rem)] lg:justify-between lg:gap-[4.7rem]">
          <Reveal>
            <SectionHeading
              eyebrow="Bring Your Need"
              title="No request is too small. No burden too heavy."
              body="Whatever you are carrying bring it to the wall. Thousands of intercessors across the globe are watching, waiting, and ready to stand with you."
              bodyClassName="max-w-[31.4rem]"
            />
          </Reveal>
          <PrayerRequestForm />
        </div>
      </section>

      <TestimonialsSection />
    </>
  );
}
