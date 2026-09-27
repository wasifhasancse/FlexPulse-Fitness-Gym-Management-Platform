"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FaCheckCircle,
  FaFireAlt,
  FaHeartbeat,
  FaPlus,
  FaShieldAlt,
  FaTag,
  FaUserGraduate,
  FaUsers,
} from "react-icons/fa";

export default function ForumSidebar({ onTagClick }) {
  const router = useRouter();

  const activeCoaches = [
    {
      name: "Alana Serrano",
      role: "Head Functional Coach",
      specialty: "Mobility & Conditioning",
      image: "https://t4.ftcdn.net/jpg/11/66/06/77/360_F_1166067709_2SooAuPWXp20XkGev7oOT7nuK1VThCsN.jpg",
      status: "Active Now",
    },
    {
      name: "Coach Marcus",
      role: "Elite Strength Coach",
      specialty: "Heavy Compounds & Hypertrophy",
      image: "https://prio.co.in/avatar.png",
      status: "In Gym",
    },
    {
      name: "Mollie Porter",
      role: "Head of Sports Science",
      specialty: "Sprint Mechanics & CNS",
      image: "https://prio.co.in/avatar.png",
      status: "Online",
    },
  ];

  const trendingTags = [
    { name: "Zone 2", label: "#Zone2Cardio", count: "3k views" },
    { name: "Overload", label: "#ProgressiveOverload", count: "4.8k views" },
    { name: "Macro", label: "#MacroTiming", count: "2.9k views" },
    { name: "Mobility", label: "#HipMobility", count: "5.1k views" },
    { name: "Squat", label: "#SquatBiomechanics", count: "3.7k views" },
    { name: "Sleep", label: "#CNSRecovery", count: "2.4k views" },
    { name: "Armor", label: "#ArmorBuilding", count: "1.8k views" },
  ];

  const handleTagClick = (tag) => {
    if (onTagClick) {
      onTagClick(tag);
    } else {
      router.push(`/forum?search=${encodeURIComponent(tag)}`);
    }
  };

  return (
    <aside className="space-y-6">
      {/* 1. Start Discussion CTA Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1B1A55] via-[#070F2B] to-[#1B1A55] text-white p-6 shadow-xl border border-brand-500/25">
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-active/20 rounded-full blur-2xl pointer-events-none" />
        <div className="flex items-center gap-2 text-active text-xs font-extrabold uppercase tracking-wider mb-2">
          <FaFireAlt className="w-3.5 h-3.5" />
          <span>Active Athlete Community</span>
        </div>
        <h3 className="font-['Outfit'] text-xl font-bold mb-2 text-white">
          Have a Question or PR to Share?
        </h3>
        <p className="font-['Inter'] text-xs text-white/80 leading-relaxed mb-5">
          Ask our certified trainers for biomechanical form checks, recovery protocols, or share your workout achievements with fellow athletes.
        </p>
        <Link
          href="/dashboard/trainer/forum-post"
          className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-btn-bg text-btn-text font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-all shadow-md active:scale-95"
        >
          <FaPlus className="w-3.5 h-3.5" />
          <span>Start New Discussion</span>
        </Link>
      </div>

      {/* 2. Verified Coaches on Duty */}
      <div className="bg-white dark:bg-[#1B1A55]/25 border border-brand-500/15 dark:border-brand-500/25 rounded-2xl p-5 shadow-sm">
        <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-brand-500/10">
          <div className="flex items-center gap-2">
            <FaUserGraduate className="w-4 h-4 text-active" />
            <h4 className="font-['Outfit'] font-bold text-foreground text-sm tracking-tight">
              Verified Coaches on Duty
            </h4>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Live Q&amp;A
          </span>
        </div>

        <div className="space-y-3.5">
          {activeCoaches.map((coach) => (
            <div key={coach.name} className="flex items-center gap-3">
              <div className="relative shrink-0">
                <Image
                  src={coach.image}
                  alt={coach.name}
                  width={42}
                  height={42}
                  className="w-10 h-10 rounded-full object-cover border-2 border-active/40"
                />
                <span className="absolute -bottom-0.5 -right-0.5 p-0.5 bg-white dark:bg-slate-900 rounded-full">
                  <FaCheckCircle className="w-2.5 h-2.5 text-active" />
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <h5 className="font-['Outfit'] font-bold text-foreground text-xs truncate">
                    {coach.name}
                  </h5>
                  <span className="text-[10px] text-emerald-500 font-semibold">
                    {coach.status}
                  </span>
                </div>
                <p className="font-['Inter'] text-[11px] text-active font-medium truncate">
                  {coach.role}
                </p>
                <p className="font-['Inter'] text-[10px] text-[#535C91] dark:text-[#9290C3] truncate">
                  {coach.specialty}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-3 border-t border-brand-500/10 flex items-center justify-between text-xs">
          <span className="text-[#535C91] dark:text-[#9290C3] font-['Inter'] text-[11px]">
            Avg. Reply Time: <strong className="text-foreground">~12m</strong>
          </span>
          <Link
            href="/trainers"
            className="text-active font-bold text-[11px] hover:underline"
          >
            All Coaches →
          </Link>
        </div>
      </div>

      {/* 3. Trending Athletic Tags */}
      <div className="bg-white dark:bg-[#1B1A55]/25 border border-brand-500/15 dark:border-brand-500/25 rounded-2xl p-5 shadow-sm">
        <div className="flex items-center gap-2 pb-3 mb-3 border-b border-brand-500/10">
          <FaTag className="w-3.5 h-3.5 text-active" />
          <h4 className="font-['Outfit'] font-bold text-foreground text-sm tracking-tight">
            Trending Discussion Tags
          </h4>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {trendingTags.map((tag) => (
            <button
              key={tag.name}
              onClick={() => handleTagClick(tag.name)}
              className="group flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-brand-500/5 dark:bg-[#1B1A55]/40 hover:bg-active/10 border border-brand-500/15 dark:border-brand-500/25 hover:border-active/40 text-xs font-['Inter'] text-foreground transition-all cursor-pointer"
            >
              <span className="font-semibold text-active group-hover:underline">
                {tag.label}
              </span>
              <span className="text-[10px] text-[#535C91] dark:text-[#9290C3]">
                {tag.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 4. Community Code of Conduct */}
      <div className="bg-white dark:bg-[#1B1A55]/25 border border-brand-500/15 dark:border-brand-500/25 rounded-2xl p-5 shadow-sm">
        <div className="flex items-center gap-2 pb-3 mb-3 border-b border-brand-500/10">
          <FaShieldAlt className="w-3.5 h-3.5 text-active" />
          <h4 className="font-['Outfit'] font-bold text-foreground text-sm tracking-tight">
            Community Guidelines
          </h4>
        </div>
        <ul className="space-y-2 font-['Inter'] text-xs text-[#535C91] dark:text-[#9290C3] leading-relaxed">
          <li className="flex items-start gap-2">
            <span className="text-active font-bold">•</span>
            <span><strong>Evidence-Based:</strong> Base fitness advice on verified exercise science and proper biomechanics.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-active font-bold">•</span>
            <span><strong>Constructive Form Checks:</strong> Offer encouraging, actionable tips when reviewing lift footage.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-active font-bold">•</span>
            <span><strong>No Commercial Spam:</strong> Unsolicited sales pitches or unverified supplements are strictly moderated.</span>
          </li>
        </ul>
      </div>

      {/* 5. VIP Athletic Community Perk */}
      <div className="rounded-2xl p-5 bg-gradient-to-r from-brand-500/10 to-active/10 border border-brand-500/20 text-center">
        <FaHeartbeat className="w-6 h-6 text-active mx-auto mb-2" />
        <h4 className="font-['Outfit'] font-bold text-foreground text-sm">
          FlexPulse VIP Community
        </h4>
        <p className="font-['Inter'] text-xs text-[#535C91] dark:text-[#9290C3] mt-1 mb-3">
          VIP Elite members enjoy priority thread answers within 15 minutes, plus custom macro reviews from certified coaches.
        </p>
        <Link
          href="/pricing"
          className="text-xs font-bold text-active hover:underline"
        >
          Explore Membership Tiers →
        </Link>
      </div>
    </aside>
  );
}
