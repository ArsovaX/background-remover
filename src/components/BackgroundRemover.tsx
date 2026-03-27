"use client";

import { useState, useRef, useCallback } from "react";

type Status = "idle" | "uploaded" | "processing" | "done";

const ACCEPTED_TYPES = ["image/png", "image/jpeg", "image/webp"];
const MAX_SIZE_MB = 10;

export default function BackgroundRemover() {
  const [status, setStatus] = useState<Status>("idle");
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [progress, setProgress] = useState(0);
  const [fileName, setFileName] = useState("");
  const [dragging, setDragging] = useState(false);
  const fileRef = useRef<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const reset = useCallback(() => {
    if (originalUrl) URL.revokeObjectURL(originalUrl);
    if (resultUrl) URL.revokeObjectURL(resultUrl);
    setStatus("idle");
    setOriginalUrl(null);
    setResultUrl(null);
    setErrorMsg("");
    setProgress(0);
    setFileName("");
    setDragging(false);
    fileRef.current = null;
    if (inputRef.current) inputRef.current.value = "";
  }, [originalUrl, resultUrl]);

  const handleFile = useCallback(
    (file: File) => {
      if (!ACCEPTED_TYPES.includes(file.type)) {
        setErrorMsg("Please upload a PNG, JPEG, or WebP image.");
        setStatus("idle");
        return;
      }
      if (file.size > MAX_SIZE_MB * 1024 * 1024) {
        setErrorMsg(`File too large. Maximum size is ${MAX_SIZE_MB} MB.`);
        setStatus("idle");
        return;
      }
      if (originalUrl) URL.revokeObjectURL(originalUrl);
      if (resultUrl) URL.revokeObjectURL(resultUrl);

      fileRef.current = file;
      setFileName(file.name);
      setOriginalUrl(URL.createObjectURL(file));
      setResultUrl(null);
      setErrorMsg("");
      setStatus("uploaded");
    },
    [originalUrl, resultUrl],
  );

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile],
  );

  const onFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleFile(file);
    },
    [handleFile],
  );

  const removeBackground = useCallback(async () => {
    if (!fileRef.current) return;
    setStatus("processing");
    setProgress(0);

    try {
      const { removeBackground } = await import("@imgly/background-removal");
      const blob = await removeBackground(fileRef.current, {
        model: "isnet",
        device: "gpu",
        rescale: true,
        output: { format: "image/png", quality: 1 },
        progress: (key: string, current: number, total: number) => {
          if (total > 0) setProgress(Math.round((current / total) * 100));
        },
      });
      setResultUrl(URL.createObjectURL(blob));
      setStatus("done");
    } catch (err) {
      console.error(err);
      setErrorMsg("Something went wrong while processing your image. Please try again.");
      setStatus("uploaded");
    }
  }, []);

  const download = useCallback(() => {
    if (!resultUrl) return;
    const a = document.createElement("a");
    a.href = resultUrl;
    a.download = `${fileName.replace(/\.[^.]+$/, "")}-no-bg.png`;
    a.click();
  }, [resultUrl, fileName]);

  if (status === "idle") {
    return (
      <section className="px-6 pb-20 fade-up fade-up-delay-2">
        <div className="max-w-xl mx-auto">
          <div
            onDrop={onDrop}
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onClick={() => inputRef.current?.click()}
            className={`
              group relative cursor-pointer rounded-2xl border border-dashed
              ${dragging ? "border-primary-400 bg-primary-50/40" : "border-gray-200 bg-white/60"}
              hover:border-primary-300 hover:bg-white/80 backdrop-blur-xl
              shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_rgba(0,0,0,0.03)]
              hover:shadow-[0_2px_8px_rgba(0,0,0,0.06),0_8px_32px_rgba(0,0,0,0.04)]
              transition-all duration-500 ease-out p-14 sm:p-16 text-center
            `}
          >
            <input
              ref={inputRef}
              type="file"
              accept="image/png,image/jpeg,image/webp"
              onChange={onFileChange}
              className="hidden"
            />

            <div
              className={`
                w-12 h-12 mx-auto mb-6 rounded-xl flex items-center justify-center
                transition-all duration-500 ease-out
                ${dragging
                  ? "bg-primary-100 text-primary-600 scale-110"
                  : "bg-gray-100 text-gray-400 group-hover:bg-primary-50 group-hover:text-primary-500 group-hover:scale-105"}
              `}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
            </div>

            <p className="text-gray-700 font-medium text-sm mb-1.5 tracking-[-0.01em]">
              Drop your image here, or{" "}
              <span className="text-primary-600 underline underline-offset-[3px] decoration-primary-300/60">
                browse files
              </span>
            </p>
            <p className="text-xs text-gray-400">
              PNG, JPEG, or WebP &middot; up to 10 MB
            </p>
          </div>

          {errorMsg && (
            <div className="mt-4 py-3 px-4 rounded-xl bg-red-50/80 border border-red-200/60 text-red-600 text-[13px] text-center">
              {errorMsg}
            </div>
          )}
        </div>
      </section>
    );
  }

  if (status === "processing") {
    return (
      <section className="px-6 pb-20 fade-up">
        <div className="max-w-lg mx-auto">
          <div className="rounded-2xl bg-white/70 backdrop-blur-xl border border-black/[0.04] shadow-[0_1px_3px_rgba(0,0,0,0.04),0_8px_40px_rgba(0,0,0,0.04)] p-10 sm:p-14 text-center">
            <div className="relative w-20 h-20 mx-auto mb-8">
              <svg className="w-full h-full spin-slow" viewBox="0 0 80 80">
                <circle cx="40" cy="40" r="35" fill="none" stroke="#f3f4f6" strokeWidth="3" />
                <circle cx="40" cy="40" r="35" fill="none" stroke="url(#spinGrad)" strokeWidth="3" strokeLinecap="round" strokeDasharray="140 80" />
                <defs>
                  <linearGradient id="spinGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.3" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-semibold text-gray-500 tabular-nums">{progress}%</span>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-gray-900 tracking-[-0.01em] mb-1.5">
              Removing background
            </h3>
            <p className="text-[13px] text-gray-400 mb-8 leading-relaxed">
              AI is processing your image. First run may take longer
              <br className="hidden sm:block" /> as the model downloads to your browser.
            </p>

            <div className="max-w-xs mx-auto h-1 rounded-full bg-gray-100 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-primary-600 via-primary-400 to-primary-600 progress-shimmer transition-all duration-700 ease-out"
                style={{ width: `${Math.max(progress, 3)}%` }}
              />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="px-6 pb-20 fade-up">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="rounded-2xl bg-white/70 backdrop-blur-xl border border-black/[0.04] shadow-[0_1px_3px_rgba(0,0,0,0.04),0_8px_40px_rgba(0,0,0,0.04)] overflow-hidden">
            <div className="px-5 py-3 border-b border-black/[0.04] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-gray-300" />
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Original</span>
              </div>
              <span className="text-[11px] text-gray-300 truncate max-w-[140px] font-mono">{fileName}</span>
            </div>
            <div className="aspect-[4/3] bg-gray-50/50 flex items-center justify-center p-5">
              {originalUrl && (
                <img src={originalUrl} alt="Original upload" className="max-h-full max-w-full object-contain rounded-lg" />
              )}
            </div>
          </div>

          <div className="rounded-2xl bg-white/70 backdrop-blur-xl border border-black/[0.04] shadow-[0_1px_3px_rgba(0,0,0,0.04),0_8px_40px_rgba(0,0,0,0.04)] overflow-hidden">
            <div className="px-5 py-3 border-b border-black/[0.04] flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${status === "done" ? "bg-emerald-400" : "bg-gray-300"}`} />
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                {status === "done" ? "Background removed" : "Result"}
              </span>
            </div>
            <div className="aspect-[4/3] flex items-center justify-center p-5">
              {status === "done" && resultUrl ? (
                <div className="checkerboard rounded-lg w-full h-full flex items-center justify-center">
                  <img src={resultUrl} alt="Background removed" className="max-h-full max-w-full object-contain" />
                </div>
              ) : (
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gray-50 flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-300">
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <path d="m21 15-5-5L5 21" />
                    </svg>
                  </div>
                  <p className="text-xs text-gray-300">Click &ldquo;Remove Background&rdquo; to process</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
          {status === "uploaded" && (
            <button
              onClick={removeBackground}
              className="px-7 py-2.5 rounded-xl bg-gray-900 text-white text-sm font-medium tracking-[-0.01em] shadow-[0_1px_2px_rgba(0,0,0,0.1),0_4px_16px_rgba(0,0,0,0.1)] hover:shadow-[0_2px_8px_rgba(0,0,0,0.15),0_8px_32px_rgba(0,0,0,0.12)] hover:-translate-y-px active:translate-y-0 transition-all duration-300 ease-out"
            >
              <span className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
                Remove Background
              </span>
            </button>
          )}

          {status === "done" && (
            <button
              onClick={download}
              className="px-7 py-2.5 rounded-xl bg-gray-900 text-white text-sm font-medium tracking-[-0.01em] shadow-[0_1px_2px_rgba(0,0,0,0.1),0_4px_16px_rgba(0,0,0,0.1)] hover:shadow-[0_2px_8px_rgba(0,0,0,0.15),0_8px_32px_rgba(0,0,0,0.12)] hover:-translate-y-px active:translate-y-0 transition-all duration-300 ease-out"
            >
              <span className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Download PNG
              </span>
            </button>
          )}

          <button
            onClick={reset}
            className="px-7 py-2.5 rounded-xl bg-white/80 backdrop-blur-sm border border-black/[0.06] text-gray-600 text-sm font-medium tracking-[-0.01em] shadow-[0_1px_2px_rgba(0,0,0,0.03)] hover:bg-white hover:border-black/[0.08] hover:shadow-[0_2px_8px_rgba(0,0,0,0.05)] hover:-translate-y-px active:translate-y-0 transition-all duration-300 ease-out"
          >
            Try another image
          </button>
        </div>

        {errorMsg && (
          <div className="mt-6 py-3 px-4 rounded-xl bg-red-50/80 border border-red-200/60 text-red-600 text-[13px] text-center max-w-md mx-auto">
            {errorMsg}
          </div>
        )}
      </div>
    </section>
  );
}
