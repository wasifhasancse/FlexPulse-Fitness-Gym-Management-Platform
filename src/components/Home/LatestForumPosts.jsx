// feat: telemetry widget
"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { 
  FiArrowRight, 
  FiHeart, 
  FiMessageSquare, 
  FiClock, 
  FiCalendar, 
  FiTag, 
  FiBookOpen, 
  FiActivity,
  FiCheckCircle,
  FiTrendingUp
} from "react-icons/fi";
import { FaUserCircle, FaDumbbell, FaFire } from "react-icons/fa";

const TRANSITION_EASE = [0.16, 1, 0.3, 1];

const TOPIC_FILTERS = [
  "All Research",
  "Metabolic Science",
  "Strength & Hypertrophy",
  "Mobility & Recovery"
];

const FALLBACK_POSTS = [
  {
    _id: "forum-01",
    title: "The Biomechanics of EPOC & High-Velocity Interval Conditioning",
    description: "An in-depth physiological breakdown of excess post-exercise oxygen consumption (EPOC), lactate threshold optimization, and how curved Woodway treadmill intervals sustain elevated caloric burn for up to 36 hours post-training.",
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200&auto=format&fit=crop",
    userName: "Elena Rostova",
    userRole: "HIIT & Conditioning Director",
    userImage: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=200&auto=format&fit=crop",
    createdAt: new Date().toISOString(),
    likes: ["1", "2", "3", "4", "5", "6", "7", "8"],
    comments: ["c1", "c2", "c3"],
    readTime: "5 Min Read",
    category: "Metabolic Science",
    index: "01",
    trending: true
  },
  {
    _id: "forum-02",
    title: "Olympic Barbell Trajectory: Neuromuscular Force & Progressive Overload",
    description: "Discover why bar path alignment and bar-speed velocity matter more than absolute load. Learn periodization protocols designed by our Olympic strength staff to eliminate sticking points and prevent lumbar fatigue.",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop",
    userName: "Marcus Vance",
    userRole: "Head Strength Coach",
    userImage: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?q=80&w=200&auto=format&fit=crop",
    createdAt: new Date().toISOString(),
    likes: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
    comments: ["c1", "c2", "c3", "c4", "c5"],
    readTime: "7 Min Read",
    category: "Strength & Hypertrophy",
    index: "02",
    trending: false
  },
  {
    _id: "forum-03",
    title: "Thoracic Mobility & Fascial Release for Heavy Sled & Turf Athletes",
    description: "High-impact athletic conditioning causes anterior tightness and shoulder impingement. Here are 4 essential dynamic decompression sequences to unlock thoracic extension and accelerate joint longevity.",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1200&auto=format&fit=crop",
    userName: "Maya Lin",
    userRole: "Mobility & Yoga Lead",
    userImage: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=200&auto=format&fit=crop",
    createdAt: new Date().toISOString(),
    likes: ["1", "2", "3", "4", "5", "6"],
    comments: ["c1", "c2"],
    readTime: "4 Min Read",
    category: "Mobility & Recovery",
    index: "03",
    trending: false
  }
];

