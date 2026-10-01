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

const TRANSITION_EASE = [0.16, 1, 0.3, 1];

// ── Multi-Element Triggered Motion Variants for Every Single Card Element ──
export const forumCardVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.95,
      ease: TRANSITION_EASE,
      staggerChildren: 0.08,
      delayChildren: 0.06,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.96,
    transition: { duration: 0.4, ease: "easeIn" },
  },
};

export const forumImgVariants = {
  hidden: { scale: 1.15, filter: "blur(4px)" },
  visible: {
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 1.2, ease: TRANSITION_EASE },
  },
};

export const forumCategoryBadgeVariants = {
  hidden: { opacity: 0, y: -16, scale: 0.85 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 220, damping: 20 },
  },
};

export const forumReadTimeBadgeVariants = {
  hidden: { opacity: 0, x: 18, scale: 0.85 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 220, damping: 20 },
  },
};

export const forumAvatarVariants = {
  hidden: { opacity: 0, scale: 0.65, rotate: -12 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { type: "spring", stiffness: 220, damping: 18 },
  },
};

export const forumAuthorInfoVariants = {
  hidden: { opacity: 0, x: -16 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.75, ease: TRANSITION_EASE },
  },
};

export const forumTitleVariants = {
  hidden: { opacity: 0, y: 18, filter: "blur(3px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.85, ease: TRANSITION_EASE },
  },
};

export const forumExcerptVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: "easeOut" },
  },
};

export const forumEngagementVariants = {
  hidden: { opacity: 0, x: -14 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: TRANSITION_EASE },
  },
};

export const forumActionBtnVariants = {
  hidden: { opacity: 0, scale: 0.9, x: 12, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    y: 0,
    transition: { type: "spring", stiffness: 220, damping: 20 },
  },
};

