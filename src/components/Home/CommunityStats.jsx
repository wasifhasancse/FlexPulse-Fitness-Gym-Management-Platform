// feat: activity ticker
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  FiUsers, 
  FiTrendingUp, 
  FiAward, 
  FiCheckCircle, 
  FiArrowRight, 
  FiMessageSquare,
  FiActivity,
  FiZap,
  FiTarget,
  FiClock,
  FiCalendar,
  FiChevronRight,
  FiChevronLeft,
  FiShield
} from "react-icons/fi";
import { FaFire, FaDumbbell, FaTrophy, FaMedal } from "react-icons/fa";

const TABS = [
  { id: "all", label: "Ecosystem Overview" },
  { id: "prs", label: "Verified PR Wall" },
  { id: "challenges", label: "Community Challenges" },
  { id: "clinics", label: "Workshops & Clinics" }
];

const RECENT_ACTIVITIES = [
  {
    athlete: "Elena R.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop",
    achievement: "Logged 45m MetCon • 680 kcal burned",
    tag: "Metabolic HIIT",
    time: "4 mins ago",
    badgeColor: "text-emerald-500 bg-emerald-500/10"
  },
  {
    athlete: "Liam T.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop",
    achievement: "New PR: Clean & Jerk 225 lbs",
    tag: "Olympic Strength",
    time: "12 mins ago",
    badgeColor: "text-active bg-active/10"
  },
  {
    athlete: "Marcus V.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop",
    achievement: "Completed '30-Day Engine Builder' Milestone",
    tag: "Challenge Finisher",
    time: "28 mins ago",
    badgeColor: "text-amber-500 bg-amber-500/10"
  },
  {
    athlete: "Sophia M.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop",
    achievement: "Completed Thoracic Flow & Recovery Lab",
    tag: "Mobility & Flow",
    time: "45 mins ago",
    badgeColor: "text-cyan-500 bg-cyan-500/10"
  }
];

const COMMUNITY_AVATARS = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop"
];

const WEEKLY_PEAK_DAYS = [
  { day: "Mon", height: "85%", active: true },
  { day: "Tue", height: "92%", active: true },
  { day: "Wed", height: "78%", active: true },
  { day: "Thu", height: "88%", active: true },
  { day: "Fri", height: "96%", active: true },
  { day: "Sat", height: "100%", active: true },
  { day: "Sun", height: "65%", active: false }
];

