"use client";

import { getMyBookingsClasses } from "@/lib/api/getMyBookingClasses";
import { authClient } from "@/lib/auth-client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "@heroui/react";
import DashboardPageHeader from "@/components/Dashboard/common/DashboardPageHeader";
import {
  FaBook,
  FaCalendarAlt,
  FaClock,
  FaSpinner,
  FaDumbbell,
} from "react-icons/fa";
import {
  FiRepeat,
  FiXCircle,
  FiRefreshCw,
  FiPrinter,
  FiArrowRight,
  FiShield,
  FiAlertCircle,
  FiCheckCircle,
} from "react-icons/fi";

// Helper to format date/time from ISO string
const formatDate = (isoString) => {
  if (!isoString) return "Active";
  const date = new Date(isoString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const formatTime = (isoString) => {
  if (!isoString) return "";
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
  const [selectedBookingForCancel, setSelectedBookingForCancel] = useState(null);
  const [isTogglingRenew, setIsTogglingRenew] = useState(false);
  const { data: sessions } = authClient.useSession();
  const user = sessions?.user;

  // Set page title
  useEffect(() => {
    document.title = "My Bookings & Subscriptions | FlexPulse";
  }, []);

  const fetchBookings = async () => {
    if (!user?.id) return;
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

  useEffect(() => {
    fetchBookings();
  }, [user?.id]);

  // Handle toggling auto-renewal for a specific booking
  const handleToggleAutoRenew = async (booking, targetAutoRenewState) => {
    setIsTogglingRenew(true);
    try {
      const res = await fetch("/api/subscription/toggle-renew", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookingId: booking._id,
          classId: booking.classId,
          userId: user?.id,
          subscriptionId: booking.subscriptionId || booking.sessionId,
          autoRenew: targetAutoRenewState,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        // Optimistically update the booking in state
        setBookings((prev) =>
          prev.map((b) =>
            b._id === booking._id
              ? { ...b, autoRenew: targetAutoRenewState }
              : b
          )
        );
        setSelectedBookingForCancel(null);

        if (targetAutoRenewState) {
          toast.success(
            `Auto-renewal reactivated for ${booking.className}. It will renew automatically next month.`
          );
        } else {
          toast.info(
            `Auto-renewal cancelled for ${booking.className}. You will not be charged again.`
          );
        }
      } else {
        toast.error(data.error || "Failed to update subscription preference.");
      }
    } catch (err) {
      console.error("Dashboard toggle renew error:", err);
      toast.error("Failed to update auto-renewal. Please check your connection.");
    } finally {
      setIsTogglingRenew(false);
    }
  };

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

  const activeRenewCount = bookings.filter((b) => b.autoRenew !== false).length;
  const singlePassCount = bookings.filter((b) => b.autoRenew === false).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full space-y-6 pb-12 text-left"
    >
      {/* Header & Subscriptions Overview matching Overview layout */}
      <DashboardPageHeader
        icon={FaBook}
        title="My Enrolled Classes & Subscriptions"
        subtitle="View all your confirmed athletic classes. Control monthly auto-renewals with 1-click flexible cancellation."
        badges={[
          <span key="badge" className="text-active font-semibold">
            Athlete Pass Registry
          </span>,
        ]}
        actions={
          <div className="flex items-center gap-2.5 flex-wrap">
            <div className="px-3.5 py-1.5 rounded-xl bg-black/5 dark:bg-white/5 border border-brand-500/15 shadow-xs text-left">
              <span className="text-[10px] font-bold uppercase text-[#535C91] dark:text-[#9290C3] block">
                Total Classes
              </span>
              <span className="font-['Outfit'] font-black text-sm text-foreground">
                {bookings.length}
              </span>
            </div>

            <div className="px-3.5 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 shadow-xs text-left">
              <span className="text-[10px] font-bold uppercase block">
                Auto-Renew
              </span>
              <span className="font-['Outfit'] font-black text-sm">
                {activeRenewCount} Active
              </span>
            </div>

            <div className="px-3.5 py-1.5 rounded-xl bg-black/5 dark:bg-white/5 border border-brand-500/15 text-[#535C91] dark:text-[#9290C3] shadow-xs text-left">
              <span className="text-[10px] font-bold uppercase block">
                Single Pass
              </span>
              <span className="font-['Outfit'] font-black text-sm text-foreground">
                {singlePassCount}
              </span>
            </div>
          </div>
        }
      />

      {/* Bookings & Subscriptions Table */}
      {bookings.length === 0 ? (
        <div className="bg-white dark:bg-[#070F2B] rounded-2xl p-12 text-center shadow-xs border border-brand-500/15 space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-black/5 dark:bg-white/5 border border-brand-500/15 text-active flex items-center justify-center mx-auto text-2xl">
            <FaDumbbell />
          </div>
          <h3 className="font-['Outfit'] text-xl font-bold text-foreground">No Enrolled Classes Found</h3>
          <p className="font-['Inter'] text-xs text-[#535C91] dark:text-[#9290C3] max-w-md mx-auto">
            You have not booked any classes yet. Browse our curated high-performance curriculum to enroll today.
          </p>
          <Link
            href="/all-classes"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-btn-bg hover:brightness-105 text-btn-text font-['Outfit'] font-black text-xs uppercase tracking-wider transition-all shadow-xs"
          >
            <span>Explore Classes</span>
            <FiArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="bg-white dark:bg-[#070F2B] rounded-2xl shadow-xs border border-brand-500/15 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left font-['Inter'] text-sm">
              <thead className="bg-black/5 dark:bg-white/5 border-b border-brand-500/15 text-[#535C91] dark:text-[#9290C3] uppercase text-[11px] font-['Outfit'] font-bold tracking-wider">
                <tr>
                  <th className="py-4 px-5">Class Details</th>
                  <th className="py-4 px-4">Coach</th>
                  <th className="py-4 px-4">Enrolled On</th>
                  <th className="py-4 px-5">Auto-Renewal System</th>
                  <th className="py-4 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-500/10 text-foreground">
                {bookings.map((booking) => {
                  const isRenewOn = booking.autoRenew !== false;

                  return (
                    <tr
                      key={booking._id}
                      className="hover:bg-black/2 dark:hover:bg-white/2 transition-colors"
                    >
                      {/* Class Image & Title */}
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-3.5">
                          {booking.image ? (
                            <div className="relative w-14 h-14 rounded-2xl overflow-hidden shrink-0 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-xs">
                              <Image
                                src={booking.image}
                                alt={booking.className}
                                fill
                                className="object-cover"
                                unoptimized
                              />
                            </div>
                          ) : (
                            <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-400 text-xs shrink-0">
                              <FaDumbbell className="w-5 h-5 text-active" />
                            </div>
                          )}
                          <div>
                            <span className="font-['Outfit'] font-black text-base text-foreground block hover:text-active transition-colors">
                              {booking.className}
                            </span>
                            <span className="text-[11px] text-slate-400 block">
                              Duration: {booking.duration || 45} Mins • High Intensity
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Coach */}
                      <td className="py-4 px-4 text-foreground font-semibold text-xs">
                        {booking.trainer || "Coach Marcus Vance"}
                      </td>

                      {/* Schedule & Booked Date */}
                      <td className="py-4 px-4 text-xs">
                        <div className="flex flex-col gap-1">
                          <span className="flex items-center gap-1.5 font-medium text-foreground">
                            <FaCalendarAlt className="w-3.5 h-3.5 text-active shrink-0" />
                            {formatDate(booking.bookedAt)}
                          </span>
                          <span className="flex items-center gap-1.5 text-[11px] text-slate-400">
                            <FaClock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            {formatTime(booking.bookedAt) || "08:00 AM"}
                          </span>
                        </div>
                      </td>

                      {/* Auto-Renewal Status & Toggle Control */}
                      <td className="py-4 px-5">
                        <div className="space-y-2">
                          {/* Live Status Badge */}
                          <div>
                            {isRenewOn ? (
                              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600 border border-emerald-500/25">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                <span>Auto-Renew ON (${booking.price || 35}.00/mo)</span>
                              </div>
                            ) : (
                              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-600 border border-amber-500/25">
                                <span className="w-2 h-2 rounded-full bg-amber-500" />
                                <span>Auto-Renew OFF (Single Month)</span>
                              </div>
                            )}
                          </div>

                          {/* Action Button: Cancel or Reactivate Auto-Renewal */}
                          <div>
                            {isRenewOn ? (
                              <button
                                type="button"
                                onClick={() => setSelectedBookingForCancel(booking)}
                                className="group/cancel px-3 py-1.5 rounded-xl border border-rose-500/30 bg-rose-500/10 hover:bg-rose-500 text-rose-500 hover:text-white text-[11px] font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95"
                                title="Cancel automatic renewal for this class"
                              >
                                <FiXCircle className="w-3.5 h-3.5 group-hover/cancel:rotate-90 transition-transform" />
                                <span>Cancel Auto-Renew</span>
                              </button>
                            ) : (
                              <button
                                type="button"
                                onClick={() => handleToggleAutoRenew(booking, true)}
                                disabled={isTogglingRenew}
                                className="group/enable px-3 py-1.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500 text-emerald-600 hover:text-white text-[11px] font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95"
                                title="Reactivate monthly auto-renewal"
                              >
                                <FiRefreshCw className="w-3.5 h-3.5 group-hover/enable:rotate-180 transition-transform" />
                                <span>Enable Auto-Renew</span>
                              </button>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Details & Official Receipt Actions */}
                      <td className="py-4 px-5 text-right">
                        <div className="inline-flex items-center gap-2">
                          {booking.sessionId && (
                            <Link
                              href={`/success?session_id=${booking.sessionId}`}
                              className="px-3 py-1.5 rounded-xl border border-brand-500/15 hover:bg-black/5 dark:hover:bg-white/5 text-foreground text-xs font-bold transition-all shadow-2xs flex items-center gap-1.5 cursor-pointer"
                              title="Print Official Payment Receipt"
                            >
                              <FiPrinter className="w-3.5 h-3.5 text-active" />
                              <span className="hidden sm:inline">Receipt</span>
                            </Link>
                          )}

                          <Link
                            href={`/all-classes/${booking.classId}`}
                            className="px-3.5 py-1.5 rounded-xl bg-active hover:bg-rose-600 text-white text-xs font-['Outfit'] font-black uppercase tracking-wider transition-all shadow-sm hover:shadow-active/30 inline-flex items-center gap-1 cursor-pointer"
                          >
                            <span>Details</span>
                            <FiArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Footer Card Guarantee */}
          <div className="p-4 bg-slate-50/80 dark:bg-white/[0.02] border-t border-slate-200 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-400">
            <span className="flex items-center gap-2">
              <FiShield className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>100% Flexible Subscription Policy • Cancel or reactivate auto-renewal anytime with zero fees.</span>
            </span>
            <span>Secured with Stripe™</span>
          </div>
        </div>
      )}

      {/* Confirmation Modal to Cancel Auto-Renewal */}
      {selectedBookingForCancel && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="w-full max-w-md rounded-3xl bg-white dark:bg-[#121124] border border-slate-200 dark:border-white/10 p-6 space-y-5 shadow-2xl">
            <div className="flex items-start gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0 border border-amber-500/20">
                <FiAlertCircle className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-['Outfit'] font-black text-lg text-foreground">
                  Cancel Auto-Renewal for this Class?
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  You are disabling monthly renewal for <strong>{selectedBookingForCancel.className}</strong>.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-100 dark:border-white/5 text-xs space-y-2 text-slate-500 dark:text-slate-400">
              <div className="flex justify-between">
                <span>Class Name:</span>
                <strong className="text-foreground">{selectedBookingForCancel.className}</strong>
              </div>
              <div className="flex justify-between">
                <span>Monthly Rate:</span>
                <span className="font-mono font-bold text-foreground">${selectedBookingForCancel.price || 35}.00 / mo</span>
              </div>
              <div className="flex justify-between">
                <span>Access Status:</span>
                <strong className="text-emerald-500 font-semibold">Active through end of 30 days</strong>
              </div>
              <div className="flex justify-between border-t border-slate-200/60 dark:border-white/5 pt-1.5">
                <span>Next Month Charges:</span>
                <strong className="text-emerald-600 font-mono font-bold">$0.00 (Cancelled)</strong>
              </div>
            </div>

            <p className="text-[11px] text-slate-400">
              ✓ You retain full access to training sessions and facility perks through the end of this billing cycle.
            </p>

            <div className="flex items-center gap-3 pt-1">
              <button
                type="button"
                onClick={() => setSelectedBookingForCancel(null)}
                disabled={isTogglingRenew}
                className="flex-1 py-3 px-4 rounded-xl border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/5 text-xs font-bold text-foreground transition-colors cursor-pointer"
              >
                Keep Auto-Renew
              </button>
              <button
                type="button"
                onClick={() => handleToggleAutoRenew(selectedBookingForCancel, false)}
                disabled={isTogglingRenew}
                className="flex-1 py-3 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-all shadow-md shadow-rose-600/25 cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isTogglingRenew ? (
                  <>
                    <FaSpinner className="w-3.5 h-3.5 animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <span>Confirm Cancellation</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
