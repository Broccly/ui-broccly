"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";

export default function FollowButton({ targetUserId }: { targetUserId: string }) {
  const { isLoggedIn, token, userId } = useAuth();
  const [following, setFollowing] = useState(false);
  const [followId, setFollowId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isLoggedIn || !userId || !token || userId === targetUserId) return;
    api.checkFollow(targetUserId, userId, token)
      .then(({ following: isFollowing, followId: id }) => {
        setFollowing(isFollowing);
        setFollowId(id);
      })
      .catch(() => {});
  }, [isLoggedIn, userId, token, targetUserId]);

  if (!isLoggedIn || userId === targetUserId) return null;

  async function handleFollow() {
    if (!token || !userId || loading) return;
    setLoading(true);
    setError("");
    console.log("following")
    try {
      if (following && followId) {
        console.log(followId, following)
        await api.unfollowUser(followId, token);
        setFollowing(false);
        setFollowId(null);
      } else {
        const { result } = await api.followUser(targetUserId, userId, token);
        setFollowing(true);
        setFollowId(result._id);
      }
    } catch (e) {
      console.log(e)
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-1">
      <Button
        variant={following ? "outline" : "default"}
        size="sm"
        onClick={handleFollow}
        disabled={loading}
        className="rounded-full"
      >
        {loading ? "..." : following ? "Following" : "Follow"}
      </Button>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
