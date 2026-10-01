"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { authClient } from "@/lib/auth-client";
import {
  FaCheckCircle,
  FaFireAlt,
  FaHeartbeat,
  FaPlus,
  FaShieldAlt,
  FaTag,
  FaUserGraduate,
} from "react-icons/fa";

export default function ForumSidebar({ onTagClick }) {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const userRole = (user?.role || "").toLowerCase();

  const getNewPostHref = () => {
    if (!user) return "/dashboard/member/forum";
    if (userRole === "admin") return "/dashboard/admin/manageForumPosts";
    if (userRole === "trainer") return "/dashboard/trainer/my-posts";
    return "/dashboard/member/forum";
  };

  const sidebarRef = useRef(null);
  const isInView = useInView(sidebarRef, { once: true, amount: 0.1 });

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
    <aside ref={sidebarRef} className="space-y-6">
      {/* 1. Start Discussion CTA Card */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1B1A55] via-[#070F2B] to-[#1B1A55] text-white p-6 shadow-md border border-brand-500/25"
      >
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-active/20 rounded-full blur-2xl pointer-events-none" />

        {/* Kicker */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex items-center gap-2 text-active text-xs font-extrabold uppercase tracking-wider mb-2"
        >
          <FaFireAlt className="w-3.5 h-3.5" />
          <span>Active Athlete Community</span>
        </motion.div>

        {/* Title */}
        <motion.h3
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.65, delay: 0.2 }}
          className="font-['Outfit'] text-xl font-bold mb-2 text-white"
        >
          Have a Question or PR to Share?
        </motion.h3>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: -6 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -6 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="font-['Inter'] text-xs text-white/80 leading-relaxed mb-5"
        >
          Ask our certified trainers for biomechanical form checks, recovery protocols, or share your workout achievements with fellow athletes.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.94 }}
          transition={{ type: "spring", stiffness: 220, damping: 20, delay: 0.3 }}
        >
          <Link
            href={getNewPostHref()}
            className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-btn-bg text-btn-text font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-all shadow-sm hover:shadow-md active:scale-95 cursor-pointer"
          >
            <FaPlus className="w-3.5 h-3.5" />
            <span>Start New Discussion</span>
          </Link>
        </motion.div>
      </motion.div>

      {/* 2. Verified Coaches on Duty */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 0.75, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="bg-white dark:bg-[#070F2B] border border-brand-500/15 dark:border-brand-500/25 rounded-2xl p-5 shadow-xs"
      >
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -8 }}
          transition={{ duration: 0.55, delay: 0.2 }}
          className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-brand-500/10"
        >
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
        </motion.div>

        <div className="space-y-3.5">
          {activeCoaches.map((coach, idx) => (
            <motion.div
              key={coach.name}
              initial={{ opacity: 0, x: -14 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -14 }}
              transition={{ duration: 0.6, delay: 0.25 + idx * 0.1 }}
              className="flex items-center gap-3 p-1.5 rounded-xl hover:bg-brand-500/5 transition-colors"
            >
              <div className="relative shrink-0">
                <motion.div
                  initial={{ scale: 0.75, rotate: -6 }}
                  animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0.75, rotate: -6 }}
                  transition={{ type: "spring", stiffness: 220, damping: 20, delay: 0.3 + idx * 0.1 }}
                >
                  <Image
                    src={coach.image}
                    alt={coach.name}
                    width={42}
                    height={42}
                    className="w-10 h-10 rounded-full object-cover border-2 border-active/40"
                  />
                </motion.div>
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
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-4 pt-3 border-t border-brand-500/10 flex items-center justify-between text-xs"
        >
          <span className="text-[#535C91] dark:text-[#9290C3] font-['Inter'] text-[11px]">
            Avg. Reply Time: <strong className="text-foreground">~12m</strong>
          </span>
          <Link
            href="/trainers"
            className="text-active font-bold text-[11px] hover:underline"
          >
            All Coaches →
          </Link>
        </motion.div>
      </motion.div>

      {/* 3. Trending Athletic Tags */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 0.75, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="bg-white dark:bg-[#070F2B] border border-brand-500/15 dark:border-brand-500/25 rounded-2xl p-5 shadow-xs"
      >
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -8 }}
          transition={{ duration: 0.55, delay: 0.3 }}
          className="flex items-center gap-2 pb-3 mb-3 border-b border-brand-500/10"
        >
          <FaTag className="w-3.5 h-3.5 text-active" />
          <h4 className="font-['Outfit'] font-bold text-foreground text-sm tracking-tight">
            Trending Discussion Tags
          </h4>
        </motion.div>

        <div className="flex flex-wrap gap-1.5">
          {trendingTags.map((tag, idx) => (
            <motion.button
              key={tag.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.45, delay: 0.35 + idx * 0.04 }}
              whileHover={{ y: -2, scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => handleTagClick(tag.name)}
              className="group flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-brand-500/5 dark:bg-[#1B1A55]/40 hover:bg-active/10 border border-brand-500/15 dark:border-brand-500/25 hover:border-active/40 text-xs font-['Inter'] text-foreground transition-all cursor-pointer shadow-2xs"
            >
              <span className="font-semibold text-active group-hover:underline">
                {tag.label}
              </span>
              <span className="text-[10px] text-[#535C91] dark:text-[#9290C3]">
                {tag.count}
              </span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* 4. Community Code of Conduct */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 0.75, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="bg-white dark:bg-[#070F2B] border border-brand-500/15 dark:border-brand-500/25 rounded-2xl p-5 shadow-xs"
      >
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -8 }}
          transition={{ duration: 0.55, delay: 0.4 }}
          className="flex items-center gap-2 pb-3 mb-3 border-b border-brand-500/10"
        >
          <FaShieldAlt className="w-3.5 h-3.5 text-active" />
          <h4 className="font-['Outfit'] font-bold text-foreground text-sm tracking-tight">
            Community Guidelines
          </h4>
        </motion.div>

        <ul className="space-y-2.5 font-['Inter'] text-xs text-[#535C91] dark:text-[#9290C3] leading-relaxed">
          <motion.li
            initial={{ opacity: 0, x: -10 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="flex items-start gap-2"
          >
            <span className="text-active font-bold">•</span>
            <span><strong>Evidence-Based:</strong> Base fitness advice on verified exercise science and proper biomechanics.</span>
          </motion.li>
          <motion.li
            initial={{ opacity: 0, x: -10 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex items-start gap-2"
          >
            <span className="text-active font-bold">•</span>
            <span><strong>Constructive Form Checks:</strong> Offer encouraging, actionable tips when reviewing lift footage.</span>
          </motion.li>
          <motion.li
            initial={{ opacity: 0, x: -10 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="flex items-start gap-2"
          >
            <span className="text-active font-bold">•</span>
            <span><strong>No Commercial Spam:</strong> Unsolicited sales pitches or unverified supplements are strictly moderated.</span>
          </motion.li>
        </ul>
      </motion.div>

      {/* 5. VIP Athletic Community Perk */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 0.75, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="rounded-2xl p-5 bg-linear-to-r from-brand-500/10 to-active/10 border border-brand-500/20 text-center shadow-xs"
      >
        <motion.div
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <FaHeartbeat className="w-6 h-6 text-active mx-auto mb-2" />
        </motion.div>
        <h4 className="font-['Outfit'] font-bold text-foreground text-sm">
          FlexPulse VIP Community
        </h4>
        <p className="font-['Inter'] text-xs text-[#535C91] dark:text-[#9290C3] mt-1 mb-3">
          VIP Elite members enjoy priority thread answers within 15 minutes, plus custom macro reviews from certified coaches.
        </p>
        <Link
          href="/pricing"
          className="text-xs font-bold text-active hover:underline inline-flex items-center gap-1 group"
        >
          <span>Explore Membership Tiers</span>
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </Link>
      </motion.div>
    </aside>
  );
}
