"use client";

import { authClient } from "@/lib/auth-client";
import { toast } from "@heroui/react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  FaArrowRight,
  FaCheck,
  FaCheckCircle,
  FaDumbbell,
  FaEnvelope,
  FaExclamationTriangle,
  FaFire,
  FaHeartbeat,
  FaImage,
  FaLock,
  FaRunning,
  FaShieldAlt,
  FaTimes,
  FaTimesCircle,
  FaUser,
} from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { IoMdEyeOff } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import AthleteVerificationTicker from "@/components/common/AthleteVerificationTicker";

export const dynamic = "force-dynamic";

const TRANSITION_EASE = [0.16, 1, 0.3, 1];

const SIGNUP_TESTIMONIALS = [
  {
    quote:
      "Progressive overload programming and coach accountability helped me break through a 2-year plateau.",
    author: "Marcus Vance",
    role: "Powerlifting Athlete • 3 Yrs Member",
    metric: "+45kg Lift Total",
    avatar: "https://prio.co.in/avatar.png",
  },
  {
    quote:
      "Signing up was the best training decision this year. Studio classes and recovery suites keep me dialed in every single day.",
    author: "Elena Rostova",
    role: "Hyrox Competitor • Elite Tier",
    metric: "Sub-60min Hyrox",
    avatar: "https://t4.ftcdn.net/jpg/11/66/06/77/360_F_1166067709_2SooAuPWXp20XkGev7oOT7nuK1VThCsN.jpg",
  },
  {
    quote:
      "The VIP onboarding tour and InBody scan gave me total clarity on my baseline metrics from Day 1.",
    author: "Sophie Taylor",
    role: "Transformation Athlete • Pro Member",
    metric: "-12% Body Fat",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop",
  },
  {
    quote:
      "Within 3 weeks, I had marathon pacing zones dialed in and recovery saunas booked through the app.",
    author: "David Chen",
    role: "Marathon Runner • Executive Member",
    metric: "2:54 Marathon PB",
    avatar: "https://lh3.googleusercontent.com/a/ACg8ocKzbEXd0N7V406ocsmdiEQkxCVV1BIJpiTn--O3W0TqjLiNy6e3=s96-c",
  },
];

const PRESET_AVATARS = [
  {
    id: "marcus",
    label: "Power",
    url: "https://prio.co.in/avatar.png",
  },
  {
    id: "elena",
    label: "Endurance",
    url: "https://t4.ftcdn.net/jpg/11/66/06/77/360_F_1166067709_2SooAuPWXp20XkGev7oOT7nuK1VThCsN.jpg",
  },
  {
    id: "wasif",
    label: "Hybrid",
    url: "https://lh3.googleusercontent.com/a/ACg8ocKzbEXd0N7V406ocsmdiEQkxCVV1BIJpiTn--O3W0TqjLiNy6e3=s96-c",
  },
  {
    id: "sophie",
    label: "Recomp",
    url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop",
  },
];

const ATHLETIC_GOALS = [
  { id: "strength", label: "Strength & Power", icon: FaDumbbell },
  { id: "endurance", label: "Cardio & Hyrox", icon: FaRunning },
  { id: "recomp", label: "Fat Loss & Health", icon: FaHeartbeat },
];

