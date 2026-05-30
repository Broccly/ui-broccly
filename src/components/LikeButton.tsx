"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function LikeButton({ postId, count = 0 }: { postId: string; count?: number }) {
  const { isLoggedIn, token, userId } = useAuth();
  const [liked, setLiked] = useState(false);
  const [likeId, setLikeId] = useState<string | null>(null);
  const [localCount, setLocalCount] = useState(count);

  if (!isLoggedIn) return null;

  async function handleLike() {
    if (!token || !userId) return;

    if (liked && likeId) {
      await api.unlikePost(likeId, token);
      setLiked(false);
      setLikeId(null);
      setLocalCount((n) => n - 1);
    } else {
      const { like } = await api.likePost(postId, userId, token);
      setLiked(true);
      setLikeId(like._id);
      setLocalCount((n) => n + 1);
    }
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleLike}
      className={cn(
        "rounded-full gap-1.5",
        liked && "bg-red-50 border-red-300 text-red-600 hover:bg-red-50"
      )}
    >
      <span>{liked ? "♥" : "♡"}</span>
      <span>{localCount > 0 ? localCount : liked ? "Liked" : "Like"}</span>
    </Button>
  );
}
