import type { MetadataRoute } from "next";
import { nav, site } from "@/lib/site";

const routes = ["/", ...nav.map(({ href }) => href)];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({ url: new URL(route, site.url).href }));
}
