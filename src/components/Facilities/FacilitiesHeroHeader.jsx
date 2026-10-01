"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FiCalendar, FiArrowRight, FiCompass, FiShield, FiActivity } from "react-icons/fi";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function FacilitiesHeroHeader({ onOpenTourModal }) {
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

      // 1. Kicker Badge: Downward entrance with de-blur
      tl.fromTo(
        ".facilities-hero-kicker",
        { y: -24, opacity: 0, filter: "blur(6px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.0, ease: "power2.out" }
      ).addLabel("kickerEnd");

      // 2. Headline: Upward sweep with scale and de-blur
      tl.fromTo(
        ".facilities-hero-title",
        { y: 36, opacity: 0, filter: "blur(8px)", scale: 0.96 },
        { y: 0, opacity: 1, filter: "blur(0px)", scale: 1, duration: 1.3, ease: "power3.out" },
        "kickerEnd-=0.3"
      ).addLabel("titleEnd");

      // 3. Subtitle Description: Smooth glide with de-blur
      tl.fromTo(
        ".facilities-hero-desc",
        { y: 20, opacity: 0, filter: "blur(5px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.1, ease: "power2.out" },
        "titleEnd-=0.2"
      ).addLabel("descEnd");

      // 4. Quick Action Buttons: Dynamic scale & rise
      tl.fromTo(
        ".facilities-hero-actions",
        { y: 20, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.9, ease: "back.out(1.4)" },
        "descEnd-=0.2"
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative pt-6 pb-2 text-center overflow-hidden"
    >
      {/* 1. Kicker Badge with Live Telemetry Beacon */}
      <div>
        <div className="facilities-hero-kicker inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/25 text-[11px] font-extrabold uppercase tracking-widest text-foreground font-['Outfit'] shadow-xs mb-4">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-active opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-active" />
          </span>
          <FiCompass className="w-3.5 h-3.5 text-active" />
          <span>FlexPulse Athletic Campus</span>
          <span className="text-secondary">•</span>
          <span className="text-active">25,000 SQ FT Infrastructure</span>
        </div>
      </div>

      {/* 2. Main Title */}
      <h1 className="facilities-hero-title font-['Outfit'] text-3xl sm:text-5xl md:text-6xl font-black text-foreground tracking-tight max-w-4xl mx-auto leading-[1.12] mb-4">
        Built for Elite{" "}
        <span className="text-active inline-block cursor-pointer transition-transform duration-300 hover:animate-[headShake_1s_ease-in-out]">
          Performance
        </span>
      </h1>

      {/* 3. Description Subtitle */}
      <p className="facilities-hero-desc font-['Inter'] text-xs sm:text-sm md:text-base text-secondary max-w-2xl mx-auto leading-relaxed mb-6">
        Competition-grade Olympic powerlifting decks, curved metabolic turf, infrared hot studios,
        and contrast hydrotherapy recovery spas engineered for serious athletic development.
      </p>

      {/* 4. Quick Action Buttons (Strict 3-Type Button Hierarchy) */}
      <div className="facilities-hero-actions flex flex-wrap items-center justify-center gap-3">
        {/* Type 1 Primary High-Voltage Athletic CTA */}
        <button
          type="button"
          onClick={onOpenTourModal}
          className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-btn-bg text-btn-text font-['Inter'] text-xs sm:text-sm font-black shadow-xs hover:shadow-md transition-all duration-300 overflow-hidden group hover:scale-102 cursor-pointer"
        >
          <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />
          <FiCalendar className="w-4 h-4 text-btn-text relative z-10" />
          <span className="relative z-10">Schedule VIP Walkthrough</span>
        </button>

        {/* Type 2 Secondary Glass Athletic CTA */}
        <Link
          href="/all-classes"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl border border-brand-500/25 bg-searchbox-bg hover:bg-searchbox-hover hover:border-active/60 text-foreground font-['Inter'] text-xs sm:text-sm font-bold transition-all shadow-2xs group"
        >
          <span>Explore Studio Classes</span>
          <FiArrowRight className="w-4 h-4 text-active group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </section>
  );
}
