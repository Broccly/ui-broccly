"use client";

import { useEffect } from "react";
import Link from "next/link";

const GOOGLE_AUTH_URL =
  (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000") + "/api/auth/google";

interface SignInModalProps {
  onClose: () => void;
}

export default function SignInModal({ onClose }: SignInModalProps) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-2xl w-full max-w-lg mx-4 px-16 py-10 flex flex-col items-center shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-xl leading-none"
          aria-label="Close"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-8">
          Welcome back.
        </h2>

        <div className="flex flex-col gap-3 w-full">
          <SocialButton icon={<GoogleIcon />} label="Sign in with Google" href={GOOGLE_AUTH_URL} />
          <SocialButton icon={<FacebookIcon />} label="Sign in with Facebook" href="/login" />
          <SocialButton icon={<AppleIcon />} label="Sign in with Apple" href="/login" />
          <SocialButton icon={<XIcon />} label="Sign in with X" href="/login" />
          <SocialButton icon={<EmailIcon />} label="Sign in with email" href="/login" />
        </div>

        <label className="flex items-center gap-2 mt-6 text-sm text-gray-700 cursor-pointer select-none">
          <input type="checkbox" defaultChecked className="w-4 h-4 accent-gray-900" />
          Remember me for faster sign in
        </label>

        <p className="mt-6 text-sm text-gray-500">
          No account?{" "}
          <Link href="/login" className="underline text-gray-900 hover:text-gray-600">
            Create one
          </Link>
        </p>
        <p className="mt-2 text-sm text-gray-500">
          Forgot email or trouble signing in?{" "}
          <Link href="/login" className="underline text-gray-900 hover:text-gray-600">
            Get help
          </Link>
          .
        </p>

        <p className="mt-6 text-xs text-gray-400 text-center leading-relaxed">
          By clicking &ldquo;Sign in&rdquo;, you agree to our{" "}
          <Link href="#" className="underline">Terms of Service</Link>{" "}
          and{" "}
          <Link href="#" className="underline">Privacy Policy</Link>.
        </p>
      </div>
    </div>
  );
}

function SocialButton({
  icon,
  label,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-4 w-full border border-gray-300 rounded-full px-5 py-3 text-sm font-medium text-gray-800 hover:bg-gray-50 transition-colors"
    >
      <span className="w-5 h-5 flex items-center justify-center shrink-0">{icon}</span>
      <span className="flex-1 text-center">{label}</span>
    </Link>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#1877F2">
      <path d="M24 12.073C24 5.404 18.627 0 12 0S0 5.404 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.268h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98l-.09.06c-.22.14-2.18 1.27-2.16 3.8.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m2 7 10 7 10-7" />
    </svg>
  );
}