export default function SignUpForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState("strength");
  const [selectedAvatarId, setSelectedAvatarId] = useState(null);
  const [showCustomAvatarInput, setShowCustomAvatarInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [capsLockActive, setCapsLockActive] = useState(false);
  const router = useRouter();

  // Password validation checking
  const hasMinLength = password.length >= 6;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const isPasswordValid = hasMinLength && hasUpperCase && hasLowerCase;

  // Strength score
  const getPasswordStrength = () => {
    let score = 0;
    if (hasMinLength) score += 1;
    if (hasUpperCase) score += 1;
    if (hasLowerCase) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    return score;
  };
  const strengthScore = getPasswordStrength();

  const isValidEmail = (val) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  };

  const handleKeyDown = (e) => {
    if (e.getModifierState) {
      setCapsLockActive(e.getModifierState("CapsLock"));
    }
  };

  const handleKeyUp = (e) => {
    if (e.getModifierState) {
      setCapsLockActive(e.getModifierState("CapsLock"));
    }
  };

  const handleSelectPresetAvatar = (avatarObj) => {
    setSelectedAvatarId(avatarObj.id);
    setImage(avatarObj.url);
    toast.success(`Selected ${avatarObj.label} avatar profile`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast.warning("Please complete all required fields.");
      return;
    }

    if (!isPasswordValid) {
      toast.warning("Password does not meet athletic security requirements.");
      return;
    }

    try {
      setLoading(true);
      const chosenAvatar = image || "https://prio.co.in/avatar.png";

      const { data, error } = await authClient.signUp.email({
        name,
        email,
        password,
        image: chosenAvatar,
      });

      if (data) {
        toast.success("Account created successfully! Welcome to FlexPulse.");
        router.replace("/dashboard/member");
      } else if (error) {
        toast.warning(error.message || "Failed to create account. Email may already be in use.");
      }
    } catch (err) {
      console.error("Sign up error:", err);
      toast.warning("Account registration encountered an issue. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      setGoogleLoading(true);
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/dashboard/member",
      });
    } catch (err) {
      console.error("Google sign up error:", err);
      toast.warning("Google registration encountered an error.");
      setGoogleLoading(false);
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-4.5rem)] flex items-center justify-center py-8 sm:py-12 lg:py-16 bg-background text-foreground transition-colors duration-300 relative select-none overflow-hidden">
      
      {/* Background Engineering Dot Matrix Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#80808018_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-60 dark:opacity-30" />

      {/* Ambient Lighting Meshes */}
      <div className="absolute top-1/4 left-1/4 w-[480px] h-[480px] bg-active/10 dark:bg-active/15 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-1/4 w-[480px] h-[480px] bg-brand-500/10 dark:bg-brand-500/15 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Main Container - Universal 11/12 Width */}
      <div className="w-11/12 mx-auto relative z-10">
        
        {/* Main Dual-Column Performance Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.85, ease: TRANSITION_EASE }}
          className="w-full rounded-3xl overflow-hidden border border-brand-500/20 shadow-md bg-white dark:bg-[#070F2B] flex flex-col lg:flex-row transition-all duration-300 relative"
        >

          {/* ============================================================ */}
          {/* Left Column: Athletic Showcase & Real-Time Performance Lab   */}
          {/* ============================================================ */}
          <div className="w-full lg:w-5/12 xl:w-[45%] relative bg-[#070F2B] dark:bg-[#090814] text-white flex flex-col justify-between p-8 sm:p-10 lg:p-12 xl:p-14 overflow-hidden select-none border-b lg:border-b-0 lg:border-r border-brand-500/20">
            
            {/* Facility Photo Backdrop */}
            <div className="absolute inset-0 z-0">
              <Image
                src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1470&auto=format&fit=crop"
                alt="Gym Training"
                fill
                priority
                unoptimized
                className="object-cover opacity-25 scale-105 transition-transform duration-1000 ease-out"
              />
              {/* Scrim Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#070F2B] via-[#070F2B]/85 to-[#120f26]/75 z-10" />
              <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-active/20 rounded-full blur-[100px] z-10 pointer-events-none" />
            </div>

            {/* Left Column Top: Tag & Status */}
            <div className="relative z-20 flex items-center justify-between gap-3 mb-6">
              <motion.div
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-active/15 border border-active/30 text-active text-xs font-black tracking-wider uppercase backdrop-blur-md shadow-2xs"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-active opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-active" />
                </span>
                <span>New Athlete Onboarding</span>
              </motion.div>

              <motion.span
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-xs font-mono font-semibold text-emerald-400 flex items-center gap-2 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20 backdrop-blur-md shadow-2xs"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                7-Day VIP Active
              </motion.span>
            </div>

            {/* Left Column Center: Headline & Live Perks Card */}
            <div className="relative z-20 my-auto py-6 sm:py-8 space-y-6">
              <div>
                <motion.div
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.45, delay: 0.25 }}
                  className="inline-flex items-center gap-2 text-active text-xs font-black uppercase tracking-widest mb-2"
                >
                  <FaFire className="w-3.5 h-3.5 text-orange-400" /> Start Your Athletic Journey
                </motion.div>
                <motion.h1
                  initial={{ opacity: 0, y: 24, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.65, delay: 0.3, ease: TRANSITION_EASE }}
                  className="text-3xl sm:text-4xl xl:text-5xl font-black text-white leading-tight tracking-tight font-['Outfit']"
                >
                  Unlock Your Potential. <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-rose-100 to-active">
                    Join FlexPulse Today.
                  </span>
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.36, ease: TRANSITION_EASE }}
                  className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed font-normal font-['Inter']"
                >
                  Gain access to 100+ weekly classes, Olympic lifting decks, Finnish contrast saunas, and personalized biometric coaching.
                </motion.p>
              </div>

              {/* Live Studio Telemetry Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.94, y: 18 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4, ease: TRANSITION_EASE }}
                className="p-5 sm:p-6 rounded-2xl bg-white/10 dark:bg-[#1B1A55]/30 backdrop-blur-xl border border-brand-500/20 shadow-sm space-y-4"
              >
                <div className="flex items-center justify-between">
                  <motion.div
                    initial={{ opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.44 }}
                    className="flex items-center gap-3"
                  >
                    <div className="flex -space-x-2.5">
                      <Image
                        src="https://t4.ftcdn.net/jpg/11/66/06/77/360_F_1166067709_2SooAuPWXp20XkGev7oOT7nuK1VThCsN.jpg"
                        alt="Coach Alana"
                        width={32}
                        height={32}
                        className="w-8 h-8 rounded-full object-cover ring-2 ring-[#070F2B]"
                      />
                      <Image
                        src="https://prio.co.in/avatar.png"
                        alt="Coach Marcus"
                        width={32}
                        height={32}
                        className="w-8 h-8 rounded-full object-cover ring-2 ring-[#070F2B]"
                      />
                      <Image
                        src="https://lh3.googleusercontent.com/a/ACg8ocKzbEXd0N7V406ocsmdiEQkxCVV1BIJpiTn--O3W0TqjLiNy6e3=s96-c"
                        alt="Wasif"
                        width={32}
                        height={32}
                        className="w-8 h-8 rounded-full object-cover ring-2 ring-[#070F2B]"
                      />
                    </div>
                    <div>
                      <span className="text-sm font-bold text-white block">2,480+ Active Athletes</span>
                      <span className="text-xs text-slate-300 font-medium">Join an Elite Athletic Roster</span>
                    </div>
                  </motion.div>
                  <motion.span
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 220, delay: 0.48 }}
                    className="text-xs text-emerald-400 font-bold px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 shadow-2xs"
                  >
                    VIP Tier
                  </motion.span>
                </div>

                {/* 3 Perks Badges */}
                <div className="grid grid-cols-3 gap-3 text-center pt-1">
                  {[
                    { title: "Free", sub: "InBody 570", color: "text-white" },
                    { title: "7-Day", sub: "VIP Pass", color: "text-active" },
                    { title: "100%", sub: "Flexible", color: "text-white" },
                  ].map((p, idx) => (
                    <motion.div
                      key={p.sub}
                      initial={{ opacity: 0, y: 12, scale: 0.92 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.45, delay: 0.52 + idx * 0.06 }}
                      className="p-2.5 rounded-xl bg-white/5 border border-brand-500/20 shadow-2xs"
                    >
                      <strong className={`block text-base sm:text-lg font-black ${p.color}`}>
                        {p.title}
                      </strong>
                      <span className="text-[10px] sm:text-xs text-slate-300 uppercase tracking-wider font-semibold">
                        {p.sub}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Left Column Bottom: ATHLETE VERIFICATION TICKER */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.65 }}
              className="relative z-20 pt-4 border-t border-brand-500/15"
            >
              <AthleteVerificationTicker
                testimonials={SIGNUP_TESTIMONIALS}
                title="WHY ATHLETES JOIN"
                variant="dark"
              />
            </motion.div>
          </div>

          {/* ============================================================ */}
          {/* Right Column: High-Conversion Sign-Up Console                */}
          {/* ============================================================ */}
          <div className="w-full lg:w-7/12 xl:w-[55%] p-8 sm:p-10 lg:p-12 xl:p-14 flex flex-col justify-center bg-white dark:bg-[#070F2B] relative">
            
            {/* Header & Title with Separate Element Triggers */}
            <div className="mb-6">
              <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.2 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-active/10 text-active text-xs font-black uppercase tracking-wider mb-2.5 border border-active/25 shadow-2xs"
              >
                <FaLock className="w-3 h-3" /> New Membership Registration
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 18, filter: "blur(3px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.6, delay: 0.25, ease: TRANSITION_EASE }}
                className="text-3xl sm:text-4xl font-black tracking-tight text-foreground leading-tight font-['Outfit']"
              >
                Create Your Account
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-sm sm:text-base text-[#535C91] dark:text-[#9290C3] mt-1 font-medium font-['Inter']"
              >
                Join FlexPulse to book classes, log workouts, and join discussions.
              </motion.p>
            </div>

            {/* Google Social Signup (Type 2 Secondary CTA) */}
            <motion.button
              type="button"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              whileHover={{ y: -2, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleGoogleSignup}
              disabled={googleLoading}
              className="w-full py-3.5 px-5 rounded-2xl bg-searchbox-bg hover:bg-searchbox-hover text-foreground font-bold text-sm sm:text-base border border-brand-500/25 hover:border-active/60 shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-3 cursor-pointer disabled:opacity-60"
            >
              {googleLoading ? (
                <span className="w-4 h-4 border-2 border-active border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <FcGoogle className="w-5 h-5" />
                  <span>Sign up with Google</span>
                </>
              )}
            </motion.button>

            {/* Divider with Center Scale Entrance */}
            <div className="relative flex items-center my-4">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                style={{ originX: 0 }}
                className="flex-grow border-t border-brand-500/15"
              />
              <motion.span
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.45, delay: 0.42 }}
                className="shrink-0 px-3 text-xs font-bold uppercase tracking-wider text-[#535C91] dark:text-[#9290C3]"
              >
                Or register with athletic email
              </motion.span>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                style={{ originX: 1 }}
                className="flex-grow border-t border-brand-500/15"
              />
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name Field */}
              <motion.div
                initial={{ opacity: 0, x: -18 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.44 }}
              >
                <div className="flex justify-between items-center mb-1.5">
                  <label
                    htmlFor="name"
                    className="block text-xs sm:text-sm font-bold text-foreground uppercase tracking-wider"
                  >
                    Full Name
                  </label>
                  {name.trim().length >= 2 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1"
                    >
                      <FaCheck className="w-3 h-3" /> Valid
                    </motion.span>
                  )}
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-brand-500">
                    <FaUser className="w-4 h-4" />
                  </div>
                  <input
                    id="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Alex Morgan"
                    className="w-full pl-11 pr-10 py-3.5 rounded-xl bg-brand-500/5 focus:bg-white dark:bg-[#090814]/80 dark:focus:bg-[#090814] border border-brand-500/20 focus:border-active focus:ring-2 focus:ring-active/20 text-sm sm:text-base text-foreground placeholder:text-[#535C91]/50 outline-none transition-all shadow-2xs font-medium"
                  />
                  {name && (
                    <button
                      type="button"
                      onClick={() => setName("")}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#535C91] hover:text-foreground cursor-pointer"
                      title="Clear name"
                    >
                      <FaTimes className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </motion.div>

              {/* Email Field */}
              <motion.div
                initial={{ opacity: 0, x: 18 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.48 }}
              >
                <div className="flex justify-between items-center mb-1.5">
                  <label
                    htmlFor="email"
                    className="block text-xs sm:text-sm font-bold text-foreground uppercase tracking-wider"
                  >
                    Email Address
                  </label>
                  {isValidEmail(email) && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1"
                    >
                      <FaCheck className="w-3 h-3" /> Verified Format
                    </motion.span>
                  )}
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-brand-500">
                    <FaEnvelope className="w-4 h-4" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="athlete@flexpulse.com"
                    autoComplete="email"
                    className="w-full pl-11 pr-10 py-3.5 rounded-xl bg-brand-500/5 focus:bg-white dark:bg-[#090814]/80 dark:focus:bg-[#090814] border border-brand-500/20 focus:border-active focus:ring-2 focus:ring-active/20 text-sm sm:text-base text-foreground placeholder:text-[#535C91]/50 outline-none transition-all shadow-2xs font-medium"
                  />
                  {email && (
                    <button
                      type="button"
                      onClick={() => setEmail("")}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#535C91] hover:text-foreground cursor-pointer"
                      title="Clear email"
                    >
                      <FaTimes className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </motion.div>

              {/* Athletic Goal Selector */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.52 }}
              >
                <label className="block text-xs sm:text-sm font-bold text-foreground uppercase tracking-wider mb-1.5">
                  Primary Fitness Goal
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {ATHLETIC_GOALS.map((goal, idx) => {
                    const isGoalSelected = selectedGoal === goal.id;
                    const GoalIcon = goal.icon;
                    return (
                      <motion.button
                        key={goal.id}
                        type="button"
                        initial={{ opacity: 0, y: 10, scale: 0.94 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.4, delay: 0.54 + idx * 0.05 }}
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.96 }}
                        onClick={() => setSelectedGoal(goal.id)}
                        className={`p-2.5 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1 shadow-2xs ${
                          isGoalSelected
                            ? "bg-active text-btn-text border-active font-bold shadow-xs ring-2 ring-active/25"
                            : "bg-brand-500/5 dark:bg-[#1B1A55]/20 border-brand-500/15 text-foreground hover:border-active/40"
                        }`}
                      >
                        <GoalIcon className={`w-4 h-4 ${isGoalSelected ? "text-btn-text" : "text-active"}`} />
                        <span className="text-xs font-bold leading-tight block">
                          {goal.label}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>

              {/* Profile Avatar Selector (Presets or Custom URL) */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.58 }}
              >
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-xs sm:text-sm font-bold text-foreground uppercase tracking-wider">
                    Profile Avatar
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowCustomAvatarInput(!showCustomAvatarInput)}
                    className="text-xs font-bold text-active hover:underline cursor-pointer"
                  >
                    {showCustomAvatarInput ? "Choose from presets" : "Paste custom image URL"}
                  </button>
                </div>

                {!showCustomAvatarInput ? (
                  <div className="grid grid-cols-4 gap-2">
                    {PRESET_AVATARS.map((preset, idx) => {
                      const isAvatarSelected = selectedAvatarId === preset.id;
                      return (
                        <motion.button
                          key={preset.id}
                          type="button"
                          initial={{ opacity: 0, scale: 0.85 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.4, delay: 0.6 + idx * 0.04 }}
                          whileHover={{ y: -2, scale: 1.04 }}
                          whileTap={{ scale: 0.96 }}
                          onClick={() => handleSelectPresetAvatar(preset)}
                          className={`p-2 rounded-2xl border transition-all cursor-pointer flex flex-col items-center gap-1 relative shadow-2xs ${
                            isAvatarSelected
                              ? "bg-active/10 dark:bg-active/20 border-active ring-2 ring-active/30"
                              : "bg-brand-500/5 dark:bg-[#1B1A55]/20 border-brand-500/15 hover:border-active/40"
                          }`}
                        >
                          <Image
                            src={preset.url}
                            alt={preset.label}
                            width={36}
                            height={36}
                            className="w-9 h-9 rounded-full object-cover ring-1 ring-current"
                          />
                          <span className="text-[11px] font-bold text-foreground/80">
                            {preset.label}
                          </span>
                          {isAvatarSelected && (
                            <div className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full bg-active text-btn-text flex items-center justify-center shadow-xs">
                              <FaCheck className="w-2 h-2" />
                            </div>
                          )}
                        </motion.button>
                      );
                    })}
                  </div>
                ) : (
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-brand-500">
                      <FaImage className="w-4 h-4" />
                    </div>
                    <input
                      id="image"
                      type="url"
                      value={image}
                      onChange={(e) => {
                        setImage(e.target.value);
                        setSelectedAvatarId(null);
                      }}
                      placeholder="https://example.com/your-avatar.jpg"
                      className="w-full pl-11 pr-4 py-3 rounded-xl bg-brand-500/5 focus:bg-white dark:bg-[#090814]/80 dark:focus:bg-[#090814] border border-brand-500/20 focus:border-active focus:ring-2 focus:ring-active/20 text-sm sm:text-base text-foreground placeholder:text-[#535C91]/50 outline-none transition-all shadow-2xs font-medium"
                    />
                  </div>
                )}
              </motion.div>

              {/* Password Field */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.64 }}
              >
                <label
                  htmlFor="password"
                  className="block text-xs sm:text-sm font-bold text-foreground uppercase tracking-wider mb-1.5"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-brand-500">
                    <FaLock className="w-4 h-4" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onKeyUp={handleKeyUp}
                    placeholder="••••••••••••"
                    autoComplete="new-password"
                    className="w-full pl-11 pr-12 py-3.5 rounded-xl bg-brand-500/5 focus:bg-white dark:bg-[#090814]/80 dark:focus:bg-[#090814] border border-brand-500/20 focus:border-active focus:ring-2 focus:ring-active/20 text-sm sm:text-base text-foreground placeholder:text-[#535C91]/50 outline-none transition-all shadow-2xs font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#535C91] hover:text-active transition-colors cursor-pointer"
                    title={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <IoMdEyeOff className="w-5 h-5" />
                    ) : (
                      <IoEye className="w-5 h-5" />
                    )}
                  </button>
                </div>

                {/* Caps Lock Alert Banner */}
                <AnimatePresence>
                  {capsLockActive && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      className="mt-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-semibold flex items-center gap-1.5"
                    >
                      <FaExclamationTriangle className="w-3 h-3" />
                      <span>Caps Lock is currently ON</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Password Strength Meter */}
                {password.length > 0 && (
                  <div className="mt-2 space-y-1">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-[#535C91] dark:text-[#9290C3] font-medium">Security Level:</span>
                      <span
                        className={`font-bold ${
                          strengthScore <= 2
                            ? "text-orange-500"
                            : strengthScore <= 4
                            ? "text-blue-500"
                            : "text-emerald-500"
                        }`}
                      >
                        {strengthScore <= 2 ? "Moderate" : strengthScore <= 4 ? "Strong" : "Elite Protection"}
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-brand-500/10 dark:bg-white/10 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 rounded-full ${
                          strengthScore <= 2
                            ? "w-1/3 bg-orange-500"
                            : strengthScore <= 4
                            ? "w-3/4 bg-blue-500"
                            : "w-full bg-emerald-500"
                        }`}
                      />
                    </div>
                  </div>
                )}

                {/* Password Requirement Indicators */}
                <div className="mt-2.5 grid grid-cols-3 gap-2 text-xs">
                  <div
                    className={`flex items-center gap-1.5 font-medium transition-colors ${
                      password.length > 0
                        ? hasMinLength
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-red-500"
                        : "text-[#535C91] dark:text-[#9290C3]"
                    }`}
                  >
                    {hasMinLength ? <FaCheckCircle className="w-3.5 h-3.5" /> : <FaTimesCircle className="w-3.5 h-3.5" />}
                    <span>6+ chars</span>
                  </div>
                  <div
                    className={`flex items-center gap-1.5 font-medium transition-colors ${
                      password.length > 0
                        ? hasUpperCase
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-red-500"
                        : "text-[#535C91] dark:text-[#9290C3]"
                    }`}
                  >
                    {hasUpperCase ? <FaCheckCircle className="w-3.5 h-3.5" /> : <FaTimesCircle className="w-3.5 h-3.5" />}
                    <span>Uppercase</span>
                  </div>
                  <div
                    className={`flex items-center gap-1.5 font-medium transition-colors ${
                      password.length > 0
                        ? hasLowerCase
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-red-500"
                        : "text-[#535C91] dark:text-[#9290C3]"
                    }`}
                  >
                    {hasLowerCase ? <FaCheckCircle className="w-3.5 h-3.5" /> : <FaTimesCircle className="w-3.5 h-3.5" />}
                    <span>Lowercase</span>
                  </div>
                </div>
              </motion.div>

              {/* Submit Button (Type 1 Primary Athletic CTA with Kinetic Shimmer) */}
              <motion.button
                type="submit"
                disabled={!isPasswordValid || loading}
                initial={{ opacity: 0, y: 16, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 220, damping: 20, delay: 0.7 }}
                whileHover={{ y: -2, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="relative w-full py-4 mt-2 bg-btn-bg text-btn-text font-extrabold text-sm uppercase tracking-wider rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed border border-white/20 overflow-hidden group active:scale-95"
              >
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />
                {loading ? (
                  <div className="flex items-center gap-2 relative z-10">
                    <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Creating Account...</span>
                  </div>
                ) : (
                  <>
                    <span className="relative z-10">Create Athlete Membership</span>
                    <FaArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </motion.button>
            </form>

            {/* Shift Redirect to signin */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.75 }}
              className="text-center text-sm text-[#535C91] dark:text-[#9290C3] mt-4"
            >
              Already have an athlete account?{" "}
              <Link
                href="/signin"
                className="text-active font-bold hover:underline"
              >
                Sign In Here →
              </Link>
            </motion.p>

            {/* Security & Verification Guarantee */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.8 }}
              className="mt-4 pt-3 border-t border-brand-500/10 flex items-center justify-center gap-4 text-xs sm:text-sm text-[#535C91] dark:text-[#9290C3]"
            >
              <span className="flex items-center gap-1.5 font-medium">
                <FaShieldAlt className="w-3.5 h-3.5 text-active" /> 256-Bit SSL
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 font-medium">
                <FaCheckCircle className="w-3.5 h-3.5 text-emerald-500" /> SOC-2 Compliant
              </span>
              <span>•</span>
              <span className="font-medium">Instant Membership Sync</span>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </div>
  );
}
