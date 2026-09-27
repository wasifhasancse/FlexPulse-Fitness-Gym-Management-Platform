"use client";

import { authClient } from "@/lib/auth-client";
import { toast } from "@heroui/react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import {
  FaArrowRight,
  FaCheck,
  FaCheckCircle,
  FaCrown,
  FaDumbbell,
  FaEnvelope,
  FaExclamationTriangle,
  FaFire,
  FaGift,
  FaLock,
  FaRunning,
  FaShieldAlt,
  FaTimes,
  FaUserShield,
} from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { IoMdEyeOff } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import AthleteVerificationTicker from "@/components/common/AthleteVerificationTicker";

export const dynamic = "force-dynamic";

const SIGNIN_TESTIMONIALS = [
  {
    quote:
      "FlexPulse's precision biometric tracking and community accountability helped me add 45kg to my compound total in 12 weeks.",
    author: "Marcus Vance",
    role: "Powerlifting Athlete • 3 Yrs Member",
    metric: "+45kg Lift Total",
    avatar: "https://prio.co.in/avatar.png",
  },
  {
    quote:
      "The combination of certified coach form feedback and on-demand recovery protocols makes FlexPulse the undisputed gold standard.",
    author: "Elena Rostova",
    role: "Hyrox Competitor • Elite Tier",
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
];

const DEMO_ROLES = [
  {
    id: "admin",
    name: "System Admin",
    roleName: "Admin Portal",
    subtext: "Full System Control",
    avatar: "https://prio.co.in/avatar.png",
    icon: FaCrown,
    email: "admin@gmail.com",
    pass: "123456",
  },
  {
    id: "trainer",
    name: "Coach Alana",
    roleName: "Trainer Hub",
    subtext: "Classes & Rosters",
    avatar: "https://t4.ftcdn.net/jpg/11/66/06/77/360_F_1166067709_2SooAuPWXp20XkGev7oOT7nuK1VThCsN.jpg",
    icon: FaDumbbell,
    email: "trainer@gmail.com",
    pass: "123456",
  },
  {
    id: "member",
    name: "Pro Athlete",
    roleName: "Member Arena",
    subtext: "Telemetry & Bookings",
    avatar: "https://lh3.googleusercontent.com/a/ACg8ocKzbEXd0N7V406ocsmdiEQkxCVV1BIJpiTn--O3W0TqjLiNy6e3=s96-c",
    icon: FaRunning,
    email: "member@gmail.com",
    pass: "123456",
  },
];

export default function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [capsLockActive, setCapsLockActive] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.warning("Please enter both your email and password.");
      return;
    }

    try {
      setSubmitting(true);
      const redirectUrl = searchParams.get("redirect") || "/";
      const { data, error } = await authClient.signIn.email({
        email,
        password,
        rememberMe,
      });

      if (data) {
        toast.success("Welcome back! Signed in successfully.");
        router.replace(redirectUrl);
      } else if (error) {
        toast.warning(error.message || "Invalid credentials. Please verify your email and password.");
      }
    } catch (err) {
      console.error("Sign in error:", err);
      toast.warning("Sign in failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setGoogleLoading(true);
      const redirectUrl = searchParams.get("redirect") || "/";
      await authClient.signIn.social({
        provider: "google",
        callbackURL: redirectUrl,
      });
    } catch (err) {
      console.error("Google sign in error:", err);
      toast.warning("Google authentication encountered an error.");
      setGoogleLoading(false);
    }
  };

  const handleQuickFill = (roleObj) => {
    setSelectedRole(roleObj.id);
    setEmail(roleObj.email);
    setPassword(roleObj.pass);
    toast.success(`Loaded credentials for ${roleObj.roleName} (${roleObj.name})`);
  };

  const clearForm = () => {
    setSelectedRole(null);
    setEmail("");
    setPassword("");
  };

  return (
    <div className="w-full min-h-[calc(100vh-4.5rem)] flex items-center justify-center py-8 sm:py-12 lg:py-16 bg-slate-50/70 dark:bg-background transition-colors duration-300 relative select-none">
      
      {/* Background Engineering Dot Matrix Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-50 dark:opacity-30" />

      {/* Ambient Lighting Meshes */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-active/10 dark:bg-active/15 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-brand-500/10 dark:bg-brand-500/15 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Main Container - Matches Exact Navbar & Footer Width: w-11/12 mx-auto */}
      <div className="w-11/12 mx-auto relative z-10">
        
        {/* Main Dual-Column Performance Box */}
        <div className="w-full rounded-3xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-2xl bg-white dark:bg-[#0c0b1a] flex flex-col lg:flex-row transition-all duration-300 relative">
          

          {/* ============================================================ */}
          {/* Left Column: Athletic Showcase & Real-Time Performance Lab   */}
          {/* ============================================================ */}
          <div className="w-full lg:w-5/12 xl:w-[45%] relative bg-[#090814] text-white flex flex-col justify-between p-8 sm:p-10 lg:p-12 xl:p-14 overflow-hidden select-none border-b lg:border-b-0 lg:border-r border-slate-800/60">
            
            {/* Facility Photo Backdrop */}
            <div className="absolute inset-0 z-0">
              <Image
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1600&auto=format&fit=crop"
                alt="FlexPulse Athletic Facility"
                fill
                priority
                unoptimized
                className="object-cover opacity-25 scale-105 transition-transform duration-1000 ease-out"
              />
              {/* Scrim Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#090814] via-[#090814]/85 to-[#120f26]/75 z-10" />
              <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-active/20 rounded-full blur-[100px] z-10 pointer-events-none" />
            </div>

            {/* Left Column Top: Portal Status Pill & Latency Monitor */}
            <div className="relative z-20 flex items-center justify-between gap-3 mb-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-active/15 border border-active/30 text-active text-xs font-black tracking-wider uppercase backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-active opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-active" />
                </span>
                <span>Athletic OS v3.2</span>
              </div>

              <span className="text-xs font-mono font-semibold text-emerald-400 flex items-center gap-2 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                18ms • Ultra Low Latency
              </span>
            </div>

            {/* Left Column Center: Headline & Live Floor Telemetry Widget */}
            <div className="relative z-20 my-auto py-6 sm:py-8 space-y-6">
              <div>
                <div className="inline-flex items-center gap-2 text-active text-xs font-black uppercase tracking-widest mb-2">
                  <FaFire className="w-3.5 h-3.5 text-orange-400" /> High-Performance Member Hub
                </div>
                <h1 className="text-3xl sm:text-4xl xl:text-5xl font-black text-white leading-tight tracking-tight">
                  Push Beyond Limits. <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-rose-100 to-active drop-shadow-md">
                    Log In & Dominate.
                  </span>
                </h1>
                <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                  Sync workout telemetry, book recovery sauna & plunge suites, and manage your coaching plans in real-time.
                </p>
              </div>

              {/* Studio Telemetry Card */}
              <div className="p-5 sm:p-6 rounded-2xl bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-white/15 shadow-2xl space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2.5">
                      <Image
                        src="https://t4.ftcdn.net/jpg/11/66/06/77/360_F_1166067709_2SooAuPWXp20XkGev7oOT7nuK1VThCsN.jpg"
                        alt="Coach Alana"
                        width={32}
                        height={32}
                        className="w-8 h-8 rounded-full object-cover ring-2 ring-[#090814]"
                      />
                      <Image
                        src="https://prio.co.in/avatar.png"
                        alt="Coach Marcus"
                        width={32}
                        height={32}
                        className="w-8 h-8 rounded-full object-cover ring-2 ring-[#090814]"
                      />
                      <Image
                        src="https://lh3.googleusercontent.com/a/ACg8ocKzbEXd0N7V406ocsmdiEQkxCVV1BIJpiTn--O3W0TqjLiNy6e3=s96-c"
                        alt="Wasif"
                        width={32}
                        height={32}
                        className="w-8 h-8 rounded-full object-cover ring-2 ring-[#090814]"
                      />
                    </div>
                    <div>
                      <span className="text-sm font-bold text-white block">2,480+ Active Athletes</span>
                      <span className="text-xs text-slate-300 font-medium">Miami HQ & Global Hubs</span>
                    </div>
                  </div>
                  <span className="text-xs text-emerald-400 font-bold px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30">
                    Peak Floor
                  </span>
                </div>

                {/* Floor Energy Bar */}
                <div className="p-3 rounded-xl bg-black/25 border border-white/10">
                  <div className="flex justify-between items-center text-xs mb-1.5">
                    <span className="text-slate-300 font-medium flex items-center gap-1.5">
                      <FaFire className="w-3 h-3 text-orange-400" /> Floor Capacity & Energy:
                    </span>
                    <span className="text-active font-black tracking-wide">78% Optimal</span>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-emerald-400 via-active to-orange-400 rounded-full w-[78%] transition-all duration-700" />
                  </div>
                </div>

                {/* 3 Metric Badges */}
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                    <strong className="block text-base sm:text-lg font-black text-white">100+</strong>
                    <span className="text-[10px] sm:text-xs text-slate-300 uppercase tracking-wider font-semibold">Classes</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                    <strong className="block text-base sm:text-lg font-black text-active">InBody</strong>
                    <span className="text-[10px] sm:text-xs text-slate-300 uppercase tracking-wider font-semibold">Biometrics</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                    <strong className="block text-base sm:text-lg font-black text-white">4.9/5★</strong>
                    <span className="text-[10px] sm:text-xs text-slate-300 uppercase tracking-wider font-semibold">Coach Rating</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Left Column Bottom: ATHLETE VERIFICATION TICKER */}
            <div className="relative z-20 pt-4 border-t border-white/10">
              <AthleteVerificationTicker
                testimonials={SIGNIN_TESTIMONIALS}
                title="ATHLETE VERIFICATION"
                variant="dark"
              />
            </div>
          </div>

          {/* ============================================================ */}
          {/* Right Column: High-Conversion Sign-In Console                 */}
          {/* ============================================================ */}
          <div className="w-full lg:w-7/12 xl:w-[55%] p-8 sm:p-10 lg:p-12 xl:p-14 flex flex-col justify-center bg-white dark:bg-[#0c0b1a] relative">
            
            {/* Header & Title */}
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-500/10 text-active text-xs font-black uppercase tracking-wider mb-2.5 border border-rose-200 dark:border-rose-500/20">
                <FaLock className="w-3 h-3" /> Member Portal Authentication
              </div>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
                Welcome Back
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-1 font-medium">
                Select a 1-click test role or enter your credentials below.
              </p>
            </div>

            {/* 1-Click Demo Accounts Quick-Fill Strip */}
            <div className="p-4 mb-6 rounded-2xl bg-slate-50 dark:bg-[#141228] border border-slate-200 dark:border-white/10 shadow-xs space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-extrabold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-2 text-xs">
                  <FaUserShield className="w-3.5 h-3.5 text-active" /> Demo Accounts Quick-Fill:
                </span>
                {selectedRole ? (
                  <button
                    type="button"
                    onClick={clearForm}
                    className="text-xs text-slate-500 hover:text-active font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <FaTimes className="w-2.5 h-2.5" /> Clear Selection
                  </button>
                ) : (
                  <span className="text-[11px] text-active font-bold px-2 py-0.5 rounded-full bg-active/10 border border-active/20">
                    1-Click Autofill
                  </span>
                )}
              </div>

              <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
                {DEMO_ROLES.map((role) => {
                  const isSelected = selectedRole === role.id;
                  const IconComponent = role.icon;
                  return (
                    <motion.button
                      key={role.id}
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleQuickFill(role)}
                      className={`p-2.5 sm:p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col sm:flex-row items-center sm:items-start gap-2.5 relative ${
                        isSelected
                          ? "bg-active text-white border-active font-bold shadow-md ring-2 ring-active/30"
                          : "bg-white dark:bg-[#1a1738] border-slate-200 dark:border-white/10 hover:border-active text-slate-800 dark:text-white shadow-xs"
                      }`}
                      title={`Fill ${role.roleName} Credentials`}
                    >
                      <div className="relative shrink-0 mt-0.5">
                        <Image
                          src={role.avatar}
                          alt={role.name}
                          width={32}
                          height={32}
                          className="w-8 h-8 rounded-full object-cover ring-2 ring-current"
                        />
                        {isSelected && (
                          <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-white text-active flex items-center justify-center shadow-xs">
                            <FaCheck className="w-2.5 h-2.5" />
                          </div>
                        )}
                      </div>
                      <div className="text-center sm:text-left leading-tight overflow-hidden w-full">
                        <div className="flex items-center justify-center sm:justify-start gap-1">
                          <IconComponent className={`w-3.5 h-3.5 ${isSelected ? "text-white" : "text-active"}`} />
                          <span className="font-extrabold text-xs sm:text-sm block truncate">
                            {role.roleName}
                          </span>
                        </div>
                        <span
                          className={`text-[10px] sm:text-[11px] block truncate mt-0.5 font-medium ${
                            isSelected ? "text-white/90" : "text-slate-500 dark:text-slate-400"
                          }`}
                        >
                          {role.subtext}
                        </span>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Google Social Login */}
            <motion.button
              type="button"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={handleGoogleLogin}
              disabled={googleLoading}
              className="w-full py-3.5 px-5 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-[#141228] dark:hover:bg-[#1c193c] border border-slate-300 dark:border-white/15 text-slate-800 dark:text-slate-100 font-bold text-sm sm:text-base shadow-xs transition-all flex items-center justify-center gap-3 cursor-pointer disabled:opacity-60"
            >
              {googleLoading ? (
                <span className="w-4 h-4 border-2 border-active border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <FcGoogle className="w-5 h-5" />
                  <span>Continue with Google</span>
                </>
              )}
            </motion.button>

            {/* Divider */}
            <div className="relative flex items-center my-4">
              <div className="flex-grow border-t border-slate-200 dark:border-white/10" />
              <span className="shrink-0 px-3 text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Or continue with athletic email
              </span>
              <div className="flex-grow border-t border-slate-200 dark:border-white/10" />
            </div>

            {/* Email / Password Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Field */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label
                    htmlFor="email"
                    className="block text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider"
                  >
                    Email Address
                  </label>
                  {isValidEmail(email) && (
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                      <FaCheck className="w-3 h-3" /> Verified Format
                    </span>
                  )}
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
                    <FaEnvelope className="w-4 h-4" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (selectedRole) setSelectedRole(null);
                    }}
                    placeholder="athlete@flexpulse.com"
                    autoComplete="email"
                    className="w-full pl-11 pr-10 py-3 rounded-xl bg-slate-50 focus:bg-white dark:bg-[#141228] dark:focus:bg-[#1a1738] border border-slate-300 dark:border-white/15 focus:border-active focus:ring-4 focus:ring-active/15 text-sm sm:text-base text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none transition-all shadow-2xs font-medium"
                  />
                  {email && (
                    <button
                      type="button"
                      onClick={() => {
                        setEmail("");
                        if (selectedRole) setSelectedRole(null);
                      }}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer"
                      title="Clear email"
                    >
                      <FaTimes className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Password Field */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label
                    htmlFor="password"
                    className="block text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider"
                  >
                    Password
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-xs sm:text-sm font-bold text-active hover:underline"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
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
                    autoComplete="current-password"
                    className="w-full pl-11 pr-12 py-3 rounded-xl bg-slate-50 focus:bg-white dark:bg-[#141228] dark:focus:bg-[#1a1738] border border-slate-300 dark:border-white/15 focus:border-active focus:ring-4 focus:ring-active/15 text-sm sm:text-base text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none transition-all shadow-2xs font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 dark:text-slate-400 hover:text-active transition-colors cursor-pointer"
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
                      className="mt-1.5 px-3 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-semibold flex items-center gap-1.5"
                    >
                      <FaExclamationTriangle className="w-3 h-3" />
                      <span>Caps Lock is currently ON</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Custom Athletic Switch Toggle for Remember Me */}
              <div className="flex items-center justify-between pt-1">
                <div
                  onClick={() => setRememberMe(!rememberMe)}
                  className="flex items-center gap-2.5 cursor-pointer select-none group"
                >
                  <div
                    className={`w-9 h-5 rounded-full transition-colors relative flex items-center p-0.5 ${
                      rememberMe
                        ? "bg-active shadow-[0_0_8px_var(--active-color)/0.35]"
                        : "bg-slate-300 dark:bg-slate-700"
                    }`}
                  >
                    <motion.div
                      layout
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      className={`w-4 h-4 rounded-full bg-white shadow-sm ${
                        rememberMe ? "translate-x-4" : "translate-x-0"
                      }`}
                    />
                  </div>
                  <span className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white font-semibold transition-colors">
                    Keep me signed in on this device
                  </span>
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={submitting}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 mt-2 bg-btn-bg hover:bg-btn-bg/90 text-btn-text font-black text-sm uppercase tracking-wider rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {submitting ? (
                  <div className="flex items-center gap-2">
                    <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Verifying Credentials...</span>
                  </div>
                ) : (
                  <>
                    <span>Enter Athletic Portal</span>
                    <FaArrowRight className="w-4 h-4" />
                  </>
                )}
              </motion.button>
            </form>

            {/* VIP Registration Banner */}
            <div className="mt-4 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/30 flex items-center justify-between gap-3 text-xs sm:text-sm">
              <div className="flex items-center gap-2">
                <FaGift className="w-4 h-4 text-active shrink-0" />
                <span className="text-slate-800 dark:text-slate-200 text-xs sm:text-sm leading-tight">
                  New athlete? <strong>Join today</strong> for 7-day VIP access.
                </span>
              </div>
              <Link
                href="/signup"
                className="shrink-0 px-3 py-1.5 rounded-lg bg-active text-white font-black text-xs uppercase tracking-wider hover:opacity-90 transition-opacity"
              >
                Sign Up
              </Link>
            </div>

            {/* Security & Verification Guarantee */}
            <div className="mt-4 pt-3 border-t border-slate-200 dark:border-white/10 flex items-center justify-center gap-4 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1.5 font-medium">
                <FaShieldAlt className="w-3.5 h-3.5 text-active" /> 256-Bit SSL
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 font-medium">
                <FaCheckCircle className="w-3.5 h-3.5 text-emerald-500" /> SOC-2 Compliant
              </span>
              <span>•</span>
              <span className="font-medium">Biometric Sync Ready</span>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
