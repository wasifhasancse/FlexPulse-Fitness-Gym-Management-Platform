"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence, LayoutGroup, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import AnimatedSectionTitle from "@/components/common/AnimatedSectionTitle";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FiArrowRight, FiHeart, FiMessageSquare, FiClock, FiTag, FiBookOpen, FiActivity, FiCheckCircle } from "react-icons/fi";
import { FaFire } from "react-icons/fa";

if (typeof window !== "undefined") { gsap.registerPlugin(ScrollTrigger); }

const TRANSITION_EASE = [0.16, 1, 0.3, 1];
const TOPIC_FILTERS = ["All Research", "Metabolic Science", "Strength & Hypertrophy", "Mobility & Recovery"];
const FALLBACK_POSTS = [
  { _id: "forum-01", title: "The Biomechanics of EPOC & High-Velocity Interval Conditioning", description: "An in-depth physiological breakdown of excess post-exercise oxygen consumption (EPOC), lactate threshold optimization, and how curved Woodway treadmill intervals sustain elevated caloric burn for up to 36 hours post-training.", image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200&auto=format&fit=crop", userName: "Elena Rostova", userRole: "HIIT & Conditioning Director", userImage: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=200&auto=format&fit=crop", createdAt: new Date().toISOString(), likes: ["1","2","3","4","5","6","7","8"], comments: ["c1","c2","c3"], readTime: "5 Min Read", category: "Metabolic Science", index: "01", trending: true },
  { _id: "forum-02", title: "Olympic Barbell Trajectory: Neuromuscular Force & Progressive Overload", description: "Discover why bar path alignment and bar-speed velocity matter more than absolute load. Learn periodization protocols designed by our Olympic strength staff to eliminate sticking points and prevent lumbar fatigue.", image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop", userName: "Marcus Vance", userRole: "Head Strength Coach", userImage: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?q=80&w=200&auto=format&fit=crop", createdAt: new Date().toISOString(), likes: ["1","2","3","4","5","6","7","8","9","10","11","12"], comments: ["c1","c2","c3","c4","c5"], readTime: "7 Min Read", category: "Strength & Hypertrophy", index: "02", trending: false },
  { _id: "forum-03", title: "Thoracic Mobility & Fascial Release for Heavy Sled & Turf Athletes", description: "High-impact athletic conditioning causes anterior tightness and shoulder impingement. Here are 4 essential dynamic decompression sequences to unlock thoracic extension and accelerate joint longevity.", image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1200&auto=format&fit=crop", userName: "Maya Lin", userRole: "Mobility & Yoga Lead", userImage: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=200&auto=format&fit=crop", createdAt: new Date().toISOString(), likes: ["1","2","3","4","5","6"], comments: ["c1","c2"], readTime: "4 Min Read", category: "Mobility & Recovery", index: "03", trending: false }
];

