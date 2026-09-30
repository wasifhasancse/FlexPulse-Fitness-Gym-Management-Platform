"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AnimatedSectionTitle from "@/components/common/AnimatedSectionTitle";
import {
  FaBolt,
  FaCheckCircle,
  FaClock,
  FaCommentDots,
  FaFire,
  FaPlus,
  FaSearch,
  FaShieldAlt,
  FaTrophy,
  FaUsers,
} from "react-icons/fa";

export default function ForumHero({ totalPosts = 12 }) {
  const router = useRouter();
  const [heroSearch, setHeroSearch] = useState("");

  const handleHeroSearchSubmit = (e) => {
    e.preventDefault();
    if (heroSearch.trim()) {
      router.push(`/forum?search=${encodeURIComponent(heroSearch.trim())}`);
    }
  };

  const quickTags = [
    { label: "Zone 2 Cardio", query: "Zone 2" },
    { label: "Carb Timing", query: "Macro" },
    { label: "Squat Depth", query: "Squat" },
    { label: "CNS Recovery", query: "Sleep" },
    { label: "Metabolic HIIT", query: "Metabolic" },
  ];

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-900/10 via-white to-brand-500/10 dark:from-[#0B1026] dark:via-[#111638] dark:to-[#070F2B] border border-brand-500/25 p-6 sm:p-10 lg:p-12 mb-12 shadow-xl transition-all">
      {/* Dynamic Background Atmosphere */}
      <div className="absolute top-0 right-10 w-96 h-96 bg-active/15 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-brand-500/15 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Grid Texture Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left Side: Editorial & Search (7 Cols on lg) */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          {/* Member Avatars & Live Status Badge */}
          <div className="inline-flex flex-wrap items-center gap-3 p-1.5 pr-4 rounded-full bg-white/80 dark:bg-[#1B1A55]/60 border border-brand-500/20 backdrop-blur-md shadow-sm mb-6">
            <div className="flex -space-x-2 overflow-hidden">
              <Image
                src="https://t4.ftcdn.net/jpg/11/66/06/77/360_F_1166067709_2SooAuPWXp20XkGev7oOT7nuK1VThCsN.jpg"
                alt="Coach Alana"
                width={28}
                height={28}
                className="inline-block h-7 w-7 rounded-full ring-2 ring-white dark:ring-slate-900 object-cover"
              />
              <Image
                src="https://prio.co.in/avatar.png"
                alt="Coach Marcus"
                width={28}
                height={28}
                className="inline-block h-7 w-7 rounded-full ring-2 ring-white dark:ring-slate-900 object-cover"
              />
              <Image
                src="https://lh3.googleusercontent.com/a/ACg8ocKzbEXd0N7V406ocsmdiEQkxCVV1BIJpiTn--O3W0TqjLiNy6e3=s96-c"
                alt="Wasif"
                width={28}
                height={28}
                className="inline-block h-7 w-7 rounded-full ring-2 ring-white dark:ring-slate-900 object-cover"
              />
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-foreground">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-active font-extrabold uppercase tracking-wider text-[11px]">
                Live Athlete Hub
              </span>
              <span className="text-[#535C91] dark:text-[#9290C3] font-medium hidden sm:inline">
                • 2,480+ Members Active
              </span>
            </div>
          </div>

          <AnimatedSectionTitle
            kicker="Live Athlete Hub • 2,480+ Members Active"
            title="Community Training Grounds & Forum"
            highlightText="Training Grounds"
            subtitle="Exchange science-backed training splits, request movement form critiques from certified coaches, and dial in precision nutrition protocols with competitive athletes."
            align="left"
            className="mb-4"
          />

          {/* Hero Quick Search Bar */}
          <form
            onSubmit={handleHeroSearchSubmit}
            className="w-full max-w-xl relative flex items-center mb-4"
          >
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-brand-500">
              <FaSearch className="w-4 h-4 text-active" />
            </div>
            <input
              type="text"
              value={heroSearch}
              onChange={(e) => setHeroSearch(e.target.value)}
              placeholder="Search exercise form, macro plans, protocols, coaches..."
              className="w-full pl-11 pr-28 py-3.5 rounded-2xl bg-white dark:bg-[#1B1A55]/50 border border-brand-500/25 text-foreground placeholder-[#535C91]/60 dark:placeholder-[#9290C3]/60 text-sm focus:outline-none focus:border-active focus:ring-2 focus:ring-active/20 shadow-inner"
            />
            <button
              type="submit"
              className="absolute right-2 top-1.5 bottom-1.5 px-4 rounded-xl bg-btn-bg text-btn-text text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-all cursor-pointer shadow-sm"
            >
              Search
            </button>
          </form>

          {/* Quick Filter Tags */}
          <div className="flex flex-wrap items-center gap-2 mb-8">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#535C91] dark:text-[#9290C3] flex items-center gap-1">
              <FaFire className="w-3 h-3 text-active" /> Popular:
            </span>
            {quickTags.map((t) => (
              <button
                key={t.label}
                onClick={() => router.push(`/forum?search=${encodeURIComponent(t.query)}`)}
                className="px-2.5 py-1 rounded-lg bg-brand-500/10 dark:bg-brand-500/20 hover:bg-active/10 border border-brand-500/15 text-[11px] font-['Inter'] font-semibold text-foreground hover:text-active transition-all cursor-pointer"
              >
                #{t.label}
              </button>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/dashboard/trainer/forum-post"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-btn-bg text-btn-text font-bold rounded-2xl shadow-lg border border-brand-500/20 hover:opacity-95 hover:scale-[1.02] active:scale-95 transition-all text-xs uppercase tracking-wider cursor-pointer"
            >
              <FaPlus className="w-3.5 h-3.5" />
              <span>Start New Discussion</span>
            </Link>
            <a
              href="#discussions-feed"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/70 dark:bg-[#1B1A55]/40 text-foreground font-bold rounded-2xl border border-brand-500/25 hover:border-active/50 hover:bg-brand-500/10 transition-all text-xs uppercase tracking-wider cursor-pointer shadow-sm"
            >
              <FaCommentDots className="w-3.5 h-3.5 text-active" />
              <span>Browse All Protocols</span>
            </a>
          </div>
        </div>

        {/* Right Side: Live Community Activity Radar (5 Cols on lg) */}
        <div className="lg:col-span-5 w-full">
          <div className="rounded-3xl bg-white/80 dark:bg-[#111638]/90 border border-brand-500/25 p-6 backdrop-blur-xl shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-brand-500/10">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-active animate-ping" />
                <h3 className="font-['Outfit'] font-bold text-foreground text-sm uppercase tracking-wider">
                  Live Community Activity
                </h3>
              </div>
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-active/10 text-active">
                Real-Time
              </span>
            </div>

            {/* Live Feed Activity Ticker Items */}
            <div className="space-y-3.5 font-['Inter'] text-xs">
              {/* Item 1 */}
              <div className="p-3 rounded-2xl bg-brand-500/5 dark:bg-[#1B1A55]/40 border border-brand-500/10 hover:border-active/30 transition-all">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-foreground flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Coach Alana Serrano
                  </span>
                  <span className="text-[10px] text-[#535C91] dark:text-[#9290C3]">
                    2m ago
                  </span>
                </div>
                <p className="text-[#535C91] dark:text-[#9290C3] line-clamp-2">
                  Answered: &quot;Drop thruster weight to 35kg to preserve metabolic turnover...&quot;
                </p>
                <div className="mt-1.5 flex items-center gap-2 text-[10px] text-active font-semibold">
                  <span>In: High-Density Metabolic Circuit</span>
                </div>
              </div>

              {/* Item 2 */}
              <div className="p-3 rounded-2xl bg-brand-500/5 dark:bg-[#1B1A55]/40 border border-brand-500/10 hover:border-active/30 transition-all">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-foreground flex items-center gap-1.5">
                    <FaTrophy className="w-3 h-3 text-amber-500" />
                    Noah Guzman
                  </span>
                  <span className="text-[10px] text-[#535C91] dark:text-[#9290C3]">
                    8m ago
                  </span>
                </div>
                <p className="text-[#535C91] dark:text-[#9290C3] line-clamp-2">
                  Logged: &quot;The 90/90 hip rotation drill resolved my deep squat hip impingement!&quot;
                </p>
                <div className="mt-1.5 flex items-center gap-2 text-[10px] text-active font-semibold">
                  <span>In: Deep Hip &amp; Thoracic Mobility</span>
                </div>
              </div>

              {/* Item 3 */}
              <div className="p-3 rounded-2xl bg-brand-500/5 dark:bg-[#1B1A55]/40 border border-brand-500/10 hover:border-active/30 transition-all">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-foreground flex items-center gap-1.5">
                    <FaCheckCircle className="w-3 h-3 text-active" />
                    Coach Marcus Vance
                  </span>
                  <span className="text-[10px] text-[#535C91] dark:text-[#9290C3]">
                    15m ago
                  </span>
                </div>
                <p className="text-[#535C91] dark:text-[#9290C3] line-clamp-2">
                  Published: &quot;Squat Depth &amp; Knee Tracking: Debunking the Knees Over Toes Myth&quot;
                </p>
                <div className="mt-1.5 flex items-center gap-2 text-[10px] text-active font-semibold">
                  <span>Biomechanics Blueprint</span>
                </div>
              </div>
            </div>

            {/* Quick Community Guarantee */}
            <div className="mt-4 pt-3.5 border-t border-brand-500/10 flex items-center justify-between text-[11px] text-[#535C91] dark:text-[#9290C3]">
              <span className="flex items-center gap-1.5">
                <FaShieldAlt className="w-3 h-3 text-active" />
                <span>Certified Trainer Moderated</span>
              </span>
              <span className="font-bold text-foreground">100% Peer Supported</span>
            </div>
          </div>
        </div>
      </div>

      {/* Metric Counters Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-brand-500/20">
        <div className="p-4 rounded-2xl bg-white/70 dark:bg-[#1B1A55]/40 border border-brand-500/15 shadow-sm text-center group hover:border-active/40 transition-all">
          <div className="flex items-center justify-center gap-2 text-active mb-1">
            <FaBolt className="w-4 h-4 text-amber-500 group-hover:scale-110 transition-transform" />
            <span className="font-['Outfit'] text-2xl sm:text-3xl font-black text-foreground">
              {totalPosts}+
            </span>
          </div>
          <p className="font-['Inter'] text-xs text-[#535C91] dark:text-[#9290C3] font-semibold">
            Master Protocols
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white/70 dark:bg-[#1B1A55]/40 border border-brand-500/15 shadow-sm text-center group hover:border-active/40 transition-all">
          <div className="flex items-center justify-center gap-2 text-active mb-1">
            <FaCheckCircle className="w-4 h-4 text-emerald-500 group-hover:scale-110 transition-transform" />
            <span className="font-['Outfit'] text-2xl sm:text-3xl font-black text-foreground">
              100%
            </span>
          </div>
          <p className="font-['Inter'] text-xs text-[#535C91] dark:text-[#9290C3] font-semibold">
            Coach Vetted
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white/70 dark:bg-[#1B1A55]/40 border border-brand-500/15 shadow-sm text-center group hover:border-active/40 transition-all">
          <div className="flex items-center justify-center gap-2 text-active mb-1">
            <FaClock className="w-4 h-4 text-active group-hover:scale-110 transition-transform" />
            <span className="font-['Outfit'] text-2xl sm:text-3xl font-black text-foreground">
              &lt;15m
            </span>
          </div>
          <p className="font-['Inter'] text-xs text-[#535C91] dark:text-[#9290C3] font-semibold">
            Avg Reply Time
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white/70 dark:bg-[#1B1A55]/40 border border-brand-500/15 shadow-sm text-center group hover:border-active/40 transition-all">
          <div className="flex items-center justify-center gap-2 text-active mb-1">
            <FaUsers className="w-4 h-4 text-purple-500 group-hover:scale-110 transition-transform" />
            <span className="font-['Outfit'] text-2xl sm:text-3xl font-black text-foreground">
              2,480+
            </span>
          </div>
          <p className="font-['Inter'] text-xs text-[#535C91] dark:text-[#9290C3] font-semibold">
            Athletes Connected
          </p>
        </div>
      </div>
    </div>
  );
}
