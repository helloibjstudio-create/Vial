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

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollToPlugin, CustomEase);
// Phones: the address bar showing/hiding resizes the viewport; don't recalculate (and jump) mid-scroll.
ScrollTrigger.config({ ignoreMobileResize: true });

/**
 * Home hero — the three-stage introduction (audit §5.1, §6), driven by scroll on every device.
 *
 *  Stage 1  Intro (frame 199:9948): dark page, "Incense Rising / from the Nations"
 *           around a 198×78 video pill in the centre. Holds until the visitor scrolls.
 *  1 → 2    First screen of scrolling (the hero is pinned): the pill opens up to the
 *           full-screen video, the intro words exit left/right, the headline enters from
 *           the left, the side copy from the right and the nav drops in (frame 239:7970).
 *           A click / tap on the intro plays the same opening by scrolling for you.
 *           It plays once per page load; scrolling back to the top shows the open video.
 *  2 → 3    Second screen: the film grows past the edges with a black fade, the hero copy
 *           exits and "More Than an App" rises into view; then the page carries on.
 *           The gold cue scrolls there over 2s with cubic-bezier(.43,-.01,.14,1).
 *
 * With reduced motion everything is static at stage 2 and the extra scroll track collapses.
 */

/** The video fills the whole screen once the intro pill has opened (stage 2 and 3). */
const STAGE2 = "inset(0px 0px 0px 0px round 0px)";

