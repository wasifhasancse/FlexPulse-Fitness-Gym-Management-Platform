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

const TRANSITION_EASE = [0.16, 1, 0.3, 1];

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
    <div className="w-full min-h-[calc(100vh-4.5rem)] flex items-center justify-center py-8 sm:py-12 lg:py-16 bg-background text-foreground transition-colors duration-300 relative select-none overflow-hidden">
      
      {/* Background Engineering Dot Matrix Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#80808018_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-60 dark:opacity-30" />

      {/* Ambient Lighting Meshes */}
      <div className="absolute top-1/4 left-1/4 w-[480px] h-[480px] bg-active/10 dark:bg-active/15 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-1/4 w-[480px] h-[480px] bg-brand-500/10 dark:bg-brand-500/15 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Main Container - Universal 11/12 Width */}
      <div className="w-11/12 mx-auto relative z-10">
        
        {/* Main Dual-Column Performance Box with Viewport Entrance */}
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
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1600&auto=format&fit=crop"
                alt="FlexPulse Athletic Facility"
                fill
                priority
                unoptimized
                className="object-cover opacity-25 scale-105 transition-transform duration-1000 ease-out"
              />
              {/* Scrim Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#070F2B] via-[#070F2B]/85 to-[#120f26]/75 z-10" />
              <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-active/20 rounded-full blur-[100px] z-10 pointer-events-none" />
            </div>

            {/* Left Column Top: Portal Status Pill & Latency Monitor */}
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
                <span>Athletic OS v3.2</span>
              </motion.div>

              <motion.span
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-xs font-mono font-semibold text-emerald-400 flex items-center gap-2 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20 backdrop-blur-md shadow-2xs"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                18ms • Ultra Low Latency
              </motion.span>
            </div>

            {/* Left Column Center: Headline & Live Floor Telemetry Widget */}
            <div className="relative z-20 my-auto py-6 sm:py-8 space-y-6">
              <div>
                <motion.div
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.45, delay: 0.25 }}
                  className="inline-flex items-center gap-2 text-active text-xs font-black uppercase tracking-widest mb-2"
                >
                  <FaFire className="w-3.5 h-3.5 text-orange-400" /> High-Performance Member Hub
                </motion.div>
                <motion.h1
                  initial={{ opacity: 0, y: 24, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.65, delay: 0.3, ease: TRANSITION_EASE }}
                  className="text-3xl sm:text-4xl xl:text-5xl font-black text-white leading-tight tracking-tight font-['Outfit']"
                >
                  Push Beyond Limits. <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-rose-100 to-active">
                    Log In &amp; Dominate.
                  </span>
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.36, ease: TRANSITION_EASE }}
                  className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed font-normal font-['Inter']"
                >
                  Sync workout telemetry, book recovery sauna &amp; plunge suites, and manage your coaching plans in real-time.
                </motion.p>
              </div>

              {/* Studio Telemetry Card */}
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
                      <span className="text-xs text-slate-300 font-medium">Miami HQ &amp; Global Hubs</span>
                    </div>
                  </motion.div>
                  <motion.span
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 220, delay: 0.48 }}
                    className="text-xs text-emerald-400 font-bold px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 shadow-2xs"
                  >
                    Peak Floor
                  </motion.span>
                </div>

                {/* Floor Energy Bar */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.52 }}
                  className="p-3 rounded-xl bg-black/25 border border-brand-500/20"
                >
                  <div className="flex justify-between items-center text-xs mb-1.5">
                    <span className="text-slate-300 font-medium flex items-center gap-1.5">
                      <FaFire className="w-3 h-3 text-orange-400" /> Floor Capacity &amp; Energy:
                    </span>
                    <span className="text-active font-black tracking-wide">78% Optimal</span>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.8, delay: 0.6 }}
                      style={{ originX: 0 }}
                      className="h-full bg-gradient-to-r from-emerald-400 via-active to-orange-400 rounded-full w-[78%]"
                    />
                  </div>
                </motion.div>

                {/* 3 Metric Badges */}
                <div className="grid grid-cols-3 gap-3 text-center">
                  {[
                    { value: "100+", label: "Classes", color: "text-white" },
                    { value: "InBody", label: "Biometrics", color: "text-active" },
                    { value: "4.9/5★", label: "Coach Rating", color: "text-white" },
                  ].map((m, idx) => (
                    <motion.div
                      key={m.label}
                      initial={{ opacity: 0, y: 12, scale: 0.92 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.45, delay: 0.58 + idx * 0.06 }}
                      className="p-2.5 rounded-xl bg-white/5 border border-brand-500/20 shadow-2xs"
                    >
                      <strong className={`block text-base sm:text-lg font-black ${m.color}`}>
                        {m.value}
                      </strong>
                      <span className="text-[10px] sm:text-xs text-slate-300 uppercase tracking-wider font-semibold">
                        {m.label}
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
                testimonials={SIGNIN_TESTIMONIALS}
                title="ATHLETE VERIFICATION"
                variant="dark"
              />
            </motion.div>
          </div>

          {/* ============================================================ */}
          {/* Right Column: High-Conversion Sign-In Console                 */}
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
                <FaLock className="w-3 h-3" /> Member Portal Authentication
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 18, filter: "blur(3px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.6, delay: 0.25, ease: TRANSITION_EASE }}
                className="text-3xl sm:text-4xl font-black tracking-tight text-foreground leading-tight font-['Outfit']"
              >
                Welcome Back
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-sm sm:text-base text-[#535C91] dark:text-[#9290C3] mt-1 font-medium font-['Inter']"
              >
                Select a 1-click test role or enter your credentials below.
              </motion.p>
            </div>

            {/* 1-Click Demo Accounts Quick-Fill Strip */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.32 }}
              className="p-4 mb-6 rounded-2xl bg-brand-500/5 dark:bg-[#1B1A55]/20 border border-brand-500/15 shadow-2xs space-y-3"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-extrabold text-foreground uppercase tracking-wider flex items-center gap-2 text-xs">
                  <FaUserShield className="w-3.5 h-3.5 text-active" /> Demo Accounts Quick-Fill:
                </span>
                {selectedRole ? (
                  <button
                    type="button"
                    onClick={clearForm}
                    className="text-xs text-[#535C91] dark:text-[#9290C3] hover:text-active font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <FaTimes className="w-2.5 h-2.5" /> Clear Selection
                  </button>
                ) : (
                  <span className="text-[11px] text-active font-bold px-2 py-0.5 rounded-full bg-active/10 border border-active/20 shadow-2xs">
                    1-Click Autofill
                  </span>
                )}
              </div>

              <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
                {DEMO_ROLES.map((role, idx) => {
                  const isSelected = selectedRole === role.id;
                  const IconComponent = role.icon;
                  const cardDir = idx === 0 ? -12 : idx === 2 ? 12 : 0;

                  return (
                    <motion.button
                      key={role.id}
                      type="button"
                      initial={{ opacity: 0, x: cardDir, scale: 0.92 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      transition={{ duration: 0.45, delay: 0.36 + idx * 0.05 }}
                      whileHover={{ y: -2, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleQuickFill(role)}
                      className={`p-2.5 sm:p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col sm:flex-row items-center sm:items-start gap-2.5 relative shadow-2xs ${
                        isSelected
                          ? "bg-active text-btn-text border-active font-bold shadow-xs ring-2 ring-active/30"
                          : "bg-white dark:bg-[#090814]/80 border-brand-500/15 hover:border-active/40 text-foreground"
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
                            isSelected ? "text-white/90" : "text-[#535C91] dark:text-[#9290C3]"
                          }`}
                        >
                          {role.subtext}
                        </span>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>

            {/* Google Social Login (Type 2 Secondary CTA) */}
            <motion.button
              type="button"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.44 }}
              whileHover={{ y: -2, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleGoogleLogin}
              disabled={googleLoading}
              className="w-full py-3.5 px-5 rounded-2xl bg-searchbox-bg hover:bg-searchbox-hover text-foreground font-bold text-sm sm:text-base border border-brand-500/25 hover:border-active/60 shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-3 cursor-pointer disabled:opacity-60"
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

            {/* Divider with Center Scale Entrance */}
            <div className="relative flex items-center my-4">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, delay: 0.48 }}
                style={{ originX: 0 }}
                className="flex-grow border-t border-brand-500/15"
              />
              <motion.span
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.45, delay: 0.5 }}
                className="shrink-0 px-3 text-xs font-bold uppercase tracking-wider text-[#535C91] dark:text-[#9290C3]"
              >
                Or continue with athletic email
              </motion.span>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, delay: 0.48 }}
                style={{ originX: 1 }}
                className="flex-grow border-t border-brand-500/15"
              />
            </div>

            {/* Email / Password Form with Tag-by-Tag Entrances */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Field */}
              <motion.div
                initial={{ opacity: 0, x: -18 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.55, delay: 0.52 }}
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
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (selectedRole) setSelectedRole(null);
                    }}
                    placeholder="athlete@flexpulse.com"
                    autoComplete="email"
                    className="w-full pl-11 pr-10 py-3 rounded-xl bg-brand-500/5 focus:bg-white dark:bg-[#090814]/80 dark:focus:bg-[#090814] border border-brand-500/20 focus:border-active focus:ring-2 focus:ring-active/20 text-sm sm:text-base text-foreground placeholder:text-[#535C91]/50 outline-none transition-all shadow-2xs font-medium"
                  />
                  {email && (
                    <button
                      type="button"
                      onClick={() => {
                        setEmail("");
                        if (selectedRole) setSelectedRole(null);
                      }}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#535C91] hover:text-foreground cursor-pointer"
                      title="Clear email"
                    >
                      <FaTimes className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </motion.div>

              {/* Password Field */}
              <motion.div
                initial={{ opacity: 0, x: 18 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.55, delay: 0.56 }}
              >
                <div className="flex justify-between items-center mb-1.5">
                  <label
                    htmlFor="password"
                    className="block text-xs sm:text-sm font-bold text-foreground uppercase tracking-wider"
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
                    autoComplete="current-password"
                    className="w-full pl-11 pr-12 py-3 rounded-xl bg-brand-500/5 focus:bg-white dark:bg-[#090814]/80 dark:focus:bg-[#090814] border border-brand-500/20 focus:border-active focus:ring-2 focus:ring-active/20 text-sm sm:text-base text-foreground placeholder:text-[#535C91]/50 outline-none transition-all shadow-2xs font-medium"
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
                      className="mt-1.5 px-3 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-semibold flex items-center gap-1.5"
                    >
                      <FaExclamationTriangle className="w-3 h-3" />
                      <span>Caps Lock is currently ON</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Custom Athletic Switch Toggle for Remember Me */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.6 }}
                className="flex items-center justify-between pt-1"
              >
                <div
                  onClick={() => setRememberMe(!rememberMe)}
                  className="flex items-center gap-2.5 cursor-pointer select-none group"
                >
                  <div
                    className={`w-9 h-5 rounded-full transition-colors relative flex items-center p-0.5 ${
                      rememberMe
                        ? "bg-active shadow-2xs"
                        : "bg-brand-500/20 dark:bg-white/10"
                    }`}
                  >
                    <motion.div
                      layout
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      className={`w-4 h-4 rounded-full bg-white shadow-2xs ${
                        rememberMe ? "translate-x-4" : "translate-x-0"
                      }`}
                    />
                  </div>
                  <span className="text-xs sm:text-sm text-foreground/80 group-hover:text-foreground font-semibold transition-colors">
                    Keep me signed in on this device
                  </span>
                </div>
              </motion.div>

              {/* Submit Button (Type 1 Primary Athletic CTA with Kinetic Shimmer) */}
              <motion.button
                type="submit"
                disabled={submitting}
                initial={{ opacity: 0, y: 16, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 220, damping: 20, delay: 0.64 }}
                whileHover={{ y: -2, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="relative w-full py-4 mt-2 bg-btn-bg text-btn-text font-extrabold text-sm uppercase tracking-wider rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 border border-white/20 overflow-hidden group active:scale-95"
              >
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />
                {submitting ? (
                  <div className="flex items-center gap-2 relative z-10">
                    <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Verifying Credentials...</span>
                  </div>
                ) : (
                  <>
                    <span className="relative z-10">Enter Athletic Portal</span>
                    <FaArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </motion.button>
            </form>

            {/* VIP Registration Banner */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="mt-4 p-3.5 rounded-2xl bg-brand-500/5 dark:bg-[#1B1A55]/30 border border-brand-500/15 flex items-center justify-between gap-3 text-xs sm:text-sm shadow-2xs"
            >
              <div className="flex items-center gap-2">
                <FaGift className="w-4 h-4 text-active shrink-0" />
                <span className="text-foreground text-xs sm:text-sm leading-tight">
                  New athlete? <strong>Join today</strong> for 7-day VIP access.
                </span>
              </div>
              <Link
                href="/signup"
                className="shrink-0 px-3.5 py-1.5 rounded-xl bg-active text-btn-text font-extrabold text-xs uppercase tracking-wider hover:opacity-95 active:scale-95 transition-all shadow-2xs"
              >
                Sign Up
              </Link>
            </motion.div>

            {/* Security & Verification Guarantee */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.75 }}
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
              <span className="font-medium">Biometric Sync Ready</span>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </div>
  );
}
