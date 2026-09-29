"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import AnimatedSectionTitle from "@/components/common/AnimatedSectionTitle";
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

export default function WhyChooseUs() {
  return (
    <section className="py-20 lg:py-28 bg-background transition-colors duration-300 relative overflow-hidden border-t border-brand-500/15">
      {/* Background Ambient Lighting Mesh */}
      <div className="absolute top-1/3 left-0 w-96 sm:w-140 h-96 sm:h-140 bg-active/6 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-0 w-80 sm:w-120 h-80 sm:h-120 bg-brand-500/8 rounded-full blur-[130px] pointer-events-none -z-10" />

      <div className="w-11/12 mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 xl:gap-16 items-center">

          {/* Left Column: Proof, Narrative & Value Checklist (5 cols) */}
          <motion.div layout className="lg:col-span-5 space-y-6">
            <AnimatedSectionTitle
              badge="The FlexPulse Advantage"
              badgeDetail="Precision Athletic Training"
              title="We Push You to"
              highlightText="Exceed Your Goals"
              subtitle="At FlexPulse, we reject generic gym models. We combine science-backed progressive overload, elite coaching biomechanics, and recovery technology to ensure every hour you invest yields measurable athletic output."
              titleKey="why-choose-us-heading"
            />

            {/* Key Value Pillars Checklist */}
            <motion.div layout className="space-y-2.5 pt-1 font-['Inter'] text-xs sm:text-sm text-foreground">
              {VALUE_PILLARS.map((pillar, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <div className="p-0.5 rounded-full bg-active/10 text-active shrink-0 mt-0.5">
                    <FiCheckCircle className="w-4 h-4 text-active" />
                  </div>
                  <span className="leading-snug text-[#535C91] dark:text-[#9290C3] font-medium">
                    {pillar}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* Verified Performance Metrics Strip */}
            <motion.div layout className="grid grid-cols-3 gap-4 pt-6 border-t border-brand-500/15 font-['Outfit']">
              <div>
                <p className="text-2xl sm:text-3xl font-black text-active tracking-tight">98.4%</p>
                <p className="text-[10px] sm:text-xs text-[#535C91] dark:text-[#9290C3] font-bold uppercase tracking-wider mt-0.5">
                  Retention Rate
                </p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black text-active tracking-tight">45+</p>
                <p className="text-[10px] sm:text-xs text-[#535C91] dark:text-[#9290C3] font-bold uppercase tracking-wider mt-0.5">
                  Weekly Classes
                </p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black text-active tracking-tight">24/7</p>
                <p className="text-[10px] sm:text-xs text-[#535C91] dark:text-[#9290C3] font-bold uppercase tracking-wider mt-0.5">
                  Facility Access
                </p>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div layout className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/facilities"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-btn-bg text-btn-text hover:opacity-95 font-extrabold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer group hover:animate__animated hover:animate__pulse"
              >
                <span>Explore Facilities & Gear</span>
                <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/calculator#trial-pass"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-background dark:bg-[#1B1A55]/70 hover:bg-[#535C91]/15 text-foreground font-bold text-xs sm:text-sm border border-brand-500/25 hover:border-active/40 transition-all duration-200 cursor-pointer"
              >
                <span>Claim VIP Day Pass</span>
              </Link>
            </motion.div>

          </motion.div>

          {/* Right Column: 4-Card Bento Grid Architecture (7 cols) */}
          <motion.div layout className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
              {FEATURES.map((feature, i) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.index}
                    layout
                    initial={{ opacity: 0, y: 22 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.55, delay: i * 0.12, ease: TRANSITION_EASE }}
                  >
                    <div className="group relative p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#070F2B] border border-brand-500/20 hover:border-active/60 transition-all duration-300 ease-out hover:-translate-y-1.5 flex flex-col justify-between h-full shadow-lg hover:shadow-2xl overflow-hidden cursor-pointer">

                      {/* Watermark Index Number in Top Right */}
                      <span className="absolute top-4 right-5 font-['Outfit'] font-black text-4xl sm:text-5xl text-foreground/5 dark:text-white/10 group-hover:text-active/30 transition-colors duration-300 select-none pointer-events-none">
                        {feature.index}
                      </span>

                      <div>
                        {/* Icon & Category Pill */}
                        <div className="flex items-center justify-between gap-3 mb-5">
                          <div className="w-12 h-12 rounded-2xl bg-btn-bg/10 dark:bg-active/10 flex items-center justify-center text-active group-hover:scale-110 group-hover:bg-active group-hover:text-white transition-all duration-300 shadow-inner group-hover:animate__animated group-hover:animate__bounceIn">
                            <Icon className="w-5 h-5 transition-transform" />
                          </div>

                          <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full border ${feature.badgeColor}`}>
                            {feature.tag}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="font-['Outfit'] text-lg sm:text-xl font-bold text-foreground mb-2.5 leading-snug group-hover:text-active transition-colors group-hover:animate__animated group-hover:animate__headShake">
                          {feature.title}
                        </h3>

                        {/* Description */}
                        <p className="font-['Inter'] text-xs sm:text-sm text-[#535C91] dark:text-[#9290C3] leading-relaxed">
                          {feature.description}
                        </p>
                      </div>

                      {/* Micro Corner Accent Bar */}
                      <div className="w-10 h-0.5 bg-brand-500/20 group-hover:w-full group-hover:bg-active transition-all duration-500 rounded-full mt-6" />

                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

        </div>

        {/* Section Diagnostic Trust Banner */}
        <div className="mt-14 sm:mt-18 p-6 sm:p-8 rounded-3xl bg-linear-to-r from-brand-800/30 via-[#1B1A55]/40 to-brand-800/30 border border-brand-500/25 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-active/20 flex items-center justify-center text-active shrink-0 border border-brand-500/30">
              <FiAward className="w-6 h-6 text-active" />
            </div>
            <div>
              <h4 className="font-['Outfit'] text-lg sm:text-xl font-extrabold text-foreground">
                Experience the FlexPulse Standard in Person
              </h4>
              <p className="font-['Inter'] text-xs sm:text-sm text-[#535C91] dark:text-[#9290C3] mt-0.5">
                Tour our Olympic weight halls, recovery plunge suites, and turf tracks with a master coach.
              </p>
            </div>
          </div>
          <Link
            href="/facilities"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-btn-bg text-btn-text font-bold text-xs sm:text-sm whitespace-nowrap shadow-md hover:opacity-90 transition-all cursor-pointer shrink-0"
          >
            <span>Take Virtual Tour</span>
            <FiArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
