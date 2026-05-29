"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useNewStory } from "@/context/NewStoryContext";
import { api } from "@/lib/api";
import AppShell from "@/components/AppShell";

export default function NewStoryPage() {
  const { token, userId } = useAuth();
  const router = useRouter();
  const { setCanPublish, registerPublish } = useNewStory();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "New Story – Broccly";
  }, []);

  // Keep canPublish in sync
  useEffect(() => {
    setCanPublish(title.trim().length > 0 && body.trim().length > 0);
  }, [title, body, setCanPublish]);

  // Reset on unmount
  useEffect(() => {
    return () => setCanPublish(false);
  }, [setCanPublish]);

  const handlePublish = useCallback(async () => {
    if (!token || !userId) return;
    setError("");
    try {
      await api.createPost({ title, body, author: userId }, token);
      router.push("/feed");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to publish.");
    }
  }, [title, body, token, userId, router]);

  useEffect(() => {
    registerPublish(handlePublish);
  }, [registerPublish, handlePublish]);

  return (
    <AppShell>
      <div className="max-w-2xl mx-auto py-10 flex flex-col gap-6">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full text-4xl font-bold placeholder-gray-300 outline-none border-none bg-transparent"
          maxLength={180}
        />
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Tell your story…"
          className="w-full text-lg text-gray-700 placeholder-gray-300 outline-none border-none bg-transparent resize-none min-h-[400px]"
        />
        {error && <p className="text-red-600 text-sm">{error}</p>}
      </div>
    </AppShell>
  );
}
