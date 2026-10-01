"use client";

import { motion } from "framer-motion";
import {
  FiZap,
  FiAward,
  FiShield,
  FiCheckCircle,
} from "react-icons/fi";

const TRANSITION_EASE = [0.16, 1, 0.3, 1];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: 24, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.1, ease: TRANSITION_EASE },
  },
};

const featureCardVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 180,
      damping: 20,
      staggerChildren: 0.06,
    },
  },
};

const iconVariants = {
  hidden: { opacity: 0, scale: 0.6, rotate: -20 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { type: "spring", stiffness: 220, damping: 18 },
  },
};

const titleVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: TRANSITION_EASE },
  },
};

const descVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const FEATURES = [
  {
    icon: FiZap,
    iconColor: "text-active",
    iconBg: "bg-active/10 border-active/20",
    title: "Telemetry Heart Tracking",
    desc: "Real-time zone feedback displayed on overhead displays to keep you in the optimal aerobic and anaerobic zones.",
  },
  {
    icon: FiAward,
    iconColor: "text-emerald-400",
    iconBg: "bg-emerald-500/10 border-emerald-500/20",
    title: "Collegiate & CSCS Coaches",
    desc: "Direct cueing on bar paths, spinal hygiene, and kinetic chain mechanics from credentialed masters.",
  },
  {
    icon: FiShield,
    iconColor: "text-cyan-400",
    iconBg: "bg-cyan-500/10 border-cyan-500/20",
    title: "Recovery Suite Access",
    desc: "Every class pass grants post-workout access to sub-zero cold plunge tubs and Finnish cedar saunas.",
  },
  {
    icon: FiCheckCircle,
    iconColor: "text-purple-400",
    iconBg: "bg-purple-500/10 border-purple-500/20",
    title: "Zero Cancellation Hassle",
    desc: "Reschedule up to 2 hours prior to class commencement directly from your athlete dashboard.",
  },
];

export default function AllClassesFeatures() {
  return (
    <section className="mt-20 sm:mt-24 pt-12 sm:pt-16 border-t border-brand-500/15">
      {/* Section Header */}
      <motion.div
        variants={headerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="text-center max-w-xl mx-auto mb-10 sm:mb-12 space-y-2"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/25 text-[11px] font-extrabold uppercase tracking-widest text-foreground font-['Outfit']">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-active opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-active" />
          </span>
          The FlexPulse Standard
        </div>
        <h2 className="font-['Outfit'] text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">
          Engineered for Real Physical Adaptations
        </h2>
        <p className="text-xs sm:text-sm text-secondary font-['Inter'] leading-relaxed">
          Every session is underpinned by strict biomechanical science, certified coaching, and recovery infrastructure.
        </p>
      </motion.div>

      {/* 4 Feature Cards Grid with Staggered Triggered Transitions */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6"
      >
        {FEATURES.map((feat, idx) => {
          const Icon = feat.icon;
          return (
            <motion.div
              key={idx}
              variants={featureCardVariants}
              whileHover={{ y: -4, scale: 1.02 }}
              className="p-6 sm:p-7 rounded-3xl bg-card-bg border border-brand-500/20 hover:border-active/50 shadow-sm transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <motion.div
                  variants={iconVariants}
                  className={`w-12 h-12 rounded-2xl ${feat.iconBg} ${feat.iconColor} border flex items-center justify-center mb-5 shadow-xs`}
                >
                  <Icon className="w-6 h-6" />
                </motion.div>
                
                <motion.h4
                  variants={titleVariants}
                  className="font-['Outfit'] font-bold text-lg text-foreground mb-2 leading-snug"
                >
                  {feat.title}
                </motion.h4>
                
                <motion.p
                  variants={descVariants}
                  className="text-xs text-secondary font-['Inter'] leading-relaxed"
                >
                  {feat.desc}
                </motion.p>
              </div>

              <div className="pt-4 mt-4 border-t border-brand-500/10 flex items-center gap-1.5 text-[11px] font-bold text-active">
                <span>Verified Standard</span>
                <FiCheckCircle className="w-3 h-3" />
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