const filterContainerVariants = { hidden:{opacity:0}, visible:{opacity:1,transition:{staggerChildren:0.08,delayChildren:0.3}} };
const filterItemVariants = { hidden:{opacity:0,y:18,scale:0.92}, visible:{opacity:1,y:0,scale:1,transition:{type:"spring",stiffness:160,damping:22}} };
const cardsGridVariants = { hidden:{opacity:0}, visible:{opacity:1,transition:{staggerChildren:0.15}} };
const cardShellVariants = { hidden:{opacity:0,y:38,scale:0.96}, visible:{opacity:1,y:0,scale:1,transition:{duration:1.6,ease:TRANSITION_EASE,staggerChildren:0.09,delayChildren:0.12}} };
const cardImgVariants = { hidden:{scale:1.14,filter:"blur(4px)"}, visible:{scale:1,filter:"blur(0px)",transition:{duration:1.6,ease:TRANSITION_EASE}} };
const indexWatermarkVariants = { hidden:{opacity:0,x:20}, visible:{opacity:1,x:0,transition:{type:"spring",stiffness:130,damping:22}} };
const categoryPillVariants = { hidden:{opacity:0,y:-16}, visible:{opacity:1,y:0,transition:{duration:1.3,ease:TRANSITION_EASE}} };
const trendingBadgeVariants = { hidden:{opacity:0,scale:0.6,x:10}, visible:{opacity:1,scale:1,x:0,transition:{type:"spring",stiffness:180,damping:18}} };
const clinicalFocusVariants = { hidden:{opacity:0,x:-18}, visible:{opacity:1,x:0,transition:{duration:1.3,ease:TRANSITION_EASE}} };
const readTimeVariants = { hidden:{opacity:0,x:18}, visible:{opacity:1,x:0,transition:{type:"spring",stiffness:140,damping:20}} };
const authorAvatarVariants = { hidden:{opacity:0,scale:0.6,rotate:-12}, visible:{opacity:1,scale:1,rotate:0,transition:{type:"spring",stiffness:140,damping:18}} };
const authorInfoVariants = { hidden:{opacity:0,x:16}, visible:{opacity:1,x:0,transition:{duration:1.3,ease:TRANSITION_EASE}} };
const postTitleVariants = { hidden:{opacity:0,y:18,filter:"blur(4px)"}, visible:{opacity:1,y:0,filter:"blur(0px)",transition:{duration:1.5,ease:TRANSITION_EASE}} };
const excerptVariants = { hidden:{opacity:0,y:-14}, visible:{opacity:1,y:0,transition:{duration:1.2,ease:"easeOut"}} };
const engagementVariants = { hidden:{opacity:0,y:12}, visible:{opacity:1,y:0,transition:{duration:1.2,ease:"easeOut"}} };
const readCtaVariants = { hidden:{opacity:0,x:14,y:14,scale:0.88}, visible:{opacity:1,x:0,y:0,scale:1,transition:{type:"spring",stiffness:130,damping:20}} };
const bannerContainerVariants = { hidden:{opacity:0,y:30,scale:0.98}, visible:{opacity:1,y:0,scale:1,transition:{duration:1.5,ease:TRANSITION_EASE,staggerChildren:0.12,delayChildren:0.15}} };
const bannerIconVariants = { hidden:{opacity:0,scale:0.3,rotate:-18}, visible:{opacity:1,scale:1,rotate:0,transition:{type:"spring",stiffness:140,damping:18}} };
const bannerTitleVariants = { hidden:{opacity:0,y:18,filter:"blur(4px)"}, visible:{opacity:1,y:0,filter:"blur(0px)",transition:{duration:1.4,ease:TRANSITION_EASE}} };
const bannerSubVariants = { hidden:{opacity:0,y:-14}, visible:{opacity:1,y:0,transition:{duration:1.2,ease:"easeOut"}} };
const bannerBtnVariants = { hidden:{opacity:0,x:28,scale:0.9}, visible:{opacity:1,x:0,scale:1,transition:{type:"spring",stiffness:140,damping:20}} };

