"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { downloadHref, mainNav } from "@/content/site";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Brand";
import { CloseIcon, MenuIcon } from "@/components/ui/icons";

/**
 * Global navigation — Figma component `Nav Bar` (audit §5.8).
 *  overlay  `Property 1=Default`: transparent, white text — home hero only.
 *  dark     once scrolled on any page: Sacred Black glass, white text.
 *  glass    gold glass bar — inner pages before scrolling.
 * The bar hides while scrolling down and returns on scroll up (the hero prototype
 * slides the nav away as content scrolls in). Below `lg` links move into a menu sheet.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      const goingDown = y > lastY.current;
      setHidden(goingDown && y > 160);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the menu on route change.
  const [menuPath, setMenuPath] = useState(pathname);
  if (menuPath !== pathname) {
    setMenuPath(pathname);
    setMenuOpen(false);
  }

  const overlay = isHome && !scrolled && !menuOpen;
  /** Scrolled: dark Sacred-Black glass with white text (matches the home video section). */
  const dark = scrolled && !menuOpen;
  const light = overlay || dark;

  return (
    <>
      <header
        data-site-header=""
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[transform,background-color,box-shadow] duration-500 ease-[var(--ease-vial-out)]",
          hidden && !menuOpen && "-translate-y-full",
          dark && "bg-sacred/65 shadow-[inset_0_-1px_0_rgb(255_255_255/0.08)] backdrop-blur-xl backdrop-saturate-150",
          !overlay && !dark && "glass-gold bg-white/55",
        )}
      >
        <div className="container-vial flex h-[4.75rem] items-center justify-between gap-6 lg:h-[7.1875rem]">
          <Logo tone={light ? "light" : "brown"} />

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-[1.4rem] xl:gap-[1.6rem]">
              {mainNav.map((link) => {
                const active = link.href === pathname;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "relative py-2 text-[0.95rem] tracking-[-0.02em] transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100 xl:text-base",
                        light ? "text-white" : "text-brown",
                        active && "after:scale-x-100",
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <Button href={downloadHref} variant="glass" className="hidden sm:inline-flex">
              Download the Vial
            </Button>
            <button
              type="button"
              className={cn(
                "grid size-11 place-items-center rounded-full lg:hidden",
                light ? "text-white" : "text-brown",
                dark && "bg-white/10",
                !light && "bg-white/50",
              )}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
              {menuOpen ? <CloseIcon className="size-6" /> : <MenuIcon className="size-6" />}
            </button>
          </div>
        </div>
      </header>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} pathname={pathname} />
    </>
  );
}

/** Mobile navigation sheet (not designed in Figma — approved addition). */
function MobileMenu({ open, onClose, pathname }: { open: boolean; onClose: () => void; pathname: string }) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("a")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && panelRef.current) {
        const focusables = panelRef.current.querySelectorAll<HTMLElement>("a, button");
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
      previous?.focus();
    };
  }, [open, onClose]);

  return (
    <div
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      aria-hidden={!open}
      inert={!open}
      className={cn(
        "fixed inset-0 z-40 bg-cream transition-[opacity,visibility] duration-500 lg:hidden",
        open ? "visible opacity-100" : "invisible opacity-0",
      )}
    >
      <div ref={panelRef} className="container-vial flex h-full flex-col pt-28 pb-10">
        <nav aria-label="Mobile" className="flex-1">
          <ul className="flex flex-col gap-1">
            {mainNav.map((link, i) => (
              <li
                key={link.href}
                className={cn(
                  "transition-[opacity,transform] duration-500 ease-[var(--ease-vial-out)]",
                  open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
                )}
                style={{ transitionDelay: open ? `${80 + i * 50}ms` : "0ms" }}
              >
                <Link
                  href={link.href}
                  onClick={onClose}
                  aria-current={link.href === pathname ? "page" : undefined}
                  className="flex items-baseline justify-between border-b border-brown/15 py-4 font-display text-[2.25rem] leading-none font-medium tracking-[-0.03em] text-brown aria-[current=page]:italic"
                >
                  {link.label}
                  <span aria-hidden="true" className="font-sans text-sm tracking-normal text-brown/50">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <Button href={downloadHref} variant="glass" onClick={onClose} className="self-start">
          Download the Vial
        </Button>
      </div>
    </div>
  );
}
