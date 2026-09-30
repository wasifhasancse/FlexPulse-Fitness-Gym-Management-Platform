"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence, LayoutGroup, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  FiArrowRight,
  FiClock,
  FiCalendar,
  FiUsers,
  FiTag,
  FiActivity
} from "react-icons/fi";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Fallback high-performance featured classes in case API has no records
const FALLBACK_CLASSES = [
  {
    _id: "sculpt-01",
    className: "Body Sculpt & Functional Hypertrophy",
    classImage: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop",
    category: "Weights",
    difficultyLevel: "Advanced",
    duration: "45 Min",
    price: 70,
    slot: 50,
    bookingCount: 18,
    description: "Targeted full-body muscular endurance combining progressive barbell overload, tempo dumbbell complexes, and core stabilization.",
    classSchedule: "Mon, Wed, Sat",
    time: "08:00 AM",
    authorName: "Coach Marcus Vance",
    authorImage: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=120&auto=format&fit=crop"
  },
  {
    _id: "bootcamp-02",
    className: "Tactical Bootcamp & Sled Challenge",
    classImage: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200&auto=format&fit=crop",
    category: "HIIT",
    difficultyLevel: "Intermediate",
    duration: "50 Min",
    price: 45,
    slot: 35,
    bookingCount: 24,
    description: "Military-inspired anaerobic power intervals integrating heavy turf sleds, battle ropes, assault bikes, and plyometric complexes.",
    classSchedule: "Tue, Thu, Sun",
    time: "09:30 AM",
    authorName: "Sarah Jenkins, CSCS",
    authorImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop"
  },
  {
    _id: "boxing-03",
    className: "Combat Kickboxing & Striking Velocity",
    classImage: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=1200&auto=format&fit=crop",
    category: "Combat",
    difficultyLevel: "All Levels",
    duration: "55 Min",
    price: 60,
    slot: 25,
    bookingCount: 19,
    description: "Championship kinetic striking combinations, heavy aqua-bag velocity drills, and defensive lateral footwork for maximum conditioning.",
    classSchedule: "Mon, Thu, Sat",
    time: "06:30 PM",
    authorName: "Alana Serrano",
    authorImage: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop"
  },
  {
    _id: "cardio-04",
    className: "Sprint MetCon & Aerobic Engine",
    classImage: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1200&auto=format&fit=crop",
    category: "Cardio",
    difficultyLevel: "Advanced",
    duration: "45 Min",
    price: 65,
    slot: 30,
    bookingCount: 22,
    description: "Lactate threshold intervals utilizing curved Woodway treadmills and Concept2 SkiErgs to maximize VO2 peak capacity.",
    classSchedule: "Wed, Fri, Sun",
    time: "07:00 AM",
    authorName: "David Sterling",
    authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop"
  },
  {
    _id: "strength-05",
    className: "Olympic Powerlifting & Barbell Mechanics",
    classImage: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1200&auto=format&fit=crop",
    category: "Weights",
    difficultyLevel: "Advanced",
    duration: "60 Min",
    price: 80,
    slot: 20,
    bookingCount: 17,
    description: "Mastery of maximal deadlifts, low-bar squats, and clean variations focusing on neuromuscular bar path efficiency and force production.",
    classSchedule: "Tue, Thu, Sat",
    time: "05:00 PM",
    authorName: "Coach Marcus Vance",
    authorImage: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=120&auto=format&fit=crop"
  },
  {
    _id: "mobility-06",
    className: "Vinyasa Core Flow & Fascial Release",
    classImage: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1200&auto=format&fit=crop",
    category: "Mobility",
    difficultyLevel: "All Levels",
    duration: "60 Min",
    price: 40,
    slot: 40,
    bookingCount: 28,
    description: "Breath-synchronized dynamic mobility series designed to restore hip/thoracic ROM, decompress spinal load, and activate deep core stability.",
    classSchedule: "Mon, Wed, Sun",
    time: "06:00 PM",
    authorName: "Elena Rostova",
    authorImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop"
  }
];

// Outer Grid Container with Universal Staged Viewport Delay (Triggered After a Certain Time)
const classesGridContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 1.25, // Staged delay after entering screen viewport
      staggerChildren: 0.18, // Stagger each card separately
    },
  },
};

// Card Element-by-Element Slow Cinematic Motion Variants (per rule.md & animation.md)
const classCardVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const classImgVariants = {
  hidden: { scale: 1.15, filter: "blur(4px)" },
  visible: {
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] },
  },
};

const classCategoryVariants = {
  hidden: { opacity: 0, x: -25 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 180, damping: 22 },
  },
};

