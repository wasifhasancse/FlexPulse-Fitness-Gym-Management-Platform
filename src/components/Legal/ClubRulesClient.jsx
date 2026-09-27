"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import {
  FaCamera,
  FaCheckCircle,
  FaDumbbell,
  FaExclamationTriangle,
  FaHandshake,
  FaHotTub,
  FaPrint,
  FaQuestionCircle,
  FaRunning,
  FaShieldAlt,
  FaTshirt,
  FaUsers,
} from "react-icons/fa";
import { FiArrowRight, FiCheck, FiSearch } from "react-icons/fi";

const CLUB_RULES_SECTIONS = [
  {
    id: "re-rack-culture",
    title: "1. The Re-Rack Code & Floor Cleanliness",
    summary:
      "Strict standards for plate management, dumbbell racks, and equipment sanitation.",
    content: (
      <div className="space-y-4">
        <div className="p-4 rounded-xl bg-active/10 border border-active/20 text-foreground">
          <strong className="block text-active text-sm mb-1 font-bold">Rule #1 at FlexPulse:</strong>
          <span className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            If you can lift it, you can re-rack it. Every dumbbell, bumper plate, resistance band, and kettlebell must be returned to its designated rack immediately upon completion of your set.
          </span>
        </div>
        <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
          <li>
            <strong>Disinfectant Wiping:</strong> Anti-microbial wipe stations are located every 15 feet. Wipe down benches, machine pads, barbells, and cardio consoles immediately after use.
          </li>
          <li>
            <strong>Barbell Unloading:</strong> Never leave loaded barbells resting on Olympic benches, power cages, or deadlift platforms. Stripping bars prevents sleeve bending and ensures equal access.
          </li>
          <li>
            <strong>Collars Mandatory:</strong> Barbell spring or locking collars are mandatory on all heavy compound barbell movements (bench press, squats, overhead presses) for floor safety.
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: "apparel-footwear",
    title: "2. Apparel, Footwear & Chalk Standards",
    summary:
      "Approved athletic clothing, closed-toe lifting shoes, and liquid chalk policies.",
    content: (
      <div className="space-y-4">
        <p>
          Proper athletic attire is required across all training turf, lifting platforms, and functional zones:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="p-4 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 space-y-2">
            <h4 className="font-bold text-foreground flex items-center gap-2">
              <FaTshirt className="text-active" /> Approved Apparel
            </h4>
            <ul className="space-y-1 text-slate-600 dark:text-slate-400">
              <li>• Clean athletic tops (t-shirts, tanks, sports bras, compression gear).</li>
              <li>• Athletic shorts, joggers, or training leggings.</li>
              <li>• Bare-chested training is restricted to competition posing rooms.</li>
            </ul>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 space-y-2">
            <h4 className="font-bold text-foreground flex items-center gap-2">
              <FaRunning className="text-emerald-500" /> Footwear & Chalk
            </h4>
            <ul className="space-y-1 text-slate-600 dark:text-slate-400">
              <li>• Closed-toe athletic shoes required on all turf and lifting floors.</li>
              <li>• Barefoot/sock lifting is permitted exclusively on rubber deadlift platforms.</li>
              <li>• Liquid chalk is encouraged; block chalk must be kept inside chalk basins.</li>
            </ul>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "contrast-recovery",
    title: "3. Contrast Hydrotherapy & Sauna Protocol",
    summary:
      "Hygiene, swimwear rules, and dwell time limits for Finnish saunas and cold plunge tubs.",
    content: (
      <div className="space-y-4">
        <p>
          The Hydrotherapy Contrast Suite features 3°C cold plunge tubs and 85°C Finnish cedar saunas. Strict hygiene protocols protect water sterility:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
          <li>
            <strong>Mandatory Pre-Rinse:</strong> You MUST thoroughly shower with soap in the hydrotherapy rainfall shower before entering any cold plunge tub or cedar sauna.
          </li>
          <li>
            <strong>Towel on Cedar Benches:</strong> Always sit on a clean dry towel while in the sauna to maintain wood hygiene and prevent sweat absorption.
          </li>
          <li>
            <strong>Session Time Limits:</strong> In accordance with sports medicine safety, cold plunge duration is capped at 3–5 minutes per dip; sauna sessions capped at 15 minutes.
          </li>
          <li>
            <strong>Swimwear Required:</strong> Clean, dedicated athletic swimwear is mandatory in all shared recovery suites.
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: "photo-filming",
    title: "4. Filming, Photography & Member Privacy",
    summary:
      "Guidelines for capturing lift form while safeguarding fellow athletes' privacy.",
    content: (
      <div className="space-y-4">
        <p>
          We acknowledge that athletes record lifting sets for biomechanical form analysis and progress tracking. However, member privacy is paramount:
        </p>
        <div className="space-y-2.5 text-xs sm:text-sm">
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-start gap-3">
            <FaCamera className="text-active w-4 h-4 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-foreground font-bold">Tight Framing Only:</strong>
              <span className="text-slate-600 dark:text-slate-400">
                Position your phone camera to frame only yourself. Avoid capturing background athletes without their express verbal permission.
              </span>
            </div>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-start gap-3">
            <FaExclamationTriangle className="text-amber-500 w-4 h-4 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-foreground font-bold">Strictly Zero Cameras in Private Zones:</strong>
              <span className="text-slate-600 dark:text-slate-400">
                Cell phone cameras and recording devices of any kind are strictly prohibited in locker rooms, showers, and cedar saunas. Violations result in immediate membership revocation.
              </span>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "turf-platforms",
    title: "5. Olympic Platform & Turf Etiquette",
    summary:
      "Right-of-way on sled tracks and safety distances around Olympic barbell drops.",
    content: (
      <div className="space-y-4">
        <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
          <li>
            <strong>Platform Safety Clearance:</strong> Maintain at least 6 feet of clearance around any athlete performing Olympic snatches or clean & jerks. Never walk across an active lifting platform.
          </li>
          <li>
            <strong>Turf Sled Right-of-Way:</strong> Athletes pushing or pulling heavy Prowler sleds on the 40-yard turf track have the right-of-way. Keep track lanes clear of kettlebells and foam rollers.
          </li>
          <li>
            <strong>Dropping Weights:</strong> Bumper plates on oak lifting platforms may be dropped safely from overhead. Metal dumbbells and kettlebells must never be intentionally dropped on rubber flooring.
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: "anti-harassment",
    title: "6. Zero-Tolerance Harassment & Inclusivity",
    summary:
      "Uncompromising community standards protecting every athlete regardless of fitness level.",
    content: (
      <div className="space-y-4">
        <p>
          FlexPulse is a home for dedicated athletes of every background, discipline, and skill level. We enforce an uncompromising zero-tolerance policy against:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
          <li>• Unsolicited, intrusive commentary or staring that causes discomfort to another athlete.</li>
          <li>• Intimidating, aggressive, or derogatory behavior toward athletes or staff.</li>
          <li>• Any form of discrimination based on race, gender, orientation, religion, or physical ability.</li>
        </ul>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          If you experience or witness behavior contrary to these standards, report it immediately to the Floor Supervisor or Security Concierge. Disciplinary action is swift and definitive.
        </p>
      </div>
    ),
  },
];

export default function ClubRulesClient() {
  const [activeSection, setActiveSection] = useState(CLUB_RULES_SECTIONS[0].id);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSections = CLUB_RULES_SECTIONS.filter(
    (sec) =>
      sec.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sec.summary.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      
      {/* Hero Header Banner */}
      <section className="relative py-12 lg:py-16 border-b border-brand-500/15 overflow-hidden bg-slate-50/50 dark:bg-[#070614]">
        {/* Ambient glow */}
        <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-active/10 rounded-full blur-[140px] pointer-events-none -z-10" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-brand-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />

        <div className="w-11/12 mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-active/15 border border-active/30 text-active text-xs font-black tracking-wider uppercase">
                <FaDumbbell className="w-3.5 h-3.5" />
                <span>Arena Etiquette & Performance Standards</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-['Outfit'] tracking-tight text-foreground leading-tight">
                Club Rules & Etiquette
              </h1>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 font-['Inter'] leading-relaxed">
                The standard of discipline, safety, and mutual respect upheld by every athlete across our training floors, lifting platforms, and recovery suites.
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                type="button"
                onClick={handlePrint}
                className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-white/15 bg-white dark:bg-[#141228] hover:border-active text-foreground text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                <FaPrint className="w-3.5 h-3.5 text-active" />
                <span>Print Club Rules</span>
              </button>
              <Link
                href="/facilities"
                className="px-4 py-2.5 rounded-xl bg-active text-white text-xs font-bold transition-all hover:opacity-95 shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Tour Facilities</span>
                <FiArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Quick Pillars */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 pt-6 border-t border-brand-500/15 text-xs font-['Inter']">
            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-emerald-500 w-4 h-4 shrink-0" />
              <span><strong>Re-Rack:</strong> 100% Mandatory</span>
            </div>
            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-emerald-500 w-4 h-4 shrink-0" />
              <span><strong>Hydro Hygiene:</strong> Pre-Shower Required</span>
            </div>
            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-emerald-500 w-4 h-4 shrink-0" />
              <span><strong>Privacy:</strong> Zero Locker Cameras</span>
            </div>
            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-emerald-500 w-4 h-4 shrink-0" />
              <span><strong>Harassment:</strong> Zero-Tolerance</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Document Content Grid */}
      <section className="py-12 lg:py-16">
        <div className="w-11/12 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* Left Sticky Sidebar Navigation */}
            <aside className="lg:col-span-4 space-y-6">
              <div className="sticky top-24 space-y-4">
                
                {/* Search Box */}
                <div className="relative">
                  <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search rules & etiquette..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#141228] text-xs sm:text-sm text-foreground placeholder:text-slate-400 focus:outline-none focus:border-active transition-all"
                  />
                </div>

                {/* Section Table of Contents */}
                <div className="p-4 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c0b1a] shadow-xs">
                  <span className="text-[11px] font-mono uppercase tracking-wider font-extrabold text-slate-500 dark:text-slate-400 block mb-3">
                    Code of Conduct
                  </span>
                  <nav className="space-y-1">
                    {filteredSections.map((sec) => (
                      <button
                        key={sec.id}
                        type="button"
                        onClick={() => {
                          setActiveSection(sec.id);
                          const el = document.getElementById(sec.id);
                          if (el) el.scrollIntoView({ behavior: "smooth" });
                        }}
                        className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center justify-between ${
                          activeSection === sec.id
                            ? "bg-active text-white shadow-xs"
                            : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5"
                        }`}
                      >
                        <span className="truncate">{sec.title}</span>
                        {activeSection === sec.id && <FiCheck className="w-3.5 h-3.5 shrink-0" />}
                      </button>
                    ))}
                  </nav>
                </div>

                {/* Report an Issue */}
                <div className="p-4 rounded-2xl bg-linear-to-br from-active/10 to-brand-500/10 border border-active/20 space-y-2">
                  <div className="flex items-center gap-2 text-active font-bold text-xs uppercase tracking-wider">
                    <FaShieldAlt className="w-4 h-4" /> Safety & Etiquette Support
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    Notice equipment damage, broken turnstiles, or hygiene concerns? Alert our floor concierge team immediately.
                  </p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-active hover:underline pt-1"
                  >
                    <span>Notify Concierge Team</span>
                    <FiArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

              </div>
            </aside>

            {/* Right Document Sections */}
            <main className="lg:col-span-8 space-y-8 font-['Inter']">
              {filteredSections.map((sec) => (
                <div
                  key={sec.id}
                  id={sec.id}
                  className="p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c0b1a] shadow-xs scroll-mt-28 space-y-4"
                >
                  <div className="border-b border-slate-100 dark:border-white/10 pb-4">
                    <h2 className="text-xl sm:text-2xl font-black font-['Outfit'] text-foreground">
                      {sec.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                      {sec.summary}
                    </p>
                  </div>
                  <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    {sec.content}
                  </div>
                </div>
              ))}
            </main>

          </div>
        </div>
      </section>

    </div>
  );
}
