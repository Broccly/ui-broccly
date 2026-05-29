import type { Metadata } from "next";
import { api } from "@/lib/api";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}): Promise<Metadata> {
  const { q } = await searchParams;
  return {
    title: q ? `"${q}" – Search – Broccly` : "Search – Broccly",
  };
}
import PostCard from "@/components/PostCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AppShell from "@/components/AppShell";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;

  let results = null;
  if (q && q.trim().length >= 2) {
    const { items } = await api.search(q.trim());
    results = items;
  }

  return (
    <AppShell>
      <h1 className="text-2xl font-bold mb-6">Search</h1>
      <form method="GET" action="/search" className="flex gap-2 mb-8">
        <Input
          type="search"
          name="q"
          defaultValue={q ?? ""}
          placeholder="Search posts..."
          minLength={2}
          className="flex-1"
        />
        <Button type="submit">Search</Button>
      </form>

      {results === null ? null : results.length === 0 ? (
        <p className="text-gray-500">No results for &ldquo;{q}&rdquo;.</p>
      ) : (
        <>
          <p className="text-sm text-gray-500 mb-4">
            {results.length} result{results.length !== 1 ? "s" : ""} for &ldquo;{q}&rdquo;
          </p>
          {results.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </>
      )}
    </AppShell>
  );
}
