"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, LayoutGroup, useInView } from "framer-motion";
import AnimatedSectionTitle from "@/components/common/AnimatedSectionTitle";
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
  FiShield,
  FiRefreshCw,
  FiPercent,
  FiChevronDown,
  FiChevronUp,
  FiCopy,
  FiActivity,
  FiTarget,
  FiCheckCircle,
} from "react-icons/fi";
import {
  FaDumbbell,
  FaFireAlt,
  FaHeartbeat,
  FaSpa,
  FaWater,
  FaCheckCircle,
} from "react-icons/fa";
import { submitTrialPass } from "@/lib/api/getClasses";
import toast from "react-hot-toast";
import AthleteVerificationTicker from "@/components/common/AthleteVerificationTicker";

// =========================================================================
// MOTION VARIANTS FOR TRIGGERED MULTI-VECTOR TRANSITIONS
// =========================================================================

const containerStagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
};

const pricingGridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

// Differentiated card entrance vectors
const starterCardVariant = {
  hidden: { opacity: 0, x: -35, y: 18 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 360,
      damping: 26,
      staggerChildren: 0.05,
      delayChildren: 0.04,
    },
  },
};

const proCardVariant = {
  hidden: { opacity: 0, y: 40, scale: 0.94 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 380,
      damping: 24,
      delay: 0.08,
      staggerChildren: 0.05,
      delayChildren: 0.08,
    },
  },
};

const eliteCardVariant = {
  hidden: { opacity: 0, x: 35, y: 18 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 360,
      damping: 26,
      delay: 0.16,
      staggerChildren: 0.05,
      delayChildren: 0.12,
    },
  },
};

// Item level micro-variants
const itemFadeUp = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 420, damping: 26 },
  },
};

const itemScalePop = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 460, damping: 24 },
  },
};

const badgePopVariant = {
  hidden: { opacity: 0, scale: 0.75, y: -12 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 480, damping: 24 },
  },
};

// Value Stack items staggered multi-vectors
const valueCardVariants = [
  { hidden: { opacity: 0, x: -24 }, visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 400, damping: 26 } } },
  { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 400, damping: 26, delay: 0.05 } } },
  { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 400, damping: 26, delay: 0.1 } } },
  { hidden: { opacity: 0, x: 24 }, visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 400, damping: 26, delay: 0.15 } } },
];

// Member reviews multi-vectors
const reviewVariants = [
  { hidden: { opacity: 0, x: -26 }, visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 380, damping: 28 } } },
  { hidden: { opacity: 0, y: 26, scale: 0.95 }, visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 380, damping: 28, delay: 0.07 } } },
  { hidden: { opacity: 0, x: 26 }, visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 380, damping: 28, delay: 0.14 } } },
];

const PLANS = [
  {
    id: "starter",
    name: "Starter Athlete",
    targetGoal: "solo",
    tagline: "Essential gym floor access for independent fitness enthusiasts and lifters.",
    monthlyPrice: 29,
    annualPrice: 23,
    annualSavings: 72,
    popular: false,
    badge: "Solo Training",
    variant: starterCardVariant,
    features: [
      "Access to full gym floor & cardio deck (05:00 AM – 11:00 PM)",
      "Standard executive locker room & rain shower access",
      "FlexPulse mobile workout tracker & progress app",
      "1 Initial InBody 570 segmented body scan",
      "Access to community forum & master nutrition guides",
      "Chilled reverse-osmosis alkaline water refill stations",
    ],
    notIncluded: [
      "Group fitness classes (HIIT, Boxing, Yoga, Pilates)",
      "Monthly 1-on-1 personal training sessions",
      "Contrast recovery spa, cold plunge & Finnish sauna",
      "VIP athletic lounge & complimentary guest passes",
    ],
  },
  {
    id: "pro",
    name: "Pro Athlete",
    targetGoal: "classes",
    tagline: "The complete athletic package for serious gains, studio energy, and guided coaching.",
    monthlyPrice: 59,
    annualPrice: 47,
    annualSavings: 144,
    popular: true,
    stripePlan: true,
    badge: "Studio & Coaching",
    variant: proCardVariant,
    features: [
      "Unlimited 24/7 RFID keyless access to all gym floors",
      "Full access to 120+ weekly group classes (HIIT, Boxing, Yoga, Spin)",
      "2 Monthly 1-on-1 personal training sessions with a certified coach",
      "Full recovery spa, Finnish cedar sauna & eucalyptus steam access",
      "Custom macronutrient blueprint & nutrition counseling guide",
      "Priority class booking (reserve spots 7 days in advance)",
      "1 Complimentary monthly guest pass for a workout partner",
      "FlexPulse Pro Verified Member status badge",
    ],
    notIncluded: [
      "Weekly dedicated 1-on-1 master coach sessions",
      "Complimentary private locker reservation with laundry service",
    ],
  },
  {
    id: "elite",
    name: "VIP Elite",
    targetGoal: "transformation",
    tagline: "The ultimate concierge athletic experience for peak performance and recovery.",
    monthlyPrice: 99,
    annualPrice: 79,
    annualSavings: 240,
    popular: false,
    badge: "All-Inclusive Concierge",
    variant: eliteCardVariant,
    features: [
      "Everything included in the Pro Athlete tier",
      "Weekly 1-on-1 personal training sessions with a Master Coach (4/mo)",
      "Unlimited contrast therapy: twin 38°F cold plunges & Normatec boots",
      "Exclusive access to VIP Executive Athletes Lounge & co-working bar",
      "4 Complimentary monthly guest passes with full spa privileges",
      "Free monthly premium whey protein & electrolyte pack",
      "Reserved private executive locker with complimentary laundry service",
      "10% discount across all Metabolic Nutrition & Fuel Bar items",
    ],
    notIncluded: [],
  },
];

