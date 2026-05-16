import Link from "next/link";
import LandingNav from "@/components/LandingNav";

export default function LandingPage() {
  return (
    <>
      <LandingNav />
      <section className="min-h-screen flex flex-col items-center justify-center pt-16 px-6 text-center bg-white">
        <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-8">
          A place for curious minds
        </p>
        <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold tracking-tighter text-gray-900 max-w-4xl leading-[1.02]">
          Ideas worth<br />reading.
        </h1>
        <p className="mt-6 text-lg sm:text-xl text-gray-500 max-w-lg leading-relaxed">
          Discover stories, thinking, and expertise from writers on any topic that matters to you.
        </p>
        <div className="mt-10 flex items-center gap-5">
          <Link
            href="/feed"
            className="bg-gray-900 text-white text-base font-medium px-8 py-3 rounded-full hover:bg-gray-700 transition-colors"
          >
            Start Reading
          </Link>
          <Link
            href="/login"
            className="text-base font-medium text-gray-900 underline underline-offset-4 hover:text-gray-500 transition-colors"
          >
            Sign in
          </Link>
        </div>

        <div className="mt-24 w-full max-w-4xl border-t border-gray-100" />

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-10 max-w-4xl w-full text-left pb-24">
          <div>
            <p className="text-2xl font-bold tracking-tight text-gray-900">Write freely.</p>
            <p className="mt-2 text-sm text-gray-500 leading-relaxed">
              Share your ideas, stories, and expertise with readers who care.
            </p>
          </div>
          <div>
            <p className="text-2xl font-bold tracking-tight text-gray-900">Read deeply.</p>
            <p className="mt-2 text-sm text-gray-500 leading-relaxed">
              Explore thoughtful long-form writing on any subject you love.
            </p>
          </div>
          <div>
            <p className="text-2xl font-bold tracking-tight text-gray-900">Connect truly.</p>
            <p className="mt-2 text-sm text-gray-500 leading-relaxed">
              Engage with writers and readers through meaningful conversation.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
