"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  FiCalendar,
  FiClock,
  FiMapPin,
  FiZap,
  FiRefreshCw,
  FiArrowRight,
  FiUser,
  FiTag,
} from "react-icons/fi";
import { FaFireAlt } from "react-icons/fa";
import ScheduleCard from "./ScheduleCard";

const TRANSITION_EASE = [0.16, 1, 0.3, 1];

// Outer Grid Container with Staged Viewport Delay (Triggered Entrance)
const scheduleGridContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.12,
      staggerChildren: 0.12,
    },
  },
};

const columnVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.85, ease: TRANSITION_EASE },
  },
};

const tableRowVariants = {
  hidden: { opacity: 0, x: -16 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: TRANSITION_EASE },
  },
};

export default function ScheduleGrid({
  viewMode = "grid",
  paginatedSessions = [],
  filteredSessions = [],
  weeklyGroupedSessions = {},
  daysOfWeek = [],
  selectedDay = "All Days",
  totalItems = 0,
  resetAllFilters,
}) {
  const containerRef = useRef(null);
  const cardsTriggered = useInView(containerRef, { once: true, amount: 0.08 });

  // ── EMPTY STATE ──
  if (totalItems === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: TRANSITION_EASE }}
        className="text-center py-16 px-6 rounded-3xl bg-brand-900/30 dark:bg-[#121026]/50 border border-brand-500/20 backdrop-blur-xl shadow-xs space-y-4 max-w-xl mx-auto"
      >
        <div className="w-16 h-16 rounded-3xl bg-active/10 border border-active/20 flex items-center justify-center mx-auto text-active">
          <FiCalendar className="w-8 h-8" />
        </div>
        <div className="space-y-1">
          <h3 className="font-['Outfit'] text-xl sm:text-2xl font-black text-foreground">
            No Workout Sessions Found
          </h3>
          <p className="font-['Inter'] text-xs sm:text-sm text-secondary leading-relaxed">
            No training sessions match your selected day or category criteria.
            Try resetting your filters or selecting &quot;All Days&quot;.
          </p>
        </div>
        <button
          type="button"
          onClick={resetAllFilters}
          className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-btn-bg text-btn-text font-['Inter'] text-xs font-black shadow-xs hover:shadow-md transition-all duration-300 overflow-hidden group hover:scale-102 cursor-pointer"
        >
          <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />
          <FiRefreshCw className="w-3.5 h-3.5 text-btn-text relative z-10" />
          <span className="relative z-10">Show All Sessions</span>
        </button>
      </motion.div>
    );
  }

  // ── VIEW 1: CARD GRID VIEW (Triggered Staged Viewport Delay) ──
  if (viewMode === "grid") {
    return (
      <div ref={containerRef} className="space-y-6">
        <motion.div
          layout
          variants={scheduleGridContainerVariants}
          initial="hidden"
          animate={cardsTriggered ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {paginatedSessions.map((session, index) => (
              <ScheduleCard
                key={`${session._id}-${session.day}-${index}`}
                session={session}
                isTriggered={cardsTriggered}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    );
  }

  // ── VIEW 2: WEEKLY DAY-BY-DAY TIMETABLE COLUMNS ──
  if (viewMode === "weekly") {
    return (
      <div
        ref={containerRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4"
      >
        {daysOfWeek.map((day, dIdx) => {
          const daySessions = weeklyGroupedSessions[day.full] || [];
          const isTodayFilter = selectedDay === day.full;

          return (
            <motion.div
              key={day.full}
              variants={columnVariants}
              initial="hidden"
              animate={cardsTriggered ? "visible" : "hidden"}
              transition={{ delay: dIdx * 0.06 }}
              className={`rounded-3xl border p-3.5 flex flex-col space-y-3 transition-all duration-300 ${
                isTodayFilter
                  ? "bg-active/10 border-active/50 shadow-xs"
                  : "bg-brand-900/30 dark:bg-[#121026]/60 border-brand-500/15 hover:border-brand-500/30"
              }`}
            >
              {/* Day Header */}
              <div className="pb-2.5 border-b border-brand-500/15 flex items-center justify-between">
                <div>
                  <strong className="font-['Outfit'] text-sm sm:text-base font-black text-foreground block">
                    {day.full}
                  </strong>
                  <span className="text-[10px] text-secondary font-['Inter']">
                    {day.short} Schedule
                  </span>
                </div>
                <span
                  className={`text-[10px] font-black px-2 py-0.5 rounded-full font-['Inter'] ${
                    daySessions.length > 0
                      ? "bg-active/20 text-active"
                      : "bg-brand-500/10 text-secondary"
                  }`}
                >
                  {daySessions.length}
                </span>
              </div>

              {/* Day's Session Cards */}
              {daySessions.length === 0 ? (
                <div className="py-10 text-center text-xs text-secondary/60 font-['Inter'] flex flex-col items-center justify-center gap-1.5">
                  <FiCalendar className="w-5 h-5 opacity-40" />
                  <span>No classes</span>
                </div>
              ) : (
                <div className="space-y-2.5 flex-1">
                  {daySessions.map((session, sIdx) => (
                    <Link
                      key={`col-${session._id}-${sIdx}`}
                      href={`/all-classes/${session._id}`}
                      className="block p-3 rounded-2xl bg-card-bg/90 dark:bg-[#1B1A55]/40 border border-brand-500/15 hover:border-active/60 hover:shadow-xs transition-all duration-200 space-y-2 group"
                    >
                      <div className="flex items-center justify-between text-[11px] font-['Inter']">
                        <span className="font-black text-active flex items-center gap-1">
                          <FiClock className="w-3 h-3" />
                          {session.time}
                        </span>
                        <span className="text-[9px] px-1.5 py-0.2 rounded-md bg-brand-500/10 text-secondary font-bold">
                          {session.category}
                        </span>
                      </div>

                      <h4 className="font-['Outfit'] text-xs font-bold text-foreground group-hover:text-active transition-colors line-clamp-1 group-hover:animate-[headShake_1s_ease-in-out]">
                        {session.className}
                      </h4>

                      <div className="text-[10px] font-['Inter'] text-secondary flex items-center justify-between pt-1 border-t border-brand-500/10">
                        <span className="truncate max-w-[90px]">
                          {session.authorName.split(" ")[0]}
                        </span>
                        <span className="font-black text-foreground">
                          ${session.price}/mo
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    );
  }

  // ── VIEW 3: TABLE LEDGER VIEW ──
  return (
    <div ref={containerRef} className="space-y-4">
      <div className="overflow-x-auto rounded-3xl border border-brand-500/20 bg-brand-900/40 dark:bg-[#121026]/75 backdrop-blur-xl shadow-xs">
        <table className="w-full text-left font-['Inter'] text-xs sm:text-sm">
          <thead className="border-b border-brand-500/20 bg-brand-800/20 text-secondary uppercase font-black tracking-wider text-[11px]">
            <tr>
              <th className="py-3.5 px-4 sm:px-6">Day & Time</th>
              <th className="py-3.5 px-4 sm:px-6">Class Session</th>
              <th className="py-3.5 px-4 sm:px-6 hidden md:table-cell">Studio Location</th>
              <th className="py-3.5 px-4 sm:px-6">Master Coach</th>
              <th className="py-3.5 px-4 sm:px-6 hidden sm:table-cell">Intensity & Burn</th>
              <th className="py-3.5 px-4 sm:px-6 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-500/10">
            {paginatedSessions.map((session, idx) => (
              <motion.tr
                key={`tbl-${session._id}-${session.day}-${idx}`}
                variants={tableRowVariants}
                initial="hidden"
                animate={cardsTriggered ? "visible" : "hidden"}
                transition={{ delay: idx * 0.05 }}
                className="hover:bg-brand-500/5 transition-colors group"
              >
                {/* Day & Time */}
                <td className="py-3.5 px-4 sm:px-6 whitespace-nowrap">
                  <span className="font-black text-foreground block font-['Outfit'] text-sm">
                    {session.day}
                  </span>
                  <span className="text-xs text-secondary flex items-center gap-1.5 mt-0.5">
                    <FiClock className="w-3.5 h-3.5 text-active" />
                    <span className="font-semibold text-foreground/90">{session.time}</span>
                    <span className="text-secondary/50">•</span>
                    <span>{session.duration}</span>
                  </span>
                </td>

                {/* Class Session */}
                <td className="py-3.5 px-4 sm:px-6">
                  <Link
                    href={`/all-classes/${session._id}`}
                    className="font-bold text-foreground group-hover:text-active transition-colors block font-['Outfit'] text-sm line-clamp-1"
                  >
                    {session.className}
                  </Link>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-brand-500/10 text-active font-black inline-block mt-1">
                    {session.category}
                  </span>
                </td>

                {/* Studio Location */}
                <td className="py-3.5 px-4 sm:px-6 hidden md:table-cell text-secondary">
                  <div className="flex items-center gap-1.5">
                    <FiMapPin className="w-3.5 h-3.5 text-active shrink-0" />
                    <span className="truncate">{session.room}</span>
                  </div>
                </td>

                {/* Master Coach */}
                <td className="py-3.5 px-4 sm:px-6 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <div className="relative w-6 h-6 rounded-full overflow-hidden bg-brand-500/20 shrink-0 border border-brand-500/30">
                      <img
                        src={session.authorImage}
                        alt={session.authorName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="font-bold text-foreground text-xs">
                      {session.authorName}
                    </span>
                  </div>
                </td>

                {/* Intensity & Calorie Burn */}
                <td className="py-3.5 px-4 sm:px-6 hidden sm:table-cell">
                  <span className="text-xs text-amber-400 font-bold flex items-center gap-1">
                    <FaFireAlt className="w-3 h-3 text-amber-400" />
                    {session.calories}
                  </span>
                  <span className="text-[10px] text-secondary font-semibold uppercase block mt-0.5">
                    {session.level}
                  </span>
                </td>

                {/* Action CTA */}
                <td className="py-3.5 px-4 sm:px-6 text-right whitespace-nowrap">
                  <div className="inline-flex items-center gap-2">
                    <Link
                      href={`/all-classes/${session._id}`}
                      className="px-3 py-1.5 rounded-xl border border-brand-500/25 bg-searchbox-bg hover:bg-searchbox-hover hover:border-active/60 text-secondary hover:text-foreground text-xs font-bold transition-all shadow-2xs"
                    >
                      Details
                    </Link>
                    <Link
                      href={`/all-classes/${session._id}`}
                      className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-xl bg-btn-bg text-btn-text text-xs font-black shadow-2xs hover:shadow-xs transition-all hover:scale-102"
                    >
                      <FiZap className="w-3 h-3" />
                      <span>Book (${session.price})</span>
                    </Link>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
