export default function Footer() {
  return (
    <footer className="py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200/60 to-transparent mb-8" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[12px] text-gray-300 tracking-wide">
            All processing happens locally. Your images never leave your
            device.
          </p>
          <p className="text-[12px] text-gray-300 tracking-wide">
            Built with Next.js &amp; @imgly/background-removal
          </p>
        </div>
      </div>
    </footer>
  );
}
