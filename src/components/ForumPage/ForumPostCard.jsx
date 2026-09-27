"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  FaArrowRight,
  FaCheckCircle,
  FaClock,
  FaComment,
  FaHeart,
  FaTag,
  FaUserCircle,
} from "react-icons/fa";

export default function ForumPostCard({ post, viewMode = "grid" }) {
  const {
    _id,
    title = "",
    description = "",
    userName = "Anonymous Coach",
    userRole = "trainer",
    userImage,
    createdAt,
    image,
    likes = [],
    comments = [],
  } = post;

  const totalLikes = likes?.length || 0;
  const totalComments = comments?.length || 0;

  const formatDate = (date) => {
    if (!date) return "Recent";
    try {
      return new Date(date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return "Recent";
    }
  };

  // Derive an athletic category tag from title/description
  const getCategory = () => {
    const text = `${title} ${description}`.toLowerCase();
    if (text.includes("mobility") || text.includes("flexibility") || text.includes("stretch")) {
      return "Mobility & Flow";
    }
    if (text.includes("metabolic") || text.includes("circuit") || text.includes("cardio") || text.includes("zone 2")) {
      return "Metabolic & Cardio";
    }
    if (text.includes("core") || text.includes("stability") || text.includes("abdominal")) {
      return "Core & Stability";
    }
    if (text.includes("macro") || text.includes("carb") || text.includes("nutrition") || text.includes("diet")) {
      return "Nutrition & Fuel";
    }
    if (text.includes("squat") || text.includes("knee") || text.includes("biomechanic") || text.includes("sprint")) {
      return "Biomechanics & Form";
    }
    if (text.includes("cns") || text.includes("sleep") || text.includes("rest") || text.includes("fatigue")) {
      return "CNS & Recovery";
    }
    if (text.includes("progressive") || text.includes("hypertrophy") || text.includes("kettlebell") || text.includes("overload")) {
      return "Strength & Hypertrophy";
    }
    return "Athletic Performance";
  };

  // Calculate estimated reading time
  const readingTime = Math.max(
    1,
    Math.ceil((description.split(/\s+/).length || 50) / 45),
  );

  const isCoach = userRole === "trainer" || userRole === "admin";

  // List View Mode
  if (viewMode === "list") {
    return (
      <motion.article
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="group bg-white dark:bg-[#1B1A55]/30 backdrop-blur-md rounded-2xl overflow-hidden shadow-sm hover:shadow-lg border border-brand-500/15 dark:border-brand-500/25 hover:border-active/40 transition-all p-4 flex flex-col sm:flex-row items-center gap-4 sm:gap-6"
      >
        {/* Left Thumbnail */}
        <div className="relative w-full sm:w-44 h-36 shrink-0 rounded-xl overflow-hidden bg-brand-800/10">
          {image ? (
            <Image
              src={image}
              alt={title}
              unoptimized
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-brand-900/30 to-[#1B1A55]/60 flex items-center justify-center">
              <span className="font-['Outfit'] font-bold text-active text-xs">
                FlexPulse
              </span>
            </div>
          )}
          <div className="absolute top-2 left-2">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider">
              {getCategory()}
            </span>
          </div>
        </div>

        {/* Center Details */}
        <div className="flex-1 min-w-0 flex flex-col justify-between w-full">
          <div>
            {/* Author Row */}
            <div className="flex items-center gap-2 mb-1.5">
              {userImage ? (
                <Image
                  src={userImage}
                  alt={userName}
                  width={24}
                  height={24}
                  className="w-6 h-6 rounded-full object-cover border border-active/40"
                />
              ) : (
                <FaUserCircle className="w-6 h-6 text-brand-500/80" />
              )}
              <span className="font-['Inter'] font-bold text-foreground text-xs truncate">
                {userName}
              </span>
              {isCoach && (
                <span className="text-active text-[10px] font-bold uppercase bg-active/10 px-1.5 py-0.2 rounded-full">
                  Coach
                </span>
              )}
              <span className="text-[#535C91] dark:text-[#9290C3] text-[11px]">•</span>
              <span className="text-[#535C91] dark:text-[#9290C3] text-[11px]">
                {formatDate(createdAt)}
              </span>
            </div>

            {/* Title */}
            <h3 className="font-['Outfit'] text-base sm:text-lg font-bold text-foreground line-clamp-1 group-hover:text-active transition-colors mb-1.5">
              <Link href={`/forum/${_id}`}>{title}</Link>
            </h3>

            {/* Excerpt */}
            <p className="font-['Inter'] text-xs text-[#535C91] dark:text-[#9290C3] line-clamp-2 leading-relaxed mb-3">
              {description}
            </p>
          </div>

          {/* Metrics & Action Link */}
          <div className="flex items-center justify-between text-xs text-[#535C91] dark:text-[#9290C3] pt-2 border-t border-brand-500/10">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <FaHeart className="w-3 h-3 text-rose-500" />
                <strong className="text-foreground">{totalLikes}</strong>
              </span>
              <span className="flex items-center gap-1">
                <FaComment className="w-3 h-3 text-active" />
                <strong className="text-foreground">{totalComments}</strong>
              </span>
              <span className="flex items-center gap-1">
                <FaClock className="w-3 h-3 text-[#535C91] dark:text-[#9290C3]" />
                <span>{readingTime}m read</span>
              </span>
            </div>

            <Link
              href={`/forum/${_id}`}
              className="inline-flex items-center gap-1 text-active font-bold text-xs uppercase tracking-wider group-hover:underline"
            >
              <span>View Thread</span>
              <FaArrowRight className="w-2.5 h-2.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </motion.article>
    );
  }

  // Grid View Mode (Default)
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="group bg-white dark:bg-[#1B1A55]/30 backdrop-blur-md rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-brand-500/15 dark:border-brand-500/25 hover:border-active/40 transition-all duration-300 flex flex-col"
    >
      {/* Featured Image & Overlays */}
      <div className="relative w-full h-52 bg-brand-800/10 overflow-hidden">
        {image ? (
          <Image
            src={image}
            alt={title}
            unoptimized
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-brand-900/30 to-[#1B1A55]/60 flex items-center justify-center">
            <span className="font-['Outfit'] font-bold text-active/60 text-lg">
              FlexPulse Community
            </span>
          </div>
        )}

        {/* Gradient Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

        {/* Category Badge on Image */}
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-bold uppercase tracking-wider border border-white/10 shadow-sm">
            <FaTag className="w-2.5 h-2.5 text-active" />
            {getCategory()}
          </span>
        </div>

        {/* Read Time on Image */}
        <div className="absolute top-3 right-3">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white/90 text-[11px] font-medium border border-white/10">
            <FaClock className="w-2.5 h-2.5 text-active" />
            {readingTime} min read
          </span>
        </div>
      </div>

      {/* Content Container */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Author Header */}
          <div className="flex items-center gap-3 mb-3.5">
            <div className="relative shrink-0">
              {userImage ? (
                <Image
                  src={userImage}
                  alt={userName}
                  width={42}
                  height={42}
                  className="w-10 h-10 rounded-full object-cover border-2 border-active/40"
                />
              ) : (
                <FaUserCircle className="w-10 h-10 text-brand-500/80" />
              )}
              {isCoach && (
                <span className="absolute -bottom-1 -right-1 p-0.5 bg-white dark:bg-slate-900 rounded-full">
                  <FaCheckCircle className="w-3 h-3 text-active" />
                </span>
              )}
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <p className="font-['Inter'] font-bold text-foreground text-sm truncate">
                  {userName}
                </p>
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    isCoach
                      ? "bg-active/10 text-active border border-active/20"
                      : "bg-[#535C91]/10 dark:bg-[#1B1A55]/60 text-[#535C91] dark:text-[#9290C3]"
                  }`}
                >
                  {isCoach ? "Verified Coach" : "Athlete Member"}
                </span>
              </div>
              <p className="font-['Inter'] text-xs text-[#535C91] dark:text-[#9290C3] mt-0.5">
                {formatDate(createdAt)}
              </p>
            </div>
          </div>

          {/* Title */}
          <h3 className="font-['Outfit'] text-xl font-bold text-foreground mb-2.5 line-clamp-2 leading-snug group-hover:text-active transition-colors">
            <Link href={`/forum/${_id}`}>{title}</Link>
          </h3>

          {/* Excerpt */}
          <p className="font-['Inter'] text-sm text-[#535C91] dark:text-[#9290C3] leading-relaxed line-clamp-3 mb-5">
            {description || "Join this discussion thread to learn more about training routines and recovery protocols."}
          </p>
        </div>

        {/* Footer Metrics & Link */}
        <div className="flex items-center justify-between pt-4 border-t border-brand-500/10 dark:border-brand-500/20 text-xs font-['Inter']">
          <div className="flex items-center gap-4 text-[#535C91] dark:text-[#9290C3]">
            <span
              className="flex items-center gap-1.5 hover:text-rose-500 transition-colors"
              title={`${totalLikes} athletes liked this`}
            >
              <FaHeart className="w-3.5 h-3.5 text-rose-500" />
              <strong className="text-foreground">{totalLikes}</strong>
            </span>
            <span
              className="flex items-center gap-1.5 hover:text-active transition-colors"
              title={`${totalComments} comments`}
            >
              <FaComment className="w-3.5 h-3.5 text-active" />
              <strong className="text-foreground">{totalComments}</strong>
            </span>
          </div>

          <Link
            href={`/forum/${_id}`}
            className="inline-flex items-center gap-1.5 text-active font-bold text-xs uppercase tracking-wider group-hover:underline transition-all"
          >
            <span>Read Protocol</span>
            <FaArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
