"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Nav from "@/components/Nav";

const sidebarLinks = [
  { href: "/me/stories", label: "Stories" },
];

export default function SidebarShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <>
      <Nav />
      <div className="max-w-5xl mx-auto px-4 py-8 flex gap-12">
        {/* Left sidebar */}
        <aside className="w-44 shrink-0">
          <nav className="flex flex-col gap-1">
            {sidebarLinks.map(({ href, label }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`text-sm py-1.5 px-2 rounded transition-colors ${
                    active
                      ? "font-semibold text-gray-900"
                      : "text-gray-500 hover:text-gray-800"
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </>
  );
}
