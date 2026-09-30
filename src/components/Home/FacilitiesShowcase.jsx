"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence, LayoutGroup, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}
import {
  FiArrowRight,
  FiCheckCircle,
  FiShield,
  FiMapPin,
  FiClock,
  FiMaximize2,
  FiZap
} from "react-icons/fi";
import { FaFire, FaDumbbell, FaWater, FaHeartbeat } from "react-icons/fa";

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
    badgeColor: "bg-active/10 text-active border-active/20",
    spec: "12 Custom Power Racks",
    temp: "Climate-Controlled 68°F",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000&auto=format&fit=crop",
    desc: "Equipped with certified 20kg IWF/IPF barbells, calibrated cast iron plates, chalk stands, and sound-dampening deadlift platforms designed for maximal load safety.",
    features: ["Calibrated Steel Plates", "Jerk Boxes & Chains", "Eleiko Open Trap Bars"]
  },
  {
    id: "cold-plunge",
    title: "Sub-Zero Cold Plunge & Contrast Suite",
    category: "Recovery & Hydrotherapy",
    badge: "Recovery Protocol",
    badgeColor: "bg-cyan-500/10 text-cyan-500 border-cyan-500/20",
    spec: "Continuous 38°F - 42°F",
    temp: "Commercial UV-C Sanitized",
    image: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=1000&auto=format&fit=crop",
    desc: "Triple-filtered sub-zero immersion baths engineered to clear metabolic waste, blunt systemic inflammation, and stimulate parasympathetic nervous restoration.",
    features: ["Digital Temperature Lock", "Breathwork Timers", "Cold-Warm Contrast Cycles"]
  },
  {
    id: "metcon-turf",
    title: "High-Velocity Turf & Ergometer Track",
    category: "Cardio & MetCon Turf",
    badge: "Endurance & Agility",
    badgeColor: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    spec: "35-Meter Prowler Sprint Lane",
    temp: "Biometric Heart-Rate Sync",
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1000&auto=format&fit=crop",
    desc: "Heavy-duty sprint turf flanked by Concept2 SkiErgs, BikeErgs, curved motorless treadmills, and dynamic prowler sleds for non-impact metabolic conditioning.",
    features: ["Woodway Curve Treadmills", "Torque Tank Sleds", "Interactive Heart Rate Wall"]
  },
  {
    id: "cedar-sauna",
    title: "Finnish Cedar & Infrared Saunas",
    category: "Recovery & Hydrotherapy",
    badge: "Longevity & Detox",
    badgeColor: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    spec: "Dual Far-Infrared & 195°F Dry Heat",
    temp: "Himalayan Salt Walls",
    image: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=1000&auto=format&fit=crop",
    desc: "Aromatic Scandinavian cedar wood saunas stimulating heat-shock proteins, vascular elasticity, and deep muscular relaxation following intense lifting sessions.",
    features: ["Eucalyptus Mist Diffusers", "Acoustic Noise Isolation", "Towel Service Included"]
  },
  {
    id: "inbody-lab",
    title: "InBody 570 Clinical Composition Lab",
    category: "Biometric Diagnostics",
    badge: "Clinical Precision",
    badgeColor: "bg-purple-500/10 text-purple-500 border-purple-500/20",
    spec: "Multi-Frequency BIA",
    temp: "99.2% Clinical Correlation",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1000&auto=format&fit=crop",
    desc: "State-of-the-art bioelectrical impedance analysis providing segmental lean muscle mass breakdown, visceral fat rating, and extracellular water ratios.",
    features: ["Segmental Lean Mass Printouts", "Visceral Fat Tracking", "Coach Review Session"]
  },
  {
    id: "combat-dojo",
    title: "Heavy Bag Dojo & Striking Arena",
    category: "Strength Arenas",
    badge: "Combat Conditioning",
    badgeColor: "bg-rose-500/10 text-rose-500 border-rose-500/20",
    spec: "Hydro-Shock Water Bags",
    temp: "Impact-Dampened Tatami",
    image: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=1000&auto=format&fit=crop",
    desc: "Dedicated combat floor with water-filled heavy bags that absorb joint impact while allowing athletes to practice rotational force and high-output boxing drills.",
    features: ["Aqua Training Heavy Bags", "Speed Bags & Double-Ends", "Certified Sparring Gloves"]
  }
];

