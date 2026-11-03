import Image from "next/image";

const principles = [
  {
    title: "Build small.",
    body: "Each app solves one problem well, instead of one app trying to do everything.",
  },
  {
    title: "Ship often.",
    body: "Ideas go from sketch to production fast, and keep improving once they're live.",
  },
  {
    title: "One home.",
    body: "Every app lives on its own subdomain under broccly — easy to find, easy to remember.",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col">
      <header className="w-full max-w-5xl mx-auto px-6 py-6 flex items-center gap-2">
        <Image src="/broccly.png" alt="" width={28} height={28} priority />
        <span className="text-lg font-bold tracking-tight">Broccly</span>
      </header>

      <section className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-8">
          A studio for small apps
        </p>
        <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tighter max-w-4xl leading-[1.02]">
          We build apps.
          <br />
          Lots of them.
        </h1>
        <p className="mt-6 text-lg sm:text-xl text-gray-500 max-w-xl leading-relaxed">
          Broccly is where we design, build, and ship useful little products. Each one gets its own
          home at <span className="font-medium text-gray-900">something.broccly</span>.
        </p>
        <p className="mt-10 inline-flex items-center gap-2 rounded-full border border-gray-200 px-4 py-1.5 text-sm text-gray-600">
          <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
          More apps on the way
        </p>

        <div className="mt-24 w-full max-w-4xl border-t border-gray-100" />

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-10 max-w-4xl w-full text-left pb-24">
          {principles.map((p) => (
            <div key={p.title}>
              <p className="text-2xl font-bold tracking-tight">{p.title}</p>
              <p className="mt-2 text-sm text-gray-500 leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="w-full max-w-5xl mx-auto px-6 py-8 text-sm text-gray-400">
        © {new Date().getFullYear()} Broccly
      </footer>
    </main>
  );
}
