"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, LayoutGroup, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { 
  FiChevronDown, 
  FiHelpCircle, 
  FiSearch, 
  FiArrowRight, 
  FiMessageSquare,
  FiCheckCircle
} from "react-icons/fi";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const TRANSITION_EASE = [0.16, 1, 0.3, 1];

const CATEGORIES = [
  "All Questions",
  "Memberships & Pricing",
  "Classes & Coaching",
  "Recovery & Facilities",
  "Policies & Access"
];

const FAQS = [
  {
    id: "f1",
    category: "Memberships & Pricing",
    question: "Are there any hidden signup fees, maintenance costs, or lock-in contracts?",
    answer: "Zero hidden fees. We believe in absolute transparency. All plans are billed straightforwardly as indicated with no compulsory multi-year contracts, initiation fees, or surprise equipment charges. You can cancel or freeze your membership with 14 days' written notice directly from your athlete dashboard."
  },
  {
    id: "f2",
    category: "Classes & Coaching",
    question: "Do I need prior experience or high athletic fitness to attend group classes?",
    answer: "Not at all. Every class at FlexPulse features structured regression and progression tiers. Before each session, master coaches demonstrate foundational kinematics and offer scaled variations (e.g. dumbbell goblet squats instead of heavy barbell back squats). Beginners are welcomed and coached closely."
  },
  {
    id: "f3",
    category: "Memberships & Pricing",
    question: "What exactly is included in the complimentary 1-Day VIP Trial Pass?",
    answer: "Your VIP Pass grants full, unrestricted access for 24 hours: entry to all strength arenas, curved treadmill turf tracks, attendance at any scheduled group class, access to Finnish cedar saunas, cold plunge immersion baths, keyless digital lockers, and a complimentary InBody 570 body composition scan."
  },
  {
    id: "f4",
    category: "Recovery & Facilities",
    question: "Are cold plunges, saunas, and towel service complimentary for all members?",
    answer: "Yes! Full access to our recovery suites—including sub-zero cold plunge tubs (38°F–42°F), Scandinavian cedar saunas, private showers with eucalyptus products, and fresh towel service—is included for Pro Athlete and Elite Champion tiers, as well as VIP Trial Pass holders."
  },
  {
    id: "f5",
    category: "Policies & Access",
    question: "How does 24/7 keyless access work across your 4 locations?",
    answer: "Upon joining, your mobile athlete app or biometric key card provides instant, encrypted 24/7 access to all 4 flagship FlexPulse training hubs. Security turnstiles, video monitoring, and emergency SOS stations ensure safe training at any hour of the night or day."
  },
  {
    id: "f6",
    category: "Policies & Access",
    question: "What is the cancellation and booking policy for high-demand classes?",
    answer: "Class booking opens 7 days in advance via our website or mobile app. You can cancel your reservation up to 2 hours before class without penalty, allowing athletes on the automated waitlist to take open slots. If you are on the waitlist, you will receive an instant notification when a spot frees up."
  },
  {
    id: "f7",
    category: "Classes & Coaching",
    question: "Can I work 1-on-1 with master coaches for custom nutrition & programming?",
    answer: "Yes! In addition to group classes, our certified CSCS and exercise physiologists provide individualized 1-on-1 athletic periodization, kinetic bar-path video analysis, custom macro meal planning, and bi-weekly InBody biometric reviews."
  },
  {
    id: "f8",
    category: "Recovery & Facilities",
    question: "What sanitary and hygiene protocols are maintained across the training floor?",
    answer: "We adhere to hospital-grade sanitation. All Eleiko barbells, dumbells, and turf tracks are disinfected continuously throughout the day. Saunas and cold plunge suites utilize UV-C ultraviolet filtration and undergo automated continuous filtration cycles every 15 minutes."
  }
];

// ── Category Filter Tabs Variants ───────────────────────────────────────────
const filterContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15
    }
  }
};

const filterItemVariants = {
  hidden: { opacity: 0, y: 18, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 220, damping: 20 }
  }
};

