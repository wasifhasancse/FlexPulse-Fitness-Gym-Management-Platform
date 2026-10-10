"use client";

import { authClient } from "@/lib/auth-client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "@heroui/react";
import DashboardPageHeader from "@/components/Dashboard/common/DashboardPageHeader";
import {
  FaAward,
  FaCalendarAlt,
  FaCheck,
  FaCheckCircle,
  FaClock,
  FaDollarSign,
  FaDumbbell,
  FaFileAlt,
  FaPaperPlane,
  FaShieldAlt,
  FaTag,
  FaUserCircle,
  FaUserGraduate,
  FaUsers,
  FaArrowRight,
  FaExclamationCircle,
} from "react-icons/fa";

const specialties = [
  "Select a specialty",
  "Strength Training",
  "HIIT & Conditioning",
  "Cardio & Endurance",
  "Yoga & Flexibility",
  "CrossFit & Functional",
  "Pilates & Posture",
  "Boxing & Combat",
  "Weight Loss & Nutrition",
  "Calisthenics & Agility",
  "Zumba & Dance Fitness",
  "Rehabilitation & Mobility",
  "Other",
];

const popularSpecialties = [
  "Strength Training",
  "HIIT & Conditioning",
  "Yoga & Flexibility",
  "CrossFit & Functional",
];

const experiencePresets = ["1", "3", "5", "8+"];

