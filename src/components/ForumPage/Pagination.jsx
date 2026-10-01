"use client";

import { motion, useInView } from "framer-motion";
import Link from "next/link";
import React, { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const TRANSITION_EASE = [0.16, 1, 0.3, 1];

export const paginationContainerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: TRANSITION_EASE,
      staggerChildren: 0.06,
      delayChildren: 0.05,
    },
  },
};

export const paginationInfoVariants = {
  hidden: { opacity: 0, x: -16 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: TRANSITION_EASE },
  },
};

export const paginationButtonVariants = {
  hidden: { opacity: 0, y: 10, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 220, damping: 20 },
  },
};

export default function Pagination({ totalPages = 1, page = 1, buildPageLink }) {
  const navRef = useRef(null);
  const isInView = useInView(navRef, { once: true, amount: 0.2 });

  const safeTotalPages = Math.max(1, Number(totalPages) || 1);
  const safeCurrentPage = Math.max(1, Math.min(Number(page) || 1, safeTotalPages));

  // Generate pagination items with intelligent ellipsis
  const getPaginationItems = () => {
    if (safeTotalPages <= 7) {
      return Array.from({ length: safeTotalPages }, (_, i) => i + 1);
    }

    const items = [];
    items.push(1);

    if (safeCurrentPage > 3) {
      items.push("...");
    }

    const start = Math.max(2, safeCurrentPage - 1);
    const end = Math.min(safeTotalPages - 1, safeCurrentPage + 1);

    for (let i = start; i <= end; i++) {
      if (!items.includes(i)) items.push(i);
    }

    if (safeCurrentPage < safeTotalPages - 2) {
      items.push("...");
    }

    if (!items.includes(safeTotalPages)) {
      items.push(safeTotalPages);
    }

    return items;
  };

  const paginationItems = getPaginationItems();

  return (
    <motion.nav
      ref={navRef}
      variants={paginationContainerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      aria-label="Forum pagination navigation"
      className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-brand-500/15"
    >
      {/* Page indicator info */}
      <motion.div
        variants={paginationInfoVariants}
        className="text-xs text-[#535C91] dark:text-[#9290C3] font-['Inter'] flex items-center gap-1.5"
      >
        <span>Page</span>
        <strong className="text-foreground font-black px-1.5 py-0.5 rounded-md bg-brand-500/10 dark:bg-[#1B1A55]/60 text-active">
          {safeCurrentPage}
        </strong>
        <span>of</span>
        <strong className="text-foreground font-black">{safeTotalPages}</strong>
        {safeTotalPages === 1 && (
          <span className="ml-1 text-[11px] text-[#535C91]/70 dark:text-[#9290C3]/70">
            • All Discussions Loaded
          </span>
        )}
      </motion.div>

      {/* Pagination Controls */}
      <div className="flex items-center gap-1.5 font-['Inter'] text-sm">
        {/* Previous Button */}
        {safeCurrentPage > 1 ? (
          <motion.div variants={paginationButtonVariants}>
            <Link
              href={buildPageLink(safeCurrentPage - 1)}
              aria-label="Previous page"
              className="flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl border border-brand-500/20 bg-white/70 dark:bg-[#070F2B] text-foreground hover:bg-active/10 hover:border-active/40 active:scale-95 transition-all font-semibold text-xs cursor-pointer shadow-2xs hover:shadow-xs"
            >
              <FaChevronLeft className="w-3 h-3 text-active" />
              <span className="hidden sm:inline">Previous</span>
            </Link>
          </motion.div>
        ) : (
          <motion.span
            variants={paginationButtonVariants}
            aria-disabled="true"
            className="flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl border border-brand-500/10 bg-transparent text-[#535C91]/40 dark:text-[#9290C3]/40 text-xs cursor-not-allowed select-none"
          >
            <FaChevronLeft className="w-3 h-3 opacity-40" />
            <span className="hidden sm:inline">Previous</span>
          </motion.span>
        )}

        {/* Page Numbers */}
        <div className="flex items-center gap-1">
          {paginationItems.map((item, idx) => {
            if (item === "...") {
              return (
                <span
                  key={`ellipsis-${idx}`}
                  className="w-7 h-9 flex items-center justify-center text-xs text-[#535C91] dark:text-[#9290C3] select-none"
                >
                  •••
                </span>
              );
            }

            const pageNo = item;
            const isActive = pageNo === safeCurrentPage;

            return (
              <motion.div key={pageNo} variants={paginationButtonVariants}>
                <Link
                  href={buildPageLink(pageNo)}
                  aria-current={isActive ? "page" : undefined}
                  className={`w-9 h-9 flex items-center justify-center rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? "bg-btn-bg text-btn-text shadow-sm ring-2 ring-active/30 scale-105"
                      : "border border-brand-500/15 dark:border-brand-500/25 bg-white/70 dark:bg-[#070F2B] text-foreground hover:bg-active/10 hover:border-active/40 hover:-translate-y-0.5 active:scale-95 shadow-2xs"
                  }`}
                >
                  {pageNo}
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Next Button */}
        {safeCurrentPage < safeTotalPages ? (
          <motion.div variants={paginationButtonVariants}>
            <Link
              href={buildPageLink(safeCurrentPage + 1)}
              aria-label="Next page"
              className="flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl border border-brand-500/20 bg-white/70 dark:bg-[#070F2B] text-foreground hover:bg-active/10 hover:border-active/40 active:scale-95 transition-all font-semibold text-xs cursor-pointer shadow-2xs hover:shadow-xs"
            >
              <span className="hidden sm:inline">Next</span>
              <FaChevronRight className="w-3 h-3 text-active" />
            </Link>
          </motion.div>
        ) : (
          <motion.span
            variants={paginationButtonVariants}
            aria-disabled="true"
            className="flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl border border-brand-500/10 bg-transparent text-[#535C91]/40 dark:text-[#9290C3]/40 text-xs cursor-not-allowed select-none"
          >
            <span className="hidden sm:inline">Next</span>
            <FaChevronRight className="w-3 h-3 opacity-40" />
          </motion.span>
        )}
      </div>
    </motion.nav>
  );
}
