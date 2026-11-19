"use client";

import { submitApplication } from "@/app/actions/forms";
import { Checkbox, Field, FormMessage, TextArea, TextInput } from "@/components/ui/Field";
import { useFormAction } from "./use-form-action";

/**
 * Intercessor Application (Join — Section 8, audit §5.3).
 * Corrections per approved decisions: the email placeholder reads "Email Address";
 * the undocumented $19.99 background-check charge is NOT displayed. "Share your
 * journey" is a textarea (its label asks for free text; Figma drew a 45px box).
 */
export function ApplicationForm() {
  const { state, pending, formRef, formAction, onSubmit, error } = useFormAction(submitApplication);

  return (
    <form
      ref={formRef}
      action={formAction}
      onSubmit={onSubmit}
      noValidate
      className="rounded-[11.5px] bg-white px-6 py-8 shadow-form sm:px-10 lg:px-[2.3rem] lg:py-[2.3rem]"
      aria-labelledby="application-title"
    >
      <h3 id="application-title" className="text-[clamp(1.75rem,1.4rem+1vw,2.15rem)] leading-[1.2] font-medium tracking-[-0.03em] text-sacred">
        Intercessor Application
      </h3>
      <p className="mt-2 text-lg leading-[1.5] tracking-[-0.06em] text-slate">Please fill out all required fields to complete your application.</p>

      <div className="mt-9 flex flex-col gap-9">
        <fieldset className="flex flex-col gap-[1.15rem]">
          <legend className="mb-[1.15rem] w-full border-b border-cream pb-2 text-[1.43rem] leading-8 font-medium tracking-[-0.02em] text-sacred">
            Personal Information
          </legend>
          <div className="grid gap-[1.15rem] md:grid-cols-2">
            <Field id="firstName" label="First Name" required error={error("firstName")}>
              {(p) => <TextInput {...p} name="firstName" autoComplete="given-name" required />}
            </Field>
            <Field id="lastName" label="Last Name" required error={error("lastName")}>
              {(p) => <TextInput {...p} name="lastName" autoComplete="family-name" required />}
            </Field>
            <Field id="email" label="Email Address" required error={error("email")}>
              {(p) => <TextInput {...p} name="email" type="email" autoComplete="email" placeholder="Email Address" required />}
            </Field>
            <Field id="church" label="Church / Denomination" error={error("church")}>
              {(p) => <TextInput {...p} name="church" autoComplete="organization" />}
            </Field>
            <Field id="dateOfBirth" label="Date of Birth" required error={error("dateOfBirth")}>
              {(p) => <TextInput {...p} name="dateOfBirth" type="date" autoComplete="bday" required />}
            </Field>
            <Field id="availability" label="Prayer Availability" error={error("availability")}>
              {(p) => <TextInput {...p} name="availability" placeholder="Morning · Afternoon · Evening · Night Watch" />}
            </Field>
          </div>
        </fieldset>

        <fieldset className="flex flex-col gap-[1.15rem]">
          <legend className="mb-[1.15rem] w-full border-b border-cream pb-2 text-[1.43rem] leading-8 font-medium tracking-[-0.02em] text-sacred">
            Intercession Information
          </legend>
          <Field id="yearsInterceding" label="How long have you been interceding?" error={error("yearsInterceding")}>
            {(p) => <TextInput {...p} name="yearsInterceding" type="number" inputMode="numeric" min={0} max={99} placeholder="Years" />}
          </Field>
          <Field id="journey" label="Share your journey with prayer — in your own words." error={error("journey")}>
            {(p) => <TextArea {...p} name="journey" rows={4} />}
          </Field>
          <Field id="languages" label="Languages Spoken" required error={error("languages")}>
            {(p) => <TextInput {...p} name="languages" placeholder="e.g., English, French" required />}
          </Field>
        </fieldset>

        <Checkbox name="acknowledgement" required error={error("acknowledgement")}>
          Applications are reviewed within 3–5 business days. You will receive a confirmation email upon approval.
        </Checkbox>

        <FormMessage status={state.status} message={state.message} />

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={pending}
            className="h-[3.45rem] rounded-full bg-gold px-9 text-lg font-medium tracking-[-0.02em] text-white transition-colors hover:bg-[#b8973f] disabled:opacity-70"
          >
            {pending ? "Submitting…" : "Submit Application"}
          </button>
        </div>
      </div>
    </form>
  );
}
