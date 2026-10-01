"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
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

const TRANSITION_EASE = [0.16, 1, 0.3, 1];

// ── Outer Feed Grid Container Variants ──
const forumGridContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

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
  // Keep track of the last synced search value from the URL
  const prevSearchRef = useRef(currentSearch);

  // Viewport trigger for toolbar & filter
  const containerRef = useRef(null);
  const isControlsInView = useInView(containerRef, { once: true, amount: 0.08 });

  // Separate Viewport Trigger & Staged Delay for the Cards Grid
  const cardsGridRef = useRef(null);
  const isCardsInView = useInView(cardsGridRef, { once: true, amount: 0.05 });
  const [cardsTriggered, setCardsTriggered] = useState(false);

  useEffect(() => {
    if (isCardsInView) {
      const timer = setTimeout(() => {
        setCardsTriggered(true);
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [isCardsInView]);

  // Re-trigger cards animation when user switches filters or sorting
  useEffect(() => {
    setCardsTriggered(false);
    const timer = setTimeout(() => {
      setCardsTriggered(true);
    }, 80);
    return () => clearTimeout(timer);
  }, [sortBy, selectedCategory, search, viewMode]);

  // Build pagination link preserving current search and category parameters
  const buildPageLink = (targetPage) => {
    const params = new URLSearchParams(searchParams ? searchParams.toString() : "");
    if (Number(targetPage) > 1) {
      params.set("page", String(targetPage));
    } else {
      params.delete("page");
    }
    const qs = params.toString();
    return qs ? `/forum?${qs}#discussions-feed` : "/forum#discussions-feed";
  };

  // Sync search state if URL search query changes externally (e.g. browser back/forward or category click)
  useEffect(() => {
    setSearch(currentSearch);
    prevSearchRef.current = currentSearch;
  }, [currentSearch]);

  // Debounced URL sync ONLY when user intentionally types in the search box
  useEffect(() => {
    // If the input value matches the URL search value, do NOT trigger a page 1 redirect
    if (search === prevSearchRef.current) {
      return;
    }

    const timeout = setTimeout(() => {
      prevSearchRef.current = search;
      const params = new URLSearchParams(searchParams ? searchParams.toString() : "");
      if (search.trim()) {
        params.set("search", search.trim());
      } else {
        params.delete("search");
      }
      // Reset page to 1 only when a new search query is typed
      params.delete("page");
      const queryString = params.toString();
      router.replace(`/forum${queryString ? `?${queryString}` : ""}`, { scroll: false });
    }, 350);

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
    <div ref={containerRef} className="w-full space-y-6" id="discussions-feed">
      {/* 1. Category Filter Pill Bar with Triggered Stagger & Active Layout Pill */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={isControlsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -16 }}
        transition={{ duration: 0.65, ease: TRANSITION_EASE }}
        className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none no-scrollbar"
      >
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={isControlsInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center gap-1.5 text-xs text-[#535C91] dark:text-[#9290C3] font-bold uppercase tracking-wider shrink-0 mr-1"
        >
          <FaFilter className="w-3 h-3 text-active" />
          <span>Filter:</span>
        </motion.div>

        {categories.map((cat, idx) => {
          const Icon = cat.icon;
          const isActive =
            (!cat.value && !search.trim()) ||
            (cat.value && search.toLowerCase().includes(cat.value.toLowerCase()));

          return (
            <motion.button
              key={cat.label}
              initial={{ opacity: 0, y: 14, scale: 0.92 }}
              animate={isControlsInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 14, scale: 0.92 }}
              transition={{ duration: 0.5, delay: 0.12 + idx * 0.05, ease: TRANSITION_EASE }}
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => handleCategoryClick(cat.value)}
              className={`relative inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-['Inter'] font-semibold transition-all whitespace-nowrap cursor-pointer shadow-2xs ${
                isActive
                  ? "text-btn-text"
                  : "bg-white/70 dark:bg-[#111638]/70 text-foreground border border-brand-500/15 dark:border-brand-500/25 hover:border-active/40 hover:bg-brand-500/5"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeForumFeedPill"
                  className="absolute inset-0 bg-active rounded-full shadow-xs -z-10"
                  transition={{ type: "spring", stiffness: 450, damping: 35 }}
                />
              )}
              <Icon className="w-3 h-3 relative z-10" />
              <span className="relative z-10">{cat.label}</span>
            </motion.button>
          );
        })}
      </motion.div>

      {/* 2. Search & Toolbar Controls Card */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={isControlsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
        transition={{ duration: 0.7, delay: 0.2, ease: TRANSITION_EASE }}
        className="bg-white/80 dark:bg-[#070F2B] border border-brand-500/20 rounded-2xl p-4 shadow-xs space-y-4"
      >
        {/* Search Input Box */}
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-brand-500 dark:text-brand-300">
            <FaSearch className="h-4 w-4" />
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search exercises, protocols, recovery tips, coaches..."
            className="w-full pl-11 pr-10 py-3 bg-white dark:bg-[#111638]/60 border border-brand-500/20 rounded-xl font-['Inter'] text-sm text-foreground placeholder-[#535C91]/60 dark:placeholder-[#9290C3]/60 focus:outline-none focus:border-active focus:ring-1 focus:ring-active transition-all shadow-2xs"
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
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={isControlsInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -12 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="flex items-center gap-2"
          >
            <span>
              Showing <strong className="text-foreground">{processedPosts.length}</strong> of{" "}
              <strong className="text-foreground">{total}</strong> discussions
            </span>
            {search.trim() && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-active/10 text-active font-semibold shadow-2xs">
                <span>&quot;{search}&quot;</span>
                <button onClick={handleClear} className="hover:opacity-75 cursor-pointer">×</button>
              </span>
            )}
          </motion.div>

          <div className="flex items-center gap-3 ml-auto">
            {/* Sort Dropdown */}
            <motion.div
              initial={{ opacity: 0, x: 12 }}
              animate={isControlsInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 12 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex items-center gap-1.5"
            >
              <FaSortAmountDown className="w-3 h-3 text-active shrink-0" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white dark:bg-[#111638]/70 border border-brand-500/20 rounded-lg px-2.5 py-1.5 text-xs text-foreground font-medium focus:outline-none focus:border-active cursor-pointer shadow-2xs"
              >
                <option value="latest">Latest First</option>
                <option value="popular">Most Liked</option>
                <option value="comments">Most Discussed</option>
                <option value="oldest">Oldest First</option>
              </select>
            </motion.div>

            {/* View Mode Toggle */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isControlsInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="flex items-center p-0.5 rounded-lg border border-brand-500/20 bg-white dark:bg-[#111638]/70 shadow-2xs"
            >
              <button
                onClick={() => setViewMode("grid")}
                aria-label="Grid View"
                className={`p-1.5 rounded-md transition-all cursor-pointer ${
                  viewMode === "grid"
                    ? "bg-active text-btn-text shadow-2xs"
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
                    ? "bg-active text-btn-text shadow-2xs"
                    : "text-[#535C91] dark:text-[#9290C3] hover:text-foreground"
                }`}
                title="List View"
              >
                <FaList className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* 3. Discussion Cards Grid / List with Staged Viewport Delay & Staggered Variants */}
      {processedPosts.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center justify-center py-16 px-6 text-center bg-white/60 dark:bg-[#070F2B] rounded-3xl border border-brand-500/20 shadow-xs"
        >
          <div className="w-16 h-16 rounded-full bg-active/10 flex items-center justify-center mb-4 text-active shadow-2xs">
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
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-btn-bg text-btn-text text-xs font-bold uppercase tracking-wider hover:opacity-90 active:scale-95 transition-all cursor-pointer shadow-xs"
          >
            <FaUndo className="w-3 h-3" />
            <span>Reset All Filters</span>
          </button>
        </motion.div>
      ) : (
        <div ref={cardsGridRef}>
          <motion.div
            variants={forumGridContainerVariants}
            initial="hidden"
            animate={cardsTriggered ? "visible" : "hidden"}
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 gap-6"
                : "space-y-4"
            }
          >
            <AnimatePresence mode="popLayout">
              {processedPosts.map((post) => (
                <ForumPostCard
                  key={post._id}
                  post={post}
                  viewMode={viewMode}
                  isTriggered={cardsTriggered}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      )}

      {/* 4. Pagination (Always rendered to show full navigation state) */}
      <Pagination
        totalPages={totalPages}
        page={currentPage}
        buildPageLink={buildPageLink}
      />
    </div>
  );
}
