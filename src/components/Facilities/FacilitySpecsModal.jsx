"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiX,
  FiCheckCircle,
  FiShield,
  FiSliders,
  FiMapPin,
  FiCalendar,
  FiActivity,
  FiCompass,
  FiMaximize2,
  FiArrowRight,
} from "react-icons/fi";
import { FaDumbbell } from "react-icons/fa";

const TRANSITION_EASE = [0.16, 1, 0.3, 1];

// ── Multi-Element Triggered Motion Variants for Every Single Modal Element ──
const modalBackdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.35, ease: TRANSITION_EASE } },
  exit: { opacity: 0, transition: { duration: 0.25, ease: "easeIn" } },
};

const modalCardVariants = {
  hidden: { opacity: 0, scale: 0.94, y: 32 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: TRANSITION_EASE,
      staggerChildren: 0.06,
      delayChildren: 0.08,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    transition: { duration: 0.25, ease: "easeIn" },
  },
};

const modalCloseBtnVariants = {
  hidden: { opacity: 0, scale: 0, rotate: -90 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { type: "spring", stiffness: 320, damping: 18, delay: 0.12 },
  },
};

const modalHeroImageVariants = {
  hidden: { opacity: 0, scale: 1.08, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.75, ease: TRANSITION_EASE },
  },
};

const modalCategoryBadgeVariants = {
  hidden: { opacity: 0, x: -22, scale: 0.85 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 260, damping: 20 },
  },
};

const modalTempBadgeVariants = {
  hidden: { opacity: 0, x: 22, scale: 0.85 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 260, damping: 20 },
  },
};

const modalTitleVariants = {
  hidden: { opacity: 0, y: 22, filter: "blur(5px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: TRANSITION_EASE },
  },
};

const modalFloorBadgeVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: "easeOut" },
  },
};

const modalGalleryTabsVariants = {
  hidden: { opacity: 0, y: -12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 240, damping: 20 },
  },
};

const modalSectionHeaderVariants = {
  hidden: { opacity: 0, x: -16 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 220, damping: 20 },
  },
};

const modalDescVariants = {
  hidden: { opacity: 0, y: -8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const modalTelemetryVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: TRANSITION_EASE },
  },
};

const modalSpecsContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

const modalSpecItemVariants = {
  hidden: { opacity: 0, y: 14, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 240, damping: 22 },
  },
};

const modalEngContainerVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: TRANSITION_EASE, staggerChildren: 0.06 },
  },
};

const modalRuleItemVariants = {
  hidden: { opacity: 0, x: -14 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: "easeOut" },
  },
};

const modalActionsVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 220,
      damping: 20,
      staggerChildren: 0.08,
    },
  },
};

const modalActionBtnVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 12 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 250, damping: 20 },
  },
};

