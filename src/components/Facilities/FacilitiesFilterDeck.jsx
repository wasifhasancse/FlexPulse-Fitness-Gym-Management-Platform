"use client";

import { motion, LayoutGroup, useInView } from "framer-motion";
import { useRef } from "react";
import {
  FiSearch,
  FiX,
  FiGrid,
  FiList,
  FiLayers,
  FiMapPin,
  FiRefreshCw,
  FiCompass,
} from "react-icons/fi";
import {
  FaDumbbell,
  FaFire,
  FaSpa,
  FaHeartbeat,
  FaWater,
} from "react-icons/fa";
import { FiZap } from "react-icons/fi";

const TRANSITION_EASE = [0.16, 1, 0.3, 1];

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

const pillsContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.1,
    },
  },
};

const pillItemVariants = {
  hidden: { opacity: 0, y: 14, scale: 0.94 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 220, damping: 20 },
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

export default function FacilitiesFilterDeck({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedLevel,
  setSelectedLevel,
  viewMode,
  setViewMode,
  categoryTabs = [],
  floorLevels = [],
  totalZones = 0,
  filteredCount = 0,
  facilityZones = [],
  resetAllFilters,
}) {
  const deckRef = useRef(null);
  const isDeckInView = useInView(deckRef, { once: true, amount: 0.1 });

  const hasActiveFilters =
    searchQuery.trim().length > 0 ||
    selectedCategory !== "all" ||
    selectedLevel !== "all";

  return (
    <motion.div
      ref={deckRef}
      variants={filterDeckVariants}
      initial="hidden"
      animate={isDeckInView ? "visible" : "hidden"}
      className="p-4 sm:p-5 rounded-3xl bg-brand-900/40 dark:bg-[#121026]/75 border border-brand-500/20 backdrop-blur-xl shadow-xs space-y-4"
    >
      {/* ── ROW 1: Search Box & View Mode Switcher ── */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
        {/* Search Box */}
        <motion.div variants={searchBoxVariants} className="relative flex-1 max-w-xl">
          <motion.div
            variants={searchIconVariants}
            className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none"
          >
            <FiSearch className="w-4 h-4 text-active" />
          </motion.div>
          <input
            type="text"
            placeholder="Search equipment or arena (e.g., Eleiko, Cold Plunge, Turf, Sauna, Rogue)..."
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

        {/* View Mode Toggle */}
        <motion.div variants={toolsRowVariants} className="shrink-0 self-end sm:self-auto">
          <LayoutGroup id="facilitiesViewModeGroup">
            <div className="flex items-center bg-brand-500/5 dark:bg-[#1B1A55]/30 p-1 rounded-2xl border border-brand-500/20">
              {[
                { id: "split", label: "Showcase", icon: FiLayers, title: "Alternating Left / Right Showcase" },
                { id: "grid", label: "Cards", icon: FiGrid, title: "Card Grid View" },
                { id: "blueprint", label: "Specs Ledger", icon: FiList, title: "Blueprint Spec Ledger View" },
              ].map((item) => {
                const Icon = item.icon;
                const isActive = viewMode === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setViewMode(item.id)}
                    className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-['Inter'] text-xs font-bold transition-colors cursor-pointer ${
                      isActive ? "text-btn-text" : "text-secondary hover:text-foreground"
                    }`}
                    title={item.title}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="activeFacilitiesViewModePill"
                        className="absolute inset-0 rounded-xl bg-active shadow-2xs"
                        transition={{ type: "spring", stiffness: 450, damping: 35 }}
                      />
                    )}
                    <Icon className="w-3.5 h-3.5 relative z-10" />
                    <span className="relative z-10 hidden sm:inline">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </LayoutGroup>
        </motion.div>
      </div>

      {/* ── ROW 2: Floor Level Selector Pills with Sliding Highlight ── */}
      <motion.div variants={dividerLineVariants} className="pt-3 border-t border-brand-500/15 origin-left">
        <LayoutGroup id="facilitiesLevelGroup">
          <motion.div
            variants={pillsContainerVariants}
            initial="hidden"
            animate={isDeckInView ? "visible" : "hidden"}
            className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar scroll-smooth"
          >
            <span className="text-secondary font-bold text-[11px] uppercase tracking-wider mr-1 shrink-0 flex items-center gap-1.5 font-['Inter']">
              <FiMapPin className="w-3.5 h-3.5 text-active" />
              <span>Campus Level:</span>
            </span>

            {floorLevels.map((lvl) => {
              const isSelected = selectedLevel === lvl.id;
              return (
                <motion.button
                  key={lvl.id}
                  variants={pillItemVariants}
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.96 }}
                  type="button"
                  onClick={() => setSelectedLevel(lvl.id)}
                  className={`group/lvl relative flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-['Inter'] text-xs font-semibold whitespace-nowrap transition-all duration-300 cursor-pointer shrink-0 select-none ${
                    isSelected
                      ? "text-btn-text font-bold shadow-2xs"
                      : "bg-card-bg/90 dark:bg-[#121026] text-secondary hover:text-active hover:bg-active/10 dark:hover:bg-active/15 border border-brand-500/20 hover:border-active/60 shadow-2xs hover:shadow-xs"
                  }`}
                >
                  {isSelected && (
                    <motion.span
                      layoutId="activeFacilitiesLevelPill"
                      className="absolute inset-0 rounded-xl bg-active shadow-2xs"
                      transition={{ type: "spring", stiffness: 450, damping: 35 }}
                    />
                  )}
                  <span className="relative z-10">{lvl.label}</span>
                  <span
                    className={`relative z-10 px-1.5 py-0.2 rounded-full text-[10px] font-black transition-colors ${
                      isSelected
                        ? "bg-white/25 text-btn-text"
                        : "bg-brand-500/10 text-secondary group-hover/lvl:bg-active/20 group-hover/lvl:text-active"
                    }`}
                  >
                    {lvl.count}
                  </span>
                </motion.button>
              );
            })}
          </motion.div>
        </LayoutGroup>
      </motion.div>

      {/* ── ROW 3: Arena Category Tabs with Active Sliding Highlight ── */}
      <motion.div variants={dividerLineVariants} className="pt-3 border-t border-brand-500/15 origin-left">
        <LayoutGroup id="facilitiesCategoryGroup">
          <motion.div
            variants={pillsContainerVariants}
            initial="hidden"
            animate={isDeckInView ? "visible" : "hidden"}
            className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar scroll-smooth"
          >
            {categoryTabs.map((tab) => {
              const Icon = tab.icon;
              const isSelected = selectedCategory === tab.id;
              const count =
                tab.id === "all"
                  ? totalZones
                  : facilityZones.filter((z) => z.categoryKey === tab.id).length;

              return (
                <motion.button
                  key={tab.id}
                  variants={pillItemVariants}
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.96 }}
                  type="button"
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`group/cat relative flex items-center gap-2 px-3.5 py-2 rounded-2xl font-['Inter'] text-xs font-bold whitespace-nowrap transition-all duration-300 cursor-pointer shrink-0 select-none ${
                    isSelected
                      ? "text-btn-text shadow-xs"
                      : "bg-card-bg/90 dark:bg-[#121026] text-secondary hover:text-active hover:bg-active/10 dark:hover:bg-active/15 border border-brand-500/20 hover:border-active/60 shadow-2xs hover:shadow-xs"
                  }`}
                >
                  {isSelected && (
                    <motion.span
                      layoutId="activeFacilitiesCategoryPill"
                      className="absolute inset-0 rounded-2xl bg-active shadow-xs"
                      transition={{ type: "spring", stiffness: 450, damping: 35 }}
                    />
                  )}
                  <Icon
                    className={`w-3.5 h-3.5 relative z-10 transition-transform duration-200 ${
                      isSelected
                        ? "text-btn-text"
                        : "text-secondary/70 group-hover/cat:text-active group-hover/cat:scale-115"
                    }`}
                  />
                  <span className="relative z-10">{tab.label}</span>
                  <span
                    className={`relative z-10 px-1.5 py-0.5 rounded-full text-[10px] font-black transition-colors ${
                      isSelected
                        ? "bg-white/25 text-btn-text"
                        : "bg-brand-500/10 text-secondary group-hover/cat:bg-active/20 group-hover/cat:text-active"
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

      {/* ── ROW 4: Status Telemetry & Reset CTA ── */}
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
            Showing <strong className="text-foreground font-black">{filteredCount}</strong> of{" "}
            <strong className="text-foreground font-black">{totalZones}</strong> verified athletic zones
            {selectedCategory !== "all" && (
              <span className="ml-1 text-active font-bold">
                • {categoryTabs.find((t) => t.id === selectedCategory)?.label}
              </span>
            )}
            {selectedLevel !== "all" && (
              <span className="ml-1 text-active font-bold">
                • {floorLevels.find((l) => l.id === selectedLevel)?.label}
              </span>
            )}
            {searchQuery && (
              <span className="ml-1 text-secondary">
                matching &quot;<span className="text-foreground font-semibold">{searchQuery}</span>&quot;
              </span>
            )}
          </span>
        </div>

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
