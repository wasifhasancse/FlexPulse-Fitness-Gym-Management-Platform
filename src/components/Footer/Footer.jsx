"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaFacebook,
  FaInstagram,
  FaXTwitter,
  FaYoutube,
  FaDiscord,
  FaStripe,
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex,
  FaCcDiscover,
  FaApplePay,
  FaGooglePay
} from "react-icons/fa6";
import { 
  FiClock, 
  FiMail, 
  FiMapPin, 
  FiPhone, 
  FiCheckCircle, 
  FiSend,
  FiShield,
  FiLock,
  FiArrowRight
} from "react-icons/fi";
import BackToTop from "@/components/common/BackToTop";

// ── Cubic-Bezier Transition Tokens ──────────────────────────────────────────
const TRANSITION_EASE = [0.16, 1, 0.3, 1];

// ── Newsletter Strip Triggered Transition Variants ───────────────────────────
const newsletterBannerVariants = {
  hidden: { opacity: 0, y: 35, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1.2,
      ease: TRANSITION_EASE,
      staggerChildren: 0.1,
      delayChildren: 0.12
    }
  }
};

const newsletterKickerVariants = {
  hidden: { opacity: 0, y: -14, scale: 0.85 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 220, damping: 18 }
  }
};

const newsletterTitleVariants = {
  hidden: { opacity: 0, y: 18, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.1, ease: TRANSITION_EASE }
  }
};

const newsletterDescVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.0, ease: TRANSITION_EASE }
  }
};

const newsletterFormVariants = {
  hidden: { opacity: 0, x: 25, scale: 0.95 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 160, damping: 20 }
  }
};

const newsletterDisclaimerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8, delay: 0.4 }
  }
};

// ── Payment Methods Marquee Ribbon Triggered Transition Variants ─────────────
const paymentRibbonVariants = {
  hidden: { opacity: 0, y: 22, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1.1,
      ease: TRANSITION_EASE,
      staggerChildren: 0.1,
      delayChildren: 0.12
    }
  }
};

const paymentBadgeVariants = {
  hidden: { opacity: 0, x: -18 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 220, damping: 20 }
  }
};

const paymentMarqueeVariants = {
  hidden: { opacity: 0, scale: 0.96, filter: "blur(3px)" },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 1.1, ease: TRANSITION_EASE }
  }
};

// ── Social Icons Triggered Transition Variants ───────────────────────────────
const socialContainerVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: TRANSITION_EASE,
      staggerChildren: 0.08,
      delayChildren: 0.15
    }
  }
};

const socialIconVariants = {
  hidden: { opacity: 0, scale: 0.6, y: 15, rotate: -15 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 18
    }
  }
};

