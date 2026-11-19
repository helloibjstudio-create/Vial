"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { CustomEase } from "gsap/CustomEase";
import { useGSAP } from "@gsap/react";
import { assets, heroVideo } from "@/content/assets";
import { Button } from "@/components/ui/Button";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { Em } from "@/components/ui/Typography";
import { ArrowDown } from "@/components/ui/icons";
import { downloadHref } from "@/content/site";
import { INTRO_SESSION_KEY } from "@/lib/intro";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollToPlugin, CustomEase);

/**
 * Home hero — the three-stage animated introduction (audit §5.1, §6).
 *
 *  Stage 1  Intro (frame 199:9948): dark page, "Incense Rising / from the Nations"
 *           around a 198×78 video pill in the centre.
 *  Stage 2  Hero (frame 239:7970): the pill expands to fill the whole screen; nav drops in, headline enters from the left, side copy
 *           from the right; intro words exit left/right. Smart Animate, ease-out, 1.5s.
 *  Stage 3  Content (top of 239:8140): media goes full-bleed with a black fade,
 *           hero copy exits, "More Than an App" rises into view. Driven by scroll
 *           here (the prototype advances on click / video end); the gold cue scrolls
 *           there over 2s with cubic-bezier(.43,-.01,.14,1).
 *
 * The intro plays once per browser session on a full page load. Any wheel, touch,
 * key or click skips to the end. With reduced motion it is skipped entirely.
 */

/** The video fills the whole screen once the intro pill has expanded. */
const STAGE3 = "inset(0px 0px 0px 0px round 0px)";
const STAGE2_DESKTOP = STAGE3;
const STAGE2_MOBILE = STAGE3;

