"use client";

import { Suspense, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import type { AuthResponse } from "@/types/api";
import AppShell from "@/components/AppShell";

function CallbackHandler() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { login } = useAuth();
  const called = useRef(false);

  useEffect(() => {
    if (called.current) return;
    called.current = true;

    const accessToken = searchParams.get("access_token");
    const refreshToken = searchParams.get("refresh_token");

    if (!accessToken || !refreshToken) {
      router.replace("/login?error=missing_tokens");
      return;
    }

    const resp: AuthResponse = {
      accessToken,
      refreshToken,
      tokenType: "Bearer",
      expiresInSeconds: 3600,
      userId: "",
    };

    login(resp);
    router.replace("/");
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
