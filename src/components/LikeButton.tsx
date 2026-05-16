"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function LikeButton({ postId }: { postId: string }) {
  const { isLoggedIn, token } = useAuth();
  const [liked, setLiked] = useState(false);

  async function handleLike() {
    if (!isLoggedIn || !token) return;
    await api.likePost(postId, token);
    setLiked(true);
  }

  if (!isLoggedIn) return null;

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleLike}
      disabled={liked}
      className={cn(
        "rounded-full gap-1.5",
        liked && "bg-red-50 border-red-300 text-red-600 hover:bg-red-50"
      )}
    >
      <span>{liked ? "♥" : "♡"}</span>
      <span>{liked ? "Liked" : "Like"}</span>
    </Button>
  );
}
