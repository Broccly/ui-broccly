"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { useAuth } from "@/context/AuthContext";

export default function Nav() {
  const { isLoggedIn, logout } = useAuth();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const q = inputRef.current?.value.trim();
    if (q) router.push(`/search?q=${encodeURIComponent(q)}`);
  }

  return (
    <nav className="sticky top-0 z-40 bg-white border-b border-gray-200">
      <div className="max-w-[1336px] mx-auto px-6 h-14 flex items-center gap-6">
        {/* Logo */}
        <Link href="/feed" className="font-bold text-2xl tracking-tighter shrink-0">
          Broccly
        </Link>

        {/* Search */}
        <form onSubmit={handleSearch} className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-1.5 w-56 shrink-0">
          <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
          <input
            ref={inputRef}
            type="search"
            placeholder="Search"
            className="bg-transparent text-sm outline-none w-full text-gray-700 placeholder-gray-400"
          />
          <button type="submit" className="sr-only">Search</button>
        </form>

        <div className="flex-1" />

        {/* Right actions */}
        <div className="flex items-center gap-5 shrink-0">
          {isLoggedIn ? (
            <>
              <Link href="/posts/new" className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487a2.25 2.25 0 1 1 3.182 3.182L8.168 19.545l-4.5.5.5-4.5L16.862 4.487z" />
                </svg>
                Write
              </Link>
              <button
                onClick={logout}
                className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium text-gray-600 hover:bg-gray-300 transition-colors"
              >
                U
              </button>
            </>
          ) : (
            <Link href="/login" className="text-sm font-medium text-gray-600 hover:text-gray-900">
              Sign in
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
