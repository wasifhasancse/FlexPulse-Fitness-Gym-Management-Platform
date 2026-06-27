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
      <div className="hidden lg:flex lg:w-1/2 relative bg-brand-900 flex-col justify-between p-12 overflow-hidden order-last">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1470&auto=format&fit=crop"
            alt="Gym Workout"
            fill
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-linear-to-t from-background via-background/80 to-transparent z-10"></div>
          <div className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-[#CFFF04]/10 rounded-full blur-[120px] z-10"></div>
        </div>

        <div className="relative z-20 flex justify-end w-full">
          <Link href="/" className="inline-block">
            <h1 className="font-['Inter'] text-3xl font-black text-foreground tracking-tight flex items-center justify-end gap-2">
              FlexPulse
              <div className="w-8 h-8 bg-[#CFFF04] rounded-sm flex items-center justify-center">
                <span className="text-brand-900 font-bold text-lg">FP</span>
              </div>
            </h1>
          </Link>
        </div>

        <div className="relative z-20 mb-12 text-right">
          <h2 className="font-['Inter'] text-5xl font-extrabold text-white mb-6 leading-tight">
            Start your journey <br />{" "}
            <span className="text-[#CFFF04]">today.</span>
          </h2>
          <p className="font-['Inter'] text-lg text-brand-300 max-w-md ml-auto">
            Join thousands of driven individuals pushing their limits in our
            world-class facilities.
          </p>
        </div>
      </div>

      {/* Left side - Register Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative overflow-hidden order-first">
        <div className="absolute lg:hidden top-0 left-0 w-full h-full bg-brand-900 -z-10">
          <div className="absolute bottom-0 left-0 w-100 h-100 bg-[#CFFF04]/5 rounded-full blur-[100px]"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <Link href="/" className="inline-flex flex-col items-center">
              <div className="w-12 h-12 bg-[#CFFF04] rounded-md flex items-center justify-center mb-3 shadow-[0_0_15px_rgba(207,255,4,0.3)]">
                <span className="text-brand-900 font-bold text-2xl">FP</span>
              </div>
              <h1 className="font-['Inter'] text-3xl font-black text-foreground tracking-tight">
                FlexPulse
              </h1>
            </Link>
          </div>

          <div className="mb-8">
            <h2 className="font-['Inter'] text-3xl font-bold text-foreground">
              Create Account
            </h2>
            <p className="font-['Inter'] text-base text-brand-300 mt-2">
              Set up your profile to book classes and more.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="font-['Inter'] text-xs font-bold uppercase tracking-wider text-brand-300 block mb-2"
              >
                Full Name
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-[#CFFF04] text-brand-500">
                  <FaUser className="h-4 w-4" />
                </div>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full pl-11 pr-4 py-3 bg-brand-800 border border-brand-500/30 rounded-xl text-foreground placeholder-brand-500 focus:outline-none focus:border-[#CFFF04] focus:ring-1 focus:ring-[#CFFF04] transition-all font-['Inter'] text-base shadow-inner"
                  required
                />
              </div>
            </div>

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
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@example.com"
                  className="w-full pl-11 pr-4 py-3 bg-brand-800 border border-brand-500/30 rounded-xl text-foreground placeholder-brand-500 focus:outline-none focus:border-[#CFFF04] focus:ring-1 focus:ring-[#CFFF04] transition-all font-['Inter'] text-base shadow-inner"
                  required
                />
              </div>
            </div>

            {/* Profile Image URL */}
            <div>
              <label
                htmlFor="image"
                className="font-['Inter'] text-xs font-bold uppercase tracking-wider text-brand-300 block mb-2"
              >
                Profile Image URL
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-[#CFFF04] text-brand-500">
                  <FaImage className="h-4 w-4" />
                </div>
                <input
                  id="image"
                  name="image"
                  type="url"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="https://example.com/avatar.jpg"
                  className="w-full pl-11 pr-4 py-3 bg-brand-800 border border-brand-500/30 rounded-xl text-foreground placeholder-brand-500 focus:outline-none focus:border-[#CFFF04] focus:ring-1 focus:ring-[#CFFF04] transition-all font-['Inter'] text-base shadow-inner"
                />
              </div>
            </div>

            {/* Role Selection */}
            <div>
              <label
                htmlFor="role"
                className="font-['Inter'] text-xs font-bold uppercase tracking-wider text-brand-300 block mb-2"
              >
                Account Type
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-[#CFFF04] text-brand-500">
                  <FaUserTag className="h-4 w-4" />
                </div>
                <select
                  id="role"
                  name="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full pl-11 pr-10 py-3 bg-brand-800 border border-brand-500/30 rounded-xl text-foreground focus:outline-none focus:border-[#CFFF04] focus:ring-1 focus:ring-[#CFFF04] transition-all font-['Inter'] text-base shadow-inner appearance-none cursor-pointer"
                >
                  <option value="member">Member</option>
                  {/* <option value="trainer">Trainer</option> */}
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
              <p className="mt-2 font-['Inter'] text-xs text-brand-300">
                {role === "trainer"
                  ? "Trainers can create classes and post in forums."
                  : "Members can book classes and join the community."}
              </p>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="font-['Inter'] text-xs font-bold uppercase tracking-wider text-brand-300 block mb-2"
              >
                Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-[#CFFF04] text-brand-500">
                  <FaLock className="h-4 w-4" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-12 py-3 bg-brand-800 border border-brand-500/30 rounded-xl text-foreground placeholder-brand-500 focus:outline-none focus:border-[#CFFF04] focus:ring-1 focus:ring-[#CFFF04] transition-all font-['Inter'] text-base shadow-inner"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-brand-500 hover:text-[#CFFF04] text-xs font-bold uppercase tracking-wider font-['Inter']"
                >
                  {showPassword ? (
                    <IoMdEyeOff className="h-5 w-5" />
                  ) : (
                    <IoEye className="h-5 w-5" />
                  )}
                </button>
              </div>

              {/* Password Requirements */}
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 font-['Inter'] text-xs text-brand-500">
                <p
                  className={`flex items-center gap-1.5 ${password.length > 0 ? (hasMinLength ? "text-[#CFFF04]" : "text-red-400") : ""}`}
                >
                  {password.length > 0 ? (
                    hasMinLength ? (
                      <FaCheckCircle />
                    ) : (
                      <FaTimesCircle />
                    )
                  ) : (
                    <div className="w-3 h-3 rounded-full border border-brand-500" />
                  )}
                  6+ characters
                </p>
                <p
                  className={`flex items-center gap-1.5 ${password.length > 0 ? (hasUpperCase ? "text-[#CFFF04]" : "text-red-400") : ""}`}
                >
                  {password.length > 0 ? (
                    hasUpperCase ? (
                      <FaCheckCircle />
                    ) : (
                      <FaTimesCircle />
                    )
                  ) : (
                    <div className="w-3 h-3 rounded-full border border-brand-500" />
                  )}
                  Uppercase letter
                </p>
                <p
                  className={`flex items-center gap-1.5 ${password.length > 0 ? (hasLowerCase ? "text-[#CFFF04]" : "text-red-400") : ""}`}
                >
                  {password.length > 0 ? (
                    hasLowerCase ? (
                      <FaCheckCircle />
                    ) : (
                      <FaTimesCircle />
                    )
                  ) : (
                    <div className="w-3 h-3 rounded-full border border-brand-500" />
                  )}
                  Lowercase letter
                </p>
              </div>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              disabled={!isPasswordValid}
              className={`w-full py-4 mt-4 font-['Inter'] font-bold text-base uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 ${
                isPasswordValid
                  ? "bg-[#CFFF04] text-brand-900 shadow-[0_0_15px_rgba(207,255,4,0.2)] hover:shadow-[0_0_25px_rgba(207,255,4,0.4)] hover:bg-[#b0d903]"
                  : "bg-brand-800 border border-brand-500/30 text-brand-500 cursor-not-allowed"
              }`}
            >
              Create Account <FaArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Login Link */}
          <p className="text-center font-['Inter'] text-sm text-brand-300 mt-6">
            Already have an account?{" "}
            <Link
              href="/signin"
              className="text-[#CFFF04] hover:text-[#b0d903] font-bold transition-colors underline decoration-[#CFFF04]/30 underline-offset-4"
            >
              Sign in
            </Link>
          </p>

          {/* Footer note */}
          <div className="mt-8 text-center hidden lg:block">
            <p className="font-['Inter'] text-xs text-brand-500 font-medium">
              FlexPulse &copy; {new Date().getFullYear()}. All rights reserved.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SignUpForm;
