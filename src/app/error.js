"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  FiAlertTriangle,
  FiRefreshCw,
  FiHome,
  FiZap,
  FiActivity,
  FiShield,
  FiArrowRight,
} from "react-icons/fi";
import Link from "next/link";

/* ─────────────────────────────────────────────
   Animation Variants
───────────────────────────────────────────── */
const EASE = [0.16, 1, 0.3, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 28, filter: "blur(4px)" },
  visible: (d = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.65, delay: d, ease: EASE },
  }),
};

const scalePop = {
  hidden: { opacity: 0, scale: 0.72 },
  visible: (d = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 260, damping: 20, delay: d },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const childFadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

const fadeLeft = {
  hidden: { opacity: 0, x: -28 },
  visible: (d = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, delay: d, ease: EASE },
  }),
};

const fadeRight = {
  hidden: { opacity: 0, x: 28 },
  visible: (d = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, delay: d, ease: EASE },
  }),
};

/* Status cards data */
const statusCards = [
  {
    icon: <FiShield className="w-4 h-4" />,
    label: "Your data is safe",
    color: "emerald",
    colorClass: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  },
  {
    icon: <FiActivity className="w-4 h-4" />,
    label: "System logging active",
    color: "amber",
    colorClass: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  },
  {
    icon: <FiZap className="w-4 h-4" />,
    label: "Auto-recovery triggered",
    color: "cyan",
    colorClass: "bg-cyan-500/10 text-cyan-500 border-cyan-500/20",
  },
];

