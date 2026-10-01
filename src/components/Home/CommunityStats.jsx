"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, LayoutGroup, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  FiUsers,
  FiTrendingUp,
  FiAward,
  FiCheckCircle,
  FiArrowRight,
  FiMessageSquare,
  FiActivity,
  FiZap,
  FiChevronRight,
  FiChevronLeft,
  FiTarget,
  FiCalendar,
  FiShield
} from "react-icons/fi";
import { FaFire, FaDumbbell, FaTrophy } from "react-icons/fa";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const TRANSITION_EASE = [0.16, 1, 0.3, 1];

const TABS = [
  { id: "all", label: "Ecosystem Overview", icon: FiActivity },
  { id: "prs", label: "Verified PR Wall", icon: FaTrophy },
  { id: "challenges", label: "Community Challenges", icon: FaFire },
  { id: "clinics", label: "Workshops & Clinics", icon: FiAward }
];

const RECENT_ACTIVITIES = [
  {
    athlete: "Elena Rostova",
    role: "HIIT Athlete",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop",
    achievement: "Logged 45m MetCon • 680 kcal burned",
    tag: "Metabolic HIIT",
    time: "4 mins ago",
    badgeColor: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20"
  },
  {
    athlete: "Liam Thorne",
    role: "Strength Member",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop",
    achievement: "New PR: Clean & Jerk 225 lbs",
    tag: "Olympic Strength",
    time: "12 mins ago",
    badgeColor: "text-active bg-active/10 border-active/20"
  },
  {
    athlete: "Marcus Vance",
    role: "Conditioning Lead",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop",
    achievement: "Completed '30-Day Engine Builder' Milestone",
    tag: "Challenge Finisher",
    time: "28 mins ago",
    badgeColor: "text-amber-500 bg-amber-500/10 border-amber-500/20"
  },
  {
    athlete: "Sophia Martinez",
    role: "Flow Specialist",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop",
    achievement: "Completed Thoracic Flow & Recovery Lab",
    tag: "Mobility & Flow",
    time: "45 mins ago",
    badgeColor: "text-cyan-500 bg-cyan-500/10 border-cyan-500/20"
  }
];

const COMMUNITY_AVATARS = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop"
];

const WEEKLY_PEAK_DAYS = [
  { day: "Mon", height: "82%", count: "1.2k", active: true },
  { day: "Tue", height: "88%", count: "1.4k", active: true },
  { day: "Wed", height: "76%", count: "1.1k", active: true },
  { day: "Thu", height: "90%", count: "1.5k", active: true },
  { day: "Fri", height: "96%", count: "1.7k", active: true },
  { day: "Sat", height: "100%", count: "1.9k", active: true, peak: true },
  { day: "Sun", height: "64%", count: "900", active: false }
];

// ── Guaranteed In-View Number Counter Starting Strictly From 0 ──────────────
function AnimatedCounter({ value, decimals = 0, prefix = "", suffix = "", duration = 2.4 }) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.25 });

  useEffect(() => {
    if (!isInView) return;
    const target = typeof value === "number" ? value : parseFloat(value) || 0;
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
      const current = eased * target;
      setDisplayValue(current);
      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      } else {
        setDisplayValue(target);
      }
    };
    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [isInView, value, duration]);

  const formatted =
    decimals > 0
      ? displayValue.toFixed(decimals)
      : Math.floor(displayValue).toLocaleString();

  return (
    <span ref={ref}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}

// ── Framer Motion Variants (Triggered on Every Single Element) ───────────────
const filterContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 }
  }
};

const filterItemVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 160, damping: 22 }
  }
};

const bentoGridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.14 }
  }
};

const bentoCardVariants = {
  hidden: { opacity: 0, y: 36, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1.4,
      ease: TRANSITION_EASE,
      staggerChildren: 0.09,
      delayChildren: 0.1
    }
  }
};

const cardIconTagVariants = {
  hidden: { opacity: 0, x: -16, scale: 0.9 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 150, damping: 20 }
  }
};

const cardNumberVariants = {
  hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.3, ease: TRANSITION_EASE }
  }
};

const cardDescVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.1, ease: "easeOut" } }
};

const cardWidgetVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 1.3, ease: TRANSITION_EASE } }
};

const cardFooterVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.0, ease: "easeOut" } }
};

const bannerVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 1.4, ease: TRANSITION_EASE }
  }
};

// ── Live Athlete Broadcast Capsule Triggered Element Variants ────────────────
const tickerCapsuleVariants = {
  hidden: { opacity: 0, x: 40, scale: 0.94 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 1.2,
      ease: TRANSITION_EASE,
      staggerChildren: 0.08,
      delayChildren: 0.12
    }
  }
};

