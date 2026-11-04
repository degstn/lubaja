"use client";

import { useRef, useState } from "react";
import { Track3D, type TrackShape } from "./track-3d";

export type RaceView = {
  name: string;
  dates: string;
  venue?: string;
  town?: string;
  result?: string;
  recap?: string;
  course?: string;
  teams?: number;
  laps?: number;
  car?: string;
  track?: TrackShape;
};

const pad = (n: number) => String(n).padStart(2, "0");

// "October 2–4, 2026" -> days "2–4", month "Oct", year "2026"
const splitDates = (dates: string) => {
  const match = dates.match(/^(\w+) ([\d–-]+), (\d{4})$/);
  return match
    ? { days: match[2], month: match[1].slice(0, 3), year: match[3] }
    : { days: dates, month: "", year: "" };
};

// A made-up loop for the placeholder, not any real course.
const SKETCH =
  "M140 420 C 120 260, 260 140, 420 170 S 700 90, 820 210 S 900 470, 720 500 S 420 560, 300 520 S 160 520, 140 420 Z";

function NoTrack() {
  return (
    <>
      <svg
        viewBox="0 0 1000 620"
        preserveAspectRatio="none"
        aria-hidden="true"
        className="absolute inset-[8%] h-[84%] w-[84%] [transform:rotateX(58deg)_rotateZ(-14deg)]"
      >
        <path d={SKETCH} className="track-sketch" />
      </svg>
      <p className="eyebrow absolute inset-x-0 top-1/2 -translate-y-1/2 text-center text-tan">Course map coming soon</p>
    </>
  );
}

export function RaceLog({ races }: { races: RaceView[] }) {
  // Open on the newest race that has a course map.
  const newestMapped = races.findLastIndex((race) => race.track);
  const [active, setActive] = useState(newestMapped === -1 ? races.length - 1 : newestMapped);
  const cardRef = useRef<HTMLElement>(null);
  const race = races[active];
  const { days, month, year } = splitDates(race.dates);
  const step = (delta: number) => setActive((i) => (i + delta + races.length) % races.length);

  const stats = [
    { label: "Course", value: race.course },
    { label: "Teams", value: race.teams },
    { label: "Car", value: race.car },
    { label: "Endurance laps", value: race.laps },
  ].filter((stat) => stat.value !== undefined);

  return (
    <>
      <div id="visualiser" className="mt-14 flex scroll-mt-24 gap-4 md:gap-6">
        <p
          aria-hidden="true"
          className="headline hidden rotate-180 self-start text-[clamp(2rem,3.6vw,3.4rem)] leading-none whitespace-nowrap text-white [writing-mode:vertical-rl] md:block"
        >
          {race.venue}
        </p>
        <div className="chamfer flex flex-1 bg-gold/60 p-px [--chamfer:2.5rem]">
          <article
            ref={cardRef}
            tabIndex={-1}
            aria-labelledby="race-name"
            onKeyDown={(event) => {
              if (event.key === "ArrowRight") step(1);
              if (event.key === "ArrowLeft") step(-1);
            }}
            className="chamfer relative grid min-h-[38rem] flex-1 gap-8 bg-ink p-5 outline-none [--chamfer:calc(2.5rem_-_0.4px)] sm:p-8 lg:grid-cols-[1fr_20rem]"
          >
            <div className="relative z-10 flex flex-wrap items-start gap-x-12 gap-y-6">
              <div>
                <p className="eyebrow text-tan">When</p>
                <p className="headline mt-2 text-6xl text-gold md:text-7xl">{days}</p>
                <p className="headline text-4xl text-white md:text-5xl">
                  {month} <span className="text-tan">{year}</span>
                </p>
              </div>
              <dl className="grid grid-cols-2 gap-x-10 gap-y-5">
                {stats.map(({ label, value }) => (
                  <div key={label}>
                    <dt className="eyebrow text-tan">{label}</dt>
                    <dd className="headline mt-1 text-3xl text-gold">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="relative z-10 lg:row-span-2">
              <p className="eyebrow text-tan md:hidden">{race.venue}</p>
              <h2 id="race-name" className="headline mt-2 text-3xl text-white md:mt-0">
                {race.name}
              </h2>
              {race.town && <p className="eyebrow mt-2 text-clay">{race.town}</p>}
              {race.result && <p className="headline mt-6 text-xl text-gold">{race.result}</p>}
              <p className="mt-3 text-sm leading-relaxed text-tan">{race.recap ?? "Recap coming soon."}</p>
            </div>

            <div className="relative aspect-[16/10] [perspective:1400px] lg:aspect-auto lg:min-h-[22rem]">
              <div key={active} className="absolute inset-0 [transform-style:preserve-3d]">
                {race.track ? <Track3D track={race.track} /> : <NoTrack />}
              </div>
            </div>

            <div className="relative z-10 flex items-center justify-end gap-3 lg:col-start-2">
              <p className="eyebrow mr-auto text-tan tabular-nums lg:mr-2">
                {pad(active + 1)} / {pad(races.length)}
              </p>
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Previous race"
                className="headline grid size-11 place-items-center bg-gold text-xl text-ink transition-colors hover:bg-white"
              >
                ←
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Next race"
                className="headline grid size-11 place-items-center bg-gold text-xl text-ink transition-colors hover:bg-white"
              >
                →
              </button>
            </div>
          </article>
        </div>
      </div>
      <p aria-live="polite" className="sr-only">
        {`Showing ${race.name}, race ${active + 1} of ${races.length}`}
      </p>

      {/* Newest first, but each race keeps its number from the season order. */}
      <ol id="race-list" className="mt-20 scroll-mt-24 border-t border-white/10">
        {races
          .map((item, i) => ({ item, i }))
          .reverse()
          .map(({ item, i }) => (
          <li key={item.name + item.dates}>
            <button
              type="button"
              aria-current={i === active ? "true" : undefined}
              onClick={() => {
                setActive(i);
                cardRef.current?.focus({ preventScroll: true });
                document.getElementById("visualiser")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="group grid w-full grid-cols-[3.5rem_1fr] items-baseline gap-x-4 gap-y-1 border-b border-white/10 py-5 text-left transition-colors hover:bg-white/[0.03] md:grid-cols-[6rem_1fr_13rem_18rem]"
            >
              <span className="relative">
                <span className="headline text-3xl text-white/30 md:text-5xl">{pad(i + 1)}</span>
                <svg
                  viewBox="0 0 100 40"
                  aria-hidden="true"
                  className="scribble absolute -inset-x-1 top-1/2 h-8 -translate-y-1/2 overflow-visible md:h-10"
                  style={{ rotate: `${(i % 3) * 4 - 4}deg` }}
                >
                  <path d="M4 26 C 22 8, 36 34, 54 18 S 82 10, 96 22" pathLength={1} />
                </svg>
              </span>
              <span className="headline text-2xl text-white transition-colors group-hover:text-gold group-aria-[current=true]:text-gold md:text-4xl">
                {item.name}
              </span>
              <span className="headline col-start-2 text-base text-tan md:col-start-auto md:text-xl">
                {item.dates}
              </span>
              <span className="col-start-2 text-sm text-tan md:col-start-auto md:text-right">
                {item.result}
              </span>
            </button>
          </li>
        ))}
      </ol>
    </>
  );
}
