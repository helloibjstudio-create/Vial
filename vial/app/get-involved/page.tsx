import type { Metadata } from "next";
import Link from "next/link";
import { paymentPartners } from "@/content/collections";
import { contactDetails } from "@/content/site";
import { Reveal } from "@/components/motion/Reveal";
import { ContactForm, GiveForm, NewsletterForm, VolunteerForm } from "@/components/forms/GetInvolvedForms";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { Display, Eyebrow, SectionHeading } from "@/components/ui/Typography";

export const metadata: Metadata = {
  title: "Get Involved",
  description: "Volunteer your skills, give to sustain the work, or reach out. Every expression of support builds the altar.",
};

const anchors = [
  { label: "Volunteer", href: "#volunteer" },
  { label: "Donate", href: "#donate" },
  { label: "Contact", href: "#contact" },
];

/** Volunteer · Donate · Contact — Figma frame 407:2000 (audit §5.7). */
export default function GetInvolvedPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-white lg:min-h-[52.6rem]">
        <MediaFrame
          asset="getInvolvedHero"
          eager
          // Figma: the artwork is clipped to the hero, 914×711 flush with its right and bottom edges, behind the copy.
          className="mt-[4.75rem] aspect-[914/711] w-full lg:absolute lg:right-0 lg:bottom-0 lg:-z-10 lg:mt-0 lg:w-[63.5%] lg:max-w-[57.125rem]"
          sizes="(min-width: 1024px) 914px, 100vw"
          labelPosition="bottom-right"
        />
        <div className="container-vial relative pt-12 pb-20 sm:pt-16 lg:pt-[16.25rem] lg:pb-[14rem]">
          <div className="flex max-w-[42.9rem] flex-col gap-10 lg:max-w-[46%] xl:max-w-[42.9rem]">
            <div className="flex flex-col gap-5">
              <Eyebrow>Get Involved</Eyebrow>
              <Display as="h1" size="hero">
                The movement grows
                <br />
                because <span className="text-gold">people give.</span>
              </Display>
              <p className="max-w-[27.25rem] text-body">
                Volunteer your skills, give to sustain the work, or reach out. Every expression of support builds the altar.
              </p>
            </div>
            <nav aria-label="On this page">
              <ul className="flex flex-wrap gap-3">
                {anchors.map((a) => (
                  <li key={a.href}>
                    <Link
                      href={a.href}
                      className="inline-flex h-[2.95rem] items-center rounded-full bg-gold px-6 text-[0.9375rem] font-semibold tracking-[-0.015em] text-white transition-colors hover:bg-[#b8973f]"
                    >
                      {a.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </section>

      {/* Volunteer */}
      <section id="volunteer" className="bg-white py-20 lg:py-[4.5rem]">
        <div className="container-vial grid items-center gap-12 lg:grid-cols-[minmax(0,31.25rem)_minmax(0,40.4rem)] lg:justify-between lg:gap-[6.25rem]">
          <Reveal className="flex flex-col gap-[3.75rem]">
            <SectionHeading
              eyebrow="Serve the Vision"
              title={
                <>
                  Your gift might not be prayer — <span className="text-gold">it might be the table that holds it.</span>
                </>
              }
              body="VIAL needs more than intercessors. We need translators, writers, regional prayer leaders, media contributors, and tech volunteers people who carry the altar in a different way."
            />
            <MediaFrame asset="volunteerCard" className="h-[17.5rem] rounded-card-sm" sizes="500px" label={false} />
          </Reveal>
          <VolunteerForm />
        </div>
      </section>

      {/* Donate */}
      <section id="donate" className="bg-brown py-20 lg:pt-20 lg:pb-20">
        <div className="container-vial flex flex-col gap-[4.4rem]">
          <Reveal>
            <SectionHeading
              tone="white"
              eyebrow="Give to the Movement"
              title={
                <>
                  Every gift <span className="text-gold">keeps the altar burning.</span>
                </>
              }
              body="Your generosity sustains prayer networks, technology, and media that carry the gospel of intercession to every nation."
              bodyClassName="max-w-none"
              className="[&_h2]:max-w-[31.25rem]"
            />
          </Reveal>
          <div className="flex flex-col gap-6">
            <GiveForm />
            <div className="flex items-center gap-4">
              <span className="text-xs tracking-[-0.01em] text-white/30">Powered by</span>
              <ul className="flex gap-2">
                {paymentPartners.map((p) => (
                  <li key={p} title={`${p} logo pending`} className="inline-flex h-7 items-center rounded-lg bg-white/8 px-3 text-[0.6875rem] font-semibold text-white/70">
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <MediaFrame asset="altarFire" className="h-[12.5rem] rounded-card-sm bg-gold" sizes="(min-width: 1280px) 1246px, 100vw" label={false}>
            <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(90deg,rgb(28_16_8/0.85)_0%,rgb(0_0_0/0)_50%,rgb(28_16_8/0.85)_100%)]" />
            <p className="absolute inset-0 grid place-items-center px-6 text-center font-display text-[clamp(1.5rem,1.1rem+1.4vw,2.25rem)] leading-[1.5] font-medium tracking-[0.03em] text-white italic">
              &ldquo;The fire shall never go out.&rdquo; — Leviticus 6:13
            </p>
          </MediaFrame>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="bg-cream py-20 lg:py-[9.5rem]">
        <div className="container-vial grid items-start gap-12 lg:grid-cols-[minmax(0,31.4rem)_minmax(0,45.4rem)] lg:justify-between lg:gap-4">
          <Reveal className="flex flex-col gap-5">
            <SectionHeading
              eyebrow="Get in Touch"
              title="Questions, partnerships, or testimonies we are here."
              body="We read every message. Expect a reply within 2–3 business days."
              bodyClassName="max-w-[22.2rem]"
            />
            <ul className="flex flex-col gap-4 pt-2">
              <li className="flex items-center gap-3 text-[0.9375rem] font-medium tracking-[-0.02em]">
                <span aria-hidden="true" className="text-lg">✉️</span>
                <a href={`mailto:${contactDetails.email}`} className="underline-offset-4 hover:underline">
                  {contactDetails.email}
                </a>
              </li>
              <li className="flex items-center gap-3 text-[0.9375rem] font-medium tracking-[-0.02em]">
                <span aria-hidden="true" className="text-lg">🌍</span>
                {contactDetails.website}
              </li>
              <li className="flex items-center gap-3 text-[0.9375rem] font-medium tracking-[-0.02em]">
                <span aria-hidden="true" className="text-lg">📍</span>
                {contactDetails.location}
              </li>
            </ul>
          </Reveal>
          <div className="flex flex-col gap-8">
            <ContactForm />
            <div className="flex flex-col gap-4 rounded-card-sm border border-gold/20 bg-gold/8 px-6 py-10 sm:px-12">
              <div className="flex flex-col gap-2">
                <h3 className="font-display text-[1.875rem] leading-[1.875rem] font-medium tracking-[-0.03em]">Stay connected.</h3>
                <p className="max-w-[26.25rem] text-[0.9375rem] leading-[1.4rem] tracking-[-0.02em] text-brown/75">
                  Receive prayer updates, watch schedules, and testimonies in your inbox.
                </p>
              </div>
              <NewsletterForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
