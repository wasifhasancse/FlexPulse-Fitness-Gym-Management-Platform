"use client";

import { createTestimonial, updateTestimonial } from "@/lib/api/getTestimonials";
import { authClient } from "@/lib/auth-client";
import { imageUpload } from "@/lib/imageUpload";
import { toast } from "@heroui/react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  FaCheckCircle,
  FaClock,
  FaDumbbell,
  FaImage,
  FaInfoCircle,
  FaQuoteLeft,
  FaSpinner,
  FaStar,
  FaTimes,
  FaTrophy,
  FaUser,
} from "react-icons/fa";

const DISCIPLINES = [
  { name: "Body Recomposition", tagColor: "bg-purple-500/10 text-purple-500 dark:text-purple-400 border-purple-500/20" },
  { name: "Olympic Lifting & Hypertrophy", tagColor: "bg-active/10 text-active border-active/20" },
  { name: "Metabolic Conditioning", tagColor: "bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 border-emerald-500/20" },
  { name: "Vinyasa & Fascial Release", tagColor: "bg-amber-500/10 text-amber-500 dark:text-amber-400 border-amber-500/20" },
  { name: "Combat Boxing & Turf Power", tagColor: "bg-rose-500/10 text-rose-500 dark:text-rose-400 border-rose-500/20" },
  { name: "Aerobic Engine & Conditioning", tagColor: "bg-cyan-500/10 text-cyan-500 dark:text-cyan-400 border-cyan-500/20" },
  { name: "Mobility & Flow", tagColor: "bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 border-indigo-500/20" },
];

