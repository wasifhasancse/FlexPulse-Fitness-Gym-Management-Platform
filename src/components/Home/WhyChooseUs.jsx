"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  FiCheckCircle,
  FiArrowRight,
  FiActivity,
  FiShield,
  FiZap,
  FiClock,
  FiTarget,
  FiAward
} from "react-icons/fi";
import { FaDumbbell, FaFire } from "react-icons/fa";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const TRANSITION_EASE = [0.16, 1, 0.3, 1];

const FEATURES = [
  {
    index: "01",
    icon: FaDumbbell,
    title: "Competition-Grade Olympic Equipment",
    description: "Calibrated Eleiko barbells, competition power cages, curved Woodway treadmills, and Keiser pneumatic resistance machines maintained to Olympic standards.",
    tag: "Olympic Spec",
    badgeColor: "bg-active/10 text-active border-active/20"
  },
  {
    index: "02",
    icon: FiShield,
    title: "100% Certified Master Coaches",
    description: "Coached exclusively by CSCS, NASM, and Olympic-certified physiologists dedicated to movement biomechanics, injury prevention, and rapid athletic progression.",
    tag: "CSCS & NASM Certified",
    badgeColor: "bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 border-emerald-500/20"
  },
  {
    index: "03",
    icon: FiActivity,
    title: "Real-Time Biometric Telemetry",
    description: "Real-time heart-rate zone telemetry, EPOC caloric tracking, and progressive load tracking synced directly to your private member dashboard.",
    tag: "Biometric Sync",
    badgeColor: "bg-purple-500/10 text-purple-500 dark:text-purple-400 border-purple-500/20"
  },
  {
    index: "04",
    icon: FiClock,
    title: "24/7 Multi-Zone Facility Access",
    description: "Train on your schedule with keyless 24/7 access across Olympic free weights, functional athletic turf, mobility recovery zones, and infrared saunas.",
    tag: "All-Hours Access",
    badgeColor: "bg-amber-500/10 text-amber-500 dark:text-amber-400 border-amber-500/20"
  }
];

const VALUE_PILLARS = [
  "No long-term lock-in contracts — flexible memberships",
  "Free initial 3D postural & metabolic diagnostic scan",
  "Dedicated recovery suites with infrared saunas & cold plunges",
  "Capped session capacity for direct personalized coaching"
];

// Universal Viewport Staged Delay & Element-by-Element Motion Variants (Family 5: Bento Feature Cards)
const bentoGridContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.16, // Stagger each card separately
    },
  },
};

const bentoCardVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1.5,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.1,
      delayChildren: 0.12,
    },
  },
};

const bentoWatermarkVariants = {
  hidden: { opacity: 0, x: 25, y: -15, rotate: 10 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    rotate: 0,
    transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1] },
  },
};

const bentoIconVariants = {
  hidden: { opacity: 0, scale: 0.2, rotate: -15 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { type: "spring", stiffness: 140, damping: 20 },
  },
};

const bentoBadgeVariants = {
  hidden: { opacity: 0, x: 20, y: -10 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 1.3, ease: [0.16, 1, 0.3, 1] },
  },
};

const bentoTitleVariants = {
  hidden: { opacity: 0, y: 22, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1] },
  },
};

const bentoDescVariants = {
  hidden: { opacity: 0, y: -14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.3, ease: "easeOut" },
  },
};

