// feat: pricing cards
"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiCheck, 
  FiArrowRight, 
  FiZap, 
  FiShield, 
  FiStar, 
  FiAward, 
  FiCheckCircle 
} from "react-icons/fi";
import { FaFire } from "react-icons/fa";

const TRANSITION_EASE = [0.16, 1, 0.3, 1];

const TIERS = [
  {
    id: "starter",
    name: "Starter Club",
    badge: "Essential Track",
    monthlyPrice: 29,
    annualPrice: 23,
    billingNote: "Billed annually ($276/yr)",
    description: "Engineered for self-directed athletes building a consistent strength & cardiovascular routine.",
    popular: false,
    highlight: false,
    accentColor: "border-brand-500/25",
    features: [
      "Full access to Olympic Free Weights & Cardio Deck",
      "Executive locker rooms & infrared cedar saunas",
      "FlexPulse Mobile Companion for workout telemetry",
      "Complimentary baseline InBody 570 scan on join",
      "Open gym floor access during all standard hours"
    ],
    cta: "Join Starter Club"
  },
  {
    id: "pro",
    name: "Pro Athlete",
    badge: "Most Popular Choice",
    monthlyPrice: 59,
    annualPrice: 47,
    billingNote: "Billed annually ($564/yr)",
    description: "The complete athletic development system with unlimited group classes and diagnostic coaching.",
    popular: true,
    highlight: true,
    accentColor: "border-active ring-4 ring-active/15",
    features: [
      "Everything in Starter Club tier included",
      "Unlimited HIIT, Olympic Barbell, Boxing & Yoga sessions",
      "1 Monthly 1-on-1 Private Personal Training Session",
      "Bi-weekly InBody 570 body composition scans",
      "7-day priority advance booking window for all classes",
      "Dedicated heart-rate telemetry & mobile workout sync"
    ],
    cta: "Join Pro Athlete"
  },
  {
    id: "elite",
    name: "Elite Performance",
    badge: "All-Inclusive VIP",
    monthlyPrice: 99,
    annualPrice: 79,
    billingNote: "Billed annually ($948/yr)",
    description: "Uncompromised athletic performance with dedicated weekly coaching and cold plunge recovery suites.",
    popular: false,
    highlight: false,
    accentColor: "border-brand-500/25",
    features: [
      "Everything in Pro Athlete tier included",
      "4 Monthly 1-on-1 Elite Coaching Sessions",
      "Unlimited Contrast Therapy, Cold Plunge & Cryo Lounge",
      "Custom sports nutrition & macro periodization strategy",
      "Dedicated master coach direct phone & chat consultation",
      "Complimentary guest pass privilege (2 per month)"
    ],
    cta: "Join Elite Performance"
  }
];

