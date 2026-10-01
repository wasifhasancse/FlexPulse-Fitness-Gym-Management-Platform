"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import AnimatedSectionTitle from "@/components/common/AnimatedSectionTitle";
import {
  FaBolt,
  FaCheckCircle,
  FaClock,
  FaCommentDots,
  FaFire,
  FaPlus,
  FaSearch,
  FaShieldAlt,
  FaTrophy,
  FaUsers,
} from "react-icons/fa";

// ── In-View Smooth Telemetry Number Counter ─────────────────────────────────
function AnimatedTelemetryNumber({ value, prefix = "", suffix = "", duration = 2.2 }) {
  const [displayValue, setDisplayValue] = useState(0);
  const counterRef = useRef(null);
  const isInView = useInView(counterRef, { once: true, amount: 0.2 });

  useEffect(() => {
    if (!isInView) return;
    const target = typeof value === "number" ? value : parseInt(value, 10) || 0;
    if (target === 0) {
      setDisplayValue(0);
      return;
    }
    const startTime = performance.now();
    let frameId;
    const animate = (now) => {
      const elapsed = (now - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.floor(eased * target));
      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      } else {
        setDisplayValue(target);
      }
    };
    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [isInView, value, duration]);

  return (
    <span ref={counterRef}>
      {prefix}
      {displayValue.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function ForumHero({ totalPosts = 12 }) {
  const router = useRouter();
  const [heroSearch, setHeroSearch] = useState("");

  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true, amount: 0.15 });

  const handleHeroSearchSubmit = (e) => {
    e.preventDefault();
    if (heroSearch.trim()) {
      router.push(`/forum?search=${encodeURIComponent(heroSearch.trim())}`);
    }
  };

  const quickTags = [
    { label: "Zone 2 Cardio", query: "Zone 2" },
    { label: "Carb Timing", query: "Macro" },
    { label: "Squat Depth", query: "Squat" },
    { label: "CNS Recovery", query: "Sleep" },
    { label: "Metabolic HIIT", query: "Metabolic" },
  ];

  return (
    <motion.section
      ref={heroRef}
      initial={{ opacity: 0, y: 28 }}
      animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      className="relative overflow-hidden rounded-3xl bg-linear-to-br from-brand-900/10 via-white to-brand-500/10 dark:from-[#0B1026] dark:via-[#111638] dark:to-[#070F2B] border border-brand-500/25 p-6 sm:p-10 lg:p-12 mb-12 shadow-md transition-all"
    >
      {/* Dynamic Background Atmosphere Glow */}
      <div className="absolute top-0 right-10 w-96 h-96 bg-active/15 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-brand-500/15 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Grid Texture Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left Side: Editorial & Search (7 Cols on lg) */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          {/* 1. Member Avatars & Live Status Badge (Downward Arrival) */}
          <motion.div
            initial={{ opacity: 0, y: -24 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -24 }}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex flex-wrap items-center gap-3 p-1.5 pr-4 rounded-full bg-white/80 dark:bg-[#1B1A55]/60 border border-brand-500/20 backdrop-blur-md shadow-xs mb-6"
          >
            <div className="flex -space-x-2 overflow-hidden">
              <motion.div
                initial={{ scale: 0.6, rotate: -10 }}
                animate={isHeroInView ? { scale: 1, rotate: 0 } : { scale: 0.6, rotate: -10 }}
                transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
              >
                <Image
                  src="https://t4.ftcdn.net/jpg/11/66/06/77/360_F_1166067709_2SooAuPWXp20XkGev7oOT7nuK1VThCsN.jpg"
                  alt="Coach Alana"
                  width={28}
                  height={28}
                  className="inline-block h-7 w-7 rounded-full ring-2 ring-white dark:ring-slate-900 object-cover"
                />
              </motion.div>
              <motion.div
                initial={{ scale: 0.6, rotate: -10 }}
                animate={isHeroInView ? { scale: 1, rotate: 0 } : { scale: 0.6, rotate: -10 }}
                transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.28 }}
              >
                <Image
                  src="https://prio.co.in/avatar.png"
                  alt="Coach Marcus"
                  width={28}
                  height={28}
                  className="inline-block h-7 w-7 rounded-full ring-2 ring-white dark:ring-slate-900 object-cover"
                />
              </motion.div>
              <motion.div
                initial={{ scale: 0.6, rotate: -10 }}
                animate={isHeroInView ? { scale: 1, rotate: 0 } : { scale: 0.6, rotate: -10 }}
                transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.36 }}
              >
                <Image
                  src="https://lh3.googleusercontent.com/a/ACg8ocKzbEXd0N7V406ocsmdiEQkxCVV1BIJpiTn--O3W0TqjLiNy6e3=s96-c"
                  alt="Wasif"
                  width={28}
                  height={28}
                  className="inline-block h-7 w-7 rounded-full ring-2 ring-white dark:ring-slate-900 object-cover"
                />
              </motion.div>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-foreground">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-active font-extrabold uppercase tracking-wider text-[11px]">
                Live Athlete Hub
              </span>
              <span className="text-[#535C91] dark:text-[#9290C3] font-medium hidden sm:inline">
                • 2,480+ Members Active
              </span>
            </div>
          </motion.div>

          {/* 2. Standardized Section Title Block */}
          <AnimatedSectionTitle
            kicker="Live Athlete Hub • 2,480+ Members Active"
            title="Community Training Grounds & Forum"
            highlightText="Training Grounds"
            subtitle="Exchange science-backed training splits, request movement form critiques from certified coaches, and dial in precision nutrition protocols with competitive athletes."
            align="left"
            className="mb-4"
          />

          {/* 3. Hero Quick Search Bar (Expanding Horizontal Spring) */}
          <motion.form
            initial={{ opacity: 0, scale: 0.95, y: 14 }}
            animate={isHeroInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.95, y: 14 }}
            transition={{ duration: 0.75, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onSubmit={handleHeroSearchSubmit}
            className="w-full max-w-xl relative flex items-center mb-4"
          >
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-brand-500">
              <FaSearch className="w-4 h-4 text-active" />
            </div>
            <input
              type="text"
              value={heroSearch}
              onChange={(e) => setHeroSearch(e.target.value)}
              placeholder="Search exercise form, macro plans, protocols, coaches..."
              className="w-full pl-11 pr-28 py-3.5 rounded-2xl bg-white dark:bg-[#1B1A55]/50 border border-brand-500/25 text-foreground placeholder-[#535C91]/60 dark:placeholder-[#9290C3]/60 text-sm focus:outline-none focus:border-active focus:ring-2 focus:ring-active/20 shadow-xs transition-all"
            />
            <button
              type="submit"
              className="absolute right-2 top-1.5 bottom-1.5 px-4 rounded-xl bg-btn-bg text-btn-text text-xs font-bold uppercase tracking-wider hover:opacity-90 active:scale-95 transition-all cursor-pointer shadow-xs"
            >
              Search
            </button>
          </motion.form>

          {/* 4. Quick Filter Tags (Staggered Pop) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-2 mb-8"
          >
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#535C91] dark:text-[#9290C3] flex items-center gap-1">
              <FaFire className="w-3 h-3 text-active" /> Popular:
            </span>
            {quickTags.map((t, idx) => (
              <motion.button
                key={t.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isHeroInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: 0.45 + idx * 0.05 }}
                whileHover={{ y: -2, scale: 1.03 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push(`/forum?search=${encodeURIComponent(t.query)}`)}
                className="px-2.5 py-1 rounded-lg bg-brand-500/10 dark:bg-brand-500/20 hover:bg-active/10 border border-brand-500/15 text-[11px] font-['Inter'] font-semibold text-foreground hover:text-active transition-all cursor-pointer shadow-2xs"
              >
                #{t.label}
              </motion.button>
            ))}
          </motion.div>

          {/* 5. Action Buttons (Type 1 Primary & Type 2 Secondary) */}
          <div className="flex flex-wrap items-center gap-4">
            <motion.div
              initial={{ opacity: 0, x: -16, y: 14 }}
              animate={isHeroInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: -16, y: 14 }}
              transition={{ type: "spring", stiffness: 220, damping: 22, delay: 0.5 }}
            >
              <Link
                href="/dashboard/trainer/forum-post"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-btn-bg text-btn-text font-bold rounded-2xl shadow-sm hover:shadow-md border border-white/20 hover:opacity-95 hover:-translate-y-0.5 active:scale-95 transition-all text-xs uppercase tracking-wider cursor-pointer"
              >
                <FaPlus className="w-3.5 h-3.5" />
                <span>Start New Discussion</span>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 16, y: 14 }}
              animate={isHeroInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: 16, y: 14 }}
              transition={{ type: "spring", stiffness: 220, damping: 22, delay: 0.55 }}
            >
              <a
                href="#discussions-feed"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-searchbox-bg hover:bg-searchbox-hover text-foreground font-bold rounded-2xl border border-brand-500/25 hover:border-active/60 shadow-xs hover:shadow-md hover:-translate-y-0.5 active:scale-95 transition-all text-xs uppercase tracking-wider cursor-pointer"
              >
                <FaCommentDots className="w-3.5 h-3.5 text-active" />
                <span>Browse All Protocols</span>
              </a>
            </motion.div>
          </div>
        </div>

        {/* Right Side: Live Community Activity Radar (5 Cols on lg) */}
        <motion.div
          initial={{ opacity: 0, x: 45 }}
          animate={isHeroInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 45 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 w-full"
        >
          <div className="rounded-3xl bg-white/85 dark:bg-[#111638]/90 border border-brand-500/25 p-6 backdrop-blur-xl shadow-md relative">
            {/* Box Header */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex items-center justify-between pb-4 mb-4 border-b border-brand-500/10"
            >
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-active animate-ping" />
                <h3 className="font-['Outfit'] font-bold text-foreground text-sm uppercase tracking-wider">
                  Live Community Activity
                </h3>
              </div>
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-active/10 text-active">
                Real-Time
              </span>
            </motion.div>

            {/* Live Feed Activity Ticker Items (Staggered Entrance) */}
            <div className="space-y-3.5 font-['Inter'] text-xs">
              {/* Item 1 */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                transition={{ duration: 0.65, delay: 0.55 }}
                className="p-3 rounded-2xl bg-brand-500/5 dark:bg-[#1B1A55]/40 border border-brand-500/10 hover:border-active/30 transition-all shadow-2xs"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-foreground flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Coach Alana Serrano
                  </span>
                  <span className="text-[10px] text-[#535C91] dark:text-[#9290C3]">
                    2m ago
                  </span>
                </div>
                <p className="text-[#535C91] dark:text-[#9290C3] line-clamp-2">
                  Answered: &quot;Drop thruster weight to 35kg to preserve metabolic turnover...&quot;
                </p>
                <div className="mt-1.5 flex items-center gap-2 text-[10px] text-active font-semibold">
                  <span>In: High-Density Metabolic Circuit</span>
                </div>
              </motion.div>

              {/* Item 2 */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                transition={{ duration: 0.65, delay: 0.65 }}
                className="p-3 rounded-2xl bg-brand-500/5 dark:bg-[#1B1A55]/40 border border-brand-500/10 hover:border-active/30 transition-all shadow-2xs"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-foreground flex items-center gap-1.5">
                    <FaTrophy className="w-3 h-3 text-amber-500" />
                    Noah Guzman
                  </span>
                  <span className="text-[10px] text-[#535C91] dark:text-[#9290C3]">
                    8m ago
                  </span>
                </div>
                <p className="text-[#535C91] dark:text-[#9290C3] line-clamp-2">
                  Logged: &quot;The 90/90 hip rotation drill resolved my deep squat hip impingement!&quot;
                </p>
                <div className="mt-1.5 flex items-center gap-2 text-[10px] text-active font-semibold">
                  <span>In: Deep Hip &amp; Thoracic Mobility</span>
                </div>
              </motion.div>

              {/* Item 3 */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                transition={{ duration: 0.65, delay: 0.75 }}
                className="p-3 rounded-2xl bg-brand-500/5 dark:bg-[#1B1A55]/40 border border-brand-500/10 hover:border-active/30 transition-all shadow-2xs"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-foreground flex items-center gap-1.5">
                    <FaCheckCircle className="w-3 h-3 text-active" />
                    Coach Marcus Vance
                  </span>
                  <span className="text-[10px] text-[#535C91] dark:text-[#9290C3]">
                    15m ago
                  </span>
                </div>
                <p className="text-[#535C91] dark:text-[#9290C3] line-clamp-2">
                  Published: &quot;Squat Depth &amp; Knee Tracking: Debunking the Knees Over Toes Myth&quot;
                </p>
                <div className="mt-1.5 flex items-center gap-2 text-[10px] text-active font-semibold">
                  <span>Biomechanics Blueprint</span>
                </div>
              </motion.div>
            </div>

            {/* Quick Community Guarantee */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.6, delay: 0.85 }}
              className="mt-4 pt-3.5 border-t border-brand-500/10 flex items-center justify-between text-[11px] text-[#535C91] dark:text-[#9290C3]"
            >
              <span className="flex items-center gap-1.5">
                <FaShieldAlt className="w-3 h-3 text-active" />
                <span>Certified Trainer Moderated</span>
              </span>
              <span className="font-bold text-foreground">100% Peer Supported</span>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Metric Counters Banner (Mandatory 0 -> Target Counter Animation) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-brand-500/20">
        {/* Metric 1 */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={isHeroInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.7, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="p-4 rounded-2xl bg-white/70 dark:bg-[#1B1A55]/40 border border-brand-500/15 shadow-2xs text-center group hover:border-active/40 hover:-translate-y-0.5 transition-all"
        >
          <div className="flex items-center justify-center gap-2 text-active mb-1">
            <FaBolt className="w-4 h-4 text-amber-500 group-hover:scale-110 group-hover:rotate-6 transition-transform" />
            <span className="font-['Outfit'] text-2xl sm:text-3xl font-black text-foreground">
              <AnimatedTelemetryNumber value={totalPosts} suffix="+" />
            </span>
          </div>
          <p className="font-['Inter'] text-xs text-[#535C91] dark:text-[#9290C3] font-semibold">
            Master Protocols
          </p>
        </motion.div>

        {/* Metric 2 */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={isHeroInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.7, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="p-4 rounded-2xl bg-white/70 dark:bg-[#1B1A55]/40 border border-brand-500/15 shadow-2xs text-center group hover:border-active/40 hover:-translate-y-0.5 transition-all"
        >
          <div className="flex items-center justify-center gap-2 text-active mb-1">
            <FaCheckCircle className="w-4 h-4 text-emerald-500 group-hover:scale-110 group-hover:rotate-6 transition-transform" />
            <span className="font-['Outfit'] text-2xl sm:text-3xl font-black text-foreground">
              <AnimatedTelemetryNumber value={100} suffix="%" />
            </span>
          </div>
          <p className="font-['Inter'] text-xs text-[#535C91] dark:text-[#9290C3] font-semibold">
            Coach Vetted
          </p>
        </motion.div>

        {/* Metric 3 */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={isHeroInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.7, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="p-4 rounded-2xl bg-white/70 dark:bg-[#1B1A55]/40 border border-brand-500/15 shadow-2xs text-center group hover:border-active/40 hover:-translate-y-0.5 transition-all"
        >
          <div className="flex items-center justify-center gap-2 text-active mb-1">
            <FaClock className="w-4 h-4 text-active group-hover:scale-110 group-hover:rotate-6 transition-transform" />
            <span className="font-['Outfit'] text-2xl sm:text-3xl font-black text-foreground">
              <AnimatedTelemetryNumber prefix="<" value={15} suffix="m" />
            </span>
          </div>
          <p className="font-['Inter'] text-xs text-[#535C91] dark:text-[#9290C3] font-semibold">
            Avg Reply Time
          </p>
        </motion.div>

        {/* Metric 4 */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={isHeroInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.7, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="p-4 rounded-2xl bg-white/70 dark:bg-[#1B1A55]/40 border border-brand-500/15 shadow-2xs text-center group hover:border-active/40 hover:-translate-y-0.5 transition-all"
        >
          <div className="flex items-center justify-center gap-2 text-active mb-1">
            <FaUsers className="w-4 h-4 text-purple-500 group-hover:scale-110 group-hover:rotate-6 transition-transform" />
            <span className="font-['Outfit'] text-2xl sm:text-3xl font-black text-foreground">
              <AnimatedTelemetryNumber value={2480} suffix="+" />
            </span>
          </div>
          <p className="font-['Inter'] text-xs text-[#535C91] dark:text-[#9290C3] font-semibold">
            Athletes Connected
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
}
