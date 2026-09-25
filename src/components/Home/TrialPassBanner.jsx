"use client";

import { useState } from "react";
import Link from "next/link";
import { FiZap, FiCheckCircle, FiShield, FiArrowRight } from "react-icons/fi";
import { submitTrialPass } from "@/lib/api/getClasses";
import toast from "react-hot-toast";

export default function TrialPassBanner() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [loading, setLoading] = useState(false);
  const [passCode, setPassCode] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error("Please fill in all details");
      return;
    }

    try {
      setLoading(true);
      const res = await submitTrialPass(formData);
      if (res && res.passCode) {
        setPassCode(res.passCode);
        toast.success("VIP Trial Pass generated successfully!");
      } else {
        toast.error("Could not generate trial pass. Please try again.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong generating pass.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="py-20 bg-linear-to-r from-[#1B1A55]/40 via-background to-[#1B1A55]/40 border-t border-b border-brand-500/15 relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-active/10 rounded-full blur-[130px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="p-10 sm:p-14 rounded-3xl bg-linear-to-r from-active/20 via-[#1B1A55]/40 to-[#070F2B] border border-active/30 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl">
            <div className="space-y-4 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-active text-white text-xs font-bold uppercase tracking-wider">
                <FiZap className="w-3.5 h-3.5" /> No Credit Card Required
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-['Outfit'] text-foreground tracking-tight">
                Ready to Experience <span className="text-active">FlexPulse</span>?
              </h2>
              <p className="text-sm sm:text-base text-[#535C91] dark:text-[#9290C3] max-w-xl font-['Inter']">
                Claim your complimentary VIP 1-Day Pass today. Access all weights, recovery amenities, and participate in any group class.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto shrink-0">
              <button
                onClick={() => {
                  setPassCode(null);
                  setIsOpen(true);
                }}
                className="px-8 py-4 bg-btn-bg text-btn-text font-bold rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all text-base cursor-pointer text-center"
              >
                Claim Free Day Pass
              </button>
              <Link
                href="/schedule"
                className="px-6 py-4 rounded-2xl bg-brand-800 text-foreground font-bold text-base border border-brand-500/30 hover:border-active transition-all text-center flex items-center justify-center gap-2"
              >
                View Class Schedule <FiArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trial Pass Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#070F2B] border border-active/30 rounded-3xl max-w-md w-full p-6 sm:p-8 relative shadow-2xl">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              ✕
            </button>

            {passCode ? (
              <div className="text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-active/20 text-active flex items-center justify-center mx-auto">
                  <FiCheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold font-['Outfit'] text-white">
                  VIP Pass Ready!
                </h3>
                <p className="text-xs text-gray-300 font-['Inter']">
                  Show this pass code to the receptionist upon check-in at any FlexPulse location:
                </p>
                <div className="p-4 rounded-2xl bg-black/60 border border-active/50 font-mono text-2xl font-bold text-active tracking-widest select-all">
                  {passCode}
                </div>
                <p className="text-[11px] text-gray-400">
                  Valid for 7 days. Includes full gym access and any scheduled class.
                </p>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-full py-3 bg-btn-bg text-btn-text font-bold rounded-xl"
                >
                  Awesome, Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 font-['Inter']">
                <div className="text-center space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-active/20 text-active text-xs font-bold uppercase tracking-wider mb-1">
                    <FiZap className="w-3.5 h-3.5" /> 1-Day All-Access Pass
                  </div>
                  <h3 className="text-2xl font-bold font-['Outfit'] text-white">
                    Claim VIP Trial Pass
                  </h3>
                  <p className="text-xs text-gray-400">
                    Step inside FlexPulse and test drive our elite fitness ecosystem.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your full name"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-active outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="you@domain.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-active outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+880 1700-000000"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-active outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-btn-bg text-btn-text font-bold rounded-xl shadow-lg hover:opacity-95 transition-all text-sm cursor-pointer disabled:opacity-50"
                >
                  {loading ? "Generating Code..." : "Generate Free Pass"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
