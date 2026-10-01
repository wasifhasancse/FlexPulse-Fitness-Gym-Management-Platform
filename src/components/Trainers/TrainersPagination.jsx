"use client";

import { motion, LayoutGroup, useInView } from "framer-motion";
import { useRef } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const TRANSITION_EASE = [0.16, 1, 0.3, 1];

const paginationContainerVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1.0,
      ease: TRANSITION_EASE,
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
};

const navBtnPrevVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.85, ease: TRANSITION_EASE },
  },
};

const navBtnNextVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.85, ease: TRANSITION_EASE },
  },
};

const pagePillVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 8 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 260, damping: 20 },
  },
};

const statusTelemetryVariants = {
  hidden: { opacity: 0, y: -8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut", delay: 0.2 },
  },
};

export default function TrainersPagination({
  currentPage = 1,
  totalPages = 1,
  totalItems = 0,
  onPageChange,
}) {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, "...", totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
      }
    }
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div ref={containerRef} className="mt-14 sm:mt-18 pt-8 border-t border-brand-500/15">
      <motion.div
        variants={paginationContainerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="flex flex-col items-center gap-4"
      >
        {/* Floating Athletic Pagination Dock */}
        <nav
          role="navigation"
          aria-label="Coaches Directory Pagination"
          className="inline-flex items-center gap-1.5 sm:gap-2 p-1.5 sm:p-2 rounded-2xl bg-card-bg/95 dark:bg-[#070F2B]/95 backdrop-blur-xl border border-brand-500/20 hover:border-brand-500/40 transition-all duration-300 shadow-sm"
        >
          {/* Previous Button */}
          <motion.div variants={navBtnPrevVariants}>
            <button
              type="button"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label="Previous Page"
              className={`group/prev inline-flex items-center justify-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl font-['Inter'] text-xs font-bold transition-all duration-200 select-none ${
                currentPage === 1
                  ? "bg-brand-500/5 text-secondary/40 border border-brand-500/10 cursor-not-allowed"
                  : "bg-searchbox-bg hover:bg-active/10 text-foreground hover:text-active border border-brand-500/20 hover:border-active/50 shadow-2xs hover:shadow-xs active:scale-95 cursor-pointer"
              }`}
            >
              <FiChevronLeft className="w-4 h-4 text-secondary group-hover/prev:text-active group-hover/prev:-translate-x-1 transition-all duration-200" />
              <span className="hidden sm:inline">Prev</span>
            </button>
          </motion.div>

          {/* Numbered Page Buttons with Sliding Spring Layout */}
          <LayoutGroup id="trainersPaginationLayoutGroup">
            <div className="flex items-center gap-1">
              {pageNumbers.map((p, idx) => {
                if (p === "...") {
                  return (
                    <span
                      key={`ellipsis-${idx}`}
                      className="w-7 h-8 sm:w-8 sm:h-9 flex items-center justify-center text-xs font-bold text-secondary select-none"
                    >
                      •••
                    </span>
                  );
                }

                const isActive = p === currentPage;

                return (
                  <motion.div key={p} variants={pagePillVariants}>
                    <button
                      type="button"
                      onClick={() => onPageChange(p)}
                      aria-current={isActive ? "page" : undefined}
                      className={`relative inline-flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-xl font-['Outfit'] text-xs sm:text-sm font-extrabold cursor-pointer transition-all duration-200 select-none ${
                        isActive
                          ? "text-white font-black"
                          : "text-secondary hover:text-active hover:bg-active/10 dark:hover:bg-active/15 hover:border-active/40 border border-transparent"
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="activeTrainersPagePill"
                          className="absolute inset-0 rounded-xl bg-active shadow-xs"
                          transition={{ type: "spring", stiffness: 450, damping: 35 }}
                        />
                      )}
                      <span className="relative z-10">{p}</span>
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </LayoutGroup>

          {/* Next Button */}
          <motion.div variants={navBtnNextVariants}>
            <button
              type="button"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              aria-label="Next Page"
              className={`group/next inline-flex items-center justify-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl font-['Inter'] text-xs font-bold transition-all duration-200 select-none ${
                currentPage === totalPages
                  ? "bg-brand-500/5 text-secondary/40 border border-brand-500/10 cursor-not-allowed"
                  : "bg-searchbox-bg hover:bg-active/10 text-foreground hover:text-active border border-brand-500/20 hover:border-active/50 shadow-2xs hover:shadow-xs active:scale-95 cursor-pointer"
              }`}
            >
              <span className="hidden sm:inline">Next</span>
              <FiChevronRight className="w-4 h-4 text-secondary group-hover/next:text-active group-hover/next:translate-x-1 transition-all duration-200" />
            </button>
          </motion.div>
        </nav>

        {/* Telemetry Status Strip with Live Emerald Beacon */}
        <motion.div
          variants={statusTelemetryVariants}
          className="flex items-center gap-2 text-xs font-['Inter'] text-secondary"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span>
            Page <strong className="text-foreground font-black font-['Outfit']">{currentPage}</strong> of{" "}
            <strong className="text-foreground font-black font-['Outfit']">{totalPages}</strong>
            <span className="mx-1.5 opacity-40">•</span>
            <strong className="text-foreground font-bold">{totalItems}</strong> accredited master coaches
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
}
