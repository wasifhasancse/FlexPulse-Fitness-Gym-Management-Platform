"use client";

import Image from "next/image";
import { useState } from "react";
import { FaBars, FaBell, FaSearch, FaUserCircle } from "react-icons/fa";
import DarkModeSwitch from "../Navbar/DarkModeSwitch";

const DashboardNavBar = ({ user, onMenuToggle }) => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-brand-500/20 px-6 py-3 transition-all duration-300 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Mobile menu toggle + Search */}
        <div className="flex items-center gap-3 flex-1">
          {/* Hamburger – visible on mobile only */}
          <button
            onClick={onMenuToggle}
            className="md:hidden text-foreground hover:text-active transition-colors cursor-pointer"
            aria-label="Toggle sidebar"
          >
            <FaBars size={22} />
          </button>

          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <FaSearch className="h-3.5 w-3.5 text-[#535C91] dark:text-[#9290C3]" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search members, transactions, or trainers..."
              className="w-full pl-9 pr-4 py-2 bg-brand-500/5 dark:bg-brand-800/40 border border-brand-500/20 dark:border-brand-500/30 rounded-xl text-foreground placeholder-[#535C91]/60 dark:placeholder-[#9290C3]/60 focus:outline-none focus:border-active focus:ring-1 focus:ring-active transition-all font-sans text-sm shadow-inner"
            />
          </div>
        </div>

        {/* Right: Notification + User Profile */}
        <div className="flex items-center gap-5 shrink-0">
          <DarkModeSwitch/>
          {/* Notification Bell */}
          <button
            className="relative text-[#535C91] dark:text-[#9290C3] hover:text-active transition-colors cursor-pointer"
            aria-label="Notifications"
          >
            <FaBell size={20} />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-rose-500 rounded-full"></span>
          </button>

          {/* User Profile */}
          <div className="flex items-center gap-3">
            {user?.image ? (
              <Image
                src={user.image}
                alt={user.name}
                className="w-9 h-9 rounded-full object-cover border border-brand-500/20"
                width={36}
                height={36}
              />
            ) : (
              <FaUserCircle className="w-9 h-9 text-active" />
            )}
            <div className="hidden sm:block">
              <p className="font-sans font-bold text-foreground text-sm leading-tight">
                {user?.name || "User"}
              </p>
              <p className="font-sans text-xs text-[#535C91] dark:text-[#9290C3] capitalize mt-0.5">
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
