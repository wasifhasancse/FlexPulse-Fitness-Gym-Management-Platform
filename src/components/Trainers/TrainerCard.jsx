"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FiStar,
  FiMail,
  FiCheckCircle,
  FiArrowRight,
  FiClock,
  FiAward,
} from "react-icons/fi";
import { FaDumbbell } from "react-icons/fa";

const TRANSITION_EASE = [0.16, 1, 0.3, 1];

// ── Exact Tag-by-Tag Motion Variants from Home "High Demand Sessions" & ClassCard ──
export const coachCardVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1.2,
      ease: TRANSITION_EASE,
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const coachImgVariants = {
  hidden: { scale: 1.15, filter: "blur(4px)" },
  visible: {
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 1.4, ease: TRANSITION_EASE },
  },
};

export const coachExpVariants = {
  hidden: { opacity: 0, x: -25 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 180, damping: 22 },
  },
};

export const coachRatingVariants = {
  hidden: { opacity: 0, y: -20, x: 15 },
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: { type: "spring", stiffness: 200, damping: 22 },
  },
};

export const coachNameVariants = {
  hidden: { opacity: 0, y: 22, filter: "blur(3px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.15, ease: TRANSITION_EASE },
  },
};

export const coachBioVariants = {
  hidden: { opacity: 0, y: -16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.05, ease: "easeOut" },
  },
};

export const coachClassesVariants = {
  hidden: { opacity: 0, scaleX: 0.95 },
  visible: {
    opacity: 1,
    scaleX: 1,
    transition: { duration: 0.95, ease: "easeOut" },
  },
};

export const coachSpecsVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.95, ease: "easeOut" },
  },
};

export const coachDividerVariants = {
  hidden: { opacity: 0, scaleX: 0 },
  visible: {
    opacity: 1,
    scaleX: 1,
    transition: { duration: 0.9, ease: TRANSITION_EASE },
  },
};

export const coachBtnVariants = {
  hidden: { opacity: 0, y: 18, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 190, damping: 20 },
  },
};

