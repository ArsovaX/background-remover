const features = [
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "Private & secure",
    desc: "Images never leave your device",
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    title: "Instant AI processing",
    desc: "Runs entirely in-browser via WASM",
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
    ),
    title: "Transparent PNG",
    desc: "Production-ready output, no watermarks",
  },
];

export default function FeatureStrip() {
  return (
    <section className="pt-2 pb-10 px-6 fade-up fade-up-delay-1">
      <div className="max-w-xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10">
        {features.map((f) => (
          <div key={f.title} className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-gray-100/80 text-gray-400 group-hover:text-primary-500 group-hover:bg-primary-50 flex items-center justify-center transition-all duration-300">
              {f.icon}
            </div>
            <div>
              <p className="text-[13px] font-semibold text-gray-700 leading-tight">
                {f.title}
              </p>
              <p className="text-[11px] text-gray-400 leading-tight mt-0.5">
                {f.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
