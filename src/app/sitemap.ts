import type { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://www.broccly.in";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: BASE_URL, changeFrequency: "monthly", priority: 1 }];
}
