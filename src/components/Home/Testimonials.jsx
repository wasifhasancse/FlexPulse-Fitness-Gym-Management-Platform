"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { FaQuoteLeft, FaStar } from "react-icons/fa";
import { FiCheck, FiTrendingUp, FiCheckCircle, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") { gsap.registerPlugin(ScrollTrigger); }

const TRANSITION_EASE = [0.16, 1, 0.3, 1];

const REVIEWS = [
  { id: "marcus", name: "Marcus Vance", role: "Olympic Strength Member", tenure: "18 Months Active", achievement: "Squat: 185 to 315 lbs", discipline: "Olympic Lifting & Hypertrophy", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop", quote: "FlexPulse fundamentally overhauled my lifting biomechanics. The master coaches don't just watch reps; they analyze kinematic bar paths, fatigue accumulation, and progressive overload. Moving my squat from 185 to 315 lbs without a single joint issue is proof.", rating: 5, tagColor: "bg-active/10 text-active border-active/20" },
  { id: "sophia", name: "Sophia Martinez", role: "HIIT & MetCon Athlete", tenure: "12 Months Active", achievement: "VO2 Max: 38 to 51 mL/kg", discipline: "Metabolic Conditioning", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop", quote: "The heart-rate telemetry and curved Woodway treadmills keep you accountable to your physiological ceiling. My resting heart rate dropped from 72 to 54 bpm, and the community energy in every class is electric. You never train alone here.", rating: 5, tagColor: "bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 border-emerald-500/20" },
  { id: "david", name: "David Chen", role: "Corporate Executive & Member", tenure: "15 Months Active", achievement: "-24 lbs Fat & +7 lbs Muscle", discipline: "Body Recomposition", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop", quote: "With 60-hour work weeks, I need surgical efficiency. The 24/7 keyless facility access, paired with personalized InBody 570 scans and custom macro distribution, allowed me to drop 24 lbs of fat while gaining functional lean tissue.", rating: 5, tagColor: "bg-purple-500/10 text-purple-500 dark:text-purple-400 border-purple-500/20" },
  { id: "elena", name: "Elena Moreau", role: "Mobility & Flow Athlete", tenure: "9 Months Active", achievement: "Zero Chronic Lumbar Pain", discipline: "Vinyasa & Fascial Release", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop", quote: "After years of sedentary office stiffness, the infrared cedar saunas, cold plunge suites, and targeted thoracic flow classes restored my spine. I wake up energized and completely pain-free. The recovery amenities alone are worth the membership.", rating: 5, tagColor: "bg-amber-500/10 text-amber-500 dark:text-amber-400 border-amber-500/20" },
  { id: "tariq", name: "Tariq Al-Mansoor", role: "Combat Athletics Member", tenure: "14 Months Active", achievement: "Rotational Strike Velocity: +28%", discipline: "Combat Boxing & Turf Power", image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=200&auto=format&fit=crop", quote: "Training alongside Golden Gloves coaches completely unlocked my rotational kinetic power. The aqua heavy bags and footwork acceleration drills build genuine athletic conditioning you cannot replicate on standard gym machines.", rating: 5, tagColor: "bg-rose-500/10 text-rose-500 dark:text-rose-400 border-rose-500/20" },
  { id: "chloe", name: "Chloe Bennett", role: "Marathon & Endurance Athlete", tenure: "11 Months Active", achievement: "Half-Marathon: 1h 48m to 1h 32m", discipline: "Aerobic Engine & Conditioning", image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop", quote: "The personalized lactate clearance protocols and SkiErg interval circuits broke my half-marathon plateau by 16 minutes. FlexPulse is the first club that treats everyday professionals like competitive varsity athletes.", rating: 5, tagColor: "bg-cyan-500/10 text-cyan-500 dark:text-cyan-400 border-cyan-500/20" }
];

// ── Framer-Motion Variants ────────────────────────────────────────────────────

// Card shell — cinematic entrance from below
const cardShellVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 1.5, ease: TRANSITION_EASE, staggerChildren: 0.09, delayChildren: 0.1 } }
};

// Stars row — x-slide from left
const starsVariants = { hidden: { opacity: 0, x: -18 }, visible: { opacity: 1, x: 0, transition: { duration: 1.3, ease: TRANSITION_EASE } } };

// Discipline badge — spring pop from right
const disciplineBadgeVariants = { hidden: { opacity: 0, x: 16, scale: 0.88 }, visible: { opacity: 1, x: 0, scale: 1, transition: { type: "spring", stiffness: 150, damping: 20 } } };

// Quote watermark icon — scale pop with rotation
const quoteIconVariants = { hidden: { opacity: 0, scale: 0.4, rotate: 15 }, visible: { opacity: 1, scale: 1, rotate: 0, transition: { type: "spring", stiffness: 120, damping: 18 } } };

// Milestone pill — horizontal x-slide from left
const milestonePillVariants = { hidden: { opacity: 0, x: -20, scale: 0.94 }, visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 1.3, ease: TRANSITION_EASE } } };

// Quote text — majestic upward sweep + blur clear
const quoteTextVariants = { hidden: { opacity: 0, y: 18, filter: "blur(4px)" }, visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1.5, ease: TRANSITION_EASE } } };

