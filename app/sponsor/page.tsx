import type { Metadata } from "next";
import { ButtonLink } from "@/components/button-link";
import { LogoMark } from "@/components/logo";
import { PageTitle } from "@/components/page-title";
import { SponsorTile } from "@/components/sponsor-tile";
import { site } from "@/lib/site";
import { sponsors } from "@/lib/sponsors";

export const metadata: Metadata = {
  title: "Sponsor",
  description:
    "Sponsor Lehigh Baja SAE and help build CC11, or donate through Lehigh University. Gifts to the team are tax-deductible.",
  alternates: { canonical: "/sponsor" },
};

// Columns left over in the sponsor grid's last row (a full row if it's full).
const leftover = (columns: number) => columns - (sponsors.length % columns);

export default function SponsorPage() {
  return (
    <>
      <section className="frame py-12 md:py-16">
        <PageTitle>Help build CC11</PageTitle>
        <div className="mt-8 grid gap-4 md:mt-12 md:grid-cols-2">
          <article className="chamfer flex flex-col bg-gold p-8 text-ink md:p-10">
            <p className="eyebrow">Tax-deductible</p>
            <h2 className="headline mt-4 text-4xl md:text-5xl">Donate through Lehigh</h2>
            <p className="mt-4 max-w-md flex-1 leading-relaxed">
              Gifts go through Lehigh University&apos;s giving site. Write “Baja SAE” in the
              comments so your gift reaches the team directly.
            </p>
            <div className="mt-8">
              <ButtonLink href={site.donateUrl} variant="dark">
                Donate online
              </ButtonLink>
            </div>
          </article>

          <article className="chamfer relative isolate flex flex-col overflow-hidden bg-brown p-8 md:p-10">
            <LogoMark className="absolute -right-12 -bottom-12 -z-10 h-72 w-auto text-rust/60" />
            <p className="eyebrow text-gold">Funding, parts, or discounts</p>
            <h2 className="headline mt-4 text-4xl text-white md:text-5xl">Become a sponsor</h2>
            <p className="mt-4 max-w-md flex-1 leading-relaxed text-tan">
              We get some funding from Lehigh University, but sponsors are what turn each
              year&apos;s design into a car on the course, and their logos ride on it.
              Tiers start at $100, and parts or services count toward them too.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 text-white">
              <ButtonLink href={site.sponsorGuideUrl}>Sponsorship guide</ButtonLink>
              <ButtonLink href={`mailto:${site.email}`} variant="outline">
                Email us
              </ButtonLink>
            </div>
          </article>
        </div>
      </section>

      <section className="bg-brown">
        <div className="frame py-16 md:py-24">
          <p className="eyebrow text-gold">Thank you</p>
          <h2 className="headline mt-4 text-4xl text-white md:text-5xl">2026 season sponsors</h2>
          <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {sponsors.map((sponsor) => (
              <li key={sponsor.name} className="h-32 md:h-40">
                <SponsorTile sponsor={sponsor} logoArea={11000} caption />
              </li>
            ))}
            <li
              style={
                {
                  "--span": leftover(2),
                  "--span-sm": leftover(3),
                  "--span-lg": leftover(4),
                } as React.CSSProperties
              }
              className="col-[span_var(--span)] h-32 sm:col-[span_var(--span-sm)] md:h-40 lg:col-[span_var(--span-lg)]"
            >
              <a
                href={`mailto:${site.email}?subject=Sponsoring%20Lehigh%20Baja`}
                className="flex h-full flex-col items-center justify-center gap-2 border-2 border-dashed border-white/30 text-white transition-colors hover:border-gold hover:text-gold"
              >
                <span className="headline text-2xl">Your logo here</span>
                <span className="eyebrow text-tan">Become a sponsor →</span>
              </a>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
