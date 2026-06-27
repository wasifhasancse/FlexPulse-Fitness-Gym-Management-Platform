"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background transition-colors duration-300">
      {/* Background Glow using active theme color */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-200 h-200 bg-active/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-6 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-800/20 border border-brand-500/30 text-active text-xs font-bold tracking-wider uppercase">
              <span className="flex h-2 w-2 rounded-full bg-active animate-pulse"></span>
              Premium Fitness & Gym Platform
            </div>

            <h1 className="font-['Outfit'] text-5xl sm:text-6xl lg:text-7xl font-extrabold text-foreground leading-[1.1] tracking-tight">
              Forge Your <br />
              <span className="text-active drop-shadow-[0_0_15px_var(--active-color)/0.2]">
                Strongest
              </span>
              <br />
              Self.
            </h1>

            <p className="font-['Inter'] text-lg sm:text-xl text-[#535C91] dark:text-[#9290C3] max-w-lg leading-relaxed">
              Welcome to{" "}
              <span className="font-bold text-foreground">FlexPulse</span> —
              where certified elite trainers, customized training programs, and
              a dedicated fitness community empower you to surpass your goals.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                href="/all-classes"
                className="inline-flex items-center px-8 py-4 bg-btn-bg text-btn-text font-extrabold rounded-2xl shadow-lg hover:shadow-xl hover:opacity-95 transform hover:-translate-y-0.5 transition-all duration-300 text-base sm:text-lg border border-brand-500/20"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 mr-2"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
                Explore Classes
              </Link>
              <Link
                href="/signup"
                className="inline-flex items-center px-8 py-4 bg-brand-800 text-foreground font-bold rounded-2xl hover:bg-brand-500/35 border border-brand-500/30 transition-all duration-300 text-base sm:text-lg shadow-sm"
              >
                Join Free
                <FiArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-12 border-t border-brand-500/35 mt-8">
              <div>
                <p className="text-3xl font-black text-active tracking-tight">
                  15,000+
                </p>
                <p className="text-[10px] sm:text-xs text-[#535C91] dark:text-[#9290C3] font-bold uppercase tracking-wider mt-1">
                  Active Members
                </p>
              </div>
              <div>
                <p className="text-3xl font-black text-active tracking-tight">
                  200+
                </p>
                <p className="text-[10px] sm:text-xs text-[#535C91] dark:text-[#9290C3] font-bold uppercase tracking-wider mt-1">
                  Expert Trainers
                </p>
              </div>
              <div>
                <p className="text-3xl font-black text-active tracking-tight">
                  99%
                </p>
                <p className="text-[10px] sm:text-xs text-[#535C91] dark:text-[#9290C3] font-bold uppercase tracking-wider mt-1">
                  Satisfaction Rate
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Staggered Grid with Animations & Borders */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="grid grid-cols-2 gap-5 w-full max-w-lg">
              <div className="space-y-5 pt-12">
                {/* Image 1 */}
                <div className="group relative h-72 rounded-[2rem] overflow-hidden border border-brand-500/30 shadow-2xl transition-all duration-500 hover:border-active">
                  <div className="absolute inset-0 bg-linear-to-t from-brand-900/80 via-transparent to-transparent opacity-60 z-10"></div>
                  <Image
                    src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    alt="Gym equipment"
                    fill
                  />
                  <div className="absolute bottom-4 left-4 z-20 bg-brand-900/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-brand-500/20 flex items-center gap-1.5 shadow-lg">
                    <span className="w-2.5 h-2.5 rounded-full bg-active animate-pulse"></span>
                    <span className="text-[11px] font-bold text-foreground">
                      Free Weights
                    </span>
                  </div>
                </div>
                {/* Image 2 */}
                <div className="group relative h-48 rounded-[2rem] overflow-hidden border border-brand-500/30 shadow-2xl transition-all duration-500 hover:border-active">
                  <div className="absolute inset-0 bg-linear-to-t from-brand-900/80 via-transparent to-transparent opacity-60 z-10"></div>
                  <Image
                    src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1470&auto=format&fit=crop"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    alt="Strength training"
                    fill
                  />
                </div>
              </div>
              <div className="space-y-5">
                {/* Image 3 */}
                <div className="group relative h-48 rounded-[2rem] overflow-hidden border border-brand-500/30 shadow-2xl transition-all duration-500 hover:border-active">
                  <div className="absolute inset-0 bg-linear-to-t from-brand-900/80 via-transparent to-transparent opacity-60 z-10"></div>
                  <Image
                    src="https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1470&auto=format&fit=crop"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    alt="Gym workout"
                    fill
                  />
                </div>
                {/* Image 4 */}
                <div className="group relative h-72 rounded-[2rem] overflow-hidden border border-brand-500/30 shadow-2xl transition-all duration-500 hover:border-active">
                  <div className="absolute inset-0 bg-linear-to-t from-brand-900/80 via-transparent to-transparent opacity-60 z-10"></div>
                  <Image
                    src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1520&auto=format&fit=crop"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    alt="Yoga stretching"
                    fill
                  />
                  <div className="absolute bottom-4 left-4 z-20 bg-brand-900/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-brand-500/20 flex items-center gap-1.5 shadow-lg">
                    <span className="w-2.5 h-2.5 rounded-full bg-active animate-pulse"></span>
                    <span className="text-[11px] font-bold text-foreground">
                      Yoga Sessions
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
