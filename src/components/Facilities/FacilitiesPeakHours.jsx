"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FiActivity } from "react-icons/fi";

const TRANSITION_EASE = [0.16, 1, 0.3, 1];

const PEAK_HOURS = [
  {
    time: "5:00 AM – 7:00 AM",
    label: "Early Dawn",
    density: "Moderate (40%)",
    pct: 40,
    color: "bg-emerald-500",
    note: "Serene & focused",
  },
  {
    time: "7:00 AM – 9:00 AM",
    label: "Morning Peak",
    density: "High Traffic (85%)",
    pct: 85,
    color: "bg-active",
    note: "Fast-paced flow",
  },
  {
    time: "9:00 AM – 12:00 PM",
    label: "Midday Window",
    density: "Optimal Floor (30%)",
    pct: 30,
    color: "bg-emerald-500",
    note: "Plentiful racks",
  },
  {
    time: "12:00 PM – 2:00 PM",
    label: "Lunch Rush",
    density: "Moderate (55%)",
    pct: 55,
    color: "bg-amber-500",
    note: "Quick HIIT & steam",
  },
  {
    time: "2:00 PM – 5:00 PM",
    label: "Afternoon Serene",
    density: "Low Density (25%)",
    pct: 25,
    color: "bg-emerald-500",
    note: "Ultra quiet & open",
  },
  {
    time: "5:00 PM – 8:00 PM",
    label: "Evening Rush",
    density: "Peak Session (90%)",
    pct: 90,
    color: "bg-active",
    note: "High energy buzz",
  },
  {
    time: "8:00 PM – 11:00 PM",
    label: "Night Focus",
    density: "Quiet Hours (35%)",
    pct: 35,
    color: "bg-emerald-500",
    note: "Optimal hydro spa",
  },
];

const peakContainerVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1.05,
      ease: TRANSITION_EASE,
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const peakHeaderKickerVariants = {
  hidden: { opacity: 0, y: -16, scale: 0.88 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 240, damping: 20 },
  },
};

const peakHeaderTitleVariants = {
  hidden: { opacity: 0, y: 22, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.95, ease: TRANSITION_EASE },
  },
};

const peakHeaderDescVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: "easeOut" },
  },
};

const peakLegendVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 210, damping: 20 },
  },
};

const slotsGridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.18,
    },
  },
};

const slotItemVariants = {
  hidden: { opacity: 0, y: 26, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 240, damping: 20 },
  },
};

export default function FacilitiesPeakHours() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.12 });

  return (
    <motion.div
      ref={containerRef}
      variants={peakContainerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="rounded-3xl bg-brand-900/40 dark:bg-[#121026]/75 border border-brand-500/20 backdrop-blur-xl p-6 sm:p-8 space-y-6 shadow-xs"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <motion.div variants={peakHeaderKickerVariants}>
            <span className="text-[11px] font-bold uppercase tracking-wider text-active inline-flex items-center gap-1.5 font-['Inter'] px-3 py-1 rounded-full bg-active/10 border border-active/20">
              <FiActivity className="w-3.5 h-3.5 animate-pulse" />
              <span>Real-Time Traffic Telemetry</span>
            </span>
          </motion.div>

          <motion.h2 variants={peakHeaderTitleVariants} className="font-['Outfit'] text-xl sm:text-2xl font-black text-foreground">
            Club Crowd Density & Peak Hours
          </motion.h2>

          <motion.p variants={peakHeaderDescVariants} className="font-['Inter'] text-xs text-secondary">
            Plan your workouts to match your preferred energy level: quiet & open or peak buzz.
          </motion.p>
        </div>

        <motion.div
          variants={peakLegendVariants}
          className="flex items-center gap-3.5 text-xs text-secondary self-start sm:self-auto font-['Inter'] bg-card-bg/60 dark:bg-[#1B1A55]/30 p-2.5 rounded-2xl border border-brand-500/15 shadow-2xs"
        >
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-2xs" />
            <span className="font-medium text-[11px]">Low / Calm</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-2xs" />
            <span className="font-medium text-[11px]">Moderate</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-active shadow-2xs" />
            <span className="font-medium text-[11px]">Peak Rush</span>
          </div>
        </motion.div>
      </div>

      {/* 7 Staggered Telemetry Time Blocks */}
      <motion.div variants={slotsGridVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3">
        {PEAK_HOURS.map((slot, idx) => (
          <motion.div
            key={idx}
            variants={slotItemVariants}
            whileHover={{ y: -4, scale: 1.02 }}
            transition={{ duration: 0.25, ease: TRANSITION_EASE }}
            className="p-3.5 rounded-2xl bg-card-bg/80 dark:bg-[#121026]/90 border border-brand-500/15 hover:border-active/50 space-y-2.5 text-center shadow-2xs transition-colors group cursor-default"
          >
            <span className="text-[11px] font-black text-foreground block font-['Outfit'] group-hover:text-active transition-colors">
              {slot.time}
            </span>
            <span className="text-[10px] font-bold text-secondary uppercase tracking-wider block font-['Inter']">
              {slot.label}
            </span>

            {/* Kinetic Animated Telemetry Bar */}
            <div className="w-full h-2 bg-brand-500/15 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: isInView ? `${slot.pct}%` : "0%" }}
                transition={{
                  duration: 1.25,
                  delay: 0.3 + idx * 0.08,
                  ease: TRANSITION_EASE,
                }}
                className={`h-full rounded-full ${slot.color}`}
              />
            </div>

            <span className="text-[10px] text-secondary font-semibold block font-['Inter']">
              {slot.density}
            </span>
            <span className="text-[9px] text-secondary/70 block italic font-['Inter']">
              {slot.note}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
