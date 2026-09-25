"use client";

import { useState } from "react";
import Link from "next/link";
import { FiCheck, FiArrowRight, FiZap } from "react-icons/fi";

const TIERS = [
  {
    name: "Starter Club",
    badge: "Essential",
    monthlyPrice: 29,
    annualPrice: 23,
    description: "Ideal for self-directed athletes building a consistent gym routine.",
    popular: false,
    features: [
      "Full access to Free Weights & Cardio Deck",
      "Locker room & Sauna amenities",
      "Access to FlexPulse Mobile Companion",
      "Standard fitness onboarding evaluation",
    ]
  },
  {
    name: "Pro Athlete",
    badge: "Most Popular",
    monthlyPrice: 59,
    annualPrice: 47,
    description: "The complete athletic package with unlimited studio classes.",
    popular: true,
    features: [
      "Everything in Starter Club tier",
      "Unlimited HIIT, CrossFit, Yoga & Boxing Classes",
      "1 Monthly 1-on-1 Personal Training Session",
      "Bi-weekly InBody 570 Composition Analysis",
      "Priority VIP studio booking (7 days in advance)",
    ]
  },
  {
    name: "Elite Performance",
    badge: "All-Inclusive VIP",
    monthlyPrice: 99,
    annualPrice: 79,
    description: "Uncompromised performance with dedicated coaching and recovery.",
    popular: false,
    features: [
      "Everything in Pro Athlete tier",
      "4 Monthly 1-on-1 Personal Training Sessions",
      "Full Cryotherapy & Infrared Sauna recovery lounge",
      "Custom sports nutrition & macro periodization plan",
      "Dedicated senior coach phone & chat support",
    ]
  }
];

export default function HomePricingPreview() {
  const [billingCycle, setBillingCycle] = useState("monthly"); // monthly | annual

  return (
    <section className="py-24 bg-linear-to-b from-background via-[#1B1A55]/10 to-background border-t border-brand-500/15 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-800/20 border border-brand-500/30 text-active text-xs font-bold tracking-wider uppercase mb-4">
            <span className="flex h-2 w-2 rounded-full bg-active animate-pulse" />
            Transparent Memberships
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-['Outfit'] tracking-tight mb-4">
            Invest in Your <span className="text-active">Transformation</span>
          </h2>
          <p className="text-sm sm:text-base text-[#535C91] dark:text-[#9290C3] font-['Inter'] leading-relaxed">
            No lock-in contracts. Switch or pause anytime. Select the membership that matches your athletic goals.
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center mt-8 p-1.5 rounded-2xl bg-[#535C91]/10 dark:bg-[#1B1A55]/60 border border-brand-500/20 font-['Inter'] text-sm">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-5 py-2 rounded-xl font-bold transition-all cursor-pointer ${
                billingCycle === "monthly" ? "bg-active text-white shadow-md" : "text-[#535C91] dark:text-[#9290C3]"
              }`}
            >
              Billed Monthly
            </button>
            <button
              onClick={() => setBillingCycle("annual")}
              className={`px-5 py-2 rounded-xl font-bold flex items-center gap-2 transition-all cursor-pointer ${
                billingCycle === "annual" ? "bg-active text-white shadow-md" : "text-[#535C91] dark:text-[#9290C3]"
              }`}
            >
              Billed Annually
              <span className="px-2 py-0.5 rounded-md bg-amber-400 text-black text-[10px] font-black uppercase">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {TIERS.map((tier, index) => {
            const price = billingCycle === "monthly" ? tier.monthlyPrice : tier.annualPrice;
            return (
              <div
                key={index}
                className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
                  tier.popular
                    ? "bg-[#1B1A55]/30 border-2 border-active shadow-2xl scale-[1.02]"
                    : "bg-[#535C91]/5 dark:bg-[#070F2B] border border-brand-500/20 shadow-lg hover:border-active/50"
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-active text-white text-[11px] font-bold uppercase tracking-wider shadow-md">
                    {tier.badge}
                  </div>
                )}

                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-['Outfit'] text-2xl font-bold text-foreground">
                      {tier.name}
                    </h3>
                    {!tier.popular && (
                      <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-brand-800/30 text-active uppercase">
                        {tier.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#535C91] dark:text-[#9290C3] font-['Inter'] mb-6">
                    {tier.description}
                  </p>

                  <div className="flex items-baseline gap-1 mb-8 font-['Outfit']">
                    <span className="text-xl font-bold text-active">$</span>
                    <span className="text-5xl font-extrabold text-foreground tracking-tight">
                      {price}
                    </span>
                    <span className="text-xs text-[#535C91] dark:text-[#9290C3] font-medium font-['Inter']">
                      / month
                    </span>
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 font-['Inter'] text-xs sm:text-sm text-foreground/90 mb-8">
                    {tier.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5">
                        <div className="p-1 rounded-full bg-active/15 text-active shrink-0 mt-0.5">
                          <FiCheck className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-xs leading-relaxed">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href="/pricing"
                  className={`w-full py-3.5 rounded-xl font-bold text-sm text-center transition-all ${
                    tier.popular
                      ? "bg-btn-bg text-btn-text shadow-lg hover:opacity-95"
                      : "bg-[#535C91]/15 dark:bg-[#1B1A55] text-foreground hover:border-active border border-brand-500/20"
                  }`}
                >
                  Select {tier.name}
                </Link>
              </div>
            );
          })}
        </div>

        {/* Comparison Link */}
        <div className="text-center mt-12">
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 font-bold text-sm text-active hover:underline"
          >
            Compare All 20+ Amenities & Claim Free 1-Day Trial Pass <FiArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
