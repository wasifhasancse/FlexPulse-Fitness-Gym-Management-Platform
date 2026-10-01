"use client";

import { useState, useMemo, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  FiArrowRight,
  FiCheckCircle,
  FiShield,
  FiClock,
  FiMaximize2,
  FiZap,
  FiActivity
} from "react-icons/fi";
import { FaDumbbell, FaFire, FaWater } from "react-icons/fa";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const TRANSITION_EASE = [0.16, 1, 0.3, 1];

const CATEGORIES = [
  "All Amenities",
  "Strength Arenas",
  "Cardio & MetCon Turf",
  "Recovery & Hydrotherapy",
  "Biometric Diagnostics"
];

const FACILITIES = [
  {
    id: "eleiko-arena",
    title: "Eleiko Olympic Barbell Arena",
    category: "Strength Arenas",
    badge: "Competition Grade",
    badgeColor: "bg-active/15 text-active border-active/30",
    spec: "12 Custom Power Racks",
    temp: "Climate-Controlled 68°F",
    image: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=1200&auto=format&fit=crop",
    desc: "Equipped with certified 20kg IWF/IPF barbells, calibrated steel plates, chalk stands, and sound-dampening deadlift platforms designed for maximal load safety.",
    perks: [
      "Calibrated Eleiko competition barbells & steel plates",
      "Shock-absorbing acoustic vulcanized rubber flooring",
      "Adjustable safety straps & zero-friction roller j-cups",
      "Olympic lifting chalk reservoirs at every station"
    ]
  },
  {
    id: "metcon-turf",
    title: "High-Speed MetCon Sprint Turf",
    category: "Cardio & MetCon Turf",
    badge: "50-Meter Sprint Track",
    badgeColor: "bg-amber-500/15 text-amber-500 dark:text-amber-400 border-amber-500/30",
    spec: "Speed Sleds & Prowlers",
    temp: "High-Airflow 66°F",
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200&auto=format&fit=crop",
    desc: "A dedicated 50-meter indoor astroturf lane designed for sled drives, farmer carries, acceleration sprints, and anaerobic conditioning.",
    perks: [
      "Continuous 50m non-directional indoor turf lane",
      "Adjustable load push/pull steel sled prowlers",
      "Rogue battle ropes, sandbags, and slam balls",
      "Electronic wireless laser timing gate system"
    ]
  },
  {
    id: "contrast-plunge",
    title: "Thermal Plunge & Cold Hydrotherapy",
    category: "Recovery & Hydrotherapy",
    badge: "38°F Sub-Zero Plunges",
    badgeColor: "bg-cyan-500/15 text-cyan-500 dark:text-cyan-400 border-cyan-500/30",
    spec: "Twin Stainless Steel Tubs",
    temp: "Chilled 38°F / Hot 104°F",
    image: "https://images.unsplash.com/photo-1584824486509-112e4181ff6b?q=80&w=1200&auto=format&fit=crop",
    desc: "Continuous filtration cold immersion baths alongside hot mineral recovery tubs. Stimulate rapid vasoconstriction to clear lactic acid.",
    perks: [
      "Sub-40°F continuous ozone-filtered cold plunge baths",
      "Therapeutic hot soaking tub with Epsom minerals",
      "Automated UV sanitization between member sessions",
      "Dedicated breathwork pacing monitors & towels"
    ]
  },
  {
    id: "cedar-sauna",
    title: "Nordic Cedar Dry Sauna & Steam",
    category: "Recovery & Hydrotherapy",
    badge: "190°F Finnish Heat",
    badgeColor: "bg-rose-500/15 text-rose-500 dark:text-rose-400 border-rose-500/30",
    spec: "Nordic Wood & Volcanic Stones",
    temp: "Therapeutic 190°F",
    image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=1200&auto=format&fit=crop",
    desc: "Crafted from untreated Nordic cedar and heated by Finnish volcanic stones to trigger cardiovascular vasodilation and heat-shock protein release.",
    perks: [
      "Natural Finnish cedar aroma & volcanic rock stoves",
      "Infrared deep-spectrum heating panels",
      "Full spectrum chromotherapy ambient mood lighting",
      "Eucalyptus infused cold towel service"
    ]
  },
  {
    id: "biometric-lab",
    title: "Clinical InBody & VO2 Diagnostic Lab",
    category: "Biometric Diagnostics",
    badge: "Clinical Accuracy",
    badgeColor: "bg-purple-500/15 text-purple-500 dark:text-purple-400 border-purple-500/30",
    spec: "InBody 770 & Metamax VO2",
    temp: "A/C Diagnostic Room 70°F",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200&auto=format&fit=crop",
    desc: "State-of-the-art bioelectrical impedance analysis providing segmental lean muscle mass breakdown, visceral fat rating, and extracellular water ratios.",
    perks: [
      "Multi-frequency bioelectrical impedance 3D scan",
      "Segmental muscle distribution & visceral fat tracking",
      "Extracellular water & cellular phase angle diagnostic",
      "1-on-1 coach interpretation & caloric baseline plan"
    ]
  }
];

