// feat: category filters
"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { 
  FiArrowRight, 
  FiClock, 
  FiCalendar, 
  FiUsers, 
  FiZap, 
  FiTag, 
  FiActivity,
  FiCheckCircle 
} from "react-icons/fi";
import { FaFire, FaStar } from "react-icons/fa";

// Easing curve for high-performance animations
const TRANSITION_EASE = [0.16, 1, 0.3, 1];

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

export default function FeaturedClasses({ classes }) {
  // Use real backend classes if available, otherwise use fallback data
  const rawClasses = Array.isArray(classes) && classes.length > 0 ? classes : FALLBACK_CLASSES;

  const [activeCategory, setActiveCategory] = useState("All Classes");

  // Dynamically compute unique categories from available classes
  const categories = useMemo(() => {
    const set = new Set();
    rawClasses.forEach((cls) => {
      if (cls.category) set.add(cls.category);
    });
    return ["All Classes", ...Array.from(set)];
  }, [rawClasses]);

  // Filter classes smoothly by category
  const filteredClasses = useMemo(() => {
    if (activeCategory === "All Classes") return rawClasses;
    return rawClasses.filter(
      (c) => (c.category || "").toLowerCase() === activeCategory.toLowerCase()
    );
  }, [activeCategory, rawClasses]);

  return (
    <section className="py-20 lg:py-28 bg-background transition-colors duration-300 relative overflow-hidden border-t border-brand-500/15">
      {/* Ambient Lighting Mesh */}
      <div className="absolute top-1/3 right-0 w-96 sm:w-130 h-96 sm:h-130 bg-active/6 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-0 w-80 sm:w-110 h-80 sm:h-110 bg-brand-500/8 rounded-full blur-[130px] pointer-events-none -z-10" />

      <div className="w-11/12 mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 sm:mb-16 gap-6 border-b border-brand-500/15 pb-8">
          <div className="max-w-2xl space-y-3">
            
            {/* Accreditation Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-800/25 dark:bg-[#1B1A55]/70 border border-brand-500/25 text-xs font-bold tracking-wide shadow-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-active opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-active"></span>
              </span>
              <span className="text-active uppercase tracking-wider font-extrabold text-[11px]">
                High Demand Sessions
              </span>
              <span className="text-[#535C91] dark:text-[#9290C3]">
                • 100% Certified Master Instructors
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-['Outfit'] tracking-tight text-foreground">
              Our Featured <span className="text-active">Classes</span>
            </h2>

            <p className="text-sm sm:text-base text-[#535C91] dark:text-[#9290C3] font-['Inter'] leading-relaxed pt-1">
              Top-rated athletic sessions engineered with biometric heart-rate tracking, structured progressive overload, and capped capacity for tailored coaching attention.
            </p>
          </div>

          {/* Quick Schedule Navigation CTA */}
          <div className="flex items-center gap-4 shrink-0">
            <Link
              href="/all-classes"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#535C91]/10 dark:bg-[#1B1A55]/70 hover:bg-active hover:text-white text-foreground font-bold text-xs sm:text-sm border border-brand-500/25 hover:border-active transition-all duration-300 group shadow-xs cursor-pointer"
            >
              <span>Explore All Classes</span>
              <FiArrowRight className="w-4 h-4 text-active group-hover:text-white group-hover:translate-x-1 transition-all duration-200" />
            </Link>
          </div>
        </div>

        {/* Interactive Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar select-none">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`relative px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-tight transition-all duration-200 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? "bg-active text-white shadow-md shadow-active/20"
                    : "bg-[#535C91]/8 dark:bg-[#1B1A55]/60 hover:bg-[#535C91]/15 text-[#535C91] dark:text-[#9290C3] border border-brand-500/15"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Classes Grid with GPU Smooth Transitions */}
        <motion.div 
          layout="position"
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
                  key={_id || idx}
                  layout="position"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 18 }}
                  transition={{ duration: 0.35, ease: TRANSITION_EASE }}
                  className="w-full"
                >
                  <div className="group relative rounded-3xl overflow-hidden bg-white dark:bg-[#070F2B] border border-brand-500/20 hover:border-active/60 transition-all duration-300 ease-out hover:-translate-y-1.5 flex flex-col h-full shadow-lg hover:shadow-2xl">
                    
                    {/* Visual Card Image Banner */}
                    <div className="relative h-56 sm:h-60 overflow-hidden bg-brand-800/10">
                      <Image
                        src={classImage || "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop"}
                        alt={className || "FlexPulse Class"}
                        fill
                        unoptimized
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-106 transition-transform duration-500 ease-out"
                      />
                      
                      {/* Gradient Dark Vignette */}
                      <div className="absolute inset-0 bg-linear-to-t from-[#070F2B] via-[#070F2B]/40 to-transparent" />

                      {/* Top Badges: Category & Level */}
                      <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2 z-10">
                        <div className="bg-background/90 dark:bg-[#1B1A55]/90 backdrop-blur-md px-3 py-1 rounded-full border border-brand-500/25 flex items-center gap-1.5 shadow-sm">
                          <FiTag className="w-3 h-3 text-active" />
                          <span className="text-[11px] font-extrabold uppercase tracking-wide text-foreground">
                            {category}
                          </span>
                        </div>

                        <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full border backdrop-blur-md uppercase tracking-wider ${getLevelColor(difficulty)}`}>
                          {difficulty}
                        </span>
                      </div>

                      {/* Bottom Banner Info: Schedule & Real-Time Price */}
                      <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between z-10">
                        <div className="bg-[#1B1A55]/85 backdrop-blur-md px-2.5 py-1 rounded-xl border border-white/10 flex items-center gap-1.5 text-white text-[11px] font-medium">
                          <FiCalendar className="w-3 h-3 text-active" />
                          <span className="truncate max-w-[170px] sm:max-w-[200px]">
                            {classSchedule || "Weekly Schedule"} {time ? `• ${time}` : ""}
                          </span>
                        </div>

                        <div className="bg-active text-white text-xs font-black px-3 py-1 rounded-xl shadow-md border border-white/15">
                          ${price}
                        </div>
                      </div>
                    </div>

                    {/* Card Content Details */}
                    <div className="p-6 flex flex-col flex-1 justify-between gap-4">
                      
                      <div className="space-y-2">
                        {/* Class Title */}
                        <h3 className="font-['Outfit'] text-xl font-bold text-foreground leading-snug line-clamp-1 group-hover:text-active transition-colors">
                          {className}
                        </h3>

                        {/* Class Description */}
                        {description && (
                          <p className="font-['Inter'] text-xs sm:text-sm text-[#535C91] dark:text-[#9290C3] line-clamp-2 leading-relaxed">
                            {description}
                          </p>
                        )}
                      </div>

                      {/* Instructor & Duration Spec Strip */}
                      <div className="flex items-center justify-between py-2 border-y border-brand-500/15 text-xs font-['Inter']">
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
                            <p className="text-[10px] text-[#535C91] dark:text-[#9290C3] font-medium uppercase tracking-wider">Coach</p>
                            <p className="font-bold text-foreground text-xs">{coachName}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 bg-[#535C91]/10 dark:bg-[#1B1A55]/50 px-2.5 py-1 rounded-lg text-[#535C91] dark:text-[#9290C3] font-bold text-[11px]">
                          <FiClock className="w-3.5 h-3.5 text-active" />
                          <span>{formattedDuration}</span>
                        </div>
                      </div>

                      {/* Capacity / Booking Metric Bar */}
                      <div className="space-y-1.5 font-['Inter']">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-[#535C91] dark:text-[#9290C3] flex items-center gap-1">
                            <FiUsers className="w-3 h-3 text-active" />
                            <span>{bookedSafe} athletes enrolled</span>
                          </span>
                          <span className="font-bold text-foreground">
                            {slotSafe - bookedSafe > 0 ? `${slotSafe - bookedSafe} slots open` : "Waitlist Only"}
                          </span>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full h-1.5 bg-[#535C91]/15 dark:bg-[#1B1A55]/80 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-linear-to-r from-brand-500 to-active rounded-full transition-all duration-500"
                            style={{ width: `${Math.max(capacityPct, 12)}%` }}
                          />
                        </div>
                      </div>

                      {/* Footer Price & Booking CTA */}
                      <div className="flex items-center justify-between pt-1">
                        <div>
                          <div className="flex items-baseline gap-1">
                            <span className="font-['Outfit'] text-2xl font-black text-active">
                              ${price}
                            </span>
                            <span className="text-[11px] text-[#535C91] dark:text-[#9290C3] font-medium">
                              / session
                            </span>
                          </div>
                          <span className="text-[10px] text-emerald-500 font-bold block">
                            Free for VIP Members
                          </span>
                        </div>

                        <Link href={`/all-classes/${_id}`}>
                          <button className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-btn-bg text-btn-text hover:opacity-95 font-extrabold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer group-hover:scale-102">
                            <span>Book Session</span>
                            <FiArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                          </button>
                        </Link>
                      </div>

                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Section Diagnostic Trust Banner */}
        <div className="mt-14 sm:mt-18 p-6 sm:p-8 rounded-3xl bg-linear-to-r from-brand-800/30 via-[#1B1A55]/40 to-brand-800/30 border border-brand-500/25 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-active/20 flex items-center justify-center text-active shrink-0 border border-brand-500/30">
              <FiActivity className="w-6 h-6 text-active" />
            </div>
            <div>
              <h4 className="font-['Outfit'] text-lg sm:text-xl font-extrabold text-foreground">
                First Time at FlexPulse? Claim Your Complimentary Diagnostic Session
              </h4>
              <p className="font-['Inter'] text-xs sm:text-sm text-[#535C91] dark:text-[#9290C3] mt-0.5">
                Every new athlete receives a complimentary 3D movement assessment and biometric metabolic consultation before their first class.
              </p>
            </div>
          </div>
          <Link
            href="/calculator#trial-pass"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-btn-bg text-btn-text font-bold text-xs sm:text-sm whitespace-nowrap shadow-md hover:opacity-90 transition-all cursor-pointer shrink-0"
          >
            <span>Claim Free Pass</span>
            <FiArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
