"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiZap } from "react-icons/fi";
import { FaStar, FaFire } from "react-icons/fa";

const ROTATING_WORDS = [
  "Strongest",
  "Limitless",
  "Unstoppable",
  "Peak Form",
  "Athletic",
];

// Smooth Apple/Linear cubic-bezier easing curve
const TRANSITION_EASE = [0.16, 1, 0.3, 1];

export default function HeroSection() {
  const [wordIndex, setWordIndex] = useState(0);

  // Kinetic text rotation cycle (every 3s)
  useEffect(() => {
    const timer = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden bg-background transition-colors duration-300">
      {/* Background Kinetic Watermark Typography - Calibrated subtle opacity */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 0.035, y: 0 }}
        transition={{ duration: 1, ease: TRANSITION_EASE }}
        className="absolute top-2 left-0 right-0 overflow-hidden pointer-events-none select-none text-[100px] sm:text-[160px] lg:text-[210px] font-black font-['Outfit'] tracking-tighter leading-none whitespace-nowrap text-foreground -z-10"
      >
        FLEXPULSE ATHLETICS
      </motion.div>

      {/* Layered Ambient Mesh Glow - GPU Composited (CSS animate-pulse for 60fps zero-lag) */}
      <div 
        className="absolute top-1/3 left-1/5 -translate-x-1/2 -translate-y-1/2 w-96 sm:w-140 h-96 sm:h-140 bg-active/8 rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse duration-[6000ms]"
      />
      <div 
        className="absolute top-1/2 right-12 w-80 sm:w-110 h-80 sm:h-110 bg-brand-500/10 rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse duration-[8000ms]"
      />

      <div className="w-11/12 mx-auto pt-4 sm:pt-6 lg:pt-8 pb-12 sm:pb-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 items-center">
          
          {/* Left Column: Kinetic Text, Badge, Value Proposition & CTAs */}
          <div className="lg:col-span-6 xl:col-span-6 space-y-5 sm:space-y-6">
            
            {/* Elite Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05, ease: TRANSITION_EASE }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-800/25 dark:bg-[#1B1A55]/70 border border-brand-500/25 text-xs font-bold tracking-wide shadow-xs"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-active opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-active"></span>
              </span>
              <span className="text-active uppercase tracking-wider font-extrabold text-[11px]">
                Accredited Athletic Performance Club
              </span>
              <span className="text-[#535C91] dark:text-[#9290C3]">
                • 15,000+ Active Members
              </span>
            </motion.div>

            {/* Kinetic Typography Headline with Smooth Masked Slot Animation */}
            <div className="space-y-1">
              <h1 className="font-['Outfit'] text-4xl sm:text-6xl lg:text-[4.1rem] xl:text-[4.65rem] font-extrabold text-foreground leading-[1.08] tracking-tight">
                <motion.span 
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.12, ease: TRANSITION_EASE }}
                  className="block"
                >
                  Forge Your
                </motion.span>
                
                {/* Masked Kinetic Roller with Zero Height Shift */}
                <motion.span 
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.18, ease: TRANSITION_EASE }}
                  className="block relative h-[1.18em] overflow-hidden text-active my-1 sm:my-1.5"
                >
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.span
                      key={wordIndex}
                      initial={{ y: "100%", opacity: 0 }}
                      animate={{ y: "0%", opacity: 1 }}
                      exit={{ y: "-100%", opacity: 0 }}
                      transition={{
                        y: { duration: 0.52, ease: TRANSITION_EASE },
                        opacity: { duration: 0.28, ease: "easeOut" }
                      }}
                      className="block will-change-transform drop-shadow-[0_0_24px_rgba(255,24,68,0.35)]"
                    >
                      {ROTATING_WORDS[wordIndex]}
                    </motion.span>
                  </AnimatePresence>
                </motion.span>

                <motion.span 
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.24, ease: TRANSITION_EASE }}
                  className="block"
                >
                  Self.
                </motion.span>
              </h1>

              {/* Kinetic Accent Energy Beam */}
              <motion.div 
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.32, ease: TRANSITION_EASE }}
                style={{ transformOrigin: "left" }}
                className="w-24 sm:w-32 h-[3px] rounded-full bg-linear-to-r from-active via-brand-500/60 to-transparent mt-2"
              />
            </div>

            {/* Mission Statement */}
            <motion.p 
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.38, ease: TRANSITION_EASE }}
              className="font-['Inter'] text-base sm:text-lg text-[#535C91] dark:text-[#9290C3] max-w-xl leading-relaxed"
            >
              Welcome to <strong className="text-foreground font-semibold">FlexPulse</strong> — where certified master coaches, tailored functional regimens, and state-of-the-art facilities empower you to surpass your physical peak.
            </motion.p>

            {/* Action Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.44, ease: TRANSITION_EASE }}
              className="flex flex-wrap items-center gap-3 sm:gap-4 pt-1"
            >
              <Link
                href="/all-classes"
                className="relative overflow-hidden inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-7 sm:py-3.5 bg-btn-bg text-btn-text font-extrabold rounded-2xl shadow-lg hover:shadow-xl hover:opacity-95 transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 text-sm sm:text-base border border-brand-500/20 group"
              >
                {/* Subtle Button Shimmer Sweep */}
                <span className="absolute inset-0 w-1/2 h-full bg-linear-to-r from-transparent via-white/15 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-[250%] transition-transform duration-1000 ease-in-out pointer-events-none" />
                <FiZap className="w-4 h-4 sm:w-5 sm:h-5 text-btn-text group-hover:scale-115 transition-transform duration-300" />
                <span>Explore Classes</span>
              </Link>
              
              <Link
                href="/calculator#trial-pass"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 sm:px-6 sm:py-3.5 bg-background dark:bg-[#1B1A55]/80 hover:bg-[#535C91]/15 text-foreground font-bold rounded-2xl border border-brand-500/25 transition-all duration-200 text-sm sm:text-base hover:border-active/40 group hover:-translate-y-0.5"
              >
                <span>Claim VIP Pass</span>
                <FiArrowRight className="w-4 h-4 text-active group-hover:translate-x-1.5 transition-transform duration-200" />
              </Link>
            </motion.div>

            {/* Member Social Proof Strip */}
            <motion.div 
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.50, ease: TRANSITION_EASE }}
              className="flex items-center gap-3 pt-1"
            >
              <div className="flex -space-x-2 overflow-hidden shrink-0">
                <img
                  className="inline-block h-7 w-7 sm:h-8 sm:w-8 rounded-full ring-2 ring-background object-cover"
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop"
                  alt="FlexPulse Athlete"
                />
                <img
                  className="inline-block h-7 w-7 sm:h-8 sm:w-8 rounded-full ring-2 ring-background object-cover"
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop"
                  alt="FlexPulse Athlete"
                />
                <img
                  className="inline-block h-7 w-7 sm:h-8 sm:w-8 rounded-full ring-2 ring-background object-cover"
                  src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=100&auto=format&fit=crop"
                  alt="FlexPulse Athlete"
                />
                <div className="inline-flex items-center justify-center h-7 w-7 sm:h-8 sm:w-8 rounded-full ring-2 ring-background bg-active text-white text-[9px] sm:text-[10px] font-bold">
                  +15k
                </div>
              </div>
              <div className="text-xs text-[#535C91] dark:text-[#9290C3] font-['Inter']">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="w-3 h-3 fill-current" />
                  ))}
                  <span className="font-bold text-foreground text-xs ml-1">4.9 / 5</span>
                </div>
                <p className="text-[11px] font-medium text-[#535C91] dark:text-[#9290C3]">
                  Trusted by 15,000+ active athletes worldwide
                </p>
              </div>
            </motion.div>

            {/* Key Milestone Stats Row */}
            <motion.div 
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.56, ease: TRANSITION_EASE }}
              className="grid grid-cols-3 gap-3 sm:gap-6 pt-5 border-t border-brand-500/20 font-['Outfit']"
            >
              <div>
                <p className="text-xl sm:text-2xl lg:text-3xl font-black text-active tracking-tight">
                  15,000+
                </p>
                <p className="text-[10px] sm:text-xs text-[#535C91] dark:text-[#9290C3] font-bold uppercase tracking-wider mt-0.5">
                  Active Members
                </p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl lg:text-3xl font-black text-active tracking-tight">
                  200+
                </p>
                <p className="text-[10px] sm:text-xs text-[#535C91] dark:text-[#9290C3] font-bold uppercase tracking-wider mt-0.5">
                  Master Coaches
                </p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl lg:text-3xl font-black text-active tracking-tight">
                  99.4%
                </p>
                <p className="text-[10px] sm:text-xs text-[#535C91] dark:text-[#9290C3] font-bold uppercase tracking-wider mt-0.5">
                  Goal Success
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Centered Balanced Gallery Grid (Hardware-Accelerated Hover, Zero Jitter) */}
          <div className="lg:col-span-6 xl:col-span-6 flex items-center justify-center lg:justify-end self-center relative">
            
            {/* Glowing Backdrop Mesh */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 sm:w-96 h-72 sm:h-96 bg-active/10 dark:bg-active/15 rounded-full blur-[90px] pointer-events-none -z-10" />

            {/* Staggered Visual Gallery Grid - Perfectly Centered */}
            <div className="grid grid-cols-2 gap-3.5 sm:gap-4 w-full max-w-md lg:max-w-xl">
              
              {/* Column 1 */}
              <div className="space-y-3.5 sm:space-y-4">
                {/* Image 1: Main Strength & Olympic Weights */}
                <motion.div 
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.65, delay: 0.18, ease: TRANSITION_EASE }}
                >
                  <div className="group relative h-48 sm:h-64 rounded-2xl sm:rounded-3xl overflow-hidden border border-brand-500/25 shadow-lg hover:shadow-2xl hover:border-active/60 hover:-translate-y-1.5 transition-all duration-300 ease-out cursor-pointer">
                    <div className="absolute inset-0 bg-linear-to-t from-brand-900/90 via-brand-900/20 to-transparent opacity-70 z-10 transition-opacity duration-300 group-hover:opacity-60"></div>
                    <Image
                      src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop"
                      className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500 ease-out"
                      alt="Olympic Dumbbells & Weights"
                      fill
                      priority
                    />
                    <div className="absolute bottom-3 left-3 z-20 bg-background/85 dark:bg-[#1B1A55]/90 backdrop-blur-md px-2.5 py-1 rounded-xl border border-brand-500/20 flex items-center gap-1.5 shadow-xs transition-transform duration-300 group-hover:translate-x-0.5">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-active opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-active"></span>
                      </span>
                      <span className="text-[10px] font-bold text-foreground font-['Inter']">
                        Free Weights Zone
                      </span>
                    </div>
                  </div>
                </motion.div>

                {/* Image 2: Explosive Barbell Lift */}
                <motion.div 
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.65, delay: 0.32, ease: TRANSITION_EASE }}
                >
                  <div className="group relative h-32 sm:h-40 rounded-2xl sm:rounded-3xl overflow-hidden border border-brand-500/25 shadow-lg hover:shadow-2xl hover:border-active/60 hover:-translate-y-1.5 transition-all duration-300 ease-out cursor-pointer">
                    <div className="absolute inset-0 bg-linear-to-t from-brand-900/85 via-transparent to-transparent opacity-65 z-10 transition-opacity duration-300 group-hover:opacity-55"></div>
                    <Image
                      src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1200&auto=format&fit=crop"
                      className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500 ease-out"
                      alt="Strength Training Athlete"
                      fill
                    />
                    <div className="absolute bottom-2.5 left-2.5 z-20 bg-background/85 dark:bg-[#1B1A55]/90 backdrop-blur-md px-2 py-0.5 rounded-lg border border-brand-500/20 flex items-center gap-1 transition-transform duration-300 group-hover:translate-x-0.5">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-active opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-active"></span>
                      </span>
                      <span className="text-[9px] font-bold text-foreground font-['Inter']">
                        Kinetic Power
                      </span>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Column 2 (pt-4) */}
              <div className="space-y-3.5 sm:space-y-4 pt-4 sm:pt-5">
                {/* Image 3: High Intensity Athletic Kettlebell Training */}
                <motion.div 
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.65, delay: 0.24, ease: TRANSITION_EASE }}
                >
                  <div className="group relative h-32 sm:h-40 rounded-2xl sm:rounded-3xl overflow-hidden border border-brand-500/25 shadow-lg hover:shadow-2xl hover:border-active/60 hover:-translate-y-1.5 transition-all duration-300 ease-out cursor-pointer">
                    <div className="absolute inset-0 bg-linear-to-t from-brand-900/85 via-transparent to-transparent opacity-65 z-10 transition-opacity duration-300 group-hover:opacity-55"></div>
                    <Image
                      src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200&auto=format&fit=crop"
                      className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500 ease-out"
                      alt="HIIT Functional Conditioning"
                      fill
                    />
                    <div className="absolute bottom-2.5 left-2.5 z-20 bg-background/85 dark:bg-[#1B1A55]/90 backdrop-blur-md px-2 py-0.5 rounded-lg border border-brand-500/20 flex items-center gap-1 transition-transform duration-300 group-hover:translate-x-0.5">
                      <FaFire className="w-2.5 h-2.5 text-active" />
                      <span className="text-[9px] font-bold text-foreground font-['Inter']">
                        HIIT Conditioning
                      </span>
                    </div>
                  </div>
                </motion.div>

                {/* Image 4: Sunset Restorative Mobility & Yoga */}
                <motion.div 
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.65, delay: 0.38, ease: TRANSITION_EASE }}
                >
                  <div className="group relative h-48 sm:h-64 rounded-2xl sm:rounded-3xl overflow-hidden border border-brand-500/25 shadow-lg hover:shadow-2xl hover:border-active/60 hover:-translate-y-1.5 transition-all duration-300 ease-out cursor-pointer">
                    <div className="absolute inset-0 bg-linear-to-t from-brand-900/90 via-brand-900/20 to-transparent opacity-70 z-10 transition-opacity duration-300 group-hover:opacity-60"></div>
                    <Image
                      src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1200&auto=format&fit=crop"
                      className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500 ease-out"
                      alt="Mobility and Flow"
                      fill
                    />
                    <div className="absolute bottom-3 left-3 z-20 bg-background/85 dark:bg-[#1B1A55]/90 backdrop-blur-md px-2.5 py-1 rounded-xl border border-brand-500/20 flex items-center gap-1.5 shadow-xs transition-transform duration-300 group-hover:translate-x-0.5">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                      </span>
                      <span className="text-[10px] font-bold text-foreground font-['Inter']">
                        Mobility & Flow
                      </span>
                    </div>
                  </div>
                </motion.div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
