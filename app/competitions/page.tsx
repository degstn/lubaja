import type { Metadata } from "next";
import { RaceLog, type RaceView } from "@/components/race-log";
import { TestingGrounds } from "@/components/testing-grounds";
import { cars, competitionFormat, competitions } from "@/lib/content";
import { arrowDownRight } from "@/lib/glyphs";
import { tracks } from "@/lib/tracks";

export const metadata: Metadata = {
  title: "Competitions",
  description:
    "Every race Lehigh Baja has run since 2024, with course maps, stats, and recaps from each weekend.",
  alternates: { canonical: "/competitions" },
};

const year = (dates: string) => Number(dates.slice(-4));

const races: RaceView[] = [...competitions].reverse().map((race) => {
  const [venue, town] = race.location?.split(" · ") ?? [];
  return {
    name: race.name,
    dates: race.dates,
    venue,
    town,
    result: race.result,
    recap: race.recap,
    course: race.course,
    teams: race.teams,
    laps: race.laps,
    car: cars.find((car) => car.year === year(race.dates))?.name,
    track: race.track && tracks[race.track],
  };
});

const headline = [
  { label: "Races", value: competitions.length },
  { label: "Seasons", value: new Set(competitions.map(({ dates }) => year(dates))).size },
  { label: "Best endurance", value: `${Math.max(...competitions.map(({ laps }) => laps ?? 0))} laps` },
];

export default function CompetitionsPage() {
  return (
    <>
      <section className="frame overflow-hidden pt-12 pb-20 md:pt-16 md:pb-28">
        <div className="relative">
          <h1 className="headline text-[clamp(3.5rem,13vw,11rem)] text-white">
            Race
            <br />
            <span className="text-tan">log</span>
          </h1>
          <svg
            viewBox="0 0 800 300"
            aria-hidden="true"
            className="signature pointer-events-none absolute top-[8%] left-[18%] w-[min(70vw,46rem)] overflow-visible"
          >
            <path
              d="M30 230 C 140 60, 260 40, 300 140 S 360 280, 430 170 C 470 100, 440 60, 410 110 C 380 160, 520 200, 600 90 S 720 20, 770 70"
              pathLength={1}
            />
          </svg>
        </div>

        <div className="mt-12 flex flex-wrap items-end justify-between gap-x-12 gap-y-8">
          <p className="max-w-sm text-xl leading-snug text-white">
            Twice a season, we take the car racing. Here&apos;s every weekend since 2024.
          </p>
          <dl className="flex gap-10">
            {headline.map(({ label, value }) => (
              <div key={label}>
                <dt className="eyebrow text-tan">{label}</dt>
                <dd className="headline mt-1 text-4xl text-white md:text-5xl">{value}</dd>
              </div>
            ))}
          </dl>
          <div className="flex gap-3">
            <a href="#visualiser" className="eyebrow border border-white/30 px-4 py-2.5 text-white hover:border-gold hover:text-gold">
              Track visualiser {arrowDownRight}
            </a>
            <a href="#race-list" className="eyebrow border border-white/30 px-4 py-2.5 text-white hover:border-gold hover:text-gold">
              Race list {arrowDownRight}
            </a>
          </div>
        </div>

        <RaceLog races={races} />
      </section>

      <TestingGrounds />

      <section className="bg-bone text-brown">
        <div className="frame py-20 md:py-28">
          <p className="eyebrow text-clay">How it works</p>
          <h2 className="headline mt-4 text-4xl md:text-5xl">Race weekend</h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed">
            We typically race twice a season: OktoBAJAfest, an exhibition race hosted by
            Clarkson University, in the fall, and an international Baja SAE event in the
            spring.
          </p>
          <ol className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {competitionFormat.map(({ name, detail }, i) => (
              <li key={name} className="reveal">
                <span className="headline text-6xl text-rust">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="headline mt-4 text-2xl">{name}</h3>
                <p className="mt-3 leading-relaxed">{detail}</p>
              </li>
            ))}
          </ol>
          <p className="headline mt-20 max-w-3xl text-3xl md:text-5xl">
            Things break. Fixing them on site is part of the job.
          </p>
        </div>
      </section>
    </>
  );
}
