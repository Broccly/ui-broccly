"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";
import type { MyPost } from "@/types/api";
import SidebarShell from "@/components/SidebarShell";

function slugify(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

export default function MyStoriesPage() {
  const { userId, email, token } = useAuth();
  const emailPrefix = email ? email.split("@")[0] : "me";
  const [posts, setPosts] = useState<MyPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!userId || !token) return;
    api
      .getMyPosts(userId, token)
      .then(({ posts }) => setPosts(posts))
      .catch((err) => setError(err instanceof Error ? err.message : "Failed to load stories."))
      .finally(() => setLoading(false));
  }, [userId, token]);

  return (
    <SidebarShell>
      <h1 className="text-2xl font-bold mb-6">Your Stories</h1>

      {loading && <p className="text-gray-400 text-sm">Loading…</p>}
      {error && <p className="text-red-500 text-sm">{error}</p>}

      {!loading && !error && posts.length === 0 && (
        <p className="text-gray-400 text-sm">
          You haven&apos;t published any stories yet.{" "}
          <a href="/new-story" className="text-gray-700 underline underline-offset-2">
            Write one
          </a>
          .
        </p>
      )}

      <ul className="flex flex-col divide-y divide-gray-100">
        {posts.map((post) => (
          <li key={post._id} className="py-4">
            <Link
              href={`/@${emailPrefix}/${slugify(post.title)}?id=${post._id}`}
              className="font-semibold text-gray-900 leading-snug hover:underline"
            >
              {post.title}
            </Link>
            <p className="text-xs text-gray-400 mt-1">
              {new Date(post.created_at).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </li>
        ))}
      </ul>
    </SidebarShell>
  );
}