export function HomeHero({ children }: { children: ReactNode }) {
  const root = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Play the video only while the hero is on screen: once the visitor has scrolled past it,
  // decoding a hidden 1080p video would compete with the rest of the page for the GPU.
  // (Next also keeps visited routes mounted but hidden — the cleanup pauses it there.)
  useLayoutEffect(() => {
    const video = videoRef.current;
    const hero = root.current;
    if (!video || !hero) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) video.play().catch(() => {});
      else video.pause();
    });
    io.observe(hero);
    return () => {
      io.disconnect();
      video.pause();
    };
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
      const track = q("[data-hero-track]")[0] as HTMLElement | undefined;
      if (!media || !root.current) return;

      const scrollEase = CustomEase.create("vialScroll", "M0,0 C0.43,-0.01 0.14,1 1,1");
      const mm = gsap.matchMedia();

      mm.add(
        // gsap.matchMedia only runs the callback when at least one query matches, so list both
        // motion states (a single "reduce" query would never fire for most visitors / on phones).
        { reduce: "(prefers-reduced-motion: reduce)", motion: "(prefers-reduced-motion: no-preference)" },
        (ctx) => {
          const { reduce } = ctx.conditions as { reduce: boolean };
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
            gsap.set(media, { clipPath: "none" });
            gsap.set(shade, { opacity: 1 });
            gsap.set(film, { scale: 1.2 });
            return () => cleanups.forEach((fn) => fn());
          }

          const pill = () => {
            const w = root.current!.clientWidth;
            const h = window.innerHeight;
            return `inset(${(h - 78) / 2}px ${(w - 198) / 2}px ${(h - 78) / 2}px ${(w - 198) / 2}px round 40px)`;
          };

          /** Stage 2 → 3 over one screen of scrolling (after the intro has opened). */
          let stage3: gsap.core.Timeline | null = null;
          const startStage3 = () => {
            stage3 = gsap.timeline({
              defaults: { ease: "none" },
              scrollTrigger: {
                trigger: root.current,
                start: "top top",
                end: () => `+=${window.innerHeight}`,
                scrub: 0.4,
                invalidateOnRefresh: true,
              },
            });
            // The film grows past the screen edges (Figma: 1722px wide on the 1440 frame ≈ 1.2×).
            stage3
              .fromTo(film, { scale: 1 }, { scale: 1.2 }, 0)
              .fromTo(shade, { opacity: 0 }, { opacity: 1 }, 0)
              .fromTo(copy, { x: 0 }, { x: "-110vw", ease: "power1.in" }, 0)
              .fromTo(aside, { x: 0 }, { x: "60vw", ease: "power1.in" }, 0)
              .fromTo(cue, { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.4 }, 0);
          };
          cleanups.push(() => {
            stage3?.scrollTrigger?.kill();
            stage3?.kill();
          });

          /** Stage 2 at rest: video open, copy in, extra intro scroll removed. */
          const showOpened = () => {
            // No clip at all once open: a (no-op) clip-path still makes the browser clip the video every frame.
            gsap.set(media, { clipPath: "none" });
            gsap.set([introTop, introBottom], { autoAlpha: 0 });
            gsap.set([copy, aside], { x: 0 });
            gsap.set(cue, { autoAlpha: 1 });
            if (track) track.style.height = "100lvh";
            delete html.dataset.intro;
            startStage3();
            ScrollTrigger.refresh();
          };

          // Landing part-way down the page (reload / back navigation restores the scroll position):
          // skip the intro rather than replaying it under the visitor.
          if (window.scrollY > 10) {
            showOpened();
            return () => cleanups.forEach((fn) => fn());
          }

          // Stage 1 state (also painted before hydration by the boot script + CSS).
          gsap.set(media, { clipPath: pill() });
          gsap.set([introTop, introBottom], { autoAlpha: 1, x: 0 });
          gsap.set(copy, { x: "-110vw" });
          gsap.set(aside, { x: "60vw" });
          gsap.set(cue, { autoAlpha: 0 });
          html.dataset.intro = "playing";

          // The opening plays ONCE per page load, scrubbed over the first screen of the 200lvh track
          // (stage 2 is sticky meanwhile). When it completes, that screen of scroll is removed and the
          // scroll position shifted by the same amount, so scrolling back up never replays it.
          let opened = false;
          const finishIntro = () => {
            if (opened) return;
            opened = true;
            gsap.killTweensOf(window); // stop a click-triggered auto-scroll
            const before = track?.offsetHeight ?? 0;
            const y = window.scrollY;
            intro.scrollTrigger?.kill();
            intro.kill();
            showOpened();
            const removed = before - (track?.offsetHeight ?? before);
            window.scrollTo({ top: Math.max(0, y - removed), behavior: "instant" });
            ScrollTrigger.update();
          };

          const intro = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: root.current,
              start: "top top",
              end: () => `+=${window.innerHeight}`,
              scrub: 0.4,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                // Nav drops in as the video finishes opening (CSS transitions it in).
                const next = self.progress < 0.84 ? "playing" : "revealing";
                if (!opened && html.dataset.intro !== next) html.dataset.intro = next;
              },
            },
            // Fires when the scrubbed playhead (not just the scrollbar) reaches the end.
            onComplete: finishIntro,
          });
          intro
            .fromTo(media, { clipPath: () => pill() }, { clipPath: STAGE2, ease: "power1.inOut", duration: 1 }, 0)
            .to(introTop, { x: "110vw", ease: "power1.in", duration: 0.8 }, 0)
            .to(introBottom, { x: "-110vw", ease: "power1.in", duration: 0.8 }, 0)
            .to(copy, { x: 0, ease: "power2.out", duration: 0.8 }, 0.2)
            .to(aside, { x: 0, ease: "power2.out", duration: 0.8 }, 0.2)
            .to(cue, { autoAlpha: 1, duration: 0.3 }, 0.7);

          // Click / tap on the intro screen: play the opening by scrolling one screen (Figma advances on click).
          const onIntroClick = (e: Event) => {
            if (opened) return;
            if ((e.target as Element).closest("a,button")) return;
            gsap.to(window, { duration: 1.6, ease: "power2.inOut", scrollTo: { y: window.innerHeight, autoKill: true } });
          };
          // On the whole hero: the sticky stage-2 layer sits above the video and receives the click.
          const hero = root.current!;
          hero.addEventListener("click", onIntroClick);
          cleanups.push(() => hero.removeEventListener("click", onIntroClick));
          cleanups.push(() => {
            intro.scrollTrigger?.kill();
            intro.kill();
            if (track) track.style.height = "";
            delete html.dataset.intro;
          });

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
          className="absolute inset-0"
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
        {/* Scroll track: 200lvh = one screen to open the intro + one screen for stage 2 → 3.
            Stage 2 sticks for the first screen so the opening plays in place; once the intro has
            opened, HomeHero shrinks this to 100lvh (the opening never replays on scroll-up). */}
        <div data-hero-track="" className="relative h-[200lvh] motion-reduce:h-lvh">
        <div className="sticky top-0 h-lvh overflow-hidden">
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
        </div>

        {/* Stage 3 content */}
        <div data-hero-content="" id="more-than-an-app" className="relative pt-6 pb-20 lg:pt-10 lg:pb-[7.5rem]">
          {children}
        </div>
      </div>
    </section>
  );
}
