"use client";

import { getMyBookingsClasses } from "@/lib/api/getMyBookingClasses";
import { authClient } from "@/lib/auth-client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaCalendarAlt, FaClock, FaSpinner } from "react-icons/fa";

export const metadata = {
  title: "Member - My Bookings",
  description:
    "View and manage your scheduled fitness classes. Access class details, trainer information, and booking confirmations.",
};

// Helper to format date/time from ISO string
const formatDate = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const formatTime = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { data: sessions } = authClient.useSession();
  const user = sessions?.user;

  // Set page title
  useEffect(() => {
    document.title = "My Bookings | FlexPulse";
  }, []);

  useEffect(() => {
    if (!user?.id) return;

    const fetchBookings = async () => {
      try {
        const result = await getMyBookingsClasses(user.id);
        // Only keep bookings with paymentStatus === "paid"
        const paidBookings = Array.isArray(result)
          ? result.filter((b) => b.paymentStatus?.toLowerCase() === "paid")
          : [];
        setBookings(paidBookings);
      } catch (err) {
        setError(err.message || "Failed to load bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user?.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <FaSpinner className="w-8 h-8 text-active animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="font-sans text-rose-500">
          Error loading bookings: {error}
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-5xl mx-auto space-y-6 px-4 sm:px-0"
    >
      {/* Header */}
      <div>
        <h1 className="font-['Outfit'] text-3xl md:text-4xl font-bold text-foreground tracking-wide">
          My Bookings
        </h1>
        <p className="font-sans text-[#535C91] dark:text-[#9290C3] mt-1">
          All your registered and paid fitness classes.
        </p>
      </div>

      {/* Table / Cards */}
      {bookings.length === 0 ? (
        <div className="bg-white dark:bg-brand-800/20 rounded-2xl p-12 text-center shadow-card border border-brand-500/15 dark:border-brand-500/20">
          <p className="font-sans text-[#535C91] dark:text-[#9290C3]">
            You haven&apos;t booked any classes yet.
          </p>
        </div>
      ) : (
        <div className="bg-white dark:bg-brand-800/20 rounded-2xl shadow-card border border-brand-500/15 dark:border-brand-500/20 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left font-sans text-sm">
              <thead className="bg-brand-500/10 text-[#535C91] dark:text-[#9290C3]">
                <tr>
                  <th className="py-3.5 px-6 font-semibold">Image</th>
                  <th className="py-3.5 px-6 font-semibold">Class Name</th>
                  <th className="py-3.5 px-6 font-semibold">Trainer</th>
                  <th className="py-3.5 px-6 font-semibold">Schedule</th>
                  <th className="py-3.5 px-6 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr
                    key={booking._id}
                    className="border-b border-brand-500/10 hover:bg-brand-500/5 transition-colors"
                  >
                    <td className="py-4 px-6">
                      {booking.image ? (
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-brand-500/5 border border-brand-500/10">
                          <Image
                            src={booking.image}
                            alt={booking.className}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-lg bg-brand-500/5 flex items-center justify-center text-[#535C91] dark:text-[#9290C3] text-xs">
                          No img
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-6 font-bold text-foreground">
                      {booking.className}
                    </td>
                    <td className="py-4 px-6 text-foreground font-medium">
                      {booking.trainer}
                    </td>
                    <td className="py-4 px-6 text-foreground">
                      <div className="flex flex-col gap-1 sm:gap-2">
                        <span className="flex items-center gap-1.5 text-xs">
                          <FaCalendarAlt className="w-3.5 h-3.5 text-active" />
                          {formatDate(booking.bookedAt)}
                        </span>
                        <span className="flex items-center gap-1.5 text-xs text-[#535C91] dark:text-[#9290C3]">
                          <FaClock className="w-3.5 h-3.5 text-active" />
                          {formatTime(booking.bookedAt)}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <Link
                        href={`/all-classes/${booking.classId}`}
                        className="inline-block px-4 py-1.5 border border-brand-500/30 dark:border-brand-500/50 text-foreground hover:bg-btn-bg hover:text-btn-text rounded-lg text-xs font-semibold transition-all shadow-sm"
                      >
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </motion.div>
  );
}
