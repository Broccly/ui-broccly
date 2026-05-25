"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";
import type { MyPost } from "@/types/api";
import SidebarShell from "@/components/SidebarShell";

export default function StoryPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { token } = useAuth();

  const [post, setPost] = useState<MyPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id || !token) return;
    api
      .getPostById(id, token)
      .then(({ post }) => setPost(post))
      .catch((err) => setError(err instanceof Error ? err.message : "Failed to load story."))
      .finally(() => setLoading(false));
  }, [id, token]);

  return (
    <SidebarShell>
      {loading && <p className="text-gray-400 text-sm">Loading…</p>}
      {error && <p className="text-red-500 text-sm">{error}</p>}

      {post && (
        <article className="max-w-2xl">
          <h1 className="text-4xl font-bold leading-tight mb-6">{post.title}</h1>
          <p className="text-xs text-gray-400 mb-10">
            {new Date(post.created_at).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
          <div className="text-lg text-gray-800 leading-relaxed whitespace-pre-wrap">
            {post.body}
          </div>
        </article>
      )}
    </SidebarShell>
  );
}
