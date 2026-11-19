import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Check, ChevronDown } from "./icons";

/**
 * Form controls — audit §3.5 / §5.
 *  app   Join / Prayer Wall / Prayer Watch forms: cream 1px stroke, ~9px radius, 48px tall
 *  soft  Get Involved forms: brown@25% stroke, 10px radius, 52px tall, brown text
 */
export type FieldVariant = "app" | "soft";

const control: Record<FieldVariant, string> = {
  app: "min-h-12 rounded-[9px] border border-cream bg-white px-3.5 text-[1.0625rem] tracking-[-0.02em] text-sacred placeholder:text-sacred/50 focus:border-gold",
  soft: "min-h-[3.25rem] rounded-chip border border-brown/25 bg-white/60 px-[1.125rem] text-[0.9375rem] tracking-[-0.02em] text-brown placeholder:text-brown/40 focus:border-brown/60",
};

const labelStyle: Record<FieldVariant, string> = {
  app: "text-base font-medium tracking-[-0.01em] text-sacred",
  soft: "text-sm font-medium tracking-[-0.015em] text-brown/60",
};

interface FieldProps {
  id: string;
  label: ReactNode;
  required?: boolean;
  error?: string;
  hint?: ReactNode;
  variant?: FieldVariant;
  className?: string;
  children: (controlProps: { id: string; "aria-invalid"?: boolean; "aria-describedby"?: string; className: string }) => ReactNode;
}

export function Field({ id, label, required, error, hint, variant = "app", className, children }: FieldProps) {
  const describedBy = [error && `${id}-error`, hint && `${id}-hint`].filter(Boolean).join(" ") || undefined;
  return (
    <div className={cn("flex min-w-0 flex-col", variant === "app" ? "gap-1" : "gap-2", className)}>
      <label htmlFor={id} className={labelStyle[variant]}>
        {label}
        {required && (
          <>
            <span aria-hidden="true"> *</span>
            <span className="sr-only"> (required)</span>
          </>
        )}
      </label>
      {children({
        id,
        "aria-invalid": error ? true : undefined,
        "aria-describedby": describedBy,
        className: cn(
          "w-full outline-none transition-colors duration-200 aria-invalid:border-crimson",
          control[variant],
        ),
      })}
      {hint && (
        <p id={`${id}-hint`} className="text-sm text-brown/70">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="text-sm text-crimson">
          {error}
        </p>
      )}
    </div>
  );
}

export function TextInput(props: ComponentPropsWithoutRef<"input">) {
  return <input {...props} />;
}

export function TextArea({ className, ...props }: ComponentPropsWithoutRef<"textarea">) {
  return <textarea {...props} className={cn(className, "resize-y py-3 leading-snug")} />;
}

export function Select({ className, children, ...props }: ComponentPropsWithoutRef<"select">) {
  return (
    <div className="relative">
      <select {...props} className={cn(className, "appearance-none pr-12")}>
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute top-1/2 right-5 h-2.5 w-4 -translate-y-1/2 text-sacred" />
    </div>
  );
}

export function Checkbox({
  name,
  children,
  error,
  required,
}: {
  name: string;
  children: ReactNode;
  error?: string;
  required?: boolean;
}) {
  const id = `${name}-checkbox`;
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="flex cursor-pointer items-start gap-3.5 text-base font-medium tracking-[-0.01em] text-sacred">
        <span className="relative mt-[3px] grid size-[1.125rem] shrink-0 place-items-center">
          <input
            id={id}
            name={name}
            type="checkbox"
            required={required}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? `${id}-error` : undefined}
            className="peer size-full cursor-pointer appearance-none rounded-[4px] border border-brown/40 bg-white transition-colors checked:border-gold checked:bg-gold aria-invalid:border-crimson"
          />
          <Check className="pointer-events-none absolute size-3 text-white opacity-0 peer-checked:opacity-100" />
        </span>
        <span>{children}</span>
      </label>
      {error && (
        <p id={`${id}-error`} className="pl-8 text-sm text-crimson">
          {error}
        </p>
      )}
    </div>
  );
}

/** Live status message for form submissions. */
export function FormMessage({ status, message }: { status: "idle" | "success" | "error"; message?: string }) {
  if (status === "idle" || !message) return <div aria-live="polite" className="sr-only" />;
  return (
    <div
      role={status === "error" ? "alert" : "status"}
      className={cn(
        "rounded-chip border px-4 py-3 text-[0.9375rem] font-medium tracking-[-0.02em]",
        status === "success" ? "border-gold/40 bg-cream text-brown" : "border-crimson/30 bg-crimson/5 text-crimson",
      )}
    >
      {message}
    </div>
  );
}
