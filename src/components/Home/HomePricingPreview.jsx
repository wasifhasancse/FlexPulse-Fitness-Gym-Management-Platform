"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, LayoutGroup, useInView } from "framer-motion";
import AnimatedSectionTitle from "@/components/common/AnimatedSectionTitle";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  FiCheck,
  FiArrowRight,
  FiShield,
  FiStar,
  FiAward,
  FiZap,
} from "react-icons/fi";
import { FaFire } from "react-icons/fa";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

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

// ─── Framer-Motion Variants ──────────────────────────────────────────────────

// Pricing cards grid container — stagger children
const pricingGridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.16 },
  },
};

// Each pricing card shell — slow cinematic entrance
const pricingCardVariants = {
  hidden: { opacity: 0, y: 36, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1.6,
      ease: TRANSITION_EASE,
      staggerChildren: 0.1,
      delayChildren: 0.14,
    },
  },
};

// Popular floating badge — kinetic spring pop from above
const popularBadgeVariants = {
  hidden: { opacity: 0, y: -18, scale: 0.7 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 180, damping: 18 },
  },
};

// Tier name — majestic upward sweep + blur clear
const tierNameVariants = {
  hidden: { opacity: 0, y: 20, filter: "blur(5px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.5, ease: TRANSITION_EASE },
  },
};

// Tier badge pill — x-slide from right
const tierBadgePillVariants = {
  hidden: { opacity: 0, x: 22, scale: 0.88 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 140, damping: 20 },
  },
};

// Description paragraph — contrasting downward drop from above
const tierDescVariants = {
  hidden: { opacity: 0, y: -18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.3, ease: "easeOut" },
  },
};

// Price block container — horizontal slide from left
const priceBlockVariants = {
  hidden: { opacity: 0, x: -22, scale: 0.94 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 1.4, ease: TRANSITION_EASE },
  },
};

// Feature list label — diagonal from bottom-left
const featLabelVariants = {
  hidden: { opacity: 0, x: -14, y: 8 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 1.2, ease: "easeOut" },
  },
};

// Each feature row — staggered upward spring
const featRowVariants = {
  hidden: { opacity: 0, y: 12, x: -8 },
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: { type: "spring", stiffness: 150, damping: 22 },
  },
};

// Feature rows container — stagger
const featureListContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
  },
};

// CTA Button — spring pop from bottom-right diagonal
const ctaBtnVariants = {
  hidden: { opacity: 0, x: 16, y: 16, scale: 0.88 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 130, damping: 20 },
  },
};

// ─── Trust Banner Variants ───────────────────────────────────────────────────
const bannerContainerVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1.5,
      ease: TRANSITION_EASE,
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const bannerIconVariants = {
  hidden: { opacity: 0, scale: 0.3, rotate: -18 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { type: "spring", stiffness: 140, damping: 18 },
  },
};

const bannerTitleVariants = {
  hidden: { opacity: 0, y: 18, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.4, ease: TRANSITION_EASE },
  },
};

const bannerSubVariants = {
  hidden: { opacity: 0, y: -14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, ease: "easeOut" },
  },
};

const bannerBtn1Variants = {
  hidden: { opacity: 0, x: 28, scale: 0.9 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 140, damping: 20 },
  },
};

const bannerBtn2Variants = {
  hidden: { opacity: 0, x: 14, scale: 0.92 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 120, damping: 22, delay: 0.08 },
  },
};

