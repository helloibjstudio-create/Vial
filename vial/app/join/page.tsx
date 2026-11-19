import type { Metadata } from "next";
import { Reveal } from "@/components/motion/Reveal";
import { NumberedCard } from "@/components/cards/Cards";
import { ApplicationForm } from "@/components/forms/ApplicationForm";
import { InnerHero } from "@/components/sections/shared";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/Typography";
import { Sparkle } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "Join The Movement",
  description: "VIAL is building a verified global network of committed intercessors. Apply to take your place on the watch.",
};

/** Join The Movement — Figma frame 356:8559 (audit §5.3). */
export default function JoinPage() {
  return (
    <>
      <InnerHero
        asset="joinHero"
        eyebrow="You Are Called"
        title="The watch needs your voice."
        body="Vial is building a verified global network of committed intercessors. Not followers. Not casual users. Intercessors."
        actions={
          <Button href="#apply" variant="outline-brown">
            Apply to Join
          </Button>
        }
        scrollTarget="process"
      />

      {/* The Process */}
      <section id="process" className="bg-white py-20 lg:py-[3.75rem]">
        <div className="container-vial flex flex-col items-center gap-10">
          <Reveal>
            <SectionHeading
              align="center"
              eyebrow="The Process"
              title={
                <>
                  Three steps
                  <br />
                  to the altar.
                </>
              }
              body="Vial is the vessel built to carry that mandate into the digital age."
              bodyClassName="max-w-[37.2rem]"
            />
          </Reveal>
          <div className="grid w-full max-w-[73.2rem] gap-5 md:grid-cols-3">
            <Reveal>
              <NumberedCard number="01" title="Apply" shadow className="lg:pt-[5.25rem]">
                Fill out a short form your name, country, church background, prayer availability, and your personal journey with
                intercession.
              </NumberedCard>
            </Reveal>
            <Reveal delay={100}>
              <NumberedCard number="02" title="Verified" shadow className="lg:pt-[5.25rem] lg:pb-[3.56rem]">
                <p>
                  Every application is personally reviewed. Approved intercessors receive a personalized Intercessor Certificate and access to
                  the full Vial community.
                </p>
                <p className="mt-2.5 rounded-chip border border-gold bg-cream px-5 py-2.5 text-base leading-[1.06rem] font-medium tracking-[-0.05em] italic">
                  A personalized Intercessor Certificate is issued to every approved member a symbol of your covenant with the watch.
                </p>
              </NumberedCard>
            </Reveal>
            <Reveal delay={200}>
              <NumberedCard number="03" title="Activated" shadow className="lg:pt-[5.25rem]">
                Join your assigned watch. Access private resources, newsletters, and the app. Begin.
              </NumberedCard>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Your Application */}
      <section id="apply" className="bg-cream py-20 lg:py-[4.75rem]">
        <div className="container-vial flex flex-col items-center gap-[3.75rem]">
          <Reveal>
            <SectionHeading
              align="center"
              eyebrow="Your Application"
              title="Tell us who you are."
              body="Every intercessor in this network is personally known. We review every application because what you carry matters, and the watch deserves commitment."
              bodyClassName="max-w-[43.2rem]"
            />
          </Reveal>
          <div className="w-full max-w-[58.2rem]">
            <ApplicationForm />
          </div>
          <Reveal className="flex max-w-[43.25rem] flex-col items-center gap-2.5 text-center">
            <h3 className="flex items-center gap-2.5 text-h5 font-semibold capitalize">
              <Sparkle className="size-4" /> Who is this for?
            </h3>
            <p className="text-body">
              This application is for believers who feel called to structured, regular intercession not occasional prayer, but a committed
              watch. If that is you, we want to know your name.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