// Universal Viewport Staged Delay & Element-by-Element Motion Variants (Family 4: Facility Cards)
const facilityGridContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.16, // Stagger sibling cards
    },
  },
};

// 1. Card Shell: Slow stately container entrance
const facilityCardVariants = {
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

// 2. Image Canvas: Slow gentle zoom settle with de-blur
const facilityImgVariants = {
  hidden: { scale: 1.15, filter: "blur(4px)" },
  visible: {
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 1.6, ease: [0.16, 1, 0.3, 1] },
  },
};

// 3. Badge: Horizontal spring slide from left
const facilityBadgeVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 140, damping: 20 },
  },
};

// 4. Category: Slide and align from top-right
const facilityCategoryVariants = {
  hidden: { opacity: 0, x: 25, y: -10 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 1.3, ease: [0.16, 1, 0.3, 1] },
  },
};

// 5. Spec Badge (Bottom-Left): Elastic spring pop from bottom-left
const facilitySpecVariants = {
  hidden: { opacity: 0, y: 18, x: -10, scale: 0.85 },
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 150, damping: 20 },
  },
};

// 6. Temp Badge (Bottom-Right): Contrasting spring pop from bottom-right
const facilityTempVariants = {
  hidden: { opacity: 0, y: 18, x: 10, scale: 0.85 },
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 140, damping: 20 },
  },
};

// 7. Card Title: Majestic upward rising sweep with de-blur into sharp focus
const facilityTitleVariants = {
  hidden: { opacity: 0, y: 22, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1] },
  },
};

// 8. Description: Contrasting downward glide from top under title
const facilityDescVariants = {
  hidden: { opacity: 0, y: -16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.3, ease: "easeOut" },
  },
};

// 9. Feature Checklist Container & Staggered Items
const facilityFeatureListVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const facilityFeatureItemVariants = {
  hidden: { opacity: 0, x: -14 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
  },
};

// 10. Card Footer Meta Text
const facilityMetaVariants = {
  hidden: { opacity: 0, x: -12 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1.2, ease: "easeOut" },
  },
};

// 11. Card Action Link (Explore Space): Diagonal spring pop from bottom-right
const facilityBtnVariants = {
  hidden: { opacity: 0, x: 14, y: 14, scale: 0.9 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 130, damping: 20 },
  },
};

// Filter Tabs Staggered Variants (Slowed & Staged)
const filterContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.5,
    },
  },
};

const filterItemVariants = {
  hidden: { opacity: 0, y: 18, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 160,
      damping: 22,
    },
  },
};

// Bottom Callout Banner Motion Variants (Cinematic Slow)
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

