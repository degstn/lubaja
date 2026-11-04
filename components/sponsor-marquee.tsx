"use client";

import { useEffect, useRef } from "react";
import { sponsors } from "@/lib/sponsors";
import { SponsorTile } from "./sponsor-tile";

// One pass through the sponsors when the strip runs on its own.
const LAP_MS = 45_000;
// After you let go, the strip waits this long before it runs again.
const RESUME_MS = 1200;
const DRAG_THRESHOLD = 5;
const MAX_FLING = 3;

type Drag = {
  id: number;
  startX: number;
  originX: number;
  moved: boolean;
  samples: { t: number; x: number }[];
};

export function SponsorMarquee({ className = "" }: { className?: string }) {
  const viewRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const view = viewRef.current;
    const strip = stripRef.current;
    if (!view || !strip) return;
    const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");

    // Three identical copies with the real list in the middle. Keeping x
    // within one copy of the middle lets the strip loop without a seam.
    let lap = strip.scrollWidth / 3;
    let x = -lap;
    let speed = 0; // px per ms, eased toward cruising speed
    let fling = 0; // px per ms, carried over from a released drag
    let resumeAt = 0;
    let hovered = false;
    let keyboardFocus = false;
    let visible = true;
    let frame = 0;
    let last = 0;
    let drag: Drag | null = null;
    let swallowClick = false;

    const hold = () => {
      resumeAt = performance.now() + RESUME_MS;
    };

    // A keyboard-focused sponsor has to stay put, so no looping while focused.
    const wrap = () => {
      if (keyboardFocus || lap <= 0) return 0;
      let shift = 0;
      while (x > -lap) {
        x -= lap;
        shift -= lap;
      }
      while (x <= -2 * lap) {
        x += lap;
        shift += lap;
      }
      return shift;
    };

    const tick = (now: number) => {
      const dt = Math.min(now - last, 50);
      last = now;
      if (!drag) {
        if (Math.abs(fling) > 0.01) {
          x += fling * dt;
          fling *= Math.exp(-dt / 325);
          hold();
        } else {
          fling = 0;
          const cruising = !hovered && !keyboardFocus && !reducedMotion.matches && now >= resumeAt;
          const target = cruising ? -lap / LAP_MS : 0;
          speed += (target - speed) * (1 - Math.exp(-dt / 400));
          x += speed * dt;
        }
      }
      const shift = wrap();
      if (drag) drag.originX += shift;
      strip.style.transform = `translate3d(${x}px, 0, 0)`;
      frame = visible ? requestAnimationFrame(tick) : 0;
    };

    const start = () => {
      if (frame) return;
      last = performance.now();
      frame = requestAnimationFrame(tick);
    };

    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType === "mouse" && event.button !== 0) return;
      drag = {
        id: event.pointerId,
        startX: event.clientX,
        originX: x,
        moved: false,
        samples: [{ t: event.timeStamp, x: event.clientX }],
      };
      fling = 0;
      speed = 0;
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!drag || event.pointerId !== drag.id) return;
      const dx = event.clientX - drag.startX;
      if (!drag.moved) {
        if (Math.abs(dx) < DRAG_THRESHOLD) return;
        drag.moved = true;
        view.setPointerCapture(event.pointerId);
        view.dataset.dragging = "";
      }
      x = drag.originX + dx;
      drag.samples.push({ t: event.timeStamp, x: event.clientX });
      if (drag.samples.length > 6) drag.samples.shift();
    };

    const onRelease = (event: PointerEvent) => {
      if (!drag || event.pointerId !== drag.id) return;
      if (drag.moved) {
        const recent = drag.samples.find(({ t }) => event.timeStamp - t < 100) ?? drag.samples.at(-1)!;
        const elapsed = event.timeStamp - recent.t;
        const velocity = elapsed > 0 ? (event.clientX - recent.x) / elapsed : 0;
        fling = event.type === "pointerup" ? Math.max(-MAX_FLING, Math.min(MAX_FLING, velocity)) : 0;
        // The click that follows a drag shouldn't open the sponsor's site.
        swallowClick = true;
        setTimeout(() => {
          swallowClick = false;
        });
        delete view.dataset.dragging;
      }
      drag = null;
      hold();
    };

    const onClick = (event: MouseEvent) => {
      if (!swallowClick) return;
      event.preventDefault();
      event.stopPropagation();
    };

    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return;
      event.preventDefault();
      x -= event.deltaX * (event.deltaMode === 1 ? 16 : 1);
      fling = 0;
      speed = 0;
      hold();
    };

    const onPointerEnter = (event: PointerEvent) => {
      if (event.pointerType === "mouse") hovered = true;
    };
    const onPointerLeave = (event: PointerEvent) => {
      if (event.pointerType === "mouse") hovered = false;
    };

    const onFocusIn = (event: FocusEvent) => {
      const target = event.target as HTMLElement;
      if (!target.matches(":focus-visible")) return;
      keyboardFocus = true;
      speed = 0;
      const box = view.getBoundingClientRect();
      const tile = target.getBoundingClientRect();
      if (tile.left < box.left || tile.right > box.right) {
        x += box.left + box.width / 2 - (tile.left + tile.width / 2);
      }
    };
    const onFocusOut = (event: FocusEvent) => {
      if (view.contains(event.relatedTarget as Node | null)) return;
      keyboardFocus = false;
      hold();
    };

    const resize = new ResizeObserver(() => {
      const next = strip.scrollWidth / 3;
      if (lap > 0 && next > 0) x *= next / lap;
      lap = next;
    });
    resize.observe(strip);

    const onScreen = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
    });
    onScreen.observe(view);

    const listeners: [string, EventListener, AddEventListenerOptions?][] = [
      ["pointerdown", onPointerDown as EventListener],
      ["pointermove", onPointerMove as EventListener],
      ["pointerup", onRelease as EventListener],
      ["pointercancel", onRelease as EventListener],
      ["lostpointercapture", onRelease as EventListener],
      ["pointerenter", onPointerEnter as EventListener],
      ["pointerleave", onPointerLeave as EventListener],
      ["focusin", onFocusIn as EventListener],
      ["focusout", onFocusOut as EventListener],
      ["click", onClick as EventListener, { capture: true }],
      ["wheel", onWheel as EventListener, { passive: false }],
    ];
    for (const [type, listener, options] of listeners) view.addEventListener(type, listener, options);
    start();

    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      onScreen.disconnect();
      for (const [type, listener, options] of listeners) view.removeEventListener(type, listener, options);
    };
  }, []);

  return (
    <div
      ref={viewRef}
      onDragStart={(event) => event.preventDefault()}
      className={`cursor-grab touch-pan-y overflow-clip select-none data-dragging:cursor-grabbing [&_a]:cursor-[inherit] ${className}`}
    >
      <div
        ref={stripRef}
        className="flex w-max will-change-transform"
        style={{ transform: "translateX(-33.3333%)" }}
      >
        {[0, 1, 2].map((copy) => (
          <ul key={copy} aria-hidden={copy === 1 ? undefined : true} className="flex shrink-0 gap-4 pr-4">
            {sponsors.map((sponsor) => (
              <li key={sponsor.name} className="h-28 w-56 shrink-0 md:h-32 md:w-64">
                <SponsorTile sponsor={sponsor} tabIndex={copy === 1 ? undefined : -1} />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