export default function CommunityStats() {
  const [activeTab, setActiveTab] = useState("all");
  const [currentTickerIdx, setCurrentTickerIdx] = useState(0);
  const [isTickerPaused, setIsTickerPaused] = useState(false);

  // Auto-cycle live activity feed
  useEffect(() => {
    if (isTickerPaused) return;
    const interval = setInterval(() => {
      setCurrentTickerIdx((prev) => (prev + 1) % RECENT_ACTIVITIES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isTickerPaused]);

  const currentActivity = RECENT_ACTIVITIES[currentTickerIdx];

  return (
    <section className="py-20 lg:py-28 bg-background border-t border-brand-500/15 relative overflow-hidden transition-colors duration-300">
      {/* Ambient Lighting Meshes */}
      <div className="absolute top-1/4 left-0 w-96 sm:w-140 h-96 sm:h-140 bg-brand-500/8 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-0 w-80 sm:w-120 h-80 sm:h-120 bg-active/6 rounded-full blur-[130px] pointer-events-none -z-10" />

      <div className="w-11/12 mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 sm:mb-14 gap-6 border-b border-brand-500/15 pb-8">
          
          <div className="max-w-2xl space-y-3">
            {/* Industry Kicker Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-800/25 dark:bg-[#1B1A55]/70 border border-brand-500/25 text-xs font-bold tracking-wide shadow-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-active opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-active"></span>
              </span>
              <span className="text-active uppercase tracking-wider font-extrabold text-[11px]">
                Collective Power
              </span>
              <span className="text-[#535C91] dark:text-[#9290C3]">
                • Real Athlete Transformation Ecosystem
              </span>
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-['Outfit'] tracking-tight text-foreground leading-[1.12]">
              Built By Athletes, <span className="text-active">For The Community</span>
            </h2>

            <p className="text-sm sm:text-base text-[#535C91] dark:text-[#9290C3] font-['Inter'] leading-relaxed pt-1">
              FlexPulse is more than a world-class gym. We are an interconnected athlete network sharing clinical nutrition logs, tracking real-time personal records, and lifting each other past physical plateaus.
            </p>
          </div>

          {/* Interactive Live Activity Ticker Widget */}
          <div 
            className="flex items-center gap-4 bg-white dark:bg-[#070F2B] p-4 rounded-2xl border border-brand-500/25 shadow-md shrink-0 self-start lg:self-end max-w-md w-full lg:w-auto"
            onMouseEnter={() => setIsTickerPaused(true)}
            onMouseLeave={() => setIsTickerPaused(false)}
          >
            <div className="relative w-11 h-11 rounded-full overflow-hidden ring-2 ring-brand-500/30 shrink-0">
              <Image
                src={currentActivity.avatar}
                alt={currentActivity.athlete}
                fill
                unoptimized
                className="object-cover"
              />
            </div>

            <div className="flex-1 min-w-0 font-['Inter']">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold text-foreground font-['Outfit'] truncate">
                  {currentActivity.athlete}
                </span>
                <span className="text-[10px] text-[#535C91] dark:text-[#9290C3] whitespace-nowrap">
                  {currentActivity.time}
                </span>
              </div>
              <p className="text-xs font-semibold text-foreground/90 truncate mt-0.5">
                {currentActivity.achievement}
              </p>
              <div className="flex items-center gap-1.5 mt-1">
                <span className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full ${currentActivity.badgeColor}`}>
                  {currentActivity.tag}
                </span>
                <span className="text-[10px] text-emerald-500 font-bold flex items-center gap-0.5">
                  <FiCheckCircle className="w-2.5 h-2.5" /> Verified
                </span>
              </div>
            </div>

            {/* Manual Ticker Control Arrows */}
            <div className="flex flex-col gap-1 shrink-0 pl-1 border-l border-brand-500/15">
              <button
                type="button"
                onClick={() => setCurrentTickerIdx((prev) => (prev === 0 ? RECENT_ACTIVITIES.length - 1 : prev - 1))}
                className="p-1 rounded-md hover:bg-brand-500/15 text-[#535C91] dark:text-[#9290C3] transition-colors cursor-pointer"
                aria-label="Previous community activity"
              >
                <FiChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setCurrentTickerIdx((prev) => (prev + 1) % RECENT_ACTIVITIES.length)}
                className="p-1 rounded-md hover:bg-brand-500/15 text-[#535C91] dark:text-[#9290C3] transition-colors cursor-pointer"
                aria-label="Next community activity"
              >
                <FiChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

        {/* Single-Line Community Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar select-none">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-tight transition-all duration-200 whitespace-nowrap cursor-pointer shrink-0 ${
                  isActive
                    ? "bg-active text-white shadow-md shadow-active/20"
                    : "bg-[#535C91]/8 dark:bg-[#1B1A55]/60 hover:bg-[#535C91]/15 text-[#535C91] dark:text-[#9290C3] border border-brand-500/15"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* High-Impact Asymmetric Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 sm:gap-8 mb-12 sm:mb-16">
          
          {/* Bento Card 1 (Span 7 on lg): The Living Athlete Engine */}
          {(activeTab === "all" || activeTab === "challenges") && (
            <div className="lg:col-span-7 rounded-3xl p-7 sm:p-8 bg-white dark:bg-[#070F2B] border border-brand-500/20 hover:border-active/60 transition-all duration-300 ease-out hover:-translate-y-1.5 flex flex-col justify-between shadow-lg hover:shadow-2xl relative overflow-hidden group">
              {/* Background Glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-active/8 rounded-full blur-[80px] pointer-events-none -z-0" />
              
              <div className="relative z-10">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-2xl bg-[#535C91]/10 dark:bg-[#1B1A55]/80 text-active border border-brand-500/20 group-hover:scale-108 group-hover:bg-active group-hover:text-white transition-all duration-300">
                      <FiUsers className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                        +28% YoY Growth
                      </span>
                      <h3 className="font-['Outfit'] text-lg font-bold text-foreground mt-1">
                        Active Athletes & Members
                      </h3>
                    </div>
                  </div>

                  <span className="text-xs text-[#535C91] dark:text-[#9290C3] font-['Inter'] font-semibold">
                    Avg. 4.6 Sessions / Week
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
                  <div>
                    <span className="text-4xl sm:text-6xl font-black font-['Outfit'] tracking-tight text-foreground group-hover:text-active transition-colors">
                      18,500+
                    </span>
                    <p className="text-xs sm:text-sm text-[#535C91] dark:text-[#9290C3] font-['Inter'] mt-1">
                      Athletes clocking biometric sessions across 4 dedicated athletic facilities and mobile trackers.
                    </p>
                  </div>
                </div>

                {/* Live Weekly Training Activity Heat Spectrum */}
                <div className="p-4 sm:p-5 rounded-2xl bg-[#535C91]/5 dark:bg-[#1B1A55]/50 border border-brand-500/20">
                  <div className="flex items-center justify-between text-xs font-['Inter'] mb-3">
                    <span className="font-bold text-foreground flex items-center gap-1.5">
                      <FiActivity className="w-3.5 h-3.5 text-active" />
                      Weekly Facility Peak Heatmap
                    </span>
                    <span className="text-[11px] text-[#535C91] dark:text-[#9290C3] font-medium">
                      Saturday: Peak Athlete Density
                    </span>
                  </div>

                  <div className="grid grid-cols-7 gap-2 items-end h-20 pt-2 border-b border-brand-500/15 pb-2">
                    {WEEKLY_PEAK_DAYS.map((item) => (
                      <div key={item.day} className="flex flex-col items-center gap-1.5 h-full justify-end">
                        <div 
                          className={`w-full rounded-t-lg transition-all duration-500 ${
                            item.active ? "bg-active group-hover:bg-active/90 shadow-xs" : "bg-[#535C91]/25 dark:bg-[#1B1A55]"
                          }`}
                          style={{ height: item.height }}
                        />
                        <span className="text-[10px] font-bold text-[#535C91] dark:text-[#9290C3] font-['Outfit']">
                          {item.day}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-3 text-[11px] text-[#535C91] dark:text-[#9290C3] font-['Inter']">
                    <span>Peak Hours: 06:00 - 09:00 & 17:30 - 20:30</span>
                    <span className="text-emerald-500 font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                      All Arenas Open Now
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Quick Metric Tags */}
              <div className="mt-6 pt-4 border-t border-brand-500/15 flex flex-wrap items-center justify-between gap-3 text-xs font-['Inter']">
                <span className="font-medium text-foreground">
                  Keyless Turnstiles: <strong className="text-active">100% Biometric</strong>
                </span>
                <span className="text-[11px] text-[#535C91] dark:text-[#9290C3]">
                  Real-time occupancy synced every 30s
                </span>
              </div>
            </div>
          )}

          {/* Bento Card 2 (Span 5 on lg): Personal Records Vault */}
          {(activeTab === "all" || activeTab === "prs") && (
            <div className="lg:col-span-5 rounded-3xl p-7 sm:p-8 bg-white dark:bg-[#070F2B] border border-brand-500/20 hover:border-active/60 transition-all duration-300 ease-out hover:-translate-y-1.5 flex flex-col justify-between shadow-lg hover:shadow-2xl relative overflow-hidden group">
              <div>
                <div className="flex items-center justify-between gap-3 mb-6">
                  <div className="p-3 rounded-2xl bg-[#535C91]/10 dark:bg-[#1B1A55]/80 text-active border border-brand-500/20 group-hover:scale-108 group-hover:bg-active group-hover:text-white transition-all duration-300">
                    <FiTrendingUp className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-active/10 text-active border border-active/20">
                    Biometric Verified
                  </span>
                </div>

                <span className="block text-4xl sm:text-5xl font-black font-['Outfit'] tracking-tight text-foreground group-hover:text-active transition-colors">
                  142,500+
                </span>

                <h3 className="mt-2 text-lg font-bold font-['Outfit'] text-foreground">
                  Personal Records Logged
                </h3>

                <p className="mt-2 text-xs sm:text-sm text-[#535C91] dark:text-[#9290C3] font-['Inter'] leading-relaxed">
                  Verified achievements across Olympic bar paths, 2,000m row ergometers, and body composition scans.
                </p>

                {/* PR Discipline Breakdown Chips */}
                <div className="mt-5 space-y-2.5 font-['Inter']">
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#535C91]/5 dark:bg-[#1B1A55]/50 border border-brand-500/15 text-xs">
                    <span className="font-semibold text-foreground flex items-center gap-1.5">
                      <FaDumbbell className="text-active w-3.5 h-3.5" /> Squat / Clean / Deadlift
                    </span>
                    <strong className="text-active font-black">64,200 PRs</strong>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#535C91]/5 dark:bg-[#1B1A55]/50 border border-brand-500/15 text-xs">
                    <span className="font-semibold text-foreground flex items-center gap-1.5">
                      <FiZap className="text-amber-500 w-3.5 h-3.5" /> VO2 Max & MetCon Times
                    </span>
                    <strong className="text-amber-500 font-black">48,100 PRs</strong>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#535C91]/5 dark:bg-[#1B1A55]/50 border border-brand-500/15 text-xs">
                    <span className="font-semibold text-foreground flex items-center gap-1.5">
                      <FaFire className="text-rose-500 w-3.5 h-3.5" /> InBody Recompositions
                    </span>
                    <strong className="text-rose-500 font-black">30,200 PRs</strong>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-brand-500/15 flex items-center justify-between text-[11px] font-semibold text-foreground/80 font-['Inter']">
                <span className="text-active font-bold flex items-center gap-1">
                  <FaFire className="w-3 h-3 text-active" />
                  +1,200 PRs Logged Weekly
                </span>
                <span className="text-[#535C91] dark:text-[#9290C3]">
                  Automatic Leaderboard Sync
                </span>
              </div>
            </div>
          )}

          {/* Bento Card 3 (Span 6 on lg): Masterclasses & Free Clinics */}
          {(activeTab === "all" || activeTab === "clinics") && (
            <div className="lg:col-span-6 rounded-3xl p-7 sm:p-8 bg-white dark:bg-[#070F2B] border border-brand-500/20 hover:border-active/60 transition-all duration-300 ease-out hover:-translate-y-1.5 flex flex-col justify-between shadow-lg hover:shadow-2xl relative overflow-hidden group">
              <div>
                <div className="flex items-center justify-between gap-3 mb-6">
                  <div className="p-3 rounded-2xl bg-[#535C91]/10 dark:bg-[#1B1A55]/80 text-active border border-brand-500/20 group-hover:scale-108 group-hover:bg-active group-hover:text-white transition-all duration-300">
                    <FiAward className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20">
                    Coach-Facilitated
                  </span>
                </div>

                <span className="block text-4xl sm:text-5xl font-black font-['Outfit'] tracking-tight text-foreground group-hover:text-active transition-colors">
                  420+
                </span>

                <h3 className="mt-2 text-lg font-bold font-['Outfit'] text-foreground">
                  Masterclasses & Recovery Clinics
                </h3>

                <p className="mt-2 text-xs sm:text-sm text-[#535C91] dark:text-[#9290C3] font-['Inter'] leading-relaxed">
                  Seminars led by exercise physiologists and competitive lifters. 100% complimentary for all active members.
                </p>

                {/* Upcoming Clinic Spotlight Box */}
                <div className="mt-5 p-3.5 rounded-2xl bg-brand-800/15 dark:bg-[#1B1A55]/60 border border-brand-500/20 flex items-center justify-between gap-3">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-extrabold uppercase text-active tracking-wider">
                      Next Live Clinic • This Thursday
                    </span>
                    <h4 className="text-xs sm:text-sm font-bold text-foreground font-['Outfit']">
                      Kinematic Bar Path & Thoracic Mobility
                    </h4>
                    <p className="text-[11px] text-[#535C91] dark:text-[#9290C3] font-['Inter']">
                      With Master Coach Alex Rivers • Turf Lab A
                    </p>
                  </div>
                  <Link
                    href="/schedule"
                    className="px-3 py-1.5 rounded-lg bg-active text-white text-[11px] font-bold shrink-0 hover:opacity-90 transition-opacity"
                  >
                    Reserve
                  </Link>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-brand-500/15 flex items-center justify-between text-[11px] font-semibold text-foreground/80 font-['Inter']">
                <span className="text-emerald-500 font-bold">
                  Zero Additional Fees
                </span>
                <span className="text-[#535C91] dark:text-[#9290C3]">
                  Includes Live Q&A and Video Replay
                </span>
              </div>
            </div>
          )}

          {/* Bento Card 4 (Span 6 on lg): Goal Completion & Accountability */}
          {(activeTab === "all" || activeTab === "challenges") && (
            <div className="lg:col-span-6 rounded-3xl p-7 sm:p-8 bg-white dark:bg-[#070F2B] border border-brand-500/20 hover:border-active/60 transition-all duration-300 ease-out hover:-translate-y-1.5 flex flex-col justify-between shadow-lg hover:shadow-2xl relative overflow-hidden group">
              <div>
                <div className="flex items-center justify-between gap-3 mb-6">
                  <div className="p-3 rounded-2xl bg-[#535C91]/10 dark:bg-[#1B1A55]/80 text-active border border-brand-500/20 group-hover:scale-108 group-hover:bg-active group-hover:text-white transition-all duration-300">
                    <FiCheckCircle className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-500 border border-cyan-500/20">
                    Peer Accountable
                  </span>
                </div>

                <span className="block text-4xl sm:text-5xl font-black font-['Outfit'] tracking-tight text-foreground group-hover:text-active transition-colors">
                  98.6%
                </span>

                <h3 className="mt-2 text-lg font-bold font-['Outfit'] text-foreground">
                  6-Month Target Completion Rate
                </h3>

                <p className="mt-2 text-xs sm:text-sm text-[#535C91] dark:text-[#9290C3] font-['Inter'] leading-relaxed">
                  Athletes training with community accountability partners reach their body recomposition and strength milestones at triple the industry average.
                </p>

                {/* Monthly Caloric Target Gauge */}
                <div className="mt-5 p-3.5 rounded-2xl bg-[#535C91]/5 dark:bg-[#1B1A55]/50 border border-brand-500/20">
                  <div className="flex items-center justify-between text-xs font-['Inter'] mb-1.5">
                    <span className="font-bold text-foreground">
                      Monthly Collective Goal: 2,500,000 kcal
                    </span>
                    <span className="font-extrabold text-active">
                      88.6% Achieved
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full h-2.5 rounded-full bg-[#535C91]/20 dark:bg-[#1B1A55] overflow-hidden">
                    <div className="h-full bg-linear-to-r from-brand-500 via-active to-emerald-400 rounded-full w-[88.6%]" />
                  </div>

                  <div className="flex items-center justify-between pt-2 text-[10px] text-[#535C91] dark:text-[#9290C3] font-['Inter']">
                    <span>2,214,800 kcal burned to date</span>
                    <span className="font-semibold text-foreground">3 Days Remaining</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-brand-500/15 flex items-center justify-between text-[11px] font-semibold text-foreground/80 font-['Inter']">
                <span className="text-active font-bold">
                  3.2x Higher Adherence
                </span>
                <span className="text-[#535C91] dark:text-[#9290C3]">
                  Matched Workout Buddy System
                </span>
              </div>
            </div>
          )}

        </div>

        {/* Community Engagement & Athlete Hub Banner */}
        <div className="relative rounded-3xl p-7 sm:p-10 bg-linear-to-r from-brand-800/30 via-[#1B1A55]/40 to-brand-800/30 border border-brand-500/25 shadow-xl overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
          
          {/* Left: Avatar Stack & Value Prop */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-5 max-w-2xl">
            {/* Avatar Group */}
            <div className="flex -space-x-3 shrink-0 pt-1">
              {COMMUNITY_AVATARS.map((img, i) => (
                <div key={i} className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-background border border-brand-500/40">
                  <Image
                    src={img}
                    alt="Community Athlete"
                    fill
                    unoptimized
                    className="object-cover"
                  />
                </div>
              ))}
              <div className="w-12 h-12 rounded-full bg-active text-white font-bold text-xs flex items-center justify-center ring-2 ring-background border border-brand-500/40 font-['Outfit']">
                +15K
              </div>
            </div>

            <div className="space-y-1.5">
              <h4 className="font-['Outfit'] text-xl sm:text-2xl font-extrabold text-foreground">
                Join the FlexPulse Athlete Circle
              </h4>
              <p className="font-['Inter'] text-xs sm:text-sm text-[#535C91] dark:text-[#9290C3] leading-relaxed">
                Connect with workout partners, participate in monthly fitness challenges, consult master coaches, and share workout logs with zero judgment.
              </p>
            </div>
          </div>

          {/* Right: Quick Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0 font-['Inter']">
            <Link
              href="/forum"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#535C91]/10 dark:bg-[#1B1A55]/70 hover:bg-[#535C91]/20 border border-brand-500/25 text-foreground font-bold text-xs sm:text-sm transition-all cursor-pointer shadow-xs active:scale-95"
            >
              <FiMessageSquare className="w-4 h-4 text-active" />
              <span>Browse Forum Discussions</span>
            </Link>

            <Link
              href="/all-classes"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-btn-bg text-btn-text hover:opacity-90 font-bold text-xs sm:text-sm transition-all cursor-pointer shadow-md active:scale-95"
            >
              <span>Explore Group Sessions</span>
              <FiArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}
