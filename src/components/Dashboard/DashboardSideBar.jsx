"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  FaBook,
  FaChalkboardTeacher,
  FaChartLine,
  FaComments,
  FaDumbbell,
  FaHeart,
  FaHome,
  FaPlusCircle,
  FaQuoteRight,
  FaSignOutAlt,
  FaTimes,
  FaUserCircle,
  FaUserGraduate,
  FaUsers,
} from "react-icons/fa";
import { LuFileUser, LuGalleryHorizontalEnd } from "react-icons/lu";
import {
  MdOutlineManageAccounts,
  MdOutlineManageSearch,
  MdPostAdd,
} from "react-icons/md";
import { SiGoogleclassroom } from "react-icons/si";
import { TbTransactionDollar } from "react-icons/tb";

const categorizedNavItems = {
  admin: [
    {
      category: "MAIN",
      items: [
        { name: "Overview", icon: FaChartLine, href: "/dashboard/admin" },
      ],
    },
    {
      category: "MEMBERS & TRAINERS",
      items: [
        {
          name: "Manage Users",
          icon: FaUsers,
          href: "/dashboard/admin/manageUsers",
        },
        {
          name: "Applied Trainers",
          icon: LuFileUser,
          href: "/dashboard/admin/manageTrainerApplication",
        },
        {
          name: "Manage Trainers",
          icon: MdOutlineManageAccounts,
          href: "/dashboard/admin/manageTrainers",
        },
      ],
    },
    {
      category: "FITNESS & ACADEMY",
      items: [
        {
          name: "Manage Classes",
          icon: SiGoogleclassroom,
          href: "/dashboard/admin/manageClasses",
        },
      ],
    },
    {
      category: "COMMUNITY & CONTENT",
      items: [
        {
          name: "Manage Forum",
          icon: MdOutlineManageSearch,
          href: "/dashboard/admin/manageForumPosts",
        },
        {
          name: "Manage Testimonials",
          icon: FaQuoteRight,
          href: "/dashboard/admin/testimonials",
        },
      ],
    },
    {
      category: "FINANCIALS",
      items: [
        {
          name: "Transactions",
          icon: TbTransactionDollar,
          href: "/dashboard/admin/transactions",
        },
      ],
    },
  ],
  trainer: [
    {
      category: "MAIN",
      items: [
        { name: "Overview", icon: FaChartLine, href: "/dashboard/trainer" },
      ],
    },
    {
      category: "FITNESS & SESSIONS",
      items: [
        {
          name: "My Classes",
          icon: FaChalkboardTeacher,
          href: "/dashboard/trainer/my-classes",
        },
        {
          name: "Add Class",
          icon: FaPlusCircle,
          href: "/dashboard/trainer/add-class",
        },
      ],
    },
    {
      category: "COMMUNITY & FORUM",
      items: [
        {
          name: "Forum Posts & Moderation",
          icon: LuGalleryHorizontalEnd,
          href: "/dashboard/trainer/my-posts",
        },
        {
          name: "Review Testimonials",
          icon: FaQuoteRight,
          href: "/dashboard/trainer/testimonials",
        },
      ],
    },
  ],
  member: [
    {
      category: "MAIN",
      items: [
        { name: "Overview", icon: FaHome, href: "/dashboard/member" },
      ],
    },
    {
      category: "FITNESS & WORKOUTS",
      items: [
        { name: "Bookings", icon: FaBook, href: "/dashboard/member/bookings" },
        { name: "Favorites", icon: FaHeart, href: "/dashboard/member/favorites" },
      ],
    },
    {
      category: "COMMUNITY & VOICES",
      items: [
        {
          name: "My Community Posts",
          icon: FaComments,
          href: "/dashboard/member/forum",
        },
        {
          name: "My Testimonials",
          icon: FaQuoteRight,
          href: "/dashboard/member/testimonials",
        },
      ],
    },
    {
      category: "CAREER & PROGRESS",
      items: [
        {
          name: "Apply as Trainer",
          icon: FaUserGraduate,
          href: "/dashboard/member/apply-trainer",
        },
      ],
    },
  ],
};