// ── Payment Methods Dataset ───────────────────────────────────────────────────
const PAYMENT_METHODS = [
  { 
    name: "Stripe", 
    shortName: "Stripe",
    icon: FaStripe, 
    color: "text-[#635BFF] dark:text-[#7A73FF]",
    hoverBorder: "group-hover/pay:border-[#635BFF]",
    hoverBg: "group-hover/pay:bg-[#635BFF]/10",
    accentHex: "#635BFF",
    label: "Stripe 256-bit Encrypted" 
  },
  { 
    name: "Visa", 
    shortName: "Visa",
    icon: FaCcVisa, 
    color: "text-[#1A1F71] dark:text-[#5B73E8]",
    hoverBorder: "group-hover/pay:border-[#1A1F71] dark:group-hover/pay:border-[#5B73E8]",
    hoverBg: "group-hover/pay:bg-[#1A1F71]/10 dark:group-hover/pay:bg-[#5B73E8]/10",
    accentHex: "#1A1F71",
    label: "Visa Secure" 
  },
  { 
    name: "Mastercard", 
    shortName: "Mastercard",
    icon: FaCcMastercard, 
    color: "text-[#EB001B] dark:text-[#FF5F00]",
    hoverBorder: "group-hover/pay:border-[#EB001B] dark:group-hover/pay:border-[#FF5F00]",
    hoverBg: "group-hover/pay:bg-[#EB001B]/10",
    accentHex: "#EB001B",
    label: "Mastercard Identity Check" 
  },
  { 
    name: "American Express", 
    shortName: "Amex",
    icon: FaCcAmex, 
    color: "text-[#006FCF] dark:text-[#00A3E0]",
    hoverBorder: "group-hover/pay:border-[#006FCF] dark:group-hover/pay:border-[#00A3E0]",
    hoverBg: "group-hover/pay:bg-[#006FCF]/10",
    accentHex: "#006FCF",
    label: "Amex SafeKey" 
  },
  { 
    name: "Apple Pay", 
    shortName: "Apple Pay",
    icon: FaApplePay, 
    color: "text-slate-900 dark:text-white",
    hoverBorder: "group-hover/pay:border-slate-800 dark:group-hover/pay:border-white",
    hoverBg: "group-hover/pay:bg-slate-900/10 dark:group-hover/pay:bg-white/10",
    accentHex: "#0f172a",
    label: "Apple Pay Touch ID" 
  },
  { 
    name: "Google Pay", 
    shortName: "G-Pay",
    icon: FaGooglePay, 
    color: "text-[#4285F4] dark:text-[#5A95F5]",
    hoverBorder: "group-hover/pay:border-[#4285F4]",
    hoverBg: "group-hover/pay:bg-[#4285F4]/10",
    accentHex: "#4285F4",
    label: "Google Pay GPay" 
  },
  { 
    name: "Discover", 
    shortName: "Discover",
    icon: FaCcDiscover, 
    color: "text-[#FF6000] dark:text-[#FF7A00]",
    hoverBorder: "group-hover/pay:border-[#FF6000]",
    hoverBg: "group-hover/pay:bg-[#FF6000]/10",
    accentHex: "#FF6000",
    label: "Discover Global Network" 
  }
];

