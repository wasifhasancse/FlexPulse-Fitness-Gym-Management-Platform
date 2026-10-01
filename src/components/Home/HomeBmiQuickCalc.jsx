"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, LayoutGroup, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { 
  FiArrowRight, 
  FiActivity, 
  FiCheckCircle, 
  FiInfo, 
  FiZap, 
  FiSliders, 
  FiTrendingUp, 
  FiHeart,
  FiPlus,
  FiMinus,
  FiTarget,
  FiCompass,
  FiShield
} from "react-icons/fi";
import { FaFire } from "react-icons/fa";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const TRANSITION_EASE = [0.16, 1, 0.3, 1];

// Clinical reference presets for instant UX preview
const PRESET_TIERS = [
  {
    key: "under",
    label: "Underweight (<18.5)",
    range: "Below 18.5",
    sub: "Mass Accretion Needed",
    metricSample: { height: 180, weight: 56 },
    imperialSample: { ft: 5, in: 11, lbs: 124 },
    category: "Weights",
    discipline: "Olympic Weights & Hypertrophy",
    color: "text-amber-400",
    bgActive: "bg-amber-500/15 border-amber-500/40",
    dot: "bg-amber-400"
  },
  {
    key: "normal",
    label: "Optimal Fitness (18.5–24.9)",
    range: "18.5 – 24.9",
    sub: "Healthy Metabolic Balance",
    metricSample: { height: 178, weight: 72 },
    imperialSample: { ft: 5, in: 10, lbs: 158 },
    category: "Cardio",
    discipline: "Cardio & Hybrid Conditioning",
    color: "text-emerald-400",
    bgActive: "bg-emerald-500/15 border-emerald-500/40",
    dot: "bg-emerald-400"
  },
  {
    key: "over",
    label: "Overweight (25.0–29.9)",
    range: "25.0 – 29.9",
    sub: "Body Recomposition Needed",
    metricSample: { height: 175, weight: 86 },
    imperialSample: { ft: 5, in: 9, lbs: 190 },
    category: "Combat",
    discipline: "Combat Striking & High-Output MetCon",
    color: "text-orange-400",
    bgActive: "bg-orange-500/15 border-orange-500/40",
    dot: "bg-orange-400"
  },
  {
    key: "obese",
    label: "High-Density Tier (30.0+)",
    range: "30.0 & Above",
    sub: "Clinical & Joint Restoration",
    metricSample: { height: 172, weight: 98 },
    imperialSample: { ft: 5, in: 8, lbs: 216 },
    category: "Yoga",
    discipline: "Low-Impact Mobility & Functional Flow",
    color: "text-rose-500",
    bgActive: "bg-rose-500/15 border-rose-500/40",
    dot: "bg-rose-500"
  }
];

// Biometric Console Shell & Internal Elements (Universal Viewport Staged Delay)
const consoleShellVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

const consoleHeaderVariants = {
  hidden: { opacity: 0, y: 16, filter: "blur(3px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] },
  },
};

const unitSwitchVariants = {
  hidden: { opacity: 0, x: 25, scale: 0.9 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 160, damping: 20 },
  },
};

// Tab Content Container Variants with AnimatePresence
const tabContainerVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.1,
      delayChildren: 0.04,
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    scale: 0.98,
    transition: {
      duration: 0.22,
      ease: "easeInOut",
    },
  },
};

// Tag-by-tag micro-motion variants for tab elements
const tabItemSlideLeft = {
  hidden: { opacity: 0, x: -28, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
  exit: { opacity: 0, x: -16, transition: { duration: 0.18 } },
};

const tabItemSlideRight = {
  hidden: { opacity: 0, x: 28, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
  exit: { opacity: 0, x: 16, transition: { duration: 0.18 } },
};

const tabItemSlideUp = {
  hidden: { opacity: 0, y: 16, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 200, damping: 20 },
  },
  exit: { opacity: 0, y: -8, scale: 0.96, transition: { duration: 0.18 } },
};

const tabItemSlideDown = {
  hidden: { opacity: 0, y: -14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
  exit: { opacity: 0, y: 8, transition: { duration: 0.18 } },
};

const tabPillScale = {
  hidden: { opacity: 0, scale: 0.75 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 260, damping: 18 },
  },
};

const heightCardVariants = {
  hidden: { opacity: 0, x: -25 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1.3, ease: [0.16, 1, 0.3, 1] },
  },
};

const weightCardVariants = {
  hidden: { opacity: 0, x: 25 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1.3, ease: [0.16, 1, 0.3, 1] },
  },
};

const gaugeBarVariants = {
  hidden: { opacity: 0, y: 18, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] },
  },
};

const recommendationVariants = {
  hidden: { opacity: 0, scale: 0.92, y: 15 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 140, damping: 20 },
  },
};

const metricItemVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.94 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 150, damping: 20 },
  },
};

const consoleBtnVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 130, damping: 20 },
  },
};

