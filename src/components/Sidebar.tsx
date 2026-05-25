"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Bookmark,
  User,
  FileText,
  BarChart2,
  Users,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useSidebar } from "@/context/SidebarContext";

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
}

const staticItems: NavItem[] = [
  { href: "/feed",         label: "Home",      icon: <Home      size={20} /> },
  { href: "/library",      label: "Library",   icon: <Bookmark  size={20} /> },
  { href: "/me/stories",   label: "Stories",   icon: <FileText  size={20} /> },
  { href: "/me/stats",     label: "Stats",     icon: <BarChart2 size={20} /> },
];

const bottomItems: NavItem[] = [
  { href: "/me/following", label: "Following", icon: <Users size={20} /> },
];

export default function Sidebar() {
  const { isLoggedIn, hydrated, email } = useAuth();
  const { expanded, setExpanded } = useSidebar();
  const pathname = usePathname();

  if (!hydrated || !isLoggedIn) return null;

  const username = email ? email.split("@")[0] : "me";
  const profileItem: NavItem = {
    href: `/@${username}`,
    label: "Profile",
    icon: <User size={20} />,
  };

  const topItems = [staticItems[0], staticItems[1], profileItem, ...staticItems.slice(2)];

  const isActive = (href: string) =>
    href === "/feed" ? pathname === "/feed" : pathname.startsWith(href);

  const renderItem = ({ href, label, icon }: NavItem) => {
    const active = isActive(href);
    return (
      <Link
        key={href}
        href={href}
        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group relative
          ${active
            ? "text-gray-900 font-semibold bg-gray-100"
            : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
          }`}
      >
        <span className="shrink-0">{icon}</span>
        {expanded && (
          <span className="text-sm whitespace-nowrap overflow-hidden transition-all">
            {label}
          </span>
        )}
        {/* Tooltip when collapsed */}
        {!expanded && (
          <span className="absolute left-full ml-2 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 transition-opacity">
            {label}
          </span>
        )}
      </Link>
    );
  };

  return (
    <aside
      className={`fixed left-0 top-14 h-[calc(100vh-3.5rem)] bg-white border-r border-gray-100 flex flex-col z-30 transition-all duration-200
        ${expanded ? "w-52" : "w-14"}`}
    >
      {/* Nav items */}
      <nav className="flex-1 flex flex-col gap-0.5 px-2 py-3 overflow-y-auto">
        {topItems.map(renderItem)}

        {/* Divider */}
        <div className="my-2 border-t border-gray-100" />

        {bottomItems.map(renderItem)}
      </nav>
    </aside>
  );
}
