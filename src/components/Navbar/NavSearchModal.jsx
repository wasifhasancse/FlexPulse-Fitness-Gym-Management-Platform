"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { 
  FiSearch, 
  FiX, 
  FiArrowRight, 
  FiCalendar, 
  FiActivity, 
  FiUsers, 
  FiDollarSign, 
  FiLayers, 
  FiZap, 
  FiCompass, 
  FiHelpCircle 
} from "react-icons/fi";

const SEARCH_DATABASE = [
  // Features & Pages
  {
    title: "Weekly Class Schedule",
    desc: "Interactive timetable with day selector & real-time booking",
    category: "Schedule",
    href: "/schedule",
    icon: FiCalendar,
    keywords: ["schedule", "timetable", "time", "monday", "tuesday", "wednesday", "slots", "book"]
  },
  {
    title: "Fitness & Macro Calculator",
    desc: "Clinical BMI gauge, Harris-Benedict BMR, and daily macro targets",
    category: "Calculator",
    href: "/calculator",
    icon: FiActivity,
    keywords: ["bmi", "bmr", "calculator", "calorie", "macros", "protein", "carbs", "fats", "tdee", "weight"]
  },
  {
    title: "Gym Facilities & Equipment",
    desc: "Olympic free weights, cardio turf, zen pavilion & cryo spa",
    category: "Club",
    href: "/facilities",
    icon: FiLayers,
    keywords: ["facilities", "gym", "equipment", "weights", "sauna", "spa", "cryotherapy", "turf"]
  },
  {
    title: "Master Trainers Roster",
    desc: "Certified strength, HIIT, combat & mobility head coaches",
    category: "Trainers",
    href: "/trainers",
    icon: FiUsers,
    keywords: ["trainers", "coaches", "marcus", "elena", "darius", "maya", "personal training", "mentors"]
  },
  {
    title: "Membership Pricing Plans",
    desc: "Starter, Pro Athlete & Elite Performance with annual 20% off",
    category: "Pricing",
    href: "/pricing",
    icon: FiDollarSign,
    keywords: ["pricing", "plans", "membership", "cost", "monthly", "annual", "subscription", "vip", "tier"]
  },
  {
    title: "Claim VIP 1-Day Trial Pass",
    desc: "Experience FlexPulse with complimentary all-access 1-day entry",
    category: "Free Pass",
    href: "/calculator#trial-pass",
    icon: FiZap,
    keywords: ["free pass", "trial pass", "guest pass", "vip", "free", "day pass"]
  },
  {
    title: "All Fitness Classes",
    desc: "Browse 50+ classes by category, difficulty & duration",
    category: "Classes",
    href: "/all-classes",
    icon: FiCompass,
    keywords: ["classes", "workouts", "hiit", "crossfit", "yoga", "boxing", "strength", "aerobics", "pilates"]
  },
  {
    title: "Community Forum & Discussions",
    desc: "Ask fitness questions, share PRs & nutrition advice",
    category: "Community",
    href: "/forum",
    icon: FiHelpCircle,
    keywords: ["forum", "community", "discussion", "posts", "blog", "articles", "questions"]
  },
  {
    title: "Contact & Club Locations",
    desc: "Club phone lines, operating hours & front desk support",
    category: "Support",
    href: "/contact",
    icon: FiCompass,
    keywords: ["contact", "location", "address", "phone", "hours", "email", "support", "inquiry"]
  },
  // Specific Classes
  {
    title: "HIIT Conditioning Blast",
    desc: "45-min high intensity intervals to torch calories & spike VO2 max",
    category: "Classes",
    href: "/all-classes",
    icon: FiZap,
    keywords: ["hiit", "cardio", "stamina", "intervals", "burn", "sweat"]
  },
  {
    title: "Olympic Barbell & Hypertrophy",
    desc: "60-min progressive barbell lifting and kinetic muscle building",
    category: "Classes",
    href: "/all-classes",
    icon: FiActivity,
    keywords: ["olympic", "strength", "hypertrophy", "deadlift", "squat", "bench", "barbell"]
  },
  {
    title: "CrossFit & Turf Conditioning",
    desc: "Assault bikes, sled pushes, kettlebells & functional team rounds",
    category: "Classes",
    href: "/all-classes",
    icon: FiCompass,
    keywords: ["crossfit", "turf", "sled", "kettlebell", "wod"]
  },
  {
    title: "Combat Boxing & Strike Dynamics",
    desc: "Heavy bag combinations, footwork & core punching velocity",
    category: "Classes",
    href: "/all-classes",
    icon: FiActivity,
    keywords: ["boxing", "combat", "striking", "martial", "punch", "sparring"]
  },
  {
    title: "Vinyasa Mobility & Decompression",
    desc: "60-min restorative flow, deep hip opening and joint longevity",
    category: "Classes",
    href: "/all-classes",
    icon: FiActivity,
    keywords: ["yoga", "vinyasa", "mobility", "flexibility", "stretching", "recovery"]
  }
];

