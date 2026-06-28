"use client";

import { authClient } from "@/lib/auth-client";
import { toast } from "@heroui/react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { FaArrowRight, FaEnvelope, FaLock } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { IoMdEyeOff } from "react-icons/io";
import { IoEye } from "react-icons/io5";

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
      <div className="hidden lg:flex lg:w-1/2 relative bg-brand-900 flex-col justify-between p-12 overflow-hidden border-r border-brand-500/20">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop"
            alt="Gym Motivation"
            fill
            className="object-cover opacity-15 dark:opacity-20 transition-opacity duration-300"
          />
          <div className="absolute inset-0 bg-linear-to-t from-background via-background/60 to-transparent z-10"></div>
          {/* Theme-Aligned Ambient Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-brand-500/10 dark:bg-brand-800/20 rounded-full blur-[120px] z-10"></div>
        </div>

        {/* Brand Header */}
        <div className="relative z-20">
          <Link href="/" className="shrink-0 inline-flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-[#9290C3] to-[#535C91] dark:from-[#1B1A55] dark:to-[#070F2B] flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300 border border-brand-500/20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-6 w-6 text-active"
              >
                <path d="M6 5H4v14h2V5zm14 0h-2v14h2V5zm-4 6H8v2h8v-2zm-1-4h-2v10h2V7zm-8 0H5v10h2V7z" />
              </svg>
            </div>
            <span className="text-2xl font-bold tracking-tight text-foreground group-hover:opacity-90 transition-opacity">
              Flex<span className="text-active">Pulse</span>
            </span>
          </Link>
        </div>

        {/* Motivational Copy */}
        <div className="relative z-20 mb-12">
          <h2 className="text-5xl font-extrabold text-foreground mb-6 leading-tight">
            Welcome back to <br />{" "}
            <span className="bg-linear-to-r from-[#535C91] to-[#9290C3] dark:from-[#9FA1FF] dark:to-white bg-clip-text text-transparent">
              FlexPulse.
            </span>
          </h2>
          <p className="text-base text-foreground/80 dark:text-brand-300 max-w-md leading-relaxed">
            Log in to access your personalized interactive classes, engage with the global community forums, and manage your progress inside your dedicated dashboard hub.
          </p>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative overflow-hidden">
        {/* Mobile background elements */}
        <div className="absolute lg:hidden top-0 left-0 w-full h-full bg-background -z-10">
          <div className="absolute top-0 right-0 w-100 h-100 bg-brand-500/5 dark:bg-brand-800/10 rounded-full blur-[100px]"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-10">
            <Link href="/" className="inline-flex flex-col items-center gap-2 group">
              <div className="w-12 h-12 rounded-xl bg-linear-to-br from-[#9290C3] to-[#535C91] dark:from-[#1B1A55] dark:to-[#070F2B] flex items-center justify-center shadow-lg border border-brand-500/20">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-7 w-7 text-active"
                >
                  <path d="M6 5H4v14h2V5zm14 0h-2v14h2V5zm-4 6H8v2h8v-2zm-1-4h-2v10h2V7zm-8 0H5v10h2V7z" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground">
                Flex<span className="text-active">Pulse</span>
              </h1>
            </Link>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-foreground tracking-tight">
              Sign In
            </h2>
            <p className="text-sm text-brand-500 dark:text-brand-300 mt-2">
              Enter your credentials to access your account dashboard hub.
            </p>
          </div>

          {/* Google Login Button */}
          <button
            onClick={handleGoogleLogin}
            className="w-full py-3.5 bg-brand-800/40 dark:bg-[#1B1A55]/30 border border-brand-500/20 dark:border-brand-500/30 rounded-xl text-sm font-semibold text-foreground hover:bg-brand-500/10 dark:hover:bg-[#1B1A55]/60 transition-colors flex items-center justify-center gap-3 shadow-xs cursor-pointer"
          >
            <FcGoogle size={22} />
            Continue with Google
          </button>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-brand-500/20 dark:border-brand-800/40"></div>
            <span className="text-xs font-bold text-brand-500 tracking-widest px-4 uppercase opacity-80">
              Or email
            </span>
            <div className="flex-1 border-t border-brand-500/20 dark:border-brand-800/40"></div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="text-xs font-bold uppercase tracking-wider text-brand-500 dark:text-brand-300 block mb-2"
              >
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-active text-brand-500/70">
                  <FaEnvelope className="h-4 w-4" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-11 pr-4 py-3.5 bg-brand-800/20 dark:bg-[#070F2B]/40 border border-brand-500/30 rounded-xl text-foreground placeholder-brand-500/60 focus:outline-none focus:border-active focus:ring-1 focus:ring-active transition-all text-sm shadow-inner"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label
                  htmlFor="password"
                  className="text-xs font-bold uppercase tracking-wider text-brand-500 dark:text-brand-300 block"
                >
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs font-semibold text-active hover:opacity-80 transition-opacity"
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-active text-brand-500/70">
                  <FaLock className="h-4 w-4" />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-12 py-3.5 bg-brand-800/20 dark:bg-[#070F2B]/40 border border-brand-500/30 rounded-xl text-foreground placeholder-brand-500/60 focus:outline-none focus:border-active focus:ring-1 focus:ring-active transition-all text-sm shadow-inner"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-brand-500/70 hover:text-active transition-colors cursor-pointer"
                >
                  {showPassword ? (
                    <IoMdEyeOff className="h-5 w-5" />
                  ) : (
                    <IoEye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Action Button */}
            <button
              type="submit"
              className="w-full py-4 mt-2 bg-btn-bg text-btn-text font-bold text-sm uppercase tracking-wider rounded-xl hover:opacity-95 dark:hover:shadow-glow transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              Sign In <FaArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Registration Redirect Link */}
          <p className="text-center text-sm text-brand-500 dark:text-brand-300 mt-8">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="text-active font-bold transition-colors underline decoration-active/30 underline-offset-4"
            >
              Create one now
            </Link>
          </p>

          {/* Footer Rights Banner */}
          <div className="mt-12 text-center">
            <p className="text-xs text-brand-500 font-medium opacity-75">
              FlexPulse &copy; {new Date().getFullYear()}. All rights reserved.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SignInForm;
