"use client";

import Image, { type StaticImageData } from "next/image";
import { Fragment, useEffect, useRef, useState } from "react";
import { site } from "@/lib/site";
import { LogoMark } from "./logo";
import { PhotoSlot } from "./photo-slot";

export type ArchiveCar = {
  name?: string;
  year: number;
  note?: string;
  image?: { src: StaticImageData; alt: string; cutout?: boolean };
  races: { name: string; result?: string }[];
};

const label = (car: ArchiveCar) => car.name ?? `${car.year} car`;

export function CarArchive({ cars }: { cars: ArchiveCar[] }) {
  const timeline = [...cars].sort((a, b) => b.year - a.year);
  const newest = timeline[0].year;
  const oldest = timeline[timeline.length - 1].year;
  const years = Array.from({ length: newest - oldest + 1 }, (_, i) => newest - i);
  const byYear = new Map(timeline.map((car) => [car.year, car]));

  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const sweepFrame = useRef(0);
  const sweeping = useRef(false);
  const [year, setYear] = useState(newest);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    let frame = 0;

    // Shows the year under the middle of the screen. Each section carries the
    // span of years it covers, so scrolling through a gap counts through it.
    const update = () => {
      frame = 0;
      if (sweeping.current) return;
      const line = scroller.scrollTop + scroller.clientHeight / 2;
      for (const child of scroller.children) {
        const section = child as HTMLElement;
        const top = section.offsetTop;
        const height = section.offsetHeight;
        if (line < top + height || section === scroller.lastElementChild) {
          const from = Number(section.dataset.from);
          const to = Number(section.dataset.to);
          const progress = Math.min(Math.max((line - top) / height, 0), 1);
          setYear(Math.round(from + (to - from) * progress));
          return;
        }
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    // Only a person scrolling cancels the opening count-up; the scroll reset
    // when the archive opens shouldn't.
    const interrupt = () => {
      if (!sweeping.current) return;
      sweeping.current = false;
      cancelAnimationFrame(sweepFrame.current);
      onScroll();
    };

    scroller.addEventListener("scroll", onScroll, { passive: true });
    for (const type of ["wheel", "touchstart", "keydown"]) {
      scroller.addEventListener(type, interrupt, { passive: true });
    }
    return () => {
      scroller.removeEventListener("scroll", onScroll);
      for (const type of ["wheel", "touchstart", "keydown"]) {
        scroller.removeEventListener(type, interrupt);
      }
      cancelAnimationFrame(frame);
    };
  }, []);

  const stopSweep = () => {
    sweeping.current = false;
    cancelAnimationFrame(sweepFrame.current);
  };

  const open = () => {
    const dialog = dialogRef.current;
    const scroller = scrollerRef.current;
    if (!dialog || !scroller) return;
    dialog.showModal();
    scroller.scrollTo({ top: 0, behavior: "instant" });
    scroller.focus({ preventScroll: true });

    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setYear(newest);
      return;
    }
    // Roll the counter up from the first car to today while the screen wipes in.
    sweeping.current = true;
    const start = performance.now();
    const tick = (now: number) => {
      if (!sweeping.current) return;
      const t = Math.min((now - start) / 900, 1);
      setYear(Math.round(oldest + (newest - oldest) * (1 - (1 - t) ** 3)));
      if (t < 1) sweepFrame.current = requestAnimationFrame(tick);
      else sweeping.current = false;
    };
    sweepFrame.current = requestAnimationFrame(tick);
  };

  const jumpTo = (target: number) => {
    stopSweep();
    scrollerRef.current
      ?.querySelector(`[data-car="${target}"]`)
      ?.scrollIntoView({ block: "start" });
  };

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={open}
        className="inline-flex -skew-x-8 items-center border border-white/20 px-4 py-2.5 text-tan transition-colors hover:border-gold hover:text-gold"
      >
        <span className="inline-flex skew-x-8 items-center gap-3">
          <span aria-hidden="true" className="flex flex-col gap-[3px]">
            <span className="block h-0.5 w-3 bg-current" />
            <span className="block h-0.5 w-4 bg-current" />
            <span className="block h-0.5 w-3 bg-current" />
          </span>
          <span className="eyebrow">Archive</span>
          <span className="font-label text-[0.625rem] opacity-60">
            {oldest}–{newest}
          </span>
        </span>
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby="archive-title"
        className="archive"
        onClose={() => {
          stopSweep();
          // Safari doesn't focus buttons on click, so the dialog can't restore it.
          triggerRef.current?.focus();
        }}
        style={{ "--age": (newest - year) / (newest - oldest || 1) } as React.CSSProperties}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex items-end justify-end overflow-hidden"
        >
          <span className="headline -mb-[0.12em] pr-[2vw] text-[clamp(8rem,30vw,30rem)] leading-none text-white/[0.06] tabular-nums">
            {year}
          </span>
        </div>

        <div
          ref={scrollerRef}
          tabIndex={-1}
          className="absolute inset-0 snap-y snap-proximity overflow-y-auto overscroll-contain scroll-smooth outline-none motion-reduce:scroll-auto"
        >
          {timeline.map((car, i) => {
            const next = timeline[i + 1];
            return (
              <Fragment key={car.year}>
                <section
                  data-car={car.year}
                  data-from={car.year}
                  data-to={car.year}
                  className="flex min-h-dvh snap-start items-center py-24 pr-6 pl-16 md:pr-16 md:pl-36"
                >
                  <div className="grid w-full max-w-6xl items-center gap-8 md:grid-cols-[1.25fr_1fr] md:gap-14">
                    {car.image ? (
                      <Image
                        src={car.image.src}
                        alt={car.image.alt}
                        sizes="(min-width: 768px) 55vw, 100vw"
                        placeholder={car.image.cutout ? "empty" : "blur"}
                        className={`aspect-[16/10] w-full ${car.image.cutout ? "object-contain" : "chamfer object-cover"}`}
                      />
                    ) : (
                      <PhotoSlot label={label(car)} className="aspect-[16/10] w-full" />
                    )}
                    <div>
                      {car.note && <p className="eyebrow text-gold">{car.note}</p>}
                      <h3 className="headline mt-3 text-5xl text-white md:text-7xl">
                        {label(car)}
                      </h3>
                      {car.name && <p className="mt-2 font-label text-sm text-gold">{car.year}</p>}
                      {car.races.length > 0 && (
                        <ul className="mt-6 space-y-2 border-t border-white/10 pt-4 text-sm">
                          {car.races.map((race) => (
                            <li key={race.name} className="flex justify-between gap-4">
                              <span className="text-white">{race.name}</span>
                              <span className="text-right text-tan">
                                {race.result ?? "Recap coming soon"}
                              </span>
                            </li>
                          ))}
                        </ul>
                      )}
                      {!next && (
                        <button
                          type="button"
                          onClick={() => scrollerRef.current?.scrollTo({ top: 0 })}
                          className="eyebrow mt-10 py-2 text-tan hover:text-white"
                        >
                          Back to {newest} ↑
                        </button>
                      )}
                    </div>
                  </div>
                </section>

                {next && car.year - next.year > 1 && (
                  <section
                    data-from={car.year - 1}
                    data-to={next.year + 1}
                    className="relative h-[220dvh]"
                  >
                    <div className="sticky top-0 flex h-dvh items-center pr-6 pl-16 md:pl-36">
                      <div className="max-w-xl">
                        <p className="eyebrow text-gold">
                          {next.year + 1}–{car.year - 1}
                        </p>
                        <h3 className="headline mt-4 text-4xl text-white md:text-6xl">
                          Still digging through the archives
                        </h3>
                        <p className="mt-6 text-lg leading-relaxed text-tan">
                          Have photos or stories from these years?{" "}
                          <a
                            href={`mailto:${site.email}?subject=Lehigh%20Baja%20archive`}
                            className="text-white underline underline-offset-4 hover:text-gold"
                          >
                            Send them our way
                          </a>
                          .
                        </p>
                      </div>
                    </div>
                  </section>
                )}
              </Fragment>
            );
          })}
        </div>

        <nav
          aria-label="Cars by year"
          className="pointer-events-none absolute top-20 bottom-8 left-0 flex w-14 flex-col justify-between pl-5 md:w-28 md:pl-8"
        >
          {years.map((y) => {
            const car = byYear.get(y);
            const active = y === year;
            const bar = (
              <span
                className={`block shrink-0 transition-all duration-200 ${
                  active
                    ? "h-[3px] w-8 bg-gold"
                    : car
                      ? "h-0.5 w-5 bg-white"
                      : y % 10 === 0
                        ? "h-px w-4 bg-tan/70"
                        : "h-px w-2 bg-tan/30"
                }`}
              />
            );
            const tag =
              active || car || y % 10 === 0 ? (
                <span
                  className={`hidden font-label text-[0.625rem] leading-none md:inline ${active ? "text-gold" : "text-tan/60"}`}
                >
                  {y}
                </span>
              ) : null;

            return car ? (
              <button
                key={y}
                type="button"
                onClick={() => jumpTo(y)}
                aria-label={`${label(car)}, ${y}`}
                aria-current={active ? "true" : undefined}
                className="pointer-events-auto flex min-h-0 flex-1 items-center gap-2"
              >
                {bar}
                {tag}
              </button>
            ) : (
              <span key={y} aria-hidden="true" className="flex min-h-0 flex-1 items-center gap-2">
                {bar}
                {tag}
              </span>
            );
          })}
        </nav>

        <header className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between bg-linear-to-b from-black/50 to-transparent px-5 py-4 md:px-8">
          <div className="flex items-center gap-3">
            <LogoMark className="h-6 w-auto text-white" />
            <h2 id="archive-title" className="headline text-xl text-white">
              Archive
            </h2>
            <span className="font-label text-xs text-tan">
              {oldest}–{newest}
            </span>
          </div>
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            className="eyebrow pointer-events-auto -mr-2 px-2 py-3 text-tan hover:text-white"
          >
            Close
          </button>
        </header>
      </dialog>
    </>
  );
}
