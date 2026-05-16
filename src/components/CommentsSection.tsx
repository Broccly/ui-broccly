"use client";

import { useCallback, useState } from "react";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";
import type { Comment } from "@/types/api";
import { api } from "@/lib/api";

export default function CommentsSection({
  postId,
  initialComments,
}: {
  postId: string;
  initialComments: Comment[];
}) {
  const [comments, setComments] = useState(initialComments);

  const refresh = useCallback(async () => {
    const { items } = await api.getComments(postId);
    setComments(items);
  }, [postId]);

  return (
    <div className="mt-12">
      <h2 className="text-lg font-bold mb-6">Comments</h2>
      <div className="mb-8">
        <CommentForm postId={postId} onAdded={refresh} />
      </div>
      <CommentList comments={comments} />
    </div>
  );
}
