export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-2xl bg-white/60 border-b border-black/[0.04]">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-md bg-gradient-to-br from-primary-600 via-primary-500 to-primary-700 flex items-center justify-center shadow-sm shadow-primary-500/20">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="m21 15-5-5L5 21" />
            </svg>
          </div>
          <span className="text-[15px] font-semibold text-gray-900 tracking-[-0.01em]">
            Background Remover
          </span>
        </div>
        <div className="flex items-center gap-5">
          <span className="hidden sm:inline text-xs text-gray-400 font-medium tracking-wide uppercase">
            Free &middot; No signup
          </span>
          <div className="w-px h-4 bg-gray-200 hidden sm:block" />
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] text-gray-400 hover:text-gray-700 transition-colors duration-300"
          >
            GitHub
          </a>
        </div>
      </div>
    </nav>
  );
}