export default function Footer() {
  const pathname = usePathname();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  if (pathname && pathname.includes("dashboard")) {
    return null;
  }

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 6000);
    }
  };

  return (
    <footer className="bg-background border-t border-brand-500/15 relative overflow-hidden transition-colors duration-300 font-['Inter']">
      {/* Ambient Lighting Meshes */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-active/4 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-brand-500/5 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="w-11/12 mx-auto pt-16 lg:pt-20 pb-12 relative z-10">
        
        {/* ── VIP Athlete Dispatch / Newsletter Strip (Strict Shadow Rule: shadow-xs hover:shadow-md) ── */}
        <motion.div 
          variants={newsletterBannerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="group relative overflow-hidden mb-14 sm:mb-18 p-7 sm:p-10 rounded-3xl bg-linear-to-br from-white via-slate-50 to-rose-50/20 dark:from-[#121026] dark:via-[#161334] dark:to-[#1c1842] border border-slate-200/90 dark:border-white/10 hover:border-active/40 shadow-xs hover:shadow-md transition-all duration-500 flex flex-col lg:flex-row lg:items-center justify-between gap-8"
        >
          {/* Subtle Top Glowing Line on Hover */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-active/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Ambient Radial Accent Glow */}
          <div className="absolute -right-24 -bottom-24 w-60 h-60 bg-active/5 rounded-full blur-3xl pointer-events-none" />

          {/* Left Text & Kicker */}
          <div className="max-w-xl space-y-2 relative z-10">
            <motion.div 
              variants={newsletterKickerVariants}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-active/15 border border-active/30 text-active text-[11px] font-extrabold uppercase tracking-wider"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-active opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-active"></span>
              </span>
              <span>FlexPulse Athlete Dispatch</span>
            </motion.div>
            <motion.h3 
              variants={newsletterTitleVariants}
              className="text-xl sm:text-2xl lg:text-3xl font-extrabold font-['Outfit'] text-foreground tracking-tight leading-tight"
            >
              Join 18,500+ Dedicated Athletes
            </motion.h3>
            <motion.p 
              variants={newsletterDescVariants}
              className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed"
            >
              Receive early drop notifications for high-demand masterclasses, clinically validated nutrition logs, and invite-only community challenges.
            </motion.p>
          </div>

          {/* Right Subscription Form & Type 1 High-Voltage CTA */}
          <motion.div 
            variants={newsletterFormVariants}
            className="w-full lg:max-w-md relative z-10"
          >
            {subscribed ? (
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 flex items-center gap-3 animate-fadeIn">
                <FiCheckCircle className="w-5 h-5 shrink-0" />
                <div className="text-xs sm:text-sm font-semibold">
                  <p className="font-bold text-foreground font-['Outfit']">Welcome to the Inner Circle!</p>
                  <p className="text-[11px] text-emerald-500">Check your inbox for your complimentary nutrition blueprint.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2.5">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  required
                  className="flex-1 px-4 py-3 bg-white dark:bg-[#0c0a1d] border border-slate-200/90 dark:border-white/10 rounded-xl text-foreground text-xs sm:text-sm placeholder-slate-400 dark:placeholder-slate-500 focus:outline-hidden focus:border-active transition-colors shadow-xs"
                />
                {/* Type 1 Primary High-Voltage Athletic CTA */}
                <button
                  type="submit"
                  className="relative overflow-hidden inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-btn-bg text-btn-text font-extrabold text-xs sm:text-sm shadow-xs hover:shadow-md transform hover:-translate-y-0.5 hover:brightness-105 active:scale-95 transition-all duration-300 ease-out border border-white/20 cursor-pointer whitespace-nowrap group/btn"
                >
                  {/* Kinetic Light-Beam Shimmer Sweep */}
                  <span className="absolute inset-0 w-1/2 h-full bg-linear-to-r from-transparent via-white/20 to-transparent skew-x-12 -translate-x-full group-hover/btn:translate-x-[250%] transition-transform duration-700 ease-out pointer-events-none" />
                  <span>Subscribe</span>
                  <FiSend className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                </button>
              </form>
            )}
            <motion.p 
              variants={newsletterDisclaimerVariants}
              className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 font-medium"
            >
              Zero spam. Unsubscribe anytime with 1-click.
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Main Footer Navigation Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-8 sm:pb-10 border-b border-brand-500/15">
          
          {/* Brand & Manifesto Column (Span 4 on lg) */}
          <div className="sm:col-span-2 lg:col-span-4 space-y-6">
            <Link href="/" className="flex items-center gap-3 group w-fit">
              <div className="relative w-11 h-11 rounded-2xl bg-linear-to-br from-[#1B1A55] to-[#070F2B] p-0.5 shadow-xs hover:shadow-md border border-active/40 flex items-center justify-center group-hover:scale-105 transition-transform duration-300 overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-tr from-active/30 via-transparent to-active/10 opacity-70" />
                <svg
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-7 h-7 relative z-10"
                >
                  <defs>
                    <linearGradient id="fpFooterLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#ff2a55" />
                      <stop offset="100%" stopColor="#ff0336" />
                    </linearGradient>
                  </defs>
                  <rect x="3" y="10" width="3" height="12" rx="1.5" fill="url(#fpFooterLogoGrad)" />
                  <rect x="7" y="12" width="2.5" height="8" rx="1.2" fill="url(#fpFooterLogoGrad)" opacity="0.85" />
                  <rect x="26" y="10" width="3" height="12" rx="1.5" fill="url(#fpFooterLogoGrad)" />
                  <rect x="22.5" y="12" width="2.5" height="8" rx="1.2" fill="url(#fpFooterLogoGrad)" opacity="0.85" />
                  <path
                    d="M9.5 16H12.5L14.5 10.5L17.5 21.5L19.5 16H22.5"
                    stroke="url(#fpFooterLogoGrad)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="16" cy="16" r="1.5" fill="#ffffff" />
                </svg>
              </div>
              <div>
                <span className="font-['Outfit'] text-2xl font-black tracking-tight text-foreground flex items-center leading-none">
                  FLEX<span className="text-active tracking-normal">PULSE</span>
                </span>
                <span className="font-['Inter'] text-[9px] tracking-[0.22em] uppercase font-bold text-slate-500 dark:text-slate-400 block mt-1">
                  Athletic Club & Recovery Lab
                </span>
              </div>
            </Link>

            <p className="font-['Inter'] text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-sm">
              Empowering human potential through competition-grade strength arenas, metabolic conditioning turf, and clinical hydrotherapy recovery suites.
            </p>

            {/* ── Social Media Channels (Fixed Colors, Background, Hover & Triggered Spring Transitions) ── */}
            <div className="space-y-2 pt-1">
              <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-['Outfit']">
                Official Athlete Channels
              </p>
              <motion.div 
                variants={socialContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="flex items-center gap-2.5"
              >
                {[
                  { icon: FaInstagram, label: "Instagram", href: "https://instagram.com" },
                  { icon: FaXTwitter, label: "X / Twitter", href: "https://twitter.com" },
                  { icon: FaYoutube, label: "YouTube", href: "https://youtube.com" },
                  { icon: FaDiscord, label: "Discord Community", href: "https://discord.com" },
                  { icon: FaFacebook, label: "Facebook", href: "https://facebook.com" }
                ].map((s, i) => {
                  const Icon = s.icon;
                  return (
                    <motion.a
                      key={i}
                      variants={socialIconVariants}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="group relative w-10 h-10 rounded-xl bg-white dark:bg-[#121026] border border-slate-200/90 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:text-white hover:border-active/60 shadow-xs hover:shadow-md transition-all duration-300 ease-out flex items-center justify-center cursor-pointer overflow-hidden transform hover:-translate-y-1.5 hover:rotate-6 active:scale-95"
                    >
                      {/* Active Crimson Fill Backdrop on Hover */}
                      <span className="absolute inset-0 bg-active opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                      <Icon className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:scale-110" />
                    </motion.a>
                  );
                })}
              </motion.div>
            </div>
          </div>

          {/* Quick Nav Links (Span 3 on lg) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-['Outfit'] text-sm sm:text-base font-bold tracking-wide text-foreground uppercase flex items-center gap-2">
              <span className="w-1.5 h-3.5 bg-active rounded-full inline-block"></span>
              Explore Platform
            </h4>
            <ul className="space-y-2.5 font-['Inter'] text-xs sm:text-sm">
              {[
                { label: "All Group Classes", href: "/all-classes" },
                { label: "Weekly Schedule", href: "/schedule" },
                { label: "Master Coaches", href: "/trainers" },
                { label: "Membership Pricing", href: "/pricing" },
                { label: "Gym & Recovery Facilities", href: "/facilities" },
                { label: "BMI & Macro Calculator", href: "/calculator" },
                { label: "Community Forum", href: "/forum" },
                { label: "VIP Trial Pass", href: "/calculator#trial-pass" },
                { label: "Support & Contact", href: "/contact" }
              ].map((link, i) => (
                <li key={i}>
                  <Link
                    href={link.href}
                    className="text-slate-600 dark:text-slate-300 hover:text-active hover:translate-x-1 inline-block transition-all duration-200 cursor-pointer font-medium"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Disciplines & Programs (Span 2 on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-['Outfit'] text-sm sm:text-base font-bold tracking-wide text-foreground uppercase flex items-center gap-2">
              <span className="w-1.5 h-3.5 bg-active rounded-full inline-block"></span>
              Disciplines
            </h4>
            <ul className="space-y-2.5 font-['Inter'] text-xs sm:text-sm">
              {[
                { label: "Olympic Lifting", href: "/all-classes?category=Weights" },
                { label: "HIIT & MetCon", href: "/all-classes?category=Cardio" },
                { label: "Combat Athletics", href: "/all-classes?category=Combat" },
                { label: "Mobility & Flow", href: "/all-classes?category=Yoga" },
                { label: "Turf Conditioning", href: "/all-classes?category=Cardio" },
                { label: "Cold Contrast Bath", href: "/facilities" },
                { label: "Apply as Trainer", href: "/dashboard/member/apply-trainer" }
              ].map((prog, i) => (
                <li key={i}>
                  <Link
                    href={prog.href}
                    className="text-slate-600 dark:text-slate-300 hover:text-active hover:translate-x-1 inline-block transition-all duration-200 cursor-pointer font-medium"
                  >
                    {prog.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact, Hours & Hubs (Span 3 on lg) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-['Outfit'] text-sm sm:text-base font-bold tracking-wide text-foreground uppercase flex items-center gap-2">
              <span className="w-1.5 h-3.5 bg-active rounded-full inline-block"></span>
              Hubs & Concierge
            </h4>
            <ul className="space-y-3.5 font-['Inter'] text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              <li className="flex items-start gap-2.5">
                <FiMapPin className="text-active w-4 h-4 shrink-0 mt-0.5" />
                <span className="leading-snug">
                  128 Pulse Blvd, Cyber District, Dhaka, Bangladesh (4 Locations)
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <FiPhone className="text-active w-4 h-4 shrink-0" />
                <a href="tel:+8801712345678" className="font-semibold text-foreground hover:text-active transition-colors">
                  +880 1712-345678
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <FiMail className="text-active w-4 h-4 shrink-0" />
                <a href="mailto:concierge@flexpulse.com" className="hover:text-active transition-colors">
                  concierge@flexpulse.com
                </a>
              </li>
              
              <li className="pt-2 border-t border-brand-500/15">
                <div className="flex items-start gap-2.5">
                  <FiClock className="text-active w-4 h-4 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                      <span className="font-bold text-foreground text-xs uppercase tracking-wider">
                        Keyless Turnstiles: 24/7/365
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 dark:text-[#9290C3]">
                      Coached Floor: Mon - Sat 06:00 - 22:00
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* ── Full-Width Compact Decorated Payment Gateways Marquee Ribbon ── */}
        <motion.div 
          variants={paymentRibbonVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="group/payribbon relative overflow-hidden my-4 sm:my-5 px-3.5 sm:px-6 py-2.5 sm:py-3 rounded-2xl bg-linear-to-r from-white via-slate-50 to-rose-50/15 dark:from-[#0d0b1f] dark:via-[#13102d] dark:to-[#0d0b1f] border border-slate-200/90 dark:border-white/10 hover:border-active/40 shadow-xs hover:shadow-md transition-all duration-500 flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-6"
        >
          {/* Subtle Top Glowing Line on Hover */}
          <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-active/60 to-transparent opacity-0 group-hover/payribbon:opacity-100 transition-opacity duration-500" />

          {/* Left: Compact Security Badge */}
          <motion.div 
            variants={paymentBadgeVariants}
            className="flex items-center gap-2.5 shrink-0 md:border-r border-slate-200/80 dark:border-white/10 md:pr-5 w-full md:w-auto justify-between md:justify-start"
          >
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-active/10 border border-active/25 flex items-center justify-center text-active shrink-0 shadow-xs">
                <FiLock className="w-3.5 h-3.5" />
              </div>
              <div className="leading-tight">
                <span className="font-['Outfit'] text-xs font-black uppercase tracking-wider text-foreground block">
                  Encrypted Checkout
                </span>
                <span className="text-[9px] text-slate-500 dark:text-slate-400 font-medium">
                  256-Bit SSL Tier-1 Gateways
                </span>
              </div>
            </div>

            <div className="inline-flex items-center gap-1.5 text-[8.5px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 shrink-0">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
              </span>
              <span>Stripe Verified</span>
            </div>
          </motion.div>

          {/* Right: Continuous Seamless Marquee Auto Scrolling Right to Left */}
          <motion.div 
            variants={paymentMarqueeVariants}
            className="flex-1 overflow-hidden mask-marquee relative w-full py-2"
          >
            <div className="animate-marquee-payments flex items-center gap-2.5 sm:gap-3.5">
              {[...PAYMENT_METHODS, ...PAYMENT_METHODS, ...PAYMENT_METHODS, ...PAYMENT_METHODS].map((method, idx) => {
                const Icon = method.icon;
                return (
                  <div
                    key={idx}
                    title={method.label}
                    aria-label={method.label}
                    className="relative group/tile flex items-center shrink-0 cursor-pointer"
                  >
                    {/* Decorated Compact Card Tile with Enhanced Hover Transitions */}
                    <div
                      className={`relative h-8 sm:h-9 px-3.5 sm:px-4 rounded-xl bg-white dark:bg-[#181535] border border-slate-200/90 dark:border-white/10 shadow-xs flex items-center justify-center overflow-hidden transition-all duration-300 ease-out transform group-hover/tile:-translate-y-1.5 group-hover/tile:scale-110 group-hover/tile:shadow-md ${method.hoverBorder} ${method.hoverBg}`}
                    >
                      {/* Kinetic Diagonal Light-Beam Sheen Sweep */}
                      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/50 dark:via-white/20 to-transparent -translate-x-full group-hover/tile:translate-x-full transition-transform duration-700 ease-out pointer-events-none" />

                      {/* Glowing Brand Bottom Accent Line */}
                      <span 
                        className="absolute bottom-0 left-1.5 right-1.5 h-[2px] rounded-full opacity-0 group-hover/tile:opacity-100 scale-x-0 group-hover/tile:scale-x-100 transition-all duration-300 pointer-events-none" 
                        style={{ backgroundColor: method.accentHex }}
                      />

                      {/* Payment Method Icon with Smooth Spring Pop */}
                      <Icon className={`text-lg sm:text-xl ${method.color} transition-all duration-300 transform group-hover/tile:scale-120`} />
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-3 sm:pt-4 flex flex-col md:flex-row items-center justify-between gap-4 font-['Inter'] text-xs text-slate-600 dark:text-slate-400">
          
          <div className="flex flex-wrap items-center gap-2 text-center md:text-left">
            <span>© {new Date().getFullYear()} FlexPulse Athletic Club Inc. All rights reserved.</span>
            <span className="hidden sm:inline">•</span>
            <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
              <FiShield className="w-3.5 h-3.5" />
              Verified Performance Facility
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-6 font-medium">
            <Link 
              href="/privacy" 
              className="text-slate-700 dark:text-slate-300 hover:text-active hover:underline transition-colors cursor-pointer"
            >
              Privacy Policy
            </Link>
            <span className="text-slate-300 dark:text-slate-700 hidden sm:inline">•</span>
            <Link 
              href="/terms" 
              className="text-slate-700 dark:text-slate-300 hover:text-active hover:underline transition-colors cursor-pointer"
            >
              Terms of Membership
            </Link>
            <span className="text-slate-300 dark:text-slate-700 hidden sm:inline">•</span>
            <Link 
              href="/club-rules" 
              className="text-slate-700 dark:text-slate-300 hover:text-active hover:underline transition-colors cursor-pointer"
            >
              Club Rules
            </Link>
            <span className="text-slate-300 dark:text-slate-700 hidden sm:inline">•</span>
            <Link 
              href="/contact" 
              className="text-slate-700 dark:text-slate-300 hover:text-active hover:underline transition-colors cursor-pointer"
            >
              Support Concierge
            </Link>
          </div>

        </div>

      </div>

      {/* Floating Decorated Circular Back to Top Button */}
      <BackToTop />
    </footer>
  );
}
