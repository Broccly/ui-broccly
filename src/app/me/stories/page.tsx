"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";
import { slugify } from "@/lib/utils";
import type { MyPost } from "@/types/api";
import SidebarShell from "@/components/SidebarShell";

export default function MyStoriesPage() {
  const { userId, email, token } = useAuth();
  const router = useRouter();
  const emailPrefix = email ? email.split("@")[0] : "me";
  const [posts, setPosts] = useState<MyPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = "Your Stories – Broccly";
  }, []);

  useEffect(() => {
    if (!userId || !token) return;
    api
      .getMyPosts(userId, token)
      .then(({ posts }) => setPosts(posts))
      .catch((err) => setError(err instanceof Error ? err.message : "Failed to load stories."))
      .finally(() => setLoading(false));
  }, [userId, token]);

  useEffect(() => {
    if (!openMenuId) return;
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenMenuId(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openMenuId]);

  const handleDelete = async (post: MyPost) => {
    if (!token) return;
    if (!window.confirm(`Delete "${post.title}"? This cannot be undone.`)) return;
    setOpenMenuId(null);
    setDeletingId(post._id);
    try {
      await api.deletePost(post._id, token);
      setPosts((prev) => prev.filter((p) => p._id !== post._id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete story.");
    } finally {
      setDeletingId(null);
    }
  };

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
          <li key={post._id} className="py-4 flex items-start justify-between gap-2">
            <div className="min-w-0">
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
            </div>

            <div className="relative shrink-0" ref={openMenuId === post._id ? menuRef : null}>
              <button
                onClick={() => setOpenMenuId(openMenuId === post._id ? null : post._id)}
                disabled={deletingId === post._id}
                className="p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors disabled:opacity-50"
                aria-label="Story options"
              >
                <MoreHorizontal size={18} />
              </button>

              {openMenuId === post._id && (
                <div className="absolute right-0 top-full mt-1 w-36 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-10">
                  <button
                    onClick={() => {
                      setOpenMenuId(null);
                      router.push(`/new-story?id=${post._id}`);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <Pencil size={15} />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(post)}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <Trash2 size={15} />
                    Delete
                  </button>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </SidebarShell>
  );
}
