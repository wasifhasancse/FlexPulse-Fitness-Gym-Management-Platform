"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaGoogle, FaEnvelope, FaLock, FaArrowRight } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { authClient } from "@/lib/auth-client";
import { toast } from "@heroui/react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";

export const dynamic = "force-dynamic";

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const redirectUrl = searchParams.get("redirect") || "/";
    const { data, error } = await authClient.signIn.email({
      email, // required
      password, // required
      rememberMe: true,
    });
    if (data) {
      toast.success("Successfully signed in!");
      router.replace(redirectUrl);
    } else if (error) {
      toast.warning(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    const redirectUrl = searchParams.get("redirect") || "/";
    await authClient.signIn.social({
      provider: "google",
      callbackURL: redirectUrl,
    });
  };

  return (
    <div className="min-h-screen flex bg-background transition-colors duration-300">
      {/* Left side - Image/Branding (Hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-brand-900 flex-col justify-between p-12 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop"
            alt="Gym Motivation"
            fill
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-linear-to-t from-background via-background/80 to-transparent z-10"></div>
          {/* Neon Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-[#CFFF04]/10 rounded-full blur-[120px] z-10"></div>
        </div>

        <div className="relative z-20">
          <Link href="/" className="inline-block">
            <h1 className="font-['Inter'] text-3xl font-black text-foreground tracking-tight flex items-center gap-2">
              <div className="w-8 h-8 bg-[#CFFF04] rounded-sm flex items-center justify-center">
                <span className="text-brand-900 font-bold text-lg">FP</span>
              </div>
              FlexPulse
            </h1>
          </Link>
        </div>

        <div className="relative z-20 mb-12">
          <h2 className="font-['Inter'] text-5xl font-extrabold text-white mb-6 leading-tight">
            Welcome back to the <br/> <span className="text-[#CFFF04]">FlexPulse.</span>
          </h2>
          <p className="font-['Inter'] text-lg text-brand-300 max-w-md">
            Log in to access your personalized workout plans, track your progress, and book your next premium session.
          </p>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative overflow-hidden">
        {/* Mobile background elements */}
        <div className="absolute lg:hidden top-0 left-0 w-full h-full bg-brand-900 -z-10">
           <div className="absolute top-0 right-0 w-100 h-100 bg-[#CFFF04]/5 rounded-full blur-[100px]"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-10">
            <Link href="/" className="inline-flex flex-col items-center">
              <div className="w-12 h-12 bg-[#CFFF04] rounded-md flex items-center justify-center mb-3 shadow-[0_0_15px_rgba(207,255,4,0.3)]">
                <span className="text-brand-900 font-bold text-2xl">FP</span>
              </div>
              <h1 className="font-['Inter'] text-3xl font-black text-foreground tracking-tight">
                FlexPulse
              </h1>
            </Link>
          </div>

          <div className="mb-10">
            <h2 className="font-['Inter'] text-3xl font-bold text-foreground">
              Sign In
            </h2>
            <p className="font-['Inter'] text-base text-brand-300 mt-2">
              Enter your credentials to access your account.
            </p>
          </div>

          {/* Google Login */}
          <button
            onClick={handleGoogleLogin}
            className="w-full py-3.5 bg-brand-800 border border-brand-500/30 rounded-xl font-['Inter'] text-sm font-bold text-foreground hover:bg-brand-500/20 transition-colors flex items-center justify-center gap-3 shadow-sm mb-8"
          >
            <FcGoogle size={22} />
            Continue with Google
          </button>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-brand-500/30"></div>
            <span className="font-['Inter'] text-xs font-bold text-brand-500 uppercase tracking-widest px-4">
              Or email
            </span>
            <div className="flex-1 border-t border-brand-500/30"></div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="font-['Inter'] text-xs font-bold uppercase tracking-wider text-brand-300 block mb-2"
              >
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-[#CFFF04] text-brand-500">
                  <FaEnvelope className="h-4 w-4" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-11 pr-4 py-3.5 bg-brand-800 border border-brand-500/30 rounded-xl text-foreground placeholder-brand-500 focus:outline-none focus:border-[#CFFF04] focus:ring-1 focus:ring-[#CFFF04] transition-all font-['Inter'] text-base shadow-inner"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label
                  htmlFor="password"
                  className="font-['Inter'] text-xs font-bold uppercase tracking-wider text-brand-300 block"
                >
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="font-['Inter'] text-xs font-bold text-[#CFFF04] hover:text-[#b0d903] transition-colors"
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-[#CFFF04] text-brand-500">
                  <FaLock className="h-4 w-4" />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-12 py-3.5 bg-brand-800 border border-brand-500/30 rounded-xl text-foreground placeholder-brand-500 focus:outline-none focus:border-[#CFFF04] focus:ring-1 focus:ring-[#CFFF04] transition-all font-['Inter'] text-base shadow-inner"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-brand-500 hover:text-[#CFFF04] font-['Inter'] text-xs font-bold uppercase tracking-wider"
                >
                  {showPassword ? <IoMdEyeOff /> : <IoEye />}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full py-4 mt-2 bg-[#CFFF04] text-brand-900 font-['Inter'] font-bold text-base uppercase tracking-wider rounded-xl hover:bg-[#b0d903] transition-all shadow-[0_0_15px_rgba(207,255,4,0.2)] hover:shadow-[0_0_25px_rgba(207,255,4,0.4)] flex items-center justify-center gap-2"
            >
              Sign In <FaArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Register Link */}
          <p className="text-center font-['Inter'] text-sm text-brand-300 mt-8">
            Don&amp;t have an account?{" "}
            <Link
              href="/auth/register"
              className="text-[#CFFF04] hover:text-[#b0d903] font-bold transition-colors underline decoration-[#CFFF04]/30 underline-offset-4"
            >
              Create one now
            </Link>
          </p>

          {/* Footer note */}
          <div className="mt-12 text-center">
            <p className="font-['Inter'] text-xs text-brand-500 font-medium">
             FlexPulse &copy; {new Date().getFullYear()}. All rights reserved.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SignInForm;
