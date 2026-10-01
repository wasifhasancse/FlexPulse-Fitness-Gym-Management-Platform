"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FiClock,
  FiMapPin,
  FiUser,
  FiZap,
  FiArrowRight,
  FiCalendar,
  FiTag,
} from "react-icons/fi";
import { FaFireAlt } from "react-icons/fa";

const TRANSITION_EASE = [0.16, 1, 0.3, 1];

// ── Multi-Element Triggered Motion Variants for Every Single Element ──
export const scheduleCardVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1.1,
      ease: TRANSITION_EASE,
      staggerChildren: 0.07,
      delayChildren: 0.05,
    },
  },
};

export const scheduleImgVariants = {
  hidden: { scale: 1.15, filter: "blur(4px)" },
  visible: {
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 1.3, ease: TRANSITION_EASE },
  },
};

export const scheduleDayBadgeVariants = {
  hidden: { opacity: 0, x: -25, scale: 0.9 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 220, damping: 20 },
  },
};

export const scheduleCategoryBadgeVariants = {
  hidden: { opacity: 0, x: 25, scale: 0.9 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 220, damping: 20 },
  },
};

export const scheduleCaloriesVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.85 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 200, damping: 20 },
  },
};

export const scheduleLevelBadgeVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.85 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 200, damping: 20 },
  },
};

export const scheduleTitleVariants = {
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.0, ease: TRANSITION_EASE },
  },
};

export const scheduleTimeVariants = {
  hidden: { opacity: 0, x: -18 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.85, ease: "easeOut" },
  },
};

export const scheduleRoomVariants = {
  hidden: { opacity: 0, x: -18 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.85, ease: "easeOut" },
  },
};

export const scheduleCoachVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: "easeOut" },
  },
};

export const schedulePriceVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.85 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 220, damping: 20 },
  },
};

export const scheduleDetailsBtnVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 12 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 200, damping: 20 },
  },
};

export const scheduleBookBtnVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 12 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 220, damping: 20 },
  },
};

