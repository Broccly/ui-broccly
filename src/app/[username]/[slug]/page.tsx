"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";
import type { MyPost } from "@/types/api";
import SidebarShell from "@/components/SidebarShell";
import LikeButton from "@/components/LikeButton";
import FollowButton from "@/components/FollowButton";
import CommentsDrawer from "@/components/CommentsDrawer";

function AuthorAvatar({ name, avatarUrl }: { name: string; avatarUrl?: string | null }) {
  if (avatarUrl) {
    return (
      <img src={avatarUrl} alt={name} className="w-9 h-9 rounded-full object-cover shrink-0" referrerPolicy="no-referrer" />
    );
  }
  const initial = (name || "?").charAt(0).toUpperCase();
  return (
    <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-sm font-semibold text-gray-600 shrink-0">
      {initial}
    </div>
  );
}

export default function StoryPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { token } = useAuth();

  const [post, setPost] = useState<MyPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    if (!id) return;
    api
      .getPostById(id, token ?? undefined)
      .then(({ post }) => setPost(post))
      .catch((err) => setError(err instanceof Error ? err.message : "Failed to load story."))
      .finally(() => setLoading(false));
  }, [id, token]);

  useEffect(() => {
    document.title = post ? `${post.title} – Broccly` : "Broccly";
  }, [post]);

  return (
    <SidebarShell>
      {loading && <p className="text-gray-400 text-sm">Loading…</p>}
      {error && <p className="text-red-500 text-sm">{error}</p>}

      {post && (
        <article className="max-w-2xl">
          {/* Title */}
          <h1 className="text-4xl font-bold leading-tight mb-6">{post.title}</h1>

          {/* Author row */}
          <div className="flex items-center gap-3 mb-6">
            <AuthorAvatar name={post.authorName ?? post.author} avatarUrl={post.authorAvatarUrl} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-medium text-gray-900 truncate">{post.authorName ?? post.author}</span>
                <FollowButton targetUserId={post.author} />
              </div>
              <p className="text-xs text-gray-400 mt-0.5">
                {new Date(post.created_at).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>

          {/* Action bar — above story body */}
          <div className="flex items-center gap-4 py-3 border-y border-gray-100 mb-8">
            <LikeButton postId={post._id} count={post.likes} />
            <button
              onClick={() => setDrawerOpen(true)}
              className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3h6M4.5 5.25a2.25 2.25 0 012.25-2.25h10.5A2.25 2.25 0 0119.5 5.25v9a2.25 2.25 0 01-2.25 2.25H8.25l-3.75 3.75V5.25z" />
              </svg>
              <span>{post.comments}</span>
            </button>
          </div>

          {/* Story body */}
          <div className="text-lg text-gray-800 leading-relaxed whitespace-pre-wrap">
            {post.body}
          </div>
        </article>
      )}

      {post && (
        <CommentsDrawer
          postId={post._id}
          isOpen={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        />
      )}
    </SidebarShell>
  );
}
