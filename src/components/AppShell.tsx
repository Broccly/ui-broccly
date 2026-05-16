import Nav from "@/components/Nav";

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      <main className="max-w-3xl mx-auto px-4 py-8">{children}</main>
    </>
  );
}
