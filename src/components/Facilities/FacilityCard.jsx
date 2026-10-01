"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiCheckCircle,
  FiMapPin,
  FiMaximize2,
  FiCalendar,
  FiArrowRight,
  FiWind,
  FiEye,
  FiTag,
  FiCheck,
} from "react-icons/fi";

const TRANSITION_EASE = [0.16, 1, 0.3, 1];

// ── Multi-Element Triggered Motion Variants for Every Single Card Element ──
// Each element utilizes a distinct motion vector, physics model, and timing curve

export const facilityCardVariants = {
  hidden: { opacity: 0, y: 36, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1.15,
      ease: TRANSITION_EASE,
      staggerChildren: 0.07,
      delayChildren: 0.08,
    },
  },
};

// 1. Visual Photo: Cinematic scale settle and blur clearing
export const facilityImgVariants = {
  hidden: { scale: 1.14, filter: "blur(5px)" },
  visible: {
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 1.35, ease: TRANSITION_EASE },
  },
};

// 2. Tag Badge (e.g. COMPETITION GRADE): Top-left downward drop with dynamic spring tilt
export const facilityTagBadgeVariants = {
  hidden: { opacity: 0, y: -24, x: -16, rotate: -4, scale: 0.85 },
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    rotate: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 240, damping: 18 },
  },
};

// 3. Climate Control Badge: Top-right lateral slide with elastic bounce
export const facilityTempBadgeVariants = {
  hidden: { opacity: 0, x: 32, y: -6, scale: 0.88 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 220, damping: 20 },
  },
};

// 4. Photo Angle Tabs Container & Items: Buoyant downward drop with stagger
export const facilityGalleryNavVariants = {
  hidden: { opacity: 0, y: -18, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 22,
      staggerChildren: 0.06,
    },
  },
};

export const facilityGalleryItemVariants = {
  hidden: { opacity: 0, scale: 0.8, y: -8 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
};

// 5. Floor Level Badge: Bottom-left upward slide with map pin pulse
export const facilityFloorBadgeVariants = {
  hidden: { opacity: 0, y: 22, x: -16, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
    transition: { duration: 0.85, ease: TRANSITION_EASE },
  },
};

// 6. Dimensions & Clear Span Badge: Bottom-right upward slide
export const facilityDimensionsVariants = {
  hidden: { opacity: 0, y: 22, x: 16, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
    transition: { duration: 0.85, ease: TRANSITION_EASE },
  },
};

// 7. Quick Inspection Center Overlay Button: Center scale pop
export const facilityInspectOverlayVariants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 280, damping: 22 },
  },
};

// 8. Arena Category Kicker: Lateral sweep from left with expanding tracking
export const facilityCategoryBadgeVariants = {
  hidden: { opacity: 0, x: -24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 210, damping: 19 },
  },
};

// 9. Occupancy Live Telemetry Pill: Top-right elastic spring pop
export const facilityOccupancyBadgeVariants = {
  hidden: { opacity: 0, x: 22, scale: 0.75 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 250, damping: 18 },
  },
};

// 10. Arena Main Headline: Majestic upward sweep with gentle de-blur
export const facilityTitleVariants = {
  hidden: { opacity: 0, y: 26, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.1, ease: TRANSITION_EASE },
  },
};

// 11. Description Paragraph: Downward settling glide contrasting with rising title
export const facilityDescVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: "easeOut" },
  },
};

// 12. Capacity Telemetry Section: Upward rise
export const facilityTelemetryContainerVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: TRANSITION_EASE },
  },
};

// 13. Certified Hardware Highlights Container: Staggered entrance
export const facilitySpecsContainerVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.85,
      ease: TRANSITION_EASE,
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

// 14. Hardware Spec Items: Alternating entrance (even from left, odd from right)
export const facilitySpecItemLeftVariants = {
  hidden: { opacity: 0, x: -20, scale: 0.95 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 240, damping: 22 },
  },
};

export const facilitySpecItemRightVariants = {
  hidden: { opacity: 0, x: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 240, damping: 22 },
  },
};

