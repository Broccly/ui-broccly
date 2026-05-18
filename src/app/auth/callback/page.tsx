"use client";

import { Suspense, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";
import AppShell from "@/components/AppShell";

function CallbackHandler() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { login } = useAuth();
  const called = useRef(false);

  useEffect(() => {
    if (called.current) return;
    called.current = true;

    const mockSub = searchParams.get("mock_sub") ?? "user-1";
    const username = searchParams.get("username") ?? "user";

    api
      .loginMock(mockSub, username)
      .then((resp) => {
        login(resp);
        router.replace("/");
      })
      .catch(() => {
        router.replace("/login");
      });
  }, [searchParams, router, login]);

  return null;
}

export default function CallbackPage() {
  return (
    <AppShell>
      <div className="flex items-center justify-center min-h-[40vh]">
        <p className="text-gray-500">Signing you in...</p>
      </div>
      <Suspense>
        <CallbackHandler />
      </Suspense>
    </AppShell>
  );
}
