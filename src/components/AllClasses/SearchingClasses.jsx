"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition, useRef } from "react";
import { motion, LayoutGroup, AnimatePresence, useInView } from "framer-motion";
import {
  FiSearch,
  FiX,
  FiSliders,
  FiActivity,
  FiRefreshCw,
  FiChevronDown,
  FiCheck
} from "react-icons/fi";
import {
  FaDumbbell,
  FaRunning,
  FaFire,
  FaHeartbeat,
  FaFistRaised,
  FaLayerGroup,
  FaSpa,
} from "react-icons/fa";

const TRANSITION_EASE = [0.16, 1, 0.3, 1];

const CATEGORIES = [
  { name: "All Categories", label: "All Classes", icon: FaLayerGroup },
  { name: "Weights", label: "Strength & Weights", icon: FaDumbbell },
  { name: "HIIT", label: "HIIT & MetCon", icon: FaFire },
  { name: "Cardio", label: "Cardio Endurance", icon: FaRunning },
  { name: "Stretching", label: "Mobility & Stretch", icon: FaSpa },
  { name: "Pilates", label: "Core & Pilates", icon: FaHeartbeat },
  { name: "Combat", label: "Combat & Boxing", icon: FaFistRaised },
];

const DIFFICULTY_LEVELS = [
  { id: "All", label: "All Levels" },
  {
    id: "Beginner",
    label: "Beginner",
    dotColor: "bg-emerald-500",
  },
  {
    id: "Intermediate",
    label: "Intermediate",
    dotColor: "bg-amber-500",
  },
  {
    id: "Advanced",
    label: "Advanced",
    dotColor: "bg-rose-500",
  },
];

const SORT_OPTIONS = [
  { value: "newest", label: "Newest Added" },
  { value: "popular", label: "Most Popular" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "duration-asc", label: "Duration: Short to Long" },
  { value: "duration-desc", label: "Duration: Long to Short" },
];

// ── Multi-Element Triggered Transition Motion Variants (per rule.md) ──
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

const levelSegmentContainerVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.85,
      ease: TRANSITION_EASE,
      staggerChildren: 0.06,
      delayChildren: 0.12,
    },
  },
};

const levelPillItemVariants = {
  hidden: { opacity: 0, scale: 0.88, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 240, damping: 20 },
  },
};

