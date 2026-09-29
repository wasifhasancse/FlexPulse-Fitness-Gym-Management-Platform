"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import AnimatedSectionTitle from "@/components/common/AnimatedSectionTitle";
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

export default function ProgramsGrid() {
  const [activeCategory, setActiveCategory] = useState("All Disciplines");

  const filteredPrograms = useMemo(() => {
    if (activeCategory === "All Disciplines") return PROGRAMS;
    return PROGRAMS.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <section className="py-20 lg:py-28 bg-background border-t border-brand-500/15 relative overflow-hidden transition-colors duration-300">
      {/* Ambient Lighting Meshes */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-active/6 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-brand-500/8 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="w-11/12 mx-auto relative z-10">

        {/* Section Header with Motion Exit & Layout Animation */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 sm:mb-16 gap-6 border-b border-brand-500/15 pb-8">
          <div className="max-w-2xl">
            <AnimatedSectionTitle
              badge="Accredited Curriculum"
              badgeDetail="Science-Backed Disciplines"
              title="Tailored Training"
              highlightText="Disciplines"
              subtitle="Engineered by exercise physiologists and master trainers. Each program integrates progressive overload, real-time biometric metrics, and tailored intensity to drive measurable athletic progression."
              titleKey={`programs-grid-header-${activeCategory}`}
            />
          </div>

          {/* Quick Curriculum Data Specs */}
          <motion.div layout className="flex items-center gap-4 sm:gap-6 bg-[#535C91]/5 dark:bg-[#1B1A55]/50 p-4 rounded-2xl border border-brand-500/20 shrink-0 font-['Outfit']">
            <div>
              <p className="text-2xl font-black text-active tracking-tight">6</p>
              <p className="text-[10px] sm:text-xs text-[#535C91] dark:text-[#9290C3] font-bold uppercase tracking-wider">
                Specialized Tracks
              </p>
            </div>
            <div className="h-8 w-px bg-brand-500/20"></div>
            <div>
              <p className="text-2xl font-black text-active tracking-tight">45+</p>
              <p className="text-[10px] sm:text-xs text-[#535C91] dark:text-[#9290C3] font-bold uppercase tracking-wider">
                Weekly Slots
              </p>
            </div>
            <div className="h-8 w-px bg-brand-500/20"></div>
            <div>
              <p className="text-2xl font-black text-active tracking-tight">100%</p>
              <p className="text-[10px] sm:text-xs text-[#535C91] dark:text-[#9290C3] font-bold uppercase tracking-wider">
                Certified Coaches
              </p>
            </div>
          </motion.div>
        </div>

        {/* Interactive Discipline Category Filter Tabs with Motion Layout Animation */}
        <LayoutGroup id="programsGridCategoryGroup">
          <motion.div layout className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar select-none">
            {CATEGORIES.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className="relative px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-tight whitespace-nowrap cursor-pointer transition-colors duration-200"
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeProgramGridTabPill"
                      className="absolute inset-0 bg-active rounded-xl shadow-md shadow-active/20"
                      transition={{ type: "spring", stiffness: 450, damping: 35 }}
                    />
                  )}
                  <span
                    className={`relative z-10 ${isActive
                        ? "text-white"
                        : "text-[#535C91] dark:text-[#9290C3] hover:text-foreground"
                      }`}
                  >
                    {category}
                  </span>
                </button>
              );
            })}
          </motion.div>
        </LayoutGroup>

        {/* Programs Grid with Smooth Transitions */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredPrograms.map((prog) => {
              const Icon = prog.icon;
              return (
                <motion.div
                  key={prog.title}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 16 }}
                  transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                  className="h-full"
                >
                  <div className="group relative h-full rounded-3xl overflow-hidden bg-[#535C91]/5 dark:bg-[#070F2B] border border-brand-500/20 hover:border-active/60 transition-all duration-300 ease-out hover:-translate-y-1.5 flex flex-col shadow-lg hover:shadow-2xl">
                    {/* Image Banner Header */}
                    <div className="relative h-60 overflow-hidden">
                      <Image
                        src={prog.image}
                        alt={prog.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-[#070F2B] via-[#070F2B]/45 to-transparent" />

                      {/* Index Watermark */}
                      <div className="absolute top-3.5 right-4 font-['Outfit'] font-black text-3xl sm:text-4xl text-white/20 group-hover:text-active/50 transition-colors select-none pointer-events-none">
                        {prog.index}
                      </div>

                      {/* Category Badge & Icon */}
                      <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
                        <div className="p-2 rounded-xl bg-background/85 dark:bg-[#1B1A55]/90 backdrop-blur-md border border-brand-500/20 text-active shadow-sm">
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="px-3 py-1 rounded-full bg-background/85 dark:bg-[#1B1A55]/90 backdrop-blur-md border border-brand-500/20 text-foreground text-[11px] font-bold uppercase tracking-wider shadow-sm">
                          {prog.category}
                        </span>
                      </div>

                      {/* Bottom Image Spec Badges */}
                      <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-xs font-['Inter']">
                        <span className="px-2.5 py-1 rounded-lg bg-active text-white font-extrabold text-[10px] uppercase tracking-wide shadow-sm">
                          {prog.intensity}
                        </span>
                        <span className="px-2.5 py-1 rounded-lg bg-background/85 dark:bg-[#1B1A55]/90 backdrop-blur-md border border-brand-500/20 text-foreground text-[11px] font-bold flex items-center gap-1">
                          <FaFire className="w-3 h-3 text-active" />
                          {prog.calories}
                        </span>
                      </div>
                    </div>

                    {/* Body Content */}
                    <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-2.5">
                        {/* Focus Tag */}
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-brand-800/30 text-active text-[11px] font-semibold">
                          <FiCheckCircle className="w-3 h-3 shrink-0" />
                          <span>{prog.focus}</span>
                        </div>

                        <h3 className="text-xl font-bold font-['Outfit'] text-foreground group-hover:text-active transition-colors leading-snug">
                          {prog.title}
                        </h3>

                        <p className="text-xs sm:text-sm text-[#535C91] dark:text-[#9290C3] font-['Inter'] leading-relaxed">
                          {prog.desc}
                        </p>
                      </div>

                      {/* Specs & Link Footer */}
                      <div className="pt-4 border-t border-brand-500/15 space-y-3">
                        <div className="flex items-center justify-between text-xs text-[#535C91] dark:text-[#9290C3] font-['Inter']">
                          <span className="flex items-center gap-1">
                            <FiClock className="w-3.5 h-3.5 text-active" />
                            <span>Duration:</span>
                            <strong className="text-foreground">{prog.duration}</strong>
                          </span>
                          <span className="truncate max-w-[140px] text-right text-[11px]">
                            {prog.equipment}
                          </span>
                        </div>

                        <Link
                          href="/schedule"
                          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-brand-800/35 hover:bg-active text-foreground hover:text-white text-xs font-bold transition-all duration-200 border border-brand-500/20 group/btn"
                        >
                          <span>View Class Schedule</span>
                          <FiArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Bottom Callout Banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-linear-to-r from-brand-800/30 via-background to-brand-800/30 border border-brand-500/20 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="space-y-1">
            <h4 className="text-lg sm:text-xl font-extrabold font-['Outfit'] text-foreground">
              Not sure which discipline fits your athletic profile?
            </h4>
            <p className="text-xs sm:text-sm text-[#535C91] dark:text-[#9290C3] font-['Inter']">
              Use our clinical BMI & Macro diagnostic calculator or consult directly with a master coach.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href="/calculator"
              className="px-5 py-2.5 rounded-xl bg-btn-bg text-btn-text text-xs sm:text-sm font-extrabold shadow-md hover:opacity-95 transition-all"
            >
              Diagnostic Calculator
            </Link>
            <Link
              href="/trainers"
              className="px-5 py-2.5 rounded-xl bg-background dark:bg-[#1B1A55]/80 hover:bg-[#535C91]/15 text-foreground text-xs sm:text-sm font-bold border border-brand-500/25 transition-all"
            >
              Consult Coaches
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