export default function TestimonialModal({
  isOpen,
  onClose,
  testimonialToEdit = null,
  onSuccess,
}) {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const userRole = (user?.role || "member").toLowerCase();

  const [quote, setQuote] = useState("");
  const [discipline, setDiscipline] = useState(DISCIPLINES[0].name);
  const [achievement, setAchievement] = useState("");
  const [tenure, setTenure] = useState("6 Months Active");
  const [memberTitle, setMemberTitle] = useState("Dedicated Athlete Member");
  const [rating, setRating] = useState(5);
  const [userImage, setUserImage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Sync state when editing or opening
  useEffect(() => {
    const timer = setTimeout(() => {
      if (testimonialToEdit) {
        setQuote(testimonialToEdit.quote || "");
        setDiscipline(testimonialToEdit.discipline || DISCIPLINES[0].name);
        setAchievement(testimonialToEdit.achievement || "");
        setTenure(testimonialToEdit.tenure || "6 Months Active");
        setMemberTitle(testimonialToEdit.role || "Dedicated Athlete Member");
        setRating(testimonialToEdit.rating || 5);
        setUserImage(testimonialToEdit.userImage || user?.image || "");
      } else {
        setQuote("");
        setDiscipline(DISCIPLINES[0].name);
        setAchievement("");
        setTenure("6 Months Active");
        setMemberTitle("Dedicated Athlete Member");
        setRating(5);
        setUserImage(user?.image || "");
      }
    }, 0);
    return () => clearTimeout(timer);
  }, [testimonialToEdit, isOpen, user?.image]);

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleImageFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploading(true);
      const uploadedUrl = await imageUpload(file);
      setUserImage(uploadedUrl);
      toast.success("Profile photo uploaded!");
    } catch (err) {
      console.error("Image upload failed:", err);
      toast.danger("Could not upload profile photo. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!quote.trim()) {
      toast.warning("Please share your athletic journey or feedback.");
      return;
    }

    setSubmitting(true);
    try {
      const tokenRes = await authClient.token();
      const token = tokenRes?.data?.token;
      if (!token) {
        toast.danger("Authentication required. Please log in.");
        setSubmitting(false);
        return;
      }

      const selectedObj = DISCIPLINES.find((d) => d.name === discipline) || DISCIPLINES[0];

      const payload = {
        quote: quote.trim(),
        discipline,
        achievement: achievement.trim() || "Measurable Milestone Achieved",
        tenure: tenure.trim() || "Active Member",
        memberTitle: memberTitle.trim() || "Athlete Member",
        rating,
        tagColor: selectedObj.tagColor,
        userImage: userImage || user?.image || "https://prio.co.in/avatar.png",
        name: user?.name || "Athlete Member",
        userRole: "member",
        userId: user?.id,
        userEmail: user?.email,
      };

      if (testimonialToEdit?._id) {
        // Edit mode
        const res = await updateTestimonial(testimonialToEdit._id, payload, token);
        if (res.success || res.acknowledged) {
          toast.success("Testimonial updated successfully!");
          onSuccess?.();
          onClose();
        } else {
          toast.danger(res.message || "Failed to update testimonial");
        }
      } else {
        // Create mode (Member only)
        const res = await createTestimonial(payload, token);
        if (res.success || res.insertedId) {
          toast.success(
            "Testimonial submitted! It will appear on the Homepage after Coach/Admin approval."
          );
          onSuccess?.();
          onClose();
        } else {
          toast.danger(res.message || "Failed to submit testimonial");
        }
      }
    } catch (err) {
      console.error("Testimonial submission error:", err);
      toast.danger("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/75 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-2xl bg-white dark:bg-[#070F2B] border border-slate-200 dark:border-[#535C91]/30 rounded-3xl shadow-2xl overflow-hidden z-10 text-foreground dark:text-white my-8 max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-200/80 dark:border-[#535C91]/20 bg-slate-50/80 dark:bg-[#090814]/60">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-active/10 border border-active/20 flex items-center justify-center text-active">
                <FaQuoteLeft className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-['Outfit'] font-bold text-xl text-foreground dark:text-white">
                  {testimonialToEdit ? "Edit Athlete Testimonial" : "Share Your Member Voice"}
                </h3>
                <p className="text-xs text-[#535C91] dark:text-[#9290C3] font-['Inter'] mt-0.5">
                  {testimonialToEdit
                    ? "Modify testimonial details and milestone achievements"
                    : "Inspire fellow athletes with your verified transformation story"}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-[#535C91] dark:text-[#9290C3] hover:text-foreground dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
            >
              <FaTimes className="w-5 h-5" />
            </button>
          </div>

          {/* Form Body */}
          <form onSubmit={handleSubmit} className="p-6 space-y-5 overflow-y-auto custom-scrollbar">
            {/* Approval Info Alert */}
            {userRole === "member" && !testimonialToEdit && (
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-active/10 border border-active/20 text-xs text-foreground/80 dark:text-[#9290C3]">
                <FaInfoCircle className="w-4 h-4 text-active shrink-0 mt-0.5" />
                <p>
                  <strong className="text-foreground dark:text-white">Coach & Admin Moderation:</strong> To ensure authentic athletic integrity, member stories undergo verification. Once approved by a Trainer or Admin, your story will shine in the <span className="text-active font-semibold">Homepage &ldquo;Member Voices&rdquo;</span> spotlight!
                </p>
              </div>
            )}

            {/* Quote / Testimonial Story */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#535C91] dark:text-[#9290C3] mb-2">
                Your Athletic Story & Transformation <span className="text-active">*</span>
              </label>
              <textarea
                rows={4}
                required
                value={quote}
                onChange={(e) => setQuote(e.target.value)}
                placeholder="Describe your training experience, coaches who guided you, physiological milestones, or how FlexPulse changed your routine..."
                className="w-full px-4 py-3 bg-slate-50 dark:bg-[#090814]/80 border border-slate-200 dark:border-[#535C91]/30 rounded-2xl text-foreground dark:text-white placeholder-slate-400 dark:placeholder-[#535C91] text-sm focus:outline-none focus:border-active transition-all resize-none shadow-xs"
              />
            </div>

            {/* Discipline & Key Milestone Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Discipline */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#535C91] dark:text-[#9290C3] mb-2 flex items-center gap-1.5">
                  <FaDumbbell className="w-3.5 h-3.5 text-active" />
                  Primary Discipline
                </label>
                <select
                  value={discipline}
                  onChange={(e) => setDiscipline(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-[#090814]/80 border border-slate-200 dark:border-[#535C91]/30 rounded-2xl text-foreground dark:text-white text-sm focus:outline-none focus:border-active transition-all cursor-pointer shadow-xs"
                >
                  {DISCIPLINES.map((d) => (
                    <option key={d.name} value={d.name} className="bg-white dark:bg-[#070F2B] text-foreground dark:text-white">
                      {d.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Achievement / Key Metric */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#535C91] dark:text-[#9290C3] mb-2 flex items-center gap-1.5">
                  <FaTrophy className="w-3.5 h-3.5 text-active" />
                  Key Milestone / Metric
                </label>
                <input
                  type="text"
                  value={achievement}
                  onChange={(e) => setAchievement(e.target.value)}
                  placeholder="e.g. -24 lbs Fat & +7 lbs Muscle"
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-[#090814]/80 border border-slate-200 dark:border-[#535C91]/30 rounded-2xl text-foreground dark:text-white placeholder-slate-400 dark:placeholder-[#535C91] text-sm focus:outline-none focus:border-active transition-all shadow-xs"
                />
              </div>
            </div>

            {/* Tenure & Title Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Tenure */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#535C91] dark:text-[#9290C3] mb-2 flex items-center gap-1.5">
                  <FaClock className="w-3.5 h-3.5 text-active" />
                  Membership Tenure
                </label>
                <input
                  type="text"
                  value={tenure}
                  onChange={(e) => setTenure(e.target.value)}
                  placeholder="e.g. 14 Months Active"
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-[#090814]/80 border border-slate-200 dark:border-[#535C91]/30 rounded-2xl text-foreground dark:text-white placeholder-slate-400 dark:placeholder-[#535C91] text-sm focus:outline-none focus:border-active transition-all shadow-xs"
                />
              </div>

              {/* Member Title / Subtitle */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#535C91] dark:text-[#9290C3] mb-2 flex items-center gap-1.5">
                  <FaUser className="w-3.5 h-3.5 text-active" />
                  Athlete Tag / Profession
                </label>
                <input
                  type="text"
                  value={memberTitle}
                  onChange={(e) => setMemberTitle(e.target.value)}
                  placeholder="e.g. Corporate Executive & Member"
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-[#090814]/80 border border-slate-200 dark:border-[#535C91]/30 rounded-2xl text-foreground dark:text-white placeholder-slate-400 dark:placeholder-[#535C91] text-sm focus:outline-none focus:border-active transition-all shadow-xs"
                />
              </div>
            </div>

            {/* Rating Stars & Profile Avatar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center pt-1">
              {/* Rating */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#535C91] dark:text-[#9290C3] mb-2">
                  Overall Experience Rating
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="p-1 text-xl transition-transform hover:scale-110 cursor-pointer"
                    >
                      <FaStar
                        className={star <= rating ? "text-amber-400" : "text-black/15 dark:text-white/20"}
                      />
                    </button>
                  ))}
                  <span className="text-sm font-bold text-foreground dark:text-white ml-2">{rating}.0 / 5.0</span>
                </div>
              </div>

              {/* Photo Upload / Avatar */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#535C91] dark:text-[#9290C3] mb-2 flex items-center gap-1.5">
                  <FaImage className="w-3.5 h-3.5 text-active" />
                  Athlete Photo
                </label>
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full overflow-hidden border border-slate-200 dark:border-[#535C91]/40 shrink-0 bg-slate-100 dark:bg-[#090814] relative">
                    <Image
                      src={userImage || user?.image || "https://prio.co.in/avatar.png"}
                      alt="Athlete Avatar"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <label className="flex-1 cursor-pointer">
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 border border-slate-200 dark:border-[#535C91]/30 text-xs font-bold uppercase tracking-wider text-foreground dark:text-white transition-all">
                      {uploading ? (
                        <>
                          <FaSpinner className="w-3 h-3 animate-spin text-active" />
                          Uploading...
                        </>
                      ) : (
                        "Upload Photo"
                      )}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageFileChange}
                      disabled={uploading}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200/80 dark:border-[#535C91]/20">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl border border-slate-300 dark:border-[#535C91]/30 text-xs font-bold uppercase tracking-wider text-[#535C91] dark:text-[#9290C3] hover:text-foreground dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting || uploading}
                className="px-6 py-2.5 rounded-xl bg-[#ff2a55] text-white text-xs font-bold uppercase tracking-wider shadow-sm hover:shadow-md hover:opacity-95 active:scale-95 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {submitting ? (
                  <>
                    <FaSpinner className="w-3.5 h-3.5 animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <FaCheckCircle className="w-3.5 h-3.5" />
                    <span>{testimonialToEdit ? "Update Story" : "Submit Testimonial"}</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
