"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";
import PostEditor, { type PostEditorHandle } from "@/components/PostEditor";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import AppShell from "@/components/AppShell";

export default function NewPostPage() {
  const { token } = useAuth();
  const router = useRouter();
  const editorRef = useRef<PostEditorHandle>(null);

  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [visibility, setVisibility] = useState<"public" | "unlisted" | "private">("public");
  const [publish, setPublish] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!token || !editorRef.current) return;

    const bodyHtml = editorRef.current.getHTML();
    const bodyJson = editorRef.current.getJSON();

    if (!bodyHtml || bodyHtml === "<p></p>") {
      setError("Post body cannot be empty.");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const { post } = await api.createPost(
        {
          title,
          excerpt: excerpt || undefined,
          bodyHtml,
          bodyJson,
          visibility,
          publish,
        },
        token
      );
      router.push(`/posts/${post.slug}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create post.");
      setSubmitting(false);
    }
  }

  return (
    <AppShell>
      <h1 className="text-2xl font-bold mb-6">New Post</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div>
          <label className="block text-sm font-medium mb-1">Title *</label>
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            minLength={3}
            maxLength={180}
            placeholder="Post title"
            className="text-lg font-medium"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Excerpt <span className="text-gray-400">(optional, max 280 chars)</span>
          </label>
          <Textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            maxLength={280}
            rows={2}
            placeholder="A short summary shown in the feed..."
            className="resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Content *</label>
          <PostEditor ref={editorRef} />
        </div>

        <div className="flex gap-6 items-center">
          <div>
            <label className="block text-sm font-medium mb-1">Visibility</label>
            <select
              value={visibility}
              onChange={(e) =>
                setVisibility(e.target.value as "public" | "unlisted" | "private")
              }
              className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none"
            >
              <option value="public">Public</option>
              <option value="unlisted">Unlisted</option>
              <option value="private">Private</option>
            </select>
          </div>

          <label className="flex items-center gap-2 text-sm mt-5 cursor-pointer">
            <input
              type="checkbox"
              checked={publish}
              onChange={(e) => setPublish(e.target.checked)}
              className="w-4 h-4"
            />
            Publish immediately
          </label>
        </div>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <div className="flex gap-3">
          <Button type="submit" disabled={submitting}>
            {submitting ? "Publishing..." : "Publish"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
          >
            Cancel
          </Button>
        </div>
      </form>
    </AppShell>
  );
}
