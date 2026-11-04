import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    // Pages from the old WordPress site at lehighbaja.org, so existing links keep working.
    return [
      { source: "/about-us", destination: "/team", permanent: true },
      { source: "/support-us", destination: "/sponsor", permanent: true },
      { source: "/support", destination: "/sponsor", permanent: true },
      { source: "/sponsors", destination: "/sponsor", permanent: true },
      { source: "/photos", destination: "/gallery", permanent: true },
    ];
  },
};

export default nextConfig;