// Avatar — spring scale pop with rotation
const avatarVariants = { hidden: { opacity: 0, scale: 0.5, rotate: -14 }, visible: { opacity: 1, scale: 1, rotate: 0, transition: { type: "spring", stiffness: 140, damping: 18 } } };

// Member name + role — x-slide from left
const memberInfoVariants = { hidden: { opacity: 0, x: -14 }, visible: { opacity: 1, x: 0, transition: { duration: 1.2, ease: TRANSITION_EASE } } };

// Verified badge — diagonal spring pop from right
const verifiedBadgeVariants = { hidden: { opacity: 0, x: 14, y: 14, scale: 0.8 }, visible: { opacity: 1, x: 0, y: 0, scale: 1, transition: { type: "spring", stiffness: 130, damping: 20 } } };

// Carousel controls container — spring from right
const controlsVariants = { hidden: { opacity: 0, x: 36, scale: 0.94 }, visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 1.6, ease: TRANSITION_EASE, staggerChildren: 0.1, delayChildren: 0.1 } } };

const navBtnVariants = { hidden: { opacity: 0, scale: 0.7 }, visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 150, damping: 18 } } };

// Bottom bar — upward rise
const bottomBarVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 1.3, ease: "easeOut" } } };

// ── Component ─────────────────────────────────────────────────────────────────
export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const sectionRef = useRef(null);
  const carouselRef = useRef(null);
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

  useEffect(() => { if (currentIndex > maxIndex) setCurrentIndex(maxIndex); }, [maxIndex, currentIndex]);

  useEffect(() => {
    if (isPaused || maxIndex === 0) return;
    const timer = setInterval(() => setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1)), 4000);
    return () => clearInterval(timer);
  }, [isPaused, maxIndex]);

  const handlePrev = () => setCurrentIndex(prev => (prev <= 0 ? maxIndex : prev - 1));
  const handleNext = () => setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
  const handleTouchStart = e => setTouchStart(e.targetTouches[0].clientX);
  const handleTouchMove = e => setTouchEnd(e.targetTouches[0].clientX);
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const dist = touchStart - touchEnd;
    if (dist > 50) handleNext();
    if (dist < -50) handlePrev();
    setTouchStart(null); setTouchEnd(null);
  };

  // GSAP ScrollTrigger — header element-by-element choreography
  useGSAP(() => {
    const tl = gsap.timeline({ scrollTrigger: { trigger: sectionRef.current, start: "top 85%", once: true }, defaults: { ease: "power3.out" } });
    tl.fromTo(".testimonials-kicker", { y: -30, opacity: 0, filter: "blur(6px)" }, { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.6, ease: "power2.out" }).addLabel("kickerEnd");
    tl.fromTo(".testimonials-headline", { y: 48, opacity: 0, filter: "blur(8px)", scale: 0.96 }, { y: 0, opacity: 1, filter: "blur(0px)", scale: 1, duration: 2.2, ease: "power3.out" }, "kickerEnd-=0.4").addLabel("headlineEnd");
    tl.fromTo(".testimonials-subtitle", { y: -28, opacity: 0, filter: "blur(5px)" }, { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.8, ease: "power2.out" }, "headlineEnd-=0.3");
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="py-20 lg:py-28 bg-background transition-colors duration-300 relative overflow-hidden border-t border-brand-500/15">
      <div className="absolute top-1/3 right-0 w-96 sm:w-140 h-96 sm:h-140 bg-active/6 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-0 w-80 sm:w-120 h-80 sm:h-120 bg-brand-500/8 rounded-full blur-[130px] pointer-events-none -z-10" />

      <div className="w-11/12 mx-auto relative z-10">

        {/* ── Section Header ── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 sm:mb-16 gap-6 border-b border-brand-500/15 pb-8">
          <div className="max-w-2xl space-y-3">
            {/* Kicker Badge — GSAP downward drop */}
            <div className="testimonials-kicker inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-800/25 dark:bg-[#1B1A55]/70 border border-brand-500/25 text-xs font-bold tracking-wide shadow-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-active opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-active" />
              </span>
              <span className="text-active uppercase tracking-wider font-extrabold text-[11px]">Member Voices</span>
              <span className="text-[#535C91] dark:text-[#9290C3]">• Verified Athlete Testimonials</span>
            </div>

            {/* Headline — GSAP upward sweep + blur */}
            <h2 className="testimonials-headline text-3xl sm:text-4xl lg:text-5xl font-extrabold font-[Outfit] tracking-tight text-foreground leading-[1.12]">
              What Our Members <span className="text-active">Say</span>
            </h2>

            {/* Subtitle — GSAP contrasting downward drop */}
            <p className="testimonials-subtitle text-sm sm:text-base text-[#535C91] dark:text-[#9290C3] font-[Inter] leading-relaxed pt-1">
              Real athletic transformations and verified feedback from dedicated members achieving measurable milestones across strength, endurance, and longevity.
            </p>
          </div>

          {/* Controls: Rating Summary + Nav Buttons — Framer spring from right */}
          <motion.div
            variants={controlsVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="flex flex-wrap items-center gap-4 sm:gap-6 self-start lg:self-end"
          >
            {/* Rating Widget — child of controlsVariants stagger */}
            <motion.div variants={navBtnVariants} className="flex items-center gap-3 bg-[#535C91]/5 dark:bg-[#1B1A55]/50 px-4 py-2.5 rounded-2xl border border-brand-500/20 font-[Outfit]">
              <div>
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => <FaStar key={i} className="w-3 h-3 fill-current" />)}
                </div>
                <p className="text-sm font-black text-foreground mt-0.5 leading-none">
                  4.9 / 5.0 • <span className="text-[10px] text-[#535C91] dark:text-[#9290C3] font-bold uppercase tracking-wider">1,850+ Reviews</span>
                </p>
              </div>
            </motion.div>

            {/* Nav Buttons */}
            <div className="flex items-center gap-2 select-none">
              <motion.button variants={navBtnVariants} whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }} type="button" onClick={handlePrev} className="w-11 h-11 rounded-2xl bg-white dark:bg-[#1B1A55]/80 border border-brand-500/25 hover:border-active hover:bg-active hover:text-white text-foreground transition-all duration-200 flex items-center justify-center cursor-pointer shadow-sm active:scale-95 group" aria-label="Previous testimonials">
                <FiChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
              </motion.button>
              <motion.button variants={navBtnVariants} whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }} type="button" onClick={handleNext} className="w-11 h-11 rounded-2xl bg-white dark:bg-[#1B1A55]/80 border border-brand-500/25 hover:border-active hover:bg-active hover:text-white text-foreground transition-all duration-200 flex items-center justify-center cursor-pointer shadow-sm active:scale-95 group" aria-label="Next testimonials">
                <FiChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* ── Carousel Container ── */}
        <div
          ref={carouselRef}
          className="relative overflow-hidden cursor-grab active:cursor-grabbing pb-2"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex transition-transform duration-500 ease-out flex-nowrap"
            style={{ transform: `translateX(-${currentIndex * (100 / visibleCards)}%)` }}
          >
            {REVIEWS.map((rev) => (
              <div key={rev.id} className="shrink-0 px-3 sm:px-3.5 flex" style={{ width: `${100 / visibleCards}%` }}>
                {/* Card Shell — viewport-gated cinematic entrance */}
                <motion.div
                  variants={cardShellVariants}
                  initial="hidden"
                  animate={carouselTriggered ? "visible" : "hidden"}
                  className="group relative rounded-3xl p-7 sm:p-8 bg-white dark:bg-[#070F2B] border border-brand-500/20 hover:border-active/60 transition-all duration-300 ease-out hover:-translate-y-1.5 flex flex-col justify-between w-full shadow-xs hover:shadow-md overflow-hidden"
                >
                  {/* Quote watermark icon — scale pop with rotation */}
                  <motion.div variants={quoteIconVariants} className="absolute top-6 right-6 pointer-events-none">
                    <FaQuoteLeft className="text-foreground/5 dark:text-white/5 w-16 h-16 group-hover:text-active/15 group-hover:scale-110 transition-all duration-300" />
                  </motion.div>

                  <div>
                    {/* Top row: Stars + Discipline badge */}
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                      {/* Stars — x-slide from left */}
                      <motion.div variants={starsVariants} className="flex items-center gap-2">
                        <div className="flex gap-1 text-amber-400">
                          {[...Array(rev.rating)].map((_, i) => <FaStar key={i} className="w-3.5 h-3.5 fill-current" />)}
                        </div>
                        <span className="text-xs font-black font-[Outfit] text-foreground">5.0</span>
                      </motion.div>

                      {/* Discipline badge — spring pop from right */}
                      <motion.span variants={disciplineBadgeVariants} className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full border ${rev.tagColor}`}>
                        {rev.discipline}
                      </motion.span>
                    </div>

                    {/* Milestone pill — x-slide from left */}
                    <motion.div variants={milestonePillVariants} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#535C91]/8 dark:bg-[#1B1A55]/60 border border-brand-500/20 text-xs font-bold text-foreground mb-4">
                      <FiTrendingUp className="w-3.5 h-3.5 text-active" />
                      <span>Milestone: <strong className="text-active">{rev.achievement}</strong></span>
                    </motion.div>

                    {/* Quote text — upward sweep + blur clear */}
                    <motion.p variants={quoteTextVariants} className="font-[Inter] text-xs sm:text-sm text-[#535C91] dark:text-[#9290C3] leading-relaxed mb-6 font-medium line-clamp-4">
                      &ldquo;{rev.quote}&rdquo;
                    </motion.p>
                  </div>

                  {/* Member Profile Footer */}
                  <div className="flex items-center justify-between pt-5 border-t border-brand-500/15 mt-auto">
                    <div className="flex items-center gap-3">
                      {/* Avatar — spring scale pop with rotation */}
                      <motion.div variants={avatarVariants} className="relative w-11 h-11 rounded-full overflow-hidden ring-2 ring-brand-500/30 shrink-0">
                        <Image src={rev.image} alt={rev.name} fill unoptimized className="object-cover group-hover:scale-106 transition-transform duration-500" />
                      </motion.div>

                      {/* Member name + role — x-slide from left */}
                      <motion.div variants={memberInfoVariants}>
                        <div className="flex items-center gap-1.5">
                          <h4 className="font-[Outfit] text-sm sm:text-base font-bold text-foreground group-hover:text-active transition-colors leading-tight">{rev.name}</h4>
                          <FiCheckCircle className="w-3.5 h-3.5 text-active" />
                        </div>
                        <p className="font-[Inter] text-[11px] text-[#535C91] dark:text-[#9290C3] mt-0.5">{rev.role} • <span className="font-semibold text-foreground/80">{rev.tenure}</span></p>
                      </motion.div>
                    </div>

                    {/* Verified badge — diagonal spring pop from right */}
                    <motion.span variants={verifiedBadgeVariants} className="hidden sm:inline-flex items-center gap-1 text-[10px] font-bold text-emerald-500 uppercase tracking-wider">
                      <FiCheck className="w-3 h-3" /> Verified
                    </motion.span>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Bottom Bar — upward rise ── */}
        <motion.div
          variants={bottomBarVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-4 border-t border-brand-500/15 font-[Inter]"
        >
          {/* Segmented Pagination Dots */}
          <div className="flex items-center gap-2">
            {Array.from({ length: maxIndex + 1 }).map((_, idx) => {
              const isActive = currentIndex === idx;
              return (
                <button key={idx} type="button" onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${isActive ? "w-8 bg-active shadow-xs" : "w-2 bg-[#535C91]/30 dark:bg-[#1B1A55]/80 hover:bg-[#535C91]/50"}`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              );
            })}
          </div>

          {/* Autoplay indicator + counter */}
          <div className="flex items-center gap-4 text-xs text-[#535C91] dark:text-[#9290C3]">
            <div className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${isPaused ? "bg-amber-400" : "bg-active animate-ping"}`} />
              <span className="font-medium text-[11px]">{isPaused ? "Paused on hover" : "Auto-Swiping (4s)"}</span>
            </div>
            <span className="text-[11px] font-bold text-foreground">Showing 0{currentIndex + 1} - 0{Math.min(currentIndex + visibleCards, REVIEWS.length)} of 0{REVIEWS.length}</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