export default function ApplyTrainerPage() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [applicationStatus, setApplicationStatus] = useState(null); // null | "pending" | "approved" | "rejected"
  const [existingData, setExistingData] = useState(null);
  const [checkLoading, setCheckLoading] = useState(true);

  const [formData, setFormData] = useState({
    experience: "",
    specialty: "",
    bio: "",
  });
  const [pledgeAccepted, setPledgeAccepted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    document.title = "Apply as Trainer | FlexPulse Elite";
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
          setApplicationStatus(data.status?.toLowerCase() || "pending");
          setExistingData(data);
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
    parseFloat(formData.experience) >= 0 &&
    formData.specialty !== "" &&
    formData.specialty !== "Select a specialty" &&
    formData.bio.trim().length >= 25 &&
    pledgeAccepted;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectSpecialty = (spec) => {
    setFormData((prev) => ({ ...prev, specialty: spec }));
  };

  const handleSelectExpPreset = (exp) => {
    setFormData((prev) => ({ ...prev, experience: exp.replace("+", "") }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) {
      if (!pledgeAccepted) {
        toast.danger("Please accept the Coach Standards Pledge before submitting.");
      }
      return;
    }
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
        setExistingData({
          specialty: formData.specialty,
          experience: formData.experience,
          appliedAt: new Date(),
        });
      } else {
        toast.danger("Failed to submit application. Please try again.");
      }
    } catch (err) {
      toast.danger("An error occurred. Please try again.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (checkLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-3">
        <div className="w-10 h-10 border-3 border-active border-t-transparent rounded-full animate-spin" />
        <p className="font-['Inter'] text-xs font-semibold text-[#535C91] dark:text-[#9290C3] animate-pulse">
          Loading applicant status...
        </p>
      </div>
    );
  }

  // =========================================================================
  // SUBMITTED APPLICATION SCREEN (Pending / Approved / Rejected)
  // =========================================================================
  if (applicationStatus) {
    const isApproved = applicationStatus === "approved";
    const isRejected = applicationStatus === "rejected";
    const isPending = !isApproved && !isRejected;

    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full space-y-6 pb-12 text-left"
      >
        <DashboardPageHeader
          icon={FaUserGraduate}
          title="Trainer Candidacy Desk"
          subtitle="Real-time application verification & accreditation progress."
          badges={[
            <span
              key="status"
              className={`font-black uppercase tracking-wider text-[11px] ${
                isApproved
                  ? "text-emerald-500"
                  : isRejected
                  ? "text-rose-500"
                  : "text-amber-500"
              }`}
            >
              {applicationStatus}
            </span>,
          ]}
        />

        {/* Status Hero Card */}
        <div className="bg-white dark:bg-[#070F2B] rounded-2xl shadow-xs border border-brand-500/15 p-6 sm:p-8 space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-brand-500/15">
            <div className="flex items-start sm:items-center gap-4">
              <div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 border ${
                  isApproved
                    ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-500"
                    : isRejected
                    ? "bg-rose-500/10 border-rose-500/20 text-rose-500"
                    : "bg-amber-500/10 border-amber-500/20 text-amber-500"
                }`}
              >
                {isApproved && <FaCheckCircle className="w-8 h-8" />}
                {isRejected && <FaAward className="w-8 h-8" />}
                {isPending && <FaClock className="w-8 h-8 animate-pulse" />}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                      isApproved
                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                        : isRejected
                        ? "bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20"
                        : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20"
                    }`}
                  >
                    {isApproved ? "Accredited Coach" : isRejected ? "Review Concluded" : "Under Board Review"}
                  </span>
                  <span className="text-xs text-[#535C91] dark:text-[#9290C3]">
                    • Application Ref #{user?.id?.slice(-6).toUpperCase() || "74902B"}
                  </span>
                </div>

                <h2 className="font-['Outfit'] text-2xl sm:text-3xl font-black text-foreground mt-1">
                  {isApproved && "Congratulations, Coach! You are Accredited 🎉"}
                  {isRejected && "Application Decision: Not Approved"}
                  {isPending && "Your Coaching Application is Being Reviewed"}
                </h2>

                <p className="font-['Inter'] text-xs sm:text-sm text-[#535C91] dark:text-[#9290C3] mt-1.5 max-w-2xl leading-relaxed">
                  {isApproved &&
                    "Your trainer profile is activated. You now have full access to create classes, schedule training sessions, and moderate community articles."}
                  {isRejected &&
                    "Your candidacy was reviewed by our athletic committee. Unfortunately, your submission does not currently meet our requirements. Contact support for re-evaluation."}
                  {isPending &&
                    "Our master trainer evaluation board is assessing your certifications and coaching background. We typically process applications within 24 to 48 hours."}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              {isApproved ? (
                <Link
                  href="/dashboard/trainer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-btn-bg text-btn-text font-['Outfit'] font-black text-xs uppercase tracking-wider rounded-xl shadow-xs hover:shadow-md hover:brightness-105 active:scale-95 transition-all"
                >
                  <span>Launch Trainer Dashboard</span>
                  <FaArrowRight className="w-3.5 h-3.5" />
                </Link>
              ) : (
                <Link
                  href="/dashboard/member"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-brand-500/15 hover:border-active/50 text-[#535C91] dark:text-[#9290C3] hover:text-foreground text-xs font-['Inter'] font-bold transition-all shadow-xs"
                >
                  <span>Return to Overview</span>
                </Link>
              )}
            </div>
          </div>

          {/* Stepper Progress Pipeline */}
          <div className="space-y-3">
            <p className="text-[10px] font-black uppercase tracking-wider text-[#535C91] dark:text-[#9290C3] font-['Outfit']">
              Accreditation Timeline
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                  <FaCheckCircle className="w-4 h-4 shrink-0" />
                  <span className="font-['Outfit'] text-xs font-bold uppercase tracking-wider">1. Dossier Submitted</span>
                </div>
                <p className="text-[11px] text-[#535C91] dark:text-[#9290C3] mt-1 font-['Inter']">
                  Credentials & bio successfully filed into platform registry.
                </p>
              </div>

              <div
                className={`p-4 rounded-xl border ${
                  isPending
                    ? "bg-amber-500/10 border-amber-500/30"
                    : isApproved
                    ? "bg-emerald-500/10 border-emerald-500/20"
                    : "bg-black/5 dark:bg-white/5 border-brand-500/15"
                }`}
              >
                <div
                  className={`flex items-center gap-2 ${
                    isPending
                      ? "text-amber-500"
                      : isApproved
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-foreground"
                  }`}
                >
                  {isApproved ? (
                    <FaCheckCircle className="w-4 h-4 shrink-0" />
                  ) : (
                    <FaClock className="w-4 h-4 shrink-0" />
                  )}
                  <span className="font-['Outfit'] text-xs font-bold uppercase tracking-wider">2. Committee Review</span>
                </div>
                <p className="text-[11px] text-[#535C91] dark:text-[#9290C3] mt-1 font-['Inter']">
                  {isApproved
                    ? "Verified by Head of Fitness Operations."
                    : "Background verification currently in progress."}
                </p>
              </div>

              <div
                className={`p-4 rounded-xl border ${
                  isApproved
                    ? "bg-emerald-500/10 border-emerald-500/20"
                    : isRejected
                    ? "bg-rose-500/10 border-rose-500/20"
                    : "bg-black/5 dark:bg-white/5 border-brand-500/15 opacity-60"
                }`}
              >
                <div
                  className={`flex items-center gap-2 ${
                    isApproved
                      ? "text-emerald-600 dark:text-emerald-400"
                      : isRejected
                      ? "text-rose-500"
                      : "text-slate-400"
                  }`}
                >
                  {isApproved ? (
                    <FaCheckCircle className="w-4 h-4 shrink-0" />
                  ) : isRejected ? (
                    <FaExclamationCircle className="w-4 h-4 shrink-0" />
                  ) : (
                    <FaShieldAlt className="w-4 h-4 shrink-0" />
                  )}
                  <span className="font-['Outfit'] text-xs font-bold uppercase tracking-wider">3. Faculty Activation</span>
                </div>
                <p className="text-[11px] text-[#535C91] dark:text-[#9290C3] mt-1 font-['Inter']">
                  {isApproved
                    ? "Full trainer rights granted across all club portals."
                    : isRejected
                    ? "Submission archived. May reapply in 30 days."
                    : "Awaiting final administrative signoff."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // =========================================================================
  // APPLICATION INTAKE FORM (Brand new high-converting design)
  // =========================================================================
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full space-y-6 pb-12 text-left"
    >
      {/* 1. Header */}
      <DashboardPageHeader
        icon={FaUserGraduate}
        title="Apply as Trainer"
        subtitle="Step into leadership. Host certified sessions, mentor ambitious athletes, and earn competitive revenue."
        badges={[
          <span key="badge" className="text-active font-semibold">
            Coaching Admissions 2026
          </span>,
        ]}
      />

      {/* 2. Value Proposition Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          {
            icon: FaDollarSign,
            title: "Guaranteed Revenue",
            desc: "Retain high margin earnings with weekly automated Stripe payouts.",
            badge: "Top Payouts",
          },
          {
            icon: FaUsers,
            title: "Global Reach",
            desc: "Direct access to thousands of motivated athletes and gym members.",
            badge: "Active Roster",
          },
          {
            icon: FaShieldAlt,
            title: "Elite Accreditation",
            desc: "Verified coach badge on public schedule, classes, and articles.",
            badge: "Certified",
          },
        ].map((card) => (
          <div
            key={card.title}
            className="group relative bg-white dark:bg-[#070F2B] rounded-2xl p-5 border border-brand-500/15 shadow-xs hover:border-active/40 hover:-translate-y-0.5 transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-active/10 border border-active/20 flex items-center justify-center text-active group-hover:scale-110 transition-transform">
                <card.icon className="w-4 h-4" />
              </div>
              <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-black/5 dark:bg-white/5 text-[#535C91] dark:text-[#9290C3] font-['Outfit'] border border-brand-500/10">
                {card.badge}
              </span>
            </div>
            <h3 className="font-['Outfit'] font-black text-sm text-foreground">
              {card.title}
            </h3>
            <p className="font-['Inter'] text-xs text-[#535C91] dark:text-[#9290C3] mt-1 leading-relaxed">
              {card.desc}
            </p>
          </div>
        ))}
      </div>

      {/* 3. Applicant Snapshot + Application Form */}
      <div className="bg-white dark:bg-[#070F2B] rounded-2xl border border-brand-500/15 shadow-xs overflow-hidden">
        {/* Applicant Identity Banner */}
        <div className="p-5 sm:p-6 bg-black/2 dark:bg-white/2 border-b border-brand-500/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            {user?.image ? (
              <Image
                src={user.image}
                alt={user.name || "User"}
                width={48}
                height={48}
                className="w-12 h-12 rounded-xl object-cover border-2 border-active/40 shrink-0"
              />
            ) : (
              <div className="w-12 h-12 rounded-xl bg-active/10 border border-active/30 flex items-center justify-center text-active shrink-0">
                <FaUserCircle className="w-6 h-6" />
              </div>
            )}
            <div>
              <div className="flex items-center gap-2">
                <p className="font-['Outfit'] font-black text-base text-foreground">
                  {user?.name || "Member Athlete"}
                </p>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold">
                  Verified Member
                </span>
              </div>
              <p className="font-['Inter'] text-xs text-[#535C91] dark:text-[#9290C3] mt-0.5">
                {user?.email} • Account will be upgraded upon approval
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-[#535C91] dark:text-[#9290C3] font-['Inter'] self-start sm:self-center">
            <span className="w-2 h-2 rounded-full bg-active animate-ping" />
            <span className="font-semibold text-foreground">Intake Window Open</span>
          </div>
        </div>

        {/* The Form */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-7">
          {/* Row 1: Experience & Specialty */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Experience Field */}
            <div className="space-y-2">
              <label
                htmlFor="experience"
                className="font-['Outfit'] text-xs font-black uppercase tracking-wider text-foreground flex items-center justify-between"
              >
                <span className="flex items-center gap-2">
                  <FaCalendarAlt className="text-active w-3.5 h-3.5" />
                  Years of Coaching Experience <span className="text-active">*</span>
                </span>
                <span className="text-[10px] font-normal lowercase text-[#535C91] dark:text-[#9290C3]">
                  numerical only
                </span>
              </label>

              <div className="relative">
                <input
                  id="experience"
                  name="experience"
                  type="number"
                  min="0"
                  step="0.5"
                  value={formData.experience}
                  onChange={handleChange}
                  placeholder="e.g. 4.5"
                  className="w-full px-4 py-3 bg-black/5 dark:bg-white/5 border border-brand-500/15 focus:border-active focus:ring-2 focus:ring-active/20 rounded-xl text-foreground placeholder-[#535C91]/50 dark:placeholder-[#9290C3]/50 font-['Inter'] text-sm focus:outline-none transition-all"
                  required
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-[#535C91] dark:text-[#9290C3] pointer-events-none">
                  Years
                </span>
              </div>

              {/* Quick Preset Chips */}
              <div className="flex items-center gap-1.5 pt-1">
                <span className="text-[10px] text-[#535C91] dark:text-[#9290C3] font-['Inter'] mr-1">
                  Presets:
                </span>
                {experiencePresets.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => handleSelectExpPreset(preset)}
                    className="px-2.5 py-0.5 rounded-lg text-[10px] font-bold font-['Outfit'] bg-black/5 dark:bg-white/5 hover:bg-active hover:text-white border border-brand-500/10 transition-colors cursor-pointer text-[#535C91] dark:text-[#9290C3]"
                  >
                    {preset} yrs
                  </button>
                ))}
              </div>
            </div>

            {/* Specialty Field */}
            <div className="space-y-2">
              <label
                htmlFor="specialty"
                className="font-['Outfit'] text-xs font-black uppercase tracking-wider text-foreground flex items-center justify-between"
              >
                <span className="flex items-center gap-2">
                  <FaTag className="text-active w-3.5 h-3.5" />
                  Primary Fitness Specialty <span className="text-active">*</span>
                </span>
                <span className="text-[10px] font-normal lowercase text-[#535C91] dark:text-[#9290C3]">
                  curriculum focus
                </span>
              </label>

              <div className="relative">
                <select
                  id="specialty"
                  name="specialty"
                  value={formData.specialty}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-black/5 dark:bg-white/5 border border-brand-500/15 focus:border-active focus:ring-2 focus:ring-active/20 rounded-xl text-foreground font-['Inter'] text-sm appearance-none focus:outline-none transition-all cursor-pointer"
                  required
                >
                  {specialties.map((spec) => (
                    <option
                      key={spec}
                      value={spec === "Select a specialty" ? "" : spec}
                      className="bg-white dark:bg-[#070F2B] text-foreground py-1"
                    >
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

              {/* Quick Specialty Chips */}
              <div className="flex items-center gap-1.5 pt-1 flex-wrap">
                <span className="text-[10px] text-[#535C91] dark:text-[#9290C3] font-['Inter'] mr-1">
                  Popular:
                </span>
                {popularSpecialties.map((spec) => (
                  <button
                    key={spec}
                    type="button"
                    onClick={() => handleSelectSpecialty(spec)}
                    className={`px-2.5 py-0.5 rounded-lg text-[10px] font-bold font-['Outfit'] border transition-colors cursor-pointer ${
                      formData.specialty === spec
                        ? "bg-active text-white border-active"
                        : "bg-black/5 dark:bg-white/5 text-[#535C91] dark:text-[#9290C3] hover:text-foreground border-brand-500/10"
                    }`}
                  >
                    {spec}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Row 2: Professional Bio */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label
                htmlFor="bio"
                className="font-['Outfit'] text-xs font-black uppercase tracking-wider text-foreground flex items-center gap-2"
              >
                <FaFileAlt className="text-active w-3.5 h-3.5" />
                <span>Professional Bio & Coaching Philosophy</span>
                <span className="text-active">*</span>
              </label>

              <span
                className={`text-[11px] font-mono font-bold ${
                  formData.bio.trim().length >= 25
                    ? "text-emerald-500"
                    : "text-[#535C91] dark:text-[#9290C3]"
                }`}
              >
                {formData.bio.trim().length}/25 min chars
              </span>
            </div>

            <textarea
              id="bio"
              name="bio"
              rows="5"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Detail your personal coaching credentials, relevant certifications (e.g. NASM, ACE, CSCS), athlete achievements, and teaching philosophy..."
              className="w-full px-4 py-3 bg-black/5 dark:bg-white/5 border border-brand-500/15 focus:border-active focus:ring-2 focus:ring-active/20 rounded-xl text-foreground placeholder-[#535C91]/50 dark:placeholder-[#9290C3]/50 font-['Inter'] text-sm focus:outline-none transition-all resize-y min-h-[120px]"
              required
            />
            <p className="text-[11px] text-[#535C91] dark:text-[#9290C3] font-['Inter']">
              This overview will appear on your public Trainer Profile and Class descriptions once verified.
            </p>
          </div>

          {/* Coach Standards Pledge */}
          <div className="p-4 rounded-xl bg-black/2 dark:bg-white/2 border border-brand-500/15 flex items-start gap-3">
            <input
              type="checkbox"
              id="pledge"
              checked={pledgeAccepted}
              onChange={(e) => setPledgeAccepted(e.target.checked)}
              className="mt-1 w-4 h-4 rounded text-active border-brand-500/30 focus:ring-active cursor-pointer"
            />
            <label htmlFor="pledge" className="text-xs font-['Inter'] text-[#535C91] dark:text-[#9290C3] cursor-pointer">
              <span className="font-bold text-foreground block">FlexPulse Coach Standards Pledge</span>
              I confirm that my certifications are legitimate and that I will adhere to professional conduct, safety protocols, and prompt attendance for all athlete bookings.
            </label>
          </div>

          {/* Submit Action Row */}
          <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="text-xs text-[#535C91] dark:text-[#9290C3] font-['Inter'] flex items-center gap-1.5">
              <FaShieldAlt className="text-active w-3.5 h-3.5" />
              <span>Applications are securely processed by the Athletic Board</span>
            </div>

            <button
              type="submit"
              disabled={!isFormValid || isSubmitting}
              className={`relative overflow-hidden inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-['Outfit'] font-black text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-md ${
                isFormValid && !isSubmitting
                  ? "bg-btn-bg text-btn-text hover:brightness-105 active:scale-95 shadow-active/25"
                  : "bg-black/10 dark:bg-white/10 text-[#535C91] dark:text-[#9290C3] cursor-not-allowed opacity-60 shadow-none"
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Submitting Application...</span>
                </>
              ) : (
                <>
                  <FaPaperPlane className="w-3.5 h-3.5" />
                  <span>Submit Trainer Application</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