export default function Error({ error, reset }) {
  const iconRef = useRef(null);
  const badgeRef = useRef(null);
  const textRef = useRef(null);
  const cardsRef = useRef(null);
  const errorRef = useRef(null);
  const ctaRef = useRef(null);
  const footerRef = useRef(null);

  const iconIn = useInView(iconRef, { once: true, margin: "0px 0px -40px 0px" });
  const badgeIn = useInView(badgeRef, { once: true, margin: "0px 0px -40px 0px" });
  const textIn = useInView(textRef, { once: true, margin: "0px 0px -40px 0px" });
  const cardsIn = useInView(cardsRef, { once: true, margin: "0px 0px -40px 0px" });
  const errorIn = useInView(errorRef, { once: true, margin: "0px 0px -40px 0px" });
  const ctaIn = useInView(ctaRef, { once: true, margin: "0px 0px -40px 0px" });
  const footerIn = useInView(footerRef, { once: true, margin: "0px 0px -40px 0px" });

  const errorMessage = error?.message || "An unexpected error occurred.";
  const errorDigest = error?.digest;

  return (
    <section className="relative flex min-h-[88vh] items-center justify-center overflow-hidden bg-background py-20 px-4">

      {/* Ambient glow meshes */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden -z-10">
        <div className="absolute -right-40 top-1/4 h-[30rem] w-[30rem] rounded-full bg-rose-500/8 blur-[120px] animate-pulse duration-[6000ms]" />
        <div className="absolute -left-40 bottom-1/3 h-96 w-96 rounded-full bg-amber-500/8 blur-[120px] animate-pulse duration-[8000ms]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-active/5 blur-[80px]" />
      </div>

      <div className="relative z-10 w-11/12 mx-auto max-w-xl flex flex-col items-center gap-8 text-center">

        {/* Animated icon */}
        <motion.div
          ref={iconRef}
          variants={scalePop}
          initial="hidden"
          animate={iconIn ? "visible" : "hidden"}
          custom={0}
          className="relative flex items-center justify-center"
        >
          {/* Pulsing ring layers */}
          <motion.div
            className="absolute w-28 h-28 rounded-full border-2 border-rose-500/20"
            animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0.2, 0.6] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute w-20 h-20 rounded-full border border-rose-500/30"
            animate={{ scale: [1, 1.1, 1], opacity: [0.8, 0.3, 0.8] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut", delay: 0.3 }}
          />

          {/* Icon core */}
          <div className="relative w-16 h-16 rounded-3xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center shadow-sm">
            <motion.div
              animate={{ rotate: [0, -8, 8, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            >
              <FiAlertTriangle className="w-8 h-8 text-rose-500" />
            </motion.div>
          </div>
        </motion.div>

        {/* Badge */}
        <motion.div
          ref={badgeRef}
          variants={fadeUp}
          initial="hidden"
          animate={badgeIn ? "visible" : "hidden"}
          custom={0.04}
          className="flex items-center gap-2 rounded-full border border-rose-500/25 bg-rose-500/10 px-5 py-2 shadow-xs hover:shadow-sm hover:border-active/50 transition-all duration-300"
        >
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-widest text-rose-500">
            System Error Detected
          </span>
        </motion.div>

        {/* Text block */}
        <div ref={textRef} className="flex flex-col gap-3">
          {/* Kicker */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            animate={textIn ? "visible" : "hidden"}
            custom={0}
            className="flex items-center justify-center gap-2.5 font-['Outfit'] select-none"
          >
            <span className="h-[2px] w-6 bg-rose-500 rounded-full inline-block" />
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-rose-500">
              <span className="font-['Inter'] italic font-extrabold text-foreground mr-1.5">//</span>
              Runtime Fault
            </p>
            <span className="h-[2px] w-6 bg-rose-500 rounded-full inline-block" />
          </motion.div>

          {/* H1 */}
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate={textIn ? "visible" : "hidden"}
            custom={0.08}
            className="font-['Outfit'] text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-foreground"
          >
            Something went{" "}
            <span className="text-active hover:animate-[headShake_1s_ease-in-out] inline-block cursor-default">
              wrong
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate={textIn ? "visible" : "hidden"}
            custom={0.16}
            className="font-['Inter'] text-sm leading-relaxed text-[#535C91] dark:text-[#9290C3] max-w-md mx-auto"
          >
            An unexpected runtime fault interrupted your session. Our telemetry systems
            have logged this incident. Try refreshing — most errors resolve automatically.
          </motion.p>
        </div>

        {/* Status cards */}
        <motion.div
          ref={cardsRef}
          variants={staggerContainer}
          initial="hidden"
          animate={cardsIn ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full"
        >
          {statusCards.map(({ icon, label, colorClass }, i) => (
            <motion.div
              key={label}
              variants={{
                hidden: { opacity: 0, y: 18, scale: 0.95 },
                visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, delay: i * 0.07, ease: EASE } },
              }}
              whileHover={{ y: -3, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className={`flex items-center justify-center gap-2 px-4 py-3 rounded-2xl border text-xs font-bold shadow-xs hover:shadow-sm transition-all duration-300 ${colorClass}`}
            >
              <motion.span
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ repeat: Infinity, duration: 2 + i * 0.5, ease: "easeInOut" }}
              >
                {icon}
              </motion.span>
              <span>{label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Error detail block */}
        <motion.div
          ref={errorRef}
          variants={fadeUp}
          initial="hidden"
          animate={errorIn ? "visible" : "hidden"}
          custom={0}
          className="w-full rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/90 dark:border-white/10 hover:border-brand-500/25 dark:hover:border-brand-500/25 p-4 sm:p-5 space-y-2 text-left transition-all duration-300 shadow-xs hover:shadow-sm"
        >
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            animate={errorIn ? "visible" : "hidden"}
            custom={0.06}
            className="flex items-center gap-2"
          >
            <span className="font-['Outfit'] font-bold text-xs uppercase tracking-wider text-foreground">
              Error Telemetry
            </span>
            <span className="px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-500 text-[10px] font-bold uppercase tracking-wider border border-rose-500/20">
              Runtime Exception
            </span>
          </motion.div>

          <motion.p
            variants={fadeRight}
            initial="hidden"
            animate={errorIn ? "visible" : "hidden"}
            custom={0.1}
            className="font-['Inter'] text-xs text-slate-500 dark:text-slate-400 leading-relaxed break-words"
          >
            {errorMessage}
          </motion.p>

          {errorDigest && (
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate={errorIn ? "visible" : "hidden"}
              custom={0.14}
              className="font-mono text-[11px] text-slate-400 dark:text-slate-500 pt-1 border-t border-slate-200/80 dark:border-white/[0.06]"
            >
              Digest: {errorDigest}
            </motion.p>
          )}
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          ref={ctaRef}
          variants={staggerContainer}
          initial="hidden"
          animate={ctaIn ? "visible" : "hidden"}
          className="flex w-full flex-col gap-3 sm:flex-row sm:justify-center"
        >
          {/* Type 1 Primary — Retry */}
          <motion.button
            variants={childFadeUp}
            type="button"
            onClick={() => reset?.()}
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
            className="group relative overflow-hidden flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-2xl bg-btn-bg text-btn-text font-extrabold text-sm shadow-sm hover:shadow-md hover:brightness-105 active:scale-95 transition-all duration-300 border border-white/25 hover:border-white/40 cursor-pointer"
          >
            <span className="absolute inset-0 w-1/2 h-full bg-linear-to-r from-transparent via-white/20 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-[250%] transition-transform duration-700 ease-out pointer-events-none" />
            <FiRefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500 shrink-0" />
            <span>Try Again</span>
          </motion.button>

          {/* Type 2 Secondary — Home */}
          <motion.div variants={childFadeUp}>
            <Link
              href="/"
              className="group flex items-center justify-center gap-2.5 rounded-2xl bg-searchbox-bg hover:bg-searchbox-hover text-foreground px-8 py-3.5 text-sm font-bold border border-brand-500/25 hover:border-active/60 shadow-xs hover:shadow-md hover:-translate-y-0.5 active:scale-95 transition-all duration-300 cursor-pointer"
            >
              <FiHome className="w-4 h-4 group-hover:text-active transition-colors duration-200 shrink-0" />
              <span className="group-hover:text-active transition-colors duration-200">Go to Homepage</span>
              <FiArrowRight className="w-3.5 h-3.5 text-active group-hover:translate-x-1 transition-transform duration-300 shrink-0" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Footer hint */}
        <motion.p
          ref={footerRef}
          variants={fadeUp}
          initial="hidden"
          animate={footerIn ? "visible" : "hidden"}
          custom={0}
          className="font-['Inter'] text-xs text-slate-400 dark:text-slate-500"
        >
          Persistent issues? Contact us at{" "}
          <a
            href="mailto:support@flexpulse.com"
            className="text-active hover:underline transition-colors duration-200"
          >
            support@flexpulse.com
          </a>
        </motion.p>
      </div>
    </section>
  );
}
