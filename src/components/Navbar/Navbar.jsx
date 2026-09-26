"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import {
  FaBars,
  FaChevronDown,
  FaChevronUp,
  FaTimes,
  FaUserCircle,
} from "react-icons/fa";
import {
  FiGrid,
  FiLogOut,
  FiSearch,
  FiCalendar,
  FiActivity,
  FiLayers,
  FiZap,
  FiDollarSign,
  FiMessageSquare,
} from "react-icons/fi";
import DarkModeSwitch from "./DarkModeSwitch";
import NavSearchModal from "./NavSearchModal";

export default function Navbar() {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const router = useRouter();
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isProgramsOpen, setIsProgramsOpen] = useState(false);
  const [isMobileProgramsOpen, setIsMobileProgramsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const dropdownRef = useRef(null);
  const programsRef = useRef(null);

  // Global Ctrl+K / Cmd+K search listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Click outside listener for profile and programs dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
      if (programsRef.current && !programsRef.current.contains(event.target)) {
        setIsProgramsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (pathname.includes("dashboard")) {
    return null;
  }

  const isActive = (path) => pathname === path;
  const isProgramsActive = [
    "/schedule",
    "/facilities",
    "/calculator",
    "/pricing",
    "/forum",
  ].includes(pathname);

  const programDropdownItems = [
    {
      name: "Weekly Schedule",
      desc: "Live daily class timetable & booking slots",
      path: "/schedule",
      icon: FiCalendar,
    },
    {
      name: "Club Facilities",
      desc: "Olympic free weights, turf & recovery spa",
      path: "/facilities",
      icon: FiLayers,
    },
    {
      name: "BMI & Macro Calculator",
      desc: "Body composition gauge & target nutrition",
      path: "/calculator",
      icon: FiActivity,
    },
    {
      name: "Memberships & Pricing",
      desc: "Flexible tiers with 20% annual savings",
      path: "/pricing",
      icon: FiDollarSign,
    },
    {
      name: "Community Forum",
      desc: "Ask fitness questions & connect with members",
      path: "/forum",
      icon: FiMessageSquare,
    },
  ];

  const onLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/signin");
        },
      },
    });
  };

  return (
    <>
      <nav className="bg-background/90 backdrop-blur-xl border-b border-brand-500/20 shadow-xs sticky top-0 z-50 transition-colors duration-300">
        <div className="w-11/12 mx-auto">
          <div className="flex justify-between items-center h-18">
            
            {/* Left: Professional Athletic Logo */}
            <Link
              href="/"
              onMouseEnter={() => setIsProgramsOpen(false)}
              className="shrink-0 flex items-center gap-3 group"
            >
              <div className="relative w-11 h-11 rounded-2xl bg-linear-to-br from-[#1B1A55] to-[#070F2B] p-0.5 shadow-lg group-hover:scale-105 transition-transform duration-300 border border-active/40 flex items-center justify-center overflow-hidden">
                {/* Glow ring */}
                <div className="absolute inset-0 bg-linear-to-tr from-active/30 via-transparent to-active/10 opacity-70" />
                
                {/* Kinetic Pulse Emblem SVG */}
                <svg
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-7 h-7 relative z-10"
                >
                  <defs>
                    <linearGradient id="fpLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#ff2a55" />
                      <stop offset="100%" stopColor="#ff0336" />
                    </linearGradient>
                  </defs>
                  {/* Outer Barbell Plates */}
                  <rect x="3" y="10" width="3" height="12" rx="1.5" fill="url(#fpLogoGrad)" />
                  <rect x="7" y="12" width="2.5" height="8" rx="1.2" fill="url(#fpLogoGrad)" opacity="0.85" />
                  <rect x="26" y="10" width="3" height="12" rx="1.5" fill="url(#fpLogoGrad)" />
                  <rect x="22.5" y="12" width="2.5" height="8" rx="1.2" fill="url(#fpLogoGrad)" opacity="0.85" />
                  {/* Central Bar & Kinetic Energy Pulse Line */}
                  <path
                    d="M9.5 16H12.5L14.5 10.5L17.5 21.5L19.5 16H22.5"
                    stroke="url(#fpLogoGrad)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Center Energy Core */}
                  <circle cx="16" cy="16" r="1.5" fill="#ffffff" />
                </svg>
              </div>

              <div>
                <span className="font-['Outfit'] text-2xl font-black tracking-tight text-foreground flex items-center leading-none">
                  FLEX<span className="text-active tracking-normal">PULSE</span>
                </span>
                <span className="font-['Inter'] text-[9px] tracking-[0.22em] uppercase font-bold text-[#535C91] dark:text-[#9290C3]/75 block mt-1">
                  Athletic Club
                </span>
              </div>
            </Link>

            {/* Center Desktop Navigation: Home, All Classes, Coaches, Programs ▾, Contact, Dashboard */}
            <div className="hidden lg:flex items-center space-x-1 xl:space-x-2 font-['Inter']">
              <Link
                href="/"
                onMouseEnter={() => setIsProgramsOpen(false)}
                className={`px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
                  isActive("/")
                    ? "text-active bg-active/10"
                    : "text-foreground/85 hover:text-active hover:bg-brand-500/10"
                }`}
              >
                Home
              </Link>

              {/* All Classes separate */}
              <Link
                href="/all-classes"
                onMouseEnter={() => setIsProgramsOpen(false)}
                className={`px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
                  isActive("/all-classes")
                    ? "text-active bg-active/10"
                    : "text-foreground/85 hover:text-active hover:bg-brand-500/10"
                }`}
              >
                All Classes
              </Link>

              {/* Coaches separate */}
              <Link
                href="/trainers"
                onMouseEnter={() => setIsProgramsOpen(false)}
                className={`px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
                  isActive("/trainers")
                    ? "text-active bg-active/10"
                    : "text-foreground/85 hover:text-active hover:bg-brand-500/10"
                }`}
              >
                Coaches
              </Link>

              {/* Programs Dropdown (Schedule, Facilities, Calculator, Memberships, Community) */}
              <div
                className="relative"
                ref={programsRef}
                onMouseEnter={() => setIsProgramsOpen(true)}
                onMouseLeave={() => setIsProgramsOpen(false)}
              >
                <button
                  onClick={() => setIsProgramsOpen((prev) => !prev)}
                  className={`px-3 py-2 rounded-xl text-sm font-semibold flex items-center gap-1.5 transition-all duration-200 cursor-pointer whitespace-nowrap ${
                    isProgramsActive || isProgramsOpen
                      ? "text-active bg-active/10"
                      : "text-foreground/85 hover:text-active hover:bg-brand-500/10"
                  }`}
                >
                  <span>Programs</span>
                  <FaChevronDown
                    className={`w-3 h-3 transition-transform duration-200 ${
                      isProgramsOpen ? "rotate-180 text-active" : ""
                    }`}
                  />
                </button>

                {/* Dropdown Menu with hit-test bridge */}
                {isProgramsOpen && (
                  <div className="absolute top-full left-0 pt-2 w-80 z-50 animate-fadeIn">
                    <div className="bg-white dark:bg-[#070F2B] border border-brand-500/25 dark:border-brand-500/35 rounded-3xl shadow-2xl p-2.5 space-y-1">
                      <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-[#535C91] dark:text-[#9290C3]/70 border-b border-brand-500/10">
                        Explore Programs & Club Hub
                      </div>
                      {programDropdownItems.map((item) => {
                        const Icon = item.icon;
                        const active = pathname === item.path;
                        return (
                          <Link
                            key={item.path}
                            href={item.path}
                            onClick={() => setIsProgramsOpen(false)}
                            className={`flex items-start gap-3 p-2.5 rounded-2xl transition-all ${
                              active
                                ? "bg-active/15 text-active"
                                : "hover:bg-[#535C91]/10 dark:hover:bg-[#1B1A55]/50 text-foreground"
                            }`}
                          >
                            <div className={`p-2 rounded-xl shrink-0 mt-0.5 ${active ? "bg-active text-white" : "bg-[#535C91]/10 dark:bg-[#1B1A55] text-active"}`}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <div>
                              <p className="font-['Outfit'] text-xs font-bold leading-tight">
                                {item.name}
                              </p>
                              <p className="text-[11px] text-[#535C91] dark:text-[#9290C3] mt-0.5 leading-snug">
                                {item.desc}
                              </p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Contact */}
              <Link
                href="/contact"
                onMouseEnter={() => setIsProgramsOpen(false)}
                className={`px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
                  isActive("/contact")
                    ? "text-active bg-active/10"
                    : "text-foreground/85 hover:text-active hover:bg-brand-500/10"
                }`}
              >
                Contact
              </Link>

              {/* Dashboard if logged in */}
              {user && (
                <Link
                  href={`/dashboard/${user?.role}`}
                  onMouseEnter={() => setIsProgramsOpen(false)}
                  className={`px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
                    isActive(`/dashboard/${user?.role}`)
                      ? "text-active bg-active/10"
                      : "text-foreground/85 hover:text-active hover:bg-brand-500/10"
                  }`}
                >
                  Dashboard
                </Link>
              )}
            </div>

            {/* Right Action Bar: Search + Theme + Auth */}
            <div
              className="hidden lg:flex items-center space-x-2.5 xl:space-x-3 shrink-0"
              onMouseEnter={() => setIsProgramsOpen(false)}
            >
              {/* Interactive Search Bar Trigger */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-[#535C91]/10 dark:bg-[#1B1A55]/60 hover:bg-[#535C91]/20 dark:hover:bg-[#1B1A55] border border-brand-500/20 text-xs font-semibold text-[#535C91] dark:text-[#9290C3] transition-all cursor-pointer shadow-xs hover:border-active/40"
                title="Search classes, trainers, tools (Ctrl+K)"
              >
                <FiSearch className="w-4 h-4 text-active" />
                <span className="hidden xl:inline">Search...</span>
                <kbd className="px-1.5 py-0.5 rounded-md bg-background border border-brand-500/20 text-[10px] font-mono font-bold text-foreground/70">
                  ⌘K
                </kbd>
              </button>

              <DarkModeSwitch />

              {/* User Auth or Sign In Button */}
              {user ? (
                <div className="relative" ref={dropdownRef}>
                  {/* Profile Pill Trigger */}
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center gap-2 pl-1.5 pr-3 py-1.5 rounded-full bg-[#535C91]/15 dark:bg-[#1B1A55]/80 text-foreground font-semibold text-xs transition-all hover:bg-[#535C91]/25 dark:hover:bg-[#1B1A55] cursor-pointer border border-[#535C91]/20 dark:border-brand-500/20 shrink-0"
                  >
                    {user.image ? (
                      <Image
                        src={user.image}
                        alt={user.name || "User"}
                        width={28}
                        height={28}
                        className="rounded-full object-cover border border-active/30"
                      />
                    ) : (
                      <FaUserCircle className="w-7 h-7 text-active" />
                    )}
                    <span className="font-['Inter'] whitespace-nowrap">
                      {user.name ? user.name.split(" ")[0] : "Account"}
                    </span>
                    {isProfileOpen ? (
                      <FaChevronUp className="w-3 h-3 text-active shrink-0" />
                    ) : (
                      <FaChevronDown className="w-3 h-3 text-active shrink-0" />
                    )}
                  </button>

                  {/* Profile Dropdown Menu */}
                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2.5 w-76 bg-white dark:bg-[#070F2B] border border-brand-500/20 dark:border-brand-500/30 rounded-3xl shadow-2xl z-50 overflow-hidden py-1 transition-all">
                      <div className="bg-[#535C91]/5 dark:bg-[#1B1A55]/40 m-2.5 p-3.5 rounded-2xl flex items-center gap-3">
                        {user.image ? (
                          <Image
                            src={user.image}
                            alt={user.name || "User"}
                            width={46}
                            height={46}
                            className="rounded-full object-cover border border-active/30"
                          />
                        ) : (
                          <FaUserCircle className="w-11 h-11 text-active" />
                        )}
                        <div className="min-w-0 flex-1">
                          <p className="font-['Inter'] font-bold text-foreground text-sm truncate">
                            {user.name}
                          </p>
                          <p className="font-['Inter'] text-xs text-[#535C91] dark:text-[#9290C3] truncate">
                            {user.email}
                          </p>
                        </div>
                      </div>

                      <div className="px-2 pb-2 space-y-1 font-['Inter'] text-sm">
                        <Link
                          href={`/dashboard/${user?.role}`}
                          onClick={() => setIsProfileOpen(false)}
                          className="flex items-center gap-3 w-full px-3.5 py-2 text-xs rounded-xl font-medium text-foreground hover:bg-brand-500/15 hover:text-active transition-colors"
                        >
                          <FiGrid className="w-4 h-4 text-active" />
                          <span>Member Dashboard</span>
                        </Link>

                        <Link
                          href="/calculator"
                          onClick={() => setIsProfileOpen(false)}
                          className="flex items-center gap-3 w-full px-3.5 py-2 text-xs rounded-xl font-medium text-foreground hover:bg-brand-500/15 hover:text-active transition-colors"
                        >
                          <FiActivity className="w-4 h-4 text-active" />
                          <span>My Fitness Baseline</span>
                        </Link>

                        <div className="border-t border-brand-500/10 my-1.5" />

                        <button
                          onClick={onLogout}
                          className="flex items-center gap-3 w-full px-3.5 py-2 text-xs rounded-xl font-semibold text-rose-500 hover:bg-rose-500/10 transition-colors cursor-pointer"
                        >
                          <FiLogOut className="w-4 h-4" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-2 font-['Inter']">
                  <Link
                    href="/signin"
                    className="text-xs font-semibold text-foreground/85 hover:text-active px-3 py-2 rounded-xl hover:bg-brand-500/10 transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/signup"
                    className="text-xs font-bold bg-btn-bg text-btn-text px-5 py-2.5 rounded-full border border-brand-500/20 shadow-md hover:scale-105 active:scale-95 transition-all duration-300"
                  >
                    Join Club
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Header Icons: Search + Theme + Hamburger */}
            <div className="lg:hidden flex items-center space-x-2">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 rounded-xl bg-[#535C91]/10 dark:bg-[#1B1A55]/60 text-active"
                aria-label="Search site"
              >
                <FiSearch size={18} />
              </button>
              <DarkModeSwitch />
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-xl text-foreground hover:text-active hover:bg-brand-500/10 focus:outline-none"
              >
                {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <div
          className={`lg:hidden transition-all duration-300 overflow-hidden ${
            isOpen ? "max-h-[85vh] opacity-100" : "max-h-0 opacity-0"
          } bg-background border-t border-brand-500/20 overflow-y-auto`}
        >
          <div className="w-11/12 mx-auto pt-3 pb-6 space-y-2 font-['Inter']">
            {/* Mobile Quick Search Input Trigger */}
            <button
              onClick={() => {
                setIsOpen(false);
                setIsSearchOpen(true);
              }}
              className="w-full flex items-center justify-between p-3 rounded-2xl bg-[#535C91]/10 dark:bg-[#1B1A55]/50 border border-brand-500/20 text-xs text-[#535C91] dark:text-[#9290C3] mb-3"
            >
              <span className="flex items-center gap-2">
                <FiSearch className="w-4 h-4 text-active" /> Search classes, coaches, tools...
              </span>
              <kbd className="px-1.5 py-0.5 rounded bg-background text-[10px] font-mono">⌘K</kbd>
            </button>

            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className={`block text-sm font-semibold py-2.5 px-3.5 rounded-xl transition-colors ${
                isActive("/") ? "bg-active text-white" : "text-foreground hover:bg-brand-500/10"
              }`}
            >
              Home
            </Link>

            <Link
              href="/all-classes"
              onClick={() => setIsOpen(false)}
              className={`block text-sm font-semibold py-2.5 px-3.5 rounded-xl transition-colors ${
                isActive("/all-classes") ? "bg-active text-white" : "text-foreground hover:bg-brand-500/10"
              }`}
            >
              All Classes
            </Link>

            <Link
              href="/trainers"
              onClick={() => setIsOpen(false)}
              className={`block text-sm font-semibold py-2.5 px-3.5 rounded-xl transition-colors ${
                isActive("/trainers") ? "bg-active text-white" : "text-foreground hover:bg-brand-500/10"
              }`}
            >
              Master Coaches
            </Link>

            {/* Mobile Programs Accordion */}
            <div className="rounded-xl border border-brand-500/15 overflow-hidden">
              <button
                onClick={() => setIsMobileProgramsOpen(!isMobileProgramsOpen)}
                className="w-full flex items-center justify-between py-2.5 px-3.5 text-sm font-semibold text-foreground hover:text-active"
              >
                <span>Programs & Tools</span>
                <FaChevronDown
                  className={`w-3 h-3 transition-transform ${isMobileProgramsOpen ? "rotate-180 text-active" : ""}`}
                />
              </button>
              {isMobileProgramsOpen && (
                <div className="p-2 space-y-1 bg-[#535C91]/5 dark:bg-[#1B1A55]/30 border-t border-brand-500/10">
                  {programDropdownItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.path}
                        href={item.path}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-2.5 p-2 rounded-lg text-xs font-medium text-foreground/90 hover:text-active hover:bg-brand-500/10"
                      >
                        <Icon className="w-3.5 h-3.5 text-active" />
                        <span>{item.name}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className={`block text-sm font-semibold py-2.5 px-3.5 rounded-xl transition-colors ${
                isActive("/contact") ? "bg-active text-white" : "text-foreground hover:bg-brand-500/10"
              }`}
            >
              Contact & VIP Pass
            </Link>

            {user && (
              <Link
                href={`/dashboard/${user?.role}`}
                onClick={() => setIsOpen(false)}
                className={`block text-sm font-semibold py-2.5 px-3.5 rounded-xl transition-colors ${
                  isActive(`/dashboard/${user?.role}`) ? "bg-active text-white" : "text-foreground hover:bg-brand-500/10"
                }`}
              >
                Member Dashboard
              </Link>
            )}

            {/* Mobile User Profile & CTAs */}
            <div className="border-t border-brand-500/20 pt-4 mt-3">
              {user ? (
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 px-3.5 py-2.5 bg-brand-800/40 rounded-2xl">
                    {user.image ? (
                      <Image
                        src={user.image}
                        alt={user.name || "User"}
                        width={36}
                        height={36}
                        className="rounded-full object-cover border border-active/40"
                      />
                    ) : (
                      <FaUserCircle className="w-9 h-9 text-active" />
                    )}
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-foreground truncate">
                        {user.name}
                      </p>
                      <p className="text-[11px] text-[#535C91] dark:text-[#9290C3] truncate">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      href={`/dashboard/${user?.role}`}
                      onClick={() => setIsOpen(false)}
                      className="py-2.5 px-3 rounded-xl bg-[#535C91]/10 text-center text-xs font-bold text-foreground hover:text-active"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={onLogout}
                      className="py-2.5 px-3 rounded-xl bg-rose-500/10 text-center text-xs font-bold text-rose-500"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-2 pt-1">
                  <Link
                    href="/signin"
                    onClick={() => setIsOpen(false)}
                    className="block text-sm font-semibold py-2.5 px-3 rounded-xl text-center text-foreground hover:bg-brand-500/10 border border-brand-500/20"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setIsOpen(false)}
                    className="block text-sm font-bold py-3 px-4 rounded-full bg-btn-bg text-btn-text text-center shadow-md"
                  >
                    Join FlexPulse Club
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Spotlight Search Modal */}
      <NavSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}
