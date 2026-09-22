"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FiCheck,
  FiX,
  FiZap,
  FiAward,
  FiStar,
  FiHelpCircle,
  FiGift,
  FiCalendar,
  FiPhone,
  FiMail,
  FiUser,
  FiArrowRight,
} from "react-icons/fi";
import { submitTrialPass } from "@/lib/api/getClasses";

const PLANS = [
  {
    id: "starter",
    name: "Starter Athlete",
    tagline: "Essential gym floor access for independent fitness enthusiasts.",
    monthlyPrice: 29,
    annualPrice: 23,
    popular: false,
    features: [
      "Access to full gym floor & cardio deck",
      "Standard locker room & shower access",
      "FlexPulse mobile workout tracker app",
      "1 Initial fitness assessment & body scan",
      "Access to community forum & nutrition tips",
    ],
    notIncluded: [
      "Group fitness classes & HIIT sessions",
      "Personal trainer 1-on-1 consultations",
      "Recovery spa, sauna & cold plunge",
      "VIP athletic lounge & free guest passes",
    ],
  },
  {
    id: "pro",
    name: "Pro Athlete",
    tagline: "The complete athletic package for serious gains and guided training.",
    monthlyPrice: 59,
    annualPrice: 47,
    popular: true,
    stripePlan: true,
    features: [
      "Unlimited access to all gym floors 24/7",
      "Full access to 120+ weekly group fitness classes",
      "2 Monthly 1-on-1 personal training sessions",
      "Full recovery spa, sauna & steam access",
      "Custom macronutrient & diet guide",
      "Priority class booking & spots reservation",
      "FlexPulse Pro Verified Member badge",
    ],
    notIncluded: [
      "Unlimited weekly 1-on-1 dedicated coach",
      "VIP private lounge & free laundry service",
    ],
  },
  {
    id: "elite",
    name: "VIP Elite Champion",
    tagline: "The ultimate concierge fitness experience for peak performance.",
    monthlyPrice: 99,
    annualPrice: 79,
    popular: false,
    features: [
      "Everything in Pro Athlete tier included",
      "Weekly 1-on-1 sessions with Master Coach",
      "Unlimited recovery spa, cold plunge & massage therapy",
      "Exclusive access to VIP Executive Lounge",
      "Complimentary monthly guest passes (4 passes)",
      "Free monthly premium protein & supplement pack",
      "Complimentary locker reservation with laundry service",
    ],
    notIncluded: [],
  },
];

const COMPARISON_ROWS = [
  { feature: "Gym Floor & Free Weights Access", starter: true, pro: true, elite: true },
  { feature: "Cardio Arena & Functional Turf", starter: true, pro: true, elite: true },
  { feature: "FlexPulse Mobile Tracker", starter: true, pro: true, elite: true },
  { feature: "Group Classes (HIIT, Yoga, Boxing)", starter: false, pro: "Unlimited", elite: "Unlimited" },
  { feature: "Personal Training Sessions", starter: "1 Free Scan", pro: "2 / month", elite: "Weekly (4 / mo)" },
  { feature: "Infrared Sauna & Steam Rooms", starter: false, pro: true, elite: true },
  { feature: "Cold Plunge & Hydro-Recovery", starter: false, pro: false, elite: true },
  { feature: "Nutrition & Custom Meal Plans", starter: "Basic Guide", pro: "Customized", elite: "Dedicated Dietitian" },
  { feature: "Free Guest Passes", starter: false, pro: "1 / month", elite: "4 / month" },
  { feature: "VIP Lounge & Complimentary Shake Bar", starter: false, pro: false, elite: true },
];

