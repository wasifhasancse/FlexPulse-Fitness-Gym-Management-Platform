"use client";

import { createForumPost, updateForumPost } from "@/lib/api/getForumPosts";
import { authClient } from "@/lib/auth-client";
import { imageUpload } from "@/lib/imageUpload";
import { toast } from "@heroui/react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  FaCheckCircle,
  FaClock,
  FaFileAlt,
  FaImage,
  FaInfoCircle,
  FaPaperPlane,
  FaSpinner,
  FaTag,
  FaTimes,
  FaTrash,
} from "react-icons/fa";

const CATEGORIES = [
  "Strength & Conditioning",
  "Nutrition & Macros",
  "HIIT & Cardio",
  "Mobility & Recovery",
  "Coaching Science",
  "General Fitness",
];

export default function ForumPostModal({
  isOpen,
  onClose,
  postToEdit = null,
  onSuccess,
}) {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const role = (user?.role || "member").toLowerCase();

  const isEditing = Boolean(postToEdit);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Strength & Conditioning");
  const [readTime, setReadTime] = useState("3 min read");
  const [image, setImage] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Sync state when editing a post
  useEffect(() => {
    const timer = setTimeout(() => {
      if (postToEdit) {
        setTitle(postToEdit.title || "");
        setDescription(postToEdit.description || "");
        setCategory(postToEdit.category || "Strength & Conditioning");
        setReadTime(postToEdit.readTime || "3 min read");
        setImage(postToEdit.image || "");
      } else {
        setTitle("");
        setDescription("");
        setCategory("Strength & Conditioning");
        setReadTime("3 min read");
        setImage("");
      }
    }, 0);
    return () => clearTimeout(timer);
  }, [postToEdit, isOpen]);

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

    setUploadingImage(true);
    try {
      const uploadedUrl = await imageUpload(file);
      if (uploadedUrl) {
        setImage(uploadedUrl);
        toast.success("Cover image uploaded!");
      }
    } catch (err) {
      console.error("Image upload failed:", err);
      toast.danger("Failed to upload image. Please try again or provide a direct URL.");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      toast.danger("Title and content are required.");
      return;
    }

    setSubmitting(true);
    try {
      const { data: tokenData } = await authClient.token();
      const token = tokenData?.token;
      if (!token) {
        toast.danger("Session expired. Please sign in again.");
        return;
      }

      const payload = {
        title: title.trim(),
        description: description.trim(),
        category,
        readTime,
        image: image || "",
        userId: user?.id,
        userName: user?.name || "Athlete",
        userEmail: user?.email,
        userRole: role,
        userImage: user?.image || "",
      };

      if (isEditing) {
        const res = await updateForumPost(postToEdit._id, payload, token);
        if (res?.success || res?.acknowledged || res?.result) {
          toast.success("Community post updated successfully!");
          onSuccess?.();
          onClose();
        } else {
          toast.danger(res?.message || "Failed to update post.");
        }
      } else {
        const res = await createForumPost(payload, token);
        if (res?.insertedId || res?._id || res?.success) {
          if (role === "member") {
            toast.success("Post submitted! It will appear once approved by a coach or admin.");
          } else {
            toast.success("Article published live to Community Forum!");
          }
          onSuccess?.();
          onClose();
        } else {
          toast.danger(res?.message || "Failed to publish post.");
        }
      }
    } catch (err) {
      console.error("Post submission error:", err);
      toast.danger("An error occurred while saving the post.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
          {/* Backdrop blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-xs transition-opacity"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 15 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl bg-white dark:bg-[#070F2B] border border-brand-500/20 rounded-3xl shadow-md overflow-hidden z-10 my-auto flex flex-col max-h-[92vh]"
          >
            {/* Header */}
            <div className="p-5 sm:p-6 border-b border-brand-500/15 flex items-center justify-between">
              <div>
                <h3 className="font-['Outfit'] text-xl sm:text-2xl font-black text-foreground tracking-tight flex items-center gap-2">
                  <FaFileAlt className="text-active w-5 h-5" />
                  <span>{isEditing ? "Edit Community Article" : "Compose Community Article"}</span>
                </h3>
                <p className="font-['Inter'] text-xs text-[#535C91] dark:text-[#9290C3] mt-0.5">
                  Share workout protocols, scientific insights, and questions with the club
                </p>
              </div>

              <button
                onClick={onClose}
                className="w-8 h-8 rounded-xl bg-black/5 dark:bg-white/5 border border-brand-500/15 flex items-center justify-center text-[#535C91] dark:text-[#9290C3] hover:text-active hover:border-active/40 transition-colors cursor-pointer"
              >
                <FaTimes className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Approval Workflow Notice */}
            <div className="px-5 sm:px-6 pt-4">
              {role === "member" ? (
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs font-['Inter'] text-amber-600 dark:text-amber-400">
                  <FaInfoCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>
                    <strong>Member Submission:</strong> Your post will be queued for review. A certified trainer or administrator will approve it before publication to the Community Forum.
                  </span>
                </div>
              ) : (
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs font-['Inter'] text-emerald-600 dark:text-emerald-400">
                  <FaCheckCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>
                    <strong>Verified {role === "admin" ? "Admin" : "Coach"} Authority:</strong> Your post will be automatically published live immediately upon creation.
                  </span>
                </div>
              )}
            </div>

            {/* Form Body */}
            <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4 overflow-y-auto flex-1 custom-scrollbar">
              {/* Title */}
              <div className="space-y-1.5">
                <label className="block text-xs font-['Outfit'] font-bold text-foreground uppercase tracking-wider">
                  Article Title <span className="text-active">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Carb Cycling & Macro Timing: Optimizing Insulin Sensitivity"
                  className="w-full px-4 py-2.5 bg-black/5 dark:bg-white/5 border border-brand-500/20 focus:border-active rounded-xl text-foreground font-['Outfit'] text-sm focus:outline-none transition-all placeholder-[#535C91]/60"
                />
              </div>

              {/* Category & Read Time Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-['Outfit'] font-bold text-foreground uppercase tracking-wider flex items-center gap-1.5">
                    <FaTag className="w-3 h-3 text-active" />
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-black/5 dark:bg-[#090814] border border-brand-500/20 focus:border-active rounded-xl text-foreground font-['Inter'] text-xs focus:outline-none transition-all"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat} className="bg-white dark:bg-[#070F2B]">
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-['Outfit'] font-bold text-foreground uppercase tracking-wider flex items-center gap-1.5">
                    <FaClock className="w-3 h-3 text-active" />
                    Estimated Read Time
                  </label>
                  <input
                    type="text"
                    value={readTime}
                    onChange={(e) => setReadTime(e.target.value)}
                    placeholder="e.g. 3 min read"
                    className="w-full px-3.5 py-2.5 bg-black/5 dark:bg-white/5 border border-brand-500/20 focus:border-active rounded-xl text-foreground font-['Inter'] text-xs focus:outline-none transition-all"
                  />
                </div>
              </div>

              {/* Cover Image */}
              <div className="space-y-1.5">
                <label className="block text-xs font-['Outfit'] font-bold text-foreground uppercase tracking-wider flex items-center gap-1.5">
                  <FaImage className="w-3 h-3 text-active" />
                  Cover Photo
                </label>

                {image ? (
                  <div className="relative w-full h-36 rounded-2xl overflow-hidden border border-brand-500/20 group">
                    <Image
                      src={image}
                      alt="Cover Preview"
                      fill
                      unoptimized
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                      <button
                        type="button"
                        onClick={() => setImage("")}
                        className="px-3 py-1.5 bg-rose-500 text-white rounded-lg text-xs font-['Outfit'] font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <FaTrash className="w-3 h-3" />
                        Remove
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col sm:flex-row items-center gap-2.5">
                    <label className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-active/10 hover:bg-active/20 text-active border border-active/30 text-xs font-['Outfit'] font-bold flex items-center justify-center gap-2 cursor-pointer transition-all">
                      {uploadingImage ? (
                        <>
                          <FaSpinner className="w-3.5 h-3.5 animate-spin" />
                          <span>Uploading...</span>
                        </>
                      ) : (
                        <>
                          <FaImage className="w-3.5 h-3.5" />
                          <span>Upload Image</span>
                        </>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageFileChange}
                        disabled={uploadingImage}
                      />
                    </label>
                    <span className="text-xs text-[#535C91] dark:text-[#9290C3] font-['Inter']">
                      or paste URL:
                    </span>
                    <input
                      type="url"
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                      placeholder="https://images.unsplash.com/..."
                      className="flex-1 w-full px-3.5 py-2.5 bg-black/5 dark:bg-white/5 border border-brand-500/20 focus:border-active rounded-xl text-foreground font-['Inter'] text-xs focus:outline-none transition-all placeholder-[#535C91]/60"
                    />
                  </div>
                )}
              </div>

              {/* Description Content */}
              <div className="space-y-1.5">
                <label className="block text-xs font-['Outfit'] font-bold text-foreground uppercase tracking-wider">
                  Article Content & Biomechanical Protocol <span className="text-active">*</span>
                </label>
                <textarea
                  required
                  rows={6}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Share comprehensive training insights, detailed macro calculations, rest intervals, or specific fitness questions..."
                  className="w-full px-4 py-3 bg-black/5 dark:bg-white/5 border border-brand-500/20 focus:border-active rounded-xl text-foreground font-['Inter'] text-xs sm:text-sm focus:outline-none transition-all placeholder-[#535C91]/60 leading-relaxed custom-scrollbar"
                />
              </div>

              {/* Modal Footer Actions */}
              <div className="pt-4 border-t border-brand-500/15 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl border border-brand-500/20 hover:border-active/40 text-[#535C91] dark:text-[#9290C3] hover:text-foreground text-xs font-['Outfit'] font-bold transition-all cursor-pointer"
                >
                  Cancel
                </button>

                {/* Primary CTA with Kinetic Shimmer */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="relative overflow-hidden inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-btn-bg text-btn-text text-xs font-['Outfit'] font-extrabold rounded-xl shadow-xs hover:shadow-md hover:brightness-105 active:scale-95 transition-all duration-200 border border-white/20 group cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <span className="absolute inset-0 w-1/2 h-full bg-linear-to-r from-transparent via-white/20 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-[250%] transition-transform duration-700 pointer-events-none" />
                  {submitting ? (
                    <>
                      <FaSpinner className="w-3.5 h-3.5 animate-spin text-btn-text" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <FaPaperPlane className="w-3.5 h-3.5 text-btn-text" />
                      <span>{isEditing ? "Update Article" : "Submit Article"}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
