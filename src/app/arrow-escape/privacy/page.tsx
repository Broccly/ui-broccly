import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const SUPPORT_EMAIL = "s.sankar@broccly.in";

export const metadata: Metadata = {
  title: "Privacy Policy – Arrow Escape: Picture Maze",
  description: "Privacy policy for the mobile game Arrow Escape: Picture Maze by Broccly.",
  alternates: { canonical: "/arrow-escape/privacy" },
};

const sections: { heading: string; body: React.ReactNode }[] = [
  {
    heading: "Information we collect",
    body: (
      <p>
        None. The game does not collect, store on our servers, or share any personal information
        or usage data. It does not require an account and does not access the internet.
      </p>
    ),
  },
  {
    heading: "Information stored on your device",
    body: (
      <p>
        The game saves your level progress, hint and grid-guide counts, and your sound and
        vibration settings in a local file on your device. This data never leaves your device and
        is deleted when you uninstall the game.
      </p>
    ),
  },
  {
    heading: "Permissions",
    body: (
      <p>
        The game requests only the vibration permission, used for haptic feedback during play. You
        can turn vibration off in the game&apos;s settings.
      </p>
    ),
  },
  {
    heading: "Third parties",
    body: <p>The game contains no advertising, analytics, or other third-party services.</p>,
  },
  {
    heading: "Children",
    body: (
      <p>
        The game does not knowingly collect any information from anyone, including children.
      </p>
    ),
  },
  {
    heading: "Changes",
    body: (
      <p>
        If a future version adds features that handle data (for example advertising), we will
        update this policy and the in-store data safety information before releasing it.
      </p>
    ),
  },
  {
    heading: "Contact",
    body: (
      <p>
        Questions about this policy:{" "}
        {SUPPORT_EMAIL.includes("@") ? (
          <a href={`mailto:${SUPPORT_EMAIL}`} className="underline">
            {SUPPORT_EMAIL}
          </a>
        ) : (
          SUPPORT_EMAIL
        )}
      </p>
    ),
  },
];

export default function ArrowEscapePrivacyPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <header className="w-full max-w-5xl mx-auto px-6 py-6">
        <Link href="/" className="inline-flex items-center gap-2">
          <Image src="/broccly.png" alt="" width={28} height={28} />
          <span className="text-lg font-bold tracking-tight">Broccly</span>
        </Link>
      </header>

      <article className="flex-1 w-full max-w-2xl mx-auto px-6 py-10">
        <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase">
          Privacy Policy
        </p>
        <h1 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight">
          Arrow Escape: Picture Maze
        </h1>
        <p className="mt-2 text-sm text-gray-500">Last updated: November 21, 2026</p>

        <p className="mt-8 text-gray-700 leading-relaxed">
          This policy describes how the mobile game <strong>Arrow Escape: Picture Maze</strong>{" "}
          (package <code className="text-sm bg-gray-100 rounded px-1">broccly.arrowescape.picturemaze</code>),
          published by Broccly (&ldquo;we&rdquo;), handles information.
        </p>

        {sections.map((s) => (
          <section key={s.heading} className="mt-10">
            <h2 className="text-xl font-bold tracking-tight">{s.heading}</h2>
            <div className="mt-3 text-gray-700 leading-relaxed">{s.body}</div>
          </section>
        ))}
      </article>

      <footer className="w-full max-w-5xl mx-auto px-6 py-8 text-sm text-gray-400">
        © {new Date().getFullYear()} Broccly
      </footer>
    </main>
  );
}
