"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { FaQuoteLeft, FaQuoteRight, FaStar } from "react-icons/fa";
import {
  FiCheck,
  FiTrendingUp,
  FiCheckCircle,
  FiChevronLeft,
  FiChevronRight
} from "react-icons/fi";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const TRANSITION_EASE = [0.16, 1, 0.3, 1];

const REVIEWS = [
  {
    id: "marcus",
    name: "Marcus Vance",
    role: "Olympic Strength Member",
    tenure: "18 Months Active",
    achievement: "Squat: 185 to 315 lbs",
    discipline: "Olympic Lifting & Hypertrophy",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop",
    quote: "FlexPulse fundamentally overhauled my lifting biomechanics. The master coaches don't just watch reps; they analyze kinematic bar paths, fatigue accumulation, and progressive overload. Moving my squat from 185 to 315 lbs without a single joint issue is proof.",
    rating: 5,
    tagColor: "bg-active/10 text-active border-active/20"
  },
  {
    id: "sophia",
    name: "Sophia Martinez",
    role: "HIIT & MetCon Athlete",
    tenure: "12 Months Active",
    achievement: "VO2 Max: 38 to 51 mL/kg",
    discipline: "Metabolic Conditioning",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop",
    quote: "The heart-rate telemetry and curved Woodway treadmills keep you accountable to your physiological ceiling. My resting heart rate dropped from 72 to 54 bpm, and the community energy in every class is electric. You never train alone here.",
    rating: 5,
    tagColor: "bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 border-emerald-500/20"
  },
  {
    id: "david",
    name: "David Chen",
    role: "Corporate Executive & Member",
    tenure: "15 Months Active",
    achievement: "-24 lbs Fat & +7 lbs Muscle",
    discipline: "Body Recomposition",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop",
    quote: "With 60-hour work weeks, I need surgical efficiency. The 24/7 keyless facility access, paired with personalized InBody 570 scans and custom macro distribution, allowed me to drop 24 lbs of fat while gaining functional lean tissue.",
    rating: 5,
    tagColor: "bg-purple-500/10 text-purple-500 dark:text-purple-400 border-purple-500/20"
  },
  {
    id: "elena",
    name: "Elena Moreau",
    role: "Mobility & Flow Athlete",
    tenure: "9 Months Active",
    achievement: "Zero Chronic Lumbar Pain",
    discipline: "Vinyasa & Fascial Release",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop",
    quote: "After years of sedentary office stiffness, the infrared cedar saunas, cold plunge suites, and targeted thoracic flow classes restored my spine. I wake up energized and completely pain-free. The recovery amenities alone are worth the membership.",
    rating: 5,
    tagColor: "bg-amber-500/10 text-amber-500 dark:text-amber-400 border-amber-500/20"
  },
  {
    id: "tariq",
    name: "Tariq Al-Mansoor",
    role: "Combat Athletics Member",
    tenure: "14 Months Active",
    achievement: "Rotational Strike Velocity: +28%",
    discipline: "Combat Boxing & Turf Power",
    image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=200&auto=format&fit=crop",
    quote: "Training alongside Golden Gloves coaches completely unlocked my rotational kinetic power. The aqua heavy bags and footwork acceleration drills build genuine athletic conditioning you cannot replicate on standard gym machines.",
    rating: 5,
    tagColor: "bg-rose-500/10 text-rose-500 dark:text-rose-400 border-rose-500/20"
  },
  {
    id: "chloe",
    name: "Chloe Bennett",
    role: "Marathon & Endurance Athlete",
    tenure: "11 Months Active",
    achievement: "Half-Marathon: 1h 48m to 1h 32m",
    discipline: "Aerobic Engine & Conditioning",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop",
    quote: "The personalized lactate clearance protocols and SkiErg interval circuits broke my half-marathon plateau by 16 minutes. FlexPulse is the first club that treats everyday professionals like competitive varsity athletes.",
    rating: 5,
    tagColor: "bg-cyan-500/10 text-cyan-500 dark:text-cyan-400 border-cyan-500/20"
  }
];

