import Link from "next/link";
import Nav from "@/components/Nav";
import { MOCK_POSTS } from "@/lib/mockFeed";

const THUMB_COLORS = [
  "bg-gray-900", "bg-slate-700", "bg-zinc-800",
  "bg-neutral-700", "bg-stone-700", "bg-gray-600",
];

export default function FeedPage() {
  return (
    <>
      <Nav />
      <div className="max-w-2xl mx-auto px-6">
        <div className="flex gap-0">

          {/* ── Main feed ── */}
          <main className="flex-1 min-w-0 pt-8">
            {/* Tabs */}
            <div className="flex gap-6 border-b border-gray-200 mb-6">
              <button className="text-sm font-medium text-gray-900 pb-3 border-b-2 border-gray-900">For you</button>
              <button className="text-sm font-medium text-gray-400 hover:text-gray-700 pb-3">Featured</button>
            </div>

            {/* Posts */}
            <div className="divide-y divide-gray-100">
              {MOCK_POSTS.map((post, i) => {
                const date = new Date(post.published_at).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
                const thumbColor = THUMB_COLORS[i % THUMB_COLORS.length];

                return (
                  <article key={post.id} className="py-6 flex gap-6 items-start">
                    <div className="flex-1 min-w-0">
                      {/* Author row */}
                      <div className="flex items-center gap-2 mb-2">
                        <span className="w-5 h-5 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 shrink-0 inline-block" />
                        <span className="text-xs text-gray-600">{post.display_name}</span>
                      </div>

                      {/* Title + excerpt */}
                      <Link href={`/posts/${post.slug}`} className="group block">
                        <h2 className="text-base font-bold text-gray-900 group-hover:underline leading-snug mb-1 line-clamp-2">
                          {post.title}
                        </h2>
                        {post.excerpt && (
                          <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
                            {post.excerpt}
                          </p>
                        )}
                      </Link>

                      {/* Meta row */}
                      <div className="flex items-center gap-3 mt-3 text-xs text-gray-400">
                        <span>{date}</span>
                        <span className="flex items-center gap-1">
                          <span>👏</span>
                          <span>{Math.floor(Math.random() * 15 + 1)}.{Math.floor(Math.random() * 9)}K</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <span>💬</span>
                          <span>{Math.floor(Math.random() * 500 + 50)}</span>
                        </span>
                        <div className="flex-1" />
                        <button className="hover:text-gray-600" aria-label="Save">
                          <BookmarkIcon />
                        </button>
                        <button className="hover:text-gray-600" aria-label="More">
                          <MoreIcon />
                        </button>
                      </div>
                    </div>

                    {/* Thumbnail */}
                    <div className={`shrink-0 w-24 h-16 sm:w-32 sm:h-20 rounded-sm ${thumbColor} flex items-center justify-center`}>
                      <span className="text-white/20 text-3xl font-bold">
                        {post.title.charAt(0)}
                      </span>
                    </div>
                  </article>
                );
              })}
            </div>
          </main>

        </div>
      </div>
    </>
  );
}

/* ── Icons ── */
function BookmarkIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16l-7-3.5L5 21V5z" />
    </svg>
  );
}
function MoreIcon() {
  return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <circle cx="5" cy="12" r="1.5" /><circle cx="12" cy="12" r="1.5" /><circle cx="19" cy="12" r="1.5" />
    </svg>
  );
}
