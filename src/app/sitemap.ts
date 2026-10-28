import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/menu", "/iletisim", "/kvkk"].map((path) => ({ url: `${SITE.url}${path}` }));
}
