"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Nav from "@/components/Nav";
import { api } from "@/lib/api";
import { slugify, stripHtml } from "@/lib/utils";
import type { MyPost } from "@/types/api";

export default function FeedPage() {
  const [posts, setPosts] = useState<MyPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .getAllPosts()
      .then(({ posts }) => setPosts(posts))
      .catch((err) => setError(err instanceof Error ? err.message : "Failed to load feed."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Nav />
      <div className="max-w-2xl mx-auto px-6">
        <main className="flex-1 min-w-0 pt-8">
          {/* Tabs */}
          <div className="flex gap-6 border-b border-gray-200 mb-6">
            <button className="text-sm font-medium text-gray-900 pb-3 border-b-2 border-gray-900">For you</button>
            <button className="text-sm font-medium text-gray-400 hover:text-gray-700 pb-3">Featured</button>
          </div>

          {loading && <p className="text-sm text-gray-400 py-8 text-center">Loading…</p>}
          {error && <p className="text-sm text-red-500 py-8 text-center">{error}</p>}
          {!loading && !error && posts.length === 0 && (
            <p className="text-sm text-gray-400 py-8 text-center">No stories yet.</p>
          )}

          <div className="divide-y divide-gray-100">
            {posts.map((post) => {
              const date = new Date(post.created_at).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              });
              const preview = stripHtml(post.body).slice(0, 150).trimEnd();

              return (
                <article key={post._id} className="py-6">
                  {/* Author row */}
                  <div className="flex items-center gap-2 mb-3">
                    {post.authorAvatarUrl ? (
                      <img src={post.authorAvatarUrl} alt={post.authorName ?? post.author} className="w-6 h-6 rounded-full object-cover shrink-0" referrerPolicy="no-referrer" />
                    ) : (
                      <span className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 shrink-0 inline-flex items-center justify-center text-white text-xs font-semibold">
                        {(post.authorName ?? post.author).charAt(0).toUpperCase()}
                      </span>
                    )}
                    <span className="text-xs font-medium text-gray-700">{post.authorName ?? post.author}</span>
                  </div>

                  {/* Title + preview */}
                  <Link
                    href={`/@${post.author}/${slugify(post.title)}?id=${post._id}`}
                    className="group block"
                  >
                    <h2 className="text-base font-bold text-gray-900 group-hover:underline leading-snug mb-1 line-clamp-2">
                      {post.title}
                    </h2>
                    {preview && (
                      <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
                        {preview}
                      </p>
                    )}
                  </Link>

                  {/* Date */}
                  <p className="text-xs text-gray-400 mt-3">{date}</p>
                </article>
              );
            })}
          </div>
        </main>
      </div>
    </>
  );
}
