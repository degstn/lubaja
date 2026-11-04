import type { Metadata } from "next";
import { PageTitle } from "@/components/page-title";
import { socialLinks } from "@/lib/content";
import { arrowUpRight } from "@/lib/glyphs";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Email Lehigh Baja SAE or find the team on Instagram, YouTube, LinkedIn, and Facebook.",
  alternates: { canonical: "/contact" },
};

const links = [
  { label: "Email", detail: site.email, href: `mailto:${site.email}` },
  ...socialLinks.map(({ label, handle, href }) => ({ label, detail: handle, href })),
];

export default function ContactPage() {
  return (
    <section className="frame py-12 md:py-16">
      <PageTitle>Get in touch</PageTitle>
      <ul className="mt-8 border-t border-white/10 md:mt-12">
        {links.map(({ label, detail, href }) => {
          const external = href.startsWith("http");
          return (
            <li key={label} className="border-b border-white/10">
              <a
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className="group flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-5"
              >
                <span className="headline text-3xl text-white transition-colors group-hover:text-gold md:text-4xl">
                  {label}
                </span>
                <span className="font-label text-sm text-tan transition-colors group-hover:text-white">
                  {detail} <span aria-hidden="true">{external ? arrowUpRight : "→"}</span>
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