const sortDropdownVariants = {
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

export default function SearchingClasses({ totalClasses = 0 }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const containerRef = useRef(null);
  const isDeckInView = useInView(containerRef, { once: true, amount: 0.15 });

  const urlSearch = searchParams.get("search") || "";
  const urlCategory = searchParams.get("category") || "All Categories";
  const urlDifficulty = searchParams.get("difficulty") || "All";
  const urlSort = searchParams.get("sort") || "newest";

  const [searchInput, setSearchInput] = useState(urlSearch);

  // Synchronize search input if URL changes externally
  useEffect(() => {
    setSearchInput(urlSearch);
  }, [urlSearch]);

  // Unified query navigator - resets page to 1 whenever a filter changes
  const applyFilters = (updates = {}) => {
    const params = new URLSearchParams();

    const nextSearch =
      updates.search !== undefined ? updates.search.trim() : searchInput.trim();
    const nextCategory =
      updates.category !== undefined ? updates.category : urlCategory;
    const nextDifficulty =
      updates.difficulty !== undefined ? updates.difficulty : urlDifficulty;
    const nextSort = updates.sort !== undefined ? updates.sort : urlSort;

    if (nextSearch) params.set("search", nextSearch);
    if (nextCategory && nextCategory !== "All Categories" && nextCategory !== "All") {
      params.set("category", nextCategory);
    }
    if (nextDifficulty && nextDifficulty !== "All" && nextDifficulty !== "All Levels") {
      params.set("difficulty", nextDifficulty);
    }
    if (nextSort && nextSort !== "newest") {
      params.set("sort", nextSort);
    }

    const queryString = params.toString();
    const targetUrl = queryString ? `/all-classes?${queryString}#classes-catalog` : "/all-classes#classes-catalog";

    startTransition(() => {
      router.replace(targetUrl, { scroll: false });
    });
  };

  // Debounced search typing handler
  useEffect(() => {
    if (searchInput.trim() === urlSearch.trim()) return;

    const timer = setTimeout(() => {
      applyFilters({ search: searchInput });
    }, 350);

    return () => clearTimeout(timer);
  }, [searchInput, urlSearch]);

  const handleCategorySelect = (categoryName) => {
    applyFilters({ category: categoryName });
  };

  const handleDifficultySelect = (diffId) => {
    applyFilters({ difficulty: diffId });
  };

  const handleSortChange = (newSort) => {
    applyFilters({ sort: newSort });
  };

  const resetAllFilters = () => {
    setSearchInput("");
    startTransition(() => {
      router.replace("/all-classes#classes-catalog", { scroll: false });
    });
  };

  const hasActiveFilters = Boolean(
    urlSearch ||
      (urlCategory && urlCategory !== "All Categories" && urlCategory !== "All") ||
      (urlDifficulty && urlDifficulty !== "All" && urlDifficulty !== "All Levels") ||
      (urlSort && urlSort !== "newest")
  );

  return (
    <div ref={containerRef} className="w-full mb-10">
      {/* ── Main Glassmorphic Athletic Control Deck with Triggered Transitions ── */}
      <motion.div
        variants={filterDeckVariants}
        initial="hidden"
        animate={isDeckInView ? "visible" : "hidden"}
        className="relative rounded-3xl bg-card-bg/95 dark:bg-[#070F2B]/95 backdrop-blur-xl border border-brand-500/20 shadow-sm p-4 sm:p-6 lg:p-7 transition-all duration-300 space-y-5"
      >
        
        {/* Row 1: Search Input, Level Selector & Sort Options (Fully Mobile Responsive) */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3.5">
          
          {/* Search Box with Athletic Surface Tokens & Dedicated Triggered Transition */}
          <motion.div variants={searchBoxVariants} className="relative flex-1 min-w-[240px]">
            <motion.div variants={searchIconVariants} className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-secondary">
              <FiSearch className="w-4 h-4 text-active" />
            </motion.div>
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search classes by name, coach, or workout..."
              className="w-full pl-10 pr-9 py-3 bg-searchbox-bg hover:bg-searchbox-hover border border-brand-500/25 focus:border-active/60 focus:ring-1 focus:ring-active/20 rounded-2xl font-['Inter'] text-xs sm:text-sm text-foreground placeholder:text-secondary/70 focus:outline-none transition-all shadow-2xs"
            />
            {searchInput && (
              <motion.button
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                type="button"
                onClick={() => {
                  setSearchInput("");
                  applyFilters({ search: "" });
                }}
                className="absolute inset-y-0 right-3 flex items-center justify-center my-auto w-5 h-5 rounded-full bg-brand-500/10 hover:bg-active text-secondary hover:text-white transition-colors cursor-pointer"
                title="Clear search"
              >
                <FiX className="w-3 h-3" />
              </motion.button>
            )}
          </motion.div>

          {/* Controls Cluster: Difficulty Level Selector & Sort Dropdown */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            
            {/* Level Selector Pills with Individual Staggered Triggered Transitions */}
            <LayoutGroup id="allClassesDifficultyGroup">
              <motion.div
                variants={levelSegmentContainerVariants}
                className="flex items-center gap-1.5 p-1 rounded-2xl bg-brand-500/5 dark:bg-[#1B1A55]/30 border border-brand-500/15 overflow-x-auto no-scrollbar"
              >
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-secondary px-2 hidden xl:inline">
                  Level:
                </span>
                {DIFFICULTY_LEVELS.map((lvl) => {
                  const isSelected = urlDifficulty === lvl.id;
                  return (
                    <motion.button
                      key={lvl.id}
                      variants={levelPillItemVariants}
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => handleDifficultySelect(lvl.id)}
                      className={`group/lvl relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer select-none ${
                        isSelected
                          ? "text-white font-extrabold"
                          : "text-secondary hover:text-active hover:bg-active/10 dark:hover:bg-active/15 hover:border-active/40 border border-transparent"
                      }`}
                    >
                      {isSelected && (
                        <motion.span
                          layoutId="activeAllClassesDifficultyPill"
                          className="absolute inset-0 rounded-xl bg-active shadow-xs"
                          transition={{ type: "spring", stiffness: 450, damping: 35 }}
                        />
                      )}
                      {lvl.dotColor && !isSelected && (
                        <span className={`w-1.5 h-1.5 rounded-full ${lvl.dotColor} relative z-10 group-hover/lvl:scale-125 transition-transform duration-200`} />
                      )}
                      <span className="relative z-10">{lvl.label}</span>
                    </motion.button>
                  );
                })}
              </motion.div>
            </LayoutGroup>

            {/* Sort Dropdown with Triggered Slide */}
            <motion.div variants={sortDropdownVariants} className="relative min-w-[170px] sm:w-auto">
              <select
                value={urlSort}
                onChange={(e) => handleSortChange(e.target.value)}
                className="w-full pl-3.5 pr-9 py-2.5 bg-searchbox-bg hover:bg-searchbox-hover border border-brand-500/25 hover:border-active/50 rounded-2xl font-['Inter'] text-xs font-bold text-foreground focus:outline-none focus:border-active/60 cursor-pointer appearance-none shadow-2xs transition-colors"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option
                    key={opt.value}
                    value={opt.value}
                    className="bg-card-bg text-foreground py-1"
                  >
                    {opt.label}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-secondary">
                <FiChevronDown className="w-3.5 h-3.5" />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Row 2: Category Filter Tabs with Divider Expansion & Staggered Entrance */}
        <motion.div variants={dividerLineVariants} className="pt-3 border-t border-brand-500/15 origin-left">
          <LayoutGroup id="allClassesCategoryGroup">
            <motion.div
              variants={categoryContainerVariants}
              initial="hidden"
              animate={isDeckInView ? "visible" : "hidden"}
              className="flex items-center gap-2 overflow-x-auto pb-1.5 no-scrollbar scroll-smooth"
            >
              {CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                const isSelected =
                  urlCategory === cat.name ||
                  (cat.name === "All Categories" &&
                    (!urlCategory || urlCategory === "All Categories" || urlCategory === "All"));

                return (
                  <motion.button
                    key={cat.name}
                    variants={categoryItemVariants}
                    whileHover={{ y: -2, scale: 1.02 }}
                    whileTap={{ scale: 0.96 }}
                    type="button"
                    onClick={() => handleCategorySelect(cat.name)}
                    className={`group/tab relative flex items-center gap-2 px-4 py-2.5 rounded-2xl font-['Inter'] text-xs font-bold whitespace-nowrap transition-all duration-300 cursor-pointer shrink-0 select-none ${
                      isSelected
                        ? "text-white shadow-xs"
                        : "bg-card-bg/90 dark:bg-[#121026] text-secondary hover:text-active hover:bg-active/10 dark:hover:bg-active/15 border border-brand-500/20 hover:border-active/60 shadow-2xs hover:shadow-xs"
                    }`}
                  >
                    {isSelected && (
                      <motion.span
                        layoutId="activeAllClassesCategoryPill"
                        className="absolute inset-0 rounded-2xl bg-active shadow-xs"
                        transition={{ type: "spring", stiffness: 450, damping: 35 }}
                      />
                    )}
                    <Icon className={`w-3.5 h-3.5 relative z-10 transition-all duration-200 ${
                      isSelected 
                        ? "text-white" 
                        : "text-secondary/70 group-hover/tab:text-active group-hover/tab:scale-115 group-hover/tab:rotate-6"
                    }`} />
                    <span className="relative z-10">{cat.label}</span>
                  </motion.button>
                );
              })}
            </motion.div>
          </LayoutGroup>
        </motion.div>

        {/* Row 3: Status Summary & Active Filter Tags with Triggered Variants */}
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
              Showing <strong className="text-foreground font-extrabold">{totalClasses}</strong> {totalClasses === 1 ? "session" : "sessions"} in performance curriculum
            </span>
            {isPending && (
              <span className="inline-flex items-center gap-1 text-active font-bold animate-pulse ml-1 text-xs">
                <FiRefreshCw className="w-3 h-3 animate-spin" />
                <span>Updating catalog...</span>
              </span>
            )}
          </div>

          {/* Active Filter Badges */}
          {hasActiveFilters && (
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-secondary">
                Active:
              </span>
              
              {urlSearch && (
                <motion.span variants={badgeItemVariants} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-brand-500/10 border border-brand-500/20 text-foreground text-[11px] font-bold">
                  <span>&ldquo;{urlSearch}&rdquo;</span>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchInput("");
                      applyFilters({ search: "" });
                    }}
                    className="hover:text-active cursor-pointer"
                    title="Remove keyword filter"
                  >
                    <FiX className="w-3 h-3" />
                  </button>
                </motion.span>
              )}

              {urlCategory && urlCategory !== "All Categories" && urlCategory !== "All" && (
                <motion.span variants={badgeItemVariants} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-active/10 border border-active/30 text-active text-[11px] font-bold">
                  <span>{urlCategory}</span>
                  <button
                    type="button"
                    onClick={() => applyFilters({ category: "All Categories" })}
                    className="hover:text-foreground cursor-pointer"
                    title="Remove category filter"
                  >
                    <FiX className="w-3 h-3" />
                  </button>
                </motion.span>
              )}

              {urlDifficulty && urlDifficulty !== "All" && urlDifficulty !== "All Levels" && (
                <motion.span variants={badgeItemVariants} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-500 dark:text-amber-400 text-[11px] font-bold">
                  <span>{urlDifficulty}</span>
                  <button
                    type="button"
                    onClick={() => applyFilters({ difficulty: "All" })}
                    className="hover:text-foreground cursor-pointer"
                    title="Remove level filter"
                  >
                    <FiX className="w-3 h-3" />
                  </button>
                </motion.span>
              )}

              {urlSort && urlSort !== "newest" && (
                <motion.span variants={badgeItemVariants} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-brand-500/10 border border-brand-500/20 text-foreground text-[11px] font-bold">
                  <span>{SORT_OPTIONS.find((s) => s.value === urlSort)?.label || urlSort}</span>
                  <button
                    type="button"
                    onClick={() => applyFilters({ sort: "newest" })}
                    className="hover:text-active cursor-pointer"
                    title="Reset sort"
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