// ── Accordion FAQ Card Variants (Element-by-Element Differentiation) ─────────
const faqCardShellVariants = {
  hidden: { opacity: 0, y: 35, scale: 0.96 },
  visible: (customIndex = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1.5,
      ease: TRANSITION_EASE,
      delay: customIndex * 0.1,
      staggerChildren: 0.08,
      delayChildren: 0.12
    }
  })
};

const faqTopLineVariants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 1.1, ease: TRANSITION_EASE }
  }
};

const faqIndexVariants = {
  hidden: { opacity: 0, x: -22, scale: 0.8 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 130, damping: 18 }
  }
};

const faqCategoryPillVariants = {
  hidden: { opacity: 0, y: -14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.1, ease: TRANSITION_EASE }
  }
};

const faqQuestionVariants = {
  hidden: { opacity: 0, y: 18, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.4, ease: TRANSITION_EASE }
  }
};

const faqChevronVariants = {
  hidden: { opacity: 0, scale: 0.5, rotate: -30 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { type: "spring", stiffness: 160, damping: 16 }
  }
};

// ── Contact Banner Variants ──────────────────────────────────────────────────
const bannerVariants = {
  hidden: { opacity: 0, y: 35, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1.4,
      ease: TRANSITION_EASE,
      staggerChildren: 0.1,
      delayChildren: 0.15
    }
  }
};

const bannerIconVariants = {
  hidden: { opacity: 0, scale: 0.5, rotate: -25 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { type: "spring", stiffness: 160, damping: 18 }
  }
};

const bannerTitleVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1.1, ease: TRANSITION_EASE }
  }
};

const bannerSubtitleVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.0, ease: "easeOut" }
  }
};

const bannerButtonVariants = {
  hidden: { opacity: 0, x: 20, scale: 0.9 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 150, damping: 18 }
  }
};

