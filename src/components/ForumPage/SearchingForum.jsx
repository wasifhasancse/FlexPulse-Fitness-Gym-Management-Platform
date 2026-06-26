"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const SearchingForum = ({ totalPosts = 0 }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");

  useEffect(() => {
    const timeout = setTimeout(() => {
      const params = new URLSearchParams();
      if (search.trim()) {
        params.set("search", search);
      }
      router.replace(`/forum?${params.toString()}`);
    }, 300);

    return () => clearTimeout(timeout);
  }, [search, router]);

  const hasActiveFilters = search.trim() !== "";

  return (
    <div className="flex flex-col items-center gap-6 mb-8 w-full max-w-3xl mx-auto">
      {/* Search Input */}
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-brand-500 dark:text-brand-300">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search posts, authors..."
          className="w-full pl-12 pr-4 py-4 bg-[#070F2B]/5 dark:bg-[#1B1A55]/40 border border-brand-500/20 dark:border-brand-500/30 rounded-2xl font-['Inter'] text-base text-foreground placeholder-brand-500/60 focus:outline-none focus:border-active focus:ring-1 focus:ring-active transition-all shadow-inner"
        />
      </div>

      {/* Stats Summary & Clear Filters Button */}
      <div className="flex justify-between items-center w-full mt-4 text-sm text-[#535C91] dark:text-[#9290C3] border-b border-brand-500/10 pb-4">
        <div className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          <span>
            Showing <span className="font-bold text-foreground">{totalPosts > 0 ? "1" : "0"}-{totalPosts}</span> of <span className="font-bold text-foreground">{totalPosts}</span> posts
          </span>
        </div>

        {hasActiveFilters && (
          <button
            onClick={() => setSearch("")}
            className="flex items-center gap-1.5 hover:text-active transition-colors font-bold cursor-pointer text-xs uppercase tracking-wider"
          >
            <span>✕</span>
            <span>Clear filters</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchingForum;
