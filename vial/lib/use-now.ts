"use client";

import { useSyncExternalStore } from "react";

/**
 * Current time, updated every `intervalMs`. Returns `null` during server render
 * and hydration so prerendering never reads the clock (required by
 * `cacheComponents`, see audit §9.6) and no hydration mismatch occurs.
 */
const listeners = new Set<() => void>();
let now = 0;
let timer: ReturnType<typeof setInterval> | undefined;

function subscribe(listener: () => void) {
  listeners.add(listener);
  if (!timer) {
    now = Date.now();
    timer = setInterval(() => {
      now = Date.now();
      listeners.forEach((l) => l());
    }, 15_000);
  }
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0 && timer) {
      clearInterval(timer);
      timer = undefined;
    }
  };
}

export function useNow(): Date | null {
  const value = useSyncExternalStore(
    subscribe,
    () => now,
    () => 0,
  );
  return value === 0 ? null : new Date(value);
}
