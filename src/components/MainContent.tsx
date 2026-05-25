"use client";

import { useAuth } from "@/context/AuthContext";
import { useSidebar } from "@/context/SidebarContext";

export default function MainContent({ children }: { children: React.ReactNode }) {
  const { isLoggedIn } = useAuth();
  const { expanded } = useSidebar();

  const marginClass = !isLoggedIn
    ? ""
    : expanded
    ? "ml-52"
    : "ml-14";

  return (
    <div className={`transition-all duration-200 ${marginClass}`}>
      {children}
    </div>
  );
}
