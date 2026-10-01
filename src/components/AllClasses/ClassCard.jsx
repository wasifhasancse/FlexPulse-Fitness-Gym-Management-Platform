"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FiClock,
  FiCalendar,
  FiUsers,
  FiArrowRight,
  FiTag,
  FiCheckCircle,
} from "react-icons/fi";
import { FaFire } from "react-icons/fa";

// Exact Element-by-Element Motion Variants from Home "High Demand Sessions" (FeaturedClasses.jsx)
export const classCardVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const classImgVariants = {
  hidden: { scale: 1.15, filter: "blur(4px)" },
  visible: {
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] },
  },
};

export const classCategoryVariants = {
  hidden: { opacity: 0, x: -25 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 180, damping: 22 },
  },
};

export const classDiffVariants = {
  hidden: { opacity: 0, y: -20, x: 15 },
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: { type: "spring", stiffness: 200, damping: 22 },
  },
};

export const classScheduleVariants = {
  hidden: { opacity: 0, y: 20, x: -10 },
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: { duration: 0.95, ease: "easeOut" },
  },
};

export const classPriceVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.8 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 220, damping: 20 },
  },
};

export const classTitleVariants = {
  hidden: { opacity: 0, y: 22, filter: "blur(3px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.15, ease: [0.16, 1, 0.3, 1] },
  },
};

export const classDescVariants = {
  hidden: { opacity: 0, y: -16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.05, ease: "easeOut" },
  },
};

export const classSpecsVariants = {
  hidden: { opacity: 0, scaleX: 0.95 },
  visible: {
    opacity: 1,
    scaleX: 1,
    transition: { duration: 0.95, ease: "easeOut" },
  },
};

export const classMetricVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.95, ease: "easeOut" },
  },
};

export const classBtnVariants = {
  hidden: { opacity: 0, y: 18, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 190, damping: 20 },
  },
};

