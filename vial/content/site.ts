/** Global navigation, footer and contact data — audit §5.8. */

export interface NavLink {
  label: string;
  href: string;
}

export const mainNav: NavLink[] = [
  { label: "About", href: "/about" },
  { label: "Join The Movement", href: "/join" },
  { label: "Prayer Wall", href: "/prayer-wall" },
  { label: "Prayer Watch", href: "/prayer-watch" },
  { label: "Resources Hub", href: "/resources" },
  { label: "Contact", href: "/get-involved#contact" },
];

/** The nav CTA "Download the Vial" points to the app section on the home page. */
export const downloadHref = "/#app";

export const footerColumns: { title: string; links: NavLink[] }[] = [
  {
    title: "Navigate",
    links: [
      { label: "About", href: "/about" },
      { label: "Prayer Watches", href: "/prayer-watch" },
      { label: "Prayer Wall", href: "/prayer-wall" },
      { label: "Resources", href: "/resources" },
    ],
  },
  {
    title: "Get Involved",
    links: [
      { label: "Join the Movement", href: "/join" },
      { label: "Donate", href: "/get-involved#donate" },
      { label: "Volunteer", href: "/get-involved#volunteer" },
      { label: "Partner", href: "/get-involved#contact" },
    ],
  },
];

/**
 * Legal links shown in the footer bar. Privacy Policy and Terms of Use have no
 * design or approved route yet (audit §9.1), so `href` is null and they render
 * as non-interactive text until the pages exist.
 */
export const legalLinks: { label: string; href: string | null }[] = [
  { label: "Privacy Policy", href: null },
  { label: "Terms of Use", href: null },
  { label: "Contact", href: "/get-involved#contact" },
];

export const contactDetails = {
  email: "hello@vial.prayer",
  website: "vial.prayer",
  location: "Global — 24 Time Zones",
};

/**
 * App store links are not yet known (audit §10). `null` renders the badge as a
 * non-interactive element labelled "coming soon" for assistive tech.
 */
export const storeLinks: { appStore: string | null; googlePlay: string | null } = {
  appStore: null,
  googlePlay: null,
};

export const copyright = "© 2026 VIAL · Golden Vials Initiative · All rights reserved.";