export default function ScheduleCard({ session, isTriggered = true }) {
  if (!session) return null;

  return (
    <motion.div
      variants={scheduleCardVariants}
      initial="hidden"
      animate={isTriggered ? "visible" : "hidden"}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.35, ease: TRANSITION_EASE }}
      className="group relative flex flex-col justify-between h-full bg-brand-900/40 dark:bg-[#121026]/75 border border-brand-500/20 hover:border-active/60 rounded-3xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300"
    >
      {/* ── Top Visual Cover with Staggered Badges ── */}
      <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-brand-800/30">
        <motion.div variants={scheduleImgVariants} className="relative w-full h-full">
          <Image
            src={session.image}
            alt={session.className}
            fill
            className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent pointer-events-none" />

        {/* Top Badges: Day Tag & Category Badge */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10">
          <motion.div variants={scheduleDayBadgeVariants}>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-active text-btn-text font-['Inter'] text-[11px] font-black uppercase tracking-wider shadow-2xs group-hover:animate-pulse">
              <FiCalendar className="w-3 h-3 text-btn-text" />
              <span>{session.day}</span>
            </span>
          </motion.div>

          <motion.div variants={scheduleCategoryBadgeVariants}>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white font-['Inter'] text-[10px] font-bold border border-white/15 shadow-2xs">
              <FiTag className="w-3 h-3 text-active" />
              <span>{session.category}</span>
            </span>
          </motion.div>
        </div>

        {/* Bottom Banner Metrics: Calorie Burn & Difficulty */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white font-['Inter'] text-xs z-10">
          <motion.div variants={scheduleCaloriesVariants}>
            <span className="flex items-center gap-1.5 font-black text-amber-300 drop-shadow-sm bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-xl border border-white/10">
              <FaFireAlt className="w-3.5 h-3.5 text-amber-400 group-hover:animate-bounce" />
              <span>{session.calories}</span>
            </span>
          </motion.div>

          <motion.div variants={scheduleLevelBadgeVariants}>
            <span className="px-2.5 py-1 rounded-xl bg-white/20 backdrop-blur-md text-[10px] font-black uppercase tracking-wider border border-white/15 shadow-2xs">
              {session.level}
            </span>
          </motion.div>
        </div>
      </div>

      {/* ── Content Body: Every Single Element With Separate Triggered Motion ── */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-3">
          {/* 1. Class Title: Upward sweep with blur removal */}
          <motion.div variants={scheduleTitleVariants}>
            <Link href={`/all-classes/${session._id}`} className="block group/title">
              <h3 className="font-['Outfit'] text-lg sm:text-xl font-bold text-foreground group-hover/title:text-active transition-colors line-clamp-1 group-hover:animate-[headShake_1s_ease-in-out]">
                {session.className}
              </h3>
            </Link>
          </motion.div>

          {/* 2. Session Specs: Time, Studio Room, Coach */}
          <div className="space-y-2 font-['Inter'] text-xs text-secondary">
            {/* Time Slot */}
            <motion.div variants={scheduleTimeVariants} className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-active/10 flex items-center justify-center text-active shrink-0">
                <FiClock className="w-3.5 h-3.5" />
              </div>
              <span className="font-bold text-foreground">{session.time}</span>
              <span className="text-secondary/50">•</span>
              <span>{session.duration}</span>
            </motion.div>

            {/* Studio Location */}
            <motion.div variants={scheduleRoomVariants} className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-active/10 flex items-center justify-center text-active shrink-0">
                <FiMapPin className="w-3.5 h-3.5" />
              </div>
              <span className="truncate text-secondary">{session.room}</span>
            </motion.div>

            {/* Master Coach Info with Avatar */}
            <motion.div
              variants={scheduleCoachVariants}
              className="flex items-center gap-2 pt-1 border-t border-brand-500/10"
            >
              <div className="relative w-6 h-6 rounded-full overflow-hidden bg-brand-500/20 shrink-0 border border-brand-500/30">
                <Image
                  src={session.authorImage}
                  alt={session.authorName}
                  fill
                  className="object-cover"
                />
              </div>
              <span className="truncate text-secondary">
                Coach <strong className="text-foreground font-bold">{session.authorName}</strong>
              </span>
            </motion.div>
          </div>
        </div>

        {/* ── Bottom Action Bar: Price + Distinct CTA Variants ── */}
        <div className="pt-3 border-t border-brand-500/15 flex items-center justify-between gap-2.5">
          <motion.div variants={schedulePriceVariants} className="text-left">
            <span className="text-[10px] uppercase font-black tracking-wider text-secondary/70 font-['Inter'] block">
              Monthly Pass
            </span>
            <span className="font-['Outfit'] text-lg font-black text-foreground">
              ${session.price}
              <span className="text-xs font-normal text-secondary font-['Inter']">/mo</span>
            </span>
          </motion.div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Type 2 Secondary Glass CTA: Details */}
            <motion.div variants={scheduleDetailsBtnVariants}>
              <Link
                href={`/all-classes/${session._id}`}
                className="px-3 py-2 rounded-2xl border border-brand-500/25 bg-searchbox-bg hover:bg-searchbox-hover hover:border-active/60 text-secondary hover:text-foreground font-['Inter'] text-xs font-bold transition-all shadow-2xs block"
              >
                Details
              </Link>
            </motion.div>

            {/* Type 1 Primary High-Voltage Athletic CTA: Book Slot */}
            <motion.div variants={scheduleBookBtnVariants}>
              <Link
                href={`/all-classes/${session._id}`}
                className="relative inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-btn-bg text-btn-text font-['Inter'] text-xs font-black shadow-xs hover:shadow-md transition-all duration-300 overflow-hidden group/btn hover:scale-102"
              >
                {/* Kinetic Sweep Effect */}
                <span className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />
                <FiZap className="w-3.5 h-3.5 text-btn-text relative z-10" />
                <span className="relative z-10">Book Slot</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
