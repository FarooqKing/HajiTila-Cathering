import type { MetadataRoute } from "next";
import { business } from "@/data/business";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: `${business.siteUrl}/`, lastModified: new Date(), changeFrequency: "monthly", priority: 1 }];
}
