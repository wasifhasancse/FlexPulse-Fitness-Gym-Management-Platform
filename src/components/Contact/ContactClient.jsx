"use client";

import { submitContact, submitTrialPass } from "@/lib/api/getClasses";
import { AnimatePresence, motion, LayoutGroup } from "framer-motion";
import AnimatedSectionTitle from "@/components/common/AnimatedSectionTitle";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  FaCheck,
  FaCopy,
  FaDirections,
  FaDumbbell,
  FaFire,
  FaHeartbeat,
  FaPhoneAlt,
  FaQrcode,
  FaShieldAlt,
  FaTicketAlt,
  FaUserGraduate,
  FaWhatsapp,
} from "react-icons/fa";
import {
  FiCheckCircle,
  FiChevronDown,
  FiClock,
  FiHelpCircle,
  FiMail,
  FiMapPin,
  FiNavigation,
  FiPhone,
  FiSend,
  FiUser,
  FiZap,
} from "react-icons/fi";

const FAQS = [
  {
    category: "Memberships & Passes",
    q: "Can I try out FlexPulse before signing up for a monthly or annual membership?",
    a: "Absolutely! We offer a completely free VIP 1-Day Pass that grants full access to our weight room, cardio deck, locker rooms, Olympic lifting platforms, and any standard group fitness class on the schedule."
  },
  {
    category: "Facilities & Hours",
    q: "What are your operating hours on weekends and public holidays?",
    a: "Our clubs are open Monday through Friday from 6:00 AM to 10:00 PM, and Saturday through Sunday from 8:00 AM to 8:00 PM. On official holidays, we maintain weekend hours unless notified via our mobile member portal."
  },
  {
    category: "Coaching & Assessments",
    q: "Are personal trainers included with standard gym membership tiers?",
    a: "All members receive a complimentary 60-minute InBody 570 biometric assessment and a customized onboarding workout plan. Pro and Elite tier members receive dedicated 1-on-1 private training sessions every month with certified coaches."
  },
  {
    category: "Memberships & Passes",
    q: "Can I freeze or pause my membership while traveling?",
    a: "Yes, you can pause your membership for up to 90 consecutive days directly from your Member Dashboard or by notifying our support desk 7 days prior to departure at no extra penalty."
  },
  {
    category: "Facilities & Hours",
    q: "What should I bring for my first training session?",
    a: "Bring clean athletic training footwear, workout attire, and a personal water bottle. We provide fresh chilled towels, biometric locker storage, sauna access, and organic shower essentials."
  },
  {
    category: "Coaching & Assessments",
    q: "Do you offer corporate or group wellness wellness packages?",
    a: "Yes! We partner with leading corporations and athletic teams, offering subsidized employee memberships, dedicated corporate group classes, and executive wellness workshops."
  }
];

const CONCIERGE_TEAM = [
  {
    name: "Sarah Jenkins",
    role: "Head of Member Experience",
    email: "sarah.j@flexpulse.com",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
    badge: "VIP Onboarding Lead",
    bio: "Guides prospective members through personalized tier selections, private facility walkthroughs, and custom schedule setups."
  },
  {
    name: "David Chen",
    role: "Corporate Partnerships Director",
    email: "david.c@flexpulse.com",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    badge: "Corporate & Teams",
    bio: "Structures subsidized corporate wellness accounts, sports team athletic blocks, and executive health partnerships."
  },
  {
    name: "Coach Alana Serrano",
    role: "Director of Fitness Assessments",
    email: "alana@flexpulse.com",
    image: "https://t4.ftcdn.net/jpg/11/66/06/77/360_F_1166067709_2SooAuPWXp20XkGev7oOT7nuK1VThCsN.jpg",
    badge: "Master Coach • NASM",
    bio: "Conducts InBody 570 clinical scans, functional movement screens, and pairs athletes with certified 1-on-1 personal trainers."
  }
];