export default function LatestForumPosts({ posts }) {
  const [selectedTopic, setSelectedTopic] = useState("All Research");
  const sectionRef = useRef(null);
  const cardsGridRef = useRef(null);
  const statsRef = useRef(null);
  const isCardsInView = useInView(cardsGridRef, { once: true, amount: 0.1 });
  const isStatsInView = useInView(statsRef, { once: true, amount: 0.5 });
  const [cardsTriggered, setCardsTriggered] = useState(false);

  useEffect(() => {
    if (isCardsInView) {
      const timer = setTimeout(() => setCardsTriggered(true), 1150);
      return () => clearTimeout(timer);
    }
  }, [isCardsInView]);

  useEffect(() => {
    if (!isStatsInView) return;
    [{ sel: ".forum-stat-threads", target: 450, suf: "+" }, { sel: ".forum-stat-athletes", target: 15, suf: "k+" }, { sel: ".forum-stat-reviewed", target: 100, suf: "%" }].forEach(({ sel, target, suf }) => {
      const el = document.querySelector(sel);
      if (!el) return;
      gsap.fromTo(el, { innerText: 0 }, { innerText: target, duration: 2.4, ease: "power1.out", snap: { innerText: 1 }, onUpdate() { el.innerText = Math.round(this.targets()[0].innerText) + suf; } });
    });
  }, [isStatsInView]);

  useGSAP(() => {
    const tl = gsap.timeline({ scrollTrigger: { trigger: sectionRef.current, start: "top 85%", once: true }, defaults: { ease: "power3.out" } });
    tl.fromTo(".forum-kicker", { y: -30, opacity: 0, filter: "blur(6px)" }, { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.6, ease: "power2.out" }).addLabel("kickerEnd");
    tl.fromTo(".forum-title", { y: 48, opacity: 0, filter: "blur(8px)", scale: 0.96 }, { y: 0, opacity: 1, filter: "blur(0px)", scale: 1, duration: 2.2, ease: "power3.out" }, "kickerEnd-=0.4").addLabel("titleEnd");
    tl.fromTo(".forum-subtitle", { y: -28, opacity: 0, filter: "blur(5px)" }, { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.8, ease: "power2.out" }, "titleEnd-=0.3").addLabel("subtitleEnd");
    tl.fromTo(".forum-stats-box", { x: 42, opacity: 0, scale: 0.94 }, { x: 0, opacity: 1, scale: 1, duration: 1.6, ease: "back.out(1.2)" }, "subtitleEnd-=0.4");
  }, { scope: sectionRef });

  const formatPostCategory = (post, idx) => {
    if (post.category) return post.category;
    const t = (post.title || "").toLowerCase();
    if (t.includes("metabolic") || t.includes("burn") || t.includes("hiit")) return "Metabolic Science";
    if (t.includes("strength") || t.includes("barbell") || t.includes("hypertrophy")) return "Strength & Hypertrophy";
    if (t.includes("mobility") || t.includes("yoga") || t.includes("stretch")) return "Mobility & Recovery";
    return idx % 2 === 0 ? "Metabolic Science" : "Strength & Hypertrophy";
  };

  const getClinicalFocus = (cat) => ({ "Metabolic Science": "VO2 Max & Post-Workout EPOC Burn", "Strength & Hypertrophy": "Force Mechanics & Progressive Overload", "Mobility & Recovery": "Thoracic Decompression & Joint ROM" }[cat] || "Exercise Physiology & Biomechanics");

  const rawPosts = useMemo(() => {
    const source = Array.isArray(posts) && posts.length > 0 ? posts.slice(0, 6) : FALLBACK_POSTS;
    return source.map((p, idx) => { const cat = formatPostCategory(p, idx); return { ...p, category: cat, clinicalFocus: getClinicalFocus(cat), readTime: p.readTime || `${4 + (idx % 4)} Min Read`, index: p.index || `0${idx + 1}`, trending: idx === 0 }; });
  }, [posts]);

  const filteredPosts = useMemo(() => selectedTopic === "All Research" ? rawPosts : rawPosts.filter(p => p.category === selectedTopic), [selectedTopic, rawPosts]);

  const formatDate = (date) => { if (!date) return "Recently"; try { return new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }); } catch { return "Recently"; } };

  return (
    <section ref={sectionRef} className="py-20 lg:py-28 bg-linear-to-b from-background via-[#1B1A55]/10 to-background border-t border-brand-500/15 relative overflow-hidden transition-colors duration-300">
      <div className="absolute top-1/4 right-1/10 w-96 sm:w-140 h-96 sm:h-140 bg-active/6 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-0 w-80 sm:w-120 h-80 sm:h-120 bg-brand-500/8 rounded-full blur-[130px] pointer-events-none -z-10" />
      <div className="w-11/12 mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 sm:mb-16 gap-6 border-b border-brand-500/15 pb-8">
          <AnimatedSectionTitle kicker="Knowledge Sharing • Research & Athlete Insights" title="Latest From Our Community Forum" highlightText="Community Forum" subtitle="Scientific training breakdowns, nutrition protocols, and injury prevention insights published by certified master coaches, exercise physiologists, and community athletes." align="left" className="mb-0" kickerClassName="forum-kicker" titleClassName="forum-title" subtitleClassName="forum-subtitle" />
          <div ref={statsRef} className="forum-stats-box flex items-center gap-4 sm:gap-6 bg-[#535C91]/5 dark:bg-[#1B1A55]/50 p-4 rounded-2xl border border-brand-500/20 shrink-0 font-[Outfit]">
            <div><p className="forum-stat-threads text-2xl font-black text-active tracking-tight">0+</p><p className="text-[10px] sm:text-xs text-[#535C91] dark:text-[#9290C3] font-bold uppercase tracking-wider">Research Threads</p></div>
            <div className="h-8 w-px bg-brand-500/20" />
            <div><p className="forum-stat-athletes text-2xl font-black text-active tracking-tight">0k+</p><p className="text-[10px] sm:text-xs text-[#535C91] dark:text-[#9290C3] font-bold uppercase tracking-wider">Active Athletes</p></div>
            <div className="h-8 w-px bg-brand-500/20" />
            <div><p className="forum-stat-reviewed text-2xl font-black text-active tracking-tight">0%</p><p className="text-[10px] sm:text-xs text-[#535C91] dark:text-[#9290C3] font-bold uppercase tracking-wider">Coach Reviewed</p></div>
          </div>
        </div>
        <LayoutGroup id="latestForumTopicGroup">
          <motion.div variants={filterContainerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar select-none">
            {TOPIC_FILTERS.map(topic => {
              const isActive = selectedTopic === topic;
              return (
                <motion.button key={topic} variants={filterItemVariants} whileHover={{ y: -2, scale: 1.02 }} whileTap={{ scale: 0.96 }} onClick={() => setSelectedTopic(topic)} className={`relative px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-tight transition-colors duration-200 whitespace-nowrap cursor-pointer ${isActive ? "text-white" : "bg-[#535C91]/8 dark:bg-[#1B1A55]/60 hover:bg-[#535C91]/15 text-[#535C91] dark:text-[#9290C3] border border-brand-500/15"}`}>
                  {isActive && <motion.span layoutId="activeLatestForumTopicPill" className="absolute inset-0 rounded-xl bg-active shadow-md shadow-active/20" transition={{ type: "spring", stiffness: 450, damping: 35 }} />}
                  <span className="relative z-10">{topic}</span>
                </motion.button>
              );
            })}
          </motion.div>
        </LayoutGroup>
        <div ref={cardsGridRef}>
          <motion.div layout="position" variants={cardsGridVariants} initial="hidden" animate={cardsTriggered ? "visible" : "hidden"} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
            <AnimatePresence mode="popLayout">
              {filteredPosts.map((post, idx) => {
                const { _id, title, description, userName = "FlexPulse Coach", userRole = "Trainer", userImage, createdAt, image, likes = [], comments = [], category, clinicalFocus, readTime, index, trending } = post;
                const likeCount = Array.isArray(likes) ? likes.length : Number(likes) || 0;
                const commentCount = Array.isArray(comments) ? comments.length : Number(comments) || 0;
                return (
                  <motion.div key={`${selectedTopic}-${_id || idx}`} layout variants={cardShellVariants} exit={{ opacity: 0, scale: 0.92, y: 14, transition: { duration: 0.28 } }} className="flex">
                    <div className="group relative rounded-3xl bg-white dark:bg-[#070F2B] border border-brand-500/20 hover:border-active/60 transition-all duration-300 ease-out hover:-translate-y-1.5 flex flex-col justify-between w-full shadow-xs hover:shadow-md overflow-hidden cursor-pointer">
                      <div className="relative h-56 sm:h-60 overflow-hidden bg-brand-800/10">
                        <motion.div variants={cardImgVariants} className="relative w-full h-full">
                          <Image src={image || "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200&auto=format&fit=crop"} alt={title || "Forum Post"} fill unoptimized sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover group-hover:scale-106 transition-transform duration-500 ease-out" />
                        </motion.div>
                        <div className="absolute inset-0 bg-linear-to-t from-[#070F2B] via-[#070F2B]/35 to-transparent" />
                        <motion.span variants={indexWatermarkVariants} className="absolute top-3.5 right-4 font-[Outfit] font-black text-3xl sm:text-4xl text-white/20 group-hover:text-active/50 transition-colors duration-300 select-none pointer-events-none">{index}</motion.span>
                        <div className="absolute top-3.5 left-3.5 flex items-center gap-2 z-10">
                          <motion.div variants={categoryPillVariants} className="bg-background/90 dark:bg-[#1B1A55]/90 backdrop-blur-md px-3 py-1 rounded-full border border-brand-500/25 flex items-center gap-1.5 shadow-sm text-foreground"><FiTag className="w-3 h-3 text-active" /><span className="text-[10px] font-extrabold uppercase tracking-wide">{category}</span></motion.div>
                          {trending && <motion.div variants={trendingBadgeVariants} className="bg-active text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md flex items-center gap-1"><FaFire className="w-2.5 h-2.5 text-amber-300" /><span>Trending</span></motion.div>}
                        </div>
                        <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between z-10 text-white text-[11px] font-medium">
                          <motion.div variants={clinicalFocusVariants} className="bg-[#1B1A55]/85 backdrop-blur-md px-2.5 py-1 rounded-xl border border-white/10 flex items-center gap-1.5 truncate max-w-[220px]"><FiActivity className="w-3 h-3 text-active" /><span className="truncate">{clinicalFocus}</span></motion.div>
                          <motion.div variants={readTimeVariants} className="bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-xl border border-white/10 text-white text-[10px] font-bold flex items-center gap-1 shrink-0"><FiClock className="w-3 h-3 text-active" /><span>{readTime}</span></motion.div>
                        </div>
                      </div>
                      <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between gap-4">
                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                            <motion.div variants={authorAvatarVariants} className="shrink-0">
                              {userImage ? <img src={userImage} alt={userName} className="w-9 h-9 rounded-full object-cover ring-2 ring-brand-500/30" /> : <div className="w-9 h-9 rounded-full bg-active/20 flex items-center justify-center text-active font-bold text-sm ring-2 ring-brand-500/30">{userName.charAt(0)}</div>}
                            </motion.div>
                            <motion.div variants={authorInfoVariants} className="leading-tight">
                              <div className="flex items-center gap-1.5"><p className="font-bold text-foreground text-sm font-[Outfit]">{userName}</p><FiCheckCircle className="w-3.5 h-3.5 text-active" /></div>
                              <div className="flex items-center gap-1.5 text-[11px] text-[#535C91] dark:text-[#9290C3] font-[Inter] mt-0.5"><span className="font-extrabold text-active uppercase text-[10px]">{userRole}</span><span>•</span><span>{formatDate(createdAt)}</span></div>
                            </motion.div>
                          </div>
                          <motion.h3 variants={postTitleVariants} className="font-[Outfit] text-lg sm:text-xl font-bold text-foreground leading-snug line-clamp-2 group-hover:text-active transition-colors"><Link href={`/forum/${_id}`}>{title}</Link></motion.h3>
                          <motion.p variants={excerptVariants} className="font-[Inter] text-xs sm:text-sm text-[#535C91] dark:text-[#9290C3] line-clamp-3 leading-relaxed">{description || "Join the conversation and discuss technical fitness mechanics with certified athletes and trainers."}</motion.p>
                        </div>
                        <div className="flex items-center justify-between pt-4 border-t border-brand-500/15 font-[Inter] text-xs">
                          <motion.div variants={engagementVariants} className="flex items-center gap-4 text-[#535C91] dark:text-[#9290C3]">
                            <span className="flex items-center gap-1.5 hover:text-active transition-colors"><FiHeart className="w-3.5 h-3.5 text-active" /><span className="font-semibold">{likeCount}</span></span>
                            <span className="flex items-center gap-1.5 hover:text-active transition-colors"><FiMessageSquare className="w-3.5 h-3.5 text-active" /><span className="font-semibold">{commentCount}</span></span>
                          </motion.div>
                          <motion.div variants={readCtaVariants}><Link href={`/forum/${_id}`} className="inline-flex items-center gap-1 font-extrabold text-active hover:underline text-xs"><span>Read Discussion</span><FiArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" /></Link></motion.div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>
        <motion.div variants={bannerContainerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="mt-14 sm:mt-18 p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#070F2B] border border-brand-500/20 hover:border-active/40 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs relative overflow-hidden transition-colors duration-300">
          <div className="absolute inset-0 bg-linear-to-r from-brand-500/5 via-transparent to-active/5 pointer-events-none" />
          <div className="flex items-center gap-4 relative z-10">
            <motion.div variants={bannerIconVariants} className="w-12 h-12 rounded-2xl bg-active/10 dark:bg-active/20 flex items-center justify-center text-active shrink-0 border border-active/25"><FiBookOpen className="w-6 h-6 text-active" /></motion.div>
            <div>
              <motion.h4 variants={bannerTitleVariants} className="font-[Outfit] text-lg sm:text-xl font-extrabold text-foreground">Have a Training Breakthrough or Nutrition Query to Share?</motion.h4>
              <motion.p variants={bannerSubVariants} className="font-[Inter] text-xs sm:text-sm text-[#535C91] dark:text-[#9290C3] mt-0.5">Connect with 15,000+ active athletes and certified coaches sharing research-backed techniques.</motion.p>
            </div>
          </div>
          <motion.div variants={bannerBtnVariants} className="relative z-10 shrink-0">
            <Link href="/forum" className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-btn-bg text-btn-text font-extrabold text-xs sm:text-sm whitespace-nowrap shadow-sm hover:shadow-md hover:brightness-105 active:scale-95 transition-all cursor-pointer"><span>Start a Discussion</span><FiArrowRight className="w-4 h-4" /></Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
