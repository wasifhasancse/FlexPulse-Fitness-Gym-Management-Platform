"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaUserCircle, FaArrowRight, FaComment, FaHeart } from "react-icons/fa";

export default function LatestForumPosts({ posts }) {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const formatDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <section className="py-20 bg-brand-900/10 dark:bg-[#1B1A55]/10 border-t border-b border-brand-500/10 transition-colors duration-300 relative overflow-hidden">
      <div className="absolute left-0 top-1/3 w-80 h-80 bg-active/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-6 sm:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-800/20 border border-brand-500/30 text-active text-xs font-bold tracking-wider uppercase mb-4">
            <span className="flex h-2 w-2 rounded-full bg-active animate-pulse"></span>
            Knowledge Sharing
          </div>
          <h2 className="font-['Outfit'] text-4xl sm:text-5xl font-extrabold text-foreground tracking-tight mb-4">
            Latest From Our <span className="text-active">Forum</span>
          </h2>
          <p className="font-['Inter'] text-base text-[#535C91] dark:text-[#9290C3] leading-relaxed">
            Read helpful insights, fitness tips, and knowledge shared by our community experts and administrators.
          </p>
        </div>

        {/* Posts Grid */}
        {posts.length === 0 ? (
          <div className="text-center py-12 bg-brand-800/10 rounded-3xl border border-brand-500/20 max-w-lg mx-auto">
            <p className="font-['Inter'] text-[#535C91] dark:text-[#9290C3] font-medium">No recent forum posts available.</p>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {posts.slice(0, 3).map((post) => {
              const { _id, title, description, userName, userRole, userImage, createdAt, image, likes = [], comments = [] } = post;
              return (
                <motion.div
                  key={_id}
                  variants={cardVariants}
                  className="group bg-white dark:bg-[#1b1a55]/20 border border-brand-500/15 dark:border-brand-500/30 rounded-3xl overflow-hidden shadow-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1.5 flex flex-col h-full"
                >
                  {/* Post Image */}
                  {image && (
                    <div className="relative h-48 bg-brand-800/10 overflow-hidden">
                      <Image
                        src={image}
                        alt={title}
                        fill
                        unoptimized
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}

                  {/* Post Details */}
                  <div className="p-6 flex flex-col flex-1">
                    {/* User profile info */}
                    <div className="flex items-center gap-3 mb-4">
                      {userImage ? (
                        <Image
                          src={userImage}
                          alt={userName || "User"}
                          width={36}
                          height={36}
                          className="w-9 h-9 rounded-full object-cover border-2 border-brand-300"
                        />
                      ) : (
                        <FaUserCircle className="w-9 h-9 text-brand-500 shrink-0" />
                      )}
                      <div>
                        <p className="font-['Inter'] font-semibold text-foreground text-sm">
                          {userName || "Anonymous"}
                        </p>
                        <div className="flex items-center gap-1.5 text-xs text-[#535C91] dark:text-[#9290C3]">
                          <span className="font-bold text-active bg-[#535C91]/10 dark:bg-[#1B1A55]/60 px-2 py-0.5 rounded-full capitalize">
                            {userRole}
                          </span>
                          <span>•</span>
                          <span>{formatDate(createdAt)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Post Title */}
                    <h3 className="font-['Outfit'] text-lg font-bold text-foreground mb-2 line-clamp-1 group-hover:text-active transition-colors">
                      <Link href={`/forum/${_id}`}>{title}</Link>
                    </h3>

                    {/* Post Excerpt */}
                    <p className="font-['Inter'] text-sm text-[#535C91] dark:text-[#9290C3] leading-relaxed line-clamp-3 mb-5 flex-1">
                      {description || "No content summary available."}
                    </p>

                    {/* Stats and Read More */}
                    <div className="flex items-center justify-between text-xs font-['Inter'] text-[#535C91] dark:text-[#9290C3] pt-4 border-t border-brand-500/10 dark:border-brand-800/40 mt-auto">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <FaHeart className="w-3.5 h-3.5 text-active" /> {likes.length}
                        </span>
                        <span className="flex items-center gap-1">
                          <FaComment className="w-3.5 h-3.5 text-active" /> {comments.length}
                        </span>
                      </div>
                      <Link
                        href={`/forum/${_id}`}
                        className="flex items-center gap-1 text-active hover:opacity-90 font-bold transition-all text-sm"
                      >
                        Read More <FaArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </section>
  );
}
