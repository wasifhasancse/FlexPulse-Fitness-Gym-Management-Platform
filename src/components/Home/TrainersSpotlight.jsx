"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence, LayoutGroup, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
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

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

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

// Universal Viewport Staged Delay & Element-by-Element Motion Variants (Family 6: Coach Profile Cards)
const coachGridContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.14, // Stagger each coach card
    },
  },
};

const coachCardVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1.5,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.09,
      delayChildren: 0.12,
    },
  },
};

const coachImgVariants = {
  hidden: { scale: 1.15, filter: "blur(4px)" },
  visible: {
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 1.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const coachAccreditationVariants = {
  hidden: { opacity: 0, x: -25 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 140, damping: 20 },
  },
};

const coachRatingVariants = {
  hidden: { opacity: 0, x: 25 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 140, damping: 20 },
  },
};

const coachExpVariants = {
  hidden: { opacity: 0, y: 16, x: -10 },
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: { type: "spring", stiffness: 150, damping: 20 },
  },
};

const coachSessionsVariants = {
  hidden: { opacity: 0, y: 16, x: 10 },
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: { type: "spring", stiffness: 150, damping: 20 },
  },
};

const coachNameVariants = {
  hidden: { opacity: 0, y: 18, filter: "blur(3px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] },
  },
};

const coachBioVariants = {
  hidden: { opacity: 0, y: -12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, ease: "easeOut" },
  },
};

const coachSpecialtiesVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.1, ease: "easeOut" },
  },
};

const coachFooterVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, ease: "easeOut" },
  },
};

// Filter Tabs Staggered Variants (Slowed & Staged)
const filterContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.3,
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
      stiffness: 160,
      damping: 22,
    },
  },
};

// Bottom Trust Banner Motion Variants (Cinematic Staged)
const calloutContainerVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1.5,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const calloutIconVariants = {
  hidden: { opacity: 0, scale: 0.3, rotate: -15 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { type: "spring", stiffness: 140, damping: 20 },
  },
};

const calloutTitleVariants = {
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] },
  },
};

const calloutDescVariants = {
  hidden: { opacity: 0, y: -14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, ease: "easeOut" },
  },
};

const calloutBtnVariants = {
  hidden: { opacity: 0, x: 25, scale: 0.92 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 140, damping: 20 },
  },
};