export default function ForumPostCard({ post, viewMode = "grid", isTriggered = true }) {
  if (!post) return null;

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

  // ── VIEW 1: LIST VIEW MODE ──
  if (viewMode === "list") {
    return (
      <motion.article
        variants={forumCardVariants}
        initial="hidden"
        animate={isTriggered ? "visible" : "hidden"}
        exit="exit"
        whileHover={{ y: -4 }}
        transition={{ duration: 0.35, ease: TRANSITION_EASE }}
        className="group relative bg-white dark:bg-[#070F2B] backdrop-blur-md rounded-2xl overflow-hidden shadow-xs hover:shadow-md border border-brand-500/15 dark:border-brand-500/25 hover:border-active/50 transition-colors p-4 flex flex-col sm:flex-row items-center gap-4 sm:gap-6"
      >
        {/* Left Thumbnail with Zoom Settle */}
        <div className="relative w-full sm:w-48 h-40 shrink-0 rounded-xl overflow-hidden bg-brand-800/15">
          {image ? (
            <motion.div variants={forumImgVariants} className="w-full h-full relative">
              <Image
                src={image}
                alt={title}
                unoptimized
                fill
                className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
              />
            </motion.div>
          ) : (
            <div className="w-full h-full bg-linear-to-br from-brand-900/30 to-[#1B1A55]/60 flex items-center justify-center">
              <span className="font-['Outfit'] font-bold text-active text-xs">
                FlexPulse
              </span>
            </div>
          )}

          {/* Category Badge */}
          <div className="absolute top-2.5 left-2.5">
            <motion.div variants={forumCategoryBadgeVariants}>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider border border-white/10 shadow-2xs">
                <FaTag className="w-2.5 h-2.5 text-active" />
                {getCategory()}
              </span>
            </motion.div>
          </div>
        </div>

        {/* Center Details */}
        <div className="flex-1 min-w-0 flex flex-col justify-between w-full h-full py-1">
          <div>
            {/* Author Row */}
            <div className="flex items-center gap-2 mb-2">
              <motion.div variants={forumAvatarVariants} className="relative shrink-0">
                {userImage ? (
                  <Image
                    src={userImage}
                    alt={userName}
                    width={26}
                    height={26}
                    className="w-7 h-7 rounded-full object-cover border border-active/40"
                  />
                ) : (
                  <FaUserCircle className="w-7 h-7 text-brand-500/80" />
                )}
                {isCoach && (
                  <span className="absolute -bottom-0.5 -right-0.5 p-0.5 bg-white dark:bg-slate-900 rounded-full">
                    <FaCheckCircle className="w-2 h-2 text-active" />
                  </span>
                )}
              </motion.div>

              <motion.div variants={forumAuthorInfoVariants} className="flex items-center gap-2 flex-wrap">
                <span className="font-['Inter'] font-bold text-foreground text-xs truncate">
                  {userName}
                </span>
                {isCoach && (
                  <span className="text-active text-[10px] font-bold uppercase bg-active/10 px-1.5 py-0.5 rounded-full border border-active/20">
                    Coach
                  </span>
                )}
                <span className="text-[#535C91] dark:text-[#9290C3] text-[11px]">•</span>
                <span className="text-[#535C91] dark:text-[#9290C3] text-[11px]">
                  {formatDate(createdAt)}
                </span>
              </motion.div>
            </div>

            {/* Title */}
            <motion.h3
              variants={forumTitleVariants}
              className="font-['Outfit'] text-base sm:text-lg font-bold text-foreground line-clamp-1 group-hover:text-active transition-colors mb-2"
            >
              <Link href={`/forum/${_id}`}>{title}</Link>
            </motion.h3>

            {/* Excerpt */}
            <motion.p
              variants={forumExcerptVariants}
              className="font-['Inter'] text-xs text-[#535C91] dark:text-[#9290C3] line-clamp-2 leading-relaxed mb-3"
            >
              {description}
            </motion.p>
          </div>

          {/* Metrics & Action Link */}
          <div className="flex items-center justify-between text-xs text-[#535C91] dark:text-[#9290C3] pt-2.5 border-t border-brand-500/10">
            <motion.div variants={forumEngagementVariants} className="flex items-center gap-4">
              <span className="flex items-center gap-1 hover:text-rose-500 transition-colors">
                <FaHeart className="w-3 h-3 text-rose-500" />
                <strong className="text-foreground">{totalLikes}</strong>
              </span>
              <span className="flex items-center gap-1 hover:text-active transition-colors">
                <FaComment className="w-3 h-3 text-active" />
                <strong className="text-foreground">{totalComments}</strong>
              </span>
              <span className="flex items-center gap-1">
                <FaClock className="w-3 h-3 text-[#535C91] dark:text-[#9290C3]" />
                <span>{readingTime}m read</span>
              </span>
            </motion.div>

            <motion.div variants={forumActionBtnVariants}>
              <Link
                href={`/forum/${_id}`}
                className="inline-flex items-center gap-1.5 text-active font-bold text-xs uppercase tracking-wider group-hover:underline"
              >
                <span>View Thread</span>
                <FaArrowRight className="w-2.5 h-2.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.article>
    );
  }

  // ── VIEW 2: GRID VIEW MODE (DEFAULT) ──
  return (
    <motion.article
      variants={forumCardVariants}
      initial="hidden"
      animate={isTriggered ? "visible" : "hidden"}
      exit="exit"
      whileHover={{ y: -6 }}
      transition={{ duration: 0.35, ease: TRANSITION_EASE }}
      className="group relative bg-white dark:bg-[#070F2B] backdrop-blur-md rounded-3xl overflow-hidden shadow-xs hover:shadow-md border border-brand-500/15 dark:border-brand-500/25 hover:border-active/50 transition-colors flex flex-col justify-between h-full"
    >
      {/* Featured Image & Overlays with Zoom Settle */}
      <div className="relative w-full h-52 bg-brand-800/15 overflow-hidden">
        {image ? (
          <motion.div variants={forumImgVariants} className="w-full h-full relative">
            <Image
              src={image}
              alt={title}
              unoptimized
              fill
              className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
            />
          </motion.div>
        ) : (
          <div className="w-full h-full bg-linear-to-br from-brand-900/30 to-[#1B1A55]/60 flex items-center justify-center">
            <span className="font-['Outfit'] font-bold text-active/60 text-lg">
              FlexPulse Community
            </span>
          </div>
        )}

        {/* Gradient Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />

        {/* Category Badge on Image */}
        <div className="absolute top-3 left-3 z-10">
          <motion.div variants={forumCategoryBadgeVariants}>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-white text-[11px] font-bold uppercase tracking-wider border border-white/10 shadow-2xs">
              <FaTag className="w-2.5 h-2.5 text-active" />
              {getCategory()}
            </span>
          </motion.div>
        </div>

        {/* Read Time on Image */}
        <div className="absolute top-3 right-3 z-10">
          <motion.div variants={forumReadTimeBadgeVariants}>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-white/95 text-[11px] font-medium border border-white/10 shadow-2xs">
              <FaClock className="w-2.5 h-2.5 text-active" />
              {readingTime} min read
            </span>
          </motion.div>
        </div>
      </div>

      {/* Content Container */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Author Header */}
          <div className="flex items-center gap-3 mb-4">
            <motion.div variants={forumAvatarVariants} className="relative shrink-0">
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
            </motion.div>

            <motion.div variants={forumAuthorInfoVariants} className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
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
            </motion.div>
          </div>

          {/* Title */}
          <motion.h3
            variants={forumTitleVariants}
            className="font-['Outfit'] text-xl font-bold text-foreground mb-2.5 line-clamp-2 leading-snug group-hover:text-active transition-colors"
          >
            <Link href={`/forum/${_id}`}>{title}</Link>
          </motion.h3>

          {/* Excerpt */}
          <motion.p
            variants={forumExcerptVariants}
            className="font-['Inter'] text-sm text-[#535C91] dark:text-[#9290C3] leading-relaxed line-clamp-3 mb-6"
          >
            {description || "Join this discussion thread to learn more about training routines and recovery protocols."}
          </motion.p>
        </div>

        {/* Footer Metrics & Link */}
        <div className="flex items-center justify-between pt-4 border-t border-brand-500/10 dark:border-brand-500/20 text-xs font-['Inter']">
          <motion.div variants={forumEngagementVariants} className="flex items-center gap-4 text-[#535C91] dark:text-[#9290C3]">
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
          </motion.div>

          <motion.div variants={forumActionBtnVariants}>
            <Link
              href={`/forum/${_id}`}
              className="inline-flex items-center gap-1.5 text-active font-bold text-xs uppercase tracking-wider group-hover:underline transition-all"
            >
              <span>Read Protocol</span>
              <FaArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.article>
  );
}