export default function HomeBmiQuickCalc() {
  const [unit, setUnit] = useState("metric"); // "metric" | "imperial"
  const [weight, setWeight] = useState(74);
  const [heightCm, setHeightCm] = useState(178);
  const [heightFt, setHeightFt] = useState(5);
  const [heightIn, setHeightIn] = useState(10);
  const [weightLbs, setWeightLbs] = useState(163);

  const sectionRef = useRef(null);
  const consoleRef = useRef(null);
  const isConsoleInView = useInView(consoleRef, { once: true, amount: 0.1 });
  const [cardsTriggered, setCardsTriggered] = useState(false);
  const [hasAnimatedCount, setHasAnimatedCount] = useState(false);

  // Counter Value Refs for dynamic 0 -> Target number count animation
  const bmiDisplayRef = useRef(null);
  const bmrDisplayRef = useRef(null);

  // Universal Staged Viewport Delay: Trigger console transitions after 1.0s in screen viewport
  useEffect(() => {
    if (isConsoleInView) {
      const timer = setTimeout(() => {
        setCardsTriggered(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isConsoleInView]);

  // Synchronize metric and imperial upon tab toggle
  const handleUnitSwitch = (newUnit) => {
    if (newUnit === unit) return;
    if (newUnit === "imperial") {
      const totalInches = Math.round(Number(heightCm) / 2.54);
      setHeightFt(Math.floor(totalInches / 12));
      setHeightIn(totalInches % 12);
      setWeightLbs(Math.round(Number(weight) * 2.20462));
    } else {
      const totalInches = Number(heightFt) * 12 + Number(heightIn);
      setHeightCm(Math.round(totalInches * 2.54));
      setWeight(Math.round(Number(weightLbs) / 2.20462));
    }
    setUnit(newUnit);
  };

  // Instant preset loader when clicking reference table rows
  const handleApplyPreset = (tier) => {
    if (unit === "metric") {
      setHeightCm(tier.metricSample.height);
      setWeight(tier.metricSample.weight);
    } else {
      setHeightFt(tier.imperialSample.ft);
      setHeightIn(tier.imperialSample.in);
      setWeightLbs(tier.imperialSample.lbs);
    }
  };

  // BMI Calculation
  const bmi = useMemo(() => {
    let val = 0;
    if (unit === "metric") {
      const hM = Number(heightCm) / 100;
      if (hM > 0 && weight > 0) {
        val = Number(weight) / (hM * hM);
      }
    } else {
      const totalIn = Number(heightFt) * 12 + Number(heightIn);
      if (totalIn > 0 && weightLbs > 0) {
        val = (Number(weightLbs) / (totalIn * totalIn)) * 703;
      }
    }
    return val > 0 ? Number(val.toFixed(1)) : 0;
  }, [unit, weight, heightCm, heightFt, heightIn, weightLbs]);

  // Healthy weight range for current height
  const idealWeightRange = useMemo(() => {
    if (unit === "metric") {
      const hM = Number(heightCm) / 100;
      if (hM <= 0) return "58 - 78 kg";
      const min = (18.5 * hM * hM).toFixed(0);
      const max = (24.9 * hM * hM).toFixed(0);
      return `${min} – ${max} kg`;
    } else {
      const totalIn = Number(heightFt) * 12 + Number(heightIn);
      if (totalIn <= 0) return "130 - 172 lbs";
      const min = ((18.5 * totalIn * totalIn) / 703).toFixed(0);
      const max = ((24.9 * totalIn * totalIn) / 703).toFixed(0);
      return `${min} – ${max} lbs`;
    }
  }, [unit, heightCm, heightFt, heightIn]);

  // Estimated BMR (Basal Metabolic Rate in kcal)
  const estimatedBmr = useMemo(() => {
    let wKg = unit === "metric" ? Number(weight) : Number(weightLbs) / 2.20462;
    let hCm = unit === "metric" ? Number(heightCm) : (Number(heightFt) * 12 + Number(heightIn)) * 2.54;
    if (wKg <= 0 || hCm <= 0) return 1750;
    const bmr = Math.round(10 * wKg + 6.25 * hCm - 5 * 28 + 5);
    return Math.max(1200, bmr);
  }, [unit, weight, heightCm, heightFt, heightIn, weightLbs]);

  // GSAP Viewport-Triggered Timeline for Section Header & WHO Standards Box
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
        ".bmi-kicker",
        { y: -30, opacity: 0, filter: "blur(6px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.6, ease: "power2.out" }
      ).addLabel("kickerEnd");

      // 2. Main Title: Majestic upward rising sweep with de-blur (Slowed to 2.2s)
      tl.fromTo(
        ".bmi-title",
        { y: 45, opacity: 0, filter: "blur(8px)", scale: 0.96 },
        { y: 0, opacity: 1, filter: "blur(0px)", scale: 1, duration: 2.2, ease: "power3.out" },
        "kickerEnd-=0.4"
      ).addLabel("titleEnd");

      // 3. Section Description: Contrasting downward drop from above under title (Slowed to 1.8s)
      tl.fromTo(
        ".bmi-desc",
        { y: -30, opacity: 0, filter: "blur(5px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.8, ease: "power2.out" },
        "titleEnd-=0.3"
      );

      // 4. WHO Classification Standards Card: Slide & expand from left (Slowed to 1.6s)
      tl.fromTo(
        ".bmi-who-card",
        { x: -35, opacity: 0, scale: 0.96 },
        { x: 0, opacity: 1, scale: 1, duration: 1.6, ease: "back.out(1.2)" },
        "titleEnd-=0.4"
      );

      // 5. Preset Tier Rows: Staggered spring slide
      tl.fromTo(
        ".bmi-preset-row",
        { x: -20, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.2, ease: "power2.out", stagger: 0.08 },
        "titleEnd-=0.1"
      );

      // 6. Direct Action Link to Macro & TDEE Calculator: Spring pop up from bottom
      tl.fromTo(
        ".bmi-macro-banner",
        { y: 20, opacity: 0, scale: 0.96 },
        { y: 0, opacity: 1, scale: 1, duration: 1.4, ease: "back.out(1.3)" },
        "titleEnd+=0.1"
      );
    },
    { scope: sectionRef }
  );

  // Number Counter 0 -> Target Count Animation when Console is Triggered
  useEffect(() => {
    if (cardsTriggered && !hasAnimatedCount) {
      const counter = { bmiVal: 0, bmrVal: 0 };
      gsap.to(counter, {
        bmiVal: bmi,
        bmrVal: estimatedBmr,
        duration: 2.2,
        ease: "power2.out",
        onUpdate: () => {
          if (bmiDisplayRef.current) {
            bmiDisplayRef.current.textContent = counter.bmiVal.toFixed(1);
          }
          if (bmrDisplayRef.current) {
            bmrDisplayRef.current.textContent = Math.round(counter.bmrVal).toLocaleString();
          }
        },
        onComplete: () => {
          setHasAnimatedCount(true);
        },
      });
    }
  }, [cardsTriggered, hasAnimatedCount, bmi, estimatedBmr]);

  // Clinical Details & Matched Class Logic
  const currentStatus = useMemo(() => {
    if (bmi < 18.5) {
      return {
        key: "under",
        label: "Underweight",
        color: "text-amber-400",
        border: "border-amber-500/35",
        badgeBg: "bg-amber-500/15",
        advice: "Prioritize structured progressive overload barbell training paired with a healthy nutrient-dense caloric surplus.",
        recommendation: "Olympic Barbell & Muscle Hypertrophy",
        targetCategory: "Weights",
        categoryDescription: "Heavy resistance and progressive compound lifts designed to accelerate muscular hypertrophy and bone density.",
        targetSplit: "4x Strength / Week",
        caloricAdvice: "+300 to +500 kcal Surplus"
      };
    }
    if (bmi < 25) {
      return {
        key: "normal",
        label: "Optimal Athletic Baseline",
        color: "text-emerald-400",
        border: "border-emerald-500/35",
        badgeBg: "bg-emerald-500/15",
        advice: "Exceptional metabolic balance. Sustain high VO2 max cardiovascular density paired with functional strength splits.",
        recommendation: "Cardio Conditioning & Functional Agility",
        targetCategory: "Cardio",
        categoryDescription: "Dynamic interval choreography and lactate clearance circuits engineered to sustain peak aerobic power.",
        targetSplit: "3x Strength + 2x Aerobic",
        caloricAdvice: "Metabolic Maintenance"
      };
    }
    if (bmi < 30) {
      return {
        key: "over",
        label: "Overweight Baseline",
        color: "text-orange-400",
        border: "border-orange-500/35",
        badgeBg: "bg-orange-500/15",
        advice: "Focus on elevated energy expenditure through high-output combat velocity conditioning combined with compound lifting.",
        recommendation: "Combat Striking & Turf Conditioning",
        targetCategory: "Combat",
        categoryDescription: "High-metabolic kinetic striking and dynamic heavy-bag velocity drills to maximize caloric expenditure.",
        targetSplit: "3x High-Metabolic + 2x Resistance",
        caloricAdvice: "-350 to -500 kcal Deficit"
      };
    }
    return {
      key: "obese",
      label: "Clinical Care Tier",
      color: "text-rose-500",
      border: "border-rose-500/35",
      badgeBg: "bg-rose-500/15",
      advice: "Consult our certified athletic specialists for guided, low-impact joint conditioning, decompression flow, and aerobic base.",
      recommendation: "Vinyasa Mobility & Low-Impact Flow",
      targetCategory: "Yoga",
      categoryDescription: "Gentle breath-synchronized fascial release and core stability protocols designed to decompress joints and rebuild mobility.",
      targetSplit: "3x Mobility + 2x Zone-2 Cardio",
      caloricAdvice: "Supervised Caloric Control"
    };
  }, [bmi]);

  // Precise Gauge Pointer Position (0% to 100%)
  const gaugePercentage = useMemo(() => {
    if (bmi <= 0) return 0;
    if (bmi <= 18.5) {
      const pct = 4 + Math.max(0, ((bmi - 14) / 4.5) * 21);
      return Math.min(24, pct);
    }
    if (bmi <= 24.9) {
      return 25 + ((bmi - 18.5) / 6.4) * 25;
    }
    if (bmi <= 29.9) {
      return 50 + ((bmi - 25) / 4.9) * 25;
    }
    const pct = 75 + Math.min(1, (bmi - 30) / 10) * 21;
    return Math.min(96, pct);
  }, [bmi]);

  // URL generator for Advanced Macro Calculator pre-populated with user data
  const macroCalculatorUrl = useMemo(() => {
    const params = new URLSearchParams();
    params.set("tab", "macros");
    params.set("unit", unit);
    if (unit === "metric") {
      params.set("height", String(heightCm));
      params.set("weight", String(weight));
    } else {
      params.set("height", String(Number(heightFt) * 12 + Number(heightIn)));
      params.set("weight", String(weightLbs));
    }
    return `/calculator?${params.toString()}`;
  }, [unit, heightCm, weight, heightFt, heightIn, weightLbs]);

  // URL generator for filtered matched classes
  const matchedClassUrl = useMemo(() => {
    return `/all-classes?category=${encodeURIComponent(currentStatus.targetCategory)}`;
  }, [currentStatus.targetCategory]);


  return (
    <section
      ref={sectionRef}
      className="py-16 sm:py-20 lg:py-24 bg-background border-t border-brand-500/15 relative overflow-hidden transition-colors duration-300"
    >
      <div className="w-11/12 mx-auto relative z-10">
        {/* Contained Laboratory Biometric Console Deck */}
        <div className="rounded-3xl border border-brand-500/20 bg-card-bg/95 dark:bg-[#070F2B]/95 backdrop-blur-xl shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch">

          {/* ══ Column 1: Content — Kicker / Title / Desc / WHO Matrix / Link (LEFT 5 cols) ══ */}
          <div className="lg:col-span-5 bg-white dark:bg-[#070F2B] p-8 sm:p-10 lg:p-12 flex flex-col justify-between space-y-6 border-b lg:border-b-0 lg:border-r border-brand-500/15">

          {/* Kicker Badge */}
          <div className="bmi-kicker inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/25 backdrop-blur-md w-fit">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-active opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-active" />
            </span>
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-foreground font-['Outfit']">
              Instant Health Gauge
            </span>
            <span className="text-[11px] text-brand-500/60 font-semibold">•</span>
            <span className="text-[11px] font-semibold text-secondary font-['Inter']">
              Clinical BMI
            </span>
          </div>

          {/* Headline */}
          <h2 className="bmi-title text-3xl sm:text-4xl font-black font-['Outfit'] tracking-tight text-foreground leading-[1.15]">
            Know Your{" "}
            <span className="text-active inline-block hover:animate-[headShake_1s_ease-in-out]">
              BMI &amp; Physical Baseline
            </span>
          </h2>

          {/* Description */}
          <p className="bmi-desc text-sm text-secondary font-['Inter'] leading-relaxed">
            Body Mass Index (BMI) is a clinical baseline used by master trainers to evaluate physical readiness, calibrate training volume, and formulate individualized nutrition protocols.
          </p>

          {/* WHO Classification Matrix */}
          <div className="bmi-who-card rounded-2xl bg-brand-500/5 dark:bg-[#1B1A55]/30 p-4 space-y-2 font-['Inter']">
            <div className="flex items-center justify-between pb-2 border-b border-brand-500/10">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-foreground">
                WHO Classification
              </span>
              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-active/10 text-active uppercase">
                Click to Preview
              </span>
            </div>
            {PRESET_TIERS.map((tier) => {
              const isSelected = currentStatus.key === tier.key;
              return (
                <motion.button
                  key={tier.key}
                  type="button"
                  whileHover={{ scale: 1.015, x: 3 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleApplyPreset(tier)}
                  className={`bmi-preset-row w-full text-left p-2.5 rounded-xl flex items-center justify-between text-xs transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? `${tier.bgActive} shadow-xs`
                      : "bg-white/60 dark:bg-[#070F2B]/60 hover:bg-white dark:hover:bg-[#070F2B] border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${isSelected ? `${tier.dot} animate-pulse` : `${tier.dot}/40`}`} />
                    <div>
                      <p className="font-bold text-foreground text-[11px]">{tier.range}</p>
                      <p className={`text-[10px] ${isSelected ? tier.color : "text-secondary"}`}>{tier.label}</p>
                    </div>
                  </div>
                  {isSelected && (
                    <span className={`px-1.5 py-0.5 rounded text-[9px] font-extrabold uppercase bg-background/80 ${tier.color}`}>
                      Active
                    </span>
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Macro Link */}
          <div className="bmi-macro-banner">
            <Link
              href={macroCalculatorUrl}
              className="group p-3.5 rounded-2xl bg-brand-500/5 dark:bg-[#1B1A55]/30 hover:bg-brand-500/10 border border-brand-500/15 hover:border-active/40 transition-all duration-300 flex items-center justify-between gap-3 cursor-pointer"
            >
              <div className="space-y-0.5">
                <span className="text-[11px] font-bold text-foreground block group-hover:text-active transition-colors">
                  Calculate Macros, TDEE &amp; Calorie Burn
                </span>
                <span className="text-[10px] text-secondary block">
                  Pre-filled with your {unit === "metric" ? `${heightCm} cm & ${weight} kg` : `${heightFt}'${heightIn}" & ${weightLbs} lbs`} →
                </span>
              </div>
              <div className="w-7 h-7 rounded-lg bg-active text-white flex items-center justify-center shrink-0 group-hover:translate-x-1 transition-transform">
                <FiArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          </div>
        </div>

        {/* ══ Column 2: Interactive Biometric Console (RIGHT 7 cols) ══ */}
        <div className="lg:col-span-7 bg-[#535C91]/5 dark:bg-[#1B1A55]/20 p-8 sm:p-10 lg:p-12 flex flex-col justify-between">
          <motion.div
            ref={consoleRef}
            layout
            variants={consoleShellVariants}
            initial="hidden"
            animate={cardsTriggered ? "visible" : "hidden"}
            className="relative overflow-hidden space-y-0"
          >
            {/* Console Header */}
            <motion.div
              variants={consoleHeaderVariants}
              className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 mb-5 border-b border-brand-500/15 gap-4"
            >
              <div>
                <h3 className="font-['Outfit'] text-xl font-extrabold text-foreground">
                  Biometric Console
                </h3>
                <p className="text-[11px] text-secondary mt-0.5">
                  Adjust parameters for instant classification
                </p>
              </div>
              <motion.div variants={unitSwitchVariants}>
                <LayoutGroup id="bmiQuickCalcUnitGroup">
                  <div className="inline-flex items-center p-1 rounded-xl bg-white/60 dark:bg-[#070F2B]/60 border border-brand-500/15 font-['Inter'] text-xs font-extrabold shrink-0 whitespace-nowrap select-none">
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.94 }}
                      onClick={() => handleUnitSwitch("metric")}
                      className="relative px-3 py-1.5 rounded-lg transition-colors duration-200 cursor-pointer whitespace-nowrap inline-flex items-center gap-1"
                    >
                      {unit === "metric" && (
                        <motion.span
                          layoutId="activeBmiUnitTab"
                          className="absolute inset-0 bg-active rounded-lg shadow-xs"
                          transition={{ type: "spring", stiffness: 450, damping: 35 }}
                        />
                      )}
                      <motion.span
                        animate={{ scale: unit === "metric" ? 1.04 : 1 }}
                        transition={{ duration: 0.2 }}
                        className={`relative z-10 ${unit === "metric" ? "text-white font-black" : "text-secondary hover:text-foreground"}`}
                      >
                        Metric
                      </motion.span>
                    </motion.button>
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.94 }}
                      onClick={() => handleUnitSwitch("imperial")}
                      className="relative px-3 py-1.5 rounded-lg transition-colors duration-200 cursor-pointer whitespace-nowrap inline-flex items-center gap-1"
                    >
                      {unit === "imperial" && (
                        <motion.span
                          layoutId="activeBmiUnitTab"
                          className="absolute inset-0 bg-active rounded-lg shadow-xs"
                          transition={{ type: "spring", stiffness: 450, damping: 35 }}
                        />
                      )}
                      <motion.span
                        animate={{ scale: unit === "imperial" ? 1.04 : 1 }}
                        transition={{ duration: 0.2 }}
                        className={`relative z-10 ${unit === "imperial" ? "text-white font-black" : "text-secondary hover:text-foreground"}`}
                      >
                        Imperial
                      </motion.span>
                    </motion.button>
                  </div>
                </LayoutGroup>
              </motion.div>
            </motion.div>

            {/* Interactive Sliders & Results (existing inner JSX preserved below) */}
            <AnimatePresence mode="wait">
                {unit === "metric" ? (
                  <motion.div
                    key="metric-tab-panel"
                    variants={tabContainerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="space-y-6 font-['Inter'] mb-8"
                  >
                    {/* Height Controller (Metric) */}
                    <motion.div
                      variants={tabItemSlideLeft}
                      className="space-y-2.5 p-4 rounded-2xl bg-[#535C91]/5 dark:bg-[#1B1A55]/25 border border-brand-500/15 shadow-xs"
                    >
                      <div className="flex justify-between items-center">
                        <motion.span variants={tabItemSlideDown} className="text-xs uppercase font-extrabold tracking-wider text-foreground">
                          Stature / Height
                        </motion.span>
                        
                        {/* Stepper + Direct Display */}
                        <div className="flex items-center gap-2">
                          <motion.button
                            type="button"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setHeightCm((prev) => Math.max(120, prev - 1))}
                            className="w-7 h-7 rounded-lg bg-background border border-brand-500/20 hover:border-active flex items-center justify-center text-foreground hover:text-active transition-colors cursor-pointer shadow-2xs"
                            aria-label="Decrease height"
                          >
                            <FiMinus className="w-3.5 h-3.5" />
                          </motion.button>
                          <motion.div
                            variants={tabPillScale}
                            className="px-3 py-1 rounded-lg bg-background border border-brand-500/25 min-w-[75px] text-center font-['Outfit'] font-black text-active text-base shadow-2xs"
                          >
                            {heightCm} <span className="text-xs font-bold text-foreground">cm</span>
                          </motion.div>
                          <motion.button
                            type="button"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setHeightCm((prev) => Math.min(220, prev + 1))}
                            className="w-7 h-7 rounded-lg bg-background border border-brand-500/20 hover:border-active flex items-center justify-center text-foreground hover:text-active transition-colors cursor-pointer shadow-2xs"
                            aria-label="Increase height"
                          >
                            <FiPlus className="w-3.5 h-3.5" />
                          </motion.button>
                        </div>
                      </div>

                      <motion.input
                        variants={tabItemSlideUp}
                        type="range"
                        min="120"
                        max="220"
                        value={heightCm}
                        onChange={(e) => setHeightCm(Number(e.target.value))}
                        className="w-full h-2 bg-[#535C91]/25 rounded-lg appearance-none cursor-pointer accent-active"
                      />
                      <motion.div variants={tabItemSlideUp} className="flex justify-between text-[10px] text-[#535C91] dark:text-[#9290C3] font-semibold">
                        <span>120 cm (Min)</span>
                        <span>170 cm (Avg)</span>
                        <span>220 cm (Max)</span>
                      </motion.div>
                    </motion.div>

                    {/* Weight Controller (Metric) */}
                    <motion.div
                      variants={tabItemSlideRight}
                      className="space-y-2.5 p-4 rounded-2xl bg-[#535C91]/5 dark:bg-[#1B1A55]/25 border border-brand-500/15 shadow-xs"
                    >
                      <div className="flex justify-between items-center">
                        <motion.span variants={tabItemSlideDown} className="text-xs uppercase font-extrabold tracking-wider text-foreground">
                          Body Mass / Weight
                        </motion.span>

                        {/* Stepper + Direct Display */}
                        <div className="flex items-center gap-2">
                          <motion.button
                            type="button"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setWeight((prev) => Math.max(40, prev - 1))}
                            className="w-7 h-7 rounded-lg bg-background border border-brand-500/20 hover:border-active flex items-center justify-center text-foreground hover:text-active transition-colors cursor-pointer shadow-2xs"
                            aria-label="Decrease weight"
                          >
                            <FiMinus className="w-3.5 h-3.5" />
                          </motion.button>
                          <motion.div
                            variants={tabPillScale}
                            className="px-3 py-1 rounded-lg bg-background border border-brand-500/25 min-w-[75px] text-center font-['Outfit'] font-black text-active text-base shadow-2xs"
                          >
                            {weight} <span className="text-xs font-bold text-foreground">kg</span>
                          </motion.div>
                          <motion.button
                            type="button"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setWeight((prev) => Math.min(180, prev + 1))}
                            className="w-7 h-7 rounded-lg bg-background border border-brand-500/20 hover:border-active flex items-center justify-center text-foreground hover:text-active transition-colors cursor-pointer shadow-2xs"
                            aria-label="Increase weight"
                          >
                            <FiPlus className="w-3.5 h-3.5" />
                          </motion.button>
                        </div>
                      </div>

                      <motion.input
                        variants={tabItemSlideUp}
                        type="range"
                        min="40"
                        max="180"
                        value={weight}
                        onChange={(e) => setWeight(Number(e.target.value))}
                        className="w-full h-2 bg-[#535C91]/25 rounded-lg appearance-none cursor-pointer accent-active"
                      />
                      <motion.div variants={tabItemSlideUp} className="flex justify-between text-[10px] text-[#535C91] dark:text-[#9290C3] font-semibold">
                        <span>40 kg (Min)</span>
                        <span>75 kg (Avg)</span>
                        <span>180 kg (Max)</span>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="imperial-tab-panel"
                    variants={tabContainerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="space-y-6 font-['Inter'] mb-8"
                  >
                    {/* Imperial Height Controllers */}
                    <div className="grid grid-cols-2 gap-4">
                      {/* Feet */}
                      <motion.div
                        variants={tabItemSlideLeft}
                        className="space-y-2 p-3.5 rounded-2xl bg-[#535C91]/5 dark:bg-[#1B1A55]/25 border border-brand-500/15 shadow-xs"
                      >
                        <div className="flex justify-between items-center text-xs font-bold">
                          <motion.span variants={tabItemSlideDown} className="text-[#535C91] dark:text-[#9290C3] uppercase">
                            Feet
                          </motion.span>
                          <motion.span variants={tabPillScale} className="text-base font-extrabold font-['Outfit'] text-active">
                            {heightFt} ft
                          </motion.span>
                        </div>
                        <motion.input
                          variants={tabItemSlideUp}
                          type="range"
                          min="4"
                          max="7"
                          value={heightFt}
                          onChange={(e) => setHeightFt(Number(e.target.value))}
                          className="w-full h-2 bg-[#535C91]/25 rounded-lg appearance-none cursor-pointer accent-active"
                        />
                        <motion.div variants={tabItemSlideUp} className="flex justify-between text-[10px] text-[#535C91] dark:text-[#9290C3]">
                          <span>4 ft</span>
                          <span>7 ft</span>
                        </motion.div>
                      </motion.div>

                      {/* Inches */}
                      <motion.div
                        variants={tabItemSlideRight}
                        className="space-y-2 p-3.5 rounded-2xl bg-[#535C91]/5 dark:bg-[#1B1A55]/25 border border-brand-500/15 shadow-xs"
                      >
                        <div className="flex justify-between items-center text-xs font-bold">
                          <motion.span variants={tabItemSlideDown} className="text-[#535C91] dark:text-[#9290C3] uppercase">
                            Inches
                          </motion.span>
                          <motion.span variants={tabPillScale} className="text-base font-extrabold font-['Outfit'] text-active">
                            {heightIn} in
                          </motion.span>
                        </div>
                        <motion.input
                          variants={tabItemSlideUp}
                          type="range"
                          min="0"
                          max="11"
                          value={heightIn}
                          onChange={(e) => setHeightIn(Number(e.target.value))}
                          className="w-full h-2 bg-[#535C91]/25 rounded-lg appearance-none cursor-pointer accent-active"
                        />
                        <motion.div variants={tabItemSlideUp} className="flex justify-between text-[10px] text-[#535C91] dark:text-[#9290C3]">
                          <span>0 in</span>
                          <span>11 in</span>
                        </motion.div>
                      </motion.div>
                    </div>

                    {/* Weight Controller (Imperial) */}
                    <motion.div
                      variants={tabItemSlideUp}
                      className="space-y-2.5 p-4 rounded-2xl bg-[#535C91]/5 dark:bg-[#1B1A55]/25 border border-brand-500/15 shadow-xs"
                    >
                      <div className="flex justify-between items-center">
                        <motion.span variants={tabItemSlideDown} className="text-xs uppercase font-extrabold tracking-wider text-foreground">
                          Body Mass / Weight
                        </motion.span>

                        <div className="flex items-center gap-2">
                          <motion.button
                            type="button"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setWeightLbs((prev) => Math.max(90, prev - 2))}
                            className="w-7 h-7 rounded-lg bg-background border border-brand-500/20 hover:border-active flex items-center justify-center text-foreground hover:text-active transition-colors cursor-pointer shadow-2xs"
                            aria-label="Decrease weight"
                          >
                            <FiMinus className="w-3.5 h-3.5" />
                          </motion.button>
                          <motion.div
                            variants={tabPillScale}
                            className="px-3 py-1 rounded-lg bg-background border border-brand-500/25 min-w-[85px] text-center font-['Outfit'] font-black text-active text-base shadow-2xs"
                          >
                            {weightLbs} <span className="text-xs font-bold text-foreground">lbs</span>
                          </motion.div>
                          <motion.button
                            type="button"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setWeightLbs((prev) => Math.min(380, prev + 2))}
                            className="w-7 h-7 rounded-lg bg-background border border-brand-500/20 hover:border-active flex items-center justify-center text-foreground hover:text-active transition-colors cursor-pointer shadow-2xs"
                            aria-label="Increase weight"
                          >
                            <FiPlus className="w-3.5 h-3.5" />
                          </motion.button>
                        </div>
                      </div>

                      <motion.input
                        variants={tabItemSlideUp}
                        type="range"
                        min="90"
                        max="380"
                        value={weightLbs}
                        onChange={(e) => setWeightLbs(Number(e.target.value))}
                        className="w-full h-2 bg-[#535C91]/25 rounded-lg appearance-none cursor-pointer accent-active"
                      />
                      <motion.div variants={tabItemSlideUp} className="flex justify-between text-[10px] text-[#535C91] dark:text-[#9290C3] font-semibold">
                        <span>90 lbs (Min)</span>
                        <span>165 lbs (Avg)</span>
                        <span>380 lbs (Max)</span>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Dynamic Visual Gradient Spectrum Gauge Bar */}
              <motion.div
                variants={gaugeBarVariants}
                className="p-4 sm:p-5 rounded-2xl bg-[#535C91]/8 dark:bg-[#1B1A55]/40 border border-brand-500/20 mb-6"
              >
                <div className="flex justify-between items-center text-xs font-bold mb-2">
                  <span className="text-foreground">Clinical Spectrum Barometer</span>
                  <span className="text-active font-extrabold font-['Outfit'] text-sm">
                    BMI Score: <span ref={bmiDisplayRef}>{hasAnimatedCount ? bmi : "0.0"}</span>
                  </span>
                </div>

                {/* 4-Color Gradient Track with Subtle Segment Separators */}
                <div className="relative h-3.5 rounded-full overflow-hidden flex bg-linear-to-r from-amber-400 via-emerald-400 via-orange-400 to-rose-500 shadow-inner">
                  <div className="w-1/4 border-r border-black/20"></div>
                  <div className="w-1/4 border-r border-black/20"></div>
                  <div className="w-1/4 border-r border-black/20"></div>
                  <div className="w-1/4"></div>
                </div>

                {/* Sliding Needle Indicator with Dynamic Position */}
                <div className="relative h-5 mt-1">
                  <motion.div
                    animate={{ left: `${gaugePercentage}%` }}
                    transition={{ type: "spring", stiffness: 220, damping: 24 }}
                    className="absolute top-0 -translate-x-1/2 flex flex-col items-center"
                  >
                    <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[7px] border-b-active"></div>
                    <motion.span
                      key={bmi}
                      initial={{ scale: 0.7, opacity: 0.7 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 350, damping: 20 }}
                      className="text-[10px] font-black text-active font-['Outfit'] mt-0.5"
                    >
                      {bmi}
                    </motion.span>
                  </motion.div>
                </div>

                <div className="flex justify-between text-[10px] text-[#535C91] dark:text-[#9290C3] font-bold mt-1">
                  <span>Under (&lt;18.5)</span>
                  <span>Optimal (18.5-24.9)</span>
                  <span>Over (25-29.9)</span>
                  <span>High (30+)</span>
                </div>
              </motion.div>

              {/* Matched Training Recommendation Callout (Direct UX Fulfillment) */}
              <motion.div
                variants={recommendationVariants}
                className={`p-4 sm:p-5 rounded-2xl border ${currentStatus.border} bg-[#535C91]/5 dark:bg-[#1B1A55]/30 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all duration-300 shadow-xs`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider ${currentStatus.badgeBg} ${currentStatus.color}`}>
                      Matched Discipline Focus
                    </span>
                    <span className="text-xs font-extrabold text-foreground">
                      {currentStatus.recommendation}
                    </span>
                  </div>
                  <p className="text-xs text-[#535C91] dark:text-[#9290C3] leading-relaxed max-w-md">
                    {currentStatus.categoryDescription}
                  </p>
                </div>

                {/* WORKABLE BUTTON 1: Matched Classes Button with Category Filter */}
                <Link
                  href={matchedClassUrl}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-2xl bg-btn-bg text-btn-text hover:brightness-105 active:scale-95 font-extrabold text-xs tracking-tight shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0 group cursor-pointer border border-white/20"
                >
                  <FiZap className="w-3.5 h-3.5" />
                  <span>Find Matched Classes ({currentStatus.targetCategory})</span>
                  <FiArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>

              {/* 3 Key Diagnostic Metrics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-6 text-center sm:text-left">
                
                {/* Metric 1: Healthy Weight Range */}
                <motion.div
                  variants={metricItemVariants}
                  className="p-3.5 rounded-2xl bg-[#535C91]/5 dark:bg-[#1B1A55]/25 border border-brand-500/15 shadow-xs"
                >
                  <p className="text-[10px] text-[#535C91] dark:text-[#9290C3] uppercase font-bold tracking-wider">
                    Target Healthy Weight
                  </p>
                  <p className="text-base sm:text-lg font-black font-['Outfit'] text-foreground mt-0.5">
                    {idealWeightRange}
                  </p>
                  <p className="text-[10px] text-emerald-500 font-semibold mt-0.5">
                    Normal BMI (18.5–24.9)
                  </p>
                </motion.div>

                {/* Metric 2: Estimated BMR */}
                <motion.div
                  variants={metricItemVariants}
                  className="p-3.5 rounded-2xl bg-[#535C91]/5 dark:bg-[#1B1A55]/25 border border-brand-500/15 shadow-xs"
                >
                  <p className="text-[10px] text-[#535C91] dark:text-[#9290C3] uppercase font-bold tracking-wider">
                    Estimated BMR
                  </p>
                  <p className="text-base sm:text-lg font-black font-['Outfit'] text-foreground mt-0.5">
                    <span ref={bmrDisplayRef}>{hasAnimatedCount ? estimatedBmr.toLocaleString() : "0"}</span>{" "}
                    <span className="text-xs font-bold text-active">kcal/day</span>
                  </p>
                  <p className="text-[10px] text-[#535C91] dark:text-[#9290C3] mt-0.5">
                    Resting metabolic expenditure
                  </p>
                </motion.div>

                {/* Metric 3: Target Training Strategy */}
                <motion.div
                  variants={metricItemVariants}
                  className="p-3.5 rounded-2xl bg-[#535C91]/5 dark:bg-[#1B1A55]/25 border border-brand-500/15 shadow-xs"
                >
                  <p className="text-[10px] text-[#535C91] dark:text-[#9290C3] uppercase font-bold tracking-wider">
                    Caloric Strategy
                  </p>
                  <p className="text-xs sm:text-sm font-bold text-active mt-1">
                    {currentStatus.caloricAdvice}
                  </p>
                  <p className="text-[10px] text-[#535C91] dark:text-[#9290C3] mt-0.5">
                    {currentStatus.targetSplit}
                  </p>
                </motion.div>

              </div>

              {/* Action Buttons Row */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-brand-500/15">
                <Link
                  href={matchedClassUrl}
                  className="w-full sm:flex-1 py-3.5 px-5 rounded-2xl bg-btn-bg text-btn-text hover:brightness-105 active:scale-95 font-extrabold text-xs sm:text-sm text-center shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 border border-white/20"
                >
                  <FiActivity className="w-4 h-4 text-btn-text" />
                  <span>Find Matched Classes</span>
                </Link>

                <Link
                  href={macroCalculatorUrl}
                  className="w-full sm:flex-1 py-3.5 px-5 rounded-2xl bg-searchbox-bg hover:bg-searchbox-hover text-foreground font-bold text-xs sm:text-sm text-center border border-brand-500/25 hover:border-active/50 transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 group shadow-xs"
                >
                  <span>Advanced Macro Calculator</span>
                  <FiArrowRight className="w-4 h-4 text-active group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
