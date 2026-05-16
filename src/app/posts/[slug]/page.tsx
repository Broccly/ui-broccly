import { api } from "@/lib/api";
import { notFound } from "next/navigation";
import Link from "next/link";
import LikeButton from "@/components/LikeButton";
import CommentsSection from "@/components/CommentsSection";
import AppShell from "@/components/AppShell";

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let post, comments;
  try {
    const { post: p } = await api.getPost(slug);
    post = p;
    const { items } = await api.getComments(post.id);
    comments = items;
  } catch {
    notFound();
  }

  const date = new Date(post.published_at).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <AppShell>
      <article>
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-3">{post.title}</h1>
          <p className="text-gray-500 text-sm">
            By{" "}
            <span className="font-medium text-gray-700">{post.display_name}</span>{" "}
            · {date}
          </p>
          {post.excerpt && (
            <p className="mt-3 text-gray-600 text-lg">{post.excerpt}</p>
          )}
          <div className="mt-4 flex items-center gap-3">
            <LikeButton postId={post.id} />
            <Link
              href={`/posts/${post.slug}/edit`}
              className="text-sm text-gray-400 hover:text-black"
            >
              Edit
            </Link>
          </div>
        </header>

        <div
          className="prose prose-gray max-w-none"
          dangerouslySetInnerHTML={{ __html: post.body_html }}
        />

        <CommentsSection postId={post.id} initialComments={comments} />
      </article>
    </AppShell>
  );
}
