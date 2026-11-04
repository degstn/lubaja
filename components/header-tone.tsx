"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

type Tone = "light" | "dark";

// Photos and drawings count as dark: the frost stays tinted over them.
const toneOf = (hit: Element | undefined): Tone => {
  for (let el = hit ?? null; el; el = el.parentElement) {
    if (el instanceof HTMLImageElement || el instanceof HTMLVideoElement || el instanceof HTMLCanvasElement) {
      return "dark";
    }
    const rgba = getComputedStyle(el).backgroundColor.match(/^rgba?\(([^)]+)\)$/);
    if (!rgba) continue;
    const [r, g, b, a = 1] = rgba[1].split(/[\s,/]+/).map(Number);
    if (a < 0.5) continue;
    return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255 > 0.6 ? "light" : "dark";
  }
  return "dark";
};

// Marks the header data-tone="light" while a light section is behind it.
export function HeaderTone() {
  const pathname = usePathname();

  useEffect(() => {
    const header = document.querySelector<HTMLElement>(".site-header");
    if (!header) return;
    let frame = 0;

    const update = () => {
      frame = 0;
      const { bottom } = header.getBoundingClientRect();
      const y = bottom - 28;
      const votes = [0.25, 0.5, 0.75].map((share) => {
        const hit = document
          .elementsFromPoint(innerWidth * share, y)
          .find((el) => !header.contains(el) && !el.closest(".intro"));
        return toneOf(hit);
      });
      header.dataset.tone = votes.filter((tone) => tone === "light").length >= 2 ? "light" : "dark";
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    addEventListener("scroll", schedule, { passive: true });
    addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      removeEventListener("scroll", schedule);
      removeEventListener("resize", schedule);
    };
  }, [pathname]);

  return null;
}
