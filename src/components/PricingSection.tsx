"use client";

import { Check, Sparkles, Zap } from "lucide-react";
import { motion } from "framer-motion";

const tiers = [
  {
    name: "Free Hook",
    id: "tier-free",
    price: "$0",
    description: "Perfect for testing the magic. Zero commitment.",
    features: [
      "3 High-Res downloads per month",
      "Unlimited low-res previews",
      "Standard B/A slider",
      "Community support",
    ],
    cta: "Start for Free",
    mostPopular: false,
  },
  {
    name: "Creator Pack",
    id: "tier-credits",
    price: "$4.90",
    description: "Pay as you go. The most flexible way to scale.",
    features: [
      "25 High-Res downloads",
      "No expiration date",
      "Priority background removal",
      "Batch processing (Up to 5)",
      "Commercial usage rights",
    ],
    cta: "Buy Credits",
    mostPopular: true,
  },
];

export default function PricingSection() {
  return (
    <section className="relative w-full min-h-screen bg-[#0a0a0a] py-24 px-6 overflow-hidden flex items-center justify-center font-sans">
      {/* Background Atmosphere: Radial gradient + noise overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-amber-900/20 via-[#0a0a0a] to-[#0a0a0a] -z-10" />
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none -z-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <div className="max-w-5xl w-full mx-auto flex flex-col items-center">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mb-16"
        >
          <h2 className="text-amber-500 font-semibold tracking-wider uppercase text-sm mb-3">
            Simple, Transparent Pricing
          </h2>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Pay for the <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500">Pixels</span>, <br className="hidden md:block"/> Not the Promise.
          </h1>
          <p className="text-zinc-400 text-lg">
            Start free, scale when you need to. No sneaky subscriptions.
          </p>
        </motion.div>

        {/* Pricing Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8 w-full max-w-4xl relative">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className={`relative flex flex-col p-8 rounded-3xl backdrop-blur-xl transition-all duration-300 ${
                tier.mostPopular
                  ? "bg-white/5 border border-amber-500/50 shadow-[0_0_40px_-15px_rgba(245,158,11,0.3)] hover:border-amber-500 hover:shadow-[0_0_60px_-15px_rgba(245,158,11,0.5)]"
                  : "bg-white/[0.02] border border-white/10 hover:bg-white/[0.04] hover:border-white/20"
              }`}
            >
              {tier.mostPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-gradient-to-r from-amber-500 to-orange-400 text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-lg">
                    <Zap size={12} className="fill-black" /> Sweet Spot
                  </span>
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-xl font-medium text-white mb-2">{tier.name}</h3>
                <p className="text-zinc-400 text-sm h-10">{tier.description}</p>
                <div className="mt-6 flex items-baseline gap-2">
                  <span className="text-5xl font-bold text-white">{tier.price}</span>
                  {tier.mostPopular && <span className="text-zinc-500">/ 25 credits</span>}
                </div>
              </div>

              <ul className="space-y-4 mb-8 flex-1">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-zinc-300 text-sm">
                    <div className={`p-1 rounded-full ${tier.mostPopular ? 'bg-amber-500/20 text-amber-500' : 'bg-white/10 text-white'}`}>
                      <Check size={14} strokeWidth={3} />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-4 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
                  tier.mostPopular
                    ? "bg-amber-500 text-black hover:bg-amber-400 hover:scale-[1.02] active:scale-95 shadow-[0_0_20px_rgba(245,158,11,0.3)]"
                    : "bg-white/10 text-white hover:bg-white/20 hover:scale-[1.02] active:scale-95"
                }`}
              >
                {tier.cta}
                {tier.mostPopular && <Sparkles size={16} />}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
