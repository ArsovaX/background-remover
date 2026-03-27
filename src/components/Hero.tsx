export default function Hero() {
  return (
    <section className="pt-36 pb-10 px-6 text-center fade-up">
      <div className="max-w-2xl mx-auto">
        {/* Pill badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary-50/80 border border-primary-200/60 text-primary-700 text-xs font-medium tracking-wide mb-8">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary-500" />
          </span>
          AI-powered &middot; 100% in-browser
        </div>

        <h1 className="text-[2.75rem] sm:text-[3.5rem] lg:text-[4rem] font-bold text-gray-950 tracking-[-0.035em] leading-[1.08] mb-5">
          Remove image{" "}
          <br className="hidden sm:block" />
          backgrounds{" "}
          <span className="bg-gradient-to-r from-primary-600 via-primary-500 to-primary-400 bg-clip-text text-transparent">
            in seconds
          </span>
        </h1>

        <p className="text-base sm:text-lg text-gray-400 max-w-lg mx-auto leading-relaxed font-normal">
          Upload a photo. AI removes the background. Download a transparent PNG.
          <br className="hidden sm:block" />
          No signup, no watermarks, completely free.
        </p>
      </div>
    </section>
  );
}
