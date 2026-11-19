import { z } from "zod";
import {
  contactSubjects,
  givingAmounts,
  givingCauses,
  prayerCategories,
  prayerVisibility,
  volunteerRoles,
} from "@/content/collections";
import { prayerWatches } from "@/content/watches";

/** Shared client + server validation for every form on the site. */

const requiredText = (label: string, max = 200) =>
  z.string().trim().min(1, `${label} is required.`).max(max, `${label} is too long.`);
const optionalText = (max = 200) => z.string().trim().max(max).optional().or(z.literal(""));
const email = z.email("Enter a valid email address.");

export const applicationSchema = z.object({
  firstName: requiredText("First name", 80),
  lastName: requiredText("Last name", 80),
  email,
  church: optionalText(120),
  dateOfBirth: z.iso.date("Enter your date of birth."),
  availability: optionalText(120),
  yearsInterceding: z
    .string()
    .trim()
    .regex(/^\d{0,2}$/, "Enter a number of years.")
    .optional(),
  journey: optionalText(2000),
  languages: requiredText("Languages spoken", 200),
  acknowledgement: z.literal("on", { error: "Please confirm you have read this." }),
});

export const prayerRequestSchema = z.object({
  name: optionalText(80),
  request: requiredText("Your prayer request", 2000),
  category: z.enum(prayerCategories, { error: "Choose a category." }),
  visibility: z.enum(prayerVisibility, { error: "Choose who can see this request." }),
});

export const commitWatchSchema = z.object({
  watch: z.enum(prayerWatches.map((w) => w.id) as [string, ...string[]], { error: "Select a watch." }),
  timeZone: requiredText("Time zone", 80),
  reminder: z.enum(["Email", "App Notification", "Both"], { error: "Choose a reminder preference." }),
});

export const volunteerSchema = z.object({
  fullName: requiredText("Full name", 120),
  email,
  roles: z.array(z.enum(volunteerRoles)).min(1, "Choose at least one way to serve."),
});

export const contactSchema = z.object({
  fullName: requiredText("Full name", 120),
  email,
  subject: z.enum(contactSubjects, { error: "Choose a subject." }),
  message: requiredText("Message", 4000),
});

export const newsletterSchema = z.object({ email });

export const donationSchema = z.object({
  frequency: z.enum(["Give Once", "Give Monthly"], { error: "Choose how often to give." }),
  cause: z.enum(givingCauses.map((c) => c.id) as [string, ...string[]]).optional(),
  amount: z.coerce
    .number({ error: "Enter an amount." })
    .positive("Enter an amount greater than zero.")
    .max(1_000_000, "Please contact us for gifts of this size."),
});

export const presetAmounts = givingAmounts;
