"use client";

import { submitPrayerRequest } from "@/app/actions/forms";
import { prayerCategories, prayerVisibility } from "@/content/collections";
import { ChoiceGroup } from "@/components/ui/Choice";
import { Field, FormMessage, TextArea, TextInput } from "@/components/ui/Field";
import { useFormAction } from "./use-form-action";

const legend = "text-[1.43rem] leading-8 font-medium tracking-[-0.02em] text-sacred";

/** "Bring Your Need" request form (Prayer Wall Section 7, audit §5.4). */
export function PrayerRequestForm() {
  const { state, pending, formRef, formAction, onSubmit, error } = useFormAction(submitPrayerRequest);
  return (
    <form
      ref={formRef}
      action={formAction}
      onSubmit={onSubmit}
      noValidate
      aria-label="Post a prayer request"
      className="flex flex-col gap-[3.75rem] rounded-card bg-white px-6 py-10 shadow-soft sm:px-10 lg:px-[2.95rem] lg:py-[5.06rem]"
    >
      <div className="flex flex-col gap-5">
        <fieldset className="flex flex-col gap-[1.15rem]">
          <legend className={`${legend} mb-[1.15rem] w-full border-b border-cream pb-2`}>Personal Information</legend>
          <Field id="pr-name" label="Your Name (or stay Anonymous)" error={error("name")}>
            {(p) => <TextInput {...p} name="name" autoComplete="name" />}
          </Field>
          <Field id="pr-request" label="Prayer Request" error={error("request")}>
            {(p) => <TextArea {...p} name="request" rows={7} placeholder="Share what is on your heart..." className={`${p.className} min-h-[13.4rem]`} required />}
          </Field>
        </fieldset>
        <ChoiceGroup
          name="category"
          legend={<span className={legend}>Category</span>}
          options={prayerCategories}
          defaultValue="Health"
          variant="pill"
          error={error("category")}
        />
        <ChoiceGroup
          name="visibility"
          legend={<span className={legend}>Visibility</span>}
          options={prayerVisibility}
          defaultValue="Anonymous"
          variant="rect"
          error={error("visibility")}
        />
      </div>
      <div className="flex flex-col gap-4">
        <FormMessage status={state.status} message={state.message} />
        <button
          type="submit"
          disabled={pending}
          className="h-[3.45rem] self-start rounded-full bg-gold px-7 text-lg font-medium tracking-[-0.02em] text-white transition-colors hover:bg-[#b8973f] disabled:opacity-70"
        >
          {pending ? "Posting…" : "Post to the Prayer Wall"}
        </button>
      </div>
    </form>
  );
}
