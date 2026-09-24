"use client";

import { useState } from "react";
import Link from "next/link";
import { FiArrowRight, FiActivity, FiCheck, FiInfo } from "react-icons/fi";

export default function HomeBmiQuickCalc() {
  const [unit, setUnit] = useState("metric"); // metric | imperial
  const [weight, setWeight] = useState(72);
  const [heightCm, setHeightCm] = useState(175);
  const [heightFt, setHeightFt] = useState(5);
  const [heightIn, setHeightIn] = useState(9);
  const [weightLbs, setWeightLbs] = useState(160);

  const calculateBmi = () => {
    let bmiVal = 0;
    if (unit === "metric") {
      const heightInMeters = Number(heightCm) / 100;
      if (heightInMeters > 0 && weight > 0) {
        bmiVal = Number(weight) / (heightInMeters * heightInMeters);
      }
    } else {
      const totalInches = Number(heightFt) * 12 + Number(heightIn);
      if (totalInches > 0 && weightLbs > 0) {
        bmiVal = (Number(weightLbs) / (totalInches * totalInches)) * 703;
      }
    }
    return bmiVal > 0 ? Number(bmiVal.toFixed(1)) : 0;
  };

  const bmi = calculateBmi();

  const getBmiDetails = (val) => {
    if (!val) return { label: "Awaiting Input", color: "text-gray-400", bg: "bg-gray-500/10", advice: "Enter your height and weight to reveal your body index." };
    if (val < 18.5) return { label: "Underweight", color: "text-amber-400", bg: "bg-amber-500/10", advice: "Prioritize nutrient-dense whole foods and progressive strength resistance." };
    if (val < 25) return { label: "Optimal Fitness", color: "text-emerald-400", bg: "bg-emerald-500/10", advice: "Excellent metabolic balance! Maintain with hybrid resistance and HIIT." };
    if (val < 30) return { label: "Overweight", color: "text-orange-400", bg: "bg-orange-500/10", advice: "Focus on caloric deficit combined with functional hypertrophy and cardio." };
    return { label: "Obese Tier", color: "text-rose-500", bg: "bg-rose-500/10", advice: "Consult our certified personal trainers for guided low-impact conditioning." };
  };

  const currentStatus = getBmiDetails(bmi);

  return (
    <section className="py-24 bg-linear-to-b from-background via-[#1B1A55]/10 to-background border-t border-brand-500/15 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text & Chart Reference (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-800/20 border border-brand-500/30 text-active text-xs font-bold tracking-wider uppercase">
              <FiActivity className="w-3.5 h-3.5" /> Instant Health Gauge
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-['Outfit'] tracking-tight">
              Know Your <span className="text-active">BMI</span> & Physical Baseline
            </h2>
            <p className="text-sm text-[#535C91] dark:text-[#9290C3] font-['Inter'] leading-relaxed">
              Body Mass Index (BMI) is a clinical benchmark used by athletic trainers worldwide to analyze body composition, tailor workout splits, and calculate target macros.
            </p>

            {/* BMI Reference Table */}
            <div className="p-4 rounded-2xl bg-[#535C91]/5 dark:bg-[#070F2B] border border-brand-500/20 font-['Inter'] text-xs space-y-2">
              <div className="flex justify-between font-bold text-foreground pb-2 border-b border-brand-500/10 uppercase tracking-wider text-[11px]">
                <span>BMI Range</span>
                <span>Classification</span>
              </div>
              <div className="flex justify-between text-amber-400">
                <span>Below 18.5</span>
                <span>Underweight</span>
              </div>
              <div className="flex justify-between text-emerald-400 font-semibold">
                <span>18.5 – 24.9</span>
                <span>Healthy / Optimal</span>
              </div>
              <div className="flex justify-between text-orange-400">
                <span>25.0 – 29.9</span>
                <span>Overweight</span>
              </div>
              <div className="flex justify-between text-rose-400">
                <span>30.0 & Above</span>
                <span>Obese Class</span>
              </div>
            </div>

            <Link
              href="/calculator"
              className="inline-flex items-center gap-2 text-sm font-bold text-active hover:underline"
            >
              Need Calorie & Macro distribution? Open Advanced Calculator <FiArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Right Interactive Calculator Box (7 cols) */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-[#535C91]/5 dark:bg-[#070F2B] border border-brand-500/20 shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-brand-500/15">
                <h3 className="font-['Outfit'] text-2xl font-bold text-foreground">
                  Quick BMI Estimator
                </h3>
                {/* Metric/Imperial Switcher */}
                <div className="flex p-1 rounded-xl bg-background border border-brand-500/20 font-['Inter'] text-xs font-semibold">
                  <button
                    onClick={() => setUnit("metric")}
                    className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                      unit === "metric" ? "bg-active text-white shadow-xs" : "text-[#535C91] dark:text-[#9290C3]"
                    }`}
                  >
                    Metric (kg/cm)
                  </button>
                  <button
                    onClick={() => setUnit("imperial")}
                    className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                      unit === "imperial" ? "bg-active text-white shadow-xs" : "text-[#535C91] dark:text-[#9290C3]"
                    }`}
                  >
                    Imperial (lbs/ft)
                  </button>
                </div>
              </div>

              {/* Input Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8 font-['Inter']">
                {unit === "metric" ? (
                  <>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-foreground mb-2">
                        Height (cm)
                      </label>
                      <input
                        type="number"
                        min="100"
                        max="250"
                        value={heightCm}
                        onChange={(e) => setHeightCm(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-background border border-brand-500/20 text-foreground font-bold focus:border-active outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-foreground mb-2">
                        Weight (kg)
                      </label>
                      <input
                        type="number"
                        min="30"
                        max="220"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-background border border-brand-500/20 text-foreground font-bold focus:border-active outline-none"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex gap-2">
                      <div className="flex-1">
                        <label className="block text-xs font-bold uppercase tracking-wider text-foreground mb-2">
                          Feet
                        </label>
                        <input
                          type="number"
                          min="3"
                          max="7"
                          value={heightFt}
                          onChange={(e) => setHeightFt(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-background border border-brand-500/20 text-foreground font-bold focus:border-active outline-none"
                        />
                      </div>
                      <div className="flex-1">
                        <label className="block text-xs font-bold uppercase tracking-wider text-foreground mb-2">
                          Inches
                        </label>
                        <input
                          type="number"
                          min="0"
                          max="11"
                          value={heightIn}
                          onChange={(e) => setHeightIn(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-background border border-brand-500/20 text-foreground font-bold focus:border-active outline-none"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-foreground mb-2">
                        Weight (lbs)
                      </label>
                      <input
                        type="number"
                        min="70"
                        max="500"
                        value={weightLbs}
                        onChange={(e) => setWeightLbs(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-background border border-brand-500/20 text-foreground font-bold focus:border-active outline-none"
                      />
                    </div>
                  </>
                )}
              </div>

              {/* Dynamic Result Panel */}
              <div className="p-6 rounded-2xl bg-background/80 border border-brand-500/20 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <span className="text-xs uppercase tracking-wider font-semibold text-[#535C91] dark:text-[#9290C3]">
                    Your Calculated BMI
                  </span>
                  <div className="flex items-baseline gap-3 mt-1">
                    <span className="text-4xl font-extrabold font-['Outfit'] text-active">
                      {bmi}
                    </span>
                    <span className={`text-sm font-bold px-3 py-1 rounded-full ${currentStatus.bg} ${currentStatus.color}`}>
                      {currentStatus.label}
                    </span>
                  </div>
                  <p className="text-xs text-[#535C91] dark:text-[#9290C3] mt-2 font-['Inter']">
                    {currentStatus.advice}
                  </p>
                </div>

                <Link
                  href="/all-classes"
                  className="w-full sm:w-auto px-6 py-3.5 bg-btn-bg text-btn-text font-bold text-sm rounded-xl shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all text-center whitespace-nowrap"
                >
                  Find Ideal Classes
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
