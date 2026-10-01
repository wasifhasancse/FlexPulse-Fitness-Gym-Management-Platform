"use client";

import TestimonialModal from "@/components/Dashboard/common/TestimonialModal";
import { deleteTestimonial, getMyTestimonials } from "@/lib/api/getTestimonials";
import { authClient } from "@/lib/auth-client";
import { toast } from "@heroui/react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FaCheckCircle,
  FaClock,
  FaDumbbell,
  FaEdit,
  FaExternalLinkAlt,
  FaHourglassHalf,
  FaPlus,
  FaQuoteLeft,
  FaSpinner,
  FaStar,
  FaTimesCircle,
  FaTrash,
  FaTrophy,
} from "react-icons/fa";

export default function MemberTestimonialsPage() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [testimonialToEdit, setTestimonialToEdit] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    document.title = "My Testimonials | FlexPulse Member Voices";
  }, []);

  useEffect(() => {
    if (!user?.id) return;
    let ignore = false;
    const fetchMemberTestimonials = async () => {
      try {
        const tokenRes = await authClient.token();
        const token = tokenRes?.data?.token;
        const data = await getMyTestimonials(token);
        if (!ignore) {
          setTestimonials(Array.isArray(data) ? data : data?.items || []);
        }
      } catch (err) {
        if (!ignore) {
          console.error("Failed to load member testimonials:", err);
          toast.danger("Could not load your testimonials");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    fetchMemberTestimonials();
    return () => {
      ignore = true;
    };
  }, [user?.id, refreshKey]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete your athlete testimonial?")) {
      return;
    }

    setDeletingId(id);
    try {
      const { data: tokenData } = await authClient.token();
      const token = tokenData?.token;
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
      setDeletingId(null);
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
            <span>Member Voices • Athlete Testimonials</span>
          </div>
          <h1 className="font-['Outfit'] font-black text-2xl sm:text-3xl lg:text-4xl text-foreground tracking-tight">
            My Transformation <span className="text-active">Stories</span>
          </h1>
          <p className="font-['Inter'] text-sm text-[#535C91] dark:text-[#9290C3] mt-1 max-w-2xl">
            Share your evidence-based achievements, coaching breakthroughs, and training journey.
            Approved stories are featured on the FlexPulse Homepage for all athletes to see.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/#testimonials"
            className="px-4 py-3 rounded-2xl bg-white dark:bg-[#070F2B] border border-brand-500/15 hover:border-active/50 text-[#535C91] dark:text-[#9290C3] hover:text-foreground dark:hover:text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shadow-xs cursor-pointer"
          >
            <FaExternalLinkAlt className="w-3 h-3" />
            <span>View On Homepage</span>
          </Link>

          <button
            onClick={() => {
              setTestimonialToEdit(null);
              setModalOpen(true);
            }}
            className="px-5 py-3 rounded-2xl bg-[#ff2a55] hover:opacity-90 active:scale-95 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-sm hover:shadow-md cursor-pointer"
          >
            <FaPlus className="w-3.5 h-3.5" />
            <span>Submit New Testimonial</span>
          </button>
        </div>
      </div>

      {/* 2. Telemetry Overview Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white dark:bg-[#070F2B] border border-brand-500/15 rounded-2xl p-5 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs uppercase font-extrabold tracking-wider text-[#535C91] dark:text-[#9290C3]">
              Total Stories Submitted
            </p>
            <h3 className="font-['Outfit'] text-2xl font-black text-foreground mt-1">
              {testimonials.length}
            </h3>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-black/5 dark:bg-white/5 border border-brand-500/15 flex items-center justify-center text-[#535C91] dark:text-[#9290C3]">
            <FaQuoteLeft className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white dark:bg-[#070F2B] border border-emerald-500/20 rounded-2xl p-5 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs uppercase font-extrabold tracking-wider text-emerald-500 dark:text-emerald-400">
              Live on Homepage
            </p>
            <h3 className="font-['Outfit'] text-2xl font-black text-foreground mt-1">
              {approvedCount}
            </h3>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 dark:text-emerald-400">
            <FaCheckCircle className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white dark:bg-[#070F2B] border border-amber-500/20 rounded-2xl p-5 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs uppercase font-extrabold tracking-wider text-amber-500 dark:text-amber-400">
              Pending Coach Review
            </p>
            <h3 className="font-['Outfit'] text-2xl font-black text-foreground mt-1">
              {pendingCount}
            </h3>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 dark:text-amber-400">
            <FaHourglassHalf className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* 3. Testimonials Grid or Empty State */}
      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center gap-3">
          <FaSpinner className="w-8 h-8 text-active animate-spin" />
          <p className="text-sm font-['Inter'] text-[#535C91] dark:text-[#9290C3]">Loading your athlete testimonials...</p>
        </div>
      ) : testimonials.length === 0 ? (
        <div className="py-20 rounded-3xl bg-white dark:bg-[#070F2B] border border-brand-500/15 flex flex-col items-center justify-center text-center p-8 shadow-xs">
          <div className="w-16 h-16 rounded-3xl bg-active/10 border border-active/20 flex items-center justify-center text-active mb-4">
            <FaQuoteLeft className="w-7 h-7" />
          </div>
          <h3 className="font-['Outfit'] font-bold text-xl text-foreground mb-2">
            No Testimonials Submitted Yet
          </h3>
          <p className="font-['Inter'] text-sm text-[#535C91] dark:text-[#9290C3] max-w-md mb-6">
            Share how our certified coaches, facilities, or workout protocols elevated your fitness.
            Your story will be verified and published to the FlexPulse homepage.
          </p>
          <button
            onClick={() => {
              setTestimonialToEdit(null);
              setModalOpen(true);
            }}
            className="px-6 py-3 rounded-2xl bg-[#ff2a55] hover:opacity-90 active:scale-95 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-sm cursor-pointer"
          >
            <FaPlus className="w-3.5 h-3.5" />
            <span>Submit Your First Testimonial</span>
          </button>
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
                className="bg-white dark:bg-[#070F2B] border border-brand-500/15 hover:border-brand-500/30 rounded-3xl p-6 flex flex-col justify-between shadow-xs transition-all relative overflow-hidden group"
              >
                {/* Status Pill Badge */}
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
                        <span>Revision Needed</span>
                      </>
                    ) : (
                      <>
                        <FaHourglassHalf className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                        <span>Pending Approval</span>
                      </>
                    )}
                  </span>

                  {/* Stars Rating */}
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
                  <div className="mb-3.5">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-active/10 border border-active/20 text-active text-xs font-bold">
                      <FaTrophy className="w-3 h-3 text-active shrink-0" />
                      <span>{item.achievement}</span>
                    </span>
                  </div>
                )}

                {/* Quote Body */}
                <p className="text-xs sm:text-sm font-['Inter'] text-foreground/90 leading-relaxed italic mb-5 line-clamp-4">
                  &ldquo;{item.quote}&rdquo;
                </p>

                {/* Discipline & Tenure Meta */}
                <div className="pt-4 border-t border-brand-500/10 flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1.5 text-xs text-[#535C91] dark:text-[#9290C3]">
                    <FaDumbbell className="w-3 h-3 text-active" />
                    <span>{item.discipline || "General Fitness"}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-[#535C91] dark:text-[#9290C3]">
                    <FaClock className="w-3 h-3" />
                    <span>{item.tenure || "Active"}</span>
                  </div>
                </div>

                {/* Author Info + Action Buttons */}
                <div className="flex items-center justify-between pt-3 border-t border-brand-500/10">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full overflow-hidden relative border border-brand-500/20 bg-slate-100 dark:bg-black/30">
                      <Image
                        src={item.userImage || user?.image || "https://prio.co.in/avatar.png"}
                        alt={item.name || "Member"}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-['Outfit'] font-bold text-xs text-foreground">
                        {item.name || "Athlete Member"}
                      </h4>
                      <p className="text-[10px] text-[#535C91] dark:text-[#9290C3] line-clamp-1">
                        {item.role || "Member"}
                      </p>
                    </div>
                  </div>

                  {/* Edit / Delete (Member only own) */}
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
                      disabled={deletingId === item._id}
                      title="Delete Testimonial"
                      className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 dark:text-rose-400 hover:text-rose-600 dark:hover:text-rose-300 transition-all cursor-pointer disabled:opacity-50"
                    >
                      {deletingId === item._id ? (
                        <FaSpinner className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <FaTrash className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Modal for Create/Edit */}
      <TestimonialModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        testimonialToEdit={testimonialToEdit}
        onSuccess={() => setRefreshKey((k) => k + 1)}
      />
    </div>
  );
}
