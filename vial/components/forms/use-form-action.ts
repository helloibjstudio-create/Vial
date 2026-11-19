"use client";

import { startTransition, useActionState, useEffect, useRef, type FormEvent } from "react";
import { initialFormState, type FormState } from "@/lib/form-state";

type Action = (prev: FormState, formData: FormData) => Promise<FormState>;

/**
 * Wraps a server action with useActionState.
 * - Submits via onSubmit + startTransition so React's automatic form reset does
 *   not wipe user input when validation fails; resets manually on success.
 * - `action` is also passed to <form action> for no-JS progressive enhancement.
 */
export function useFormAction(action: Action) {
  const [state, formAction, pending] = useActionState(action, initialFormState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "success") formRef.current?.reset();
  }, [state.status, state.submissionId]);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    startTransition(() => formAction(data));
  };

  const error = (field: string) => state.fieldErrors?.[field]?.[0];

  return { state, pending, formRef, formAction, onSubmit, error };
}