export default function HomeFaqSection() {
  const [activeCategory, setActiveCategory] = useState("All Questions");
  const [searchQuery, setSearchQuery] = useState("");
  const [openFaq, setOpenFaq] = useState("f1");

  const sectionRef = useRef(null);
  const faqListRef = useRef(null);
  const isFaqInView = useInView(faqListRef, { once: true, amount: 0.1 });
  const [faqsTriggered, setFaqsTriggered] = useState(false);

  // 1.0s viewport-gated staged delay for FAQ cards per rule.md
  useEffect(() => {
    if (isFaqInView) {
      const timer = setTimeout(() => setFaqsTriggered(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [isFaqInView]);

  // GSAP ScrollTrigger for Header Triggered Transforms
  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          once: true
        },
        defaults: { ease: "power3.out" }
      });

      // 1. Kicker: Downward entrance (-35px) + de-blur
      tl.fromTo(
        ".faq-kicker",
        { y: -35, opacity: 0, filter: "blur(6px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.6, ease: "power2.out" }
      ).addLabel("kickerEnd");

      // 2. Headline: Majestic upward rising sweep (+50px) + de-blur + scale
      tl.fromTo(
        ".faq-headline",
        { y: 50, opacity: 0, filter: "blur(8px)", scale: 0.95 },
        { y: 0, opacity: 1, filter: "blur(0px)", scale: 1, duration: 2.2, ease: "power3.out" },
        "kickerEnd-=0.4"
      ).addLabel("headlineEnd");

      // 3. Subtitle: Contrasting downward drop (-28px) + de-blur
      tl.fromTo(
        ".faq-subtitle",
        { y: -28, opacity: 0, filter: "blur(5px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.8, ease: "power2.out" },
        "headlineEnd-=0.3"
      ).addLabel("subtitleEnd");

      // 4. Search Bar: Horizontal slide from right
      tl.fromTo(
        ".faq-search",
        { x: 45, opacity: 0, scale: 0.92 },
        { x: 0, opacity: 1, scale: 1, duration: 1.6, ease: "back.out(1.2)" },
        "subtitleEnd-=0.4"
      );
    },
    { scope: sectionRef }
  );

  const filteredFaqs = useMemo(() => {
    return FAQS.filter((faq) => {
      const matchesCategory = activeCategory === "All Questions" || faq.category === activeCategory;
      const matchesQuery = 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, searchQuery]);

  const toggleFaq = (id) => {
    setOpenFaq((prev) => (prev === id ? null : id));
  };

  return (
    <section 
      ref={sectionRef}
      className="py-20 lg:py-28 bg-background border-t border-slate-200/80 dark:border-white/10 relative overflow-hidden transition-colors duration-300"
    >
      {/* High-Tech Ambient Lighting Meshes */}
      <div className="absolute top-1/3 right-0 w-96 sm:w-140 h-96 sm:h-140 bg-active/6 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-0 w-80 sm:w-120 h-80 sm:h-120 bg-brand-500/8 rounded-full blur-[130px] pointer-events-none -z-10" />

      <div className="w-11/12 mx-auto relative z-10">
        
        {/* ── Section Header with Triggered Transforms (GSAP ScrollTrigger) ── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 sm:mb-16 gap-6 border-b border-slate-200/80 dark:border-white/10 pb-8">
          <div className="max-w-2xl space-y-3">
            {/* Kicker Badge */}
            <div className="faq-kicker inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100/90 dark:bg-white/10 border border-slate-200/80 dark:border-white/10 text-xs font-bold tracking-wide shadow-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-active opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-active" />
              </span>
              <span className="text-active uppercase tracking-wider font-extrabold text-[11px]">
                Clarity &amp; Confidence
              </span>
              <span className="text-slate-500 dark:text-slate-400">
                • Frequently Asked Questions
              </span>
            </div>

            {/* Headline */}
            <h2 className="faq-headline text-3xl sm:text-4xl lg:text-5xl font-extrabold font-['Outfit'] tracking-tight text-foreground leading-[1.12]">
              Everything You Need{" "}
              <span className="text-active inline-block transition-transform hover:scale-105 duration-200 cursor-default">
                To Know
              </span>
            </h2>

            {/* Subtitle */}
            <p className="faq-subtitle text-xs sm:text-sm lg:text-base text-slate-500 dark:text-slate-400 font-['Inter'] leading-relaxed pt-0.5">
              Have questions regarding membership tiers, trial pass inclusions, class booking, or our recovery suites? Find verified answers below.
            </p>
          </div>

          {/* Search Input Bar with Triggered Slide */}
          <div className="faq-search relative w-full lg:w-80 self-start lg:self-end">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions or keywords..."
              className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white dark:bg-[#121026] border border-slate-200/90 dark:border-white/10 focus:border-active focus:outline-hidden text-xs sm:text-sm text-foreground placeholder-slate-400 dark:placeholder-slate-500 shadow-xs font-['Inter'] transition-colors"
            />
          </div>
        </div>

        {/* ── Single-Line Category Filter Tabs with Triggered Staggered Animation ── */}
        <LayoutGroup id="homeFaqCategoryGroup">
          <motion.div 
            variants={filterContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar select-none"
          >
            {CATEGORIES.map((category) => {
              const isActive = activeCategory === category;
              return (
                <motion.button
                  key={category}
                  variants={filterItemVariants}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className="relative px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-tight whitespace-nowrap cursor-pointer shrink-0 transition-colors duration-200 active:scale-95"
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeHomeFaqCategoryPill"
                      className="absolute inset-0 bg-active rounded-xl shadow-xs"
                      transition={{ type: "spring", stiffness: 450, damping: 35 }}
                    />
                  )}
                  <span
                    className={`relative z-10 transition-colors ${
                      isActive
                        ? "text-white"
                        : "text-slate-500 dark:text-slate-400 hover:text-foreground"
                    }`}
                  >
                    {category}
                  </span>
                </motion.button>
              );
            })}
          </motion.div>
        </LayoutGroup>

        {/* ── Accordion FAQ List with Staged Viewport Gating & Element Triggered Transitions ── */}
        <div ref={faqListRef} className="space-y-4 mb-12 sm:mb-16">
          {filteredFaqs.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-white dark:bg-[#121026] border border-slate-200/80 dark:border-white/10 text-slate-500 dark:text-slate-400 shadow-xs">
              <FiHelpCircle className="w-10 h-10 mx-auto mb-3 text-active/60" />
              <p className="font-bold text-base text-foreground font-['Outfit']">No matching questions found</p>
              <p className="text-xs mt-1 font-['Inter']">Try clearing your search query or switching categories.</p>
            </div>
          ) : (
            filteredFaqs.map((faq, index) => {
              const isOpen = openFaq === faq.id;
              const formattedIndex = index < 9 ? `0${index + 1}` : `${index + 1}`;

              return (
                <motion.div
                  key={faq.id}
                  custom={index}
                  variants={faqCardShellVariants}
                  initial="hidden"
                  animate={faqsTriggered ? "visible" : "hidden"}
                  className={`group relative rounded-2xl sm:rounded-3xl border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? "bg-white dark:bg-[#121026] border-active shadow-sm"
                      : "bg-white dark:bg-[#121026] hover:bg-slate-50/70 dark:hover:bg-[#15132d] border-slate-200/80 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 shadow-xs hover:shadow-md"
                  }`}
                >
                  {/* Subtle top active indicator bar when open */}
                  {isOpen && (
                    <motion.div 
                      variants={faqTopLineVariants}
                      className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-active/80 to-transparent origin-left" 
                    />
                  )}

                  {/* Accordion Header / Toggle */}
                  <button
                    type="button"
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full p-6 sm:p-7 flex items-center justify-between gap-4 text-left cursor-pointer select-none group"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-4 sm:gap-6 min-w-0">
                      {/* 1. Watermark / Index with Viewport Entrance & Toggle Pulse */}
                      <motion.span 
                        variants={faqIndexVariants}
                        animate={isOpen ? { scale: [1, 1.15, 1], x: [0, 4, 0] } : { scale: 1, x: 0 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className={`font-['Outfit'] font-black text-sm sm:text-base transition-colors shrink-0 select-none ${
                          isOpen ? "text-active" : "text-slate-800 dark:text-slate-300"
                        }`}
                      >
                        {formattedIndex}
                      </motion.span>

                      <div className="space-y-1 min-w-0">
                        {/* 2. Category Kicker with Viewport Drop & Toggle Glide */}
                        <motion.span 
                          variants={faqCategoryPillVariants}
                          animate={isOpen ? { x: [0, 5, 0] } : { x: 0 }}
                          transition={{ duration: 0.35 }}
                          className="block text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-active font-['Outfit']"
                        >
                          {faq.category}
                        </motion.span>

                        {/* 3. Question Title with Viewport Upward Sweep & Toggle Focus Elevation */}
                        <motion.h3 
                          variants={faqQuestionVariants}
                          animate={isOpen ? { y: [0, -3, 0] } : { y: 0 }}
                          transition={{ duration: 0.35 }}
                          className={`font-['Outfit'] text-base sm:text-lg font-extrabold transition-colors leading-snug ${
                            isOpen 
                              ? "text-foreground" 
                              : "text-foreground group-hover:text-active"
                          }`}
                        >
                          {faq.question}
                        </motion.h3>
                      </div>
                    </div>

                    {/* 4. Chevron Toggle Button with Viewport Elastic Pop & Spring Toggle Rotation */}
                    <motion.div 
                      variants={faqChevronVariants}
                      animate={isOpen ? { rotate: 180, scale: [1, 0.88, 1.08, 1] } : { rotate: 0, scale: 1 }}
                      transition={{ duration: 0.45, ease: TRANSITION_EASE }}
                      className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0 border transition-colors duration-300 active:scale-90 ${
                        isOpen
                          ? "bg-active text-white border-active shadow-xs"
                          : "bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-slate-400 border-slate-200/80 dark:border-white/10 group-hover:text-active group-hover:border-active/40"
                      }`}
                    >
                      <FiChevronDown className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                    </motion.div>
                  </button>

                  {/* Accordion Body with Motion AnimatePresence & Height Animation */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="faq-content"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.45, ease: TRANSITION_EASE }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 sm:px-7 pb-6 sm:pb-7 pt-0 border-t border-slate-100 dark:border-white/5">
                          {/* 5. Answer Paragraph with Smooth Slide, De-Blur & Luxurious Fade */}
                          <motion.p 
                            initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            exit={{ opacity: 0, y: -8, filter: "blur(2px)" }}
                            transition={{ duration: 0.52, delay: 0.08, ease: TRANSITION_EASE }}
                            className="mt-4 font-['Inter'] text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl"
                          >
                            {faq.answer}
                          </motion.p>
                          
                          {/* 6. Verified Policy Badge with Triggered Spring Pop & Rotating Checkmark */}
                          <motion.div 
                            initial={{ opacity: 0, scale: 0.8, x: -16 }}
                            animate={{ opacity: 1, scale: 1, x: 0 }}
                            exit={{ opacity: 0, scale: 0.85 }}
                            transition={{ type: "spring", stiffness: 220, damping: 18, delay: 0.18 }}
                            className="mt-4 pt-3 flex items-center gap-2 text-emerald-500 text-xs font-bold font-['Inter']"
                          >
                            <motion.span
                              initial={{ scale: 0, rotate: -45 }}
                              animate={{ scale: 1, rotate: 0 }}
                              transition={{ type: "spring", stiffness: 280, damping: 14, delay: 0.25 }}
                            >
                              <FiCheckCircle className="w-3.5 h-3.5 shrink-0" />
                            </motion.span>
                            <span>FlexPulse Verified Club Policy</span>
                          </motion.div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })
          )}
        </div>

        {/* ── Still Have Questions Contact Banner (Strict Shadow Rule: shadow-sm, hover:shadow-md) ── */}
        <motion.div 
          variants={bannerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="group relative overflow-hidden rounded-3xl p-7 sm:p-10 bg-linear-to-br from-white via-slate-50 to-rose-50/20 dark:from-[#121026] dark:via-[#161334] dark:to-[#1c1842] border border-slate-200/90 dark:border-white/10 hover:border-active/40 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs hover:shadow-md transition-all duration-300"
        >
          {/* Subtle Top Glowing Line on Hover */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-active/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Ambient Radial Accent Glow */}
          <div className="absolute -right-20 -bottom-20 w-60 h-60 bg-active/5 rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-center gap-4 relative z-10">
            <motion.div 
              variants={bannerIconVariants}
              className="w-12 h-12 rounded-2xl bg-active/20 flex items-center justify-center text-active shrink-0 border border-active/30 shadow-xs group-hover:scale-105 group-hover:rotate-3 transition-transform duration-300"
            >
              <FiMessageSquare className="w-6 h-6 text-active" />
            </motion.div>
            <div className="space-y-1">
              <motion.h4 
                variants={bannerTitleVariants}
                className="font-['Outfit'] text-lg sm:text-xl font-extrabold text-foreground"
              >
                Still Have Questions Unanswered?
              </motion.h4>
              <motion.p 
                variants={bannerSubtitleVariants}
                className="font-['Inter'] text-xs sm:text-sm text-slate-500 dark:text-slate-400"
              >
                Our athletic coaches and membership advisors are available daily to assist with membership inquiries and facility tours.
              </motion.p>
            </div>
          </div>

          <motion.div 
            variants={bannerButtonVariants}
            className="flex flex-wrap items-center gap-3 shrink-0 font-['Inter']"
          >
            {/* Type 1 Primary High-Voltage Athletic CTA */}
            <Link
              href="/contact"
              className="relative overflow-hidden inline-flex items-center justify-center gap-2.5 px-6 py-3.5 sm:px-7 sm:py-4 bg-btn-bg text-btn-text font-extrabold rounded-2xl shadow-sm hover:shadow-md transform hover:-translate-y-0.5 hover:brightness-105 active:scale-95 transition-all duration-300 ease-out text-sm sm:text-base border border-white/20 cursor-pointer group"
            >
              {/* Kinetic Light-Beam Shimmer Sweep */}
              <span className="absolute inset-0 w-1/2 h-full bg-linear-to-r from-transparent via-white/20 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-[250%] transition-transform duration-700 ease-out pointer-events-none" />
              <span>Contact Member Concierge</span>
              <FiArrowRight className="w-4 h-4 text-btn-text group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
