"use client";

import { authClient } from "@/lib/auth-client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "@heroui/react";
import {
  FaAward,
  FaCalendarAlt,
  FaCheckCircle,
  FaClock,
  FaFileAlt,
  FaPaperPlane,
  FaShieldAlt,
  FaTag,
  FaUsers,
} from "react-icons/fa";

const specialties = [
  "Select a specialty",
  "Yoga",
  "Weights",
  "Cardio",
  "Pilates",
  "HIIT",
  "Stretching",
  "CrossFit",
  "Zumba",
  "Meditation",
  "Nutrition",
  "Strength Training",
  "Functional Fitness",
  "Dance Fitness",
  "Bootcamp",
  "Other",
];

export default function ApplyTrainerPage() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [applicationStatus, setApplicationStatus] = useState(null); // null | "pending" | "approved" | "rejected"
  const [checkLoading, setCheckLoading] = useState(true);

  const [formData, setFormData] = useState({
    experience: "",
    specialty: "",
    bio: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Set page title
  useEffect(() => {
    document.title = "Apply as Trainer | FlexPulse";
  }, []);

  useEffect(() => {
    if (!user?.id) return;
    const checkApplication = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/trainer-application/check?userId=${user.id}`,
        );
        const data = await res.json();
        if (data.hasApplied) {
          setApplicationStatus(data.status);
        }
      } catch (err) {
        console.error("Failed to check trainer application:", err);
      } finally {
        setCheckLoading(false);
      }
    };
    checkApplication();
  }, [user]);

  const isFormValid =
    formData.experience.trim() !== "" &&
    formData.specialty !== "" &&
    formData.specialty !== "Select a specialty" &&
    formData.bio.trim() !== "";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    setIsSubmitting(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/trainer-application`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: user?.id,
            userName: user?.name,
            userEmail: user?.email,
            experience: formData.experience,
            specialty: formData.specialty,
            bio: formData.bio,
            status: "Pending",
            appliedAt: new Date(),
          }),
        },
      );

      if (res.ok) {
        toast.success("Application submitted successfully!");
        setApplicationStatus("pending");
      } else {
        toast.error("Failed to submit application. Please try again.");
      }
    } catch (err) {
      toast.error("An error occurred. Please try again.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (checkLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-active border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Submitted application screen
  if (applicationStatus) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="max-w-xl mx-auto py-12 px-4 sm:px-0"
      >
        <div className="bg-white dark:bg-brand-800/20 rounded-2xl shadow-card border border-brand-500/15 dark:border-brand-500/20 p-8 md:p-12 text-center flex flex-col items-center gap-6">
          {/* Status Icon */}
          <div>
            {applicationStatus === "pending" && (
              <div className="w-20 h-20 rounded-full bg-amber-500/10 flex items-center justify-center">
                <FaClock className="w-10 h-10 text-amber-500" />
              </div>
            )}
            {applicationStatus === "approved" && (
              <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center">
                <FaCheckCircle className="w-10 h-10 text-emerald-500" />
              </div>
            )}
            {applicationStatus === "rejected" && (
              <div className="w-20 h-20 rounded-full bg-rose-500/10 flex items-center justify-center">
                <FaAward className="w-10 h-10 text-rose-500" />
              </div>
            )}
          </div>

          {/* Status Text */}
          {applicationStatus === "pending" && (
            <>
              <h2 className="font-['Outfit'] text-2xl font-bold text-foreground">
                Application Submitted!
              </h2>
              <p className="font-sans text-[#535C91] dark:text-[#9290C3] max-w-sm">
                Your trainer application is under review. We&apos;ll notify you once
                it&apos;s been processed.
              </p>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 rounded-full border border-amber-500/20">
                <FaClock className="w-4 h-4 text-amber-500" />
                <span className="font-sans text-sm font-semibold text-amber-600 dark:text-amber-400">
                  Status: Pending Review
                </span>
              </div>
            </>
          )}

          {applicationStatus === "approved" && (
            <>
              <h2 className="font-['Outfit'] text-2xl font-bold text-foreground">
                Congratulations! 🎉
              </h2>
              <p className="font-sans text-[#535C91] dark:text-[#9290C3] max-w-sm">
                Your application has been approved! You are now a certified
                FlexPulse trainer.
              </p>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 rounded-full border border-emerald-500/20">
                <FaCheckCircle className="w-4 h-4 text-emerald-500" />
                <span className="font-sans text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                  Status: Approved ✅
                </span>
              </div>
            </>
          )}

          {applicationStatus === "rejected" && (
            <>
              <h2 className="font-['Outfit'] text-2xl font-bold text-foreground">
                Application Not Approved
              </h2>
              <p className="font-sans text-[#535C91] dark:text-[#9290C3] max-w-sm">
                Unfortunately your application was not approved this time.
                Please contact support for more information.
              </p>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-rose-500/10 rounded-full border border-rose-500/20">
                <span className="font-sans text-sm font-semibold text-rose-600 dark:text-rose-400">
                  Status: Rejected ❌
                </span>
              </div>
            </>
          )}

          <div className="mt-4 w-full">
            <Link
              href="/dashboard/member"
              className="inline-flex items-center justify-center gap-2 w-full px-8 py-3.5 bg-btn-bg text-btn-text font-sans font-bold rounded-xl hover:opacity-95 transition-all shadow-md"
            >
              Go to Overview
            </Link>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-4xl mx-auto space-y-8 px-4 sm:px-0"
    >
      {/* Header */}
      <div>
        <h1 className="font-['Outfit'] text-3xl md:text-4xl font-bold text-foreground tracking-wide">
          Apply as Trainer
        </h1>
        <p className="font-sans text-[#535C91] dark:text-[#9290C3] mt-2 max-w-2xl">
          Join our elite team of fitness professionals and share your expertise
          with the FlexPulse community.
        </p>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          {
            icon: FaShieldAlt,
            title: "FlexPulse Certified",
            desc: "Global exposure & premium facilities.",
          },
          {
            icon: FaAward,
            title: "Professional Quality",
            desc: "Empower our community.",
          },
          {
            icon: FaUsers,
            title: "Community Impact",
            desc: "Inspire & transform lives.",
          },
        ].map((card) => (
          <div
            key={card.title}
            className="bg-white dark:bg-brand-800/20 rounded-2xl p-5 shadow-card border border-brand-500/15 dark:border-brand-500/20 flex items-center gap-3.5 hover:-translate-y-0.5 transition-all duration-300"
          >
            <div className="p-3 bg-btn-bg/10 rounded-xl shrink-0">
              <card.icon className="w-5 h-5 text-active" />
            </div>
            <div>
              <p className="font-sans font-bold text-foreground text-sm">
                {card.title}
              </p>
              <p className="font-sans text-xs text-[#535C91] dark:text-[#9290C3] mt-0.5">
                {card.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Form */}
      <div className="bg-white dark:bg-brand-800/20 rounded-2xl shadow-card border border-brand-500/15 dark:border-brand-500/20 p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Experience */}
          <div>
            <label
              htmlFor="experience"
              className="font-sans text-sm font-bold text-foreground mb-2.5 flex items-center gap-2"
            >
              <FaCalendarAlt className="text-active w-4 h-4" />
              Years of Experience <span className="text-rose-500">*</span>
            </label>
            <input
              id="experience"
              name="experience"
              type="number"
              min="0"
              step="0.5"
              value={formData.experience}
              onChange={handleChange}
              placeholder="e.g. 5"
              className="w-full px-4 py-3 bg-brand-500/5 dark:bg-brand-800/40 border border-brand-500/20 dark:border-brand-500/30 rounded-xl text-foreground placeholder-[#535C91]/50 dark:placeholder-[#9290C3]/50 focus:outline-none focus:border-active focus:ring-1 focus:ring-active transition-all font-sans text-sm shadow-inner"
              required
            />
          </div>

          {/* Specialty */}
          <div>
            <label
              htmlFor="specialty"
              className="font-sans text-sm font-bold text-foreground mb-2.5 flex items-center gap-2"
            >
              <FaTag className="text-active w-4 h-4" />
              Primary Specialty <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <select
                id="specialty"
                name="specialty"
                value={formData.specialty}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-brand-500/5 dark:bg-brand-800/40 border border-brand-500/20 dark:border-brand-500/30 rounded-xl text-foreground focus:outline-none focus:border-active focus:ring-1 focus:ring-active transition-all font-sans text-sm appearance-none shadow-inner"
                required
              >
                {specialties.map((spec) => (
                  <option key={spec} value={spec} className="bg-background text-foreground">
                    {spec}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-[#535C91] dark:text-[#9290C3]">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div>
            <label
              htmlFor="bio"
              className="font-sans text-sm font-bold text-foreground mb-2.5 flex items-center gap-2"
            >
              <FaFileAlt className="text-active w-4 h-4" />
              Professional Bio <span className="text-rose-500">*</span>
            </label>
            <textarea
              id="bio"
              name="bio"
              rows="5"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Tell us about your fitness journey, philosophy, and previous experience..."
              className="w-full px-4 py-3 bg-brand-500/5 dark:bg-brand-800/40 border border-brand-500/20 dark:border-brand-500/30 rounded-xl text-foreground placeholder-[#535C91]/50 dark:placeholder-[#9290C3]/50 focus:outline-none focus:border-active focus:ring-1 focus:ring-active transition-all font-sans text-sm resize-none shadow-inner"
              required
            />
          </div>

          <button
            type="submit"
            disabled={!isFormValid || isSubmitting}
            className={`w-full py-3.5 font-sans font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-sm cursor-pointer ${
              isFormValid && !isSubmitting
                ? "bg-btn-bg text-btn-text hover:opacity-95"
                : "bg-brand-500/10 text-muted cursor-not-allowed opacity-55"
            }`}
          >
            <FaPaperPlane className="w-4 h-4" />
            {isSubmitting ? "Submitting..." : "SUBMIT APPLICATION"}
          </button>
        </form>
      </div>
    </motion.div>
  );
}
