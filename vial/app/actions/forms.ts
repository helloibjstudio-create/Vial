"use server";

/**
 * Form server actions — STUBBED (approved decision #7).
 *
 * Every action validates input with the shared Zod schemas (each Server Action is
 * a public POST endpoint) and returns a FormState. No data is stored or sent
 * anywhere yet. Each `TODO(integration)` marks where the real service plugs in.
 */
import {
  applicationSchema,
  commitWatchSchema,
  contactSchema,
  donationSchema,
  newsletterSchema,
  prayerRequestSchema,
  volunteerSchema,
} from "@/lib/schemas";
import { formDataToObject, validationError, type FormState } from "@/lib/form-state";

const ok = (message: string): FormState => ({ status: "success", message, submissionId: Date.now() });

export async function submitApplication(_prev: FormState, formData: FormData): Promise<FormState> {
  const parsed = applicationSchema.safeParse(formDataToObject(formData));
  if (!parsed.success) return validationError(parsed.error);
  // TODO(integration): persist application + send confirmation email.
  return ok("Thank you. Your application has been received — expect a reply within 3–5 business days.");
}

export async function submitPrayerRequest(_prev: FormState, formData: FormData): Promise<FormState> {
  const parsed = prayerRequestSchema.safeParse(formDataToObject(formData));
  if (!parsed.success) return validationError(parsed.error);
  // TODO(integration): store request and publish to the Prayer Wall after moderation.
  return ok("Your request has been received. Intercessors are standing with you.");
}

export async function commitToWatch(_prev: FormState, formData: FormData): Promise<FormState> {
  const parsed = commitWatchSchema.safeParse(formDataToObject(formData));
  if (!parsed.success) return validationError(parsed.error);
  // TODO(integration): create commitment + schedule reminders 15 minutes before the watch.
  return ok("You have committed to this watch. Reminders will be enabled once accounts are live.");
}

export async function submitVolunteer(_prev: FormState, formData: FormData): Promise<FormState> {
  const parsed = volunteerSchema.safeParse(formDataToObject(formData, ["roles"]));
  if (!parsed.success) return validationError(parsed.error);
  // TODO(integration): forward to the volunteer coordinator / CRM.
  return ok("Thank you for offering your gifts. We will be in touch soon.");
}

export async function submitContact(_prev: FormState, formData: FormData): Promise<FormState> {
  const parsed = contactSchema.safeParse(formDataToObject(formData));
  if (!parsed.success) return validationError(parsed.error);
  // TODO(integration): deliver to hello@vial.prayer via the chosen email provider.
  return ok("Message received. Expect a reply within 2–3 business days.");
}

export async function subscribeNewsletter(_prev: FormState, formData: FormData): Promise<FormState> {
  const parsed = newsletterSchema.safeParse(formDataToObject(formData));
  if (!parsed.success) return validationError(parsed.error);
  // TODO(integration): add to the mailing list provider.
  return ok("You are subscribed. Watch your inbox for prayer updates.");
}

export async function startDonation(_prev: FormState, formData: FormData): Promise<FormState> {
  const parsed = donationSchema.safeParse(formDataToObject(formData));
  if (!parsed.success) return validationError(parsed.error);
  // TODO(integration): create a checkout session with the chosen payment provider
  // (Stripe / PayPal / Flutterwave are shown in the design) and redirect.
  return {
    status: "success",
    message: "Online giving is being connected. No payment has been taken.",
    submissionId: Date.now(),
  };
}