export default function ClassCard({ cls, isTriggered = true }) {
  if (!cls) return null;

  const {
    _id,
    className = "Athletic Training Session",
    price = 50,
    authorName,
    author,
    authorImage,
    duration = 45,
    slot = 30,
    bookingCount = 0,
    classImage,
    category = "Cardio",
    difficultyLevel,
    level,
    description = "Engineered athletic conditioning session designed for optimal strength, endurance, and physical performance.",
    classSchedule,
    time,
  } = cls;

  const coachName = authorName || (author && author !== "trainer" ? author : "Coach Marcus Vance");
  const difficulty = difficultyLevel || level || "All Levels";

  // Level badge colors matching Home High Demand Sessions
  const getLevelColor = (lvl) => {
    const normalized = (lvl || "").toLowerCase();
    if (normalized.includes("adv")) {
      return "bg-rose-500/15 text-rose-500 dark:text-rose-400 border-rose-500/25";
    }
    if (normalized.includes("inter")) {
      return "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/25";
    }
    return "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/25";
  };

  const getFallbackImage = (cat = "") => {
    const c = (cat || "").toLowerCase();
    if (c.includes("weight") || c.includes("strength"))
      return "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1200&auto=format&fit=crop";
    if (c.includes("hiit") || c.includes("bootcamp"))
      return "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200&auto=format&fit=crop";
    if (c.includes("combat") || c.includes("box"))
      return "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=1200&auto=format&fit=crop";
    if (c.includes("stretch") || c.includes("yoga") || c.includes("pilates"))
      return "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1200&auto=format&fit=crop";
    return "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop";
  };

  const bookedSafe = Number(bookingCount) || 0;
  const slotSafe = Number(slot) || 30;
  const capacityPct = Math.min(Math.round((bookedSafe / slotSafe) * 100), 100);
  const formattedDuration = typeof duration === "number" ? `${duration} Mins` : duration;
  const fallbackImg = getFallbackImage(category);

  return (
    <motion.div
      layout
      variants={classCardVariants}
      initial="hidden"
      animate={isTriggered ? "visible" : "hidden"}
      exit={{
        opacity: 0,
        scale: 0.92,
        y: 18,
        transition: { duration: 0.35, ease: "easeOut" },
      }}
      className="w-full h-full"
    >
      <div className="group relative rounded-3xl overflow-hidden bg-card-bg border border-brand-500/20 hover:border-active/60 transition-all duration-300 ease-out hover:-translate-y-1.5 flex flex-col h-full shadow-sm hover:shadow-md">
        
        {/* ── Visual Card Image Banner (Exact High Demand Sessions Style) ── */}
        <div className="relative h-56 sm:h-60 overflow-hidden bg-brand-800/10">
          <motion.div variants={classImgVariants} className="w-full h-full relative">
            <Image
              src={classImage || fallbackImg}
              alt={className}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover group-hover:scale-106 transition-transform duration-500 ease-out"
            />
            {/* Gradient Dark Vignette for Text Contrast */}
            <div className="absolute inset-0 bg-linear-to-t from-[#070F2B] via-[#070F2B]/40 to-transparent" />
          </motion.div>

          {/* Top Badges: Category & Level */}
          <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2 z-10 pointer-events-none">
            <motion.div
              variants={classCategoryVariants}
              className="bg-background/90 dark:bg-[#1B1A55]/90 backdrop-blur-md px-3 py-1 rounded-full border border-brand-500/25 flex items-center gap-1.5 shadow-2xs pointer-events-auto"
            >
              <FiTag className="w-3 h-3 text-active" />
              <span className="text-[11px] font-extrabold uppercase tracking-wide text-foreground">
                {category}
              </span>
            </motion.div>

            <motion.span
              variants={classDiffVariants}
              className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full border backdrop-blur-md uppercase tracking-wider shadow-2xs pointer-events-auto ${getLevelColor(difficulty)}`}
            >
              {difficulty}
            </motion.span>
          </div>

          {/* Bottom Banner Info: Schedule & Real-Time Price */}
          <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between z-10 pointer-events-none">
            <motion.div
              variants={classScheduleVariants}
              className="bg-[#1B1A55]/85 backdrop-blur-md px-2.5 py-1 rounded-xl border border-white/10 flex items-center gap-1.5 text-white text-[11px] font-medium shadow-2xs pointer-events-auto"
            >
              <FiCalendar className="w-3 h-3 text-active" />
              <span className="truncate max-w-[170px] sm:max-w-[200px]">
                {classSchedule || "Weekly Schedule"} {time ? `• ${time}` : ""}
              </span>
            </motion.div>

            <motion.div
              variants={classPriceVariants}
              className="bg-active text-white text-xs font-black px-3 py-1 rounded-xl shadow-xs border border-white/15 pointer-events-auto"
            >
              ${price}
            </motion.div>
          </div>
        </div>

        {/* ── Card Content Details ── */}
        <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between gap-4">
          
          <div className="space-y-2">
            {/* Class Title: Upward sweep with de-blur */}
            <motion.h3
              variants={classTitleVariants}
              className="font-['Outfit'] text-xl font-bold text-foreground leading-snug line-clamp-1 group-hover:text-active transition-colors"
            >
              {className}
            </motion.h3>

            {/* Class Description: Contrasting downward glide */}
            {description && (
              <motion.p
                variants={classDescVariants}
                className="font-['Inter'] text-xs sm:text-sm text-secondary line-clamp-2 leading-relaxed"
              >
                {description}
              </motion.p>
            )}
          </div>

          {/* Instructor & Duration Spec Strip */}
          <motion.div
            variants={classSpecsVariants}
            className="flex items-center justify-between py-2 border-y border-brand-500/15 text-xs font-['Inter']"
          >
            <div className="flex items-center gap-2">
              {authorImage ? (
                <img
                  src={authorImage}
                  alt={coachName}
                  className="w-7 h-7 rounded-full object-cover ring-1 ring-brand-500/30"
                />
              ) : (
                <div className="w-7 h-7 rounded-full bg-active/20 flex items-center justify-center text-active font-bold text-xs ring-1 ring-brand-500/30">
                  {coachName.charAt(0)}
                </div>
              )}
              <div className="leading-tight">
                <p className="text-[10px] text-secondary font-medium uppercase tracking-wider">Coach</p>
                <p className="font-bold text-foreground text-xs truncate max-w-[120px] sm:max-w-[140px]">{coachName}</p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 bg-searchbox-bg px-2.5 py-1 rounded-lg text-secondary font-bold text-[11px] border border-brand-500/20">
              <FiClock className="w-3.5 h-3.5 text-active" />
              <span>{formattedDuration}</span>
            </div>
          </motion.div>

          {/* Capacity / Booking Metric Bar */}
          <motion.div
            variants={classMetricVariants}
            className="space-y-1.5 font-['Inter']"
          >
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-secondary flex items-center gap-1">
                <FiUsers className="w-3 h-3 text-active" />
                <span>{bookedSafe} athletes enrolled</span>
              </span>
              <span className="font-bold text-foreground">
                {slotSafe - bookedSafe > 0 ? `${slotSafe - bookedSafe} slots open` : "Waitlist Only"}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-1.5 bg-brand-500/15 dark:bg-[#1B1A55]/80 rounded-full overflow-hidden">
              <div
                className="h-full bg-linear-to-r from-brand-500 to-active rounded-full transition-all duration-500"
                style={{ width: `${Math.max(capacityPct, 12)}%` }}
              />
            </div>
          </motion.div>

          {/* Footer Price & Booking CTA */}
          <div className="flex items-center justify-between pt-1">
            <div>
              <div className="flex items-baseline gap-1">
                <span className="font-['Outfit'] text-2xl font-black text-active">
                  ${price}
                </span>
                <span className="text-[11px] text-secondary font-medium">
                  / session
                </span>
              </div>
              <span className="text-[10px] text-emerald-500 font-bold block">
                Free for VIP Members
              </span>
            </div>

            {/* Strict Type 1 Primary CTA Button */}
            <motion.div variants={classBtnVariants}>
              <Link href={`/all-classes/${_id}`}>
                <button className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-btn-bg text-btn-text hover:brightness-105 font-extrabold text-xs sm:text-sm shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer active:scale-95 group/btn">
                  <span>Book Session</span>
                  <FiArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </Link>
            </motion.div>
          </div>

        </div>
      </div>
    </motion.div>
  );
}
