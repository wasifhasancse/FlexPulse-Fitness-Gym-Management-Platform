"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import {
  FaHome,
  FaBook,
  FaHeart,
  FaUserGraduate,
  FaSignOutAlt,
  FaTimes,
  FaChalkboardTeacher,
  FaPlusCircle,
  FaComments,
  FaChartLine,
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
  }, [pathname]);

  const isActive = (href) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  };

  const onSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => router.push("/"),
      },
    });
  };

  const NavLinks = () => (
    <>
      <nav className="flex-1 px-4 py-6 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={onClose}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl font-sans text-sm font-semibold transition-all ${
                isActive(item.href)
                  ? "bg-btn-bg/15 text-active shadow-sm border border-active/20"
                  : "text-[#535C91] dark:text-[#9290C3] hover:bg-brand-500/10 hover:text-foreground"
              }`}
            >
              <Icon className="w-5 h-5 shrink-0" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-brand-500/15">
        <button
          onClick={onSignOut}
          className="flex items-center gap-3 w-full px-4 py-2.5 rounded-xl font-sans text-sm font-semibold text-rose-500 hover:bg-rose-500/10 transition-colors border border-transparent hover:border-rose-500/20 cursor-pointer"
        >
          <FaSignOutAlt className="w-5 h-5 shrink-0" />
          Logout
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* ========== DESKTOP ========== */}
      <aside className="hidden md:flex md:flex-col md:w-64 bg-white dark:bg-[#070F2B]/95 border-r border-brand-500/20 h-screen sticky top-0 overflow-y-auto transition-colors duration-300">
        <Link href="/">
          <div className="p-6 border-b border-brand-500/25 flex items-center gap-2 group">
            <div className="bg-btn-bg/10 p-1.5 rounded-lg group-hover:scale-105 transition-transform">
              <FaChartLine className="text-active w-5 h-5" />
            </div>
            <h1 className="font-['Outfit'] text-2xl font-bold text-foreground tracking-wide">
              Flex<span className="text-active">Pulse</span>
            </h1>
          </div>
        </Link>
        <div className="flex flex-col flex-1">
          <NavLinks />
        </div>
      </aside>

      {/* ========== MOBILE ========== */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-[#070F2B]/95 z-50 flex flex-col border-r border-brand-500/20
          transform transition-transform duration-300 ease-in-out md:hidden
          ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between p-4 border-b border-brand-500/25">
          <Link href="/" onClick={onClose} className="flex items-center gap-2">
            <div className="bg-btn-bg/10 p-1.5 rounded-lg">
              <FaChartLine className="text-active w-4 h-4" />
            </div>
            <h1 className="font-['Outfit'] text-xl font-bold text-foreground tracking-wide">
              Flex<span className="text-active">Pulse</span>
            </h1>
          </Link>

          <button
            onClick={onClose}
            className="text-[#535C91] dark:text-[#9290C3] hover:text-active transition-colors cursor-pointer"
          >
            <FaTimes size={22} />
          </button>
        </div>

        <NavLinks />
      </aside>
    </>
  );
};

export default DashboardSideBar;
