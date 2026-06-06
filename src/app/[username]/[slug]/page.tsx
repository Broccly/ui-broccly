import type { Metadata } from "next";
import Image from "next/image";
import { api } from "@/lib/api";
import { stripHtml } from "@/lib/utils";
import SidebarShell from "@/components/SidebarShell";
import StoryInteractive from "@/components/StoryInteractive";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://www.broccly.in";

interface Props {
  params: Promise<{ username: string; slug: string }>;
  searchParams: Promise<{ id?: string }>;
}

async function fetchPost(id: string) {
  try {
    const { post } = await api.getPostById(id);
    return post;
  } catch {
    return null;
  }
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { id } = await searchParams;
  if (!id) return { title: "Story – Broccly" };

  const post = await fetchPost(id);
  if (!post) return { title: "Story – Broccly" };

  const description = stripHtml(post.body).slice(0, 160).trimEnd();
  const url = `${BASE_URL}/@${post.author}/${encodeURIComponent(post.title.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-"))}?id=${post._id}`;

  const image = post.coverImage ?? post.authorAvatarUrl;

  return {
    title: `${post.title} – Broccly`,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: post.title,
      description,
      url,
      type: "article",
      publishedTime: post.created_at,
      modifiedTime: post.updated_at,
      authors: [post.authorName ?? post.author],
      ...(image ? { images: [{ url: image }] } : {}),
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title: post.title,
      description,
      ...(image ? { images: [image] } : {}),
    },
  };
}

export default async function StoryPage({ searchParams }: Props) {
  const { id } = await searchParams;

  if (!id) {
    return (
      <SidebarShell>
        <p className="text-red-500 text-sm">Story not found.</p>
      </SidebarShell>
    );
  }

  const post = await fetchPost(id);

  if (!post) {
    return (
      <SidebarShell>
        <p className="text-red-500 text-sm">Failed to load story.</p>
      </SidebarShell>
    );
  }

  const authorName = post.authorName ?? post.author;
  const publishedDate = new Date(post.created_at).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: stripHtml(post.body).slice(0, 160).trimEnd(),
    author: { "@type": "Person", name: authorName },
    datePublished: post.created_at,
    dateModified: post.updated_at,
  };

  return (
    <SidebarShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="max-w-2xl">
        {post.coverImage && (
          <div className="relative w-full h-72 rounded-xl overflow-hidden mb-8">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}
        <h1 className="text-4xl font-bold leading-tight mb-6">{post.title}</h1>

        <div className="flex items-center gap-3 mb-6">
          {post.authorAvatarUrl ? (
            <img
              src={post.authorAvatarUrl}
              alt={authorName}
              className="w-9 h-9 rounded-full object-cover shrink-0"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-sm font-semibold text-gray-600 shrink-0">
              {authorName.charAt(0).toUpperCase()}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <span className="text-sm font-medium text-gray-900 truncate block">{authorName}</span>
            <p className="text-xs text-gray-400 mt-0.5">{publishedDate}</p>
          </div>
        </div>

        <StoryInteractive
          postId={post._id}
          authorUserId={post.author}
          likeCount={post.likes}
          commentCount={post.comments}
        />

        <div
          className="prose prose-lg prose-gray max-w-none text-gray-800 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: post.body }}
        />
      </article>
    </SidebarShell>
  );
}
