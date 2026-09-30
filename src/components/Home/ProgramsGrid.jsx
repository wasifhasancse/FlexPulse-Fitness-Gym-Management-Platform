"use client";

import { useState, useMemo, useRef } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  FiArrowRight,
  FiActivity,
  FiZap,
  FiTarget,
  FiHeart,
  FiShield,
  FiClock,
  FiCheckCircle
} from "react-icons/fi";
import { FaFire } from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const CATEGORIES = [
  "All Disciplines",
  "Cardio & Stamina",
  "Muscle & Power",
  "Functional Fitness",
  "Martial Athletics",
  "Flexibility & Balance"
];

const PROGRAMS = [
  {
    index: "01",
    title: "High-Intensity Interval Conditioning (HIIT)",
    category: "Cardio & Stamina",
    focus: "VO2 Max & Metabolic Conditioning",
    desc: "Science-backed high-velocity intervals targeting anaerobic threshold, rapid lactate clearance, and post-exercise oxygen consumption (EPOC).",
    intensity: "Peak (90-95% HR)",
    duration: "45 Mins",
    calories: "650 - 850 kcal",
    equipment: "Curved Treadmills & SkiErgs",
    icon: FiZap,
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
    slug: "hiit-conditioning"
  },
  {
    index: "02",
    title: "Olympic Barbell & Kinetic Hypertrophy",
    category: "Muscle & Power",
    focus: "Maximal Force & Progressive Overload",
    desc: "Periodized compound lifting protocols focusing on the clean, snatch, deadlift, and squat to stimulate neuromuscular recruitment and myofibrillar growth.",
    intensity: "Heavy Load (RPE 8-9)",
    duration: "60 Mins",
    calories: "500 - 680 kcal",
    equipment: "Eleiko Barbells & Power Racks",
    icon: FiActivity,
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop",
    slug: "olympic-strength"
  },
  {
    index: "03",
    title: "CrossFit & Turf Conditioning",
    category: "Functional Fitness",
    focus: "Multi-Planar Power & Work Capacity",
    desc: "Dynamic athletic team conditioning integrating heavy prowler sleds, assault bikes, kettlebells, and gymnastics for total functional dominance.",
    intensity: "High Metabolic",
    duration: "50 Mins",
    calories: "600 - 800 kcal",
    equipment: "Prowler Sleds & Assault Bikes",
    icon: FiTarget,
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800&auto=format&fit=crop",
    slug: "crossfit-turf"
  },
  {
    index: "04",
    title: "Combat Boxing & Velocity Striking",
    category: "Martial Athletics",
    focus: "Rotational Torque & Strike Velocity",
    desc: "Kinetic boxing biomechanics, footwork acceleration, heavy bag strike velocity, and defensive drills instructed by certified fight coaches.",
    intensity: "High Dynamic",
    duration: "50 Mins",
    calories: "700 - 900 kcal",
    equipment: "Aqua Bags & Double-End Bags",
    icon: FiShield,
    image: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=800&auto=format&fit=crop",
    slug: "combat-boxing"
  },
  {
    index: "05",
    title: "Vinyasa Mobility & Decompression Flow",
    category: "Flexibility & Balance",
    focus: "Thoracic ROM & Joint Longevity",
    desc: "Breath-synchronized kinetic flow designed to open compressed joint capsules, accelerate fascial recovery, and engage parasympathetic relaxation.",
    intensity: "Active Recovery",
    duration: "60 Mins",
    calories: "280 - 400 kcal",
    equipment: "Manduka Mats & Yoga Straps",
    icon: FiHeart,
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop",
    slug: "vinyasa-yoga"
  },
  {
    index: "06",
    title: "Aerobics & Kinetic Rhythmic Cardio",
    category: "Cardio & Stamina",
    focus: "Cardiovascular Density & Agility",
    desc: "High-tempo choreography with targeted plyometrics engineered to sculpt the lower kinetic chain, improve agility, and sustain elevated caloric burn.",
    intensity: "Steady State Aerobic",
    duration: "45 Mins",
    calories: "450 - 620 kcal",
    equipment: "Aero Steps & Resistance Bands",
    icon: FiClock,
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop",
    slug: "aerobics-dance"
  }
];

