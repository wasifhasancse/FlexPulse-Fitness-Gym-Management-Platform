"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  FiCheckCircle,
  FiShield,
  FiZap,
  FiActivity,
  FiTrendingUp,
  FiAward,
  FiClock,
  FiArrowRight
} from "react-icons/fi";
import { FaFire } from "react-icons/fa";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const TRANSITION_EASE = [0.16, 1, 0.3, 1];

const VALUE_PILLARS = [
  "Biomechanical form analysis & load progression tracking",
  "Eleiko IWF competition-spec weight halls & platforms",
  "Sub-zero contrast therapy & Nordic cedar dry saunas",
  "100% CSCS, NASM, and Olympic-certified master coaching"
];

// ── Framer Motion Variants For Every Single Element ──
const pillarContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 }
  }
};
const pillarItemVariants = {
  hidden: { opacity: 0, x: -14 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: TRANSITION_EASE }
  }
};

const telemetryStripVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.25 }
  }
};
const telemetryCardVariants = {
  hidden: { opacity: 0, scale: 0.88, y: 18 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 180, damping: 20 }
  }
};

const bentoGridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 }
  }
};

const bentoCardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1.1,
      ease: TRANSITION_EASE,
      staggerChildren: 0.07,
      delayChildren: 0.15
    }
  }
};

const bentoImgVariants = {
  hidden: { opacity: 0, scale: 1.08 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.3, ease: TRANSITION_EASE }
  }
};

const bentoBadgeVariants = {
  hidden: { opacity: 0, y: -12, scale: 0.88 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 200, damping: 20 }
  }
};

const bentoIconVariants = {
  hidden: { opacity: 0, scale: 0.6, rotate: -15 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { type: "spring", stiffness: 220, damping: 18 }
  }
};

const bentoTitleVariants = {
  hidden: { opacity: 0, y: 18, filter: "blur(3px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.0, ease: TRANSITION_EASE }
  }
};

const bentoDescVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: "easeOut" }
  }
};

const bentoSpecsVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: "easeOut" }
  }
};

const bentoFooterVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: TRANSITION_EASE }
  }
};

const bentoBtnVariants = {
  hidden: { opacity: 0, scale: 0.92, y: 14 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 180, damping: 20 }
  }
};

