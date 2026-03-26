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
    <section className="w-full bg-[#fafaf8] py-24 px-6 border-t border-neutral-200/60">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-medium tracking-widest uppercase text-neutral-500 mb-3">
            Pricing
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4 tracking-tight">
            Pay for pixels,{" "}
            <span className="text-neutral-400">not promises.</span>
          </h2>
          <p className="text-neutral-500 text-base max-w-md mx-auto leading-relaxed">
            Start free. Scale when you need to.{" "}
            No subscriptions, no surprises.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-5 max-w-3xl mx-auto">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              viewport={{ once: true }}
              className={`relative flex flex-col rounded-2xl p-8 border transition-shadow ${
                tier.popular
                  ? "bg-neutral-900 border-neutral-800 shadow-xl"
                  : "bg-white border-neutral-200 shadow-sm hover:shadow-md"
              }`}
            >
              {tier.popular && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-[10px] font-bold tracking-widest uppercase bg-white text-neutral-900 border border-neutral-300 px-3 py-1 rounded-full shadow-sm">
                  Most Popular
                </span>
              )}

              {/* Plan info */}
              <div className="mb-6">
                <p className={`text-xs font-semibold tracking-widest uppercase mb-1 ${tier.popular ? "text-neutral-400" : "text-neutral-500"}`}>
                  {tier.name}
                </p>
                <p className={`text-sm mb-5 ${tier.popular ? "text-neutral-400" : "text-neutral-500"}`}>
                  {tier.description}
                </p>
                <div className="flex items-end gap-2">
                  <span className={`text-5xl font-bold tracking-tight ${tier.popular ? "text-white" : "text-neutral-900"}`}>
                    {tier.price}
                  </span>
                  {tier.period && (
                    <span className={`text-sm pb-1.5 ${tier.popular ? "text-neutral-500" : "text-neutral-400"}`}>
                      {tier.period}
                    </span>
                  )}
                </div>
              </div>

              {/* Features */}
              <ul className="flex-1 space-y-3 mb-8">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <span className={`mt-0.5 flex-shrink-0 rounded-full p-0.5 ${tier.popular ? "bg-white/10 text-white" : "bg-neutral-100 text-neutral-600"}`}>
                      <Check size={12} strokeWidth={3} />
                    </span>
                    <span className={`text-sm ${tier.popular ? "text-neutral-300" : "text-neutral-600"}`}>
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                className={`w-full py-3.5 rounded-xl text-sm font-semibold transition-all ${
                  tier.popular
                    ? "bg-white text-neutral-900 hover:bg-neutral-100"
                    : "bg-neutral-900 text-white hover:bg-neutral-800"
                }`}
              >
                {tier.cta}
              </button>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
