"use client";

import { motion, LayoutGroup, useInView } from "framer-motion";
import { useRef } from "react";
import {
  FiSearch,
  FiX,
  FiChevronDown,
  FiGrid,
  FiList,
  FiRefreshCw,
  FiSliders,
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

const SPECIALTY_ICONS = {
  All: FaLayerGroup,
  Weights: FaDumbbell,
  HIIT: FaFire,
  Stretching: FaSpa,
  Combat: FaFistRaised,
  Pilates: FaHeartbeat,
  Cardio: FaRunning,
  CrossFit: FaDumbbell,
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

const categoryContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.15,
    },
  },
};

const categoryItemVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 220, damping: 20 },
  },
};

const statusRowVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.85,
      ease: "easeOut",
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
};

const badgeItemVariants = {
  hidden: { opacity: 0, scale: 0.75, y: 6 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 260, damping: 20 },
  },
};

export default function TrainersFilterDeck({
  searchQuery,
  setSearchQuery,
  selectedSpecialty,
  setSelectedSpecialty,
  sortBy,
  setSortBy,
  viewMode,
  setViewMode,
  specialtyStats,
  totalItems,
  startIndex,
  endIndex,
  resetAllFilters,
  hasActiveFilters,
}) {
  const containerRef = useRef(null);
  const isDeckInView = useInView(containerRef, { once: true, amount: 0.15 });

  return (
    <div ref={containerRef} className="w-full mb-10">
      <motion.div
        variants={filterDeckVariants}
        initial="hidden"
        animate={isDeckInView ? "visible" : "hidden"}
        className="relative rounded-3xl bg-card-bg/95 dark:bg-[#070F2B]/95 backdrop-blur-xl border border-brand-500/20 shadow-sm p-4 sm:p-6 lg:p-7 transition-all duration-300 space-y-5"
      >
        {/* Row 1: Search Box & Tools (Sort & View Switcher) */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3.5">
          {/* Search Box with Athletic Surface Tokens */}
          <motion.div variants={searchBoxVariants} className="relative flex-1 min-w-[260px]">
            <motion.div
              variants={searchIconVariants}
              className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-secondary"
            >
              <FiSearch className="w-4 h-4 text-active" />
            </motion.div>
            <input
              type="text"
              placeholder="Search coach by name, specialty, or discipline..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-9 py-3 bg-searchbox-bg hover:bg-searchbox-hover border border-brand-500/25 focus:border-active/60 focus:ring-1 focus:ring-active/20 rounded-2xl font-['Inter'] text-xs sm:text-sm text-foreground placeholder:text-secondary/70 focus:outline-none transition-all shadow-2xs"
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

          {/* Right Tools Cluster: Sort Dropdown & View Mode Switcher */}
          <motion.div variants={toolsRowVariants} className="flex items-center justify-between sm:justify-end gap-3">
            {/* Sort Dropdown */}
            <div className="relative min-w-[170px] sm:w-auto">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full pl-3.5 pr-9 py-2.5 bg-searchbox-bg hover:bg-searchbox-hover border border-brand-500/25 hover:border-active/50 rounded-2xl font-['Inter'] text-xs font-bold text-foreground focus:outline-none focus:border-active/60 cursor-pointer appearance-none shadow-2xs transition-colors"
              >
                <option value="classes-desc" className="bg-card-bg text-foreground">Most Active Classes</option>
                <option value="rating-desc" className="bg-card-bg text-foreground">Top Rated (⭐ 5.0)</option>
                <option value="experience-desc" className="bg-card-bg text-foreground">Most Experienced</option>
                <option value="name-asc" className="bg-card-bg text-foreground">Name (A – Z)</option>
              </select>
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-secondary">
                <FiChevronDown className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* View Switcher with Layout Animation */}
            <LayoutGroup id="trainersViewModeGroup">
              <div className="flex items-center bg-brand-500/5 dark:bg-[#1B1A55]/30 p-1 rounded-2xl border border-brand-500/20">
                <button
                  type="button"
                  onClick={() => setViewMode("grid")}
                  title="Grid View"
                  className={`relative p-2 rounded-xl transition-colors cursor-pointer ${
                    viewMode === "grid" ? "text-white font-bold" : "text-secondary hover:text-foreground"
                  }`}
                >
                  {viewMode === "grid" && (
                    <motion.span
                      layoutId="activeTrainersViewModePill"
                      className="absolute inset-0 rounded-xl bg-active shadow-xs"
                      transition={{ type: "spring", stiffness: 450, damping: 35 }}
                    />
                  )}
                  <FiGrid className="w-4 h-4 relative z-10" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("list")}
                  title="Detailed Studio View"
                  className={`relative p-2 rounded-xl transition-colors cursor-pointer ${
                    viewMode === "list" ? "text-white font-bold" : "text-secondary hover:text-foreground"
                  }`}
                >
                  {viewMode === "list" && (
                    <motion.span
                      layoutId="activeTrainersViewModePill"
                      className="absolute inset-0 rounded-xl bg-active shadow-xs"
                      transition={{ type: "spring", stiffness: 450, damping: 35 }}
                    />
                  )}
                  <FiList className="w-4 h-4 relative z-10" />
                </button>
              </div>
            </LayoutGroup>
          </motion.div>
        </div>

        {/* Row 2: Specialty Discipline Tabs with Vibrant Athletic Hover Style */}
        <motion.div variants={dividerLineVariants} className="pt-3 border-t border-brand-500/15 origin-left">
          <LayoutGroup id="trainersSpecialtyGroup">
            <motion.div
              variants={categoryContainerVariants}
              initial="hidden"
              animate={isDeckInView ? "visible" : "hidden"}
              className="flex items-center gap-2 overflow-x-auto pb-1.5 no-scrollbar scroll-smooth"
            >
              {specialtyStats.keys.map((spec) => {
                const isSelected = selectedSpecialty === spec;
                const count = specialtyStats.counts[spec] || 0;
                const Icon = SPECIALTY_ICONS[spec] || FaLayerGroup;

                return (
                  <motion.button
                    key={spec}
                    variants={categoryItemVariants}
                    whileHover={{ y: -2, scale: 1.02 }}
                    whileTap={{ scale: 0.96 }}
                    type="button"
                    onClick={() => setSelectedSpecialty(spec)}
                    className={`group/tab relative flex items-center gap-2 px-4 py-2.5 rounded-2xl font-['Inter'] text-xs font-bold whitespace-nowrap transition-all duration-300 cursor-pointer shrink-0 select-none ${
                      isSelected
                        ? "text-white shadow-xs"
                        : "bg-card-bg/90 dark:bg-[#121026] text-secondary hover:text-active hover:bg-active/10 dark:hover:bg-active/15 border border-brand-500/20 hover:border-active/60 shadow-2xs hover:shadow-xs"
                    }`}
                  >
                    {isSelected && (
                      <motion.span
                        layoutId="activeTrainersSpecialtyPill"
                        className="absolute inset-0 rounded-2xl bg-active shadow-xs"
                        transition={{ type: "spring", stiffness: 450, damping: 35 }}
                      />
                    )}
                    <Icon
                      className={`w-3.5 h-3.5 relative z-10 transition-all duration-200 ${
                        isSelected
                          ? "text-white"
                          : "text-secondary/70 group-hover/tab:text-active group-hover/tab:scale-115 group-hover/tab:rotate-6"
                      }`}
                    />
                    <span className="relative z-10">{spec === "All" ? "All Coaches" : spec}</span>
                    <span
                      className={`relative z-10 px-1.5 py-0.5 rounded-full text-[10px] font-black transition-colors ${
                        isSelected
                          ? "bg-white/25 text-white"
                          : "bg-brand-500/10 text-secondary group-hover/tab:bg-active/20 group-hover/tab:text-active"
                      }`}
                    >
                      {count}
                    </span>
                  </motion.button>
                );
              })}
            </motion.div>
          </LayoutGroup>
        </motion.div>

        {/* Row 3: Status Summary & Active Filter Badges */}
        <motion.div
          variants={statusRowVariants}
          className="pt-3 border-t border-brand-500/15 flex flex-wrap items-center justify-between gap-3 text-xs text-secondary"
        >
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <span className="font-['Inter'] text-xs">
              Showing <strong className="text-foreground font-extrabold">{totalItems > 0 ? startIndex + 1 : 0}–{endIndex}</strong> of{" "}
              <strong className="text-foreground font-extrabold">{totalItems}</strong> accredited faculty coaches
            </span>
          </div>

          {/* Active Filter Badges */}
          {hasActiveFilters && (
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-secondary">
                Active:
              </span>

              {searchQuery && (
                <motion.span variants={badgeItemVariants} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-brand-500/10 border border-brand-500/20 text-foreground text-[11px] font-bold">
                  <span>&ldquo;{searchQuery}&rdquo;</span>
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="hover:text-active cursor-pointer"
                    title="Remove keyword filter"
                  >
                    <FiX className="w-3 h-3" />
                  </button>
                </motion.span>
              )}

              {selectedSpecialty !== "All" && (
                <motion.span variants={badgeItemVariants} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-active/10 border border-active/30 text-active text-[11px] font-bold">
                  <span>{selectedSpecialty}</span>
                  <button
                    type="button"
                    onClick={() => setSelectedSpecialty("All")}
                    className="hover:text-foreground cursor-pointer"
                    title="Remove specialty filter"
                  >
                    <FiX className="w-3 h-3" />
                  </button>
                </motion.span>
              )}

              {/* Strict Type 3 Filter Button for Reset */}
              <motion.button
                variants={badgeItemVariants}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={resetAllFilters}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-transparent hover:bg-searchbox-bg text-secondary hover:text-active border border-brand-500/20 hover:border-active/40 text-[11px] font-semibold transition-all cursor-pointer"
              >
                <FiRefreshCw className="w-3 h-3" />
                <span>Clear All</span>
              </motion.button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}