export default function PricingClient() {
  const [isAnnual, setIsAnnual] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Free trial pass form state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    preferredDate: "",
    preferredTime: "Morning (08:00 AM - 11:00 AM)",
    fitnessGoal: "General Strength & Muscle Gain",
  });
  const [submitting, setSubmitting] = useState(false);
  const [passResult, setPassResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const handleTrialSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg("");

    try {
      const res = await submitTrialPass(formData);
      if (res.success) {
        setPassResult(res);
      } else {
        setErrorMsg(res.message || "Failed to generate pass.");
      }
    } catch (err) {
      setErrorMsg("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-14 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-active/30 bg-active/10 text-active text-xs font-extrabold uppercase tracking-widest">
            <FiZap size={13} />
            Transparent Membership Pricing
          </div>
          <h1 className="font-['Outfit'] text-4xl sm:text-5xl lg:text-6xl font-black text-foreground tracking-tight">
            Invest in Your <span className="text-active">Health & Power</span>
          </h1>
          <p className="font-['Inter'] text-sm sm:text-base text-secondary max-w-2xl mx-auto leading-relaxed">
            No hidden contracts. No cancellation penalties. Choose the training tier that fuels your lifestyle and upgrade or pause anytime.
          </p>

          {/* Billing Cycle Toggle */}
          <div className="flex items-center justify-center gap-3 pt-3">
            <span className={`text-xs sm:text-sm font-bold ${!isAnnual ? "text-foreground" : "text-secondary"}`}>
              Monthly Billing
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative w-14 h-8 rounded-full bg-brand-800/40 border border-brand-500/30 p-1 transition-colors cursor-pointer"
            >
              <div
                className={`w-6 h-6 rounded-full bg-active transition-transform duration-300 ${
                  isAnnual ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </button>
            <span className={`text-xs sm:text-sm font-bold flex items-center gap-1.5 ${isAnnual ? "text-foreground" : "text-secondary"}`}>
              Annual Billing
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-black uppercase">
                Save 20%
              </span>
            </span>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {PLANS.map((plan) => {
            const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;
            return (
              <div
                key={plan.id}
                className={`relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                  plan.popular
                    ? "bg-brand-900/60 dark:bg-[#15132d] border-2 border-active shadow-2xl scale-[1.03] z-10"
                    : "bg-brand-900/40 dark:bg-[#121026]/70 border border-brand-500/20 hover:border-brand-500/40 shadow-lg"
                }`}
              >
                {/* Popular Pill */}
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-active text-btn-text text-xs font-black uppercase tracking-widest shadow-lg flex items-center gap-1.5">
                    <FiStar className="fill-white" size={12} /> Most Popular Athlete Choice
                  </div>
                )}

                <div className="space-y-6">
                  {/* Title & Tagline */}
                  <div className="space-y-2 border-b border-brand-500/15 pb-6">
                    <h3 className="font-['Outfit'] text-2xl font-black text-foreground">
                      {plan.name}
                    </h3>
                    <p className="text-xs text-secondary leading-relaxed min-h-[36px]">
                      {plan.tagline}
                    </p>
                  </div>

                  {/* Price Display */}
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-black text-active">$</span>
                    <span className="font-['Outfit'] text-5xl font-black text-foreground">
                      {price}
                    </span>
                    <span className="text-xs text-secondary font-semibold">
                      / month {isAnnual && "(billed annually)"}
                    </span>
                  </div>

                  {/* Features List */}
                  <div className="space-y-3 pt-2">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-secondary block">
                      What&apos;s Included:
                    </span>
                    <ul className="space-y-2.5 text-xs text-foreground">
                      {plan.features.map((feat) => (
                        <li key={feat} className="flex items-start gap-2.5">
                          <FiCheck className="text-emerald-500 shrink-0 mt-0.5" size={14} />
                          <span>{feat}</span>
                        </li>
                      ))}
                      {plan.notIncluded.map((feat) => (
                        <li key={feat} className="flex items-start gap-2.5 text-secondary/60 line-through">
                          <FiX className="text-secondary/50 shrink-0 mt-0.5" size={14} />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card CTA */}
                <div className="pt-8 mt-6 border-t border-brand-500/15 space-y-2">
                  <Link
                    href={plan.stripePlan ? "/signin" : "/contact"}
                    className={`w-full py-3.5 rounded-xl text-center text-xs sm:text-sm font-bold shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      plan.popular
                        ? "bg-active text-btn-text hover:opacity-90 shadow-active/20"
                        : "bg-brand-800/20 text-foreground border border-brand-500/30 hover:border-active"
                    }`}
                  >
                    {plan.stripePlan ? "Join Pro Membership" : "Get Started Now"}
                    <FiArrowRight size={14} />
                  </Link>
                  <p className="text-[10px] text-center text-secondary">
                    Instant activation • 14-day money-back guarantee
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* 1-Day VIP Trial Pass Banner */}
        <div className="relative rounded-3xl bg-linear-to-r from-active/25 via-brand-500/15 to-transparent border border-active/40 p-8 sm:p-12 overflow-hidden shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-center lg:text-left">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-active text-btn-text text-xs font-black uppercase tracking-widest shadow">
              <FiGift size={12} /> Exclusive Welcome Offer
            </span>
            <h2 className="font-['Outfit'] text-3xl sm:text-4xl font-black text-foreground tracking-tight">
              Not Ready to Commit? Try a <span className="text-active">Free 1-Day VIP Pass</span>
            </h2>
            <p className="text-xs sm:text-sm text-secondary max-w-xl leading-relaxed">
              Experience the FlexPulse energy first-hand. Workout on our Olympic lifting deck, join any HIIT or Yoga class, and unwind in the recovery sauna completely free.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="px-8 py-4 rounded-2xl bg-active text-btn-text text-sm font-black shadow-xl hover:scale-105 transition-all flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <FiZap size={16} /> Claim Free 1-Day Pass
          </button>
        </div>

        {/* Feature Comparison Matrix Table */}
        <div className="space-y-6 pt-6">
          <div className="text-center space-y-2">
            <h3 className="font-['Outfit'] text-2xl sm:text-3xl font-extrabold text-foreground">
              Detailed Plan Comparison
            </h3>
            <p className="text-xs sm:text-sm text-secondary">
              A line-by-line breakdown of gym amenities, personal coaching, and recovery access.
            </p>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-brand-500/20 bg-brand-900/40 dark:bg-[#121026]/60 backdrop-blur-xl shadow-xl">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="border-b border-brand-500/20 bg-brand-800/20 text-secondary uppercase font-bold text-[11px]">
                <tr>
                  <th className="py-4 px-6">Gym Feature / Privilege</th>
                  <th className="py-4 px-6 text-center">Starter Athlete</th>
                  <th className="py-4 px-6 text-center text-active">Pro Athlete</th>
                  <th className="py-4 px-6 text-center">VIP Elite</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-500/10">
                {COMPARISON_ROWS.map((row) => (
                  <tr key={row.feature} className="hover:bg-brand-500/5 transition-colors">
                    <td className="py-4 px-6 font-semibold text-foreground">{row.feature}</td>
                    <td className="py-4 px-6 text-center">
                      {typeof row.starter === "boolean" ? (
                        row.starter ? (
                          <FiCheck className="text-emerald-500 mx-auto" size={16} />
                        ) : (
                          <FiX className="text-secondary/40 mx-auto" size={16} />
                        )
                      ) : (
                        <span className="font-bold text-foreground">{row.starter}</span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-center bg-active/5">
                      {typeof row.pro === "boolean" ? (
                        row.pro ? (
                          <FiCheck className="text-emerald-500 mx-auto" size={16} />
                        ) : (
                          <FiX className="text-secondary/40 mx-auto" size={16} />
                        )
                      ) : (
                        <span className="font-bold text-active">{row.pro}</span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-center">
                      {typeof row.elite === "boolean" ? (
                        row.elite ? (
                          <FiCheck className="text-emerald-500 mx-auto" size={16} />
                        ) : (
                          <FiX className="text-secondary/40 mx-auto" size={16} />
                        )
                      ) : (
                        <span className="font-bold text-foreground">{row.elite}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pricing FAQs */}
        <div className="space-y-6 pt-4 max-w-4xl mx-auto">
          <div className="text-center space-y-2">
            <h3 className="font-['Outfit'] text-2xl sm:text-3xl font-extrabold text-foreground">
              Frequently Asked Questions
            </h3>
            <p className="text-xs sm:text-sm text-secondary">
              Everything you need to know about joining FlexPulse.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                q: "Can I cancel or freeze my membership at any time?",
                a: "Yes! There are no lock-in cancellation fees. You can freeze your membership for up to 60 days per year or cancel with 1-click in your account settings.",
              },
              {
                q: "What is included in the 1-Day Free Trial Pass?",
                a: "Your trial pass grants full access to our gym floor, any scheduled group fitness class, locker rooms, and sauna for one full calendar day.",
              },
              {
                q: "Do I need to bring my own lock or towel?",
                a: "Lockers with digital pin codes are provided complimentary for all members. Pro and Elite tiers also include luxury towel service.",
              },
              {
                q: "Are personal training sessions included in Pro plans?",
                a: "Yes, Pro Athlete members receive 2 complimentary 1-on-1 personal trainer sessions each month, tailored to your body composition goals.",
              },
            ].map((faq) => (
              <div
                key={faq.q}
                className="p-5 rounded-2xl bg-brand-900/40 dark:bg-[#121026]/70 border border-brand-500/20 space-y-2"
              >
                <h4 className="text-sm font-bold text-foreground flex items-center gap-2">
                  <FiHelpCircle className="text-active shrink-0" size={15} />
                  {faq.q}
                </h4>
                <p className="text-xs text-secondary leading-relaxed pl-6">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===================== MODAL: CLAIM FREE TRIAL PASS ===================== */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg rounded-3xl bg-brand-900 dark:bg-[#14122b] border border-brand-500/30 p-6 sm:p-8 shadow-2xl space-y-6">
            <button
              onClick={() => {
                setIsModalOpen(false);
                setPassResult(null);
              }}
              className="absolute top-4 right-4 p-2 rounded-xl text-secondary hover:text-foreground bg-background/50 border border-brand-500/20 cursor-pointer"
            >
              <FiX size={16} />
            </button>

            {!passResult ? (
              <>
                <div className="space-y-1.5">
                  <span className="text-[11px] font-extrabold uppercase tracking-widest text-active">
                    FlexPulse VIP Access
                  </span>
                  <h3 className="font-['Outfit'] text-2xl font-black text-foreground">
                    Claim Your Free 1-Day Trial Pass
                  </h3>
                  <p className="text-xs text-secondary">
                    Fill out the form below to receive your instant digital pass code. Show it at the front desk when you arrive!
                  </p>
                </div>

                {errorMsg && (
                  <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-400 text-xs font-semibold">
                    {errorMsg}
                  </div>
                )}

                <form onSubmit={handleTrialSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-secondary">Full Name *</label>
                    <div className="relative">
                      <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-secondary" size={14} />
                      <input
                        type="text"
                        required
                        placeholder="Alex Hunter"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-background/60 border border-brand-500/20 text-foreground text-xs sm:text-sm focus:outline-none focus:border-active"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-secondary">Email Address *</label>
                      <div className="relative">
                        <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-secondary" size={14} />
                        <input
                          type="email"
                          required
                          placeholder="alex@gmail.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-background/60 border border-brand-500/20 text-foreground text-xs sm:text-sm focus:outline-none focus:border-active"
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-secondary">Phone Number</label>
                      <div className="relative">
                        <FiPhone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-secondary" size={14} />
                        <input
                          type="tel"
                          placeholder="+1 (555) 000-0000"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-background/60 border border-brand-500/20 text-foreground text-xs sm:text-sm focus:outline-none focus:border-active"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-secondary">Preferred Date</label>
                      <input
                        type="date"
                        value={formData.preferredDate}
                        onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl bg-background/60 border border-brand-500/20 text-foreground text-xs sm:text-sm focus:outline-none focus:border-active"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-secondary">Preferred Time</label>
                      <select
                        value={formData.preferredTime}
                        onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl bg-background/60 border border-brand-500/20 text-foreground text-xs sm:text-sm focus:outline-none focus:border-active"
                      >
                        <option value="Morning (08:00 AM - 11:00 AM)">Morning (8–11 AM)</option>
                        <option value="Afternoon (12:00 PM - 04:00 PM)">Afternoon (12–4 PM)</option>
                        <option value="Evening (05:00 PM - 09:00 PM)">Evening (5–9 PM)</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-secondary">Primary Fitness Goal</label>
                    <select
                      value={formData.fitnessGoal}
                      onChange={(e) => setFormData({ ...formData, fitnessGoal: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-background/60 border border-brand-500/20 text-foreground text-xs sm:text-sm focus:outline-none focus:border-active"
                    >
                      <option value="General Strength & Muscle Gain">Strength & Muscle Hypertrophy</option>
                      <option value="Fat Loss & Cardio Conditioning">Fat Loss & Conditioning</option>
                      <option value="CrossFit & Athletic Power">CrossFit & Functional Power</option>
                      <option value="Yoga, Mobility & Mental Health">Yoga & Flexibility</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3.5 rounded-xl bg-active text-btn-text text-sm font-bold shadow-lg hover:opacity-90 disabled:opacity-50 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {submitting ? "Generating Pass..." : "Generate VIP Pass Now"}
                  </button>
                </form>
              </>
            ) : (
              /* Success State */
              <div className="text-center space-y-5 py-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 mx-auto flex items-center justify-center text-3xl">
                  ✓
                </div>
                <div className="space-y-1">
                  <h3 className="font-['Outfit'] text-2xl font-black text-foreground">
                    VIP Pass Activated!
                  </h3>
                  <p className="text-xs text-secondary">
                    Your free 1-day pass code has been generated. Present this at front desk check-in.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-brand-800/30 border border-brand-500/30 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-secondary">Your Pass Code</span>
                  <div className="font-['Outfit'] text-3xl font-black text-active tracking-widest">
                    {passResult.passCode}
                  </div>
                </div>

                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    setPassResult(null);
                  }}
                  className="w-full py-3 rounded-xl bg-active text-btn-text text-xs font-bold hover:opacity-90 transition-all cursor-pointer"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
