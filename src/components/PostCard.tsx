import Link from "next/link";
import type { PostSummary } from "@/types/api";

export default function PostCard({ post }: { post: PostSummary }) {
  const date = new Date(post.published_at).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <article className="py-6 border-b border-gray-100 last:border-0">
      <p className="text-sm text-gray-500 mb-1">
        {post.display_name} · {date}
      </p>
      <Link href={`/posts/${post.slug}`} className="group">
        <h2 className="text-xl font-bold group-hover:underline mb-1">
          {post.title}
        </h2>
        {post.excerpt && (
          <p className="text-gray-600 text-sm line-clamp-2">{post.excerpt}</p>
        )}
      </Link>
    </article>
  );
}
