"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FiClock, FiShield, FiAward } from "react-icons/fi";

const TRANSITION_EASE = [0.16, 1, 0.3, 1];

const operatingContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.08,
    },
  },
};

const operatingCardVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 220, damping: 20 },
  },
};

export default function FacilitiesOperatingHours() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.12 });

  return (
    <motion.div
      ref={containerRef}
      variants={operatingContainerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 font-['Inter']"
    >
      {/* Card 1: Operating Hours */}
      <motion.div
        variants={operatingCardVariants}
        whileHover={{ y: -4 }}
        transition={{ duration: 0.25, ease: TRANSITION_EASE }}
        className="p-6 rounded-3xl bg-brand-900/40 dark:bg-[#121026]/75 border border-brand-500/20 backdrop-blur-xl space-y-3.5 shadow-xs hover:border-active/40 transition-colors"
      >
        <div className="flex items-center gap-2 text-active font-black text-sm">
          <FiClock className="w-4 h-4" />
          <span>Club Operating Hours</span>
        </div>
        <div className="space-y-2 text-xs">
          <div className="flex justify-between pb-2 border-b border-brand-500/10">
            <span className="text-secondary font-medium">Monday – Friday</span>
            <span className="font-bold text-foreground">05:00 AM – 11:00 PM</span>
          </div>
          <div className="flex justify-between pb-2 border-b border-brand-500/10">
            <span className="text-secondary font-medium">Saturday & Sunday</span>
            <span className="font-bold text-foreground">07:00 AM – 09:00 PM</span>
          </div>
          <div className="flex justify-between pt-0.5">
            <span className="text-secondary font-medium">VIP Keycard Access</span>
            <span className="font-black text-active">24/7 Unrestricted</span>
          </div>
        </div>
      </motion.div>

      {/* Card 2: Hygiene & Sanitization */}
      <motion.div
        variants={operatingCardVariants}
        whileHover={{ y: -4 }}
        transition={{ duration: 0.25, ease: TRANSITION_EASE }}
        className="p-6 rounded-3xl bg-brand-900/40 dark:bg-[#121026]/75 border border-brand-500/20 backdrop-blur-xl space-y-3.5 shadow-xs hover:border-active/40 transition-colors"
      >
        <div className="flex items-center gap-2 text-active font-black text-sm">
          <FiShield className="w-4 h-4" />
          <span>Hygiene & Sanitization</span>
        </div>
        <p className="text-xs text-secondary leading-relaxed">
          Medical-grade UV-C sterilization runs hourly in locker suites. Touchless disinfectant stations,
          antibacterial wipes, and chalk-cleaner spray are stationed every 10 meters on the gym floor.
        </p>
      </motion.div>

      {/* Card 3: Mechanical Calibration */}
      <motion.div
        variants={operatingCardVariants}
        whileHover={{ y: -4 }}
        transition={{ duration: 0.25, ease: TRANSITION_EASE }}
        className="p-6 rounded-3xl bg-brand-900/40 dark:bg-[#121026]/75 border border-brand-500/20 backdrop-blur-xl space-y-3.5 shadow-xs hover:border-active/40 transition-colors"
      >
        <div className="flex items-center gap-2 text-active font-black text-sm">
          <FiAward className="w-4 h-4" />
          <span>Mechanical Calibration</span>
        </div>
        <p className="text-xs text-secondary leading-relaxed">
          Every barbell, cable pulley station, and Concept2 ergometer undergoes bi-weekly mechanical calibration
          by certified equipment technicians to guarantee peak performance and lifting safety.
        </p>
      </motion.div>
    </motion.div>
  );
}
