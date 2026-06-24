"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaBars, FaTimes, FaUserCircle, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { FiLogOut, FiGrid, FiEdit3, FiBookOpen, FiMessageSquare, FiSettings } from "react-icons/fi";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import DarkModeSwitch from "./DarkModeSwitch";

export default function Navbar() {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef(null);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
    setIsProfileOpen(false);
  }, [pathname]);

  // Click outside listener for profile dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (pathname.includes("dashboard")) {
    return null;
  }

  const isActive = (path) => pathname === path;

  const navItems = [
    { name: "Home", path: "/" },
    { name: "All Classes", path: "/all-classes" },
    { name: "Community Forum", path: "/forum" },
  ];

  if (user) {
    navItems.push({ name: "Dashboard", path: `/dashboard/${user?.role}` });
  }

  const onLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/auth/login");
        },
      },
    });
  };

  return (
    <nav className="bg-background/80 backdrop-blur-md border-b border-brand-500/30 shadow-sm sticky top-0 z-50 transition-colors duration-300">
      <div className="px-6 mx-auto sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo & Website Name */}
          <Link href="/" className="shrink-0 flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-[#9290C3] to-[#535C91] dark:from-[#1B1A55] dark:to-[#070F2B] flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300 border border-brand-500/20">

              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 text-active">
                <path d="M6 5H4v14h2V5zm14 0h-2v14h2V5zm-4 6H8v2h8v-2zm-1-4h-2v10h2V7zm-8 0H5v10h2V7z"/>
              </svg>
            </div>
            <span className="font-['Outfit'] text-2xl font-bold tracking-tight text-foreground group-hover:opacity-90 transition-opacity">
              Flex<span className="text-active">Pulse</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`font-['Inter'] text-sm font-medium transition-colors duration-200 ${
                  isActive(item.path)
                    ? "text-active border-b-2 border-active pb-1"
                    : "text-foreground hover:text-brand-300"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right side: Theme Toggle + Auth */}
          <div className="hidden md:flex items-center space-x-4">
            <DarkModeSwitch/>

            {user ? (
              <div className="relative" ref={dropdownRef}>
                {/* Profile Pill Trigger */}
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2.5 pl-1.5 pr-3.5 py-1.5 rounded-full bg-[#EBE9FE] dark:bg-[#1B1A55]/80 text-[#5e41de] dark:text-[#9290C3] font-medium text-sm transition-all hover:bg-[#DED9FD] dark:hover:bg-[#1B1A55] cursor-pointer border border-[#EBE9FE] dark:border-brand-500/20"
                >
                  {user.image ? (
                    <Image
                      src={user.image}
                      alt={user.name}
                      width={30}
                      height={30}
                      className="rounded-full object-cover border border-[#5e41de]/30"
                    />
                  ) : (
                    <FaUserCircle className="w-7.5 h-7.5 text-[#5e41de] dark:text-[#9290C3]" />
                  )}
                  <span className="font-['Inter'] font-semibold">
                    {user.name ? user.name.split(" ")[0] : "User"}
                  </span>
                  {isProfileOpen ? (
                    <FaChevronUp className="w-3.5 h-3.5 text-[#5e41de] dark:text-[#9290C3]" />
                  ) : (
                    <FaChevronDown className="w-3.5 h-3.5 text-[#5e41de] dark:text-[#9290C3]" />
                  )}
                </button>

                {/* Profile Dropdown Menu */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2.5 w-80 bg-white dark:bg-[#070F2B] border border-[#EBE9FE] dark:border-brand-500/30 rounded-[20px] shadow-xl z-50 overflow-hidden py-1 transition-all">
                    {/* User Info Container */}
                    <div className="bg-[#F3F0FF] dark:bg-[#1B1A55]/40 m-3 p-4 rounded-2xl flex items-center gap-3">
                      {user.image ? (
                        <Image
                          src={user.image}
                          alt={user.name}
                          width={52}
                          height={52}
                          className="rounded-full object-cover border border-[#5e41de]/20"
                        />
                      ) : (
                        <FaUserCircle className="w-13 h-13 text-[#5e41de] dark:text-[#9290C3]" />
                      )}
                      <div className="min-w-0 flex-1">
                        <p className="font-['Inter'] font-bold text-gray-900 dark:text-white text-base truncate">
                          {user.name}
                        </p>
                        <p className="font-['Inter'] text-xs text-[#535C91] dark:text-[#9290C3] truncate">
                          {user.email}
                        </p>
                      </div>
                    </div>

                    {/* Menu Options */}
                    <div className="px-2 pb-2 space-y-1">
                      <Link
                        href={`/dashboard/${user?.role}`}
                        className="flex items-center gap-3 w-full px-4 py-2.5 text-sm rounded-xl font-medium text-gray-700 dark:text-gray-200 hover:bg-[#F3F0FF] dark:hover:bg-[#1B1A55]/50 hover:text-[#5e41de] dark:hover:text-[#9290C3] transition-colors"
                      >
                        <FiGrid className="w-4 h-4" />
                        <span>Dashboard</span>
                      </Link>

                      <Link
                        href={`/dashboard/${user?.role}`}
                        className="flex items-center gap-3 w-full px-4 py-2.5 text-sm rounded-xl font-medium text-gray-700 dark:text-gray-200 hover:bg-[#F3F0FF] dark:hover:bg-[#1B1A55]/50 hover:text-[#5e41de] dark:hover:text-[#9290C3] transition-colors"
                      >
                        <FiEdit3 className="w-4 h-4" />
                        <span>Profile Management</span>
                      </Link>

                      <Link
                        href="#"
                        className="flex items-center gap-3 w-full px-4 py-2.5 text-sm rounded-xl font-medium text-gray-700 dark:text-gray-200 hover:bg-[#F3F0FF] dark:hover:bg-[#1B1A55]/50 hover:text-[#5e41de] dark:hover:text-[#9290C3] transition-colors"
                      >
                        <FiBookOpen className="w-4 h-4" />
                        <span>My Ideas</span>
                      </Link>

                      <Link
                        href="#"
                        className="flex items-center gap-3 w-full px-4 py-2.5 text-sm rounded-xl font-medium text-gray-700 dark:text-gray-200 hover:bg-[#F3F0FF] dark:hover:bg-[#1B1A55]/50 hover:text-[#5e41de] dark:hover:text-[#9290C3] transition-colors"
                      >
                        <FiMessageSquare className="w-4 h-4" />
                        <span>My Interactions</span>
                      </Link>

                      <Link
                        href="#"
                        className="flex items-center gap-3 w-full px-4 py-2.5 text-sm rounded-xl font-medium text-gray-700 dark:text-gray-200 hover:bg-[#F3F0FF] dark:hover:bg-[#1B1A55]/50 hover:text-[#5e41de] dark:hover:text-[#9290C3] transition-colors"
                      >
                        <FiSettings className="w-4 h-4" />
                        <span>Settings</span>
                      </Link>

                      <div className="border-t border-[#EBE9FE] dark:border-brand-800/40 my-2"></div>

                      <button
                        onClick={onLogout}
                        className="flex items-center gap-3 w-full px-4 py-2.5 text-sm rounded-xl font-semibold text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors cursor-pointer"
                      >
                        <FiLogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  href="/signin"
                  className="font-['Inter'] text-sm font-medium text-foreground hover:text-brand-300 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="font-['Inter'] text-sm font-bold bg-btn-bg text-btn-text px-6 py-2 rounded-full border border-brand-500/20 hover:opacity-90 transition-all duration-300"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <DarkModeSwitch />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground hover:text-brand-300 focus:outline-none"
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        } bg-background border-t border-brand-500/30`}
      >
        <div className="px-4 pt-2 pb-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`block font-['Inter'] text-sm font-medium py-2 px-3 rounded-lg transition-colors ${
                isActive(item.path)
                  ? "bg-brand-800 text-active"
                  : "text-foreground hover:bg-brand-500/20"
              }`}
            >
              {item.name}
            </Link>
          ))}
          <div className="border-t border-brand-500/30 pt-2 mt-2">
            {user ? (
              <div className="space-y-3">
                <div className="flex items-center space-x-3 px-3 py-2 bg-brand-800/40 rounded-xl">
                  {user.image ? (
                    <Image
                      src={user.image}
                      alt={user.name}
                      width={40}
                      height={40}
                      className="rounded-full object-cover border-2 border-brand-300"
                    />
                  ) : (
                    <FaUserCircle className="w-10 h-10 text-brand-300" />
                  )}
                  <div>
                    <p className="font-['Inter'] text-sm font-bold text-foreground">
                      {user.name}
                    </p>
                    <p className="font-['Inter'] text-xs text-brand-300 truncate max-w-50">
                      {user.email}
                    </p>
                  </div>
                </div>
                <div className="space-y-1 pl-2">
                  <Link
                    href={`/dashboard/${user?.role}`}
                    className="flex items-center space-x-2 py-2 px-3 rounded-lg text-foreground hover:bg-brand-500/20 text-sm font-medium"
                  >
                    <FiGrid className="w-4 h-4 text-brand-300" />
                    <span>Dashboard</span>
                  </Link>
                  <Link
                    href={`/dashboard/${user?.role}`}
                    className="flex items-center space-x-2 py-2 px-3 rounded-lg text-foreground hover:bg-brand-500/20 text-sm font-medium"
                  >
                    <FiEdit3 className="w-4 h-4 text-brand-300" />
                    <span>Profile Management</span>
                  </Link>
                  <button
                    onClick={onLogout}
                    className="flex items-center space-x-2 py-2 px-3 rounded-lg text-red-500 hover:bg-red-500/10 text-sm font-medium w-full text-left"
                  >
                    <FiLogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col space-y-2">
                <Link
                  href="/signin"
                  className="block font-['Inter'] text-sm font-medium py-2 px-3 rounded-lg text-foreground hover:bg-brand-500/20"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="block font-['Inter'] text-sm font-bold py-2 px-3 rounded-full bg-btn-bg text-btn-text text-center border border-brand-500/20"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
