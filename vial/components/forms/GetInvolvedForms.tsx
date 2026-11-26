"use client";

import { useState } from "react";
import { startDonation, submitContact, submitVolunteer, subscribeNewsletter } from "@/app/actions/forms";
import { contactSubjects, givingAmounts, givingCauses, givingFrequencies, volunteerRoles } from "@/content/collections";
import { cn } from "@/lib/cn";
import { ChoiceGroup } from "@/components/ui/Choice";
import { Field, FormMessage, TextArea, TextInput } from "@/components/ui/Field";
import { useFormAction } from "./use-form-action";

/* ---------------- Volunteer (Section 7, audit §5.7) ---------------- */

export function VolunteerForm() {
  const { state, pending, formRef, formAction, onSubmit, error } = useFormAction(submitVolunteer);
  return (
    <form
      ref={formRef}
      action={formAction}
      onSubmit={onSubmit}
      noValidate
      aria-label="Volunteer with VIAL"
      className="flex flex-col gap-5 rounded-form bg-white p-6 shadow-soft sm:p-12 sm:pb-12"
    >
      <Field id="vol-name" label="Full Name" variant="soft" error={error("fullName")}>
        {(p) => <TextInput {...p} name="fullName" autoComplete="name" placeholder="Your full name" required />}
      </Field>
      <Field id="vol-email" label="Email" variant="soft" error={error("email")}>
        {(p) => <TextInput {...p} name="email" type="email" autoComplete="email" placeholder="you@example.com" required />}
      </Field>
      <ChoiceGroup
        name="roles"
        type="checkbox"
        legend={<span className="text-sm font-medium tracking-[-0.015em] text-brown/60">How would you like to serve?</span>}
        legendClassName="mb-2"
        options={volunteerRoles}
        variant="soft"
        error={error("roles")}
      />
      <FormMessage status={state.status} message={state.message} />
      <button
        type="submit"
        disabled={pending}
        className="h-[3.25rem] w-full rounded-full bg-brown text-base font-semibold tracking-[-0.02em] text-white transition-colors hover:bg-[#4a370c] disabled:opacity-70"
      >
        {pending ? "Sending…" : "Submit"}
      </button>
    </form>
  );
}

/* ---------------- Giving (Donate section, audit §5.7) ---------------- */

