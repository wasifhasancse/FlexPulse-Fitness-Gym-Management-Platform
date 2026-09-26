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
    category: "Schedule & Timetable",
    href: "/schedule",
    icon: FiCalendar,
    keywords: ["schedule", "timetable", "time", "monday", "tuesday", "wednesday", "slots", "book"]
  },
  {
    title: "Fitness & Macro Calculator",
    desc: "Clinical BMI gauge, Harris-Benedict BMR, and daily macro targets",
    category: "Tools & Calculators",
    href: "/calculator",
    icon: FiActivity,
    keywords: ["bmi", "bmr", "calculator", "calorie", "macros", "protein", "carbs", "fats", "tdee", "weight"]
  },
  {
    title: "Gym Facilities & Equipment",
    desc: "Olympic free weights, cardio turf, zen pavilion & cryo spa",
    category: "Club & Amenities",
    href: "/facilities",
    icon: FiLayers,
    keywords: ["facilities", "gym", "equipment", "weights", "sauna", "spa", "cryotherapy", "turf"]
  },
  {
    title: "Master Trainers Roster",
    desc: "Certified strength, HIIT, combat & mobility head coaches",
    category: "Coaching Staff",
    href: "/trainers",
    icon: FiUsers,
    keywords: ["trainers", "coaches", "marcus", "elena", "darius", "maya", "personal training", "mentors"]
  },
  {
    title: "Membership Pricing Plans",
    desc: "Starter, Pro Athlete & Elite Performance with annual 20% off",
    category: "Memberships & Pass",
    href: "/pricing",
    icon: FiDollarSign,
    keywords: ["pricing", "plans", "membership", "cost", "monthly", "annual", "subscription", "vip", "tier"]
  },
  {
    title: "Claim VIP 1-Day Trial Pass",
    desc: "Experience FlexPulse with complimentary all-access 1-day entry",
    category: "Free Trial",
    href: "/pricing#trial-pass",
    icon: FiZap,
    keywords: ["free pass", "trial pass", "guest pass", "vip", "free", "day pass"]
  },
  {
    title: "All Fitness Classes",
    desc: "Browse 50+ classes by category, difficulty & duration",
    category: "Workouts & Programs",
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
    category: "Support & Inquiries",
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

  // Keyboard shortcut listener (Escape to close, arrows to navigate)
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
    ? SEARCH_DATABASE.slice(0, 6)
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
    <div className="fixed inset-0 z-100 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/75 backdrop-blur-md animate-fadeIn">
      {/* Backdrop click dismiss */}
      <div className="fixed inset-0 -z-10" onClick={onClose} />

      <div className="w-full max-w-2xl bg-white dark:bg-[#070F2B] border border-brand-500/25 dark:border-brand-500/35 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-brand-500/15 flex items-center gap-3">
          <FiSearch className="w-6 h-6 text-active shrink-0 ml-1" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Search classes, trainers, schedule, calculators, or pricing..."
            className="w-full bg-transparent text-foreground placeholder-[#535C91]/60 dark:placeholder-[#9290C3]/60 font-['Inter'] text-base sm:text-lg outline-none"
          />
          {query ? (
            <button
              onClick={() => setQuery("")}
              className="p-1 rounded-lg text-gray-400 hover:text-foreground hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
            >
              <FiX className="w-5 h-5" />
            </button>
          ) : (
            <span className="hidden sm:inline-block px-2 py-0.5 rounded-md bg-brand-800/30 text-active text-[11px] font-mono font-bold">
              ESC
            </span>
          )}
        </div>

        {/* Quick Filter Pills */}
        <div className="px-5 py-2.5 bg-[#535C91]/5 dark:bg-[#1B1A55]/30 border-b border-brand-500/10 flex items-center gap-2 overflow-x-auto no-scrollbar font-['Inter'] text-xs">
          <span className="text-[#535C91] dark:text-[#9290C3] shrink-0 font-medium">Suggestions:</span>
          {["Schedule", "Trainers", "BMI Calculator", "Pricing", "Free Pass", "HIIT", "Boxing"].map((sug, i) => (
            <button
              key={i}
              onClick={() => setQuery(sug)}
              className="px-2.5 py-1 rounded-lg bg-background border border-brand-500/20 hover:border-active text-foreground/80 hover:text-active transition-colors shrink-0 cursor-pointer"
            >
              {sug}
            </button>
          ))}
        </div>

        {/* Search Results */}
        <div className="p-3 overflow-y-auto space-y-1.5 flex-1">
          {filtered.length === 0 ? (
            <div className="text-center py-12 space-y-2">
              <p className="text-sm font-semibold text-foreground">No matches found for &quot;{query}&quot;</p>
              <p className="text-xs text-[#535C91] dark:text-[#9290C3]">
                Try searching for general keywords like &apos;schedule&apos;, &apos;calculator&apos;, or &apos;trainers&apos;.
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
                  className={`p-3.5 rounded-2xl flex items-center justify-between gap-4 cursor-pointer transition-all duration-200 ${
                    isSelected
                      ? "bg-active/10 dark:bg-active/15 border border-active/40 translate-x-1"
                      : "hover:bg-[#535C91]/5 dark:hover:bg-[#1B1A55]/40 border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className={`p-2.5 rounded-xl shrink-0 ${isSelected ? "bg-active text-white" : "bg-[#535C91]/10 dark:bg-[#1B1A55] text-active"}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="font-['Outfit'] font-bold text-foreground text-sm truncate">
                          {item.title}
                        </h4>
                        <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-md bg-brand-800/40 text-active shrink-0">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-xs text-[#535C91] dark:text-[#9290C3] truncate mt-0.5 font-['Inter']">
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
        <div className="px-5 py-3 bg-[#535C91]/5 dark:bg-[#1B1A55]/20 border-t border-brand-500/10 flex items-center justify-between text-[11px] text-[#535C91] dark:text-[#9290C3] font-['Inter']">
          <div className="flex items-center gap-3">
            <span><kbd className="px-1.5 py-0.5 rounded bg-background border border-brand-500/20 font-mono text-[10px]">↑↓</kbd> Navigate</span>
            <span><kbd className="px-1.5 py-0.5 rounded bg-background border border-brand-500/20 font-mono text-[10px]">↵</kbd> Select</span>
            <span><kbd className="px-1.5 py-0.5 rounded bg-background border border-brand-500/20 font-mono text-[10px]">ESC</kbd> Close</span>
          </div>
          <span className="font-semibold text-active">FlexPulse Navigation</span>
        </div>
      </div>
    </div>
  );
}
