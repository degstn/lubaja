import type { Metadata } from "next";
import { ButtonLink } from "@/components/button-link";
import { Gallery } from "@/components/gallery";
import { PageTitle } from "@/components/page-title";
import { competitions } from "@/lib/content";
import { albums } from "@/lib/gallery";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Photos from Lehigh Baja SAE's race weekends, from the pits to the endurance course.",
  alternates: { canonical: "/gallery" },
};

const sections = albums.map(({ competition, photos }) => {
  const race = competitions.find(({ name }) => name === competition);
  return { title: competition, dates: race?.dates, location: race?.location, photos };
});

const photoCount = albums.reduce((count, album) => count + album.photos.length, 0);

export default function GalleryPage() {
  return (
    <section className="frame py-12 md:py-16">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <PageTitle>Gallery</PageTitle>
        <p className="eyebrow text-tan">
          {photoCount} photos · {albums.length} race weekends
        </p>
      </div>
      <div className="mt-10 md:mt-14">
        <Gallery albums={sections} />
      </div>
      <div className="mt-20 flex flex-wrap items-center justify-between gap-6 border-t border-white/10 pt-10">
        <p className="headline text-3xl text-white md:text-4xl">More on Instagram</p>
        <ButtonLink href={site.socials.instagram}>@lehighbaja</ButtonLink>
      </div>
    </section>
  );
}
