"use client";

import { useEffect } from "react";

const skipEvents = ["pointerdown", "keydown", "wheel", "touchmove"] as const;

export function IntroSkip() {
  useEffect(() => {
    const root = document.documentElement;
    if (root.dataset.intro === "skip") return;

    const skip = () => {
      root.dataset.intro = "skip";
    };
    const stopListening = () => {
      for (const type of skipEvents) window.removeEventListener(type, skip);
    };

    for (const type of skipEvents) {
      window.addEventListener(type, skip, { passive: true, once: true });
    }
    // Matches the intro's length in globals.css.
    const timer = window.setTimeout(stopListening, 2100);

    return () => {
      window.clearTimeout(timer);
      stopListening();
    };
  }, []);

  return null;
}
