"use client";

import { Check } from "lucide-react";
import { motion } from "framer-motion";

const tiers = [
  {
    name: "Starter",
    price: "$0",
    period: "",
    description: "Try it out, no strings attached.",
    features: [
      "5 free credits on signup",
      "High-resolution downloads",
      "Watermark-free exports",
      "Community support",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Creator Pack",
    price: "$4.99",
    period: "one-time",
    description: "Pay once, use anytime. No expiration.",
    features: [
      "40 high-res downloads",
      "Never expires",
      "Priority processing",
      "Batch upload (up to 10)",
      "Commercial license",
    ],
    cta: "Buy Credits",
    popular: true,
  },
];

export default function PricingSection() {
  return (
    <section
      style={{
        width: "100%",
        padding: "80px 24px",
        background: "rgba(240,247,255,0.6)",
        borderTop: "1px solid rgba(147,197,253,0.18)",
      }}
    >
      <div style={{ maxWidth: 820, margin: "0 auto" }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 0.68, 0, 1.2] }}
          viewport={{ once: true }}
          style={{ textAlign: "center", marginBottom: 56 }}
        >
          <span
            style={{
              display: "inline-block",
              fontSize: 11, fontWeight: 600,
              letterSpacing: "0.08em", textTransform: "uppercase",
              color: "#3b82f6", marginBottom: 12,
            }}
          >
            Pricing
          </span>
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 44px)",
              fontWeight: 800, letterSpacing: "-0.03em",
              color: "var(--primary)", marginBottom: 12, lineHeight: 1.15,
            }}
          >
            Pay for pixels,{" "}
            <span style={{ color: "var(--text-muted)", fontWeight: 600 }}>
              not promises.
            </span>
          </h2>
          <p style={{ fontSize: 15, color: "var(--text-secondary)", maxWidth: 380, margin: "0 auto", lineHeight: 1.7 }}>
            Start free. Scale when you need to.{" "}
            No subscriptions, no surprises.
          </p>
        </motion.div>

        {/* Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 20,
            maxWidth: 680,
            margin: "0 auto",
          }}
        >
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 0.68, 0, 1.2] }}
              viewport={{ once: true }}
              style={{
                position: "relative",
                display: "flex", flexDirection: "column",
                borderRadius: 24, padding: 32,
                border: tier.popular
                  ? "1px solid rgba(59,130,246,0.3)"
                  : "1px solid var(--border)",
                background: tier.popular
                  ? "linear-gradient(150deg, #1a3a6b 0%, #1e4080 50%, #1a3a6b 100%)"
                  : "white",
                boxShadow: tier.popular
                  ? "0 16px 56px rgba(59,130,246,0.22), 0 4px 16px rgba(59,130,246,0.12)"
                  : "0 2px 12px rgba(59,130,246,0.06)",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              whileHover={{
                y: -4,
                boxShadow: tier.popular
                  ? "0 24px 64px rgba(59,130,246,0.28), 0 6px 20px rgba(59,130,246,0.15)"
                  : "0 8px 28px rgba(59,130,246,0.12)",
              }}
            >
              {/* Popular badge */}
              {tier.popular && (
                <span
                  style={{
                    position: "absolute", top: -14, left: "50%",
                    transform: "translateX(-50%)",
                    fontSize: 10, fontWeight: 700,
                    letterSpacing: "0.07em", textTransform: "uppercase",
                    background: "linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)",
                    color: "white", padding: "5px 14px", borderRadius: 100,
                    boxShadow: "0 4px 12px rgba(59,130,246,0.35)",
                    whiteSpace: "nowrap",
                  }}
                >
                  Most Popular
                </span>
              )}

              {/* Plan info */}
              <div style={{ marginBottom: 24 }}>
                <p
                  style={{
                    fontSize: 11, fontWeight: 700,
                    letterSpacing: "0.07em", textTransform: "uppercase",
                    marginBottom: 4,
                    color: tier.popular ? "rgba(147,197,253,0.8)" : "var(--text-muted)",
                  }}
                >
                  {tier.name}
                </p>
                <p
                  style={{
                    fontSize: 13, marginBottom: 20,
                    color: tier.popular ? "rgba(147,197,253,0.7)" : "var(--text-muted)",
                  }}
                >
                  {tier.description}
                </p>
                <div style={{ display: "flex", alignItems: "flex-end", gap: 8 }}>
                  <span
                    style={{
                      fontSize: 52, fontWeight: 800, lineHeight: 1,
                      letterSpacing: "-0.04em",
                      color: tier.popular ? "white" : "var(--primary)",
                    }}
                  >
                    {tier.price}
                  </span>
                  {tier.period && (
                    <span
                      style={{
                        fontSize: 13, paddingBottom: 6,
                        color: tier.popular ? "rgba(147,197,253,0.6)" : "var(--text-muted)",
                      }}
                    >
                      {tier.period}
                    </span>
                  )}
                </div>
              </div>

              {/* Divider */}
              <div
                style={{
                  height: 1, marginBottom: 20,
                  background: tier.popular
                    ? "rgba(255,255,255,0.1)"
                    : "var(--border)",
                }}
              />

              {/* Features */}
              <ul style={{ flex: 1, listStyle: "none", padding: 0, margin: "0 0 28px 0", display: "flex", flexDirection: "column", gap: 12 }}>
                {tier.features.map((f) => (
                  <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <span
                      style={{
                        marginTop: 1, flexShrink: 0,
                        width: 18, height: 18, borderRadius: "50%",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        background: tier.popular
                          ? "rgba(59,130,246,0.35)"
                          : "var(--accent-subtle)",
                      }}
                    >
                      <Check
                        size={10} strokeWidth={3.5}
                        color={tier.popular ? "#93c5fd" : "#3b82f6"}
                      />
                    </span>
                    <span
                      style={{
                        fontSize: 14,
                        color: tier.popular ? "rgba(219,234,254,0.9)" : "var(--text-secondary)",
                      }}
                    >
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                style={{
                  width: "100%", padding: "13px 0",
                  borderRadius: 14, border: "none",
                  fontSize: 14, fontWeight: 700,
                  cursor: "pointer",
                  transition: "all 0.2s",
                  background: tier.popular
                    ? "linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)"
                    : "var(--primary)",
                  color: "white",
                  boxShadow: tier.popular
                    ? "0 4px 16px rgba(59,130,246,0.45)"
                    : "0 2px 8px rgba(26,58,107,0.25)",
                  letterSpacing: "-0.01em",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
                  (e.currentTarget as HTMLElement).style.opacity = "0.92";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLElement).style.opacity = "1";
                }}
              >
                {tier.cta}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Trust note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          viewport={{ once: true }}
          style={{
            textAlign: "center", marginTop: 32,
            fontSize: 13, color: "var(--text-muted)",
          }}
        >
          🔒 Secure payment · No recurring charges · Cancel anytime
        </motion.p>
      </div>
    </section>
  );
}