const classDiffVariants = {
  hidden: { opacity: 0, y: -20, x: 15 },
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: { type: "spring", stiffness: 200, damping: 22 },
  },
};

const classScheduleVariants = {
  hidden: { opacity: 0, y: 20, x: -10 },
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: { duration: 0.95, ease: "easeOut" },
  },
};

const classPriceVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.8 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 220, damping: 20 },
  },
};

const classTitleVariants = {
  hidden: { opacity: 0, y: 22, filter: "blur(3px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.15, ease: [0.16, 1, 0.3, 1] },
  },
};

const classDescVariants = {
  hidden: { opacity: 0, y: -16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.05, ease: "easeOut" },
  },
};

const classSpecsVariants = {
  hidden: { opacity: 0, scaleX: 0.95 },
  visible: {
    opacity: 1,
    scaleX: 1,
    transition: { duration: 0.95, ease: "easeOut" },
  },
};

const classMetricVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.95, ease: "easeOut" },
  },
};

const classBtnVariants = {
  hidden: { opacity: 0, y: 18, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 190, damping: 20 },
  },
};

// Filter Options Staggered Motion Variants
const filterContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.1,
    },
  },
};

const filterItemVariants = {
  hidden: { opacity: 0, y: 18, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 280,
      damping: 22,
    },
  },
};

// Bottom Callout Banner Motion Variants
const calloutContainerVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1.0,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.1,
    },
  },
};

const calloutIconVariants = {
  hidden: { opacity: 0, scale: 0, rotate: -20 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { type: "spring", stiffness: 240, damping: 20 },
  },
};

const calloutTextVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] },
  },
};

