import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge needs to know about the custom font-size tokens defined in
 * `app/globals.css` (`text-hero`, `text-h2`, …) so they are not confused with
 * text-colour utilities and dropped during merging.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "intro",
            "hero",
            "h2",
            "h3",
            "h4",
            "h5",
            "lead",
            "body",
            "body-sm",
            "eyebrow",
            "button",
          ],
        },
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
