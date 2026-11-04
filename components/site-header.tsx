import Link from "next/link";
import { HeaderTone } from "./header-tone";
import { LogoMark } from "./logo";
import { SiteNav } from "./site-nav";

export function SiteHeader() {
  return (
    <header className="site-header pointer-events-none z-40">
      <HeaderTone />
      <div className="header-bar pt-2">
        <div className="frame">
          <div className="pointer-events-auto relative isolate flex h-14 items-center justify-between gap-6 pr-2.5 pl-5">
            {/* The glass lives on its own layer: a backdrop-filter on an
                ancestor would trap the fixed-position mobile menu inside it.
                Only the glass leans with the buttons; the nav stays upright. */}
            <div aria-hidden="true" className="glass-frost absolute inset-0 -z-10 -skew-x-8" />
            <Link href="/" className="flex items-center gap-3 text-(--nav-fg) transition-colors duration-300">
              <LogoMark className="h-7 w-auto" />
              <span className="headline text-base max-[369px]:hidden sm:text-lg">Lehigh Baja</span>
            </Link>
            <SiteNav />
          </div>
        </div>
      </div>
    </header>
  );
}
