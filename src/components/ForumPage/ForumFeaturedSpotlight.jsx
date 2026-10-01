"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import {
  FaArrowRight,
  FaCheckCircle,
  FaComment,
  FaHeart,
  FaStar,
} from "react-icons/fa";

export default function ForumFeaturedSpotlight() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  return (
    <motion.section
      ref={containerRef}
      initial={{ opacity: 0, y: 35 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 35 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative mb-12 overflow-hidden rounded-3xl border border-brand-500/25 bg-[#070F2B] text-white shadow-md group"
    >
      <div className="relative h-64 sm:h-80 w-full overflow-hidden">
        {/* Background Image with Zoom Settle */}
        <motion.div
          initial={{ scale: 1.12, opacity: 0.25 }}
          animate={isInView ? { scale: 1, opacity: 0.45 } : { scale: 1.12, opacity: 0.25 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 w-full h-full"
        >
          <Image
            src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1400&q=80"
            alt="Carb Cycling & Macro Timing"
            fill
            priority
            unoptimized
            className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
          />
        </motion.div>

        {/* Dynamic Obsidian Vignette Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#070F2B] via-[#070F2B]/75 to-transparent pointer-events-none" />

        {/* Content Container */}
        <div className="absolute inset-0 p-6 sm:p-10 flex flex-col justify-end z-10">
          {/* 1. Category Badges (Downward Arrival) */}
          <motion.div
            initial={{ opacity: 0, y: -18 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -18 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-2 mb-3"
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-active text-btn-text text-xs font-extrabold uppercase tracking-wider shadow-xs">
              <FaStar className="w-3 h-3 text-amber-300" />
              <span>Featured Protocol of the Week</span>
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-white/10 backdrop-blur-md text-white/90 text-xs font-semibold border border-white/10">
              Nutrition &amp; Fuel
            </span>
          </motion.div>

          {/* 2. Main Title (Slow Rising Sweep with Focus) */}
          <motion.h2
            initial={{ opacity: 0, y: 22, filter: "blur(4px)" }}
            animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 22, filter: "blur(4px)" }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="font-['Outfit'] text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight text-white mb-2 max-w-3xl"
          >
            <Link
              href="/forum/6a42a1019dfe3eee48bf7002"
              className="hover:text-active transition-colors"
            >
              Carb Cycling &amp; Macro Timing: Optimizing Insulin Sensitivity for Hypertrophy
            </Link>
          </motion.h2>

          {/* 3. Subtitle / Description (Contrasting Downward Glide) */}
          <motion.p
            initial={{ opacity: 0, y: -12 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: 0.75, delay: 0.35, ease: "easeOut" }}
            className="font-['Inter'] text-xs sm:text-sm text-white/80 line-clamp-2 max-w-2xl mb-4 leading-relaxed"
          >
            Strategic carbohydrate timing allows athletes to replenish muscle glycogen without unwanted visceral adipose gain. Learn how to structure peri-workout starch intake and the leucine threshold.
          </motion.p>

          {/* 4. Bottom Author Bar & Telemetry */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10 text-xs">
            {/* Author Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.75, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-3"
            >
              <div className="relative">
                <motion.div
                  initial={{ scale: 0.6, rotate: -12 }}
                  animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0.6, rotate: -12 }}
                  transition={{ type: "spring", stiffness: 160, damping: 18, delay: 0.5 }}
                >
                  <Image
                    src="https://lh3.googleusercontent.com/a/ACg8ocKzbEXd0N7V406ocsmdiEQkxCVV1BIJpiTn--O3W0TqjLiNy6e3=s96-c"
                    alt="Wasif Hasan"
                    width={34}
                    height={34}
                    className="w-8 h-8 rounded-full object-cover border-2 border-active"
                  />
                </motion.div>
                <span className="absolute -bottom-0.5 -right-0.5 p-0.5 bg-slate-900 rounded-full">
                  <FaCheckCircle className="w-2.5 h-2.5 text-active" />
                </span>
              </div>
              <div>
                <span className="font-bold text-white">Wasif Hasan</span>
                <span className="text-white/60 ml-2">Powerlifting &amp; Nutrition</span>
              </div>
            </motion.div>

            {/* Social Engagement Counters & CTA */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 0.75, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-5"
            >
              <span className="flex items-center gap-1.5 text-rose-400 font-semibold">
                <FaHeart className="w-3.5 h-3.5" /> 3 likes
              </span>
              <span className="flex items-center gap-1.5 text-active font-semibold">
                <FaComment className="w-3.5 h-3.5" /> 1 discussion
              </span>
              <motion.div
                initial={{ opacity: 0, scale: 0.9, x: 10, y: 10 }}
                animate={isInView ? { opacity: 1, scale: 1, x: 0, y: 0 } : { opacity: 0, scale: 0.9, x: 10, y: 10 }}
                transition={{ type: "spring", stiffness: 180, damping: 20, delay: 0.55 }}
              >
                <Link
                  href="/forum/6a42a1019dfe3eee48bf7002"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-btn-bg text-btn-text font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-all shadow-sm active:scale-95"
                >
                  <span>Read Blueprint</span>
                  <FaArrowRight className="w-3 h-3" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
