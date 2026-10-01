"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
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
  FiAward
} from "react-icons/fi";
import { FaDumbbell } from "react-icons/fa";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const VALUE_PILLARS = [
  "No long-term lock-in contracts — flexible memberships",
  "Free initial 3D postural & metabolic diagnostic scan",
  "Dedicated recovery suites with infrared saunas & cold plunges",
  "Capped session capacity for personalized master coaching"
];

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

            {/* Value Pillars List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 font-['Inter']">
              {VALUE_PILLARS.map((pillar, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <FiCheckCircle className="w-3.5 h-3.5 text-active mt-0.5 shrink-0" />
                  <span className="text-xs text-secondary font-medium leading-snug">{pillar}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Telemetry Counter Cards Strip */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4 shrink-0 font-['Outfit']">
            <div className="p-4 sm:p-5 rounded-2xl bg-brand-500/5 dark:bg-[#1B1A55]/30 border border-brand-500/15 text-center min-w-[100px]">
              <p className="text-2xl sm:text-3xl font-black text-active tracking-tight">
                <span ref={retentionValRef}>0.0%</span>
              </p>
              <p className="text-[10px] text-secondary font-bold uppercase tracking-wider mt-1">
                Retention Rate
              </p>
            </div>
            <div className="p-4 sm:p-5 rounded-2xl bg-brand-500/5 dark:bg-[#1B1A55]/30 border border-brand-500/15 text-center min-w-[100px]">
              <p className="text-2xl sm:text-3xl font-black text-active tracking-tight">
                <span ref={classesValRef}>0</span><span className="text-active">+</span>
              </p>
              <p className="text-[10px] text-secondary font-bold uppercase tracking-wider mt-1">
                Weekly Classes
              </p>
            </div>
            <div className="p-4 sm:p-5 rounded-2xl bg-brand-500/5 dark:bg-[#1B1A55]/30 border border-brand-500/15 text-center min-w-[100px]">
              <div className="flex items-center justify-center gap-1.5">
                <p className="text-2xl sm:text-3xl font-black text-active tracking-tight">24/7</p>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse mt-0.5" />
              </div>
              <p className="text-[10px] text-secondary font-bold uppercase tracking-wider mt-1">
                Facility Access
              </p>
            </div>
          </div>
        </div>

        {/* ── Asymmetrical Bento Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 items-stretch">

          {/* Card 1: Wide 8-Column Panoramic Feature Card with Unique Olympic Athlete Photo */}
          <div className="lg:col-span-8 rounded-3xl overflow-hidden relative min-h-[340px] flex flex-col justify-between p-6 sm:p-8 bg-[#070F2B] border border-brand-500/20 shadow-md group">
            <Image
              src="https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?q=80&w=1200&auto=format&fit=crop"
              alt="Olympic barbell training at FlexPulse"
              fill
              sizes="(max-width: 1024px) 100vw, 66vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-104"
              priority
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/50 to-black/20" />

            {/* Top Badge */}
            <div className="relative z-10 flex items-center justify-between">
              <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-active/20 text-active border border-active/40 backdrop-blur-md">
                Competition Grade
              </span>
              <span className="text-[10px] font-bold text-white/80 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/15">
                Eleiko Certified Facility
              </span>
            </div>

            {/* Content */}
            <div className="relative z-10 space-y-2 pt-16">
              <h3 className="text-xl sm:text-2xl font-extrabold text-white font-['Outfit']">
                Competition-Grade Olympic Weight Halls
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 font-['Inter'] leading-relaxed max-w-xl">
                Calibrated Eleiko barbells, competition power cages, and Keiser pneumatic resistance machines engineered to Olympic federation tolerances.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {["12 Power Racks", "Sound-Dampening Drop Platforms", "Calibrated Steel Plates"].map((spec, i) => (
                  <span key={i} className="text-[10px] font-semibold text-white/90 bg-white/10 px-2.5 py-1 rounded-lg backdrop-blur-sm border border-white/10">
                    {spec}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Card 2: 4-Column Master Coaches Pillar */}
          <div className="lg:col-span-4 rounded-3xl p-6 sm:p-8 bg-card-bg border border-brand-500/20 shadow-xs hover:border-active/50 transition-all flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/25 shadow-inner">
                <FiShield className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 inline-block">
                CSCS & NASM Certified
              </span>
              <h3 className="text-xl font-bold font-['Outfit'] text-foreground">
                100% Certified Master Coaches
              </h3>
              <p className="text-xs sm:text-sm text-secondary font-['Inter'] leading-relaxed">
                Coached exclusively by CSCS, NASM, and Olympic-certified exercise physiologists dedicated to kinematic biomechanics and injury-free progressive overload.
              </p>
            </div>
            <div className="pt-3 border-t border-brand-500/15 flex items-center justify-between text-xs font-bold text-active">
              <span>Zero Novice Trainers</span>
              <Link href="/trainers" className="inline-flex items-center gap-1 hover:underline">
                <span>Meet Coaches</span>
                <FiArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 3: 4-Column Biometric Telemetry */}
          <div className="lg:col-span-4 rounded-3xl p-6 sm:p-8 bg-card-bg border border-brand-500/20 shadow-xs hover:border-active/50 transition-all flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center border border-purple-500/25 shadow-inner">
                <FiActivity className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-purple-500/15 text-purple-400 border border-purple-500/30 inline-block">
                Biometric Sync
              </span>
              <h3 className="text-xl font-bold font-['Outfit'] text-foreground">
                Real-Time Biometric Telemetry
              </h3>
              <p className="text-xs sm:text-sm text-secondary font-['Inter'] leading-relaxed">
                Live heart-rate zone tracking, EPOC caloric expenditure, and bar path trajectory telemetry synced directly to your member dashboard.
              </p>
            </div>
            <div className="pt-3 border-t border-brand-500/15 flex items-center justify-between text-xs font-bold text-active">
              <span>InBody 570 Included</span>
              <Link href="/calculator" className="inline-flex items-center gap-1 hover:underline">
                <span>View Metrics</span>
                <FiArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 4: Wide 8-Column Multi-Zone 24/7 Access Card */}
          <div className="lg:col-span-8 rounded-3xl p-6 sm:p-8 bg-brand-500/5 dark:bg-[#1B1A55]/30 border border-brand-500/20 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="space-y-2 max-w-lg">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-active/10 text-active flex items-center justify-center">
                  <FiClock className="w-4.5 h-4.5" />
                </div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-active/15 text-active border border-active/30">
                  All-Hours Smart Keyless
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-['Outfit'] text-foreground">
                24/7 Multi-Zone Facility Access
              </h3>
              <p className="text-xs sm:text-sm text-secondary font-['Inter'] leading-relaxed">
                Train on your schedule with keyless 24/7 access across Olympic weight halls, sprint turf, infrared sauna suites, and cold plunges.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
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
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
