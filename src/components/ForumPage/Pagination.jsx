import Link from "next/link";
import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function Pagination({ totalPages, page, buildPageLink }) {
  if (!totalPages || totalPages <= 1) return null;

  return (
    <nav
      aria-label="Forum pagination navigation"
      className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-brand-500/15"
    >
      <div className="text-xs text-[#535C91] dark:text-[#9290C3] font-['Inter']">
        Page <span className="font-bold text-foreground">{page}</span> of{" "}
        <span className="font-bold text-foreground">{totalPages}</span>
      </div>

      <div className="flex items-center gap-1.5 font-['Inter'] text-sm">
        {/* Previous Button */}
        {page > 1 ? (
          <Link
            href={buildPageLink(page - 1)}
            aria-label="Previous page"
            className="flex items-center justify-center gap-1 px-3.5 py-2 rounded-xl border border-brand-500/20 bg-white/40 dark:bg-[#1B1A55]/30 text-foreground hover:bg-active/10 hover:border-active/40 transition-all font-medium text-xs cursor-pointer"
          >
            <FaChevronLeft className="w-3 h-3" />
            <span className="hidden sm:inline">Prev</span>
          </Link>
        ) : (
          <span
            aria-disabled="true"
            className="flex items-center justify-center gap-1 px-3.5 py-2 rounded-xl border border-brand-500/10 bg-transparent text-[#535C91]/40 dark:text-[#9290C3]/40 text-xs cursor-not-allowed"
          >
            <FaChevronLeft className="w-3 h-3" />
            <span className="hidden sm:inline">Prev</span>
          </span>
        )}

        {/* Page Numbers */}
        <div className="flex items-center gap-1">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNo) => {
            const isActive = pageNo === page;
            return (
              <Link
                key={pageNo}
                href={buildPageLink(pageNo)}
                aria-current={isActive ? "page" : undefined}
                className={`w-9 h-9 flex items-center justify-center rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? "bg-btn-bg text-btn-text shadow-md ring-2 ring-active/20 scale-105"
                    : "border border-brand-500/15 dark:border-brand-500/25 bg-white/40 dark:bg-[#1B1A55]/30 text-foreground hover:bg-active/10 hover:border-active/40"
                }`}
              >
                {pageNo}
              </Link>
            );
          })}
        </div>

        {/* Next Button */}
        {page < totalPages ? (
          <Link
            href={buildPageLink(page + 1)}
            aria-label="Next page"
            className="flex items-center justify-center gap-1 px-3.5 py-2 rounded-xl border border-brand-500/20 bg-white/40 dark:bg-[#1B1A55]/30 text-foreground hover:bg-active/10 hover:border-active/40 transition-all font-medium text-xs cursor-pointer"
          >
            <span className="hidden sm:inline">Next</span>
            <FaChevronRight className="w-3 h-3" />
          </Link>
        ) : (
          <span
            aria-disabled="true"
            className="flex items-center justify-center gap-1 px-3.5 py-2 rounded-xl border border-brand-500/10 bg-transparent text-[#535C91]/40 dark:text-[#9290C3]/40 text-xs cursor-not-allowed"
          >
            <span className="hidden sm:inline">Next</span>
            <FaChevronRight className="w-3 h-3" />
          </span>
        )}
      </div>
    </nav>
  );
}
