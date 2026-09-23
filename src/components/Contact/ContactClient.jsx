"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiMail, 
  FiPhone, 
  FiMapPin, 
  FiClock, 
  FiSend, 
  FiCheckCircle, 
  FiHelpCircle, 
  FiChevronDown, 
  FiZap 
} from "react-icons/fi";
import { submitContact, submitTrialPass } from "@/lib/api/getClasses";
import toast from "react-hot-toast";

const FAQS = [
  {
    q: "Can I try out FlexPulse before signing up for a monthly or annual membership?",
    a: "Absolutely! We offer a completely free VIP 1-Day Pass that grants full access to our weight room, cardio deck, locker rooms, and any standard group fitness class on the schedule."
  },
  {
    q: "What are your operating hours on weekends and public holidays?",
    a: "Our clubs are open Monday through Friday from 6:00 AM to 10:00 PM, and Saturday through Sunday from 8:00 AM to 8:00 PM. On official holidays, we maintain weekend hours unless notified via our mobile portal."
  },
  {
    q: "Are personal trainers included with standard gym membership tiers?",
    a: "All members receive a complimentary 60-minute fitness assessment and customized onboarding plan. Elite Tier members receive 2 free private personal training sessions every month with certified coaches."
  },
  {
    q: "Can I freeze or pause my membership while traveling?",
    a: "Yes, you can pause your membership for up to 90 consecutive days directly from your Member Dashboard or by notifying our support desk 7 days prior to departure."
  },
  {
    q: "What should I bring for my first session?",
    a: "Bring clean athletic training footwear, workout attire, and a personal water bottle. We provide fresh sanitized towels, premium locker storage, and organic shower essentials."
  }
];

