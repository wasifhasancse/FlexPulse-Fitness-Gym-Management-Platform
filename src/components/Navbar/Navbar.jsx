"use client";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { FiGrid, FiLogIn, FiLogOut, FiUserPlus } from "react-icons/fi";
import { IoHomeSharp } from "react-icons/io5";
import { PiChatsFill } from "react-icons/pi";
import { SiGoogleclassroom } from "react-icons/si";
import DarkModeSwitch from "./DarkModeSwitch";
import Hamburger from "./Hamburger";
import LogoWithAnimation from "./LogoWithAnimation";
import NavLink from "./NavLink";
import UserNavProfile from "./UserNavProfile";

const getDashboardPath = (role) => {
  const normalizedRole = role?.toLowerCase?.();

  if (normalizedRole === "admin") {
    return "/dashboard/admin";
  }
  if (normalizedRole === "trainer") {
    return "/dashboard/trainer";
  }
  if (normalizedRole === "user" || normalizedRole === "member") {
    return "/dashboard/user";
  }
  return "/dashboard";
};

const Navbar = () => {
  const { data: session, isPending } = authClient.useSession();
  const isLoggedIn = Boolean(session?.user);
  const dashboardPath = getDashboardPath(session?.user?.role);

  const publicLinks = [
    { href: "/", label: "Home", icon: IoHomeSharp },
    { href: "/all-classes", label: "All Classes", icon: SiGoogleclassroom },
    { href: "/community-forum", label: "Community Forum", icon: PiChatsFill },
  ];

  const navLinks = isLoggedIn
    ? [
        ...publicLinks,
        { href: dashboardPath, label: "Dashboard", icon: FiGrid },
      ]
    : publicLinks;

  const handleSignOut = () => {
    authClient.signOut();
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-[#30475E]/12 bg-[#DDDDDD]/90 dark:border-white/10 dark:bg-[#222831]/92 backdrop-blur-xl">
      <div className="mx-auto flex h-20 w-full max-w-[min(92%,1280px)] items-center justify-between gap-3">
        <div className="flex items-center gap-2 md:gap-3">
          <Hamburger
            navLinks={navLinks}
            isAuthenticated={isLoggedIn}
            onLogout={handleSignOut}
          />
          <Link href="/" className="flex items-center">
            <LogoWithAnimation />
          </Link>
        </div>

        <ul className="hidden items-center gap-1.5 lg:flex">
          {navLinks.map((navItems, index) => (
            <NavLink key={index} navItems={navItems} />
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <DarkModeSwitch />

          {isPending ? (
            <div className="h-9 w-9 animate-spin rounded-full border-2 border-[#30475E]/20 border-t-[#F05454] dark:border-[#DDDDDD]/15 dark:border-t-[#F05454]" />
          ) : isLoggedIn ? (
            <>
              <button
                type="button"
                onClick={handleSignOut}
                className="hidden items-center gap-2 rounded-xl border border-rose-300/35 bg-rose-400/10 dark:border-rose-400/40 px-3.5 py-2 text-sm font-semibold text-rose-600 dark:text-rose-300 transition hover:bg-rose-400/20 dark:hover:bg-rose-400/20 xl:inline-flex"
              >
                <FiLogOut className="h-4 w-4" />
                Logout
              </button>
              <UserNavProfile dashboardHref={dashboardPath} />
            </>
          ) : (
            <div className="hidden items-center gap-2 md:flex">
              <Link
                href="/signin"
                className="inline-flex items-center gap-2 rounded-xl border border-[#30475E]/15 bg-white/70 px-4 py-2.5 text-sm font-semibold text-[#30475E] transition hover:-translate-y-0.5 hover:border-[#F05454]/35 hover:text-[#F05454] dark:border-white/10 dark:bg-[#30475E]/35 dark:text-[#DDDDDD] dark:hover:border-[#F05454]/35 dark:hover:text-[#F05454]"
              >
                <FiLogIn className="h-4 w-4" />
                Login
              </Link>
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 rounded-xl bg-[#F05454] px-4 py-2.5 text-sm font-bold text-white shadow-[0_12px_30px_-14px_rgba(240,84,84,.85)] transition hover:-translate-y-0.5 hover:bg-[#222831] dark:hover:bg-[#30475E]"
              >
                <FiUserPlus className="h-4 w-4" />
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
