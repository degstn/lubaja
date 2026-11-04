"use client";

import { useEffect, useRef, useState } from "react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&";
const SETTLE_MS = 45;

const scrambled = (text: string, settled: number) =>
  [...text]
    .map((char, i) => (char === " " || i < settled ? char : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]))
    .join("");

// Once the text scrolls into view, its letters cycle through random glyphs and
// settle left to right. Each letter keeps its final width so nothing reflows.
export function Scramble({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(text);

  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const settled = Math.floor((now - start) / SETTLE_MS);
          setShown(scrambled(text, settled));
          if (settled < text.length) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [text]);

  const words = text.split(" ");
  const starts = words.map((_, w) => (w ? words.slice(0, w).join(" ").length + 1 : 0));
  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, w) => (
          <span key={w}>
            {w > 0 && " "}
            <span className="inline-block whitespace-nowrap">
              {[...word].map((char, i) => (
                <span key={i} className="relative inline-block">
                  <span className="invisible">{char}</span>
                  <span className="absolute inset-0 text-center">{shown[starts[w] + i]}</span>
                </span>
              ))}
            </span>
          </span>
        ))}
      </span>
    </span>
  );
}