export default function NavSearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery("");
      setSelectedIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const filtered = query.trim() === ""
    ? SEARCH_DATABASE.slice(0, 7)
    : SEARCH_DATABASE.filter((item) => {
        const q = query.toLowerCase();
        return (
          item.title.toLowerCase().includes(q) ||
          item.desc.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          item.keywords.some((k) => k.toLowerCase().includes(q))
        );
      });

  const handleSelect = (href) => {
    onClose();
    router.push(href);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filtered.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
    } else if (e.key === "Enter" && filtered[selectedIndex]) {
      e.preventDefault();
      handleSelect(filtered[selectedIndex].href);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-start justify-center pt-8 sm:pt-20 px-3 sm:px-6 bg-black/80 backdrop-blur-md animate-fadeIn">
      {/* Backdrop click dismiss */}
      <div className="fixed inset-0 -z-10" onClick={onClose} />

      <div className="w-full max-w-2xl bg-white dark:bg-[#070F2B] border border-brand-500/25 dark:border-brand-500/40 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[88vh] animate__animated animate__zoomIn animate__faster">
        {/* Search Input Bar */}
        <div className="p-3.5 sm:p-5 border-b border-brand-500/15 flex items-center gap-2.5 sm:gap-3">
          <FiSearch className="w-5 h-5 sm:w-6 sm:h-6 text-active shrink-0 ml-1 animate__animated animate__pulse animate__infinite animate__slower" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Search classes, coaches, schedule, calculators..."
            className="w-full bg-transparent text-foreground placeholder-[#535C91]/60 dark:placeholder-[#9290C3]/60 font-['Inter'] text-sm sm:text-base outline-none min-w-0"
          />
          {query ? (
            <button
              onClick={() => setQuery("")}
              className="p-1.5 rounded-lg text-gray-400 hover:text-foreground hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
            >
              <FiX className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          ) : (
            <span className="hidden sm:inline-block px-2 py-0.5 rounded-md bg-brand-800/30 text-active text-[11px] font-mono font-bold">
              ESC
            </span>
          )}
        </div>

        {/* Quick Filter Suggestions Row with Generous Spacing and Hidden Scrollbar */}
        <div className="px-3 sm:px-5 py-3 bg-[#535C91]/5 dark:bg-[#1B1A55]/30 border-b border-brand-500/10 flex items-center gap-2 sm:gap-2.5 overflow-x-auto no-scrollbar scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <span className="text-[11px] uppercase tracking-wider font-bold text-[#535C91] dark:text-[#9290C3] shrink-0">
            Quick:
          </span>
          {["Schedule", "Trainers", "BMI Calculator", "Pricing", "Free Pass", "HIIT", "Boxing"].map((sug, i) => (
            <button
              key={i}
              onClick={() => setQuery(sug)}
              className="px-3 py-1.5 rounded-full bg-background border border-brand-500/25 hover:border-active text-foreground/80 hover:text-white hover:bg-active transition-all text-xs font-semibold shrink-0 cursor-pointer shadow-2xs whitespace-nowrap active:scale-95"
            >
              {sug}
            </button>
          ))}
        </div>

        {/* Search Results List */}
        <div className="p-2 sm:p-3 overflow-y-auto space-y-1.5 flex-1 divide-y divide-brand-500/5">
          {filtered.length === 0 ? (
            <div className="text-center py-10 px-4 space-y-2">
              <p className="text-sm font-semibold text-foreground">No matches found for &quot;{query}&quot;</p>
              <p className="text-xs text-[#535C91] dark:text-[#9290C3]">
                Try typing keywords like &apos;schedule&apos;, &apos;calculator&apos;, or &apos;trainers&apos;.
              </p>
            </div>
          ) : (
            filtered.map((item, index) => {
              const Icon = item.icon;
              const isSelected = index === selectedIndex;
              return (
                <div
                  key={index}
                  onClick={() => handleSelect(item.href)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`p-3 sm:p-3.5 rounded-2xl flex items-center justify-between gap-3 cursor-pointer transition-all duration-150 ${
                    isSelected
                      ? "bg-active/10 dark:bg-active/15 border border-active/40 translate-x-1"
                      : "hover:bg-[#535C91]/5 dark:hover:bg-[#1B1A55]/40 border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className={`p-2.5 rounded-xl shrink-0 ${isSelected ? "bg-active text-white" : "bg-[#535C91]/10 dark:bg-[#1B1A55] text-active"}`}>
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="font-['Outfit'] font-bold text-foreground text-xs sm:text-sm truncate">
                          {item.title}
                        </h4>
                        <span className="text-[9px] sm:text-[10px] uppercase font-bold px-2 py-0.5 rounded-md bg-brand-800/40 text-active shrink-0">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-[11px] sm:text-xs text-[#535C91] dark:text-[#9290C3] truncate mt-0.5 font-['Inter']">
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  <FiArrowRight className={`w-4 h-4 shrink-0 transition-transform ${isSelected ? "text-active translate-x-1" : "text-gray-400"}`} />
                </div>
              );
            })
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-4 sm:px-5 py-3 bg-[#535C91]/5 dark:bg-[#1B1A55]/20 border-t border-brand-500/10 flex items-center justify-between text-[11px] text-[#535C91] dark:text-[#9290C3] font-['Inter']">
          <div className="hidden sm:flex items-center gap-3">
            <span><kbd className="px-1.5 py-0.5 rounded bg-background border border-brand-500/20 font-mono text-[10px]">↑↓</kbd> Navigate</span>
            <span><kbd className="px-1.5 py-0.5 rounded bg-background border border-brand-500/20 font-mono text-[10px]">↵</kbd> Select</span>
            <span><kbd className="px-1.5 py-0.5 rounded bg-background border border-brand-500/20 font-mono text-[10px]">ESC</kbd> Close</span>
          </div>
          <span className="sm:hidden text-xs">Tap any item to open</span>
          <span className="font-semibold text-active">FlexPulse Navigation</span>
        </div>
      </div>
    </div>
  );
}