const calloutBtnVariants = {
  hidden: { opacity: 0, x: 25 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.95, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function FeaturedClasses({ classes }) {
  const sectionRef = useRef(null);

  // Normalize incoming classes from props (handles array, {data:[]}, {items:[]}, etc.)
  const initialClasses = useMemo(() => {
    let list = [];
    if (Array.isArray(classes) && classes.length > 0) {
      list = classes;
    } else if (classes && Array.isArray(classes?.data) && classes.data.length > 0) {
      list = classes.data;
    } else if (classes && Array.isArray(classes?.items) && classes.items.length > 0) {
      list = classes.items;
    } else if (classes && Array.isArray(classes?.classes) && classes.classes.length > 0) {
      list = classes.classes;
    }
    return list.length > 0 ? list : FALLBACK_CLASSES;
  }, [classes]);

  const [activeCategory, setActiveCategory] = useState("All Classes");
  const gridRef = useRef(null);
  const isGridInView = useInView(gridRef, { once: true, amount: 0.15 });
  const [cardsTriggered, setCardsTriggered] = useState(false);

  useEffect(() => {
    if (isGridInView) {
      const timer = setTimeout(() => {
        setCardsTriggered(true);
      }, 1250);
      return () => clearTimeout(timer);
    }
  }, [isGridInView]);
  const [loadedClasses, setLoadedClasses] = useState(initialClasses);

  // Background client-side fetch if server passed empty classes
  useEffect(() => {
    if (Array.isArray(classes) && classes.length > 0) {
      setLoadedClasses(classes);
      return;
    }
    fetch("/api/all-class?limit=6&sort=popular")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        const items = Array.isArray(data) ? data : data?.items || data?.data;
        if (Array.isArray(items) && items.length > 0) {
          setLoadedClasses(items);
        }
      })
      .catch(() => {
        // Fallback already assigned in initialClasses
      });
  }, [classes]);

  // Dynamically compute unique categories from available classes
  const categories = useMemo(() => {
    const set = new Set();
    loadedClasses.forEach((cls) => {
      if (cls.category) set.add(cls.category);
    });
    return ["All Classes", ...Array.from(set)];
  }, [loadedClasses]);

  // Filter classes smoothly by category
  const filteredClasses = useMemo(() => {
    if (activeCategory === "All Classes") return loadedClasses;
    return loadedClasses.filter(
      (c) => (c.category || "").toLowerCase() === activeCategory.toLowerCase()
    );
  }, [activeCategory, loadedClasses]);

  // GSAP Viewport-Triggered Timeline for Section Header
  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          once: true,
        },
        defaults: { ease: "power3.out" },
      });

      // 1. Kicker Badge: Dignified downward entrance
      tl.fromTo(
        ".featured-classes-kicker",
        { y: -30, opacity: 0, filter: "blur(6px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.0, ease: "power2.out" }
      ).addLabel("kickerEnd");

      // 2. Main Title: Majestic upward rising sweep with de-blur
      tl.fromTo(
        ".featured-classes-title",
        { y: 45, opacity: 0, filter: "blur(8px)", scale: 0.96 },
        { y: 0, opacity: 1, filter: "blur(0px)", scale: 1, duration: 1.25, ease: "power3.out" },
        "kickerEnd-=0.2"
      ).addLabel("titleEnd");

      // 3. Section Description: Contrasting downward drop from above under the title edge
      tl.fromTo(
        ".featured-classes-desc",
        { y: -30, opacity: 0, filter: "blur(5px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.1, ease: "power2.out" },
        "titleEnd-=0.15"
      );

      // 4. Header Explore CTA Button: Slide from right with soft back bounce
      tl.fromTo(
        ".featured-classes-header-btn",
        { x: 35, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.05, ease: "back.out(1.4)" },
        "titleEnd-=0.2"
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="py-20 lg:py-28 bg-background transition-colors duration-300 relative overflow-hidden border-t border-brand-500/15"
    >
      {/* Ambient Lighting Mesh */}
      <div className="absolute top-1/3 right-0 w-96 sm:w-130 h-96 sm:h-130 bg-active/6 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-0 w-80 sm:w-110 h-80 sm:h-110 bg-brand-500/8 rounded-full blur-[130px] pointer-events-none -z-10" />

      <div className="w-11/12 mx-auto relative z-10">

        {/* Section Header with Independent Element-by-Element Triggered Transitions */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 sm:mb-16 gap-6 border-b border-brand-500/15 pb-8">
          <div className="max-w-2xl">
            {/* Kicker Badge: Triggered downward arrival */}
            <div className="featured-classes-kicker inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-active/30 bg-active/5 dark:bg-active/10 mb-4 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-active animate-pulse"></span>
              <span className="text-[11px] font-black uppercase tracking-wider text-active">
                High Demand Sessions
              </span>
              <span className="text-[11px] text-secondary/60 font-bold">•</span>
              <span className="text-[11px] font-bold text-secondary">
                100% Certified Master Instructors
              </span>
            </div>

            {/* Section Headline: Triggered upward sweep */}
            <h2 className="featured-classes-title text-4xl sm:text-5xl lg:text-6xl font-black font-['Outfit'] tracking-tight text-foreground leading-[1.08] mb-4">
              Our Featured{" "}
              <span className="text-active inline-block">Classes</span>
            </h2>

            {/* Description: Contrasting downward drop from above under the title edge */}
            <p className="featured-classes-desc text-sm sm:text-base text-secondary font-['Inter'] leading-relaxed max-w-xl">
              Top-rated athletic sessions engineered with biometric heart-rate tracking, structured progressive overload, and capped capacity for tailored coaching attention.
            </p>
          </div>

          {/* Quick Schedule Navigation CTA: Slide from right */}
          <div className="featured-classes-header-btn shrink-0">
            <Link
              href="/all-classes"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-searchbox-bg hover:bg-searchbox-hover text-foreground hover:text-active font-bold text-xs sm:text-sm border border-brand-500/25 hover:border-active/60 transition-all duration-300 group shadow-xs hover:shadow-md cursor-pointer active:scale-95"
            >
              <span>Explore All Classes</span>
              <FiArrowRight className="w-4 h-4 text-active group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>
        </div>

        {/* Interactive Discipline Category Filter Tabs with Triggered Entrance & Layout Animation */}
        <LayoutGroup id="featuredClassesFiltersGroup">
          <motion.div
            variants={filterContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar select-none"
          >
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <motion.button
                  key={cat}
                  variants={filterItemVariants}
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setActiveCategory(cat)}
                  className="relative px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-tight whitespace-nowrap cursor-pointer transition-colors duration-200"
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeFeaturedClassTabPill"
                      className="absolute inset-0 bg-active rounded-xl shadow-xs"
                      transition={{ type: "spring", stiffness: 450, damping: 35 }}
                    />
                  )}
                  <span
                    className={`relative z-10 ${
                      isActive
                        ? "text-white"
                        : "text-secondary hover:text-foreground"
                    }`}
                  >
                    {cat}
                  </span>
                </motion.button>
              );
            })}
          </motion.div>
        </LayoutGroup>

        {/* Classes Grid with Element-by-Element Triggered Transition Animation */}
        <motion.div
          ref={gridRef}
          layout
          variants={classesGridContainerVariants}
          initial="hidden"
          animate={cardsTriggered ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredClasses.map((cls, idx) => {
              const {
                _id,
                className,
                price = 50,
                authorName,
                author,
                authorImage,
                duration = "45 Min",
                classImage,
                category = "Fitness",
                difficultyLevel,
                level,
                bookingCount = 0,
                slot = 30,
                description,
                classSchedule,
                time
              } = cls;

              const coachName = authorName || author || "Master Coach";
              const difficulty = difficultyLevel || level || "All Levels";

              // Level badge colors
              const getLevelColor = (lvl) => {
                const normalized = (lvl || "").toLowerCase();
                if (normalized.includes("adv")) {
                  return "bg-rose-500/15 text-rose-500 dark:text-rose-400 border-rose-500/25";
                }
                if (normalized.includes("inter")) {
                  return "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/25";
                }
                return "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/25";
              };

              // Capacity calculation
              const bookedSafe = Number(bookingCount) || 0;
              const slotSafe = Number(slot) || 30;
              const capacityPct = Math.min(Math.round((bookedSafe / slotSafe) * 100), 100);
              const formattedDuration = typeof duration === "number" ? `${duration} Mins` : duration;

              return (
                <motion.div
                  key={`${activeCategory}-${_id || idx}`}
                  layout
                  initial="hidden"
                  animate={cardsTriggered ? "visible" : "hidden"}
                  exit={{
                    opacity: 0,
                    scale: 0.92,
                    y: 18,
                    transition: { duration: 0.35, ease: "easeOut" }
                  }}
                  variants={classCardVariants}
                  className="w-full h-full"
                >
                  <div className="group relative rounded-3xl overflow-hidden bg-white dark:bg-[#070F2B] border border-brand-500/20 hover:border-active/60 transition-all duration-300 ease-out hover:-translate-y-1.5 flex flex-col h-full shadow-sm hover:shadow-md">

                    {/* Visual Card Image Banner */}
                    <div className="relative h-56 sm:h-60 overflow-hidden bg-brand-800/10">
                      <motion.div variants={classImgVariants} className="w-full h-full relative">
                        <Image
                          src={classImage || "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop"}
                          alt={className || "FlexPulse Class"}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover group-hover:scale-106 transition-transform duration-500 ease-out"
                        />
                        {/* Gradient Dark Vignette */}
                        <div className="absolute inset-0 bg-linear-to-t from-[#070F2B] via-[#070F2B]/40 to-transparent" />
                      </motion.div>

                      {/* Top Badges: Category & Level */}
                      <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2 z-10 pointer-events-none">
                        <motion.div
                          variants={classCategoryVariants}
                          className="bg-background/90 dark:bg-[#1B1A55]/90 backdrop-blur-md px-3 py-1 rounded-full border border-brand-500/25 flex items-center gap-1.5 shadow-2xs pointer-events-auto"
                        >
                          <FiTag className="w-3 h-3 text-active" />
                          <span className="text-[11px] font-extrabold uppercase tracking-wide text-foreground">
                            {category}
                          </span>
                        </motion.div>

                        <motion.span
                          variants={classDiffVariants}
                          className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full border backdrop-blur-md uppercase tracking-wider shadow-2xs pointer-events-auto ${getLevelColor(difficulty)}`}
                        >
                          {difficulty}
                        </motion.span>
                      </div>

                      {/* Bottom Banner Info: Schedule & Real-Time Price */}
                      <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between z-10 pointer-events-none">
                        <motion.div
                          variants={classScheduleVariants}
                          className="bg-[#1B1A55]/85 backdrop-blur-md px-2.5 py-1 rounded-xl border border-white/10 flex items-center gap-1.5 text-white text-[11px] font-medium shadow-2xs pointer-events-auto"
                        >
                          <FiCalendar className="w-3 h-3 text-active" />
                          <span className="truncate max-w-[170px] sm:max-w-[200px]">
                            {classSchedule || "Weekly Schedule"} {time ? `• ${time}` : ""}
                          </span>
                        </motion.div>

                        <motion.div
                          variants={classPriceVariants}
                          className="bg-active text-white text-xs font-black px-3 py-1 rounded-xl shadow-xs border border-white/15 pointer-events-auto"
                        >
                          ${price}
                        </motion.div>
                      </div>
                    </div>

                    {/* Card Content Details */}
                    <div className="p-6 flex flex-col flex-1 justify-between gap-4">

                      <div className="space-y-2">
                        {/* Class Title: Upward sweep with de-blur */}
                        <motion.h3
                          variants={classTitleVariants}
                          className="font-['Outfit'] text-xl font-bold text-foreground leading-snug line-clamp-1 group-hover:text-active transition-colors"
                        >
                          {className}
                        </motion.h3>

                        {/* Class Description: Contrasting downward glide */}
                        {description && (
                          <motion.p
                            variants={classDescVariants}
                            className="font-['Inter'] text-xs sm:text-sm text-secondary line-clamp-2 leading-relaxed"
                          >
                            {description}
                          </motion.p>
                        )}
                      </div>

                      {/* Instructor & Duration Spec Strip */}
                      <motion.div
                        variants={classSpecsVariants}
                        className="flex items-center justify-between py-2 border-y border-brand-500/15 text-xs font-['Inter']"
                      >
                        <div className="flex items-center gap-2">
                          {authorImage ? (
                            <img
                              src={authorImage}
                              alt={coachName}
                              className="w-7 h-7 rounded-full object-cover ring-1 ring-brand-500/30"
                            />
                          ) : (
                            <div className="w-7 h-7 rounded-full bg-active/20 flex items-center justify-center text-active font-bold text-xs ring-1 ring-brand-500/30">
                              {coachName.charAt(0)}
                            </div>
                          )}
                          <div className="leading-tight">
                            <p className="text-[10px] text-secondary font-medium uppercase tracking-wider">Coach</p>
                            <p className="font-bold text-foreground text-xs">{coachName}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 bg-searchbox-bg px-2.5 py-1 rounded-lg text-secondary font-bold text-[11px] border border-brand-500/20">
                          <FiClock className="w-3.5 h-3.5 text-active" />
                          <span>{formattedDuration}</span>
                        </div>
                      </motion.div>

                      {/* Capacity / Booking Metric Bar */}
                      <motion.div
                        variants={classMetricVariants}
                        className="space-y-1.5 font-['Inter']"
                      >
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-secondary flex items-center gap-1">
                            <FiUsers className="w-3 h-3 text-active" />
                            <span>{bookedSafe} athletes enrolled</span>
                          </span>
                          <span className="font-bold text-foreground">
                            {slotSafe - bookedSafe > 0 ? `${slotSafe - bookedSafe} slots open` : "Waitlist Only"}
                          </span>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full h-1.5 bg-brand-500/15 dark:bg-[#1B1A55]/80 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-linear-to-r from-brand-500 to-active rounded-full transition-all duration-500"
                            style={{ width: `${Math.max(capacityPct, 12)}%` }}
                          />
                        </div>
                      </motion.div>

                      {/* Footer Price & Booking CTA */}
                      <div className="flex items-center justify-between pt-1">
                        <div>
                          <div className="flex items-baseline gap-1">
                            <span className="font-['Outfit'] text-2xl font-black text-active">
                              ${price}
                            </span>
                            <span className="text-[11px] text-secondary font-medium">
                              / session
                            </span>
                          </div>
                          <span className="text-[10px] text-emerald-500 font-bold block">
                            Free for VIP Members
                          </span>
                        </div>

                        {/* Type 1 CTA Button: Book Session */}
                        <motion.div variants={classBtnVariants}>
                          <Link href={`/all-classes/${_id}`}>
                            <button className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-btn-bg text-btn-text hover:brightness-105 font-extrabold text-xs sm:text-sm shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer active:scale-95">
                              <span>Book Session</span>
                              <FiArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                            </button>
                          </Link>
                        </motion.div>
                      </div>

                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Section Diagnostic Trust Banner with Directional Triggered Transitions */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={calloutContainerVariants}
          className="mt-14 sm:mt-18 p-6 sm:p-8 rounded-3xl bg-linear-to-r from-brand-800/30 via-background to-brand-800/30 border border-brand-500/25 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs"
        >
          <div className="flex items-center gap-4">
            <motion.div
              variants={calloutIconVariants}
              className="w-12 h-12 rounded-2xl bg-active/20 flex items-center justify-center text-active shrink-0 border border-brand-500/30 shadow-xs"
            >
              <FiActivity className="w-6 h-6 text-active" />
            </motion.div>
            <motion.div variants={calloutTextVariants}>
              <h4 className="font-['Outfit'] text-lg sm:text-xl font-extrabold text-foreground">
                First Time at FlexPulse? Claim Your Complimentary Diagnostic Session
              </h4>
              <p className="font-['Inter'] text-xs sm:text-sm text-secondary mt-0.5">
                Every new athlete receives a complimentary 3D movement assessment and biometric metabolic consultation before their first class.
              </p>
            </motion.div>
          </div>
          <motion.div variants={calloutBtnVariants} className="shrink-0">
            <Link
              href="/calculator#trial-pass"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-btn-bg text-btn-text font-bold text-xs sm:text-sm whitespace-nowrap shadow-sm hover:shadow-md hover:brightness-105 transition-all cursor-pointer active:scale-95"
            >
              <span>Claim Free Pass</span>
              <FiArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
