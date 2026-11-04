import type { Metadata } from "next";
import Image from "next/image";
import { ButtonLink } from "@/components/button-link";
import { CarArchive } from "@/components/car-archive";
import { PageTitle } from "@/components/page-title";
import { Scramble } from "@/components/scramble";
import { cars, competitions, socialLinks } from "@/lib/content";
import { arrowUpRight } from "@/lib/glyphs";

export const metadata: Metadata = {
  title: "CC11",
  description:
    "CC11 is Lehigh Baja's 2026–27 car. We're designing and building it now, and it will be announced soon.",
  alternates: { canonical: "/car" },
};

// Widths of the redaction bars, so the hidden numbers look like real values.
const specs = [
  { name: "Weight", redacted: "4.5rem" },
  { name: "Engine", redacted: "7rem" },
  { name: "Transmission", redacted: "6rem" },
  { name: "Top speed", redacted: "4rem" },
  { name: "Suspension travel", redacted: "5rem" },
  { name: "Wheelbase", redacted: "4.5rem" },
];

const archive = cars.map((car) => ({
  ...car,
  races: competitions
    .filter(({ dates }) => dates.endsWith(String(car.year)))
    .map(({ name, result }) => ({ name, result })),
}));

const [current] = cars;

export default function CarPage() {
  return (
    <>
      <section className="frame py-12 md:py-16">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <PageTitle>{current.name}</PageTitle>
          <CarArchive cars={archive} />
        </div>
        <div className="chamfer relative mt-8 bg-brown md:mt-12">
          <p className="eyebrow absolute top-6 left-6 text-gold md:top-8 md:left-8">
            Chassis concept
          </p>
          <p className="eyebrow absolute top-6 right-6 text-tan md:top-8 md:right-8">
            2026–27 season
          </p>
          {current.image && (
            <Image
              src={current.image.src}
              alt={current.image.alt}
              preload
              sizes="(min-width: 1024px) 896px, 92vw"
              className="mx-auto w-full max-w-4xl px-6 pt-16 pb-8 md:pt-20 md:pb-12"
            />
          )}
        </div>
      </section>

      <section className="frame grid gap-14 pb-20 md:grid-cols-[3fr_2fr] md:items-end md:pb-28">
        {/* Sized to the column so "announced" always fits on one line. */}
        <div className="@container">
          <p className="eyebrow text-gold">Coming soon</p>
          <h2 className="headline mt-4 text-[clamp(2rem,13cqi,6.5rem)] text-white">
            CC11 will be
            <br />
            <Scramble text="announced soon." className="text-gold" />
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-tan">
            We&apos;re designing and building it right now. Follow along to see it first.
          </p>
        </div>
        <div>
          <p className="eyebrow text-tan">Stay tuned</p>
          <ul className="mt-4 border-t border-white/15">
            {socialLinks.map(({ label, handle, href }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-baseline justify-between gap-4 border-b border-white/15 py-4"
                >
                  <span className="headline text-2xl text-white transition-colors group-hover:text-gold">
                    {label}
                  </span>
                  <span className="eyebrow text-tan transition-colors group-hover:text-white">
                    {handle} {arrowUpRight}
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-8 text-white">
            <ButtonLink href="/sponsor">Help build CC11</ButtonLink>
          </div>
        </div>
      </section>

      <section className="bg-bone text-brown">
        <div className="frame py-20 md:py-28">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow text-clay">Spec sheet</p>
              <h2 className="headline mt-4 text-4xl md:text-5xl">By the numbers</h2>
            </div>
            <p className="eyebrow text-clay">Classified until the reveal</p>
          </div>
          <dl className="mt-10 grid border-t-2 border-brown md:grid-cols-2 md:gap-x-12">
            {specs.map(({ name, redacted }) => (
              <div key={name} className="flex items-center justify-between gap-6 border-b border-brown/20 py-4">
                <dt className="eyebrow">{name}</dt>
                <dd className="stripes h-4 -skew-x-8 bg-brown text-bone" style={{ width: redacted }}>
                  <span className="sr-only">Not announced yet</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
