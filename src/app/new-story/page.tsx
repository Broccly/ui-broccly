"use client";

import { useState, useEffect, useCallback, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useNewStory } from "@/context/NewStoryContext";
import { api } from "@/lib/api";
import AppShell from "@/components/AppShell";
import Image from "next/image";
import PostEditor, { PostEditorHandle } from "@/components/PostEditor";

function NewStoryInner() {
  const { token, userId } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("id");
  const { setCanPublish, registerPublish, setPublishLabel } = useNewStory();

  const [title, setTitle] = useState("");
  const [initialHTML, setInitialHTML] = useState<string | undefined>(undefined);
  const [bodyHasContent, setBodyHasContent] = useState(false);
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [loaded, setLoaded] = useState(!editId);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const editorRef = useRef<PostEditorHandle>(null);

  useEffect(() => {
    document.title = editId ? "Edit Story – Broccly" : "New Story – Broccly";
  }, [editId]);

  useEffect(() => {
    setPublishLabel(editId ? "Update" : "Publish");
  }, [editId, setPublishLabel]);

  useEffect(() => {
    if (!editId || !token) return;
    api
      .getPostById(editId, token)
      .then(({ post }) => {
        setTitle(post.title);
        setInitialHTML(post.body);
        setBodyHasContent(post.body.trim().length > 0);
        setCoverImage(post.coverImage ?? null);
      })
      .catch(() => setError("Failed to load story."))
      .finally(() => setLoaded(true));
  }, [editId, token]);

  useEffect(() => {
    setCanPublish(title.trim().length > 0 && bodyHasContent);
  }, [title, bodyHasContent, setCanPublish]);

  useEffect(() => {
    return () => {
      setCanPublish(false);
      setPublishLabel("Publish");
    };
  }, [setCanPublish, setPublishLabel]);

  const handleImageChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file || !token) return;
      setUploading(true);
      setError("");
      try {
        const { url } = await api.uploadImage(file, token);
        setCoverImage(url);
      } catch {
        setError("Image upload failed. Please try again.");
      } finally {
        setUploading(false);
        // reset input so same file can be re-picked after removal
        if (fileInputRef.current) fileInputRef.current.value = "";
      }
    },
    [token]
  );

  const handleInlineImageUpload = useCallback(
    async (file: File) => {
      if (!token) throw new Error("Not authenticated");
      const { url } = await api.uploadImage(file, token);
      return url;
    },
    [token]
  );

  const handlePublish = useCallback(async () => {
    if (!token || !userId) return;
    setError("");
    try {
      const body = editorRef.current?.getHTML() ?? "";
      if (editId) {
        await api.updatePost(editId, { title, body, coverImage }, token);
        router.push("/me/stories");
      } else {
        await api.createPost({ title, body, author: userId, coverImage }, token);
        router.push("/feed");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to publish.");
    }
  }, [title, coverImage, token, userId, router, editId]);

  useEffect(() => {
    registerPublish(handlePublish);
  }, [registerPublish, handlePublish]);

  return (
    <AppShell>
      <div className="max-w-2xl mx-auto py-10 flex flex-col gap-6">
        {/* Cover image */}
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
          {coverImage ? (
            <div className="relative w-full h-64 rounded-lg overflow-hidden group">
              <Image
                src={coverImage}
                alt="Cover"
                fill
                className="object-cover"
              />
              <button
                onClick={() => setCoverImage(null)}
                className="absolute top-2 right-2 bg-black/60 text-white rounded-full w-7 h-7 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-sm"
                aria-label="Remove cover image"
              >
                ×
              </button>
            </div>
          ) : (
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="w-full h-36 border-2 border-dashed border-gray-200 rounded-lg flex flex-col items-center justify-center gap-1 text-gray-400 hover:border-gray-400 hover:text-gray-500 transition-colors disabled:opacity-50"
            >
              <span className="text-2xl">+</span>
              <span className="text-sm">
                {uploading ? "Uploading…" : "Add a cover image"}
              </span>
            </button>
          )}
        </div>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full text-4xl font-bold placeholder-gray-300 outline-none border-none bg-transparent"
          maxLength={180}
        />
        {loaded && (
          <PostEditor
            ref={editorRef}
            initialHTML={initialHTML}
            onImageUpload={handleInlineImageUpload}
            onChange={(hasContent) => setBodyHasContent(hasContent)}
          />
        )}
        {error && <p className="text-red-600 text-sm">{error}</p>}
      </div>
    </AppShell>
  );
}

export default function NewStoryPage() {
  return (
    <Suspense fallback={null}>
      <NewStoryInner />
    </Suspense>
  );
}