// Outer Grid Container with Universal Staged Viewport Delay (Triggered After a Certain Time)
const programGridContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 1.2, // Staged delay of a few seconds after entering screen viewport
      staggerChildren: 0.18, // Stagger each card separately
    },
  },
};

// Card Element-by-Element Slow Cinematic Motion Variants (per rule.md & animation.md)
const cardVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const imgVariants = {
  hidden: { scale: 1.15, filter: "blur(4px)" },
  visible: {
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] },
  },
};

const watermarkVariants = {
  hidden: { opacity: 0, x: 25, y: -20, rotate: 6 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    rotate: 0,
    transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] },
  },
};

const categoryBadgeVariants = {
  hidden: { opacity: 0, x: -35, scale: 0.85 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 180, damping: 22 },
  },
};

const intensityBadgeVariants = {
  hidden: { opacity: 0, y: 18, scale: 0.8 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 200, damping: 22 },
  },
};

const calorieBadgeVariants = {
  hidden: { opacity: 0, y: 18, x: 15, scale: 0.8 },
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 190, damping: 24 },
  },
};

const focusTagVariants = {
  hidden: { opacity: 0, scaleX: 0.6, x: -15 },
  visible: {
    opacity: 1,
    scaleX: 1,
    x: 0,
    transition: { duration: 0.95, ease: "easeOut" },
  },
};

const titleVariants = {
  hidden: { opacity: 0, y: 22, filter: "blur(3px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.15, ease: [0.16, 1, 0.3, 1] },
  },
};

const descVariants = {
  hidden: { opacity: 0, y: -18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.05, ease: "easeOut" },
  },
};

const metaVariants = {
  hidden: { opacity: 0, x: -12 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.95, ease: "easeOut" },
  },
};

const btnVariants = {
  hidden: { opacity: 0, y: 18, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 190, damping: 20 },
  },
};

// Filter Options Triggered Entrance Motion Variants (per rule.md & animation.md)
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

// Bottom Callout Banner Triggered Transition Motion Variants
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
      delayChildren: 0.1,
    },
  },
};

const calloutTitleVariants = {
  hidden: { opacity: 0, y: 22, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.05, ease: [0.16, 1, 0.3, 1] },
  },
};

const calloutDescVariants = {
  hidden: { opacity: 0, y: -16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.95, ease: "easeOut" },
  },
};

const calloutBtn1Variants = {
  hidden: { opacity: 0, x: -18, y: 15, scale: 0.9 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 220, damping: 20 },
  },
};