// ─── Component ───────────────────────────────────────────────────────────────
export default function HomePricingPreview() {
  const [billingCycle, setBillingCycle] = useState("monthly");

  const sectionRef = useRef(null);
  const cardsGridRef = useRef(null);
  const isCardsInView = useInView(cardsGridRef, { once: true, amount: 0.12 });
  const [cardsTriggered, setCardsTriggered] = useState(false);

  // Universal Staged Viewport Delay: trigger pricing cards after 1.1s in viewport
  useEffect(() => {
    if (isCardsInView) {
      const timer = setTimeout(() => setCardsTriggered(true), 1100);
      return () => clearTimeout(timer);
    }
  }, [isCardsInView]);

  // GSAP viewport-triggered timeline for section header elements
  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          once: true,
        },
        defaults: { ease: "power3.out" },
      });

      // 1. Kicker badge — dignified downward arrival + blur clear (1.6s)
      tl.fromTo(
        ".pricing-kicker",
        { y: -30, opacity: 0, filter: "blur(6px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.6, ease: "power2.out" }
      ).addLabel("kickerEnd");

      // 2. Main title — slow majestic upward sweep + de-blur + micro scale (2.2s)
      tl.fromTo(
        ".pricing-title",
        { y: 48, opacity: 0, filter: "blur(8px)", scale: 0.96 },
        { y: 0, opacity: 1, filter: "blur(0px)", scale: 1, duration: 2.2, ease: "power3.out" },
        "kickerEnd-=0.4"
      ).addLabel("titleEnd");

      // 3. Subtitle paragraph — contrasting downward drop from above (1.8s)
      tl.fromTo(
        ".pricing-subtitle",
        { y: -28, opacity: 0, filter: "blur(5px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.8, ease: "power2.out" },
        "titleEnd-=0.3"
      ).addLabel("subtitleEnd");

      // 4. Billing toggle — spring slide from right (1.5s)
      tl.fromTo(
        ".pricing-billing-toggle",
        { x: 36, opacity: 0, scale: 0.88 },
        { x: 0, opacity: 1, scale: 1, duration: 1.5, ease: "back.out(1.3)" },
        "subtitleEnd-=0.25"
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="py-20 lg:py-28 bg-linear-to-b from-background via-[#1B1A55]/10 to-background border-t border-brand-500/15 relative overflow-hidden transition-colors duration-300"
    >
      {/* Background Ambient Lighting Mesh */}
      <div className="absolute top-1/4 left-1/10 w-96 sm:w-140 h-96 sm:h-140 bg-active/6 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-0 w-80 sm:w-120 h-80 sm:h-120 bg-brand-500/8 rounded-full blur-[130px] pointer-events-none -z-10" />

      <div className="w-11/12 mx-auto relative z-10">

        {/* ── Section Header (GSAP-driven element-by-element) ── */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18 space-y-4">
          <div className="space-y-3 flex flex-col items-center">
            {/* Kicker Badge */}
            <div className="pricing-kicker inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100/90 dark:bg-white/10 border border-slate-200/80 dark:border-white/10 text-xs font-bold tracking-wide shadow-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-active opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-active" />
              </span>
              <span className="text-active uppercase tracking-wider font-extrabold text-[11px]">
                Transparent Memberships
              </span>
              <span className="text-slate-500 dark:text-slate-400">
                • Zero Long-Term Contracts
              </span>
            </div>

            {/* Headline */}
            <h2 className="pricing-title text-3xl sm:text-4xl lg:text-5xl font-extrabold font-['Outfit'] tracking-tight text-foreground leading-[1.12]">
              Invest in Your{" "}
              <span className="text-active inline-block transition-transform hover:scale-105 duration-200 cursor-default">
                Transformation
              </span>
            </h2>

            {/* Subtitle */}
            <p className="pricing-subtitle text-xs sm:text-sm lg:text-base text-slate-500 dark:text-slate-400 font-['Inter'] leading-relaxed pt-0.5 max-w-2xl mx-auto">
              Transparent pricing with no hidden enrollment fees. Pause, upgrade, or cancel your membership anytime with zero friction.
            </p>
          </div>

          {/* Billing Cycle Toggle — GSAP horizontal slide from right */}
          <LayoutGroup id="homePricingCycleGroup">
            <motion.div
              layout
              className="pricing-billing-toggle inline-flex items-center p-1.5 rounded-2xl bg-[#535C91]/10 dark:bg-[#1B1A55]/80 border border-brand-500/20 font-['Inter'] text-xs sm:text-sm font-bold shrink-0 whitespace-nowrap select-none shadow-sm mt-3"
            >
              {/* Monthly Tab */}
              <button
                type="button"
                onClick={() => setBillingCycle("monthly")}
                className="relative px-5 py-2.5 rounded-xl transition-colors duration-200 cursor-pointer whitespace-nowrap"
              >
                {billingCycle === "monthly" && (
                  <motion.span
                    layoutId="activeHomePricingCyclePill"
                    className="absolute inset-0 bg-active rounded-xl shadow-xs"
                    transition={{ type: "spring", stiffness: 450, damping: 35 }}
                  />
                )}
                <span
                  className={`relative z-10 ${
                    billingCycle === "monthly"
                      ? "text-white font-extrabold"
                      : "text-[#535C91] dark:text-[#9290C3] hover:text-foreground"
                  }`}
                >
                  Billed Monthly
                </span>
              </button>

              {/* Annual Tab */}
              <button
                type="button"
                onClick={() => setBillingCycle("annual")}
                className="relative px-5 py-2.5 rounded-xl transition-colors duration-200 cursor-pointer whitespace-nowrap inline-flex items-center gap-2"
              >
                {billingCycle === "annual" && (
                  <motion.span
                    layoutId="activeHomePricingCyclePill"
                    className="absolute inset-0 bg-active rounded-xl shadow-xs"
                    transition={{ type: "spring", stiffness: 450, damping: 35 }}
                  />
                )}
                <span
                  className={`relative z-10 ${
                    billingCycle === "annual"
                      ? "text-white font-extrabold"
                      : "text-[#535C91] dark:text-[#9290C3] hover:text-foreground"
                  }`}
                >
                  Billed Annually
                </span>
                <span className="relative z-10 px-2 py-0.5 rounded-md bg-amber-400 text-black text-[10px] font-black uppercase tracking-wider shadow-xs animate__animated animate__heartBeat animate__infinite animate__slower">
                  Save 20%
                </span>
              </button>
            </motion.div>
          </LayoutGroup>
        </div>

        {/* ── Pricing Cards Grid — Viewport-Gated, Element-by-Element ── */}
        <div ref={cardsGridRef}>
          <motion.div
            layout
            variants={pricingGridVariants}
            initial="hidden"
            animate={cardsTriggered ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-3 gap-7 lg:gap-8 items-stretch"
          >
            <AnimatePresence mode="popLayout">
              {TIERS.map((tier) => {
                const price =
                  billingCycle === "monthly" ? tier.monthlyPrice : tier.annualPrice;
                const isAnnual = billingCycle === "annual";

                return (
                  <motion.div
                    key={`${billingCycle}-${tier.id}`}
                    layout
                    variants={pricingCardVariants}
                    exit={{ opacity: 0, scale: 0.92, y: 14, transition: { duration: 0.28 } }}
                    className="flex"
                  >
                    <div
                      className={`group relative rounded-3xl p-7 sm:p-8 flex flex-col justify-between w-full transition-all duration-300 ease-out hover:-translate-y-1.5 ${
                        tier.highlight
                          ? "bg-white dark:bg-[#070F2B] border-2 border-active shadow-sm ring-4 ring-active/10"
                          : "bg-white dark:bg-[#070F2B] border border-brand-500/20 hover:border-active/60 shadow-xs hover:shadow-md"
                      }`}
                    >
                      {/* Popular Floating Badge — spring pop from above */}
                      {tier.popular && (
                        <motion.div
                          variants={popularBadgeVariants}
                          className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-active text-white text-[11px] font-black uppercase tracking-wider shadow-md flex items-center gap-1.5 whitespace-nowrap animate__animated animate__pulse animate__infinite"
                        >
                          <FaFire className="w-3 h-3 text-amber-300" />
                          <span>{tier.badge}</span>
                        </motion.div>
                      )}

                      <div>
                        {/* Header Row: Title + Tier Badge */}
                        <div className="flex justify-between items-center mb-3">
                          {/* Tier Name — majestic upward sweep + blur clear */}
                          <motion.h3
                            variants={tierNameVariants}
                            className="font-['Outfit'] text-2xl font-black text-foreground group-hover:text-active transition-colors"
                          >
                            {tier.name}
                          </motion.h3>

                          {/* Non-popular badge pill — x-slide from right */}
                          {!tier.popular && (
                            <motion.span
                              variants={tierBadgePillVariants}
                              className="text-[10px] font-extrabold px-2.5 py-1 rounded-lg bg-[#535C91]/10 dark:bg-[#1B1A55]/70 text-active uppercase tracking-wider border border-brand-500/20"
                            >
                              {tier.badge}
                            </motion.span>
                          )}
                        </div>

                        {/* Description — contrasting downward drop from above */}
                        <motion.p
                          variants={tierDescVariants}
                          className="text-xs text-[#535C91] dark:text-[#9290C3] font-['Inter'] mb-6 leading-relaxed"
                        >
                          {tier.description}
                        </motion.p>

                        {/* Price Block — horizontal slide from left */}
                        <motion.div
                          variants={priceBlockVariants}
                          className="p-4 rounded-2xl bg-[#535C91]/5 dark:bg-[#1B1A55]/30 border border-brand-500/15 mb-6"
                        >
                          <div className="flex items-baseline gap-1 font-['Outfit']">
                            <span className="text-xl font-black text-active">$</span>
                            <AnimatePresence mode="wait">
                              <motion.span
                                key={`${tier.id}-${price}`}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                transition={{ duration: 0.22 }}
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
                            {isAnnual
                              ? tier.billingNote
                              : "Billed monthly, pause or cancel anytime"}
                          </p>
                        </motion.div>

                        {/* Feature List — staggered upward rows */}
                        <motion.div
                          variants={featureListContainerVariants}
                          className="space-y-3 font-['Inter'] text-xs sm:text-sm text-foreground/90 mb-8"
                        >
                          {/* Label — diagonal from bottom-left */}
                          <motion.p
                            variants={featLabelVariants}
                            className="text-[10px] font-extrabold uppercase tracking-wider text-[#535C91] dark:text-[#9290C3] pb-1"
                          >
                            Membership Privileges:
                          </motion.p>

                          {tier.features.map((feat, fIdx) => (
                            <motion.div
                              key={fIdx}
                              variants={featRowVariants}
                              className="flex items-start gap-2.5"
                            >
                              <div className="p-0.5 rounded-full bg-active/15 text-active shrink-0 mt-0.5">
                                <FiCheck className="w-3.5 h-3.5 text-active" />
                              </div>
                              <span className="text-xs leading-relaxed text-[#535C91] dark:text-[#9290C3]">
                                {feat}
                              </span>
                            </motion.div>
                          ))}
                        </motion.div>
                      </div>

                      {/* CTA Button — spring diagonal pop from bottom-right */}
                      <motion.div variants={ctaBtnVariants}>
                        <Link
                          href="/pricing"
                          className={`w-full py-3.5 px-4 rounded-xl font-extrabold text-xs sm:text-sm text-center transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5 shadow-sm hover:shadow-md ${
                            tier.popular
                              ? "bg-btn-bg text-btn-text hover:opacity-95 hover:scale-[1.01]"
                              : "bg-[#535C91]/15 dark:bg-[#1B1A55] text-foreground hover:border-active/60 border border-brand-500/20 hover:bg-[#535C91]/20"
                          }`}
                        >
                          <span>{tier.cta}</span>
                          <FiArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </motion.div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* ── Bottom Trust Banner — Fully Animated ── */}
        <motion.div
          variants={bannerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-14 sm:mt-18 p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#070F2B] border border-brand-500/20 hover:border-active/40 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs relative overflow-hidden transition-colors duration-300"
        >
          {/* Subtle gradient accent shimmer */}
          <div className="absolute inset-0 bg-linear-to-r from-brand-500/5 via-transparent to-active/5 pointer-events-none" />

          <div className="flex items-center gap-4 relative z-10">
            {/* Icon — spring scale pop with rotation */}
            <motion.div
              variants={bannerIconVariants}
              className="w-12 h-12 rounded-2xl bg-active/10 dark:bg-active/20 flex items-center justify-center text-active shrink-0 border border-active/25 shadow-2xs"
            >
              <FiShield className="w-6 h-6 text-active" />
            </motion.div>

            <div>
              {/* Banner title — upward sweep + blur clear */}
              <motion.h4
                variants={bannerTitleVariants}
                className="font-['Outfit'] text-lg sm:text-xl font-extrabold text-foreground"
              >
                Compare All 20+ Amenities &amp; Claim Your 1-Day VIP Trial Pass
              </motion.h4>

              {/* Banner subtitle — contrasting downward drop */}
              <motion.p
                variants={bannerSubVariants}
                className="font-['Inter'] text-xs sm:text-sm text-[#535C91] dark:text-[#9290C3] mt-0.5"
              >
                Every membership tier includes our 30-Day Athletic Satisfaction
                Guarantee and zero enrollment fees.
              </motion.p>
            </div>
          </div>

          {/* Buttons — staggered spring slides from right */}
          <div className="flex items-center gap-3 shrink-0 relative z-10">
            <motion.div variants={bannerBtn1Variants}>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-btn-bg text-btn-text font-extrabold text-xs sm:text-sm whitespace-nowrap shadow-sm hover:shadow-md hover:brightness-105 active:scale-95 transition-all cursor-pointer border border-white/20"
              >
                <span>Full Comparison</span>
                <FiArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            <motion.div variants={bannerBtn2Variants}>
              <Link
                href="/calculator#trial-pass"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-background dark:bg-[#1B1A55]/80 hover:bg-[#535C91]/20 text-foreground font-bold text-xs sm:text-sm border border-brand-500/25 hover:border-active/50 transition-all cursor-pointer"
              >
                <span>Claim Free Pass</span>
              </Link>
            </motion.div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