export default function ContactClient() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Membership Inquiry",
    goal: "Hypertrophy & Strength",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState(0);
  const [faqCategory, setFaqCategory] = useState("All");

  // VIP Pass Modal
  const [isPassModalOpen, setIsPassModalOpen] = useState(false);
  const [passData, setPassData] = useState({ name: "", email: "", phone: "" });
  const [passLoading, setPassLoading] = useState(false);
  const [passSuccess, setPassSuccess] = useState(null);
  const [copiedPass, setCopiedPass] = useState(false);

  const goalOptions = [
    { label: "Hypertrophy & Strength", icon: FaDumbbell },
    { label: "Fat Loss & HIIT", icon: FaFire },
    { label: "Mobility & Longevity", icon: FaHeartbeat },
    { label: "Athletic Conditioning", icon: FiZap },
  ];

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
        toast.success("Your inquiry has been received! Our concierge will reply shortly.");
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "Membership Inquiry",
          goal: "Hypertrophy & Strength",
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
        toast.success("1-Day VIP Pass Generated Successfully!");
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

  const handleCopyPass = () => {
    if (!passSuccess) return;
    navigator.clipboard.writeText(passSuccess);
    setCopiedPass(true);
    toast.success("VIP Pass code copied to clipboard!");
    setTimeout(() => setCopiedPass(false), 2500);
  };

  const filteredFaqs =
    faqCategory === "All"
      ? FAQS
      : FAQS.filter((f) => f.category === faqCategory);

  return (
    <div className="min-h-screen bg-background text-foreground pb-24 transition-colors duration-300">
      {/* 1. High-Impact Athletic Hero Header */}
      <section className="relative pt-16 pb-20 overflow-hidden bg-gradient-to-b from-[#1B1A55]/20 via-background to-background border-b border-brand-500/15">
        {/* Ambient Glows & Grid */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-active/10 rounded-full blur-[140px] pointer-events-none -z-10" />
        <div className="absolute -bottom-10 left-1/4 w-[400px] h-[400px] bg-brand-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Hero Header with Exit Animation */}
          <AnimatedSectionTitle
            kicker="Concierge Desk: Open • Average Reply Time < 2.4 Hours"
            title="Connect With FlexPulse Athletic HQ"
            highlightText="FlexPulse Athletic HQ"
            subtitle="Whether you're scheduling a private facility walkthrough, requesting a trainer assessment, or claiming your 1-Day VIP Pass — our team is dedicated to supporting your fitness journey."
            align="center"
            className="mb-8"
          />

          {/* Quick Jump Action Pills */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-3 text-xs font-['Inter'] font-semibold"
          >
            <a
              href="#contact-form"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-btn-bg text-btn-text font-bold shadow-md hover:opacity-90 hover:scale-[1.02] active:scale-95 transition-all"
            >
              <FiSend className="w-3.5 h-3.5" />
              <span>Send Priority Message</span>
            </a>
            <button
              onClick={() => {
                setPassSuccess(null);
                setIsPassModalOpen(true);
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-active/10 hover:bg-active/20 border border-active/30 text-active font-bold transition-all cursor-pointer"
            >
              <FaTicketAlt className="w-3.5 h-3.5" />
              <span>Claim Free VIP Pass</span>
            </button>
            <a
              href="#flagship-map"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/70 dark:bg-[#1B1A55]/40 border border-brand-500/20 text-foreground hover:border-active/40 transition-all"
            >
              <FiMapPin className="w-3.5 h-3.5 text-active" />
              <span>Flagship Location &amp; Map</span>
            </a>
            <a
              href="#faqs-section"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/70 dark:bg-[#1B1A55]/40 border border-brand-500/20 text-foreground hover:border-active/40 transition-all"
            >
              <FiHelpCircle className="w-3.5 h-3.5 text-active" />
              <span>Membership FAQs</span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* 2. Main Two-Column Grid: Club Info & Form */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12" id="contact-form">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Info, VIP Ticket Pass, and Concierge Team (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Quick Contact Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#070F2B] border border-brand-500/20 shadow-xl space-y-6"
            >
              <div className="flex items-center justify-between border-b border-brand-500/10 pb-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold font-['Outfit'] tracking-tight">
                    Club Headquarters
                  </h2>
                  <p className="text-xs text-[#535C91] dark:text-[#9290C3] mt-0.5 font-['Inter']">
                    Direct access to our admissions &amp; training desks
                  </p>
                </div>
                <span className="p-2 rounded-xl bg-active/10 text-active">
                  <FiMapPin className="w-5 h-5" />
                </span>
              </div>

              <div className="space-y-3.5 font-['Inter'] text-xs sm:text-sm">
                {/* Location */}
                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-brand-500/5 dark:bg-background/60 border border-brand-500/10 hover:border-active/30 transition-all">
                  <div className="p-2.5 rounded-xl bg-active/10 text-active shrink-0 mt-0.5">
                    <FiMapPin className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-bold text-foreground text-xs uppercase tracking-wider">
                      Flagship Athletic Facility
                    </h4>
                    <p className="text-xs text-[#535C91] dark:text-[#9290C3] mt-1 leading-snug">
                      128 Pulse Blvd, Cyber Athletic District, Dhaka 1212
                    </p>
                    <a
                      href="#flagship-map"
                      className="inline-flex items-center gap-1 text-[11px] text-active font-bold hover:underline mt-1.5"
                    >
                      <FaDirections className="w-2.5 h-2.5" />
                      <span>View GPS Directions</span>
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-brand-500/5 dark:bg-background/60 border border-brand-500/10 hover:border-active/30 transition-all">
                  <div className="p-2.5 rounded-xl bg-active/10 text-active shrink-0 mt-0.5">
                    <FiPhone className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-bold text-foreground text-xs uppercase tracking-wider">
                      Direct Telephone Lines
                    </h4>
                    <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-[#535C91] dark:text-[#9290C3]">
                      <span>Front Desk: <a href="tel:+8801712345678" className="font-semibold text-foreground hover:text-active">+880 1712-345678</a></span>
                      <span>VIP Admissions: <a href="tel:+8801819876543" className="font-semibold text-foreground hover:text-active">+880 1819-876543</a></span>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-brand-500/5 dark:bg-background/60 border border-brand-500/10 hover:border-active/30 transition-all">
                  <div className="p-2.5 rounded-xl bg-active/10 text-active shrink-0 mt-0.5">
                    <FiMail className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-bold text-foreground text-xs uppercase tracking-wider">
                      Concierge Email
                    </h4>
                    <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-[#535C91] dark:text-[#9290C3]">
                      <a href="mailto:contact@flexpulse.com" className="hover:text-active font-semibold text-foreground">
                        contact@flexpulse.com
                      </a>
                      <a href="mailto:training@flexpulse.com" className="hover:text-active font-semibold text-foreground">
                        training@flexpulse.com
                      </a>
                    </div>
                  </div>
                </div>

                {/* Operating Hours */}
                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-brand-500/5 dark:bg-background/60 border border-brand-500/10 hover:border-active/30 transition-all">
                  <div className="p-2.5 rounded-xl bg-active/10 text-active shrink-0 mt-0.5">
                    <FiClock className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-bold text-foreground text-xs uppercase tracking-wider">
                      Operating Schedule
                    </h4>
                    <div className="mt-1 space-y-0.5 text-xs text-[#535C91] dark:text-[#9290C3]">
                      <div className="flex justify-between">
                        <span>Monday – Friday:</span>
                        <strong className="text-foreground">6:00 AM – 10:00 PM</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>Saturday – Sunday:</span>
                        <strong className="text-foreground">8:00 AM – 8:00 PM</strong>
                      </div>
                      <div className="flex justify-between text-[11px] text-active font-medium">
                        <span>Sauna &amp; Recovery:</span>
                        <span>7:00 AM – 9:30 PM</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Luxury VIP Trial Pass Ticket Voucher */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="relative overflow-hidden rounded-3xl p-6 sm:p-7 bg-gradient-to-br from-[#1B1A55] via-[#070F2B] to-[#1B1A55] text-white border-2 border-active/40 shadow-2xl"
            >
              {/* Decorative Shimmer & Hologram Watermark */}
              <div className="absolute -top-16 -right-16 w-44 h-44 bg-active/20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute top-2 right-2 p-3 opacity-15 pointer-events-none">
                <FaQrcode className="w-24 h-24 text-white" />
              </div>

              {/* Top Stub */}
              <div className="relative z-10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-active text-btn-text text-[10px] font-black uppercase tracking-widest shadow-md">
                    <FiZap className="w-3.5 h-3.5" /> 100% Free VIP Pass
                  </span>
                  <span className="text-[11px] font-mono text-active font-extrabold tracking-widest">
                    VALUE $45 • NO CC
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl font-black font-['Outfit'] text-white leading-tight">
                    1-Day VIP All-Access Pass
                  </h3>
                  <p className="text-xs text-white/80 font-['Inter'] leading-relaxed mt-1">
                    Full access to Olympic barbells, Eleiko platforms, Infrared Sauna, and any scheduled class with zero obligation.
                  </p>
                </div>
              </div>

              {/* Perforated Ticket Divider with Notches */}
              <div className="relative my-4 -mx-6 sm:-mx-7 flex items-center">
                <div className="w-3.5 h-7 bg-background rounded-r-full border-r border-t border-b border-active/40" />
                <div className="flex-1 border-b-2 border-dashed border-white/20 mx-2" />
                <div className="w-3.5 h-7 bg-background rounded-l-full border-l border-t border-b border-active/40" />
              </div>

              {/* Bottom Stub: Benefits & CTA */}
              <div className="relative z-10 space-y-3">
                <div className="grid grid-cols-2 gap-2 text-[11px] text-white/80 font-['Inter']">
                  <div className="flex items-center gap-1.5">
                    <FaCheck className="w-3 h-3 text-emerald-400" />
                    <span>Olympic Weight Deck</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <FaCheck className="w-3 h-3 text-emerald-400" />
                    <span>Recovery Sauna</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <FaCheck className="w-3 h-3 text-emerald-400" />
                    <span>1 Group Class Included</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <FaCheck className="w-3 h-3 text-emerald-400" />
                    <span>Valid For 7 Days</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setPassSuccess(null);
                    setIsPassModalOpen(true);
                  }}
                  className="w-full mt-2 py-3.5 rounded-xl bg-btn-bg text-btn-text font-black text-xs uppercase tracking-wider shadow-lg hover:opacity-95 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <FaTicketAlt className="w-3.5 h-3.5" />
                  <span>Claim Digital VIP Pass</span>
                </button>
              </div>
            </motion.div>
          </div>

          {/* Right Column: High-Conversion Interactive Inquiry Form (7 cols) */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-[#070F2B] border border-brand-500/20 shadow-xl relative"
            >
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl sm:text-3xl font-black font-['Outfit'] tracking-tight">
                  Send Priority Inquiry
                </h2>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/10 text-active text-xs font-bold uppercase tracking-wider">
                  <FiClock className="w-3 h-3" /> Same-Day Reply
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#535C91] dark:text-[#9290C3] font-['Inter'] mb-8">
                Fill out the details below. Our admissions desk will assign a personal advisor to answer your specific questions.
              </p>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-8 sm:p-12 rounded-3xl bg-emerald-500/10 border-2 border-emerald-500/30 text-center space-y-4"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto shadow-inner">
                    <FiCheckCircle className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-black font-['Outfit'] text-foreground">
                    Message Dispatched Successfully!
                  </h3>
                  <p className="text-xs sm:text-sm text-[#535C91] dark:text-[#9290C3] font-['Inter'] max-w-md mx-auto leading-relaxed">
                    Thank you for contacting FlexPulse. Your inquiry has been routed to our admissions coordinators. Expect a follow-up via email or phone within 4 business hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-6 py-3 rounded-xl bg-btn-bg text-btn-text font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-all cursor-pointer shadow-md"
                  >
                    Send Another Inquiry
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 font-['Inter']">
                  {/* Inquiry Topic Selector */}
                  <div>
                    <label className="block text-xs font-bold text-foreground uppercase tracking-wider mb-2">
                      Inquiry Subject / Topic <span className="text-active">*</span>
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        "Membership Inquiry",
                        "Personal Training",
                        "Corporate Wellness",
                        "General Question",
                      ].map((sub) => {
                        const active = formData.subject === sub;
                        return (
                          <button
                            key={sub}
                            type="button"
                            onClick={() => setFormData({ ...formData, subject: sub })}
                            className={`p-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer text-center leading-tight ${
                              active
                                ? "bg-active text-btn-text border-active shadow-sm ring-2 ring-active/20"
                                : "bg-brand-500/5 dark:bg-background/60 text-foreground border-brand-500/15 hover:border-active/40"
                            }`}
                          >
                            {sub}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Name & Email Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-foreground uppercase tracking-wider mb-2">
                        Full Name <span className="text-active">*</span>
                      </label>
                      <div className="relative">
                        <FiUser className="absolute left-4 top-3.5 text-brand-500" />
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Alex Morgan"
                          className="w-full pl-11 pr-4 py-3 rounded-xl bg-brand-500/5 dark:bg-background border border-brand-500/20 focus:border-active focus:ring-2 focus:ring-active/20 text-sm text-foreground placeholder-[#535C91]/50 outline-none transition-all"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-foreground uppercase tracking-wider mb-2">
                        Email Address <span className="text-active">*</span>
                      </label>
                      <div className="relative">
                        <FiMail className="absolute left-4 top-3.5 text-brand-500" />
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="alex@example.com"
                          className="w-full pl-11 pr-4 py-3 rounded-xl bg-brand-500/5 dark:bg-background border border-brand-500/20 focus:border-active focus:ring-2 focus:ring-active/20 text-sm text-foreground placeholder-[#535C91]/50 outline-none transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Phone & Primary Fitness Goal */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-foreground uppercase tracking-wider mb-2">
                        Phone Number
                      </label>
                      <div className="relative">
                        <FiPhone className="absolute left-4 top-3.5 text-brand-500" />
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+880 1700-000000"
                          className="w-full pl-11 pr-4 py-3 rounded-xl bg-brand-500/5 dark:bg-background border border-brand-500/20 focus:border-active focus:ring-2 focus:ring-active/20 text-sm text-foreground placeholder-[#535C91]/50 outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-foreground uppercase tracking-wider mb-2">
                        Primary Training Focus
                      </label>
                      <select
                        value={formData.goal}
                        onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-brand-500/5 dark:bg-background border border-brand-500/20 focus:border-active focus:ring-2 focus:ring-active/20 text-sm text-foreground outline-none transition-all cursor-pointer"
                      >
                        {goalOptions.map((g) => (
                          <option key={g.label} value={g.label}>
                            {g.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message Field */}
                  <div>
                    <label className="block text-xs font-bold text-foreground uppercase tracking-wider mb-2">
                      Your Message / Specific Questions <span className="text-active">*</span>
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about your fitness schedule, any past injuries, or specific membership tier questions..."
                      className="w-full p-4 rounded-xl bg-brand-500/5 dark:bg-background border border-brand-500/20 focus:border-active focus:ring-2 focus:ring-active/20 text-sm text-foreground placeholder-[#535C91]/50 outline-none transition-all resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 bg-btn-bg text-btn-text font-black text-xs uppercase tracking-wider rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {submitting ? (
                      <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <FiSend className="w-4 h-4" />
                        <span>Submit Priority Inquiry</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-4 text-xs text-[#535C91] dark:text-[#9290C3] pt-2">
                    <span className="flex items-center gap-1">
                      <FaShieldAlt className="w-3.5 h-3.5 text-active" /> 100% Privacy Protected
                    </span>
                    <span>•</span>
                    <span>No Obligation or Spam</span>
                  </div>

                  {/* Concierge Response Guarantee Strip */}
                  <div className="mt-8 pt-6 border-t border-brand-500/10 grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
                    <div className="p-3 rounded-2xl bg-brand-500/5 dark:bg-background/40 border border-brand-500/10">
                      <FiClock className="w-4 h-4 text-active mx-auto mb-1.5" />
                      <h4 className="font-bold text-foreground text-xs">&lt; 2.4 Hr Reply</h4>
                      <p className="text-[10px] text-[#535C91] dark:text-[#9290C3] mt-0.5">Direct coordinator follow-up</p>
                    </div>
                    <div className="p-3 rounded-2xl bg-brand-500/5 dark:bg-background/40 border border-brand-500/10">
                      <FaShieldAlt className="w-4 h-4 text-emerald-500 mx-auto mb-1.5" />
                      <h4 className="font-bold text-foreground text-xs">100% Confidential</h4>
                      <p className="text-[10px] text-[#535C91] dark:text-[#9290C3] mt-0.5">Encrypted &amp; zero spam</p>
                    </div>
                    <div className="p-3 rounded-2xl bg-brand-500/5 dark:bg-background/40 border border-brand-500/10">
                      <FaUserGraduate className="w-4 h-4 text-active mx-auto mb-1.5" />
                      <h4 className="font-bold text-foreground text-xs">Certified Staff</h4>
                      <p className="text-[10px] text-[#535C91] dark:text-[#9290C3] mt-0.5">NASM &amp; CSCS coaches</p>
                    </div>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* 3. Dedicated Concierge & Admissions Coordinators Showcase (Full-Width) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20" id="concierge-team">
        <AnimatedSectionTitle
          kicker="Personal Concierge Care"
          title="Meet Your Dedicated Admissions & Coaching Team"
          highlightText="Admissions & Coaching Team"
          subtitle="Real certified coaches and wellness coordinators ready to guide your membership, arrange VIP facility walkthroughs, or structure corporate team packages."
          align="center"
          className="mb-12"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CONCIERGE_TEAM.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="group p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#070F2B] border border-brand-500/20 hover:border-active/50 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Header with Avatar and Online Status */}
                <div className="flex items-start justify-between mb-5">
                  <div className="relative">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={64}
                      height={64}
                      className="w-16 h-16 rounded-2xl object-cover border-2 border-active/40 group-hover:scale-105 transition-transform"
                    />
                    <span className="absolute -bottom-1 -right-1 p-1 bg-white dark:bg-slate-900 rounded-full shadow-sm">
                      <span className="block w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-active/10 text-active text-[10px] font-black uppercase tracking-wider border border-active/20">
                    {member.badge}
                  </span>
                </div>

                <h3 className="font-['Outfit'] font-black text-foreground text-lg sm:text-xl group-hover:text-active transition-colors">
                  {member.name}
                </h3>
                <p className="font-['Inter'] text-xs text-active font-semibold mt-0.5 mb-3">
                  {member.role}
                </p>
                <p className="font-['Inter'] text-xs text-[#535C91] dark:text-[#9290C3] leading-relaxed mb-6">
                  {member.bio}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-brand-500/10 flex items-center justify-between gap-2">
                <a
                  href={`mailto:${member.email}`}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-btn-bg text-btn-text text-xs font-bold uppercase tracking-wider text-center hover:opacity-90 transition-all flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <FiMail className="w-3.5 h-3.5" />
                  <span>Email {member.name.split(" ")[0]}</span>
                </a>
                <a
                  href="tel:+8801712345678"
                  className="p-2.5 rounded-xl border border-brand-500/20 text-foreground hover:text-active hover:border-active/40 transition-colors"
                  title="Direct Phone Call"
                >
                  <FiPhone className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. Interactive Flagship Facility Map Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20" id="flagship-map">
        <div className="relative rounded-3xl overflow-hidden border border-brand-500/20 shadow-2xl bg-[#070F2B]">
          {/* Map Embed Container */}
          <div className="relative w-full h-[400px] sm:h-[460px] bg-slate-900">
            <iframe
              title="FlexPulse Flagship Athletic Club Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.848039234125!2d90.399452!3d23.752766!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8bd55555555%3A0x123456789abcdef!2sDhaka%2C%20Bangladesh!5e0!3m2!1sen!2sbd!4v1690000000000!5m2!1sen!2sbd"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "contrast(1.05) saturate(1.1)" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full opacity-90 hover:opacity-100 transition-opacity"
            />
          </div>

          {/* Floating Facility Details Badge */}
          <div className="absolute top-6 left-6 right-6 sm:right-auto sm:max-w-md p-6 rounded-2xl bg-white/95 dark:bg-[#070F2B]/95 border border-brand-500/25 shadow-2xl backdrop-blur-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-active text-btn-text text-[10px] font-black uppercase tracking-wider mb-2">
              <FiNavigation className="w-3 h-3" /> Flagship Campus
            </div>
            <h3 className="font-['Outfit'] text-xl font-bold text-foreground">
              FlexPulse Athletic Hub
            </h3>
            <p className="font-['Inter'] text-xs text-[#535C91] dark:text-[#9290C3] mt-1 leading-relaxed">
              35,000 sq ft Olympic facility featuring Eleiko platforms, Recovery Sauna, and complimentary valet parking.
            </p>
            <div className="mt-4 pt-3 border-t border-brand-500/10 flex flex-wrap items-center gap-3">
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-btn-bg text-btn-text text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-all shadow-sm"
              >
                <FaDirections className="w-3.5 h-3.5" />
                <span>Open in Google Maps</span>
              </a>
              <a
                href="tel:+8801712345678"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-brand-500/20 text-foreground text-xs font-semibold hover:border-active/40 transition-all"
              >
                <FaPhoneAlt className="w-3 h-3 text-active" />
                <span>Call Desk</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Frequently Asked Questions (FAQ) Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-24" id="faqs-section">
        <AnimatedSectionTitle
          kicker="Got Questions?"
          title="Frequently Asked Questions"
          highlightText="Asked Questions"
          subtitle="Clear answers about memberships, trial passes, club access, and personal training."
          align="center"
          className="mb-8"
        />

        {/* FAQ Category Pills with Layout Animation */}
        <LayoutGroup id="contactFaqPillsGroup">
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {["All", "Memberships & Passes", "Facilities & Hours", "Coaching & Assessments"].map((cat) => {
              const isActive = faqCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setFaqCategory(cat)}
                  className={`relative px-4 py-2 rounded-full text-xs font-['Inter'] font-bold transition-colors cursor-pointer ${
                    isActive
                      ? "text-btn-text"
                      : "bg-white/60 dark:bg-[#1B1A55]/30 text-foreground border border-brand-500/20 hover:border-active/40"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeContactFaqPill"
                      className="absolute inset-0 rounded-full bg-active shadow-md"
                      transition={{ type: "spring", stiffness: 450, damping: 35 }}
                    />
                  )}
                  <span className="relative z-10">{cat}</span>
                </button>
              );
            })}
          </div>
        </LayoutGroup>

        {/* FAQ Accordion */}
        <div className="space-y-3 font-['Inter']">
          {filteredFaqs.map((faq, index) => {
            const isOpen = activeFaq === index;
            return (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="rounded-2xl border border-brand-500/20 bg-white dark:bg-[#070F2B] overflow-hidden transition-all shadow-sm"
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? -1 : index)}
                  className="w-full px-6 py-4.5 flex items-center justify-between text-left font-bold text-foreground hover:text-active transition-colors cursor-pointer"
                >
                  <span className="text-sm sm:text-base pr-4 leading-snug">{faq.q}</span>
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
                      <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-[#535C91] dark:text-[#9290C3] leading-relaxed border-t border-brand-500/10">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Still Have Questions CTA */}
        <div className="mt-10 p-6 rounded-2xl bg-gradient-to-r from-brand-500/10 to-active/10 border border-brand-500/20 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="font-['Outfit'] font-bold text-foreground text-sm sm:text-base">
              Need personalized training advice?
            </h4>
            <p className="font-['Inter'] text-xs text-[#535C91] dark:text-[#9290C3]">
              Speak directly with an athletic concierge on WhatsApp or phone.
            </p>
          </div>
          <a
            href="https://wa.me/8801712345678"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md shrink-0"
          >
            <FaWhatsapp className="w-4 h-4" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </section>

      {/* 5. Luxury VIP 1-Day Trial Pass Modal */}
      {isPassModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-[#070F2B] border-2 border-active/40 rounded-3xl max-w-md w-full p-6 sm:p-8 relative shadow-2xl text-white"
          >
            <button
              onClick={() => setIsPassModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
            >
              ✕
            </button>

            {passSuccess ? (
              <div className="text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-active/20 text-active flex items-center justify-center mx-auto shadow-inner">
                  <FiCheckCircle className="w-9 h-9" />
                </div>
                <h3 className="text-2xl font-black font-['Outfit'] text-white">
                  VIP Day Pass Activated!
                </h3>
                <p className="text-xs text-gray-300 font-['Inter'] leading-relaxed">
                  Present this digital pass code or scan at our front desk reception to enjoy 1-Day full athletic access:
                </p>

                {/* Digital Ticket Voucher Box */}
                <div className="p-5 rounded-2xl bg-black/70 border border-active/50 font-mono text-2xl font-black text-active tracking-widest select-all relative group">
                  <span>{passSuccess}</span>
                  <button
                    onClick={handleCopyPass}
                    className="absolute right-3 top-3.5 p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs transition-colors cursor-pointer"
                    title="Copy Code"
                  >
                    {copiedPass ? <FaCheck className="w-3.5 h-3.5 text-emerald-400" /> : <FaCopy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-left space-y-1 text-[11px] text-gray-300 font-['Inter']">
                  <div className="flex justify-between">
                    <span>Valid For:</span>
                    <strong className="text-white">7 Days from Activation</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Included:</span>
                    <strong className="text-active">Full Gym, Sauna &amp; 1 Class</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Facility:</span>
                    <strong className="text-white">FlexPulse Flagship Campus</strong>
                  </div>
                </div>

                <button
                  onClick={() => setIsPassModalOpen(false)}
                  className="w-full py-3.5 bg-btn-bg text-btn-text font-black text-xs uppercase tracking-wider rounded-xl shadow-md hover:opacity-95 transition-all cursor-pointer"
                >
                  Done &amp; Save Pass
                </button>
              </div>
            ) : (
              <form onSubmit={handleClaimPass} className="space-y-4 font-['Inter']">
                <div className="text-center space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-active/20 text-active text-xs font-black uppercase tracking-wider mb-1">
                    <FiZap className="w-3.5 h-3.5" /> 100% Complimentary
                  </div>
                  <h3 className="text-2xl font-black font-['Outfit'] text-white">
                    Claim VIP Trial Pass
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Experience Olympic-grade fitness for an entire day at FlexPulse. No credit card required.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={passData.name}
                    onChange={(e) => setPassData({ ...passData, name: e.target.value })}
                    placeholder="e.g. Alex Morgan"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white text-sm focus:border-active outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={passData.email}
                    onChange={(e) => setPassData({ ...passData, email: e.target.value })}
                    placeholder="alex@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white text-sm focus:border-active outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={passData.phone}
                    onChange={(e) => setPassData({ ...passData, phone: e.target.value })}
                    placeholder="+880 1700-000000"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white text-sm focus:border-active outline-none transition-all"
                  />
                </div>

                <button
                  type="submit"
                  disabled={passLoading}
                  className="w-full py-3.5 bg-btn-bg text-btn-text font-black text-xs uppercase tracking-wider rounded-xl shadow-lg hover:opacity-95 transition-all cursor-pointer disabled:opacity-50 mt-2"
                >
                  {passLoading ? "Generating VIP Pass..." : "Activate My Free Pass"}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
}