const calloutBtn2Variants = {
  hidden: { opacity: 0, x: 25 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.95, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function ProgramsGrid() {
  const [activeCategory, setActiveCategory] = useState("All Disciplines");
  const sectionRef = useRef(null);

  // Counter Value Refs for dynamic 0 -> Target number count animation
  const tracksValRef = useRef(null);
  const slotsValRef = useRef(null);
  const coachesValRef = useRef(null);

  const filteredPrograms = useMemo(() => {
    if (activeCategory === "All Disciplines") return PROGRAMS;
    return PROGRAMS.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  // Viewport-Triggered Master Transition Sequence for "Tailored Training Disciplines" Section
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
        ".programs-kicker",
        { y: -30, opacity: 0, filter: "blur(6px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.0, ease: "power2.out" }
      ).addLabel("kickerEnd");

      // 2. Main Title: Majestic upward rising sweep with de-blur
      tl.fromTo(
        ".programs-title",
        { y: 45, opacity: 0, filter: "blur(8px)", scale: 0.96 },
        { y: 0, opacity: 1, filter: "blur(0px)", scale: 1, duration: 1.25, ease: "power3.out" },
        "kickerEnd-=0.2"
      ).addLabel("titleEnd");

      // 3. Section Description: Contrasting downward drop from above under the title bottom edge
      tl.fromTo(
        ".programs-desc",
        { y: -30, opacity: 0, filter: "blur(5px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.1, ease: "power2.out" },
        "titleEnd-=0.15"
      );

      // 4. Quick Specs Container: Horizontal slide & pop from the right
      tl.fromTo(
        ".programs-specs-box",
        { x: 45, opacity: 0, scale: 0.94 },
        { x: 0, opacity: 1, scale: 1, duration: 1.05, ease: "back.out(1.4)" },
        "titleEnd-=0.2"
      );

      // 5. Telemetry Number Counters: Mandatory 0 -> Target Count Animation
      const counterObj = { tracks: 0, slots: 0, coaches: 0 };
      tl.fromTo(
        counterObj,
        { tracks: 0, slots: 0, coaches: 0 },
        {
          tracks: 6,
          slots: 45,
          coaches: 100,
          duration: 2.5,
          ease: "power1.out",
          onStart: () => {
            if (tracksValRef.current) tracksValRef.current.textContent = "0";
            if (slotsValRef.current) slotsValRef.current.textContent = "0+";
            if (coachesValRef.current) coachesValRef.current.textContent = "0%";
          },
          onUpdate: () => {
            if (tracksValRef.current) {
              tracksValRef.current.textContent = Math.round(counterObj.tracks).toString();
            }
            if (slotsValRef.current) {
              slotsValRef.current.textContent = Math.round(counterObj.slots) + "+";
            }
            if (coachesValRef.current) {
              coachesValRef.current.textContent = Math.round(counterObj.coaches) + "%";
            }
          },
        },
        "titleEnd"
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="py-20 lg:py-28 bg-background border-t border-brand-500/15 relative overflow-hidden transition-colors duration-300"
    >
      {/* Ambient Lighting Meshes */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-active/6 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-brand-500/8 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="w-11/12 mx-auto relative z-10">

        {/* Section Header with Independent Element-by-Element Triggered Transitions */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 sm:mb-16 gap-6 border-b border-brand-500/15 pb-8">
          <div className="max-w-2xl">
            {/* Kicker Badge: Triggered downward arrival */}
            <div className="programs-kicker inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-active/30 bg-active/5 dark:bg-active/10 mb-4 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-active animate-pulse"></span>
              <span className="text-[11px] font-black uppercase tracking-wider text-active">
                Accredited Curriculum
              </span>
              <span className="text-[11px] text-secondary/60 font-bold">•</span>
              <span className="text-[11px] font-bold text-secondary">
                Science-Backed Disciplines
              </span>
            </div>

            {/* Section Headline: Triggered upward sweep */}
            <h2 className="programs-title text-4xl sm:text-5xl lg:text-6xl font-black font-['Outfit'] tracking-tight text-foreground leading-[1.08] mb-4">
              Tailored Training{" "}
              <span className="text-active inline-block">Disciplines</span>
            </h2>

            {/* Description: Contrasting downward drop from above under the title edge */}
            <p className="programs-desc text-sm sm:text-base text-secondary font-['Inter'] leading-relaxed max-w-xl">
              Engineered by exercise physiologists and master trainers. Each program integrates progressive overload, real-time biometric metrics, and tailored intensity to drive measurable athletic progression.
            </p>
          </div>

          {/* Quick Curriculum Data Specs Box: Triggered slide-in & Counter animation from 0 */}
          <div className="programs-specs-box flex items-center gap-4 sm:gap-6 bg-searchbox-bg p-4 sm:p-5 rounded-2xl border border-brand-500/20 shrink-0 font-['Outfit'] shadow-xs">
            <div>
              <p
                ref={tracksValRef}
                className="text-2xl sm:text-3xl font-black text-active tracking-tight font-['Outfit']"
              >
                6
              </p>
              <p className="text-[10px] sm:text-xs text-secondary font-bold uppercase tracking-wider">
                Specialized Tracks
              </p>
            </div>
            <div className="h-9 w-px bg-brand-500/20"></div>
            <div>
              <p
                ref={slotsValRef}
                className="text-2xl sm:text-3xl font-black text-active tracking-tight font-['Outfit']"
              >
                45+
              </p>
              <p className="text-[10px] sm:text-xs text-secondary font-bold uppercase tracking-wider">
                Weekly Slots
              </p>
            </div>
            <div className="h-9 w-px bg-brand-500/20"></div>
            <div>
              <p
                ref={coachesValRef}
                className="text-2xl sm:text-3xl font-black text-active tracking-tight font-['Outfit']"
              >
                100%
              </p>
              <p className="text-[10px] sm:text-xs text-secondary font-bold uppercase tracking-wider">
                Certified Coaches
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Discipline Category Filter Tabs with Triggered Entrance & Layout Animation */}
        <LayoutGroup id="programsGridCategoryGroup">
          <motion.div
            variants={filterContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar select-none"
          >
            {CATEGORIES.map((category) => {
              const isActive = activeCategory === category;
              return (
                <motion.button
                  key={category}
                  variants={filterItemVariants}
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setActiveCategory(category)}
                  className="programs-filter-tab relative px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-tight whitespace-nowrap cursor-pointer transition-colors duration-200"
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeProgramGridTabPill"
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
                    {category}
                  </span>
                </motion.button>
              );
            })}
          </motion.div>
        </LayoutGroup>

        {/* Programs Grid with Element-by-Element Triggered Transition Animation */}
        <motion.div
          layout
          variants={programGridContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredPrograms.map((prog) => {
              const Icon = prog.icon;
              return (
                <motion.div
                  key={`${activeCategory}-${prog.title}`}
                  layout
                  initial="hidden"
                  animate="visible"
                  exit={{
                    opacity: 0,
                    scale: 0.92,
                    y: 18,
                    transition: { duration: 0.35, ease: "easeOut" },
                  }}
                  variants={cardVariants}
                  className="h-full"
                >
                  <div className="group relative h-full rounded-3xl overflow-hidden bg-white dark:bg-[#070F2B] border border-brand-500/20 hover:border-active/60 transition-all duration-300 ease-out hover:-translate-y-1.5 flex flex-col shadow-sm hover:shadow-md">
                    {/* Image Banner Header */}
                    <div className="relative h-60 overflow-hidden">
                      <motion.div variants={imgVariants} className="w-full h-full relative">
                        <Image
                          src={prog.image}
                          alt={prog.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-[#070F2B] via-[#070F2B]/45 to-transparent" />
                      </motion.div>

                      {/* Index Watermark: Glides inward from top-right corner */}
                      <motion.div
                        variants={watermarkVariants}
                        className="absolute top-3.5 right-4 font-['Outfit'] font-black text-3xl sm:text-4xl text-white/20 group-hover:text-active/50 transition-colors select-none pointer-events-none"
                      >
                        {prog.index}
                      </motion.div>

                      {/* Category Badge & Icon: Horizontal spring slide from left */}
                      <motion.div
                        variants={categoryBadgeVariants}
                        className="absolute top-3.5 left-3.5 flex items-center gap-2"
                      >
                        <div className="p-2 rounded-xl bg-background/85 dark:bg-[#1B1A55]/90 backdrop-blur-md border border-brand-500/20 text-active shadow-2xs">
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="px-3 py-1 rounded-full bg-background/85 dark:bg-[#1B1A55]/90 backdrop-blur-md border border-brand-500/20 text-foreground text-[11px] font-bold uppercase tracking-wider shadow-2xs">
                          {prog.category}
                        </span>
                      </motion.div>

                      {/* Bottom Image Spec Badges: Split upward spring pop from bottom corners */}
                      <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-xs font-['Inter']">
                        <motion.span
                          variants={intensityBadgeVariants}
                          className="px-2.5 py-1 rounded-lg bg-active text-white font-extrabold text-[10px] uppercase tracking-wide shadow-2xs"
                        >
                          {prog.intensity}
                        </motion.span>
                        <motion.span
                          variants={calorieBadgeVariants}
                          className="px-2.5 py-1 rounded-lg bg-background/85 dark:bg-[#1B1A55]/90 backdrop-blur-md border border-brand-500/20 text-foreground text-[11px] font-bold flex items-center gap-1 shadow-2xs"
                        >
                          <FaFire className="w-3 h-3 text-active" />
                          {prog.calories}
                        </motion.span>
                      </div>
                    </div>

                    {/* Body Content */}
                    <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-2.5">
                        {/* Focus Tag: Horizontal scale expansion */}
                        <motion.div
                          variants={focusTagVariants}
                          style={{ transformOrigin: "left" }}
                          className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-brand-800/30 text-active text-[11px] font-semibold"
                        >
                          <FiCheckCircle className="w-3 h-3 shrink-0" />
                          <span>{prog.focus}</span>
                        </motion.div>

                        {/* Card Title: Upward sweep with de-blur */}
                        <motion.h3
                          variants={titleVariants}
                          className="text-xl font-bold font-['Outfit'] text-foreground group-hover:text-active transition-colors leading-snug"
                        >
                          {prog.title}
                        </motion.h3>

                        {/* Description Paragraph: Contrasting downward glide from top under title */}
                        <motion.p
                          variants={descVariants}
                          className="text-xs sm:text-sm text-secondary font-['Inter'] leading-relaxed"
                        >
                          {prog.desc}
                        </motion.p>
                      </div>

                      {/* Specs & Link Footer */}
                      <div className="pt-4 border-t border-brand-500/15 space-y-3">
                        <motion.div
                          variants={metaVariants}
                          className="flex items-center justify-between text-xs text-secondary font-['Inter']"
                        >
                          <span className="flex items-center gap-1">
                            <FiClock className="w-3.5 h-3.5 text-active" />
                            <span>Duration:</span>
                            <strong className="text-foreground">{prog.duration}</strong>
                          </span>
                          <span className="truncate max-w-[140px] text-right text-[11px]">
                            {prog.equipment}
                          </span>
                        </motion.div>

                        {/* Type 2 Action CTA Button: Tactile spring pop up from bottom */}
                        <motion.div variants={btnVariants}>
                          <Link
                            href="/schedule"
                            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-searchbox-bg hover:bg-searchbox-hover text-foreground hover:text-active text-xs font-bold transition-all duration-200 border border-brand-500/20 hover:border-active/60 shadow-xs hover:shadow-md group/btn cursor-pointer active:scale-95"
                          >
                            <span>View Class Schedule</span>
                            <FiArrowRight className="w-3.5 h-3.5 text-active group-hover/btn:translate-x-1.5 transition-transform duration-200" />
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

        {/* Bottom Callout Banner with Triggered Directional Transitions */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={calloutContainerVariants}
          className="mt-14 p-6 sm:p-8 rounded-3xl bg-linear-to-r from-brand-800/30 via-background to-brand-800/30 border border-brand-500/20 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left shadow-xs"
        >
          <div className="space-y-1">
            <motion.h4
              variants={calloutTitleVariants}
              className="text-lg sm:text-xl font-extrabold font-['Outfit'] text-foreground"
            >
              Not sure which discipline fits your athletic profile?
            </motion.h4>
            <motion.p
              variants={calloutDescVariants}
              className="text-xs sm:text-sm text-secondary font-['Inter']"
            >
              Use our clinical BMI &amp; Macro diagnostic calculator or consult directly with a master coach.
            </motion.p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            {/* Type 1 CTA */}
            <motion.div variants={calloutBtn1Variants}>
              <Link
                href="/calculator"
                className="px-5 py-2.5 rounded-xl bg-btn-bg text-btn-text text-xs sm:text-sm font-extrabold shadow-sm hover:shadow-md hover:brightness-105 active:scale-95 transition-all inline-block"
              >
                Diagnostic Calculator
              </Link>
            </motion.div>
            {/* Type 2 CTA */}
            <motion.div variants={calloutBtn2Variants}>
              <Link
                href="/trainers"
                className="px-5 py-2.5 rounded-xl bg-searchbox-bg hover:bg-searchbox-hover text-foreground hover:text-active text-xs sm:text-sm font-bold border border-brand-500/25 hover:border-active/60 shadow-xs hover:shadow-md active:scale-95 transition-all inline-block"
              >
                Consult Coaches
              </Link>
            </motion.div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

