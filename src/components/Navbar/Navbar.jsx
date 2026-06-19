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
    <nav className="sticky top-0 z-50 w-full border-b border-[#4382DF]/20 bg-white/95 dark:border-[#4647AE]/25 dark:bg-[#112E81]/90 backdrop-blur-xl">
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
            <div className="h-9 w-9 animate-spin rounded-full border-2 border-[#4382DF]/25 border-t-[#4382DF] dark:border-[#AACCD6]/25 dark:border-t-[#AACCD6]" />
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
                className="inline-flex items-center gap-2 rounded-xl border border-[#4382DF]/40 bg-[#4382DF]/8 dark:border-[#4647AE]/50 dark:bg-[#4647AE]/15 px-4 py-2.5 text-sm font-semibold text-[#112E81] dark:text-[#AACCD6] transition hover:border-[#4382DF]/60 dark:hover:border-[#AACCD6]/60"
              >
                <FiLogIn className="h-4 w-4" />
                Login
              </Link>
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 rounded-xl bg-[#4382DF] dark:bg-[#AACCD6] px-4 py-2.5 text-sm font-bold text-white dark:text-[#112E81] shadow-[0_10px_28px_-10px_rgba(67,130,223,.85)] dark:shadow-none transition hover:bg-[#4647AE] dark:hover:bg-white"
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
