import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const SUPPORT_EMAIL = "s.sankar@broccly.in";

export const metadata: Metadata = {
  title: "Privacy Policy – Missile Survival",
  description: "Privacy policy for the mobile game Missile Survival by Broccly.",
  alternates: { canonical: "/missile-survival/privacy" },
};

const ext = (href: string, label: string) => (
  <a href={href} className="underline" target="_blank" rel="noopener noreferrer">
    {label}
  </a>
);

const adData: [string, string][] = [
  ["Device identifiers, such as the Android Advertising ID or App Set ID", "Advertising, ad measurement, fraud prevention"],
  ["IP address and approximate location derived from it", "Advertising, fraud prevention"],
  ["Device and app information (model, OS version, language, app version)", "Ad delivery and diagnostics"],
  ["Ad interactions (ads viewed or tapped)", "Ad measurement, analytics"],
  ["Crash and performance diagnostics of the ads SDK", "Diagnostics"],
];

const sections: { heading: string; body: React.ReactNode }[] = [
  {
    heading: "Summary",
    body: (
      <ul className="list-disc pl-5 space-y-2">
        <li>
          We do <strong>not</strong> ask you to create an account and we do <strong>not</strong>{" "}
          collect your name, email, contacts, photos or precise location.
        </li>
        <li>
          Your game progress (best score and star total) is stored <strong>only on your device</strong>.
        </li>
        <li>
          The game shows ads using <strong>Google AdMob</strong>. Google may collect certain device
          data to show and measure ads, as described below.
        </li>
      </ul>
    ),
  },
  {
    heading: "Information stored on your device",
    body: (
      <p>
        The game saves your best score and collected-star total in a local file on your device so
        your progress is kept between sessions. This data is never sent to us. It is deleted when
        you clear the game&apos;s data or uninstall the game.
      </p>
    ),
  },
  {
    heading: "Advertising (Google AdMob)",
    body: (
      <>
        <p>
          The game uses the Google Mobile Ads SDK (AdMob), provided by Google LLC, to display ads
          between rounds. To serve, personalise (where permitted) and measure ads, and to prevent
          fraud, Google may automatically collect:
        </p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="border border-gray-200 p-2 font-semibold">Data</th>
                <th className="border border-gray-200 p-2 font-semibold">Purpose</th>
              </tr>
            </thead>
            <tbody>
              {adData.map(([data, purpose]) => (
                <tr key={data}>
                  <td className="border border-gray-200 p-2 align-top">{data}</td>
                  <td className="border border-gray-200 p-2 align-top">{purpose}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4">
          This data is collected and processed by Google under its own policies. We do not receive
          information that identifies you personally. Learn more:
        </p>
        <ul className="mt-2 list-disc pl-5 space-y-1">
          <li>{ext("https://policies.google.com/privacy", "Google Privacy Policy")}</li>
          <li>
            {ext(
              "https://policies.google.com/technologies/partner-sites",
              "How Google uses information from apps that use its services",
            )}
          </li>
          <li>{ext("https://support.google.com/admob/answer/6128543", "AdMob data disclosure")}</li>
        </ul>
      </>
    ),
  },
  {
    heading: "Your choices",
    body: (
      <ul className="list-disc pl-5 space-y-2">
        <li>
          <strong>Personalised ads:</strong> On Android you can reset or delete your Advertising ID,
          or opt out of ad personalisation, under <em>Settings → Google → Ads</em> (or{" "}
          <em>Settings → Privacy → Ads</em>, depending on your device).
        </li>
        <li>
          <strong>Consent (EEA, UK and Switzerland):</strong> Where required by law, the game will
          ask for your consent before personalised ads are shown. You can change your choice at any
          time.
        </li>
        <li>
          <strong>Local data:</strong> Clear the game&apos;s storage in Android settings, or
          uninstall the game, to delete your saved progress.
        </li>
      </ul>
    ),
  },
  {
    heading: "Data sharing and sale",
    body: (
      <p>
        We do not sell your personal information. Apart from the advertising data collected by
        Google as described above, we do not share any data with third parties.
      </p>
    ),
  },
  {
    heading: "Data security and retention",
    body: (
      <p>
        Data sent by the ads SDK is encrypted in transit. Google keeps advertising data according to
        its own retention policies. We do not store any of your data on our servers.
      </p>
    ),
  },
  {
    heading: "Children",
    body: (
      <p>
        The game is not directed at children under 13 (or the minimum age in your country). We do
        not knowingly collect personal information from children. If you believe a child has
        provided personal information through the game, please contact us and we will help to have
        it removed.
      </p>
    ),
  },
  {
    heading: "Your rights",
    body: (
      <p>
        Depending on where you live (for example under the GDPR in the EU/UK or the CCPA/CPRA in
        California), you may have the right to access, correct or delete personal data, or to
        object to or restrict its processing. Because we do not hold personal data ourselves, most
        requests about advertising data are best directed to Google using the links above, but you
        can always contact us and we will assist.
      </p>
    ),
  },
  {
    heading: "Changes",
    body: (
      <p>
        We may update this policy from time to time. Changes will be posted on this page with a new
        effective date.
      </p>
    ),
  },
  {
    heading: "Contact",
    body: (
      <p>
        Questions about this policy:{" "}
        <a href={`mailto:${SUPPORT_EMAIL}`} className="underline">
          {SUPPORT_EMAIL}
        </a>
      </p>
    ),
  },
];

export default function MissileSurvivalPrivacyPage() {
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
        <h1 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight">Missile Survival</h1>
        <p className="mt-2 text-sm text-gray-500">Effective date: November 23, 2026</p>

        <p className="mt-8 text-gray-700 leading-relaxed">
          This policy describes how the mobile game <strong>Missile Survival</strong> (package{" "}
          <code className="text-sm bg-gray-100 rounded px-1">com.broccly.missilesurvival</code>),
          published by Broccly (&ldquo;we&rdquo;), handles information. By using the game you agree
          to this policy.
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
