"use client";

import { motion, LayoutGroup } from "framer-motion";
import AnimatedSectionTitle from "@/components/common/AnimatedSectionTitle";
import Link from "next/link";
import { useState } from "react";
import {
  FaCheckCircle,
  FaCreditCard,
  FaFileContract,
  FaHandshake,
  FaLock,
  FaPrint,
  FaQuestionCircle,
  FaShieldAlt,
  FaUndo,
  FaUserCheck,
} from "react-icons/fa";
import { FiArrowRight, FiCheck, FiSearch } from "react-icons/fi";

const TERMS_SECTIONS = [
  {
    id: "membership-tiers",
    title: "1. Membership Tiers & Access Privileges",
    summary:
      "Operational definitions of Standard, Pro Athlete, and VIP Elite membership tiers.",
    content: (
      <div className="space-y-4">
        <p>
          FlexPulse provides three primary athletic tier structures, each granting distinct facility and programming privileges:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 space-y-2">
            <span className="text-xs font-mono font-bold text-active uppercase">Tier 01</span>
            <h4 className="font-bold text-sm text-foreground">Standard Member</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Access to designated home club location, free weight arena, selectorized machine floor, and locker rooms during standard staffed hours.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-active/40 bg-active/5 space-y-2">
            <span className="text-xs font-mono font-bold text-active uppercase">Tier 02 (Pro)</span>
            <h4 className="font-bold text-sm text-foreground">Pro Athlete</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              All-Club multi-facility access, unlimited group classes (HIIT, MetCon, Olympic Lifting), 24/7 RFID turnstile entry, and monthly InBody scans.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 space-y-2">
            <span className="text-xs font-mono font-bold text-amber-500 uppercase">Tier 03 (Elite)</span>
            <h4 className="font-bold text-sm text-foreground">VIP Executive Elite</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Unlimited recovery contrast suite bookings (Finnish sauna, cold plunge), dedicated locker, laundry valet, and 2 complimentary guest passes monthly.
            </p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "billing-renewal",
    title: "2. Billing Cycles, Renewal & Proration",
    summary:
      "Transparent fee schedule, automatic monthly renewals, and absence of hidden penalties.",
    content: (
      <div className="space-y-4">
        <p>
          Memberships operate on a monthly recurring subscription cycle, billed in advance on the calendar day corresponding to your initial registration date.
        </p>
        <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
          <li>
            <strong>Automatic Renewal:</strong> To maintain seamless 24/7 keyless facility access, memberships renew automatically every 30 days unless paused or canceled prior to the next billing date.
          </li>
          <li>
            <strong>Prorated Upgrades:</strong> Upgrades between tiers take effect instantly. Any unused balance from your previous tier is credited immediately against your new billing rate.
          </li>
          <li>
            <strong>Zero Surcharge Guarantee:</strong> FlexPulse never assesses maintenance surcharges, locker fees, or facility enhancement assessments. Your quoted monthly fee is all-inclusive.
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: "fair-cancellation",
    title: "3. 1-Click Cancellation & Medical Freeze",
    summary:
      "Fair-play contract terms allowing instant self-serve cancellation and medical holds.",
    content: (
      <div className="space-y-4">
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-foreground">
          <strong className="block text-emerald-500 text-sm mb-1 font-bold">The FlexPulse Fair Cancellation Policy:</strong>
          <span className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            You may cancel or freeze your membership directly through your Member Dashboard settings with 1-click. No certified letters, in-person manager appointments, or cancellation penalties required.
          </span>
        </div>
        <p>
          <strong>Medical & Travel Freezes:</strong> Members may place their account on freeze status for up to 90 consecutive days per calendar year for medical rehabilitation, pregnancy, or extended international travel. Monthly billing is suspended during the freeze duration.
        </p>
      </div>
    ),
  },
  {
    id: "health-waiver",
    title: "4. Physical Health Clearance & Liability Waiver",
    summary:
      "Athlete responsibility regarding physical readiness and competition equipment.",
    content: (
      <div className="space-y-4">
        <p>
          Athletic conditioning, heavy compound resistance training, high-intensity intervals, and contrast hydrotherapy (cold immersion) carry inherent physical demands.
        </p>
        <p>
          By accessing the facilities, members represent that they have consulted with a licensed physician or reasonably verified their physical capability to engage in rigorous exercise. Members agree to immediately notify club trainers and staff of any sudden dizziness, shortness of breath, or musculoskeletal strain during sessions.
        </p>
      </div>
    ),
  },
  {
    id: "lockers-facility",
    title: "5. Locker Access, Security & Facility Guidelines",
    summary:
      "Day-use locker rules, keycard turnstiles, and unattended property disclaimers.",
    content: (
      <div className="space-y-4">
        <p>
          Complimentary digital combination day-lockers are provided in all executive locker rooms. Day-lockers are cleared and sanitized nightly at 23:00. Unclaimed items are inventoried and transferred to the Security Concierge for 30 days.
        </p>
        <p>
          FlexPulse is not liable for theft, loss, or damage to personal valuables left unattended outside of secured lockers.
        </p>
      </div>
    ),
  },
  {
    id: "guest-passes",
    title: "6. Guest Pass Privileges & Class Booking Rules",
    summary:
      "Protocols for bringing training partners and studio cancellation windows.",
    content: (
      <div className="space-y-4">
        <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
          <li>
            <strong>Guest Check-In:</strong> Guests must present government-issued photo identification and sign the digital liability waiver at the concierge turnstiles prior to accessing training floors.
          </li>
          <li>
            <strong>Class Booking Courtesy:</strong> To ensure equal access to high-demand classes (e.g. Hyrox Conditioning, Combat Boxing), cancellations must be submitted via the app at least 2 hours prior to class kickoff.
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: "conduct-revocation",
    title: "7. Member Code of Conduct & Revocation",
    summary:
      "Standards for safety, anti-harassment, and grounds for immediate membership termination.",
    content: (
      <div className="space-y-4">
        <p>
          FlexPulse maintains an uncompromising commitment to athlete safety, inclusivity, and mutual respect. Grounds for immediate membership revocation without refund include:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
          <li>• Verifiable verbal, physical, sexual, or discriminatory harassment of any member or staff.</li>
          <li>• Intentional destruction of Olympic lifting barbells, turf, or recovery suites.</li>
          <li>• Unauthorized personal training or coaching of other members for independent commercial gain.</li>
          <li>• Tailgating or admitting non-members through keyless turnstiles without registration.</li>
        </ul>
      </div>
    ),
  },
];

export default function TermsClient() {
  const [activeSection, setActiveSection] = useState(TERMS_SECTIONS[0].id);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSections = TERMS_SECTIONS.filter(
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
            <AnimatedSectionTitle
              kicker="Membership Agreement & Fair-Play Contract"
              title="Terms of Membership"
              highlightText="Terms of Membership"
              subtitle="Official facility access rights, automatic renewal policies, fair 1-click cancellation guarantees, and athlete liability standards."
              align="left"
              className="mb-0"
            />

            {/* Quick Meta & Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                type="button"
                onClick={handlePrint}
                className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-white/15 bg-white dark:bg-[#141228] hover:border-active text-foreground text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                <FaPrint className="w-3.5 h-3.5 text-active" />
                <span>Print Agreement</span>
              </button>
              <Link
                href="/pricing"
                className="px-4 py-2.5 rounded-xl bg-active text-white text-xs font-bold transition-all hover:opacity-95 shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>View Membership Tiers</span>
                <FiArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Key Member Safeguards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 pt-6 border-t border-brand-500/15 text-xs font-['Inter']">
            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-emerald-500 w-4 h-4 shrink-0" />
              <span><strong>Version:</strong> 4.1 Official</span>
            </div>
            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-emerald-500 w-4 h-4 shrink-0" />
              <span><strong>Cancellation:</strong> 1-Click Self-Serve</span>
            </div>
            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-emerald-500 w-4 h-4 shrink-0" />
              <span><strong>Hidden Fees:</strong> $0 Guaranteed</span>
            </div>
            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-emerald-500 w-4 h-4 shrink-0" />
              <span><strong>Medical Freeze:</strong> Up to 90 Days</span>
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
                    placeholder="Search membership clauses..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#141228] text-xs sm:text-sm text-foreground placeholder:text-slate-400 focus:outline-none focus:border-active transition-all"
                  />
                </div>

                {/* Section Table of Contents */}
                <div className="p-4 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c0b1a] shadow-xs">
                  <span className="text-[11px] font-mono uppercase tracking-wider font-extrabold text-slate-500 dark:text-slate-400 block mb-3">
                    Agreement Sections
                  </span>
                  <LayoutGroup id="termsTocGroup">
                    <nav className="space-y-1">
                      {filteredSections.map((sec) => {
                        const isActive = activeSection === sec.id;
                        return (
                          <button
                            key={sec.id}
                            type="button"
                            onClick={() => {
                              setActiveSection(sec.id);
                              const el = document.getElementById(sec.id);
                              if (el) el.scrollIntoView({ behavior: "smooth" });
                            }}
                            className={`relative w-full text-left px-3 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer flex items-center justify-between ${
                              isActive
                                ? "text-white"
                                : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5"
                            }`}
                          >
                            {isActive && (
                              <motion.span
                                layoutId="activeTermsTocPill"
                                className="absolute inset-0 rounded-lg bg-active shadow-xs"
                                transition={{ type: "spring", stiffness: 450, damping: 35 }}
                              />
                            )}
                            <span className="truncate relative z-10">{sec.title}</span>
                            {isActive && <FiCheck className="w-3.5 h-3.5 shrink-0 relative z-10" />}
                          </button>
                        );
                      })}
                    </nav>
                  </LayoutGroup>
                </div>

                {/* Need Membership Support */}
                <div className="p-4 rounded-2xl bg-linear-to-br from-active/10 to-brand-500/10 border border-active/20 space-y-2">
                  <div className="flex items-center gap-2 text-active font-bold text-xs uppercase tracking-wider">
                    <FaQuestionCircle className="w-4 h-4" /> Need Account Assistance?
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    Have questions about billing dates, tier upgrades, or corporate rates? Our membership concierge is available 24/7.
                  </p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-active hover:underline pt-1"
                  >
                    <span>Contact Membership Concierge</span>
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
