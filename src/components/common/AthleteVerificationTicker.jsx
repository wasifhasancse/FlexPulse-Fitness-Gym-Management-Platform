"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaQuoteLeft } from "react-icons/fa";

export const DEFAULT_TESTIMONIALS = [
  {
    quote:
      "FlexPulse's precision biometric tracking and community accountability helped me add 45kg to my compound total in 12 weeks.",
    author: "Marcus Vance",
    role: "Powerlifting Athlete • 3 Yrs Member",
    metric: "+45kg Lift Total",
    avatar: "https://prio.co.in/avatar.png",
  },
  {
    quote:
      "The combination of certified coach form feedback and on-demand recovery protocols makes FlexPulse the undisputed gold standard.",
    author: "Elena Rostova",
    role: "Hyrox Competitor • Elite Tier",
    metric: "Sub-60min Hyrox",
    avatar: "https://t4.ftcdn.net/jpg/11/66/06/77/360_F_1166067709_2SooAuPWXp20XkGev7oOT7nuK1VThCsN.jpg",
  },
  {
    quote:
      "Having my workout splits, recovery sauna bookings, and nutrition targets synced in one place revolutionized my athletic consistency.",
    author: "David Chen",
    role: "Marathon Runner • Pro Member",
    metric: "2:54 Marathon PB",
    avatar: "https://lh3.googleusercontent.com/a/ACg8ocKzbEXd0N7V406ocsmdiEQkxCVV1BIJpiTn--O3W0TqjLiNy6e3=s96-c",
  },
  {
    quote:
      "The InBody 570 body scan and personalized macro coaching delivered results that 3 years of commercial gym training never could.",
    author: "Sophie Taylor",
    role: "Transformation Athlete • 1 Yr Member",
    metric: "-12% Body Fat",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop",
  },
  {
    quote:
      "The contrast therapy cold plunge and Finnish cedar sauna slashed my DOMS recovery time in half between heavy squat days.",
    author: "Liam Gallagher",
    role: "Cross-Training Athlete • Elite Tier",
    metric: "98% Recovery Score",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
  },
];

export default function AthleteVerificationTicker({
  testimonials = DEFAULT_TESTIMONIALS,
  title = "ATHLETE VERIFICATION",
  intervalMs = 7000,
  className = "",
  variant = "dark", // "dark" (for dark cards) or "adaptive" (for light/dark surfaces)
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    setProgress(0);
    const tickStep = intervalMs / 100;

    timerRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveIndex((curr) => (curr + 1) % testimonials.length);
          return 0;
        }
        return prev + 1;
      });
    }, tickStep);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [activeIndex, intervalMs, testimonials.length]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
    setProgress(0);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setProgress(0);
  };

  const currentItem = testimonials[activeIndex] || testimonials[0];

  const isAdaptive = variant === "adaptive";

  return (
    <div
      className={`rounded-2xl transition-all duration-300 font-['Inter'] ${
        isAdaptive
          ? "p-5 bg-white dark:bg-[#121026] border border-slate-200 dark:border-white/10 shadow-md text-foreground"
          : "text-white"
      } ${className}`}
    >
      {/* Header Bar: Title + Linear Progress + Arrow Buttons */}
      <div className="flex items-center justify-between gap-3 mb-2.5">
        <span className="text-xs font-mono tracking-widest text-active uppercase font-extrabold flex items-center gap-1.5 shrink-0">
          <FaQuoteLeft className="w-3 h-3" /> {title}
        </span>

        {/* Carousel Arrow Controls & Indicator Dots */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handlePrev}
            className={`w-6 h-6 rounded-full flex items-center justify-center transition-all cursor-pointer ${
              isAdaptive
                ? "bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20 text-slate-700 dark:text-white"
                : "bg-white/10 hover:bg-white/20 text-white/80 hover:text-white"
            }`}
            title="Previous Athlete Review"
            aria-label="Previous"
          >
            <FaChevronLeft className="w-2.5 h-2.5" />
          </button>

          {/* Dots */}
          <div className="flex items-center gap-1.5">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setActiveIndex(idx);
                  setProgress(0);
                }}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  activeIndex === idx
                    ? "w-6 bg-active"
                    : isAdaptive
                    ? "w-2 bg-slate-300 dark:bg-white/20 hover:bg-slate-400"
                    : "w-2 bg-white/30 hover:bg-white/60"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={handleNext}
            className={`w-6 h-6 rounded-full flex items-center justify-center transition-all cursor-pointer ${
              isAdaptive
                ? "bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20 text-slate-700 dark:text-white"
                : "bg-white/10 hover:bg-white/20 text-white/80 hover:text-white"
            }`}
            title="Next Athlete Review"
            aria-label="Next"
          >
            <FaChevronRight className="w-2.5 h-2.5" />
          </button>
        </div>
      </div>

      {/* Linear Dynamic Progress Bar */}
      <div
        className={`w-full h-1 rounded-full mb-3 overflow-hidden ${
          isAdaptive ? "bg-slate-200 dark:bg-white/10" : "bg-white/10"
        }`}
      >
        <div
          className="h-full bg-active transition-all duration-75 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Animated Review Quote & Author Metric Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.25 }}
          className="space-y-3"
        >
          <p
            className={`text-xs sm:text-sm italic leading-relaxed ${
              isAdaptive ? "text-slate-700 dark:text-slate-200" : "text-slate-200"
            }`}
          >
            &quot;{currentItem.quote}&quot;
          </p>

          <div className="flex items-center justify-between text-xs pt-1">
            <div className="flex items-center gap-2.5">
              <Image
                src={currentItem.avatar}
                alt={currentItem.author}
                width={30}
                height={30}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover ring-2 ring-active/40"
              />
              <div className="leading-tight">
                <strong
                  className={`text-xs sm:text-sm font-bold block ${
                    isAdaptive ? "text-slate-900 dark:text-white" : "text-white"
                  }`}
                >
                  {currentItem.author}
                </strong>
                <span
                  className={`text-[11px] sm:text-xs ${
                    isAdaptive ? "text-slate-500 dark:text-slate-400" : "text-slate-300"
                  }`}
                >
                  {currentItem.role}
                </span>
              </div>
            </div>

            <span className="px-3 py-1 rounded-full bg-active/15 text-active font-mono text-xs font-bold border border-active/30 shrink-0">
              {currentItem.metric}
            </span>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
