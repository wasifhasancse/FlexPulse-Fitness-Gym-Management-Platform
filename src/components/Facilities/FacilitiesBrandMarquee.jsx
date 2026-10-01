"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FiAward } from "react-icons/fi";
import { FaCheckCircle } from "react-icons/fa";

const BRAND_PARTNERS_LANE1 = [
  {
    name: "ROGUE FITNESS",
    flag: "🇺🇸",
    origin: "USA",
    category: "Monster Rigs & Barbells",
    badge: "Official Strength Rig",
    monogram: "RG",
    color: "#ff1844",
  },
  {
    name: "ELEIKO",
    flag: "🇸🇪",
    origin: "SWEDEN",
    category: "IWF Certified Plates & Bars",
    badge: "Olympic Standard",
    monogram: "EL",
    color: "#0284c7",
  },
  {
    name: "TECHNOGYM",
    flag: "🇮🇹",
    origin: "ITALY",
    category: "Skillmill Curved Cardio",
    badge: "Biomechanics Lab",
    monogram: "TG",
    color: "#f59e0b",
  },
  {
    name: "CONCEPT2",
    flag: "🇺🇸",
    origin: "USA",
    category: "RowErg & SkiErg PM5",
    badge: "Ergometer Fleet",
    monogram: "C2",
    color: "#10b981",
  },
  {
    name: "BALANCED BODY",
    flag: "🇺🇸",
    origin: "USA",
    category: "Allegro 2 Reformers",
    badge: "Pilates Apparatus",
    monogram: "BB",
    color: "#8b5cf6",
  },
];

const BRAND_PARTNERS_LANE2 = [
  {
    name: "NORMATEC",
    flag: "🇺🇸",
    origin: "USA",
    category: "Pneumatic Compression Boots",
    badge: "Active Recovery",
    monogram: "NT",
    color: "#ec4899",
  },
  {
    name: "EVERLAST PRO",
    flag: "🇺🇸",
    origin: "USA",
    category: "Championship Boxing Rings",
    badge: "Combat Arena",
    monogram: "EV",
    color: "#ef4444",
  },
  {
    name: "DYSON PRO",
    flag: "🇬🇧",
    origin: "UK",
    category: "Supersonic Grooming Suites",
    badge: "Luxury Amenity",
    monogram: "DY",
    color: "#a855f7",
  },
  {
    name: "MYZONE",
    flag: "🇬🇧",
    origin: "UK",
    category: "Live Telemetry Projections",
    badge: "Biometric Heart Sync",
    monogram: "MZ",
    color: "#f97316",
  },
  {
    name: "TORQUE FITNESS",
    flag: "🇺🇸",
    origin: "USA",
    category: "Tank Magnetic Prowler Sleds",
    badge: "Conditioning Turf",
    monogram: "TF",
    color: "#14b8a6",
  },
];

export default function FacilitiesBrandMarquee() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.15 });

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="space-y-5 pt-2"
    >
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-active/30 bg-active/10 text-active font-['Inter'] text-[11px] font-bold uppercase tracking-wider">
          <FiAward className="w-3.5 h-3.5" />
          <span>Certified Equipment Heritage</span>
        </div>
        <h2 className="font-['Outfit'] text-2xl sm:text-3xl font-black text-foreground tracking-tight">
          Official Commercial Partnerships
        </h2>
        <p className="font-['Inter'] text-xs sm:text-sm text-secondary leading-relaxed">
          We exclusively commission competition-sanctioned hardware engineered by the globe&apos;s
          most prestigious athletic and biomedical manufacturers.
        </p>
      </div>

      <div className="space-y-3.5">
        {/* Lane 1: Heavy Hardware (Forward Scrolling Left) */}
        <div className="relative overflow-hidden rounded-3xl border border-brand-500/20 bg-brand-900/40 dark:bg-[#121026]/60 backdrop-blur-xl p-3.5 mask-marquee shadow-xs">
          <div className="animate-marquee-slow flex items-center gap-5 whitespace-nowrap">
            {[...BRAND_PARTNERS_LANE1, ...BRAND_PARTNERS_LANE1, ...BRAND_PARTNERS_LANE1].map((brand, idx) => (
              <div
                key={`partner-lane1-${idx}`}
                className="inline-flex items-center gap-4 px-5 py-3 rounded-2xl border border-brand-500/15 bg-card-bg/90 dark:bg-[#121026]/90 hover:border-active/60 transition-all duration-300 shadow-2xs group cursor-default"
              >
                {/* Brand Monogram Badge */}
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center font-black font-['Outfit'] text-sm tracking-wider shadow-inner text-white shrink-0 group-hover:scale-105 transition-transform"
                  style={{ backgroundColor: brand.color }}
                >
                  {brand.monogram}
                </div>

                <div className="space-y-0.5 font-['Inter']">
                  <div className="flex items-center gap-2">
                    <span className="font-['Outfit'] font-black text-sm text-foreground group-hover:text-active transition-colors">
                      {brand.name}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-brand-500/10 text-secondary text-[10px] font-bold">
                      {brand.flag} {brand.origin}
                    </span>
                  </div>
                  <div className="text-[11px] text-secondary font-medium">
                    {brand.category}
                  </div>
                  <div className="text-[10px] text-active font-semibold flex items-center gap-1">
                    <FaCheckCircle className="w-2.5 h-2.5" />
                    <span>{brand.badge}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lane 2: Recovery & Technology (Reverse Scrolling Right) */}
        <div className="relative overflow-hidden rounded-3xl border border-brand-500/20 bg-brand-900/40 dark:bg-[#121026]/60 backdrop-blur-xl p-3.5 mask-marquee shadow-xs">
          <div className="animate-marquee-reverse-slow flex items-center gap-5 whitespace-nowrap">
            {[...BRAND_PARTNERS_LANE2, ...BRAND_PARTNERS_LANE2, ...BRAND_PARTNERS_LANE2].map((brand, idx) => (
              <div
                key={`partner-lane2-${idx}`}
                className="inline-flex items-center gap-4 px-5 py-3 rounded-2xl border border-brand-500/15 bg-card-bg/90 dark:bg-[#121026]/90 hover:border-active/60 transition-all duration-300 shadow-2xs group cursor-default"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center font-black font-['Outfit'] text-sm tracking-wider shadow-inner text-white shrink-0 group-hover:scale-105 transition-transform"
                  style={{ backgroundColor: brand.color }}
                >
                  {brand.monogram}
                </div>

                <div className="space-y-0.5 font-['Inter']">
                  <div className="flex items-center gap-2">
                    <span className="font-['Outfit'] font-black text-sm text-foreground group-hover:text-active transition-colors">
                      {brand.name}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-brand-500/10 text-secondary text-[10px] font-bold">
                      {brand.flag} {brand.origin}
                    </span>
                  </div>
                  <div className="text-[11px] text-secondary font-medium">
                    {brand.category}
                  </div>
                  <div className="text-[10px] text-active font-semibold flex items-center gap-1">
                    <FaCheckCircle className="w-2.5 h-2.5" />
                    <span>{brand.badge}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