export default function LatestForumPosts({ posts }) {
  const [selectedTopic, setSelectedTopic] = useState("All Research");

  // Format category intelligently based on title or post properties
  const formatPostCategory = (post, idx) => {
    if (post.category) return post.category;
    const t = (post.title || "").toLowerCase();
    if (t.includes("metabolic") || t.includes("burn") || t.includes("circuit") || t.includes("cardio") || t.includes("hiit")) {
      return "Metabolic Science";
    }
    if (t.includes("strength") || t.includes("barbell") || t.includes("weight") || t.includes("hypertrophy") || t.includes("power")) {
      return "Strength & Hypertrophy";
    }
    if (t.includes("flexibility") || t.includes("balance") || t.includes("yoga") || t.includes("mobility") || t.includes("stretch")) {
      return "Mobility & Recovery";
    }
    return idx % 2 === 0 ? "Metabolic Science" : "Strength & Hypertrophy";
  };

  const getClinicalFocus = (category) => {
    switch (category) {
      case "Metabolic Science":
        return "VO2 Max & Post-Workout EPOC Burn";
      case "Strength & Hypertrophy":
        return "Force Mechanics & Progressive Overload";
      case "Mobility & Recovery":
        return "Thoracic Decompression & Joint ROM";
      default:
        return "Exercise Physiology & Biomechanics";
    }
  };

  const rawPosts = useMemo(() => {
    const source = Array.isArray(posts) && posts.length > 0 ? posts.slice(0, 6) : FALLBACK_POSTS;
    return source.map((p, idx) => {
      const cat = formatPostCategory(p, idx);
      return {
        ...p,
        category: cat,
        clinicalFocus: getClinicalFocus(cat),
        readTime: p.readTime || `${4 + (idx % 4)} Min Read`,
        index: p.index || `0${idx + 1}`,
        trending: idx === 0
      };
    });
  }, [posts]);

  // Filter posts smoothly by topic
  const filteredPosts = useMemo(() => {
    if (selectedTopic === "All Research") return rawPosts;
    return rawPosts.filter((p) => p.category === selectedTopic);
  }, [selectedTopic, rawPosts]);

  const formatDate = (date) => {
    if (!date) return "Recently";
    try {
      return new Date(date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return "Recently";
    }
  };

  return (
    <section className="py-20 lg:py-28 bg-linear-to-b from-background via-[#1B1A55]/10 to-background border-t border-brand-500/15 relative overflow-hidden transition-colors duration-300">
      {/* Background Ambient Lighting Mesh */}
      <div className="absolute top-1/4 right-1/10 w-96 sm:w-140 h-96 sm:h-140 bg-active/6 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-0 w-80 sm:w-120 h-80 sm:h-120 bg-brand-500/8 rounded-full blur-[130px] pointer-events-none -z-10" />

      <div className="w-11/12 mx-auto relative z-10">
        
        {/* Section Header with Telemetry Bar */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 sm:mb-16 gap-6 border-b border-brand-500/15 pb-8">
          <div className="max-w-2xl space-y-3">
            
            {/* Accreditation Kicker Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-800/25 dark:bg-[#1B1A55]/70 border border-brand-500/25 text-xs font-bold tracking-wide shadow-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-active opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-active"></span>
              </span>
              <span className="text-active uppercase tracking-wider font-extrabold text-[11px]">
                Knowledge Sharing
              </span>
              <span className="text-[#535C91] dark:text-[#9290C3]">
                • Research & Athlete Insights
              </span>
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-['Outfit'] tracking-tight text-foreground leading-[1.12]">
              Latest From Our <span className="text-active">Community Forum</span>
            </h2>

            <p className="text-sm sm:text-base text-[#535C91] dark:text-[#9290C3] font-['Inter'] leading-relaxed pt-1">
              Scientific training breakdowns, nutrition protocols, and injury prevention insights published by certified master coaches, exercise physiologists, and community athletes.
            </p>
          </div>

          {/* Quick Curriculum Data Specs */}
          <div className="flex items-center gap-4 sm:gap-6 bg-[#535C91]/5 dark:bg-[#1B1A55]/50 p-4 rounded-2xl border border-brand-500/20 shrink-0 font-['Outfit']">
            <div>
              <p className="text-2xl font-black text-active tracking-tight">450+</p>
              <p className="text-[10px] sm:text-xs text-[#535C91] dark:text-[#9290C3] font-bold uppercase tracking-wider">
                Research Threads
              </p>
            </div>
            <div className="h-8 w-px bg-brand-500/20"></div>
            <div>
              <p className="text-2xl font-black text-active tracking-tight">15k+</p>
              <p className="text-[10px] sm:text-xs text-[#535C91] dark:text-[#9290C3] font-bold uppercase tracking-wider">
                Active Athletes
              </p>
            </div>
            <div className="h-8 w-px bg-brand-500/20"></div>
            <div>
              <p className="text-2xl font-black text-active tracking-tight">100%</p>
              <p className="text-[10px] sm:text-xs text-[#535C91] dark:text-[#9290C3] font-bold uppercase tracking-wider">
                Coach Reviewed
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Topic Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar select-none">
          {TOPIC_FILTERS.map((topic) => {
            const isActive = selectedTopic === topic;
            return (
              <button
                key={topic}
                onClick={() => setSelectedTopic(topic)}
                className={`relative px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-tight transition-all duration-200 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? "bg-active text-white shadow-md shadow-active/20"
                    : "bg-[#535C91]/8 dark:bg-[#1B1A55]/60 hover:bg-[#535C91]/15 text-[#535C91] dark:text-[#9290C3] border border-brand-500/15"
                }`}
              >
                {topic}
              </button>
            );
          })}
        </div>

        {/* Forum Cards Grid with Decoupled Smooth Transitions */}
        <motion.div 
          layout="position"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch"
        >
          <AnimatePresence mode="popLayout">
            {filteredPosts.map((post, idx) => {
              const { 
                _id, 
                title, 
                description, 
                userName = "FlexPulse Coach", 
                userRole = "Trainer", 
                userImage, 
                createdAt, 
                image, 
                likes = [], 
                comments = [],
                category,
                clinicalFocus,
                readTime,
                index,
                trending
              } = post;

              const likeCount = Array.isArray(likes) ? likes.length : Number(likes) || 0;
              const commentCount = Array.isArray(comments) ? comments.length : Number(comments) || 0;

              return (
                <motion.div
                  key={_id || idx}
                  layout="position"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 18 }}
                  transition={{ duration: 0.35, ease: TRANSITION_EASE }}
                  className="flex"
                >
                  <div className="group relative rounded-3xl bg-white dark:bg-[#070F2B] border border-brand-500/20 hover:border-active/60 transition-all duration-300 ease-out hover:-translate-y-1.5 flex flex-col justify-between w-full shadow-lg hover:shadow-2xl overflow-hidden cursor-pointer">
                    
                    {/* Post Image Container */}
                    <div className="relative h-56 sm:h-60 overflow-hidden bg-brand-800/10">
                      <Image
                        src={image || "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200&auto=format&fit=crop"}
                        alt={title || "Forum Post"}
                        fill
                        unoptimized
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-106 transition-transform duration-500 ease-out"
                      />

                      {/* Dark Vignette Overlay */}
                      <div className="absolute inset-0 bg-linear-to-t from-[#070F2B] via-[#070F2B]/35 to-transparent" />

                      {/* Watermark Index in Top Right */}
                      <span className="absolute top-3.5 right-4 font-['Outfit'] font-black text-3xl sm:text-4xl text-white/20 group-hover:text-active/50 transition-colors duration-300 select-none pointer-events-none">
                        {index}
                      </span>

                      {/* Top Badges: Category & Reading Time */}
                      <div className="absolute top-3.5 left-3.5 flex items-center gap-2 z-10">
                        <div className="bg-background/90 dark:bg-[#1B1A55]/90 backdrop-blur-md px-3 py-1 rounded-full border border-brand-500/25 flex items-center gap-1.5 shadow-sm text-foreground">
                          <FiTag className="w-3 h-3 text-active" />
                          <span className="text-[10px] font-extrabold uppercase tracking-wide">
                            {category}
                          </span>
                        </div>

                        {trending && (
                          <div className="bg-active text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
                            <FaFire className="w-2.5 h-2.5 text-amber-300" />
                            <span>Trending</span>
                          </div>
                        )}
                      </div>

                      {/* Bottom Image Spec: Read Time & Clinical Focus */}
                      <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between z-10 text-white text-[11px] font-medium">
                        <div className="bg-[#1B1A55]/85 backdrop-blur-md px-2.5 py-1 rounded-xl border border-white/10 flex items-center gap-1.5 truncate max-w-[220px]">
                          <FiActivity className="w-3 h-3 text-active" />
                          <span className="truncate">{clinicalFocus}</span>
                        </div>

                        <div className="bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-xl border border-white/10 text-white text-[10px] font-bold flex items-center gap-1 shrink-0">
                          <FiClock className="w-3 h-3 text-active" />
                          <span>{readTime}</span>
                        </div>
                      </div>
                    </div>

                    {/* Post Content Details */}
                    <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between gap-4">
                      
                      <div className="space-y-3">
                        {/* Author Header Row */}
                        <div className="flex items-center gap-3">
                          {userImage ? (
                            <img
                              src={userImage}
                              alt={userName}
                              className="w-9 h-9 rounded-full object-cover ring-2 ring-brand-500/30 shrink-0"
                            />
                          ) : (
                            <div className="w-9 h-9 rounded-full bg-active/20 flex items-center justify-center text-active font-bold text-sm ring-2 ring-brand-500/30 shrink-0">
                              {userName.charAt(0)}
                            </div>
                          )}

                          <div className="leading-tight">
                            <div className="flex items-center gap-1.5">
                              <p className="font-bold text-foreground text-sm font-['Outfit']">
                                {userName}
                              </p>
                              <FiCheckCircle className="w-3.5 h-3.5 text-active" />
                            </div>
                            <div className="flex items-center gap-1.5 text-[11px] text-[#535C91] dark:text-[#9290C3] font-['Inter'] mt-0.5">
                              <span className="font-extrabold text-active uppercase text-[10px]">
                                {userRole}
                              </span>
                              <span>•</span>
                              <span>{formatDate(createdAt)}</span>
                            </div>
                          </div>
                        </div>

                        {/* Post Title */}
                        <h3 className="font-['Outfit'] text-lg sm:text-xl font-bold text-foreground leading-snug line-clamp-2 group-hover:text-active transition-colors">
                          <Link href={`/forum/${_id}`}>{title}</Link>
                        </h3>

                        {/* Post Excerpt */}
                        <p className="font-['Inter'] text-xs sm:text-sm text-[#535C91] dark:text-[#9290C3] line-clamp-3 leading-relaxed">
                          {description || "Join the conversation and discuss technical fitness mechanics with certified athletes and trainers."}
                        </p>
                      </div>

                      {/* Card Footer: Engagement Counters & Direct Read Link */}
                      <div className="flex items-center justify-between pt-4 border-t border-brand-500/15 font-['Inter'] text-xs">
                        
                        <div className="flex items-center gap-4 text-[#535C91] dark:text-[#9290C3]">
                          <span className="flex items-center gap-1.5 hover:text-active transition-colors">
                            <FiHeart className="w-3.5 h-3.5 text-active" />
                            <span className="font-semibold">{likeCount}</span>
                          </span>

                          <span className="flex items-center gap-1.5 hover:text-active transition-colors">
                            <FiMessageSquare className="w-3.5 h-3.5 text-active" />
                            <span className="font-semibold">{commentCount}</span>
                          </span>
                        </div>

                        <Link
                          href={`/forum/${_id}`}
                          className="inline-flex items-center gap-1 font-extrabold text-active hover:underline text-xs"
                        >
                          <span>Read Discussion</span>
                          <FiArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </Link>

                      </div>

                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Section Community Prompt Banner */}
        <div className="mt-14 sm:mt-18 p-6 sm:p-8 rounded-3xl bg-linear-to-r from-brand-800/30 via-[#1B1A55]/40 to-brand-800/30 border border-brand-500/25 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-active/20 flex items-center justify-center text-active shrink-0 border border-brand-500/30">
              <FiBookOpen className="w-6 h-6 text-active" />
            </div>
            <div>
              <h4 className="font-['Outfit'] text-lg sm:text-xl font-extrabold text-foreground">
                Have a Training Breakthrough or Nutrition Query to Share?
              </h4>
              <p className="font-['Inter'] text-xs sm:text-sm text-[#535C91] dark:text-[#9290C3] mt-0.5">
                Connect with 15,000+ active athletes and certified coaches sharing research-backed techniques.
              </p>
            </div>
          </div>
          <Link
            href="/forum"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-btn-bg text-btn-text font-bold text-xs sm:text-sm whitespace-nowrap shadow-md hover:opacity-90 transition-all cursor-pointer shrink-0"
          >
            <span>Start a Discussion</span>
            <FiArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
