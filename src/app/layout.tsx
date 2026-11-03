import type { Metadata } from "next";
import "./globals.css";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://www.broccly.in";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "Broccly – A home for the apps we build",
  description:
    "Broccly is a small studio building and shipping many apps. Each one lives on its own broccly subdomain.",
  icons: { icon: "/broccly.png" },
  openGraph: {
    siteName: "Broccly",
    title: "Broccly – A home for the apps we build",
    description:
      "Broccly is a small studio building and shipping many apps. Each one lives on its own broccly subdomain.",
    type: "website",
  },
  twitter: { card: "summary" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="antialiased bg-white text-gray-900 min-h-screen">{children}</body>
    </html>
  );
}
