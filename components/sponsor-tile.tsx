import Image from "next/image";
import type { Sponsor } from "@/lib/sponsors";

type SponsorTileProps = {
  sponsor: Sponsor;
  // Every logo gets roughly the same area, so wide wordmarks and square
  // badges read as equally weighted.
  logoArea?: number;
  caption?: boolean;
  tabIndex?: number;
};

export function SponsorTile({ sponsor, logoArea = 9000, caption = false, tabIndex }: SponsorTileProps) {
  const { name, logo, wordmark, url, dark } = sponsor;

  let mark: React.ReactNode;
  if (logo) {
    const aspect = logo.width / logo.height;
    const width = Math.round(Math.sqrt(logoArea * aspect));
    mark = (
      <Image
        src={logo}
        alt={name}
        width={width}
        height={Math.round(width / aspect)}
        className="max-h-[58%] max-w-[78%] object-contain"
      />
    );
  } else {
    mark = (
      <span
        role="img"
        aria-label={name}
        className={`font-label text-2xl font-bold tracking-tight md:text-3xl ${dark ? "text-white" : "text-ink"}`}
      >
        {wordmark}
      </span>
    );
  }

  const tile = (
    <div
      className={`chamfer relative flex h-full items-center justify-center ${dark ? "bg-black" : "bg-white"}`}
    >
      {mark}
      {caption && (
        <span
          aria-hidden="true"
          className="absolute right-4 bottom-3 left-4 truncate font-label text-[0.625rem] tracking-[0.12em] text-clay uppercase"
        >
          {name}
        </span>
      )}
    </div>
  );

  if (!url) return tile;
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" tabIndex={tabIndex} className="group block h-full">
      {tile}
    </a>
  );
}
