"use client";

import Image from "next/image";
import { useState } from "react";
import { FaBars, FaBell, FaSearch, FaUserCircle } from "react-icons/fa";
const DashboardNavBar = ({ user, onMenuToggle }) => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="sticky top-0 z-30 bg-[#0B0F19] border-b border-[#1E293B] px-4 py-3 transition-colors duration-300">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Mobile menu toggle + Search */}
        <div className="flex items-center gap-3 flex-1">
          {/* Hamburger – visible on mobile only */}
          <button
            onClick={onMenuToggle}
            className="md:hidden text-[#E2E8F0] hover:text-[#CCFF00] transition-colors"
            aria-label="Toggle sidebar"
          >
            <FaBars size={22} />
          </button>

          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="h-4 w-4 text-[#94A3B8]" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search members, transactions, or trainers..."
              className="w-full pl-9 pr-4 py-2 bg-[#131826] border border-[#1E293B] rounded-lg text-[#E2E8F0] placeholder-[#64748B] focus:outline-none focus:border-[#CCFF00] focus:ring-1 focus:ring-[#CCFF00] transition-all font-['Inter'] text-sm"
            />
          </div>
        </div>

        {/* Right: Notification + User Profile */}
        <div className="flex items-center gap-4 shrink-0">
          {/* Notification Bell */}
          <button
            className="relative text-[#94A3B8] hover:text-[#CCFF00] transition-colors"
            aria-label="Notifications"
          >
            <FaBell size={20} />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-[#FF3366] rounded-full"></span>
          </button>

          {/* User Profile */}
          <div className="flex items-center gap-3">
            {user?.image ? (
              <Image
                src={user.image}
                alt={user.name}
                className="w-9 h-9 rounded-full object-cover border-2 border-[#1E293B]"
                width={36}
                height={36}
              />
            ) : (
              <FaUserCircle className="w-9 h-9 text-[#CCFF00]" />
            )}
            <div className="hidden sm:block">
              <p className="font-['Inter'] font-semibold text-[#E2E8F0] text-sm leading-tight">
                {user?.name || "User"}
              </p>
              <p className="font-['Inter'] text-xs text-[#94A3B8] capitalize">
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
