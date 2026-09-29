"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import AnimatedSectionTitle from "@/components/common/AnimatedSectionTitle";
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

export default function HomeBmiQuickCalc() {
  const [unit, setUnit] = useState("metric"); // "metric" | "imperial"
  const [weight, setWeight] = useState(74);
  const [heightCm, setHeightCm] = useState(178);
  const [heightFt, setHeightFt] = useState(5);
  const [heightIn, setHeightIn] = useState(10);
  const [weightLbs, setWeightLbs] = useState(163);

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
    <section className="py-20 lg:py-28 bg-linear-to-b from-background via-[#1B1A55]/10 to-background border-t border-brand-500/15 relative overflow-hidden transition-colors duration-300">
      {/* Background Ambient Lighting Mesh */}
      <div className="absolute top-1/4 left-1/10 w-96 sm:w-140 h-96 sm:h-140 bg-active/6 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-0 w-80 sm:w-120 h-80 sm:h-120 bg-brand-500/8 rounded-full blur-[130px] pointer-events-none -z-10" />

      <div className="w-11/12 mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14 items-start">
          
          {/* Left Column: Interactive WHO Spectrum Matrix & Actionable Entrypoints (5 cols) */}
          <motion.div layout className="lg:col-span-5 space-y-6">
            <AnimatedSectionTitle
              badge="Instant Health Gauge"
              badgeDetail="Clinical Biometrics"
              title="Know Your"
              highlightText="BMI & Physical Baseline"
              subtitle="Body Mass Index (BMI) is a clinical baseline utilized by master trainers to evaluate physical readiness, calibrate training volume, and formulate individualized nutrition protocols."
              titleKey={`bmi-heading-${unit}-${currentStatus.key}`}
            />

            {/* Interactive Clinical Spectrum Matrix with Clickable Presets */}
            <div className="rounded-3xl bg-white dark:bg-[#070F2B] border border-brand-500/20 p-5 shadow-lg space-y-2.5 font-['Inter']">
              <div className="flex items-center justify-between pb-2.5 border-b border-brand-500/15">
                <div>
                  <span className="text-xs font-extrabold uppercase tracking-wider text-foreground block">
                    WHO Classification Standards
                  </span>
                  <span className="text-[10px] text-[#535C91] dark:text-[#9290C3]">
                    Click any tier to preview calibrated baseline
                  </span>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#535C91]/10 text-active uppercase tracking-wider">
                  Interactive
                </span>
              </div>

              {/* Preset Tier Rows */}
              {PRESET_TIERS.map((tier) => {
                const isSelected = currentStatus.key === tier.key;
                return (
                  <button
                    key={tier.key}
                    type="button"
                    onClick={() => handleApplyPreset(tier)}
                    className={`w-full text-left p-3 rounded-2xl flex items-center justify-between text-xs transition-all duration-300 cursor-pointer ${
                      isSelected
                        ? `${tier.bgActive} shadow-sm scale-[1.01]`
                        : "bg-[#535C91]/5 dark:bg-[#1B1A55]/30 hover:bg-[#535C91]/10 border border-transparent"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className={`w-2.5 h-2.5 rounded-full ${isSelected ? `${tier.dot} animate-pulse` : `${tier.dot}/40`}`} />
                      <div>
                        <p className="font-bold text-foreground">{tier.range}</p>
                        <p className={`text-[11px] ${isSelected ? tier.color : "text-[#535C91] dark:text-[#9290C3]"}`}>
                          {tier.label}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {isSelected ? (
                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wide bg-background/80 ${tier.color}`}>
                          Active Match
                        </span>
                      ) : (
                        <span className="text-[10px] text-[#535C91] dark:text-[#9290C3] opacity-60">
                          Try Preset →
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Direct Action Link to Macro & TDEE Calculator */}
            <div className="pt-1">
              <Link
                href={macroCalculatorUrl}
                className="group p-4 rounded-2xl bg-linear-to-r from-active/10 via-[#1B1A55]/20 to-active/10 border border-brand-500/25 hover:border-active transition-all duration-300 flex items-center justify-between gap-4 shadow-sm hover:animate__animated hover:animate__pulse"
              >
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-foreground block group-hover:text-active transition-colors">
                    Calculate Exact Macros, TDEE & Target Calorie Burn
                  </span>
                  <span className="text-[11px] text-[#535C91] dark:text-[#9290C3] block">
                    Pre-populated with your {unit === "metric" ? `${heightCm} cm & ${weight} kg` : `${heightFt}'${heightIn}" & ${weightLbs} lbs`} data →
                  </span>
                </div>
                <div className="w-8 h-8 rounded-xl bg-active text-white flex items-center justify-center shrink-0 group-hover:translate-x-1 transition-transform">
                  <FiArrowRight className="w-4 h-4" />
                </div>
              </Link>
            </div>

          </motion.div>

          {/* Right Column: Interactive Biometric Console & Real-time Action Matching (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-6 sm:p-8 lg:p-10 rounded-3xl bg-white dark:bg-[#070F2B] border border-brand-500/20 shadow-2xl relative overflow-hidden">
              
              {/* Console Top Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-brand-500/15 gap-4">
                <div>
                  <h3 className="font-['Outfit'] text-2xl font-extrabold text-foreground">
                    Biometric Console
                  </h3>
                  <p className="text-xs text-[#535C91] dark:text-[#9290C3] mt-0.5">
                    Adjust biometric parameters to view immediate physiological classification
                  </p>
                </div>

                {/* Metric / Imperial Segmented Controller - Single Line Pill Design with Motion Layout Animation */}
                <LayoutGroup id="bmiQuickCalcUnitGroup">
                  <div className="inline-flex items-center p-1 rounded-2xl bg-[#535C91]/10 dark:bg-[#1B1A55]/80 border border-brand-500/20 font-['Inter'] text-xs font-extrabold shrink-0 whitespace-nowrap select-none shadow-xs">
                    <button
                      type="button"
                      onClick={() => handleUnitSwitch("metric")}
                      className="relative px-4 py-2 rounded-xl transition-colors duration-200 cursor-pointer whitespace-nowrap inline-flex items-center gap-1.5"
                    >
                      {unit === "metric" && (
                        <motion.span
                          layoutId="activeBmiUnitTab"
                          className="absolute inset-0 bg-active rounded-xl shadow-xs"
                          transition={{ type: "spring", stiffness: 450, damping: 35 }}
                        />
                      )}
                      <span className={`relative z-10 ${unit === "metric" ? "text-white font-black" : "text-[#535C91] dark:text-[#9290C3] hover:text-foreground"}`}>
                        Metric
                      </span>
                      <span className={`relative z-10 text-[11px] font-semibold ${unit === "metric" ? "text-white/85" : "text-[#535C91]/70 dark:text-[#9290C3]/70"}`}>
                        (kg/cm)
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleUnitSwitch("imperial")}
                      className="relative px-4 py-2 rounded-xl transition-colors duration-200 cursor-pointer whitespace-nowrap inline-flex items-center gap-1.5"
                    >
                      {unit === "imperial" && (
                        <motion.span
                          layoutId="activeBmiUnitTab"
                          className="absolute inset-0 bg-active rounded-xl shadow-xs"
                          transition={{ type: "spring", stiffness: 450, damping: 35 }}
                        />
                      )}
                      <span className={`relative z-10 ${unit === "imperial" ? "text-white font-black" : "text-[#535C91] dark:text-[#9290C3] hover:text-foreground"}`}>
                        Imperial
                      </span>
                      <span className={`relative z-10 text-[11px] font-semibold ${unit === "imperial" ? "text-white/85" : "text-[#535C91]/70 dark:text-[#9290C3]/70"}`}>
                        (lbs/ft)
                      </span>
                    </button>
                  </div>
                </LayoutGroup>
              </div>

              {/* Interactive Precision Sliders & Steppers (UX-focused) */}
              <div className="space-y-6 font-['Inter'] mb-8">
                {unit === "metric" ? (
                  <>
                    {/* Height Controller (Metric) */}
                    <div className="space-y-2.5 p-4 rounded-2xl bg-[#535C91]/5 dark:bg-[#1B1A55]/25 border border-brand-500/15">
                      <div className="flex justify-between items-center">
                        <span className="text-xs uppercase font-extrabold tracking-wider text-foreground">
                          Stature / Height
                        </span>
                        
                        {/* Stepper + Direct Display */}
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setHeightCm((prev) => Math.max(120, prev - 1))}
                            className="w-7 h-7 rounded-lg bg-background border border-brand-500/20 hover:border-active flex items-center justify-center text-foreground hover:text-active transition-colors cursor-pointer"
                            aria-label="Decrease height"
                          >
                            <FiMinus className="w-3.5 h-3.5" />
                          </button>
                          <div className="px-3 py-1 rounded-lg bg-background border border-brand-500/25 min-w-[75px] text-center font-['Outfit'] font-black text-active text-base">
                            {heightCm} <span className="text-xs font-bold text-foreground">cm</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => setHeightCm((prev) => Math.min(220, prev + 1))}
                            className="w-7 h-7 rounded-lg bg-background border border-brand-500/20 hover:border-active flex items-center justify-center text-foreground hover:text-active transition-colors cursor-pointer"
                            aria-label="Increase height"
                          >
                            <FiPlus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <input
                        type="range"
                        min="120"
                        max="220"
                        value={heightCm}
                        onChange={(e) => setHeightCm(Number(e.target.value))}
                        className="w-full h-2 bg-[#535C91]/25 rounded-lg appearance-none cursor-pointer accent-active"
                      />
                      <div className="flex justify-between text-[10px] text-[#535C91] dark:text-[#9290C3] font-semibold">
                        <span>120 cm (Min)</span>
                        <span>170 cm (Avg)</span>
                        <span>220 cm (Max)</span>
                      </div>
                    </div>

                    {/* Weight Controller (Metric) */}
                    <div className="space-y-2.5 p-4 rounded-2xl bg-[#535C91]/5 dark:bg-[#1B1A55]/25 border border-brand-500/15">
                      <div className="flex justify-between items-center">
                        <span className="text-xs uppercase font-extrabold tracking-wider text-foreground">
                          Body Mass / Weight
                        </span>

                        {/* Stepper + Direct Display */}
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setWeight((prev) => Math.max(40, prev - 1))}
                            className="w-7 h-7 rounded-lg bg-background border border-brand-500/20 hover:border-active flex items-center justify-center text-foreground hover:text-active transition-colors cursor-pointer"
                            aria-label="Decrease weight"
                          >
                            <FiMinus className="w-3.5 h-3.5" />
                          </button>
                          <div className="px-3 py-1 rounded-lg bg-background border border-brand-500/25 min-w-[75px] text-center font-['Outfit'] font-black text-active text-base">
                            {weight} <span className="text-xs font-bold text-foreground">kg</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => setWeight((prev) => Math.min(180, prev + 1))}
                            className="w-7 h-7 rounded-lg bg-background border border-brand-500/20 hover:border-active flex items-center justify-center text-foreground hover:text-active transition-colors cursor-pointer"
                            aria-label="Increase weight"
                          >
                            <FiPlus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <input
                        type="range"
                        min="40"
                        max="180"
                        value={weight}
                        onChange={(e) => setWeight(Number(e.target.value))}
                        className="w-full h-2 bg-[#535C91]/25 rounded-lg appearance-none cursor-pointer accent-active"
                      />
                      <div className="flex justify-between text-[10px] text-[#535C91] dark:text-[#9290C3] font-semibold">
                        <span>40 kg (Min)</span>
                        <span>75 kg (Avg)</span>
                        <span>180 kg (Max)</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Imperial Height Controllers */}
                    <div className="grid grid-cols-2 gap-4">
                      {/* Feet */}
                      <div className="space-y-2 p-3.5 rounded-2xl bg-[#535C91]/5 dark:bg-[#1B1A55]/25 border border-brand-500/15">
                        <div className="flex justify-between items-center text-xs font-bold">
                          <span className="text-[#535C91] dark:text-[#9290C3] uppercase">Feet</span>
                          <span className="text-base font-extrabold font-['Outfit'] text-active">{heightFt} ft</span>
                        </div>
                        <input
                          type="range"
                          min="4"
                          max="7"
                          value={heightFt}
                          onChange={(e) => setHeightFt(Number(e.target.value))}
                          className="w-full h-2 bg-[#535C91]/25 rounded-lg appearance-none cursor-pointer accent-active"
                        />
                        <div className="flex justify-between text-[10px] text-[#535C91] dark:text-[#9290C3]">
                          <span>4 ft</span>
                          <span>7 ft</span>
                        </div>
                      </div>

                      {/* Inches */}
                      <div className="space-y-2 p-3.5 rounded-2xl bg-[#535C91]/5 dark:bg-[#1B1A55]/25 border border-brand-500/15">
                        <div className="flex justify-between items-center text-xs font-bold">
                          <span className="text-[#535C91] dark:text-[#9290C3] uppercase">Inches</span>
                          <span className="text-base font-extrabold font-['Outfit'] text-active">{heightIn} in</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="11"
                          value={heightIn}
                          onChange={(e) => setHeightIn(Number(e.target.value))}
                          className="w-full h-2 bg-[#535C91]/25 rounded-lg appearance-none cursor-pointer accent-active"
                        />
                        <div className="flex justify-between text-[10px] text-[#535C91] dark:text-[#9290C3]">
                          <span>0 in</span>
                          <span>11 in</span>
                        </div>
                      </div>
                    </div>

                    {/* Weight Controller (Imperial) */}
                    <div className="space-y-2.5 p-4 rounded-2xl bg-[#535C91]/5 dark:bg-[#1B1A55]/25 border border-brand-500/15">
                      <div className="flex justify-between items-center">
                        <span className="text-xs uppercase font-extrabold tracking-wider text-foreground">
                          Body Mass / Weight
                        </span>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setWeightLbs((prev) => Math.max(90, prev - 2))}
                            className="w-7 h-7 rounded-lg bg-background border border-brand-500/20 hover:border-active flex items-center justify-center text-foreground hover:text-active transition-colors cursor-pointer"
                          >
                            <FiMinus className="w-3.5 h-3.5" />
                          </button>
                          <div className="px-3 py-1 rounded-lg bg-background border border-brand-500/25 min-w-[85px] text-center font-['Outfit'] font-black text-active text-base">
                            {weightLbs} <span className="text-xs font-bold text-foreground">lbs</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => setWeightLbs((prev) => Math.min(380, prev + 2))}
                            className="w-7 h-7 rounded-lg bg-background border border-brand-500/20 hover:border-active flex items-center justify-center text-foreground hover:text-active transition-colors cursor-pointer"
                          >
                            <FiPlus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <input
                        type="range"
                        min="90"
                        max="380"
                        value={weightLbs}
                        onChange={(e) => setWeightLbs(Number(e.target.value))}
                        className="w-full h-2 bg-[#535C91]/25 rounded-lg appearance-none cursor-pointer accent-active"
                      />
                      <div className="flex justify-between text-[10px] text-[#535C91] dark:text-[#9290C3] font-semibold">
                        <span>90 lbs (Min)</span>
                        <span>165 lbs (Avg)</span>
                        <span>380 lbs (Max)</span>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Dynamic Visual Gradient Spectrum Gauge Bar */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#535C91]/8 dark:bg-[#1B1A55]/40 border border-brand-500/20 mb-6">
                <div className="flex justify-between items-center text-xs font-bold mb-2">
                  <span className="text-foreground">Clinical Spectrum Barometer</span>
                  <span className="text-active font-extrabold font-['Outfit'] text-sm">
                    BMI Score: {bmi}
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
                  <div
                    className="absolute top-0 -translate-x-1/2 transition-all duration-300 ease-out flex flex-col items-center"
                    style={{ left: `${gaugePercentage}%` }}
                  >
                    <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[7px] border-b-active"></div>
                    <span className="text-[10px] font-black text-active font-['Outfit'] mt-0.5">
                      {bmi}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between text-[10px] text-[#535C91] dark:text-[#9290C3] font-bold mt-1">
                  <span>Under (&lt;18.5)</span>
                  <span>Optimal (18.5-24.9)</span>
                  <span>Over (25-29.9)</span>
                  <span>High (30+)</span>
                </div>
              </div>

              {/* Matched Training Recommendation Callout (Direct UX Fulfillment) */}
              <div className={`p-4 sm:p-5 rounded-2xl border ${currentStatus.border} bg-[#535C91]/5 dark:bg-[#1B1A55]/30 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all duration-300 shadow-sm`}>
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
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-active text-white hover:opacity-95 font-extrabold text-xs tracking-tight shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0 group cursor-pointer hover:animate__animated hover:animate__pulse"
                >
                  <FiZap className="w-3.5 h-3.5" />
                  <span>Find Matched Classes ({currentStatus.targetCategory})</span>
                  <FiArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* 3 Key Diagnostic Metrics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-6 text-center sm:text-left">
                
                {/* Metric 1: Healthy Weight Range */}
                <div className="p-3.5 rounded-2xl bg-[#535C91]/5 dark:bg-[#1B1A55]/25 border border-brand-500/15">
                  <p className="text-[10px] text-[#535C91] dark:text-[#9290C3] uppercase font-bold tracking-wider">
                    Target Healthy Weight
                  </p>
                  <p className="text-base sm:text-lg font-black font-['Outfit'] text-foreground mt-0.5">
                    {idealWeightRange}
                  </p>
                  <p className="text-[10px] text-emerald-500 font-semibold mt-0.5">
                    Normal BMI (18.5–24.9)
                  </p>
                </div>

                {/* Metric 2: Estimated BMR */}
                <div className="p-3.5 rounded-2xl bg-[#535C91]/5 dark:bg-[#1B1A55]/25 border border-brand-500/15">
                  <p className="text-[10px] text-[#535C91] dark:text-[#9290C3] uppercase font-bold tracking-wider">
                    Estimated BMR
                  </p>
                  <p className="text-base sm:text-lg font-black font-['Outfit'] text-foreground mt-0.5">
                    {estimatedBmr} <span className="text-xs font-bold text-active">kcal/day</span>
                  </p>
                  <p className="text-[10px] text-[#535C91] dark:text-[#9290C3] mt-0.5">
                    Resting metabolic expenditure
                  </p>
                </div>

                {/* Metric 3: Target Training Strategy */}
                <div className="p-3.5 rounded-2xl bg-[#535C91]/5 dark:bg-[#1B1A55]/25 border border-brand-500/15">
                  <p className="text-[10px] text-[#535C91] dark:text-[#9290C3] uppercase font-bold tracking-wider">
                    Caloric Strategy
                  </p>
                  <p className="text-xs sm:text-sm font-bold text-active mt-1">
                    {currentStatus.caloricAdvice}
                  </p>
                  <p className="text-[10px] text-[#535C91] dark:text-[#9290C3] mt-0.5">
                    {currentStatus.targetSplit}
                  </p>
                </div>

              </div>

              {/* Action Buttons Row (Fulfilling Workable Requirement) */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2 border-t border-brand-500/15">
                
                {/* WORKABLE BUTTON 2: Find Matched Classes */}
                <Link
                  href={matchedClassUrl}
                  className="w-full sm:flex-1 py-3.5 px-5 rounded-xl bg-btn-bg text-btn-text hover:opacity-95 font-extrabold text-xs sm:text-sm text-center shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
                >
                  <FiActivity className="w-4 h-4 text-btn-text" />
                  <span>Find Matched Classes</span>
                </Link>

                {/* WORKABLE BUTTON 3: Advanced Macro Calculator with Pre-filled Data */}
                <Link
                  href={macroCalculatorUrl}
                  className="w-full sm:flex-1 py-3.5 px-5 rounded-xl bg-background dark:bg-[#1B1A55]/70 hover:bg-[#535C91]/15 text-foreground font-bold text-xs sm:text-sm text-center border border-brand-500/25 hover:border-active/50 transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 group"
                >
                  <span>Advanced Macro Calculator</span>
                  <FiArrowRight className="w-4 h-4 text-active group-hover:translate-x-1 transition-transform" />
                </Link>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