// ── Framer Motion Variants For Every Single Element ──
const filterContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.08 }
  }
};
const filterItemVariants = {
  hidden: { opacity: 0, y: 14, scale: 0.94 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 220, damping: 20 }
  }
};

const stageCardVariants = {
  hidden: { opacity: 0, y: 35, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1.1,
      ease: TRANSITION_EASE,
      staggerChildren: 0.07,
      delayChildren: 0.1
    }
  }
};
const stageImgVariants = {
  hidden: { opacity: 0, scale: 1.08 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.3, ease: TRANSITION_EASE }
  }
};
const stageBadgeVariants = {
  hidden: { opacity: 0, y: -16, scale: 0.88 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 210, damping: 20 }
  }
};
const stageCategoryVariants = {
  hidden: { opacity: 0, x: -16 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.9, ease: TRANSITION_EASE }
  }
};
const stageHeadingVariants = {
  hidden: { opacity: 0, y: 22, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.1, ease: TRANSITION_EASE }
  }
};
const stageDescVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.95, ease: "easeOut" }
  }
};
const stagePerkVariants = {
  hidden: { opacity: 0, x: -14 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.85, ease: TRANSITION_EASE }
  }
};
const stageBtnVariants = {
  hidden: { opacity: 0, y: 18, scale: 0.94 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 190, damping: 20 }
  }
};

const hubsContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.15 }
  }
};
const hubsHeaderVariants = {
  hidden: { opacity: 0, x: -16 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.9, ease: TRANSITION_EASE }
  }
};
const hubCardVariants = {
  hidden: { opacity: 0, y: 22, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 180,
      damping: 20,
      staggerChildren: 0.05
    }
  }
};
const hubThumbVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 220, damping: 20 }
  }
};
const hubInfoVariants = {
  hidden: { opacity: 0, x: -12 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};
const hubArrowVariants = {
  hidden: { opacity: 0, scale: 0.6, rotate: -45 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { type: "spring", stiffness: 240, damping: 18 }
  }
};
const guaranteeBannerVariants = {
  hidden: { opacity: 0, y: 22, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 180, damping: 20 }
  }
};

