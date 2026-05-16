"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AppShell from "@/components/AppShell";

export default function LoginPage() {
  const [mockSub, setMockSub] = useState("user-1");
  const [username, setUsername] = useState("testuser");
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams({ mock_sub: mockSub, username });
    router.push(`/auth/callback?${params.toString()}`);
  }

  return (
    <AppShell>
      <div className="max-w-sm mx-auto mt-16">
        <h1 className="text-2xl font-bold mb-2">Sign in</h1>
        <p className="text-sm text-gray-500 mb-8">
          Dev mode: enter any user ID and username to sign in.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">User ID (mock_sub)</label>
            <Input
              type="text"
              value={mockSub}
              onChange={(e) => setMockSub(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Username</label>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Sign in with Google (Mock)
          </Button>
        </form>
      </div>
    </AppShell>
  );
}
