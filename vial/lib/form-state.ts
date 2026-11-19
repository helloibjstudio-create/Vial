import { z } from "zod";

export interface FormState {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Record<string, string[] | undefined>;
  /** Increments on every submission so clients can reset local UI (e.g. after success). */
  submissionId?: number;
}

export const initialFormState: FormState = { status: "idle" };

/** Turn FormData into a plain object, collecting repeated keys into arrays. */
export function formDataToObject(formData: FormData, arrayKeys: string[] = []) {
  const out: Record<string, unknown> = {};
  for (const [key, value] of formData.entries()) {
    if (key.startsWith("$ACTION")) continue;
    const v = typeof value === "string" ? value : value.name;
    if (arrayKeys.includes(key)) {
      (out[key] as string[] | undefined) ??= [];
      (out[key] as string[]).push(v);
    } else {
      out[key] = v;
    }
  }
  for (const key of arrayKeys) out[key] ??= [];
  return out;
}

export function validationError(error: z.ZodError): FormState {
  return {
    status: "error",
    message: "Please check the highlighted fields.",
    fieldErrors: z.flattenError(error).fieldErrors as Record<string, string[] | undefined>,
    submissionId: Date.now(),
  };
}
