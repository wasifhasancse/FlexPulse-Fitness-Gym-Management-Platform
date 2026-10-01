"use client";

import TestimonialModal from "@/components/Dashboard/common/TestimonialModal";
import {
  deleteTestimonial,
  getAllTestimonialsAdminOrTrainer,
  updateTestimonialStatus,
} from "@/lib/api/getTestimonials";
import { authClient } from "@/lib/auth-client";
import { toast } from "@heroui/react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FaCheck,
  FaCheckCircle,
  FaClock,
  FaDumbbell,
  FaEdit,
  FaExternalLinkAlt,
  FaFilter,
  FaHourglassHalf,
  FaQuoteLeft,
  FaSearch,
  FaSpinner,
  FaStar,
  FaTimes,
  FaTimesCircle,
  FaTrash,
  FaTrophy,
} from "react-icons/fa";

export default function AdminTestimonialsManagePage() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [modalOpen, setModalOpen] = useState(false);
  const [testimonialToEdit, setTestimonialToEdit] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    document.title = "Manage Athlete Testimonials | FlexPulse Admin";
  }, []);

  useEffect(() => {
    let ignore = false;
    const fetchAdminTestimonials = async () => {
      try {
        const tokenRes = await authClient.token();
        const token = tokenRes?.data?.token;
        const data = await getAllTestimonialsAdminOrTrainer(token, {
          status: statusFilter,
          search,
        });
        if (!ignore) {
          setTestimonials(Array.isArray(data) ? data : data?.items || []);
        }
      } catch (err) {
        if (!ignore) {
          console.error("Failed to load admin testimonials:", err);
          toast.danger("Could not load testimonials");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    fetchAdminTestimonials();
    return () => {
      ignore = true;
    };
  }, [statusFilter, search, refreshKey]);

  const handleStatusChange = async (id, status) => {
    setActionLoading(id);
    try {
      const tokenRes = await authClient.token();
      const token = tokenRes?.data?.token;
      const res = await updateTestimonialStatus(id, status, token);
      if (res?.success) {
        toast.success(
          status === "approved"
            ? "Story approved and published live to the FlexPulse Homepage 'Member Voices' section!"
            : "Story marked as rejected."
        );
        setTestimonials((prev) =>
          prev.map((t) => (t._id === id ? { ...t, status } : t))
        );
      } else {
        toast.danger(res?.message || "Failed to update status");
      }
    } catch (err) {
      console.error(err);
      toast.danger("An error occurred updating testimonial status.");
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this athlete testimonial?")) {
      return;
    }

    setActionLoading(id);
    try {
      const tokenRes = await authClient.token();
      const token = tokenRes?.data?.token;
      const res = await deleteTestimonial(id, token);
      if (res?.success || res?.acknowledged) {
        toast.success("Testimonial deleted successfully.");
        setTestimonials((prev) => prev.filter((t) => t._id !== id));
      } else {
        toast.danger(res?.message || "Failed to delete testimonial.");
      }
    } catch (err) {
      console.error(err);
      toast.danger("An error occurred during deletion.");
    } finally {
      setActionLoading(null);
    }
  };

  const pendingCount = testimonials.filter((t) => t.status === "pending").length;
  const approvedCount = testimonials.filter((t) => t.status === "approved").length;

  return (
    <div className="w-full space-y-6 sm:space-y-8">
      {/* 1. Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-brand-500/15">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-active/10 border border-active/20 text-active text-xs font-extrabold uppercase tracking-wider mb-2">
            <FaQuoteLeft className="w-3 h-3" />
            <span>Admin Authority Hub</span>
          </div>
          <h1 className="font-['Outfit'] font-black text-2xl sm:text-3xl lg:text-4xl text-foreground tracking-tight">
            Manage Athlete <span className="text-active">Testimonials</span>
          </h1>
          <p className="font-['Inter'] text-sm text-[#535C91] dark:text-[#9290C3] mt-1 max-w-2xl">
            Control verified member transformations, moderate incoming submissions, and curate
            the Homepage &ldquo;Member Voices&rdquo; spotlight.
          </p>
        </div>

        <Link
          href="/#testimonials"
          className="px-4 py-3 rounded-2xl bg-white dark:bg-[#070F2B] border border-brand-500/15 hover:border-active/50 text-[#535C91] dark:text-[#9290C3] hover:text-foreground dark:hover:text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shadow-xs cursor-pointer"
        >
          <FaExternalLinkAlt className="w-3 h-3" />
          <span>View Live Section</span>
        </Link>
      </div>

      {/* 2. Overview Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white dark:bg-[#070F2B] border border-brand-500/15 rounded-2xl p-5 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs uppercase font-extrabold tracking-wider text-[#535C91] dark:text-[#9290C3]">
              Total Stories in System
            </p>
            <h3 className="font-['Outfit'] text-2xl font-black text-foreground mt-1">
              {testimonials.length}
            </h3>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-black/5 dark:bg-white/5 border border-brand-500/15 flex items-center justify-center text-[#535C91] dark:text-[#9290C3]">
            <FaQuoteLeft className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white dark:bg-[#070F2B] border border-amber-500/20 rounded-2xl p-5 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs uppercase font-extrabold tracking-wider text-amber-500 dark:text-amber-400">
              Pending Moderation
            </p>
            <h3 className="font-['Outfit'] text-2xl font-black text-foreground mt-1">
              {pendingCount}
            </h3>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 dark:text-amber-400">
            <FaHourglassHalf className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white dark:bg-[#070F2B] border border-emerald-500/20 rounded-2xl p-5 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs uppercase font-extrabold tracking-wider text-emerald-500 dark:text-emerald-400">
              Published on Homepage
            </p>
            <h3 className="font-['Outfit'] text-2xl font-black text-foreground mt-1">
              {approvedCount}
            </h3>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 dark:text-emerald-400">
            <FaCheckCircle className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* 3. Search and Status Filter */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-[#070F2B] border border-brand-500/15 shadow-xs">
        <div className="relative flex-1">
          <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#535C91] dark:text-[#9290C3]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search athlete name, discipline, milestone, quote..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-[#090814]/80 border border-slate-200 dark:border-[#535C91]/30 rounded-xl text-foreground dark:text-white placeholder-slate-400 dark:placeholder-[#535C91] text-xs focus:outline-none focus:border-active transition-all"
          />
        </div>

        <div className="flex items-center gap-2">
          <FaFilter className="w-3.5 h-3.5 text-[#535C91] dark:text-[#9290C3] shrink-0" />
          {["all", "pending", "approved", "rejected"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                statusFilter === st
                  ? "bg-active text-white shadow-xs"
                  : "bg-black/5 dark:bg-white/5 text-[#535C91] dark:text-[#9290C3] hover:text-foreground dark:hover:text-white hover:bg-black/10 dark:hover:bg-white/10"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Submissions List or Grid */}
      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center gap-3">
          <FaSpinner className="w-8 h-8 text-active animate-spin" />
          <p className="text-sm font-['Inter'] text-[#535C91] dark:text-[#9290C3]">Loading testimonials...</p>
        </div>
      ) : testimonials.length === 0 ? (
        <div className="py-16 rounded-3xl bg-white dark:bg-[#070F2B] border border-brand-500/15 text-center p-8 shadow-xs">
          <p className="text-[#535C91] dark:text-[#9290C3] font-['Inter'] text-sm">
            No testimonials match your selected filter.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((item) => {
            const isApproved = item.status === "approved";
            const isRejected = item.status === "rejected";

            return (
              <motion.div
                key={item._id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-[#070F2B] border border-brand-500/15 hover:border-brand-500/30 rounded-3xl p-6 flex flex-col justify-between shadow-xs transition-all relative group"
              >
                {/* Status + Rating */}
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                      isApproved
                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                        : isRejected
                        ? "bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20"
                        : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20"
                    }`}
                  >
                    {isApproved ? (
                      <>
                        <FaCheckCircle className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                        <span>Live on Homepage</span>
                      </>
                    ) : isRejected ? (
                      <>
                        <FaTimesCircle className="w-3 h-3 text-rose-600 dark:text-rose-400" />
                        <span>Rejected</span>
                      </>
                    ) : (
                      <>
                        <FaHourglassHalf className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                        <span>Pending Review</span>
                      </>
                    )}
                  </span>

                  <div className="flex items-center gap-1 text-amber-400 text-xs">
                    {[...Array(item.rating || 5)].map((_, i) => (
                      <FaStar key={i} className="w-3 h-3" />
                    ))}
                    <span className="font-bold text-foreground text-xs ml-1">
                      {item.rating || 5}.0
                    </span>
                  </div>
                </div>

                {/* Milestone Pill */}
                {item.achievement && (
                  <div className="mb-3">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-active/10 border border-active/20 text-active text-xs font-bold">
                      <FaTrophy className="w-3 h-3 text-active shrink-0" />
                      <span>{item.achievement}</span>
                    </span>
                  </div>
                )}

                {/* Quote */}
                <p className="text-xs sm:text-sm font-['Inter'] text-foreground/90 leading-relaxed italic mb-5 line-clamp-4">
                  &ldquo;{item.quote}&rdquo;
                </p>

                {/* Discipline & Tenure */}
                <div className="pt-3.5 border-t border-brand-500/10 flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1.5 text-xs text-[#535C91] dark:text-[#9290C3]">
                    <FaDumbbell className="w-3 h-3 text-active" />
                    <span>{item.discipline || "General"}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-[#535C91] dark:text-[#9290C3]">
                    <FaClock className="w-3 h-3" />
                    <span>{item.tenure || "Active"}</span>
                  </div>
                </div>

                {/* Author Info */}
                <div className="flex items-center gap-3 pt-3 border-t border-brand-500/10 mb-4">
                  <div className="w-9 h-9 rounded-full overflow-hidden relative border border-brand-500/20 bg-slate-100 dark:bg-black/30 shrink-0">
                    <Image
                      src={item.userImage || "https://prio.co.in/avatar.png"}
                      alt={item.name || "Member"}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-['Outfit'] font-bold text-xs text-foreground truncate">
                      {item.name || "Athlete Member"}
                    </h4>
                    <p className="text-[10px] text-[#535C91] dark:text-[#9290C3] truncate">
                      {item.role || "Member"}
                    </p>
                  </div>
                </div>

                {/* Admin Actions (Approve, Reject, Edit, Delete) */}
                <div className="flex items-center justify-between pt-3 border-t border-brand-500/10 gap-2">
                  <div className="flex items-center gap-2">
                    {/* Approve button */}
                    {!isApproved && (
                      <button
                        onClick={() => handleStatusChange(item._id, "approved")}
                        disabled={actionLoading === item._id}
                        className="px-3 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
                      >
                        <FaCheck className="w-3 h-3" />
                        <span>Approve Live</span>
                      </button>
                    )}

                    {/* Reject button */}
                    {!isRejected && (
                      <button
                        onClick={() => handleStatusChange(item._id, "rejected")}
                        disabled={actionLoading === item._id}
                        className="px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/30 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
                      >
                        <FaTimes className="w-3 h-3" />
                        <span>Reject</span>
                      </button>
                    )}
                  </div>

                  {/* Admin Edit and Delete for any post */}
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => {
                        setTestimonialToEdit(item);
                        setModalOpen(true);
                      }}
                      title="Edit Testimonial"
                      className="p-2 rounded-xl bg-black/5 hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/10 text-[#535C91] dark:text-[#9290C3] hover:text-foreground dark:hover:text-white transition-all cursor-pointer"
                    >
                      <FaEdit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      disabled={actionLoading === item._id}
                      title="Delete Testimonial"
                      className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 dark:text-rose-400 hover:text-rose-600 dark:hover:text-rose-300 transition-all cursor-pointer disabled:opacity-50"
                    >
                      <FaTrash className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Edit Modal */}
      <TestimonialModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        testimonialToEdit={testimonialToEdit}
        onSuccess={() => setRefreshKey((k) => k + 1)}
      />
    </div>
  );
}
