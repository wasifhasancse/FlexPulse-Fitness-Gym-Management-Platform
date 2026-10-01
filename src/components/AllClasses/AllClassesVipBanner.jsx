"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowRight, FiZap, FiMessageSquare } from "react-icons/fi";

const TRANSITION_EASE = [0.16, 1, 0.3, 1];

const bannerShellVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1.1,
      ease: TRANSITION_EASE,
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const bannerItemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: TRANSITION_EASE },
  },
};

const bannerBtnVariants = {
  hidden: { opacity: 0, scale: 0.92, y: 14 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 180, damping: 20 },
  },
};

export default function AllClassesVipBanner() {
  return (
    <motion.div
      variants={bannerShellVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="mt-16 sm:mt-20 rounded-3xl bg-card-bg border border-brand-500/20 shadow-sm p-6 sm:p-10 lg:p-12 relative overflow-hidden transition-all duration-300"
    >
      {/* Background Ambient Glows */}
      <div className="absolute top-0 right-0 w-80 sm:w-96 h-80 sm:h-96 bg-active/8 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-500/8 rounded-full blur-[90px] pointer-events-none -z-10" />

      <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 sm:gap-8">
        
        {/* Left Content */}
        <div className="max-w-2xl space-y-2.5">
          <motion.div variants={bannerItemVariants}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-500/10 border border-brand-500/25 text-[10px] font-extrabold uppercase tracking-widest text-foreground font-['Outfit']">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-active opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-active" />
              </span>
              Begin Your Progression
            </div>
          </motion.div>

          <motion.h3
            variants={bannerItemVariants}
            className="font-['Outfit'] text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground tracking-tight leading-tight"
          >
            Claim a Complimentary{" "}
            <span className="text-active inline-block hover:animate-[headShake_1s_ease-in-out]">
              1-Day VIP Pass
            </span>
          </motion.h3>

          <motion.p
            variants={bannerItemVariants}
            className="text-xs sm:text-sm text-secondary font-['Inter'] leading-relaxed max-w-xl"
          >
            Experience any group masterclass, access recovery suites, and receive a complete biomechanical intake scan with no financial commitment.
          </motion.p>
        </div>

        {/* Right CTA Buttons (Strict 3-Type Button Rule: Type 1 & Type 2) */}
        <motion.div
          variants={bannerBtnVariants}
          className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto shrink-0"
        >
          {/* Type 1 Primary High-Voltage Athletic CTA */}
          <Link
            href="/calculator#trial-pass"
            className="relative overflow-hidden inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-btn-bg text-btn-text font-extrabold rounded-2xl shadow-sm hover:shadow-md transform hover:-translate-y-0.5 hover:brightness-105 active:scale-95 transition-all duration-300 text-xs sm:text-sm border border-white/25 cursor-pointer group text-center"
          >
            <FiZap className="w-4 h-4 text-btn-text group-hover:scale-110 transition-transform shrink-0" />
            <span>Claim Free VIP Pass</span>
            <FiArrowRight className="w-4 h-4 text-btn-text group-hover:translate-x-1 transition-transform shrink-0" />
          </Link>

          {/* Type 2 Secondary / Glass Athletic CTA */}
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-searchbox-bg hover:bg-searchbox-hover text-foreground font-bold rounded-2xl border border-brand-500/25 hover:border-active/60 shadow-xs hover:shadow-md transform hover:-translate-y-0.5 active:scale-95 transition-all duration-300 text-xs sm:text-sm cursor-pointer text-center"
          >
            <FiMessageSquare className="w-4 h-4 text-active shrink-0" />
            <span>Talk to Advisor</span>
          </Link>
        </motion.div>

      </div>
    </motion.div>
  );
}
