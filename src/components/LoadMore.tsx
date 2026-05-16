"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function LoadMore({ nextCursor }: { nextCursor: string }) {
  const router = useRouter();

  return (
    <div className="mt-8 text-center">
      <Button
        variant="outline"
        className="rounded-full"
        onClick={() => router.push(`/?cursor=${encodeURIComponent(nextCursor)}`)}
      >
        Load more
      </Button>
    </div>
  );
}