const bentoBarVariants = {
  hidden: { opacity: 0, scaleX: 0 },
  visible: {
    opacity: 1,
    scaleX: 1,
    transition: { duration: 1.4, ease: "easeOut" },
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

export default function WhyChooseUs() {
  const sectionRef = useRef(null);
  const bentoGridRef = useRef(null);
  const isBentoInView = useInView(bentoGridRef, { once: true, amount: 0.15 });
  const [cardsTriggered, setCardsTriggered] = useState(false);

  // Counter Value Refs for dynamic 0 -> Target number count animation
  const retentionValRef = useRef(null);
  const classesValRef = useRef(null);

  // Universal Staged Viewport Delay: Trigger bento card transitions after 1.0s in screen viewport
  useEffect(() => {
    if (isBentoInView) {
      const timer = setTimeout(() => {
        setCardsTriggered(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isBentoInView]);

  // GSAP Viewport-Triggered Timeline for Section Header & Telemetry Counters
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
        ".why-kicker",
        { y: -30, opacity: 0, filter: "blur(6px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.6, ease: "power2.out" }
      ).addLabel("kickerEnd");

      // 2. Main Title: Majestic upward rising sweep with de-blur (Slowed to 2.2s)
      tl.fromTo(
        ".why-title",
        { y: 45, opacity: 0, filter: "blur(8px)", scale: 0.96 },
        { y: 0, opacity: 1, filter: "blur(0px)", scale: 1, duration: 2.2, ease: "power3.out" },
        "kickerEnd-=0.4"
      ).addLabel("titleEnd");

      // 3. Section Description: Contrasting downward drop from above under title (Slowed to 1.8s)
      tl.fromTo(
        ".why-desc",
        { y: -30, opacity: 0, filter: "blur(5px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.8, ease: "power2.out" },
        "titleEnd-=0.3"
      );

      // 4. Value Pillars Checklist: Staggered horizontal spring slide
      tl.fromTo(
        ".why-pillar-item",
        { x: -25, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.3, ease: "power2.out", stagger: 0.08 },
        "titleEnd-=0.2"
      );

      // 5. Performance Metrics Strip & Dynamic 0 -> Target Count Animation (Slowed to 2.8s)
      tl.fromTo(
        ".why-metric-item",
        { y: 20, opacity: 0, scale: 0.94 },
        { y: 0, opacity: 1, scale: 1, duration: 1.4, ease: "back.out(1.2)", stagger: 0.1 },
        "titleEnd"
      );

      const metricsCounter = { retention: 0, classes: 0 };
      tl.fromTo(
        metricsCounter,
        { retention: 0, classes: 0 },
        {
          retention: 98.4,
          classes: 45,
          duration: 2.8,
          ease: "power1.out",
          onStart: () => {
            if (retentionValRef.current) retentionValRef.current.textContent = "0.0%";
            if (classesValRef.current) classesValRef.current.textContent = "0";
          },
          onUpdate: () => {
            if (retentionValRef.current) {
              retentionValRef.current.textContent = metricsCounter.retention.toFixed(1) + "%";
            }
            if (classesValRef.current) {
              classesValRef.current.textContent = Math.round(metricsCounter.classes);
            }
          },
        },
        "titleEnd"
      );

      // 6. Action Buttons: Spring pop
      tl.fromTo(
        ".why-actions",
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power2.out" },
        "titleEnd+=0.2"
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="py-20 lg:py-28 bg-background transition-colors duration-300 relative overflow-hidden border-t border-brand-500/15"
    >
      {/* Background Ambient Lighting Mesh */}
      <div className="absolute top-1/3 left-0 w-96 sm:w-140 h-96 sm:h-140 bg-active/6 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-0 w-80 sm:w-120 h-80 sm:h-120 bg-brand-500/8 rounded-full blur-[130px] pointer-events-none -z-10" />

      <div className="w-11/12 mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 xl:gap-16 items-center">

          {/* Left Column: Proof, Narrative & Value Checklist (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Tag 1: Kicker Badge */}
            <div className="why-kicker inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/25 mb-4 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-active opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-active" />
              </span>
              <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-widest text-foreground font-['Outfit']">
                The FlexPulse Advantage
              </span>
              <span className="text-[11px] sm:text-xs text-brand-500/60 font-semibold">•</span>
              <span className="text-[11px] sm:text-xs font-semibold text-secondary font-['Inter']">
                Precision Athletic Training
              </span>
            </div>

            {/* Tag 2: Section Headline Title */}
            <h2 className="why-title text-3xl sm:text-4xl md:text-5xl font-black font-['Outfit'] tracking-tight text-foreground leading-[1.15]">
              We Push You to{" "}
              <span className="text-active inline-block hover:animate-[headShake_1s_ease-in-out]">
                Exceed Your Goals
              </span>
            </h2>

            {/* Tag 3: Description Paragraph */}
            <p className="why-desc text-sm sm:text-base text-secondary font-['Inter'] leading-relaxed max-w-xl">
              At FlexPulse, we reject generic gym models. We combine science-backed progressive overload, elite coaching biomechanics, and recovery technology to ensure every hour you invest yields measurable athletic output.
            </p>

            {/* Tag 4: Key Value Pillars Checklist */}
            <div className="why-pillars space-y-2.5 pt-1 font-['Inter'] text-xs sm:text-sm text-foreground">
              {VALUE_PILLARS.map((pillar, idx) => (
                <div key={idx} className="why-pillar-item flex items-start gap-2.5">
                  <div className="p-0.5 rounded-full bg-active/10 text-active shrink-0 mt-0.5 shadow-2xs">
                    <FiCheckCircle className="w-4 h-4 text-active" />
                  </div>
                  <span className="leading-snug text-secondary font-medium">
                    {pillar}
                  </span>
                </div>
              ))}
            </div>

            {/* Tag 5: Verified Performance Metrics Strip with Dynamic 0 -> Target Counter */}
            <div className="why-metrics grid grid-cols-3 gap-4 pt-6 border-t border-brand-500/15 font-['Outfit']">
              <div className="why-metric-item">
                <p className="text-2xl sm:text-3xl font-black text-active tracking-tight">
                  <span ref={retentionValRef}>0.0%</span>
                </p>
                <p className="text-[10px] sm:text-xs text-secondary font-bold uppercase tracking-wider mt-0.5">
                  Retention Rate
                </p>
              </div>
              <div className="why-metric-item">
                <p className="text-2xl sm:text-3xl font-black text-active tracking-tight">
                  <span ref={classesValRef}>0</span><span className="text-active">+</span>
                </p>
                <p className="text-[10px] sm:text-xs text-secondary font-bold uppercase tracking-wider mt-0.5">
                  Weekly Classes
                </p>
              </div>
              <div className="why-metric-item">
                <div className="flex items-center gap-1.5">
                  <p className="text-2xl sm:text-3xl font-black text-active tracking-tight">
                    24/7
                  </p>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse mt-0.5" />
                </div>
                <p className="text-[10px] sm:text-xs text-secondary font-bold uppercase tracking-wider mt-0.5">
                  Facility Access
                </p>
              </div>
            </div>

            {/* Tag 6: Action Buttons */}
            <div className="why-actions flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/facilities"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-btn-bg text-btn-text hover:brightness-105 active:scale-95 font-extrabold text-xs sm:text-sm shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group border border-white/20"
              >
                <span>Explore Facilities & Gear</span>
                <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/calculator#trial-pass"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-searchbox-bg hover:bg-searchbox-hover text-foreground font-bold text-xs sm:text-sm border border-brand-500/25 hover:border-active/40 transition-all duration-200 cursor-pointer shadow-xs"
              >
                <span>Claim VIP Day Pass</span>
              </Link>
            </div>

          </div>

          {/* Right Column: 4-Card Bento Grid with Universal Viewport Delay & Element Transitions (7 cols) */}
          <div ref={bentoGridRef} className="lg:col-span-7">
            <motion.div
              layout
              variants={bentoGridContainerVariants}
              initial="hidden"
              animate={cardsTriggered ? "visible" : "hidden"}
              className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6"
            >
              {FEATURES.map((feature) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.index}
                    layout
                    variants={bentoCardVariants}
                    className="h-full"
                  >
                    <div className="group relative p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#070F2B] border border-brand-500/20 hover:border-active/60 transition-all duration-300 ease-out hover:-translate-y-1.5 flex flex-col justify-between h-full shadow-xs hover:shadow-md overflow-hidden cursor-pointer">

                      {/* Watermark Index Number in Top Right */}
                      <motion.span
                        variants={bentoWatermarkVariants}
                        className="absolute top-4 right-5 font-['Outfit'] font-black text-4xl sm:text-5xl text-foreground/5 dark:text-white/10 group-hover:text-active/30 transition-colors duration-300 select-none pointer-events-none"
                      >
                        {feature.index}
                      </motion.span>

                      <div>
                        {/* Icon & Category Pill */}
                        <div className="flex items-center justify-between gap-3 mb-5">
                          <motion.div
                            variants={bentoIconVariants}
                            className="w-12 h-12 rounded-2xl bg-active/10 dark:bg-active/15 flex items-center justify-center text-active group-hover:scale-110 group-hover:bg-active group-hover:text-white transition-all duration-300 shadow-2xs border border-active/20"
                          >
                            <Icon className="w-5 h-5 transition-transform" />
                          </motion.div>

                          <motion.span
                            variants={bentoBadgeVariants}
                            className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full border ${feature.badgeColor}`}
                          >
                            {feature.tag}
                          </motion.span>
                        </div>

                        {/* Title */}
                        <motion.h3
                          variants={bentoTitleVariants}
                          className="font-['Outfit'] text-lg sm:text-xl font-bold text-foreground mb-2.5 leading-snug group-hover:text-active transition-colors"
                        >
                          {feature.title}
                        </motion.h3>

                        {/* Description */}
                        <motion.p
                          variants={bentoDescVariants}
                          className="font-['Inter'] text-xs sm:text-sm text-secondary leading-relaxed"
                        >
                          {feature.description}
                        </motion.p>
                      </div>

                      {/* Micro Corner Accent Bar */}
                      <motion.div
                        variants={bentoBarVariants}
                        style={{ transformOrigin: "left" }}
                        className="w-10 h-0.5 bg-brand-500/20 group-hover:w-full group-hover:bg-active transition-all duration-500 rounded-full mt-6"
                      />

                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

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
                Experience the FlexPulse Standard in Person
              </motion.h4>
              <motion.p
                variants={calloutDescVariants}
                className="font-['Inter'] text-xs sm:text-sm text-secondary mt-0.5"
              >
                Tour our Olympic weight halls, recovery plunge suites, and turf tracks with a master coach.
              </motion.p>
            </div>
          </div>

          <motion.div
            variants={calloutBtnVariants}
            className="flex items-center gap-3 shrink-0 font-['Inter'] relative z-10"
          >
            <Link
              href="/facilities"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-btn-bg text-btn-text font-extrabold text-xs sm:text-sm whitespace-nowrap shadow-sm hover:shadow-md hover:brightness-105 active:scale-95 transition-all cursor-pointer border border-white/20"
            >
              <span>Take Virtual Tour</span>
              <FiArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
