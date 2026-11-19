/**
 * Font registry — the ONLY place font families are wired up.
 *
 * Display face: the design specifies "Editor's Note" (commercial, not on Google
 * Fonts). Until licensed WOFF2 files are supplied, Cormorant Garamond is used as a
 * temporary substitute (approved). To swap in Editor's Note:
 *
 *   1. Add the files to `app/fonts/` (Medium, Medium Italic, Italic, Semibold,
 *      Semibold Italic).
 *   2. Replace `displayFont` below with:
 *        import localFont from "next/font/local";
 *        export const displayFont = localFont({
 *          variable: "--font-display-face",
 *          display: "swap",
 *          src: [
 *            { path: "./fonts/EditorsNote-Italic.woff2", weight: "400", style: "italic" },
 *            { path: "./fonts/EditorsNote-Medium.woff2", weight: "500", style: "normal" },
 *            { path: "./fonts/EditorsNote-MediumItalic.woff2", weight: "500", style: "italic" },
 *            { path: "./fonts/EditorsNote-Semibold.woff2", weight: "600", style: "normal" },
 *            { path: "./fonts/EditorsNote-SemiboldItalic.woff2", weight: "600", style: "italic" },
 *          ],
 *        });
 *
 * Nothing else needs to change: every component uses the `font-display` utility,
 * which resolves through the `--font-display-face` CSS variable.
 */
import { Cormorant_Garamond, DM_Sans } from "next/font/google";

export const displayFont = Cormorant_Garamond({
  variable: "--font-display-face",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

/** DM Sans is variable; the optical-size axis provides the "DM Sans 9pt" cut used in the design. */
export const sansFont = DM_Sans({
  variable: "--font-sans-face",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  display: "swap",
});