export default function ContactClient() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Membership Inquiry",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState(0);

  // VIP Pass Modal
  const [isPassModalOpen, setIsPassModalOpen] = useState(false);
  const [passData, setPassData] = useState({ name: "", email: "", phone: "" });
  const [passLoading, setPassLoading] = useState(false);
  const [passSuccess, setPassSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      setSubmitting(true);
      const res = await submitContact(formData);
      if (res && res.success) {
        setSubmitted(true);
        toast.success("Your message has been sent successfully!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "Membership Inquiry",
          message: "",
        });
      } else {
        toast.error(res?.message || "Failed to submit inquiry. Please try again.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error sending message. Please reach out via phone or email.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleClaimPass = async (e) => {
    e.preventDefault();
    if (!passData.name || !passData.email || !passData.phone) {
      toast.error("Please enter your name, email, and phone number.");
      return;
    }
    try {
      setPassLoading(true);
      const res = await submitTrialPass(passData);
      if (res && res.passCode) {
        setPassSuccess(res.passCode);
        toast.success("VIP Trial Pass generated!");
      } else {
        toast.error("Unable to generate pass. Please try again.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error creating pass.");
    } finally {
      setPassLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      {/* Hero Header */}
      <section className="relative py-20 bg-linear-to-b from-[#1B1A55]/15 via-background to-background border-b border-brand-500/15 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-active/5 rounded-full blur-[130px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-800/20 border border-brand-500/30 text-active text-xs font-bold tracking-wider uppercase mb-5">
            <span className="flex h-2 w-2 rounded-full bg-active animate-pulse" />
            24/7 Member Care & Facilities
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-['Outfit'] tracking-tight mb-4">
            Connect With <span className="text-active">FlexPulse</span>
          </h1>
          <p className="text-lg text-[#535C91] dark:text-[#9290C3] max-w-2xl mx-auto font-['Inter']">
            Have questions about workout programs, corporate memberships, or personal training? Our team of certified coaches and fitness advisors are standing by.
          </p>
        </div>
      </section>

      {/* Main Grid: Info + Contact Form */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 -mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Direct Info & Pass Callout (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Quick Contact Card */}
            <div className="p-8 rounded-3xl bg-[#535C91]/5 dark:bg-[#070F2B] border border-brand-500/20 shadow-xl space-y-6">
              <h2 className="text-2xl font-bold font-['Outfit'] tracking-tight">
                Club Information
              </h2>
              <p className="text-sm text-[#535C91] dark:text-[#9290C3] font-['Inter'] leading-relaxed">
                Visit our premier athletic facility or speak directly with our front desk coordinators.
              </p>

              <div className="space-y-4 font-['Inter'] text-sm">
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-background/50 border border-brand-500/10">
                  <div className="p-3 rounded-xl bg-active/10 text-active shrink-0 mt-0.5">
                    <FiMapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground text-sm">Flagship Location</h4>
                    <p className="text-xs text-[#535C91] dark:text-[#9290C3] mt-1">
                      128 Pulse Blvd, Cyber Athletic District, Dhaka 1212
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-background/50 border border-brand-500/10">
                  <div className="p-3 rounded-xl bg-active/10 text-active shrink-0 mt-0.5">
                    <FiPhone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground text-sm">Direct Phone Lines</h4>
                    <p className="text-xs text-[#535C91] dark:text-[#9290C3] mt-1">
                      Front Desk: +880 1712-345678<br />
                      VIP Membership: +880 1819-876543
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-background/50 border border-brand-500/10">
                  <div className="p-3 rounded-xl bg-active/10 text-active shrink-0 mt-0.5">
                    <FiMail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground text-sm">Official Email</h4>
                    <p className="text-xs text-[#535C91] dark:text-[#9290C3] mt-1">
                      contact@flexpulse.com<br />
                      training@flexpulse.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-background/50 border border-brand-500/10">
                  <div className="p-3 rounded-xl bg-active/10 text-active shrink-0 mt-0.5">
                    <FiClock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground text-sm">Operating Hours</h4>
                    <p className="text-xs text-[#535C91] dark:text-[#9290C3] mt-1">
                      Mon – Fri: 6:00 AM – 10:00 PM<br />
                      Sat – Sun: 8:00 AM – 8:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Trial Pass Card Banner */}
            <div className="p-7 rounded-3xl bg-linear-to-br from-active/15 via-[#1B1A55]/30 to-background border border-active/30 relative overflow-hidden shadow-xl">
              <div className="relative z-10 space-y-3">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-active text-white text-[11px] font-bold uppercase tracking-wider">
                  <FiZap className="w-3.5 h-3.5" /> Instant Pass
                </div>
                <h3 className="text-xl font-bold font-['Outfit'] text-foreground">
                  Experience FlexPulse For Free
                </h3>
                <p className="text-xs text-[#535C91] dark:text-[#9290C3] font-['Inter'] leading-relaxed">
                  Claim your complimentary 1-Day All-Access Pass with no obligation. Train on Olympic equipment and join any group session.
                </p>
                <button
                  onClick={() => {
                    setPassSuccess(null);
                    setIsPassModalOpen(true);
                  }}
                  className="w-full mt-2 py-3 bg-btn-bg text-btn-text font-bold text-sm rounded-xl shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer text-center"
                >
                  Claim 1-Day Trial Pass
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Inquiry Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-[#535C91]/5 dark:bg-[#070F2B] border border-brand-500/20 shadow-xl">
              <h2 className="text-2xl sm:text-3xl font-bold font-['Outfit'] tracking-tight mb-2">
                Send Us a Message
              </h2>
              <p className="text-sm text-[#535C91] dark:text-[#9290C3] font-['Inter'] mb-8">
                Fill in the details below and our membership concierge will reply within 4 business hours.
              </p>

              {submitted ? (
                <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                    <FiCheckCircle className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold font-['Outfit'] text-foreground">
                    Message Dispatched Successfully!
                  </h3>
                  <p className="text-sm text-[#535C91] dark:text-[#9290C3] font-['Inter'] max-w-md mx-auto">
                    Thank you for reaching out. One of our fitness advisors will review your inquiry and get back to you shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-6 py-2.5 rounded-xl bg-brand-800 text-foreground font-bold text-sm border border-brand-500/30 hover:border-active transition-all cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 font-['Inter']">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-2">
                        Full Name <span className="text-active">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Alex Morgan"
                        className="w-full px-4 py-3 rounded-xl bg-background border border-brand-500/20 focus:border-active focus:ring-2 focus:ring-active/20 text-sm text-foreground placeholder-[#535C91]/50 dark:placeholder-[#9290C3]/40 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-2">
                        Email Address <span className="text-active">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="alex@example.com"
                        className="w-full px-4 py-3 rounded-xl bg-background border border-brand-500/20 focus:border-active focus:ring-2 focus:ring-active/20 text-sm text-foreground placeholder-[#535C91]/50 dark:placeholder-[#9290C3]/40 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+880 1700-000000"
                        className="w-full px-4 py-3 rounded-xl bg-background border border-brand-500/20 focus:border-active focus:ring-2 focus:ring-active/20 text-sm text-foreground placeholder-[#535C91]/50 dark:placeholder-[#9290C3]/40 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-2">
                        Inquiry Subject
                      </label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-background border border-brand-500/20 focus:border-active focus:ring-2 focus:ring-active/20 text-sm text-foreground outline-none transition-all cursor-pointer"
                      >
                        <option value="Membership Inquiry">Membership Inquiry</option>
                        <option value="Personal Training Consultation">Personal Training Consultation</option>
                        <option value="Class Schedule Question">Class Schedule Question</option>
                        <option value="Corporate & Group Package">Corporate & Group Package</option>
                        <option value="General Feedback">General Feedback</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-2">
                      Your Message <span className="text-active">*</span>
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about your fitness goals or questions..."
                      className="w-full px-4 py-3 rounded-xl bg-background border border-brand-500/20 focus:border-active focus:ring-2 focus:ring-active/20 text-sm text-foreground placeholder-[#535C91]/50 dark:placeholder-[#9290C3]/40 outline-none transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 bg-btn-bg text-btn-text font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {submitting ? (
                      <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <FiSend className="w-5 h-5" />
                        Send Inquiry
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Interactive FAQ Section */}
        <section className="mt-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-800/30 text-active text-xs font-bold uppercase tracking-wider mb-3">
              <FiHelpCircle className="w-4 h-4" /> Got Questions?
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-['Outfit'] tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-[#535C91] dark:text-[#9290C3] mt-2 font-['Inter']">
              Everything you need to know about memberships, club etiquette, and personal training.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-3 font-['Inter']">
            {FAQS.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-brand-500/20 bg-[#535C91]/5 dark:bg-[#070F2B] overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? -1 : index)}
                    className="w-full px-6 py-4.5 flex items-center justify-between text-left font-bold text-foreground hover:text-active transition-colors cursor-pointer"
                  >
                    <span className="text-sm sm:text-base pr-4">{faq.q}</span>
                    <FiChevronDown
                      className={`w-5 h-5 text-active shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <div className="px-6 pb-5 pt-1 text-sm text-[#535C91] dark:text-[#9290C3] leading-relaxed border-t border-brand-500/10">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {/* Trial Pass Modal */}
      {isPassModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#070F2B] border border-active/30 rounded-3xl max-w-md w-full p-6 sm:p-8 relative shadow-2xl">
            <button
              onClick={() => setIsPassModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              ✕
            </button>

            {passSuccess ? (
              <div className="text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-active/20 text-active flex items-center justify-center mx-auto">
                  <FiCheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold font-['Outfit'] text-white">
                  VIP Pass Activated!
                </h3>
                <p className="text-xs text-gray-300 font-['Inter']">
                  Present this digital pass code at our reception to enjoy 1-Day full VIP club access:
                </p>
                <div className="p-4 rounded-2xl bg-black/60 border border-active/50 font-mono text-2xl font-bold text-active tracking-widest select-all">
                  {passSuccess}
                </div>
                <p className="text-[11px] text-gray-400">
                  Valid for 7 days from today. Includes full facility usage and scheduled class entry.
                </p>
                <button
                  onClick={() => setIsPassModalOpen(false)}
                  className="w-full py-3 bg-btn-bg text-btn-text font-bold rounded-xl"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleClaimPass} className="space-y-4 font-['Inter']">
                <div className="text-center space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-active/20 text-active text-xs font-bold uppercase tracking-wider mb-1">
                    <FiZap className="w-3.5 h-3.5" /> 100% Free
                  </div>
                  <h3 className="text-2xl font-bold font-['Outfit'] text-white">
                    Claim VIP Day Pass
                  </h3>
                  <p className="text-xs text-gray-400">
                    Experience Olympic-grade fitness for an entire day at FlexPulse.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={passData.name}
                    onChange={(e) => setPassData({ ...passData, name: e.target.value })}
                    placeholder="Your name"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-active outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={passData.email}
                    onChange={(e) => setPassData({ ...passData, email: e.target.value })}
                    placeholder="you@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-active outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Phone</label>
                  <input
                    type="tel"
                    required
                    value={passData.phone}
                    onChange={(e) => setPassData({ ...passData, phone: e.target.value })}
                    placeholder="+880 1700-000000"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-active outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={passLoading}
                  className="w-full py-3 bg-btn-bg text-btn-text font-bold rounded-xl shadow-lg hover:opacity-95 transition-all text-sm cursor-pointer disabled:opacity-50"
                >
                  {passLoading ? "Generating VIP Pass..." : "Generate My Pass"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
