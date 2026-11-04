import type { Metadata, Viewport } from "next";
import { Chakra_Petch, Geist, Saira } from "next/font/google";
import { CampaignBar } from "@/components/campaign-bar";
import { Intro } from "@/components/intro";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { colors, site } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const chakraPetch = Chakra_Petch({
  variable: "--font-chakra-petch",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const saira = Saira({
  variable: "--font-saira",
  subsets: ["latin"],
  style: "italic",
  axes: ["wdth"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.name,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: site.name,
  },
  twitter: {
    card: "summary_large_image",
  },
};

export const viewport: Viewport = {
  themeColor: colors.brown,
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  alternateName: site.shortName,
  url: site.url,
  logo: `${site.url}/icon-512.png`,
  email: site.email,
  description: site.description,
  sameAs: Object.values(site.socials),
  parentOrganization: {
    "@type": "CollegeOrUniversity",
    name: site.university.name,
    url: site.university.url,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${chakraPetch.variable} ${saira.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Intro />
        <a
          href="#main"
          className="eyebrow sr-only z-50 bg-gold px-4 py-3 text-ink focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <CampaignBar />
        <SiteHeader />
        <main id="main" className="page-chamfer relative z-10 flex-1 bg-ink">
          {children}
        </main>
        <SiteFooter />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