export function GiveForm() {
  const { state, pending, formRef, formAction, onSubmit, error } = useFormAction(startDonation);
  const [amount, setAmount] = useState<string>("");
  const [custom, setCustom] = useState(false);

  return (
    <form ref={formRef} action={formAction} onSubmit={onSubmit} noValidate aria-label="Give to the movement" className="flex flex-col gap-[3.75rem]">
      <fieldset>
        <legend className="sr-only">Choose where your gift goes</legend>
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {givingCauses.map((cause, i) => (
            <label key={cause.id} className="group relative cursor-pointer">
              <input type="radio" name="cause" value={cause.id} defaultChecked={i === 0} className="peer sr-only" />
              <span className="flex h-full flex-col gap-4 rounded-tile border border-gold/20 bg-white/4 px-7 pt-7 pb-14 transition-colors duration-300 peer-checked:border-gold peer-checked:bg-gold/30 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gold group-hover:border-gold/60">
                <span aria-hidden="true" className="text-[1.75rem] leading-[2.6rem]">
                  {cause.emoji}
                </span>
                <span className="flex flex-col gap-2">
                  <span className="font-display text-2xl leading-6 font-medium tracking-[-0.03em] text-white">{cause.title}</span>
                  <span className="text-sm leading-[1.375rem] tracking-[-0.015em] text-cream-muted/70">{cause.description}</span>
                </span>
              </span>
              <span className="pointer-events-none absolute bottom-6 left-7 flex items-center gap-1.5 text-xs font-semibold tracking-[0.04em] text-gold/50 uppercase peer-checked:hidden">
                <span className="size-1.5 rounded-full bg-gold/40" /> Give here
              </span>
              <span className="pointer-events-none absolute bottom-6 left-7 hidden items-center gap-1.5 text-xs font-semibold tracking-[0.04em] text-gold uppercase peer-checked:flex">
                <span className="size-1.5 rounded-full bg-gold" /> Selected
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="flex flex-col gap-6">
        <fieldset className="inline-flex self-start rounded-full border border-gold/20 bg-white/7 p-1">
          <legend className="sr-only">Frequency</legend>
          {givingFrequencies.map((f, i) => (
            <label key={f} className="cursor-pointer">
              <input type="radio" name="frequency" value={f} defaultChecked={i === 0} className="peer sr-only" />
              <span className="inline-flex h-10 items-center rounded-full px-7 text-sm font-semibold tracking-[-0.015em] text-white/60 capitalize transition-colors peer-checked:bg-gold peer-checked:text-ink peer-focus-visible:outline-2 peer-focus-visible:outline-gold">
                {f}
              </span>
            </label>
          ))}
        </fieldset>

        <fieldset className="flex flex-wrap items-center gap-4">
          <legend className="sr-only">Amount</legend>
          {givingAmounts.map((a) => (
            <button
              key={a}
              type="button"
              aria-pressed={!custom && amount === String(a)}
              onClick={() => {
                setCustom(false);
                setAmount(String(a));
              }}
              className="h-11 rounded-full border border-gold/35 px-5 text-sm font-semibold tracking-[-0.015em] text-cream-muted/80 transition-colors hover:border-gold aria-pressed:border-gold aria-pressed:bg-gold aria-pressed:text-ink"
            >
              ${a}
            </button>
          ))}
          <button
            type="button"
            aria-pressed={custom}
            onClick={() => {
              setCustom(true);
              setAmount("");
            }}
            className="h-11 rounded-full border border-gold/35 px-5 text-sm font-semibold tracking-[-0.015em] text-cream-muted/80 transition-colors hover:border-gold aria-pressed:border-gold aria-pressed:bg-gold aria-pressed:text-ink"
          >
            Custom
          </button>
          {custom && (
            <label className="flex h-11 items-center gap-1 rounded-full border border-gold/60 px-4 text-sm text-white">
              <span aria-hidden="true">$</span>
              <span className="sr-only">Custom amount in US dollars</span>
              <input
                autoFocus
                inputMode="decimal"
                value={amount}
                onChange={(e) => setAmount(e.target.value.replace(/[^\d.]/g, ""))}
                className="w-24 bg-transparent outline-none placeholder:text-white/40"
                placeholder="Amount"
              />
            </label>
          )}
          <input type="hidden" name="amount" value={amount} />
          <button
            type="submit"
            disabled={pending}
            className="h-[3.25rem] rounded-full bg-gold px-10 text-base font-semibold tracking-[-0.02em] text-ink transition-colors hover:bg-[#d6b75e] disabled:opacity-70"
          >
            {pending ? "Please wait…" : "Give Now"}
          </button>
        </fieldset>
        {error("amount") && <p className="text-sm text-[#ffb4a8]">{error("amount")}</p>}
        <div className={cn(state.status === "idle" && "hidden")}>
          <FormMessage status={state.status} message={state.message} />
        </div>
      </div>
    </form>
  );
}

/* ---------------- Contact (Section 6, audit §5.7) ---------------- */

export function ContactForm() {
  const { state, pending, formRef, formAction, onSubmit, error } = useFormAction(submitContact);
  return (
    <form
      ref={formRef}
      action={formAction}
      onSubmit={onSubmit}
      noValidate
      aria-label="Contact VIAL"
      className="flex flex-col gap-5 rounded-form bg-white p-6 shadow-brown-xs sm:p-12"
    >
      <div className="grid gap-5 sm:grid-cols-2 sm:gap-4">
        <Field id="contact-name" label="Full Name" variant="soft" error={error("fullName")}>
          {(p) => <TextInput {...p} name="fullName" autoComplete="name" placeholder="Your full name" required />}
        </Field>
        <Field id="contact-email" label="Email Address" variant="soft" error={error("email")}>
          {(p) => <TextInput {...p} name="email" type="email" autoComplete="email" placeholder="you@example.com" required />}
        </Field>
      </div>
      <ChoiceGroup
        name="subject"
        legend={<span className="text-sm font-medium tracking-[-0.015em] text-brown/60">Subject</span>}
        legendClassName="mb-2"
        options={contactSubjects}
        defaultValue="General"
        variant="soft-ink"
        error={error("subject")}
      />
      <Field id="contact-message" label="Message" variant="soft" error={error("message")}>
        {(p) => <TextArea {...p} name="message" rows={5} placeholder="Write your message here…" className={`${p.className} min-h-[8.75rem]`} required />}
      </Field>
      <FormMessage status={state.status} message={state.message} />
      <button
        type="submit"
        disabled={pending}
        className="h-[3.25rem] w-full rounded-full bg-gold text-base font-semibold tracking-[-0.02em] text-ink transition-colors hover:bg-[#d6b75e] disabled:opacity-70"
      >
        {pending ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}

/* ---------------- Mailing list ---------------- */

export function NewsletterForm() {
  const { state, pending, formRef, formAction, onSubmit, error } = useFormAction(subscribeNewsletter);
  return (
    <form ref={formRef} action={formAction} onSubmit={onSubmit} noValidate aria-label="Subscribe to updates" className="flex flex-col gap-3">
      <div className="flex flex-col gap-3 sm:flex-row">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="Enter your email"
          aria-invalid={error("email") ? true : undefined}
          className="h-12 w-full min-w-0 shrink-0 rounded-full border border-brown/22 sm:w-auto sm:flex-1 bg-white/60 px-5 text-[0.9375rem] tracking-[-0.02em] text-brown outline-none placeholder:text-brown/40 focus:border-brown/60 aria-invalid:border-crimson"
        />
        <button
          type="submit"
          disabled={pending}
          className="h-12 rounded-full bg-gold px-7 text-[0.9375rem] font-semibold tracking-[-0.02em] text-ink transition-colors hover:bg-[#d6b75e] disabled:opacity-70"
        >
          {pending ? "…" : "Subscribe"}
        </button>
      </div>
      {error("email") && <p className="text-sm text-crimson">{error("email")}</p>}
      {state.status === "success" && <FormMessage status="success" message={state.message} />}
    </form>
  );
}
