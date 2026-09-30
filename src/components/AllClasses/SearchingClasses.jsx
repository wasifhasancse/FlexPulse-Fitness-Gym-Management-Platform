"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { motion, LayoutGroup, AnimatePresence } from "framer-motion";
import {
  FiSearch,
  FiX,
  FiSliders,
  FiActivity,
  FiRefreshCw,
  FiChevronDown,
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

export default function SearchingClasses({ totalClasses = 0 }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const urlSearch = searchParams.get("search") || "";
  const urlCategory = searchParams.get("category") || "All Categories";
  const urlDifficulty = searchParams.get("difficulty") || "All";
  const urlSort = searchParams.get("sort") || "newest";

  const [searchInput, setSearchInput] = useState(urlSearch);

  // Synchronize search input if URL changes externally (e.g. browser back/forward or reset)
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

    // Always reset to page 1 on active filter change
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
    <div className="w-full max-w-6xl mx-auto mb-8">
      {/* Main Glassmorphic Control Deck */}
      <div className="relative rounded-2xl bg-white/90 dark:bg-[#121124]/90 backdrop-blur-xl border border-slate-200/90 dark:border-white/10 shadow-sm p-4 sm:p-5 transition-all duration-300 space-y-4">
        
        {/* Row 1: Search Input & Controls */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-slate-400">
              <FiSearch className="w-4 h-4 text-active" />
            </div>
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search classes by name, coach, or workout..."
              className="w-full pl-10 pr-9 py-2.5 bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 rounded-xl font-['Inter'] text-xs sm:text-sm text-foreground placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-active focus:ring-1 focus:ring-active/20 transition-all shadow-inner"
            />
            {searchInput && (
              <button
                type="button"
                onClick={() => {
                  setSearchInput("");
                  applyFilters({ search: "" });
                }}
                className="absolute inset-y-0 right-3 flex items-center justify-center my-auto w-5 h-5 rounded-full bg-slate-200 dark:bg-white/10 text-slate-600 dark:text-slate-300 hover:bg-active hover:text-white transition-colors cursor-pointer"
                title="Clear search"
              >
                <FiX className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Intensity Selector */}
          <LayoutGroup id="allClassesDifficultyGroup">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
              <span className="text-[11px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider hidden lg:inline mr-1">
                Level:
              </span>
              {DIFFICULTY_LEVELS.map((lvl) => {
                const isSelected = urlDifficulty === lvl.id;
                return (
                  <button
                    key={lvl.id}
                    onClick={() => handleDifficultySelect(lvl.id)}
                    className={`relative inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                      isSelected
                        ? "text-white font-bold"
                        : "bg-slate-100/90 dark:bg-white/[0.04] text-slate-600 dark:text-slate-300 hover:text-foreground hover:bg-slate-200/70 dark:hover:bg-white/[0.08] border border-slate-200/80 dark:border-white/[0.06]"
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
                      <span className={`w-1.5 h-1.5 rounded-full ${lvl.dotColor} relative z-10`} />
                    )}
                    <span className="relative z-10">{lvl.label}</span>
                  </button>
                );
              })}
            </div>
          </LayoutGroup>

          {/* Sort Dropdown */}
          <div className="relative min-w-[170px]">
            <select
              value={urlSort}
              onChange={(e) => handleSortChange(e.target.value)}
              className="w-full pl-3 pr-8 py-2 bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 rounded-xl font-['Inter'] text-xs font-semibold text-foreground focus:outline-none focus:border-active cursor-pointer appearance-none"
            >
              {SORT_OPTIONS.map((opt) => (
                <option
                  key={opt.value}
                  value={opt.value}
                  className="bg-white dark:bg-[#17152f] text-foreground"
                >
                  {opt.label}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-slate-400">
              <FiChevronDown className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>

        {/* Row 2: Category Tabs with Icons */}
        <div className="pt-3 border-t border-slate-200/80 dark:border-white/[0.08]">
          <LayoutGroup id="allClassesCategoryGroup">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none no-scrollbar">
              {CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                const isSelected =
                  urlCategory === cat.name ||
                  (cat.name === "All Categories" &&
                    (!urlCategory || urlCategory === "All Categories" || urlCategory === "All"));

                return (
                  <button
                    key={cat.name}
                    onClick={() => handleCategorySelect(cat.name)}
                    className={`relative flex items-center gap-2 px-3.5 py-2 rounded-xl font-['Inter'] text-xs font-semibold whitespace-nowrap transition-colors duration-200 cursor-pointer shrink-0 ${
                      isSelected
                        ? "text-white font-bold"
                        : "bg-slate-100/80 dark:bg-white/[0.04] text-slate-600 dark:text-slate-300 border border-slate-200/70 dark:border-white/[0.06] hover:border-active/40 hover:text-foreground hover:bg-slate-200/60 dark:hover:bg-white/[0.08]"
                    }`}
                  >
                    {isSelected && (
                      <motion.span
                        layoutId="activeAllClassesCategoryPill"
                        className="absolute inset-0 rounded-xl bg-active shadow-sm"
                        transition={{ type: "spring", stiffness: 450, damping: 35 }}
                      />
                    )}
                    <Icon className={`w-3 h-3 relative z-10 ${isSelected ? "text-white" : "text-active"}`} />
                    <span className="relative z-10">{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </LayoutGroup>
        </div>

        {/* Row 3: Status Summary & Active Filter Tags */}
        <div className="pt-3 border-t border-slate-200/80 dark:border-white/[0.08] flex flex-wrap items-center justify-between gap-2.5 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-['Inter'] text-xs">
              Showing <strong className="text-foreground font-bold">{totalClasses}</strong> {totalClasses === 1 ? "class" : "classes"} in curriculum
            </span>
            {isPending && (
              <span className="text-active font-semibold animate-pulse ml-1 text-xs">
                Filtering...
              </span>
            )}
          </div>

          {/* Active Filter Badges */}
          {hasActiveFilters && (
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Active:
              </span>
              {urlSearch && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-slate-100 dark:bg-white/[0.06] text-foreground text-[11px] font-medium border border-slate-200 dark:border-white/10">
                  &quot;{urlSearch}&quot;
                  <button
                    onClick={() => {
                      setSearchInput("");
                      applyFilters({ search: "" });
                    }}
                    className="hover:text-active ml-0.5 cursor-pointer"
                  >
                    <FiX className="w-3 h-3" />
                  </button>
                </span>
              )}
              {urlCategory && urlCategory !== "All Categories" && urlCategory !== "All" && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-slate-100 dark:bg-white/[0.06] text-foreground text-[11px] font-medium border border-slate-200 dark:border-white/10">
                  {urlCategory}
                  <button
                    onClick={() => handleCategorySelect("All Categories")}
                    className="hover:text-active ml-0.5 cursor-pointer"
                  >
                    <FiX className="w-3 h-3" />
                  </button>
                </span>
              )}
              {urlDifficulty && urlDifficulty !== "All" && urlDifficulty !== "All Levels" && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-slate-100 dark:bg-white/[0.06] text-foreground text-[11px] font-medium border border-slate-200 dark:border-white/10">
                  {urlDifficulty}
                  <button
                    onClick={() => handleDifficultySelect("All")}
                    className="hover:text-active ml-0.5 cursor-pointer"
                  >
                    <FiX className="w-3 h-3" />
                  </button>
                </span>
              )}
              {urlSort && urlSort !== "newest" && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-slate-100 dark:bg-white/[0.06] text-foreground text-[11px] font-medium border border-slate-200 dark:border-white/10">
                  {SORT_OPTIONS.find((s) => s.value === urlSort)?.label}
                  <button
                    onClick={() => handleSortChange("newest")}
                    className="hover:text-active ml-0.5 cursor-pointer"
                  >
                    <FiX className="w-3 h-3" />
                  </button>
                </span>
              )}
              <button
                onClick={resetAllFilters}
                className="text-[11px] font-bold text-active hover:underline ml-1 cursor-pointer"
              >
                Clear all
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
