import Link from "next/link";
import { socialLinks } from "@/lib/content";
import { nav, site } from "@/lib/site";
import { LehighShield } from "./lehigh-shield";
import { LogoMark } from "./logo";

type FooterLink = { label: string; href: string };

const columns: { title: string; links: readonly FooterLink[] }[] = [
  { title: "Explore", links: nav.filter(({ featured }) => !featured) },
  {
    title: "Support",
    links: [
      { label: "Sponsor", href: "/sponsor" },
      { label: "Sponsorship guide", href: site.sponsorGuideUrl },
      { label: "Donate", href: site.donateUrl },
    ],
  },
  { title: "Follow", links: socialLinks },
];

// The site collects no personal data, so Lehigh's policies cover it.
const legal = [
  { label: "Lehigh privacy policy", href: site.university.privacyUrl },
  { label: "Accessibility at Lehigh", href: site.university.accessibilityUrl },
];

const linkClass = "text-[0.9375rem] text-bone transition-colors hover:text-gold";

function FooterLink({ label, href }: FooterLink) {
  if (href.startsWith("/") && !href.endsWith(".pdf")) {
    return (
      <Link href={href} className={linkClass}>
        {label}
      </Link>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>
      {label}
    </a>
  );
}

export function SiteFooter() {
  return (
    <footer className="footer-reveal -mt-10 bg-black pt-10">
      <div className="frame grid gap-x-8 gap-y-12 pt-14 pb-12 md:grid-cols-[2fr_repeat(3,minmax(0,1fr))] md:pt-16">
        <div className="flex items-center gap-4 self-start">
          <Link href="/" aria-label="Lehigh Baja home" className="text-white transition-colors hover:text-gold">
            <LogoMark className="h-9 w-auto" />
          </Link>
          <a
            href={site.university.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={site.university.name}
            className="group"
          >
            <LehighShield className="h-9 w-auto" />
          </a>
        </div>
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 md:col-span-3 md:grid-cols-subgrid">
          {columns.map(({ title, links }) => (
            <nav key={title} aria-label={title}>
              <p className="eyebrow text-clay">{title}</p>
              <ul className="mt-5 space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <FooterLink {...link} />
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="md:mt-12">
          <p className="eyebrow font-bold text-bone">
            © {new Date().getFullYear()} {site.name}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-tan">
            Lehigh University&apos;s Baja SAE team
            <br />
            Bethlehem, Pennsylvania
          </p>
        </div>
        <div className="md:col-start-4 md:mt-12">
          <p className="eyebrow text-clay">Contact</p>
          <a href={`mailto:${site.email}`} className={`mt-5 inline-block ${linkClass}`}>
            {site.email}
          </a>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="frame eyebrow flex flex-wrap items-center justify-between gap-x-8 gap-y-3 py-5 text-[0.6875rem]">
          <ul className="flex flex-wrap gap-x-7 gap-y-2">
            {legal.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-tan transition-colors hover:text-gold"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <a href="#top" className="group inline-flex items-center gap-2 text-tan transition-colors hover:text-gold">
            Back to top
            <span aria-hidden="true" className="transition-transform duration-300 group-hover:-translate-y-0.5">
              ↑
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