const tickerTopLineVariants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 1.0, ease: "easeOut" }
  }
};

const tickerLiveBadgeVariants = {
  hidden: { opacity: 0, x: -16, filter: "blur(3px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: TRANSITION_EASE }
  }
};

const tickerSyncBadgeVariants = {
  hidden: { opacity: 0, x: 16, scale: 0.8 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 160, damping: 18 }
  }
};

const tickerAvatarVariants = {
  hidden: { opacity: 0, scale: 0.45, rotate: -15 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { type: "spring", stiffness: 180, damping: 16 }
  }
};

const tickerNameVariants = {
  hidden: { opacity: 0, x: -12 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const tickerTimeVariants = {
  hidden: { opacity: 0, y: -8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const tickerAchievementVariants = {
  hidden: { opacity: 0, y: 10, filter: "blur(3px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: TRANSITION_EASE }
  }
};

const tickerTagVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 8 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 160, damping: 18 }
  }
};

const tickerVerifiedVariants = {
  hidden: { opacity: 0, scale: 0.7, x: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: { type: "spring", stiffness: 170, damping: 16 }
  }
};

const tickerControlsVariants = {
  hidden: { opacity: 0, x: 14, scale: 0.9 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 150, damping: 18 }
  }
};

export default function CommunityStats() {
  const [activeTab, setActiveTab] = useState("all");
  const [currentTickerIdx, setCurrentTickerIdx] = useState(0);
  const [isTickerPaused, setIsTickerPaused] = useState(false);

  const sectionRef = useRef(null);
  const bentoRef = useRef(null);
  const isBentoInView = useInView(bentoRef, { once: true, amount: 0.1 });
  const [bentoTriggered, setBentoTriggered] = useState(false);

  // 1.0s viewport-gated staged delay for bento grid cards
  useEffect(() => {
    if (isBentoInView) {
      const timer = setTimeout(() => setBentoTriggered(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [isBentoInView]);

  // Auto-cycle live activity feed
  useEffect(() => {
    if (isTickerPaused) return;
    const interval = setInterval(() => {
      setCurrentTickerIdx((prev) => (prev + 1) % RECENT_ACTIVITIES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isTickerPaused]);

  // GSAP ScrollTrigger for Header Triggered Transforms
  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          once: true
        },
        defaults: { ease: "power3.out" }
      });

      // 1. Kicker Badge: Downward entrance (-35px) + de-blur
      tl.fromTo(
        ".community-kicker",
        { y: -35, opacity: 0, filter: "blur(6px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.6, ease: "power2.out" }
      ).addLabel("kickerEnd");

      // 2. Headline: Majestic upward rising sweep (+50px) + de-blur + scale
      tl.fromTo(
        ".community-headline",
        { y: 50, opacity: 0, filter: "blur(8px)", scale: 0.95 },
        { y: 0, opacity: 1, filter: "blur(0px)", scale: 1, duration: 2.2, ease: "power3.out" },
        "kickerEnd-=0.4"
      ).addLabel("headlineEnd");

      // 3. Subtitle: Contrasting downward drop (-28px) + de-blur
      tl.fromTo(
        ".community-subtitle",
        { y: -28, opacity: 0, filter: "blur(5px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.8, ease: "power2.out" },
        "headlineEnd-=0.3"
      ).addLabel("subtitleEnd");
    },
    { scope: sectionRef }
  );

  const currentActivity = RECENT_ACTIVITIES[currentTickerIdx];

  return (
    <section
      ref={sectionRef}
      className="py-20 lg:py-28 bg-linear-to-b from-background via-slate-50/40 dark:via-[#121026]/40 to-background border-t border-slate-200/80 dark:border-white/10 relative overflow-hidden transition-colors duration-300"
    >
      {/* High-Tech Ambient Lighting Glows */}
      <div className="absolute top-1/4 left-1/10 w-96 sm:w-140 h-96 sm:h-140 bg-brand-500/6 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-1/10 w-80 sm:w-120 h-80 sm:h-120 bg-active/5 rounded-full blur-[130px] pointer-events-none -z-10" />

      <div className="w-11/12 mx-auto relative z-10">
        {/* ── Section Header with Triggered Transforms & Telemetry Capsule ── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 sm:mb-14 gap-6 border-b border-slate-200/80 dark:border-white/10 pb-8">
          <div className="max-w-2xl space-y-3">
            {/* Industry Kicker Badge */}
            <div className="community-kicker inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100/90 dark:bg-white/10 border border-slate-200/80 dark:border-white/10 text-xs font-bold tracking-wide shadow-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-active opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-active" />
              </span>
              <span className="text-active uppercase tracking-wider font-extrabold text-[11px]">
                Collective Power
              </span>
              <span className="text-slate-500 dark:text-slate-400">
                • Real Athlete Transformation Ecosystem
              </span>
            </div>

            {/* Headline */}
            <h2 className="community-headline text-3xl sm:text-4xl lg:text-5xl font-extrabold font-['Outfit'] tracking-tight text-foreground leading-[1.12]">
              Built By Athletes,{" "}
              <span className="text-active inline-block transition-transform hover:scale-105 duration-200 cursor-default">
                For The Community
              </span>
            </h2>

            {/* Subtitle */}
            <p className="community-subtitle text-xs sm:text-sm lg:text-base text-slate-500 dark:text-slate-400 font-[Inter] leading-relaxed pt-0.5">
              FlexPulse is more than a world-class gym. We are an interconnected athlete network sharing clinical nutrition logs, tracking real-time personal records, and lifting each other past physical plateaus.
            </p>
          </div>

          {/* Interactive Live Athlete Broadcast Capsule — Shadow Rule (shadow-sm, hover:shadow-md) with Triggered Transition on Every Single Element */}
          <motion.div
            variants={tickerCapsuleVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="community-ticker relative overflow-hidden rounded-2xl bg-white dark:bg-[#121026] p-4 sm:p-5 border border-slate-200/80 dark:border-white/10 shadow-sm hover:shadow-md shrink-0 self-start lg:self-end max-w-md w-full lg:w-auto transition-all duration-300 hover:border-active/40"
            onMouseEnter={() => setIsTickerPaused(true)}
            onMouseLeave={() => setIsTickerPaused(false)}
          >
            {/* Top Accent Line with Triggered Wipe */}
            <motion.div
              variants={tickerTopLineVariants}
              className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-active/70 to-transparent origin-left"
            />

            {/* Capsule Header Bar with Triggered Badges */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200/70 dark:border-white/10 text-[10px] uppercase tracking-wider font-extrabold text-slate-500 dark:text-slate-400">
              <motion.span variants={tickerLiveBadgeVariants} className="flex items-center gap-1.5 text-active">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-active opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-active" />
                </span>
                Live Athlete Broadcast
              </motion.span>
              <motion.span
                variants={tickerSyncBadgeVariants}
                className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 font-black shadow-2xs"
              >
                Real-Time Sync
              </motion.span>
            </div>

            <div className="flex items-center gap-3.5">
              {/* Athlete Avatar with Triggered Spring Scale & Rotation */}
              <motion.div
                variants={tickerAvatarVariants}
                className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-slate-200 dark:ring-white/10 shrink-0 shadow-xs"
              >
                <Image
                  src={currentActivity.avatar}
                  alt={currentActivity.athlete}
                  fill
                  unoptimized
                  className="object-cover transition-transform duration-500 hover:scale-110"
                />
              </motion.div>

              {/* Athlete Metadata & Achievement with Triggered Entrance */}
              <div className="flex-1 min-w-0 font-['Inter']">
                <div className="flex items-center justify-between gap-2">
                  <motion.span
                    variants={tickerNameVariants}
                    className="text-xs font-bold text-foreground font-['Outfit'] truncate"
                  >
                    {currentActivity.athlete}
                  </motion.span>
                  <motion.span
                    variants={tickerTimeVariants}
                    className="text-[10px] text-slate-500 dark:text-slate-400 whitespace-nowrap font-medium"
                  >
                    {currentActivity.time}
                  </motion.span>
                </div>
                <motion.p
                  variants={tickerAchievementVariants}
                  className="text-xs font-semibold text-foreground/90 truncate mt-0.5"
                >
                  {currentActivity.achievement}
                </motion.p>
                <div className="flex items-center gap-1.5 mt-1.5">
                  <motion.span
                    variants={tickerTagVariants}
                    className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full border ${currentActivity.badgeColor} shadow-2xs`}
                  >
                    {currentActivity.tag}
                  </motion.span>
                  <motion.span
                    variants={tickerVerifiedVariants}
                    className="text-[10px] text-emerald-500 font-bold flex items-center gap-0.5"
                  >
                    <FiCheckCircle className="w-2.5 h-2.5" /> Verified
                  </motion.span>
                </div>
              </div>

              {/* Ticker Control Buttons with Triggered Spring & Micro-interactions */}
              <motion.div
                variants={tickerControlsVariants}
                className="flex flex-col gap-1 shrink-0 pl-2 border-l border-slate-200/70 dark:border-white/10"
              >
                <button
                  type="button"
                  onClick={() =>
                    setCurrentTickerIdx((prev) =>
                      prev === 0 ? RECENT_ACTIVITIES.length - 1 : prev - 1
                    )
                  }
                  className="p-1 rounded-md hover:bg-slate-100 dark:hover:bg-white/10 text-slate-500 dark:text-slate-400 hover:text-active active:scale-90 transition-all cursor-pointer"
                  aria-label="Previous community activity"
                >
                  <FiChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setCurrentTickerIdx((prev) => (prev + 1) % RECENT_ACTIVITIES.length)
                  }
                  className="p-1 rounded-md hover:bg-slate-100 dark:hover:bg-white/10 text-slate-500 dark:text-slate-400 hover:text-active active:scale-90 transition-all cursor-pointer"
                  aria-label="Next community activity"
                >
                  <FiChevronRight className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* ── Topic Tabs with Clean Surface Styling & Shadow Rule ── */}
        <LayoutGroup id="communityTabGroup">
          <motion.div
            variants={filterContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="flex items-center gap-2.5 overflow-x-auto pb-4 mb-10 no-scrollbar select-none"
          >
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              const TabIcon = tab.icon;
              return (
                <motion.button
                  key={tab.id}
                  variants={filterItemVariants}
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-tight transition-colors duration-200 whitespace-nowrap cursor-pointer shrink-0 ${
                    isActive
                      ? "text-white"
                      : "bg-slate-100/90 dark:bg-white/[0.06] hover:bg-slate-200/80 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300 border border-slate-200/70 dark:border-white/10"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeCommunityTabPill"
                      className="absolute inset-0 rounded-xl bg-active shadow-sm"
                      transition={{ type: "spring", stiffness: 450, damping: 35 }}
                    />
                  )}
                  <TabIcon className="w-3.5 h-3.5 relative z-10" />
                  <span className="relative z-10">{tab.label}</span>
                </motion.button>
              );
            })}
          </motion.div>
        </LayoutGroup>

        {/* ── High-Impact Bento Grid: Strictly Shadow sm/md & Triggered Transitions ── */}
        <div ref={bentoRef}>
          <motion.div
            layout="position"
            variants={bentoGridVariants}
            initial="hidden"
            animate={bentoTriggered ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 sm:gap-8 mb-12 sm:mb-16"
          >
            <AnimatePresence mode="popLayout">
              {/* Bento Card 1: The Living Athlete Engine */}
              {(activeTab === "all" || activeTab === "challenges") && (
                <motion.div
                  key="bento-card-1"
                  layout
                  variants={bentoCardVariants}
                  exit={{ opacity: 0, scale: 0.92, y: 14, transition: { duration: 0.28 } }}
                  className="lg:col-span-7 rounded-3xl p-7 sm:p-8 bg-white dark:bg-[#121026] border border-slate-200/80 dark:border-white/10 shadow-sm hover:shadow-md hover:border-active/40 transition-all duration-300 ease-out hover:-translate-y-1.5 flex flex-col justify-between relative overflow-hidden group"
                >
                  <div className="absolute top-0 right-0 w-72 h-72 bg-active/5 rounded-full blur-[90px] pointer-events-none -z-0" />
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-active/0 to-transparent group-hover:via-active transition-all duration-500" />

                  <div className="relative z-10">
                    {/* Top Row: Icon + Growth Tag */}
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                      <motion.div variants={cardIconTagVariants} className="flex items-center gap-3">
                        <div className="p-3.5 rounded-2xl bg-active/10 dark:bg-active/20 text-active border border-active/20 group-hover:scale-108 group-hover:bg-active group-hover:text-white transition-all duration-300 shadow-xs">
                          <FiUsers className="w-6 h-6" />
                        </div>
                        <div>
                          <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                            +28% YoY Growth
                          </span>
                          <h3 className="font-['Outfit'] text-lg font-bold text-foreground mt-1">
                            Active Athletes & Members
                          </h3>
                        </div>
                      </motion.div>

                      <motion.span
                        variants={cardDescVariants}
                        className="text-xs text-slate-500 dark:text-slate-400 font-['Inter'] font-semibold bg-slate-50 dark:bg-white/[0.04] px-3 py-1 rounded-xl border border-slate-200/80 dark:border-white/10"
                      >
                        Avg. 4.6 Sessions / Week
                      </motion.span>
                    </div>

                    {/* Number Counter & Narrative */}
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
                      <div>
                        <motion.span
                          variants={cardNumberVariants}
                          className="block text-4xl sm:text-6xl font-black font-['Outfit'] tracking-tight text-foreground group-hover:text-active transition-colors"
                        >
                          <AnimatedCounter value={18500} suffix="+" duration={2.4} />
                        </motion.span>
                        <motion.p
                          variants={cardDescVariants}
                          className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-['Inter'] mt-1"
                        >
                          Athletes clocking biometric sessions across 4 dedicated athletic facilities and mobile trackers.
                        </motion.p>
                      </div>
                    </div>

                    {/* Weekly Facility Heatmap Widget */}
                    <motion.div
                      variants={cardWidgetVariants}
                      className="p-5 rounded-2xl bg-slate-50/90 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/10"
                    >
                      <div className="flex items-center justify-between text-xs font-['Inter'] mb-3">
                        <span className="font-bold text-foreground flex items-center gap-1.5">
                          <FiActivity className="w-3.5 h-3.5 text-active" />
                          Weekly Facility Peak Heatmap
                        </span>
                        <span className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold">
                          Saturday: <strong className="text-active">Peak Athlete Density</strong>
                        </span>
                      </div>

                      <div className="grid grid-cols-7 gap-2 sm:gap-3 items-end h-24 pt-3 border-b border-slate-200/70 dark:border-white/10 pb-2">
                        {WEEKLY_PEAK_DAYS.map((item, idx) => (
                          <div
                            key={item.day}
                            className="flex flex-col items-center gap-1.5 h-full justify-end group/bar"
                          >
                            <span className="text-[9px] font-bold text-slate-500 dark:text-slate-400 opacity-0 group-hover/bar:opacity-100 transition-opacity">
                              {item.count}
                            </span>
                            <motion.div
                              initial={{ height: "0%" }}
                              whileInView={{ height: item.height }}
                              viewport={{ once: true, amount: 0.5 }}
                              transition={{
                                duration: 1.2,
                                delay: idx * 0.08,
                                ease: [0.16, 1, 0.3, 1]
                              }}
                              className={`w-full rounded-t-lg transition-all duration-300 ${
                                item.peak
                                  ? "bg-gradient-to-t from-brand-600 via-active to-emerald-400 shadow-xs"
                                  : item.active
                                  ? "bg-active group-hover/bar:bg-active/90 shadow-xs"
                                  : "bg-slate-200 dark:bg-white/10"
                              }`}
                            />
                            <span
                              className={`text-[10px] font-bold font-['Outfit'] ${
                                item.peak ? "text-active" : "text-slate-500 dark:text-slate-400"
                              }`}
                            >
                              {item.day}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-3 text-[11px] text-slate-500 dark:text-slate-400 font-['Inter']">
                        <span>Peak Hours: 06:00 - 09:00 & 17:30 - 20:30</span>
                        <span className="text-emerald-500 font-bold flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                          All Arenas Open Now
                        </span>
                      </div>
                    </motion.div>
                  </div>

                  {/* Bottom Metric Tags */}
                  <motion.div
                    variants={cardFooterVariants}
                    className="mt-6 pt-4 border-t border-slate-200/70 dark:border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs font-['Inter']"
                  >
                    <span className="font-medium text-foreground">
                      Keyless Turnstiles: <strong className="text-active">100% Biometric</strong>
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">
                      Real-time occupancy synced every 30s
                    </span>
                  </motion.div>
                </motion.div>
              )}

              {/* Bento Card 2: Personal Records Vault */}
              {(activeTab === "all" || activeTab === "prs") && (
                <motion.div
                  key="bento-card-2"
                  layout
                  variants={bentoCardVariants}
                  exit={{ opacity: 0, scale: 0.92, y: 14, transition: { duration: 0.28 } }}
                  className="lg:col-span-5 rounded-3xl p-7 sm:p-8 bg-white dark:bg-[#121026] border border-slate-200/80 dark:border-white/10 shadow-sm hover:shadow-md hover:border-active/40 transition-all duration-300 ease-out hover:-translate-y-1.5 flex flex-col justify-between relative overflow-hidden group"
                >
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-active/0 to-transparent group-hover:via-active transition-all duration-500" />

                  <div>
                    <div className="flex items-center justify-between gap-3 mb-6">
                      <motion.div variants={cardIconTagVariants} className="flex items-center gap-3">
                        <div className="p-3.5 rounded-2xl bg-active/10 dark:bg-active/20 text-active border border-active/20 group-hover:scale-108 group-hover:bg-active group-hover:text-white transition-all duration-300 shadow-xs">
                          <FiTrendingUp className="w-6 h-6" />
                        </div>
                        <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-active/10 text-active border border-active/20">
                          Biometric Verified
                        </span>
                      </motion.div>
                    </div>

                    {/* Number Counter */}
                    <motion.span
                      variants={cardNumberVariants}
                      className="block text-4xl sm:text-5xl font-black font-['Outfit'] tracking-tight text-foreground group-hover:text-active transition-colors"
                    >
                      <AnimatedCounter value={142500} suffix="+" duration={2.4} />
                    </motion.span>

                    <motion.h3 variants={cardDescVariants} className="mt-2 text-lg font-bold font-['Outfit'] text-foreground">
                      Personal Records Logged
                    </motion.h3>

                    <motion.p variants={cardDescVariants} className="mt-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-['Inter'] leading-relaxed">
                      Verified achievements across Olympic bar paths, 2,000m row ergometers, and body composition scans.
                    </motion.p>

                    {/* PR Discipline Breakdown Chips */}
                    <motion.div variants={cardWidgetVariants} className="mt-5 space-y-3 font-['Inter']">
                      <div className="p-3 rounded-2xl bg-slate-50/90 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/10">
                        <div className="flex items-center justify-between text-xs mb-1.5">
                          <span className="font-semibold text-foreground flex items-center gap-1.5">
                            <FaDumbbell className="text-active w-3.5 h-3.5" /> Squat / Clean / Deadlift
                          </span>
                          <strong className="text-active font-black">
                            <AnimatedCounter value={64200} suffix=" PRs" duration={2.0} />
                          </strong>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-slate-200/80 dark:bg-white/10 overflow-hidden">
                          <div className="h-full bg-active rounded-full w-[45%]" />
                        </div>
                      </div>

                      <div className="p-3 rounded-2xl bg-slate-50/90 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/10">
                        <div className="flex items-center justify-between text-xs mb-1.5">
                          <span className="font-semibold text-foreground flex items-center gap-1.5">
                            <FiZap className="text-amber-500 w-3.5 h-3.5" /> VO2 Max & MetCon Times
                          </span>
                          <strong className="text-amber-500 font-black">
                            <AnimatedCounter value={48100} suffix=" PRs" duration={2.0} />
                          </strong>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-slate-200/80 dark:bg-white/10 overflow-hidden">
                          <div className="h-full bg-amber-500 rounded-full w-[34%]" />
                        </div>
                      </div>

                      <div className="p-3 rounded-2xl bg-slate-50/90 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/10">
                        <div className="flex items-center justify-between text-xs mb-1.5">
                          <span className="font-semibold text-foreground flex items-center gap-1.5">
                            <FaFire className="text-rose-500 w-3.5 h-3.5" /> InBody Recompositions
                          </span>
                          <strong className="text-rose-500 font-black">
                            <AnimatedCounter value={30200} suffix=" PRs" duration={2.0} />
                          </strong>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-slate-200/80 dark:bg-white/10 overflow-hidden">
                          <div className="h-full bg-rose-500 rounded-full w-[21%]" />
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  <motion.div
                    variants={cardFooterVariants}
                    className="mt-6 pt-4 border-t border-slate-200/70 dark:border-white/10 flex items-center justify-between text-[11px] font-semibold text-foreground/80 font-['Inter']"
                  >
                    <span className="text-active font-bold flex items-center gap-1">
                      <FaFire className="w-3 h-3 text-active" />
                      +1,200 PRs Logged Weekly
                    </span>
                    <span className="text-slate-500 dark:text-slate-400">
                      Automatic Leaderboard Sync
                    </span>
                  </motion.div>
                </motion.div>
              )}

              {/* Bento Card 3: Masterclasses & Free Clinics */}
              {(activeTab === "all" || activeTab === "clinics") && (
                <motion.div
                  key="bento-card-3"
                  layout
                  variants={bentoCardVariants}
                  exit={{ opacity: 0, scale: 0.92, y: 14, transition: { duration: 0.28 } }}
                  className="lg:col-span-6 rounded-3xl p-7 sm:p-8 bg-white dark:bg-[#121026] border border-slate-200/80 dark:border-white/10 shadow-sm hover:shadow-md hover:border-active/40 transition-all duration-300 ease-out hover:-translate-y-1.5 flex flex-col justify-between relative overflow-hidden group"
                >
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-active/0 to-transparent group-hover:via-active transition-all duration-500" />

                  <div>
                    <div className="flex items-center justify-between gap-3 mb-6">
                      <motion.div variants={cardIconTagVariants} className="flex items-center gap-3">
                        <div className="p-3.5 rounded-2xl bg-amber-500/10 text-amber-500 border border-amber-500/20 group-hover:scale-108 group-hover:bg-amber-500 group-hover:text-white transition-all duration-300 shadow-xs">
                          <FiAward className="w-6 h-6" />
                        </div>
                        <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20">
                          Coach-Facilitated
                        </span>
                      </motion.div>
                    </div>

                    {/* Number Counter */}
                    <motion.span
                      variants={cardNumberVariants}
                      className="block text-4xl sm:text-5xl font-black font-['Outfit'] tracking-tight text-foreground group-hover:text-active transition-colors"
                    >
                      <AnimatedCounter value={420} suffix="+" duration={2.2} />
                    </motion.span>

                    <motion.h3 variants={cardDescVariants} className="mt-2 text-lg font-bold font-['Outfit'] text-foreground">
                      Masterclasses & Recovery Clinics
                    </motion.h3>

                    <motion.p variants={cardDescVariants} className="mt-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-['Inter'] leading-relaxed">
                      Seminars led by exercise physiologists and competitive lifters. 100% complimentary for all active members.
                    </motion.p>

                    {/* Upcoming Clinic Spotlight Card */}
                    <motion.div
                      variants={cardWidgetVariants}
                      className="mt-5 p-4 rounded-2xl bg-gradient-to-r from-slate-50 via-white to-slate-50 dark:from-white/[0.04] dark:via-white/[0.07] dark:to-white/[0.04] border border-slate-200/80 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase text-active tracking-wider">
                          <FiCalendar className="w-3.5 h-3.5" />
                          <span>This Thursday • 06:30 PM</span>
                        </div>
                        <h4 className="text-xs sm:text-sm font-bold text-foreground font-['Outfit'] leading-tight">
                          Kinematic Bar Path & Thoracic Mobility
                        </h4>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 font-['Inter']">
                          With Master Coach Alex Rivers • Turf Arena A
                        </p>
                      </div>
                      <Link
                        href="/schedule"
                        className="inline-flex items-center justify-center gap-1 px-4 py-2 rounded-xl bg-active text-white text-xs font-bold shrink-0 hover:brightness-105 active:scale-95 transition-all shadow-xs"
                      >
                        <span>Reserve</span>
                        <FiArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </motion.div>
                  </div>

                  <motion.div
                    variants={cardFooterVariants}
                    className="mt-6 pt-4 border-t border-slate-200/70 dark:border-white/10 flex items-center justify-between text-[11px] font-semibold text-foreground/80 font-['Inter']"
                  >
                    <span className="text-emerald-500 font-bold flex items-center gap-1">
                      <FiShield className="w-3.5 h-3.5" /> Zero Additional Fees
                    </span>
                    <span className="text-slate-500 dark:text-slate-400">
                      Includes Live Q&A and Video Replay
                    </span>
                  </motion.div>
                </motion.div>
              )}

              {/* Bento Card 4: Goal Completion & Accountability */}
              {(activeTab === "all" || activeTab === "challenges") && (
                <motion.div
                  key="bento-card-4"
                  layout
                  variants={bentoCardVariants}
                  exit={{ opacity: 0, scale: 0.92, y: 14, transition: { duration: 0.28 } }}
                  className="lg:col-span-6 rounded-3xl p-7 sm:p-8 bg-white dark:bg-[#121026] border border-slate-200/80 dark:border-white/10 shadow-sm hover:shadow-md hover:border-active/40 transition-all duration-300 ease-out hover:-translate-y-1.5 flex flex-col justify-between relative overflow-hidden group"
                >
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-active/0 to-transparent group-hover:via-active transition-all duration-500" />

                  <div>
                    <div className="flex items-center justify-between gap-3 mb-6">
                      <motion.div variants={cardIconTagVariants} className="flex items-center gap-3">
                        <div className="p-3.5 rounded-2xl bg-cyan-500/10 text-cyan-500 border border-cyan-500/20 group-hover:scale-108 group-hover:bg-cyan-500 group-hover:text-white transition-all duration-300 shadow-xs">
                          <FiCheckCircle className="w-6 h-6" />
                        </div>
                        <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-500 border border-cyan-500/20">
                          Peer Accountable
                        </span>
                      </motion.div>
                    </div>

                    {/* Number Counter */}
                    <motion.span
                      variants={cardNumberVariants}
                      className="block text-4xl sm:text-5xl font-black font-['Outfit'] tracking-tight text-foreground group-hover:text-active transition-colors"
                    >
                      <AnimatedCounter value={98.6} decimals={1} suffix="%" duration={2.2} />
                    </motion.span>

                    <motion.h3 variants={cardDescVariants} className="mt-2 text-lg font-bold font-['Outfit'] text-foreground">
                      6-Month Target Completion Rate
                    </motion.h3>

                    <motion.p variants={cardDescVariants} className="mt-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-['Inter'] leading-relaxed">
                      Athletes training with community accountability partners reach their body recomposition and strength milestones at triple the industry average.
                    </motion.p>

                    {/* Monthly Caloric Target Gauge */}
                    <motion.div
                      variants={cardWidgetVariants}
                      className="mt-5 p-4 rounded-2xl bg-slate-50/90 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/10"
                    >
                      <div className="flex items-center justify-between text-xs font-['Inter'] mb-2">
                        <span className="font-bold text-foreground flex items-center gap-1.5">
                          <FiTarget className="w-3.5 h-3.5 text-active" />
                          Monthly Target: 2,500,000 kcal
                        </span>
                        <span className="font-extrabold text-active">
                          <AnimatedCounter
                            value={88.6}
                            decimals={1}
                            suffix="% Achieved"
                            duration={2.0}
                          />
                        </span>
                      </div>

                      {/* Animated Progress bar */}
                      <div className="w-full h-3 rounded-full bg-slate-100 dark:bg-white/10 border border-slate-200/60 dark:border-white/5 overflow-hidden p-0.5">
                        <motion.div
                          initial={{ width: "0%" }}
                          whileInView={{ width: "88.6%" }}
                          viewport={{ once: true, amount: 0.5 }}
                          transition={{ duration: 1.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                          className="h-full bg-linear-to-r from-brand-500 via-active to-emerald-400 rounded-full shadow-xs"
                        />
                      </div>

                      <div className="flex items-center justify-between pt-2.5 text-[10px] text-slate-500 dark:text-slate-400 font-['Inter']">
                        <span>2,214,800 kcal burned to date</span>
                        <span className="font-semibold text-foreground">3 Days Remaining</span>
                      </div>
                    </motion.div>
                  </div>

                  <motion.div
                    variants={cardFooterVariants}
                    className="mt-6 pt-4 border-t border-slate-200/70 dark:border-white/10 flex items-center justify-between text-[11px] font-semibold text-foreground/80 font-['Inter']"
                  >
                    <span className="text-active font-bold">3.2x Higher Adherence</span>
                    <span className="text-slate-500 dark:text-slate-400">
                      Matched Workout Buddy System
                    </span>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* ── Community Engagement & Athlete Hub Banner: strictly Shadow sm/md ── */}
        <motion.div
          variants={bannerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="relative rounded-3xl p-7 sm:p-10 bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-[#171430] dark:via-[#0c0a1a] dark:to-[#171430] border border-slate-200/90 dark:border-white/10 shadow-sm hover:shadow-md overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8 transition-shadow duration-300"
        >
          {/* Subtle Ambient Accent */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-active/8 rounded-full blur-[100px] pointer-events-none -z-0" />

          {/* Left: Avatar Stack & Value Prop */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-5 max-w-2xl relative z-10">
            <div className="flex -space-x-3.5 shrink-0 pt-1">
              {COMMUNITY_AVATARS.map((img, i) => (
                <div
                  key={i}
                  className="relative w-12 h-12 rounded-full overflow-hidden ring-3 ring-white dark:ring-[#0c0a1a] border border-slate-200 dark:border-white/10 shadow-xs"
                >
                  <Image
                    src={img}
                    alt="Community Athlete"
                    fill
                    unoptimized
                    className="object-cover"
                  />
                </div>
              ))}
              <div className="w-12 h-12 rounded-full bg-active text-white font-black text-xs flex items-center justify-center ring-3 ring-white dark:ring-[#0c0a1a] border border-active font-['Outfit'] shadow-xs">
                +15K
              </div>
            </div>

            <div className="space-y-1.5">
              <h4 className="font-['Outfit'] text-xl sm:text-2xl font-extrabold text-foreground">
                Join the FlexPulse Athlete Circle
              </h4>
              <p className="font-[Inter] text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Connect with workout partners, participate in monthly fitness challenges, consult master coaches, and share workout logs with zero judgment.
              </p>
            </div>
          </div>

          {/* Right: Quick Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 shrink-0 font-['Inter'] relative z-10">
            <Link
              href="/forum"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white dark:bg-white/10 hover:bg-slate-50 dark:hover:bg-white/15 border border-slate-200 dark:border-white/15 text-foreground font-bold text-xs sm:text-sm transition-all duration-200 cursor-pointer shadow-xs active:scale-95"
            >
              <FiMessageSquare className="w-4 h-4 text-active" />
              <span>Browse Forum Discussions</span>
            </Link>

            <Link
              href="/all-classes"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-btn-bg text-btn-text hover:brightness-105 font-bold text-xs sm:text-sm transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md active:scale-95"
            >
              <span>Explore Group Sessions</span>
              <FiArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
