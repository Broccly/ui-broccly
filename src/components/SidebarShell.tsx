"use client";

import Nav from "@/components/Nav";

// The left sidebar is rendered globally in layout.tsx.
// SidebarShell now only adds the top Nav + content wrapper.
export default function SidebarShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      <div className="max-w-3xl mx-auto px-6 py-8">
        {children}
      </div>
    </>
  );
}
