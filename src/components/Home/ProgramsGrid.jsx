"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FiArrowRight, FiActivity, FiZap, FiTarget, FiHeart, FiShield, FiTrendingUp } from "react-icons/fi";

const PROGRAMS = [
  {
    title: "High Intensity Interval (HIIT)",
    category: "Cardio & Stamina",
    desc: "Torch calories, spike VO2 max, and elevate athletic endurance through explosive interval rounds.",
    intensity: "Extreme",
    duration: "45 Mins",
    calories: "650-800 kcal",
    icon: FiZap,
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
    slug: "hiit-conditioning"
  },
  {
    title: "Olympic & Hypertrophy Strength",
    category: "Muscle & Power",
    desc: "Master compound barbell lifts, periodized progressive overload, and functional kinetic hypertrophy.",
    intensity: "Advanced",
    duration: "60 Mins",
    calories: "500-650 kcal",
    icon: FiActivity,
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop",
    slug: "olympic-strength"
  },
  {
    title: "CrossFit & Turf Conditioning",
    category: "Functional Fitness",
    desc: "Dynamic multi-modal workouts featuring kettlebells, assault bikes, prowler sleds, and gymnastics.",
    intensity: "Very High",
    duration: "50 Mins",
    calories: "600-750 kcal",
    icon: FiTarget,
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800&auto=format&fit=crop",
    slug: "crossfit-turf"
  },
  {
    title: "Combat Boxing & Kickboxing",
    category: "Martial Athletics",
    desc: "Sharpen footwork, strike combinations on heavy bags, and develop core speed with pro ring fighters.",
    intensity: "High",
    duration: "55 Mins",
    calories: "700-850 kcal",
    icon: FiShield,
    image: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=800&auto=format&fit=crop",
    slug: "combat-boxing"
  },
  {
    title: "Vinyasa & Mobility Yoga",
    category: "Flexibility & Balance",
    desc: "Restorative flow sequences, deep joint decompression, and core centering for longevity and injury prevention.",
    intensity: "Moderate",
    duration: "60 Mins",
    calories: "250-350 kcal",
    icon: FiHeart,
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop",
    slug: "vinyasa-yoga"
  },
  {
    title: "Aerobics & Kinetic Dance",
    category: "Rhythmic Cardio",
    desc: "Upbeat choreographies with high-energy soundtracks to sculpt legs, core, and cardiovascular health.",
    intensity: "Active",
    duration: "45 Mins",
    calories: "450-550 kcal",
    icon: FiTrendingUp,
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop",
    slug: "aerobics-dance"
  }
];

export default function ProgramsGrid() {
  return (
    <section className="py-24 bg-background border-t border-brand-500/15 relative overflow-hidden transition-colors duration-300">
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-active/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-800/20 border border-brand-500/30 text-active text-xs font-bold tracking-wider uppercase mb-3">
              <span className="flex h-2 w-2 rounded-full bg-active animate-pulse" />
              Tailored Training Disciplines
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-['Outfit'] tracking-tight">
              Elite Fitness <span className="text-active">Programs</span>
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#535C91] dark:text-[#9290C3] max-w-md font-['Inter']">
            Whether your mission is packing on lean muscle, shredding body fat, or building superhuman stamina, we have the specialized curriculum.
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROGRAMS.map((prog, index) => {
            const Icon = prog.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="group relative rounded-3xl overflow-hidden bg-[#535C91]/5 dark:bg-[#070F2B] border border-brand-500/20 hover:border-active transition-all duration-500 flex flex-col shadow-lg hover:shadow-2xl"
              >
                {/* Image Banner */}
                <div className="relative h-56 overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
                    style={{ backgroundImage: `url(${prog.image})` }}
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-[#070F2B] via-[#070F2B]/40 to-transparent" />
                  
                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white text-[11px] font-bold uppercase tracking-wider">
                      {prog.category}
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-gray-300 font-['Inter']">
                    <span className="px-2.5 py-1 rounded-lg bg-active text-white font-bold text-[10px] uppercase">
                      {prog.intensity}
                    </span>
                    <span className="bg-black/50 px-2 py-1 rounded-md text-[11px] text-gray-200">
                      🔥 {prog.calories}
                    </span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-xl font-bold font-['Outfit'] text-foreground group-hover:text-active transition-colors">
                      {prog.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#535C91] dark:text-[#9290C3] font-['Inter'] mt-2 leading-relaxed">
                      {prog.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-brand-500/10 flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#535C91] dark:text-[#9290C3]">
                      Duration: <strong className="text-foreground">{prog.duration}</strong>
                    </span>
                    <Link
                      href="/all-classes"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-active hover:translate-x-1 transition-transform"
                    >
                      Book Class <FiArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
