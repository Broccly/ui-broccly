"use client";

import { useCallback, useEffect, useState } from "react";
import CommentForm from "./CommentForm";
import { api } from "@/lib/api";

interface BackendComment {
  _id: string;
  post: string;
  author: string;
  text: string;
  updated_at: string;
}

export default function CommentsSection({ postId }: { postId: string }) {
  const [comments, setComments] = useState<BackendComment[]>([]);

  const refresh = useCallback(async () => {
    const { comments: items } = await api.getComments(postId);
    setComments(items);
  }, [postId]);

  useEffect(() => { refresh(); }, [refresh]);

  return (
    <div className="mt-12">
      <h2 className="text-lg font-bold mb-6">Comments</h2>
      <div className="mb-8">
        <CommentForm postId={postId} onAdded={refresh} />
      </div>
      {comments.length === 0 ? (
        <p className="text-gray-400 text-sm">No comments yet.</p>
      ) : (
        <ul className="space-y-4">
          {comments.map((c) => (
            <li key={c._id} className="border-b border-gray-100 pb-4 last:border-0">
              <p className="text-sm font-medium mb-0.5">
                {c.author}{" "}
                <span className="text-gray-400 font-normal">
                  · {new Date(c.updated_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </span>
              </p>
              <p className="text-sm text-gray-700">{c.text}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
