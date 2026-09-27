"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import {
  FaCheckCircle,
  FaDatabase,
  FaDownload,
  FaEnvelope,
  FaFileContract,
  FaHeartbeat,
  FaLock,
  FaPrint,
  FaQuestionCircle,
  FaShieldAlt,
  FaUserShield,
} from "react-icons/fa";
import { FiArrowRight, FiCheck, FiExternalLink, FiSearch } from "react-icons/fi";

const SECTIONS = [
  {
    id: "scope",
    title: "1. Scope & Athlete Consent",
    summary:
      "Overview of how FlexPulse collects, processes, and protects your personal and athletic data.",
    content: (
      <div className="space-y-4">
        <p>
          This Privacy Policy governs your use of FlexPulse Athletic Club physical facilities, turnstile access portals, web dashboards (flexpulse.com), mobile companion applications, and integrated biometric telemetry platforms (collectively, the &ldquo;Services&rdquo;).
        </p>
        <p>
          By creating an account, registering for memberships, scanning into facilities, or syncing wearable telemetry, you consent to the data collection and processing practices described herein. We adhere to global data protection benchmarks, including the European Union General Data Protection Regulation (GDPR) and industry-standard health privacy frameworks.
        </p>
        <div className="p-4 rounded-xl bg-active/10 border border-active/20 text-foreground">
          <strong className="block text-active text-sm mb-1 font-bold">The FlexPulse Data Promise:</strong>
          <span className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            We collect data solely to optimize your athletic conditioning, calibrate class programming, and secure our facilities. We have never sold, monetized, or brokered athlete telemetry to advertisers, and we never will.
          </span>
        </div>
      </div>
    ),
  },
  {
    id: "telemetry",
    title: "2. Telemetry & Biometrics We Collect",
    summary:
      "Details on the specific health, fitness, and identity data captured through our hardware and software.",
    content: (
      <div className="space-y-4">
        <p>
          To deliver competition-grade training metrics and safety monitoring, FlexPulse processes the following tiers of data:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10">
            <h4 className="font-bold text-sm text-foreground mb-2 flex items-center gap-2">
              <FaHeartbeat className="text-active" /> Biometric & Physical Scans
            </h4>
            <ul className="text-xs space-y-1.5 text-slate-600 dark:text-slate-400">
              <li>• InBody 570 body composition scans (skeletal muscle, visceral fat).</li>
              <li>• Target heart rate zones, estimated VO2 Max, and caloric burn.</li>
              <li>• 1-Rep max calculations and progressive overload workout logs.</li>
              <li>• Coach form assessments and mobility restriction notes.</li>
            </ul>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10">
            <h4 className="font-bold text-sm text-foreground mb-2 flex items-center gap-2">
              <FaLock className="text-emerald-500" /> Account & Security Identity
            </h4>
            <ul className="text-xs space-y-1.5 text-slate-600 dark:text-slate-400">
              <li>• Full legal name, verified email, phone number, and emergency contact.</li>
              <li>• Keyless RFID turnstile entry timestamps and facility dwell times.</li>
              <li>• High-resolution CCTV safety footage at entrance turnstiles.</li>
              <li>• Encrypted payment tokens handled directly by Stripe.</li>
            </ul>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "usage",
    title: "3. How We Use Athletic Data",
    summary:
      "Legitimate purposes for workout split analysis, recovery recommendations, and coaching.",
    content: (
      <div className="space-y-4">
        <p>Your data is processed strictly for athletic performance and platform operations:</p>
        <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
          <li>
            <strong>Real-Time Class Telemetry:</strong> Broadcasting your real-time heart rate zone to studio monitors during HIIT, Hyrox, and MetCon classes (optional opt-out available).
          </li>
          <li>
            <strong>Coach Feedback & Program Calibration:</strong> Allowing your certified personal trainer to review lifting totals and adjust weekly volume to prevent overtraining.
          </li>
          <li>
            <strong>Recovery Protocol Recommendations:</strong> Scheduling Finnish sauna and cold plunge sessions based on reported muscle soreness and heavy lifting sessions.
          </li>
          <li>
            <strong>Safety & Emergency Response:</strong> Verifying emergency medical contacts in the event of an acute injury or cardiac anomaly on the training floor.
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: "security",
    title: "4. Cryptographic Storage & Security",
    summary:
      "Enterprise-grade AES-256 encryption, zero-knowledge architecture, and tokenized billing.",
    content: (
      <div className="space-y-4">
        <p>
          We employ state-of-the-art security architectures engineered to protect sensitive physical health records:
        </p>
        <div className="space-y-3">
          <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10">
            <FaShieldAlt className="text-active w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <strong className="text-xs sm:text-sm font-bold block text-foreground">
                AES-256 Encryption at Rest & TLS 1.3 in Transit
              </strong>
              <span className="text-xs text-slate-600 dark:text-slate-400">
                All database records containing biometric metrics, body scans, and user credentials are cryptographically encrypted using unique salted keys.
              </span>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10">
            <FaCheckCircle className="text-emerald-500 w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <strong className="text-xs sm:text-sm font-bold block text-foreground">
                PCI-DSS Level 1 Payment Processing
              </strong>
              <span className="text-xs text-slate-600 dark:text-slate-400">
                FlexPulse servers never store, log, or inspect full credit card numbers or CVVs. All membership transactions are tokenized via Stripe.
              </span>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "wearables",
    title: "5. Wearables & Third-Party Integrations",
    summary:
      "Protocols for syncing Apple HealthKit, Garmin Connect, Strava, and Whoop.",
    content: (
      <div className="space-y-4">
        <p>
          If you elect to link your third-party wearable devices (such as Apple Health, Garmin, Strava, or Whoop), FlexPulse requests granular read permissions solely for workout heart rate, sleep recovery scores, and daily step volume.
        </p>
        <p>
          You retain the right to revoke third-party API tokens instantly at any time from your Member Dashboard settings. Revocation immediately halts incoming data streams and severs third-party sync.
        </p>
      </div>
    ),
  },
  {
    id: "rights",
    title: "6. Athlete Rights & Data Deletion",
    summary:
      "Right to access, rectify, export, and completely purge your training logs and account.",
    content: (
      <div className="space-y-4">
        <p>
          Under international privacy standards, every FlexPulse member possesses full control over their digital footprint:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5">
            <strong className="block text-foreground font-bold mb-1">Right to Complete Export</strong>
            <p className="text-slate-600 dark:text-slate-400 text-xs">
              Download your complete biometric history, class bookings, and workout logs as an encrypted JSON/CSV package.
            </p>
          </div>
          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5">
            <strong className="block text-foreground font-bold mb-1">Right to Total Erasure</strong>
            <p className="text-slate-600 dark:text-slate-400 text-xs">
              Submit a purge request to delete all biometric scans, CCTV facial verification snapshots, and account records within 30 days.
            </p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "contact",
    title: "7. Data Protection Officer & Concierge",
    summary:
      "Contact information for privacy inquiries, data access requests, or regulatory queries.",
    content: (
      <div className="space-y-4">
        <p>
          For questions regarding this policy, to request data exports, or to exercise your GDPR/HIPAA rights, reach out directly to our dedicated Data Protection Officer:
        </p>
        <div className="p-4 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs sm:text-sm space-y-1">
          <p className="font-bold text-foreground">FlexPulse Privacy & Security Bureau</p>
          <p className="text-slate-600 dark:text-slate-400">Email: <span className="text-active font-mono">privacy@flexpulse.com</span></p>
          <p className="text-slate-600 dark:text-slate-400">Concierge Desk: <span className="font-mono text-foreground">+880 1712-345678</span></p>
          <p className="text-slate-600 dark:text-slate-400">Address: 128 Pulse Blvd, Cyber District, Dhaka, Bangladesh</p>
        </div>
      </div>
    ),
  },
];

export default function PrivacyPolicyClient() {
  const [activeSection, setActiveSection] = useState(SECTIONS[0].id);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSections = SECTIONS.filter(
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
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-active/10 rounded-full blur-[140px] pointer-events-none -z-10" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-brand-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />

        <div className="w-11/12 mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-active/15 border border-active/30 text-active text-xs font-black tracking-wider uppercase">
                <FaShieldAlt className="w-3.5 h-3.5" />
                <span>Athletic Data Integrity • GDPR & HIPAA Aligned</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-['Outfit'] tracking-tight text-foreground leading-tight">
                Athlete Privacy Policy
              </h1>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 font-['Inter'] leading-relaxed">
                How FlexPulse safeguards your biometric telemetry, InBody scans, facility access timestamps, and coaching analytics with zero-knowledge encryption.
              </p>
            </div>

            {/* Quick Meta & Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                type="button"
                onClick={handlePrint}
                className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-white/15 bg-white dark:bg-[#141228] hover:border-active text-foreground text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                <FaPrint className="w-3.5 h-3.5 text-active" />
                <span>Print Document</span>
              </button>
              <Link
                href="/contact"
                className="px-4 py-2.5 rounded-xl bg-active text-white text-xs font-bold transition-all hover:opacity-95 shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <FaEnvelope className="w-3.5 h-3.5" />
                <span>Contact DPO Desk</span>
              </Link>
            </div>
          </div>

          {/* Quick Stats Pill Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 pt-6 border-t border-brand-500/15 text-xs font-['Inter']">
            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-emerald-500 w-4 h-4 shrink-0" />
              <span><strong>Version:</strong> 3.4 Official</span>
            </div>
            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-emerald-500 w-4 h-4 shrink-0" />
              <span><strong>Effective:</strong> Sept 2026</span>
            </div>
            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-emerald-500 w-4 h-4 shrink-0" />
              <span><strong>Encryption:</strong> AES-256 Bits</span>
            </div>
            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-emerald-500 w-4 h-4 shrink-0" />
              <span><strong>Data Resale:</strong> 0% Guaranteed</span>
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
                    placeholder="Search privacy clauses..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#141228] text-xs sm:text-sm text-foreground placeholder:text-slate-400 focus:outline-none focus:border-active transition-all"
                  />
                </div>

                {/* Section Table of Contents */}
                <div className="p-4 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c0b1a] shadow-xs">
                  <span className="text-[11px] font-mono uppercase tracking-wider font-extrabold text-slate-500 dark:text-slate-400 block mb-3">
                    Table of Contents
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

                {/* Quick Assistance Box */}
                <div className="p-4 rounded-2xl bg-linear-to-br from-active/10 to-brand-500/10 border border-active/20 space-y-2">
                  <div className="flex items-center gap-2 text-active font-bold text-xs uppercase tracking-wider">
                    <FaQuestionCircle className="w-4 h-4" /> Have Privacy Inquiries?
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    Our compliance desk responds to athlete data export and deletion requests within 24–48 business hours.
                  </p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-active hover:underline pt-1"
                  >
                    <span>Open Concierge Ticket</span>
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
