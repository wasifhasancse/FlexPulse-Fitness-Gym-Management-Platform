"use client";

import { useState, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  FiCalendar
} from "react-icons/fi";
import { FaInstagram, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

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
    image: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?q=80&w=1000&auto=format&fit=crop",
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
    image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=1000&auto=format&fit=crop",
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
    image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=1000&auto=format&fit=crop",
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
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1000&auto=format&fit=crop",
    bio: "International movement mentor educating high-impact athletes on thoracic opening, hip capsule restoration, and parasympathetic recovery.",
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com"
  }
];

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

        {/* ── Section Header Row ── */}
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

          <div className="shrink-0">
            <Link
              href="/trainers"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-btn-bg text-btn-text font-extrabold text-xs sm:text-sm whitespace-nowrap shadow-sm hover:shadow-md hover:brightness-105 transition-all group cursor-pointer border border-white/20"
            >
              <span>Explore All Coaches</span>
              <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* ── Discipline Filter Pills ── */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {CATEGORIES.map((discipline) => {
            const isActive = selectedDiscipline === discipline;
            return (
              <button
                key={discipline}
                type="button"
                onClick={() => setSelectedDiscipline(discipline)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? "bg-active text-white shadow-sm scale-102"
                    : "bg-brand-500/8 dark:bg-[#1B1A55]/40 text-secondary hover:text-foreground hover:bg-brand-500/15 border border-brand-500/15"
                }`}
              >
                {discipline}
              </button>
            );
          })}
        </div>

        {/* ── 4-Column Coach Profile Card Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredTrainers.map((coach) => (
              <div
                key={`${selectedDiscipline}-${coach.id}`}
                className="group relative rounded-3xl bg-card-bg border border-brand-500/20 hover:border-active/60 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 ease-out hover:-translate-y-1.5 flex flex-col h-full cursor-pointer"
              >
                {/* Coach Portrait Banner */}
                <div className="relative h-64 overflow-hidden bg-brand-800/10">
                  <Image
                    src={coach.image}
                    alt={coach.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-106 transition-transform duration-500 ease-out"
                    priority
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-[#070F2B] via-[#070F2B]/40 to-transparent opacity-90 pointer-events-none" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                    <span className="bg-background/90 dark:bg-[#1B1A55]/90 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-brand-500/20 text-[9px] font-extrabold uppercase tracking-wide text-foreground shadow-2xs">
                      {coach.accreditation.split("•")[0].trim()}
                    </span>
                    <div className="px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md border border-white/10 flex items-center gap-1 text-xs text-amber-400 font-bold">
                      <FiStar className="w-3 h-3 fill-amber-400" />
                      <span>{coach.rating}</span>
                    </div>
                  </div>

                  {/* Bottom Stats Overlay on Photo */}
                  <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between z-10 text-white text-[10px] font-semibold">
                    <div className="bg-[#1B1A55]/85 backdrop-blur-md px-2 py-0.5 rounded-lg border border-white/10 flex items-center gap-1">
                      <FiAward className="w-2.5 h-2.5 text-active" />
                      <span>{coach.experience}</span>
                    </div>
                    <div className="bg-[#1B1A55]/85 backdrop-blur-md px-2 py-0.5 rounded-lg border border-white/10 flex items-center gap-1">
                      <FiUsers className="w-2.5 h-2.5 text-active" />
                      <span>{coach.sessionsLed}</span>
                    </div>
                  </div>
                </div>

                {/* Coach Details Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div>
                      <h3 className="text-lg font-bold font-['Outfit'] text-foreground group-hover:text-active transition-colors leading-tight">
                        {coach.name}
                      </h3>
                      <p className="text-xs font-bold text-active font-['Inter'] mt-0.5">
                        {coach.role}
                      </p>
                    </div>

                    <p className="text-xs text-secondary font-['Inter'] line-clamp-2 leading-relaxed">
                      {coach.bio}
                    </p>

                    <div className="flex flex-wrap gap-1 pt-1">
                      {coach.specialties.map((spec, i) => (
                        <span
                          key={i}
                          className="text-[9px] font-semibold px-2 py-0.5 rounded-md bg-[#535C91]/10 dark:bg-[#1B1A55]/60 text-secondary border border-brand-500/10"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Footer: Social & Profile Link */}
                  <div className="pt-3 border-t border-brand-500/15 flex items-center justify-between">
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
                  </div>
                </div>
              </div>
            ))}
          </AnimatePresence>
        </div>

        {/* ── Bottom Consultation Callout Strip ── */}
        <div className="p-6 sm:p-8 rounded-3xl bg-brand-500/5 dark:bg-[#1B1A55]/30 border border-brand-500/15 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-active/10 text-active flex items-center justify-center shrink-0 border border-active/20">
              <FiCalendar className="w-6 h-6 text-active" />
            </div>
            <div>
              <h4 className="font-['Outfit'] text-lg font-extrabold text-foreground">
                Looking for 1-on-1 Personalized Coaching?
              </h4>
              <p className="font-['Inter'] text-xs sm:text-sm text-secondary mt-0.5">
                Bespoke periodized training blocks, kinematic biomechanics assessments, and nutritional programming.
              </p>
            </div>
          </div>
          <Link
            href="/trainers"
            className="px-6 py-3 rounded-2xl bg-btn-bg text-btn-text font-extrabold text-xs sm:text-sm whitespace-nowrap shadow-sm hover:shadow-md hover:brightness-105 transition-all cursor-pointer border border-white/20 shrink-0"
          >
            <span>Book 1-on-1 Consultation</span>
          </Link>
        </div>

      </div>
    </section>
  );
}
