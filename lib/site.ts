export const site = {
  name: "Lehigh Baja",
  shortName: "Lehigh Baja",
  url: "https://lehighbaja.com",
  tagline: "Design. Build. Send it.",
  season: "2026–27",
  description:
    "Lehigh University's student-run Baja SAE team. Every year we design, build, and race a single-seat off-road vehicle.",
  email: "inlubaja@lehigh.edu",
  university: {
    name: "Lehigh University",
    url: "https://www.lehigh.edu",
    privacyUrl: "https://www2.lehigh.edu/about/privacy-policy",
    accessibilityUrl: "https://accessibility.lehigh.edu",
  },
  socials: {
    instagram: "https://www.instagram.com/lehighbaja/",
    facebook: "https://www.facebook.com/lehighbaja/",
    youtube: "https://www.youtube.com/channel/UChrNiAwbsRMJz6GXkxSqizw",
    linkedin: "https://www.linkedin.com/company/lehigh-university-baja-sae/",
  },
  donateUrl:
    "https://securelb.imodules.com/s/1127/g20/form.aspx?sid=1127&gid=1&pgid=5310&cid=9528&dids=56&bledit=1&sort=",
  sponsorGuideUrl: "/lehigh-baja-sponsorship-guide-2026-2027.pdf",
} as const;

// Shown in the bar above the header until endsAt, then the bar hides itself.
export const campaign = {
  url: "https://www.givecampus.com/schools/LehighUniversity/lehigh-crowdfunding/pages/lehigh-baja",
  // GiveCampus closes the campaign at 1 AM Eastern on Dec 2.
  endsAt: "2026-12-02T01:00:00-05:00",
} as const;

// Keep in sync with the @theme colors in app/globals.css.
export const colors = {
  ink: "#140b05",
  soil: "#26150a",
  brown: "#502d0e",
  rust: "#6b3d16",
  clay: "#9f7549",
  tan: "#dec8b2",
  bone: "#f6f4f2",
  gold: "#ffe41e",
} as const;

type NavItem = {
  href: string;
  label: string;
  // Shown as a call-to-action button instead of a plain link.
  featured?: boolean;
};

export const nav: NavItem[] = [
  { href: "/car", label: "CC11" },
  { href: "/team", label: "Team" },
  { href: "/competitions", label: "Competitions" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
  { href: "/sponsor", label: "Sponsor", featured: true },
];
