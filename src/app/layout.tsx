import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import GoogleAuthProvider from "@/components/GoogleAuthProvider";
import { NewStoryProvider } from "@/context/NewStoryContext";

export const metadata: Metadata = {
  title: "Broccly",
  description: "Your space to read, write, and share ideas.",
  icons: {
    icon: "/broccly.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-white text-gray-900 min-h-screen">
        <GoogleAuthProvider>
          <AuthProvider>
            <NewStoryProvider>{children}</NewStoryProvider>
          </AuthProvider>
        </GoogleAuthProvider>
      </body>
    </html>
  );
}