// 15. Engineering Note Strip: Lateral fluid sweep from left with subtle highlight
export const facilityEngineeringVariants = {
  hidden: { opacity: 0, x: -30, scale: 0.98 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.95, ease: TRANSITION_EASE },
  },
};

// 16. Action CTA Buttons Container & Individual Buttons
export const facilityActionsContainerVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: TRANSITION_EASE,
      staggerChildren: 0.08,
    },
  },
};

export const facilityPrimaryBtnVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.88 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 260, damping: 20 },
  },
};

export const facilitySecondaryBtnVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 230, damping: 20 },
  },
};

export const facilityLinkBtnVariants = {
  hidden: { opacity: 0, x: 22 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 210, damping: 20 },
  },
};

export default function FacilityCard({
  zone,
  index = 0,
  viewMode = "split",
  isTriggered = true,
  onOpenSpecsModal,
  onOpenTourModal,
}) {
  const [activeGalleryIdx, setActiveGalleryIdx] = useState(0);

  if (!zone) return null;

  const isImageLeft = index % 2 === 0;
  const occupancyPct = Math.round((zone.currentOccupancy / zone.maxCapacity) * 100);
  const currentImageUrl = zone.gallery[activeGalleryIdx]?.url || zone.image;

  // ── VIEW MODE 1: ALTERNATING LEFT/RIGHT SHOWCASE ──
  if (viewMode === "split") {
    return (
      <motion.div
        variants={facilityCardVariants}
        initial="hidden"
        animate={isTriggered ? "visible" : "hidden"}
        whileHover={{ y: -4 }}
        transition={{ duration: 0.35, ease: TRANSITION_EASE }}
        className="group relative rounded-3xl border border-brand-500/20 hover:border-active/60 bg-brand-900/40 dark:bg-[#121026]/75 backdrop-blur-xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300"
      >
        <div
          className={`flex flex-col ${
            isImageLeft ? "lg:flex-row" : "lg:flex-row-reverse"
          } items-stretch`}
        >
          {/* Image Container with Multi-Angle Swapping */}
          <div className="lg:w-1/2 relative min-h-[320px] sm:min-h-[380px] lg:min-h-[460px] overflow-hidden bg-brand-800/30">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentImageUrl}
                initial={{ opacity: 0.4, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0.4, scale: 0.98 }}
                transition={{ duration: 0.45, ease: TRANSITION_EASE }}
                className="relative w-full h-full"
              >
                <Image
                  src={currentImageUrl}
                  alt={zone.name}
                  fill
                  className="object-cover group-hover:scale-106 transition-transform duration-700 ease-out"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </motion.div>
            </AnimatePresence>

            {/* Dark Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/20 pointer-events-none" />

            {/* Top Floating Badges: Tag (drop) & Climate (slide) */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 z-10">
              <motion.div variants={facilityTagBadgeVariants}>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-active text-btn-text font-['Inter'] text-[11px] font-black uppercase tracking-wider shadow-2xs group-hover:animate-pulse">
                  {zone.tag}
                </span>
              </motion.div>

              <motion.div variants={facilityTempBadgeVariants}>
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-white font-['Inter'] text-[11px] font-bold shadow-2xs">
                  {zone.temp}
                </span>
              </motion.div>
            </div>

            {/* Multi-Angle Photo Selector Tabs (Buoyant spring drop + stagger) */}
            <motion.div
              variants={facilityGalleryNavVariants}
              className="absolute top-14 right-4 flex items-center gap-1.5 z-20"
            >
              {zone.gallery.map((view, vIdx) => {
                const isViewActive = activeGalleryIdx === vIdx;
                return (
                  <motion.div key={vIdx} variants={facilityGalleryItemVariants}>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveGalleryIdx(vIdx);
                      }}
                      className={`px-2.5 py-1 rounded-xl text-[10px] font-bold backdrop-blur-md transition-all duration-200 cursor-pointer ${
                        isViewActive
                          ? "bg-active text-btn-text border border-active shadow-xs scale-105"
                          : "bg-black/60 text-white/80 border border-white/15 hover:bg-black/85 hover:text-white"
                      }`}
                    >
                      {view.label}
                    </button>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Bottom Floating Location & Dimensions (Distinct upward slides) */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white font-['Inter'] z-10 pointer-events-none">
              <motion.div
                variants={facilityFloorBadgeVariants}
                className="flex items-center gap-2 text-xs font-semibold bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-2xl border border-white/10"
              >
                <FiMapPin className="w-3.5 h-3.5 text-active" />
                <span>{zone.floor}</span>
              </motion.div>

              <motion.div
                variants={facilityDimensionsVariants}
                className="text-xs font-bold font-mono bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-2xl border border-white/10"
              >
                {zone.footage} • {zone.ceilingHeight}
              </motion.div>
            </div>

            {/* Quick Inspection Hover Overlay (Center scale pop) */}
            <button
              type="button"
              onClick={() => onOpenSpecsModal(zone)}
              className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-2xs cursor-pointer z-10"
            >
              <motion.span
                variants={facilityInspectOverlayVariants}
                className="px-4 py-2 rounded-2xl bg-white/95 text-black font-['Inter'] font-black text-xs shadow-md flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-transform"
              >
                <FiEye className="w-4 h-4 text-active" /> View Technical Specifications
              </motion.span>
            </button>
          </div>

          {/* Content Details Container */}
          <div className="lg:w-1/2 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {/* Category (left spring sweep) & Live Telemetry Capacity (right pop) */}
              <div className="flex items-center justify-between gap-2">
                <motion.div variants={facilityCategoryBadgeVariants}>
                  <span className="font-['Inter'] text-xs font-black uppercase tracking-wider text-active">
                    {zone.category}
                  </span>
                </motion.div>

                <motion.div
                  variants={facilityOccupancyBadgeVariants}
                  className="flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-[11px] font-semibold text-secondary font-['Inter']"
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      occupancyPct > 75
                        ? "bg-active"
                        : occupancyPct > 45
                        ? "bg-amber-500"
                        : "bg-emerald-500"
                    } animate-pulse`}
                  />
                  <span>
                    {zone.currentOccupancy}/{zone.maxCapacity} ({occupancyPct}%)
                  </span>
                </motion.div>
              </div>

              {/* Arena Name (majestic rising sweep with blur clearing + headShake hover) */}
              <motion.div variants={facilityTitleVariants}>
                <h2
                  onClick={() => onOpenSpecsModal(zone)}
                  className="font-['Outfit'] text-2xl sm:text-3xl font-black text-foreground tracking-tight leading-snug cursor-pointer group-hover:text-active transition-colors hover:animate-[headShake_1s_ease-in-out]"
                >
                  {zone.name}
                </h2>
              </motion.div>

              {/* Description (soft downward settling glide) */}
              <motion.p
                variants={facilityDescVariants}
                className="font-['Inter'] text-xs sm:text-sm text-secondary leading-relaxed"
              >
                {zone.description}
              </motion.p>

              {/* Capacity Telemetry Meter (triggered animated live meter sweep) */}
              <motion.div variants={facilityTelemetryContainerVariants} className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between font-['Inter'] text-[11px] text-secondary">
                  <span className="font-bold text-foreground">Arena Capacity Telemetry</span>
                  <span>{zone.occupancyStatus}</span>
                </div>
                <div className="w-full h-2 bg-brand-500/15 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: isTriggered ? `${occupancyPct}%` : "0%" }}
                    transition={{ duration: 1.25, delay: 0.35, ease: TRANSITION_EASE }}
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

              {/* Certified Hardware Highlights (alternating lateral stagger) */}
              <motion.div variants={facilitySpecsContainerVariants} className="space-y-2 pt-2">
                <span className="font-['Inter'] text-[11px] font-bold text-foreground uppercase tracking-wider block">
                  Key Certified Hardware Roster
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-['Inter'] text-foreground">
                  {zone.specs.slice(0, 4).map((spec, idx) => {
                    const isEven = idx % 2 === 0;
                    return (
                      <motion.div
                        key={idx}
                        variants={isEven ? facilitySpecItemLeftVariants : facilitySpecItemRightVariants}
                        className="flex items-start gap-2 p-2.5 rounded-2xl bg-card-bg/80 dark:bg-[#1B1A55]/30 border border-brand-500/15 hover:border-active/40 transition-colors"
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 350, delay: 0.2 + idx * 0.05 }}
                        >
                          <FiCheckCircle className="w-3.5 h-3.5 text-active shrink-0 mt-0.5" />
                        </motion.div>
                        <span className="line-clamp-2 leading-snug text-secondary/90">{spec}</span>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>

              {/* Engineering Note (lateral fluid sweep from left) */}
              {zone.engineering && zone.engineering[0] && (
                <motion.div
                  variants={facilityEngineeringVariants}
                  className="font-['Inter'] text-[11px] text-secondary flex items-center gap-2 p-2.5 rounded-xl bg-brand-500/5 border border-brand-500/15"
                >
                  <FiWind className="w-3.5 h-3.5 text-active shrink-0" />
                  <span className="truncate">
                    <strong>Engineering:</strong> {zone.engineering[0]}
                  </span>
                </motion.div>
              )}
            </div>

            {/* Action Buttons (Strict 3-Type Button Hierarchy with Staggered Springs) */}
            <motion.div
              variants={facilityActionsContainerVariants}
              className="pt-4 border-t border-brand-500/15 flex flex-wrap items-center gap-3"
            >
              {/* Type 1 Primary High-Voltage Athletic CTA (Spring pop + kinetic sweep) */}
              <motion.button
                variants={facilityPrimaryBtnVariants}
                type="button"
                onClick={() => onOpenSpecsModal(zone)}
                className="relative inline-flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-btn-bg text-btn-text font-['Inter'] text-xs font-black shadow-xs hover:shadow-md transition-all duration-300 overflow-hidden group/btn hover:scale-102 cursor-pointer"
              >
                <span className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />
                <FiMaximize2 className="w-3.5 h-3.5 text-btn-text relative z-10" />
                <span className="relative z-10">Full Technical Specs</span>
              </motion.button>

              {/* Type 2 Secondary Glass Athletic CTA (Spring pop + border glow) */}
              <motion.button
                variants={facilitySecondaryBtnVariants}
                type="button"
                onClick={() => onOpenTourModal(zone)}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-2xl border border-brand-500/25 bg-searchbox-bg hover:bg-searchbox-hover hover:border-active/60 text-foreground font-['Inter'] text-xs font-bold transition-all shadow-2xs cursor-pointer"
              >
                <FiCalendar className="w-3.5 h-3.5 text-active" />
                <span>Book Arena Tour</span>
              </motion.button>

              {/* Link CTA (Right slide) */}
              <motion.div variants={facilityLinkBtnVariants} className="ml-auto">
                <Link
                  href="/all-classes"
                  className="px-3.5 py-2.5 rounded-2xl font-['Inter'] text-xs font-semibold text-secondary hover:text-active transition-colors flex items-center gap-1"
                >
                  <span>Classes</span>
                  <FiArrowRight className="w-3.5 h-3.5" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    );
  }

  // ── VIEW MODE 2: 3-COLUMN CARD GRID ──
  return (
    <motion.div
      variants={facilityCardVariants}
      initial="hidden"
      animate={isTriggered ? "visible" : "hidden"}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.35, ease: TRANSITION_EASE }}
      className="group relative flex flex-col justify-between h-full bg-brand-900/40 dark:bg-[#121026]/75 border border-brand-500/20 hover:border-active/60 rounded-3xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300"
    >
      {/* Visual Image Cover with de-blur settle */}
      <div className="relative h-60 w-full overflow-hidden bg-brand-800/30">
        <motion.div variants={facilityImgVariants} className="relative w-full h-full">
          <Image
            src={zone.gallery[0]?.url || zone.image}
            alt={zone.name}
            fill
            className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent pointer-events-none" />

        {/* Top Badges (drop and slide) */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10">
          <motion.div variants={facilityTagBadgeVariants}>
            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-active text-btn-text font-['Inter'] text-[10px] font-black uppercase tracking-wider shadow-2xs group-hover:animate-pulse">
              {zone.tag}
            </span>
          </motion.div>

          <motion.div variants={facilityTempBadgeVariants}>
            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-white font-['Inter'] text-[10px] font-bold shadow-2xs">
              {zone.temp}
            </span>
          </motion.div>
        </div>

        {/* Bottom Banner Location & Title */}
        <div className="absolute bottom-3 left-3.5 right-3.5 text-white z-10 font-['Inter'] pointer-events-none">
          <div className="flex items-center justify-between text-[11px] font-black text-active uppercase tracking-wider mb-0.5">
            <motion.span variants={facilityCategoryBadgeVariants}>{zone.category}</motion.span>
            <motion.span variants={facilityDimensionsVariants} className="text-white/80 font-normal font-mono">
              {zone.footage}
            </motion.span>
          </div>
          <motion.h3
            variants={facilityTitleVariants}
            className="font-['Outfit'] text-lg sm:text-xl font-black tracking-tight drop-shadow line-clamp-1 group-hover:text-active transition-colors"
          >
            {zone.name}
          </motion.h3>
          <motion.p variants={facilityFloorBadgeVariants} className="text-[11px] text-white/70 flex items-center gap-1 mt-0.5">
            <FiMapPin className="w-3 h-3 text-active" />
            <span>{zone.floor}</span>
          </motion.p>
        </div>
      </div>

      {/* Card Details */}
      <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
        <div className="space-y-3.5">
          <motion.p
            variants={facilityDescVariants}
            className="font-['Inter'] text-xs text-secondary leading-relaxed line-clamp-2"
          >
            {zone.description}
          </motion.p>

          {/* Live Capacity Meter with real-time animated width fill */}
          <motion.div
            variants={facilityTelemetryContainerVariants}
            className="p-3 rounded-2xl bg-card-bg/80 dark:bg-[#1B1A55]/30 border border-brand-500/15 space-y-2"
          >
            <div className="flex items-center justify-between font-['Inter'] text-[11px]">
              <span className="font-bold text-foreground flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Live Capacity
              </span>
              <span className="text-secondary font-medium">
                {zone.currentOccupancy} / {zone.maxCapacity} ({occupancyPct}%)
              </span>
            </div>
            <div className="w-full h-1.5 bg-brand-500/15 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: isTriggered ? `${occupancyPct}%` : "0%" }}
                transition={{ duration: 1.25, delay: 0.35, ease: TRANSITION_EASE }}
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

          {/* Equipment Highlights */}
          <motion.div variants={facilitySpecsContainerVariants} className="space-y-1.5">
            <span className="font-['Inter'] text-[10px] font-bold text-foreground uppercase tracking-wider block">
              Featured Certified Equipment
            </span>
            <ul className="space-y-1 font-['Inter'] text-xs text-secondary">
              {zone.specs.slice(0, 3).map((spec, idx) => (
                <motion.li key={idx} variants={facilitySpecItemLeftVariants} className="flex items-center gap-2 truncate">
                  <FiCheck className="w-3.5 h-3.5 text-active shrink-0" />
                  <span className="truncate">{spec}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Action Buttons */}
        <motion.div
          variants={facilityActionsContainerVariants}
          className="pt-3.5 border-t border-brand-500/15 flex items-center justify-between gap-2"
        >
          {/* Type 1 Primary High-Voltage Athletic CTA */}
          <motion.button
            variants={facilityPrimaryBtnVariants}
            type="button"
            onClick={() => onOpenSpecsModal(zone)}
            className="flex-1 relative inline-flex items-center justify-center gap-1.5 py-2.5 rounded-2xl bg-btn-bg text-btn-text font-['Inter'] text-xs font-black shadow-xs hover:shadow-md transition-all duration-300 overflow-hidden group/btn hover:scale-102 cursor-pointer"
          >
            <span className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />
            <FiMaximize2 className="w-3.5 h-3.5 text-btn-text relative z-10" />
            <span className="relative z-10">Full Specs</span>
          </motion.button>

          {/* Type 2 Secondary Glass Athletic CTA */}
          <motion.button
            variants={facilitySecondaryBtnVariants}
            type="button"
            onClick={() => onOpenTourModal(zone)}
            className="px-3.5 py-2.5 rounded-2xl border border-brand-500/25 bg-searchbox-bg hover:bg-searchbox-hover hover:border-active/60 text-foreground font-['Inter'] text-xs font-bold transition-all shadow-2xs cursor-pointer"
          >
            Tour
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}