export default function FacilitiesShowcase() {
  const [activeCategory, setActiveCategory] = useState("All Amenities");
  const sectionRef = useRef(null);
  const facilitiesGridRef = useRef(null);
  const isFacilitiesInView = useInView(facilitiesGridRef, { once: true, amount: 0.15 });
  const [cardsTriggered, setCardsTriggered] = useState(false);

  // Counter Value Refs for dynamic 0 -> Target number count animation
  const hubsValRef = useRef(null);
  const sanitizedValRef = useRef(null);

  // Universal Staged Viewport Delay: Trigger transitions after 1.2s delay in screen viewport
  useEffect(() => {
    if (isFacilitiesInView) {
      const timer = setTimeout(() => {
        setCardsTriggered(true);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [isFacilitiesInView]);

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
        ".facilities-kicker",
        { y: -30, opacity: 0, filter: "blur(6px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.6, ease: "power2.out" }
      ).addLabel("kickerEnd");

      // 2. Main Title: Majestic upward rising sweep with de-blur (Slowed to 2.2s)
      tl.fromTo(
        ".facilities-title",
        { y: 45, opacity: 0, filter: "blur(8px)", scale: 0.96 },
        { y: 0, opacity: 1, filter: "blur(0px)", scale: 1, duration: 2.2, ease: "power3.out" },
        "kickerEnd-=0.4"
      ).addLabel("titleEnd");

      // 3. Section Description: Contrasting downward drop from above under title (Slowed to 1.8s)
      tl.fromTo(
        ".facilities-desc",
        { y: -30, opacity: 0, filter: "blur(5px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.8, ease: "power2.out" },
        "titleEnd-=0.3"
      );

      // 4. Quick Telemetry Box: Horizontal slide & pop from the right (Slowed to 1.8s)
      tl.fromTo(
        ".facilities-telemetry-box",
        { x: 45, opacity: 0, scale: 0.94 },
        { x: 0, opacity: 1, scale: 1, duration: 1.8, ease: "back.out(1.2)" },
        "titleEnd-=0.4"
      );

      // 5. Telemetry Number Counters: Mandatory 0 -> Target Count Animation (Slowed to 3.0s)
      const counterObj = { hubs: 0, sanitized: 0 };
      tl.fromTo(
        counterObj,
        { hubs: 0, sanitized: 0 },
        {
          hubs: 4,
          sanitized: 100,
          duration: 3.0,
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

  const filteredFacilities = useMemo(() => {
    if (activeCategory === "All Amenities") return FACILITIES;
    return FACILITIES.filter((f) => f.category === activeCategory);
  }, [activeCategory]);

  return (
    <section
      ref={sectionRef}
      className="py-20 lg:py-28 bg-background border-t border-brand-500/15 relative overflow-hidden transition-colors duration-300"
    >
      {/* Ambient Lighting Meshes */}
      <div className="absolute top-1/4 right-0 w-96 sm:w-140 h-96 sm:h-140 bg-active/6 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-0 w-80 sm:w-120 h-80 sm:h-120 bg-brand-500/8 rounded-full blur-[130px] pointer-events-none -z-10" />

      <div className="w-11/12 mx-auto relative z-10">

        {/* Section Header with Element-by-Element Triggered Transitions */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 sm:mb-16 gap-6 border-b border-brand-500/15 pb-8">
          <div className="max-w-2xl">
            {/* Tag 1: Kicker Badge */}
            <div className="facilities-kicker inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/25 mb-4 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-active opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-active" />
              </span>
              <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-widest text-foreground font-['Outfit']">
                World-Class Infrastructure
              </span>
              <span className="text-[11px] sm:text-xs text-brand-500/60 font-semibold">•</span>
              <span className="text-[11px] sm:text-xs font-semibold text-secondary font-['Inter']">
                45,000 Sq. Ft. Across 4 Hubs
              </span>
            </div>

            {/* Tag 2: Main Section Title */}
            <h2 className="facilities-title text-3xl sm:text-4xl md:text-5xl font-black font-['Outfit'] tracking-tight text-foreground leading-[1.15]">
              Engineered For Intensity,{" "}
              <span className="text-active inline-block hover:animate-[headShake_1s_ease-in-out]">
                Built For Recovery
              </span>
            </h2>

            {/* Tag 3: Description Paragraph */}
            <p className="facilities-desc mt-4 text-sm sm:text-base text-secondary font-['Inter'] leading-relaxed max-w-2xl">
              Step inside spaces designed without compromise. From Olympic-certified Eleiko barbells and curved treadmills to sub-zero cold plunge tubs and Finnish cedar saunas.
            </p>
          </div>

          {/* Tag 4 & 5: Quick Facility Metric Specs with Animated Numbers */}
          <div className="facilities-telemetry-box flex items-center gap-4 sm:gap-6 bg-[#535C91]/5 dark:bg-[#1B1A55]/50 p-4 rounded-2xl border border-brand-500/20 shrink-0 font-['Outfit'] self-start lg:self-end shadow-xs">
            <div>
              <p ref={hubsValRef} className="text-2xl font-black text-active tracking-tight">4</p>
              <p className="text-[10px] sm:text-xs text-secondary font-bold uppercase tracking-wider">
                Flagship Hubs
              </p>
            </div>
            <div className="h-8 w-px bg-brand-500/20" />
            <div>
              <p className="text-2xl font-black text-active tracking-tight">24/7</p>
              <p className="text-[10px] sm:text-xs text-secondary font-bold uppercase tracking-wider">
                Keyless Access
              </p>
            </div>
            <div className="h-8 w-px bg-brand-500/20" />
            <div>
              <p ref={sanitizedValRef} className="text-2xl font-black text-active tracking-tight">100%</p>
              <p className="text-[10px] sm:text-xs text-secondary font-bold uppercase tracking-wider">
                Sanitized Daily
              </p>
            </div>
          </div>
        </div>

        {/* Filter Options: Triggered Staggered Spring Entrance with Layout Indicator */}
        <LayoutGroup id="facilitiesFilterGroup">
          <motion.div
            variants={filterContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar select-none"
          >
            {CATEGORIES.map((category) => {
              const isActive = activeCategory === category;
              return (
                <motion.button
                  key={category}
                  variants={filterItemVariants}
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.96 }}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className="relative px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-tight whitespace-nowrap cursor-pointer shrink-0 transition-colors duration-200"
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeFacilityShowcaseTabPill"
                      className="absolute inset-0 bg-active rounded-xl shadow-md shadow-active/20"
                      transition={{ type: "spring", stiffness: 450, damping: 35 }}
                    />
                  )}
                  <span
                    className={`relative z-10 ${
                      isActive
                        ? "text-white"
                        : "text-secondary hover:text-foreground"
                    }`}
                  >
                    {category}
                  </span>
                </motion.button>
              );
            })}
          </motion.div>
        </LayoutGroup>

        {/* Facilities Grid with Universal Viewport Delay & Tag-by-Tag Transitions */}
        <motion.div
          ref={facilitiesGridRef}
          layout
          variants={facilityGridContainerVariants}
          initial="hidden"
          animate={cardsTriggered ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16"
        >
          <AnimatePresence mode="popLayout">
            {filteredFacilities.map((fac) => (
              <motion.div
                key={`${activeCategory}-${fac.id}`}
                layout
                initial="hidden"
                animate={cardsTriggered ? "visible" : "hidden"}
                exit={{ opacity: 0, scale: 0.94, y: 18, transition: { duration: 0.3 } }}
                variants={facilityCardVariants}
                className="group relative rounded-3xl overflow-hidden bg-white dark:bg-[#070F2B] border border-brand-500/20 hover:border-active/60 transition-all duration-300 ease-out hover:-translate-y-1.5 flex flex-col shadow-xs hover:shadow-md"
              >
                {/* Tag 1: Image Banner with Gentle Zoom & De-blur */}
                <div className="relative h-60 sm:h-64 overflow-hidden">
                  <motion.div variants={facilityImgVariants} className="w-full h-full relative">
                    <Image
                      src={fac.image}
                      alt={fac.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                    />
                  </motion.div>
                  <div className="absolute inset-0 bg-linear-to-t from-[#070F2B] via-[#070F2B]/40 to-transparent" />

                  {/* Tag 2 & 3: Top Badge & Category (Left & Right Vectors) */}
                  <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2">
                    <motion.span
                      variants={facilityBadgeVariants}
                      className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full border backdrop-blur-md ${fac.badgeColor}`}
                    >
                      {fac.badge}
                    </motion.span>
                    <motion.span
                      variants={facilityCategoryVariants}
                      className="px-2.5 py-1 rounded-full bg-background/85 dark:bg-[#1B1A55]/90 backdrop-blur-md border border-brand-500/20 text-foreground text-[10px] font-bold uppercase tracking-wider"
                    >
                      {fac.category}
                    </motion.span>
                  </div>

                  {/* Tag 4 & 5: Bottom Image Specs (Separate Spring Pops) */}
                  <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-xs font-['Inter']">
                    <motion.span
                      variants={facilitySpecVariants}
                      className="px-2.5 py-1 rounded-lg bg-active text-white font-extrabold text-[10px] uppercase tracking-wide shadow-2xs"
                    >
                      {fac.spec}
                    </motion.span>
                    <motion.span
                      variants={facilityTempVariants}
                      className="px-2.5 py-1 rounded-lg bg-background/85 dark:bg-[#1B1A55]/90 backdrop-blur-md border border-brand-500/20 text-foreground text-[10px] font-semibold"
                    >
                      {fac.temp}
                    </motion.span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-5">
                  <div>
                    {/* Tag 6: Card Title */}
                    <motion.h3
                      variants={facilityTitleVariants}
                      className="font-['Outfit'] text-lg sm:text-xl font-bold text-foreground group-hover:text-active transition-colors leading-tight"
                    >
                      {fac.title}
                    </motion.h3>

                    {/* Tag 7: Description Paragraph */}
                    <motion.p
                      variants={facilityDescVariants}
                      className="mt-2.5 font-['Inter'] text-xs sm:text-sm text-secondary leading-relaxed line-clamp-3"
                    >
                      {fac.desc}
                    </motion.p>

                    {/* Tag 8: Bullet Highlights (Staggered Checklist Items) */}
                    <motion.div
                      variants={facilityFeatureListVariants}
                      className="mt-4 pt-3.5 border-t border-brand-500/15 space-y-1.5 font-['Inter']"
                    >
                      {fac.features.map((feature, i) => (
                        <motion.div
                          key={i}
                          variants={facilityFeatureItemVariants}
                          className="flex items-center gap-2 text-xs text-foreground/90 font-medium"
                        >
                          <FiCheckCircle className="w-3.5 h-3.5 text-active shrink-0" />
                          <span>{feature}</span>
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>

                  {/* Tag 9 & 10: Card Action Link (Differentiated Left & Right Vectors) */}
                  <div className="pt-4 border-t border-brand-500/15 flex items-center justify-between text-xs font-['Inter']">
                    <motion.span
                      variants={facilityMetaVariants}
                      className="text-secondary font-semibold text-[11px]"
                    >
                      Included in All Full Tiers
                    </motion.span>
                    <motion.div variants={facilityBtnVariants}>
                      <Link
                        href="/facilities"
                        className="inline-flex items-center gap-1 font-bold text-active hover:underline cursor-pointer group-hover:translate-x-0.5 transition-transform"
                      >
                        <span>Explore Space</span>
                        <FiArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom Callout Banner: Clean, high-contrast, theme-harmonious conversion card */}
        <motion.div
          variants={calloutContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="rounded-3xl p-6 sm:p-8 bg-white dark:bg-[#070F2B] border border-brand-500/20 hover:border-active/40 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs transition-colors duration-300 relative overflow-hidden"
        >
          {/* Subtle Ambient Accent Shimmer */}
          <div className="absolute inset-0 bg-linear-to-r from-brand-500/5 via-transparent to-active/5 pointer-events-none" />

          <div className="flex items-center gap-4 relative z-10">
            <motion.div
              variants={calloutIconVariants}
              className="w-12 h-12 rounded-2xl bg-active/10 dark:bg-active/20 flex items-center justify-center text-active shrink-0 border border-active/25 shadow-2xs"
            >
              <FiMaximize2 className="w-6 h-6 text-active" />
            </motion.div>
            <div>
              <motion.h4
                variants={calloutTitleVariants}
                className="font-['Outfit'] text-lg sm:text-xl font-extrabold text-foreground"
              >
                Want to Experience Our Facilities in Person?
              </motion.h4>
              <motion.p
                variants={calloutDescVariants}
                className="font-['Inter'] text-xs sm:text-sm text-secondary mt-0.5"
              >
                Book a complimentary guided walkthrough with a coach or check real-time facility floorplans.
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
              <span>View Full Facilities Directory</span>
              <FiArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}

