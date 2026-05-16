"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function CommentForm({
  postId,
  onAdded,
}: {
  postId: string;
  onAdded: () => void;
}) {
  const { isLoggedIn, token } = useAuth();
  const [body, setBody] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!isLoggedIn) {
    return (
      <p className="text-sm text-gray-500">
        <a href="/login" className="underline">Sign in</a> to leave a comment.
      </p>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!body.trim() || !token) return;
    setSubmitting(true);
    try {
      await api.addComment(postId, body.trim(), token);
      setBody("");
      onAdded();
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <Textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Write a comment..."
        rows={3}
        maxLength={5000}
        required
        className="resize-none"
      />
      <Button
        type="submit"
        size="sm"
        disabled={submitting || !body.trim()}
        className="self-end"
      >
        {submitting ? "Posting..." : "Post comment"}
      </Button>
    </form>
  );
}
