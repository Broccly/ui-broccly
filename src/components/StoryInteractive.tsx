"use client";

import { useState } from "react";
import LikeButton from "@/components/LikeButton";
import FollowButton from "@/components/FollowButton";
import CommentsDrawer from "@/components/CommentsDrawer";

interface Props {
  postId: string;
  authorUserId: string;
  likeCount: number;
  commentCount: number;
}

export default function StoryInteractive({ postId, authorUserId, likeCount, commentCount }: Props) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <div className="flex items-center gap-4 py-3 border-y border-gray-100 mb-8">
        <LikeButton postId={postId} count={likeCount} />
        <button
          onClick={() => setDrawerOpen(true)}
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3h6M4.5 5.25a2.25 2.25 0 012.25-2.25h10.5A2.25 2.25 0 0119.5 5.25v9a2.25 2.25 0 01-2.25 2.25H8.25l-3.75 3.75V5.25z" />
          </svg>
          <span>{commentCount}</span>
        </button>
        <FollowButton targetUserId={authorUserId} />
      </div>
      <CommentsDrawer postId={postId} isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