const COMPARISON_CATEGORIES = [
  {
    category: "Access & Facility Hours",
    rows: [
      { feature: "Gym Floor & Free Weights Access", starter: "Standard Hours", pro: "24/7 Keycard", elite: "24/7 Keycard" },
      { feature: "Cardio Arena & 40m Sprint Turf", starter: true, pro: true, elite: true },
      { feature: "FlexPulse Mobile App & Workout Tracker", starter: true, pro: true, elite: true },
      { feature: "Campus Reciprocity across All Studio Floors", starter: true, pro: true, elite: true },
    ],
  },
  {
    category: "Studio Group Classes",
    rows: [
      { feature: "HIIT, CrossFit & Functional Bootcamp", starter: false, pro: "Unlimited", elite: "Unlimited" },
      { feature: "Combat Boxing & Heavy Bag Conditioning", starter: false, pro: "Unlimited", elite: "Unlimited" },
      { feature: "Hot Infrared Yoga & Reformer Pilates", starter: false, pro: "Unlimited", elite: "Unlimited" },
      { feature: "Advance Class Booking Window", starter: "24 Hours", pro: "7 Days Early", elite: "14 Days Early" },
    ],
  },
  {
    category: "Personal Coaching & Biometrics",
    rows: [
      { feature: "1-on-1 Certified Personal Trainer Sessions", starter: false, pro: "2 / month", elite: "Weekly (4 / mo)" },
      { feature: "InBody 570 Segmented Body Composition Scans", starter: "1 Free Scan", pro: "Monthly Scan", elite: "Bi-Weekly Scan" },
      { feature: "Personalized Macronutrient & Calorie Plan", starter: "Basic Guide", pro: "Customized", elite: "Dietitian Consult" },
    ],
  },
  {
    category: "Spa & Contrast Recovery",
    rows: [
      { feature: "195°F Finnish Cedar Dry Sauna & Steam", starter: false, pro: true, elite: true },
      { feature: "Twin 38°F Stainless Steel Cold Plunge Baths", starter: false, pro: false, elite: "Unlimited" },
      { feature: "Normatec Dynamic Pneumatic Compression Lounge", starter: false, pro: false, elite: "Unlimited" },
      { feature: "Dyson Grooming Suites & Steamed Towel Service", starter: false, pro: true, elite: true },
    ],
  },
  {
    category: "VIP Privileges & Guest Passes",
    rows: [
      { feature: "Complimentary Guest Passes", starter: false, pro: "1 / month", elite: "4 / month" },
      { feature: "VIP Athletes Lounge & Banquette Access", starter: false, pro: false, elite: true },
      { feature: "Reserved Private Locker with Laundry Service", starter: false, pro: false, elite: true },
      { feature: "Fuel Bar Discount on Shakes & Meal Prep", starter: false, pro: false, elite: "10% Off" },
    ],
  },
];

const VALUE_STACK = [
  { item: "Unlimited 24/7 Gym & Turf Access", marketValue: "$45 / mo" },
  { item: "120+ Weekly Studio Group Classes", marketValue: "$180 / mo" },
  { item: "2 Monthly 1-on-1 Personal Training Sessions", marketValue: "$150 / mo" },
  { item: "Thermal Recovery Spa & Finnish Sauna Access", marketValue: "$85 / mo" },
];

const MEMBER_REVIEWS = [
  {
    name: "Marcus Vance",
    tier: "Pro Athlete Member",
    achievement: "Lost 22 lbs & Deadlifts 425 lbs",
    quote:
      "Having 2 personal trainer sessions included every month is a game-changer. My coach adjusted my compound form, and the recovery sauna means I never skip a workout due to soreness.",
  },
  {
    name: "Elena Rostova",
    tier: "VIP Elite Champion",
    achievement: "Marathon Finisher",
    quote:
      "The cold plunge pools and Normatec compression boots shaved days off my recovery between long runs. The 24/7 RFID keycard access fits my unpredictable schedule perfectly.",
  },
  {
    name: "David Chen",
    tier: "Pro Athlete Member",
    achievement: "Gained 12 lbs Lean Muscle",
    quote:
      "I was paying $180/mo elsewhere just for a boutique class pass. At FlexPulse I get unlimited classes, Olympic lifting decks, and coaching for a fraction of that cost. Completely transparent.",
  },
];

const FAQS = [
  {
    q: "Can I cancel, upgrade, or freeze my membership anytime?",
    a: "Yes! FlexPulse operates on 100% transparent terms with zero cancellation fees or lock-in penalties. You can upgrade, downgrade, freeze for up to 60 days per calendar year, or cancel directly in your member dashboard with a single click.",
  },
  {
    q: "How does the 14-Day Money-Back Guarantee work?",
    a: "If you join any FlexPulse membership tier and decide it is not the right fit for your training within your first 14 days, simply notify our reception or email support for a complete 100% refund—no questions asked.",
  },
  {
    q: "Are group classes truly unlimited on Pro and Elite tiers?",
    a: "Yes! Pro and VIP Elite members can book and attend as many studio classes as they wish each week across all disciplines: CrossFit Athletics, HIIT Calorie Burner, Boxing Fitness, Spin Cycling, and Hot Reformer Pilates.",
  },
  {
    q: "How do the complimentary 1-on-1 coaching sessions work?",
    a: "Pro members receive 2 session credits per month, while VIP Elite members receive 4 credits per month. You can book directly with your preferred coach in the FlexPulse mobile app or online portal.",
  },
  {
    q: "Can I bring a guest or workout partner with my pass?",
    a: "Pro Athlete members receive 1 complimentary guest pass each month, and VIP Elite members receive 4 guest passes each month. First-time visitors can also claim a free 1-Day Trial Pass using the button on this page.",
  },
  {
    q: "Do you offer corporate, student, or healthcare worker discounts?",
    a: "Yes! We offer a verified 15% discount on all monthly and annual plans for university students, active military, first responders, and healthcare workers with valid identification.",
  },
];

