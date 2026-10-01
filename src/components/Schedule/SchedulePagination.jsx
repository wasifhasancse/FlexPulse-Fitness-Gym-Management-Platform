"use client";

import { motion } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const TRANSITION_EASE = [0.16, 1, 0.3, 1];

const paginationContainerVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.85, ease: TRANSITION_EASE },
  },
};

export default function SchedulePagination({
  currentPage = 1,
  totalPages = 1,
  totalItems = 0,
  onPageChange,
}) {
  if (totalPages <= 1) return null;

  return (
    <motion.div
      variants={paginationContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="flex flex-col items-center gap-3 pt-6 border-t border-brand-500/15"
    >
      <nav
        role="navigation"
        aria-label="Schedule Pagination"
        className="inline-flex items-center gap-1.5 p-1.5 rounded-3xl bg-brand-900/40 dark:bg-[#121026]/75 border border-brand-500/20 backdrop-blur-xl shadow-xs"
      >
        {/* Previous Page Button (Type 2 Secondary Glass CTA) */}
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous Page"
          className={`inline-flex items-center justify-center gap-1 px-3.5 py-2 rounded-2xl font-['Inter'] text-xs font-bold transition-all duration-200 cursor-pointer ${
            currentPage === 1
              ? "text-secondary/40 cursor-not-allowed opacity-50"
              : "text-foreground hover:bg-brand-500/10 hover:text-active active:scale-95"
          }`}
        >
          <FiChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Previous</span>
        </button>

        {/* Page Number Pills */}
        <div className="flex items-center gap-1">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNo) => {
            const isActive = pageNo === currentPage;

            return (
              <button
                key={pageNo}
                type="button"
                onClick={() => onPageChange(pageNo)}
                aria-current={isActive ? "page" : undefined}
                className={`relative inline-flex items-center justify-center w-9 h-9 rounded-2xl font-['Inter'] text-xs font-bold transition-all duration-200 cursor-pointer select-none ${
                  isActive
                    ? "text-btn-text font-black shadow-xs scale-105"
                    : "text-secondary hover:text-foreground hover:bg-brand-500/10"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeSchedulePagePill"
                    className="absolute inset-0 rounded-2xl bg-active shadow-xs"
                    transition={{ type: "spring", stiffness: 450, damping: 35 }}
                  />
                )}
                <span className="relative z-10">{pageNo}</span>
              </button>
            );
          })}
        </div>

        {/* Next Page Button (Type 2 Secondary Glass CTA) */}
        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next Page"
          className={`inline-flex items-center justify-center gap-1 px-3.5 py-2 rounded-2xl font-['Inter'] text-xs font-bold transition-all duration-200 cursor-pointer ${
            currentPage === totalPages
              ? "text-secondary/40 cursor-not-allowed opacity-50"
              : "text-foreground hover:bg-brand-500/10 hover:text-active active:scale-95"
          }`}
        >
          <span className="hidden sm:inline">Next</span>
          <FiChevronRight className="w-4 h-4" />
        </button>
      </nav>

      {/* Real-Time Session Status Info */}
      <span className="font-['Inter'] text-[11px] text-secondary">
        Page <strong className="text-foreground font-bold">{currentPage}</strong> of{" "}
        <strong className="text-foreground font-bold">{totalPages}</strong> •{" "}
        <strong className="text-foreground font-bold">{totalItems}</strong> scheduled workout sessions
      </span>
    </motion.div>
  );
}