export function HomeHero({ children }: { children: ReactNode }) {
  const root = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Next keeps visited routes mounted (hidden) — pause the video when hidden.
  useLayoutEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => {});
    return () => video.pause();
  }, []);

  useGSAP(
    () => {
      const html = document.documentElement;
      const q = gsap.utils.selector(root);
      const media = q("[data-hero-media]")[0];
      const film = q("[data-hero-film]")[0];
      const shade = q("[data-hero-shade]")[0];
      const introTop = q("[data-hero-intro='top']")[0];
      const introBottom = q("[data-hero-intro='bottom']")[0];
      const copy = q("[data-hero-copy]")[0];
      const aside = q("[data-hero-aside]")[0];
      const cue = q("[data-hero-cue]")[0];
      const content = q("[data-hero-content]")[0];
      if (!media || !root.current) return;

      const scrollEase = CustomEase.create("vialScroll", "M0,0 C0.43,-0.01 0.14,1 1,1");
      const mm = gsap.matchMedia();

      mm.add(
        { reduce: "(prefers-reduced-motion: reduce)", lg: "(min-width: 1024px)" },
        (ctx) => {
          const { reduce, lg } = ctx.conditions as { reduce: boolean; lg: boolean };
          const stage2 = lg ? STAGE2_DESKTOP : STAGE2_MOBILE;
          const cleanups: (() => void)[] = [];

          const onCueClick = (e: Event) => {
            e.preventDefault();
            if (reduce) {
              content?.scrollIntoView();
              return;
            }
            gsap.to(window, { duration: 2, ease: scrollEase, scrollTo: { y: content as Element, autoKill: true } });
          };
          cue?.addEventListener("click", onCueClick);
          cleanups.push(() => cue?.removeEventListener("click", onCueClick));

          if (reduce) {
            delete html.dataset.intro;
            gsap.set(media, { clipPath: stage2 });
            gsap.set(shade, { opacity: 1 });
            gsap.set(film, { scale: 1.2 });
            return () => cleanups.forEach((fn) => fn());
          }

          const startScrollScene = () => {
            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: root.current,
                start: "top top",
                end: () => `+=${window.innerHeight}`,
                scrub: 0.6,
                invalidateOnRefresh: true,
              },
            });
            tl.fromTo(media, { clipPath: stage2 }, { clipPath: STAGE3, ease: "none" }, 0)
              // Stage 3: the film grows past the screen edges (Figma: 1722px wide on the 1440 frame ≈ 1.2×).
              .fromTo(film, { scale: 1 }, { scale: 1.2, ease: "none" }, 0)
              .fromTo(shade, { opacity: 0 }, { opacity: 1, ease: "none" }, 0)
              .to(copy, { x: "-110vw", ease: "power1.in" }, 0)
              .to(aside, { x: "60vw", ease: "power1.in" }, 0)
              .to(cue, { autoAlpha: 0, ease: "none", duration: 0.4 }, 0);
          };

          if (html.dataset.intro === "pending") {
            const w = root.current!.clientWidth;
            const h = window.innerHeight;
            const pill = `inset(${(h - 78) / 2}px ${(w - 198) / 2}px ${(h - 78) / 2}px ${(w - 198) / 2}px round 40px)`;

            gsap.set(media, { clipPath: pill });
            gsap.set([introTop, introBottom], { autoAlpha: 1 });
            gsap.set(copy, { x: "-110vw" });
            gsap.set(aside, { x: "60vw" });
            gsap.set(cue, { autoAlpha: 0 });
            html.dataset.intro = "playing";

            const intro = gsap.timeline({
              delay: 1.1,
              defaults: { duration: 1.5, ease: "power2.out" },
              onStart: () => {
                html.dataset.intro = "revealing";
              },
              onComplete: () => {
                html.dataset.intro = "done";
                try {
                  sessionStorage.setItem(INTRO_SESSION_KEY, "1");
                } catch {}
                gsap.set([introTop, introBottom], { autoAlpha: 0 });
                startScrollScene();
                ScrollTrigger.refresh();
              },
            });
            intro
              .to(media, { clipPath: stage2 }, 0)
              .to(introTop, { x: "110vw" }, 0)
              .to(introBottom, { x: "-110vw" }, 0)
              .to(copy, { x: 0 }, 0)
              .to(aside, { x: 0 }, 0)
              .to(cue, { autoAlpha: 1, duration: 0.9 }, 0.6);

            const skip = () => {
              if (intro.progress() < 1) {
                html.dataset.intro = "revealing";
                intro.progress(1);
              }
            };
            const events = ["wheel", "touchstart", "keydown", "pointerdown"] as const;
            events.forEach((ev) => window.addEventListener(ev, skip, { once: true, passive: true }));
            cleanups.push(() => {
              events.forEach((ev) => window.removeEventListener(ev, skip));
              intro.kill();
            });
          } else {
            delete html.dataset.intro;
            gsap.set(media, { clipPath: stage2 });
            startScrollScene();
          }

          return () => cleanups.forEach((fn) => fn());
        },
      );

      return () => {
        mm.revert();
        if (html.dataset.intro && html.dataset.intro !== "done") delete html.dataset.intro;
      };
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-label="Introduction" className="relative bg-sacred">
      {/* Media layer — sticks behind the hero and the "More Than an App" content. */}
      <div className="sticky top-0 h-lvh w-full overflow-hidden">
        <div
          data-hero-media=""
          className="absolute inset-0 will-change-[clip-path]"
        >
          <div data-hero-film="" className="absolute inset-0 origin-center will-change-transform">
          {heroVideo.src ? (
            <video
              ref={videoRef}
              className="absolute inset-0 size-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              poster={assets[heroVideo.poster].src ?? undefined}
              aria-hidden="true"
            >
              {heroVideo.webm && <source src={heroVideo.webm} type="video/webm" />}
              <source src={heroVideo.src} type="video/mp4" />
            </video>
          ) : (
            <MediaFrame asset={heroVideo.poster} eager className="absolute inset-0" labelPosition="bottom-right" />
          )}
          </div>
          {/* Full-width readability tint over the whole frame (stage 2). */}
          <div aria-hidden="true" className="absolute inset-0 bg-sacred/25" />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-sacred/40 via-transparent to-transparent" />
          {/* Stage 3: full-bleed black fade, solid at the bottom so the content melts into the next section. */}
          <div
            data-hero-shade=""
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-b from-sacred/30 via-sacred/65 via-50% to-sacred opacity-0"
          />
        </div>

        {/* Stage 1 words around the video pill. */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <p
            data-hero-intro="top"
            className="invisible text-intro font-medium text-white opacity-0"
          >
            Incense Rising
          </p>
          <div className="h-[78px]" />
          <p data-hero-intro="bottom" className="invisible text-intro font-medium text-white opacity-0">
            from the{" "}
            <span className="font-display font-medium text-gold italic">Nations</span>
          </p>
        </div>
      </div>

      <div className="relative -mt-[100lvh]">
        {/* Stage 2 content */}
        <div className="relative h-lvh overflow-hidden">
          <p
            data-hero-aside=""
            className="absolute top-[9.5rem] right-[clamp(1.5rem,5.6vw,5rem)] hidden w-[18.7rem] text-body text-white md:block lg:top-[12.5rem]"
          >
            VIAL is a global altar connecting intercessors across every nation, every time zone, every hour of the day.
          </p>

          <div
            data-hero-copy=""
            className="absolute right-6 bottom-[clamp(3rem,15.5vh,9.9rem)] left-6 flex max-w-[54rem] flex-col gap-8 sm:left-10 lg:left-[clamp(2.5rem,4.9vw,4.4rem)] lg:gap-10"
          >
            <h1 className="font-display text-hero font-medium text-white">
              The <Em>Prayers Of</Em>
              <br />
              <Em>The Saints Are Rising.</Em>
            </h1>
            <p className="max-w-[22rem] text-body text-white md:hidden">
              VIAL is a global altar connecting intercessors across every nation, every time zone, every hour of the day.
            </p>
            <div className="flex flex-wrap gap-4 lg:gap-[1.875rem]">
              <Button href={downloadHref} variant="glass">
                Download the Vial
              </Button>
              <Button href="/join" variant="outline-light">
                Join the Movement
              </Button>
            </div>
          </div>

          <a
            href="#more-than-an-app"
            data-hero-cue=""
            aria-label="Scroll to content"
            className="absolute right-[clamp(1.5rem,4.9vw,4.45rem)] bottom-[clamp(2rem,22vh,14rem)] hidden size-[3.9rem] place-items-center rounded-full bg-gold text-white transition-transform duration-300 hover:scale-105 sm:grid"
          >
            <ArrowDown className="size-7" />
          </a>
        </div>

        {/* Stage 3 content */}
        <div data-hero-content="" id="more-than-an-app" className="relative pt-6 pb-20 lg:pt-10 lg:pb-[7.5rem]">
          {children}
        </div>
      </div>
    </section>
  );
}
