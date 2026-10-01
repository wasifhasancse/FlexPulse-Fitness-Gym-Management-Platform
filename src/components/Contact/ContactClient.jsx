"use client";

import { submitContact, submitTrialPass } from "@/lib/api/getClasses";
import { AnimatePresence, motion, LayoutGroup, useInView } from "framer-motion";
import AnimatedSectionTitle from "@/components/common/AnimatedSectionTitle";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
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

const TRANSITION_EASE = [0.16, 1, 0.3, 1];

const FAQS = [
  {
    category: "Memberships & Passes",
    q: "Can I try out FlexPulse before signing up for a monthly or annual membership?",
    a: "Absolutely! We offer a completely free VIP 1-Day Pass that grants full access to our weight room, cardio deck, locker rooms, Olympic lifting platforms, and any standard group fitness class on the schedule.",
  },
  {
    category: "Facilities & Hours",
    q: "What are your operating hours on weekends and public holidays?",
    a: "Our clubs are open Monday through Friday from 6:00 AM to 10:00 PM, and Saturday through Sunday from 8:00 AM to 8:00 PM. On official holidays, we maintain weekend hours unless notified via our mobile member portal.",
  },
  {
    category: "Coaching & Assessments",
    q: "Are personal trainers included with standard gym membership tiers?",
    a: "All members receive a complimentary 60-minute InBody 570 biometric assessment and a customized onboarding workout plan. Pro and Elite tier members receive dedicated 1-on-1 private training sessions every month with certified coaches.",
  },
  {
    category: "Memberships & Passes",
    q: "Can I freeze or pause my membership while traveling?",
    a: "Yes, you can pause your membership for up to 90 consecutive days directly from your Member Dashboard or by notifying our support desk 7 days prior to departure at no extra penalty.",
  },
  {
    category: "Facilities & Hours",
    q: "What should I bring for my first training session?",
    a: "Bring clean athletic training footwear, workout attire, and a personal water bottle. We provide fresh chilled towels, biometric locker storage, sauna access, and organic shower essentials.",
  },
  {
    category: "Coaching & Assessments",
    q: "Do you offer corporate or group wellness wellness packages?",
    a: "Yes! We partner with leading corporations and athletic teams, offering subsidized employee memberships, dedicated corporate group classes, and executive wellness workshops.",
  },
];

