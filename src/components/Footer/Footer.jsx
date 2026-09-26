"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaFacebook,
  FaInstagram,
  FaXTwitter,
  FaYoutube,
  FaDiscord
} from "react-icons/fa6";
import { 
  FiClock, 
  FiMail, 
  FiMapPin, 
  FiPhone, 
  FiCheckCircle, 
  FiSend,
  FiShield
} from "react-icons/fi";
import BackToTop from "@/components/common/BackToTop";

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
        
        {/* VIP Athlete Dispatch / Newsletter Strip */}
        <div className="mb-14 sm:mb-18 p-7 sm:p-10 rounded-3xl bg-linear-to-r from-brand-800/30 via-[#1B1A55]/40 to-brand-800/30 border border-brand-500/25 shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="max-w-xl space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-active/15 border border-active/30 text-active text-[11px] font-extrabold uppercase tracking-wider">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-active opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-active"></span>
              </span>
              <span>FlexPulse Athlete Dispatch</span>
            </div>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold font-['Outfit'] text-foreground tracking-tight leading-tight">
              Join 18,500+ Dedicated Athletes
            </h3>
            <p className="text-xs sm:text-sm text-[#535C91] dark:text-[#9290C3] leading-relaxed">
              Receive early drop notifications for high-demand masterclasses, clinically validated nutrition logs, and invite-only community challenges.
            </p>
          </div>

          {/* Subscription Form */}
          <div className="w-full lg:max-w-md">
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
                  className="flex-1 px-4 py-3 bg-white dark:bg-[#070F2B] border border-brand-500/25 rounded-xl text-foreground text-xs sm:text-sm placeholder-[#535C91] dark:placeholder-[#9290C3] focus:outline-hidden focus:border-active transition-colors shadow-xs"
                />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-btn-bg text-btn-text font-bold text-xs sm:text-sm shadow-md hover:opacity-90 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
                >
                  <span>Subscribe</span>
                  <FiSend className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
            <p className="text-[11px] text-[#535C91] dark:text-[#9290C3]/70 mt-2 font-medium">
              Zero spam. Unsubscribe anytime with 1-click.
            </p>
          </div>
        </div>

        {/* Main Footer Navigation Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-brand-500/15">
          
          {/* Brand & Manifesto Column (Span 4 on lg) */}
          <div className="sm:col-span-2 lg:col-span-4 space-y-6">
            <Link href="/" className="flex items-center gap-3 group w-fit">
              <div className="relative w-11 h-11 rounded-2xl bg-linear-to-br from-[#1B1A55] to-[#070F2B] p-0.5 shadow-md border border-active/40 flex items-center justify-center group-hover:scale-105 transition-transform duration-300 overflow-hidden">
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
                <span className="font-['Inter'] text-[9px] tracking-[0.22em] uppercase font-bold text-[#535C91] dark:text-[#9290C3]/75 block mt-1">
                  Athletic Club & Recovery Lab
                </span>
              </div>
            </Link>

            <p className="font-['Inter'] text-xs sm:text-sm text-[#535C91] dark:text-[#9290C3] leading-relaxed max-w-sm">
              Empowering human potential through competition-grade strength arenas, metabolic conditioning turf, and clinical hydrotherapy recovery suites.
            </p>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-3 p-3.5 rounded-2xl bg-[#535C91]/5 dark:bg-[#1B1A55]/50 border border-brand-500/20 font-['Outfit'] max-w-sm">
              <div>
                <p className="text-lg sm:text-xl font-black text-active leading-none">18.5K+</p>
                <p className="text-[10px] text-[#535C91] dark:text-[#9290C3] font-bold uppercase tracking-wider mt-1">
                  Athletes
                </p>
              </div>
              <div className="border-l border-brand-500/20 pl-3">
                <p className="text-lg sm:text-xl font-black text-active leading-none">45+</p>
                <p className="text-[10px] text-[#535C91] dark:text-[#9290C3] font-bold uppercase tracking-wider mt-1">
                  Classes
                </p>
              </div>
              <div className="border-l border-brand-500/20 pl-3">
                <p className="text-lg sm:text-xl font-black text-active leading-none">4 Hubs</p>
                <p className="text-[10px] text-[#535C91] dark:text-[#9290C3] font-bold uppercase tracking-wider mt-1">
                  24/7 Access
                </p>
              </div>
            </div>

            {/* Social Channels */}
            <div className="flex items-center gap-2.5 pt-1">
              {[
                { icon: FaInstagram, label: "Instagram", href: "#" },
                { icon: FaXTwitter, label: "X / Twitter", href: "#" },
                { icon: FaYoutube, label: "YouTube", href: "#" },
                { icon: FaDiscord, label: "Discord Community", href: "#" },
                { icon: FaFacebook, label: "Facebook", href: "#" }
              ].map((s, i) => {
                const Icon = s.icon;
                return (
                  <a
                    key={i}
                    href={s.href}
                    aria-label={s.label}
                    className="w-9 h-9 rounded-xl bg-[#535C91]/10 dark:bg-[#1B1A55]/70 hover:bg-active hover:text-white border border-brand-500/20 text-[#535C91] dark:text-[#9290C3] transition-all duration-200 flex items-center justify-center cursor-pointer shadow-xs active:scale-95"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Nav Links (Span 3 on lg) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-['Outfit'] text-sm sm:text-base font-bold tracking-wide text-foreground uppercase">
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
                { label: "VIP Trial Pass", href: "/calculator#trial-pass" }
              ].map((link, i) => (
                <li key={i}>
                  <Link
                    href={link.href}
                    className="text-[#535C91] dark:text-[#9290C3] hover:text-active hover:translate-x-1 inline-block transition-all duration-200 cursor-pointer"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Disciplines & Programs (Span 2 on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-['Outfit'] text-sm sm:text-base font-bold tracking-wide text-foreground uppercase">
              Disciplines
            </h4>
            <ul className="space-y-2.5 font-['Inter'] text-xs sm:text-sm">
              {[
                { label: "Olympic Lifting", href: "/all-classes?category=Weights" },
                { label: "HIIT & MetCon", href: "/all-classes?category=Cardio" },
                { label: "Combat Athletics", href: "/all-classes?category=Combat" },
                { label: "Mobility & Flow", href: "/all-classes?category=Yoga" },
                { label: "Turf Conditioning", href: "/all-classes?category=Cardio" },
                { label: "Cold Contrast Bath", href: "/facilities" }
              ].map((prog, i) => (
                <li key={i}>
                  <Link
                    href={prog.href}
                    className="text-[#535C91] dark:text-[#9290C3] hover:text-active hover:translate-x-1 inline-block transition-all duration-200 cursor-pointer"
                  >
                    {prog.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact, Hours & Hubs (Span 3 on lg) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-['Outfit'] text-sm sm:text-base font-bold tracking-wide text-foreground uppercase">
              Hubs & Concierge
            </h4>
            <ul className="space-y-3.5 font-['Inter'] text-xs sm:text-sm text-[#535C91] dark:text-[#9290C3]">
              <li className="flex items-start gap-2.5">
                <FiMapPin className="text-active w-4 h-4 shrink-0 mt-0.5" />
                <span className="leading-snug">
                  128 Pulse Blvd, Cyber District, Dhaka, Bangladesh (4 Locations)
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <FiPhone className="text-active w-4 h-4 shrink-0" />
                <span className="font-semibold text-foreground">+880 1712-345678</span>
              </li>
              <li className="flex items-center gap-2.5">
                <FiMail className="text-active w-4 h-4 shrink-0" />
                <span>concierge@flexpulse.com</span>
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
                    <p className="text-[11px] text-[#535C91] dark:text-[#9290C3]">
                      Coached Floor: Mon - Sat 06:00 - 22:00
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 font-['Inter'] text-xs text-[#535C91] dark:text-[#9290C3]">
          
          <div className="flex flex-wrap items-center gap-2 text-center md:text-left">
            <span>© {new Date().getFullYear()} FlexPulse Athletic Club Inc. All rights reserved.</span>
            <span className="hidden sm:inline">•</span>
            <span className="inline-flex items-center gap-1 text-emerald-500 font-semibold">
              <FiShield className="w-3.5 h-3.5" />
              Verified Performance Facility
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link href="/contact" className="hover:text-active transition-colors cursor-pointer">
              Privacy Policy
            </Link>
            <Link href="/contact" className="hover:text-active transition-colors cursor-pointer">
              Terms of Membership
            </Link>
            <Link href="/contact" className="hover:text-active transition-colors cursor-pointer">
              Club Rules
            </Link>
          </div>

        </div>

      </div>

      {/* Floating Decorated Circular Back to Top Button */}
      <BackToTop />
    </footer>
  );
}
