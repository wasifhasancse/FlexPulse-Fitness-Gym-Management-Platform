"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaXTwitter, FaInstagram, FaYoutube, FaFacebook } from "react-icons/fa6";
import { FiMail, FiPhone, FiMapPin, FiClock } from "react-icons/fi";

export default function Footer() {
  const pathname = usePathname();
  if (pathname.includes("dashboard")) {
    return null;
  }

  return (
    <footer className="bg-background border-t border-brand-500/15 dark:border-brand-500/30 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

          {/* Brand Column */}
          <div className="flex flex-col space-y-6">
            <Link href="/" className="flex items-center gap-2.5 group w-fit">
              <div className="w-10 h-10 rounded-xl bg-linear-to-br from-[#9290C3] to-[#535C91] dark:from-[#1B1A55] dark:to-[#070F2B] flex items-center justify-center shadow-md border border-brand-500/20 group-hover:scale-105 transition-transform duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 text-active">
                  <path d="M6 5H4v14h2V5zm14 0h-2v14h2V5zm-4 6H8v2h8v-2zm-1-4h-2v10h2V7zm-8 0H5v10h2V7z"/>
                </svg>
              </div>
              <span className="font-['Outfit'] text-2xl font-bold tracking-tight text-foreground">
                Flex<span className="text-active">Pulse</span>
              </span>
            </Link>
            <p className="font-['Inter'] text-sm text-[#535C91] dark:text-[#9290C3]/80 leading-relaxed">
              Elevate your body, mind, and spirit with certified elite trainers, customized training programs, and a dedicated community at FlexPulse.
            </p>
            {/* Stats Block */}
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-brand-500/10 dark:border-brand-500/20 font-['Outfit']">
              <div>
                <p className="text-lg font-bold text-active">15+</p>
                <p className="text-[10px] text-[#535C91]/80 dark:text-[#9290C3]/60 uppercase tracking-wider font-semibold">Coaches</p>
              </div>
              <div>
                <p className="text-lg font-bold text-active">50+</p>
                <p className="text-[10px] text-[#535C91]/80 dark:text-[#9290C3]/60 uppercase tracking-wider font-semibold">Classes</p>
              </div>
              <div>
                <p className="text-lg font-bold text-active">10k+</p>
                <p className="text-[10px] text-[#535C91]/80 dark:text-[#9290C3]/60 uppercase tracking-wider font-semibold">Members</p>
              </div>
            </div>
            {/* Social Icons */}
            <div className="flex space-x-3 pt-2">
              <a href="#" className="p-2.5 bg-[#535C91]/10 dark:bg-[#1B1A55]/60 rounded-xl border border-brand-500/15 text-[#535C91] dark:text-[#9290C3] hover:text-active hover:border-active hover:scale-105 active:scale-95 transition-all duration-300" aria-label="X (Twitter)">
                <FaXTwitter size={16} />
              </a>
              <a href="#" className="p-2.5 bg-[#535C91]/10 dark:bg-[#1B1A55]/60 rounded-xl border border-brand-500/15 text-[#535C91] dark:text-[#9290C3] hover:text-active hover:border-active hover:scale-105 active:scale-95 transition-all duration-300" aria-label="Instagram">
                <FaInstagram size={16} />
              </a>
              <a href="#" className="p-2.5 bg-[#535C91]/10 dark:bg-[#1B1A55]/60 rounded-xl border border-brand-500/15 text-[#535C91] dark:text-[#9290C3] hover:text-active hover:border-active hover:scale-105 active:scale-95 transition-all duration-300" aria-label="YouTube">
                <FaYoutube size={16} />
              </a>
              <a href="#" className="p-2.5 bg-[#535C91]/10 dark:bg-[#1B1A55]/60 rounded-xl border border-brand-500/15 text-[#535C91] dark:text-[#9290C3] hover:text-active hover:border-active hover:scale-105 active:scale-95 transition-all duration-300" aria-label="Facebook">
                <FaFacebook size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="flex flex-col space-y-6">
            <h3 className="font-['Outfit'] text-base font-bold tracking-wide text-foreground">
              Explore Links
            </h3>
            <ul className="space-y-3 font-['Inter'] text-sm">
              <li>
                <Link href="/" className="text-[#535C91] dark:text-[#9290C3] hover:text-active hover:translate-x-1 inline-block transition-all duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/all-classes" className="text-[#535C91] dark:text-[#9290C3] hover:text-active hover:translate-x-1 inline-block transition-all duration-200">
                  All Fitness Classes
                </Link>
              </li>
              <li>
                <Link href="/forum" className="text-[#535C91] dark:text-[#9290C3] hover:text-active hover:translate-x-1 inline-block transition-all duration-200">
                  Community Forum
                </Link>
              </li>
              <li>
                <Link href="/auth/login" className="text-[#535C91] dark:text-[#9290C3] hover:text-active hover:translate-x-1 inline-block transition-all duration-200">
                  Member Portal Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Hours Column */}
          <div className="flex flex-col space-y-6">
            <h3 className="font-['Outfit'] text-base font-bold tracking-wide text-foreground">
              Contact & Hours
            </h3>
            <ul className="space-y-4 font-['Inter'] text-sm text-[#535C91] dark:text-[#9290C3]/80">
              <li className="flex items-start gap-3">
                <FiMapPin className="text-active w-5 h-5 shrink-0 mt-0.5" />
                <span>128 Pulse Blvd, Cyber District, Dhaka, Bangladesh</span>
              </li>
              <li className="flex items-center gap-3">
                <FiPhone className="text-active w-5 h-5 shrink-0" />
                <span>+880 1712-345678</span>
              </li>
              <li className="flex items-center gap-3">
                <FiMail className="text-active w-5 h-5 shrink-0" />
                <span>contact@flexpulse.com</span>
              </li>
              <li className="flex items-start gap-3 pt-2 border-t border-brand-500/10 dark:border-brand-500/20">
                <FiClock className="text-active w-5 h-5 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground text-xs uppercase tracking-wider mb-1">Gym Hours</p>
                  <p className="text-xs">Mon - Fri: 6:00 AM - 10:00 PM</p>
                  <p className="text-xs">Sat - Sun: 8:00 AM - 8:00 PM</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="flex flex-col space-y-6">
            <h3 className="font-['Outfit'] text-base font-bold tracking-wide text-foreground">
              Stay in the Loop
            </h3>
            <p className="font-['Inter'] text-sm text-[#535C91] dark:text-[#9290C3]/80 leading-relaxed">
              Subscribe to get expert fitness tips, healthy workout guides, and class announcements.
            </p>
            <form className="flex flex-col sm:flex-row gap-2.5" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter email address"
                className="flex-1 px-4 py-2.5 bg-[#535C91]/5 dark:bg-[#1B1A55]/40 border border-[#535C91]/20 dark:border-[#9290C3]/20 rounded-xl text-foreground placeholder-[#535C91]/50 dark:placeholder-[#9290C3]/50 focus:outline-none focus:ring-2 focus:ring-active/30 focus:border-active transition-all font-['Inter'] text-sm"
                required
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-btn-bg text-btn-text font-bold rounded-xl border border-brand-500/20 hover:scale-[1.02] active:scale-[0.98] shadow-sm hover:shadow-md transition-all text-sm cursor-pointer text-center whitespace-nowrap"
              >
                Join Now
              </button>
            </form>
          </div>

        </div>

        {/* Copyright Area */}
        <div className="border-t border-brand-500/15 dark:border-brand-500/30 mt-16 pt-8 flex flex-col sm:flex-row justify-between items-center font-['Inter'] text-xs text-[#535C91] dark:text-[#9290C3]/60 gap-4">
          <p>© 2026 FlexPulse Fitness. All Rights Reserved. Empowering your strength.</p>
          <div className="flex space-x-6">
            <Link href="#" className="hover:text-active transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-active transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-active transition-colors">Support Portal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

