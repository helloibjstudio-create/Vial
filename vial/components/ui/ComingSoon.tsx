"use client";

import { useId, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Button, type ButtonSize, type ButtonVariant } from "./Button";

/**
 * A designed call-to-action whose destination does not exist yet (no PDF, player,
 * pagination backend, …). It keeps the designed button and, when activated,
 * explains in place that the feature is coming — never a dead link.
 */
export function ComingSoonButton({
  message,
  className,
  messageClassName,
  variant,
  size,
  icon,
  buttonClassName,
  children,
}: {
  message: string;
  className?: string;
  messageClassName?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: "download" | "arrow" | "arrow-up-right" | "none";
  buttonClassName?: string;
  children: ReactNode;
}) {
  const [shown, setShown] = useState(false);
  const id = useId();
  return (
    <div className={cn("flex flex-col items-start gap-2", className)}>
      <Button
        variant={variant}
        size={size}
        icon={icon}
        className={buttonClassName}
        aria-describedby={shown ? id : undefined}
        onClick={() => setShown(true)}
      >
        {children}
      </Button>
      <p id={id} role="status" className={cn("text-sm", !shown && "sr-only", messageClassName)}>
        {shown ? message : ""}
      </p>
    </div>
  );
}
