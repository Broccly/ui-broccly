import type { MetadataRoute } from "next";
import { api } from "@/lib/api";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://broccly.app";

function slugify(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/feed`, changeFrequency: "daily", priority: 0.8 },
  ];

  try {
    const { posts } = await api.getAllPosts();
    const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
      url: `${BASE_URL}/@${post.author}/${slugify(post.title)}?id=${post._id}`,
      lastModified: new Date(post.updated_at),
      changeFrequency: "weekly",
      priority: 0.8,
    }));
    return [...staticRoutes, ...postRoutes];
  } catch {
    return staticRoutes;
  }
}
