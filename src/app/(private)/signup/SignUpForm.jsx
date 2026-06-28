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
    FaImage,
    FaLock,
    FaTimesCircle,
    FaUser,
    FaUserTag,
} from "react-icons/fa";
import { IoMdEyeOff } from "react-icons/io";
import { IoEye } from "react-icons/io5";

export const dynamic = "force-dynamic";

const SignUpForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [role, setRole] = useState("member");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  // Password validation checking
  const hasMinLength = password.length >= 6;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const isPasswordValid = hasMinLength && hasUpperCase && hasLowerCase;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const registrationData = Object.fromEntries(formData.entries());
    if (!isPasswordValid) return;
    // Send registration data with additional role to Better Auth
    const { data, error } = await authClient.signUp.email({
      email: registrationData.email, // required
      password: registrationData.password, // required
      name: registrationData.name, // required
      image: registrationData.image, // required
      data: {
        role: registrationData.role || "member",
        plan: "free",
        status: "active",
      },
    });
    if (data) {
      router.push("/");
      toast.success("Sign up successful!");
    } else if (error) {
      toast.warning(error.message);
    }
  };

  return (
    <div className="min-h-screen flex bg-background transition-colors duration-300">
      {/* Right side - Image/Branding (Hidden on mobile, reversed from login) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-brand-900 flex-col justify-between p-12 overflow-hidden order-last border-l border-brand-500/10">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1470&auto=format&fit=crop"
            alt="Gym Workout"
            fill
            className="object-cover opacity-15 dark:opacity-20 transition-opacity duration-300"
          />
          <div className="absolute inset-0 bg-linear-to-t from-background via-background/70 to-transparent z-10"></div>
          {/* Theme-Aligned Ambient Glow */}
          <div className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-brand-500/10 dark:bg-brand-800/15 rounded-full blur-[120px] z-10"></div>
        </div>

        {/* Brand Header Layout */}
        <div className="relative z-20 flex justify-end w-full">
          <Link href="/" className="shrink-0 inline-flex items-center gap-2 group">
            <span className="text-2xl font-bold tracking-tight text-foreground group-hover:opacity-90 transition-opacity">
              Flex<span className="text-active">Pulse</span>
            </span>
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
          </Link>
        </div>

        {/* Hero Dynamic Marketing Text */}
        <div className="relative z-20 mb-12 text-right">
          <h2 className="text-5xl font-extrabold text-foreground mb-6 leading-tight tracking-tight">
            Start your journey <br />{" "}
            <span className="bg-linear-to-r from-[#535C91] to-[#9290C3] dark:from-[#9FA1FF] dark:to-white bg-clip-text text-transparent">
              today.
            </span>
          </h2>
          <p className="text-base text-foreground/80 dark:text-brand-300 max-w-md ml-auto leading-relaxed">
            Join thousands of driven individuals pushing their limits in our world-class facilities and engaging within our local community hub.
          </p>
        </div>
      </div>

      {/* Left side - Register Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative overflow-hidden order-first">
        <div className="absolute lg:hidden top-0 left-0 w-full h-full bg-background -z-10">
          <div className="absolute bottom-0 left-0 w-100 h-100 bg-brand-500/5 dark:bg-brand-800/10 rounded-full blur-[100px]"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Mobile Logo Layout */}
          <div className="lg:hidden text-center mb-8">
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

          <div className="mb-6">
            <h2 className="text-3xl font-bold text-foreground tracking-tight">
              Create Account
            </h2>
            <p className="text-sm text-brand-500 dark:text-brand-300 mt-2">
              Set up your profile to book classes and explore your custom workspace.
            </p>
          </div>

          {/* Input Fields Form Wrapper */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name Input */}
            <div>
              <label
                htmlFor="name"
                className="text-xs font-bold uppercase tracking-wider text-brand-500 dark:text-brand-300 block mb-2"
              >
                Full Name
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-active text-brand-500/70">
                  <FaUser className="h-4 w-4" />
                </div>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full pl-11 pr-4 py-3 bg-brand-800/20 dark:bg-[#070F2B]/40 border border-brand-500/30 rounded-xl text-foreground placeholder-brand-500/60 focus:outline-none focus:border-active focus:ring-1 focus:ring-active transition-all text-sm shadow-inner"
                  required
                />
              </div>
            </div>

            {/* Email Address Input */}
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
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@example.com"
                  className="w-full pl-11 pr-4 py-3 bg-brand-800/20 dark:bg-[#070F2B]/40 border border-brand-500/30 rounded-xl text-foreground placeholder-brand-500/60 focus:outline-none focus:border-active focus:ring-1 focus:ring-active transition-all text-sm shadow-inner"
                  required
                />
              </div>
            </div>

            {/* Profile Image URL Input */}
            <div>
              <label
                htmlFor="image"
                className="text-xs font-bold uppercase tracking-wider text-brand-500 dark:text-brand-300 block mb-2"
              >
                Profile Image URL
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-active text-brand-500/70">
                  <FaImage className="h-4 w-4" />
                </div>
                <input
                  id="image"
                  name="image"
                  type="url"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="https://example.com/avatar.jpg"
                  className="w-full pl-11 pr-4 py-3 bg-brand-800/20 dark:bg-[#070F2B]/40 border border-brand-500/30 rounded-xl text-foreground placeholder-brand-500/60 focus:outline-none focus:border-active focus:ring-1 focus:ring-active transition-all text-sm shadow-inner"
                />
              </div>
            </div>

            {/* Account Type Selection dropdown */}
            <div>
              <label
                htmlFor="role"
                className="text-xs font-bold uppercase tracking-wider text-brand-500 dark:text-brand-300 block mb-2"
              >
                Account Type
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-active text-brand-500/70">
                  <FaUserTag className="h-4 w-4" />
                </div>
                <select
                  id="role"
                  name="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full pl-11 pr-10 py-3 bg-brand-800/20 dark:bg-[#070F2B]/40 border border-brand-500/30 rounded-xl text-foreground focus:outline-none focus:border-active focus:ring-1 focus:ring-active transition-all text-sm shadow-inner appearance-none cursor-pointer dark:[&>option]:bg-[#070F2B]"
                >
                  <option value="member">Member</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-brand-500">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
              <p className="mt-2 text-xs text-brand-500 dark:text-brand-300 opacity-95">
                {role === "trainer"
                  ? "Trainers can create classes and post in forums."
                  : "Members can book classes and join the community."}
              </p>
            </div>

            {/* Password Input Field with Interactive Requirements */}
            <div>
              <label
                htmlFor="password"
                className="text-xs font-bold uppercase tracking-wider text-brand-500 dark:text-brand-300 block mb-2"
              >
                Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-active text-brand-500/70">
                  <FaLock className="h-4 w-4" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-12 py-3 bg-brand-800/20 dark:bg-[#070F2B]/40 border border-brand-500/30 rounded-xl text-foreground placeholder-brand-500/60 focus:outline-none focus:border-active focus:ring-1 focus:ring-active transition-all text-sm shadow-inner"
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

              {/* Password Requirement Trackers */}
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-brand-500">
                <div
                  className={`flex items-center gap-1.5 transition-colors ${password.length > 0 ? (hasMinLength ? "text-active" : "text-red-400 dark:text-red-400/90") : "opacity-75"}`}
                >
                  {password.length > 0 ? (
                    hasMinLength ? (
                      <FaCheckCircle />
                    ) : (
                      <FaTimesCircle />
                    )
                  ) : (
                    <div className="w-3 h-3 rounded-full border border-brand-500/40" />
                  )}
                  6+ characters
                </div>
                <div
                  className={`flex items-center gap-1.5 transition-colors ${password.length > 0 ? (hasUpperCase ? "text-active" : "text-red-400 dark:text-red-400/90") : "opacity-75"}`}
                >
                  {password.length > 0 ? (
                    hasUpperCase ? (
                      <FaCheckCircle />
                    ) : (
                      <FaTimesCircle />
                    )
                  ) : (
                    <div className="w-3 h-3 rounded-full border border-brand-500/40" />
                  )}
                  Uppercase letter
                </div>
                <div
                  className={`flex items-center gap-1.5 transition-colors ${password.length > 0 ? (hasLowerCase ? "text-active" : "text-red-400 dark:text-red-400/90") : "opacity-75"}`}
                >
                  {password.length > 0 ? (
                    hasLowerCase ? (
                      <FaCheckCircle />
                    ) : (
                      <FaTimesCircle />
                    )
                  ) : (
                    <div className="w-3 h-3 rounded-full border border-brand-500/40" />
                  )}
                  Lowercase letter
                </div>
              </div>
            </div>

            {/* Create Account Action Button */}
            <button
              type="submit"
              disabled={!isPasswordValid}
              className={`w-full py-4 mt-4 font-bold text-sm uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer ${
                isPasswordValid
                  ? "bg-btn-bg text-btn-text hover:opacity-95 dark:hover:shadow-glow shadow-md"
                  : "bg-brand-800/40 border border-brand-500/20 text-brand-500/60 cursor-not-allowed opacity-60"
              }`}
            >
              Create Account <FaArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Shift Redirect to signin */}
          <p className="text-center text-sm text-brand-500 dark:text-brand-300 mt-6">
            Already have an account?{" "}
            <Link
              href="/signin"
              className="text-active font-bold transition-colors underline decoration-active/30 underline-offset-4"
            >
              Sign in
            </Link>
          </p>

          {/* Footer Copyright */}
          <div className="mt-8 text-center hidden lg:block">
            <p className="text-xs text-brand-500 font-medium opacity-75">
              FlexPulse &copy; {new Date().getFullYear()}. All rights reserved.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SignUpForm;
