"use client";

import { useEffect, useRef } from "react";

const DEFAULT_EVENTS = [
  "mousedown",
  "touchstart",
  "click",
  "mouseup",
];
export default function useClickOutside<T extends HTMLElement>(
  handler: (e: Event) => void
) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const listener = (event: Event) => {
      const target = event.target as Element | null; // Narrow the type of target
      if (
        ref.current &&
        target &&
        !ref.current.contains(target || {})
      ) {
        handler(event);
      }
    };
    DEFAULT_EVENTS.forEach((fn) =>
      document.addEventListener(fn, listener)
    );
    return () => {
      DEFAULT_EVENTS.forEach((fn) =>
        document.removeEventListener(fn, listener)
      );
    };
  }, [ref, handler]);
  return ref;
}
