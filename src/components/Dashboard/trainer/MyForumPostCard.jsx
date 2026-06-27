"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight, FaComment, FaHeart, FaUserCircle } from "react-icons/fa";
import { DeletePostModal } from "./DeletePostModal";

export default function MyForumPostCard({ post }) {
  const {
    status,
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
      className="bg-white dark:bg-brand-800/20 rounded-2xl overflow-hidden shadow-card hover:shadow-lg transition-all duration-300 border border-brand-500/15 dark:border-brand-500/20 flex flex-col relative"
    >
      {/* Delete Button */}
      <DeletePostModal post={post} />

      {/* Post Image */}
      {image && (
        <div className="relative w-full h-48 bg-brand-500/10">
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
      <div className="p-6 flex-1 flex flex-col justify-between gap-4">
        <div className="space-y-3">
          {/* Author & Date */}
          <div className="flex items-center gap-3">
            {userImage ? (
              <Image
                src={userImage}
                alt={userName}
                width={40}
                height={40}
                className="w-10 h-10 rounded-full object-cover border-2 border-active/40"
              />
            ) : (
              <FaUserCircle className="w-10 h-10 text-active" />
            )}
            <div>
              <p className="font-sans font-bold text-foreground text-sm">
                {userName || "Anonymous"}
              </p>
              <div className="flex items-center gap-2 text-xs text-[#535C91] dark:text-[#9290C3] mt-0.5">
                {userRole && (
                  <span className="font-sans font-semibold text-active bg-active/10 px-2 py-0.5 rounded-full">
                    {userRole}
                  </span>
                )}
                <span>•</span>
                <span className="font-sans">{formatDate(createdAt)}</span>
              </div>
            </div>
          </div>

          {/* Title */}
          <h3 className="font-sans text-lg font-bold text-foreground line-clamp-1 pt-1">
            <Link
              href={`/forum/${_id}`}
              className="hover:text-active transition-colors"
            >
              {title}
            </Link>
          </h3>

          {/* Excerpt */}
          <p className="font-sans text-sm text-[#535C91] dark:text-[#9290C3] leading-relaxed line-clamp-3">
            {description || "No description available."}
          </p>
        </div>

        <div className="flex items-center justify-between text-sm font-sans text-[#535C91] dark:text-[#9290C3] pt-3.5 border-t border-brand-500/10">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <FaHeart className="w-4 h-4 text-rose-500" /> {totalLikes}
            </span>
            <span className="flex items-center gap-1.5">
              <FaComment className="w-4 h-4 text-active" /> {totalComments}
            </span>
          </div>
          <Link
            href={`/forum/${_id}`}
            className="flex items-center gap-1 text-active hover:underline font-bold transition-all"
          >
            Read More <FaArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
