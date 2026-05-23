"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useGoogleLogin } from "@react-oauth/google";
import { Button } from "@/components/ui/button";
import AppShell from "@/components/AppShell";
import { useAuth } from "@/context/AuthContext";

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setError(null);
      try {
        const res = await fetch(`${API}/api/auth/token`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ googleToken: tokenResponse.access_token }),
        });
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error ?? "Authentication failed");
        }
        const { accessToken, refreshToken } = await res.json();
        login({ accessToken, refreshToken });
        router.push("/feed");
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Authentication failed");
      }
    },
    onError: () => setError("Google sign-in failed. Please try again."),
  });

  return (
    <AppShell>
      <div className="max-w-sm mx-auto mt-16 text-center">
        <h1 className="text-2xl font-bold mb-8">Sign in to Broccly</h1>
        <Button className="w-full" onClick={() => handleGoogleLogin()}>
          Sign in with Google
        </Button>
        {error && (
          <p className="mt-4 text-sm text-red-500">{error}</p>
        )}
      </div>
    </AppShell>
  );
}