export default function WhyChooseUs() {
  const sectionRef = useRef(null);
  const retentionValRef = useRef(null);
  const classesValRef = useRef(null);

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
        ".why-kicker",
        { y: -24, opacity: 0, filter: "blur(6px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.4, ease: "power2.out" }
      ).addLabel("kickerEnd");

      tl.fromTo(
        ".why-title",
        { y: 35, opacity: 0, filter: "blur(8px)", scale: 0.97 },
        { y: 0, opacity: 1, filter: "blur(0px)", scale: 1, duration: 1.8, ease: "power3.out" },
        "kickerEnd-=0.3"
      ).addLabel("titleEnd");

      tl.fromTo(
        ".why-desc",
        { y: -20, opacity: 0, filter: "blur(5px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.5, ease: "power2.out" },
        "titleEnd-=0.2"
      );

      const metricsCounter = { retention: 0, classes: 0 };
      tl.fromTo(
        metricsCounter,
        { retention: 0, classes: 0 },
        {
          retention: 98.4,
          classes: 1200,
          duration: 2.8,
          ease: "power2.out",
          onStart: () => {
            if (retentionValRef.current) retentionValRef.current.textContent = "0.0%";
            if (classesValRef.current) classesValRef.current.textContent = "0";
          },
          onUpdate: () => {
            if (retentionValRef.current) retentionValRef.current.textContent = metricsCounter.retention.toFixed(1) + "%";
            if (classesValRef.current) classesValRef.current.textContent = Math.round(metricsCounter.classes).toLocaleString();
          }
        },
        "titleEnd-=0.2"
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="py-16 sm:py-20 lg:py-24 bg-background border-t border-brand-500/15 relative overflow-hidden transition-colors duration-300"
    >
      <div className="w-11/12 mx-auto relative z-10 space-y-12">

        {/* ── Top Row: Editorial Narrative Header & Live Telemetry Strip ── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <div className="why-kicker inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/25 text-[11px] font-extrabold uppercase tracking-widest text-foreground font-['Outfit']">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-active opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-active" />
              </span>
              The FlexPulse Advantage
            </div>

            <h2 className="why-title text-3xl sm:text-4xl lg:text-5xl font-extrabold font-['Outfit'] text-foreground tracking-tight leading-[1.12]">
              Why FlexPulse Stands{" "}
              <span className="text-active inline-block hover:animate-[headShake_1s_ease-in-out]">
                Above The Rest
              </span>
            </h2>

            <p className="why-desc text-sm sm:text-base text-secondary font-['Inter'] leading-relaxed">
              At FlexPulse, we reject generic commercial gym models. Science-backed progressive overload, elite coaching biomechanics, and recovery technology ensure every hour yields measurable athletic progression.
            </p>

            {/* Value Pillars List with Triggered Transition */}
            <motion.div
              variants={pillarContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 font-['Inter']"
            >
              {VALUE_PILLARS.map((pillar, idx) => (
                <motion.div key={idx} variants={pillarItemVariants} className="flex items-start gap-2">
                  <FiCheckCircle className="w-3.5 h-3.5 text-active mt-0.5 shrink-0" />
                  <span className="text-xs text-secondary font-medium leading-snug">{pillar}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Telemetry Counter Cards Strip with Staggered Entrance */}
          <motion.div
            variants={telemetryStripVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-3 gap-3 sm:gap-4 shrink-0 font-['Outfit']"
          >
            <motion.div
              variants={telemetryCardVariants}
              className="p-4 sm:p-5 rounded-2xl bg-brand-500/5 dark:bg-[#1B1A55]/30 border border-brand-500/15 text-center min-w-[100px]"
            >
              <p className="text-2xl sm:text-3xl font-black text-active tracking-tight">
                <span ref={retentionValRef}>0.0%</span>
              </p>
              <p className="text-[10px] text-secondary font-bold uppercase tracking-wider mt-1">
                Retention Rate
              </p>
            </motion.div>
            <motion.div
              variants={telemetryCardVariants}
              className="p-4 sm:p-5 rounded-2xl bg-brand-500/5 dark:bg-[#1B1A55]/30 border border-brand-500/15 text-center min-w-[100px]"
            >
              <p className="text-2xl sm:text-3xl font-black text-active tracking-tight">
                <span ref={classesValRef}>0</span><span className="text-active">+</span>
              </p>
              <p className="text-[10px] text-secondary font-bold uppercase tracking-wider mt-1">
                Weekly Classes
              </p>
            </motion.div>
            <motion.div
              variants={telemetryCardVariants}
              className="p-4 sm:p-5 rounded-2xl bg-brand-500/5 dark:bg-[#1B1A55]/30 border border-brand-500/15 text-center min-w-[100px]"
            >
              <div className="flex items-center justify-center gap-1.5">
                <p className="text-2xl sm:text-3xl font-black text-active tracking-tight">24/7</p>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse mt-0.5" />
              </div>
              <p className="text-[10px] text-secondary font-bold uppercase tracking-wider mt-1">
                Facility Access
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* ── Asymmetrical Bento Grid with Element-by-Element Triggered Transition ── */}
        <motion.div
          variants={bentoGridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 items-stretch"
        >

          {/* Card 1: Wide 8-Column Panoramic Feature Card with Unique Olympic Athlete Photo */}
          <motion.div
            variants={bentoCardVariants}
            className="lg:col-span-8 rounded-3xl overflow-hidden relative min-h-[340px] flex flex-col justify-between p-6 sm:p-8 bg-[#070F2B] border border-brand-500/20 shadow-md group"
          >
            <motion.div variants={bentoImgVariants} className="absolute inset-0">
              <Image
                src="https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?q=80&w=1200&auto=format&fit=crop"
                alt="Olympic barbell training at FlexPulse"
                fill
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-104"
                priority
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/50 to-black/20" />
            </motion.div>

            {/* Top Badge */}
            <motion.div variants={bentoBadgeVariants} className="relative z-10 flex items-center justify-between">
              <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-active/20 text-active border border-active/40 backdrop-blur-md">
                Competition Grade
              </span>
              <span className="text-[10px] font-bold text-white/80 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/15">
                Eleiko Certified Facility
              </span>
            </motion.div>

            {/* Content */}
            <div className="relative z-10 space-y-2 pt-16">
              <motion.h3 variants={bentoTitleVariants} className="text-xl sm:text-2xl font-extrabold text-white font-['Outfit']">
                Competition-Grade Olympic Weight Halls
              </motion.h3>
              <motion.p variants={bentoDescVariants} className="text-xs sm:text-sm text-gray-300 font-['Inter'] leading-relaxed max-w-xl">
                Calibrated Eleiko barbells, competition power cages, and Keiser pneumatic resistance machines engineered to Olympic federation tolerances.
              </motion.p>
              <motion.div variants={bentoSpecsVariants} className="flex flex-wrap gap-2 pt-2">
                {["12 Power Racks", "Sound-Dampening Drop Platforms", "Calibrated Steel Plates"].map((spec, i) => (
                  <span key={i} className="text-[10px] font-semibold text-white/90 bg-white/10 px-2.5 py-1 rounded-lg backdrop-blur-sm border border-white/10">
                    {spec}
                  </span>
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* Card 2: 4-Column Master Coaches Pillar */}
          <motion.div
            variants={bentoCardVariants}
            className="lg:col-span-4 rounded-3xl p-6 sm:p-8 bg-card-bg border border-brand-500/20 shadow-xs hover:border-active/50 transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <motion.div
                variants={bentoIconVariants}
                className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/25 shadow-inner"
              >
                <FiShield className="w-6 h-6" />
              </motion.div>
              <motion.span
                variants={bentoBadgeVariants}
                className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 inline-block"
              >
                CSCS &amp; NASM Certified
              </motion.span>
              <motion.h3 variants={bentoTitleVariants} className="text-xl font-bold font-['Outfit'] text-foreground">
                100% Certified Master Coaches
              </motion.h3>
              <motion.p variants={bentoDescVariants} className="text-xs sm:text-sm text-secondary font-['Inter'] leading-relaxed">
                Coached exclusively by CSCS, NASM, and Olympic-certified exercise physiologists dedicated to kinematic biomechanics and injury-free progressive overload.
              </motion.p>
            </div>
            <motion.div
              variants={bentoFooterVariants}
              className="pt-3 border-t border-brand-500/15 flex items-center justify-between text-xs font-bold text-active"
            >
              <span>Zero Novice Trainers</span>
              <Link href="/trainers" className="inline-flex items-center gap-1 hover:underline">
                <span>Meet Coaches</span>
                <FiArrowRight className="w-3.5 h-3.5" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Card 3: 4-Column Biometric Telemetry */}
          <motion.div
            variants={bentoCardVariants}
            className="lg:col-span-4 rounded-3xl p-6 sm:p-8 bg-card-bg border border-brand-500/20 shadow-xs hover:border-active/50 transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <motion.div
                variants={bentoIconVariants}
                className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center border border-purple-500/25 shadow-inner"
              >
                <FiActivity className="w-6 h-6" />
              </motion.div>
              <motion.span
                variants={bentoBadgeVariants}
                className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-purple-500/15 text-purple-400 border border-purple-500/30 inline-block"
              >
                Biometric Sync
              </motion.span>
              <motion.h3 variants={bentoTitleVariants} className="text-xl font-bold font-['Outfit'] text-foreground">
                Real-Time Biometric Telemetry
              </motion.h3>
              <motion.p variants={bentoDescVariants} className="text-xs sm:text-sm text-secondary font-['Inter'] leading-relaxed">
                Live heart-rate zone tracking, EPOC caloric expenditure, and bar path trajectory telemetry synced directly to your member dashboard.
              </motion.p>
            </div>
            <motion.div
              variants={bentoFooterVariants}
              className="pt-3 border-t border-brand-500/15 flex items-center justify-between text-xs font-bold text-active"
            >
              <span>InBody 570 Included</span>
              <Link href="/calculator" className="inline-flex items-center gap-1 hover:underline">
                <span>View Metrics</span>
                <FiArrowRight className="w-3.5 h-3.5" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Card 4: Wide 8-Column Multi-Zone 24/7 Access Card */}
          <motion.div
            variants={bentoCardVariants}
            className="lg:col-span-8 rounded-3xl p-6 sm:p-8 bg-brand-500/5 dark:bg-[#1B1A55]/30 border border-brand-500/20 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-6"
          >
            <div className="space-y-2 max-w-lg">
              <div className="flex items-center gap-2">
                <motion.div
                  variants={bentoIconVariants}
                  className="w-9 h-9 rounded-xl bg-active/10 text-active flex items-center justify-center"
                >
                  <FiClock className="w-4.5 h-4.5" />
                </motion.div>
                <motion.span
                  variants={bentoBadgeVariants}
                  className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-active/15 text-active border border-active/30"
                >
                  All-Hours Smart Keyless
                </motion.span>
              </div>
              <motion.h3 variants={bentoTitleVariants} className="text-xl sm:text-2xl font-bold font-['Outfit'] text-foreground">
                24/7 Multi-Zone Facility Access
              </motion.h3>
              <motion.p variants={bentoDescVariants} className="text-xs sm:text-sm text-secondary font-['Inter'] leading-relaxed">
                Train on your schedule with keyless 24/7 access across Olympic weight halls, sprint turf, infrared sauna suites, and cold plunges.
              </motion.p>
            </div>

            <motion.div variants={bentoBtnVariants} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              <Link
                href="/facilities"
                className="px-5 py-3 rounded-2xl bg-btn-bg text-btn-text hover:brightness-105 active:scale-95 font-extrabold text-xs shadow-sm hover:shadow-md transition-all text-center border border-white/20"
              >
                Explore Facilities
              </Link>
              <Link
                href="/schedule"
                className="px-5 py-3 rounded-2xl bg-card-bg hover:bg-brand-500/10 text-foreground font-bold text-xs border border-brand-500/25 transition-all text-center"
              >
                Class Timetable
              </Link>
            </motion.div>
          </motion.div>

        </motion.div>

      </div>
    </section>
  );
}
