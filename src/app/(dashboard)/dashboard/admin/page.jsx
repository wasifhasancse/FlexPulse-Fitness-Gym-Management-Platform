"use client";

import { getAllUsers } from "@/lib/api/getAllUsers";
import { getAllClasses } from "@/lib/api/getClasses";
import { authClient } from "@/lib/auth-client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FaArrowDown,
  FaArrowUp,
  FaCalendarAlt,
  FaCalendarCheck,
  FaChartLine,
  FaCheckCircle,
  FaDollarSign,
  FaDownload,
  FaDumbbell,
  FaEllipsisH,
  FaFire,
  FaPlus,
  FaQrcode,
  FaRedoAlt,
  FaShoppingBag,
  FaSync,
  FaThLarge,
  FaUserCircle,
  FaUsers,
} from "react-icons/fa";
import {
  Area,
  AreaChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const THEME_COLORS = ["#ff2a55", "#3B82F6", "#10B981", "#F59E0B", "#8B5CF6"];

const monthlyRevenueData = [
  { month: "Jan", revenue: 42000, target: 40000 },
  { month: "Feb", revenue: 58000, target: 50000 },
  { month: "Mar", revenue: 64000, target: 60000 },
  { month: "Apr", revenue: 71000, target: 65000 },
  { month: "May", revenue: 79000, target: 70000 },
  { month: "Jun", revenue: 88000, target: 80000 },
  { month: "Jul", revenue: 94000, target: 85000 },
  { month: "Aug", revenue: 99000, target: 90000 },
  { month: "Sep", revenue: 96000, target: 95000 },
  { month: "Oct", revenue: 104000, target: 100000 },
];

const weeklySessions = [
  { day: "Mon", count: 24, height: 60 },
  { day: "Tue", count: 32, height: 80 },
  { day: "Wed", count: 28, height: 70 },
  { day: "Thu", count: 36, height: 90 },
  { day: "Fri", count: 30, height: 75 },
  { day: "Sat", count: 42, height: 100 },
  { day: "Sun", count: 26, height: 65 },
];

export default function AdminDashboardPage() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [users, setUsers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalClasses: 0,
    totalBookings: 0,
  });
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState("Today");

  // Page title
  useEffect(() => {
    document.title = "Dashboard Overview | FlexPulse Elite";
  }, []);

  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      try {
        const { data: tokenData } = await authClient.token();
        if (!tokenData?.token) return;

        const [usersData, classesData, statsRes] = await Promise.all([
          getAllUsers(),
          getAllClasses("", "", 1, 0, true),
          fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/admin/stats`, {
            headers: {
              Authorization: `Bearer ${tokenData.token}`,
            },
          }),
        ]);

        const statsJson = await statsRes.json();
        setStats(statsJson);

        const classItems = Array.isArray(classesData)
          ? classesData
          : classesData?.items || [];
        setClasses(classItems);
        setUsers(usersData || []);
      } catch (err) {
        console.error("Failed to fetch admin stats:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  const adminCount = users.filter((u) => u.role === "admin").length;
  const trainerCount = users.filter((u) => u.role === "trainer").length;
  const memberCount = users.filter((u) => u.role === "member").length;
  const totalUsers = stats.totalUsers || users.length || 1842;
  const totalClasses = stats.totalClasses || classes.length || 24;
  const totalBookedClasses = stats.totalBookings || 312;

  // Donut chart distribution
  const roleData = [
    { name: "Members", value: memberCount || 1420 },
    { name: "Trainers", value: trainerCount || 34 },
    { name: "Admins", value: adminCount || 6 },
  ];

  const categoriesCount = classes.reduce((acc, cls) => {
    const cat = cls.category || "General";
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {});

  const dynamicCategoryData = Object.keys(categoriesCount).map((name) => ({
    name,
    value: categoriesCount[name],
  }));

  const categoryData =
    dynamicCategoryData.length > 0
      ? dynamicCategoryData
      : [
          { name: "Strength", value: 8 },
          { name: "HIIT", value: 6 },
          { name: "Cardio", value: 5 },
          { name: "Yoga & Flex", value: 3 },
          { name: "Boxing", value: 2 },
        ];

  // Dynamic date string
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
          Loading performance telemetry...
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
      {/* ======================================================== */}
      {/* 1. TOP HEADER BAR: Overview Title + Date + Filter Pills   */}
      {/* ======================================================== */}
      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4 bg-white dark:bg-[#070F2B] p-5 sm:p-6 rounded-2xl border border-brand-500/15 shadow-xs">
        <div className="flex items-start sm:items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-active/10 border border-active/30 flex items-center justify-center shrink-0">
            <FaThLarge className="text-active w-5 h-5" />
          </div>
          <div>
            <h1 className="font-['Outfit'] text-2xl sm:text-3xl font-black text-foreground tracking-tight flex items-center gap-2.5">
              Dashboard Overview
            </h1>
            <div className="flex flex-wrap items-center gap-2.5 mt-1 font-['Inter'] text-xs text-[#535C91] dark:text-[#9290C3]">
              <span className="flex items-center gap-1.5">
                <FaCalendarAlt className="w-3.5 h-3.5 text-active" />
                {todayFormatted}
              </span>
              <span>•</span>
              <span>Austin HQ Club</span>
              <span>•</span>
              <span className="flex items-center gap-1.5 text-emerald-500 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                All systems operational
              </span>
            </div>
          </div>
        </div>

        {/* Controls: Today/Week/Month, Export, POS/New Action */}
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
          {/* Segmented Filter Tabs */}
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

          {/* Export Button */}
          <button
            onClick={() => {
              const dataStr =
                "data:text/json;charset=utf-8," +
                encodeURIComponent(
                  JSON.stringify({ stats, totalUsers, totalClasses, roleData }, null, 2)
                );
              const downloadAnchor = document.createElement("a");
              downloadAnchor.setAttribute("href", dataStr);
              downloadAnchor.setAttribute("download", `flexpulse-telemetry-${Date.now()}.json`);
              document.body.appendChild(downloadAnchor);
              downloadAnchor.click();
              downloadAnchor.remove();
            }}
            className="inline-flex items-center gap-2 px-3.5 py-2 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-foreground border border-brand-500/20 rounded-xl text-xs font-['Outfit'] font-bold transition-all cursor-pointer"
          >
            <FaDownload className="w-3 h-3 text-[#535C91] dark:text-[#9290C3]" />
            <span>Export</span>
          </button>

          {/* Open POS / Quick Action Primary CTA */}
          <Link
            href="/dashboard/admin/manageClasses"
            className="relative overflow-hidden inline-flex items-center gap-2 px-4 py-2 bg-btn-bg text-btn-text text-xs font-['Outfit'] font-extrabold rounded-xl shadow-xs hover:shadow-md hover:brightness-105 active:scale-95 transition-all duration-200 border border-white/20 group cursor-pointer"
          >
            <span className="absolute inset-0 w-1/2 h-full bg-linear-to-r from-transparent via-white/20 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-[250%] transition-transform duration-700 pointer-events-none" />
            <FaDumbbell className="w-3.5 h-3.5 text-btn-text" />
            <span>Manage Classes</span>
          </Link>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. STATS ROW 1: Active Members | Total Revenue | Check-ins*/}
      {/* ======================================================== */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5">
        {/* CARD 1: ACTIVE MEMBERS (lg:col-span-4) */}
        <div className="lg:col-span-4 relative overflow-hidden bg-white dark:bg-[#070F2B] rounded-2xl p-5 sm:p-6 border border-brand-500/15 shadow-xs flex flex-col justify-between group">
          <div>
            <div className="flex items-start justify-between">
              {/* Circular Percentage Donut Gauge */}
              <div className="relative w-16 h-16 flex items-center justify-center">
                <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-black/10 dark:text-white/10"
                    strokeWidth="3.2"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-active"
                    strokeDasharray="78, 100"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <span className="absolute font-['Outfit'] font-black text-xs text-foreground">
                  78%
                </span>
              </div>

              {/* Weekly Trend Badge */}
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-['Outfit'] font-extrabold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                <FaArrowUp className="w-2.5 h-2.5" />
                +3.8% this week
              </span>
            </div>

            <div className="mt-4">
              <h2 className="font-['Outfit'] text-3xl sm:text-4xl font-black text-foreground tracking-tight">
                {totalUsers.toLocaleString()}
              </h2>
              <p className="font-['Inter'] text-xs font-semibold text-[#535C91] dark:text-[#9290C3] mt-0.5">
                Active Members
              </p>
            </div>
          </div>

          {/* Men vs Women Breakdown & Athletic Silhouette */}
          <div className="mt-6 pt-4 border-t border-brand-500/10 flex items-center justify-between">
            <div className="space-y-3">
              <div>
                <span className="text-[10px] font-['Outfit'] font-bold text-[#535C91] dark:text-[#9290C3] uppercase tracking-wider block">
                  Men
                </span>
                <span className="font-['Outfit'] text-base font-extrabold text-foreground">
                  {Math.round(totalUsers * 0.76).toLocaleString()}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-['Outfit'] font-bold text-[#535C91] dark:text-[#9290C3] uppercase tracking-wider block">
                  Women
                </span>
                <span className="font-['Outfit'] text-base font-extrabold text-foreground">
                  {Math.round(totalUsers * 0.24).toLocaleString()}
                </span>
              </div>
            </div>

            {/* Athletic Illustration Pill */}
            <div className="w-24 h-24 rounded-2xl bg-linear-to-tr from-active/15 to-transparent border border-active/20 flex flex-col items-center justify-center p-2 text-center">
              <FaUsers className="w-8 h-8 text-active mb-1" />
              <span className="text-[9px] font-['Outfit'] font-bold text-[#535C91] dark:text-[#9290C3]">
                Full Roster
              </span>
            </div>
          </div>
        </div>

        {/* CARD 2: TOTAL REVENUE (lg:col-span-5) */}
        <div className="lg:col-span-5 relative overflow-hidden bg-white dark:bg-[#070F2B] rounded-2xl p-5 sm:p-6 border border-brand-500/15 shadow-xs flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                  <FaDollarSign className="text-amber-500 w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-['Outfit'] text-sm font-bold text-foreground">
                    Total Revenue
                  </h3>
                  <p className="font-['Inter'] text-[11px] text-[#535C91] dark:text-[#9290C3]">
                    This month • Oct 2026
                  </p>
                </div>
              </div>

              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-['Outfit'] font-extrabold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                <FaArrowUp className="w-2.5 h-2.5" />
                +18.2%
              </span>
            </div>

            <div className="mt-4">
              <h2 className="font-['Outfit'] text-3xl sm:text-4xl font-black text-foreground tracking-tight">
                ${(totalBookedClasses * 120 + 66560).toLocaleString()}
              </h2>
              <p className="font-['Inter'] text-xs font-semibold text-[#535C91] dark:text-[#9290C3] mt-0.5">
                vs last month <span className="font-bold text-foreground">$88,400</span>
              </p>
            </div>
          </div>

          {/* Sparkline & Mini Athlete Banner */}
          <div className="mt-4 flex items-end justify-between gap-4">
            <div className="w-full h-16">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={monthlyRevenueData.slice(-6)}
                  margin={{ top: 4, right: 0, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="revenueMiniGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ff2a55" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#ff2a55" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#ff2a55"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#revenueMiniGrad)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="shrink-0 w-20 h-16 rounded-xl bg-btn-bg/10 border border-active/20 flex flex-col items-center justify-center p-1 text-center">
              <FaFire className="w-5 h-5 text-active mb-0.5" />
              <span className="text-[9px] font-['Outfit'] font-black text-foreground">
                Peak Yield
              </span>
            </div>
          </div>
        </div>

        {/* CARD 3: TODAY'S CHECK-INS (lg:col-span-3) */}
        <div className="lg:col-span-3 relative overflow-hidden bg-white dark:bg-[#070F2B] rounded-2xl p-5 sm:p-6 border border-brand-500/15 shadow-xs flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-active/10 border border-active/20 flex items-center justify-center">
                <FaQrcode className="text-active w-5 h-5" />
              </div>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-['Outfit'] font-extrabold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                <FaArrowUp className="w-2.5 h-2.5" />
                +5.3%
              </span>
            </div>

            <div className="mt-4">
              <h2 className="font-['Outfit'] text-3xl sm:text-4xl font-black text-foreground tracking-tight">
                312
              </h2>
              <p className="font-['Inter'] text-xs font-semibold text-[#535C91] dark:text-[#9290C3] mt-0.5">
                Today&apos;s Check-ins
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            {/* Avatar Stack */}
            <div className="flex items-center -space-x-2 overflow-hidden">
              {[
                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
                "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80",
                "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&auto=format&fit=crop&q=80",
              ].map((src, i) => (
                <Image
                  key={i}
                  src={src}
                  alt="Member"
                  width={28}
                  height={28}
                  className="w-7 h-7 rounded-full object-cover border-2 border-white dark:border-[#070F2B]"
                />
              ))}
              <div className="w-7 h-7 rounded-full bg-active text-white text-[10px] font-['Outfit'] font-bold flex items-center justify-center border-2 border-white dark:border-[#070F2B]">
                +8
              </div>
            </div>

            {/* Target Progress Bar */}
            <div className="space-y-1.5">
              <div className="w-full h-2 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-active rounded-full transition-all duration-500"
                  style={{ width: "78%" }}
                />
              </div>
              <div className="flex items-center justify-between text-[11px] font-['Inter']">
                <span className="text-active font-bold">78% of target</span>
                <span className="text-[#535C91] dark:text-[#9290C3]">Goal: 400</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 3. STATS ROW 2: Renewals | Supplements | PT Sessions     */}
      {/* ======================================================== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* CARD 4: RENEWALS & RETENTION */}
        <div className="bg-white dark:bg-[#070F2B] rounded-2xl p-5 sm:p-6 border border-brand-500/15 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-active/10 border border-active/20 flex items-center justify-center">
                  <FaRedoAlt className="text-active w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-['Outfit'] text-2xl font-black text-foreground">
                    52
                  </h3>
                  <p className="font-['Inter'] text-xs text-[#535C91] dark:text-[#9290C3]">
                    Renewals
                  </p>
                </div>
              </div>

              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-['Outfit'] font-extrabold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                <FaArrowUp className="w-2.5 h-2.5" />
                +26.8%
              </span>
            </div>
          </div>

          {/* Dot Matrix Progression */}
          <div className="mt-6 space-y-3">
            <div>
              <div className="flex items-center justify-between text-[11px] font-['Inter'] mb-1">
                <span className="text-[#535C91] dark:text-[#9290C3] font-medium">Today</span>
                <span className="font-['Outfit'] font-bold text-active">52</span>
              </div>
              <div className="flex items-center gap-1.5 flex-wrap">
                {Array.from({ length: 18 }).map((_, i) => (
                  <span
                    key={i}
                    className={`w-2 h-2 rounded-full ${
                      i < 14 ? "bg-active" : "bg-black/15 dark:bg-white/15"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-[11px] font-['Inter'] mb-1">
                <span className="text-[#535C91] dark:text-[#9290C3] font-medium">Yesterday</span>
                <span className="font-['Outfit'] font-bold text-[#535C91] dark:text-[#9290C3]">
                  41
                </span>
              </div>
              <div className="flex items-center gap-1.5 flex-wrap">
                {Array.from({ length: 18 }).map((_, i) => (
                  <span
                    key={i}
                    className={`w-2 h-2 rounded-full ${
                      i < 11
                        ? "bg-[#535C91] dark:bg-[#9290C3]"
                        : "bg-black/15 dark:bg-white/15"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CARD 5: SUPPLEMENT SALES / PRO SHOP */}
        <div className="bg-white dark:bg-[#070F2B] rounded-2xl p-5 sm:p-6 border border-brand-500/15 shadow-xs flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                <FaShoppingBag className="text-emerald-500 w-4 h-4" />
              </div>
              <div>
                <p className="font-['Inter'] text-xs font-semibold text-[#535C91] dark:text-[#9290C3]">
                  Supplement Sales
                </p>
                <h3 className="font-['Outfit'] text-2xl sm:text-3xl font-black text-foreground tracking-tight">
                  $5,880
                </h3>
              </div>
            </div>

            {/* Protein tub graphical badge */}
            <div className="w-16 h-20 rounded-xl bg-linear-to-b from-brand-500/20 to-black/30 border border-brand-500/20 flex flex-col items-center justify-center p-2 text-center">
              <div className="w-8 h-10 rounded-md bg-active/20 border border-active/40 flex items-center justify-center text-[9px] font-['Outfit'] font-black text-active">
                WHEY
              </div>
              <span className="text-[8px] font-['Outfit'] font-bold text-[#9290C3] mt-1">
                ISOLATE
              </span>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-brand-500/10 flex items-center justify-between">
            <div>
              <p className="font-['Outfit'] text-base font-extrabold text-foreground">
                147
              </p>
              <p className="font-['Inter'] text-[11px] text-[#535C91] dark:text-[#9290C3]">
                Units Sold
              </p>
            </div>
            <div className="text-right">
              <p className="font-['Outfit'] text-base font-extrabold text-foreground">
                $40
              </p>
              <p className="font-['Inter'] text-[11px] text-[#535C91] dark:text-[#9290C3]">
                Avg. Order
              </p>
            </div>
          </div>
        </div>

        {/* CARD 6: PT SESSIONS TODAY & WEEKLY CHART */}
        <div className="bg-white dark:bg-[#070F2B] rounded-2xl p-5 sm:p-6 border border-brand-500/15 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                <FaCalendarCheck className="text-purple-500 w-4 h-4" />
              </div>
              <div>
                <h3 className="font-['Outfit'] text-2xl font-black text-foreground">
                  26
                </h3>
                <p className="font-['Inter'] text-xs text-[#535C91] dark:text-[#9290C3]">
                  PT Sessions Today
                </p>
              </div>
            </div>

            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-['Outfit'] font-extrabold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
              <FaArrowUp className="w-2.5 h-2.5" />
              +11.4%
            </span>
          </div>

          {/* Mini Weekly Bar Graph Mon-Sun */}
          <div className="mt-6 pt-2">
            <div className="flex items-end justify-between gap-1 h-16">
              {weeklySessions.map((item, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-1 group">
                  <div className="w-full bg-black/10 dark:bg-white/10 rounded-full h-12 flex items-end justify-center p-0.5 overflow-hidden">
                    <div
                      className={`w-full rounded-full transition-all duration-300 ${
                        item.day === "Today" || idx === 3
                          ? "bg-active"
                          : "bg-purple-500/60 group-hover:bg-purple-500"
                      }`}
                      style={{ height: `${item.height}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-['Outfit'] font-semibold text-[#535C91] dark:text-[#9290C3]">
                    {item.day}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 4. ANALYTICS & INSIGHTS: Mix Donut + Revenue Area Trend  */}
      {/* ======================================================== */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-4 bg-active rounded-full" />
          <h2 className="font-['Outfit'] text-xs font-black uppercase tracking-wider text-[#535C91] dark:text-[#9290C3]">
            Analytics & Insights
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* MEMBERSHIP MIX (DONUT) - lg:col-span-5 */}
          <div className="lg:col-span-5 bg-white dark:bg-[#070F2B] rounded-2xl p-5 sm:p-6 border border-brand-500/15 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between pb-4 border-b border-brand-500/10">
              <h3 className="font-['Outfit'] text-base font-bold text-foreground">
                Membership & Category Mix
              </h3>
              <span className="text-xs font-['Inter'] text-[#535C91] dark:text-[#9290C3]">
                Live Roster
              </span>
            </div>

            <div className="relative h-56 my-2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={75}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {categoryData.map((_, index) => (
                      <Cell
                        key={index}
                        fill={THEME_COLORS[index % THEME_COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(v) => [`${v} Classes`, "Count"]}
                    contentStyle={{
                      backgroundColor: "#070F2B",
                      borderColor: "rgba(255, 42, 85, 0.3)",
                      color: "#ffffff",
                      borderRadius: "12px",
                      fontSize: "12px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="font-['Outfit'] text-2xl font-black text-foreground">
                  {totalClasses}
                </span>
                <span className="text-[10px] font-['Outfit'] font-bold uppercase text-[#535C91] dark:text-[#9290C3]">
                  Classes
                </span>
              </div>
            </div>

            {/* Custom Pill Legend */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-brand-500/10">
              {categoryData.slice(0, 4).map((cat, i) => (
                <div key={i} className="flex items-center justify-between text-xs px-2 py-1 rounded-lg bg-black/5 dark:bg-white/5">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{
                        backgroundColor: THEME_COLORS[i % THEME_COLORS.length],
                      }}
                    />
                    <span className="font-['Inter'] text-[#535C91] dark:text-[#9290C3] truncate">
                      {cat.name}
                    </span>
                  </div>
                  <span className="font-['Outfit'] font-bold text-foreground">
                    {cat.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* REVENUE TREND (AREA CHART) - lg:col-span-7 */}
          <div className="lg:col-span-7 bg-white dark:bg-[#070F2B] rounded-2xl p-5 sm:p-6 border border-brand-500/15 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between pb-4 border-b border-brand-500/10">
              <div>
                <h3 className="font-['Outfit'] text-base font-bold text-foreground">
                  Revenue Growth Trajectory
                </h3>
                <p className="font-['Inter'] text-xs text-[#535C91] dark:text-[#9290C3]">
                  Month-over-month telemetry & projected yield
                </p>
              </div>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 text-xs font-['Outfit'] font-extrabold rounded-full">
                Target Exceeded
              </span>
            </div>

            <div className="h-64 my-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={monthlyRevenueData}
                  margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="mainRevenueGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ff2a55" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#ff2a55" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <Tooltip
                    formatter={(v) => [`$${Number(v).toLocaleString()}`, "Revenue"]}
                    contentStyle={{
                      backgroundColor: "#070F2B",
                      borderColor: "rgba(255, 42, 85, 0.3)",
                      color: "#ffffff",
                      borderRadius: "12px",
                      fontSize: "12px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#ff2a55"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#mainRevenueGrad)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-brand-500/10 text-xs font-['Inter']">
              <span className="text-[#535C91] dark:text-[#9290C3]">
                Base Growth: <strong className="text-foreground">+34.5% YTD</strong>
              </span>
              <Link
                href="/dashboard/admin/transactions"
                className="font-['Outfit'] font-bold text-active hover:underline"
              >
                Inspect Ledger →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 5. RECENT PLATFORM ACTIVITY / USERS DIRECTORY PREVIEW    */}
      {/* ======================================================== */}
      <div className="bg-white dark:bg-[#070F2B] rounded-2xl border border-brand-500/15 shadow-xs overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-brand-500/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="font-['Outfit'] text-lg font-bold text-foreground">
              Recent Member Registrations
            </h3>
            <p className="font-['Inter'] text-xs text-[#535C91] dark:text-[#9290C3] mt-0.5">
              Latest athletes verified on the FlexPulse network
            </p>
          </div>
          <Link
            href="/dashboard/admin/manageUsers"
            className="inline-flex items-center gap-1.5 text-xs font-['Outfit'] font-bold text-active hover:underline"
          >
            <span>View Full Directory</span>
            <span>→</span>
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-['Inter'] text-xs">
            <thead className="bg-black/5 dark:bg-white/5 text-[#535C91] dark:text-[#9290C3] uppercase tracking-wider font-['Outfit'] text-[10px]">
              <tr>
                <th className="py-3.5 px-6 font-extrabold">Athlete</th>
                <th className="py-3.5 px-6 font-extrabold">Role</th>
                <th className="py-3.5 px-6 font-extrabold">Status</th>
                <th className="py-3.5 px-6 font-extrabold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-500/10">
              {users.slice(0, 5).map((u, idx) => (
                <tr
                  key={u._id || idx}
                  className="hover:bg-brand-500/5 transition-colors"
                >
                  <td className="py-3.5 px-6">
                    <div className="flex items-center gap-3">
                      {u.image ? (
                        <Image
                          src={u.image}
                          alt={u.name || "User"}
                          width={32}
                          height={32}
                          className="w-8 h-8 rounded-full object-cover border border-active/30"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-active/10 border border-active/20 flex items-center justify-center text-active">
                          <FaUserCircle className="w-4 h-4" />
                        </div>
                      )}
                      <div>
                        <p className="font-bold text-foreground">
                          {u.name || "Member"}
                        </p>
                        <p className="text-[11px] text-[#535C91] dark:text-[#9290C3]">
                          {u.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-6">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-['Outfit'] font-extrabold uppercase tracking-wider ${
                        u.role === "admin"
                          ? "bg-active/15 text-active border border-active/30"
                          : u.role === "trainer"
                          ? "bg-blue-500/15 text-blue-500 border border-blue-500/30"
                          : "bg-emerald-500/15 text-emerald-500 border border-emerald-500/30"
                      }`}
                    >
                      {u.role || "Member"}
                    </span>
                  </td>
                  <td className="py-3.5 px-6">
                    <span className="inline-flex items-center gap-1.5 text-[11px] text-emerald-500 font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      Active
                    </span>
                  </td>
                  <td className="py-3.5 px-6 text-right">
                    <Link
                      href="/dashboard/admin/manageUsers"
                      className="px-3 py-1 rounded-lg border border-brand-500/20 hover:border-active/40 hover:bg-active/10 text-foreground hover:text-active font-semibold transition-all"
                    >
                      Manage
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}

