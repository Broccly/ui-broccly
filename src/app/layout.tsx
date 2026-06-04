import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import GoogleAuthProvider from "@/components/GoogleAuthProvider";
import { NewStoryProvider } from "@/context/NewStoryContext";
import { SidebarProvider } from "@/context/SidebarContext";
import Sidebar from "@/components/Sidebar";
import MainContent from "@/components/MainContent";

export const metadata: Metadata = {
  title: {
    default: "Broccly",
    template: "%s",
  },
  description: "Your space to read, write, and share ideas.",
  icons: {
    icon: "/broccly.png",
  },
  openGraph: {
    siteName: "Broccly",
    type: "website",
  },
  twitter: {
    card: "summary",
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
            <NewStoryProvider>
              <SidebarProvider>
                <Sidebar />
                <MainContent>{children}</MainContent>
              </SidebarProvider>
            </NewStoryProvider>
          </AuthProvider>
        </GoogleAuthProvider>
      </body>
    </html>
  );
}
