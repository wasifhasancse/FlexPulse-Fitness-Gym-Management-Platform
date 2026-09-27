"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import {
  FiSearch,
  FiX,
  FiSliders,
  FiCheck,
  FiArrowDown,
  FiArrowUp,
  FiActivity,
  FiFlame,
  FiGrid,
  FiRefreshCw,
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
  { id: "Beginner", label: "Beginner", color: "text-emerald-500 border-emerald-500/20 bg-emerald-500/10" },
  { id: "Intermediate", label: "Intermediate", color: "text-amber-500 border-amber-500/20 bg-amber-500/10" },
  { id: "Advanced", label: "Advanced", color: "text-rose-500 border-rose-500/20 bg-rose-500/10" },
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

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [category, setCategory] = useState(
    searchParams.get("category") || "All Categories"
  );
  const [difficulty, setDifficulty] = useState(
    searchParams.get("difficulty") || "All"
  );
  const [sort, setSort] = useState(searchParams.get("sort") || "newest");
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Sync state when URL searchParams change externally (e.g. browser back/forward)
  useEffect(() => {
    setSearch(searchParams.get("search") || "");
    setCategory(searchParams.get("category") || "All Categories");
    setDifficulty(searchParams.get("difficulty") || "All");
    setSort(searchParams.get("sort") || "newest");
  }, [searchParams]);

  // Debounced navigation when filters change
  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams();

      if (search.trim()) {
        params.set("search", search.trim());
      }
      if (category && category !== "All Categories" && category !== "All") {
        params.set("category", category);
      }
      if (difficulty && difficulty !== "All" && difficulty !== "All Levels") {
        params.set("difficulty", difficulty);
      }
      if (sort && sort !== "newest") {
        params.set("sort", sort);
      }

      const queryString = params.toString();
      const targetUrl = queryString ? `/all-classes?${queryString}` : "/all-classes";

      // Only navigate if the target URL differs from current
      const currentQuery = searchParams.toString();
      const currentUrl = currentQuery ? `/all-classes?${currentQuery}` : "/all-classes";

      if (targetUrl !== currentUrl) {
        startTransition(() => {
          router.replace(targetUrl, { scroll: false });
        });
      }
    }, 320);

    return () => clearTimeout(timer);
  }, [search, category, difficulty, sort, router, searchParams]);

  const hasActiveFilters = Boolean(
    search.trim() ||
      (category && category !== "All Categories" && category !== "All") ||
      (difficulty && difficulty !== "All" && difficulty !== "All Levels") ||
      (sort && sort !== "newest")
  );

  const resetAllFilters = () => {
    setSearch("");
    setCategory("All Categories");
    setDifficulty("All");
    setSort("newest");
    startTransition(() => {
      router.replace("/all-classes", { scroll: false });
    });
  };

  return (
    <div className="w-full max-w-6xl mx-auto mb-12">
      {/* Main Glassmorphic Control Deck */}
      <div className="relative rounded-3xl bg-white/80 dark:bg-[#121124]/85 backdrop-blur-xl border border-slate-200/90 dark:border-white/10 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.07)] dark:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.5)] p-5 sm:p-7 transition-all duration-300">
        
        {/* Glow ambient background aura */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-r from-active/10 via-active/20 to-transparent blur-3xl pointer-events-none -z-10 opacity-70" />

        {/* Top Row: Search Input + Sort Selection + Advanced Toggle */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-center">
          {/* Search Field */}
          <div className="lg:col-span-7 relative">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400 dark:text-slate-400">
              <FiSearch className="w-5 h-5 text-active" />
            </div>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search classes, workout type, or keywords..."
              className="w-full pl-12 pr-11 py-3.5 bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 rounded-2xl font-['Inter'] text-sm sm:text-base text-foreground placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-active focus:ring-2 focus:ring-active/20 transition-all duration-200 shadow-inner"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute inset-y-0 right-3.5 flex items-center justify-center my-auto w-6 h-6 rounded-full bg-slate-200 dark:bg-white/10 text-slate-600 dark:text-slate-300 hover:bg-active hover:text-white transition-colors"
                title="Clear search"
              >
                <FiX className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="lg:col-span-3">
            <div className="relative">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="w-full px-4 py-3.5 bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 rounded-2xl font-['Inter'] text-sm font-semibold text-foreground focus:outline-none focus:border-active focus:ring-2 focus:ring-active/20 transition-all appearance-none cursor-pointer"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option
                    key={opt.value}
                    value={opt.value}
                    className="bg-white dark:bg-[#17152f] text-foreground py-2"
                  >
                    {opt.label}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-400">
                <FiSliders className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Filter Toggle Button */}
          <div className="lg:col-span-2">
            <button
              type="button"
              onClick={() => setShowAdvanced((prev) => !prev)}
              className={`w-full py-3.5 px-4 rounded-2xl font-['Inter'] text-sm font-bold flex items-center justify-center gap-2 border transition-all duration-300 cursor-pointer ${
                showAdvanced || difficulty !== "All"
                  ? "bg-active text-white border-active shadow-md shadow-active/20"
                  : "bg-slate-100 dark:bg-white/[0.05] text-foreground/80 border-slate-200 dark:border-white/10 hover:border-active/50 hover:text-foreground"
              }`}
            >
              <FiSliders className="w-4 h-4" />
              <span>Filters</span>
              {difficulty !== "All" && (
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              )}
            </button>
          </div>
        </div>

        {/* Category Filter Pills (Horizontal scrollable on mobile) */}
        <div className="mt-5 pt-5 border-t border-slate-200/80 dark:border-white/[0.08]">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none no-scrollbar">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isSelected =
                category === cat.name ||
                (cat.name === "All Categories" &&
                  (!category || category === "All Categories" || category === "All"));

              return (
                <button
                  key={cat.name}
                  onClick={() => setCategory(cat.name)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-['Inter'] text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer shrink-0 ${
                    isSelected
                      ? "bg-active text-white shadow-md shadow-active/25 scale-[1.02]"
                      : "bg-slate-100/80 dark:bg-white/[0.04] text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-white/[0.06] hover:border-active/40 hover:text-foreground hover:bg-slate-200/50 dark:hover:bg-white/[0.08]"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isSelected ? "text-white" : "text-active"}`} />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Collapsible Advanced Filters (Difficulty Level) */}
        {(showAdvanced || difficulty !== "All") && (
          <div className="mt-4 pt-4 border-t border-dashed border-slate-200 dark:border-white/[0.08] flex flex-wrap items-center justify-between gap-4 animate-fadeIn">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400 flex items-center gap-1.5 mr-1">
                <FiActivity className="w-3.5 h-3.5 text-active" />
                Intensity:
              </span>
              {DIFFICULTY_LEVELS.map((lvl) => {
                const isSelected = difficulty === lvl.id;
                return (
                  <button
                    key={lvl.id}
                    onClick={() => setDifficulty(lvl.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      isSelected
                        ? "bg-active text-white shadow-sm ring-1 ring-active"
                        : "bg-slate-100 dark:bg-white/[0.04] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/10 hover:border-active/40"
                    }`}
                  >
                    {lvl.label}
                  </button>
                );
              })}
            </div>

            {hasActiveFilters && (
              <button
                onClick={resetAllFilters}
                className="text-xs font-bold text-active hover:underline flex items-center gap-1 cursor-pointer ml-auto"
              >
                <FiRefreshCw className="w-3 h-3" />
                <span>Reset All Filters</span>
              </button>
            )}
          </div>
        )}

        {/* Bottom Status & Active Filters Bar */}
        <div className="mt-5 pt-4 border-t border-slate-200/80 dark:border-white/[0.08] flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-['Inter']">
              Showing{" "}
              <strong className="text-foreground font-bold">
                {totalClasses}
              </strong>{" "}
              {totalClasses === 1 ? "class" : "classes"} available
            </span>
            {isPending && (
              <span className="text-active font-semibold animate-pulse ml-2">
                Updating...
              </span>
            )}
          </div>

          {/* Active filter badges */}
          {hasActiveFilters && (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Active:
              </span>
              {search && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-100 dark:bg-white/[0.06] text-foreground text-[11px] font-medium border border-slate-200 dark:border-white/10">
                  Keyword: &quot;{search}&quot;
                  <button onClick={() => setSearch("")} className="hover:text-active ml-0.5">
                    <FiX className="w-3 h-3" />
                  </button>
                </span>
              )}
              {category && category !== "All Categories" && category !== "All" && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-100 dark:bg-white/[0.06] text-foreground text-[11px] font-medium border border-slate-200 dark:border-white/10">
                  {category}
                  <button onClick={() => setCategory("All Categories")} className="hover:text-active ml-0.5">
                    <FiX className="w-3 h-3" />
                  </button>
                </span>
              )}
              {difficulty && difficulty !== "All" && difficulty !== "All Levels" && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-100 dark:bg-white/[0.06] text-foreground text-[11px] font-medium border border-slate-200 dark:border-white/10">
                  {difficulty}
                  <button onClick={() => setDifficulty("All")} className="hover:text-active ml-0.5">
                    <FiX className="w-3 h-3" />
                  </button>
                </span>
              )}
              {sort && sort !== "newest" && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-100 dark:bg-white/[0.06] text-foreground text-[11px] font-medium border border-slate-200 dark:border-white/10">
                  Sort: {SORT_OPTIONS.find((s) => s.value === sort)?.label}
                  <button onClick={() => setSort("newest")} className="hover:text-active ml-0.5">
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
