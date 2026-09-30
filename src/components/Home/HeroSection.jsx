"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { FaStar, FaFire, FaDumbbell, FaSpa } from "react-icons/fa";
import { FiZap } from "react-icons/fi";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ROTATING_WORDS = [
  "Strongest",
  "Limitless",
  "Unstoppable",
  "Peak Form",
  "Athletic",
];

// Smooth Apple/Linear cubic-bezier easing curve for ongoing word flips
const TRANSITION_EASE = [0.16, 1, 0.3, 1];

export default function HeroSection() {
  const [wordIndex, setWordIndex] = useState(0);
  const containerRef = useRef(null);

  // Counter Value Refs for Smooth Number Interpolation from 0 to Target
  const membersValRef = useRef(null);
  const coachesValRef = useRef(null);
  const successValRef = useRef(null);
  const ratingValRef = useRef(null);
  const trustedCountRef = useRef(null);

  // Kinetic text rotation cycle (every 3s)
  useEffect(() => {
    const timer = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  // GSAP Ultra-Smooth Choreographed Transition Timeline with Viewport ScrollTrigger
  useGSAP(
    () => {
      // The triggered transition starts when the hero section is visible in screen
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%", // Starts smoothly when the element is visible in the viewport
          once: true,       // Stable: remains revealed once played
        },
        defaults: { ease: "power3.out" },
      });

      // 1. Sub-title (kicker line above title): Clean, dignified entrance with clear start and end
      tl.fromTo(
        ".hero-kicker",
        { y: -25, opacity: 0, filter: "blur(5px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.0, ease: "power2.out" }
      ).addLabel("kickerEnd");

      // 2. Title: Begins right as the sub-title settles, gliding up with majestic slow motion
      tl.fromTo(
        ".hero-title-box",
        { y: 60, opacity: 0, filter: "blur(8px)", scale: 0.96 },
        { y: 0, opacity: 1, filter: "blur(0px)", scale: 1, duration: 1.35, ease: "power3.out" },
        "kickerEnd-=0.2"
      ).addLabel("titleEnd");

      // 3. EXACTLY when title transition ends ("titleEnd"), the RIGHT-SIDE IMAGES trigger separately in slow-motion:
      // Image 1: Top-Left (Olympic Weights) glides in from top-left with subtle tilt
      tl.fromTo(
        ".hero-img-1",
        { x: -90, y: -75, scale: 0.82, opacity: 0, rotate: -3 },
        { x: 0, y: 0, scale: 1, opacity: 1, rotate: 0, duration: 2.1, ease: "power3.out" },
        "titleEnd"
      );

      // Image 3: Top-Right (HIIT Conditioning) glides in from top-right with subtle tilt
      tl.fromTo(
        ".hero-img-3",
        { x: 85, y: -75, scale: 0.82, opacity: 0, rotate: 3 },
        { x: 0, y: 0, scale: 1, opacity: 1, rotate: 0, duration: 2.1, ease: "power3.out" },
        "titleEnd+=0.25"
      );

      // Image 2: Bottom-Left (Kinetic Power) glides in from bottom-left with subtle tilt
      tl.fromTo(
        ".hero-img-2",
        { x: -80, y: 85, scale: 0.82, opacity: 0, rotate: 2.5 },
        { x: 0, y: 0, scale: 1, opacity: 1, rotate: 0, duration: 2.1, ease: "power3.out" },
        "titleEnd+=0.50"
      );

      // Image 4: Bottom-Right (Mobility & Flow) glides in from bottom-right with subtle tilt
      tl.fromTo(
        ".hero-img-4",
        { x: 85, y: 85, scale: 0.82, opacity: 0, rotate: -2.5 },
        { x: 0, y: 0, scale: 1, opacity: 1, rotate: 0, duration: 2.1, ease: "power3.out" },
        "titleEnd+=0.75"
      );

      // 4. Concurrently, Accent Energy Beam & Description trigger smoothly
      tl.fromTo(
        ".hero-accent-beam",
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.9, ease: "power2.out" },
        "titleEnd-=0.2"
      );

      // Description triggers from TOP (title bottom side) moving DOWN into its own place
      tl.fromTo(
        ".hero-desc",
        { y: -40, opacity: 0, filter: "blur(6px)", scale: 0.98 },
        { y: 0, opacity: 1, filter: "blur(0px)", scale: 1, duration: 1.2, ease: "power3.out" },
        "titleEnd"
      );

      // 5. Buttons each transition with distinct complementary styles:
      // Explore Classes: Pops up from bottom-left with athletic spring
      tl.fromTo(
        ".hero-btn-primary",
        { x: -30, y: 20, scale: 0.88, opacity: 0 },
        { x: 0, y: 0, scale: 1, opacity: 1, duration: 1.0, ease: "back.out(1.5)" },
        "titleEnd+=0.25"
      );

      // Claim VIP Pass: Slides in from the right with smooth deceleration
      tl.fromTo(
        ".hero-btn-secondary",
        { x: 35, y: 0, scale: 0.9, opacity: 0 },
        { x: 0, y: 0, scale: 1, opacity: 1, duration: 1.0, ease: "power3.out" },
        "titleEnd+=0.35"
      );

      // 6. Member Social Proof Strip Transitions:
      // Avatars pop in with elastic bounce
      tl.fromTo(
        ".hero-avatar",
        { scale: 0, opacity: 0, y: 15 },
        { scale: 1, opacity: 1, y: 0, duration: 0.75, stagger: 0.08, ease: "back.out(2)" },
        "titleEnd+=0.45"
      );

      // Stars stagger-rotate into place
      tl.fromTo(
        ".hero-star",
        { scale: 0, rotate: -40, opacity: 0 },
        { scale: 1, rotate: 0, opacity: 1, duration: 0.6, stagger: 0.06, ease: "back.out(2)" },
        "titleEnd+=0.55"
      );

      // Rating score and trusted subtitle glide in from bottom
      tl.fromTo(
        ".hero-rating-box",
        { y: 15, opacity: 0, filter: "blur(4px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.8, ease: "power2.out" },
        "titleEnd+=0.5"
      );

      // 7. Key Milestone Stats Row Transitions:
      // Subtle top divider line expands outward
      tl.fromTo(
        ".hero-stats-divider",
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.95, ease: "power3.inOut" },
        "titleEnd+=0.6"
      );

      // 3 Stat columns cascade in with spring elevation
      tl.fromTo(
        ".hero-stat-col",
        { y: 30, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 1.0, stagger: 0.12, ease: "back.out(1.4)" },
        "titleEnd+=0.65"
      );

      // 8. Dynamic Telemetry Counter: MORE SLOW and steady cadence (duration: 5.5s)
      const counterData = {
        members: 0,
        coaches: 0,
        success: 0,
        rating: 0,
      };

      tl.fromTo(
        counterData,
        { members: 0, coaches: 0, success: 0, rating: 0 },
        {
          members: 15000,
          coaches: 200,
          success: 99.4,
          rating: 4.9,
          duration: 5.5, // Extended slow-motion cadence for premium, readable counting
          ease: "power1.out",
          onUpdate: () => {
            if (membersValRef.current) {
              membersValRef.current.textContent = Math.round(counterData.members).toLocaleString() + "+";
            }
            if (coachesValRef.current) {
              coachesValRef.current.textContent = Math.round(counterData.coaches) + "+";
            }
            if (successValRef.current) {
              successValRef.current.textContent = counterData.success.toFixed(1) + "%";
            }
            if (ratingValRef.current) {
              ratingValRef.current.textContent = counterData.rating.toFixed(1) + " / 5";
            }
            if (trustedCountRef.current) {
              trustedCountRef.current.textContent = Math.round(counterData.members).toLocaleString() + "+";
            }
          },
        },
        "titleEnd+=0.65"
      );

      // 9. AFTER images complete arrival, each image badge triggers with a DISTINCT style & physics:
      // Badge 1 (Free Weights Zone - Strength): Heavy-weight elastic vertical bounce with tilt
      tl.fromTo(
        ".hero-badge-1",
        { y: 40, scale: 0.2, rotate: -10, opacity: 0 },
        { y: 0, scale: 1, rotate: 0, opacity: 1, duration: 0.95, ease: "back.out(2.5)" },
        "titleEnd+=2.15"
      );

      // Badge 3 (HIIT Conditioning - Impact/Fire): High-velocity vertical drop with rebound bounce
      tl.fromTo(
        ".hero-badge-3",
        { y: -50, scale: 1.25, rotate: 6, opacity: 0 },
        { y: 0, scale: 1, rotate: 0, opacity: 1, duration: 0.95, ease: "bounce.out" },
        "titleEnd+=2.4"
      );

      // Badge 2 (Kinetic Power - Electric/Velocity): High-speed horizontal kinetic slash with skew
      tl.fromTo(
        ".hero-badge-2",
        { x: -65, skewX: -18, scale: 0.9, opacity: 0 },
        { x: 0, skewX: 0, scale: 1, opacity: 1, duration: 0.9, ease: "power4.out" },
        "titleEnd+=2.65"
      );

      // Badge 4 (Mobility & Flow - Zen/Blossom): Soft organic blooming expand with upward de-blur float
      tl.fromTo(
        ".hero-badge-4",
        { scale: 0.25, y: 30, filter: "blur(8px)", opacity: 0 },
        { scale: 1, y: 0, filter: "blur(0px)", opacity: 1, duration: 1.1, ease: "power2.out" },
        "titleEnd+=2.9"
      );

    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="relative overflow-hidden bg-background transition-colors duration-300">
      {/* Subtle Right Ambient Mesh Glow for Image Gallery */}
      <div 
        className="absolute top-1/2 right-12 w-80 sm:w-110 h-80 sm:h-110 bg-brand-500/10 rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse duration-[8000ms]"
      />

      <div className="w-11/12 mx-auto pt-4 sm:pt-6 lg:pt-8 pb-12 sm:pb-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 items-center">
          
          {/* Left Column: Kinetic Text, Value Proposition & CTAs */}
          <div className="lg:col-span-6 xl:col-span-6 space-y-5 sm:space-y-6">
            
            {/* Athletic Sub-Title (Kicker Line above Title) */}
            <div className="hero-kicker opacity-0 transform-gpu will-change-transform flex items-center gap-2.5 sm:gap-3 font-['Outfit'] select-none">
              <span className="h-[2px] w-6 sm:w-8 bg-active rounded-full inline-block" />
              <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.22em] text-active">
                <span className="font-['Inter'] italic font-extrabold text-foreground mr-1.5">//</span>
                Elite Performance <span className="text-foreground/80 font-medium tracking-normal">&amp;</span> Master Training
              </p>
            </div>

            {/* Kinetic Typography Headline with Smooth Masked Slot Animation */}
            <div className="hero-title-box opacity-0 transform-gpu will-change-transform space-y-1">
              <h1 className="font-['Outfit'] text-4xl sm:text-6xl lg:text-[4.1rem] xl:text-[4.65rem] font-extrabold text-foreground leading-[1.08] tracking-tight">
                <span className="block">
                  Forge Your
                </span>
                
                {/* Masked Kinetic Roller with Zero Height Shift */}
                <span className="block relative h-[1.18em] overflow-hidden text-active my-1 sm:my-1.5">
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.span
                      key={wordIndex}
                      initial={{ y: "100%", opacity: 0 }}
                      animate={{ y: "0%", opacity: 1 }}
                      exit={{ y: "-100%", opacity: 0 }}
                      transition={{
                        y: { duration: 0.55, ease: TRANSITION_EASE },
                        opacity: { duration: 0.28, ease: "easeOut" }
                      }}
                      className="block will-change-transform"
                    >
                      {ROTATING_WORDS[wordIndex]}
                    </motion.span>
                  </AnimatePresence>
                </span>

                <span className="block">
                  <span className="inline-block transition-transform hover:animate__animated hover:animate__headShake cursor-default">
                    Self.
                  </span>
                </span>
              </h1>

              {/* Kinetic Accent Energy Beam */}
              <div 
                style={{ transformOrigin: "left" }}
                className="hero-accent-beam opacity-0 transform-gpu will-change-transform w-24 sm:w-32 h-[3px] rounded-full bg-linear-to-r from-active via-brand-500/60 to-transparent mt-2"
              />
            </div>

            {/* Mission Statement (Triggers from top under the title, downward into its own place) */}
            <p className="hero-desc opacity-0 transform-gpu will-change-transform font-['Inter'] text-base sm:text-lg text-[#535C91] dark:text-[#9290C3] max-w-xl leading-relaxed">
              Welcome to <strong className="text-foreground font-semibold inline-block hover:animate__animated hover:animate__headShake cursor-default">FlexPulse</strong> — where certified master coaches, tailored functional regimens, and state-of-the-art facilities empower you to surpass your physical peak.
            </p>

            {/* Action Buttons with Strict Shadow Standards (sm/md only) & Kinetic Hover Styles */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-1">
              {/* Type 1: Primary High-Voltage Athletic CTA */}
              <Link
                href="/all-classes"
                className="hero-btn-primary opacity-0 transform-gpu will-change-transform relative overflow-hidden inline-flex items-center justify-center gap-2.5 px-6 py-3.5 sm:px-7 sm:py-4 bg-btn-bg text-btn-text font-extrabold rounded-2xl shadow-sm hover:shadow-md transform hover:-translate-y-0.5 hover:brightness-105 active:translate-y-0 active:scale-95 transition-all duration-300 ease-out text-sm sm:text-base border border-white/25 hover:border-white/40 cursor-pointer group"
              >
                {/* Athletic Kinetic Shimmer Beam Sweep */}
                <span className="absolute inset-0 w-1/2 h-full bg-linear-to-r from-transparent via-white/20 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-[250%] transition-transform duration-700 ease-out pointer-events-none" />
                <FaDumbbell className="w-4 h-4 sm:w-5 sm:h-5 text-btn-text group-hover:rotate-[-12deg] group-hover:scale-110 transition-transform duration-300 ease-out shrink-0" />
                <span>Explore Classes</span>
              </Link>
              
              {/* Type 2: Secondary / Glass Athletic CTA (Searchbox Body/Hover Tokens) */}
              <Link
                href="/calculator#trial-pass"
                className="hero-btn-secondary opacity-0 transform-gpu will-change-transform inline-flex items-center justify-center gap-2.5 px-5 py-3.5 sm:px-6 sm:py-4 bg-searchbox-bg hover:bg-searchbox-hover text-foreground font-bold rounded-2xl border border-brand-500/25 hover:border-active/60 shadow-xs hover:shadow-md transform hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-300 ease-out text-sm sm:text-base cursor-pointer group"
              >
                <span className="group-hover:text-active transition-colors duration-200">Claim VIP Pass</span>
                <FiArrowRight className="w-4 h-4 text-active group-hover:translate-x-1 group-hover:scale-105 transition-transform duration-300 ease-out shrink-0" />
              </Link>
            </div>

            {/* Member Social Proof Strip with Staggered Transition & Counter */}
            <div className="hero-social-proof flex items-center gap-3 pt-1 select-none">
              <div className="flex -space-x-2 overflow-hidden shrink-0">
                <img
                  className="hero-avatar opacity-0 transform-gpu will-change-transform inline-block h-7 w-7 sm:h-8 sm:w-8 rounded-full ring-2 ring-background object-cover shadow-xs"
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop"
                  alt="FlexPulse Athlete"
                />
                <img
                  className="hero-avatar opacity-0 transform-gpu will-change-transform inline-block h-7 w-7 sm:h-8 sm:w-8 rounded-full ring-2 ring-background object-cover shadow-xs"
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop"
                  alt="FlexPulse Athlete"
                />
                <img
                  className="hero-avatar opacity-0 transform-gpu will-change-transform inline-block h-7 w-7 sm:h-8 sm:w-8 rounded-full ring-2 ring-background object-cover shadow-xs"
                  src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=100&auto=format&fit=crop"
                  alt="FlexPulse Athlete"
                />
                <div className="hero-avatar opacity-0 transform-gpu will-change-transform inline-flex items-center justify-center h-7 w-7 sm:h-8 sm:w-8 rounded-full ring-2 ring-background bg-active text-white text-[9px] sm:text-[10px] font-black shadow-xs">
                  +15k
                </div>
              </div>
              <div className="hero-rating-box opacity-0 transform-gpu will-change-transform text-xs text-[#535C91] dark:text-[#9290C3] font-['Inter']">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="hero-star opacity-0 transform-gpu will-change-transform w-3 h-3 fill-current" />
                  ))}
                  <span 
                    ref={ratingValRef} 
                    className="font-extrabold text-foreground text-xs ml-1 tabular-nums"
                  >
                    4.9 / 5
                  </span>
                </div>
                <p className="text-[11px] font-medium text-[#535C91] dark:text-[#9290C3]">
                  Trusted by <span ref={trustedCountRef} className="font-semibold text-foreground/90 tabular-nums">15,000+</span> active athletes worldwide
                </p>
              </div>
            </div>

            {/* Key Milestone Stats Row with Dynamic Counting & Expanding Border */}
            <div className="hero-stats-divider opacity-0 transform-gpu will-change-transform grid grid-cols-3 gap-3 sm:gap-6 pt-5 border-t border-brand-500/20 font-['Outfit']" style={{ transformOrigin: "left" }}>
              <div className="hero-stat-col opacity-0 transform-gpu will-change-transform group">
                <p 
                  ref={membersValRef}
                  className="hero-stat-number text-xl sm:text-2xl lg:text-3xl font-black text-active tracking-tight inline-block hover:animate__animated hover:animate__headShake cursor-default tabular-nums transition-transform duration-300 group-hover:scale-105"
                >
                  15,000+
                </p>
                <p className="text-[10px] sm:text-xs text-[#535C91] dark:text-[#9290C3] font-bold uppercase tracking-wider mt-0.5">
                  Active Members
                </p>
              </div>
              <div className="hero-stat-col opacity-0 transform-gpu will-change-transform group">
                <p 
                  ref={coachesValRef}
                  className="hero-stat-number text-xl sm:text-2xl lg:text-3xl font-black text-active tracking-tight inline-block hover:animate__animated hover:animate__headShake cursor-default tabular-nums transition-transform duration-300 group-hover:scale-105"
                >
                  200+
                </p>
                <p className="text-[10px] sm:text-xs text-[#535C91] dark:text-[#9290C3] font-bold uppercase tracking-wider mt-0.5">
                  Master Coaches
                </p>
              </div>
              <div className="hero-stat-col opacity-0 transform-gpu will-change-transform group">
                <p 
                  ref={successValRef}
                  className="hero-stat-number text-xl sm:text-2xl lg:text-3xl font-black text-active tracking-tight inline-block hover:animate__animated hover:animate__headShake cursor-default tabular-nums transition-transform duration-300 group-hover:scale-105"
                >
                  99.4%
                </p>
                <p className="text-[10px] sm:text-xs text-[#535C91] dark:text-[#9290C3] font-bold uppercase tracking-wider mt-0.5">
                  Goal Success
                </p>
              </div>
            </div>
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
                <div className="hero-img-1 opacity-0 transform-gpu will-change-transform">
                  <div className="group relative h-48 sm:h-64 rounded-2xl sm:rounded-3xl overflow-hidden border border-brand-500/25 shadow-lg hover:shadow-2xl hover:border-active/60 hover:-translate-y-1.5 transition-all duration-300 ease-out cursor-pointer">
                    <div className="absolute inset-0 bg-linear-to-t from-brand-900/90 via-brand-900/20 to-transparent opacity-70 z-10 transition-opacity duration-300 group-hover:opacity-60"></div>
                    <Image
                      src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop"
                      className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500 ease-out"
                      alt="Olympic Dumbbells & Weights"
                      fill
                      priority
                    />
                    <div className="hero-badge-1 opacity-0 transform-gpu will-change-transform absolute bottom-3 left-3 z-20 bg-background/85 dark:bg-[#1B1A55]/90 backdrop-blur-md px-2.5 py-1.5 rounded-xl border border-brand-500/20 flex items-center gap-1.5 shadow-xs transition-transform duration-300 group-hover:translate-x-0.5">
                      <FaDumbbell className="w-3.5 h-3.5 text-active shrink-0 group-hover:rotate-12 transition-transform duration-300" />
                      <span className="text-[10px] font-bold text-foreground font-['Inter']">
                        Free Weights Zone
                      </span>
                    </div>
                  </div>
                </div>

                {/* Image 2: Explosive Barbell Lift */}
                <div className="hero-img-2 opacity-0 transform-gpu will-change-transform">
                  <div className="group relative h-32 sm:h-40 rounded-2xl sm:rounded-3xl overflow-hidden border border-brand-500/25 shadow-lg hover:shadow-2xl hover:border-active/60 hover:-translate-y-1.5 transition-all duration-300 ease-out cursor-pointer">
                    <div className="absolute inset-0 bg-linear-to-t from-brand-900/85 via-transparent to-transparent opacity-65 z-10 transition-opacity duration-300 group-hover:opacity-55"></div>
                    <Image
                      src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1200&auto=format&fit=crop"
                      className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500 ease-out"
                      alt="Strength Training Athlete"
                      fill
                    />
                    <div className="hero-badge-2 opacity-0 transform-gpu will-change-transform absolute bottom-2.5 left-2.5 z-20 bg-background/85 dark:bg-[#1B1A55]/90 backdrop-blur-md px-2 py-1 rounded-lg border border-brand-500/20 flex items-center gap-1.5 transition-transform duration-300 group-hover:translate-x-0.5">
                      <FiZap className="w-3 h-3 text-amber-400 shrink-0 group-hover:scale-115 transition-transform duration-300" />
                      <span className="text-[9px] font-bold text-foreground font-['Inter']">
                        Kinetic Power
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Column 2 (pt-4) */}
              <div className="space-y-3.5 sm:space-y-4 pt-4 sm:pt-5">
                {/* Image 3: High Intensity Athletic Kettlebell Training */}
                <div className="hero-img-3 opacity-0 transform-gpu will-change-transform">
                  <div className="group relative h-32 sm:h-40 rounded-2xl sm:rounded-3xl overflow-hidden border border-brand-500/25 shadow-lg hover:shadow-2xl hover:border-active/60 hover:-translate-y-1.5 transition-all duration-300 ease-out cursor-pointer">
                    <div className="absolute inset-0 bg-linear-to-t from-brand-900/85 via-transparent to-transparent opacity-65 z-10 transition-opacity duration-300 group-hover:opacity-55"></div>
                    <Image
                      src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200&auto=format&fit=crop"
                      className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500 ease-out"
                      alt="HIIT Functional Conditioning"
                      fill
                    />
                    <div className="hero-badge-3 opacity-0 transform-gpu will-change-transform absolute bottom-2.5 left-2.5 z-20 bg-background/85 dark:bg-[#1B1A55]/90 backdrop-blur-md px-2 py-1 rounded-lg border border-brand-500/20 flex items-center gap-1.5 transition-transform duration-300 group-hover:translate-x-0.5">
                      <FaFire className="w-3 h-3 text-active shrink-0 group-hover:scale-115 transition-transform duration-300" />
                      <span className="text-[9px] font-bold text-foreground font-['Inter']">
                        HIIT Conditioning
                      </span>
                    </div>
                  </div>
                </div>

                {/* Image 4: Sunset Restorative Mobility & Yoga */}
                <div className="hero-img-4 opacity-0 transform-gpu will-change-transform">
                  <div className="group relative h-48 sm:h-64 rounded-2xl sm:rounded-3xl overflow-hidden border border-brand-500/25 shadow-lg hover:shadow-2xl hover:border-active/60 hover:-translate-y-1.5 transition-all duration-300 ease-out cursor-pointer">
                    <div className="absolute inset-0 bg-linear-to-t from-brand-900/90 via-brand-900/20 to-transparent opacity-70 z-10 transition-opacity duration-300 group-hover:opacity-60"></div>
                    <Image
                      src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1200&auto=format&fit=crop"
                      className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500 ease-out"
                      alt="Mobility and Flow"
                      fill
                    />
                    <div className="hero-badge-4 opacity-0 transform-gpu will-change-transform absolute bottom-3 left-3 z-20 bg-background/85 dark:bg-[#1B1A55]/90 backdrop-blur-md px-2.5 py-1.5 rounded-xl border border-brand-500/20 flex items-center gap-1.5 shadow-xs transition-transform duration-300 group-hover:translate-x-0.5">
                      <FaSpa className="w-3.5 h-3.5 text-emerald-400 shrink-0 group-hover:scale-115 transition-transform duration-300" />
                      <span className="text-[10px] font-bold text-foreground font-['Inter']">
                        Mobility & Flow
                      </span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
