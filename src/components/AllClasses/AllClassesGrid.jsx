"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import ClassCard from "./ClassCard";
import Link from "next/link";
import { FiActivity, FiRefreshCw } from "react-icons/fi";

// Outer Grid Container with Universal Staged Viewport Delay (per rule.md Section 3.3 & FeaturedClasses.jsx)
const classesGridContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.15,
      staggerChildren: 0.14,
    },
  },
};

export default function AllClassesGrid({ classes = [], hasFilters = false }) {
  const gridRef = useRef(null);
  const isGridInView = useInView(gridRef, { once: true, amount: 0.12 });
  const [cardsTriggered, setCardsTriggered] = useState(false);

  // Staged Viewport Delay: Trigger transitions after entering screen viewport
  useEffect(() => {
    if (isGridInView) {
      const timer = setTimeout(() => {
        setCardsTriggered(true);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isGridInView]);

  if (classes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 sm:py-20 px-6 my-8 text-center rounded-3xl bg-card-bg border border-brand-500/20 max-w-2xl mx-auto shadow-sm backdrop-blur-md">
        <div className="w-16 h-16 rounded-2xl bg-active/10 border border-active/20 flex items-center justify-center mb-5 text-active shadow-xs">
          <FiActivity className="w-8 h-8" />
        </div>

        <h3 className="font-['Outfit'] text-2xl sm:text-3xl font-extrabold text-foreground mb-2">
          No Matching Sessions Found
        </h3>

        <p className="font-['Inter'] text-xs sm:text-sm text-secondary max-w-md mb-6 leading-relaxed">
          We couldn&apos;t find any athletic sessions matching your active search keywords or filter combination.
          Try adjusting your query or resetting selected criteria.
        </p>

        {hasFilters && (
          <Link
            href="/all-classes#classes-catalog"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-btn-bg text-btn-text text-xs font-extrabold uppercase tracking-wider shadow-sm hover:shadow-md active:scale-95 transition-all border border-white/20"
          >
            <FiRefreshCw className="w-4 h-4" />
            <span>Reset All Filters</span>
          </Link>
        )}

        {/* Quick Suggestions */}
        <div className="mt-8 pt-6 border-t border-brand-500/15 w-full max-w-sm">
          <span className="text-xs font-semibold text-secondary block mb-3">
            Browse popular performance disciplines:
          </span>
          <div className="flex flex-wrap justify-center gap-2">
            {["Weights", "HIIT", "Cardio", "Stretching"].map((cat) => (
              <Link
                key={cat}
                href={`/all-classes?category=${cat}#classes-catalog`}
                className="px-3 py-1.5 rounded-xl bg-brand-500/5 dark:bg-[#1B1A55]/30 text-xs font-semibold hover:text-active hover:border-active/40 border border-brand-500/15 transition-colors"
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      ref={gridRef}
      layout
      variants={classesGridContainerVariants}
      initial="hidden"
      animate={cardsTriggered ? "visible" : "hidden"}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
    >
      <AnimatePresence mode="popLayout">
        {classes.map((cls, idx) => (
          <ClassCard
            key={cls._id || idx}
            cls={cls}
            isTriggered={cardsTriggered}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
