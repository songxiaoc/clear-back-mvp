import AuthButton from "@/components/AuthButton";
import ImageUploader from "@/components/ImageUploader";
import PricingSection from "@/components/PricingSection";

export default function Home() {
  return (
    <main className="flex-1 flex flex-col">
      {/* ─── Header ─── */}
      <header className="flex items-center justify-between px-8 py-4 bg-white/80 backdrop-blur-xl border-b border-neutral-200/60 sticky top-0 z-50">
        <div className="flex items-center gap-2.5">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <rect width="28" height="28" rx="7" fill="#111"/>
            <path d="M8 14C8 10.686 10.686 8 14 8C17.314 8 20 10.686 20 14" stroke="#f5f5f0" strokeWidth="2" strokeLinecap="round"/>
            <path d="M8 14C8 17.314 10.686 20 14 20" stroke="#c9a84c" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <span className="text-[15px] font-semibold tracking-tight text-neutral-900">FocusCut Pro</span>
        </div>
        <AuthButton />
      </header>

      {/* ─── Hero ─── */}
      <section className="flex-1 flex flex-col items-center justify-center px-6 py-24 bg-[#fafaf8]">
        <div className="w-full max-w-2xl mx-auto flex flex-col items-center text-center gap-6">
          <span className="inline-flex items-center gap-1.5 text-xs font-medium tracking-widest uppercase text-neutral-500 border border-neutral-300 rounded-full px-4 py-1.5">
            ✦ AI-Powered Background Removal
          </span>

          <h1 className="text-5xl md:text-6xl font-bold text-neutral-900 leading-[1.1] tracking-tight">
            Remove backgrounds.<br/>
            <span className="text-neutral-400">Keep the focus.</span>
          </h1>

          <p className="text-base text-neutral-500 max-w-lg leading-relaxed">
            Drop in any photo — our AI strips the background in seconds.
            No sliders, no selections, no effort. Just results.
          </p>

          <div className="w-full mt-4 bg-white rounded-2xl border border-neutral-200 shadow-sm p-6 md:p-10">
            <ImageUploader />
          </div>
        </div>
      </section>

      {/* ─── Pricing ─── */}
      <PricingSection />
    </main>
  );
}
