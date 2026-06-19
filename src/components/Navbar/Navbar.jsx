"use client";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { FiEdit2, FiMessageSquare, FiZap } from "react-icons/fi";
import { IoHomeSharp } from "react-icons/io5";
import { MdTipsAndUpdates } from "react-icons/md";
import DarkModeSwitch from "./DarkModeSwitch";
import Hamburger from "./Hamburger";
import LogoWithAnimation from "./LogoWithAnimation";
import NavLink from "./NavLink";
import UserNavProfile from "./UserNavProfile";

const Navbar = () => {
  const { data: session, isPending } = authClient.useSession();
  const isLoggedIn = session?.user;

  const publicLinks = [
    { href: "/", label: "Home", icon: IoHomeSharp },
    { href: "/ideas", label: "Ideas", icon: MdTipsAndUpdates },
  ];

  const privateLinks = [
    { href: "/add-idea", label: "Add Idea", icon: FiEdit2, isPrimary: true },
    { href: "/my-ideas", label: "My Ideas", icon: FiZap },
    {
      href: "/my-interactions",
      label: "My Interactions",
      icon: FiMessageSquare,
    },
  ];

  const navLinks = isLoggedIn ? [...publicLinks, ...privateLinks] : publicLinks;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-[#5e41de]/15 dark:border-[#5e41de]/25 bg-white/85 dark:bg-zinc-950/85 backdrop-blur-md">
      <div className="mx-auto h-16 max-w-11/12 flex items-center justify-between">
        <div className="flex items-center md:gap-2.5 lg:gap-4">
          <Hamburger navLinks={navLinks} />
          <Link href="/" className="flex items-center">
            <LogoWithAnimation />
          </Link>
        </div>

        <ul className="hidden items-center gap-2 lg:flex">
          {navLinks.map((navItems, index) => (
            <NavLink key={index} navItems={navItems} />
          ))}
        </ul>

        <div className="flex items-center">
          <DarkModeSwitch />
          {isPending ? (
            <div className="h-9 w-9 animate-spin rounded-full border-2 border-[#5e41de]/25 border-t-[#5e41de]" />
          ) : (
            <UserNavProfile />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
