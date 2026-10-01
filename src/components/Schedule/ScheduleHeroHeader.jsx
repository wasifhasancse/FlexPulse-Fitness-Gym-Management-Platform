"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FiCalendar } from "react-icons/fi";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ScheduleHeroHeader() {
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

      // 1. Kicker Badge: Downward drop with de-blur
      tl.fromTo(
        ".schedule-hero-kicker",
        { y: -24, opacity: 0, filter: "blur(6px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.0, ease: "power2.out" }
      ).addLabel("kickerEnd");

      // 2. Headline: Upward sweep with scale and de-blur
      tl.fromTo(
        ".schedule-hero-title",
        { y: 36, opacity: 0, filter: "blur(8px)", scale: 0.96 },
        { y: 0, opacity: 1, filter: "blur(0px)", scale: 1, duration: 1.3, ease: "power3.out" },
        "kickerEnd-=0.3"
      ).addLabel("titleEnd");

      // 3. Subtitle Description: Smooth glide with de-blur
      tl.fromTo(
        ".schedule-hero-desc",
        { y: 20, opacity: 0, filter: "blur(5px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.1, ease: "power2.out" },
        "titleEnd-=0.2"
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative pt-6 pb-2 text-center overflow-hidden"
    >
      {/* 1. Kicker Badge */}
      <div>
        <div className="schedule-hero-kicker inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/25 text-[11px] font-extrabold uppercase tracking-widest text-foreground font-['Outfit'] shadow-xs mb-4">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-active opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-active" />
          </span>
          <FiCalendar className="w-3.5 h-3.5 text-active" />
          <span>Master Class Timetable</span>
          <span className="text-secondary">•</span>
          <span className="text-active">7-Day Weekly Schedule</span>
        </div>
      </div>

      {/* 2. Main Title */}
      <h1 className="schedule-hero-title font-['Outfit'] text-3xl sm:text-5xl md:text-6xl font-black text-foreground tracking-tight max-w-4xl mx-auto leading-[1.12] mb-4">
        Plan Your Weekly{" "}
        <span className="text-active inline-block cursor-pointer transition-transform duration-300 hover:animate-[headShake_1s_ease-in-out]">
          Workout Routine
        </span>
      </h1>

      {/* 3. Description Subtitle */}
      <p className="schedule-hero-desc font-['Inter'] text-xs sm:text-sm md:text-base text-secondary max-w-2xl mx-auto leading-relaxed">
        From dawn high-intensity conditioning and Olympic barbell complexes to evening mobility flows,
        explore all scheduled sessions led by certified master coaches across our specialized athletic zones.
      </p>
    </section>
  );
}
