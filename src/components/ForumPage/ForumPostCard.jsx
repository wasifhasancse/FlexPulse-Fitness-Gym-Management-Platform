"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight, FaComment, FaHeart, FaUserCircle } from "react-icons/fa";

export default function ForumPostCard({ post }) {
  const {
    _id,
    title,
    description,
    userName,
    userRole,
    userImage,
    createdAt,
    image,
    likes = [],
    comments = [],
  } = post;
  const totalLikes = likes?.length || 0;
  const totalComments = comments?.length || 0;

  const formatDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-[#ffffff] dark:bg-[#1B1A55]/40 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-brand-500/20 flex flex-col"
    >
      {/* Post Image */}
      {image && (
        <div className="relative w-full h-48 bg-brand-800/10">
          <Image
            src={image}
            alt={title}
            unoptimized
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col">
        {/* Author & Date */}
        <div className="flex items-center gap-3 mb-4">
          {userImage ? (
            <Image
              src={userImage}
              alt={userName}
              width={50}
              height={50}
              className="w-10 h-10 rounded-full object-cover border-2 border-brand-300"
            />
          ) : (
            <FaUserCircle className="w-10 h-10 text-brand-500" />
          )}
          <div>
            <p className="font-['Inter'] font-semibold text-foreground text-sm">
              {userName || "Anonymous"}
            </p>
            <div className="flex items-center gap-2 text-xs text-[#535C91] dark:text-[#9290C3]">
              {userRole && (
                <span className="font-['Inter'] font-medium text-active bg-[#535C91]/10 dark:bg-[#1B1A55]/60 px-2 py-0.5 rounded-full">
                  {userRole}
                </span>
              )}
              <span>•</span>
              <span className="font-['Inter']">{formatDate(createdAt)}</span>
            </div>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-['Outfit'] text-xl font-bold text-foreground mb-2 line-clamp-1">
          <Link
            href={`/forum/${_id}`}
            className="hover:text-active transition-colors"
          >
            {title}
          </Link>
        </h3>

        {/* Excerpt */}
        <p className="font-['Inter'] text-sm text-[#535C91] dark:text-[#9290C3] leading-relaxed line-clamp-3 flex-1 mb-4">
          {description || "No description available."}
        </p>

        {/* Footer: likes, comments, read more */}
        <div className="flex items-center justify-between text-sm font-['Inter'] text-[#535C91] dark:text-[#9290C3] pt-4 border-t border-brand-500/10">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <FaHeart className="w-4 h-4 text-active" /> {totalLikes}
            </span>
            <span className="flex items-center gap-1">
              <FaComment className="w-4 h-4 text-active" /> {totalComments}
            </span>
          </div>
          <Link
            href={`/forum/${_id}`}
            className="flex items-center gap-1 text-active hover:opacity-90 font-bold transition-all"
          >
            Read More <FaArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