const CONCIERGE_TEAM = [
  {
    name: "Sarah Jenkins",
    role: "Head of Member Experience",
    email: "sarah.j@flexpulse.com",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
    badge: "VIP Onboarding Lead",
    bio: "Guides prospective members through personalized tier selections, private facility walkthroughs, and custom schedule setups.",
  },
  {
    name: "David Chen",
    role: "Corporate Partnerships Director",
    email: "david.c@flexpulse.com",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    badge: "Corporate & Teams",
    bio: "Structures subsidized corporate wellness accounts, sports team athletic blocks, and executive health partnerships.",
  },
  {
    name: "Coach Alana Serrano",
    role: "Director of Fitness Assessments",
    email: "alana@flexpulse.com",
    image: "https://t4.ftcdn.net/jpg/11/66/06/77/360_F_1166067709_2SooAuPWXp20XkGev7oOT7nuK1VThCsN.jpg",
    badge: "Master Coach • NASM",
    bio: "Conducts InBody 570 clinical scans, functional movement screens, and pairs athletes with certified 1-on-1 personal trainers.",
  },
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

  // VIP Pass Modal States
  const [isPassModalOpen, setIsPassModalOpen] = useState(false);
  const [passData, setPassData] = useState({ name: "", email: "", phone: "" });
  const [passLoading, setPassLoading] = useState(false);
  const [passSuccess, setPassSuccess] = useState(null);
  const [copiedPass, setCopiedPass] = useState(false);

  // Section Refs & Staged Viewport Trigger States
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true, amount: 0.15 });

  const formSectionRef = useRef(null);
  const isFormInView = useInView(formSectionRef, { once: true, amount: 0.08 });
  const [formTriggered, setFormTriggered] = useState(false);
  useEffect(() => {
    if (isFormInView && !formTriggered) {
      const timer = setTimeout(() => setFormTriggered(true), 300);
      return () => clearTimeout(timer);
    }
  }, [isFormInView, formTriggered]);

  const conciergeRef = useRef(null);
  const isConciergeInView = useInView(conciergeRef, { once: true, amount: 0.12 });
  const [conciergeTriggered, setConciergeTriggered] = useState(false);
  useEffect(() => {
    if (isConciergeInView && !conciergeTriggered) {
      const timer = setTimeout(() => setConciergeTriggered(true), 350);
      return () => clearTimeout(timer);
    }
  }, [isConciergeInView, conciergeTriggered]);

  const mapRef = useRef(null);
  const isMapInView = useInView(mapRef, { once: true, amount: 0.12 });
  const [mapTriggered, setMapTriggered] = useState(false);
  useEffect(() => {
    if (isMapInView && !mapTriggered) {
      const timer = setTimeout(() => setMapTriggered(true), 300);
      return () => clearTimeout(timer);
    }
  }, [isMapInView, mapTriggered]);

  const faqRef = useRef(null);
  const isFaqInView = useInView(faqRef, { once: true, amount: 0.1 });
  const [faqTriggered, setFaqTriggered] = useState(false);
  useEffect(() => {
    if (isFaqInView && !faqTriggered) {
      const timer = setTimeout(() => setFaqTriggered(true), 300);
      return () => clearTimeout(timer);
    }
  }, [isFaqInView, faqTriggered]);

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
    <div className="min-h-screen bg-background text-foreground pb-24 transition-colors duration-300 relative overflow-hidden">
      {/* ── 1. High-Impact Athletic Hero Header (Universal 11/12 Width) ── */}
      <section
        ref={heroRef}
        className="relative pt-14 pb-18 sm:pt-16 sm:pb-20 overflow-hidden bg-gradient-to-b from-brand-500/5 via-background to-background border-b border-brand-500/15 transition-colors duration-300"
      >
        {/* Ambient Atmospheric Lighting Mesh */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-64 bg-gradient-to-b from-active/8 via-brand-500/5 to-transparent blur-3xl pointer-events-none -z-10" />
        <div className="absolute -top-10 right-1/4 w-72 h-72 bg-active/6 rounded-full blur-[100px] pointer-events-none -z-10" />
        <div className="absolute -bottom-10 left-1/4 w-72 h-72 bg-brand-500/6 rounded-full blur-[100px] pointer-events-none -z-10" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

        {/* Universal 11/12 Container Width */}
        <div className="w-11/12 mx-auto text-center relative z-10">
          <AnimatedSectionTitle
            badge="Concierge Desk: Open"
            badgeDetail="Average Reply Time < 2.4 Hours"
            title="Connect With"
            highlightText="FlexPulse Athletic HQ"
            subtitle="Whether you're scheduling a private facility walkthrough, requesting a trainer assessment, or claiming your 1-Day VIP Pass — our team is dedicated to supporting your fitness journey."
            align="center"
            className="mb-8"
          />

          {/* Quick Jump Action Pills with Staggered Multi-Vector Entrance */}
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-['Inter'] font-semibold">
            {/* Pill 1: Send Priority Message (Slide from Left) */}
            <motion.a
              href="#contact-form"
              initial={{ opacity: 0, x: -24, scale: 0.9 }}
              animate={isHeroInView ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: -24, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 220, damping: 20, delay: 0.28 }}
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-btn-bg text-btn-text font-extrabold shadow-sm hover:shadow-md border border-white/20 active:scale-95 transition-all duration-300"
            >
              <motion.span
                initial={{ rotate: -20 }}
                animate={isHeroInView ? { rotate: 0 } : { rotate: -20 }}
                transition={{ type: "spring", delay: 0.35 }}
              >
                <FiSend className="w-3.5 h-3.5" />
              </motion.span>
              <span>Send Priority Message</span>
            </motion.a>

            {/* Pill 2: Claim VIP Pass (Drop from Top) */}
            <motion.button
              onClick={() => {
                setPassSuccess(null);
                setIsPassModalOpen(true);
              }}
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={isHeroInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: -20, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 220, damping: 20, delay: 0.34 }}
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-active/10 hover:bg-active/20 border border-active/40 text-active font-extrabold transition-all duration-300 cursor-pointer shadow-2xs hover:shadow-xs active:scale-95"
            >
              <motion.span
                initial={{ scale: 0.6 }}
                animate={isHeroInView ? { scale: 1 } : { scale: 0.6 }}
                transition={{ type: "spring", delay: 0.4 }}
              >
                <FaTicketAlt className="w-3.5 h-3.5" />
              </motion.span>
              <span>Claim Free VIP Pass</span>
            </motion.button>

            {/* Pill 3: Flagship Location (Rise from Bottom) */}
            <motion.a
              href="#flagship-map"
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={isHeroInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 220, damping: 20, delay: 0.4 }}
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-searchbox-bg hover:bg-searchbox-hover text-foreground font-bold border border-brand-500/25 hover:border-active/60 transition-all duration-300 shadow-xs hover:shadow-md active:scale-95"
            >
              <motion.span
                initial={{ y: 4 }}
                animate={isHeroInView ? { y: 0 } : { y: 4 }}
                transition={{ type: "spring", delay: 0.46 }}
              >
                <FiMapPin className="w-3.5 h-3.5 text-active" />
              </motion.span>
              <span>Flagship Location &amp; Map</span>
            </motion.a>

            {/* Pill 4: Membership FAQs (Slide from Right) */}
            <motion.a
              href="#faqs-section"
              initial={{ opacity: 0, x: 24, scale: 0.9 }}
              animate={isHeroInView ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: 24, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 220, damping: 20, delay: 0.46 }}
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-searchbox-bg hover:bg-searchbox-hover text-foreground font-bold border border-brand-500/25 hover:border-active/60 transition-all duration-300 shadow-xs hover:shadow-md active:scale-95"
            >
              <motion.span
                initial={{ rotate: 15 }}
                animate={isHeroInView ? { rotate: 0 } : { rotate: 15 }}
                transition={{ type: "spring", delay: 0.52 }}
              >
                <FiHelpCircle className="w-3.5 h-3.5 text-active" />
              </motion.span>
              <span>Membership FAQs</span>
            </motion.a>
          </div>
        </div>
      </section>

      {/* ── 2. Main Two-Column Grid: Club Info & Form (Universal 11/12 Width) ── */}
      <div
        ref={formSectionRef}
        className="w-11/12 mx-auto relative z-10 mt-12 sm:mt-16"
        id="contact-form"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Info & VIP Ticket Pass (5 cols on lg) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Quick Contact Card */}
            <motion.div
              initial={{ opacity: 0, x: -36 }}
              animate={formTriggered ? { opacity: 1, x: 0 } : { opacity: 0, x: -36 }}
              transition={{ duration: 0.9, ease: TRANSITION_EASE }}
              className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#070F2B] border border-brand-500/20 shadow-sm hover:shadow-md transition-shadow duration-300 space-y-6"
            >
              {/* Card Header with Element-by-Element Entrance */}
              <div className="flex items-center justify-between border-b border-brand-500/10 pb-4">
                <div>
                  <motion.h2
                    initial={{ opacity: 0, y: 16, filter: "blur(3px)" }}
                    animate={formTriggered ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 16, filter: "blur(3px)" }}
                    transition={{ duration: 0.65, delay: 0.15, ease: TRANSITION_EASE }}
                    className="text-xl sm:text-2xl font-black font-['Outfit'] tracking-tight text-foreground"
                  >
                    Club Headquarters
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0, y: -8 }}
                    animate={formTriggered ? { opacity: 1, y: 0 } : { opacity: 0, y: -8 }}
                    transition={{ duration: 0.55, delay: 0.22, ease: TRANSITION_EASE }}
                    className="text-xs text-[#535C91] dark:text-[#9290C3] mt-0.5 font-['Inter']"
                  >
                    Direct access to our admissions &amp; training desks
                  </motion.p>
                </div>
                <motion.span
                  initial={{ scale: 0.6, rotate: -15 }}
                  animate={formTriggered ? { scale: 1, rotate: 0 } : { scale: 0.6, rotate: -15 }}
                  transition={{ type: "spring", stiffness: 220, damping: 18, delay: 0.25 }}
                  className="p-2.5 rounded-2xl bg-active/10 text-active border border-active/25 shadow-2xs"
                >
                  <FiMapPin className="w-5 h-5" />
                </motion.span>
              </div>

              {/* Info Items List with Separate HTML Tag Triggers */}
              <div className="space-y-3.5 font-['Inter'] text-xs sm:text-sm">
                {/* 1. Location Item */}
                <motion.div
                  initial={{ opacity: 0, x: -22 }}
                  animate={formTriggered ? { opacity: 1, x: 0 } : { opacity: 0, x: -22 }}
                  transition={{ duration: 0.65, delay: 0.28, ease: TRANSITION_EASE }}
                  className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-brand-500/5 dark:bg-[#1B1A55]/30 border border-brand-500/15 hover:border-active/40 transition-all shadow-2xs group"
                >
                  <motion.div
                    initial={{ scale: 0.7 }}
                    animate={formTriggered ? { scale: 1 } : { scale: 0.7 }}
                    transition={{ type: "spring", stiffness: 220, delay: 0.32 }}
                    className="p-2.5 rounded-xl bg-active/10 text-active shrink-0 mt-0.5 border border-active/20"
                  >
                    <FiMapPin className="w-4 h-4" />
                  </motion.div>
                  <div className="min-w-0 flex-1">
                    <motion.h4
                      initial={{ opacity: 0, y: -6 }}
                      animate={formTriggered ? { opacity: 1, y: 0 } : { opacity: 0, y: -6 }}
                      transition={{ duration: 0.45, delay: 0.35 }}
                      className="font-bold text-foreground text-xs uppercase tracking-wider font-['Outfit']"
                    >
                      Flagship Athletic Facility
                    </motion.h4>
                    <motion.p
                      initial={{ opacity: 0, x: 10 }}
                      animate={formTriggered ? { opacity: 1, x: 0 } : { opacity: 0, x: 10 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      className="text-xs text-[#535C91] dark:text-[#9290C3] mt-1 leading-snug"
                    >
                      128 Pulse Blvd, Cyber Athletic District, Dhaka 1212
                    </motion.p>
                    <motion.a
                      href="#flagship-map"
                      initial={{ opacity: 0, y: 6 }}
                      animate={formTriggered ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
                      transition={{ duration: 0.45, delay: 0.45 }}
                      className="inline-flex items-center gap-1 text-[11px] text-active font-bold hover:underline mt-1.5 cursor-pointer"
                    >
                      <FaDirections className="w-2.5 h-2.5" />
                      <span>View GPS Directions</span>
                    </motion.a>
                  </div>
                </motion.div>

                {/* 2. Phone Item */}
                <motion.div
                  initial={{ opacity: 0, x: -22 }}
                  animate={formTriggered ? { opacity: 1, x: 0 } : { opacity: 0, x: -22 }}
                  transition={{ duration: 0.65, delay: 0.36, ease: TRANSITION_EASE }}
                  className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-brand-500/5 dark:bg-[#1B1A55]/30 border border-brand-500/15 hover:border-active/40 transition-all shadow-2xs group"
                >
                  <motion.div
                    initial={{ scale: 0.7 }}
                    animate={formTriggered ? { scale: 1 } : { scale: 0.7 }}
                    transition={{ type: "spring", stiffness: 220, delay: 0.4 }}
                    className="p-2.5 rounded-xl bg-active/10 text-active shrink-0 mt-0.5 border border-active/20"
                  >
                    <FiPhone className="w-4 h-4" />
                  </motion.div>
                  <div className="min-w-0 flex-1">
                    <motion.h4
                      initial={{ opacity: 0, y: -6 }}
                      animate={formTriggered ? { opacity: 1, y: 0 } : { opacity: 0, y: -6 }}
                      transition={{ duration: 0.45, delay: 0.42 }}
                      className="font-bold text-foreground text-xs uppercase tracking-wider font-['Outfit']"
                    >
                      Direct Telephone Lines
                    </motion.h4>
                    <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-[#535C91] dark:text-[#9290C3]">
                      <motion.span
                        initial={{ opacity: 0, x: -8 }}
                        animate={formTriggered ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
                        transition={{ duration: 0.45, delay: 0.46 }}
                      >
                        Front Desk:{" "}
                        <a href="tel:+8801712345678" className="font-semibold text-foreground hover:text-active transition-colors">
                          +880 1712-345678
                        </a>
                      </motion.span>
                      <motion.span
                        initial={{ opacity: 0, x: 8 }}
                        animate={formTriggered ? { opacity: 1, x: 0 } : { opacity: 0, x: 8 }}
                        transition={{ duration: 0.45, delay: 0.5 }}
                      >
                        VIP Admissions:{" "}
                        <a href="tel:+8801819876543" className="font-semibold text-foreground hover:text-active transition-colors">
                          +880 1819-876543
                        </a>
                      </motion.span>
                    </div>
                  </div>
                </motion.div>

                {/* 3. Email Item */}
                <motion.div
                  initial={{ opacity: 0, x: -22 }}
                  animate={formTriggered ? { opacity: 1, x: 0 } : { opacity: 0, x: -22 }}
                  transition={{ duration: 0.65, delay: 0.44, ease: TRANSITION_EASE }}
                  className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-brand-500/5 dark:bg-[#1B1A55]/30 border border-brand-500/15 hover:border-active/40 transition-all shadow-2xs group"
                >
                  <motion.div
                    initial={{ scale: 0.7 }}
                    animate={formTriggered ? { scale: 1 } : { scale: 0.7 }}
                    transition={{ type: "spring", stiffness: 220, delay: 0.48 }}
                    className="p-2.5 rounded-xl bg-active/10 text-active shrink-0 mt-0.5 border border-active/20"
                  >
                    <FiMail className="w-4 h-4" />
                  </motion.div>
                  <div className="min-w-0 flex-1">
                    <motion.h4
                      initial={{ opacity: 0, y: -6 }}
                      animate={formTriggered ? { opacity: 1, y: 0 } : { opacity: 0, y: -6 }}
                      transition={{ duration: 0.45, delay: 0.5 }}
                      className="font-bold text-foreground text-xs uppercase tracking-wider font-['Outfit']"
                    >
                      Concierge Email
                    </motion.h4>
                    <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-[#535C91] dark:text-[#9290C3]">
                      <motion.a
                        href="mailto:contact@flexpulse.com"
                        initial={{ opacity: 0, x: -8 }}
                        animate={formTriggered ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
                        transition={{ duration: 0.45, delay: 0.54 }}
                        className="hover:text-active font-semibold text-foreground transition-colors"
                      >
                        contact@flexpulse.com
                      </motion.a>
                      <motion.a
                        href="mailto:training@flexpulse.com"
                        initial={{ opacity: 0, x: 8 }}
                        animate={formTriggered ? { opacity: 1, x: 0 } : { opacity: 0, x: 8 }}
                        transition={{ duration: 0.45, delay: 0.58 }}
                        className="hover:text-active font-semibold text-foreground transition-colors"
                      >
                        training@flexpulse.com
                      </motion.a>
                    </div>
                  </div>
                </motion.div>

                {/* 4. Operating Hours Item */}
                <motion.div
                  initial={{ opacity: 0, x: -22 }}
                  animate={formTriggered ? { opacity: 1, x: 0 } : { opacity: 0, x: -22 }}
                  transition={{ duration: 0.65, delay: 0.52, ease: TRANSITION_EASE }}
                  className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-brand-500/5 dark:bg-[#1B1A55]/30 border border-brand-500/15 hover:border-active/40 transition-all shadow-2xs group"
                >
                  <motion.div
                    initial={{ scale: 0.7 }}
                    animate={formTriggered ? { scale: 1 } : { scale: 0.7 }}
                    transition={{ type: "spring", stiffness: 220, delay: 0.56 }}
                    className="p-2.5 rounded-xl bg-active/10 text-active shrink-0 mt-0.5 border border-active/20"
                  >
                    <FiClock className="w-4 h-4" />
                  </motion.div>
                  <div className="min-w-0 flex-1">
                    <motion.h4
                      initial={{ opacity: 0, y: -6 }}
                      animate={formTriggered ? { opacity: 1, y: 0 } : { opacity: 0, y: -6 }}
                      transition={{ duration: 0.45, delay: 0.58 }}
                      className="font-bold text-foreground text-xs uppercase tracking-wider font-['Outfit']"
                    >
                      Operating Schedule
                    </motion.h4>
                    <div className="mt-1 space-y-0.5 text-xs text-[#535C91] dark:text-[#9290C3]">
                      <motion.div
                        initial={{ opacity: 0, x: -6 }}
                        animate={formTriggered ? { opacity: 1, x: 0 } : { opacity: 0, x: -6 }}
                        transition={{ duration: 0.4, delay: 0.62 }}
                        className="flex justify-between"
                      >
                        <span>Monday – Friday:</span>
                        <strong className="text-foreground">6:00 AM – 10:00 PM</strong>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, x: 6 }}
                        animate={formTriggered ? { opacity: 1, x: 0 } : { opacity: 0, x: 6 }}
                        transition={{ duration: 0.4, delay: 0.66 }}
                        className="flex justify-between"
                      >
                        <span>Saturday – Sunday:</span>
                        <strong className="text-foreground">8:00 AM – 8:00 PM</strong>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={formTriggered ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
                        transition={{ duration: 0.4, delay: 0.7 }}
                        className="flex justify-between text-[11px] text-active font-medium pt-0.5"
                      >
                        <span>Sauna &amp; Recovery:</span>
                        <span>7:00 AM – 9:30 PM</span>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Luxury VIP Trial Pass Ticket Voucher */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 26 }}
              animate={formTriggered ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.94, y: 26 }}
              transition={{ duration: 0.85, delay: 0.3, ease: TRANSITION_EASE }}
              className="relative overflow-hidden rounded-3xl p-6 sm:p-7 bg-gradient-to-br from-[#1B1A55] via-[#070F2B] to-[#1B1A55] text-white border-2 border-active/40 shadow-sm hover:shadow-md transition-shadow duration-300 group"
            >
              {/* Decorative Shimmer & Hologram Watermark */}
              <div className="absolute -top-16 -right-16 w-44 h-44 bg-active/20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute top-2 right-2 p-3 opacity-15 pointer-events-none">
                <FaQrcode className="w-24 h-24 text-white" />
              </div>

              {/* Top Stub with Distinct Element Triggers */}
              <div className="relative z-10 space-y-3">
                <div className="flex items-center justify-between">
                  <motion.span
                    initial={{ opacity: 0, y: -14 }}
                    animate={formTriggered ? { opacity: 1, y: 0 } : { opacity: 0, y: -14 }}
                    transition={{ type: "spring", stiffness: 220, damping: 20, delay: 0.36 }}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-active text-btn-text text-[10px] font-black uppercase tracking-widest shadow-2xs"
                  >
                    <FiZap className="w-3.5 h-3.5" /> 100% Free VIP Pass
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, x: 18 }}
                    animate={formTriggered ? { opacity: 1, x: 0 } : { opacity: 0, x: 18 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="text-[11px] font-mono text-active font-extrabold tracking-widest"
                  >
                    VALUE $45 • NO CC
                  </motion.span>
                </div>

                <div>
                  <motion.h3
                    initial={{ opacity: 0, y: 16, filter: "blur(3px)" }}
                    animate={formTriggered ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 16, filter: "blur(3px)" }}
                    transition={{ duration: 0.65, delay: 0.44, ease: TRANSITION_EASE }}
                    className="text-2xl font-black font-['Outfit'] text-white leading-tight"
                  >
                    1-Day VIP All-Access Pass
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={formTriggered ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
                    transition={{ duration: 0.55, delay: 0.48, ease: TRANSITION_EASE }}
                    className="text-xs text-white/80 font-['Inter'] leading-relaxed mt-1"
                  >
                    Full access to Olympic barbells, Eleiko platforms, Infrared Sauna, and any scheduled class with zero obligation.
                  </motion.p>
                </div>
              </div>

              {/* Perforated Ticket Divider with Notches & ScaleX Sweep */}
              <div className="relative my-4 -mx-6 sm:-mx-7 flex items-center">
                <motion.div
                  initial={{ scale: 0.5 }}
                  animate={formTriggered ? { scale: 1 } : { scale: 0.5 }}
                  transition={{ type: "spring", delay: 0.48 }}
                  className="w-3.5 h-7 bg-background rounded-r-full border-r border-t border-b border-active/40"
                />
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={formTriggered ? { scaleX: 1 } : { scaleX: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="flex-1 border-b-2 border-dashed border-white/20 mx-2 origin-left"
                />
                <motion.div
                  initial={{ scale: 0.5 }}
                  animate={formTriggered ? { scale: 1 } : { scale: 0.5 }}
                  transition={{ type: "spring", delay: 0.48 }}
                  className="w-3.5 h-7 bg-background rounded-l-full border-l border-t border-b border-active/40"
                />
              </div>

              {/* Bottom Stub: Benefits & CTA */}
              <div className="relative z-10 space-y-3">
                <div className="grid grid-cols-2 gap-2 text-[11px] text-white/85 font-['Inter']">
                  {[
                    { label: "Olympic Weight Deck", dirX: -14, dirY: 0 },
                    { label: "Recovery Sauna", dirX: 14, dirY: 0 },
                    { label: "1 Group Class Included", dirX: 0, dirY: 12 },
                    { label: "Valid For 7 Days", dirX: 0, dirY: -12 },
                  ].map((b, idx) => (
                    <motion.div
                      key={b.label}
                      initial={{ opacity: 0, x: b.dirX, y: b.dirY, scale: 0.9 }}
                      animate={formTriggered ? { opacity: 1, x: 0, y: 0, scale: 1 } : { opacity: 0, x: b.dirX, y: b.dirY, scale: 0.9 }}
                      transition={{ duration: 0.5, delay: 0.54 + idx * 0.06 }}
                      className="flex items-center gap-1.5"
                    >
                      <FaCheck className="w-3 h-3 text-emerald-400 shrink-0" />
                      <span>{b.label}</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  initial={{ opacity: 0, y: 16, scale: 0.94 }}
                  animate={formTriggered ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 16, scale: 0.94 }}
                  transition={{ type: "spring", stiffness: 220, damping: 20, delay: 0.7 }}
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setPassSuccess(null);
                    setIsPassModalOpen(true);
                  }}
                  className="relative w-full mt-2 py-3.5 rounded-2xl bg-btn-bg text-btn-text font-extrabold text-xs uppercase tracking-wider shadow-sm hover:shadow-md active:scale-95 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 border border-white/20 overflow-hidden group"
                >
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />
                  <FaTicketAlt className="w-3.5 h-3.5 relative z-10" />
                  <span className="relative z-10">Claim Digital VIP Pass</span>
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Right Column: High-Conversion Interactive Inquiry Form (7 cols on lg) */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, x: 36 }}
              animate={formTriggered ? { opacity: 1, x: 0 } : { opacity: 0, x: 36 }}
              transition={{ duration: 0.9, ease: TRANSITION_EASE }}
              className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-[#070F2B] border border-brand-500/20 shadow-sm hover:shadow-md transition-shadow duration-300 relative"
            >
              {/* Form Title & Reply Badge with Separate Vector Entrances */}
              <div className="flex items-center justify-between mb-2">
                <motion.h2
                  initial={{ opacity: 0, y: 18, filter: "blur(4px)" }}
                  animate={formTriggered ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 18, filter: "blur(4px)" }}
                  transition={{ duration: 0.65, delay: 0.2, ease: TRANSITION_EASE }}
                  className="text-2xl sm:text-3xl font-black font-['Outfit'] tracking-tight text-foreground"
                >
                  Send Priority Inquiry
                </motion.h2>
                <motion.span
                  initial={{ opacity: 0, y: -14, rotate: 6 }}
                  animate={formTriggered ? { opacity: 1, y: 0, rotate: 0 } : { opacity: 0, y: -14, rotate: 6 }}
                  transition={{ type: "spring", stiffness: 220, damping: 20, delay: 0.25 }}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/10 text-active text-xs font-bold uppercase tracking-wider shadow-2xs border border-active/20"
                >
                  <FiClock className="w-3 h-3" /> Same-Day Reply
                </motion.span>
              </div>

              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={formTriggered ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
                transition={{ duration: 0.6, delay: 0.28, ease: TRANSITION_EASE }}
                className="text-xs sm:text-sm text-[#535C91] dark:text-[#9290C3] font-['Inter'] mb-8"
              >
                Fill out the details below. Our admissions desk will assign a personal advisor to answer your specific questions.
              </motion.p>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-8 sm:p-12 rounded-3xl bg-emerald-500/10 border-2 border-emerald-500/30 text-center space-y-4"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto shadow-2xs">
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
                    className="mt-4 px-6 py-3 rounded-2xl bg-btn-bg text-btn-text font-extrabold text-xs uppercase tracking-wider hover:opacity-95 transition-all cursor-pointer shadow-sm active:scale-95 border border-white/20"
                  >
                    Send Another Inquiry
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 font-['Inter']">
                  {/* Inquiry Topic Selector */}
                  <div>
                    <motion.label
                      initial={{ opacity: 0, x: -12 }}
                      animate={formTriggered ? { opacity: 1, x: 0 } : { opacity: 0, x: -12 }}
                      transition={{ duration: 0.5, delay: 0.32 }}
                      className="block text-xs font-bold text-foreground uppercase tracking-wider mb-2"
                    >
                      Inquiry Subject / Topic <span className="text-active">*</span>
                    </motion.label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { title: "Membership Inquiry", vec: { x: -16, y: 0 } },
                        { title: "Personal Training", vec: { x: 0, y: -12 } },
                        { title: "Corporate Wellness", vec: { x: 0, y: 12 } },
                        { title: "General Question", vec: { x: 16, y: 0 } },
                      ].map((item, idx) => {
                        const active = formData.subject === item.title;
                        return (
                          <motion.button
                            key={item.title}
                            type="button"
                            initial={{ opacity: 0, x: item.vec.x, y: item.vec.y, scale: 0.92 }}
                            animate={formTriggered ? { opacity: 1, x: 0, y: 0, scale: 1 } : { opacity: 0, x: item.vec.x, y: item.vec.y, scale: 0.92 }}
                            transition={{ duration: 0.45, delay: 0.35 + idx * 0.05 }}
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.96 }}
                            onClick={() => setFormData({ ...formData, subject: item.title })}
                            className={`p-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer text-center leading-tight shadow-2xs ${
                              active
                                ? "bg-active text-btn-text border-active shadow-xs ring-2 ring-active/20"
                                : "bg-brand-500/5 dark:bg-[#1B1A55]/30 text-foreground border-brand-500/15 hover:border-active/40"
                            }`}
                          >
                            {item.title}
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Name & Email Fields with Opposing Lateral Glides */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={formTriggered ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ duration: 0.65, delay: 0.42 }}
                    >
                      <motion.label
                        initial={{ opacity: 0, y: -8 }}
                        animate={formTriggered ? { opacity: 1, y: 0 } : { opacity: 0, y: -8 }}
                        transition={{ duration: 0.4, delay: 0.44 }}
                        className="block text-xs font-bold text-foreground uppercase tracking-wider mb-2"
                      >
                        Full Name <span className="text-active">*</span>
                      </motion.label>
                      <div className="relative">
                        <FiUser className="absolute left-4 top-3.5 text-brand-500" />
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Alex Morgan"
                          className="w-full pl-11 pr-4 py-3 rounded-xl bg-brand-500/5 dark:bg-[#090814]/80 border border-brand-500/20 focus:border-active focus:ring-2 focus:ring-active/20 text-sm text-foreground placeholder-[#535C91]/50 outline-none transition-all shadow-2xs"
                        />
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={formTriggered ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                      transition={{ duration: 0.65, delay: 0.46 }}
                    >
                      <motion.label
                        initial={{ opacity: 0, y: -8 }}
                        animate={formTriggered ? { opacity: 1, y: 0 } : { opacity: 0, y: -8 }}
                        transition={{ duration: 0.4, delay: 0.48 }}
                        className="block text-xs font-bold text-foreground uppercase tracking-wider mb-2"
                      >
                        Email Address <span className="text-active">*</span>
                      </motion.label>
                      <div className="relative">
                        <FiMail className="absolute left-4 top-3.5 text-brand-500" />
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="alex@example.com"
                          className="w-full pl-11 pr-4 py-3 rounded-xl bg-brand-500/5 dark:bg-[#090814]/80 border border-brand-500/20 focus:border-active focus:ring-2 focus:ring-active/20 text-sm text-foreground placeholder-[#535C91]/50 outline-none transition-all shadow-2xs"
                        />
                      </div>
                    </motion.div>
                  </div>

                  {/* Phone & Primary Fitness Goal */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={formTriggered ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ duration: 0.65, delay: 0.5 }}
                    >
                      <motion.label
                        initial={{ opacity: 0, y: -8 }}
                        animate={formTriggered ? { opacity: 1, y: 0 } : { opacity: 0, y: -8 }}
                        transition={{ duration: 0.4, delay: 0.52 }}
                        className="block text-xs font-bold text-foreground uppercase tracking-wider mb-2"
                      >
                        Phone Number
                      </motion.label>
                      <div className="relative">
                        <FiPhone className="absolute left-4 top-3.5 text-brand-500" />
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+880 1700-000000"
                          className="w-full pl-11 pr-4 py-3 rounded-xl bg-brand-500/5 dark:bg-[#090814]/80 border border-brand-500/20 focus:border-active focus:ring-2 focus:ring-active/20 text-sm text-foreground placeholder-[#535C91]/50 outline-none transition-all shadow-2xs"
                        />
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={formTriggered ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                      transition={{ duration: 0.65, delay: 0.54 }}
                    >
                      <motion.label
                        initial={{ opacity: 0, y: -8 }}
                        animate={formTriggered ? { opacity: 1, y: 0 } : { opacity: 0, y: -8 }}
                        transition={{ duration: 0.4, delay: 0.56 }}
                        className="block text-xs font-bold text-foreground uppercase tracking-wider mb-2"
                      >
                        Primary Training Focus
                      </motion.label>
                      <select
                        value={formData.goal}
                        onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-brand-500/5 dark:bg-[#090814]/80 border border-brand-500/20 focus:border-active focus:ring-2 focus:ring-active/20 text-sm text-foreground outline-none transition-all cursor-pointer shadow-2xs"
                      >
                        {goalOptions.map((g) => (
                          <option key={g.label} value={g.label} className="bg-background text-foreground">
                            {g.label}
                          </option>
                        ))}
                      </select>
                    </motion.div>
                  </div>

                  {/* Message Field */}
                  <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    animate={formTriggered ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
                    transition={{ duration: 0.65, delay: 0.6 }}
                  >
                    <motion.label
                      initial={{ opacity: 0, y: -8 }}
                      animate={formTriggered ? { opacity: 1, y: 0 } : { opacity: 0, y: -8 }}
                      transition={{ duration: 0.4, delay: 0.62 }}
                      className="block text-xs font-bold text-foreground uppercase tracking-wider mb-2"
                    >
                      Your Message / Specific Questions <span className="text-active">*</span>
                    </motion.label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about your fitness schedule, any past injuries, or specific membership tier questions..."
                      className="w-full p-4 rounded-xl bg-brand-500/5 dark:bg-[#090814]/80 border border-brand-500/20 focus:border-active focus:ring-2 focus:ring-active/20 text-sm text-foreground placeholder-[#535C91]/50 outline-none transition-all resize-none shadow-2xs"
                    />
                  </motion.div>

                  {/* Submit Button (Type 1 Primary CTA with Kinetic Shimmer) */}
                  <motion.button
                    type="submit"
                    disabled={submitting}
                    initial={{ opacity: 0, y: 16, scale: 0.94 }}
                    animate={formTriggered ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 16, scale: 0.94 }}
                    transition={{ type: "spring", stiffness: 220, damping: 20, delay: 0.66 }}
                    whileHover={{ y: -2, scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative w-full py-4 bg-btn-bg text-btn-text font-extrabold text-xs uppercase tracking-wider rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 border border-white/20 overflow-hidden group active:scale-95"
                  >
                    <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />
                    {submitting ? (
                      <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <FiSend className="w-4 h-4 relative z-10" />
                        <span className="relative z-10">Submit Priority Inquiry</span>
                      </>
                    )}
                  </motion.button>

                  {/* Privacy Protected Strip */}
                  <div className="flex items-center justify-center gap-4 text-xs text-[#535C91] dark:text-[#9290C3] pt-2">
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={formTriggered ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                      transition={{ duration: 0.5, delay: 0.72 }}
                      className="flex items-center gap-1.5"
                    >
                      <FaShieldAlt className="w-3.5 h-3.5 text-active" /> 100% Privacy Protected
                    </motion.span>
                    <motion.span
                      initial={{ opacity: 0, scale: 0 }}
                      animate={formTriggered ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                      transition={{ type: "spring", delay: 0.74 }}
                    >
                      •
                    </motion.span>
                    <motion.span
                      initial={{ opacity: 0, x: 10 }}
                      animate={formTriggered ? { opacity: 1, x: 0 } : { opacity: 0, x: 10 }}
                      transition={{ duration: 0.5, delay: 0.76 }}
                    >
                      No Obligation or Spam
                    </motion.span>
                  </div>

                  {/* Concierge Response Guarantee Strip (3 Cards) */}
                  <div className="mt-8 pt-6 border-t border-brand-500/10 grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
                    <motion.div
                      initial={{ opacity: 0, x: -18, y: 10, scale: 0.92 }}
                      animate={formTriggered ? { opacity: 1, x: 0, y: 0, scale: 1 } : { opacity: 0, x: -18, y: 10, scale: 0.92 }}
                      transition={{ duration: 0.5, delay: 0.8 }}
                      className="p-3.5 rounded-2xl bg-brand-500/5 dark:bg-[#1B1A55]/30 border border-brand-500/15 shadow-2xs hover:border-active/40 transition-colors"
                    >
                      <FiClock className="w-4 h-4 text-active mx-auto mb-1.5" />
                      <h4 className="font-bold text-foreground text-xs">&lt; 2.4 Hr Reply</h4>
                      <p className="text-[10px] text-[#535C91] dark:text-[#9290C3] mt-0.5">Direct coordinator follow-up</p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 18, scale: 0.92 }}
                      animate={formTriggered ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 18, scale: 0.92 }}
                      transition={{ duration: 0.5, delay: 0.85 }}
                      className="p-3.5 rounded-2xl bg-brand-500/5 dark:bg-[#1B1A55]/30 border border-brand-500/15 shadow-2xs hover:border-active/40 transition-colors"
                    >
                      <FaShieldAlt className="w-4 h-4 text-emerald-500 mx-auto mb-1.5" />
                      <h4 className="font-bold text-foreground text-xs">100% Confidential</h4>
                      <p className="text-[10px] text-[#535C91] dark:text-[#9290C3] mt-0.5">Encrypted &amp; zero spam</p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: 18, y: 10, scale: 0.92 }}
                      animate={formTriggered ? { opacity: 1, x: 0, y: 0, scale: 1 } : { opacity: 0, x: 18, y: 10, scale: 0.92 }}
                      transition={{ duration: 0.5, delay: 0.9 }}
                      className="p-3.5 rounded-2xl bg-brand-500/5 dark:bg-[#1B1A55]/30 border border-brand-500/15 shadow-2xs hover:border-active/40 transition-colors"
                    >
                      <FaUserGraduate className="w-4 h-4 text-active mx-auto mb-1.5" />
                      <h4 className="font-bold text-foreground text-xs">Certified Staff</h4>
                      <p className="text-[10px] text-[#535C91] dark:text-[#9290C3] mt-0.5">NASM &amp; CSCS coaches</p>
                    </motion.div>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── 3. Dedicated Concierge & Admissions Coordinators Showcase (Universal 11/12 Width) ── */}
      <section
        ref={conciergeRef}
        className="w-11/12 mx-auto relative z-10 mt-20 sm:mt-28"
        id="concierge-team"
      >
        <AnimatedSectionTitle
          badge="Personal Concierge Care"
          badgeDetail="Admissions & Coaching"
          title="Meet Your Dedicated"
          highlightText="Admissions & Coaching Team"
          subtitle="Real certified coaches and wellness coordinators ready to guide your membership, arrange VIP facility walkthroughs, or structure corporate team packages."
          align="center"
          className="mb-12"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CONCIERGE_TEAM.map((member, i) => {
            const cardVec =
              i === 0
                ? { x: -28, y: 14 }
                : i === 2
                ? { x: 28, y: 14 }
                : { x: 0, y: 26 };

            return (
              <motion.div
                key={member.name}
                initial={{
                  opacity: 0,
                  x: cardVec.x,
                  y: cardVec.y,
                  scale: 0.96,
                }}
                animate={conciergeTriggered ? { opacity: 1, x: 0, y: 0, scale: 1 } : {
                  opacity: 0,
                  x: cardVec.x,
                  y: cardVec.y,
                  scale: 0.96,
                }}
                transition={{ duration: 0.85, delay: 0.15 + i * 0.12, ease: TRANSITION_EASE }}
                whileHover={{ y: -6 }}
                className="group p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#070F2B] border border-brand-500/20 hover:border-active/50 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Header with Avatar and Online Status */}
                  <div className="flex items-start justify-between mb-5">
                    <div className="relative">
                      <motion.div
                        initial={{ scale: 0.7, rotate: -12 }}
                        animate={conciergeTriggered ? { scale: 1, rotate: 0 } : { scale: 0.7, rotate: -12 }}
                        transition={{ type: "spring", stiffness: 220, damping: 18, delay: 0.22 + i * 0.1 }}
                      >
                        <Image
                          src={member.image}
                          alt={member.name}
                          width={64}
                          height={64}
                          className="w-16 h-16 rounded-2xl object-cover border-2 border-active/40 group-hover:scale-105 transition-transform"
                        />
                      </motion.div>
                      <span className="absolute -bottom-1 -right-1 p-1 bg-white dark:bg-[#070F2B] rounded-full shadow-2xs">
                        <span className="block w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                      </span>
                    </div>
                    <motion.span
                      initial={{ opacity: 0, y: -14, scale: 0.85 }}
                      animate={conciergeTriggered ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: -14, scale: 0.85 }}
                      transition={{ duration: 0.5, delay: 0.28 + i * 0.1 }}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-active/10 text-active text-[10px] font-black uppercase tracking-wider border border-active/20 shadow-2xs"
                    >
                      {member.badge}
                    </motion.span>
                  </div>

                  <motion.h3
                    initial={{ opacity: 0, y: 14, filter: "blur(3px)" }}
                    animate={conciergeTriggered ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 14, filter: "blur(3px)" }}
                    transition={{ duration: 0.6, delay: 0.32 + i * 0.1 }}
                    className="font-['Outfit'] font-black text-foreground text-lg sm:text-xl group-hover:text-active transition-colors"
                  >
                    {member.name}
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0, x: -12 }}
                    animate={conciergeTriggered ? { opacity: 1, x: 0 } : { opacity: 0, x: -12 }}
                    transition={{ duration: 0.55, delay: 0.38 + i * 0.1 }}
                    className="font-['Inter'] text-xs text-active font-semibold mt-0.5 mb-3"
                  >
                    {member.role}
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, y: -8 }}
                    animate={conciergeTriggered ? { opacity: 1, y: 0 } : { opacity: 0, y: -8 }}
                    transition={{ duration: 0.55, delay: 0.44 + i * 0.1 }}
                    className="font-['Inter'] text-xs text-[#535C91] dark:text-[#9290C3] leading-relaxed mb-6"
                  >
                    {member.bio}
                  </motion.p>
                </div>

                {/* Action Buttons (Type 1 & Type 2 Button Hierarchy) */}
                <div className="pt-4 border-t border-brand-500/10 flex items-center justify-between gap-2">
                  <motion.a
                    href={`mailto:${member.email}`}
                    initial={{ opacity: 0, x: -12, y: 6 }}
                    animate={conciergeTriggered ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: -12, y: 6 }}
                    transition={{ type: "spring", stiffness: 220, damping: 20, delay: 0.48 + i * 0.1 }}
                    className="flex-1 py-2.5 px-3 rounded-2xl bg-btn-bg text-btn-text text-xs font-extrabold uppercase tracking-wider text-center hover:opacity-95 active:scale-95 transition-all flex items-center justify-center gap-1.5 shadow-2xs border border-white/20"
                  >
                    <FiMail className="w-3.5 h-3.5" />
                    <span>Email {member.name.split(" ")[0]}</span>
                  </motion.a>
                  <motion.a
                    href="tel:+8801712345678"
                    initial={{ opacity: 0, x: 12, y: 6 }}
                    animate={conciergeTriggered ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: 12, y: 6 }}
                    transition={{ type: "spring", stiffness: 220, damping: 20, delay: 0.54 + i * 0.1 }}
                    className="p-2.5 rounded-2xl border border-brand-500/25 bg-searchbox-bg hover:bg-searchbox-hover text-foreground hover:text-active hover:border-active/60 active:scale-95 transition-colors shadow-2xs"
                    title="Direct Phone Call"
                  >
                    <FiPhone className="w-4 h-4" />
                  </motion.a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ── 4. Interactive Flagship Facility Map Section (Universal 11/12 Width) ── */}
      <section
        ref={mapRef}
        className="w-11/12 mx-auto relative z-10 mt-20 sm:mt-28"
        id="flagship-map"
      >
        <motion.div
          initial={{ opacity: 0, y: 36, scale: 0.97 }}
          animate={mapTriggered ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 36, scale: 0.97 }}
          transition={{ duration: 0.95, ease: TRANSITION_EASE }}
          className="relative rounded-3xl overflow-hidden border border-brand-500/20 shadow-md bg-[#070F2B]"
        >
          {/* Map Embed Container */}
          <div className="relative w-full h-[400px] sm:h-[460px] bg-[#070F2B]">
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

          {/* Floating Facility Details Badge with Separate HTML Tag Triggers */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={mapTriggered ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ duration: 0.85, delay: 0.25, ease: TRANSITION_EASE }}
            className="absolute top-6 left-6 right-6 sm:right-auto sm:max-w-md p-6 rounded-2xl bg-white/95 dark:bg-[#070F2B]/95 border border-brand-500/25 shadow-md backdrop-blur-xl"
          >
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={mapTriggered ? { opacity: 1, y: 0 } : { opacity: 0, y: -12 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-active text-btn-text text-[10px] font-black uppercase tracking-wider mb-2 shadow-2xs"
            >
              <FiNavigation className="w-3 h-3" /> Flagship Campus
            </motion.div>
            <motion.h3
              initial={{ opacity: 0, y: 14, filter: "blur(3px)" }}
              animate={mapTriggered ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 14, filter: "blur(3px)" }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="font-['Outfit'] text-xl font-bold text-foreground"
            >
              FlexPulse Athletic Hub
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, x: 10 }}
              animate={mapTriggered ? { opacity: 1, x: 0 } : { opacity: 0, x: 10 }}
              transition={{ duration: 0.55, delay: 0.4 }}
              className="font-['Inter'] text-xs text-[#535C91] dark:text-[#9290C3] mt-1 leading-relaxed"
            >
              35,000 sq ft Olympic facility featuring Eleiko platforms, Recovery Sauna, and complimentary valet parking.
            </motion.p>
            <div className="mt-4 pt-3 border-t border-brand-500/10 flex flex-wrap items-center gap-3">
              <motion.a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 10 }}
                animate={mapTriggered ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.5, delay: 0.45 }}
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                className="relative inline-flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-btn-bg text-btn-text text-xs font-extrabold uppercase tracking-wider hover:opacity-95 active:scale-95 transition-all shadow-xs border border-white/20 overflow-hidden group"
              >
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />
                <FaDirections className="w-3.5 h-3.5 relative z-10" />
                <span className="relative z-10">Open in Google Maps</span>
              </motion.a>
              <motion.a
                href="tel:+8801712345678"
                initial={{ opacity: 0, y: 10 }}
                animate={mapTriggered ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl border border-brand-500/25 bg-searchbox-bg hover:bg-searchbox-hover text-foreground text-xs font-bold hover:border-active/60 active:scale-95 transition-all shadow-2xs"
              >
                <FaPhoneAlt className="w-3 h-3 text-active" />
                <span>Call Desk</span>
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── 5. Frequently Asked Questions (FAQ) Section (Universal 11/12 Width) ── */}
      <section
        ref={faqRef}
        className="w-11/12 mx-auto relative z-10 mt-20 sm:mt-28"
        id="faqs-section"
      >
        <AnimatedSectionTitle
          badge="Got Questions?"
          badgeDetail="Member Support"
          title="Frequently Asked"
          highlightText="Questions"
          subtitle="Clear answers about memberships, trial passes, club access, and personal training."
          align="center"
          className="mb-8"
        />

        {/* FAQ Category Pills with Staggered Entrance & Layout Animation */}
        <LayoutGroup id="contactFaqPillsGroup">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={faqTriggered ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.65, delay: 0.15 }}
            className="flex flex-wrap items-center justify-center gap-2 mb-10"
          >
            {["All", "Memberships & Passes", "Facilities & Hours", "Coaching & Assessments"].map((cat, idx) => {
              const isActive = faqCategory === cat;
              return (
                <motion.button
                  key={cat}
                  initial={{ opacity: 0, y: 10, scale: 0.92 }}
                  animate={faqTriggered ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 10, scale: 0.92 }}
                  transition={{ duration: 0.45, delay: 0.2 + idx * 0.05 }}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setFaqCategory(cat)}
                  className={`relative px-4 py-2 rounded-2xl text-xs font-['Inter'] font-bold transition-colors cursor-pointer shadow-2xs ${
                    isActive
                      ? "text-btn-text"
                      : "bg-searchbox-bg hover:bg-searchbox-hover text-foreground border border-brand-500/20 hover:border-active/40"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeContactFaqPill"
                      className="absolute inset-0 rounded-2xl bg-active shadow-xs"
                      transition={{ type: "spring", stiffness: 450, damping: 35 }}
                    />
                  )}
                  <span className="relative z-10">{cat}</span>
                </motion.button>
              );
            })}
          </motion.div>
        </LayoutGroup>

        {/* Full-Width FAQ Accordion with Staggered Variants */}
        <div className="space-y-3.5 font-['Inter'] w-full">
          {filteredFaqs.map((faq, index) => {
            const isOpen = activeFaq === index;
            const formattedIndex = String(index + 1).padStart(2, "0");

            return (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 18, scale: 0.98 }}
                animate={faqTriggered ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 18, scale: 0.98 }}
                transition={{ duration: 0.55, delay: 0.25 + index * 0.06 }}
                className="w-full rounded-3xl border border-brand-500/20 bg-white dark:bg-[#070F2B] overflow-hidden transition-all shadow-xs hover:border-active/40 group"
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? -1 : index)}
                  className="w-full px-5 sm:px-8 py-5 sm:py-6 flex items-center justify-between text-left font-bold text-foreground hover:text-active transition-colors cursor-pointer gap-4"
                >
                  <div className="flex items-start sm:items-center gap-4 sm:gap-6 min-w-0">
                    <span className="font-['Outfit'] font-black text-sm sm:text-base text-active/80 dark:text-active shrink-0 mt-0.5 sm:mt-0 select-none">
                      {formattedIndex}
                    </span>
                    <div className="min-w-0">
                      <span className="block text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-active font-['Outfit'] mb-0.5">
                        {faq.category}
                      </span>
                      <span className="text-sm sm:text-base lg:text-lg font-extrabold text-foreground group-hover:text-active transition-colors leading-snug">
                        {faq.q}
                      </span>
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-2xl flex items-center justify-center shrink-0 border border-brand-500/20 bg-brand-500/5 dark:bg-[#1B1A55]/30 text-active"
                  >
                    <FiChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
                  </motion.div>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: TRANSITION_EASE }}
                    >
                      <div className="px-5 sm:px-8 pb-6 pt-2 text-xs sm:text-sm text-[#535C91] dark:text-[#9290C3] leading-relaxed border-t border-brand-500/10 pl-11 sm:pl-18">
                        <p className="max-w-4xl">{faq.a}</p>
                        <div className="mt-3.5 flex items-center gap-2 text-[11px] text-emerald-500 font-semibold">
                          <FaCheck className="w-3 h-3 shrink-0" />
                          <span>FlexPulse Verified Athletic Policy</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Full-Width Still Have Questions CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={faqTriggered ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 24, scale: 0.98 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="mt-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-brand-500/10 via-background to-active/10 border border-brand-500/20 text-center flex flex-col sm:flex-row items-center justify-between gap-6 w-full shadow-xs"
        >
          <div className="text-left space-y-1">
            <motion.h4
              initial={{ opacity: 0, x: -16 }}
              animate={faqTriggered ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="font-['Outfit'] font-black text-foreground text-base sm:text-lg"
            >
              Need personalized training advice?
            </motion.h4>
            <motion.p
              initial={{ opacity: 0, y: -6 }}
              animate={faqTriggered ? { opacity: 1, y: 0 } : { opacity: 0, y: -6 }}
              transition={{ duration: 0.5, delay: 0.54 }}
              className="font-['Inter'] text-xs sm:text-sm text-[#535C91] dark:text-[#9290C3]"
            >
              Speak directly with an athletic concierge on WhatsApp or telephone for custom tier consultations.
            </motion.p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <motion.a
              href="https://wa.me/8801712345678"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: 16 }}
              animate={faqTriggered ? { opacity: 1, x: 0 } : { opacity: 0, x: 16 }}
              transition={{ duration: 0.5, delay: 0.56 }}
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-sm active:scale-95 cursor-pointer"
            >
              <FaWhatsapp className="w-4 h-4 animate-pulse" />
              <span>Chat on WhatsApp</span>
            </motion.a>
            <motion.a
              href="tel:+8801712345678"
              initial={{ opacity: 0, x: 16 }}
              animate={faqTriggered ? { opacity: 1, x: 0 } : { opacity: 0, x: 16 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl border border-brand-500/25 bg-searchbox-bg hover:bg-searchbox-hover text-foreground font-bold text-xs uppercase tracking-wider hover:border-active/60 active:scale-95 transition-all shadow-2xs"
            >
              <FaPhoneAlt className="w-3.5 h-3.5 text-active" />
              <span>Call Concierge</span>
            </motion.a>
          </div>
        </motion.div>
      </section>

      {/* ── 6. Luxury VIP 1-Day Trial Pass Modal ── */}
      {isPassModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 dark:bg-[#070F2B]/90 backdrop-blur-md animate-fadeIn">
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 28 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 240, damping: 22 }}
            className="bg-white dark:bg-[#070F2B] border-2 border-active/40 rounded-3xl max-w-md w-full p-6 sm:p-8 relative shadow-md text-foreground"
          >
            <motion.button
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              onClick={() => setIsPassModalOpen(false)}
              className="absolute top-4 right-4 text-[#535C91] dark:text-[#9290C3] hover:text-foreground p-2 rounded-full hover:bg-brand-500/10 transition-colors cursor-pointer"
            >
              ✕
            </motion.button>

            {passSuccess ? (
              <div className="text-center space-y-4">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 240, damping: 18 }}
                  className="w-16 h-16 rounded-full bg-active/20 text-active flex items-center justify-center mx-auto shadow-2xs border border-active/30"
                >
                  <FiCheckCircle className="w-9 h-9" />
                </motion.div>
                <motion.h3
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-2xl font-black font-['Outfit'] text-foreground"
                >
                  VIP Day Pass Activated!
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs text-[#535C91] dark:text-[#9290C3] font-['Inter'] leading-relaxed"
                >
                  Present this digital pass code or scan at our front desk reception to enjoy 1-Day full athletic access:
                </motion.p>

                {/* Digital Ticket Voucher Box */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", delay: 0.1 }}
                  className="p-5 rounded-2xl bg-brand-500/5 dark:bg-[#1B1A55]/40 border border-active/50 font-mono text-2xl font-black text-active tracking-widest select-all relative group shadow-2xs"
                >
                  <span>{passSuccess}</span>
                  <button
                    onClick={handleCopyPass}
                    className="absolute right-3 top-3.5 p-2 rounded-lg bg-brand-500/10 dark:bg-white/10 hover:bg-active/20 text-foreground text-xs transition-colors cursor-pointer"
                    title="Copy Code"
                  >
                    {copiedPass ? <FaCheck className="w-3.5 h-3.5 text-emerald-500" /> : <FaCopy className="w-3.5 h-3.5" />}
                  </button>
                </motion.div>

                <div className="p-3.5 rounded-2xl bg-brand-500/5 dark:bg-[#1B1A55]/20 border border-brand-500/15 text-left space-y-1.5 text-[11px] text-[#535C91] dark:text-[#9290C3] font-['Inter']">
                  <div className="flex justify-between">
                    <span>Valid For:</span>
                    <strong className="text-foreground">7 Days from Activation</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Included:</span>
                    <strong className="text-active">Full Gym, Sauna &amp; 1 Class</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Facility:</span>
                    <strong className="text-foreground">FlexPulse Flagship Campus</strong>
                  </div>
                </div>

                <motion.button
                  whileHover={{ y: -2, scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsPassModalOpen(false)}
                  className="w-full py-3.5 bg-btn-bg text-btn-text font-extrabold text-xs uppercase tracking-wider rounded-2xl shadow-sm hover:shadow-md hover:opacity-95 active:scale-95 transition-all cursor-pointer border border-white/20"
                >
                  Done &amp; Save Pass
                </motion.button>
              </div>
            ) : (
              <form onSubmit={handleClaimPass} className="space-y-4 font-['Inter']">
                <div className="text-center space-y-1">
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-active/20 text-active text-xs font-black uppercase tracking-wider mb-1"
                  >
                    <FiZap className="w-3.5 h-3.5" /> 100% Complimentary
                  </motion.div>
                  <motion.h3
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-2xl font-black font-['Outfit'] text-foreground"
                  >
                    Claim VIP Trial Pass
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs text-[#535C91] dark:text-[#9290C3] leading-relaxed"
                  >
                    Experience Olympic-grade fitness for an entire day at FlexPulse. No credit card required.
                  </motion.p>
                </div>

                <motion.div
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <label className="block text-xs font-bold text-foreground uppercase tracking-wider mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={passData.name}
                    onChange={(e) => setPassData({ ...passData, name: e.target.value })}
                    placeholder="e.g. Alex Morgan"
                    className="w-full px-4 py-3 rounded-xl bg-brand-500/5 dark:bg-[#090814]/80 border border-brand-500/20 text-foreground text-sm focus:border-active outline-none transition-all shadow-2xs"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 }}
                >
                  <label className="block text-xs font-bold text-foreground uppercase tracking-wider mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={passData.email}
                    onChange={(e) => setPassData({ ...passData, email: e.target.value })}
                    placeholder="alex@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-brand-500/5 dark:bg-[#090814]/80 border border-brand-500/20 text-foreground text-sm focus:border-active outline-none transition-all shadow-2xs"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <label className="block text-xs font-bold text-foreground uppercase tracking-wider mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={passData.phone}
                    onChange={(e) => setPassData({ ...passData, phone: e.target.value })}
                    placeholder="+880 1700-000000"
                    className="w-full px-4 py-3 rounded-xl bg-brand-500/5 dark:bg-[#090814]/80 border border-brand-500/20 text-foreground text-sm focus:border-active outline-none transition-all shadow-2xs"
                  />
                </motion.div>

                <motion.button
                  type="submit"
                  disabled={passLoading}
                  initial={{ opacity: 0, y: 14, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ type: "spring", stiffness: 220, damping: 20, delay: 0.25 }}
                  whileHover={{ y: -2, scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3.5 bg-btn-bg text-btn-text font-extrabold text-xs uppercase tracking-wider rounded-2xl shadow-sm hover:shadow-md hover:opacity-95 active:scale-95 transition-all cursor-pointer disabled:opacity-50 mt-2 border border-white/20"
                >
                  {passLoading ? "Generating VIP Pass..." : "Activate My Free Pass"}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
}
