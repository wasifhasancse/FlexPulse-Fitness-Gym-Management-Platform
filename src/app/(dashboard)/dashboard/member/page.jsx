"use client";

import { getFavoriteClass } from "@/lib/api/getFavoriteClasses";
import { getMyBookingsClasses } from "@/lib/api/getMyBookingClasses";
import { getTrainerApplication } from "@/lib/api/getTrainerApplication";
import { authClient } from "@/lib/auth-client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FaArrowUp,
  FaCalendarAlt,
  FaCalendarCheck,
  FaCalendarPlus,
  FaClock,
  FaDumbbell,
  FaFire,
  FaHeart,
  FaThLarge,
  FaUserCircle,
  FaUserGraduate,
} from "react-icons/fa";

export default function MemberDashboard() {
  const [bookings, setBookings] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [application, setApplication] = useState({});
  const [period, setPeriod] = useState("Today");

  const { data } = authClient.useSession();
  const user = data?.user;
  const { status, feedback } = application || {};

  const memberSince = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Active Member";

  // Set page title
  useEffect(() => {
    document.title = "Member Dashboard | FlexPulse Elite";
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.id) return;
      try {
        const [appData, bookingsData, favData] = await Promise.all([
          getTrainerApplication(user.id),
          getMyBookingsClasses(user.id),
          getFavoriteClass(user.id),
        ]);
        setApplication(appData || {});
        setBookings(bookingsData || []);
        setFavorites(favData || []);
      } catch (err) {
        console.error("Failed to load member telemetry", err);
      }
    };
    fetchData();
  }, [user?.id]);

  const getStatusColor = (status = "") => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-amber-500/10 text-amber-500 border border-amber-500/20";
      case "approved":
        return "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20";
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
              Member Dashboard
            </h1>
            <div className="flex flex-wrap items-center gap-2.5 mt-1 font-['Inter'] text-xs text-[#535C91] dark:text-[#9290C3]">
              <span className="flex items-center gap-1.5">
                <FaCalendarAlt className="w-3.5 h-3.5 text-active" />
                {todayFormatted}
              </span>
              <span>•</span>
              <span>Athlete Roster</span>
              <span>•</span>
              <span className="flex items-center gap-1.5 text-emerald-500 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Active Training Pass
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
            href="/all-classes"
            className="relative overflow-hidden inline-flex items-center gap-2 px-4 py-2 bg-btn-bg text-btn-text text-xs font-['Outfit'] font-extrabold rounded-xl shadow-xs hover:shadow-md hover:brightness-105 active:scale-95 transition-all duration-200 border border-white/20 group cursor-pointer"
          >
            <span className="absolute inset-0 w-1/2 h-full bg-linear-to-r from-transparent via-white/20 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-[250%] transition-transform duration-700 pointer-events-none" />
            <FaCalendarPlus className="w-3.5 h-3.5 text-btn-text" />
            <span>Book New Class</span>
          </Link>
        </div>
      </div>

      {/* Row 1 Stats matching Dreams GYM cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Booked Classes Card */}
        <div className="bg-white dark:bg-[#070F2B] rounded-2xl p-5 sm:p-6 border border-brand-500/15 shadow-xs flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-active/10 border border-active/20 flex items-center justify-center">
                <FaCalendarCheck className="text-active w-5 h-5" />
              </div>
              <div>
                <h3 className="font-['Outfit'] text-2xl font-black text-foreground">
                  {bookings.length}
                </h3>
                <p className="font-['Inter'] text-xs text-[#535C91] dark:text-[#9290C3]">
                  Booked Sessions
                </p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-['Outfit'] font-extrabold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
              <FaArrowUp className="w-2.5 h-2.5" />
              On Track
            </span>
          </div>

          <div className="mt-6 pt-4 border-t border-brand-500/10 flex items-center justify-between text-xs font-['Inter']">
            <span className="text-[#535C91] dark:text-[#9290C3]">Next Workout</span>
            <span className="font-['Outfit'] font-bold text-active">
              {bookings[0]?.className || "Explore Classes"}
            </span>
          </div>
        </div>

        {/* Favorites Card */}
        <div className="bg-white dark:bg-[#070F2B] rounded-2xl p-5 sm:p-6 border border-brand-500/15 shadow-xs flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
                <FaHeart className="text-rose-500 w-5 h-5" />
              </div>
              <div>
                <h3 className="font-['Outfit'] text-2xl font-black text-foreground">
                  {favorites.length}
                </h3>
                <p className="font-['Inter'] text-xs text-[#535C91] dark:text-[#9290C3]">
                  Saved Programs
                </p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-['Outfit'] font-extrabold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
              Personalized
            </span>
          </div>

          <div className="mt-6 pt-4 border-t border-brand-500/10 flex items-center justify-between text-xs font-['Inter']">
            <span className="text-[#535C91] dark:text-[#9290C3]">Wishlist</span>
            <Link
              href="/dashboard/member/favorites"
              className="font-['Outfit'] font-bold text-active hover:underline"
            >
              View Saved ({favorites.length}) →
            </Link>
          </div>
        </div>

        {/* Member Telemetry / Streak Card */}
        <div className="bg-white dark:bg-[#070F2B] rounded-2xl p-5 sm:p-6 border border-brand-500/15 shadow-xs flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                <FaFire className="text-amber-500 w-5 h-5" />
              </div>
              <div>
                <h3 className="font-['Outfit'] text-2xl font-black text-foreground">
                  4 Days
                </h3>
                <p className="font-['Inter'] text-xs text-[#535C91] dark:text-[#9290C3]">
                  Workout Streak
                </p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-['Outfit'] font-extrabold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
              Active
            </span>
          </div>

          <div className="mt-6 pt-4 border-t border-brand-500/10 flex items-center justify-between text-xs font-['Inter']">
            <span className="text-[#535C91] dark:text-[#9290C3]">Member Since</span>
            <span className="font-['Outfit'] font-bold text-foreground">
              {memberSince}
            </span>
          </div>
        </div>
      </div>

      {/* Trainer Career Application Card & User Profile Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-7 bg-white dark:bg-[#070F2B] rounded-2xl p-5 sm:p-6 border border-brand-500/15 shadow-xs flex flex-col justify-between">
          <div className="flex items-center gap-3.5">
            {user?.image ? (
              <Image
                width={56}
                height={56}
                src={user?.image}
                alt={user?.name || "User"}
                className="w-14 h-14 rounded-2xl object-cover border-2 border-active/40"
              />
            ) : (
              <div className="w-14 h-14 rounded-2xl bg-active/10 border border-active/30 flex items-center justify-center text-active">
                <FaUserCircle className="w-7 h-7" />
              </div>
            )}
            <div>
              <h2 className="font-['Outfit'] text-xl font-bold text-foreground">
                {user?.name || "Athlete"}
              </h2>
              <p className="font-['Inter'] text-xs text-[#535C91] dark:text-[#9290C3]">
                {user?.email}
              </p>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-['Outfit'] font-bold uppercase tracking-wider bg-active/10 text-active border border-active/20">
                  {user?.role || "Member"}
                </span>
                <span className="text-[11px] font-['Inter'] text-[#535C91] dark:text-[#9290C3] flex items-center gap-1">
                  <FaClock className="w-3 h-3 text-active" /> Since {memberSince}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-brand-500/10 flex flex-wrap items-center gap-3">
            <Link
              href="/all-classes"
              className="px-4 py-2 rounded-xl bg-active/10 hover:bg-active/20 text-active border border-active/30 text-xs font-['Outfit'] font-bold transition-all"
            >
              Browse All Programs
            </Link>
            <Link
              href="/dashboard/member/bookings"
              className="px-4 py-2 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-foreground border border-brand-500/15 text-xs font-['Outfit'] font-bold transition-all"
            >
              Calendar Schedule
            </Link>
          </div>
        </div>

        {/* Trainer Application Status Card */}
        <div className="lg:col-span-5 bg-white dark:bg-[#070F2B] rounded-2xl p-5 sm:p-6 border border-brand-500/15 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-brand-500/10">
              <h3 className="font-['Outfit'] text-base font-bold text-foreground flex items-center gap-2">
                <FaUserGraduate className="text-active w-4 h-4" />
                Coach Career Track
              </h3>
              <span
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-['Outfit'] font-bold uppercase tracking-wider ${getStatusColor(
                  status
                )}`}
              >
                {status || "Not Applied"}
              </span>
            </div>

            <p className="font-['Inter'] text-xs text-[#535C91] dark:text-[#9290C3] mt-3 leading-relaxed">
              {status?.toLowerCase() === "pending"
                ? "Your credentials and certifications are currently under administrative review. We usually respond within 48 business hours."
                : status?.toLowerCase() === "approved"
                ? "Congratulations! Your trainer application has been approved. You can now access trainer management tools."
                : status?.toLowerCase() === "rejected"
                ? feedback || "Application was not approved at this time. You may update your certifications and reapply."
                : "Become a certified coach at FlexPulse Elite. Share your fitness expertise, lead training sessions, and grow your career."}
            </p>
          </div>

          {!status && (
            <div className="mt-5">
              <Link
                href="/dashboard/member/apply-trainer"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-active/10 hover:bg-active/20 text-active border border-active/30 text-xs font-['Outfit'] font-bold rounded-xl transition-all"
              >
                <FaUserGraduate className="w-3.5 h-3.5" />
                <span>Apply as Trainer</span>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Recent Bookings Table matching Dreams GYM table */}
      <div className="bg-white dark:bg-[#070F2B] rounded-2xl border border-brand-500/15 shadow-xs overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-brand-500/10 flex items-center justify-between">
          <div>
            <h3 className="font-['Outfit'] text-lg font-bold text-foreground">
              Recent Booked Classes
            </h3>
            <p className="font-['Inter'] text-xs text-[#535C91] dark:text-[#9290C3] mt-0.5">
              Your confirmed athletic reservations
            </p>
          </div>
          <Link
            href="/dashboard/member/bookings"
            className="font-['Outfit'] text-xs font-bold text-active hover:underline"
          >
            Full Schedule ({bookings.length}) →
          </Link>
        </div>

        {bookings.length === 0 ? (
          <div className="p-8 text-center">
            <p className="font-['Inter'] text-xs text-[#535C91] dark:text-[#9290C3]">
              No booked classes found. Reserve your next training session!
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left font-['Inter'] text-xs">
              <thead className="bg-black/5 dark:bg-white/5 text-[#535C91] dark:text-[#9290C3] uppercase tracking-wider font-['Outfit'] text-[10px]">
                <tr>
                  <th className="py-3.5 px-6 font-extrabold">Program</th>
                  <th className="py-3.5 px-6 font-extrabold">Date & Time</th>
                  <th className="py-3.5 px-6 font-extrabold">Coach</th>
                  <th className="py-3.5 px-6 font-extrabold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-500/10">
                {bookings.slice(0, 5).map((cls) => (
                  <tr
                    key={cls._id}
                    className="hover:bg-brand-500/5 transition-colors"
                  >
                    <td className="py-3.5 px-6">
                      <p className="font-bold text-foreground">{cls.className}</p>
                      <p className="text-[11px] text-[#535C91] dark:text-[#9290C3]">
                        {cls.duration || "60 mins"}
                      </p>
                    </td>
                    <td className="py-3.5 px-6 text-[#535C91] dark:text-[#9290C3]">
                      {cls.bookedAt
                        ? new Date(cls.bookedAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })
                        : "Scheduled"}
                    </td>
                    <td className="py-3.5 px-6 font-medium text-foreground">
                      {cls.trainer || "Head Coach"}
                    </td>
                    <td className="py-3.5 px-6 text-right">
                      <Link
                        href={`/all-classes/${cls.classId || cls._id}`}
                        className="px-3 py-1 rounded-lg border border-brand-500/20 hover:border-active/40 hover:bg-active/10 text-foreground hover:text-active font-semibold transition-all"
                      >
                        Details
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