// ── Framer-Motion Variants For Every Single Card Element ─────────────────────
const cardShellVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1.4,
      ease: TRANSITION_EASE,
      staggerChildren: 0.08,
      delayChildren: 0.08
    }
  }
};

const starsVariants = {
  hidden: { opacity: 0, x: -16 },
  visible: { opacity: 1, x: 0, transition: { duration: 1.1, ease: TRANSITION_EASE } }
};

const disciplineBadgeVariants = {
  hidden: { opacity: 0, x: 16, scale: 0.9 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 160, damping: 20 }
  }
};

const milestonePillVariants = {
  hidden: { opacity: 0, x: -18, scale: 0.94 },
  visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 1.2, ease: TRANSITION_EASE } }
};

// Big decorated quote watermark with triggered spring pop & rotation
const quoteWatermarkVariants = {
  hidden: {
    opacity: 0,
    scale: 0.3,
    rotate: 25,
    x: 16,
    y: -14
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    x: 0,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 16,
      delay: 0.14
    }
  }
};

const quoteTextVariants = {
  hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.3, ease: TRANSITION_EASE }
  }
};

const dividerVariants = {
  hidden: { opacity: 0, scaleX: 0 },
  visible: {
    opacity: 1,
    scaleX: 1,
    transition: { duration: 1.2, ease: TRANSITION_EASE }
  }
};

const avatarVariants = {
  hidden: { opacity: 0, scale: 0.5, rotate: -14 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { type: "spring", stiffness: 150, damping: 18 }
  }
};

const memberInfoVariants = {
  hidden: { opacity: 0, x: -14 },
  visible: { opacity: 1, x: 0, transition: { duration: 1.1, ease: TRANSITION_EASE } }
};

const memberRoleVariants = {
  hidden: { opacity: 0, y: -8 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.0, ease: "easeOut" } }
};

const verifiedBadgeVariants = {
  hidden: { opacity: 0, scale: 0.7, x: 12 },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: { type: "spring", stiffness: 150, damping: 20 }
  }
};

const bottomBarVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: "easeOut" } }
};

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const sectionRef = useRef(null);
  const carouselRef = useRef(null);
  const reviewCountRef = useRef(null);

  const isCarouselInView = useInView(carouselRef, { once: true, amount: 0.1 });
  const [carouselTriggered, setCarouselTriggered] = useState(false);

  // 1.0s staged delay for carousel cards
  useEffect(() => {
    if (isCarouselInView) {
      const timer = setTimeout(() => setCarouselTriggered(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [isCarouselInView]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setVisibleCards(1);
      else if (window.innerWidth < 1024) setVisibleCards(2);
      else setVisibleCards(3);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, REVIEWS.length - visibleCards);

  useEffect(() => {
    if (currentIndex > maxIndex) setCurrentIndex(maxIndex);
  }, [maxIndex, currentIndex]);

  useEffect(() => {
    if (isPaused || maxIndex === 0) return;
    const timer = setInterval(
      () => setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1)),
      4000
    );
    return () => clearInterval(timer);
  }, [isPaused, maxIndex]);

  const handlePrev = () => setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  const handleNext = () => setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  const handleTouchStart = (e) => setTouchStart(e.targetTouches[0].clientX);
  const handleTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const dist = touchStart - touchEnd;
    if (dist > 50) handleNext();
    if (dist < -50) handlePrev();
    setTouchStart(null);
    setTouchEnd(null);
  };

  // GSAP ScrollTrigger — Header Sequence and 0-to-target Review Counter
  useGSAP(
    () => {
      if (reviewCountRef.current) reviewCountRef.current.textContent = "0+ Reviews";

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          once: true
        },
        defaults: { ease: "power3.out" }
      });

      // 1. Kicker Badge: Downward entrance (-35px) + de-blur
      tl.fromTo(
        ".testimonials-kicker",
        { y: -35, opacity: 0, filter: "blur(6px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.6, ease: "power2.out" }
      ).addLabel("kickerEnd");

      // 2. Headline: Majestic upward rising sweep (+50px) + de-blur + scale
      tl.fromTo(
        ".testimonials-headline",
        { y: 50, opacity: 0, filter: "blur(8px)", scale: 0.95 },
        { y: 0, opacity: 1, filter: "blur(0px)", scale: 1, duration: 2.2, ease: "power3.out" },
        "kickerEnd-=0.4"
      ).addLabel("headlineEnd");

      // 3. Subtitle: Contrasting downward drop (-28px) + de-blur
      tl.fromTo(
        ".testimonials-subtitle",
        { y: -28, opacity: 0, filter: "blur(5px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.8, ease: "power2.out" },
        "headlineEnd-=0.3"
      ).addLabel("subtitleEnd");

      // 4. Controls & Rating Widget: Spring entrance from right
      tl.fromTo(
        ".testimonials-controls",
        { x: 45, opacity: 0, scale: 0.92 },
        { x: 0, opacity: 1, scale: 1, duration: 1.6, ease: "back.out(1.2)" },
        "subtitleEnd-=0.4"
      );

      // 5. Live Number Increasing Animation: Starts strictly from 0 -> 1,850+ reviews
      const counterObj = { count: 0 };
      tl.fromTo(
        counterObj,
        { count: 0 },
        {
          count: 1850,
          duration: 2.5,
          ease: "power2.out",
          onStart: () => {
            if (reviewCountRef.current) reviewCountRef.current.textContent = "0+ Reviews";
          },
          onUpdate: () => {
            if (reviewCountRef.current) {
              reviewCountRef.current.textContent =
                Math.round(counterObj.count).toLocaleString() + "+ Reviews";
            }
          }
        },
        "headlineEnd-=0.2"
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="py-20 lg:py-28 bg-linear-to-b from-background via-slate-50/40 dark:via-[#121026]/40 to-background transition-colors duration-300 relative overflow-hidden border-t border-slate-200/80 dark:border-white/10"
    >
      {/* Background Ambient Glows */}
      <div className="absolute top-1/3 right-0 w-96 sm:w-140 h-96 sm:h-140 bg-active/6 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-0 w-80 sm:w-120 h-80 sm:h-120 bg-brand-500/6 rounded-full blur-[130px] pointer-events-none -z-10" />

      <div className="w-11/12 mx-auto relative z-10">
        {/* ── Section Header ── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 sm:mb-16 gap-6 border-b border-slate-200/80 dark:border-white/10 pb-8">
          <div className="max-w-2xl space-y-3">
            {/* Kicker Badge */}
            <div className="testimonials-kicker inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100/90 dark:bg-white/10 border border-slate-200/80 dark:border-white/10 text-xs font-bold tracking-wide shadow-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-active opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-active" />
              </span>
              <span className="text-active uppercase tracking-wider font-extrabold text-[11px]">
                Member Voices
              </span>
              <span className="text-slate-500 dark:text-slate-400">
                • Verified Athlete Testimonials
              </span>
            </div>

            {/* Headline */}
            <h2 className="testimonials-headline text-3xl sm:text-4xl lg:text-5xl font-extrabold font-[Outfit] tracking-tight text-foreground leading-[1.12]">
              What Our Members{" "}
              <span className="text-active inline-block transition-transform hover:scale-105 duration-200 cursor-default">
                Say
              </span>
            </h2>

            {/* Subtitle */}
            <p className="testimonials-subtitle text-xs sm:text-sm lg:text-base text-slate-500 dark:text-slate-400 font-[Inter] leading-relaxed pt-0.5">
              Real athletic transformations and verified feedback from dedicated members achieving measurable milestones across strength, endurance, and longevity.
            </p>
          </div>

          {/* Controls: Rating Summary + Nav Buttons with Shadow Rule: strictly shadow-sm */}
          <div className="testimonials-controls flex flex-wrap items-center gap-4 sm:gap-6 self-start lg:self-end">
            {/* Rating Widget with Live Increasing Number Counter */}
            <div className="flex items-center gap-3.5 bg-white dark:bg-[#121026] px-4 sm:px-5 py-3 rounded-2xl border border-slate-200/80 dark:border-white/10 font-[Outfit] shadow-sm">
              <div className="w-9 h-9 rounded-xl bg-amber-400/10 flex items-center justify-center text-amber-400 shrink-0 border border-amber-400/20">
                <FaStar className="w-4 h-4 fill-current" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-base sm:text-lg font-black text-foreground leading-none">
                    4.9
                  </span>
                  <div className="flex gap-0.5 text-amber-400 text-xs">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="w-2.5 h-2.5 fill-current" />
                    ))}
                  </div>
                </div>
                <p
                  ref={reviewCountRef}
                  className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider mt-0.5"
                >
                  0+ Reviews
                </p>
              </div>
            </div>

            {/* Carousel Navigation Buttons */}
            <div className="flex items-center gap-2 select-none">
              <button
                type="button"
                onClick={handlePrev}
                className="w-11 h-11 rounded-2xl bg-white dark:bg-[#121026] border border-slate-200/80 dark:border-white/10 hover:border-active hover:bg-active hover:text-white text-foreground transition-all duration-200 flex items-center justify-center cursor-pointer shadow-sm hover:shadow-md active:scale-95 group"
                aria-label="Previous testimonials"
              >
                <FiChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="w-11 h-11 rounded-2xl bg-white dark:bg-[#121026] border border-slate-200/80 dark:border-white/10 hover:border-active hover:bg-active hover:text-white text-foreground transition-all duration-200 flex items-center justify-center cursor-pointer shadow-sm hover:shadow-md active:scale-95 group"
                aria-label="Next testimonials"
              >
                <FiChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* ── Carousel Slider Container with Non-Clipping Shadow Padding ── */}
        <div
          ref={carouselRef}
          className="relative overflow-hidden cursor-grab active:cursor-grabbing py-4 -my-2 px-1"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex transition-transform duration-500 ease-out flex-nowrap py-1"
            style={{ transform: `translateX(-${currentIndex * (100 / visibleCards)}%)` }}
          >
            {REVIEWS.map((rev) => (
              <div
                key={rev.id}
                className="shrink-0 px-3 sm:px-3.5 flex"
                style={{ width: `${100 / visibleCards}%` }}
              >
                {/* Card Shell — Viewport-Triggered Delayed Entrance & Shadow Rule (shadow-sm, hover:shadow-md) */}
                <motion.div
                  variants={cardShellVariants}
                  initial="hidden"
                  animate={carouselTriggered ? "visible" : "hidden"}
                  className="group relative rounded-3xl p-7 sm:p-8 bg-white dark:bg-[#121026] border border-slate-200/90 dark:border-white/10 shadow-xs hover:shadow-md hover:border-slate-300 dark:hover:border-white/20 transition-all duration-300 ease-out hover:-translate-y-1 flex flex-col justify-between w-full overflow-hidden"
                >
                  {/* ── Big Decorated Quote Mark in Top-Right Background (Refined Low-Medium Opacity + Triggered Transition) ── */}
                  <motion.div
                    variants={quoteWatermarkVariants}
                    className="absolute top-2 right-3 sm:top-3 sm:right-4 pointer-events-none select-none z-0 overflow-hidden leading-none"
                    aria-hidden="true"
                  >
                    <FaQuoteRight className="w-18 h-18 sm:w-22 sm:h-22 lg:w-26 lg:h-26 text-slate-900/[0.04] dark:text-white/[0.05] group-hover:text-slate-900/[0.08] dark:group-hover:text-white/[0.08] group-hover:scale-105 group-hover:-rotate-6 transition-all duration-500 transform-gpu" />
                  </motion.div>

                  <div className="relative z-10">
                    {/* Top Row: Rating Stars + Discipline Pill */}
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                      <motion.div variants={starsVariants} className="flex items-center gap-2">
                        <div className="flex gap-1 text-amber-400">
                          {[...Array(rev.rating)].map((_, i) => (
                            <FaStar key={i} className="w-3.5 h-3.5 fill-current" />
                          ))}
                        </div>
                        <span className="text-xs font-black font-[Outfit] text-foreground">5.0</span>
                      </motion.div>

                      <motion.span
                        variants={disciplineBadgeVariants}
                        className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full border ${rev.tagColor} shadow-2xs`}
                      >
                        {rev.discipline}
                      </motion.span>
                    </div>

                    {/* Milestone Achievement Badge */}
                    <motion.div
                      variants={milestonePillVariants}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50/90 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/10 text-xs font-bold text-foreground mb-4 shadow-2xs"
                    >
                      <FiTrendingUp className="w-3.5 h-3.5 text-active shrink-0" />
                      <span className="truncate">
                        Milestone: <strong className="text-active">{rev.achievement}</strong>
                      </span>
                    </motion.div>

                    {/* Clean Verified Quote Body (No awkward colliding box) */}
                    <motion.p
                      variants={quoteTextVariants}
                      className="font-[Inter] text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium line-clamp-4 mb-6"
                    >
                      &ldquo;{rev.quote}&rdquo;
                    </motion.p>
                  </div>

                  {/* Animated Divider */}
                  <motion.div
                    variants={dividerVariants}
                    className="w-full h-px bg-slate-200/70 dark:bg-white/10 origin-left mb-4 relative z-10"
                  />

                  {/* Member Profile Footer */}
                  <div className="flex items-center justify-between mt-auto relative z-10">
                    <div className="flex items-center gap-3">
                      {/* Avatar with rotation and ring */}
                      <motion.div
                        variants={avatarVariants}
                        className="relative w-11 h-11 rounded-full overflow-hidden ring-2 ring-slate-200 dark:ring-white/10 group-hover:ring-active/60 transition-all shrink-0"
                      >
                        <Image
                          src={rev.image}
                          alt={rev.name}
                          fill
                          unoptimized
                          className="object-cover group-hover:scale-106 transition-transform duration-500"
                        />
                      </motion.div>

                      {/* Member Info */}
                      <div className="leading-tight">
                        <motion.div variants={memberInfoVariants} className="flex items-center gap-1.5">
                          <h4 className="font-[Outfit] text-sm sm:text-base font-bold text-foreground group-hover:text-active transition-colors leading-tight">
                            {rev.name}
                          </h4>
                          <FiCheckCircle className="w-3.5 h-3.5 text-active" />
                        </motion.div>
                        <motion.p
                          variants={memberRoleVariants}
                          className="font-[Inter] text-[11px] text-slate-500 dark:text-slate-400 mt-0.5"
                        >
                          {rev.role} • <span className="font-semibold text-foreground/80">{rev.tenure}</span>
                        </motion.p>
                      </div>
                    </div>

                    {/* Verified Badge */}
                    <motion.span
                      variants={verifiedBadgeVariants}
                      className="hidden sm:inline-flex items-center gap-1 text-[10px] font-bold text-emerald-500 uppercase tracking-wider bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20 shadow-xs"
                    >
                      <FiCheck className="w-3 h-3" /> Verified
                    </motion.span>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Bottom Carousel Status Bar ── */}
        <motion.div
          variants={bottomBarVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-4 border-t border-slate-200/80 dark:border-white/10 font-[Inter]"
        >
          {/* Segmented Pagination Dots */}
          <div className="flex items-center gap-2">
            {Array.from({ length: maxIndex + 1 }).map((_, idx) => {
              const isActive = currentIndex === idx;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "w-8 bg-active shadow-xs"
                      : "w-2.5 bg-slate-200 dark:bg-white/20 hover:bg-slate-300 dark:hover:bg-white/30"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              );
            })}
          </div>

          {/* Autoplay & Slide Counter */}
          <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span
                  className={`absolute inline-flex h-full w-full rounded-full opacity-75 ${
                    isPaused ? "bg-amber-400" : "bg-active animate-ping"
                  }`}
                />
                <span
                  className={`relative inline-flex rounded-full h-2 w-2 ${
                    isPaused ? "bg-amber-400" : "bg-active"
                  }`}
                />
              </span>
              <span className="font-semibold text-[11px]">
                {isPaused ? "Paused on hover" : "Auto-Swiping (4s)"}
              </span>
            </div>
            <div className="h-4 w-px bg-slate-200 dark:bg-white/10" />
            <span className="text-[11px] font-bold text-foreground">
              Showing 0{currentIndex + 1} - 0{Math.min(currentIndex + visibleCards, REVIEWS.length)} of 0
              {REVIEWS.length}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
