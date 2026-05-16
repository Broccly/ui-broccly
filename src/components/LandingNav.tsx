"use client";

import { useState } from "react";
import Link from "next/link";
import SignInModal from "@/components/SignInModal";

export default function LandingNav() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <nav className="fixed top-0 inset-x-0 z-50 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="font-bold text-2xl tracking-tighter">
            Broccly
          </Link>
          <div className="flex items-center gap-6">
            <Link
              href="/posts/new"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              Write
            </Link>
            <button
              onClick={() => setShowModal(true)}
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              Sign in
            </button>
            <button
              onClick={() => setShowModal(true)}
              className="text-sm font-medium bg-gray-900 text-white px-5 py-2 rounded-full hover:bg-gray-700 transition-colors"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {showModal && <SignInModal onClose={() => setShowModal(false)} />}
    </>
  );
}
