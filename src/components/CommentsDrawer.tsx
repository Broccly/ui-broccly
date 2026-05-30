"use client";

import { useCallback, useEffect, useState } from "react";
import { api } from "@/lib/api";
import CommentForm from "./CommentForm";

interface BackendComment {
  _id: string;
  post: string;
  author: string;
  authorName?: string;
  authorAvatarUrl?: string | null;
  text: string;
  updated_at: string;
}

interface Props {
  postId: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function CommentsDrawer({ postId, isOpen, onClose }: Props) {
  const [comments, setComments] = useState<BackendComment[]>([]);
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const { comments: items } = await api.getComments(postId);
      setComments(items);
    } finally {
      setLoading(false);
    }
  }, [postId]);

  useEffect(() => {
    if (isOpen) refresh();
  }, [isOpen, refresh]);

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed inset-y-0 right-0 w-80 bg-white shadow-xl z-50 flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-base">Comments</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 text-xl leading-none"
            aria-label="Close comments"
          >
            ✕
          </button>
        </div>

        {/* Comments list */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {loading ? (
            <p className="text-sm text-gray-400">Loading…</p>
          ) : comments.length === 0 ? (
            <p className="text-sm text-gray-400">No comments yet.</p>
          ) : (
            <ul className="space-y-4">
              {comments.map((c) => (
                <li key={c._id} className="border-b border-gray-100 pb-4 last:border-0">
                  <div className="flex items-center gap-2 mb-1">
                    {c.authorAvatarUrl ? (
                      <img src={c.authorAvatarUrl} alt={c.authorName ?? c.author} className="w-6 h-6 rounded-full object-cover shrink-0" referrerPolicy="no-referrer" />
                    ) : (
                      <span className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-semibold text-gray-600 shrink-0">
                        {(c.authorName ?? c.author).charAt(0).toUpperCase()}
                      </span>
                    )}
                    <p className="text-sm font-medium">
                      {c.authorName ?? c.author}{" "}
                      <span className="text-gray-400 font-normal">
                        ·{" "}
                        {new Date(c.updated_at).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </p>
                  </div>
                  <p className="text-sm text-gray-700">{c.text}</p>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* New comment */}
        <div className="border-t border-gray-100 px-5 py-4">
          <CommentForm postId={postId} onAdded={refresh} />
        </div>
      </div>
    </>
  );
}
