import Link from "next/link";
import { copyright, footerColumns, legalLinks } from "@/content/site";
import { Logo } from "@/components/ui/Brand";
import { StoreBadges } from "@/components/ui/StoreBadges";

/** Footer — Figma component `footer` 365:8929 (audit §5.8). */
export function SiteFooter() {
  return (
    <footer className="bg-fade-white-cream pt-16 pb-12 lg:pt-[11.8rem] lg:pb-[3.75rem]">
      <div className="mx-auto max-w-[90rem] px-3 sm:px-[1.1875rem]">
        <div className="relative overflow-hidden rounded-card bg-gold px-6 py-14 sm:px-12 lg:min-h-[41rem] lg:px-[10.25rem] lg:pt-[5.4rem]">
          {/* Giant clipped watermark (Editor's Note Semibold Italic 800 / #F5EDD8). */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-[42%] left-[1.6rem] font-display text-[clamp(13rem,55vw,50rem)] leading-[0.8] font-semibold tracking-[-0.06em] text-cream italic select-none"
          >
            Vial
          </span>

          <div className="relative grid gap-12 md:grid-cols-2 lg:grid-cols-[minmax(0,21rem)_auto_auto_auto] lg:gap-x-[6.25rem]">
            <div className="flex max-w-[22.5rem] flex-col gap-[1.875rem]">
              <Logo tone="light" />
              <p className="font-display text-2xl leading-[0.96] font-medium tracking-[-0.03em] text-cream">
                A global altar — gathering the fragrance of intercession from every nation, filling heaven with the prayers of the saints.
              </p>
              <p className="text-[1.375rem] leading-[1.03] font-medium tracking-[-0.05em] text-brown">
                &ldquo;My house shall be called a house of prayer for all nations.&rdquo; — Isaiah 56:7
              </p>
            </div>

            {footerColumns.map((col) => (
              <nav key={col.title} aria-label={col.title} className="flex flex-col gap-10 lg:pt-8">
                <h2 className="text-xl leading-6 font-semibold tracking-[0.04em] text-white uppercase">{col.title}</h2>
                <ul className="flex flex-col gap-5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="text-base text-white transition-opacity hover:opacity-75">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}

            <div className="lg:pt-[3.6rem]">
              <StoreBadges style="cream" size="md" direction="column" />
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 px-3 text-sm font-semibold tracking-[0.05em] text-brown uppercase sm:px-5 lg:mt-[3.6rem] lg:flex-row lg:items-center lg:justify-between lg:text-base">
          <p>{copyright}</p>
          <ul className="flex flex-wrap gap-5">
            {legalLinks.map((link) => (
              <li key={link.label}>
                {link.href ? (
                  <Link href={link.href} className="transition-opacity hover:opacity-70">
                    {link.label}
                  </Link>
                ) : (
                  <span title="Page coming soon">{link.label}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
