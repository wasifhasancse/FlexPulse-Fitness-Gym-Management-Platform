"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
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
} from "react-icons/fi";
import { FaDumbbell, FaFireAlt, FaHeartbeat } from "react-icons/fa";
import { submitTrialPass } from "@/lib/api/getClasses";
import toast from "react-hot-toast";

export default function FitnessCalculatorClient() {
  const [activeTab, setActiveTab] = useState("bmi"); // 'bmi' | 'macros'
  const [unitSystem, setUnitSystem] = useState("metric"); // 'metric' | 'imperial'

  // VIP Pass State
  const [passData, setPassData] = useState({ name: "", email: "", phone: "" });
  const [passLoading, setPassLoading] = useState(false);
  const [passGeneratedCode, setPassGeneratedCode] = useState(null);
  const [copied, setCopied] = useState(false);

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
        toast.error(res?.message || "Could not generate pass. Please try again.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error creating trial pass.");
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
      badgeBg = "bg-sky-500/15 border-sky-500/30 text-sky-400";
      advice = "Your BMI suggests you are below the recommended range. Focus on progressive hypertrophy resistance training and a nutrient-dense caloric surplus.";
      recommendedClasses = ["Strength & Conditioning", "Hypertrophy Weights", "Powerlifting Fundamentals"];
    } else if (bmiValue >= 18.5 && bmiValue <= 24.9) {
      status = "Normal / Healthy Weight";
      color = "text-emerald-500";
      badgeBg = "bg-emerald-500/15 border-emerald-500/30 text-emerald-400";
      advice = "Outstanding! You are in the optimal healthy weight zone. Maintain balanced athletic training combining compound resistance and cardiovascular endurance.";
      recommendedClasses = ["CrossFit Athletics", "Functional HIIT", "Vinyasa Yoga Flow"];
    } else if (bmiValue >= 25 && bmiValue <= 29.9) {
      status = "Overweight";
      color = "text-amber-500";
      badgeBg = "bg-amber-500/15 border-amber-500/30 text-amber-400";
      advice = "You are slightly above the standard index. High-intensity interval conditioning combined with strength training will enhance body recomposition and metabolic rate.";
      recommendedClasses = ["HIIT Calorie Burner", "Boxing & Combat", "Kettlebell Conditioning"];
    } else {
      status = "Obese";
      color = "text-rose-500";
      badgeBg = "bg-rose-500/15 border-rose-500/30 text-rose-400";
      advice = "Consider prioritizing low-impact aerobic workouts and progressive strength training alongside a structured caloric deficit with our certified coaches.";
      recommendedClasses = ["Low-Impact Cardio", "Core & Mobility", "Guided Personal Training"];
    }

    // Gauge position (clamped 10 to 40)
    const percentage = Math.min(Math.max(((bmiValue - 15) / (35 - 15)) * 100, 5), 95);

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
    };
  }, [unitSystem, heightCm, weightKg, heightFt, heightIn, weightLbs]);

  // Macro / Calorie Calculation (Mifflin-St Jeor formula)
  const macroData = useMemo(() => {
    let h = unitSystem === "metric" ? heightCm : (heightFt * 12 + heightIn) * 2.54;
    let w = unitSystem === "metric" ? weightKg : weightLbs * 0.453592;

    // BMR formula
    let bmr = 10 * w + 6.25 * h - 5 * age;
    bmr += gender === "male" ? 5 : -161;

    const tdee = Math.round(bmr * activityLevel);

    let targetCalories = tdee;
    if (goal === "loss") targetCalories = Math.round(tdee - 500);
    if (goal === "gain") targetCalories = Math.round(tdee + 400);

    // Protein: 2.2g per kg (or 1g per lb)
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
    };
  }, [unitSystem, heightCm, weightKg, heightFt, heightIn, weightLbs, age, gender, activityLevel, goal]);

  return (
    <div className="min-h-screen bg-background py-14 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-active/30 bg-active/10 text-active text-xs font-extrabold uppercase tracking-widest">
            <FiActivity size={13} />
            Athletic Body & Nutrition Suite
          </div>
          <h1 className="font-['Outfit'] text-4xl sm:text-5xl lg:text-6xl font-black text-foreground tracking-tight">
            Calculate Your <span className="text-active">Fitness Index</span>
          </h1>
          <p className="font-['Inter'] text-sm sm:text-base text-secondary max-w-2xl mx-auto leading-relaxed">
            Gain deep insight into your Body Mass Index (BMI), Basal Metabolic Rate (BMR), Daily Caloric Burn (TDEE), and precision macronutrient distribution for rapid results.
          </p>

          {/* Mode Switcher Tabs */}
          <div className="inline-flex p-1.5 rounded-2xl bg-brand-900/60 dark:bg-[#121026] border border-brand-500/20 shadow-md">
            <button
              onClick={() => setActiveTab("bmi")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === "bmi"
                  ? "bg-active text-btn-text shadow-lg scale-[1.02]"
                  : "text-secondary hover:text-foreground"
              }`}
            >
              <FaHeartbeat size={14} />
              BMI Calculator
            </button>
            <button
              onClick={() => setActiveTab("macros")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === "macros"
                  ? "bg-active text-btn-text shadow-lg scale-[1.02]"
                  : "text-secondary hover:text-foreground"
              }`}
            >
              <FiPieChart size={14} />
              Calorie & Macro Targets
            </button>
          </div>
        </div>

        {/* ===================== TAB 1: BMI CALCULATOR ===================== */}
        {activeTab === "bmi" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Input Controls Column */}
            <div className="lg:col-span-6 bg-brand-900/40 dark:bg-[#121026]/70 border border-brand-500/20 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-xl space-y-6">
              <div className="flex items-center justify-between border-b border-brand-500/15 pb-4">
                <h3 className="font-['Outfit'] text-xl font-bold text-foreground">Personal Metrics</h3>
                {/* Unit toggle */}
                <div className="flex items-center gap-1 bg-background/80 border border-brand-500/20 rounded-xl p-1">
                  <button
                    onClick={() => setUnitSystem("metric")}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      unitSystem === "metric" ? "bg-active text-btn-text" : "text-secondary hover:text-foreground"
                    }`}
                  >
                    Metric (cm/kg)
                  </button>
                  <button
                    onClick={() => setUnitSystem("imperial")}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      unitSystem === "imperial" ? "bg-active text-btn-text" : "text-secondary hover:text-foreground"
                    }`}
                  >
                    Imperial (ft/lbs)
                  </button>
                </div>
              </div>

              {/* Gender Select */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-secondary">Gender</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setGender("male")}
                    className={`py-3 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center justify-center gap-2 ${
                      gender === "male"
                        ? "border-active bg-active/10 text-active"
                        : "border-brand-500/20 bg-background/50 text-secondary hover:text-foreground"
                    }`}
                  >
                    Male
                  </button>
                  <button
                    type="button"
                    onClick={() => setGender("female")}
                    className={`py-3 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center justify-center gap-2 ${
                      gender === "female"
                        ? "border-active bg-active/10 text-active"
                        : "border-brand-500/20 bg-background/50 text-secondary hover:text-foreground"
                    }`}
                  >
                    Female
                  </button>
                </div>
              </div>

              {/* Age Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold uppercase tracking-wider text-secondary">Age</span>
                  <span className="font-['Outfit'] text-base font-extrabold text-foreground">{age} yrs</span>
                </div>
                <input
                  type="range"
                  min="14"
                  max="85"
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="w-full accent-[#ff2a55] cursor-pointer"
                />
              </div>

              {/* Height Inputs */}
              {unitSystem === "metric" ? (
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold uppercase tracking-wider text-secondary">Height</span>
                    <span className="font-['Outfit'] text-base font-extrabold text-foreground">{heightCm} cm</span>
                  </div>
                  <input
                    type="range"
                    min="120"
                    max="220"
                    value={heightCm}
                    onChange={(e) => setHeightCm(Number(e.target.value))}
                    className="w-full accent-[#ff2a55] cursor-pointer"
                  />
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-secondary">Feet</label>
                    <input
                      type="number"
                      min="3"
                      max="7"
                      value={heightFt}
                      onChange={(e) => setHeightFt(Number(e.target.value))}
                      className="w-full px-4 py-2.5 rounded-xl bg-background/60 border border-brand-500/20 text-foreground text-sm font-bold focus:outline-none focus:border-active"
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
                      className="w-full px-4 py-2.5 rounded-xl bg-background/60 border border-brand-500/20 text-foreground text-sm font-bold focus:outline-none focus:border-active"
                    />
                  </div>
                </div>
              )}

              {/* Weight Inputs */}
              {unitSystem === "metric" ? (
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold uppercase tracking-wider text-secondary">Weight</span>
                    <span className="font-['Outfit'] text-base font-extrabold text-foreground">{weightKg} kg</span>
                  </div>
                  <input
                    type="range"
                    min="35"
                    max="180"
                    value={weightKg}
                    onChange={(e) => setWeightKg(Number(e.target.value))}
                    className="w-full accent-[#ff2a55] cursor-pointer"
                  />
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold uppercase tracking-wider text-secondary">Weight</span>
                    <span className="font-['Outfit'] text-base font-extrabold text-foreground">{weightLbs} lbs</span>
                  </div>
                  <input
                    type="range"
                    min="80"
                    max="400"
                    value={weightLbs}
                    onChange={(e) => setWeightLbs(Number(e.target.value))}
                    className="w-full accent-[#ff2a55] cursor-pointer"
                  />
                </div>
              )}
            </div>

            {/* Results & Visual Gauge Column */}
            <div className="lg:col-span-6 bg-brand-900/40 dark:bg-[#121026]/70 border border-brand-500/20 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-xl space-y-6">
              <div className="text-center space-y-2">
                <span className="text-xs uppercase font-extrabold tracking-widest text-secondary">
                  Your Body Mass Index
                </span>
                <div className="font-['Outfit'] text-6xl sm:text-7xl font-black text-foreground drop-shadow">
                  {bmiData.bmi}
                </div>
                <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border text-xs font-bold uppercase tracking-wider">
                  <span className={bmiData.badgeBg}>{bmiData.status}</span>
                </div>
              </div>

              {/* Visual Horizontal Spectrum Gauge */}
              <div className="space-y-2 pt-2">
                <div className="relative h-4 w-full rounded-full overflow-hidden flex bg-brand-800/40">
                  <div className="h-full bg-sky-500 w-[20%]" title="Underweight (<18.5)" />
                  <div className="h-full bg-emerald-500 w-[35%]" title="Normal (18.5 - 24.9)" />
                  <div className="h-full bg-amber-500 w-[25%]" title="Overweight (25 - 29.9)" />
                  <div className="h-full bg-rose-500 w-[20%]" title="Obese (30+)" />
                </div>
                {/* Pointer indicator */}
                <div className="relative w-full h-3">
                  <div
                    className="absolute -top-1 -translate-x-1/2 w-3 h-3 rotate-45 bg-foreground border border-black shadow-md transition-all duration-300"
                    style={{ left: `${bmiData.percentage}%` }}
                  />
                </div>

                <div className="flex justify-between text-[10px] text-secondary font-semibold">
                  <span>Underweight (&lt;18.5)</span>
                  <span className="text-emerald-500 font-bold">Healthy (18.5-24.9)</span>
                  <span>Overweight (25-29.9)</span>
                  <span>Obese (30+)</span>
                </div>
              </div>

              {/* Healthy Weight Target */}
              <div className="p-4 rounded-2xl bg-brand-800/10 border border-brand-500/15 flex items-center justify-between">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-foreground">Estimated Ideal Weight Range</span>
                  <p className="text-[11px] text-secondary">Based on your height and clinical standards</p>
                </div>
                <span className="font-['Outfit'] text-base font-extrabold text-active">
                  {bmiData.minHealthyWeight} - {bmiData.maxHealthyWeight} kg
                </span>
              </div>

              {/* Personalized Advice */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-secondary flex items-center gap-1.5">
                  <FiCompass className="text-active" /> Personalized Coaching Insight
                </h4>
                <p className="text-xs sm:text-sm text-foreground leading-relaxed bg-background/50 p-4 rounded-2xl border border-brand-500/10">
                  {bmiData.advice}
                </p>
              </div>

              {/* Recommended Classes CTA */}
              <div className="space-y-3 pt-2">
                <span className="text-xs font-bold uppercase tracking-wider text-secondary">
                  Recommended Workout Disciplines:
                </span>
                <div className="flex flex-wrap gap-2">
                  {bmiData.recommendedClasses.map((clsName) => (
                    <span
                      key={clsName}
                      className="px-3 py-1.5 rounded-xl bg-active/10 border border-active/30 text-active text-xs font-semibold flex items-center gap-1.5"
                    >
                      <FaDumbbell size={11} /> {clsName}
                    </span>
                  ))}
                </div>

                <Link
                  href="/all-classes"
                  className="w-full mt-4 py-3.5 rounded-xl bg-active text-btn-text text-sm font-bold flex items-center justify-center gap-2 shadow-lg hover:opacity-90 transition-all"
                >
                  Explore Recommended Classes <FiArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* ===================== TAB 2: CALORIES & MACRO TARGETS ===================== */}
        {activeTab === "macros" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Input Controls Column */}
            <div className="lg:col-span-6 bg-brand-900/40 dark:bg-[#121026]/70 border border-brand-500/20 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-xl space-y-6">
              <h3 className="font-['Outfit'] text-xl font-bold text-foreground border-b border-brand-500/15 pb-4">
                Metabolic & Activity Parameters
              </h3>

              {/* Activity Level Selector */}
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-secondary">
                  Daily Physical Activity Level
                </label>
                <div className="space-y-2">
                  {[
                    { value: 1.2, label: "Sedentary", desc: "Desk job, little or no regular exercise" },
                    { value: 1.375, label: "Lightly Active", desc: "1–3 workouts per week / recreational walking" },
                    { value: 1.55, label: "Moderately Active", desc: "3–5 intense gym sessions or fitness classes" },
                    { value: 1.725, label: "Very Active", desc: "6–7 rigorous athletic training sessions per week" },
                    { value: 1.9, label: "Extra Athletic", desc: "Twice-daily training, heavy physical labor" },
                  ].map((act) => (
                    <button
                      key={act.label}
                      type="button"
                      onClick={() => setActivityLevel(act.value)}
                      className={`w-full p-3.5 rounded-xl text-left border transition-all cursor-pointer flex items-center justify-between ${
                        activityLevel === act.value
                          ? "border-active bg-active/10"
                          : "border-brand-500/20 bg-background/40 hover:bg-brand-800/10"
                      }`}
                    >
                      <div>
                        <span className={`text-xs font-bold block ${activityLevel === act.value ? "text-active" : "text-foreground"}`}>
                          {act.label}
                        </span>
                        <span className="text-[11px] text-secondary">{act.desc}</span>
                      </div>
                      {activityLevel === act.value && <FiCheckCircle className="text-active shrink-0" size={16} />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Primary Goal Selector */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-secondary">
                  Primary Fitness Objective
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { key: "loss", title: "Fat Loss (Cut)", delta: "-500 kcal" },
                    { key: "maintenance", title: "Maintain Weight", delta: "0 kcal" },
                    { key: "gain", title: "Muscle Build (Bulk)", delta: "+400 kcal" },
                  ].map((g) => (
                    <button
                      key={g.key}
                      type="button"
                      onClick={() => setGoal(g.key)}
                      className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                        goal === g.key
                          ? "border-active bg-active text-btn-text shadow-md"
                          : "border-brand-500/20 bg-background/50 text-secondary hover:text-foreground"
                      }`}
                    >
                      <span className="text-xs font-bold block">{g.title}</span>
                      <span className="text-[10px] opacity-80">{g.delta}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Results Column */}
            <div className="lg:col-span-6 bg-brand-900/40 dark:bg-[#121026]/70 border border-brand-500/20 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-xl space-y-6">
              {/* Daily Calorie Target Display */}
              <div className="text-center space-y-1">
                <span className="text-xs uppercase font-extrabold tracking-widest text-secondary">
                  Daily Caloric Target
                </span>
                <div className="font-['Outfit'] text-6xl sm:text-7xl font-black text-active drop-shadow">
                  {macroData.targetCalories}
                  <span className="text-lg font-bold text-foreground ml-2">kcal / day</span>
                </div>
                <div className="flex items-center justify-center gap-6 text-xs text-secondary pt-1">
                  <span>BMR: <strong className="text-foreground">{macroData.bmr} kcal</strong></span>
                  <span>•</span>
                  <span>Maintenance TDEE: <strong className="text-foreground">{macroData.tdee} kcal</strong></span>
                </div>
              </div>

              {/* Macro Distribution Cards */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-secondary">
                  Macronutrient Targets Breakdown
                </h4>

                <div className="grid grid-cols-3 gap-3">
                  {/* Protein */}
                  <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/25 text-center space-y-1">
                    <span className="text-[11px] font-extrabold text-rose-400 uppercase tracking-wider block">
                      Protein
                    </span>
                    <span className="font-['Outfit'] text-2xl sm:text-3xl font-black text-foreground">
                      {macroData.proteinGrams}g
                    </span>
                    <span className="text-[10px] text-secondary block">{macroData.proteinPct}% of total</span>
                  </div>

                  {/* Carbs */}
                  <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/25 text-center space-y-1">
                    <span className="text-[11px] font-extrabold text-amber-400 uppercase tracking-wider block">
                      Carbs
                    </span>
                    <span className="font-['Outfit'] text-2xl sm:text-3xl font-black text-foreground">
                      {macroData.carbGrams}g
                    </span>
                    <span className="text-[10px] text-secondary block">{macroData.carbPct}% of total</span>
                  </div>

                  {/* Healthy Fats */}
                  <div className="p-4 rounded-2xl bg-sky-500/10 border border-sky-500/25 text-center space-y-1">
                    <span className="text-[11px] font-extrabold text-sky-400 uppercase tracking-wider block">
                      Fats
                    </span>
                    <span className="font-['Outfit'] text-2xl sm:text-3xl font-black text-foreground">
                      {macroData.fatGrams}g
                    </span>
                    <span className="text-[10px] text-secondary block">{macroData.fatPct}% of total</span>
                  </div>
                </div>
              </div>

              {/* Progress Visual Bars */}
              <div className="space-y-3 pt-2">
                <div className="h-3 w-full rounded-full overflow-hidden flex bg-brand-800/40">
                  <div style={{ width: `${macroData.proteinPct}%` }} className="bg-rose-500" title="Protein" />
                  <div style={{ width: `${macroData.carbPct}%` }} className="bg-amber-500" title="Carbs" />
                  <div style={{ width: `${macroData.fatPct}%` }} className="bg-sky-500" title="Fats" />
                </div>
                <div className="flex justify-between text-[11px] text-secondary">
                  <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-rose-500" /> Protein (4 kcal/g)</span>
                  <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-500" /> Carbs (4 kcal/g)</span>
                  <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-sky-500" /> Fats (9 kcal/g)</span>
                </div>
              </div>

              {/* Pro Athlete Coaching Tip */}
              <div className="p-5 rounded-2xl bg-brand-800/15 border border-brand-500/20 space-y-2">
                <span className="text-xs font-bold text-active flex items-center gap-1.5">
                  <FiAward /> FlexPulse Pro Nutrition Tip
                </span>
                <p className="text-xs text-foreground leading-relaxed">
                  Fueling your body with adequate protein preserves lean muscle tissue during intense HIIT and resistance training. Hydrate with 3–4 liters of water daily to support muscle recovery.
                </p>
              </div>

              <Link
                href="/pricing"
                className="w-full py-3.5 rounded-xl bg-active text-btn-text text-sm font-bold flex items-center justify-center gap-2 shadow-lg hover:opacity-90 transition-all"
              >
                Join Pro Membership with Custom Nutrition <FiArrowRight size={14} />
              </Link>
            </div>
          </div>
        )}

        {/* Decorative VIP 1-Day Trial Pass Voucher Showcase */}
        <section id="trial-pass" className="mt-20 pt-16 border-t border-brand-500/20">
          <div className="relative rounded-3xl bg-linear-to-br from-active/15 via-[#1B1A55]/30 to-[#070F2B] border border-active/35 p-6 sm:p-10 shadow-2xl overflow-hidden">
            {/* Background ambient lighting */}
            <div className="absolute top-0 right-1/4 w-80 h-80 bg-active/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Ticket Info & Perks (7 cols) */}
              <div className="lg:col-span-7 space-y-5">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-active text-white text-xs font-bold uppercase tracking-wider shadow-sm">
                  <FiGift className="w-3.5 h-3.5" />
                  <span>Complimentary VIP Invitation</span>
                </div>

                <h3 className="font-['Outfit'] text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight leading-tight">
                  Test Your New Plan With a <br />
                  <span className="text-active">Free 1-Day VIP Pass</span>
                </h3>

                <p className="font-['Inter'] text-sm sm:text-base text-[#535C91] dark:text-[#9290C3] leading-relaxed max-w-xl">
                  Now that you know your body composition baseline and target calories, test drive your routine at FlexPulse. Enjoy full access to our Olympic weight room, functional turf, any studio group class, and recovery hydro-spa.
                </p>

                {/* Perforated Ticket Feature Chips */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 font-['Inter'] text-xs">
                  <div className="p-3 rounded-2xl bg-background/60 border border-brand-500/15 flex items-center gap-2.5">
                    <FiCheckCircle className="text-active w-4 h-4 shrink-0" />
                    <span className="font-semibold text-foreground">Olympic Weights</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-background/60 border border-brand-500/15 flex items-center gap-2.5">
                    <FiCheckCircle className="text-active w-4 h-4 shrink-0" />
                    <span className="font-semibold text-foreground">1 Group Class</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-background/60 border border-brand-500/15 flex items-center gap-2.5">
                    <FiCheckCircle className="text-active w-4 h-4 shrink-0" />
                    <span className="font-semibold text-foreground">InBody 570 Scan</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-background/60 border border-brand-500/15 flex items-center gap-2.5">
                    <FiCheckCircle className="text-active w-4 h-4 shrink-0" />
                    <span className="font-semibold text-foreground">Sauna & Recovery</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-background/60 border border-brand-500/15 flex items-center gap-2.5">
                    <FiCheckCircle className="text-active w-4 h-4 shrink-0" />
                    <span className="font-semibold text-foreground">Locker & Towel</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-background/60 border border-brand-500/15 flex items-center gap-2.5">
                    <FiShield className="text-active w-4 h-4 shrink-0" />
                    <span className="font-semibold text-foreground">No Credit Card</span>
                  </div>
                </div>
              </div>

              {/* Right Ticket Stub / Generator Card (5 cols) */}
              <div className="lg:col-span-5">
                <div className="relative rounded-3xl bg-[#070F2B] border-2 border-active/40 p-6 sm:p-8 shadow-2xl space-y-5">
                  {/* Decorative Ticket Perforation Badge */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-0.5 rounded-full bg-active text-white text-[10px] font-mono font-bold uppercase tracking-widest shadow-md">
                    ALL-ACCESS TICKET
                  </div>

                  {passGeneratedCode ? (
                    <div className="text-center space-y-4 py-3">
                      <div className="w-14 h-14 rounded-full bg-active/20 text-active flex items-center justify-center mx-auto">
                        <FiCheckCircle className="w-8 h-8" />
                      </div>
                      <h4 className="font-['Outfit'] text-2xl font-bold text-white">
                        Your Pass Is Ready!
                      </h4>
                      <p className="text-xs text-gray-300 font-['Inter']">
                        Show this digital pass code to our reception desk on arrival:
                      </p>

                      {/* Barcode & Code Box */}
                      <div className="p-4 rounded-2xl bg-black/70 border border-active/50 space-y-2 select-all">
                        <div className="font-mono text-3xl font-black text-active tracking-widest">
                          {passGeneratedCode}
                        </div>
                        <div className="text-[10px] text-gray-400 font-mono tracking-widest uppercase">
                          ||| | | |||| || | || |||| | |||
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={handleCopyCode}
                          className="flex-1 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                        >
                          {copied ? <FiCheck className="w-4 h-4 text-emerald-400" /> : <FiCopy className="w-4 h-4" />}
                          <span>{copied ? "Copied Code!" : "Copy Pass Code"}</span>
                        </button>
                        <Link
                          href="/schedule"
                          className="py-3 px-4 rounded-xl bg-active text-white font-bold text-xs flex items-center justify-center transition-all"
                        >
                          View Schedule
                        </Link>
                      </div>

                      <p className="text-[11px] text-gray-400 font-['Inter']">
                        Valid for 7 days from today. No hidden commitments.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleClaimPass} className="space-y-4 font-['Inter']">
                      <div className="text-center space-y-1">
                        <h4 className="font-['Outfit'] text-xl sm:text-2xl font-bold text-white">
                          Claim Digital Pass
                        </h4>
                        <p className="text-xs text-gray-400">
                          Instant confirmation • Generated in 2 seconds
                        </p>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                          Full Name
                        </label>
                        <input
                          type="text"
                          required
                          value={passData.name}
                          onChange={(e) => setPassData({ ...passData, name: e.target.value })}
                          placeholder="e.g. Jordan Miller"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white text-xs sm:text-sm focus:border-active outline-none placeholder-gray-500 transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                          Email Address
                        </label>
                        <input
                          type="email"
                          required
                          value={passData.email}
                          onChange={(e) => setPassData({ ...passData, email: e.target.value })}
                          placeholder="jordan@example.com"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white text-xs sm:text-sm focus:border-active outline-none placeholder-gray-500 transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                          Phone Number (Optional)
                        </label>
                        <input
                          type="tel"
                          value={passData.phone}
                          onChange={(e) => setPassData({ ...passData, phone: e.target.value })}
                          placeholder="+880 1700-000000"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white text-xs sm:text-sm focus:border-active outline-none placeholder-gray-500 transition-all"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={passLoading}
                        className="w-full py-3.5 rounded-xl bg-active text-white font-bold text-sm shadow-lg hover:opacity-90 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                      >
                        {passLoading ? (
                          <span>Activating Pass...</span>
                        ) : (
                          <>
                            <FiZap className="w-4 h-4" />
                            <span>Activate My VIP Pass</span>
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