const DashboardSideBar = ({ isOpen, onClose }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { data } = authClient.useSession();
  const user = data?.user;
  const role = (user?.role || "member").toLowerCase();
  const sections =
    categorizedNavItems[role] || categorizedNavItems.member;

  useEffect(() => {
    onClose(false);
  }, [pathname, onClose]);

  const isActive = (href) => {
    if (pathname === href) return true;
    if (
      href === "/dashboard/member" ||
      href === "/dashboard/trainer" ||
      href === "/dashboard/admin"
    ) {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  const onSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => router.push("/"),
      },
    });
  };

  const navContent = (
    <div className="flex flex-col h-full justify-between">
      {/* Scrollable Navigation Links */}
      <nav className="flex-1 px-3 py-4 space-y-5 overflow-y-auto custom-scrollbar">
        {sections.map((section, idx) => (
          <div key={idx} className="space-y-1">
            <p className="px-3 text-[10px] font-extrabold uppercase tracking-wider text-[#535C91]/80 dark:text-[#9290C3]/70 font-['Outfit']">
              {section.category}
            </p>
            <div className="space-y-1 mt-1.5">
              {section.items.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => onClose(false)}
                    className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-['Inter'] text-xs sm:text-sm font-semibold transition-all duration-200 group relative
                      ${
                        active
                          ? "bg-active/10 text-active border border-active/20 font-bold"
                          : "text-[#535C91] dark:text-[#9290C3] hover:bg-black/5 dark:hover:bg-white/5 hover:text-foreground"
                      }`}
                  >
                    {active && (
                      <span className="absolute left-0 top-2 bottom-2 w-1 rounded-r-md bg-active" />
                    )}
                    <Icon
                      className={`w-4 h-4 shrink-0 transition-transform duration-200 group-hover:scale-110
                        ${active ? "text-active" : "text-[#535C91] dark:text-[#9290C3]"}`}
                    />
                    <span className="tracking-tight truncate">{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* User Profile Card at Sidebar Bottom matching Dreams GYM */}
      <div className="p-3 border-t border-brand-500/15 bg-black/2 dark:bg-white/2">
        <div className="flex items-center justify-between p-2 rounded-xl bg-black/5 dark:bg-white/5 border border-brand-500/10">
          <div className="flex items-center gap-2.5 min-w-0">
            {user?.image ? (
              <Image
                src={user.image}
                alt={user.name || "User"}
                width={36}
                height={36}
                className="w-9 h-9 rounded-xl object-cover border border-active/30 shrink-0"
              />
            ) : (
              <div className="w-9 h-9 rounded-xl bg-btn-bg/10 border border-active/20 flex items-center justify-center text-active shrink-0">
                <FaUserCircle className="w-5 h-5" />
              </div>
            )}
            <div className="min-w-0">
              <p className="font-['Outfit'] font-bold text-foreground text-xs leading-tight truncate">
                {user?.name || "Athlete"}
              </p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <p className="font-['Inter'] text-[10px] text-active font-semibold capitalize truncate">
                  {role === "admin" ? "Super Admin" : role}
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={onSignOut}
            title="Log out"
            aria-label="Log out"
            className="p-2 rounded-lg text-[#535C91] dark:text-[#9290C3] hover:text-rose-500 hover:bg-rose-500/10 transition-colors cursor-pointer shrink-0"
          >
            <FaSignOutAlt className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* ========== DESKTOP SIDEBAR ========== */}
      <aside className="hidden md:flex md:flex-col md:w-64 bg-white dark:bg-[#070F2B] border-r border-brand-500/15 h-screen sticky top-0 transition-colors duration-300 z-40">
        {/* Sidebar Brand Header */}
        <div className="p-4 border-b border-brand-500/15 flex items-center justify-between gap-2">
          <Link href="/" className="flex items-center gap-2.5 min-w-0 group">
            {/* Athletic Emblem matching Navbar */}
            <div className="relative w-10 h-10 rounded-xl bg-linear-to-br from-[#1B1A55] to-[#070F2B] p-0.5 shadow-sm group-hover:scale-105 transition-transform duration-300 border border-active/40 flex items-center justify-center overflow-hidden shrink-0">
              <div className="absolute inset-0 bg-linear-to-tr from-active/30 via-transparent to-active/10 opacity-70" />
              <svg
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 relative z-10"
              >
                <defs>
                  <linearGradient id="fpLogoGradSidebar" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ff2a55" />
                    <stop offset="100%" stopColor="#ff0336" />
                  </linearGradient>
                </defs>
                <rect x="3" y="10" width="3" height="12" rx="1.5" fill="url(#fpLogoGradSidebar)" />
                <rect x="7" y="12" width="2.5" height="8" rx="1.2" fill="url(#fpLogoGradSidebar)" opacity="0.85" />
                <rect x="26" y="10" width="3" height="12" rx="1.5" fill="url(#fpLogoGradSidebar)" />
                <rect x="22.5" y="12" width="2.5" height="8" rx="1.2" fill="url(#fpLogoGradSidebar)" opacity="0.85" />
                <path
                  d="M9.5 16H12.5L14.5 10.5L17.5 21.5L19.5 16H22.5"
                  stroke="url(#fpLogoGradSidebar)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="16" cy="16" r="1.5" fill="#ffffff" />
              </svg>
            </div>
            <div className="min-w-0">
              <span className="font-['Outfit'] text-lg font-black tracking-tight text-foreground flex items-center leading-none">
                FLEX<span className="text-active tracking-normal">PULSE</span>
              </span>
              <span className="font-['Inter'] text-[8px] tracking-[0.2em] uppercase font-bold text-[#535C91] dark:text-[#9290C3]/75 block mt-1">
                Athletic Club
              </span>
            </div>
          </Link>

          {/* User Role Badge instead of PRO badge */}
          <span className="px-2 py-0.5 text-[9px] font-black uppercase tracking-wider rounded-md bg-active/10 text-active border border-active/20 font-['Outfit'] shrink-0">
            {role === "admin" ? "Admin" : role === "trainer" ? "Trainer" : "Member"}
          </span>
        </div>

        {/* Navigation Content */}
        <div className="flex-1 min-h-0">{navContent}</div>
      </aside>

      {/* ========== MOBILE OVERLAY & DRAWER ========== */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 md:hidden transition-opacity duration-300"
          onClick={() => onClose(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-[#070F2B] z-50 flex flex-col border-r border-brand-500/15
          transform transition-transform duration-300 ease-in-out md:hidden shadow-md
          ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between p-4 border-b border-brand-500/15">
          <Link
            href="/"
            onClick={() => onClose(false)}
            className="flex items-center gap-2.5 min-w-0"
          >
            <div className="relative w-8 h-8 rounded-xl bg-linear-to-br from-[#1B1A55] to-[#070F2B] p-0.5 border border-active/40 flex items-center justify-center overflow-hidden shrink-0">
              <svg
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 relative z-10"
              >
                <rect x="3" y="10" width="3" height="12" rx="1.5" fill="#ff2a55" />
                <rect x="7" y="12" width="2.5" height="8" rx="1.2" fill="#ff2a55" opacity="0.85" />
                <rect x="26" y="10" width="3" height="12" rx="1.5" fill="#ff2a55" />
                <rect x="22.5" y="12" width="2.5" height="8" rx="1.2" fill="#ff2a55" opacity="0.85" />
                <path
                  d="M9.5 16H12.5L14.5 10.5L17.5 21.5L19.5 16H22.5"
                  stroke="#ff2a55"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="16" cy="16" r="1.5" fill="#ffffff" />
              </svg>
            </div>
            <div>
              <span className="font-['Outfit'] text-base font-black tracking-tight text-foreground flex items-center leading-none">
                FLEX<span className="text-active tracking-normal">PULSE</span>
              </span>
              <span className="font-['Inter'] text-[8px] tracking-[0.2em] uppercase font-bold text-[#535C91] dark:text-[#9290C3]/75 block mt-0.5">
                Athletic Club
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-2 shrink-0">
            <span className="px-2 py-0.5 text-[9px] font-black uppercase tracking-wider rounded-md bg-active/10 text-active border border-active/20 font-['Outfit']">
              {role === "admin" ? "Admin" : role === "trainer" ? "Trainer" : "Member"}
            </span>
            <button
              onClick={() => onClose(false)}
              className="w-8 h-8 flex items-center justify-center rounded-lg bg-black/5 dark:bg-white/5 text-[#535C91] dark:text-[#9290C3] hover:text-active transition-colors cursor-pointer"
            >
              <FaTimes size={16} />
            </button>
          </div>
        </div>

        <div className="flex-1 min-h-0">{navContent}</div>
      </aside>
    </>
  );
};

export default DashboardSideBar;

