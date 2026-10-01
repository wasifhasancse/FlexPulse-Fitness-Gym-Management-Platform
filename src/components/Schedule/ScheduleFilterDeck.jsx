"use client";

import { motion, LayoutGroup, useInView } from "framer-motion";
import { useRef } from "react";
import {
  FiSearch,
  FiX,
  FiGrid,
  FiColumns,
  FiList,
  FiPrinter,
  FiCalendar,
  FiCheck,
  FiRefreshCw,
} from "react-icons/fi";
import {
  FaDumbbell,
  FaFire,
  FaSpa,
  FaFistRaised,
  FaHeartbeat,
  FaRunning,
  FaLayerGroup,
} from "react-icons/fa";

const TRANSITION_EASE = [0.16, 1, 0.3, 1];

const CATEGORY_ICONS = {
  All: FaLayerGroup,
  Weights: FaDumbbell,
  HIIT: FaFire,
  Stretching: FaSpa,
  Combat: FaFistRaised,
  Pilates: FaHeartbeat,
  Cardio: FaRunning,
};

// ── Multi-Element Triggered Transition Variants ──
const filterDeckVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1.1,
      ease: TRANSITION_EASE,
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const dayContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.12,
    },
  },
};

const dayItemVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.94 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 220, damping: 20 },
  },
};

const searchBoxVariants = {
  hidden: { opacity: 0, x: -24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.9, ease: TRANSITION_EASE },
  },
};

const searchIconVariants = {
  hidden: { opacity: 0, scale: 0, rotate: -30 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { type: "spring", stiffness: 220, damping: 18, delay: 0.15 },
  },
};

const toolsRowVariants = {
  hidden: { opacity: 0, x: 24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.9, ease: TRANSITION_EASE },
  },
};

const dividerLineVariants = {
  hidden: { opacity: 0, scaleX: 0 },
  visible: {
    opacity: 1,
    scaleX: 1,
    transition: { duration: 0.95, ease: TRANSITION_EASE },
  },
};

const statusRowVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: TRANSITION_EASE },
  },
};

