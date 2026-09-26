// feat: ticket modal
"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiZap, 
  FiCheckCircle, 
  FiShield, 
  FiArrowRight, 
  FiCopy, 
  FiCheck, 
  FiUser, 
  FiMail, 
  FiPhone, 
  FiClock, 
  FiStar 
} from "react-icons/fi";
import { submitTrialPass } from "@/lib/api/getClasses";
import toast from "react-hot-toast";

const TRANSITION_EASE = [0.16, 1, 0.3, 1];

const VIP_PERKS = [
  "Full access to Olympic weight halls & turf tracks",
  "1 Complimentary master coach studio class",
  "Executive locker rooms, saunas & plunge suites",
  "Free initial 3D InBody 570 composition scan"
];

export default function TrialPassBanner() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [loading, setLoading] = useState(false);
  const [passCode, setPassCode] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error("Please fill in all required details.");
      return;
    }

    try {
      setLoading(true);
      const res = await submitTrialPass(formData);
      if (res && res.passCode) {
        setPassCode(res.passCode);
        toast.success("VIP Trial Pass generated successfully!");
      } else {
        toast.error(res?.message || "Could not generate trial pass. Please try again.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong generating your pass.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopyCode = () => {
    if (!passCode) return;
    navigator.clipboard.writeText(passCode);
    setCopied(true);
    toast.success("Pass code copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <section className="py-20 lg:py-24 bg-background border-t border-b border-brand-500/15 relative overflow-hidden transition-colors duration-300">
        
        {/* Layered Ambient Mesh Glow */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 sm:w-140 h-96 sm:h-140 bg-active/8 rounded-full blur-[140px] pointer-events-none -z-10" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-80 sm:w-120 h-80 sm:h-120 bg-brand-500/10 rounded-full blur-[130px] pointer-events-none -z-10" />

        <div className="w-11/12 mx-auto relative z-10">
          
          {/* High-Impact Athletic VIP Banner Card */}
          <div className="relative rounded-3xl sm:rounded-4xl p-8 sm:p-12 lg:p-16 bg-linear-to-br from-white dark:from-[#070F2B] via-[#535C91]/5 dark:via-[#1B1A55]/40 to-white dark:to-[#070F2B] border border-brand-500/25 shadow-2xl overflow-hidden">
            
            {/* Watermark Kinetic Typography Background */}
            <div className="absolute right-0 bottom-0 select-none pointer-events-none opacity-[0.025] dark:opacity-[0.035] text-[90px] sm:text-[140px] lg:text-[180px] font-black font-['Outfit'] tracking-tighter leading-none whitespace-nowrap -z-10">
              FLEXPULSE VIP
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left Column: Accreditation, Headline, Perks & Social Proof (7 cols) */}
              <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
                
                {/* Accreditation Kicker Badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-800/25 dark:bg-[#1B1A55]/70 border border-brand-500/25 text-xs font-bold tracking-wide shadow-xs">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-active opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-active"></span>
                  </span>
                  <span className="text-active uppercase tracking-wider font-extrabold text-[11px]">
                    No Credit Card Required
                  </span>
                  <span className="text-[#535C91] dark:text-[#9290C3]">
                    • 100% Free 1-Day VIP Pass
                  </span>
                </div>

                {/* Section Headline */}
                <div className="space-y-1">
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-['Outfit'] text-foreground tracking-tight leading-[1.12]">
                    Ready to Experience <span className="text-active">FlexPulse</span>?
                  </h2>
                </div>

                <p className="text-sm sm:text-base text-[#535C91] dark:text-[#9290C3] max-w-xl font-['Inter'] leading-relaxed mx-auto lg:mx-0">
                  Step inside our flagship training facility. Experience an Olympic lifting session, join a high-tempo class, and recover in our infrared saunas — completely complimentary with zero commitment.
                </p>

                {/* 4 Verified Perks Checklist in a 2x2 Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-left font-['Inter']">
                  {VIP_PERKS.map((perk, idx) => (
                    <div key={idx} className="flex items-center gap-2.5">
                      <div className="p-0.5 rounded-full bg-active/15 text-active shrink-0">
                        <FiCheckCircle className="w-4 h-4 text-active" />
                      </div>
                      <span className="text-xs font-medium text-foreground">
                        {perk}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Athlete Social Proof Strip */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-3 border-t border-brand-500/15">
                  <div className="flex -space-x-2 overflow-hidden shrink-0">
                    <img
                      className="inline-block h-7 w-7 rounded-full ring-2 ring-background object-cover"
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop"
                      alt="FlexPulse Athlete"
                    />
                    <img
                      className="inline-block h-7 w-7 rounded-full ring-2 ring-background object-cover"
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop"
                      alt="FlexPulse Athlete"
                    />
                    <img
                      className="inline-block h-7 w-7 rounded-full ring-2 ring-background object-cover"
                      src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=100&auto=format&fit=crop"
                      alt="FlexPulse Athlete"
                    />
                    <div className="inline-flex items-center justify-center h-7 w-7 rounded-full ring-2 ring-background bg-active text-white text-[9px] font-bold">
                      +1.2k
                    </div>
                  </div>
                  <div className="text-xs text-[#535C91] dark:text-[#9290C3] font-['Inter'] flex items-center gap-1.5">
                    <div className="flex items-center text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <FiStar key={i} className="w-3 h-3 fill-amber-400" />
                      ))}
                    </div>
                    <span className="font-semibold text-foreground text-xs">
                      1,200+ VIP Passes Activated This Month
                    </span>
                  </div>
                </div>

              </div>

              {/* Right Column: High-Energy Action Box (5 cols) */}
              <div className="lg:col-span-5 flex flex-col items-center lg:items-end justify-center">
                <div className="w-full max-w-sm p-6 sm:p-7 rounded-3xl bg-white/70 dark:bg-[#121026]/80 backdrop-blur-xl border border-brand-500/25 shadow-xl space-y-4 text-center">
                  
                  <div className="w-12 h-12 rounded-2xl bg-active/10 text-active flex items-center justify-center mx-auto shadow-inner">
                    <FiZap className="w-6 h-6 text-active" />
                  </div>

                  <div>
                    <h3 className="font-['Outfit'] text-xl font-bold text-foreground">
                      Instant VIP Access
                    </h3>
                    <p className="text-xs text-[#535C91] dark:text-[#9290C3] font-['Inter'] mt-0.5">
                      Digital pass code generated instantly upon request
                    </p>
                  </div>

                  {/* Primary CTA */}
                  <button
                    type="button"
                    onClick={() => {
                      setPassCode(null);
                      setIsOpen(true);
                    }}
                    className="w-full py-4 px-6 bg-btn-bg text-btn-text hover:opacity-95 font-extrabold rounded-2xl shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all text-sm sm:text-base cursor-pointer flex items-center justify-center gap-2 group"
                  >
                    <FiZap className="w-4 h-4 text-btn-text group-hover:scale-120 transition-transform" />
                    <span>Claim Free Day Pass</span>
                  </button>

                  {/* Secondary Link to Schedule */}
                  <Link
                    href="/schedule"
                    className="w-full py-3.5 px-5 rounded-2xl bg-[#535C91]/10 dark:bg-[#1B1A55]/70 hover:bg-[#535C91]/15 text-foreground font-bold text-xs sm:text-sm border border-brand-500/25 hover:border-active/40 transition-all cursor-pointer flex items-center justify-center gap-2 group"
                  >
                    <span>Inspect Class Schedule</span>
                    <FiArrowRight className="w-3.5 h-3.5 text-active group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <p className="text-[11px] text-[#535C91] dark:text-[#9290C3] font-['Inter'] pt-1">
                    🔒 No payment info needed • Valid for 7 days
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Upgraded VIP Trial Pass Modal with AnimatePresence */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.3, ease: TRANSITION_EASE }}
              className="bg-[#070F2B] border border-active/40 rounded-3xl max-w-md w-full p-6 sm:p-8 relative shadow-2xl text-foreground font-['Inter']"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close dialog"
              >
                ✕
              </button>

              {passCode ? (
                /* Generated VIP Ticket Display */
                <div className="text-center space-y-5">
                  <div className="w-16 h-16 rounded-full bg-active/20 text-active flex items-center justify-center mx-auto shadow-inner">
                    <FiCheckCircle className="w-8 h-8 text-active" />
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-2xl font-extrabold font-['Outfit'] text-white">
                      VIP Day Pass Activated!
                    </h3>
                    <p className="text-xs text-gray-300">
                      Present this pass code to the receptionist upon check-in at any FlexPulse location:
                    </p>
                  </div>

                  {/* Ticket Notch Container */}
                  <div className="relative p-5 rounded-2xl bg-black/70 border border-active/60 shadow-inner space-y-2">
                    <p className="text-[10px] text-active font-extrabold uppercase tracking-widest">
                      Official FlexPulse Passcode
                    </p>
                    <div className="font-mono text-3xl font-black text-white tracking-widest select-all">
                      {passCode}
                    </div>

                    <div className="pt-2 flex justify-center">
                      <button
                        type="button"
                        onClick={handleCopyCode}
                        className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-colors cursor-pointer"
                      >
                        {copied ? (
                          <>
                            <FiCheck className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400">Copied!</span>
                          </>
                        ) : (
                          <>
                            <FiCopy className="w-3.5 h-3.5 text-active" />
                            <span>Copy Code</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-left text-xs text-gray-300 space-y-1">
                    <p className="font-bold text-white flex items-center gap-1.5">
                      <FiClock className="w-3.5 h-3.5 text-active" /> Valid for 7 Days
                    </p>
                    <p className="text-[11px] text-gray-400">
                      Includes full access to Olympic weights, infrared sauna suites, and 1 studio class.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="w-full py-3.5 bg-btn-bg text-btn-text font-extrabold rounded-xl shadow-md hover:opacity-95 transition-all text-sm cursor-pointer"
                  >
                    Done & Close
                  </button>
                </div>
              ) : (
                /* Registration Form */
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="text-center space-y-1 pb-1">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-active/20 text-active text-[10px] font-extrabold uppercase tracking-wider mb-1">
                      <FiZap className="w-3 h-3" /> Complimentary 1-Day Access
                    </div>
                    <h3 className="text-2xl font-extrabold font-['Outfit'] text-white">
                      Claim VIP Trial Pass
                    </h3>
                    <p className="text-xs text-gray-400">
                      Enter your details to generate your digital entry passcode instantly.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-300 mb-1">Full Name</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-gray-400">
                        <FiUser className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Marcus Vance"
                        className="w-full pl-10 pr-3.5 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-active outline-none placeholder:text-gray-500 font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-300 mb-1">Email Address</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-gray-400">
                        <FiMail className="w-4 h-4" />
                      </div>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="marcus@athlete.com"
                        className="w-full pl-10 pr-3.5 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-active outline-none placeholder:text-gray-500 font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-300 mb-1">Phone Number</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-gray-400">
                        <FiPhone className="w-4 h-4" />
                      </div>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+1 (555) 234-5678"
                        className="w-full pl-10 pr-3.5 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-active outline-none placeholder:text-gray-500 font-medium"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 bg-btn-bg text-btn-text font-extrabold rounded-xl shadow-lg hover:opacity-95 transition-all text-sm cursor-pointer disabled:opacity-50 mt-2"
                  >
                    {loading ? "Generating Digital Pass..." : "Generate VIP Day Pass"}
                  </button>
                </form>
              )}
            </motion.div>

          </div>
        )}
      </AnimatePresence>
    </>
  );
}
