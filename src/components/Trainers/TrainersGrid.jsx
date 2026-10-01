"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import TrainerCard from "./TrainerCard";
import { FiSearch, FiRefreshCw } from "react-icons/fi";

const trainersGridContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.15,
      staggerChildren: 0.12,
    },
  },
};

export default function TrainersGrid({
  trainers = [],
  viewMode = "grid",
  onOpenModal,
  resetAllFilters,
}) {
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

  if (trainers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 sm:py-20 px-6 my-8 text-center rounded-3xl bg-card-bg border border-brand-500/20 max-w-2xl mx-auto shadow-sm backdrop-blur-md">
        <div className="w-16 h-16 rounded-2xl bg-active/10 border border-active/20 flex items-center justify-center mb-5 text-active shadow-xs">
          <FiSearch className="w-8 h-8" />
        </div>

        <h3 className="font-['Outfit'] text-2xl sm:text-3xl font-extrabold text-foreground mb-2">
          No Coaches Match Your Search
        </h3>

        <p className="font-['Inter'] text-xs sm:text-sm text-secondary max-w-md mb-6 leading-relaxed">
          We couldn&apos;t find any coaching staff matching your selected criteria. Try adjusting your search query or reset your active filters.
        </p>

        <button
          type="button"
          onClick={resetAllFilters}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-btn-bg text-btn-text text-xs font-extrabold uppercase tracking-wider shadow-sm hover:shadow-md active:scale-95 transition-all border border-white/20 cursor-pointer"
        >
          <FiRefreshCw className="w-4 h-4" />
          <span>Reset All Filters</span>
        </button>
      </div>
    );
  }

  return (
    <motion.div
      ref={gridRef}
      layout
      variants={trainersGridContainerVariants}
      initial="hidden"
      animate={cardsTriggered ? "visible" : "hidden"}
      className={
        viewMode === "grid"
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          : "space-y-5"
      }
    >
      <AnimatePresence mode="popLayout">
        {trainers.map((trainer, idx) => (
          <TrainerCard
            key={trainer._id || idx}
            trainer={trainer}
            viewMode={viewMode}
            onOpenModal={onOpenModal}
            isTriggered={cardsTriggered}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
