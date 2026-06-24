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
  FaTools,
  FaChartLine,
  FaIdCard,
  FaBuilding,
  FaCog,
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
      href: "/dashboard/trainer/forum-posts",
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
      href: "/dashboard/admin/trainers",
    },
    {
      name: "Manage Trainers",
      icon: MdOutlineManageAccounts,
      href: "/dashboard/admin/memberships",
    },
    {
      name: "Manage Classes",
      icon: SiGoogleclassroom,
      href: "/dashboard/admin/facilities",
    },
    {
      name: "Add Forum Post",
      icon: MdPostAdd,
      href: "/dashboard/admin/settings",
    },
    {
      name: "Transactions",
      icon: TbTransactionDollar,
      href: "/dashboard/admin/settings",
    },
    {
      name: "Forum Post Manage",
      icon: MdOutlineManageSearch,
      href: "/dashboard/admin/settings",
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
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg font-['Inter'] text-sm font-medium transition-all ${
                isActive(item.href)
                  ? "bg-[#CCFF00]/10 text-[#CCFF00] shadow-sm border border-[#CCFF00]/20"
                  : "text-[#94A3B8] hover:bg-[#1E293B] hover:text-[#E2E8F0]"
              }`}
            >
              <Icon className="w-5 h-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-[#1E293B]">
        <button
          onClick={onSignOut}
          className="flex items-center gap-3 w-full px-4 py-2.5 rounded-lg font-['Inter'] text-sm font-medium text-[#FF3366] hover:bg-[#FF3366]/10 transition-colors border border-transparent hover:border-[#FF3366]/20"
        >
          <FaSignOutAlt className="w-5 h-5" />
          Logout
        </button>
      </div>
    </>
  );

  return (
    <>
      <aside className="hidden md:flex md:flex-col md:w-64 bg-[#131826] border-r border-[#1E293B] h-screen sticky top-0 overflow-y-auto">
        <Link href="/">
          <div className="p-6 border-b border-[#1E293B] flex items-center gap-2">
            <div className="bg-[#CCFF00] p-1.5 rounded-md">
              <FaChartLine className="text-[#0B0F19] w-5 h-5" />
            </div>
            <h1 className="font-['Outfit'] text-2xl font-bold text-white tracking-wide">
              IronPulse
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
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-[#131826] z-50 flex flex-col
          transform transition-transform duration-300 ease-in-out md:hidden
          ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between p-4 border-b border-[#1E293B]">
          <Link href="/" onClick={onClose} className="flex items-center gap-2">
            <div className="bg-[#CCFF00] p-1.5 rounded-md">
              <FaChartLine className="text-[#0B0F19] w-4 h-4" />
            </div>
            <h1 className="font-['Outfit'] text-xl font-bold text-white tracking-wide">
              IronPulse
            </h1>
          </Link>

          <button
            onClick={onClose}
            className="text-[#94A3B8] hover:text-[#CCFF00] transition-colors"
          >
            <FaTimes size={22} />
          </button>
        </div>

        <NavLinks />
      </aside>
    </>
  );
}


export default DashboardSideBar;
