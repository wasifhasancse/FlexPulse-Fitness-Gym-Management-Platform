"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FiCalendar, FiArrowRight, FiShield } from "react-icons/fi";

const bannerVariants = {
  hidden: { opacity: 0, y: 35, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1.1,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const bannerContentVariants = {
  hidden: { opacity: 0, x: -25 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

const bannerBtnVariants = {
  hidden: { opacity: 0, x: 25, scale: 0.95 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 200, damping: 20 },
  },
};

export default function FacilitiesVipBanner({ onOpenTourModal }) {
  const bannerRef = useRef(null);
  const isInView = useInView(bannerRef, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={bannerRef}
      variants={bannerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="relative p-6 sm:p-8 rounded-3xl bg-brand-900/40 dark:bg-[#121026]/75 border border-brand-500/20 backdrop-blur-xl shadow-xs overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6"
    >
      {/* Background Subtle Gradient Flare */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-active/5 dark:bg-active/10 blur-[90px] rounded-full pointer-events-none -z-10" />

      {/* Left: Copy & Tag */}
      <motion.div variants={bannerContentVariants} className="space-y-2 text-center md:text-left">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-active/10 border border-active/30 text-active font-['Inter'] text-[10px] sm:text-xs font-black uppercase tracking-wider">
          <FiShield className="w-3 h-3" />
          <span>Tour & Guest Pass Privileges</span>
        </div>
        <h2 className="font-['Outfit'] text-xl sm:text-2xl lg:text-3xl font-black text-foreground tracking-tight">
          Experience FlexPulse Campus in Person
        </h2>
        <p className="font-['Inter'] text-xs sm:text-sm text-secondary max-w-xl leading-relaxed">
          Book a complimentary facility walk-through and trial workout session with one of our certified master trainers today. Complimentary 1-day pass included.
        </p>
      </motion.div>

      {/* Right: Strict 3-Type Button Hierarchy */}
      <motion.div
        variants={bannerBtnVariants}
        className="flex items-center gap-3 shrink-0 flex-wrap justify-center"
      >
        {/* Type 2 Secondary Glass Athletic CTA */}
        <Link
          href="/pricing"
          className="px-4 py-2.5 rounded-2xl border border-brand-500/25 bg-searchbox-bg hover:bg-searchbox-hover hover:border-active/60 text-foreground font-['Inter'] text-xs sm:text-sm font-bold transition-all shadow-2xs"
        >
          View Memberships
        </Link>

        {/* Type 1 Primary High-Voltage Athletic CTA */}
        <button
          type="button"
          onClick={onOpenTourModal}
          className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-btn-bg text-btn-text font-['Inter'] text-xs sm:text-sm font-black shadow-xs hover:shadow-md transition-all duration-300 overflow-hidden group hover:scale-102 cursor-pointer"
        >
          <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />
          <FiCalendar className="w-4 h-4 relative z-10 text-btn-text" />
          <span className="relative z-10">Schedule VIP Walkthrough</span>
          <FiArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
        </button>
      </motion.div>
    </motion.div>
  );
}
