"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  FiUsers,
  FiAward,
  FiActivity,
  FiStar,
  FiCheckCircle,
  FiShield
} from "react-icons/fi";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function TrainersHeroHeader({ totalCoaches = 8 }) {
  const sectionRef = useRef(null);
  const totalCountRef = useRef(null);
  const tracksCountRef = useRef(null);
  const certifiedCountRef = useRef(null);

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

      // 1. Kicker Badge: Dignified downward entrance
      tl.fromTo(
        ".trainers-hero-kicker",
        { y: -30, opacity: 0, filter: "blur(6px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.2, ease: "power2.out" }
      ).addLabel("kickerEnd");

      // 2. Headline: Majestic upward rising sweep with de-blur & scale
      tl.fromTo(
        ".trainers-hero-title",
        { y: 45, opacity: 0, filter: "blur(8px)", scale: 0.96 },
        { y: 0, opacity: 1, filter: "blur(0px)", scale: 1, duration: 1.5, ease: "power3.out" },
        "kickerEnd-=0.3"
      ).addLabel("titleEnd");

      // 3. Subtitle: Contrasting downward drop from above
      tl.fromTo(
        ".trainers-hero-desc",
        { y: -25, opacity: 0, filter: "blur(5px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.3, ease: "power2.out" },
        "titleEnd-=0.2"
      ).addLabel("descEnd");

      // 4. Outer Telemetry HUD Shell: Stately scale & rise
      tl.fromTo(
        ".trainers-telemetry-shell",
        { y: 35, opacity: 0, scale: 0.97 },
        { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: "power3.out" },
        "descEnd-=0.3"
      ).addLabel("shellEnd");

      // 5. Individual Telemetry Cards: Separate triggered vectors
      tl.fromTo(
        ".trainers-telemetry-1",
        { x: -30, y: 20, opacity: 0, scale: 0.9 },
        { x: 0, y: 0, opacity: 1, scale: 1, duration: 1.0, ease: "back.out(1.3)" },
        "shellEnd-=0.7"
      );

      tl.fromTo(
        ".trainers-telemetry-2",
        { y: 30, opacity: 0, scale: 0.9 },
        { x: 0, y: 0, opacity: 1, scale: 1, duration: 1.0, ease: "back.out(1.3)" },
        "shellEnd-=0.55"
      );

      tl.fromTo(
        ".trainers-telemetry-3",
        { y: 30, opacity: 0, scale: 0.9 },
        { x: 0, y: 0, opacity: 1, scale: 1, duration: 1.0, ease: "back.out(1.3)" },
        "shellEnd-=0.4"
      );

      tl.fromTo(
        ".trainers-telemetry-4",
        { x: 30, y: 20, opacity: 0, scale: 0.9 },
        { x: 0, y: 0, opacity: 1, scale: 1, duration: 1.0, ease: "back.out(1.3)" },
        "shellEnd-=0.25"
      );

      // 6. Dynamic 0 -> Target Counter Interpolations
      // Metric 1: Total Coaches (0 -> targetCount)
      const counter1 = { count: 0 };
      const targetCount = Math.max(totalCoaches, 8);
      tl.fromTo(
        counter1,
        { count: 0 },
        {
          count: targetCount,
          duration: 2.4,
          ease: "power1.out",
          onStart: () => {
            if (totalCountRef.current) totalCountRef.current.textContent = "0";
          },
          onUpdate: () => {
            if (totalCountRef.current) {
              totalCountRef.current.textContent = Math.round(counter1.count);
            }
          },
        },
        "shellEnd-=0.6"
      );

      // Metric 2: Curated Specialties (0 -> 7)
      const counter2 = { count: 0 };
      tl.fromTo(
        counter2,
        { count: 0 },
        {
          count: 7,
          duration: 2.2,
          ease: "power1.out",
          onStart: () => {
            if (tracksCountRef.current) tracksCountRef.current.textContent = "0";
          },
          onUpdate: () => {
            if (tracksCountRef.current) {
              tracksCountRef.current.textContent = Math.round(counter2.count);
            }
          },
        },
        "shellEnd-=0.5"
      );

      // Metric 3: CSCS Certified (0 -> 100%)
      const counter3 = { count: 0 };
      tl.fromTo(
        counter3,
        { count: 0 },
        {
          count: 100,
          duration: 2.5,
          ease: "power1.out",
          onStart: () => {
            if (certifiedCountRef.current) certifiedCountRef.current.textContent = "0";
          },
          onUpdate: () => {
            if (certifiedCountRef.current) {
              certifiedCountRef.current.textContent = `${Math.round(counter3.count)}%`;
            }
          },
        },
        "shellEnd-=0.4"
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden pt-12 pb-12 sm:pt-16 sm:pb-16 border-b border-brand-500/15 bg-gradient-to-b from-brand-500/5 via-background to-background transition-colors duration-300"
    >
      {/* Ambient Radial Glow Meshes */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-72 bg-gradient-to-b from-active/10 via-brand-500/5 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="w-11/12 mx-auto relative z-10 text-center space-y-6 sm:space-y-8">
        
        {/* Kicker Badge */}
        <div>
          <div className="trainers-hero-kicker inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/25 text-[11px] font-extrabold uppercase tracking-widest text-foreground font-['Outfit'] shadow-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-active opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-active" />
            </span>
            <span>Accredited Athletic Faculty</span>
            <span className="text-secondary">•</span>
            <span className="text-active">Olympic &amp; CSCS Masters</span>
          </div>
        </div>

        {/* Main Headline */}
        <h1 className="trainers-hero-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold font-['Outfit'] text-foreground tracking-tight leading-[1.12] max-w-4xl mx-auto">
          World-Class Faculty.{" "}
          <span className="text-active inline-block hover:animate-[headShake_1s_ease-in-out] cursor-default">
            Uncompromising Standards.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="trainers-hero-desc text-sm sm:text-base lg:text-lg text-secondary font-['Inter'] leading-relaxed max-w-2xl mx-auto">
          Work with certified master coaches, exercise physiologists, and conditioning specialists dedicated to refining your biomechanics, power output, and long-term athletic transformation.
        </p>

        {/* ── High-Tech Athletic Telemetry HUD Strip ── */}
        <div className="trainers-telemetry-shell max-w-5xl mx-auto pt-2">
          <div className="relative rounded-3xl p-3 sm:p-4 bg-linear-to-b from-card-bg/95 via-card-bg/85 to-card-bg/95 dark:from-[#070F2B]/95 dark:via-[#0c1236]/90 dark:to-[#070F2B]/95 border border-brand-500/25 shadow-sm backdrop-blur-xl">
            {/* Top Subtle Neon Edge Line */}
            <div className="absolute top-0 left-1/4 right-1/4 h-[2px] bg-gradient-to-r from-transparent via-active/70 to-transparent pointer-events-none" />

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
              
              {/* Stat 1: Total Coaches */}
              <div className="trainers-telemetry-1 group relative p-3 sm:p-4 rounded-2xl bg-brand-500/5 dark:bg-[#1B1A55]/40 hover:bg-brand-500/10 dark:hover:bg-[#1B1A55]/60 border border-brand-500/20 hover:border-active/40 transition-all duration-300 shadow-2xs hover:shadow-xs flex items-center gap-3 text-left">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-active/15 text-active border border-active/25 flex items-center justify-center shrink-0 group-hover:scale-108 transition-transform duration-300 shadow-2xs">
                  <FiUsers className="w-5 h-5" />
                </div>
                <div className="min-w-0 font-['Outfit']">
                  <div className="flex items-baseline gap-0.5">
                    <span ref={totalCountRef} className="text-xl sm:text-2xl font-black text-foreground leading-none">
                      {totalCoaches || 8}
                    </span>
                    <span className="text-active font-black text-lg leading-none">+</span>
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-secondary font-bold uppercase tracking-wider mt-1 truncate font-['Inter']">
                    Master Coaches
                  </p>
                </div>
              </div>

              {/* Stat 2: Specialties */}
              <div className="trainers-telemetry-2 group relative p-3 sm:p-4 rounded-2xl bg-brand-500/5 dark:bg-[#1B1A55]/40 hover:bg-brand-500/10 dark:hover:bg-[#1B1A55]/60 border border-brand-500/20 hover:border-emerald-500/40 transition-all duration-300 shadow-2xs hover:shadow-xs flex items-center gap-3 text-left">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-emerald-500/15 text-emerald-500 dark:text-emerald-400 border border-emerald-500/25 flex items-center justify-center shrink-0 group-hover:scale-108 transition-transform duration-300 shadow-2xs">
                  <FiActivity className="w-5 h-5" />
                </div>
                <div className="min-w-0 font-['Outfit']">
                  <span ref={tracksCountRef} className="text-xl sm:text-2xl font-black text-foreground leading-none block">
                    7
                  </span>
                  <p className="text-[10px] sm:text-[11px] text-secondary font-bold uppercase tracking-wider mt-1 truncate font-['Inter']">
                    Specialties
                  </p>
                </div>
              </div>

              {/* Stat 3: 100% CSCS Masters */}
              <div className="trainers-telemetry-3 group relative p-3 sm:p-4 rounded-2xl bg-brand-500/5 dark:bg-[#1B1A55]/40 hover:bg-brand-500/10 dark:hover:bg-[#1B1A55]/60 border border-brand-500/20 hover:border-amber-500/40 transition-all duration-300 shadow-2xs hover:shadow-xs flex items-center gap-3 text-left">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-amber-500/15 text-amber-500 dark:text-amber-400 border border-amber-500/25 flex items-center justify-center shrink-0 group-hover:scale-108 transition-transform duration-300 shadow-2xs">
                  <FiAward className="w-5 h-5" />
                </div>
                <div className="min-w-0 font-['Outfit']">
                  <span ref={certifiedCountRef} className="text-xl sm:text-2xl font-black text-foreground leading-none block">
                    100%
                  </span>
                  <p className="text-[10px] sm:text-[11px] text-secondary font-bold uppercase tracking-wider mt-1 truncate font-['Inter']">
                    Certified Masters
                  </p>
                </div>
              </div>

              {/* Stat 4: Average Client Rating */}
              <div className="trainers-telemetry-4 group relative p-3 sm:p-4 rounded-2xl bg-brand-500/5 dark:bg-[#1B1A55]/40 hover:bg-brand-500/10 dark:hover:bg-[#1B1A55]/60 border border-brand-500/20 hover:border-cyan-500/40 transition-all duration-300 shadow-2xs hover:shadow-xs flex items-center gap-3 text-left">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-cyan-500/15 text-cyan-500 dark:text-cyan-400 border border-cyan-500/25 flex items-center justify-center shrink-0 group-hover:scale-108 transition-transform duration-300 shadow-2xs">
                  <FiStar className="w-5 h-5 fill-amber-400 text-amber-400" />
                </div>
                <div className="min-w-0 font-['Outfit']">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xl sm:text-2xl font-black text-foreground leading-none">
                      4.95
                    </span>
                    <FiCheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-secondary font-bold uppercase tracking-wider mt-1 truncate font-['Inter']">
                    Athlete Rating
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
