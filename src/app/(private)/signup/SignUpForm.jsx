"use client";

import { authClient } from "@/lib/auth-client";
import { toast } from "@heroui/react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  FaArrowRight,
  FaCheckCircle,
  FaEnvelope,
  FaExclamationTriangle,
  FaFire,
  FaImage,
  FaLock,
  FaShieldAlt,
  FaTimesCircle,
  FaUser,
} from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { IoMdEyeOff } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import AthleteVerificationTicker from "@/components/common/AthleteVerificationTicker";

export const dynamic = "force-dynamic";

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

const SignUpForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [role, setRole] = useState("member");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [capsLockActive, setCapsLockActive] = useState(false);
  const router = useRouter();

  // Password validation checking
  const hasMinLength = password.length >= 6;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const isPasswordValid = hasMinLength && hasUpperCase && hasLowerCase;

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
    if (!isPasswordValid) {
      toast.warning("Please ensure your password meets all requirements.");
      return;
    }

    try {
      setLoading(true);
      const userPayload = {
        name,
        email,
        password,
        role: "member",
        image:
          image ||
          `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
            name
          )}`,
      };

      const res = await authClient.signUp.email(userPayload);
      if (res?.data) {
        toast.success("Registration successful! Welcome to FlexPulse.");
        router.replace("/dashboard/member");
      } else if (res?.error) {
        toast.warning(res.error.message || "Failed to create account.");
      }
    } catch (err) {
      console.error("Sign up error:", err);
      toast.warning("An unexpected error occurred during registration.");
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
    <div className="w-full min-h-[calc(100vh-4.5rem)] flex items-center justify-center py-8 sm:py-12 lg:py-16 bg-slate-50/70 dark:bg-background transition-colors duration-300 relative select-none">
      
      {/* Background Engineering Dot Matrix Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-50 dark:opacity-30" />

      {/* Ambient Radial Meshes */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-active/10 dark:bg-active/15 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-brand-500/10 dark:bg-brand-500/15 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Main Container - Aligned to Site's w-11/12 grid */}
      <div className="w-11/12 mx-auto rounded-3xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-2xl bg-white dark:bg-[#0c0b1a] flex flex-col lg:flex-row transition-all duration-300 relative z-10">
        

        {/* ============================================================ */}
        {/* Left Column: Athletic Showcase & Real-Time Performance Lab   */}
        {/* ============================================================ */}
        <div className="w-full lg:w-5/12 xl:w-[45%] relative bg-[#090814] text-white flex flex-col justify-between p-8 sm:p-10 lg:p-12 xl:p-14 overflow-hidden select-none border-b lg:border-b-0 lg:border-r border-slate-800/60">
          
          {/* Backdrop Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1470&auto=format&fit=crop"
              alt="Gym Training"
              fill
              priority
              unoptimized
              className="object-cover opacity-25 scale-105 transition-transform duration-1000 ease-out"
            />
            {/* Scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#090814] via-[#090814]/85 to-[#120f26]/75 z-10" />
            <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-active/20 rounded-full blur-[100px] z-10 pointer-events-none" />
          </div>

          {/* Left Column Top: Tag & Status */}
          <div className="relative z-20 flex items-center justify-between gap-3 mb-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-active/15 border border-active/30 text-active text-xs font-black tracking-wider uppercase backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-active opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-active" />
              </span>
              <span>New Athlete Onboarding</span>
            </div>

            <span className="text-xs font-mono font-semibold text-emerald-400 flex items-center gap-2 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              7-Day VIP Active
            </span>
          </div>

          {/* Left Column Center: Headline & Live Perks Card */}
          <div className="relative z-20 my-auto py-6 sm:py-8 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 text-active text-xs font-black uppercase tracking-widest mb-2">
                <FaFire className="w-3.5 h-3.5 text-orange-400" /> Start Your Athletic Journey
              </div>
              <h1 className="text-3xl sm:text-4xl xl:text-5xl font-black text-white leading-tight tracking-tight">
                Unlock Your Potential. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-rose-100 to-active drop-shadow-md">
                  Join FlexPulse Today.
                </span>
              </h1>
              <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                Gain access to 100+ weekly classes, Olympic lifting decks, Finnish contrast saunas, and biometric coaching.
              </p>
            </div>

            {/* Live Studio Telemetry Card */}
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
                    <span className="text-xs text-slate-300 font-medium">Join an Elite Athletic Roster</span>
                  </div>
                </div>
                <span className="text-xs text-emerald-400 font-bold px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30">
                  VIP Tier
                </span>
              </div>

              {/* Perks Grid */}
              <div className="grid grid-cols-3 gap-3 text-center pt-1">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <strong className="block text-base sm:text-lg font-black text-white">Free</strong>
                  <span className="text-[10px] sm:text-xs text-slate-300 uppercase tracking-wider font-semibold">InBody 570</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <strong className="block text-base sm:text-lg font-black text-active">7-Day</strong>
                  <span className="text-[10px] sm:text-xs text-slate-300 uppercase tracking-wider font-semibold">VIP Pass</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <strong className="block text-base sm:text-lg font-black text-white">100%</strong>
                  <span className="text-[10px] sm:text-xs text-slate-300 uppercase tracking-wider font-semibold">Flexible</span>
                </div>
              </div>
            </div>
          </div>

          {/* Left Column Bottom: ATHLETE VERIFICATION TICKER */}
          <div className="relative z-20 pt-4 border-t border-white/10">
            <AthleteVerificationTicker
              testimonials={SIGNUP_TESTIMONIALS}
              title="WHY ATHLETES JOIN"
              variant="dark"
            />
          </div>
        </div>

        {/* ============================================================ */}
        {/* Right Column: High-Conversion Sign-Up Console                */}
        {/* ============================================================ */}
        <div className="w-full lg:w-7/12 xl:w-[55%] p-8 sm:p-10 lg:p-12 xl:p-14 flex flex-col justify-center bg-white dark:bg-[#0c0b1a] relative">
          
          {/* Header & Title */}
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-500/10 text-active text-xs font-black uppercase tracking-wider mb-2.5 border border-rose-200 dark:border-rose-500/20">
              <FaLock className="w-3 h-3" /> New Membership Registration
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
              Create Your Account
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-1 font-medium">
              Join FlexPulse to book classes, log workouts, and join discussions.
            </p>
          </div>

          {/* Google Social Signup */}
          <motion.button
            type="button"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={handleGoogleSignup}
            disabled={googleLoading}
            className="w-full py-3.5 px-5 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-[#141228] dark:hover:bg-[#1c193c] border border-slate-300 dark:border-white/15 text-slate-800 dark:text-slate-100 font-bold text-sm sm:text-base shadow-xs transition-all flex items-center justify-center gap-3 cursor-pointer disabled:opacity-60"
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

          {/* Divider */}
          <div className="relative flex items-center my-4">
            <div className="flex-grow border-t border-slate-200 dark:border-white/10" />
            <span className="shrink-0 px-3 text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Or register with email
            </span>
            <div className="flex-grow border-t border-slate-200 dark:border-white/10" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name Field */}
            <div>
              <label
                htmlFor="name"
                className="block text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-1.5"
              >
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
                  <FaUser className="w-4 h-4" />
                </div>
                <input
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Alex Morgan"
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 focus:bg-white dark:bg-[#141228] dark:focus:bg-[#1a1738] border border-slate-300 dark:border-white/15 focus:border-active focus:ring-4 focus:ring-active/15 text-sm sm:text-base text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none transition-all shadow-2xs font-medium"
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-1.5"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
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
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 focus:bg-white dark:bg-[#141228] dark:focus:bg-[#1a1738] border border-slate-300 dark:border-white/15 focus:border-active focus:ring-4 focus:ring-active/15 text-sm sm:text-base text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none transition-all shadow-2xs font-medium"
                />
              </div>
            </div>

            {/* Profile Avatar URL */}
            <div>
              <label
                htmlFor="image"
                className="block text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-1.5"
              >
                Avatar URL (Optional)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
                  <FaImage className="w-4 h-4" />
                </div>
                <input
                  id="image"
                  type="url"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="https://example.com/avatar.jpg"
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 focus:bg-white dark:bg-[#141228] dark:focus:bg-[#1a1738] border border-slate-300 dark:border-white/15 focus:border-active focus:ring-4 focus:ring-active/15 text-sm sm:text-base text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none transition-all shadow-2xs font-medium"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-1.5"
              >
                Password
              </label>
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
                  autoComplete="new-password"
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
              {capsLockActive && (
                <div className="mt-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-semibold flex items-center gap-1.5">
                  <FaExclamationTriangle className="w-3.5 h-3.5" />
                  <span>Caps Lock is currently ON</span>
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
                      : "text-slate-500 dark:text-slate-400"
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
                      : "text-slate-500 dark:text-slate-400"
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
                      : "text-slate-500 dark:text-slate-400"
                  }`}
                >
                  {hasLowerCase ? <FaCheckCircle className="w-3.5 h-3.5" /> : <FaTimesCircle className="w-3.5 h-3.5" />}
                  <span>Lowercase</span>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={!isPasswordValid || loading}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 mt-2 bg-btn-bg hover:bg-btn-bg/90 text-btn-text font-black text-sm uppercase tracking-wider rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Creating Account...</span>
                </div>
              ) : (
                <>
                  <span>Create Athlete Membership</span>
                  <FaArrowRight className="w-4 h-4" />
                </>
              )}
            </motion.button>
          </form>

          {/* Shift Redirect to signin */}
          <p className="text-center text-sm text-slate-600 dark:text-slate-400 mt-4">
            Already have an athlete account?{" "}
            <Link
              href="/signin"
              className="text-active font-bold hover:underline"
            >
              Sign In Here →
            </Link>
          </p>

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
            <span className="font-medium">Instant Membership Sync</span>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