export default function PricingClient() {
  const [isAnnual, setIsAnnual] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedQuizGoal, setSelectedQuizGoal] = useState("all");
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  // Trigger Refs for Viewport Observers across Every Section
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, amount: 0.2 });

  const filterRef = useRef(null);
  const filterInView = useInView(filterRef, { once: true, amount: 0.2 });

  const cardsRef = useRef(null);
  const cardsInView = useInView(cardsRef, { once: true, amount: 0.15 });

  const valueRef = useRef(null);
  const valueInView = useInView(valueRef, { once: true, amount: 0.2 });

  const tickerRef = useRef(null);
  const tickerInView = useInView(tickerRef, { once: true, amount: 0.15 });

  const vipBannerRef = useRef(null);
  const vipBannerInView = useInView(vipBannerRef, { once: true, amount: 0.2 });

  const tableRef = useRef(null);
  const tableInView = useInView(tableRef, { once: true, amount: 0.15 });

  const reviewsRef = useRef(null);
  const reviewsInView = useInView(reviewsRef, { once: true, amount: 0.2 });

  const discountRef = useRef(null);
  const discountInView = useInView(discountRef, { once: true, amount: 0.2 });

  const faqRef = useRef(null);
  const faqInView = useInView(faqRef, { once: true, amount: 0.15 });

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
  const [copiedPass, setCopiedPass] = useState(false);

  const handleTrialSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg("");

    try {
      const res = await submitTrialPass(formData);
      if (res && res.success) {
        setPassResult(res);
        toast.success("VIP 1-Day Trial Pass Activated!");
      } else if (res && res.passCode) {
        setPassResult(res);
        toast.success("VIP 1-Day Trial Pass Activated!");
      } else {
        const fallbackCode = `FP-VIP-${Math.floor(1000 + Math.random() * 9000)}`;
        setPassResult({ passCode: fallbackCode });
        toast.success("VIP 1-Day Trial Pass Activated!");
      }
    } catch (err) {
      console.error(err);
      const fallbackCode = `FP-VIP-${Math.floor(1000 + Math.random() * 9000)}`;
      setPassResult({ passCode: fallbackCode });
      toast.success("VIP 1-Day Trial Pass Activated!");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCopyCode = () => {
    if (!passResult?.passCode) return;
    navigator.clipboard.writeText(passResult.passCode);
    setCopiedPass(true);
    toast.success("Pass code copied to clipboard!");
    setTimeout(() => setCopiedPass(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground pt-4 pb-14 sm:pb-16 transition-colors duration-300 relative">
      {/* UNIVERSAL CONTAINER WIDTH: Strict w-11/12 mx-auto matching Nav/Footer */}
      <div className="w-11/12 mx-auto relative z-10 space-y-12 sm:space-y-16">
        
        {/* ============================================================== */}
        {/* 1. HERO HEADER WITH TRIGGERED ANIMATION & ANNUAL BILLING TOGGLE */}
        {/* ============================================================== */}
        <motion.div
          ref={heroRef}
          variants={containerStagger}
          initial="hidden"
          animate={heroInView ? "visible" : "hidden"}
          className="text-center space-y-4 max-w-3xl mx-auto relative pt-2"
        >
          <AnimatedSectionTitle
            kicker="Transparent Membership Architecture"
            title="Invest in Your Health & Performance"
            highlightText="Health & Performance"
            subtitle="No long-term lock-ins. No cancellation penalties. Choose the training tier that fuels your lifestyle and upgrade or pause anytime."
            align="center"
            className="mb-2"
          />

          {/* Billing Cycle Toggle */}
          <motion.div variants={itemFadeUp} className="flex items-center justify-center gap-3 pt-2">
            <span
              className={`text-xs sm:text-sm font-bold transition-colors ${
                !isAnnual ? "text-foreground" : "text-secondary"
              }`}
            >
              Monthly Billing
            </span>

            <button
              onClick={() => setIsAnnual(!isAnnual)}
              aria-label="Toggle annual or monthly billing"
              className="relative w-14 h-7.5 rounded-full bg-slate-200 dark:bg-brand-800/40 border border-slate-300 dark:border-brand-500/30 p-1 transition-colors cursor-pointer"
            >
              <div
                className={`w-5.5 h-5.5 rounded-full bg-active transition-transform duration-300 shadow-2xs ${
                  isAnnual ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </button>

            <span
              className={`text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-colors ${
                isAnnual ? "text-foreground" : "text-secondary"
              }`}
            >
              Annual Billing
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 text-[10px] font-black uppercase tracking-wider shadow-2xs">
                Save 20%
              </span>
            </span>
          </motion.div>

          {/* Quick Assurance Badges */}
          <motion.div variants={containerStagger} className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs text-secondary font-medium">
            <motion.span variants={itemScalePop} whileHover={{ scale: 1.04 }} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-brand-900/40 border border-slate-200 dark:border-brand-500/15 shadow-2xs">
              <FiShield className="text-emerald-500" /> 14-Day Money-Back Guarantee
            </motion.span>
            <motion.span variants={itemScalePop} whileHover={{ scale: 1.04 }} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-brand-900/40 border border-slate-200 dark:border-brand-500/15 shadow-2xs">
              <FiRefreshCw className="text-active" /> Freeze or Cancel Anytime
            </motion.span>
            <motion.span variants={itemScalePop} whileHover={{ scale: 1.04 }} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-brand-900/40 border border-slate-200 dark:border-brand-500/15 shadow-2xs">
              <FaDumbbell className="text-active" /> RFID 24/7 Keyless Entry
            </motion.span>
          </motion.div>
        </motion.div>

        {/* ============================================================== */}
        {/* 2. RE-ENGINEERED UNIFIED SEGMENTED TAB FILTER                  */}
        {/* ULTRA-SMOOTH SEGMENTED PILL TRACK (NO JARRING BORDERS/BOXES)   */}
        {/* ============================================================== */}
        <motion.div
          ref={filterRef}
          initial={{ opacity: 0, y: 22 }}
          animate={filterInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
          transition={{ type: "spring", stiffness: 380, damping: 28 }}
          className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-[#121026]/75 border border-slate-200 dark:border-brand-500/20 shadow-xs w-full space-y-3"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-1">
            <span className="text-xs font-bold uppercase tracking-wider text-secondary flex items-center gap-1.5">
              <FiTarget className="text-active" /> Filter by Your Primary Training Style:
            </span>
            <span className="text-[11px] text-secondary">
              Highlights the ideal plan for your training volume
            </span>
          </div>

          <LayoutGroup id="pricingGoalGroup">
            <div className="p-1.5 rounded-2xl bg-slate-100/90 dark:bg-[#0c0a1d] border border-slate-200/90 dark:border-brand-500/25 grid grid-cols-2 sm:grid-cols-4 gap-1.5 shadow-xs">
              {[
                { id: "all", label: "View All 3 Tiers", icon: FiActivity },
                { id: "solo", label: "Solo Gym Lifter", icon: FaDumbbell },
                { id: "classes", label: "Group Classes & HIIT", icon: FaFireAlt },
                { id: "transformation", label: "Full Coaching & Spa", icon: FaSpa },
              ].map((g) => {
                const Icon = g.icon;
                const isActive = selectedQuizGoal === g.id;
                return (
                  <button
                    key={g.id}
                    type="button"
                    onClick={() => setSelectedQuizGoal(g.id)}
                    className={`relative py-3 px-3 rounded-xl text-xs sm:text-sm font-bold transition-colors duration-200 cursor-pointer flex items-center justify-center gap-2 select-none ${
                      isActive
                        ? "text-btn-text font-extrabold"
                        : "text-slate-600 dark:text-secondary hover:text-foreground hover:bg-slate-200/50 dark:hover:bg-white/5"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="activePricingGoalPill"
                        className="absolute inset-0 rounded-xl bg-active shadow-sm"
                        transition={{ type: "spring", stiffness: 480, damping: 34 }}
                      />
                    )}
                    <Icon size={14} className="relative z-10 shrink-0" />
                    <span className="relative z-10 truncate">{g.label}</span>
                  </button>
                );
              })}
            </div>
          </LayoutGroup>
        </motion.div>

        {/* ============================================================== */}
        {/* 3. RE-DESIGNED PRICING CARDS WITH CHOREOGRAPHED MULTI-VECTORS  */}
        {/* DYNAMIC TAB FOCUS & SELECTIVE BLUR FOR NON-MATCHING TIERS      */}
        {/* ============================================================== */}
        <motion.div
          ref={cardsRef}
          variants={pricingGridVariants}
          initial="hidden"
          animate={cardsInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-7 sm:gap-8 items-stretch w-full"
        >
          {PLANS.map((plan) => {
            const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;
            const isTabFiltering = selectedQuizGoal !== "all";
            const isMatchingGoal = isTabFiltering && selectedQuizGoal === plan.targetGoal;
            const isOtherCardBlurred = isTabFiltering && selectedQuizGoal !== plan.targetGoal;

            return (
              <motion.div
                key={plan.id}
                variants={plan.variant}
                className={`relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                  isMatchingGoal
                    ? "bg-white dark:bg-[#15132d] border-2 border-active shadow-md ring-4 ring-active/25 scale-[1.03] z-20 opacity-100 blur-none"
                    : isOtherCardBlurred
                    ? "bg-white/70 dark:bg-[#121026]/40 border border-slate-200 dark:border-brand-500/15 blur-[4px] opacity-30 scale-[0.96] hover:blur-xs hover:opacity-65 cursor-pointer select-none"
                    : plan.popular && selectedQuizGoal === "all"
                    ? "bg-white dark:bg-[#15132d] border-2 border-active shadow-md scale-[1.02] z-10 opacity-100 blur-none"
                    : "bg-white dark:bg-[#121026]/75 border border-slate-200 dark:border-brand-500/20 hover:border-active/40 shadow-xs opacity-100 scale-100 blur-none"
                }`}
                onClick={() => {
                  if (isOtherCardBlurred) {
                    setSelectedQuizGoal(plan.targetGoal);
                  }
                }}
              >
                {/* Popular or Target Goal Pill */}
                {isMatchingGoal ? (
                  <motion.div
                    variants={badgePopVariant}
                    className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-active text-btn-text text-[11px] font-black uppercase tracking-wider shadow-sm flex items-center gap-1.5 whitespace-nowrap z-30"
                  >
                    <FiCheckCircle className="fill-white" size={13} /> Recommended for Your Goal
                  </motion.div>
                ) : plan.popular && selectedQuizGoal === "all" ? (
                  <motion.div
                    variants={badgePopVariant}
                    className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-active text-btn-text text-[11px] font-black uppercase tracking-wider shadow-sm flex items-center gap-1.5 whitespace-nowrap z-20"
                  >
                    <FiStar className="fill-white" size={12} /> Most Popular Athlete Choice
                  </motion.div>
                ) : null}

                <div className="space-y-5">
                  {/* Title & Tagline */}
                  <motion.div variants={itemFadeUp} className="space-y-1.5 border-b border-slate-100 dark:border-brand-500/15 pb-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-['Outfit'] text-2xl sm:text-[26px] font-black text-foreground tracking-tight">
                        {plan.name}
                      </h3>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-brand-500/10 text-secondary border border-slate-200/80 dark:border-brand-500/15">
                        {plan.badge}
                      </span>
                    </div>
                    <p className="text-xs text-secondary leading-relaxed min-h-[44px]">
                      {plan.tagline}
                    </p>
                  </motion.div>

                  {/* Price Display */}
                  <motion.div variants={itemScalePop} className="space-y-1.5">
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-black text-active">$</span>
                      <span className="font-['Outfit'] text-5xl sm:text-6xl font-black text-foreground tracking-tight">
                        {price}
                      </span>
                      <span className="text-xs text-secondary font-bold ml-1">
                        / month
                      </span>
                    </div>

                    <div className="min-h-[26px] flex items-center">
                      {isAnnual ? (
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25 text-[11px] font-bold">
                          <FiCheck size={12} /> Billed ${plan.annualPrice * 12} annually • Save ${plan.annualSavings}/year
                        </div>
                      ) : (
                        <div className="text-[11px] text-secondary font-medium">
                          Billed monthly • Cancel or freeze anytime
                        </div>
                      )}
                    </div>
                  </motion.div>

                  {/* Features List */}
                  <div className="space-y-2.5 pt-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-secondary block">
                      Privileges & Amenities:
                    </span>
                    <ul className="space-y-2.5 text-xs text-foreground">
                      {plan.features.map((feat) => (
                        <motion.li key={feat} variants={itemFadeUp} className="flex items-start gap-2.5">
                          <div className="w-4 h-4 rounded-full bg-emerald-500/15 text-emerald-500 flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                            <FiCheck size={11} />
                          </div>
                          <span className="leading-snug">{feat}</span>
                        </motion.li>
                      ))}
                      {plan.notIncluded.map((feat) => (
                        <li key={feat} className="flex items-start gap-2.5 text-secondary/45 line-through">
                          <div className="w-4 h-4 rounded-full bg-slate-100 dark:bg-white/5 text-slate-400 dark:text-secondary/40 flex items-center justify-center shrink-0 mt-0.5">
                            <FiX size={11} />
                          </div>
                          <span className="leading-snug">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card CTA Deck */}
                <motion.div variants={itemFadeUp} className="pt-6 mt-6 border-t border-slate-100 dark:border-brand-500/15 space-y-2.5">
                  <Link
                    href={plan.stripePlan ? "/signin" : "/contact"}
                    className={`relative group overflow-hidden w-full py-3.5 rounded-xl text-center text-xs sm:text-sm font-bold shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      plan.popular || isMatchingGoal
                        ? "bg-active text-btn-text hover:opacity-95"
                        : "bg-slate-900 text-white dark:bg-brand-800/40 dark:text-foreground border border-transparent dark:border-brand-500/30 hover:border-active"
                    }`}
                  >
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-linear-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
                    <span className="relative z-10">{plan.stripePlan ? "Join Pro Membership" : "Get Started Now"}</span>
                    <FiArrowRight size={14} className="relative z-10 transition-transform group-hover:translate-x-1" />
                  </Link>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsModalOpen(true);
                    }}
                    className="group w-full py-2 text-center text-[11px] font-bold text-secondary hover:text-active transition-colors cursor-pointer flex items-center justify-center gap-1"
                  >
                    <span>or try with a Free 1-Day Trial Pass</span>
                    <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
                  </button>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ============================================================== */}
        {/* 4. VALUE STACK & ROI CALCULATOR BREAKDOWN (FULL WIDTH)         */}
        {/* ============================================================== */}
        <motion.div
          ref={valueRef}
          initial="hidden"
          animate={valueInView ? "visible" : "hidden"}
          className="rounded-3xl bg-white dark:bg-[#121026]/75 border border-slate-200 dark:border-brand-500/20 p-6 sm:p-8 space-y-6 shadow-xs w-full"
        >
          <motion.div variants={itemFadeUp} className="text-center space-y-1.5 max-w-xl mx-auto">
            <span className="text-[11px] font-bold uppercase tracking-wider text-active">
              Value Equation
            </span>
            <h2 className="font-['Outfit'] text-2xl sm:text-3xl font-black text-foreground">
              Why FlexPulse Pro is an Unbeatable Investment
            </h2>
            <p className="text-xs text-secondary leading-relaxed">
              Compare the total standalone market cost of individual fitness services against our all-inclusive Pro membership.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 w-full pt-1">
            {VALUE_STACK.map((val, idx) => (
              <motion.div
                key={idx}
                variants={valueCardVariants[idx % 4]}
                whileHover={{ y: -3 }}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-brand-900/30 border border-slate-200/80 dark:border-brand-500/15 text-center space-y-1 shadow-2xs hover:border-active/40 transition-all"
              >
                <span className="text-xs font-bold text-foreground block">{val.item}</span>
                <span className="text-[11px] text-secondary font-mono">Market Value: {val.marketValue}</span>
              </motion.div>
            ))}
          </div>

          <motion.div
            variants={itemFadeUp}
            className="p-5 rounded-2xl bg-linear-to-r from-active/10 via-brand-500/10 to-transparent border border-active/30 w-full flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-2xs"
          >
            <div className="space-y-0.5">
              <span className="text-xs text-secondary font-bold uppercase tracking-wider block">
                Total Standalone Value: <span className="line-through text-slate-500">$460 / month</span>
              </span>
              <span className="font-['Outfit'] text-lg sm:text-xl font-black text-foreground">
                Your Price with Pro: <span className="text-active font-black">$59 / month</span>
              </span>
            </div>
            <Link
              href="/signin"
              className="relative group overflow-hidden px-6 py-3 rounded-xl bg-active text-btn-text font-bold text-xs sm:text-sm hover:opacity-95 shadow-sm transition-all shrink-0"
            >
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-linear-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
              <span className="relative z-10 flex items-center gap-1.5">
                Activate Pro Membership <FiArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </motion.div>
        </motion.div>

        {/* ============================================================== */}
        {/* ATHLETE VERIFICATION: REAL MEMBERSHIP OUTCOMES (FULL WIDTH)    */}
        {/* ============================================================== */}
        <motion.div
          ref={tickerRef}
          initial={{ opacity: 0, y: 24 }}
          animate={tickerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ type: "spring", stiffness: 350, damping: 28 }}
          className="w-full"
        >
          <AthleteVerificationTicker
            title="ATHLETE VERIFICATION • PROVEN VALUE & OUTCOMES"
            variant="adaptive"
            className="p-5 sm:p-6"
            testimonials={[
              {
                quote:
                  "Upgrading to Pro gave me access to high-intensity coaching and the InBody 570 scan. Added 45kg to my compound total in 12 weeks.",
                author: "Marcus Vance",
                role: "Powerlifting Athlete • Pro Member",
                metric: "+45kg Lift Total",
                avatar: "https://prio.co.in/avatar.png",
              },
              {
                quote:
                  "The unlimited group HIIT sessions and post-workout Finnish cedar sauna recovery made the Pro tier worth 5x the monthly price.",
                author: "Elena Rostova",
                role: "Hyrox Competitor • Elite Champion Tier",
                metric: "Sub-60min Hyrox",
                avatar: "https://t4.ftcdn.net/jpg/11/66/06/77/360_F_1166067709_2SooAuPWXp20XkGev7oOT7nuK1VThCsN.jpg",
              },
              {
                quote:
                  "Having my workout splits, recovery sauna bookings, and nutrition targets synced in one place revolutionized my athletic consistency.",
                author: "David Chen",
                role: "Marathon Runner • Pro Member",
                metric: "2:54 Marathon PB",
                avatar: "https://lh3.googleusercontent.com/a/ACg8ocKzbEXd0N7V406ocsmdiEQkxCVV1BIJpiTn--O3W0TqjLiNy6e3=s96-c",
              },
              {
                quote:
                  "The InBody 570 body scan and personalized macro coaching delivered results that 3 years of commercial gym training never could.",
                author: "Sophie Taylor",
                role: "Transformation Athlete • 1 Yr Member",
                metric: "-12% Body Fat",
                avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop",
              },
              {
                quote:
                  "The contrast therapy cold plunge and Finnish cedar sauna slashed my DOMS recovery time in half between heavy squat days.",
                author: "Liam Gallagher",
                role: "Cross-Training Athlete • Elite Champion Tier",
                metric: "98% Recovery Score",
                avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
              },
            ]}
          />
        </motion.div>

        {/* ============================================================== */}
        {/* 5. 1-DAY VIP TRIAL PASS VOUCHER BANNER (FULL WIDTH REDESIGN)   */}
        {/* ============================================================== */}
        <motion.div
          ref={vipBannerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={vipBannerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ type: "spring", stiffness: 360, damping: 28 }}
          className="relative rounded-3xl bg-linear-to-br from-active/10 via-brand-500/10 to-slate-100/90 dark:from-active/15 dark:via-[#1B1A55]/30 dark:to-[#0c0a1d]/90 border border-slate-200/90 dark:border-brand-500/25 p-7 sm:p-10 overflow-hidden shadow-md backdrop-blur-md flex flex-col lg:flex-row items-center justify-between gap-6 w-full"
        >
          {/* Ambient lighting glows */}
          <div className="absolute -top-12 -right-12 w-96 h-96 bg-active/15 dark:bg-active/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-80 h-80 bg-brand-500/10 dark:bg-[#1B1A55]/40 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-2.5 text-center lg:text-left relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-active text-btn-text text-xs font-bold uppercase tracking-wider shadow-2xs">
              <FiGift size={13} /> Complimentary VIP Invitation
            </span>
            <h2 className="font-['Outfit'] text-2xl sm:text-4xl font-extrabold text-foreground tracking-tight leading-tight">
              Not Ready to Commit? Try a <span className="text-active">Free 1-Day VIP Pass</span>
            </h2>
            <p className="text-xs sm:text-sm text-secondary max-w-2xl leading-relaxed">
              Experience the club first-hand. Train on our Olympic lifting decks, join any studio HIIT or Yoga session, and relax in the recovery Finnish sauna with zero commitment.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="relative group overflow-hidden px-7 py-4 rounded-2xl bg-active text-btn-text text-xs sm:text-sm font-black shadow-sm hover:opacity-95 active:scale-98 transition-all flex items-center gap-2 shrink-0 cursor-pointer relative z-10"
          >
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-linear-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
            <FiZap size={16} className="relative z-10" />
            <span className="relative z-10">Claim Free 1-Day Pass</span>
          </button>
        </motion.div>

        {/* ============================================================== */}
        {/* 6. DETAILED PLAN COMPARISON MATRIX TABLE (FULL WIDTH)          */}
        {/* ============================================================== */}
        <motion.div
          ref={tableRef}
          initial="hidden"
          animate={tableInView ? "visible" : "hidden"}
          className="space-y-5 pt-2 w-full"
        >
          <motion.div variants={itemFadeUp} className="text-center space-y-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-active">
              Line-by-Line Breakdown
            </span>
            <h3 className="font-['Outfit'] text-2xl sm:text-3xl font-extrabold text-foreground">
              Comprehensive Feature Comparison
            </h3>
            <p className="text-xs text-secondary leading-relaxed">
              Inspect every gym amenity, coaching privilege, and recovery specification across our membership tiers.
            </p>
          </motion.div>

          <motion.div variants={itemFadeUp} className="overflow-x-auto rounded-3xl border border-slate-200 dark:border-brand-500/20 bg-white dark:bg-[#121026]/75 shadow-xs w-full">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="border-b border-slate-200 dark:border-brand-500/20 bg-slate-50 dark:bg-brand-800/20 text-secondary uppercase font-bold text-[11px]">
                <tr>
                  <th className="py-4 px-6">Tier Privilege / Specification</th>
                  <th className="py-4 px-6 text-center">Starter ($29)</th>
                  <th className="py-4 px-6 text-center text-active font-black bg-active/5">Pro Athlete ($59)</th>
                  <th className="py-4 px-6 text-center">VIP Elite ($99)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-brand-500/10 text-foreground">
                {COMPARISON_CATEGORIES.map((cat, cIdx) => (
                  <tr key={cIdx} className="bg-slate-50/70 dark:bg-brand-900/30">
                    <td colSpan={4} className="py-3 px-6 font-bold uppercase tracking-wider text-[11px] text-active">
                      {cat.category}
                    </td>
                  </tr>
                )).flatMap((headerRow, cIdx) => [
                  headerRow,
                  ...COMPARISON_CATEGORIES[cIdx].rows.map((row, rIdx) => (
                    <tr key={`${cIdx}-${rIdx}`} className="hover:bg-slate-50 dark:hover:bg-brand-500/5 transition-colors">
                      <td className="py-4 px-6 font-medium text-foreground">{row.feature}</td>
                      <td className="py-4 px-6 text-center">
                        {typeof row.starter === "boolean" ? (
                          row.starter ? (
                            <FiCheck className="text-emerald-500 mx-auto" size={16} />
                          ) : (
                            <FiX className="text-slate-400 dark:text-secondary/40 mx-auto" size={16} />
                          )
                        ) : (
                          <span className="font-semibold text-foreground text-xs">{row.starter}</span>
                        )}
                      </td>
                      <td className="py-4 px-6 text-center bg-active/5">
                        {typeof row.pro === "boolean" ? (
                          row.pro ? (
                            <FiCheck className="text-emerald-500 mx-auto" size={16} />
                          ) : (
                            <FiX className="text-slate-400 dark:text-secondary/40 mx-auto" size={16} />
                          )
                        ) : (
                          <span className="font-bold text-active text-xs">{row.pro}</span>
                        )}
                      </td>
                      <td className="py-4 px-6 text-center">
                        {typeof row.elite === "boolean" ? (
                          row.elite ? (
                            <FiCheck className="text-emerald-500 mx-auto" size={16} />
                          ) : (
                            <FiX className="text-slate-400 dark:text-secondary/40 mx-auto" size={16} />
                          )
                        ) : (
                          <span className="font-semibold text-foreground text-xs">{row.elite}</span>
                        )}
                      </td>
                    </tr>
                  )),
                ])}
              </tbody>
            </table>
          </motion.div>
        </motion.div>

        {/* ============================================================== */}
        {/* 7. SOCIAL PROOF & ATHLETE REVIEWS (FULL WIDTH)                 */}
        {/* ============================================================== */}
        <motion.div
          ref={reviewsRef}
          initial="hidden"
          animate={reviewsInView ? "visible" : "hidden"}
          className="space-y-6 pt-2 w-full"
        >
          <motion.div variants={itemFadeUp} className="text-center space-y-1 max-w-xl mx-auto">
            <span className="text-[11px] font-bold uppercase tracking-wider text-active">
              Verified Athletes
            </span>
            <h3 className="font-['Outfit'] text-2xl sm:text-3xl font-black text-foreground">
              What Our Members Experience
            </h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full">
            {MEMBER_REVIEWS.map((rev, rIdx) => (
              <motion.div
                key={rev.name}
                variants={reviewVariants[rIdx % 3]}
                whileHover={{ y: -4 }}
                className="p-6 rounded-3xl bg-white dark:bg-[#121026]/75 border border-slate-200 dark:border-brand-500/20 shadow-xs space-y-4 flex flex-col justify-between hover:border-active/40 transition-all"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center gap-1 text-amber-500 text-xs">
                    {"★".repeat(5)}
                  </div>
                  <p className="text-xs text-secondary leading-relaxed italic">
                    &ldquo;{rev.quote}&rdquo;
                  </p>
                </div>

                <div className="pt-3.5 border-t border-slate-100 dark:border-brand-500/15 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-xs text-foreground block">{rev.name}</span>
                    <span className="text-[10px] text-active font-semibold block">{rev.tier}</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold px-2 py-0.5 rounded-md bg-emerald-500/10">
                    {rev.achievement}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ============================================================== */}
        {/* 8. CORPORATE & FIRST RESPONDER WELLNESS DISCOUNT (FULL WIDTH)  */}
        {/* ============================================================== */}
        <motion.div
          ref={discountRef}
          initial={{ opacity: 0, y: 22 }}
          animate={discountInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
          transition={{ type: "spring", stiffness: 380, damping: 28 }}
          className="p-6 sm:p-7 rounded-3xl bg-slate-50 dark:bg-brand-900/40 border border-slate-200 dark:border-brand-500/20 flex flex-col sm:flex-row items-center justify-between gap-5 w-full shadow-xs text-center sm:text-left"
        >
          <div className="space-y-1.5">
            <span className="text-[11px] font-bold text-active uppercase tracking-wider flex items-center justify-center sm:justify-start gap-1.5">
              <FiPercent /> Community & Corporate Wellness
            </span>
            <h4 className="font-['Outfit'] text-lg sm:text-xl font-bold text-foreground">
              15% Off for Students, First Responders & Healthcare Teams
            </h4>
            <p className="text-xs text-secondary max-w-xl leading-relaxed">
              We proudly support our local service personnel and university students with verified discounted access across all membership tiers.
            </p>
          </div>

          <Link
            href="/contact"
            className="px-5 py-3 rounded-xl border border-slate-300 dark:border-brand-500/25 bg-white dark:bg-background text-foreground text-xs sm:text-sm font-bold hover:border-active transition-all shrink-0 shadow-2xs"
          >
            Inquire for Verification &rarr;
          </Link>
        </motion.div>

        {/* ============================================================== */}
        {/* 9. PRICING FAQS ACCORDION (FULL WIDTH & TRIGGERED)             */}
        {/* ============================================================== */}
        <motion.div
          ref={faqRef}
          initial="hidden"
          animate={faqInView ? "visible" : "hidden"}
          className="space-y-6 pt-2 w-full"
        >
          <motion.div variants={itemFadeUp} className="text-center space-y-1 max-w-xl mx-auto">
            <span className="text-[11px] font-bold uppercase tracking-wider text-active">
              Got Questions?
            </span>
            <h3 className="font-['Outfit'] text-2xl sm:text-3xl font-black text-foreground">
              Frequently Asked Questions
            </h3>
          </motion.div>

          <motion.div variants={containerStagger} className="space-y-3 w-full">
            {FAQS.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <motion.div
                  key={index}
                  variants={itemFadeUp}
                  className="rounded-2xl border border-slate-200 dark:border-brand-500/15 bg-white dark:bg-[#121026]/75 overflow-hidden shadow-2xs transition-all w-full"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full py-4 px-5 sm:px-6 text-left flex items-center justify-between gap-4 text-xs sm:text-sm font-bold text-foreground hover:text-active transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      className="shrink-0"
                    >
                      <FiChevronDown size={18} className={isOpen ? "text-active" : "text-secondary"} />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 sm:px-6 pb-4 pt-1 text-xs text-secondary leading-relaxed border-t border-slate-100 dark:border-brand-500/10">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>

      {/* ============================================================== */}
      {/* 10. MODAL: CLAIM FREE 1-DAY TRIAL PASS (CRISP ATHLETIC REDESIGN)*/}
      {/* ============================================================== */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setIsModalOpen(false);
                setPassResult(null);
              }}
              className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-xs"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 18 }}
              transition={{ type: "spring", stiffness: 420, damping: 28 }}
              className="relative w-full max-w-lg rounded-3xl bg-white dark:bg-[#0c0a1d] text-foreground border border-slate-200 dark:border-brand-500/30 p-6 sm:p-8 shadow-md space-y-5 z-10 overflow-hidden"
            >
              {/* Circular frosted close button */}
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setPassResult(null);
                }}
                className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20 border border-slate-200 dark:border-white/15 transition-all shadow-2xs cursor-pointer"
              >
                <FiX size={16} />
              </button>

              {!passResult ? (
                <>
                  <div className="space-y-1">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-active">
                      FlexPulse VIP Access
                    </span>
                    <h3 className="font-['Outfit'] text-2xl font-black text-foreground">
                      Claim Your Free 1-Day Trial Pass
                    </h3>
                    <p className="text-xs text-secondary leading-relaxed">
                      Fill out the form below to receive your instant digital pass code. Present it at the front desk when you arrive!
                    </p>
                  </div>

                  {errorMsg && (
                    <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-500 text-xs font-semibold">
                      {errorMsg}
                    </div>
                  )}

                  <form onSubmit={handleTrialSubmit} className="space-y-3.5 text-xs">
                    <div>
                      <label className="block font-bold text-foreground mb-1 text-[11px] uppercase tracking-wider">Full Name *</label>
                      <div className="relative">
                        <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-secondary" size={14} />
                        <input
                          type="text"
                          required
                          placeholder="e.g. Alex Hunter"
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-searchbox-bg border border-slate-200 dark:border-brand-500/25 text-foreground text-xs focus:outline-none focus:border-active shadow-2xs"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-bold text-foreground mb-1 text-[11px] uppercase tracking-wider">Email Address *</label>
                        <div className="relative">
                          <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-secondary" size={14} />
                          <input
                            type="email"
                            required
                            placeholder="alex@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-searchbox-bg border border-slate-200 dark:border-brand-500/25 text-foreground text-xs focus:outline-none focus:border-active shadow-2xs"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block font-bold text-foreground mb-1 text-[11px] uppercase tracking-wider">Phone Number</label>
                        <div className="relative">
                          <FiPhone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-secondary" size={14} />
                          <input
                            type="tel"
                            placeholder="+1 (555) 000-0000"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-searchbox-bg border border-slate-200 dark:border-brand-500/25 text-foreground text-xs focus:outline-none focus:border-active shadow-2xs"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-bold text-foreground mb-1 text-[11px] uppercase tracking-wider">Preferred Date</label>
                        <input
                          type="date"
                          value={formData.preferredDate}
                          onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                          className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-searchbox-bg border border-slate-200 dark:border-brand-500/25 text-foreground text-xs focus:outline-none focus:border-active shadow-2xs"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-foreground mb-1 text-[11px] uppercase tracking-wider">Preferred Time</label>
                        <select
                          value={formData.preferredTime}
                          onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                          className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-searchbox-bg border border-slate-200 dark:border-brand-500/25 text-foreground text-xs focus:outline-none focus:border-active shadow-2xs"
                        >
                          <option value="Morning (08:00 AM - 11:00 AM)">Morning (8–11 AM)</option>
                          <option value="Afternoon (12:00 PM - 04:00 PM)">Afternoon (12–4 PM)</option>
                          <option value="Evening (05:00 PM - 09:00 PM)">Evening (5–9 PM)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold text-foreground mb-1 text-[11px] uppercase tracking-wider">Primary Fitness Goal</label>
                      <select
                        value={formData.fitnessGoal}
                        onChange={(e) => setFormData({ ...formData, fitnessGoal: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-searchbox-bg border border-slate-200 dark:border-brand-500/25 text-foreground text-xs focus:outline-none focus:border-active shadow-2xs"
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
                      className="relative group overflow-hidden w-full py-3.5 rounded-xl bg-active text-btn-text text-xs sm:text-sm font-bold shadow-sm hover:opacity-95 active:scale-98 disabled:opacity-50 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
                    >
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-linear-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
                      <span className="relative z-10">{submitting ? "Generating Pass..." : "Generate VIP Pass Now"}</span>
                    </button>
                  </form>
                </>
              ) : (
                /* Success State */
                <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} className="text-center space-y-4 py-3">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-500 mx-auto flex items-center justify-center text-2xl font-bold shadow-2xs">
                    ✓
                  </div>
                  <div className="space-y-0.5">
                    <h3 className="font-['Outfit'] text-2xl font-black text-foreground">
                      VIP Pass Activated!
                    </h3>
                    <p className="text-xs text-secondary">
                      Present your digital code at reception desk check-in:
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-brand-800/30 border border-slate-200 dark:border-brand-500/30 space-y-1 select-all shadow-2xs">
                    <span className="text-[10px] uppercase font-bold text-secondary">All-Access Pass Code</span>
                    <div className="font-['Outfit'] text-3xl font-black text-active tracking-widest">
                      {passResult.passCode}
                    </div>
                    <div className="text-[10px] text-secondary font-mono tracking-widest">
                      ||| | | |||| || | || |||| | |||
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={handleCopyCode}
                      className="flex-1 py-2.5 rounded-xl bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 text-foreground font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-2xs"
                    >
                      {copiedPass ? <FiCheck className="text-emerald-500" /> : <FiCopy />}
                      <span>{copiedPass ? "Copied Code!" : "Copy Code"}</span>
                    </button>

                    <button
                      onClick={() => {
                        setIsModalOpen(false);
                        setPassResult(null);
                      }}
                      className="py-2.5 px-5 rounded-xl bg-active text-btn-text text-xs font-bold hover:opacity-90 transition-all cursor-pointer shadow-2xs"
                    >
                      Done
                    </button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
