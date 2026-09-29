"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import AnimatedSectionTitle from "@/components/common/AnimatedSectionTitle";
import {
  FiArrowRight,
  FiAward,
  FiStar,
  FiUsers,
  FiCheckCircle,
  FiCalendar,
  FiActivity
} from "react-icons/fi";
import { FaInstagram, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { FaDumbbell, FaFire } from "react-icons/fa";

const TRANSITION_EASE = [0.16, 1, 0.3, 1];

const CATEGORIES = [
  "All Disciplines",
  "Strength & Power",
  "HIIT & Conditioning",
  "Combat Athletics",
  "Mobility & Yoga"
];

const SPOTLIGHT_TRAINERS = [
  {
    id: "marcus-vance",
    name: "Marcus Vance",
    role: "Head Strength & Olympic Coach",
    discipline: "Strength & Power",
    accreditation: "CSCS • USAW Senior Coach",
    experience: "12+ Years",
    rating: "5.0",
    reviewCount: "148",
    sessionsLed: "2,400+",
    specialties: ["Olympic Weightlifting", "Progressive Hypertrophy", "Force Mechanics"],
    image: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?q=80&w=1200&auto=format&fit=crop",
    bio: "Former national Olympic lifting contender specializing in kinematic bar path trajectory, neuromuscular hypertrophy, and injury prevention.",
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com"
  },
  {
    id: "elena-rostova",
    name: "Elena Rostova",
    role: "HIIT & Conditioning Director",
    discipline: "HIIT & Conditioning",
    accreditation: "M.S. Exercise Physiology • NASM",
    experience: "9+ Years",
    rating: "4.9",
    reviewCount: "126",
    sessionsLed: "1,850+",
    specialties: ["Lactate Clearance", "VO2 Max Conditioning", "Metabolic Intervals"],
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1200&auto=format&fit=crop",
    bio: "Ex-collegiate heptathlete blending anaerobic threshold training, assault bike sprint power, and high-tempo functional endurance.",
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com"
  },
  {
    id: "darius-sterling",
    name: "Darius Sterling",
    role: "Combat Athletics & Boxing Coach",
    discipline: "Combat Athletics",
    accreditation: "Golden Gloves Champion • CSCS",
    experience: "14+ Years",
    rating: "5.0",
    reviewCount: "182",
    sessionsLed: "3,100+",
    specialties: ["Striking Biomechanics", "Rotational Torque", "Defensive Agility"],
    image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=1200&auto=format&fit=crop",
    bio: "Championship pugilist trainer blending kinetic ring footwork, heavy aqua-bag velocity drills, and explosive multi-planar core power.",
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com"
  },
  {
    id: "maya-lin",
    name: "Maya Lin",
    role: "Vinyasa & Kinetic Mobility Lead",
    discipline: "Mobility & Yoga",
    accreditation: "E-RYT 500 • FRC Mobility Specialist",
    experience: "8+ Years",
    rating: "4.9",
    reviewCount: "94",
    sessionsLed: "1,450+",
    specialties: ["Thoracic Decompression", "Fascial Release", "Joint Longevity"],
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1200&auto=format&fit=crop",
    bio: "International movement mentor educating high-impact athletes on thoracic opening, hip capsule restoration, and parasympathetic recovery.",
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com"
  }
];

export default function TrainersSpotlight() {
  const [selectedDiscipline, setSelectedDiscipline] = useState("All Disciplines");

  const filteredTrainers = useMemo(() => {
    if (selectedDiscipline === "All Disciplines") return SPOTLIGHT_TRAINERS;
    return SPOTLIGHT_TRAINERS.filter(
      (trainer) => trainer.discipline === selectedDiscipline
    );
  }, [selectedDiscipline]);

  return (
    <section className="py-20 lg:py-28 bg-background border-t border-brand-500/15 relative overflow-hidden transition-colors duration-300">
      {/* Background Ambient Lighting Mesh */}
      <div className="absolute top-1/3 right-0 w-96 sm:w-140 h-96 sm:h-140 bg-active/6 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-0 w-80 sm:w-120 h-80 sm:h-120 bg-brand-500/8 rounded-full blur-[130px] pointer-events-none -z-10" />

      <div className="w-11/12 mx-auto relative z-10">

        {/* Section Header with Motion Exit & Layout Animation */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 sm:mb-16 gap-6 border-b border-brand-500/15 pb-8">
          <div className="max-w-2xl">
            <AnimatedSectionTitle
              badge="World-Class Mentorship"
              badgeDetail="Olympic & CSCS Master Coaches"
              title="Meet Our"
              highlightText="Master Coaches"
              subtitle="Instructed exclusively by exercise physiologists, biomechanics researchers, and competitive athletes committed to progressive overload, form safety, and measurable physical transformation."
              titleKey={`trainers-spotlight-heading-${selectedDiscipline}`}
            />
          </div>

          {/* Quick Roster Link */}
          <motion.div layout className="flex items-center gap-4 shrink-0">
            <Link
              href="/trainers"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#535C91]/10 dark:bg-[#1B1A55]/70 hover:bg-active hover:text-white text-foreground font-bold text-xs sm:text-sm border border-brand-500/25 hover:border-active transition-all duration-300 group shadow-xs cursor-pointer"
            >
              <span>Explore All Coaches</span>
              <FiArrowRight className="w-4 h-4 text-active group-hover:text-white group-hover:translate-x-1 transition-all duration-200" />
            </Link>
          </motion.div>
        </div>

        {/* Interactive Discipline Filter Pills with Motion Layout Animation */}
        <LayoutGroup id="trainersSpotlightGroup">
          <motion.div layout className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar select-none">
            {CATEGORIES.map((discipline) => {
              const isActive = selectedDiscipline === discipline;
              return (
                <button
                  key={discipline}
                  onClick={() => setSelectedDiscipline(discipline)}
                  className="relative px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-tight whitespace-nowrap cursor-pointer transition-colors duration-200"
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeTrainersSpotlightPill"
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
                    {discipline}
                  </span>
                </button>
              );
            })}
          </motion.div>
        </LayoutGroup>

        {/* Coaches Grid with Decoupled GPU-Smooth Animations */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7"
        >
          <AnimatePresence mode="popLayout">
            {filteredTrainers.map((coach, index) => (
              <motion.div
                key={coach.id}
                layout
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 18 }}
                transition={{ duration: 0.35, ease: TRANSITION_EASE }}
                className="w-full"
              >
                <div className="group relative rounded-3xl bg-white dark:bg-[#070F2B] border border-brand-500/20 hover:border-active/60 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 ease-out hover:-translate-y-1.5 flex flex-col h-full cursor-pointer">

                  {/* Portrait Photo Container */}
                  <div className="relative h-72 sm:h-80 overflow-hidden bg-brand-800/10">
                    <Image
                      src={coach.image}
                      alt={coach.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover group-hover:scale-106 transition-transform duration-500 ease-out"
                    />

                    {/* Dark Vignette Overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-[#070F2B] via-[#070F2B]/40 to-transparent opacity-90" />

                    {/* Top Accreditation & Rating Badges */}
                    <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2 z-10">
                      <span className="bg-background/90 dark:bg-[#1B1A55]/90 backdrop-blur-md px-2.5 py-1 rounded-full border border-brand-500/20 text-[10px] font-extrabold uppercase tracking-wide text-foreground">
                        {coach.accreditation.split("•")[0].trim()}
                      </span>

                      <div className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 flex items-center gap-1 text-xs text-amber-400 font-bold">
                        <FiStar className="w-3.5 h-3.5 fill-amber-400" />
                        <span>{coach.rating}</span>
                      </div>
                    </div>

                    {/* Bottom Experience & Sessions Badge */}
                    <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between z-10 text-white text-[11px] font-semibold">
                      <div className="bg-[#1B1A55]/85 backdrop-blur-md px-2.5 py-1 rounded-xl border border-white/10 flex items-center gap-1.5">
                        <FiAward className="w-3 h-3 text-active" />
                        <span>{coach.experience}</span>
                      </div>
                      <div className="bg-[#1B1A55]/85 backdrop-blur-md px-2.5 py-1 rounded-xl border border-white/10 flex items-center gap-1.5">
                        <FiUsers className="w-3 h-3 text-active" />
                        <span>{coach.sessionsLed}</span>
                      </div>
                    </div>
                  </div>

                  {/* Coach Details Body */}
                  <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div>
                        <h3 className="text-xl font-bold font-['Outfit'] text-foreground group-hover:text-active transition-colors leading-tight">
                          {coach.name}
                        </h3>
                        <p className="text-xs font-bold text-active font-['Inter'] mt-0.5">
                          {coach.role}
                        </p>
                      </div>

                      {/* Bio */}
                      <p className="text-xs text-[#535C91] dark:text-[#9290C3] font-['Inter'] line-clamp-2 leading-relaxed">
                        {coach.bio}
                      </p>

                      {/* Specialties Tag Cloud */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {coach.specialties.map((spec, i) => (
                          <span
                            key={i}
                            className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-[#535C91]/10 dark:bg-[#1B1A55]/60 text-[#535C91] dark:text-[#9290C3] border border-brand-500/15"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Footer Socials & Direct Link */}
                    <div className="pt-3 border-t border-brand-500/15 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-[#535C91] dark:text-[#9290C3]">
                        <a
                          href={coach.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg hover:text-active hover:bg-active/10 transition-colors"
                          aria-label={`${coach.name} Instagram`}
                        >
                          <FaInstagram size={13} />
                        </a>
                        <a
                          href={coach.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg hover:text-active hover:bg-active/10 transition-colors"
                          aria-label={`${coach.name} LinkedIn`}
                        >
                          <FaLinkedinIn size={13} />
                        </a>
                        <a
                          href={coach.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg hover:text-active hover:bg-active/10 transition-colors"
                          aria-label={`${coach.name} X`}
                        >
                          <FaXTwitter size={13} />
                        </a>
                      </div>

                      <Link
                        href="/trainers"
                        className="inline-flex items-center gap-1 text-xs font-bold text-active hover:underline"
                      >
                        <span>Profile</span>
                        <FiArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    </div>

                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Section Diagnostic Trust Banner */}
        <div className="mt-14 sm:mt-18 p-6 sm:p-8 rounded-3xl bg-linear-to-r from-brand-800/30 via-[#1B1A55]/40 to-brand-800/30 border border-brand-500/25 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-active/20 flex items-center justify-center text-active shrink-0 border border-brand-500/30">
              <FiAward className="w-6 h-6 text-active" />
            </div>
            <div>
              <h4 className="font-['Outfit'] text-lg sm:text-xl font-extrabold text-foreground">
                Looking for 1-on-1 Personalized Coaching?
              </h4>
              <p className="font-['Inter'] text-xs sm:text-sm text-[#535C91] dark:text-[#9290C3] mt-0.5">
                Our master coaches design bespoke periodized training blocks, biomechanics assessments, and nutritional guidance.
              </p>
            </div>
          </div>
          <Link
            href="/trainers"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-btn-bg text-btn-text font-bold text-xs sm:text-sm whitespace-nowrap shadow-md hover:opacity-90 transition-all cursor-pointer shrink-0"
          >
            <span>Book 1-on-1 Consultation</span>
            <FiArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
