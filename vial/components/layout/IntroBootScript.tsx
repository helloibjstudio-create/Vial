"use client";

import { introBootScript } from "@/lib/intro";

/**
 * Runs the home-intro boot script before first paint (see lib/intro.ts).
 *
 * The server renders a normal, executable <script>, so it runs during HTML parse.
 * On the client React would warn about rendering a <script> ("scripts inside React
 * components are never executed"), so there we give it an inert `type` — it has
 * already run by then. `suppressHydrationWarning` covers the attribute mismatch.
 */
export function IntroBootScript() {
  return (
    <script
      suppressHydrationWarning
      type={typeof window === "undefined" ? "text/javascript" : "text/x-inert"}
      dangerouslySetInnerHTML={{ __html: introBootScript }}
    />
  );
}
