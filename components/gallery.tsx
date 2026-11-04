"use client";

import Image, { type StaticImageData } from "next/image";
import { useRef, useState } from "react";
import type { Photo } from "@/lib/gallery";

export type GalleryAlbum = {
  title: string;
  dates?: string;
  location?: string;
  photos: Photo[];
};

const gridSizes = "(min-width: 1280px) 320px, (min-width: 768px) 30vw, 50vw";

// The viewer letterboxes each photo into the space between its top and bottom
// bars (about 9rem tall together), so wide screens size portrait photos by height.
const viewerSizes = ({ width, height }: StaticImageData) =>
  `(min-aspect-ratio: ${width}/${height}) calc((100vh - 9rem) * ${(width / height).toFixed(3)}), 100vw`;

const pad = (n: number) => String(n).padStart(2, "0");

export function Gallery({ albums }: { albums: GalleryAlbum[] }) {
  const photos = albums.flatMap((album) =>
    album.photos.map((photo) => ({ ...photo, album: album.title })),
  );
  const starts = albums.map((_, i) =>
    albums.slice(0, i).reduce((count, album) => count + album.photos.length, 0),
  );

  const dialogRef = useRef<HTMLDialogElement>(null);
  const thumbs = useRef<(HTMLButtonElement | null)[]>([]);
  const touchX = useRef<number | null>(null);
  const [active, setActive] = useState(0);
  const [viewing, setViewing] = useState(false);

  const show = (index: number) => {
    setActive(index);
    setViewing(true);
    dialogRef.current?.showModal();
  };
  const step = (delta: number) =>
    setActive((index) => (index + delta + photos.length) % photos.length);

  const photo = photos[active];
  const neighbors = [-1, 1].map(
    (delta) => photos[(active + delta + photos.length) % photos.length],
  );

  return (
    <>
      <div className="space-y-20 md:space-y-28">
        {albums.map((album, a) => (
          <section
            key={album.title}
            aria-labelledby={`album-${a}`}
            className="grid gap-6 md:grid-cols-[14rem_1fr] md:gap-10 xl:grid-cols-[18rem_1fr]"
          >
            <header className="md:sticky md:top-24 md:self-start">
              {album.dates && <p className="eyebrow text-gold">{album.dates}</p>}
              <h2
                id={`album-${a}`}
                className="headline mt-3 text-3xl text-white md:text-2xl xl:text-3xl"
              >
                {album.title}
              </h2>
              {album.location && <p className="eyebrow mt-3 text-tan">{album.location}</p>}
              <p className="eyebrow mt-3 text-clay">{album.photos.length} photos</p>
            </header>
            <ul className="columns-2 gap-3 md:gap-4 xl:columns-3">
              {album.photos.map((item, p) => {
                const index = starts[a] + p;
                return (
                  <li key={item.src.src} className="mb-3 break-inside-avoid md:mb-4">
                    <button
                      ref={(node) => {
                        thumbs.current[index] = node;
                      }}
                      type="button"
                      aria-haspopup="dialog"
                      onClick={() => show(index)}
                      className="group block w-full overflow-hidden bg-soil"
                    >
                      <Image
                        src={item.src}
                        alt={item.alt}
                        sizes={gridSizes}
                        placeholder="blur"
                        className="w-full transition duration-500 ease-out group-hover:scale-[1.04] group-hover:opacity-85"
                      />
                    </button>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>

      <dialog
        ref={dialogRef}
        aria-label="Photo viewer"
        className="lightbox"
        onClose={() => {
          setViewing(false);
          // Safari doesn't focus buttons on click, so the dialog can't restore it.
          thumbs.current[active]?.focus();
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") step(1);
          if (event.key === "ArrowLeft") step(-1);
        }}
      >
        <div className="flex h-full flex-col">
          <div className="frame flex h-16 shrink-0 items-center justify-between gap-4">
            <p className="eyebrow truncate text-tan">
              <span className="text-white">{photo.album}</span>
              <span className="ml-3 tabular-nums">
                {pad(active + 1)} / {pad(photos.length)}
              </span>
            </p>
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              className="eyebrow -mr-2 px-2 py-3 text-tan hover:text-white"
            >
              Close
            </button>
          </div>

          <div
            className="min-h-0 flex-1 px-4 md:px-8"
            onTouchStart={(event) => {
              touchX.current = event.touches[0].clientX;
            }}
            onTouchEnd={(event) => {
              if (touchX.current === null) return;
              const dx = event.changedTouches[0].clientX - touchX.current;
              touchX.current = null;
              if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
            }}
          >
            {viewing && (
              <div className="relative h-full">
                <Image
                  key={photo.src.src}
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes={viewerSizes(photo.src)}
                  placeholder="blur"
                  style={{ objectFit: "contain" }}
                  className="lightbox-photo"
                />
                {/* Loads the photos on either side so stepping to them is instant. */}
                {neighbors.map((neighbor) => (
                  <Image
                    key={`preload-${neighbor.src.src}`}
                    src={neighbor.src}
                    alt=""
                    fill
                    sizes={viewerSizes(neighbor.src)}
                    loading="eager"
                    className="hidden"
                  />
                ))}
              </div>
            )}
          </div>

          <div className="frame flex shrink-0 items-center justify-between gap-4 py-4">
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Previous photo"
              className="headline -ml-2 flex size-12 shrink-0 items-center justify-center text-2xl text-tan hover:text-gold"
            >
              ←
            </button>
            <p className="line-clamp-2 max-w-2xl text-center text-sm text-tan">{photo.alt}</p>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next photo"
              className="headline -mr-2 flex size-12 shrink-0 items-center justify-center text-2xl text-tan hover:text-gold"
            >
              →
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
