"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence, LayoutGroup, useInView } from "framer-motion";
import AnimatedSectionTitle from "@/components/common/AnimatedSectionTitle";
import {
  FiActivity,
  FiArrowRight,
  FiAward,
  FiCheckCircle,
  FiCompass,
  FiPieChart,
  FiRefreshCw,
  FiTarget,
  FiZap,
  FiCopy,
  FiCheck,
  FiShield,
  FiGift,
  FiDroplet,
  FiSliders,
  FiTrendingUp,
  FiHeart,
  FiInfo,
} from "react-icons/fi";
import {
  FaDumbbell,
  FaFireAlt,
  FaHeartbeat,
  FaAppleAlt,
  FaEgg,
  FaFish,
  FaBreadSlice,
  FaTint,
} from "react-icons/fa";
import { submitTrialPass } from "@/lib/api/getClasses";
import toast from "react-hot-toast";
import AthleteVerificationTicker from "@/components/common/AthleteVerificationTicker";

// =========================================================================
// MOTION VARIANTS FOR TRIGGERED TRANSITIONS ACROSS ALL ELEMENTS
// =========================================================================

const containerStagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.04,
    },
  },
};

const leftCardVariants = {
  hidden: { opacity: 0, x: -28 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 380,
      damping: 28,
      staggerChildren: 0.07,
      delayChildren: 0.05,
    },
  },
};

const rightCardVariants = {
  hidden: { opacity: 0, x: 28 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 380,
      damping: 28,
      staggerChildren: 0.08,
      delayChildren: 0.08,
    },
  },
};

const itemHeaderVariants = {
  hidden: { opacity: 0, y: -12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 420, damping: 28 },
  },
};

const itemFieldVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 400, damping: 26 },
  },
};

const itemButtonVariants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 460, damping: 25 },
  },
};

const scorePopVariants = {
  hidden: { opacity: 0, scale: 0.82, y: 15 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 420, damping: 24 },
  },
};

const gaugeVariants = {
  hidden: { opacity: 0, scaleX: 0.9 },
  visible: {
    opacity: 1,
    scaleX: 1,
    transition: { type: "spring", stiffness: 360, damping: 28 },
  },
};

const metricCardLeftVariants = {
  hidden: { opacity: 0, x: -16, scale: 0.95 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 420, damping: 26 },
  },
};

const metricCardRightVariants = {
  hidden: { opacity: 0, x: 16, scale: 0.95 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 420, damping: 26 },
  },
};

const insightVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 380, damping: 28 },
  },
};

const chipVariants = {
  hidden: { opacity: 0, scale: 0.85, y: 8 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 480, damping: 24 },
  },
};

const ctaBtnVariants = {
  hidden: { opacity: 0, y: 12, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 440, damping: 26 },
  },
};

// Photographic Banner variants
const bannerContainerVariants = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 350,
      damping: 28,
      staggerChildren: 0.1,
    },
  },
};

const bannerImageVariants = {
  hidden: { opacity: 0, scale: 1.06 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const bannerTextVariants = {
  hidden: { opacity: 0, x: 18 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 380, damping: 28 },
  },
};

// VIP Section Variants
const vipSectionContainer = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 340,
      damping: 28,
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const vipKickerVariants = {
  hidden: { opacity: 0, scale: 0.8, y: -12 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 480, damping: 25 },
  },
};

const vipTitleVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 380, damping: 28 },
  },
};

const vipDescVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 360, damping: 30 },
  },
};

const vipChipItemVariants = {
  hidden: { opacity: 0, scale: 0.88, y: 12 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 440, damping: 26 },
  },
};

const vipTicketStubVariants = {
  hidden: { opacity: 0, scale: 0.93, y: 26, rotateX: 6 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    rotateX: 0,
    transition: { type: "spring", stiffness: 360, damping: 26, staggerChildren: 0.06 },
  },
};

const vipFieldItemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 420, damping: 28 },
  },
};

const vipBtnItemVariants = {
  hidden: { opacity: 0, scale: 0.94, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 460, damping: 25 },
  },
};