export default function TrainerCard({
  trainer,
  viewMode = "grid",
  onOpenModal,
  isTriggered = true,
}) {
  if (!trainer) return null;

  const {
    _id,
    name = "Master Coach",
    specialty = "Weights",
    experience = "8+ Years",
    rating = "5.0",
    reviewsCount = 140,
    bio = "Certified strength and conditioning specialist focusing on biomechanics and progressive overload.",
    image,
    classes = [],
    skills = [],
  } = trainer;

  if (viewMode === "list") {
    return (
      <motion.div
        layout
        variants={coachCardVariants}
        initial="hidden"
        animate={isTriggered ? "visible" : "hidden"}
        exit={{
          opacity: 0,
          scale: 0.92,
          y: 18,
          transition: { duration: 0.35, ease: "easeOut" },
        }}
        className="w-full"
      >
        <div className="group relative rounded-3xl overflow-hidden bg-card-bg border border-brand-500/20 hover:border-active/60 transition-all duration-300 ease-out hover:-translate-y-1.5 p-5 sm:p-6 backdrop-blur-xl shadow-sm hover:shadow-md flex flex-col md:flex-row items-stretch gap-6">
          {/* Photo Canvas */}
          <div className="relative h-60 md:h-auto md:w-64 rounded-2xl overflow-hidden shrink-0 bg-brand-800/20">
            <motion.div variants={coachImgVariants} className="w-full h-full relative">
              <Image
                src={image || "https://images.unsplash.com/photo-1567013127542-490d757e51fc?q=80&w=800"}
                alt={name}
                fill
                className="object-cover object-top group-hover:scale-106 transition-transform duration-500 ease-out"
                sizes="(max-width: 768px) 100vw, 256px"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#070F2B] via-[#070F2B]/40 to-transparent" />
            </motion.div>

            {/* Top Badges */}
            <div className="absolute top-3 left-3 z-10">
              <motion.span
                variants={coachExpVariants}
                className="px-3 py-1 rounded-full bg-active text-white text-[10px] font-black uppercase tracking-wider shadow-xs"
              >
                {experience}
              </motion.span>
            </div>

            <div className="absolute top-3 right-3 z-10">
              <motion.span
                variants={coachRatingVariants}
                className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-amber-400 text-xs font-black flex items-center gap-1 shadow-2xs"
              >
                <FiStar className="fill-amber-400 w-3 h-3" /> {rating}
                <span className="text-white/60 text-[10px] font-normal">({reviewsCount})</span>
              </motion.span>
            </div>
          </div>

          {/* Body Content */}
          <div className="flex-1 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <motion.h3
                    variants={coachNameVariants}
                    className="font-['Outfit'] text-2xl font-black text-foreground flex items-center gap-2 group-hover:text-active transition-colors"
                  >
                    {name}
                    <FiCheckCircle className="text-active shrink-0" size={18} />
                  </motion.h3>
                  <p className="text-xs font-extrabold text-active uppercase tracking-wide font-['Outfit'] mt-0.5">
                    {specialty} Master Coach
                  </p>
                </div>
                <span className="px-3 py-1 rounded-xl bg-brand-500/10 border border-brand-500/20 text-xs font-bold text-foreground">
                  {classes.length} Classes Active
                </span>
              </div>

              <motion.p
                variants={coachBioVariants}
                className="font-['Inter'] text-xs sm:text-sm text-secondary leading-relaxed max-w-3xl"
              >
                {bio}
              </motion.p>

              {/* Skills Tags */}
              {skills && skills.length > 0 && (
                <motion.div variants={coachSpecsVariants} className="flex flex-wrap gap-1.5 pt-1">
                  {skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-brand-500/5 dark:bg-[#1B1A55]/30 border border-brand-500/15 text-[11px] font-bold text-secondary"
                    >
                      • {skill}
                    </span>
                  ))}
                </motion.div>
              )}
            </div>

            {/* Actions Bar */}
            <motion.div
              variants={coachBtnVariants}
              className="pt-3 border-t border-brand-500/15 flex flex-wrap items-center justify-end gap-2.5"
            >
              <Link
                href={`/all-classes?search=${encodeURIComponent(name)}`}
                className="px-5 py-2.5 rounded-2xl bg-btn-bg text-btn-text font-extrabold text-xs shadow-sm hover:shadow-md hover:brightness-105 active:scale-95 transition-all flex items-center gap-1.5 border border-white/20"
              >
                <FaDumbbell className="w-3.5 h-3.5" /> View Classes
              </Link>
              <button
                type="button"
                onClick={() => onOpenModal(trainer)}
                className="px-4 py-2.5 rounded-2xl bg-searchbox-bg hover:bg-searchbox-hover border border-brand-500/25 hover:border-active/60 text-foreground text-xs font-bold transition-all shadow-xs hover:shadow-sm cursor-pointer"
              >
                Details Dossier
              </button>
              <Link
                href={`/contact?coach=${encodeURIComponent(name)}`}
                className="p-2.5 rounded-2xl bg-searchbox-bg hover:bg-searchbox-hover border border-brand-500/25 hover:border-active/60 text-secondary hover:text-active transition-all"
                title="Contact Coach"
              >
                <FiMail size={16} />
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>
    );
  }

  // ── Grid View Mode (Default) ──
  return (
    <motion.div
      layout
      variants={coachCardVariants}
      initial="hidden"
      animate={isTriggered ? "visible" : "hidden"}
      exit={{
        opacity: 0,
        scale: 0.92,
        y: 18,
        transition: { duration: 0.35, ease: "easeOut" },
      }}
      className="w-full h-full"
    >
      <div className="group relative rounded-3xl overflow-hidden bg-card-bg border border-brand-500/20 hover:border-active/60 transition-all duration-300 ease-out hover:-translate-y-1.5 flex flex-col h-full shadow-sm hover:shadow-md">
        
        {/* ── Visual Photo Banner with Vignette Overlay ── */}
        <div className="relative h-64 sm:h-72 overflow-hidden bg-brand-800/10">
          <motion.div variants={coachImgVariants} className="w-full h-full relative">
            <Image
              src={image || "https://images.unsplash.com/photo-1567013127542-490d757e51fc?q=80&w=800"}
              alt={name}
              fill
              className="object-cover object-top group-hover:scale-106 transition-transform duration-500 ease-out"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {/* Gradient Dark Vignette for Text Contrast */}
            <div className="absolute inset-0 bg-linear-to-t from-[#070F2B] via-[#070F2B]/40 to-transparent" />
          </motion.div>

          {/* Top Badges: Experience & Rating */}
          <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2 z-10 pointer-events-none">
            <motion.span
              variants={coachExpVariants}
              className="px-3 py-1 rounded-full bg-active text-white text-[10px] font-black uppercase tracking-wider shadow-xs pointer-events-auto"
            >
              {experience}
            </motion.span>

            <motion.span
              variants={coachRatingVariants}
              className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-amber-400 text-xs font-black flex items-center gap-1 shadow-2xs pointer-events-auto"
            >
              <FiStar className="fill-amber-400 w-3 h-3" /> {rating}
              <span className="text-white/60 text-[10px] font-normal">({reviewsCount})</span>
            </motion.span>
          </div>

          {/* Coach Name & Title Anchored Over Bottom Vignette */}
          <div className="absolute bottom-3.5 left-3.5 right-3.5 z-10 pointer-events-none text-white">
            <motion.h3
              variants={coachNameVariants}
              className="font-['Outfit'] text-xl font-black tracking-tight flex items-center gap-1.5 group-hover:text-active transition-colors leading-tight"
            >
              <span className="truncate">{name}</span>
              <FiCheckCircle className="text-active shrink-0" size={16} />
            </motion.h3>
            <p className="text-xs font-bold text-white/80 font-['Inter'] mt-0.5">
              {specialty} Master Coach
            </p>
          </div>
        </div>

        {/* ── Card Content Body ── */}
        <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between gap-4">
          <div className="space-y-3">
            {/* Bio Paragraph */}
            <motion.p
              variants={coachBioVariants}
              className="font-['Inter'] text-xs sm:text-sm text-secondary line-clamp-2 leading-relaxed"
            >
              {bio}
            </motion.p>

            {/* Assigned Classes Quick Strip */}
            {classes && classes.length > 0 && (
              <motion.div variants={coachClassesVariants} className="space-y-1.5 pt-1">
                <span className="text-[10px] font-extrabold text-secondary uppercase tracking-wider block font-['Inter']">
                  Curriculum Classes ({classes.length})
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {classes.slice(0, 2).map((cls, idx) => (
                    <Link
                      key={idx}
                      href={`/all-classes?search=${encodeURIComponent(cls.className)}`}
                      className="px-2.5 py-1 rounded-lg bg-brand-500/5 dark:bg-[#1B1A55]/30 hover:bg-brand-500/10 border border-brand-500/15 text-[11px] font-bold text-foreground hover:text-active transition-colors flex items-center gap-1"
                    >
                      <FaDumbbell className="w-2.5 h-2.5 text-active" />
                      <span className="truncate max-w-[120px]">{cls.className}</span>
                    </Link>
                  ))}
                  {classes.length > 2 && (
                    <button
                      type="button"
                      onClick={() => onOpenModal(trainer)}
                      className="px-2 py-1 rounded-lg bg-searchbox-bg hover:bg-searchbox-hover text-[10px] font-bold text-secondary hover:text-foreground border border-brand-500/15 cursor-pointer"
                    >
                      +{classes.length - 2} more
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </div>

          {/* Separator Divider */}
          <motion.div
            variants={coachDividerVariants}
            className="border-t border-brand-500/15 origin-left pt-1"
          />

          {/* ── Strict 3-Type Button Action Row ── */}
          <motion.div
            variants={coachBtnVariants}
            className="flex items-center gap-2 pt-1 mt-auto"
          >
            {/* Type 1: Primary High-Voltage CTA */}
            <Link
              href={`/all-classes?search=${encodeURIComponent(name)}`}
              className="flex-1 py-2.5 rounded-2xl bg-btn-bg text-btn-text font-extrabold text-xs text-center shadow-sm hover:shadow-md hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-1.5 border border-white/20 group/cta"
            >
              <FaDumbbell className="w-3.5 h-3.5 group-hover/cta:rotate-[-12deg] transition-transform duration-300" />
              <span>Classes</span>
            </Link>

            {/* Type 2: Secondary Glass CTA */}
            <button
              type="button"
              onClick={() => onOpenModal(trainer)}
              title="View Coach Dossier"
              className="px-3.5 py-2.5 rounded-2xl bg-searchbox-bg hover:bg-searchbox-hover border border-brand-500/25 hover:border-active/60 text-foreground font-bold text-xs shadow-2xs hover:shadow-xs active:scale-95 transition-all cursor-pointer"
            >
              Details
            </button>

            {/* Type 3: Tertiary Icon CTA */}
            <Link
              href={`/contact?coach=${encodeURIComponent(name)}`}
              title="Message Coach"
              className="p-2.5 rounded-2xl bg-searchbox-bg hover:bg-searchbox-hover border border-brand-500/25 hover:border-active/60 text-secondary hover:text-active shadow-2xs hover:shadow-xs active:scale-95 transition-all shrink-0"
            >
              <FiMail className="w-4 h-4" />
            </Link>
          </motion.div>

        </div>
      </div>
    </motion.div>
  );
}