export default function FacilitiesShowcase() {
  const [activeCategory, setActiveCategory] = useState("All Amenities");
  const [activeFacilityId, setActiveFacilityId] = useState("eleiko-arena");
  const sectionRef = useRef(null);

  const hubsValRef = useRef(null);
  const sanitizedValRef = useRef(null);

  const filteredFacilities = useMemo(() => {
    if (activeCategory === "All Amenities") return FACILITIES;
    return FACILITIES.filter((f) => f.category === activeCategory);
  }, [activeCategory]);

  const activeFacility = useMemo(() => {
    const found = FACILITIES.find((f) => f.id === activeFacilityId);
    if (found && (activeCategory === "All Amenities" || found.category === activeCategory)) {
      return found;
    }
    return filteredFacilities[0] || FACILITIES[0];
  }, [activeFacilityId, activeCategory, filteredFacilities]);

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
        ".facilities-kicker",
        { y: -24, opacity: 0, filter: "blur(6px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.4, ease: "power2.out" }
      ).addLabel("kickerEnd");

      tl.fromTo(
        ".facilities-title",
        { y: 35, opacity: 0, filter: "blur(8px)", scale: 0.97 },
        { y: 0, opacity: 1, filter: "blur(0px)", scale: 1, duration: 1.8, ease: "power3.out" },
        "kickerEnd-=0.3"
      ).addLabel("titleEnd");

      tl.fromTo(
        ".facilities-desc",
        { y: -20, opacity: 0, filter: "blur(5px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.5, ease: "power2.out" },
        "titleEnd-=0.2"
      );

      const counterObj = { hubs: 0, sanitized: 0 };
      tl.fromTo(
        counterObj,
        { hubs: 0, sanitized: 0 },
        {
          hubs: 4,
          sanitized: 100,
          duration: 2.5,
          ease: "power1.out",
          onStart: () => {
            if (hubsValRef.current) hubsValRef.current.textContent = "0";
            if (sanitizedValRef.current) sanitizedValRef.current.textContent = "0%";
          },
          onUpdate: () => {
            if (hubsValRef.current) {
              hubsValRef.current.textContent = Math.round(counterObj.hubs);
            }
            if (sanitizedValRef.current) {
              sanitizedValRef.current.textContent = Math.round(counterObj.sanitized) + "%";
            }
          },
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
      <div className="w-11/12 mx-auto relative z-10 space-y-10">

        {/* ── Section Header Row with Triggered Entrance ── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="facilities-kicker inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/25 text-[11px] font-extrabold uppercase tracking-widest text-foreground font-['Outfit']">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-active opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-active" />
              </span>
              World-Class Infrastructure
            </div>

            <h2 className="facilities-title text-3xl sm:text-4xl lg:text-5xl font-extrabold font-['Outfit'] text-foreground tracking-tight leading-[1.12]">
              Engineered For Intensity,{" "}
              <span className="text-active inline-block hover:animate-[headShake_1s_ease-in-out]">
                Built For Recovery
              </span>
            </h2>

            <p className="facilities-desc text-sm sm:text-base text-secondary font-['Inter'] leading-relaxed">
              Step inside spaces designed without compromise. From Olympic Eleiko barbells and curved treadmills to sub-zero cold plunge tubs and Finnish cedar saunas.
            </p>
          </div>

          {/* Quick Telemetry Strip with Count-Up */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0 font-['Outfit']">
            <div className="px-4 py-3 rounded-2xl bg-brand-500/5 dark:bg-[#1B1A55]/30 border border-brand-500/15 text-center min-w-[90px]">
              <p ref={hubsValRef} className="text-2xl font-black text-active tracking-tight">4</p>
              <p className="text-[10px] text-secondary font-bold uppercase tracking-wider mt-0.5">Hubs</p>
            </div>
            <div className="px-4 py-3 rounded-2xl bg-brand-500/5 dark:bg-[#1B1A55]/30 border border-brand-500/15 text-center min-w-[90px]">
              <p className="text-2xl font-black text-active tracking-tight">24/7</p>
              <p className="text-[10px] text-secondary font-bold uppercase tracking-wider mt-0.5">Access</p>
            </div>
            <div className="px-4 py-3 rounded-2xl bg-brand-500/5 dark:bg-[#1B1A55]/30 border border-brand-500/15 text-center min-w-[90px]">
              <p ref={sanitizedValRef} className="text-2xl font-black text-active tracking-tight">100%</p>
              <p className="text-[10px] text-secondary font-bold uppercase tracking-wider mt-0.5">Sanitized</p>
            </div>
          </div>
        </div>

        {/* ── Interactive Category Filter Pills with Staggered Entrance ── */}
        <motion.div
          variants={filterContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar"
        >
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <motion.button
                key={cat}
                variants={filterItemVariants}
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? "bg-active text-white shadow-sm scale-102"
                    : "bg-brand-500/8 dark:bg-[#1B1A55]/40 text-secondary hover:text-foreground hover:bg-brand-500/15 border border-brand-500/15"
                }`}
              >
                {cat}
              </motion.button>
            );
          })}
        </motion.div>

        {/* ── The Featured Facility Panoramic Showcase Stage & Hubs Selector ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">

          {/* Left Hero Card (Panoramic Photo & Specs) — 7 cols */}
          <motion.div
            variants={stageCardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="lg:col-span-7 rounded-3xl overflow-hidden relative min-h-[380px] sm:min-h-[440px] flex flex-col justify-between p-6 sm:p-8 bg-[#070F2B] border border-brand-500/20 shadow-md group"
          >
            <motion.div variants={stageImgVariants} className="absolute inset-0">
              <Image
                src={activeFacility.image}
                alt={activeFacility.title}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-104"
                priority
              />
              {/* Vignette overlays */}
              <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-black/20" />
              <div className="absolute inset-0 bg-linear-to-r from-black/60 via-transparent to-transparent" />
            </motion.div>

            {/* Top Badges */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-2">
              <motion.span
                variants={stageBadgeVariants}
                className={`text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full border backdrop-blur-md ${activeFacility.badgeColor}`}
              >
                {activeFacility.badge}
              </motion.span>
              <motion.span
                variants={stageBadgeVariants}
                className="text-[11px] font-bold text-white/90 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/15"
              >
                {activeFacility.temp}
              </motion.span>
            </div>

            {/* Bottom Content with Element-by-Element Entrance */}
            <div className="relative z-10 space-y-4 pt-12">
              <div className="space-y-1.5">
                <motion.span
                  variants={stageCategoryVariants}
                  className="text-xs font-bold text-active uppercase tracking-widest font-['Outfit'] block"
                >
                  {activeFacility.category}
                </motion.span>
                <motion.h3
                  variants={stageHeadingVariants}
                  className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit'] tracking-tight"
                >
                  {activeFacility.title}
                </motion.h3>
                <motion.p
                  variants={stageDescVariants}
                  className="text-xs sm:text-sm text-gray-300 font-['Inter'] leading-relaxed max-w-xl"
                >
                  {activeFacility.desc}
                </motion.p>
              </div>

              {/* Perks Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-white/15">
                {activeFacility.perks.map((perk, idx) => (
                  <motion.div
                    key={idx}
                    variants={stagePerkVariants}
                    className="flex items-start gap-2"
                  >
                    <FiCheckCircle className="w-3.5 h-3.5 text-active mt-0.5 shrink-0" />
                    <span className="text-xs text-white/90 font-medium leading-snug">{perk}</span>
                  </motion.div>
                ))}
              </div>

              {/* Action Buttons */}
              <motion.div variants={stageBtnVariants} className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href="/facilities"
                  className="px-5 py-3 rounded-2xl bg-btn-bg text-btn-text hover:brightness-105 active:scale-95 font-extrabold text-xs shadow-sm hover:shadow-md transition-all cursor-pointer flex items-center gap-2 border border-white/20"
                >
                  <FiZap className="w-4 h-4 text-btn-text" />
                  <span>Book Facility Tour</span>
                </Link>
                <Link
                  href="/all-classes"
                  className="px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-bold text-xs border border-white/20 transition-all cursor-pointer flex items-center gap-2 group"
                >
                  <span>Explore Schedule</span>
                  <FiArrowRight className="w-3.5 h-3.5 text-active group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Selector List (Thumbnails of Other Hubs) — 5 cols */}
          <motion.div
            variants={hubsContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="lg:col-span-5 flex flex-col justify-between gap-3"
          >
            <div className="space-y-3">
              <motion.p
                variants={hubsHeaderVariants}
                className="text-xs font-extrabold uppercase tracking-widest text-secondary font-['Outfit'] px-1"
              >
                Explore Available Hubs ({filteredFacilities.length})
              </motion.p>
              <div className="space-y-3">
                {filteredFacilities.map((fac) => {
                  const isCurrent = fac.id === activeFacility.id;
                  return (
                    <motion.div
                      key={fac.id}
                      variants={hubCardVariants}
                      whileHover={{ scale: 1.015, x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setActiveFacilityId(fac.id)}
                      className={`group p-3.5 rounded-2xl border transition-all duration-300 flex items-center gap-4 cursor-pointer ${
                        isCurrent
                          ? "bg-brand-500/10 dark:bg-[#1B1A55]/40 border-active/60 shadow-sm"
                          : "bg-card-bg hover:bg-brand-500/5 border-brand-500/15 hover:border-brand-500/30"
                      }`}
                    >
                      <motion.div
                        variants={hubThumbVariants}
                        className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-brand-500/20"
                      >
                        <Image
                          src={fac.image}
                          alt={fac.title}
                          fill
                          sizes="64px"
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </motion.div>
                      <motion.div variants={hubInfoVariants} className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className={`text-[9px] font-extrabold uppercase tracking-wider px-1.5 py-0.5 rounded-md border ${fac.badgeColor}`}>
                            {fac.spec}
                          </span>
                        </div>
                        <h4 className={`text-sm font-bold font-['Outfit'] truncate transition-colors ${
                          isCurrent ? "text-active" : "text-foreground group-hover:text-active"
                        }`}>
                          {fac.title}
                        </h4>
                        <p className="text-[11px] text-secondary truncate mt-0.5">
                          {fac.category} • {fac.temp}
                        </p>
                      </motion.div>
                      <motion.div
                        variants={hubArrowVariants}
                        className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                          isCurrent ? "bg-active text-white" : "bg-brand-500/10 text-secondary group-hover:text-foreground"
                        }`}
                      >
                        <FiArrowRight className="w-3.5 h-3.5" />
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Guarantee Banner */}
            <motion.div
              variants={guaranteeBannerVariants}
              className="p-4 rounded-2xl bg-brand-500/5 dark:bg-[#1B1A55]/25 border border-brand-500/15 flex items-center justify-between gap-3 text-xs"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-active/10 text-active flex items-center justify-center shrink-0">
                  <FiShield className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-foreground">Clean Environment Protocol</p>
                  <p className="text-[11px] text-secondary">Hourly UV-C sanitation &amp; hospital-grade HVAC</p>
                </div>
              </div>
              <Link href="/facilities" className="font-extrabold text-active hover:underline shrink-0 text-xs">
                Learn More →
              </Link>
            </motion.div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
