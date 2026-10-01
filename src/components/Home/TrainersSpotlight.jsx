"use client";

import { useState, useMemo, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  FiArrowRight,
  FiStar,
  FiAward,
  FiUsers,
  FiCalendar
} from "react-icons/fi";
import { FaInstagram, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const TRANSITION_EASE = [0.16, 1, 0.3, 1];

const CATEGORIES = [
  "All Disciplines",
  "Strength & Hypertrophy",
  "HIIT & Conditioning",
  "Yoga & Mobility",
  "Boxing & Kinetic Power"
];

const SPOTLIGHT_TRAINERS = [
  {
    id: "marcus-vance",
    name: "Marcus Vance",
    role: "Head Strength & Biomechanics Coach",
    discipline: "Strength & Hypertrophy",
    accreditation: "CSCS • USA Weightlifting Level 2",
    experience: "12 Yrs Exp",
    sessionsLed: "3,400+ Sessions",
    rating: 4.98,
    image: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?q=80&w=900&auto=format&fit=crop",
    bio: "Former collegiate strength coach specializing in bar speed tracking, kinetic posterior chain activation, and high-load hypertrophy protocols.",
    specialties: ["Olympic Weightlifting", "Powerlifting", "Bar Speed Telemetry"],
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com"
  },
  {
    id: "elena-rostova",
    name: "Elena Rostova",
    role: "Director of Conditioning & MetCon",
    discipline: "HIIT & Conditioning",
    accreditation: "NASM-PES • EXOS Performance Specialist",
    experience: "9 Yrs Exp",
    sessionsLed: "2,850+ Sessions",
    rating: 4.96,
    image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=900&auto=format&fit=crop",
    bio: "Specialist in anaerobic lactic clearance, curved-treadmill sprint programming, and high-density metabolic resistance training.",
    specialties: ["Lactate Threshold", "MetCon Circuits", "VO2 Max Conditioning"],
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com"
  },
  {
    id: "devon-brooks",
    name: "Devon Brooks",
    role: "Mobility & Fascial Restoration Lead",
    discipline: "Yoga & Mobility",
    accreditation: "FRCms • E-RYT 500 • Poliquin Kinetic",
    experience: "11 Yrs Exp",
    sessionsLed: "3,100+ Sessions",
    rating: 4.99,
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=900&auto=format&fit=crop",
    bio: "Integrates Functional Range Conditioning with breathwork protocols to restore joint capsule space, thoracic rotational capacity, and active tissue elasticity.",
    specialties: ["Functional Range Conditioning", "Spinal Decompression", "Kinematic Mobility"],
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com"
  },
  {
    id: "tariq-al-mansoor",
    name: "Tariq Al-Mansoor",
    role: "Master Striking & Rotational Power Coach",
    discipline: "Boxing & Kinetic Power",
    accreditation: "Golden Gloves Champion • CSCS Specialist",
    experience: "14 Yrs Exp",
    sessionsLed: "4,200+ Sessions",
    rating: 4.97,
    image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=900&auto=format&fit=crop",
    bio: "Teaches kinetic linking from foot plant through hip snap to fist impact, developing explosive rotational horsepower and cardiovascular stamina.",
    specialties: ["Heavy Bag Intervals", "Kinetic Rotational Snap", "Footwork Velocity"],
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com"
  }
];

// ── Framer Motion Variants For Every Single Element ──
const filterContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.1 }
  }
};
const filterItemVariants = {
  hidden: { opacity: 0, y: 14, scale: 0.94 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 220, damping: 20 }
  }
};

const coachesGridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 }
  }
};

const coachCardVariants = {
  hidden: { opacity: 0, y: 35, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1.1,
      ease: TRANSITION_EASE,
      staggerChildren: 0.06,
      delayChildren: 0.1
    }
  }
};

const coachImgVariants = {
  hidden: { opacity: 0, scale: 1.08 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.2, ease: TRANSITION_EASE }
  }
};

const coachBadgeVariants = {
  hidden: { opacity: 0, y: -12, scale: 0.88 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 220, damping: 20 }
  }
};

const coachStatsVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const coachNameVariants = {
  hidden: { opacity: 0, y: 16, filter: "blur(3px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.95, ease: TRANSITION_EASE }
  }
};

const coachBioVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: "easeOut" }
  }
};

const coachSpecialtyVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: TRANSITION_EASE }
  }
};

const coachFooterVariants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 180, damping: 20 }
  }
};

const consultationStripVariants = {
  hidden: { opacity: 0, y: 25, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1.0,
      ease: TRANSITION_EASE,
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
};

const consultationIconVariants = {
  hidden: { opacity: 0, scale: 0.6, rotate: -20 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { type: "spring", stiffness: 220, damping: 18 }
  }
};

const consultationTextVariants = {
  hidden: { opacity: 0, x: -15 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.9, ease: TRANSITION_EASE }
  }
};

