"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FiClock,
  FiCalendar,
  FiUsers,
  FiArrowRight,
  FiActivity,
  FiZap,
  FiCheckCircle,
} from "react-icons/fi";
import { FaFire } from "react-icons/fa";
import ScrollAnimate from "@/components/common/ScrollAnimate";

export default function ClassCard({ cls }) {
  if (!cls) return null;

  const {
    _id,
    className = "Athletic Training Session",
    price = 35,
    authorName,
    author,
    authorImage,
    duration = 45,
    slot = 20,
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
  const activeLevel = difficultyLevel || level || "All Levels";

  // Category-specific styling tokens
  const getCategoryStyles = (cat = "") => {
    const c = cat.toLowerCase();
    if (c.includes("weight") || c.includes("strength"))
      return "from-amber-500/20 to-orange-500/20 text-amber-500 dark:text-amber-400 border-amber-500/30";
    if (c.includes("hiit") || c.includes("combat"))
      return "from-rose-500/20 to-red-600/20 text-rose-500 dark:text-rose-400 border-rose-500/30";
    if (c.includes("cardio") || c.includes("run"))
      return "from-cyan-500/20 to-blue-500/20 text-cyan-500 dark:text-cyan-400 border-cyan-500/30";
    if (c.includes("stretch") || c.includes("yoga") || c.includes("pilates"))
      return "from-emerald-500/20 to-teal-500/20 text-emerald-500 dark:text-emerald-400 border-emerald-500/30";
    return "from-active/20 to-rose-500/20 text-active border-active/30";
  };

  const getLevelBadge = (lvl = "") => {
    const l = lvl.toLowerCase();
    if (l.includes("advanced"))
      return {
        label: "Advanced",
        class: "bg-rose-500/15 text-rose-500 dark:text-rose-400 border-rose-500/30",
      };
    if (l.includes("intermediate"))
      return {
        label: "Intermediate",
        class: "bg-amber-500/15 text-amber-500 dark:text-amber-400 border-amber-500/30",
      };
    return {
      label: "Beginner",
      class: "bg-emerald-500/15 text-emerald-500 dark:text-emerald-400 border-emerald-500/30",
    };
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
    return "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?q=80&w=1200&auto=format&fit=crop";
  };

  const levelBadge = getLevelBadge(activeLevel);
  const remainingSlots = Math.max(0, Number(slot) - Number(bookingCount));
  const fallbackImg = getFallbackImage(category);

  return (
    <ScrollAnimate className="h-full" speed="animate__faster">
      <motion.div
        layout
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="group relative flex flex-col h-full rounded-[26px] bg-white dark:bg-[#121124]/90 border border-slate-200/90 dark:border-white/10 hover:border-active/60 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_45px_-12px_rgba(255,24,68,0.22)] transition-all duration-300 hover:-translate-y-1.5 overflow-hidden"
      >
      
      {/* Top Media Banner */}
      <div className="relative h-56 w-full overflow-hidden bg-slate-900">
        <Image
          src={classImage || fallbackImg}
          alt={className}
          fill
          unoptimized
          className="object-cover w-full h-full group-hover:scale-108 transition-transform duration-700 ease-out"
        />

        {/* Ambient Dark Gradient Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />

        {/* Top Floating Badges */}
        <div className="absolute top-3.5 inset-x-3.5 flex items-center justify-between z-10">
          {/* Category Chip */}
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md bg-black/40 border ${getCategoryStyles(
              category
            )} shadow-sm`}
          >
            <FaFire className="w-3 h-3 group-hover:animate__animated group-hover:animate__bounce" />
            {category}
          </span>

          {/* Price Tag with Glow */}
          <span className="inline-flex items-center px-3 py-1 rounded-xl bg-gradient-to-r from-active to-rose-600 text-white font-['Outfit'] font-black text-sm shadow-md shadow-active/30 border border-white/20 animate__animated group-hover:animate__pulse">
            ${price}
          </span>
        </div>

        {/* Bottom Media Meta Overlay */}
        <div className="absolute bottom-3 inset-x-3.5 flex items-center justify-between text-xs z-10">
          {/* Difficulty Level Pill */}
          <span
            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md font-bold text-[11px] backdrop-blur-md border ${levelBadge.class}`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-current" />
            {levelBadge.label}
          </span>

          {/* Remaining Spots */}
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-white/90 bg-black/50 backdrop-blur-md px-2.5 py-0.5 rounded-md border border-white/10">
            <FiUsers className="w-3 h-3 text-active" />
            {remainingSlots > 0 ? `${remainingSlots} spots left` : "Waitlist"}
          </span>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-5 sm:p-6 flex flex-col flex-1">
        {/* Title */}
        <h3 className="font-['Outfit'] text-xl font-extrabold text-foreground group-hover:text-active transition-colors duration-200 line-clamp-1 leading-snug group-hover:animate__animated group-hover:animate__headShake">
          {className}
        </h3>

        {/* Coach Row */}
        <div className="flex items-center gap-2.5 mt-2.5">
          <div className="relative w-8 h-8 rounded-full overflow-hidden bg-active/10 border border-active/30 shrink-0">
            {authorImage ? (
              <Image
                src={authorImage}
                alt={coachName}
                fill
                unoptimized
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center font-['Outfit'] text-xs font-bold text-active">
                {coachName.charAt(0)}
              </div>
            )}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1 text-xs font-bold text-foreground truncate">
              <span className="truncate">{coachName}</span>
              <FiCheckCircle className="w-3.5 h-3.5 text-active shrink-0 animate__animated animate__bounceIn" title="Verified Master Coach" />
            </div>
            <p className="text-[11px] text-slate-400 dark:text-slate-400">
              Master Athletic Coach
            </p>
          </div>
        </div>

        {/* Key Metrics Chips */}
        <div className="grid grid-cols-2 gap-2 mt-4">
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-100 dark:border-white/[0.05] text-xs font-semibold text-slate-600 dark:text-slate-300">
            <FiClock className="w-3.5 h-3.5 text-active shrink-0" />
            <span>{duration} Mins</span>
          </div>

          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-100 dark:border-white/[0.05] text-xs font-semibold text-slate-600 dark:text-slate-300">
            <FiCalendar className="w-3.5 h-3.5 text-active shrink-0" />
            <span className="truncate">{classSchedule ? classSchedule.split(",")[0] : "Weekly"}</span>
          </div>
        </div>

        {/* Description */}
        <p className="font-['Inter'] text-xs sm:text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mt-3.5 leading-relaxed flex-1">
          {description}
        </p>

        {/* Divider */}
        <div className="border-t border-slate-100 dark:border-white/[0.08] my-4" />

        {/* Card Action Row */}
        <div className="flex items-center justify-between gap-3 mt-auto">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="font-['Outfit'] text-2xl font-black text-foreground">
                ${price}
              </span>
              <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-400">
                /month
              </span>
            </div>
            <span className="text-[10px] text-emerald-500 font-bold block">
              Monthly Pass
            </span>
          </div>

          <Link href={`/all-classes/${_id}`} className="shrink-0">
            <button
              type="button"
              className="group/btn relative inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-active dark:hover:bg-active dark:hover:text-white text-xs font-bold transition-all duration-300 shadow-md hover:shadow-active/30 cursor-pointer hover:animate__animated hover:animate__pulse"
            >
              <span>View Details</span>
              <FiArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform duration-200" />
            </button>
          </Link>
        </div>
      </div>
    </motion.div>
  </ScrollAnimate>
  );
}