export default function FacilitySpecsModal({
  activeZone,
  onClose,
  onOpenTourFromSpecs,
}) {
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);

  if (!activeZone) return null;

  const occupancyPct = Math.round(
    (activeZone.currentOccupancy / activeZone.maxCapacity) * 100
  );
  const currentImageUrl =
    activeZone.gallery[activePhotoIdx]?.url || activeZone.image;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6 overflow-hidden">
        {/* Animated Dark Frosted Glass Backdrop */}
        <motion.div
          variants={modalBackdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
        />

        {/* Modal Window Container */}
        <motion.div
          variants={modalCardVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="relative bg-white dark:bg-[#0c0a1d] border border-slate-200/80 dark:border-brand-500/25 rounded-3xl max-w-3xl lg:max-w-4xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar shadow-2xl z-10 p-5 sm:p-7 md:p-8 space-y-6 text-slate-900 dark:text-foreground"
        >
          {/* High-Visibility Floating Close Button */}
          <motion.button
            variants={modalCloseBtnVariants}
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 z-30 w-9 h-9 rounded-full bg-black/70 hover:bg-active text-white hover:text-btn-text backdrop-blur-md border border-white/20 hover:border-active flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-xs cursor-pointer"
            aria-label="Close Technical Specifications Modal"
          >
            <FiX size={18} />
          </motion.button>

          {/* Modal Header Hero Image Showcase */}
          <motion.div
            variants={modalHeroImageVariants}
            className="relative h-64 sm:h-72 md:h-80 w-full rounded-2xl overflow-hidden border border-brand-500/20 bg-brand-800/30 shadow-xs"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentImageUrl}
                initial={{ opacity: 0.4, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0.4, scale: 0.98 }}
                transition={{ duration: 0.4, ease: TRANSITION_EASE }}
                className="relative w-full h-full"
              >
                <Image
                  src={currentImageUrl}
                  alt={activeZone.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 896px"
                />
              </motion.div>
            </AnimatePresence>

            {/* Dark Vignette Overlay for Crisp Typography */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-black/25 pointer-events-none" />

            {/* Top Badges: Category & Climate */}
            <div className="absolute top-4 left-4 right-14 flex items-center justify-between gap-2 z-10">
              <motion.div variants={modalCategoryBadgeVariants}>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-active text-btn-text text-[10px] sm:text-xs font-black uppercase tracking-wider shadow-2xs">
                  {activeZone.category}
                </span>
              </motion.div>

              <motion.div variants={modalTempBadgeVariants}>
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-white text-[11px] font-bold shadow-2xs">
                  {activeZone.temp}
                </span>
              </motion.div>
            </div>

            {/* Multi-Angle Photo Selector Tabs */}
            {activeZone.gallery && activeZone.gallery.length > 1 && (
              <motion.div
                variants={modalGalleryTabsVariants}
                className="absolute top-14 right-4 flex items-center gap-1.5 z-20"
              >
                {activeZone.gallery.map((view, vIdx) => {
                  const isViewActive = activePhotoIdx === vIdx;
                  return (
                    <button
                      key={vIdx}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActivePhotoIdx(vIdx);
                      }}
                      className={`px-2.5 py-1 rounded-xl text-[10px] font-bold backdrop-blur-md transition-all duration-200 cursor-pointer ${
                        isViewActive
                          ? "bg-active text-btn-text border border-active shadow-xs scale-105"
                          : "bg-black/60 text-white/80 border border-white/15 hover:bg-black/85 hover:text-white"
                      }`}
                    >
                      {view.label}
                    </button>
                  );
                })}
              </motion.div>
            )}

            {/* Bottom Title & Specs Banner */}
            <div className="absolute bottom-4 left-4 right-4 text-white font-['Inter'] z-10 pointer-events-none">
              <motion.div
                variants={modalFloorBadgeVariants}
                className="flex items-center gap-2 mb-1.5 text-xs text-white/80 font-semibold"
              >
                <span className="inline-flex items-center gap-1 bg-black/60 backdrop-blur-md px-2.5 py-0.5 rounded-lg border border-white/10 text-active font-bold">
                  <FiMapPin className="w-3 h-3" />
                  <span>{activeZone.floor}</span>
                </span>
                <span className="bg-black/60 backdrop-blur-md px-2.5 py-0.5 rounded-lg border border-white/10 font-mono">
                  {activeZone.footage} • {activeZone.ceilingHeight}
                </span>
              </motion.div>

              <motion.h3
                variants={modalTitleVariants}
                className="font-['Outfit'] text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-tight drop-shadow"
              >
                {activeZone.name}
              </motion.h3>
            </div>
          </motion.div>

          {/* Section 1: Overview & Architecture */}
          <div className="space-y-2 font-['Inter']">
            <motion.div variants={modalSectionHeaderVariants}>
              <h4 className="text-xs font-bold text-active uppercase tracking-wider flex items-center gap-1.5">
                <FiCompass className="w-3.5 h-3.5" />
                <span>Arena Architecture & Environment</span>
              </h4>
            </motion.div>
            <motion.p
              variants={modalDescVariants}
              className="text-xs sm:text-sm text-slate-600 dark:text-secondary leading-relaxed"
            >
              {activeZone.description}
            </motion.p>
          </div>

          {/* Section 2: Real-Time Live Telemetry Capacity */}
          <motion.div
            variants={modalTelemetryVariants}
            className="p-4 rounded-2xl bg-slate-50 dark:bg-[#1B1A55]/30 border border-slate-200/80 dark:border-brand-500/20 space-y-2.5 shadow-2xs font-['Inter']"
          >
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-900 dark:text-foreground flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-2xs" />
                <span>Live Arena Telemetry</span>
                <span className="text-slate-500 dark:text-secondary font-normal">({activeZone.occupancyStatus})</span>
              </span>
              <span className="font-black text-active font-mono">
                {activeZone.currentOccupancy} / {activeZone.maxCapacity} ({occupancyPct}%)
              </span>
            </div>

            <div className="w-full h-2 bg-slate-200/80 dark:bg-brand-500/15 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: `${occupancyPct}%` }}
                transition={{ duration: 1.1, delay: 0.25, ease: TRANSITION_EASE }}
                className={`h-full rounded-full ${
                  occupancyPct > 75
                    ? "bg-active"
                    : occupancyPct > 45
                    ? "bg-amber-500"
                    : "bg-emerald-500"
                }`}
              />
            </div>
          </motion.div>

          {/* Section 3: Certified Equipment Hardware Roster */}
          <div className="space-y-2.5 font-['Inter']">
            <motion.div variants={modalSectionHeaderVariants}>
              <h4 className="text-xs font-bold text-slate-900 dark:text-foreground uppercase tracking-wider flex items-center gap-1.5">
                <FaDumbbell className="text-active" />
                <span>Certified Equipment Hardware Roster</span>
              </h4>
            </motion.div>

            <motion.div
              variants={modalSpecsContainerVariants}
              className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-foreground"
            >
              {activeZone.specs.map((spec, idx) => (
                <motion.div
                  key={idx}
                  variants={modalSpecItemVariants}
                  className="flex items-start gap-2.5 p-3 rounded-2xl bg-slate-50 dark:bg-[#121026]/70 border border-slate-200/80 dark:border-brand-500/15 hover:border-active/40 transition-colors shadow-2xs"
                >
                  <FiCheckCircle className="text-active shrink-0 mt-0.5 w-4 h-4" />
                  <span className="text-slate-700 dark:text-secondary/95 leading-snug">{spec}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Section 4: Engineering & Acoustics */}
          {activeZone.engineering && activeZone.engineering.length > 0 && (
            <motion.div variants={modalEngContainerVariants} className="space-y-2.5 font-['Inter']">
              <motion.div variants={modalSectionHeaderVariants}>
                <h4 className="text-xs font-bold text-slate-900 dark:text-foreground uppercase tracking-wider flex items-center gap-1.5">
                  <FiSliders className="text-active" />
                  <span>Architectural & Engineering Specifications</span>
                </h4>
              </motion.div>

              <div className="space-y-2 text-xs">
                {activeZone.engineering.map((item, idx) => (
                  <motion.div
                    key={idx}
                    variants={modalRuleItemVariants}
                    className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 dark:bg-brand-500/5 border border-slate-200/80 dark:border-brand-500/10 text-slate-700 dark:text-secondary"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                    <span>{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Section 5: Arena Safety & Etiquette Rules */}
          {activeZone.rules && activeZone.rules.length > 0 && (
            <motion.div variants={modalEngContainerVariants} className="space-y-2.5 font-['Inter']">
              <motion.div variants={modalSectionHeaderVariants}>
                <h4 className="text-xs font-bold text-slate-900 dark:text-foreground uppercase tracking-wider flex items-center gap-1.5">
                  <FiShield className="text-active" />
                  <span>Campus Etiquette & Safety Protocols</span>
                </h4>
              </motion.div>

              <div className="space-y-2 text-xs">
                {activeZone.rules.map((rule, idx) => (
                  <motion.div
                    key={idx}
                    variants={modalRuleItemVariants}
                    className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 dark:bg-[#121026]/70 border border-slate-200/80 dark:border-brand-500/10 text-slate-700 dark:text-secondary"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-active shrink-0" />
                    <span>{rule}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Modal Bottom Actions (Strict 3-Type Button Hierarchy) */}
          <motion.div
            variants={modalActionsVariants}
            className="pt-4 border-t border-slate-200/80 dark:border-brand-500/15 flex flex-wrap items-center justify-between gap-3 font-['Inter']"
          >
            {/* Type 3 Close CTA */}
            <motion.button
              variants={modalActionBtnVariants}
              type="button"
              onClick={onClose}
              className="text-xs font-bold text-slate-500 hover:text-slate-900 dark:text-secondary dark:hover:text-foreground transition-colors cursor-pointer px-3 py-2 rounded-xl"
            >
              Dismiss
            </motion.button>

            <div className="flex items-center gap-2.5 ml-auto flex-wrap">
              {/* Type 2 Secondary Glass Athletic CTA */}
              <motion.div variants={modalActionBtnVariants}>
                <Link
                  href="/pricing"
                  className="inline-flex items-center gap-1 px-4 py-2.5 rounded-2xl border border-slate-200/90 dark:border-brand-500/25 bg-slate-50 dark:bg-searchbox-bg hover:bg-slate-100 dark:hover:bg-searchbox-hover hover:border-active/60 text-xs font-bold text-slate-800 dark:text-foreground transition-all shadow-2xs"
                >
                  <span>Membership Plans</span>
                  <FiArrowRight className="w-3.5 h-3.5 text-active" />
                </Link>
              </motion.div>

              {/* Type 1 Primary High-Voltage Athletic CTA */}
              <motion.button
                variants={modalActionBtnVariants}
                type="button"
                onClick={() => onOpenTourFromSpecs(activeZone)}
                className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-btn-bg text-btn-text text-xs font-black shadow-xs hover:shadow-md transition-all duration-300 overflow-hidden group hover:scale-102 cursor-pointer"
              >
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />
                <FiCalendar className="w-4 h-4 text-btn-text relative z-10" />
                <span className="relative z-10">Schedule VIP Walkthrough</span>
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
