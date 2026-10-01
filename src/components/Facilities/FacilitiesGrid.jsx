"use client";

import { useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  FiSearch,
  FiMaximize2,
  FiMapPin,
  FiRefreshCw,
} from "react-icons/fi";
import FacilityCard from "./FacilityCard";

const TRANSITION_EASE = [0.16, 1, 0.3, 1];

const gridContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.12,
    },
  },
};

const tableBodyVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
};

const tableRowVariants = {
  hidden: { opacity: 0, x: -16 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: TRANSITION_EASE },
  },
};

export default function FacilitiesGrid({
  viewMode = "split",
  filteredZones = [],
  searchQuery = "",
  resetAllFilters,
  onOpenSpecsModal,
  onOpenTourModal,
}) {
  const containerRef = useRef(null);
  const isTriggered = useInView(containerRef, { once: true, amount: 0.08 });

  // ── EMPTY STATE ──
  if (filteredZones.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: TRANSITION_EASE }}
        className="text-center py-16 px-6 rounded-3xl bg-brand-900/30 dark:bg-[#121026]/50 border border-brand-500/20 backdrop-blur-xl shadow-xs space-y-4 max-w-xl mx-auto"
      >
        <div className="w-16 h-16 rounded-3xl bg-active/10 border border-active/20 flex items-center justify-center mx-auto text-active">
          <FiSearch className="w-8 h-8" />
        </div>
        <div className="space-y-1">
          <h3 className="font-['Outfit'] text-xl sm:text-2xl font-black text-foreground">
            No Matching Facility Arenas Found
          </h3>
          <p className="font-['Inter'] text-xs sm:text-sm text-secondary leading-relaxed">
            We couldn&apos;t find any fitness arena matching &quot;{searchQuery}&quot;.
            Try resetting your search query or choosing another campus level.
          </p>
        </div>
        <button
          type="button"
          onClick={resetAllFilters}
          className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-btn-bg text-btn-text font-['Inter'] text-xs font-black shadow-xs hover:shadow-md transition-all duration-300 overflow-hidden group hover:scale-102 cursor-pointer"
        >
          <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />
          <FiRefreshCw className="w-3.5 h-3.5 text-btn-text relative z-10" />
          <span className="relative z-10">Reset All Filters</span>
        </button>
      </motion.div>
    );
  }

  // ── VIEW 1: ALTERNATING LEFT / RIGHT SHOWCASE ──
  if (viewMode === "split") {
    return (
      <div ref={containerRef} className="space-y-8 sm:space-y-12">
        <motion.div
          layout
          variants={gridContainerVariants}
          initial="hidden"
          animate={isTriggered ? "visible" : "hidden"}
          className="space-y-8 sm:space-y-12"
        >
          <AnimatePresence mode="popLayout">
            {filteredZones.map((zone, index) => (
              <FacilityCard
                key={zone.id}
                zone={zone}
                index={index}
                viewMode="split"
                isTriggered={isTriggered}
                onOpenSpecsModal={onOpenSpecsModal}
                onOpenTourModal={onOpenTourModal}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    );
  }

  // ── VIEW 2: 3-COLUMN CARD GRID ──
  if (viewMode === "grid") {
    return (
      <div ref={containerRef} className="space-y-6">
        <motion.div
          layout
          variants={gridContainerVariants}
          initial="hidden"
          animate={isTriggered ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7"
        >
          <AnimatePresence mode="popLayout">
            {filteredZones.map((zone, index) => (
              <FacilityCard
                key={zone.id}
                zone={zone}
                index={index}
                viewMode="grid"
                isTriggered={isTriggered}
                onOpenSpecsModal={onOpenSpecsModal}
                onOpenTourModal={onOpenTourModal}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    );
  }

  // ── VIEW 3: BLUEPRINT SPEC LEDGER TABLE ──
  return (
    <div ref={containerRef} className="space-y-4">
      <div className="overflow-x-auto rounded-3xl border border-brand-500/20 bg-brand-900/40 dark:bg-[#121026]/75 backdrop-blur-xl shadow-xs">
        <table className="w-full text-left font-['Inter'] text-xs sm:text-sm">
          <thead className="border-b border-brand-500/20 bg-brand-800/20 text-secondary uppercase font-black tracking-wider text-[11px]">
            <tr>
              <th className="py-3.5 px-4 sm:px-6">Arena Name & Zone</th>
              <th className="py-3.5 px-4 sm:px-6">Floor Level</th>
              <th className="py-3.5 px-4 sm:px-6">Floor Area</th>
              <th className="py-3.5 px-4 sm:px-6">Climate Control</th>
              <th className="py-3.5 px-4 sm:px-6">Live Capacity</th>
              <th className="py-3.5 px-4 sm:px-6">Top Equipment</th>
              <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
            </tr>
          </thead>
          <motion.tbody
            variants={tableBodyVariants}
            initial="hidden"
            animate={isTriggered ? "visible" : "hidden"}
            className="divide-y divide-brand-500/10"
          >
            {filteredZones.map((zone) => {
              const pct = Math.round((zone.currentOccupancy / zone.maxCapacity) * 100);

              return (
                <motion.tr
                  key={zone.id}
                  variants={tableRowVariants}
                  className="hover:bg-brand-500/5 transition-colors group"
                >
                  {/* Name & Category */}
                  <td className="py-4 px-4 sm:px-6">
                    <div className="font-bold text-sm text-foreground font-['Outfit'] group-hover:text-active transition-colors">
                      {zone.name}
                    </div>
                    <span className="text-[10px] font-black text-active uppercase tracking-wider inline-block mt-0.5">
                      {zone.category}
                    </span>
                  </td>

                  {/* Floor Level */}
                  <td className="py-4 px-4 sm:px-6 text-secondary whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <FiMapPin className="w-3.5 h-3.5 text-active" />
                      <span>{zone.floor}</span>
                    </div>
                  </td>

                  {/* Floor Area */}
                  <td className="py-4 px-4 sm:px-6 font-mono font-bold whitespace-nowrap text-foreground">
                    {zone.footage}
                  </td>

                  {/* Climate Control */}
                  <td className="py-4 px-4 sm:px-6 text-secondary whitespace-nowrap">
                    {zone.temp}
                  </td>

                  {/* Live Capacity */}
                  <td className="py-4 px-4 sm:px-6 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-brand-500/15 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            pct > 75
                              ? "bg-active"
                              : pct > 45
                              ? "bg-amber-500"
                              : "bg-emerald-500"
                          }`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="font-bold text-[11px] text-secondary">
                        {zone.currentOccupancy}/{zone.maxCapacity}
                      </span>
                    </div>
                  </td>

                  {/* Top Equipment */}
                  <td className="py-4 px-4 sm:px-6 text-secondary max-w-xs truncate">
                    {zone.specs[0]}
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-4 sm:px-6 text-right whitespace-nowrap">
                    <button
                      type="button"
                      onClick={() => onOpenSpecsModal(zone)}
                      className="px-3 py-1.5 rounded-xl bg-btn-bg text-btn-text font-black text-xs shadow-2xs hover:shadow-xs transition-all hover:scale-102 cursor-pointer inline-flex items-center gap-1"
                    >
                      <FiMaximize2 className="w-3.5 h-3.5" />
                      <span>Specs</span>
                    </button>
                  </td>
                </motion.tr>
              );
            })}
          </motion.tbody>
        </table>
      </div>
    </div>
  );
}