export default function ScheduleFilterDeck({
  daysOfWeek = [],
  dayCounts = {},
  selectedDay = "All Days",
  setSelectedDay,
  categories = [],
  selectedCategory = "All",
  setSelectedCategory,
  searchQuery = "",
  setSearchQuery,
  viewMode = "grid",
  setViewMode,
  handlePrint,
  resetAllFilters,
  hasActiveFilters = false,
  totalItems = 0,
  startIndex = 0,
  endIndex = 0,
  scheduleGridRef,
}) {
  const deckRef = useRef(null);
  const isDeckInView = useInView(deckRef, { once: true, amount: 0.1 });

  return (
    <motion.div
      ref={deckRef}
      variants={filterDeckVariants}
      initial="hidden"
      animate={isDeckInView ? "visible" : "hidden"}
      className="p-4 sm:p-5 rounded-3xl bg-brand-900/40 dark:bg-[#121026]/75 border border-brand-500/20 backdrop-blur-xl shadow-xs space-y-4"
    >
      {/* ── ROW 1: Day of Week Selector Pills with Active Sliding Highlight ── */}
      <LayoutGroup id="scheduleDaySelectorGroup">
        <motion.div
          variants={dayContainerVariants}
          initial="hidden"
          animate={isDeckInView ? "visible" : "hidden"}
          className="flex items-center gap-2 overflow-x-auto pb-1.5 no-scrollbar scroll-smooth"
        >
          {/* "All Days" Pill */}
          <motion.button
            variants={dayItemVariants}
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
            type="button"
            onClick={() => setSelectedDay("All Days")}
            className={`group/day relative flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-2xl font-['Inter'] text-xs font-bold whitespace-nowrap transition-all duration-300 cursor-pointer shrink-0 select-none ${
              selectedDay === "All Days"
                ? "text-btn-text shadow-xs"
                : "bg-card-bg/90 dark:bg-[#121026] text-secondary hover:text-active hover:bg-active/10 dark:hover:bg-active/15 border border-brand-500/20 hover:border-active/60 shadow-2xs hover:shadow-xs"
            }`}
          >
            {selectedDay === "All Days" && (
              <motion.span
                layoutId="activeScheduleDayPill"
                className="absolute inset-0 rounded-2xl bg-active shadow-xs"
                transition={{ type: "spring", stiffness: 450, damping: 35 }}
              />
            )}
            <FiCalendar
              className={`w-3.5 h-3.5 relative z-10 transition-transform duration-200 ${
                selectedDay === "All Days"
                  ? "text-btn-text"
                  : "text-secondary/70 group-hover/day:text-active group-hover/day:scale-115"
              }`}
            />
            <span className="relative z-10">All Days</span>
            <span
              className={`relative z-10 px-1.5 py-0.5 rounded-full text-[10px] font-black transition-colors ${
                selectedDay === "All Days"
                  ? "bg-white/25 text-btn-text"
                  : "bg-brand-500/10 text-secondary group-hover/day:bg-active/20 group-hover/day:text-active"
              }`}
            >
              {dayCounts["All Days"] || 0}
            </span>
          </motion.button>

          {/* Individual Days: Mon - Sun */}
          {daysOfWeek.map((day) => {
            const isSelected = selectedDay === day.full;
            const count = dayCounts[day.full] || 0;

            return (
              <motion.button
                key={day.full}
                variants={dayItemVariants}
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                type="button"
                onClick={() => setSelectedDay(day.full)}
                className={`group/day relative flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl font-['Inter'] text-xs font-bold whitespace-nowrap transition-all duration-300 cursor-pointer shrink-0 select-none ${
                  isSelected
                    ? "text-btn-text shadow-xs"
                    : "bg-card-bg/90 dark:bg-[#121026] text-secondary hover:text-active hover:bg-active/10 dark:hover:bg-active/15 border border-brand-500/20 hover:border-active/60 shadow-2xs hover:shadow-xs"
                }`}
              >
                {isSelected && (
                  <motion.span
                    layoutId="activeScheduleDayPill"
                    className="absolute inset-0 rounded-2xl bg-active shadow-xs"
                    transition={{ type: "spring", stiffness: 450, damping: 35 }}
                  />
                )}
                <span className="relative z-10 hidden sm:inline">{day.full}</span>
                <span className="relative z-10 sm:hidden">{day.short}</span>
                <span
                  className={`relative z-10 px-1.5 py-0.5 rounded-full text-[10px] font-black transition-colors ${
                    isSelected
                      ? "bg-white/25 text-btn-text"
                      : "bg-brand-500/10 text-secondary group-hover/day:bg-active/20 group-hover/day:text-active"
                  }`}
                >
                  {count}
                </span>
              </motion.button>
            );
          })}
        </motion.div>
      </LayoutGroup>

      {/* ── ROW 2: Search, Category Tabs, View Switcher & Print ── */}
      <motion.div
        variants={dividerLineVariants}
        className="pt-3 border-t border-brand-500/15 origin-left flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 sm:gap-4"
      >
        {/* Search Input Box */}
        <motion.div
          variants={searchBoxVariants}
          className="relative flex-1 max-w-lg"
        >
          <motion.div
            variants={searchIconVariants}
            className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none"
          >
            <FiSearch className="w-4 h-4 text-active" />
          </motion.div>
          <input
            type="text"
            placeholder="Search class name, master coach, or studio room..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-9 py-2.5 bg-searchbox-bg hover:bg-searchbox-hover border border-brand-500/25 focus:border-active/60 focus:ring-1 focus:ring-active/20 rounded-2xl font-['Inter'] text-xs sm:text-sm text-foreground placeholder:text-secondary/70 focus:outline-none transition-all shadow-2xs"
          />
          {searchQuery && (
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-3 flex items-center justify-center my-auto w-5 h-5 rounded-full bg-brand-500/10 hover:bg-active text-secondary hover:text-white transition-colors cursor-pointer"
              title="Clear search"
            >
              <FiX className="w-3 h-3" />
            </motion.button>
          )}
        </motion.div>

        {/* Category Discipline Pills */}
        <LayoutGroup id="scheduleCategorySelectorGroup">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 no-scrollbar">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              const Icon = CATEGORY_ICONS[cat] || FaLayerGroup;

              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`group/cat relative flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-['Inter'] text-xs font-semibold whitespace-nowrap transition-all duration-300 cursor-pointer shrink-0 select-none ${
                    isSelected
                      ? "text-btn-text font-bold shadow-2xs"
                      : "bg-card-bg/80 dark:bg-[#121026] text-secondary hover:text-active hover:bg-active/10 border border-brand-500/15 hover:border-active/40"
                  }`}
                >
                  {isSelected && (
                    <motion.span
                      layoutId="activeScheduleCategoryPill"
                      className="absolute inset-0 rounded-xl bg-active shadow-2xs"
                      transition={{ type: "spring", stiffness: 450, damping: 35 }}
                    />
                  )}
                  <Icon
                    className={`w-3 h-3 relative z-10 transition-transform duration-200 ${
                      isSelected
                        ? "text-btn-text"
                        : "text-secondary/60 group-hover/cat:text-active group-hover/cat:scale-110"
                    }`}
                  />
                  <span className="relative z-10">{cat}</span>
                </button>
              );
            })}
          </div>
        </LayoutGroup>

        {/* Right Tools Cluster: Print Timetable & View Switcher */}
        <motion.div
          variants={toolsRowVariants}
          className="flex items-center justify-between lg:justify-end gap-2.5 shrink-0"
        >
          {/* Print Timetable Button (Type 2 Secondary Glass CTA) */}
          <button
            type="button"
            onClick={handlePrint}
            title="Print Official Master Timetable"
            className="group px-3.5 py-2 rounded-2xl border border-brand-500/25 bg-searchbox-bg hover:bg-searchbox-hover hover:border-active/60 text-secondary hover:text-foreground font-['Inter'] text-xs font-bold transition-all shadow-2xs cursor-pointer flex items-center gap-1.5"
          >
            <FiPrinter className="w-3.5 h-3.5 text-active group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline">Print Timetable</span>
            <span className="sm:hidden">Print</span>
          </button>

          {/* View Mode Toggle with Spring Animation */}
          <LayoutGroup id="scheduleViewModeGroup">
            <div className="flex items-center bg-brand-500/5 dark:bg-[#1B1A55]/30 p-1 rounded-2xl border border-brand-500/20">
              {[
                { id: "grid", title: "Card Grid View", icon: FiGrid },
                { id: "weekly", title: "Day-by-Day Timetable", icon: FiColumns },
                { id: "table", title: "Table Ledger View", icon: FiList },
              ].map((mode) => {
                const Icon = mode.icon;
                const isActive = viewMode === mode.id;

                return (
                  <button
                    key={mode.id}
                    type="button"
                    onClick={() => setViewMode(mode.id)}
                    title={mode.title}
                    className={`relative p-2 rounded-xl transition-colors cursor-pointer ${
                      isActive ? "text-btn-text font-bold" : "text-secondary hover:text-foreground"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="activeScheduleViewModePill"
                        className="absolute inset-0 rounded-xl bg-active shadow-2xs"
                        transition={{ type: "spring", stiffness: 450, damping: 35 }}
                      />
                    )}
                    <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 relative z-10" />
                  </button>
                );
              })}
            </div>
          </LayoutGroup>
        </motion.div>
      </motion.div>

      {/* ── ROW 3: Status Summary, Live Telemetry & Active Filter Badges ── */}
      <motion.div
        variants={statusRowVariants}
        className="pt-2.5 border-t border-brand-500/15 flex flex-wrap items-center justify-between gap-2.5 text-xs text-secondary"
      >
        <div className="flex items-center gap-2 flex-wrap">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="font-['Inter'] text-xs">
            Showing{" "}
            <strong className="text-foreground font-black">
              {viewMode === "weekly"
                ? totalItems
                : `${totalItems > 0 ? startIndex + 1 : 0}–${endIndex}`}
            </strong>{" "}
            of <strong className="text-foreground font-black">{totalItems}</strong> scheduled workout sessions
            {selectedDay !== "All Days" && (
              <span className="ml-1 text-active font-bold">
                on {selectedDay}
              </span>
            )}
            {selectedCategory !== "All" && (
              <span className="ml-1 text-active font-bold">
                in {selectedCategory}
              </span>
            )}
            {searchQuery && (
              <span className="ml-1 text-secondary">
                matching &quot;<span className="text-foreground font-semibold">{searchQuery}</span>&quot;
              </span>
            )}
          </span>
        </div>

        {/* Type 3 Tertiary: Reset Filters CTA */}
        {hasActiveFilters && (
          <button
            type="button"
            onClick={resetAllFilters}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-active hover:text-white bg-active/10 hover:bg-active font-['Inter'] text-xs font-bold transition-all duration-200 cursor-pointer"
          >
            <FiRefreshCw className="w-3 h-3" />
            <span>Reset Filters</span>
          </button>
        )}
      </motion.div>
    </motion.div>
  );
}
