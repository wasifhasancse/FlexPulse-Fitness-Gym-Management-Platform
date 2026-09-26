"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { 
  FiChevronDown, 
  FiHelpCircle, 
  FiSearch, 
  FiArrowRight, 
  FiMessageSquare,
  FiPhone,
  FiCheckCircle
} from "react-icons/fi";

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

export default function HomeFaqSection() {
  const [activeCategory, setActiveCategory] = useState("All Questions");
  const [searchQuery, setSearchQuery] = useState("");
  const [openFaq, setOpenFaq] = useState("f1");

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
    <section className="py-20 lg:py-28 bg-background border-t border-brand-500/15 relative overflow-hidden transition-colors duration-300">
      {/* Ambient Lighting Meshes */}
      <div className="absolute top-1/3 right-0 w-96 sm:w-140 h-96 sm:h-140 bg-active/6 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-0 w-80 sm:w-120 h-80 sm:h-120 bg-brand-500/8 rounded-full blur-[130px] pointer-events-none -z-10" />

      <div className="w-11/12 mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 sm:mb-16 gap-6 border-b border-brand-500/15 pb-8">
          
          <div className="max-w-2xl space-y-3">
            {/* Kicker Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-800/25 dark:bg-[#1B1A55]/70 border border-brand-500/25 text-xs font-bold tracking-wide shadow-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-active opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-active"></span>
              </span>
              <span className="text-active uppercase tracking-wider font-extrabold text-[11px]">
                Clarity & Confidence
              </span>
              <span className="text-[#535C91] dark:text-[#9290C3]">
                • Frequently Asked Questions
              </span>
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-['Outfit'] tracking-tight text-foreground leading-[1.12]">
              Everything You Need <span className="text-active">To Know</span>
            </h2>

            <p className="text-sm sm:text-base text-[#535C91] dark:text-[#9290C3] font-['Inter'] leading-relaxed pt-1">
              Have questions regarding membership tiers, trial pass inclusions, class booking, or our recovery suites? Find verified answers below.
            </p>
          </div>

          {/* Search Input Bar */}
          <div className="relative w-full lg:w-80 self-start lg:self-end">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#535C91] dark:text-[#9290C3]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions or keywords..."
              className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white dark:bg-[#070F2B] border border-brand-500/25 focus:border-active focus:outline-hidden text-xs sm:text-sm text-foreground placeholder-[#535C91] dark:placeholder-[#9290C3] shadow-xs font-['Inter'] transition-colors"
            />
          </div>

        </div>

        {/* Single-Line Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar select-none">
          {CATEGORIES.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`relative px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-tight transition-all duration-200 whitespace-nowrap cursor-pointer shrink-0 ${
                  isActive
                    ? "bg-active text-white shadow-md shadow-active/20"
                    : "bg-[#535C91]/8 dark:bg-[#1B1A55]/60 hover:bg-[#535C91]/15 text-[#535C91] dark:text-[#9290C3] border border-brand-500/15"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Accordion FAQ List */}
        <div className="space-y-4 mb-12 sm:mb-16">
          {filteredFaqs.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-white dark:bg-[#070F2B] border border-brand-500/20 text-[#535C91] dark:text-[#9290C3]">
              <FiHelpCircle className="w-10 h-10 mx-auto mb-3 text-active/60" />
              <p className="font-bold text-base text-foreground font-['Outfit']">No matching questions found</p>
              <p className="text-xs mt-1 font-['Inter']">Try clearing your search query or switching categories.</p>
            </div>
          ) : (
            filteredFaqs.map((faq, index) => {
              const isOpen = openFaq === faq.id;
              const formattedIndex = index < 9 ? `0${index + 1}` : `${index + 1}`;

              return (
                <div
                  key={faq.id}
                  className={`rounded-2xl sm:rounded-3xl border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? "bg-white dark:bg-[#070F2B] border-active/60 shadow-lg"
                      : "bg-white/60 dark:bg-[#070F2B]/60 hover:bg-white dark:hover:bg-[#070F2B] border-brand-500/20 hover:border-brand-500/40"
                  }`}
                >
                  {/* Accordion Header / Toggle */}
                  <button
                    type="button"
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full p-6 sm:p-7 flex items-center justify-between gap-4 text-left cursor-pointer select-none group"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-4 sm:gap-6 min-w-0">
                      {/* Watermark / Index */}
                      <span className={`font-['Outfit'] font-black text-sm sm:text-base transition-colors shrink-0 ${
                        isOpen ? "text-active" : "text-[#535C91] dark:text-[#9290C3]"
                      }`}>
                        {formattedIndex}
                      </span>

                      <div className="space-y-1 min-w-0">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-active font-['Outfit']">
                          {faq.category}
                        </span>
                        <h3 className="font-['Outfit'] text-base sm:text-lg font-bold text-foreground group-hover:text-active transition-colors leading-snug">
                          {faq.question}
                        </h3>
                      </div>
                    </div>

                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border transition-transform duration-300 ${
                      isOpen
                        ? "bg-active text-white border-active rotate-180"
                        : "bg-[#535C91]/10 dark:bg-[#1B1A55]/80 text-[#535C91] dark:text-[#9290C3] border-brand-500/20 group-hover:border-active/50"
                    }`}>
                      <FiChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {/* Accordion Body */}
                  {isOpen && (
                    <div className="px-6 sm:px-7 pb-6 sm:pb-7 pt-0 border-t border-brand-500/10">
                      <p className="mt-4 font-['Inter'] text-xs sm:text-sm text-[#535C91] dark:text-[#9290C3] leading-relaxed max-w-3xl">
                        {faq.answer}
                      </p>
                      
                      <div className="mt-4 pt-3 flex items-center gap-2 text-emerald-500 text-xs font-semibold font-['Inter']">
                        <FiCheckCircle className="w-3.5 h-3.5" />
                        <span>FlexPulse Verified Club Policy</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Still Have Questions Contact Banner */}
        <div className="rounded-3xl p-7 sm:p-10 bg-linear-to-r from-brand-800/30 via-[#1B1A55]/40 to-brand-800/30 border border-brand-500/25 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-active/20 flex items-center justify-center text-active shrink-0 border border-brand-500/30">
              <FiMessageSquare className="w-6 h-6 text-active" />
            </div>
            <div>
              <h4 className="font-['Outfit'] text-lg sm:text-xl font-extrabold text-foreground">
                Still Have Questions Unanswered?
              </h4>
              <p className="font-['Inter'] text-xs sm:text-sm text-[#535C91] dark:text-[#9290C3] mt-0.5">
                Our athletic coaches and membership advisors are available daily to assist with membership inquiries and facility tours.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0 font-['Inter']">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-btn-bg text-btn-text font-bold text-xs sm:text-sm whitespace-nowrap shadow-md hover:opacity-90 transition-all cursor-pointer"
            >
              <span>Contact Member Concierge</span>
              <FiArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
