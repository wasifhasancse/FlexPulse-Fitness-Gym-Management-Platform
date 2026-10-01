"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FiUserPlus, FiCheckCircle, FiAward, FiArrowRight } from "react-icons/fi";

const bannerContainerVariants = {
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

const bannerItemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: "easeOut" },
  },
};

export default function TrainersRecruitmentBanner() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  return (
    <section ref={containerRef} className="pt-8 sm:pt-12">
      <motion.div
        variants={bannerContainerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="relative overflow-hidden rounded-3xl p-7 sm:p-10 bg-linear-to-br from-card-bg via-card-bg to-brand-900/40 dark:from-[#070F2B] dark:via-[#0c1236] dark:to-[#17152f] border border-brand-500/25 shadow-sm hover:border-active/40 transition-all duration-500"
      >
        {/* Subtle Ambient Radial Highlight */}
        <div className="absolute top-0 right-0 w-80 sm:w-96 h-80 sm:h-96 bg-active/10 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 sm:gap-8 relative z-10">
          <div className="space-y-3 max-w-2xl">
            {/* Kicker Tag */}
            <motion.div variants={bannerItemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-active/10 border border-active/30 text-active text-[10px] sm:text-[11px] font-extrabold uppercase tracking-widest font-['Outfit']">
              <FiAward className="w-3.5 h-3.5" />
              <span>Coaching Faculty Recruitment</span>
            </motion.div>

            {/* Headline */}
            <motion.h3 variants={bannerItemVariants} className="font-['Outfit'] text-2xl sm:text-3xl lg:text-4xl font-black text-foreground tracking-tight leading-tight">
              Are You an Elite Athletic <span className="text-active">Performance Coach?</span>
            </motion.h3>

            {/* Description */}
            <motion.p variants={bannerItemVariants} className="font-['Inter'] text-xs sm:text-sm text-secondary leading-relaxed max-w-xl">
              We provide Olympic-grade infrastructure, integrated 3D biometric tracking telemetry, and guaranteed client flow. Join our accredited faculty roster.
            </motion.p>

            {/* Micro Feature Perks */}
            <motion.div variants={bannerItemVariants} className="flex flex-wrap items-center gap-4 pt-1 text-xs text-foreground/90 font-bold font-['Inter']">
              <span className="flex items-center gap-1.5">
                <FiCheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                Performance Telemetry
              </span>
              <span className="flex items-center gap-1.5">
                <FiCheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                Guaranteed Scheduling
              </span>
              <span className="flex items-center gap-1.5">
                <FiCheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                Master CSCS Continuing Ed
              </span>
            </motion.div>
          </div>

          {/* Action Button: Strict Type 1 Primary High-Voltage Athletic CTA */}
          <motion.div variants={bannerItemVariants} className="shrink-0 w-full sm:w-auto">
            <Link href="/dashboard/member/apply-trainer" className="w-full sm:w-auto block">
              <span className="relative overflow-hidden inline-flex items-center justify-center gap-2.5 w-full sm:w-auto px-7 py-3.5 sm:px-8 sm:py-4 bg-btn-bg text-btn-text font-extrabold rounded-2xl shadow-sm hover:shadow-md transform hover:-translate-y-0.5 hover:brightness-105 active:scale-95 transition-all duration-300 text-xs sm:text-sm border border-white/25 cursor-pointer group">
                {/* Kinetic Light-Beam Sweep */}
                <span className="absolute inset-0 w-1/2 h-full bg-linear-to-r from-transparent via-white/20 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-[250%] transition-transform duration-700 ease-out pointer-events-none" />
                <FiUserPlus className="w-4 h-4 text-btn-text group-hover:scale-110 transition-transform duration-300" />
                <span>Apply as a Trainer</span>
                <FiArrowRight className="w-4 h-4 text-btn-text group-hover:translate-x-1 transition-transform duration-200" />
              </span>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
