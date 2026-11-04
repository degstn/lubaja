import type { Metadata } from "next";
import Image from "next/image";
import teamPhoto from "@/assets/gallery/oktobajafest-2025-01.jpg";
import { PageTitle } from "@/components/page-title";
import { leads } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Team",
  description:
    "Meet Lehigh Baja SAE, the student-run team that designs, builds, and races Lehigh University's off-road car every year.",
  alternates: { canonical: "/team" },
};

// The eyebrow style, scaled to the card so labels fit three-across on phones.
const roleLabel = "font-label text-[clamp(0.5625rem,7cqi,0.75rem)] leading-tight tracking-[0.18em] uppercase";

const initials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("");

export default function TeamPage() {
  return (
    <>
      <section className="frame py-12 md:py-16">
        <PageTitle>
          Student-built.
          <br />
          Student-run.
        </PageTitle>
        <div className="mt-8 grid items-center gap-12 md:mt-12 md:grid-cols-2">
          <div className="space-y-6 text-lg leading-relaxed text-tan">
            <p className="text-xl text-white">
              Every year, Lehigh Baja designs and manufactures a single-seat off-road
              vehicle built to withstand rough terrain, climbing over and maneuvering
              around whatever the course throws at it.
            </p>
            <p>
              Our team puts in countless hours over the academic year to get the car
              ready for competition. From start to finish, we apply what we learn in the
              classroom to real engineering problems.
            </p>
            <p>
              Whether it&apos;s the start of a new design or problem-solving mid-race, the
              hands-on experience we get here shapes us as engineers.
            </p>
          </div>
          <Image
            src={teamPhoto}
            alt="The team in yellow shirts posing around car 84 at OktoBAJAfest 2025"
            sizes="(min-width: 768px) 50vw, 100vw"
            placeholder="blur"
            className="chamfer aspect-[4/3] w-full object-cover"
          />
        </div>
      </section>

      <section className="bg-bone text-brown">
        <div className="frame grid gap-10 py-20 md:grid-cols-[1fr_2fr] md:py-28">
          <div>
            <p className="eyebrow text-clay">The competition</p>
            <h2 className="headline mt-4 text-4xl md:text-5xl">What is Baja SAE?</h2>
          </div>
          <div className="reveal space-y-6 text-lg leading-relaxed">
            <p>
              Baja SAE is an international engineering design competition run by SAE
              International. University teams design and build a single-seat off-road
              vehicle, then put it through safety inspections, design presentations,
              dynamic events, and a four-hour endurance race.
            </p>
            <p>The car has to survive all of it, and so do we.</p>
          </div>
        </div>
      </section>

      <section className="frame py-20 md:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow text-gold">Roster</p>
            <h2 className="headline mt-4 text-4xl text-white md:text-5xl">The crew</h2>
          </div>
          <p className="eyebrow text-clay">2026–27 team leads</p>
        </div>
        <ul className="mt-10 grid max-w-md grid-cols-3 gap-x-3 gap-y-6 sm:max-w-2xl sm:grid-cols-4 sm:gap-x-4 lg:max-w-none lg:grid-cols-8">
          {leads.map(({ name, roles, linkedin, photo }) => (
            <li key={name} className="@container">
              <a href={linkedin} target="_blank" rel="noopener noreferrer" className="group block">
                <div className="chamfer stripes relative aspect-[4/5] overflow-hidden bg-soil text-rust">
                  {photo ? (
                    <Image
                      src={photo}
                      alt=""
                      fill
                      sizes="(min-width: 640px) 152px, 30vw"
                      placeholder="blur"
                      className="object-cover transition-[filter] duration-500 pointer-fine:grayscale pointer-fine:group-hover:grayscale-0 pointer-fine:group-focus-visible:grayscale-0"
                    />
                  ) : (
                    <span
                      aria-hidden="true"
                      className="headline absolute bottom-[-0.08em] left-[0.1em] text-[48cqi] leading-none"
                    >
                      {initials(name)}
                    </span>
                  )}
                  <span
                    aria-hidden="true"
                    className="absolute right-1.5 bottom-1.5 grid size-5 place-items-center bg-gold text-[0.625rem] font-bold text-ink"
                  >
                    in
                  </span>
                </div>
                <h3 className="headline mt-2.5 text-[clamp(0.75rem,11cqi,1.5rem)] text-white transition-colors group-hover:text-gold">
                  {name}
                </h3>
                {roles.map((role) => (
                  <p
                    key={role}
                    className={`${roleLabel} mt-1 ${role === "Team Captain" ? "text-gold" : "text-tan"}`}
                  >
                    {role}
                  </p>
                ))}
                <span className="sr-only">LinkedIn profile, opens in a new tab</span>
              </a>
            </li>
          ))}
          <li className="@container">
            <a
              href={`mailto:${site.email}?subject=Joining%20Lehigh%20Baja`}
              className="chamfer group flex aspect-[4/5] flex-col justify-between bg-gold p-[clamp(0.625rem,9cqi,1.5rem)] text-ink focus-visible:outline-ink"
            >
              <span className={roleLabel}>Open seat</span>
              <span className="headline text-[clamp(1rem,16cqi,3rem)]">Your name here</span>
              <span className={roleLabel}>
                Join the team{" "}
                <span aria-hidden="true" className="inline-block transition-transform group-hover:translate-x-1">
                  →
                </span>
              </span>
            </a>
          </li>
        </ul>
      </section>

      <section className="bg-gold text-ink">
        <div className="frame flex flex-wrap items-center justify-between gap-8 py-16">
          <h2 className="headline text-4xl md:text-6xl">Interested in joining?</h2>
          <a
            href={`mailto:${site.email}`}
            className="headline text-2xl underline decoration-2 underline-offset-8 focus-visible:outline-ink md:text-3xl"
          >
            {site.email}
          </a>
        </div>
      </section>
    </>
  );
}
