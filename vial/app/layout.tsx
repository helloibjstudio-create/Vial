import type { Metadata, Viewport } from "next";
import { displayFont, sansFont } from "./fonts";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { IntroBootScript } from "@/components/layout/IntroBootScript";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "VIAL — A Global Altar of Prayer",
    template: "%s · VIAL",
  },
  description:
    "VIAL is a global altar connecting intercessors across every nation, every time zone, every hour of the day.",
  applicationName: "VIAL",
};

export const viewport: Viewport = {
  themeColor: "#5C4510",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning: the home intro script sets `data-intro` on <html>
    // before hydration (see components/home/HomeHero.tsx).
    <html lang="en" className={`${displayFont.variable} ${sansFont.variable}`} suppressHydrationWarning>
      <head>
        <IntroBootScript />
      </head>
      <body className="min-h-dvh">
        <a
          href="#main"
          className="sr-only z-[60] rounded-full bg-brown px-5 py-3 text-white focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
