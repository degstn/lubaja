import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import shortTrack from "@/assets/gallery/oktobajafest-2025-07.jpg";
import { ButtonLink } from "@/components/button-link";
import { LogoMark } from "@/components/logo";
import { Marquee } from "@/components/marquee";
import { SponsorMarquee } from "@/components/sponsor-marquee";
import { competitions, stats } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const [latest] = competitions.filter((competition) => competition.recap);

export default function Home() {
  return (
    <>
      {/* Runs up behind the floating header to meet the campaign bar. */}
      <section className="relative isolate -mt-16 flex min-h-[calc(100svh-var(--campaign-bar,0rem))] flex-col overflow-hidden bg-brown pt-16">
        <LogoMark className="absolute top-[78%] -right-[40%] -z-10 h-[65%] w-auto -translate-y-1/2 text-rust/60 sm:top-[45%] sm:-right-[10%] sm:h-[110%]" />
        <div className="frame flex flex-1 flex-col justify-center py-12">
          <h1 className="headline mt-6 text-[clamp(3.5rem,10.5vw,10rem)] text-white">
            Design.
            <br />
            Build.
            <br />
            <span className="text-gold">Send it.</span>
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-tan">
            Lehigh University&apos;s student-run Baja SAE team. Every year we design and
            build a single-seat off-road car from scratch, then race it through
            obstacles, rough terrain, and a four-hour endurance race.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <ButtonLink href="/team">Meet the team</ButtonLink>
            <ButtonLink href="/car" variant="outline">
              See the car
            </ButtonLink>
          </div>
        </div>
        <Marquee
          items={["Lehigh Baja SAE", "Student-built", "Off-road", "Bethlehem, PA", "CC11", "Send it"]}
          className="border-y border-white/10 bg-ink py-4 text-2xl text-white"
        />
      </section>

      <section className="bg-ink">
        <dl className="frame grid grid-cols-2 gap-x-6 gap-y-12 py-16 md:grid-cols-4 md:py-24">
          {stats.map(({ value, label }) => (
            <div key={label} className="reveal flex flex-col">
              <dt className="eyebrow order-last mt-3 max-w-[16ch] text-tan">{label}</dt>
              <dd className="headline text-6xl text-white before:mb-5 before:block before:h-1.5 before:w-12 before:-skew-x-8 before:bg-gold before:content-[''] md:text-7xl">
                {value}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="bg-brown">
        <div className="frame grid items-center gap-12 py-20 md:grid-cols-2 md:py-28">
          <div className="reveal">
            <p className="eyebrow text-gold">What we do</p>
            <h2 className="headline mt-4 text-5xl text-white md:text-7xl">
              One car.
              <br />
              From scratch.
              <br />
              Every year.
            </h2>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-tan">
              We design and manufacture a single-seat off-road vehicle built to climb
              over and maneuver around rough terrain. Everything we learn in class gets
              tested for real, from the first sketch to repairs in the pits.
            </p>
            <div className="mt-8 text-white">
              <ButtonLink href="/team" variant="outline">
                About the team
              </ButtonLink>
            </div>
          </div>
          <Image
            src={shortTrack}
            alt="Car 84 lined up at the start of the short track at OktoBAJAfest 2025"
            sizes="(min-width: 768px) 50vw, 100vw"
            placeholder="blur"
            className="reveal chamfer aspect-[4/3] w-full object-cover"
          />
        </div>
      </section>

      {latest && (
        <section className="bg-ink">
          <div className="frame py-20 md:py-28">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="eyebrow text-gold">Latest from the track</p>
                <h2 className="headline mt-4 text-4xl text-white sm:text-5xl md:text-7xl">
                  {latest.name}
                </h2>
              </div>
              <div className="text-white">
                <ButtonLink href="/competitions" variant="outline">
                  Full race log
                </ButtonLink>
              </div>
            </div>
            <article className="reveal mt-10 grid gap-8 border-t border-white/10 pt-10 md:grid-cols-[1fr_2fr]">
              <div>
                <p className="eyebrow text-tan">{latest.dates}</p>
                <p className="headline mt-3 text-2xl text-gold">{latest.result}</p>
              </div>
              <p className="text-lg leading-relaxed text-tan">{latest.recap}</p>
            </article>
          </div>
        </section>
      )}

      <section className="bg-bone py-20 text-brown md:py-28">
        <div className="frame flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow text-clay">2026 season sponsors</p>
            <h2 className="headline mt-4 text-5xl md:text-7xl">Powered by</h2>
          </div>
          <ButtonLink href="/sponsor" variant="outline">
            Become a sponsor
          </ButtonLink>
        </div>
        <SponsorMarquee className="mt-12" />
      </section>

      <section className="bg-gold text-ink">
        <div className="frame grid gap-10 py-20 md:grid-cols-2 md:py-28">
          <h2 className="headline text-6xl md:text-8xl">Want in?</h2>
          <div className="grid gap-6 self-end">
            <a
              href={`mailto:${site.email}`}
              className="flex items-baseline justify-between gap-4 border-b-2 border-ink pb-4 focus-visible:outline-ink"
            >
              <span className="headline text-3xl md:text-4xl">Join the team</span>
              <span className="eyebrow">Email us →</span>
            </a>
            <Link
              href="/sponsor"
              className="flex items-baseline justify-between gap-4 border-b-2 border-ink pb-4 focus-visible:outline-ink"
            >
              <span className="headline text-3xl md:text-4xl">Sponsor the car</span>
              <span className="eyebrow">Sponsor →</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
