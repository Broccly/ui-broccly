"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";
import PostEditor, { type PostEditorHandle } from "@/components/PostEditor";
import type { PostDetail } from "@/types/api";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import AppShell from "@/components/AppShell";

export default function EditPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { token } = useAuth();
  const router = useRouter();
  const editorRef = useRef<PostEditorHandle>(null);

  const [post, setPost] = useState<PostDetail | null>(null);
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [visibility, setVisibility] = useState<"public" | "unlisted" | "private">("public");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    params.then(({ slug }) => {
      api.getPost(slug).then(({ post: p }) => {
        setPost(p);
        setTitle(p.title);
        setExcerpt(p.excerpt ?? "");
      });
    });
  }, [params]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!token || !editorRef.current || !post) return;

    const bodyHtml = editorRef.current.getHTML();
    const bodyJson = editorRef.current.getJSON();

    setSubmitting(true);
    setError("");

    try {
      const { post: updated } = await api.updatePost(
        post.id,
        { title, excerpt: excerpt || undefined, bodyHtml, bodyJson, visibility },
        token
      );
      router.push(`/posts/${updated.slug}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update post.");
      setSubmitting(false);
    }
  }

  if (!post) {
    return (
      <AppShell>
        <p className="text-gray-400">Loading...</p>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <h1 className="text-2xl font-bold mb-6">Edit Post</h1>
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
            className="text-lg font-medium"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Excerpt <span className="text-gray-400">(optional)</span>
          </label>
          <Textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            maxLength={280}
            rows={2}
            className="resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Content *</label>
          <PostEditor ref={editorRef} initialHTML={post.body_html} />
        </div>

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

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <div className="flex gap-3">
          <Button type="submit" disabled={submitting}>
            {submitting ? "Saving..." : "Save changes"}
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
