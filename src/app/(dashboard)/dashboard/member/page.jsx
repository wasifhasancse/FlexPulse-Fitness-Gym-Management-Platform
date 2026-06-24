"use client";

import { getFavoriteClass } from "@/lib/api/getFavoriteClass";
import { getTrainerApplication } from "@/lib/api/getTrainerApplication";
import { getMyBookings } from "@/lib/api/myBookingClass";
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

export default function MemberDashboard() {
  const [bookings, setBookings = {}] = useState([]);
  const [favorites, setFavorites = {}] = useState([]);

  const { data } = authClient.useSession();
  const user = data?.user;
  const [application, setApplication] = useState([]);
  const { status, feedback } = ({} = application);
  useEffect(() => {
    const fetchData = async () => {
      if (!user?.id) return;
      const application = await getTrainerApplication(user.id);
      setApplication(application);
    };
    fetchData();
  }, [user?.id]);

  //total-booking
  useEffect(() => {
    if (!user?.id) return;

    const fetchBookings = async () => {
      try {
        const result = await getMyBookings(user.id);
        setBookings(result);
      } catch (err) {
        setError(err.message || "Failed to load bookings");
      }
    };

    fetchBookings();
  }, [user?.id, setBookings]);

  //total favorite
  useEffect(() => {
    if (!user?.id) return;
    const favorites = async () => {
      try {
        const result = await getFavoriteClass(user?.id);
        setFavorites(result);
      } catch {
        setError(err.message || "Failed to load favorite");
      }
    };
    favorites();
  }, [user?.id, setFavorites]);

  // Determine status badge color
  const getStatusColor = (status = "") => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-[#F59E0B]/10 text-[#F59E0B] border border-[#F59E0B]/20";
      case "approved":
        return "bg-[#00FF66]/10 text-[#00FF66] border border-[#00FF66]/20";
      case "rejected":
        return "bg-[#FF3366]/10 text-[#FF3366] border border-[#FF3366]/20";
      default:
        return "bg-[#94A3B8]/10 text-[#94A3B8] border border-[#94A3B8]/20";
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
          <h1 className="font-['Outfit'] text-3xl md:text-4xl font-bold text-white tracking-wide">
            Welcome back, {user?.name.split(" ")[0]}
          </h1>
          <p className="font-['Inter'] text-[#94A3B8] mt-1">
            Your wellness journey continues. You have{" "}
            <span className="font-semibold text-[#CCFF00]">2 classes</span>{" "}
            scheduled for this week.
          </p>
        </div>
        <Link
          href="/all-classes"
          className="inline-flex items-center px-5 py-2.5 bg-[#CCFF00] text-[#0B0F19] font-['Inter'] font-medium rounded-lg hover:bg-[#B2E600] transition-colors shadow-sm hover:shadow-md whitespace-nowrap"
        >
          <FaCalendarPlus className="mr-2" />
          Book New Class
        </Link>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-[#131826] rounded-xl p-6 shadow-sm border border-[#1E293B] flex items-center gap-4">
          <div className="p-3 bg-[#CCFF00]/10 rounded-lg">
            <FaCalendarAlt className="w-6 h-6 text-[#CCFF00]" />
          </div>
          <div>
            <p className="font-['Inter'] text-sm text-[#94A3B8]">
              Total Booked Classes
            </p>
            <p className="font-['Inter'] text-2xl font-bold text-white">
              {bookings.length}
            </p>
          </div>
        </div>
        <div className="bg-[#131826] rounded-xl p-6 shadow-sm border border-[#1E293B] flex items-center gap-4">
          <div className="p-3 bg-[#CCFF00]/10 rounded-lg">
            <FaHeart className="w-6 h-6 text-[#CCFF00]" />
          </div>
          <div>
            <p className="font-['Inter'] text-sm text-[#94A3B8]">
              Total Favorites
            </p>
            <p className="font-['Inter'] text-2xl font-bold text-white">
              {favorites.length}
            </p>
          </div>
        </div>
      </div>

      {/* Profile + Trainer Status Row (2 columns on desktop) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-2 bg-[#131826] rounded-xl p-6 shadow-sm border border-[#1E293B]">
          <div className="flex items-center gap-4">
            {user?.image ? (
              <Image
                width={200}
                height={200}
                src={user?.image}
                alt={user?.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-[#3B82F6]"
              />
            ) : (
              <FaUserCircle className="w-16 h-16 text-[#CCFF00]" />
            )}
            <div>
              <h3 className="font-['Inter'] text-xl font-semibold text-white">
                {user?.name}
              </h3>
              <p className="font-['Inter'] text-sm text-[#94A3B8]">
                {user?.email}
              </p>
              <span className="inline-block mt-1 px-3 py-0.5 bg-transparent border border-[#3B82F6] text-[#3B82F6] text-xs font-medium rounded-full uppercase tracking-wider">
                {user?.role || "User"}
              </span>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-['Inter'] text-[#94A3B8]">
            <div className="flex items-center gap-2">
              <FaClock className="w-4 h-4 text-[#CCFF00]" />
              <span>
                <strong className="text-white">Member Since</strong>{" "}
                {user?.memberSince || "N/A"}
              </span>
            </div>
          </div>
        </div>

        {/* Trainer Application Status */}
        <div className="bg-[#131826] rounded-xl p-6 shadow-sm border border-[#1E293B] flex flex-col justify-between">
          <div>
            <h4 className="font-['Inter'] font-semibold text-white">
              Trainer Application Status
            </h4>
            <div className="mt-2">
              <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                  status,
                )}`}
              >
                {status || "Not Applied"}
              </span>
            </div>
            {status === "Rejected" && feedback && (
              <p className="mt-3 font-['Inter'] text-sm text-[#FF3366]">
                {feedback}
              </p>
            )}
            {status === "Pending" && (
              <p className="mt-3 font-['Inter'] text-sm text-[#94A3B8]">
                Your application is under review. Expect a response within 48
                hours.
              </p>
            )}
            {status === "Approved" && (
              <p className="mt-3 font-['Inter'] text-sm text-[#00FF66]">
                Congratulations! You are now a trainer.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Upcoming Classes */}
      <div className="bg-[#131826] rounded-xl shadow-sm border border-[#1E293B] overflow-hidden">
        <div className="p-4 border-b border-[#1E293B] flex items-center justify-between">
          <h3 className="font-['Inter'] font-semibold text-white">
            Last booked Classes
          </h3>
          <Link
            href="/dashboard/member/bookings"
            className="font-['Inter'] text-sm text-[#CCFF00] hover:text-[#B2E600] transition-colors"
          >
            Full Calendar &gt;
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left font-['Inter'] text-sm">
            <thead className="bg-[#1E293B] text-[#94A3B8]">
              <tr>
                <th className="py-3 px-4 font-medium">SESSION</th>
                <th className="py-3 px-4 font-medium">DATE & TIME</th>
                <th className="py-3 px-4 font-medium">TRAINER</th>
                <th className="py-3 px-4 font-medium text-right">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan="4" className="py-6 text-center text-[#94A3B8]">
                    No upcoming classes. Book your first class!
                  </td>
                </tr>
              ) : (
                bookings
                  ?.slice(-2)
                  .reverse()
                  .map((cls) => (
                    <tr
                      key={cls._id}
                      className="border-b border-[#1E293B] hover:bg-[#1E293B]/50 transition-colors"
                    >
                      <td className="py-4 px-4">
                        <p className="font-medium text-white">
                          {cls.className}
                        </p>
                        <p className="text-xs text-[#94A3B8]">{cls.duration}</p>
                      </td>
                      <td className="py-4 px-4 text-[#94A3B8]">
                        {cls.bookedAt}
                      </td>
                      <td className="py-4 px-4 text-white">{cls.trainer}</td>
                      <td className="py-4 px-4 text-right">
                        <button className="px-4 py-1.5 border border-[#CCFF00] text-[#CCFF00] rounded-lg text-xs font-medium hover:bg-[#CCFF00] hover:text-[#0B0F19] transition-colors">
                          Modify
                        </button>
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
