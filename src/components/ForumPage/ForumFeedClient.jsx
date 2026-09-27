"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  FaDumbbell,
  FaFilter,
  FaFire,
  FaHeartbeat,
  FaList,
  FaSearch,
  FaSortAmountDown,
  FaThLarge,
  FaTimes,
  FaUndo,
  FaUtensils,
} from "react-icons/fa";
import ForumPostCard from "./ForumPostCard";
import Pagination from "./Pagination";

export default function ForumFeedClient({
  initialPosts = [],
  total = 0,
  totalPages = 1,
  currentPage = 1,
  currentSearch = "",
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(currentSearch);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("latest");
  const [viewMode, setViewMode] = useState("grid"); // 'grid' | 'list'
  const isFirstMount = useRef(true);

  const buildPageLink = (targetPage) => {
    const params = new URLSearchParams(searchParams.toString());
    if (search.trim()) {
      params.set("search", search.trim());
    } else {
      params.delete("search");
    }
    params.set("page", String(targetPage));
    return `/forum?${params.toString()}`;
  };

  // Sync search state if URL search query changes externally
  useEffect(() => {
    setSearch(currentSearch);
  }, [currentSearch]);

  // Debounced URL sync when user types in search box
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
      params.set("page", "1");
      const queryString = params.toString();
      router.replace(`/forum${queryString ? `?${queryString}` : ""}`, { scroll: false });
    }, 300);

    return () => clearTimeout(timeout);
  }, [search, router, searchParams]);

  const categories = [
    { label: "All Topics", value: "", icon: FaFire },
    { label: "Strength & Hypertrophy", value: "strength", icon: FaDumbbell },
    { label: "Metabolic & HIIT", value: "metabolic", icon: FaFire },
    { label: "Mobility & Recovery", value: "mobility", icon: FaHeartbeat },
    { label: "Nutrition & Macros", value: "nutrition", icon: FaUtensils },
    { label: "Core & Biomechanics", value: "core", icon: FaDumbbell },
  ];

  const handleCategoryClick = (categoryValue) => {
    setSelectedCategory(categoryValue);
    setSearch(categoryValue);
  };

  const handleClear = () => {
    setSearch("");
    setSelectedCategory("");
  };

  // Filter and sort the posts
  const processedPosts = useMemo(() => {
    let result = [...initialPosts];

    // Client-side sort
    if (sortBy === "popular") {
      result.sort((a, b) => (b.likes?.length || 0) - (a.likes?.length || 0));
    } else if (sortBy === "comments") {
      result.sort((a, b) => (b.comments?.length || 0) - (a.comments?.length || 0));
    } else if (sortBy === "oldest") {
      result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else {
      // Default: latest
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    return result;
  }, [initialPosts, sortBy]);

  return (
    <div className="w-full space-y-6" id="discussions-feed">
      {/* 1. Category Filter Pill Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none no-scrollbar">
        <div className="flex items-center gap-1.5 text-xs text-[#535C91] dark:text-[#9290C3] font-bold uppercase tracking-wider shrink-0 mr-1">
          <FaFilter className="w-3 h-3 text-active" />
          <span>Filter:</span>
        </div>
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive =
            (!cat.value && !search.trim()) ||
            (cat.value && search.toLowerCase().includes(cat.value.toLowerCase()));
          return (
            <button
              key={cat.label}
              onClick={() => handleCategoryClick(cat.value)}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-['Inter'] font-semibold transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? "bg-active text-btn-text shadow-sm ring-2 ring-active/30 scale-[1.02]"
                  : "bg-white/60 dark:bg-[#1B1A55]/40 text-foreground border border-brand-500/15 dark:border-brand-500/25 hover:border-active/40 hover:bg-brand-500/5"
              }`}
            >
              <Icon className="w-3 h-3" />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* 2. Search & Toolbar Controls */}
      <div className="bg-white/40 dark:bg-[#1B1A55]/25 border border-brand-500/20 rounded-2xl p-4 shadow-sm space-y-4">
        {/* Search Input */}
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-brand-500 dark:text-brand-300">
            <FaSearch className="h-4 w-4" />
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search exercises, protocols, recovery tips, coaches..."
            className="w-full pl-11 pr-10 py-3 bg-white dark:bg-[#1B1A55]/40 border border-brand-500/20 rounded-xl font-['Inter'] text-sm text-foreground placeholder-[#535C91]/60 dark:placeholder-[#9290C3]/60 focus:outline-none focus:border-active focus:ring-1 focus:ring-active transition-all"
          />
          {search.trim() !== "" && (
            <button
              onClick={handleClear}
              className="absolute inset-y-0 right-3.5 flex items-center text-[#535C91] dark:text-[#9290C3] hover:text-active transition-colors cursor-pointer"
              title="Clear search"
            >
              <FaTimes className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Action Controls: Stats, Sort Dropdown & View Mode Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-brand-500/10 text-xs text-[#535C91] dark:text-[#9290C3]">
          <div className="flex items-center gap-2">
            <span>
              Showing <strong className="text-foreground">{processedPosts.length}</strong> of{" "}
              <strong className="text-foreground">{total}</strong> discussions
            </span>
            {search.trim() && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-active/10 text-active font-semibold">
                <span>&quot;{search}&quot;</span>
                <button onClick={handleClear} className="hover:opacity-75 cursor-pointer">×</button>
              </span>
            )}
          </div>

          <div className="flex items-center gap-3 ml-auto">
            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5">
              <FaSortAmountDown className="w-3 h-3 text-active shrink-0" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white dark:bg-[#1B1A55]/60 border border-brand-500/20 rounded-lg px-2.5 py-1.5 text-xs text-foreground font-medium focus:outline-none focus:border-active cursor-pointer"
              >
                <option value="latest">Latest First</option>
                <option value="popular">Most Liked</option>
                <option value="comments">Most Discussed</option>
                <option value="oldest">Oldest First</option>
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center p-0.5 rounded-lg border border-brand-500/20 bg-white/60 dark:bg-[#1B1A55]/50">
              <button
                onClick={() => setViewMode("grid")}
                aria-label="Grid View"
                className={`p-1.5 rounded-md transition-all cursor-pointer ${
                  viewMode === "grid"
                    ? "bg-active text-btn-text shadow-sm"
                    : "text-[#535C91] dark:text-[#9290C3] hover:text-foreground"
                }`}
                title="Grid View"
              >
                <FaThLarge className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                aria-label="List View"
                className={`p-1.5 rounded-md transition-all cursor-pointer ${
                  viewMode === "list"
                    ? "bg-active text-btn-text shadow-sm"
                    : "text-[#535C91] dark:text-[#9290C3] hover:text-foreground"
                }`}
                title="List View"
              >
                <FaList className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Discussion Cards Grid / List */}
      {processedPosts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 px-6 text-center bg-white/40 dark:bg-[#1B1A55]/20 rounded-3xl border border-brand-500/20 shadow-inner">
          <div className="w-16 h-16 rounded-full bg-active/10 flex items-center justify-center mb-4 text-active">
            <FaSearch className="w-6 h-6" />
          </div>
          <h3 className="font-['Outfit'] text-2xl font-bold text-foreground mb-2">
            No Discussions Found
          </h3>
          <p className="font-['Inter'] text-sm text-[#535C91] dark:text-[#9290C3] max-w-md mb-6 leading-relaxed">
            We couldn&apos;t find any discussions matching &quot;{search}&quot;. Try exploring other training topics or reset your filter.
          </p>
          <button
            onClick={handleClear}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-btn-bg text-btn-text text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-all cursor-pointer"
          >
            <FaUndo className="w-3 h-3" />
            <span>Reset All Filters</span>
          </button>
        </div>
      ) : (
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 gap-6"
              : "space-y-4"
          }
        >
          {processedPosts.map((post) => (
            <ForumPostCard key={post._id} post={post} viewMode={viewMode} />
          ))}
        </div>
      )}

      {/* 4. Pagination */}
      {processedPosts.length > 0 && (
        <Pagination
          totalPages={totalPages}
          page={currentPage}
          buildPageLink={buildPageLink}
        />
      )}
    </div>
  );
}