export default function TrainersSpotlight() {
  const [selectedDiscipline, setSelectedDiscipline] = useState("All Disciplines");
  const sectionRef = useRef(null);
  const trainersGridRef = useRef(null);
  const isTrainersInView = useInView(trainersGridRef, { once: true, amount: 0.15 });
  const [cardsTriggered, setCardsTriggered] = useState(false);

  // Universal Staged Viewport Delay: Trigger coach transitions after 1.0s in screen viewport
  useEffect(() => {
    if (isTrainersInView) {
      const timer = setTimeout(() => {
        setCardsTriggered(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isTrainersInView]);

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

      // 1. Kicker Badge: Dignified downward entrance (Slowed to 1.6s)
      tl.fromTo(
        ".trainers-kicker",
        { y: -30, opacity: 0, filter: "blur(6px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.6, ease: "power2.out" }
      ).addLabel("kickerEnd");

      // 2. Main Title: Majestic upward rising sweep with de-blur (Slowed to 2.2s)
      tl.fromTo(
        ".trainers-title",
        { y: 45, opacity: 0, filter: "blur(8px)", scale: 0.96 },
        { y: 0, opacity: 1, filter: "blur(0px)", scale: 1, duration: 2.2, ease: "power3.out" },
        "kickerEnd-=0.4"
      ).addLabel("titleEnd");

      // 3. Section Description: Contrasting downward drop from above under title (Slowed to 1.8s)
      tl.fromTo(
        ".trainers-desc",
        { y: -30, opacity: 0, filter: "blur(5px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.8, ease: "power2.out" },
        "titleEnd-=0.3"
      );

      // 4. Header Explore Action Button: Horizontal spring slide from right
      tl.fromTo(
        ".trainers-header-box",
        { x: 35, opacity: 0, scale: 0.94 },
        { x: 0, opacity: 1, scale: 1, duration: 1.6, ease: "back.out(1.2)" },
        "titleEnd-=0.4"
      );
    },
    { scope: sectionRef }
  );

  const filteredTrainers = useMemo(() => {
    if (selectedDiscipline === "All Disciplines") return SPOTLIGHT_TRAINERS;
    return SPOTLIGHT_TRAINERS.filter(
      (trainer) => trainer.discipline === selectedDiscipline
    );
  }, [selectedDiscipline]);

  return (
    <section
      ref={sectionRef}
      className="py-20 lg:py-28 bg-background border-t border-brand-500/15 relative overflow-hidden transition-colors duration-300"
    >
      {/* Background Ambient Lighting Mesh */}
      <div className="absolute top-1/3 right-0 w-96 sm:w-140 h-96 sm:h-140 bg-active/6 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-0 w-80 sm:w-120 h-80 sm:h-120 bg-brand-500/8 rounded-full blur-[130px] pointer-events-none -z-10" />

      <div className="w-11/12 mx-auto relative z-10">

        {/* Section Header with Element-by-Element Choreography */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 sm:mb-16 gap-6 border-b border-brand-500/15 pb-8">
          <div className="max-w-2xl">
            {/* Tag 1: Kicker Badge */}
            <div className="trainers-kicker inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/25 mb-4 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-active opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-active" />
              </span>
              <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-widest text-foreground font-['Outfit']">
                World-Class Mentorship
              </span>
              <span className="text-[11px] sm:text-xs text-brand-500/60 font-semibold">•</span>
              <span className="text-[11px] sm:text-xs font-semibold text-secondary font-['Inter']">
                Olympic & CSCS Master Coaches
              </span>
            </div>

            {/* Tag 2: Headline Title */}
            <h2 className="trainers-title text-3xl sm:text-4xl md:text-5xl font-black font-['Outfit'] tracking-tight text-foreground leading-[1.15]">
              Meet Our{" "}
              <span className="text-active inline-block hover:animate-[headShake_1s_ease-in-out]">
                Master Coaches
              </span>
            </h2>

            {/* Tag 3: Description Paragraph */}
            <p className="trainers-desc text-sm sm:text-base text-secondary font-['Inter'] leading-relaxed max-w-xl mt-3">
              Instructed exclusively by exercise physiologists, biomechanics researchers, and competitive athletes committed to progressive overload, form safety, and measurable physical transformation.
            </p>
          </div>

          {/* Tag 4: Quick Roster Link */}
          <div className="trainers-header-box flex items-center gap-4 shrink-0">
            <Link
              href="/trainers"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white dark:bg-[#070F2B] hover:bg-btn-bg text-foreground hover:text-btn-text font-bold text-xs sm:text-sm border border-brand-500/25 hover:border-transparent transition-all duration-300 group shadow-xs hover:shadow-md cursor-pointer"
            >
              <span>Explore All Coaches</span>
              <FiArrowRight className="w-4 h-4 text-active group-hover:text-btn-text group-hover:translate-x-1 transition-all duration-200" />
            </Link>
          </div>
        </div>

        {/* Interactive Discipline Filter Pills with Staggered Entrance & Smooth Layout Glide */}
        <LayoutGroup id="trainersSpotlightGroup">
          <motion.div
            variants={filterContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar select-none"
          >
            {CATEGORIES.map((discipline) => {
              const isActive = selectedDiscipline === discipline;
              return (
                <motion.button
                  key={discipline}
                  variants={filterItemVariants}
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setSelectedDiscipline(discipline)}
                  className="relative px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-tight whitespace-nowrap cursor-pointer transition-colors duration-200"
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeTrainersSpotlightPill"
                      className="absolute inset-0 bg-active rounded-xl shadow-xs"
                      transition={{ type: "spring", stiffness: 450, damping: 35 }}
                    />
                  )}
                  <span
                    className={`relative z-10 ${
                      isActive
                        ? "text-white"
                        : "text-[#535C91] dark:text-[#9290C3] hover:text-foreground"
                    }`}
                  >
                    {discipline}
                  </span>
                </motion.button>
              );
            })}
          </motion.div>
        </LayoutGroup>

        {/* Coaches Grid with Universal Viewport Delay & Tag-by-Tag Micro-Motion */}
        <div ref={trainersGridRef}>
          <motion.div
            layout
            variants={coachGridContainerVariants}
            initial="hidden"
            animate={cardsTriggered ? "visible" : "hidden"}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7"
          >
            <AnimatePresence mode="popLayout">
              {filteredTrainers.map((coach) => (
                <motion.div
                  key={`${selectedDiscipline}-${coach.id}`}
                  layout
                  variants={coachCardVariants}
                  exit={{ opacity: 0, scale: 0.92, y: 15, transition: { duration: 0.3 } }}
                  className="w-full"
                >
                  <div className="group relative rounded-3xl bg-white dark:bg-[#070F2B] border border-brand-500/20 hover:border-active/60 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 ease-out hover:-translate-y-1.5 flex flex-col h-full cursor-pointer">

                    {/* Portrait Photo Container with Gentle Zoom Settle */}
                    <div className="relative h-72 sm:h-80 overflow-hidden bg-brand-800/10">
                      <motion.div variants={coachImgVariants} className="relative w-full h-full">
                        <Image
                          src={coach.image}
                          alt={coach.name}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          className="object-cover group-hover:scale-106 transition-transform duration-500 ease-out"
                        />
                      </motion.div>

                      {/* Dark Vignette Overlay */}
                      <div className="absolute inset-0 bg-linear-to-t from-[#070F2B] via-[#070F2B]/40 to-transparent opacity-90 pointer-events-none" />

                      {/* Top Accreditation & Rating Badges */}
                      <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2 z-10">
                        <motion.span
                          variants={coachAccreditationVariants}
                          className="bg-background/90 dark:bg-[#1B1A55]/90 backdrop-blur-md px-2.5 py-1 rounded-full border border-brand-500/20 text-[10px] font-extrabold uppercase tracking-wide text-foreground shadow-2xs"
                        >
                          {coach.accreditation.split("•")[0].trim()}
                        </motion.span>

                        <motion.div
                          variants={coachRatingVariants}
                          className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 flex items-center gap-1 text-xs text-amber-400 font-bold shadow-2xs"
                        >
                          <FiStar className="w-3.5 h-3.5 fill-amber-400" />
                          <span>{coach.rating}</span>
                        </motion.div>
                      </div>

                      {/* Bottom Experience & Sessions Badge */}
                      <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between z-10 text-white text-[11px] font-semibold">
                        <motion.div
                          variants={coachExpVariants}
                          className="bg-[#1B1A55]/85 backdrop-blur-md px-2.5 py-1 rounded-xl border border-white/10 flex items-center gap-1.5 shadow-2xs"
                        >
                          <FiAward className="w-3 h-3 text-active" />
                          <span>{coach.experience}</span>
                        </motion.div>
                        <motion.div
                          variants={coachSessionsVariants}
                          className="bg-[#1B1A55]/85 backdrop-blur-md px-2.5 py-1 rounded-xl border border-white/10 flex items-center gap-1.5 shadow-2xs"
                        >
                          <FiUsers className="w-3 h-3 text-active" />
                          <span>{coach.sessionsLed}</span>
                        </motion.div>
                      </div>
                    </div>

                    {/* Coach Details Body */}
                    <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <motion.div variants={coachNameVariants}>
                          <h3 className="text-xl font-bold font-['Outfit'] text-foreground group-hover:text-active transition-colors leading-tight">
                            {coach.name}
                          </h3>
                          <p className="text-xs font-bold text-active font-['Inter'] mt-0.5">
                            {coach.role}
                          </p>
                        </motion.div>

                        {/* Bio */}
                        <motion.p
                          variants={coachBioVariants}
                          className="text-xs text-[#535C91] dark:text-[#9290C3] font-['Inter'] line-clamp-2 leading-relaxed"
                        >
                          {coach.bio}
                        </motion.p>

                        {/* Specialties Tag Cloud */}
                        <motion.div variants={coachSpecialtiesVariants} className="flex flex-wrap gap-1.5 pt-1">
                          {coach.specialties.map((spec, i) => (
                            <span
                              key={i}
                              className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-[#535C91]/10 dark:bg-[#1B1A55]/60 text-[#535C91] dark:text-[#9290C3] border border-brand-500/15"
                            >
                              {spec}
                            </span>
                          ))}
                        </motion.div>
                      </div>

                      {/* Footer Socials & Direct Link */}
                      <motion.div
                        variants={coachFooterVariants}
                        className="pt-3 border-t border-brand-500/15 flex items-center justify-between"
                      >
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
                      </motion.div>

                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Bottom Diagnostic Trust Banner: Theme-harmonious, high contrast conversion card */}
        <motion.div
          variants={calloutContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-14 sm:mt-18 p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#070F2B] border border-brand-500/20 hover:border-active/40 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs relative overflow-hidden transition-colors duration-300"
        >
          {/* Subtle Ambient Accent Shimmer */}
          <div className="absolute inset-0 bg-linear-to-r from-brand-500/5 via-transparent to-active/5 pointer-events-none" />

          <div className="flex items-center gap-4 relative z-10">
            <motion.div
              variants={calloutIconVariants}
              className="w-12 h-12 rounded-2xl bg-active/10 dark:bg-active/20 flex items-center justify-center text-active shrink-0 border border-active/25 shadow-2xs"
            >
              <FiAward className="w-6 h-6 text-active" />
            </motion.div>
            <div>
              <motion.h4
                variants={calloutTitleVariants}
                className="font-['Outfit'] text-lg sm:text-xl font-extrabold text-foreground"
              >
                Looking for 1-on-1 Personalized Coaching?
              </motion.h4>
              <motion.p
                variants={calloutDescVariants}
                className="font-['Inter'] text-xs sm:text-sm text-secondary mt-0.5"
              >
                Our master coaches design bespoke periodized training blocks, biomechanics assessments, and nutritional guidance.
              </motion.p>
            </div>
          </div>

          <motion.div
            variants={calloutBtnVariants}
            className="flex items-center gap-3 shrink-0 font-['Inter'] relative z-10"
          >
            <Link
              href="/trainers"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-btn-bg text-btn-text font-extrabold text-xs sm:text-sm whitespace-nowrap shadow-sm hover:shadow-md hover:brightness-105 active:scale-95 transition-all cursor-pointer border border-white/20"
            >
              <span>Book 1-on-1 Consultation</span>
              <FiArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
