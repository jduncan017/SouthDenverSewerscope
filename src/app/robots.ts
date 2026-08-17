import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // The lead endpoint accepts POST only; there is nothing here to index.
      disallow: "/api/",
    },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
