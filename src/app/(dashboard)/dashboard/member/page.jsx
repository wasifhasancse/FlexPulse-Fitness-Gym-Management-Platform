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
  FaCalendarAlt,
  FaCalendarPlus,
  FaClock,
  FaHeart,
  FaUserCircle,
} from "react-icons/fa";

export const metadata = {
  title: "Member - Dashboard",
  description:
    "Manage your fitness journey with ease. View your booked classes, favorite sessions, and trainer application status. This dashboard provides a comprehensive overview of your activities and progress within the FlexPulse platform.",
};

export default function MemberDashboard() {
  const [bookings, setBookings] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState(null);

  const { data } = authClient.useSession();
  const user = data?.user;
  const [application, setApplication] = useState({});
  const { status, feedback } = application || {};

  // Set page title
  useEffect(() => {
    document.title = "Member Dashboard | FlexPulse";
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.id) return;
      try {
        const appData = await getTrainerApplication(user.id);
        setApplication(appData || {});
      } catch (err) {
        console.error("Failed to load trainer application", err);
      }
    };
    fetchData();
  }, [user?.id]);

  // Total booking
  useEffect(() => {
    if (!user?.id) return;

    const fetchBookings = async () => {
      try {
        const result = await getMyBookingsClasses(user.id);
        setBookings(result || []);
      } catch (err) {
        setError(err.message || "Failed to load bookings");
      }
    };

    fetchBookings();
  }, [user?.id]);

  // Total favorite
  useEffect(() => {
    if (!user?.id) return;
    const fetchFavorites = async () => {
      try {
        const result = await getFavoriteClass(user?.id);
        setFavorites(result || []);
      } catch (err) {
        setError(err.message || "Failed to load favorites");
      }
    };
    fetchFavorites();
  }, [user?.id]);

  // Determine status badge color
  const getStatusColor = (status = "") => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20";
      case "approved":
        return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20";
      case "rejected":
        return "bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20";
      default:
        return "bg-slate-500/10 text-slate-600 dark:text-slate-400 border border-slate-500/20";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-6xl mx-auto space-y-6"
    >
      {/* Welcome Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-['Outfit'] text-3xl md:text-4xl font-bold text-foreground tracking-wide">
            Welcome back, {user?.name ? user.name.split(" ")[0] : "User"}
          </h1>
          <p className="font-['Inter'] text-[#535C91] dark:text-[#9290C3] mt-1">
            Your wellness journey continues. You have{" "}
            <span className="font-semibold text-active">{bookings.length} classes</span>{" "}
            booked.
          </p>
        </div>
        <Link
          href="/all-classes"
          className="inline-flex items-center px-5 py-2.5 bg-btn-bg text-btn-text font-['Inter'] font-semibold rounded-xl hover:opacity-90 transition-all shadow-md hover:shadow-lg whitespace-nowrap border border-brand-500/20"
        >
          <FaCalendarPlus className="mr-2" />
          Book New Class
        </Link>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-brand-800/20 rounded-2xl p-6 shadow-card border border-brand-500/15 dark:border-brand-500/20 flex items-center gap-4 hover:-translate-y-0.5 transition-all duration-300">
          <div className="p-3.5 bg-btn-bg/10 rounded-xl">
            <FaCalendarAlt className="w-6 h-6 text-btn-bg dark:text-active" />
          </div>
          <div>
            <p className="font-['Inter'] text-sm text-[#535C91] dark:text-[#9290C3]">
              Total Booked Classes
            </p>
            <p className="font-['Inter'] text-3xl font-extrabold text-foreground mt-0.5">
              {bookings.length}
            </p>
          </div>
        </div>
        <div className="bg-white dark:bg-brand-800/20 rounded-2xl p-6 shadow-card border border-brand-500/15 dark:border-brand-500/20 flex items-center gap-4 hover:-translate-y-0.5 transition-all duration-300">
          <div className="p-3.5 bg-btn-bg/10 rounded-xl">
            <FaHeart className="w-6 h-6 text-btn-bg dark:text-active" />
          </div>
          <div>
            <p className="font-['Inter'] text-sm text-[#535C91] dark:text-[#9290C3]">
              Total Favorites
            </p>
            <p className="font-['Inter'] text-3xl font-extrabold text-foreground mt-0.5">
              {favorites.length}
            </p>
          </div>
        </div>
      </div>

      {/* Profile + Trainer Status Row (2 columns on desktop) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-2 bg-white dark:bg-brand-800/20 rounded-2xl p-6 shadow-card border border-brand-500/15 dark:border-brand-500/20">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            {user?.image ? (
              <Image
                width={200}
                height={200}
                src={user?.image}
                alt={user?.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-active/40"
              />
            ) : (
              <FaUserCircle className="w-16 h-16 text-active" />
            )}
            <div>
              <h3 className="font-['Inter'] text-xl font-bold text-foreground">
                {user?.name}
              </h3>
              <p className="font-['Inter'] text-sm text-[#535C91] dark:text-[#9290C3]">
                {user?.email}
              </p>
              <span className="inline-block mt-1.5 px-3 py-0.5 bg-transparent border border-active text-active text-xs font-semibold rounded-full uppercase tracking-wider">
                {user?.role || "User"}
              </span>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-['Inter'] text-[#535C91] dark:text-[#9290C3] pt-4 border-t border-brand-500/10">
            <div className="flex items-center gap-2">
              <FaClock className="w-4 h-4 text-active" />
              <span>
                <strong className="text-foreground">Member Since:</strong>{" "}
                {user?.memberSince || "N/A"}
              </span>
            </div>
          </div>
        </div>

        {/* Trainer Application Status */}
        <div className="bg-white dark:bg-brand-800/20 rounded-2xl p-6 shadow-card border border-brand-500/15 dark:border-brand-500/20 flex flex-col justify-between gap-4">
          <div>
            <h4 className="font-['Inter'] font-bold text-foreground">
              Trainer Application Status
            </h4>
            <div className="mt-2.5">
              <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(
                  status,
                )}`}
              >
                {status || "Not Applied"}
              </span>
            </div>
            {status?.toLowerCase() === "rejected" && feedback && (
              <p className="mt-3 font-['Inter'] text-sm text-rose-500">
                {feedback}
              </p>
            )}
            {status?.toLowerCase() === "pending" && (
              <p className="mt-3 font-['Inter'] text-sm text-[#535C91] dark:text-[#9290C3]">
                Your application is under review. Expect a response within 48
                hours.
              </p>
            )}
            {status?.toLowerCase() === "approved" && (
              <p className="mt-3 font-['Inter'] text-sm text-emerald-500">
                Congratulations! You are now an active trainer.
              </p>
            )}
          </div>
          {!status && (
            <Link
              href="/dashboard/member/apply-trainer"
              className="w-full text-center px-4 py-2 border.5 border-brand-500/20 hover:border-active/40 text-sm font-bold text-active bg-active/5 dark:bg-active/10 hover:bg-active/10 dark:hover:bg-active/20 rounded-xl transition-all"
            >
              Apply Now
            </Link>
          )}
        </div>
      </div>

      {/* Upcoming Classes */}
      <div className="bg-white dark:bg-brand-800/20 rounded-2xl shadow-card border border-brand-500/15 dark:border-brand-500/20 overflow-hidden">
        <div className="p-5 border-b border-brand-500/10 flex items-center justify-between">
          <h3 className="font-['Inter'] font-bold text-foreground">
            Last Booked Classes
          </h3>
          <Link
            href="/dashboard/member/bookings"
            className="font-['Inter'] text-sm text-active hover:underline transition-colors"
          >
            Full Calendar &gt;
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left font-['Inter'] text-sm">
            <thead className="bg-brand-500/10 text-[#535C91] dark:text-[#9290C3]">
              <tr>
                <th className="py-3 px-6 font-semibold">SESSION</th>
                <th className="py-3 px-6 font-semibold">DATE & TIME</th>
                <th className="py-3 px-6 font-semibold">TRAINER</th>
                <th className="py-3 px-6 font-semibold text-right">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan="4" className="py-8 text-center text-[#535C91] dark:text-[#9290C3]">
                    No booked classes found. Book your first class!
                  </td>
                </tr>
              ) : (
                bookings
                  ?.slice(-2)
                  .reverse()
                  .map((cls) => (
                    <tr
                      key={cls._id}
                      className="border-b border-brand-500/10 hover:bg-brand-500/5 transition-colors"
                    >
                      <td className="py-4 px-6">
                        <p className="font-bold text-foreground">
                          {cls.className}
                        </p>
                        <p className="text-xs text-[#535C91] dark:text-[#9290C3] mt-0.5">{cls.duration}</p>
                      </td>
                      <td className="py-4 px-6 text-[#535C91] dark:text-[#9290C3]">
                        {cls.bookedAt ? new Date(cls.bookedAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        }) : "N/A"}
                      </td>
                      <td className="py-4 px-6 text-foreground font-medium">{cls.trainer}</td>
                      <td className="py-4 px-6 text-right">
                        <Link
                          href={`/all-classes/${cls.classId}`}
                          className="inline-block px-4 py-1.5 border border-brand-500/30 dark:border-brand-500/50 text-foreground hover:bg-btn-bg hover:text-btn-text rounded-lg text-xs font-semibold transition-all shadow-sm"
                        >
                          View Details
                        </Link>
                      </td>
                    </tr>
                  ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
