"use client";

const steps = [
  {
    step: "01",
    icon: "📤",
    title: "Upload your image",
    desc: "Drag & drop or click to upload any JPEG, PNG, or WebP file.",
  },
  {
    step: "02",
    icon: "🤖",
    title: "AI processes it",
    desc: "Our model detects every edge and removes the background instantly.",
  },
  {
    step: "03",
    icon: "💾",
    title: "Download PNG",
    desc: "Get a high-resolution transparent-background PNG in one click.",
  },
];

export default function HowItWorks() {
  return (
    <section
      style={{
        borderTop: "1px solid rgba(147,197,253,0.18)",
        padding: "56px 24px",
        background: "rgba(255,255,255,0.45)",
      }}
    >
      <div className="max-w-3xl mx-auto text-center">
        <p
          style={{
            fontSize: 11, fontWeight: 600, letterSpacing: "0.08em",
            textTransform: "uppercase", color: "#3b82f6", marginBottom: 12,
          }}
        >
          How it works
        </p>
        <h2
          style={{
            fontSize: "clamp(24px, 3.5vw, 36px)", fontWeight: 700,
            color: "var(--primary)", letterSpacing: "-0.025em", marginBottom: 48,
          }}
        >
          Three steps to perfection
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((item) => (
            <div
              key={item.step}
              style={{
                background: "white",
                border: "1px solid var(--border)",
                borderRadius: 20,
                padding: "28px 24px",
                boxShadow: "0 2px 12px rgba(59,130,246,0.06)",
                transition: "box-shadow 0.25s ease, transform 0.25s ease",
                cursor: "default",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 8px 32px rgba(59,130,246,0.13)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 2px 12px rgba(59,130,246,0.06)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }}
            >
              <div
                style={{
                  fontSize: 26, marginBottom: 14,
                  width: 52, height: 52, borderRadius: 14,
                  background: "var(--accent-subtle)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}
              >
                {item.icon}
              </div>
              <p
                style={{
                  fontSize: 11, fontWeight: 700, color: "#3b82f6",
                  letterSpacing: "0.06em", marginBottom: 6,
                }}
              >
                {item.step}
              </p>
              <h3
                style={{
                  fontSize: 16, fontWeight: 700, color: "var(--primary)",
                  marginBottom: 8, letterSpacing: "-0.015em",
                }}
              >
                {item.title}
              </h3>
              <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.6 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