export default function HomePricingPreview() {
  const [billingCycle, setBillingCycle] = useState("monthly"); // "monthly" | "annual"

  return (
    <section className="py-20 lg:py-28 bg-linear-to-b from-background via-[#1B1A55]/10 to-background border-t border-brand-500/15 relative overflow-hidden transition-colors duration-300">
      {/* Background Ambient Lighting Mesh */}
      <div className="absolute top-1/4 left-1/10 w-96 sm:w-140 h-96 sm:h-140 bg-active/6 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-0 w-80 sm:w-120 h-80 sm:h-120 bg-brand-500/8 rounded-full blur-[130px] pointer-events-none -z-10" />

      <div className="w-11/12 mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18 space-y-4">
          
          {/* Accreditation Kicker Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-800/25 dark:bg-[#1B1A55]/70 border border-brand-500/25 text-xs font-bold tracking-wide shadow-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-active opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-active"></span>
            </span>
            <span className="text-active uppercase tracking-wider font-extrabold text-[11px]">
              Transparent Memberships
            </span>
            <span className="text-[#535C91] dark:text-[#9290C3]">
              • Zero Long-Term Contracts
            </span>
          </div>

          {/* Section Headline */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-['Outfit'] tracking-tight text-foreground leading-[1.12]">
            Invest in Your <span className="text-active">Transformation</span>
          </h2>

          <p className="text-sm sm:text-base text-[#535C91] dark:text-[#9290C3] font-['Inter'] leading-relaxed max-w-2xl mx-auto">
            Transparent pricing with no hidden enrollment fees. Pause, upgrade, or cancel your membership anytime with zero friction.
          </p>

          {/* Billing Cycle Segmented Controller - Single Line Pill Design */}
          <div className="inline-flex items-center p-1.5 rounded-2xl bg-[#535C91]/10 dark:bg-[#1B1A55]/80 border border-brand-500/20 font-['Inter'] text-xs sm:text-sm font-bold shrink-0 whitespace-nowrap select-none shadow-sm mt-3">
            <button
              type="button"
              onClick={() => setBillingCycle("monthly")}
              className={`px-5 py-2.5 rounded-xl transition-all duration-200 cursor-pointer whitespace-nowrap ${
                billingCycle === "monthly"
                  ? "bg-active text-white shadow-xs font-extrabold"
                  : "text-[#535C91] dark:text-[#9290C3] hover:text-foreground"
              }`}
            >
              Billed Monthly
            </button>
            
            <button
              type="button"
              onClick={() => setBillingCycle("annual")}
              className={`px-5 py-2.5 rounded-xl transition-all duration-200 cursor-pointer whitespace-nowrap inline-flex items-center gap-2 ${
                billingCycle === "annual"
                  ? "bg-active text-white shadow-xs font-extrabold"
                  : "text-[#535C91] dark:text-[#9290C3] hover:text-foreground"
              }`}
            >
              <span>Billed Annually</span>
              <span className="px-2 py-0.5 rounded-md bg-amber-400 text-black text-[10px] font-black uppercase tracking-wider shadow-xs">
                Save 20%
              </span>
            </button>
          </div>

        </div>

        {/* Pricing Cards Grid (3 Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7 lg:gap-8 items-stretch">
          {TIERS.map((tier, index) => {
            const price = billingCycle === "monthly" ? tier.monthlyPrice : tier.annualPrice;
            const isAnnual = billingCycle === "annual";

            return (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: index * 0.12, ease: TRANSITION_EASE }}
                className="flex"
              >
                <div
                  className={`group relative rounded-3xl p-7 sm:p-8 flex flex-col justify-between w-full transition-all duration-300 ease-out hover:-translate-y-1.5 shadow-xl hover:shadow-2xl ${
                    tier.highlight
                      ? "bg-white dark:bg-[#070F2B] border-2 border-active shadow-2xl ring-4 ring-active/10"
                      : "bg-white dark:bg-[#070F2B] border border-brand-500/20 hover:border-active/60"
                  }`}
                >
                  {/* Top Popular Floating Badge */}
                  {tier.popular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-active text-white text-[11px] font-black uppercase tracking-wider shadow-md flex items-center gap-1.5 whitespace-nowrap">
                      <FaFire className="w-3 h-3 text-amber-300" />
                      <span>{tier.badge}</span>
                    </div>
                  )}

                  <div>
                    {/* Header Row: Title & Tier Badge */}
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-['Outfit'] text-2xl font-black text-foreground group-hover:text-active transition-colors">
                        {tier.name}
                      </h3>
                      {!tier.popular && (
                        <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-lg bg-[#535C91]/10 dark:bg-[#1B1A55]/70 text-active uppercase tracking-wider border border-brand-500/20">
                          {tier.badge}
                        </span>
                      )}
                    </div>

                    {/* Tier Description */}
                    <p className="text-xs text-[#535C91] dark:text-[#9290C3] font-['Inter'] mb-6 leading-relaxed">
                      {tier.description}
                    </p>

                    {/* Price Display with Smooth Transitions */}
                    <div className="p-4 rounded-2xl bg-[#535C91]/5 dark:bg-[#1B1A55]/30 border border-brand-500/15 mb-6">
                      <div className="flex items-baseline gap-1 font-['Outfit']">
                        <span className="text-xl font-black text-active">$</span>
                        <AnimatePresence mode="wait">
                          <motion.span
                            key={price}
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 8 }}
                            transition={{ duration: 0.2 }}
                            className="text-4xl sm:text-5xl font-black text-foreground tracking-tight inline-block"
                          >
                            {price}
                          </motion.span>
                        </AnimatePresence>
                        <span className="text-xs font-bold text-[#535C91] dark:text-[#9290C3] font-['Inter'] ml-1">
                          / month
                        </span>
                      </div>

                      <p className="text-[11px] text-[#535C91] dark:text-[#9290C3] mt-1 font-['Inter']">
                        {isAnnual ? tier.billingNote : "Billed monthly, pause or cancel anytime"}
                      </p>
                    </div>

                    {/* Feature List */}
                    <div className="space-y-3 font-['Inter'] text-xs sm:text-sm text-foreground/90 mb-8">
                      <p className="text-[10px] font-extrabold uppercase tracking-wider text-[#535C91] dark:text-[#9290C3] pb-1">
                        Membership Privileges:
                      </p>
                      {tier.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2.5">
                          <div className="p-0.5 rounded-full bg-active/15 text-active shrink-0 mt-0.5">
                            <FiCheck className="w-3.5 h-3.5 text-active" />
                          </div>
                          <span className="text-xs leading-relaxed text-[#535C91] dark:text-[#9290C3]">
                            {feat}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Call to Action Button */}
                  <Link
                    href="/pricing"
                    className={`w-full py-3.5 px-4 rounded-xl font-extrabold text-xs sm:text-sm text-center transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5 shadow-md ${
                      tier.popular
                        ? "bg-btn-bg text-btn-text hover:opacity-95 shadow-active/20 hover:scale-[1.01]"
                        : "bg-[#535C91]/15 dark:bg-[#1B1A55] text-foreground hover:border-active/60 border border-brand-500/20 hover:bg-[#535C91]/20"
                    }`}
                  >
                    <span>{tier.cta}</span>
                    <FiArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>

                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Section Diagnostic Trust Banner */}
        <div className="mt-14 sm:mt-18 p-6 sm:p-8 rounded-3xl bg-linear-to-r from-brand-800/30 via-[#1B1A55]/40 to-brand-800/30 border border-brand-500/25 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-active/20 flex items-center justify-center text-active shrink-0 border border-brand-500/30">
              <FiShield className="w-6 h-6 text-active" />
            </div>
            <div>
              <h4 className="font-['Outfit'] text-lg sm:text-xl font-extrabold text-foreground">
                Compare All 20+ Amenities & Claim Your 1-Day VIP Trial Pass
              </h4>
              <p className="font-['Inter'] text-xs sm:text-sm text-[#535C91] dark:text-[#9290C3] mt-0.5">
                Every membership tier includes our 30-Day Athletic Satisfaction Guarantee and zero enrollment fees.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-btn-bg text-btn-text font-bold text-xs sm:text-sm whitespace-nowrap shadow-md hover:opacity-90 transition-all cursor-pointer"
            >
              <span>Full Comparison</span>
              <FiArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/calculator#trial-pass"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-background dark:bg-[#1B1A55]/80 hover:bg-[#535C91]/20 text-foreground font-bold text-xs sm:text-sm border border-brand-500/25 transition-all cursor-pointer"
            >
              <span>Claim Free Pass</span>
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
