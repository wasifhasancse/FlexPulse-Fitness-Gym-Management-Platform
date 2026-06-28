"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { toast } from "@heroui/react";
import { useState } from "react";

import {
  FaCalendarAlt,
  FaClock,
  FaDumbbell,
  FaHeart,
  FaInfoCircle,
  FaLanguage,
  FaLevelUpAlt,
  FaMapMarkerAlt,
  FaRegHeart,
  FaStar,
  FaUsers,
} from "react-icons/fa";

export default function ClassDetailsPageLayout({
  classData: propClassData,
  isBooked,
  isFavorite: initialFavorite,
  userId,
  userName,
  userEmail,
}) {
  const data = propClassData;
  const [isFavorite, setIsFavorite] = useState(initialFavorite);
  const [favLoading, setFavLoading] = useState(false);

  // Deterministic ratings and reviews based on class ID
  const seed = data._id ? data._id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) : 0;
  const rating = (4.5 + (seed % 6) * 0.1).toFixed(1);
  const reviews = 30 + (seed % 150);
  // const capacity = 10 + (seed % 10);

  const getEquipment = (category = "") => {
    const cat = category.toLowerCase();
    if (cat.includes("yoga") || cat.includes("stretch")) return "Mat, Blocks, Strap";
    if (cat.includes("cardio") || cat.includes("hiit")) return "Jump Rope, Timer, Mat";
    if (cat.includes("weight") || cat.includes("strength")) return "Dumbbells, Kettlebells, Barbell";
    if (cat.includes("combat") || cat.includes("box")) return "Boxing Gloves, Handwraps, Pads";
    return "Gym Equipment, Mat, Towel";
  };
  const equipment = getEquipment(data.category);

  const getIntensity = (level = "") => {
    const lvl = level.toLowerCase();
    if (lvl.includes("advanced") || lvl.includes("high")) return "High Intensity";
    if (lvl.includes("intermediate") || lvl.includes("medium")) return "Medium Intensity";
    return "Light Intensity";
  };
  const intensity = getIntensity(data.difficultyLevel || data.level);

  const getStudio = (category = "") => {
    const cat = category.toLowerCase();
    if (cat.includes("yoga") || cat.includes("stretch")) return "Mindfulness Studio";
    if (cat.includes("cardio") || cat.includes("hiit")) return "Aero Studio";
    if (cat.includes("combat")) return "Ring Arena";
    return "Main Gym Floor";
  };
  const studio = getStudio(data.category);

  const language = "English";
  const location = "FlexPulse Main Facility";

  const handleFavoriteToggle = async () => {
    if (!userId) {
      toast.warning("Please login first!");
      return;
    }
    setFavLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/favorites`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId,
            userName,
            userEmail,
            classId: data._id,
            className: data.className,
            classImage: data.classImage,
            category: data.category,
            price: data.price,
            duration: data.duration,
            author: data.author,
          }),
        }
      );

      const result = await res.json();
      setIsFavorite(result.isFavorite);
      toast.success(result.message);
    } catch (err) {
      console.error("Favorite error:", err);
    } finally {
      setFavLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-background py-10 px-4 sm:px-6 lg:px-8 transition-colors duration-300 relative overflow-hidden"
    >
      {/* Structural Ambient Background Glows */}
      <div className="absolute right-0 top-1/4 w-96 h-96 bg-brand-500/5 dark:bg-brand-800/10 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute left-0 top-3/4 w-80 h-80 bg-active/5 rounded-full blur-[130px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Cinematic Main Hero Image Section */}
        <div className="relative w-full h-80 md:h-128 rounded-3xl overflow-hidden mb-12 shadow-2xl border border-brand-500/10 group">
          <Image
            src={data.classImage || "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop"}
            alt={data.className}
            fill
            unoptimized
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          />
          <div className="absolute inset-0 bg-linear-to-t from-background via-background/60 to-transparent"></div>

          <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 md:right-10 flex flex-col items-start">
            <span className="text-xs font-bold uppercase tracking-widest text-btn-text bg-btn-bg px-4 py-1.5 rounded-lg shadow-lg mb-4 inline-block">
              {data.category}
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-foreground tracking-tight leading-none filter drop-shadow-sm">
              {data.className}
            </h1>
          </div>
        </div>

        {/* 2-Column Responsive Layout Block */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left Column - Core Workspace Insights */}
          <div className="lg:col-span-2 space-y-12">

            {/* Instructor Meta & Dynamic Rating Summary Card */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-8 border-b border-brand-500/10">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-[#9290C3] to-[#535C91] dark:from-[#1B1A55] dark:to-[#070F2B] overflow-hidden flex items-center justify-center text-xl font-bold text-active shadow-inner border border-brand-500/20">
                  {data.author?.charAt(0) || "T"}
                </div>
                <div>
                  <p className="text-lg font-bold text-foreground leading-snug">
                    {data.author}
                  </p>
                  <p className="text-sm text-brand-500 dark:text-brand-300 font-medium">
                    Certified Lead Instructor
                  </p>
                </div>
              </div>

              {/* Dynamic Theme Compliant Rating Badge */}
              <div className="flex items-center gap-3 bg-brand-800/10 dark:bg-[#070F2B]/30 border border-brand-500/10 rounded-2xl p-3 px-4 self-start sm:self-auto">
                <div className="flex items-center gap-1 text-active">
                  <FaStar className="w-4 h-4 fill-current" />
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-lg font-black text-foreground">{rating}</span>
                  <span className="text-xs text-brand-500 dark:text-brand-300 font-medium">
                    ({reviews} studio reviews)
                  </span>
                </div>
              </div>
            </div>

            {/* Structured About Section Description */}
            <div>
              <h2 className="text-2xl font-extrabold text-foreground tracking-tight mb-4">
                About this Class
              </h2>
              <p className="text-base text-foreground/80 dark:text-brand-300 leading-relaxed font-normal">
                {data.description}
              </p>
            </div>

            {/* High-Fidelity Asymmetric Info Grid */}
            <div>
              <h3 className="text-lg font-bold text-foreground tracking-tight mb-4">
                Session Parameters
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {/* Level Card */}
                <div className="bg-brand-800/5 dark:bg-[#070F2B]/20 rounded-2xl p-5 border border-brand-500/10">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-brand-500/10 mb-3 text-active">
                    <FaLevelUpAlt className="w-4 h-4" />
                  </div>
                  <p className="text-xs uppercase tracking-wider font-bold text-brand-500 dark:text-brand-300 opacity-80">
                    Difficulty Level
                  </p>
                  <p className="text-base font-bold text-foreground mt-1 tracking-tight">
                    {data.difficultyLevel || "Intermediate"}
                  </p>
                </div>

                {/* Intensity Card */}
                <div className="bg-brand-800/5 dark:bg-[#070F2B]/20 rounded-2xl p-5 border border-brand-500/10">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-brand-500/10 mb-3 text-active">
                    <FaDumbbell className="w-4 h-4" />
                  </div>
                  <p className="text-xs uppercase tracking-wider font-bold text-brand-500 dark:text-brand-300 opacity-80">
                    Target Intensity
                  </p>
                  <p className="text-base font-bold text-foreground mt-1 tracking-tight">
                    {intensity}
                  </p>
                </div>

                {/* Equipment Card */}
                <div className="bg-brand-800/5 dark:bg-[#070F2B]/20 rounded-2xl p-5 border border-brand-500/10">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-brand-500/10 mb-3 text-active">
                    <FaInfoCircle className="w-4 h-4" />
                  </div>
                  <p className="text-xs uppercase tracking-wider font-bold text-brand-500 dark:text-brand-300 opacity-80">
                    Required Gear
                  </p>
                  <p className="text-sm font-bold text-foreground mt-1 leading-snug">
                    {equipment}
                  </p>
                </div>

                {/* Language Card */}
                <div className="bg-brand-800/5 dark:bg-[#070F2B]/20 rounded-2xl p-5 border border-brand-500/10">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-brand-500/10 mb-3 text-active">
                    <FaLanguage className="w-4 h-4" />
                  </div>
                  <p className="text-xs uppercase tracking-wider font-bold text-brand-500 dark:text-brand-300 opacity-80">
                    Instruction
                  </p>
                  <p className="text-base font-bold text-foreground mt-1 tracking-tight">
                    {language}
                  </p>
                </div>
              </div>
            </div>

            {/* Amenities Glass Block */}
            <div className="bg-brand-800/10 dark:bg-[#070F2B]/10 rounded-2xl p-5 border border-brand-500/10 flex items-start gap-4 shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-brand-500/10 flex items-center justify-center text-lg shrink-0 border border-brand-500/10">
                💧
              </div>
              <div>
                <span className="font-bold text-foreground block mb-0.5">
                  Complimentary Amenities Included
                </span>{" "}
                <p className="text-sm text-foreground/80 dark:text-brand-300">
                  Access to infused hydration stations, complimentary fresh premium towels, and secure digital lockers is fully verified before and after your scheduled session.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Premium Booking & Sticky Details Card */}
          <div className="lg:col-span-1">
            <div className="bg-white/70 dark:bg-[#070F2B]/40 backdrop-blur-md rounded-3xl border border-brand-500/10 p-8 sticky top-28 shadow-xl dark:shadow-glow/5">

              {/* Dynamic Pricing Layout Module */}
              <div className="mb-6 text-center bg-brand-800/5 dark:bg-brand-800/20 py-5 rounded-2xl border border-brand-500/5">
                <p className="text-4xl font-black text-foreground tracking-tight">
                  ${data.price}
                </p>
                <p className="text-xs font-bold uppercase tracking-wider text-active mt-1.5">
                  Single Access Passes Only
                </p>
              </div>

              {/* Comprehensive Meta Metrics Parameters */}
              <div className="space-y-4">
                {/* Metrics Row - Capacity */}
                <div className="flex items-center justify-between py-3 border-b border-brand-500/10">
                  <div className="flex items-center gap-3">
                    <FaUsers className="w-4 h-4 text-brand-500" />
                    <span className="text-xs font-bold text-brand-500 dark:text-brand-300 uppercase tracking-wider">
                      Seat Availability
                    </span>
                  </div>
                  <span className="text-xs font-bold text-foreground bg-brand-500/10 px-2.5 py-1 rounded-md border border-brand-500/5">
                    {0} / {data.slot} Filled
                  </span>
                </div>

                {/* Metrics Row - Calendar Schedule */}
                <div className="py-3 border-b border-brand-500/10">
                  <div className="flex items-center gap-3 mb-2">
                    <FaCalendarAlt className="w-4 h-4 text-active" />
                    <span className="text-xs font-bold text-foreground uppercase tracking-wider">
                      Assigned Schedule
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-foreground/90 pl-7">
                    {data.classSchedule}
                  </p>
                  <p className="text-xs font-medium text-brand-500 dark:text-brand-300 pl-7 mt-1">
                    {data.time} — {data.time.split(" ")[0]}:
                    {parseInt(data.time.split(":")[0]) + 1}
                    :00 {data.time.split(" ")[1] || "AM"}
                  </p>
                </div>

                {/* Metrics Row - Exact Clock Duration */}
                <div className="py-3 border-b border-brand-500/10">
                  <div className="flex items-center gap-3">
                    <FaClock className="w-4 h-4 text-active" />
                    <span className="text-xs font-bold text-foreground uppercase tracking-wider">
                      Exact Duration
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-foreground/90 pl-7 mt-1">
                    {data.duration || "60 Min Run"}
                  </p>
                </div>

                {/* Metrics Row - Studio Location Mapping */}
                <div className="py-3 pb-5">
                  <div className="flex items-center gap-3">
                    <FaMapMarkerAlt className="w-4 h-4 text-active" />
                    <span className="text-xs font-bold text-foreground uppercase tracking-wider">
                      Location Venue
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-foreground/90 pl-7 mt-1 leading-snug">
                    {studio}, <span className="text-xs text-brand-500 dark:text-brand-300 font-medium block">{location}</span>
                  </p>
                </div>
              </div>

              {/* Action Form Integrations Trigger Layout */}
              <div className="space-y-3.5 mt-4">
                <form action={'/api/payment'} method="POST">
                  {/* Hidden metadata bindings */}
                  <input type="hidden" name="price" value={data.price} />
                  <input type="hidden" name="trainer" value={data.author} />
                  <input type="hidden" name="classId" value={data._id} />
                  <input type="hidden" name="className" value={data.className} />
                  <input type="hidden" name="duration" value={data.duration} />
                  <input type="hidden" name="image" value={data.classImage} />

                  <button
                    type="submit"
                    disabled={isBooked}
                    className={`w-full py-4 font-bold text-sm uppercase tracking-wider rounded-xl transition-all duration-300 shadow-md cursor-pointer
                    ${
                      isBooked
                        ? "bg-brand-500/20 text-brand-500 cursor-not-allowed border border-brand-500/10 opacity-60"
                        : "bg-btn-bg text-btn-text hover:opacity-95 dark:hover:shadow-glow"
                    }`}
                  >
                    {isBooked ? "✓ Session Already Booked" : "Instant Registration"}
                  </button>
                </form>

                {/* Theme Calibrated Secondary Bookmark Button Toggle */}
                <button
                  onClick={handleFavoriteToggle}
                  disabled={favLoading}
                  className={`w-full py-3.5 border font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer
                    ${
                      isFavorite
                        ? "border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/15"
                        : "border-brand-500/30 text-foreground bg-brand-800/10 hover:bg-brand-500/10"
                    }
                    ${favLoading ? "opacity-60 cursor-not-allowed" : ""}
                  `}
                >
                  {favLoading ? (
                    <span>Updating Records...</span>
                  ) : isFavorite ? (
                    <>
                      <FaHeart className="w-3.5 h-3.5" />
                      Remove Bookmarked Session
                    </>
                  ) : (
                    <>
                      <FaRegHeart className="w-3.5 h-3.5" />
                      Bookmark for Later
                    </>
                  )}
                </button>
              </div>

              {/* Cancellation Policy Fine Print */}
              <p className="mt-5 text-[10px] font-bold text-brand-500 text-center uppercase tracking-widest opacity-80">
                Flexible cancellation applies up to 12 hrs out.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
