import AuthButton from "@/components/AuthButton";
import ImageUploader from "@/components/ImageUploader";
import PricingSection from "@/components/PricingSection";
import HowItWorks from "@/components/HowItWorks";

export default function Home() {
  return (
    <main className="flex-1 flex flex-col relative" style={{ zIndex: 1 }}>

      {/* ─── Header ─── */}
      <header
        className="flex items-center justify-between px-6 md:px-10 py-3.5 sticky top-0 z-50"
        style={{
          background: "rgba(240,247,255,0.82)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          borderBottom: "1px solid rgba(147,197,253,0.22)",
          boxShadow: "0 1px 0 rgba(59,130,246,0.06)",
        }}
      >
        <div className="flex items-center gap-2.5">
          {/* Logo mark */}
          <div
            style={{
              width: 34, height: 34, borderRadius: 10,
              background: "linear-gradient(135deg, #1a3a6b 0%, #3b82f6 100%)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 2px 8px rgba(59,130,246,0.3)",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M3.5 9C3.5 5.962 5.962 3.5 9 3.5C12.038 3.5 14.5 5.962 14.5 9" stroke="white" strokeWidth="1.6" strokeLinecap="round"/>
              <path d="M3.5 9C3.5 12.038 5.962 14.5 9 14.5" stroke="#93c5fd" strokeWidth="1.6" strokeLinecap="round"/>
              <circle cx="9" cy="9" r="2" fill="rgba(255,255,255,0.45)"/>
            </svg>
          </div>
          <span
            style={{
              fontSize: 15, fontWeight: 700, letterSpacing: "-0.025em",
              color: "var(--primary)",
            }}
          >
            FocusCut Pro
          </span>
        </div>

        <AuthButton />
      </header>

      {/* ─── Hero ─── */}
      <section className="relative flex flex-col items-center justify-center px-5 pt-20 pb-24 overflow-hidden">

        {/* Decorative background blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
          <div
            className="anim-blob"
            style={{
              position: "absolute", top: "-12%", left: "50%",
              transform: "translateX(-50%)",
              width: "110%", height: "56%",
              background: "radial-gradient(ellipse at 50% 40%, rgba(59,130,246,0.11) 0%, transparent 62%)",
            }}
          />
          <div
            style={{
              position: "absolute", top: "5%", right: "-3%",
              width: 380, height: 380, borderRadius: "50%",
              background: "radial-gradient(circle, rgba(147,197,253,0.18) 0%, transparent 70%)",
            }}
          />
          <div
            style={{
              position: "absolute", bottom: "6%", left: "-4%",
              width: 280, height: 280, borderRadius: "50%",
              background: "radial-gradient(circle, rgba(96,165,250,0.13) 0%, transparent 70%)",
            }}
          />
          {/* Dot grid – top right */}
          <svg
            style={{ position: "absolute", top: "9%", right: "7%", opacity: 0.45 }}
            width="112" height="112"
          >
            {Array.from({ length: 5 }).flatMap((_, r) =>
              Array.from({ length: 5 }).map((_, c) => (
                <circle key={`${r}-${c}`} cx={c * 22 + 11} cy={r * 22 + 11} r="2" fill="#93c5fd" />
              ))
            )}
          </svg>
          {/* Dot grid – bottom left */}
          <svg
            style={{ position: "absolute", bottom: "11%", left: "6%", opacity: 0.3 }}
            width="88" height="88"
          >
            {Array.from({ length: 4 }).flatMap((_, r) =>
              Array.from({ length: 4 }).map((_, c) => (
                <circle key={`${r}-${c}`} cx={c * 22 + 11} cy={r * 22 + 11} r="2" fill="#3b82f6" />
              ))
            )}
          </svg>
        </div>

        {/* Content */}
        <div className="relative w-full max-w-2xl mx-auto flex flex-col items-center text-center gap-5">

          {/* Badge */}
          <div
            className="anim-fade-up"
            style={{
              display: "inline-flex", alignItems: "center", gap: 7,
              padding: "6px 16px", borderRadius: 100,
              background: "rgba(219,234,254,0.75)",
              border: "1px solid rgba(147,197,253,0.55)",
              fontSize: 11, fontWeight: 600,
              letterSpacing: "0.07em", textTransform: "uppercase",
              color: "#2563eb",
              backdropFilter: "blur(8px)",
            }}
          >
            <span
              style={{
                width: 6, height: 6, borderRadius: "50%",
                background: "#3b82f6", display: "inline-block",
                boxShadow: "0 0 0 2px rgba(59,130,246,0.25)",
              }}
            />
            AI-Powered Background Removal
          </div>

          {/* Headline */}
          <h1
            className="anim-fade-up delay-1"
            style={{
              fontSize: "clamp(38px, 6vw, 62px)",
              fontWeight: 800, letterSpacing: "-0.03em",
              lineHeight: 1.1, color: "var(--primary)",
            }}
          >
            Remove backgrounds.{" "}
            <br className="hidden sm:block" />
            <span
              style={{
                background: "linear-gradient(120deg, #3b82f6 0%, #60a5fa 50%, #93c5fd 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Keep the focus.
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className="anim-fade-up delay-2"
            style={{
              fontSize: 16, color: "var(--text-secondary)",
              lineHeight: 1.7, maxWidth: 420,
            }}
          >
            Drop in any photo — our AI strips the background in seconds.
            No sliders, no selections, no effort. Just results.
          </p>

          {/* Upload card */}
          <div
            className="anim-fade-up delay-3 w-full mt-3"
            style={{
              background: "rgba(255,255,255,0.9)",
              borderRadius: 24,
              border: "1px solid rgba(147,197,253,0.45)",
              boxShadow:
                "0 10px 48px rgba(59,130,246,0.10), 0 2px 12px rgba(59,130,246,0.06), inset 0 1px 0 rgba(255,255,255,0.95)",
              padding: 8,
              backdropFilter: "blur(12px)",
            }}
          >
            <div
              style={{
                borderRadius: 18,
                background: "linear-gradient(150deg, #f8fbff 0%, #ffffff 100%)",
                border: "1px solid rgba(219,234,254,0.7)",
                padding: "28px 20px",
              }}
            >
              <ImageUploader />
            </div>
          </div>

          {/* Trust badges */}
          <div
            className="anim-fade-up delay-4 flex flex-wrap items-center justify-center gap-5"
            style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 4 }}
          >
            {[
              { icon: "🔒", label: "Privacy-first" },
              { icon: "⚡", label: "Under 3 seconds" },
              { icon: "🖼️", label: "HD quality output" },
            ].map(({ icon, label }) => (
              <span key={label} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <span>{icon}</span>
                <span style={{ fontWeight: 500 }}>{label}</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── How it works ─── */}
      <HowItWorks />

      {/* ─── Pricing ─── */}
      <PricingSection />

      {/* ─── Footer ─── */}
      <footer
        style={{
          textAlign: "center", padding: "24px 16px",
          fontSize: 13, color: "var(--text-muted)",
          borderTop: "1px solid rgba(147,197,253,0.15)",
          background: "rgba(240,247,255,0.5)",
        }}
      >
        © 2025 FocusCut Pro &nbsp;·&nbsp; Built with ❤️ &nbsp;·&nbsp;
        <a href="#" style={{ color: "var(--text-muted)", textDecoration: "none" }}>
          Privacy
        </a>
      </footer>
    </main>
  );
}