const consultationBtnVariants = {
  hidden: { opacity: 0, scale: 0.92, y: 12 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 190, damping: 20 }
  }
};

export default function TrainersSpotlight() {
  const [selectedDiscipline, setSelectedDiscipline] = useState("All Disciplines");
  const sectionRef = useRef(null);

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

      tl.fromTo(
        ".trainers-kicker",
        { y: -24, opacity: 0, filter: "blur(6px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.4, ease: "power2.out" }
      ).addLabel("kickerEnd");

      tl.fromTo(
        ".trainers-title",
        { y: 35, opacity: 0, filter: "blur(8px)", scale: 0.97 },
        { y: 0, opacity: 1, filter: "blur(0px)", scale: 1, duration: 1.8, ease: "power3.out" },
        "kickerEnd-=0.3"
      ).addLabel("titleEnd");

      tl.fromTo(
        ".trainers-desc",
        { y: -20, opacity: 0, filter: "blur(5px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.5, ease: "power2.out" },
        "titleEnd-=0.2"
      );

      tl.fromTo(
        ".trainers-cta-btn",
        { x: 30, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.2, ease: "back.out(1.2)" },
        "titleEnd-=0.2"
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
      className="py-16 sm:py-20 lg:py-24 bg-background border-t border-brand-500/15 relative overflow-hidden transition-colors duration-300"
    >
      <div className="w-11/12 mx-auto relative z-10 space-y-10">

        {/* ── Section Header Row with Triggered Entrance ── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="trainers-kicker inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/25 text-[11px] font-extrabold uppercase tracking-widest text-foreground font-['Outfit']">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-active opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-active" />
              </span>
              World-Class Coaches
            </div>

            <h2 className="trainers-title text-3xl sm:text-4xl lg:text-5xl font-extrabold font-['Outfit'] text-foreground tracking-tight leading-[1.12]">
              Meet Our{" "}
              <span className="text-active inline-block hover:animate-[headShake_1s_ease-in-out]">
                Master Coaches
              </span>
            </h2>

            <p className="trainers-desc text-sm sm:text-base text-secondary font-['Inter'] leading-relaxed">
              Exercise physiologists, biomechanics researchers, and competitive athletes committed to progressive overload, form safety, and measurable transformation.
            </p>
          </div>

          <div className="trainers-cta-btn shrink-0">
            <Link
              href="/trainers"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-btn-bg text-btn-text font-extrabold text-xs sm:text-sm whitespace-nowrap shadow-sm hover:shadow-md hover:brightness-105 transition-all group cursor-pointer border border-white/20"
            >
              <span>Explore All Coaches</span>
              <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* ── Discipline Filter Pills with Staggered Entrance ── */}
        <motion.div
          variants={filterContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar"
        >
          {CATEGORIES.map((discipline) => {
            const isActive = selectedDiscipline === discipline;
            return (
              <motion.button
                key={discipline}
                variants={filterItemVariants}
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                type="button"
                onClick={() => setSelectedDiscipline(discipline)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? "bg-active text-white shadow-sm scale-102"
                    : "bg-brand-500/8 dark:bg-[#1B1A55]/40 text-secondary hover:text-foreground hover:bg-brand-500/15 border border-brand-500/15"
                }`}
              >
                {discipline}
              </motion.button>
            );
          })}
        </motion.div>

        {/* ── 4-Column Coach Profile Card Grid with Element-by-Element Triggered Transition ── */}
        <motion.div
          variants={coachesGridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredTrainers.map((coach) => (
              <motion.div
                key={`${selectedDiscipline}-${coach.id}`}
                variants={coachCardVariants}
                className="group relative rounded-3xl bg-card-bg border border-brand-500/20 hover:border-active/60 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 ease-out hover:-translate-y-1.5 flex flex-col h-full cursor-pointer"
              >
                {/* Coach Portrait Banner */}
                <div className="relative h-64 overflow-hidden bg-brand-800/10">
                  <motion.div variants={coachImgVariants} className="w-full h-full relative">
                    <Image
                      src={coach.image}
                      alt={coach.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover group-hover:scale-106 transition-transform duration-500 ease-out"
                      priority
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-[#070F2B] via-[#070F2B]/40 to-transparent opacity-90 pointer-events-none" />
                  </motion.div>

                  {/* Top Badges */}
                  <motion.div
                    variants={coachBadgeVariants}
                    className="absolute top-3 left-3 right-3 flex items-center justify-between z-10"
                  >
                    <span className="bg-background/90 dark:bg-[#1B1A55]/90 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-brand-500/20 text-[9px] font-extrabold uppercase tracking-wide text-foreground shadow-2xs">
                      {coach.accreditation.split("•")[0].trim()}
                    </span>
                    <div className="px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md border border-white/10 flex items-center gap-1 text-xs text-amber-400 font-bold">
                      <FiStar className="w-3 h-3 fill-amber-400" />
                      <span>{coach.rating}</span>
                    </div>
                  </motion.div>

                  {/* Bottom Stats Overlay on Photo */}
                  <motion.div
                    variants={coachStatsVariants}
                    className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between z-10 text-white text-[10px] font-semibold"
                  >
                    <div className="bg-[#1B1A55]/85 backdrop-blur-md px-2 py-0.5 rounded-lg border border-white/10 flex items-center gap-1">
                      <FiAward className="w-2.5 h-2.5 text-active" />
                      <span>{coach.experience}</span>
                    </div>
                    <div className="bg-[#1B1A55]/85 backdrop-blur-md px-2 py-0.5 rounded-lg border border-white/10 flex items-center gap-1">
                      <FiUsers className="w-2.5 h-2.5 text-active" />
                      <span>{coach.sessionsLed}</span>
                    </div>
                  </motion.div>
                </div>

                {/* Coach Details Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <motion.div variants={coachNameVariants}>
                      <h3 className="text-lg font-bold font-['Outfit'] text-foreground group-hover:text-active transition-colors leading-tight">
                        {coach.name}
                      </h3>
                      <p className="text-xs font-bold text-active font-['Inter'] mt-0.5">
                        {coach.role}
                      </p>
                    </motion.div>

                    <motion.p variants={coachBioVariants} className="text-xs text-secondary font-['Inter'] line-clamp-2 leading-relaxed">
                      {coach.bio}
                    </motion.p>

                    <motion.div variants={coachSpecialtyVariants} className="flex flex-wrap gap-1 pt-1">
                      {coach.specialties.map((spec, i) => (
                        <span
                          key={i}
                          className="text-[9px] font-semibold px-2 py-0.5 rounded-md bg-[#535C91]/10 dark:bg-[#1B1A55]/60 text-secondary border border-brand-500/10"
                        >
                          {spec}
                        </span>
                      ))}
                    </motion.div>
                  </div>

                  {/* Footer: Social & Profile Link */}
                  <motion.div
                    variants={coachFooterVariants}
                    className="pt-3 border-t border-brand-500/15 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2 text-secondary">
                      <a href={coach.instagram} target="_blank" rel="noopener noreferrer" className="p-1 rounded hover:text-active hover:bg-active/10 transition-colors" aria-label={`${coach.name} Instagram`}>
                        <FaInstagram size={13} />
                      </a>
                      <a href={coach.linkedin} target="_blank" rel="noopener noreferrer" className="p-1 rounded hover:text-active hover:bg-active/10 transition-colors" aria-label={`${coach.name} LinkedIn`}>
                        <FaLinkedinIn size={13} />
                      </a>
                      <a href={coach.twitter} target="_blank" rel="noopener noreferrer" className="p-1 rounded hover:text-active hover:bg-active/10 transition-colors" aria-label={`${coach.name} Twitter`}>
                        <FaXTwitter size={13} />
                      </a>
                    </div>
                    <Link href="/trainers" className="inline-flex items-center gap-1 text-xs font-bold text-active hover:underline">
                      <span>Book Coach</span>
                      <FiArrowRight className="w-3 h-3" />
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* ── Bottom Consultation Callout Strip with Triggered Transition ── */}
        <motion.div
          variants={consultationStripVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="p-6 sm:p-8 rounded-3xl bg-brand-500/5 dark:bg-[#1B1A55]/30 border border-brand-500/15 flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-4">
            <motion.div
              variants={consultationIconVariants}
              className="w-12 h-12 rounded-2xl bg-active/10 text-active flex items-center justify-center shrink-0 border border-active/20"
            >
              <FiCalendar className="w-6 h-6 text-active" />
            </motion.div>
            <motion.div variants={consultationTextVariants}>
              <h4 className="font-['Outfit'] text-lg font-extrabold text-foreground">
                Looking for 1-on-1 Personalized Coaching?
              </h4>
              <p className="font-['Inter'] text-xs sm:text-sm text-secondary mt-0.5">
                Bespoke periodized training blocks, kinematic biomechanics assessments, and nutritional programming.
              </p>
            </motion.div>
          </div>
          <motion.div variants={consultationBtnVariants} className="shrink-0">
            <Link
              href="/trainers"
              className="px-6 py-3 rounded-2xl bg-btn-bg text-btn-text font-extrabold text-xs sm:text-sm whitespace-nowrap shadow-sm hover:shadow-md hover:brightness-105 transition-all cursor-pointer border border-white/20 block"
            >
              <span>Book 1-on-1 Consultation</span>
            </Link>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
