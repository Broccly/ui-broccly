import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Feed – Broccly",
  description: "Discover stories, ideas, and expertise from writers on Broccly.",
};

export default function FeedLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
