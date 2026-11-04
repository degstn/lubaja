"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav } from "@/lib/site";

const links = nav.filter((item) => !item.featured);
const featured = nav.find((item) => item.featured);

export function SiteNav() {
  const pathname = usePathname();
  const [openOn, setOpenOn] = useState<string | null>(null);
  const [menuTop, setMenuTop] = useState(0);
  const open = openOn === pathname;
  const current = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`) ? "page" : undefined;

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenOn(null);
    };
    document.addEventListener("keydown", closeOnEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <nav aria-label="Main" className="hidden items-center gap-9 lg:flex">
        <ul className="flex items-center gap-7">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                aria-current={current(href)}
                className="group headline relative block py-2 text-sm text-(--nav-muted) transition-colors duration-300 hover:text-(--nav-fg) aria-[current=page]:text-(--nav-fg)"
              >
                {label}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-[3px] origin-left -skew-x-8 scale-x-0 bg-(--nav-accent) transition-transform duration-300 ease-out group-hover:scale-x-100 group-aria-[current=page]:scale-x-100"
                />
              </Link>
            </li>
          ))}
        </ul>
        {featured && (
          <Link
            href={featured.href}
            aria-current={current(featured.href)}
            className="inline-flex h-10 -skew-x-8 items-center bg-gold px-5 text-ink transition-colors hover:bg-white aria-[current=page]:bg-white"
          >
            <span className="headline inline-block skew-x-8 text-sm">{featured.label}</span>
          </Link>
        )}
      </nav>

      <div className="flex items-center gap-2 lg:hidden">
        {featured && (
          <Link
            href={featured.href}
            aria-current={current(featured.href)}
            className="inline-flex h-9 -skew-x-8 items-center bg-gold px-3 text-ink"
          >
            <span className="headline inline-block skew-x-8 text-xs">{featured.label}</span>
          </Link>
        )}
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={(event) => {
            // The campaign bar can push the header down until it scrolls away.
            const header = event.currentTarget.closest("header");
            setMenuTop(header?.getBoundingClientRect().bottom ?? 0);
            setOpenOn(open ? null : pathname);
          }}
          className="-mr-2 flex size-11 flex-col items-center justify-center gap-[5px] text-(--nav-fg) transition-colors duration-300"
        >
          <span
            className={`block h-0.5 w-6 bg-current transition-transform duration-300 ${open ? "translate-y-[7px] rotate-45" : ""}`}
          />
          <span
            className={`block h-0.5 w-6 bg-current transition-opacity duration-300 ${open ? "opacity-0" : ""}`}
          />
          <span
            className={`block h-0.5 w-6 bg-current transition-transform duration-300 ${open ? "-translate-y-[7px] -rotate-45" : ""}`}
          />
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Main"
          style={{ top: menuTop }}
          className="fixed inset-x-0 bottom-0 overflow-y-auto bg-brown lg:hidden"
        >
          <div className="frame py-10">
            <ul className="flex flex-col gap-2">
              {links.map(({ href, label }, i) => (
                <li key={href}>
                  <Link
                    href={href}
                    aria-current={current(href)}
                    className="flex items-baseline gap-4 py-2 text-white aria-[current=page]:text-gold"
                  >
                    <span className="eyebrow text-tan">{String(i + 1).padStart(2, "0")}</span>
                    <span className="headline text-4xl sm:text-5xl">{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
            {featured && (
              <Link
                href={featured.href}
                aria-current={current(featured.href)}
                className="chamfer mt-8 flex items-center justify-between bg-gold px-6 py-5 text-ink"
              >
                <span className="headline text-4xl sm:text-5xl">{featured.label}</span>
                <span aria-hidden="true" className="headline text-3xl">
                  →
                </span>
              </Link>
            )}
          </div>
        </nav>
      )}
    </>
  );
}
