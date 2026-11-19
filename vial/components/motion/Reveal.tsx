"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

/**
 * Entrance reveal: fade + 32px rise, 0.8s ease-out (audit §9.5). The hidden state
 * lives in CSS (`[data-reveal]` in globals.css) and only applies when scripting is
 * enabled and motion is allowed, so content is never lost.
 */
export function Reveal({
  as: Tag = "div",
  delay = 0,
  className,
  children,
}: {
  as?: ElementType;
  delay?: number;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-revealed", "");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag ref={ref} data-reveal="" className={className} style={delay ? { "--reveal-delay": `${delay}ms` } : undefined}>
      {children}
    </Tag>
  );
}
