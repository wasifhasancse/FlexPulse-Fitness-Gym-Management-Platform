"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import {
  FiCompass,
  FiHome,
  FiLogIn,
  FiArrowRight,
  FiActivity,
  FiZap,
  FiCalendar,
  FiDollarSign,
} from "react-icons/fi";

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

const fadeLeft = {
  hidden: { opacity: 0, x: -40, filter: "blur(6px)" },
  visible: (d = 0) => ({
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, delay: d, ease: EASE },
  }),
};

const fadeRight = {
  hidden: { opacity: 0, x: 40 },
  visible: (d = 0) => ({
    opacity: 1,
    x: 0,
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
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const childFadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.48, ease: EASE } },
};

/* Quick-nav links */
const quickLinks = [
  { href: "/all-classes", label: "Browse Classes", icon: <FiActivity className="w-3.5 h-3.5" /> },
  { href: "/schedule",    label: "Schedule",        icon: <FiCalendar className="w-3.5 h-3.5" /> },
  { href: "/trainers",   label: "Coaches",          icon: <FiCompass className="w-3.5 h-3.5" /> },
  { href: "/pricing",    label: "Pricing",          icon: <FiDollarSign className="w-3.5 h-3.5" /> },
];

export default function NotFoundClient() {
  /* ── section refs ── */
  const leftRef  = useRef(null);
  const badgeRef = useRef(null);
  const textRef  = useRef(null);
  const ctaRef   = useRef(null);
  const linksRef = useRef(null);

  const leftIn  = useInView(leftRef,  { once: true, margin: "0px 0px -40px 0px" });
  const badgeIn = useInView(badgeRef, { once: true, margin: "0px 0px -40px 0px" });
  const textIn  = useInView(textRef,  { once: true, margin: "0px 0px -40px 0px" });
  const ctaIn   = useInView(ctaRef,   { once: true, margin: "0px 0px -40px 0px" });
  const linksIn = useInView(linksRef, { once: true, margin: "0px 0px -40px 0px" });

  return (
    <section className="relative min-h-[88vh] flex items-center overflow-hidden bg-background py-16 sm:py-20 px-4">

      {/* ── Ambient glow meshes ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden -z-10">
        <div className="absolute -right-40 top-1/4 h-[32rem] w-[32rem] rounded-full bg-active/8 blur-[130px] animate-pulse duration-[6000ms]" />
        <div className="absolute -left-32 bottom-1/4 h-96 w-96 rounded-full bg-brand-500/10 blur-[110px] animate-pulse duration-[8000ms]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-72 w-72 rounded-full bg-active/5 blur-[90px]" />
      </div>

      {/* ── Two-column grid ── */}
      <div className="w-11/12 mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

        {/* ════════════════ LEFT — Large Lottie ════════════════ */}
        <motion.div
          ref={leftRef}
          variants={fadeLeft}
          initial="hidden"
          animate={leftIn ? "visible" : "hidden"}
          custom={0}
          className="relative flex items-center justify-center order-2 lg:order-1"
        >
          {/* Decorative glow ring behind lottie */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div
              className="w-72 h-72 sm:w-96 sm:h-96 lg:w-[28rem] lg:h-[28rem] rounded-full border border-brand-500/15"
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            />
            <div className="absolute w-56 h-56 sm:w-72 sm:h-72 rounded-full bg-active/6 blur-[60px]" />
          </div>

          {/* Decorative corner stat cards — top-left */}
          <motion.div
            variants={scalePop}
            initial="hidden"
            animate={leftIn ? "visible" : "hidden"}
            custom={0.35}
            className="absolute top-4 left-4 sm:top-6 sm:left-0 z-10 px-3 py-2 rounded-2xl bg-white dark:bg-[#070F2B] border border-brand-500/20 shadow-sm flex items-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-active animate-pulse" />
            <span className="font-['Outfit'] text-[11px] font-bold text-foreground">Error 404</span>
          </motion.div>

          {/* Decorative corner stat card — bottom-right */}
          <motion.div
            variants={scalePop}
            initial="hidden"
            animate={leftIn ? "visible" : "hidden"}
            custom={0.45}
            className="absolute bottom-4 right-4 sm:bottom-6 sm:right-0 z-10 px-3 py-2 rounded-2xl bg-white dark:bg-[#070F2B] border border-brand-500/20 shadow-sm flex items-center gap-2"
          >
            <FiZap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="font-['Outfit'] text-[11px] font-bold text-foreground">Auto-redirect ready</span>
          </motion.div>

          {/* Lottie — full size */}
          <div className="w-full max-w-sm sm:max-w-md lg:max-w-full relative z-10">
            <DotLottieReact src="/not-found.lottie" loop autoplay />
          </div>
        </motion.div>

        {/* ════════════════ RIGHT — Content ════════════════ */}
        <div className="flex flex-col gap-7 order-1 lg:order-2">

          {/* Badge */}
          <motion.div
            ref={badgeRef}
            variants={scalePop}
            initial="hidden"
            animate={badgeIn ? "visible" : "hidden"}
            custom={0}
            className="flex items-center gap-2 self-start rounded-full border border-brand-500/25 bg-brand-500/10 px-4 py-1.5 shadow-xs hover:shadow-sm hover:border-active/50 transition-all duration-300 cursor-default"
          >
            <motion.span
              animate={{ rotate: [0, 20, -20, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            >
              <FiCompass size={13} className="text-active" />
            </motion.span>
            <span className="text-[11px] font-bold uppercase tracking-widest text-active">
              404 — Page Not Found
            </span>
          </motion.div>

          {/* Text block */}
          <div ref={textRef} className="flex flex-col gap-4">

            {/* Kicker line */}
            <motion.div
              variants={fadeRight}
              initial="hidden"
              animate={textIn ? "visible" : "hidden"}
              custom={0}
              className="flex items-center gap-2.5 font-['Outfit'] select-none"
            >
              <span className="h-[2px] w-8 bg-active rounded-full inline-block shrink-0" />
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-active">
                <span className="font-['Inter'] italic font-extrabold text-foreground mr-1.5">{"//"}</span>
                Navigation Error
              </p>
            </motion.div>

            {/* H1 */}
            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate={textIn ? "visible" : "hidden"}
              custom={0.08}
              className="font-['Outfit'] text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-foreground leading-[1.08]"
            >
              Oops!{" "}
              <span className="block">
                This page{" "}
                <motion.span
                  className="text-active inline-block"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                >
                  doesn&apos;t
                </motion.span>
              </span>
              <span className="text-active">exist.</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate={textIn ? "visible" : "hidden"}
              custom={0.16}
              className="font-['Inter'] text-sm sm:text-base leading-relaxed text-[#535C91] dark:text-[#9290C3] max-w-md"
            >
              The page you&apos;re looking for may have been moved, deleted, or never
              existed. Let&apos;s get you back on track with your athletic journey.
            </motion.p>

            {/* Divider */}
            <motion.div
              variants={fadeRight}
              initial="hidden"
              animate={textIn ? "visible" : "hidden"}
              custom={0.22}
              className="h-px bg-gradient-to-r from-brand-500/30 via-brand-500/10 to-transparent max-w-sm"
            />
          </div>

          {/* CTA Buttons */}
          <motion.div
            ref={ctaRef}
            variants={staggerContainer}
            initial="hidden"
            animate={ctaIn ? "visible" : "hidden"}
            className="flex flex-wrap gap-3"
          >
            {/* Type 1 Primary */}
            <motion.div variants={childFadeUp}>
              <Link
                href="/"
                className="group relative overflow-hidden inline-flex items-center justify-center gap-2.5 px-7 py-3.5 sm:px-8 sm:py-4 rounded-2xl bg-btn-bg text-btn-text font-extrabold text-sm shadow-sm hover:shadow-md hover:-translate-y-0.5 active:scale-95 transition-all duration-300 border border-white/25 hover:border-white/40 cursor-pointer"
              >
                <span className="absolute inset-0 w-1/2 h-full bg-linear-to-r from-transparent via-white/20 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-[250%] transition-transform duration-700 ease-out pointer-events-none" />
                <FiHome size={15} className="group-hover:scale-110 transition-transform duration-300 shrink-0" />
                <span>Back to Home</span>
              </Link>
            </motion.div>

            {/* Type 2 Secondary */}
            <motion.div variants={childFadeUp}>
              <Link
                href="/signin"
                className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 sm:px-8 sm:py-4 rounded-2xl bg-searchbox-bg hover:bg-searchbox-hover text-foreground font-bold text-sm border border-brand-500/25 hover:border-active/60 shadow-xs hover:shadow-md hover:-translate-y-0.5 active:scale-95 transition-all duration-300 cursor-pointer"
              >
                <FiLogIn size={15} className="group-hover:text-active transition-colors duration-200 shrink-0" />
                <span className="group-hover:text-active transition-colors duration-200">Sign In</span>
                <FiArrowRight className="w-3.5 h-3.5 text-active group-hover:translate-x-1 transition-transform duration-300 shrink-0" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Quick Navigation pills */}
          <div ref={linksRef} className="space-y-3">
            <motion.p
              variants={fadeRight}
              initial="hidden"
              animate={linksIn ? "visible" : "hidden"}
              custom={0}
              className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500"
            >
              Quick Navigation
            </motion.p>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate={linksIn ? "visible" : "hidden"}
              className="flex flex-wrap gap-2"
            >
              {quickLinks.map(({ href, label, icon }) => (
                <motion.div key={href} variants={childFadeUp}>
                  <Link
                    href={href}
                    className="group inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-transparent hover:bg-searchbox-bg text-foreground/70 hover:text-active border border-brand-500/20 hover:border-active/40 text-xs font-semibold active:scale-95 transition-all duration-200 cursor-pointer"
                  >
                    <span className="group-hover:scale-110 group-hover:rotate-6 transition-transform duration-200 text-active">{icon}</span>
                    <span>{label}</span>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
        {/* ════════════════ END RIGHT ════════════════ */}

      </div>
    </section>
  );
}
