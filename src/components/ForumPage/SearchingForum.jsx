"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FaFilter, FaSearch, FaTimes } from "react-icons/fa";

export default function SearchingForum({ totalPosts = 0 }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSearchParam = searchParams.get("search") || "";

  const [search, setSearch] = useState(currentSearchParam);
  const isFirstMount = useRef(true);

  // Sync state if URL changes externally (e.g. via sidebar or browser back button)
  useEffect(() => {
    setSearch(currentSearchParam);
  }, [currentSearchParam]);

  // Debounced URL update when search changes
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }

    const timeout = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (search.trim()) {
        params.set("search", search.trim());
      } else {
        params.delete("search");
      }
      // Reset page to 1 when changing search keyword
      params.set("page", "1");

      const queryString = params.toString();
      router.replace(`/forum${queryString ? `?${queryString}` : ""}`, { scroll: false });
    }, 300);

    return () => clearTimeout(timeout);
  }, [search, router, searchParams]);

  const categories = [
    { label: "All Topics", value: "" },
    { label: "⚡ Metabolic", value: "Metabolic" },
    { label: "🧘 Mobility", value: "Mobility" },
    { label: "🎯 Core", value: "Core" },
    { label: "💪 Functional", value: "Functional" },
    { label: "💥 Power", value: "Power" },
    { label: "🏆 Transformation", value: "Transformation" },
  ];

  const handleCategorySelect = (val) => {
    setSearch(val);
  };

  const handleClear = () => {
    setSearch("");
  };

  const isCategoryActive = (val) => {
    if (!val && !search.trim()) return true;
    if (val && search.toLowerCase().includes(val.toLowerCase())) return true;
    return false;
  };

  return (
    <div className="w-full space-y-5 mb-8" id="discussions-feed">
      {/* Category Pills Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none no-scrollbar">
        <div className="flex items-center gap-1.5 text-xs text-[#535C91] dark:text-[#9290C3] font-bold uppercase tracking-wider shrink-0 mr-1">
          <FaFilter className="w-3 h-3 text-active" />
          <span>Filters:</span>
        </div>
        {categories.map((cat) => {
          const active = isCategoryActive(cat.value);
          return (
            <button
              key={cat.label}
              onClick={() => handleCategorySelect(cat.value)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-['Inter'] font-semibold transition-all whitespace-nowrap cursor-pointer ${
                active
                  ? "bg-active text-btn-text shadow-sm ring-2 ring-active/30 scale-[1.02]"
                  : "bg-white/60 dark:bg-[#1B1A55]/40 text-foreground border border-brand-500/15 dark:border-brand-500/25 hover:border-active/40 hover:bg-brand-500/5"
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Main Search Input Box */}
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-brand-500 dark:text-brand-300">
          <FaSearch className="h-4 w-4" />
        </div>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search discussions, exercises, training splits, coaches..."
          className="w-full pl-12 pr-12 py-3.5 bg-white dark:bg-[#1B1A55]/30 border border-brand-500/20 dark:border-brand-500/30 rounded-2xl font-['Inter'] text-sm sm:text-base text-foreground placeholder-[#535C91]/60 dark:placeholder-[#9290C3]/60 focus:outline-none focus:border-active focus:ring-2 focus:ring-active/20 transition-all shadow-inner"
        />
        {search.trim() !== "" && (
          <button
            onClick={handleClear}
            className="absolute inset-y-0 right-4 flex items-center text-[#535C91] dark:text-[#9290C3] hover:text-active transition-colors cursor-pointer"
            title="Clear search"
          >
            <FaTimes className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Results & Filter Counter Summary */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm text-[#535C91] dark:text-[#9290C3] pb-3 border-b border-brand-500/10">
        <div className="flex items-center gap-2">
          <span>
            Showing <strong className="text-foreground">{totalPosts}</strong> {totalPosts === 1 ? "discussion" : "discussions"}
          </span>
          {search.trim() && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-active/10 text-active text-xs font-semibold">
              <span>Keyword: &quot;{search}&quot;</span>
              <button onClick={handleClear} className="hover:opacity-75 cursor-pointer">×</button>
            </span>
          )}
        </div>

        {search.trim() && (
          <button
            onClick={handleClear}
            className="text-xs font-bold text-active uppercase tracking-wider hover:underline cursor-pointer"
          >
            Reset Filters
          </button>
        )}
      </div>
    </div>
  );
}
