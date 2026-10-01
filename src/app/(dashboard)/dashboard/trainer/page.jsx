"use client";

import { getMyClasses } from "@/lib/api/getClasses";
import { getMyForumPost } from "@/lib/api/getForumPosts";
import { authClient } from "@/lib/auth-client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FaArrowUp,
  FaCalendarAlt,
  FaCalendarCheck,
  FaChalkboardTeacher,
  FaComments,
  FaDumbbell,
  FaEdit,
  FaPlus,
  FaThLarge,
  FaUser,
  FaUserGraduate,
  FaUsers,
} from "react-icons/fa";

const weeklyTrainerSchedule = [
  { day: "Mon", count: 3, height: 60 },
  { day: "Tue", count: 4, height: 80 },
  { day: "Wed", count: 2, height: 40 },
  { day: "Thu", count: 5, height: 100 },
  { day: "Fri", count: 4, height: 80 },
  { day: "Sat", count: 3, height: 60 },
  { day: "Sun", count: 1, height: 25 },
];

export default function TrainerDashboardPage() {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const trainerId = user?.id;

  const [classes, setClasses] = useState([]);
  const [forumPosts, setForumPosts] = useState([]);
  const [stats, setStats] = useState({
    totalClasses: 0,
    totalStudents: 0,
    forumPosts: 0,
  });
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState("Today");

  // Page title
  useEffect(() => {
    document.title = "Trainer Dashboard | FlexPulse Elite";
  }, []);

  useEffect(() => {
    if (!trainerId) return;
    const loadData = async () => {
      try {
        const [myclasses, myForumPosts, statsRes] = await Promise.all([
          getMyClasses(trainerId),
          getMyForumPost(trainerId),
          fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/trainer/stats?trainerId=${trainerId}`
          ),
        ]);
        const statsData = await statsRes.json();
        setStats({
          totalClasses: statsData.totalClasses || 0,
          totalStudents: statsData.totalStudents || 0,
          forumPosts: myForumPosts?.length || 0,
        });
        setForumPosts(myForumPosts || []);
        setClasses(myclasses || []);
      } catch (err) {
        console.error("Failed to load dashboard data", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [trainerId]);

  const getStatusColor = (status = "") => {
    switch (status.toLowerCase()) {
      case "approved":
        return "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20";
      case "pending":
        return "bg-amber-500/10 text-amber-500 border border-amber-500/20";
      case "rejected":
        return "bg-rose-500/10 text-rose-500 border border-rose-500/20";
      default:
        return "bg-slate-500/10 text-slate-400 border border-slate-500/20";
    }
  };

  const todayFormatted = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
        <div className="w-10 h-10 border-3 border-active border-t-transparent rounded-full animate-spin" />
        <p className="font-['Inter'] text-xs font-semibold text-[#535C91] dark:text-[#9290C3] animate-pulse">
          Loading coaching telemetry...
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6 pb-12"
    >
      {/* Header matching Dreams GYM structure */}
      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4 bg-white dark:bg-[#070F2B] p-5 sm:p-6 rounded-2xl border border-brand-500/15 shadow-xs">
        <div className="flex items-start sm:items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-active/10 border border-active/30 flex items-center justify-center shrink-0">
            <FaThLarge className="text-active w-5 h-5" />
          </div>
          <div>
            <h1 className="font-['Outfit'] text-2xl sm:text-3xl font-black text-foreground tracking-tight flex items-center gap-2.5">
              Trainer Dashboard
            </h1>
            <div className="flex flex-wrap items-center gap-2.5 mt-1 font-['Inter'] text-xs text-[#535C91] dark:text-[#9290C3]">
              <span className="flex items-center gap-1.5">
                <FaCalendarAlt className="w-3.5 h-3.5 text-active" />
                {todayFormatted}
              </span>
              <span>•</span>
              <span>Coach {user?.name?.split(" ")[0] || "Trainer"}</span>
              <span>•</span>
              <span className="flex items-center gap-1.5 text-emerald-500 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Coaching Portal Live
              </span>
            </div>
          </div>
        </div>

        {/* Filter & Primary CTA */}
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
          <div className="flex items-center bg-black/5 dark:bg-white/5 p-1 rounded-xl border border-brand-500/15">
            {["Today", "Week", "Month"].map((item) => (
              <button
                key={item}
                onClick={() => setPeriod(item)}
                className={`px-3 py-1.5 text-xs font-['Outfit'] font-bold rounded-lg transition-all duration-200 cursor-pointer ${
                  period === item
                    ? "bg-active text-white shadow-xs"
                    : "text-[#535C91] dark:text-[#9290C3] hover:text-foreground"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <Link
            href="/dashboard/trainer/add-class"
            className="relative overflow-hidden inline-flex items-center gap-2 px-4 py-2 bg-btn-bg text-btn-text text-xs font-['Outfit'] font-extrabold rounded-xl shadow-xs hover:shadow-md hover:brightness-105 active:scale-95 transition-all duration-200 border border-white/20 group cursor-pointer"
          >
            <span className="absolute inset-0 w-1/2 h-full bg-linear-to-r from-transparent via-white/20 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-[250%] transition-transform duration-700 pointer-events-none" />
            <FaPlus className="w-3.5 h-3.5 text-btn-text" />
            <span>Add New Class</span>
          </Link>
        </div>
      </div>

      {/* Row 1 Stats matching Dreams GYM cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Active Classes Card */}
        <div className="bg-white dark:bg-[#070F2B] rounded-2xl p-5 sm:p-6 border border-brand-500/15 shadow-xs flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-active/10 border border-active/20 flex items-center justify-center">
                <FaChalkboardTeacher className="text-active w-5 h-5" />
              </div>
              <div>
                <h3 className="font-['Outfit'] text-2xl font-black text-foreground">
                  {classes.length}
                </h3>
                <p className="font-['Inter'] text-xs text-[#535C91] dark:text-[#9290C3]">
                  Classes Hosted
                </p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-['Outfit'] font-extrabold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
              <FaArrowUp className="w-2.5 h-2.5" />
              +2 this month
            </span>
          </div>
          <div className="mt-6 pt-4 border-t border-brand-500/10 flex items-center justify-between text-xs font-['Inter']">
            <span className="text-[#535C91] dark:text-[#9290C3]">Active Slots</span>
            <span className="font-['Outfit'] font-bold text-active">
              {classes.length * 6} available
            </span>
          </div>
        </div>

        {/* Total Students Enrolled */}
        <div className="bg-white dark:bg-[#070F2B] rounded-2xl p-5 sm:p-6 border border-brand-500/15 shadow-xs flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                <FaUsers className="text-blue-500 w-5 h-5" />
              </div>
              <div>
                <h3 className="font-['Outfit'] text-2xl font-black text-foreground">
                  {stats.totalStudents || 84}
                </h3>
                <p className="font-['Inter'] text-xs text-[#535C91] dark:text-[#9290C3]">
                  Athletes Coached
                </p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-['Outfit'] font-extrabold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
              <FaArrowUp className="w-2.5 h-2.5" />
              +14.2%
            </span>
          </div>
          <div className="mt-6 pt-4 border-t border-brand-500/10 flex items-center justify-between text-xs font-['Inter']">
            <span className="text-[#535C91] dark:text-[#9290C3]">Capacity Goal</span>
            <span className="font-['Outfit'] font-bold text-foreground">
              84 / 100 Seats
            </span>
          </div>
        </div>

        {/* Weekly Session Cadence */}
        <div className="bg-white dark:bg-[#070F2B] rounded-2xl p-5 sm:p-6 border border-brand-500/15 shadow-xs flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                <FaCalendarCheck className="text-purple-500 w-5 h-5" />
              </div>
              <div>
                <h3 className="font-['Outfit'] text-2xl font-black text-foreground">
                  {weeklyTrainerSchedule.reduce((a, b) => a + b.count, 0)}
                </h3>
                <p className="font-['Inter'] text-xs text-[#535C91] dark:text-[#9290C3]">
                  Sessions This Week
                </p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-['Outfit'] font-extrabold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
              Optimal
            </span>
          </div>
          <div className="mt-4 flex items-end justify-between gap-1 h-12">
            {weeklyTrainerSchedule.map((item, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full bg-black/10 dark:bg-white/10 rounded-full h-8 flex items-end justify-center p-0.5 overflow-hidden">
                  <div
                    className={`w-full rounded-full ${
                      idx === 3 ? "bg-active" : "bg-purple-500/60"
                    }`}
                    style={{ height: `${item.height}%` }}
                  />
                </div>
                <span className="text-[9px] font-['Outfit'] font-semibold text-[#535C91] dark:text-[#9290C3]">
                  {item.day}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Action Bento Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Link
          href="/dashboard/trainer/add-class"
          className="flex items-center justify-center gap-2.5 px-4 py-3.5 bg-btn-bg text-btn-text font-['Outfit'] font-bold rounded-xl shadow-xs hover:shadow-md hover:brightness-105 active:scale-95 transition-all text-xs sm:text-sm border border-white/20"
        >
          <FaPlus className="w-3.5 h-3.5" />
          <span>New Class</span>
        </Link>
        <Link
          href="/dashboard/trainer/my-classes"
          className="flex items-center justify-center gap-2.5 px-4 py-3.5 bg-white dark:bg-[#070F2B] border border-brand-500/15 hover:border-active/40 text-foreground font-['Outfit'] font-bold rounded-xl transition-all shadow-xs text-xs sm:text-sm hover:text-active"
        >
          <FaDumbbell className="w-3.5 h-3.5 text-active" />
          <span>My Classes</span>
        </Link>
        <Link
          href="/dashboard/trainer/forum-post"
          className="flex items-center justify-center gap-2.5 px-4 py-3.5 bg-white dark:bg-[#070F2B] border border-brand-500/15 hover:border-active/40 text-foreground font-['Outfit'] font-bold rounded-xl transition-all shadow-xs text-xs sm:text-sm hover:text-active"
        >
          <FaComments className="w-3.5 h-3.5 text-blue-500" />
          <span>Post Insight</span>
        </Link>
        <Link
          href="/dashboard/trainer/my-posts"
          className="flex items-center justify-center gap-2.5 px-4 py-3.5 bg-white dark:bg-[#070F2B] border border-brand-500/15 hover:border-active/40 text-foreground font-['Outfit'] font-bold rounded-xl transition-all shadow-xs text-xs sm:text-sm hover:text-active"
        >
          <FaEdit className="w-3.5 h-3.5 text-emerald-500" />
          <span>My Articles</span>
        </Link>
      </div>

      {/* Recent Classes Table */}
      <div className="bg-white dark:bg-[#070F2B] rounded-2xl border border-brand-500/15 shadow-xs overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-brand-500/10 flex items-center justify-between">
          <div>
            <h3 className="font-['Outfit'] text-lg font-bold text-foreground">
              Hosted Training Sessions
            </h3>
            <p className="font-['Inter'] text-xs text-[#535C91] dark:text-[#9290C3] mt-0.5">
              Manage your active class roster and pricing
            </p>
          </div>
          <Link
            href="/dashboard/trainer/my-classes"
            className="font-['Outfit'] text-xs font-bold text-active hover:underline"
          >
            View All ({classes.length}) →
          </Link>
        </div>

        {classes.length === 0 ? (
          <div className="p-8 text-center">
            <p className="font-['Inter'] text-xs text-[#535C91] dark:text-[#9290C3]">
              No classes created yet. Launch your first athletic program!
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left font-['Inter'] text-xs">
              <thead className="bg-black/5 dark:bg-white/5 text-[#535C91] dark:text-[#9290C3] uppercase tracking-wider font-['Outfit'] text-[10px]">
                <tr>
                  <th className="py-3.5 px-6 font-extrabold">Program</th>
                  <th className="py-3.5 px-6 font-extrabold">Category</th>
                  <th className="py-3.5 px-6 font-extrabold">Schedule</th>
                  <th className="py-3.5 px-6 font-extrabold">Rate</th>
                  <th className="py-3.5 px-6 font-extrabold">Status</th>
                  <th className="py-3.5 px-6 font-extrabold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-500/10">
                {classes.slice(0, 5).map((cls) => (
                  <tr
                    key={cls._id}
                    className="hover:bg-brand-500/5 transition-colors"
                  >
                    <td className="py-3.5 px-6">
                      <p className="font-bold text-foreground">{cls.className}</p>
                      <p className="text-[11px] text-[#535C91] dark:text-[#9290C3]">
                        {cls.difficultyLevel}
                      </p>
                    </td>
                    <td className="py-3.5 px-6 text-[#535C91] dark:text-[#9290C3]">
                      {cls.category}
                    </td>
                    <td className="py-3.5 px-6 text-[#535C91] dark:text-[#9290C3]">
                      {cls.classSchedule}
                    </td>
                    <td className="py-3.5 px-6 font-['Outfit'] font-black text-active">
                      ${cls.price}
                    </td>
                    <td className="py-3.5 px-6">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-['Outfit'] font-extrabold uppercase tracking-wider ${getStatusColor(
                          cls.status
                        )}`}
                      >
                        {cls.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-6 text-right">
                      <Link
                        href={`/all-classes/${cls._id}`}
                        className="px-3 py-1 rounded-lg border border-brand-500/20 hover:border-active/40 hover:bg-active/10 text-foreground hover:text-active font-semibold transition-all"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </motion.div>
  );
}

