"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  FaAngleRight,
  FaBars,
  FaBell,
  FaBolt,
  FaCompress,
  FaEnvelope,
  FaExpand,
  FaHome,
  FaPlusCircle,
  FaSearch,
  FaUserCircle,
  FaUsers,
} from "react-icons/fa";
import DarkModeSwitch from "../Navbar/DarkModeSwitch";

const DashboardNavBar = ({ user, onMenuToggle }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [quickActionsOpen, setQuickActionsOpen] = useState(false);
  const quickActionsRef = useRef(null);
  const pathname = usePathname();

  // Handle outside click for quick actions
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        quickActionsRef.current &&
        !quickActionsRef.current.contains(e.target)
      ) {
        setQuickActionsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
        setIsFullscreen(false);
      }
    }
  };

  // Compute breadcrumb path
  const pathSegments = pathname.split("/").filter(Boolean);
  const breadcrumbCurrent =
    pathSegments[pathSegments.length - 1] === "dashboard"
      ? "Overview"
      : pathSegments[pathSegments.length - 1] || "Overview";

  return (
    <header className="sticky top-0 z-30 bg-white/80 dark:bg-[#070F2B]/90 backdrop-blur-md border-b border-brand-500/15 px-4 sm:px-6 py-3 transition-colors duration-300">
      <div className="flex items-center justify-between gap-3 sm:gap-4">
        {/* Left: Mobile hamburger & Breadcrumbs */}
        <div className="flex items-center gap-2 sm:gap-4 min-w-0">
          <button
            onClick={onMenuToggle}
            className="md:hidden p-2 rounded-xl bg-black/5 dark:bg-white/5 text-foreground hover:text-active transition-colors cursor-pointer"
            aria-label="Toggle sidebar"
          >
            <FaBars size={18} />
          </button>

          {/* Breadcrumb matching Dreams GYM */}
          <nav
            aria-label="Breadcrumb"
            className="hidden sm:flex items-center gap-1.5 text-xs font-['Inter']"
          >
            <Link
              href="/"
              className="flex items-center gap-1 text-[#535C91] dark:text-[#9290C3] hover:text-active transition-colors"
            >
              <FaHome className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
            <FaAngleRight className="w-2.5 h-2.5 text-[#535C91]/60 dark:text-[#9290C3]/60" />
            <span className="font-semibold text-foreground capitalize">
              {breadcrumbCurrent.replace(/([A-Z])/g, " $1")}
            </span>
          </nav>
        </div>

        {/* Center / Right: Search Bar */}
        <div className="flex-1 max-w-xs sm:max-w-md mx-2">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <FaSearch className="h-3.5 w-3.5 text-[#535C91] dark:text-[#9290C3]" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search pages, members..."
              className="w-full pl-9 pr-12 py-2 bg-black/5 dark:bg-white/5 border border-brand-500/15 hover:border-active/40 focus:border-active rounded-xl text-foreground placeholder-[#535C91]/60 dark:placeholder-[#9290C3]/60 focus:outline-none transition-all font-['Inter'] text-xs sm:text-sm"
            />
            <kbd className="hidden sm:inline-flex absolute right-2.5 top-1/2 -translate-y-1/2 items-center px-1.5 py-0.5 text-[10px] font-mono font-semibold text-[#535C91] dark:text-[#9290C3] bg-black/5 dark:bg-white/10 rounded border border-brand-500/20">
              ⌘K
            </kbd>
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Quick Actions Dropdown */}
          <div className="relative" ref={quickActionsRef}>
            <button
              onClick={() => setQuickActionsOpen(!quickActionsOpen)}
              className="hidden lg:inline-flex items-center gap-2 px-3.5 py-2 bg-active/10 hover:bg-active/20 text-active border border-active/30 rounded-xl font-['Outfit'] font-bold text-xs transition-all duration-200 cursor-pointer"
            >
              <FaBolt className="w-3 h-3 text-active" />
              <span>Quick Actions</span>
            </button>

            {quickActionsOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#070F2B] border border-brand-500/20 rounded-2xl shadow-md py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                <Link
                  href="/all-classes"
                  onClick={() => setQuickActionsOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2 text-xs font-['Inter'] font-semibold text-foreground hover:bg-brand-500/10 hover:text-active transition-colors"
                >
                  <FaPlusCircle className="w-3.5 h-3.5 text-active" />
                  <span>Explore Classes</span>
                </Link>
                <Link
                  href="/dashboard/admin/manageUsers"
                  onClick={() => setQuickActionsOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2 text-xs font-['Inter'] font-semibold text-foreground hover:bg-brand-500/10 hover:text-active transition-colors"
                >
                  <FaUsers className="w-3.5 h-3.5 text-active" />
                  <span>Member Directory</span>
                </Link>
                <Link
                  href="/"
                  onClick={() => setQuickActionsOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2 text-xs font-['Inter'] font-semibold text-foreground hover:bg-brand-500/10 hover:text-active transition-colors"
                >
                  <FaHome className="w-3.5 h-3.5 text-active" />
                  <span>Main Website</span>
                </Link>
              </div>
            )}
          </div>

          {/* Fullscreen Button */}
          <button
            onClick={toggleFullscreen}
            className="hidden sm:flex w-9 h-9 items-center justify-center rounded-xl bg-black/5 dark:bg-white/5 border border-brand-500/15 text-[#535C91] dark:text-[#9290C3] hover:text-active hover:border-active/40 transition-colors cursor-pointer"
            aria-label="Toggle Fullscreen"
          >
            {isFullscreen ? (
              <FaCompress className="w-3.5 h-3.5" />
            ) : (
              <FaExpand className="w-3.5 h-3.5" />
            )}
          </button>

          {/* Messages Icon */}
          <div className="relative">
            <button
              className="w-9 h-9 flex items-center justify-center rounded-xl bg-black/5 dark:bg-white/5 border border-brand-500/15 text-[#535C91] dark:text-[#9290C3] hover:text-active hover:border-active/40 transition-colors cursor-pointer"
              aria-label="Messages"
            >
              <FaEnvelope className="w-3.5 h-3.5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-active text-white text-[9px] font-bold rounded-full flex items-center justify-center shadow-xs">
                2
              </span>
            </button>
          </div>

          {/* Dark Mode Switch */}
          <DarkModeSwitch />

          {/* Notification Bell */}
          <div className="relative">
            <button
              className="w-9 h-9 flex items-center justify-center rounded-xl bg-black/5 dark:bg-white/5 border border-brand-500/15 text-[#535C91] dark:text-[#9290C3] hover:text-active hover:border-active/40 transition-colors cursor-pointer"
              aria-label="Notifications"
            >
              <FaBell className="w-3.5 h-3.5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-active text-white text-[9px] font-bold rounded-full flex items-center justify-center shadow-xs">
                4
              </span>
            </button>
          </div>

          {/* User Profile */}
          <div className="flex items-center gap-2 pl-1 sm:pl-2 border-l border-brand-500/15">
            {user?.image ? (
              <Image
                src={user.image}
                alt={user.name || "User"}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl object-cover border border-active/40"
                width={36}
                height={36}
              />
            ) : (
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-btn-bg/10 border border-active/30 flex items-center justify-center text-active">
                <FaUserCircle className="w-5 h-5" />
              </div>
            )}
            <div className="hidden xl:block text-left">
              <p className="font-['Outfit'] font-bold text-foreground text-xs leading-tight line-clamp-1">
                {user?.name || "Athlete"}
              </p>
              <p className="font-['Inter'] text-[10px] text-active font-semibold capitalize mt-0.5">
                {user?.role || "Member"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardNavBar;

