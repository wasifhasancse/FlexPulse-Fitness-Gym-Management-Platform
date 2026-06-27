"use client";

import { createCheckoutSession } from "@/lib/actions/createCheckout";
import { motion } from "framer-motion";
import Image from "next/image";
import { toast} from "@heroui/react";
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
  const capacity = 10 + (seed % 10);
  
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
      alert("Please login first!");
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
        },
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
      className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300 relative"
    >
      {/* Background glow */}
      <div className="absolute left-1/2 top-0 -translate-x-1/2 w-200 h-100 bg-[#CFFF04]/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Main Image */}
        <div className="relative w-full h-72 md:h-112.5 rounded-3xl overflow-hidden mb-12 shadow-[0_10px_30px_rgba(0,0,0,0.5)] border border-brand-500/30">
          <Image
            src={data.classImage || "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop"}
            alt={data.className}
            fill
            unoptimized
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-brand-900 via-brand-900/40 to-transparent"></div>

          <div className="absolute bottom-8 left-8 right-8">
            <span className="font-['Inter'] text-sm font-bold uppercase tracking-widest text-brand-900 bg-[#CFFF04] px-4 py-1.5 rounded-md shadow-md mb-4 inline-block">
              {data.category}
            </span>
            <h1 className="font-['Inter'] text-4xl md:text-6xl font-black text-white tracking-tight leading-none drop-shadow-md">
              {data.className}
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left Column - Details */}
          <div className="lg:col-span-2 space-y-10">
            {/* Title & Trainer */}
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-full bg-brand-500 overflow-hidden flex items-center justify-center text-xl font-bold text-white shadow-inner border border-brand-300">
                  {data.author?.charAt(0) || "T"}
                </div>
                <div>
                  <p className="font-['Inter'] font-semibold text-foreground text-lg">
                    {data.author}
                  </p>
                  <p className="font-['Inter'] text-sm text-brand-500 dark:text-brand-300">
                    Lead Instructor
                  </p>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-4">
                <div className="flex items-center gap-1 text-[#CFFF04]">
                  <FaStar className="w-5 h-5 fill-current drop-shadow-[0_0_3px_rgba(207,255,4,0.5)]" />
                  <FaStar className="w-5 h-5 fill-current drop-shadow-[0_0_3px_rgba(207,255,4,0.5)]" />
                  <FaStar className="w-5 h-5 fill-current drop-shadow-[0_0_3px_rgba(207,255,4,0.5)]" />
                  <FaStar className="w-5 h-5 fill-current drop-shadow-[0_0_3px_rgba(207,255,4,0.5)]" />
                  <FaStar className="w-5 h-5 fill-current drop-shadow-[0_0_3px_rgba(207,255,4,0.5)]" />
                </div>
                <span className="font-['Inter'] text-base font-bold text-foreground ml-2">
                  {rating}
                </span>
                <span className="font-['Inter'] text-sm text-brand-500 dark:text-brand-300">
                  ({reviews} reviews)
                </span>
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="font-['Inter'] text-2xl font-bold text-foreground mb-4">
                About this Class
              </h2>
              <p className="font-['Inter'] text-base text-brand-900 dark:text-brand-300 leading-relaxed">
                {data.description}
              </p>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white dark:bg-brand-800 rounded-2xl p-5 shadow-sm border border-brand-500/20">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-brand-500/10 mb-3 text-[#CFFF04]">
                  <FaLevelUpAlt className="w-5 h-5" />
                </div>
                <p className="font-['Inter'] text-xs uppercase tracking-wider font-bold text-brand-500 dark:text-brand-300">
                  Level
                </p>
                <p className="font-['Inter'] text-base font-bold text-foreground mt-1">
                  {data.difficultyLevel || "Intermediate"}
                </p>
              </div>

              <div className="bg-white dark:bg-brand-800 rounded-2xl p-5 shadow-sm border border-brand-500/20">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-brand-500/10 mb-3 text-[#CFFF04]">
                  <FaDumbbell className="w-5 h-5" />
                </div>
                <p className="font-['Inter'] text-xs uppercase tracking-wider font-bold text-brand-500 dark:text-brand-300">
                  Intensity
                </p>
                <p className="font-['Inter'] text-base font-bold text-foreground mt-1">
                  {intensity}
                </p>
              </div>

              <div className="bg-white dark:bg-brand-800 rounded-2xl p-5 shadow-sm border border-brand-500/20">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-brand-500/10 mb-3 text-[#CFFF04]">
                  <FaInfoCircle className="w-5 h-5" />
                </div>
                <p className="font-['Inter'] text-xs uppercase tracking-wider font-bold text-brand-500 dark:text-brand-300">
                  Equipment
                </p>
                <p className="font-['Inter'] text-base font-bold text-foreground mt-1">
                  {equipment}
                </p>
              </div>

              <div className="bg-white dark:bg-brand-800 rounded-2xl p-5 shadow-sm border border-brand-500/20">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-brand-500/10 mb-3 text-[#CFFF04]">
                  <FaLanguage className="w-5 h-5" />
                </div>
                <p className="font-['Inter'] text-xs uppercase tracking-wider font-bold text-brand-500 dark:text-brand-300">
                  Language
                </p>
                <p className="font-['Inter'] text-base font-bold text-foreground mt-1">
                  {language}
                </p>
              </div>
            </div>

            {/* Amenities */}
            <div className="bg-white dark:bg-brand-800 rounded-2xl p-6 shadow-sm border border-brand-500/20 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#CFFF04]/10 flex items-center justify-center text-[#CFFF04]">
                💧
              </div>
              <p className="font-['Inter'] text-base text-brand-900 dark:text-brand-300">
                <span className="font-bold text-foreground block md:inline">
                  Infused Water
                </span>{" "}
                Complimentary station available before and after class
              </p>
            </div>
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-brand-800 rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.1)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.4)] border border-brand-500/20 p-8 sticky top-24">
              {/* Price */}
              <div className="mb-8 text-center bg-brand-500/5 py-4 rounded-2xl">
                <p className="font-['Inter'] text-4xl font-black text-foreground">
                  ${data.price}
                </p>
                <p className="font-['Inter'] text-sm font-bold uppercase tracking-widest text-[#CFFF04] mt-1 drop-shadow-[0_0_5px_rgba(207,255,4,0.3)]">
                  Single Session
                </p>
              </div>

              <div className="space-y-5">
                {/* Capacity */}
                <div className="flex items-center justify-between pb-4 border-b border-brand-500/20">
                  <div className="flex items-center gap-3">
                    <FaUsers className="w-5 h-5 text-brand-500" />
                    <span className="font-['Inter'] text-sm font-bold text-brand-900 dark:text-brand-300 uppercase">
                      Capacity
                    </span>
                  </div>
                  <span className="font-['Inter'] text-sm font-bold text-foreground bg-brand-500/10 px-3 py-1 rounded-full">
                    {capacity} / {data.slot}
                  </span>
                </div>

                {/* Schedule */}
                <div className="pb-4 border-b border-brand-500/20">
                  <div className="flex items-center gap-3 mb-2">
                    <FaCalendarAlt className="w-5 h-5 text-[#CFFF04]" />
                    <span className="font-['Inter'] text-sm font-bold text-foreground uppercase">
                      Schedule
                    </span>
                  </div>
                  <p className="font-['Inter'] text-sm font-medium text-brand-900 dark:text-brand-300 pl-8">
                    {data.classSchedule}
                  </p>
                  <p className="font-['Inter'] text-sm font-medium text-brand-900 dark:text-brand-300 pl-8 mt-1">
                    {data.time} — {data.time.split(" ")[0]}:
                    {parseInt(data.time.split(":")[0]) + 1}
                    :00 {data.time.split(" ")[1] || "AM"}
                  </p>
                </div>

                {/* Duration */}
                <div className="pb-4 border-b border-brand-500/20">
                  <div className="flex items-center gap-3">
                    <FaClock className="w-5 h-5 text-[#CFFF04]" />
                    <span className="font-['Inter'] text-sm font-bold text-foreground uppercase">
                      Duration
                    </span>
                  </div>
                  <p className="font-['Inter'] text-sm font-medium text-brand-900 dark:text-brand-300 pl-8 mt-1">
                    {data.duration || "60 Min"}
                  </p>
                </div>

                {/* Location */}
                <div className="pb-6">
                  <div className="flex items-center gap-3">
                    <FaMapMarkerAlt className="w-5 h-5 text-[#CFFF04]" />
                    <span className="font-['Inter'] text-sm font-bold text-foreground uppercase">
                      Location
                    </span>
                  </div>
                  <p className="font-['Inter'] text-sm font-medium text-brand-900 dark:text-brand-300 pl-8 mt-1">
                    {studio}, {location}
                  </p>
                </div>
              </div>

              {/* Buttons */}
              <div className="space-y-4 mt-6">
                <form action={createCheckoutSession}>
                  {/* Hidden fields */}
                  <input type="hidden" name="classId" value={data._id} />
                  <input type="hidden" name="className" value={data.className} />
                  <input type="hidden" name="trainer" value={data.author} />
                  <input type="hidden" name="price" value={data.price} />
                  <input type="hidden" name="duration" value={data.duration} />
                  <input type="hidden" name="image" value={data.classImage} />

                  <button
                    type="submit"
                    disabled={isBooked}
                    className={`w-full py-4 font-['Inter'] font-bold text-lg uppercase tracking-wider rounded-xl transition-all duration-300 shadow-lg
                  ${
                    isBooked
                      ? "bg-brand-500 text-white cursor-not-allowed opacity-60"
                      : "bg-[#CFFF04] text-brand-900 hover:bg-[#b0d903] hover:shadow-[0_0_20px_rgba(207,255,4,0.4)]"
                  }`}
                  >
                    {isBooked ? "✅ Already Booked" : "Book Now"}
                  </button>
                </form>

                <button
                  onClick={handleFavoriteToggle}
                  disabled={favLoading}
                  className={`w-full py-4 border-2 font-['Inter'] font-bold text-sm uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2
                    ${
                      isFavorite
                        ? "border-red-400 bg-red-500/10 text-red-500 hover:bg-red-500/20"
                        : "border-brand-500 text-foreground hover:bg-brand-500/10"
                    }
                    ${favLoading ? "opacity-60 cursor-not-allowed" : ""}
                  `}
                >
                  {favLoading ? (
                    <span>Loading...</span>
                  ) : isFavorite ? (
                    <>
                      <FaHeart className="w-4 h-4" />
                      Remove from Favorites
                    </>
                  ) : (
                    <>
                      <FaRegHeart className="w-4 h-4" />
                      Save to Favorites
                    </>
                  )}
                </button>
              </div>

              {/* Cancellation Policy */}
              <p className="mt-6 font-['Inter'] text-xs font-medium text-brand-500 text-center uppercase tracking-wider">
                Free cancellation up to 12 hours before class.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
