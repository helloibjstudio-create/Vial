import type { Metadata } from "next";
import { downloadHref } from "@/content/site";
import { Reveal } from "@/components/motion/Reveal";
import { NumberedCard } from "@/components/cards/Cards";
import { GiveSection, InnerHero } from "@/components/sections/shared";
import { Button } from "@/components/ui/Button";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { Em, Eyebrow, Display, SectionHeading } from "@/components/ui/Typography";

export const metadata: Metadata = {
  title: "About",
  description: "VIAL began with one image in scripture: golden vials full of incense — the prayers of the saints (Revelation 5:8).",
};

const mandate = [
  {
    number: "01",
    title: "Daily Prayer Watches",
    body: "Round-the-clock intercession anchored in the eight biblical watches. Every hour covered. Every nation represented. The altar never goes dark.",
  },
  {
    number: "02",
    title: "Strategic Intercession",
    body: "Prayer that is targeted, informed, and sustained for global transformation, revival, and the Church. Not passive. Not generic. Deliberate.",
  },
  {
    number: "03",
    title: "Technology & Unity",
    body: "Empowering believers through tools, teaching, and connection so no intercessor prays alone. One body. One voice. One fragrance rising.",
  },
];

/** About — Figma frame 310:9042 (audit §5.2). */
export default function AboutPage() {
  return (
    <>
      <InnerHero
        asset="aboutHero"
        eyebrow="Our Story"
        title="This began with one image in scripture."
        body={
          <p>
            &ldquo;Golden vials full of incense the prayers of the saints.&rdquo;
            <br />
            <em className="text-base font-semibold italic">Revelation 5:8</em>
          </p>
        }
        scrollTarget="how-it-began"
      />

      {/* How It Began */}
      <section id="how-it-began" className="bg-white py-20 lg:py-[2.6rem]">
        <div className="container-vial grid items-center gap-14 lg:grid-cols-[minmax(0,37.2rem)_minmax(0,35.1rem)] lg:justify-between lg:gap-[5.4rem]">
          <Reveal className="flex flex-col items-start gap-10">
            <div className="flex flex-col gap-5">
              <SectionHeading eyebrow="How It Began" title="Not an idea. A calling." />
              <p className="text-body">
                <span aria-hidden="true" className="float-left mt-[-0.15rem] mr-1 font-display text-[4.0625rem] leading-[0.95] tracking-[-0.04em] italic">
                  T
                </span>
                <span className="sr-only">T</span>
                he Golden Vials Initiative was not designed in a boardroom. It was born in prayer out of a deep, sustained encounter with the
                image in <strong className="font-semibold">Revelation 5:8.</strong> A vision of elders before the throne, holding golden vials,
                full of the prayers of the saints, rising as incense before God.
              </p>
              <p className="text-body">
                That image became a mandate. If the prayers of the saints are gathered and held before God then the Church must pray.
                Continuously. Collectively. Across every border, every language, every time zone.
              </p>
            </div>
            <Button href={downloadHref} variant="glass">
              Download the Vial
            </Button>
          </Reveal>
          <Reveal delay={120} className="flex flex-col items-end gap-[2.4rem]">
            <p className="max-w-[27.2rem] text-right text-2xl leading-6 tracking-[-0.05em] italic">
              VIAL is the vessel built to carry that mandate into the digital age.
            </p>
            <MediaFrame asset="altarFire" className="aspect-[562/568] w-full max-w-[35rem] rounded-[2.8rem] bg-gold" sizes="(min-width: 1024px) 562px, 100vw" />
          </Reveal>
        </div>
      </section>

      {/* Our Mission */}
      <section className="relative isolate overflow-hidden bg-sacred">
        <MediaFrame asset="missionBg" className="absolute inset-0 -z-10" labelPosition="bottom-right">
          <div aria-hidden="true" className="absolute inset-0 bg-gold/30 mix-blend-multiply" />
          <div aria-hidden="true" className="absolute inset-0 bg-black/50" />
        </MediaFrame>
        <Reveal className="container-vial flex min-h-[39.4rem] flex-col items-center justify-center gap-5 py-24 text-center">
          <Eyebrow tone="white">Our Mission</Eyebrow>
          <Display tone="white" className="max-w-[47.8rem] tracking-[-0.03em]">
            To mobilize a global army of intercessors filling heaven <Em gold>with the incense of prayer.</Em>
          </Display>
          <p className="max-w-[64.8rem] text-body text-white">
            One house of prayer. Every nation. Every hour. Until the knowledge of the glory of the Lord covers the earth.
          </p>
        </Reveal>
      </section>

      {/* Our Mandate */}
      <section className="bg-cream py-20 lg:py-[6.1rem]">
        <div className="container-vial flex flex-col gap-10">
          <Reveal>
            <SectionHeading eyebrow="Our Mandate" title="What we are built to do." />
          </Reveal>
          <div className="grid md:grid-cols-3">
            {mandate.map((m, i) => (
              <Reveal key={m.number} delay={i * 100}>
                <NumberedCard number={m.number} title={m.title} className="lg:py-[7.25rem]">
                  {m.body}
                </NumberedCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <GiveSection />
    </>
  );
}