export default function FitnessCalculatorClient() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState("bmi"); // 'bmi' | 'macros' | 'hydration'
  const [unitSystem, setUnitSystem] = useState("metric"); // 'metric' | 'imperial'

  // VIP Pass State
  const [passData, setPassData] = useState({ name: "", email: "", phone: "" });
  const [passLoading, setPassLoading] = useState(false);
  const [passGeneratedCode, setPassGeneratedCode] = useState(null);
  const [copied, setCopied] = useState(false);
  const [copiedSummary, setCopiedSummary] = useState(false);

  // Trigger Refs for Viewport Observers
  const vipRef = useRef(null);
  const vipInView = useInView(vipRef, { once: true, amount: 0.15 });

  const bannerBmiRef = useRef(null);
  const bannerBmiInView = useInView(bannerBmiRef, { once: true, amount: 0.2 });

  const bannerMacroRef = useRef(null);
  const bannerMacroInView = useInView(bannerMacroRef, { once: true, amount: 0.2 });

  const tickerRef = useRef(null);
  const tickerInView = useInView(tickerRef, { once: true, amount: 0.15 });

  const handleClaimPass = async (e) => {
    e.preventDefault();
    if (!passData.name || !passData.email) {
      toast.error("Please enter your full name and email.");
      return;
    }
    try {
      setPassLoading(true);
      const res = await submitTrialPass(passData);
      if (res && res.passCode) {
        setPassGeneratedCode(res.passCode);
        toast.success("Congratulations! VIP 1-Day Trial Pass Activated.");
      } else {
        const fallbackCode = `FP-VIP-${Math.floor(1000 + Math.random() * 9000)}`;
        setPassGeneratedCode(fallbackCode);
        toast.success("VIP 1-Day Trial Pass Activated!");
      }
    } catch (err) {
      console.error(err);
      const fallbackCode = `FP-VIP-${Math.floor(1000 + Math.random() * 9000)}`;
      setPassGeneratedCode(fallbackCode);
      toast.success("VIP 1-Day Trial Pass Activated!");
    } finally {
      setPassLoading(false);
    }
  };

  const handleCopyCode = () => {
    if (!passGeneratedCode) return;
    navigator.clipboard.writeText(passGeneratedCode);
    setCopied(true);
    toast.success("Pass code copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  // BMI State
  const [gender, setGender] = useState("male");
  const [age, setAge] = useState(26);
  const [heightCm, setHeightCm] = useState(178);
  const [weightKg, setWeightKg] = useState(74);

  // Imperial inputs
  const [heightFt, setHeightFt] = useState(5);
  const [heightIn, setHeightIn] = useState(10);
  const [weightLbs, setWeightLbs] = useState(163);

  // Macro / Calorie State
  const [activityLevel, setActivityLevel] = useState(1.55); // Moderately Active
  const [goal, setGoal] = useState("maintenance"); // 'loss' | 'maintenance' | 'gain'

  // Hydration state
  const [workoutDurationMins, setWorkoutDurationMins] = useState(60);
  const [climate, setClimate] = useState("temperate"); // 'temperate' | 'hot'

  // Pre-load from URL search params (e.g. from homepage quick calculator)
  useEffect(() => {
    if (!searchParams) return;
    const tabParam = searchParams.get("tab");
    if (tabParam === "macros" || tabParam === "bmi" || tabParam === "hydration") {
      setActiveTab(tabParam);
    }
    const unitParam = searchParams.get("unit");
    if (unitParam === "imperial" || unitParam === "metric") {
      setUnitSystem(unitParam);
    }
    const heightParam = searchParams.get("height");
    if (heightParam) {
      const numH = Number(heightParam);
      if (unitParam === "imperial") {
        setHeightFt(Math.floor(numH / 12));
        setHeightIn(numH % 12);
      } else {
        setHeightCm(numH);
      }
    }
    const weightParam = searchParams.get("weight");
    if (weightParam) {
      const numW = Number(weightParam);
      if (unitParam === "imperial") {
        setWeightLbs(numW);
      } else {
        setWeightKg(numW);
      }
    }
  }, [searchParams]);

  // BMI Calculation
  const bmiData = useMemo(() => {
    let heightInMeters = 0;
    let weightInKg = 0;

    if (unitSystem === "metric") {
      heightInMeters = heightCm / 100;
      weightInKg = weightKg;
    } else {
      const totalInches = heightFt * 12 + heightIn;
      heightInMeters = (totalInches * 2.54) / 100;
      weightInKg = weightLbs * 0.453592;
    }

    if (heightInMeters <= 0 || weightInKg <= 0) {
      return { bmi: 0, status: "Unknown", color: "text-secondary", range: "", percentage: 0 };
    }

    const bmiValue = Number((weightInKg / (heightInMeters * heightInMeters)).toFixed(1));
    const minHealthyWeight = Number((18.5 * heightInMeters * heightInMeters).toFixed(1));
    const maxHealthyWeight = Number((24.9 * heightInMeters * heightInMeters).toFixed(1));

    let status = "";
    let color = "";
    let badgeBg = "";
    let advice = "";
    let recommendedClasses = [];

    if (bmiValue < 18.5) {
      status = "Underweight";
      color = "text-sky-500";
      badgeBg = "bg-sky-500/15 border-sky-500/30 text-sky-500 dark:text-sky-400";
      advice =
        "Your BMI suggests you are below the recommended clinical range. Prioritize progressive hypertrophy resistance training paired with nutrient-dense caloric surplus to build lean skeletal muscle mass safely.";
      recommendedClasses = ["Strength & Power", "Hypertrophy Weights", "Powerlifting Fundamentals"];
    } else if (bmiValue >= 18.5 && bmiValue <= 24.9) {
      status = "Normal / Healthy Weight";
      color = "text-emerald-500";
      badgeBg = "bg-emerald-500/15 border-emerald-500/30 text-emerald-600 dark:text-emerald-400";
      advice =
        "Outstanding! You are in the optimal healthy weight zone. Maintain balanced athletic conditioning combining compound resistance lifts, high-intensity intervals, and mobility recovery.";
      recommendedClasses = ["CrossFit Athletics", "Functional HIIT", "Vinyasa Yoga Flow"];
    } else if (bmiValue >= 25 && bmiValue <= 29.9) {
      status = "Overweight";
      color = "text-amber-500";
      badgeBg = "bg-amber-500/15 border-amber-500/30 text-amber-600 dark:text-amber-400";
      advice =
        "You are slightly above the standard index. High-intensity interval conditioning and compound strength circuits will accelerate metabolic burn and lean body recomposition.";
      recommendedClasses = ["HIIT Calorie Burner", "Boxing & Combat", "Kettlebell Conditioning"];
    } else {
      status = "Obese";
      color = "text-rose-500";
      badgeBg = "bg-rose-500/15 border-rose-500/30 text-rose-600 dark:text-rose-400";
      advice =
        "Consider low-impact cardiovascular conditioning and progressive resistance circuits alongside a structured caloric deficit guided by certified master trainers.";
      recommendedClasses = ["Low-Impact Cardio", "Core & Mobility", "Guided Personal Training"];
    }

    // Gauge position (clamped 10 to 40)
    const percentage = Math.min(Math.max(((bmiValue - 15) / (35 - 15)) * 100, 5), 95);

    // Baseline hydration in liters based on body weight
    const baselineWaterLiters = Number((weightInKg * 0.035).toFixed(1));
    const baselineWaterOz = Math.round(baselineWaterLiters * 33.814);

    return {
      bmi: bmiValue,
      status,
      color,
      badgeBg,
      advice,
      minHealthyWeight,
      maxHealthyWeight,
      percentage,
      recommendedClasses,
      baselineWaterLiters,
      baselineWaterOz,
    };
  }, [unitSystem, heightCm, weightKg, heightFt, heightIn, weightLbs]);

  // Macro / Calorie Calculation (Mifflin-St Jeor formula)
  const macroData = useMemo(() => {
    let h = unitSystem === "metric" ? heightCm : (heightFt * 12 + heightIn) * 2.54;
    let w = unitSystem === "metric" ? weightKg : weightLbs * 0.453592;

    // BMR formula (Mifflin-St Jeor)
    let bmr = 10 * w + 6.25 * h - 5 * age;
    bmr += gender === "male" ? 5 : -161;

    const tdee = Math.round(bmr * activityLevel);

    let targetCalories = tdee;
    if (goal === "loss") targetCalories = Math.round(tdee - 500);
    if (goal === "gain") targetCalories = Math.round(tdee + 400);

    // Protein: 2.0g per kg of body weight
    const proteinGrams = Math.round(w * 2.0);
    const proteinCals = proteinGrams * 4;

    // Fats: 25% of target calories
    const fatCals = Math.round(targetCalories * 0.25);
    const fatGrams = Math.round(fatCals / 9);

    // Carbs: Remaining calories
    const carbCals = Math.max(targetCalories - (proteinCals + fatCals), 0);
    const carbGrams = Math.round(carbCals / 4);

    const totalCalculated = proteinCals + fatCals + carbCals || 1;
    const proteinPct = Math.round((proteinCals / totalCalculated) * 100);
    const carbPct = Math.round((carbCals / totalCalculated) * 100);
    const fatPct = Math.round((fatCals / totalCalculated) * 100);

    // 4-meal breakdown
    const meals = [
      { name: "Meal 1 (Breakfast)", protein: Math.round(proteinGrams * 0.25), carbs: Math.round(carbGrams * 0.3), fats: Math.round(fatGrams * 0.25) },
      { name: "Meal 2 (Lunch)", protein: Math.round(proteinGrams * 0.3), carbs: Math.round(carbGrams * 0.3), fats: Math.round(fatGrams * 0.3) },
      { name: "Meal 3 (Pre/Post Workout)", protein: Math.round(proteinGrams * 0.25), carbs: Math.round(carbGrams * 0.3), fats: Math.round(fatGrams * 0.15) },
      { name: "Meal 4 (Dinner)", protein: Math.round(proteinGrams * 0.2), carbs: Math.round(carbGrams * 0.1), fats: Math.round(fatGrams * 0.3) },
    ];

    return {
      bmr: Math.round(bmr),
      tdee,
      targetCalories,
      proteinGrams,
      carbGrams,
      fatGrams,
      proteinPct,
      carbPct,
      fatPct,
      meals,
    };
  }, [unitSystem, heightCm, weightKg, heightFt, heightIn, weightLbs, age, gender, activityLevel, goal]);

  // Hydration Calculation
  const hydrationData = useMemo(() => {
    const w = unitSystem === "metric" ? weightKg : weightLbs * 0.453592;
    let liters = w * 0.035;
    liters += (workoutDurationMins / 60) * 0.65;
    if (climate === "hot") liters += 0.5;

    const roundedLiters = Number(liters.toFixed(1));
    const glasses = Math.round((roundedLiters * 1000) / 250);

    return {
      liters: roundedLiters,
      glasses,
      ounces: Math.round(roundedLiters * 33.814),
    };
  }, [unitSystem, weightKg, weightLbs, workoutDurationMins, climate]);

  const handleCopyMacroSummary = () => {
    const text = `FlexPulse Target Blueprint:\n- Daily Calories: ${macroData.targetCalories} kcal (BMR: ${macroData.bmr} | TDEE: ${macroData.tdee})\n- Protein: ${macroData.proteinGrams}g (${macroData.proteinPct}%)\n- Carbs: ${macroData.carbGrams}g (${macroData.carbPct}%)\n- Fats: ${macroData.fatGrams}g (${macroData.fatPct}%)\n- Daily Water: ${hydrationData.liters} Liters (${hydrationData.glasses} glasses)`;
    navigator.clipboard.writeText(text);
    setCopiedSummary(true);
    toast.success("Nutrition blueprint copied to clipboard!");
    setTimeout(() => setCopiedSummary(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground py-8 sm:py-12 transition-colors duration-300 relative">
      {/* UNIVERSAL CONTAINER WIDTH: Strict w-11/12 mx-auto matching Nav/Footer */}
      <div className="w-11/12 mx-auto relative z-10 space-y-10 sm:space-y-14">
        
        {/* ============================================================== */}
        {/* 1. HERO HEADER WITH TRIGGERED EXIT ANIMATION & COMPACT TITLE   */}
        {/* ============================================================== */}
        <div className="text-center space-y-3.5 max-w-2xl mx-auto">
          <AnimatedSectionTitle
            kicker="Biometric Body & Nutrition Suite"
            title="Calculate Your Fitness Index"
            highlightText="Fitness Index"
            subtitle="Gain clinical clarity into your Body Mass Index (BMI), Basal Metabolic Rate (BMR), Daily Caloric Burn (TDEE), and precision macronutrient targets."
            align="center"
            className="mb-2"
          />

          {/* Mode Switcher Tabs with Layout Animation */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 420, damping: 26, delay: 0.1 }}
          >
            <LayoutGroup id="calculatorModeGroup">
              <div className="inline-flex p-1 rounded-2xl bg-slate-100 dark:bg-[#121026] border border-slate-200 dark:border-brand-500/20 shadow-xs mt-1">
                {[
                  { id: "bmi", label: "BMI Calculator", icon: FaHeartbeat, size: 13 },
                  { id: "macros", label: "Calorie & Macros", icon: FiPieChart, size: 13 },
                  { id: "hydration", label: "Hydration Tracker", icon: FaTint, size: 12 },
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`relative flex items-center gap-2 px-4 sm:px-6 py-2 rounded-xl text-xs sm:text-sm font-bold transition-colors cursor-pointer ${
                        isActive
                          ? "text-btn-text"
                          : "text-slate-600 dark:text-secondary hover:text-foreground"
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="activeCalculatorModePill"
                          className="absolute inset-0 rounded-xl bg-active shadow-2xs"
                          transition={{ type: "spring", stiffness: 450, damping: 35 }}
                        />
                      )}
                      <Icon size={tab.size} className="relative z-10" />
                      <span className="relative z-10">{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </LayoutGroup>
          </motion.div>
        </div>

        {/* ============================================================== */}
        {/* TABS CONTAINER WITH ANIMATEPRESENCE FOR HIGH-SPEED TRANSITION  */}
        {/* ============================================================== */}
        <AnimatePresence mode="wait">
          {/* ============================================================== */}
          {/* 2. TAB 1: BMI & BODY COMPOSITION CALCULATOR                   */}
          {/* ============================================================== */}
          {activeTab === "bmi" && (
            <motion.div
              key="bmi-tab"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.28, ease: "easeInOut" }}
              className="space-y-8"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
                
                {/* Input Controls Column (6 cols) */}
                <motion.div
                  variants={leftCardVariants}
                  initial="hidden"
                  animate="visible"
                  className="lg:col-span-6 bg-white dark:bg-[#121026]/75 border border-slate-200 dark:border-brand-500/20 rounded-3xl p-6 sm:p-7 shadow-xs space-y-5"
                >
                  <motion.div variants={itemHeaderVariants} className="flex items-center justify-between border-b border-slate-100 dark:border-brand-500/15 pb-3.5">
                    <div className="space-y-0.5">
                      <h3 className="font-['Outfit'] text-lg font-bold text-foreground">
                        Personal Biometrics
                      </h3>
                      <p className="text-[11px] text-secondary">
                        Input your current anatomical dimensions
                      </p>
                    </div>

                    {/* Unit toggle with Layout Animation */}
                    <LayoutGroup id="calculatorBmiUnitGroup">
                      <div className="inline-flex items-center gap-1 bg-slate-100 dark:bg-background/80 border border-slate-200 dark:border-brand-500/20 rounded-xl p-1 shrink-0 select-none">
                        <button
                          type="button"
                          onClick={() => setUnitSystem("metric")}
                          className={`relative px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                            unitSystem === "metric"
                              ? "text-btn-text"
                              : "text-secondary hover:text-foreground"
                          }`}
                        >
                          {unitSystem === "metric" && (
                            <motion.span
                              layoutId="activeCalculatorBmiUnitPill"
                              className="absolute inset-0 rounded-lg bg-active shadow-2xs"
                              transition={{ type: "spring", stiffness: 450, damping: 35 }}
                            />
                          )}
                          <span className="relative z-10">Metric</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setUnitSystem("imperial")}
                          className={`relative px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                            unitSystem === "imperial"
                              ? "text-btn-text"
                              : "text-secondary hover:text-foreground"
                          }`}
                        >
                          {unitSystem === "imperial" && (
                            <motion.span
                              layoutId="activeCalculatorBmiUnitPill"
                              className="absolute inset-0 rounded-lg bg-active shadow-2xs"
                              transition={{ type: "spring", stiffness: 450, damping: 35 }}
                            />
                          )}
                          <span className="relative z-10">Imperial</span>
                        </button>
                      </div>
                    </LayoutGroup>
                  </motion.div>

                  {/* Gender Select */}
                  <motion.div variants={itemFieldVariants} className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-secondary">
                      Biological Profile
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <motion.button
                        variants={itemButtonVariants}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="button"
                        onClick={() => setGender("male")}
                        className={`py-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center justify-center gap-2 ${
                          gender === "male"
                            ? "border-active bg-active/10 text-active font-extrabold shadow-2xs"
                            : "border-slate-200 dark:border-brand-500/20 bg-slate-50 dark:bg-background/50 text-slate-700 dark:text-secondary hover:text-foreground"
                        }`}
                      >
                        <span>Male Athlete</span>
                      </motion.button>
                      <motion.button
                        variants={itemButtonVariants}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="button"
                        onClick={() => setGender("female")}
                        className={`py-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center justify-center gap-2 ${
                          gender === "female"
                            ? "border-active bg-active/10 text-active font-extrabold shadow-2xs"
                            : "border-slate-200 dark:border-brand-500/20 bg-slate-50 dark:bg-background/50 text-slate-700 dark:text-secondary hover:text-foreground"
                        }`}
                      >
                        <span>Female Athlete</span>
                      </motion.button>
                    </div>
                  </motion.div>

                  {/* Age Slider */}
                  <motion.div variants={itemFieldVariants} className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold uppercase tracking-wider text-secondary">Age</span>
                      <span className="font-['Outfit'] text-sm font-extrabold text-foreground px-2.5 py-0.5 rounded-lg bg-slate-100 dark:bg-brand-500/10 border border-slate-200 dark:border-brand-500/15">
                        {age} Years
                      </span>
                    </div>
                    <input
                      type="range"
                      min="14"
                      max="85"
                      value={age}
                      onChange={(e) => setAge(Number(e.target.value))}
                      className="w-full accent-[#ff1844] cursor-pointer"
                    />
                  </motion.div>

                  {/* Height Inputs */}
                  {unitSystem === "metric" ? (
                    <motion.div variants={itemFieldVariants} className="space-y-2">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-bold uppercase tracking-wider text-secondary">Height</span>
                        <span className="font-['Outfit'] text-sm font-extrabold text-foreground px-2.5 py-0.5 rounded-lg bg-slate-100 dark:bg-brand-500/10 border border-slate-200 dark:border-brand-500/15">
                          {heightCm} cm ({(heightCm / 100).toFixed(2)} m)
                        </span>
                      </div>
                      <input
                        type="range"
                        min="120"
                        max="220"
                        value={heightCm}
                        onChange={(e) => setHeightCm(Number(e.target.value))}
                        className="w-full accent-[#ff1844] cursor-pointer"
                      />
                    </motion.div>
                  ) : (
                    <motion.div variants={itemFieldVariants} className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-secondary">Feet</label>
                        <input
                          type="number"
                          min="3"
                          max="7"
                          value={heightFt}
                          onChange={(e) => setHeightFt(Number(e.target.value))}
                          className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-background/60 border border-slate-200 dark:border-brand-500/20 text-foreground text-sm font-bold focus:outline-none focus:border-active"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-secondary">Inches</label>
                        <input
                          type="number"
                          min="0"
                          max="11"
                          value={heightIn}
                          onChange={(e) => setHeightIn(Number(e.target.value))}
                          className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-background/60 border border-slate-200 dark:border-brand-500/20 text-foreground text-sm font-bold focus:outline-none focus:border-active"
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* Weight Inputs */}
                  {unitSystem === "metric" ? (
                    <motion.div variants={itemFieldVariants} className="space-y-2">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-bold uppercase tracking-wider text-secondary">Weight</span>
                        <span className="font-['Outfit'] text-sm font-extrabold text-foreground px-2.5 py-0.5 rounded-lg bg-slate-100 dark:bg-brand-500/10 border border-slate-200 dark:border-brand-500/15">
                          {weightKg} kg ({Math.round(weightKg * 2.20462)} lbs)
                        </span>
                      </div>
                      <input
                        type="range"
                        min="35"
                        max="180"
                        value={weightKg}
                        onChange={(e) => setWeightKg(Number(e.target.value))}
                        className="w-full accent-[#ff1844] cursor-pointer"
                      />
                    </motion.div>
                  ) : (
                    <motion.div variants={itemFieldVariants} className="space-y-2">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-bold uppercase tracking-wider text-secondary">Weight</span>
                        <span className="font-['Outfit'] text-sm font-extrabold text-foreground px-2.5 py-0.5 rounded-lg bg-slate-100 dark:bg-brand-500/10 border border-slate-200 dark:border-brand-500/15">
                          {weightLbs} lbs ({Math.round(weightLbs * 0.453592)} kg)
                        </span>
                      </div>
                      <input
                        type="range"
                        min="80"
                        max="400"
                        value={weightLbs}
                        onChange={(e) => setWeightLbs(Number(e.target.value))}
                        className="w-full accent-[#ff1844] cursor-pointer"
                      />
                    </motion.div>
                  )}

                  {/* Quick Visual Calibration Note */}
                  <motion.div variants={insightVariants} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-brand-500/5 border border-slate-200/80 dark:border-brand-500/15 flex items-center gap-2.5 text-xs text-secondary shadow-2xs">
                    <FiInfo className="text-active shrink-0" size={15} />
                    <span>Calibrated against World Health Organization (WHO) and InBody 570 clinical reference scales.</span>
                  </motion.div>
                </motion.div>

                {/* Results & Visual Gauge Column (6 cols) */}
                <motion.div
                  variants={rightCardVariants}
                  initial="hidden"
                  animate="visible"
                  className="lg:col-span-6 bg-white dark:bg-[#121026]/75 border border-slate-200 dark:border-brand-500/20 rounded-3xl p-6 sm:p-7 shadow-xs space-y-5"
                >
                  {/* Hero Score Display */}
                  <motion.div variants={scorePopVariants} className="text-center space-y-1.5 pb-2">
                    <span className="text-[11px] uppercase font-extrabold tracking-widest text-secondary block">
                      Calculated Body Mass Index
                    </span>
                    <div className="font-['Outfit'] text-5xl sm:text-6xl font-black text-foreground drop-shadow tracking-tight">
                      {bmiData.bmi}
                    </div>
                    <div>
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-black uppercase tracking-wider ${bmiData.badgeBg} shadow-2xs`}>
                        {bmiData.status}
                      </span>
                    </div>
                  </motion.div>

                  {/* Visual Horizontal Spectrum Gauge */}
                  <motion.div variants={gaugeVariants} className="space-y-2">
                    <div className="relative h-3 w-full rounded-full overflow-hidden flex bg-slate-200 dark:bg-brand-800/40">
                      <div className="h-full bg-sky-500 w-[20%]" title="Underweight (<18.5)" />
                      <div className="h-full bg-emerald-500 w-[35%]" title="Normal (18.5 - 24.9)" />
                      <div className="h-full bg-amber-500 w-[25%]" title="Overweight (25 - 29.9)" />
                      <div className="h-full bg-rose-500 w-[20%]" title="Obese (30+)" />
                    </div>

                    {/* Pointer indicator with smooth spring slide */}
                    <div className="relative w-full h-2">
                      <motion.div
                        className="absolute -top-1 -translate-x-1/2 w-3.5 h-3.5 rotate-45 bg-foreground border border-black shadow-xs"
                        initial={false}
                        animate={{ left: `${bmiData.percentage}%` }}
                        transition={{ type: "spring", stiffness: 320, damping: 25 }}
                      />
                    </div>

                    <div className="flex justify-between text-[10px] text-secondary font-semibold">
                      <span>Underweight (&lt;18.5)</span>
                      <span className="text-emerald-500 font-bold">Healthy (18.5-24.9)</span>
                      <span>Overweight (25-29.9)</span>
                      <span>Obese (30+)</span>
                    </div>
                  </motion.div>

                  {/* Target Metric Cards Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <motion.div
                      variants={metricCardLeftVariants}
                      whileHover={{ y: -2 }}
                      className="p-3.5 rounded-2xl bg-slate-50 dark:bg-brand-900/30 border border-slate-200 dark:border-brand-500/15 space-y-0.5 shadow-2xs"
                    >
                      <span className="text-[11px] font-bold text-secondary uppercase tracking-wider block">
                        Ideal Target Weight
                      </span>
                      <span className="font-['Outfit'] text-base font-extrabold text-active block">
                        {bmiData.minHealthyWeight} – {bmiData.maxHealthyWeight} kg
                      </span>
                      <span className="text-[10px] text-secondary">
                        Clinical normal zone for your stature
                      </span>
                    </motion.div>

                    <motion.div
                      variants={metricCardRightVariants}
                      whileHover={{ y: -2 }}
                      className="p-3.5 rounded-2xl bg-slate-50 dark:bg-brand-900/30 border border-slate-200 dark:border-brand-500/15 space-y-0.5 shadow-2xs"
                    >
                      <span className="text-[11px] font-bold text-secondary uppercase tracking-wider block">
                        Daily Water Intake
                      </span>
                      <span className="font-['Outfit'] text-base font-extrabold text-sky-500 block">
                        {bmiData.baselineWaterLiters} L ({bmiData.baselineWaterOz} oz)
                      </span>
                      <span className="text-[10px] text-secondary">
                        Baseline cellular hydration
                      </span>
                    </motion.div>
                  </div>

                  {/* Personalized Coaching Insight */}
                  <motion.div variants={insightVariants} className="space-y-2 pt-1">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-secondary flex items-center gap-1.5">
                      <FiCompass className="text-active" /> Personalized Coaching Insight
                    </h4>
                    <p className="text-xs text-foreground leading-relaxed bg-slate-50 dark:bg-background/50 p-3.5 rounded-2xl border border-slate-200/80 dark:border-brand-500/10 shadow-2xs">
                      {bmiData.advice}
                    </p>
                  </motion.div>

                  {/* Recommended Classes CTA */}
                  <motion.div variants={itemFieldVariants} className="space-y-3 pt-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-secondary block">
                      Recommended Workout Disciplines:
                    </span>
                    <motion.div variants={containerStagger} className="flex flex-wrap gap-2">
                      {bmiData.recommendedClasses.map((clsName) => (
                        <motion.span
                          key={clsName}
                          variants={chipVariants}
                          whileHover={{ scale: 1.05 }}
                          className="px-3 py-1 rounded-xl bg-active/10 border border-active/30 text-active text-xs font-semibold flex items-center gap-1.5 shadow-2xs"
                        >
                          <FaDumbbell size={11} /> {clsName}
                        </motion.span>
                      ))}
                    </motion.div>

                    <motion.div variants={ctaBtnVariants} className="flex items-center gap-2 pt-1">
                      <Link
                        href="/all-classes"
                        className="relative group overflow-hidden flex-1 py-3 rounded-xl bg-active text-btn-text text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-sm hover:opacity-95 active:scale-98 transition-all"
                      >
                        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-linear-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
                        <span className="relative z-10">Explore Recommended Classes</span>
                        <FiArrowRight size={13} className="relative z-10 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </motion.div>
                  </motion.div>
                </motion.div>
              </div>

              {/* Visual Photographic Banner: Athletic Assessment */}
              <motion.div
                ref={bannerBmiRef}
                variants={bannerContainerVariants}
                initial="hidden"
                animate={bannerBmiInView ? "visible" : "hidden"}
                className="relative rounded-3xl overflow-hidden border border-slate-200 dark:border-brand-500/20 bg-white dark:bg-[#121026]/75 shadow-xs"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 items-center">
                  <motion.div variants={bannerImageVariants} className="md:col-span-5 relative h-64 sm:h-72 w-full overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1200&auto=format&fit=crop"
                      alt="Athletic Body Composition & Assessment"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/85 via-black/40 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <span className="px-2.5 py-0.5 rounded-full bg-active text-btn-text text-[10px] font-bold uppercase tracking-wider shadow-2xs">
                        InBody 570 Bio-Impedance
                      </span>
                      <h4 className="font-['Outfit'] text-lg font-bold mt-1">
                        Clinical Skeletal Muscle Scan
                      </h4>
                    </div>
                  </motion.div>

                  <motion.div variants={bannerTextVariants} className="md:col-span-7 p-6 sm:p-8 space-y-3">
                    <div className="inline-flex items-center gap-2 text-active text-xs font-bold uppercase tracking-wider">
                      <FiAward size={14} /> Beyond Simple BMI
                    </div>
                    <h3 className="font-['Outfit'] text-xl sm:text-2xl font-black text-foreground">
                      Get a Medical-Grade Body Composition Scan
                    </h3>
                    <p className="text-xs sm:text-sm text-secondary leading-relaxed">
                      While BMI provides a fast clinical baseline, it does not distinguish between dense muscle mass and visceral fat. Every FlexPulse Pro membership includes a complimentary monthly <strong>InBody 570 segmented scan</strong> measuring segmental lean tissue, body fat percentage, and intracellular water.
                    </p>
                    <div className="pt-1">
                      <a
                        href="#trial-pass"
                        className="inline-flex items-center gap-2 text-xs font-bold text-active hover:underline"
                      >
                        Claim a Free Scan with your VIP Day Pass &rarr;
                      </a>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* ============================================================== */}
          {/* 3. TAB 2: MACRONUTRIENT & CALORIC ENGINE (TDEE)               */}
          {/* ============================================================== */}
          {activeTab === "macros" && (
            <motion.div
              key="macros-tab"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.28, ease: "easeInOut" }}
              className="space-y-8"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
                
                {/* Input Controls Column (6 cols) */}
                <motion.div
                  variants={leftCardVariants}
                  initial="hidden"
                  animate="visible"
                  className="lg:col-span-6 bg-white dark:bg-[#121026]/75 border border-slate-200 dark:border-brand-500/20 rounded-3xl p-6 sm:p-7 shadow-xs space-y-5"
                >
                  <motion.div variants={itemHeaderVariants} className="border-b border-slate-100 dark:border-brand-500/15 pb-3.5 space-y-0.5">
                    <h3 className="font-['Outfit'] text-lg font-bold text-foreground">
                      Metabolic & Activity Parameters
                    </h3>
                    <p className="text-[11px] text-secondary">
                      Configure your weekly energy expenditure and physical demands
                    </p>
                  </motion.div>

                  {/* Activity Level Selector */}
                  <motion.div variants={itemFieldVariants} className="space-y-2.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-secondary">
                      Daily Physical Activity Multiplier
                    </label>
                    <motion.div variants={containerStagger} className="space-y-2">
                      {[
                        { value: 1.2, label: "Sedentary", desc: "Desk occupation, minimal or no regular exercise" },
                        { value: 1.375, label: "Lightly Active", desc: "1–3 light workouts or recreational walks per week" },
                        { value: 1.55, label: "Moderately Active", desc: "3–5 intense gym sessions or studio classes per week" },
                        { value: 1.725, label: "Very Active", desc: "6–7 rigorous athletic strength & conditioning sessions" },
                        { value: 1.9, label: "Extra Athletic", desc: "Twice-daily training or physically demanding occupation" },
                      ].map((act) => (
                        <motion.button
                          key={act.label}
                          variants={itemFieldVariants}
                          whileHover={{ scale: 1.015, x: 3 }}
                          whileTap={{ scale: 0.98 }}
                          type="button"
                          onClick={() => setActivityLevel(act.value)}
                          className={`w-full p-3 rounded-xl text-left border transition-all cursor-pointer flex items-center justify-between ${
                            activityLevel === act.value
                              ? "border-active bg-active/10 shadow-2xs"
                              : "border-slate-200 dark:border-brand-500/20 bg-slate-50 dark:bg-background/40 hover:bg-slate-100 dark:hover:bg-brand-800/10"
                          }`}
                        >
                          <div>
                            <span
                              className={`text-xs font-bold block ${
                                activityLevel === act.value ? "text-active" : "text-foreground"
                              }`}
                            >
                              {act.label}
                            </span>
                            <span className="text-[11px] text-secondary">{act.desc}</span>
                          </div>
                          {activityLevel === act.value && (
                            <FiCheckCircle className="text-active shrink-0" size={16} />
                          )}
                        </motion.button>
                      ))}
                    </motion.div>
                  </motion.div>

                  {/* Primary Goal Selector */}
                  <motion.div variants={itemFieldVariants} className="space-y-2 pt-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-secondary">
                      Primary Fitness Objective
                    </label>
                    <motion.div variants={containerStagger} className="grid grid-cols-3 gap-2.5">
                      {[
                        { key: "loss", title: "Fat Loss (Cut)", delta: "-500 kcal deficit" },
                        { key: "maintenance", title: "Maintain Weight", delta: "Energy equilibrium" },
                        { key: "gain", title: "Muscle Build (Bulk)", delta: "+400 kcal surplus" },
                      ].map((g) => (
                        <motion.button
                          key={g.key}
                          variants={itemButtonVariants}
                          whileHover={{ scale: 1.03, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          type="button"
                          onClick={() => setGoal(g.key)}
                          className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                            goal === g.key
                              ? "border-active bg-active text-btn-text font-bold shadow-2xs"
                              : "border-slate-200 dark:border-brand-500/20 bg-slate-50 dark:bg-background/50 text-slate-700 dark:text-secondary hover:text-foreground"
                          }`}
                        >
                          <span className="text-xs font-bold block">{g.title}</span>
                          <span className="text-[10px] opacity-80 block mt-0.5">{g.delta}</span>
                        </motion.button>
                      ))}
                    </motion.div>
                  </motion.div>
                </motion.div>

                {/* Results Column (6 cols) */}
                <motion.div
                  variants={rightCardVariants}
                  initial="hidden"
                  animate="visible"
                  className="lg:col-span-6 bg-white dark:bg-[#121026]/75 border border-slate-200 dark:border-brand-500/20 rounded-3xl p-6 sm:p-7 shadow-xs space-y-5"
                >
                  {/* Daily Calorie Target Display */}
                  <motion.div variants={scorePopVariants} className="text-center space-y-1">
                    <span className="text-[11px] uppercase font-extrabold tracking-widest text-secondary block">
                      Recommended Daily Caloric Intake
                    </span>
                    <div className="font-['Outfit'] text-5xl sm:text-6xl font-black text-active drop-shadow tracking-tight">
                      {macroData.targetCalories}
                      <span className="text-sm font-bold text-foreground ml-2">kcal / day</span>
                    </div>
                    <div className="flex items-center justify-center gap-4 text-xs text-secondary pt-1">
                      <span>BMR: <strong className="text-foreground">{macroData.bmr} kcal</strong></span>
                      <span>•</span>
                      <span>Maintenance TDEE: <strong className="text-foreground">{macroData.tdee} kcal</strong></span>
                    </div>
                  </motion.div>

                  {/* Macro Distribution Cards with Real Food Badges */}
                  <motion.div variants={itemFieldVariants} className="space-y-2.5 pt-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold uppercase tracking-wider text-secondary">
                        Macronutrient Distribution
                      </span>
                      <span className="text-[11px] text-secondary font-medium">
                        Calibrated for lean muscle & recovery
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      {/* Protein */}
                      <motion.div
                        variants={metricCardLeftVariants}
                        whileHover={{ scale: 1.04, y: -2 }}
                        className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/25 text-center space-y-1 shadow-2xs"
                      >
                        <div className="flex items-center justify-center gap-1 text-[11px] font-extrabold text-rose-500 dark:text-rose-400 uppercase tracking-wider">
                          <FaEgg size={12} />
                          <span>Protein</span>
                        </div>
                        <span className="font-['Outfit'] text-2xl sm:text-3xl font-black text-foreground block">
                          {macroData.proteinGrams}g
                        </span>
                        <span className="text-[10px] text-secondary block">
                          {macroData.proteinPct}% of total (4 kcal/g)
                        </span>
                      </motion.div>

                      {/* Carbs */}
                      <motion.div
                        variants={metricCardLeftVariants}
                        whileHover={{ scale: 1.04, y: -2 }}
                        className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/25 text-center space-y-1 shadow-2xs"
                      >
                        <div className="flex items-center justify-center gap-1 text-[11px] font-extrabold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                          <FaBreadSlice size={12} />
                          <span>Carbs</span>
                        </div>
                        <span className="font-['Outfit'] text-2xl sm:text-3xl font-black text-foreground block">
                          {macroData.carbGrams}g
                        </span>
                        <span className="text-[10px] text-secondary block">
                          {macroData.carbPct}% of total (4 kcal/g)
                        </span>
                      </motion.div>

                      {/* Healthy Fats */}
                      <motion.div
                        variants={metricCardRightVariants}
                        whileHover={{ scale: 1.04, y: -2 }}
                        className="p-3.5 rounded-2xl bg-sky-500/10 border border-sky-500/25 text-center space-y-1 shadow-2xs"
                      >
                        <div className="flex items-center justify-center gap-1 text-[11px] font-extrabold text-sky-500 dark:text-sky-400 uppercase tracking-wider">
                          <FaAppleAlt size={12} />
                          <span>Fats</span>
                        </div>
                        <span className="font-['Outfit'] text-2xl sm:text-3xl font-black text-foreground block">
                          {macroData.fatGrams}g
                        </span>
                        <span className="text-[10px] text-secondary block">
                          {macroData.fatPct}% of total (9 kcal/g)
                        </span>
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Dynamic Animated Progress Visual Bars */}
                  <motion.div variants={gaugeVariants} className="space-y-2 pt-1">
                    <div className="h-3 w-full rounded-full overflow-hidden flex bg-slate-200 dark:bg-brand-800/40">
                      <motion.div
                        initial={{ width: "0%" }}
                        animate={{ width: `${macroData.proteinPct}%` }}
                        transition={{ duration: 0.9, ease: "easeOut" }}
                        className="bg-rose-500 h-full"
                        title="Protein"
                      />
                      <motion.div
                        initial={{ width: "0%" }}
                        animate={{ width: `${macroData.carbPct}%` }}
                        transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" }}
                        className="bg-amber-500 h-full"
                        title="Carbs"
                      />
                      <motion.div
                        initial={{ width: "0%" }}
                        animate={{ width: `${macroData.fatPct}%` }}
                        transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
                        className="bg-sky-500 h-full"
                        title="Fats"
                      />
                    </div>
                    <div className="flex justify-between text-[11px] text-secondary">
                      <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-rose-500" /> Protein</span>
                      <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-500" /> Carbs</span>
                      <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-sky-500" /> Healthy Fats</span>
                    </div>
                  </motion.div>

                  {/* 4-Meal Distribution Breakdown */}
                  <motion.div variants={itemFieldVariants} className="space-y-2 pt-1">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-secondary">
                      Sample 4-Meal Timing Blueprint:
                    </h4>
                    <motion.div variants={containerStagger} className="grid grid-cols-2 gap-2 text-xs">
                      {macroData.meals.map((meal, idx) => (
                        <motion.div
                          key={idx}
                          variants={chipVariants}
                          whileHover={{ y: -2 }}
                          className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#121026]/50 border border-slate-200/80 dark:border-brand-500/15 space-y-0.5 shadow-2xs"
                        >
                          <span className="font-bold text-foreground block">{meal.name}</span>
                          <div className="text-[10px] text-secondary flex items-center justify-between">
                            <span>{meal.protein}g Pro</span>
                            <span>{meal.carbs}g Carb</span>
                            <span>{meal.fats}g Fat</span>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </motion.div>

                  {/* Action Buttons */}
                  <motion.div variants={ctaBtnVariants} className="pt-2 flex items-center gap-2.5">
                    <button
                      onClick={handleCopyMacroSummary}
                      className="relative group overflow-hidden flex-1 py-3 rounded-xl bg-active text-btn-text text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-sm hover:opacity-95 active:scale-98 transition-all cursor-pointer"
                    >
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-linear-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
                      {copiedSummary ? <FiCheck className="relative z-10" /> : <FiCopy className="relative z-10" />}
                      <span className="relative z-10">{copiedSummary ? "Copied Blueprint!" : "Copy Target Summary"}</span>
                    </button>

                    <Link
                      href="/pricing"
                      className="px-4 py-3 rounded-xl border border-slate-300 dark:border-brand-500/25 bg-white dark:bg-background text-foreground text-xs sm:text-sm font-bold hover:border-active transition-all shadow-2xs"
                    >
                      Nutrition Plans
                    </Link>
                  </motion.div>
                </motion.div>
              </div>

              {/* Visual Photographic Banner: Clean Nutrition Protocol */}
              <motion.div
                ref={bannerMacroRef}
                variants={bannerContainerVariants}
                initial="hidden"
                animate={bannerMacroInView ? "visible" : "hidden"}
                className="relative rounded-3xl overflow-hidden border border-slate-200 dark:border-brand-500/20 bg-white dark:bg-[#121026]/75 shadow-xs"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 items-center">
                  <motion.div variants={bannerImageVariants} className="md:col-span-5 relative h-64 sm:h-72 w-full overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1200&auto=format&fit=crop"
                      alt="Precision Macronutrient Nutrition"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/85 via-black/40 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <span className="px-2.5 py-0.5 rounded-full bg-active text-btn-text text-[10px] font-bold uppercase tracking-wider shadow-2xs">
                        Metabolic Fuel
                      </span>
                      <h4 className="font-['Outfit'] text-lg font-bold mt-1">
                        Nutrient Timing & Bioavailability
                      </h4>
                    </div>
                  </motion.div>

                  <motion.div variants={bannerTextVariants} className="md:col-span-7 p-6 sm:p-8 space-y-3">
                    <div className="inline-flex items-center gap-2 text-active text-xs font-bold uppercase tracking-wider">
                      <FiAward size={14} /> FlexPulse Fuel Bar Integration
                    </div>
                    <h3 className="font-['Outfit'] text-xl sm:text-2xl font-black text-foreground">
                      Macro-Balanced Meals Prepared on Site
                    </h3>
                    <p className="text-xs sm:text-sm text-secondary leading-relaxed">
                      Hitting 2.0 grams of protein per kilogram of body weight is effortless at FlexPulse. Visit our <strong>Metabolic Nutrition & Fuel Bar</strong> in the main atrium to pre-order chef-crafted post-workout whey isolate shakes and macro-balanced cold meal prep boxes containing your exact calculated macros.
                    </p>
                    <div className="pt-1">
                      <Link
                        href="/facilities"
                        className="inline-flex items-center gap-2 text-xs font-bold text-active hover:underline"
                      >
                        Explore the Nutrition & Fuel Bar Facility &rarr;
                      </Link>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* ============================================================== */}
          {/* 4. TAB 3: HYDRATION & ELECTROLYTE TRACKER                     */}
          {/* ============================================================== */}
          {activeTab === "hydration" && (
            <motion.div
              key="hydration-tab"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.28, ease: "easeInOut" }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start"
            >
              {/* Input Controls */}
              <motion.div
                variants={leftCardVariants}
                initial="hidden"
                animate="visible"
                className="lg:col-span-6 bg-white dark:bg-[#121026]/75 border border-slate-200 dark:border-brand-500/20 rounded-3xl p-6 sm:p-7 shadow-xs space-y-5"
              >
                <motion.div variants={itemHeaderVariants} className="border-b border-slate-100 dark:border-brand-500/15 pb-3.5 space-y-0.5">
                  <h3 className="font-['Outfit'] text-lg font-bold text-foreground">
                    Hydration & Sweat Rate Parameters
                  </h3>
                  <p className="text-[11px] text-secondary">
                    Calculate cellular hydration needs during intense training
                  </p>
                </motion.div>

                {/* Workout Duration */}
                <motion.div variants={itemFieldVariants} className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold uppercase tracking-wider text-secondary">Daily Workout Duration</span>
                    <span className="font-['Outfit'] text-sm font-extrabold text-foreground px-2.5 py-0.5 rounded-lg bg-slate-100 dark:bg-brand-500/10 border border-slate-200 dark:border-brand-500/15">
                      {workoutDurationMins} Minutes
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="180"
                    step="15"
                    value={workoutDurationMins}
                    onChange={(e) => setWorkoutDurationMins(Number(e.target.value))}
                    className="w-full accent-[#ff1844] cursor-pointer"
                  />
                </motion.div>

                {/* Training Environment / Climate */}
                <motion.div variants={itemFieldVariants} className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-secondary">
                    Training Environment Climate
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <motion.button
                      variants={itemButtonVariants}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={() => setClimate("temperate")}
                      className={`py-3 rounded-xl text-xs font-bold border transition-all cursor-pointer text-center ${
                        climate === "temperate"
                          ? "border-active bg-active/10 text-active font-extrabold shadow-2xs"
                          : "border-slate-200 dark:border-brand-500/20 bg-slate-50 dark:bg-background/50 text-slate-700 dark:text-secondary hover:text-foreground"
                      }`}
                    >
                      Climate-Controlled (68°F)
                    </motion.button>

                    <motion.button
                      variants={itemButtonVariants}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={() => setClimate("hot")}
                      className={`py-3 rounded-xl text-xs font-bold border transition-all cursor-pointer text-center ${
                        climate === "hot"
                          ? "border-active bg-active/10 text-active font-extrabold shadow-2xs"
                          : "border-slate-200 dark:border-brand-500/20 bg-slate-50 dark:bg-background/50 text-slate-700 dark:text-secondary hover:text-foreground"
                      }`}
                    >
                      Hot Yoga / Outdoor Turf (85°F+)
                    </motion.button>
                  </div>
                </motion.div>

                {/* Electrolyte Guidance */}
                <motion.div variants={insightVariants} className="p-4 rounded-2xl bg-sky-500/10 border border-sky-500/25 space-y-1.5 text-xs shadow-2xs">
                  <span className="font-bold text-sky-600 dark:text-sky-400 flex items-center gap-1.5">
                    <FaTint /> Athletic Electrolyte Protocol
                  </span>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    Drinking plain water without electrolytes during 60+ minute training sessions can dilute blood sodium levels. Supplement with 400–600mg sodium and 200mg potassium per hour of strenuous sweat output.
                  </p>
                </motion.div>
              </motion.div>

              {/* Hydration Results */}
              <motion.div
                variants={rightCardVariants}
                initial="hidden"
                animate="visible"
                className="lg:col-span-6 bg-white dark:bg-[#121026]/75 border border-slate-200 dark:border-brand-500/20 rounded-3xl p-6 sm:p-7 shadow-xs space-y-5"
              >
                <motion.div variants={scorePopVariants} className="text-center space-y-1">
                  <span className="text-[11px] uppercase font-extrabold tracking-widest text-secondary block">
                    Recommended Daily Water Volume
                  </span>
                  <div className="font-['Outfit'] text-5xl sm:text-6xl font-black text-sky-500 drop-shadow tracking-tight">
                    {hydrationData.liters}
                    <span className="text-sm font-bold text-foreground ml-2">Liters / day</span>
                  </div>
                  <p className="text-xs text-secondary pt-0.5">
                    Equivalent to approximately <strong>{hydrationData.glasses} standard 250ml glasses</strong> ({hydrationData.ounces} fl oz)
                  </p>
                </motion.div>

                {/* Glass visual tracker */}
                <motion.div variants={containerStagger} className="p-4 rounded-2xl bg-slate-50 dark:bg-brand-900/30 border border-slate-200 dark:border-brand-500/15 space-y-2 shadow-2xs">
                  <span className="text-xs font-bold text-foreground uppercase tracking-wider block">
                    Daily Intake Pacing
                  </span>
                  <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 text-center">
                    {Array.from({ length: Math.min(hydrationData.glasses, 12) }).map((_, i) => (
                      <motion.div
                        key={i}
                        variants={chipVariants}
                        whileHover={{ scale: 1.1, y: -2 }}
                        className="p-2 rounded-xl bg-sky-500/15 border border-sky-500/30 text-sky-500 text-xs font-bold flex flex-col items-center justify-center gap-1 shadow-2xs"
                      >
                        <FaTint size={12} />
                        <span className="text-[10px] text-foreground">#{i + 1}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                <motion.div variants={insightVariants} className="space-y-2 text-xs text-secondary leading-relaxed bg-slate-50 dark:bg-background/50 p-4 rounded-2xl border border-slate-200/80 dark:border-brand-500/15 shadow-2xs">
                  <strong className="text-foreground block">Free Chilled Alkaline Hydration at FlexPulse:</strong>
                  Our gym floor features continuous reverse-osmosis filtration taps delivering chilled 9.5 pH alkaline water with magnesium and trace minerals for all active athletes.
                </motion.div>

                <motion.div variants={ctaBtnVariants}>
                  <Link
                    href="/facilities"
                    className="relative group overflow-hidden w-full py-3 rounded-xl bg-active text-btn-text text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-sm hover:opacity-95 active:scale-98 transition-all"
                  >
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-linear-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
                    <span className="relative z-10">View Club Amenities & Alkaline Bar</span>
                    <FiArrowRight size={13} className="relative z-10 transition-transform group-hover:translate-x-1" />
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ============================================================== */}
        {/* 5. DECORATIVE VIP 1-DAY TRIAL PASS VOUCHER SHOWCASE           */}
        {/* RE-ENGINEERED COLOR DESIGN: HIGH CONTRAST LUXURY TICKET STUB  */}
        {/* ============================================================== */}
        <section id="trial-pass" ref={vipRef} className="pt-6 border-t border-slate-200 dark:border-brand-500/20">
          <motion.div
            variants={vipSectionContainer}
            initial="hidden"
            animate={vipInView ? "visible" : "hidden"}
            className="relative rounded-3xl bg-linear-to-br from-active/10 via-brand-500/10 to-slate-100/90 dark:from-active/15 dark:via-[#1B1A55]/30 dark:to-[#0c0a1d]/90 border border-slate-200/90 dark:border-brand-500/25 p-6 sm:p-10 shadow-md backdrop-blur-md overflow-hidden"
          >
            {/* Background ambient lighting */}
            <div className="absolute -top-12 -right-12 w-96 h-96 bg-active/15 dark:bg-active/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-12 -left-12 w-80 h-80 bg-brand-500/10 dark:bg-[#1B1A55]/40 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Ticket Info & Perks (7 cols) */}
              <div className="lg:col-span-7 space-y-4">
                <motion.div
                  variants={vipKickerVariants}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-active text-btn-text text-xs font-bold uppercase tracking-wider shadow-2xs"
                >
                  <FiGift className="w-3.5 h-3.5" />
                  <span>Complimentary VIP Invitation</span>
                </motion.div>

                <motion.h3
                  variants={vipTitleVariants}
                  className="font-['Outfit'] text-2xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight leading-tight"
                >
                  Test Your New Plan With a <br />
                  <span className="text-active">Free 1-Day VIP Pass</span>
                </motion.h3>

                <motion.p
                  variants={vipDescVariants}
                  className="font-['Inter'] text-xs sm:text-sm text-secondary leading-relaxed max-w-xl"
                >
                  Now that you know your body composition baseline and target calories, test drive your routine at FlexPulse. Enjoy full access to our Olympic weight room, functional turf, any studio group class, and recovery hydro-spa.
                </motion.p>

                {/* Perforated Ticket Feature Chips */}
                <motion.div variants={containerStagger} className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2 font-['Inter'] text-xs">
                  {[
                    { label: "Olympic Weights", icon: FiCheckCircle },
                    { label: "1 Group Class", icon: FiCheckCircle },
                    { label: "InBody 570 Scan", icon: FiCheckCircle },
                    { label: "Sauna & Recovery", icon: FiCheckCircle },
                    { label: "Locker & Towel", icon: FiCheckCircle },
                    { label: "No Credit Card", icon: FiShield },
                  ].map((perk, pIdx) => {
                    const Icon = perk.icon;
                    return (
                      <motion.div
                        key={pIdx}
                        variants={vipChipItemVariants}
                        whileHover={{ scale: 1.03, y: -2 }}
                        className="p-3 rounded-2xl bg-white/85 dark:bg-[#121026]/70 border border-slate-200/90 dark:border-brand-500/20 shadow-2xs hover:border-active/40 hover:bg-white dark:hover:bg-[#121026] transition-all flex items-center gap-2.5 backdrop-blur-xs group"
                      >
                        <Icon className="text-active w-4 h-4 shrink-0 transition-transform group-hover:scale-110" />
                        <span className="font-semibold text-xs text-foreground">{perk.label}</span>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </div>

              {/* Right Ticket Stub / Generator Card (5 cols) */}
              <div className="lg:col-span-5">
                <motion.div
                  variants={vipTicketStubVariants}
                  className="relative rounded-3xl bg-white dark:bg-[#0c0a1d] border-2 border-active/40 p-6 sm:p-8 shadow-md space-y-4 overflow-hidden"
                >
                  {/* Decorative Ticket Perforation Badge */}
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-0.5 rounded-full bg-active text-btn-text text-[10px] font-mono font-bold uppercase tracking-widest shadow-2xs">
                    ALL-ACCESS TICKET
                  </div>

                  {passGeneratedCode ? (
                    <motion.div variants={containerStagger} initial="hidden" animate="visible" className="text-center space-y-3.5 py-2">
                      <motion.div variants={vipKickerVariants} className="w-12 h-12 rounded-full bg-active/15 text-active flex items-center justify-center mx-auto shadow-2xs">
                        <FiCheckCircle className="w-7 h-7" />
                      </motion.div>
                      <motion.div variants={vipFieldItemVariants} className="space-y-0.5">
                        <h4 className="font-['Outfit'] text-xl font-bold text-foreground">
                          Your Pass Is Ready!
                        </h4>
                        <p className="text-xs text-secondary font-['Inter']">
                          Show this digital pass code to our reception desk on arrival:
                        </p>
                      </motion.div>

                      {/* Barcode & Code Box */}
                      <motion.div variants={vipFieldItemVariants} className="p-4 rounded-2xl bg-slate-50 dark:bg-black/50 border border-active/40 space-y-1.5 select-all text-center shadow-2xs">
                        <div className="font-mono text-2xl sm:text-3xl font-black text-active tracking-widest">
                          {passGeneratedCode}
                        </div>
                        <div className="text-[10px] text-slate-400 dark:text-gray-400 font-mono tracking-widest uppercase">
                          ||| | | |||| || | || |||| | |||
                        </div>
                      </motion.div>

                      <motion.div variants={vipBtnItemVariants} className="flex gap-2 pt-1">
                        <button
                          type="button"
                          onClick={handleCopyCode}
                          className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-brand-500/30 bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/15 text-foreground font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-2xs"
                        >
                          {copied ? <FiCheck className="w-4 h-4 text-emerald-500" /> : <FiCopy className="w-4 h-4" />}
                          <span>{copied ? "Copied!" : "Copy Code"}</span>
                        </button>
                        <Link
                          href="/schedule"
                          className="relative group overflow-hidden py-2.5 px-4 rounded-xl bg-active text-btn-text font-bold text-xs flex items-center justify-center transition-all shadow-2xs"
                        >
                          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-linear-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
                          <span className="relative z-10">Schedule</span>
                        </Link>
                      </motion.div>

                      <motion.p variants={vipFieldItemVariants} className="text-[10px] text-secondary font-['Inter']">
                        Valid for 7 days from today. No hidden commitments.
                      </motion.p>
                    </motion.div>
                  ) : (
                    <motion.form variants={containerStagger} initial="hidden" animate="visible" onSubmit={handleClaimPass} className="space-y-3.5 font-['Inter']">
                      <motion.div variants={vipFieldItemVariants} className="text-center space-y-0.5">
                        <h4 className="font-['Outfit'] text-xl font-bold text-foreground">
                          Claim Digital Pass
                        </h4>
                        <p className="text-xs text-secondary">
                          Instant confirmation • Generated in 2 seconds
                        </p>
                      </motion.div>

                      <motion.div variants={vipFieldItemVariants}>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-secondary mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={passData.name}
                          onChange={(e) => setPassData({ ...passData, name: e.target.value })}
                          placeholder="e.g. Jordan Miller"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-searchbox-bg border border-slate-200 dark:border-brand-500/25 text-foreground text-xs sm:text-sm focus:border-active focus:ring-1 focus:ring-active/20 outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-all shadow-2xs"
                        />
                      </motion.div>

                      <motion.div variants={vipFieldItemVariants}>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-secondary mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={passData.email}
                          onChange={(e) => setPassData({ ...passData, email: e.target.value })}
                          placeholder="jordan@example.com"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-searchbox-bg border border-slate-200 dark:border-brand-500/25 text-foreground text-xs sm:text-sm focus:border-active focus:ring-1 focus:ring-active/20 outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-all shadow-2xs"
                        />
                      </motion.div>

                      <motion.div variants={vipFieldItemVariants}>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-secondary mb-1">
                          Phone Number (Optional)
                        </label>
                        <input
                          type="tel"
                          value={passData.phone}
                          onChange={(e) => setPassData({ ...passData, phone: e.target.value })}
                          placeholder="+1 (555) 000-0000"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-searchbox-bg border border-slate-200 dark:border-brand-500/25 text-foreground text-xs sm:text-sm focus:border-active focus:ring-1 focus:ring-active/20 outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-all shadow-2xs"
                        />
                      </motion.div>

                      <motion.div variants={vipBtnItemVariants} className="pt-1">
                        <button
                          type="submit"
                          disabled={passLoading}
                          className="relative group overflow-hidden w-full py-3.5 rounded-xl bg-active text-btn-text font-bold text-xs sm:text-sm shadow-sm hover:opacity-95 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                        >
                          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-linear-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
                          {passLoading ? (
                            <span className="relative z-10">Activating Pass...</span>
                          ) : (
                            <>
                              <FiZap className="w-4 h-4 relative z-10" />
                              <span className="relative z-10">Activate My VIP Pass</span>
                            </>
                          )}
                        </button>
                      </motion.div>
                    </motion.form>
                  )}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ============================================================== */}
        {/* ATHLETE VERIFICATION: REAL BIOMETRIC OUTCOMES                  */}
        {/* FULL SECTION WIDTH MATCHING STANDARD PAGE LAYOUT               */}
        {/* ============================================================== */}
        <motion.section
          ref={tickerRef}
          initial={{ opacity: 0, y: 25 }}
          animate={tickerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
          transition={{ type: "spring", stiffness: 350, damping: 28 }}
          className="mt-8 w-full"
        >
          <AthleteVerificationTicker
            title="ATHLETE VERIFICATION • REAL BIOMETRIC OUTCOMES"
            variant="adaptive"
            className="p-5 sm:p-6"
            testimonials={[
              {
                quote:
                  "Using the FlexPulse Macro calculator and InBody scans, I dropped from 24% to 12% body fat while adding 15kg to my back squat.",
                author: "Sophie Taylor",
                role: "Transformation Athlete • 1 Yr Member",
                metric: "-12% Body Fat",
                avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop",
              },
              {
                quote:
                  "Dialing in my daily protein targets and caloric surplus with this tool gave me the exact fuel needed to break 240kg on deadlift.",
                author: "Marcus Vance",
                role: "Powerlifting Athlete • Pro Member",
                metric: "+45kg Total Lift",
                avatar: "https://prio.co.in/avatar.png",
              },
              {
                quote:
                  "Calculated my marathon carbohydrate loading and hydration targets here before my Berlin qualifier. Ran a clean 2:54 PB!",
                author: "David Chen",
                role: "Marathon Runner • Executive Member",
                metric: "2:54 Marathon PB",
                avatar: "https://lh3.googleusercontent.com/a/ACg8ocKzbEXd0N7V406ocsmdiEQkxCVV1BIJpiTn--O3W0TqjLiNy6e3=s96-c",
              },
              {
                quote:
                  "The TDEE calibration is exceptionally accurate. Paired with coach form feedback, I hit my Hyrox race weight right on schedule.",
                author: "Elena Rostova",
                role: "Hyrox Competitor • Elite Tier",
                metric: "Sub-60min Hyrox",
                avatar: "https://t4.ftcdn.net/jpg/11/66/06/77/360_F_1166067709_2SooAuPWXp20XkGev7oOT7nuK1VThCsN.jpg",
              },
            ]}
          />
        </motion.section>
      </div>
    </div>
  );
}
