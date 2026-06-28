"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import {
    FaBook,
    FaChalkboardTeacher,
    FaChartLine,
    FaComments,
    FaHeart,
    FaHome,
    FaPlusCircle,
    FaSignOutAlt,
    FaTimes,
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

const navItemsByRole = {
  member: [
    { name: "Overview", icon: FaHome, href: "/dashboard/member" },
    { name: "Bookings", icon: FaBook, href: "/dashboard/member/bookings" },
    { name: "Favorites", icon: FaHeart, href: "/dashboard/member/favorites" },
    {
      name: "Apply as Trainer",
      icon: FaUserGraduate,
      href: "/dashboard/member/apply-trainer",
    },
  ],
  trainer: [
    { name: "Overview", icon: FaHome, href: "/dashboard/trainer" },
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
    {
      name: "Forum Posts",
      icon: FaComments,
      href: "/dashboard/trainer/forum-post",
    },
    {
      name: "My Forum Posts",
      icon: LuGalleryHorizontalEnd,
      href: "/dashboard/trainer/my-posts",
    },
  ],
  admin: [
    { name: "Overview", icon: FaChartLine, href: "/dashboard/admin" },
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
    {
      name: "Manage Classes",
      icon: SiGoogleclassroom,
      href: "/dashboard/admin/manageClasses",
    },
    {
      name: "Add Forum Post",
      icon: MdPostAdd,
      href: "/dashboard/admin/addForumPost",
    },
    {
      name: "Transactions",
      icon: TbTransactionDollar,
      href: "/dashboard/admin/transactions",
    },
    {
      name: "Forum Post Manage",
      icon: MdOutlineManageSearch,
      href: "/dashboard/admin/manageForumPosts",
    },
  ],
};
const DashboardSideBar = ({ isOpen, onClose }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { data } = authClient.useSession();
  const user = data?.user;
  const role = (user?.role || "member").toLowerCase();
  const navItems = navItemsByRole[role] || navItemsByRole.member;

  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  // Robust path matching strategy to avoid multiple links highlighting at once
  const isActive = (href) => {
    if (pathname === href) return true;
    // Prevent root paths matching every deep sub-route layout error
    if (href === "/dashboard/member" || href === "/dashboard/trainer" || href === "/dashboard/admin") {
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

  const navLinks = (
    <>
      <nav className="flex-1 px-3 py-6 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const currentlyActive = isActive(item.href);
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={onClose}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-sans text-sm font-semibold transition-all duration-200 group relative
                ${
                  currentlyActive
                    ? "bg-btn-bg/10 text-active shadow-xs border border-active/10"
                    : "text-[#535C91] dark:text-[#9290C3] hover:bg-brand-500/5 hover:text-foreground"
                }`}
            >
              {/* Dynamic decorative edge indicator bar */}
              {currentlyActive && (
                <span className="absolute left-0 top-3 bottom-3 w-0.5 rounded-r-md bg-active" />
              )}
              <Icon
                className={`w-5 h-5 shrink-0 transition-transform duration-200 group-hover:scale-105
                  ${currentlyActive ? "text-active" : "text-[#535C91]/80 dark:text-[#9290C3]/80"}`}
              />
              <span className="tracking-tight">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-brand-500/10 bg-black/1 dark:bg-white/1">
        <button
          onClick={onSignOut}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-xl font-sans text-sm font-bold text-rose-500 hover:bg-rose-500/15 transition-all duration-200 border border-transparent hover:border-rose-500/10 cursor-pointer uppercase tracking-wider"
        >
          <FaSignOutAlt className="w-4 h-4 shrink-0" />
          Logout Account
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* ========== DESKTOP ========== */}
      <aside className="hidden md:flex md:flex-col md:w-64 bg-white dark:bg-[#070F2B]/95 border-r border-brand-500/15 h-screen sticky top-0 overflow-y-auto transition-colors duration-300">
        <Link href="/">
          <div className="p-6 border-b border-brand-500/15 flex items-center gap-2.5 group">
            <div className="bg-btn-bg/10 p-2 rounded-xl group-hover:scale-105 transition-transform duration-300">
              <FaChartLine className="text-active w-4 h-4" />
            </div>
            <h1 className="font-['Outfit'] text-xl font-black text-foreground tracking-tight">
              Flex<span className="text-active">Pulse</span>
            </h1>
          </div>
        </Link>
        <div className="flex flex-col flex-1">{navLinks}</div>
      </aside>

      {/* ========== MOBILE ========== */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 md:hidden transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-[#070F2B]/95 z-50 flex flex-col border-r border-brand-500/15
          transform transition-transform duration-300 ease-in-out md:hidden shadow-2xl
          ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between p-4 border-b border-brand-500/15">
          <Link href="/" onClick={onClose} className="flex items-center gap-2.5">
            <div className="bg-btn-bg/10 p-1.5 rounded-lg">
              <FaChartLine className="text-active w-4 h-4" />
            </div>
            <h1 className="font-['Outfit'] text-lg font-black text-foreground tracking-tight">
              Flex<span className="text-active">Pulse</span>
            </h1>
          </Link>

          <button
            onClick={() => onClose(false)}
            className="w-8 h-8 flex items-center justify-center rounded-lg bg-black/5 dark:bg-white/5 text-[#535C91] dark:text-[#9290C3] hover:text-active transition-colors cursor-pointer"
          >
            <FaTimes size={16} />
          </button>
        </div>

        <div className="flex flex-col flex-1 overflow-y-auto">{navLinks}</div>
      </aside>
    </>
  );
};

export default DashboardSideBar;
