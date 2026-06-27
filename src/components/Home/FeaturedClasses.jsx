"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaUser, FaTag, FaClock, FaCalendarAlt } from "react-icons/fa";

export default function FeaturedClasses({ classes }) {
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

  return (
    <section className="py-20 bg-background transition-colors duration-300 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute right-0 top-1/4 w-96 h-96 bg-active/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-6 sm:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-800/20 border border-brand-500/30 text-active text-xs font-bold tracking-wider uppercase mb-4">
            <span className="flex h-2 w-2 rounded-full bg-active animate-pulse"></span>
            Popular Choices
          </div>
          <h2 className="font-['Outfit'] text-4xl sm:text-5xl font-extrabold text-foreground tracking-tight mb-4">
            Our Featured <span className="text-active">Classes</span>
          </h2>
          <p className="font-['Inter'] text-base text-[#535C91] dark:text-[#9290C3] leading-relaxed">
            Discover our highest-rated and most booked fitness sessions led by world-class certified trainers.
          </p>
        </div>

        {/* Classes Grid */}
        {classes.length === 0 ? (
          <div className="text-center py-12 bg-brand-800/10 rounded-3xl border border-brand-500/20 max-w-lg mx-auto">
            <p className="font-['Inter'] text-[#535C91] dark:text-[#9290C3] font-medium">No featured classes available at the moment.</p>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {classes.map((cls) => {
              const { _id, className, price, authorName, author, duration, classImage, category, difficultyLevel, level, bookingCount = 0 } = cls;
              return (
                <motion.div
                  key={_id}
                  variants={cardVariants}
                  className="group bg-white dark:bg-brand-800/20 border border-brand-500/15 dark:border-brand-500/30 rounded-3xl overflow-hidden shadow-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1.5 flex flex-col h-full"
                >
                  {/* Class Image & Badges */}
                  <div className="h-56 relative overflow-hidden bg-brand-800/10">
                    <Image
                      src={classImage || "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop"}
                      alt={className}
                      fill
                      unoptimized
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 z-10 bg-brand-900/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-brand-500/20 flex items-center gap-1.5 shadow-lg">
                      <FaTag className="w-3 h-3 text-active" />
                      <span className="text-[11px] font-bold text-foreground capitalize">
                        {category}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4 z-10 bg-active text-btn-text text-xs font-extrabold px-3 py-1.5 rounded-xl shadow-md border border-brand-500/10">
                      ${price}
                    </div>
                  </div>

                  {/* Class Info */}
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-['Outfit'] text-xl font-bold text-foreground leading-tight line-clamp-1 group-hover:text-active transition-colors">
                      {className}
                    </h3>
                    <p className="font-['Inter'] text-sm text-[#535C91] dark:text-[#9290C3] mt-1.5 flex items-center gap-1.5">
                      <FaUser className="w-3 h-3 text-active" />
                      <span>by <strong className="text-foreground">{authorName || author || "Elite Trainer"}</strong></span>
                    </p>

                    <div className="flex items-center gap-4 mt-4 text-xs font-['Inter'] text-[#535C91] dark:text-[#9290C3]">
                      <span className="bg-teal-500/10 dark:bg-teal-500/20 text-teal-600 dark:text-teal-400 font-bold px-2.5 py-1 rounded-lg">
                        {difficultyLevel || level || "All Levels"}
                      </span>
                      <div className="flex items-center gap-1">
                        <FaClock className="w-3.5 h-3.5 text-active" />
                        <span>{duration || "60 Min"}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FaCalendarAlt className="w-3.5 h-3.5 text-active" />
                        <span>{bookingCount} Booked</span>
                      </div>
                    </div>

                    <div className="border-t border-brand-500/10 dark:border-brand-800/40 my-5 mt-auto"></div>

                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-['Outfit'] text-2xl font-black text-active">${price}</span>
                        <span className="text-[11px] text-[#535C91] dark:text-[#9290C3] ml-1">/ session</span>
                      </div>
                      <Link href={`/all-classes/${_id}`}>
                        <button className="bg-btn-bg text-btn-text hover:opacity-90 font-bold rounded-xl px-5 py-2.5 text-sm transition-all duration-300 cursor-pointer shadow-sm">
                          View Details
                        </button>
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
