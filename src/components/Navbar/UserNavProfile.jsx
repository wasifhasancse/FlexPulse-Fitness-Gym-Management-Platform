"use client";
import { authClient } from "@/lib/auth-client";
import { toast } from "@heroui/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  FiBookOpen,
  FiChevronDown,
  FiEdit3,
  FiLogIn,
  FiLogOut,
  FiMessageSquare,
  FiSettings,
} from "react-icons/fi";
import PrimaryButton from "../Button/PrimaryButton";
import Image from "next/image";

const menuItems = [
  { href: "/profile", label: "Profile Management", icon: FiEdit3 },
  { href: "/my-ideas", label: "My Ideas", icon: FiBookOpen },
  { href: "/my-interactions", label: "My Interactions", icon: FiMessageSquare },
  { href: "/settings", label: "Settings", icon: FiSettings },
];

const UserNavProfile = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const { data: userData, isPending } = authClient.useSession();
  const isSignedIn = Boolean(userData?.user);

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const manageSignOut = () => {
    toast.success("Signed out successfully, See you again!");
    authClient.signOut();
    setOpen(false);
  };

  if (isPending) {
    return (
      <span className="h-9 w-9 animate-spin rounded-full border-2 border-[#5e41de]/25 border-t-[#5e41de]" />
    );
  }

  if (!isSignedIn) {
    return (

      <PrimaryButton
        href={"/signin"}
        label={'Sign In'}
        icon={FiLogIn}
      />
    );
  }
   const isValidUrl = (str) => {
    try {
      return Boolean(new URL(str));
    } catch {
      return false;
    }
  };

  const hasValidImage = userData?.user?.image && isValidUrl(userData.user.image);

  return (
    <div className="relative" ref={ref}>
      <button
        className="nav-trigger"
        onClick={() => setOpen((opn) => !opn)}
        aria-haspopup="true"
        aria-expanded={open}
      >
        <span className="flex h-6.5 w-6.5 shrink-0 items-center overflow-hidden justify-center rounded-full bg-[#5e41de] text-white">
          <Image
              src={hasValidImage ? userData.user.image : `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4c3P-1qi-E7qxQrjuVwO23CvnE5EW9Q97zw&s`}
              alt={userData?.user?.name || "User Avatar"}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
              height={200}
              width={200}
            />
        </span>
        <span className="hidden md:flex max-w-27.5 overflow-hidden text-ellipsis whitespace-nowrap text-sm font-semibold text-[#5e41de] dark:text-[#a78bfa]">
          {`${(userData?.user?.name).split(" ")[0]}` || "My Account"}
        </span>
        <FiChevronDown
          size={14}
          className="shrink-0 text-[#5e41de] transition-transform duration-200 dark:text-[#a78bfa]"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>

      <div
        className={`nav-panel min-w-56 border border-[#5e41de]/15 bg-white shadow-xl shadow-[#5e41de]/12 dark:border-[#5e41de]/25 dark:bg-zinc-900 dark:shadow-[#5e41de]/25 ${open ? "open" : ""}`}
        role="menu"
      >
        <div className="mb-1 flex items-center gap-3 rounded-xl bg-[#5e41de]/8 px-3 py-3 dark:bg-[#5e41de]/15">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full overflow-hidden bg-linear-to-br from-[#5e41de] to-[#a78bfa] text-sm font-bold text-white shadow-sm shadow-[#5e41de]/30">
            <Image
              src={hasValidImage ? userData.user.image : `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4c3P-1qi-E7qxQrjuVwO23CvnE5EW9Q97zw&s`}
              alt={userData?.user?.name || "User Avatar"}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
              height={200}
              width={200}
            />
          </div>
          <div className="min-w-0">
            <p className="truncate text-[13px] font-bold text-zinc-800 dark:text-zinc-100">
              {userData?.user?.name || "User"}
            </p>
            <p className="truncate text-[11px] text-zinc-400 dark:text-zinc-500">
              {userData?.user?.email || "user@example.com"}
            </p>
          </div>
        </div>

        <div className="mx-1.5 my-1 h-px bg-[#5e41de]/10 dark:bg-[#5e41de]/20" />

        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="nav-menu-item"
            onClick={() => setOpen(false)}
            role="menuitem"
          >
            <item.icon className="nav-item-icon h-3.75 w-3.75 shrink-0" />
            <span>{item.label}</span>
          </Link>
        ))}

        <div className="mx-1.5 my-1 h-px bg-[#5e41de]/10 dark:bg-[#5e41de]/20" />

        <button
          className="nav-menu-item nav-menu-logout"
          role="menuitem"
          onClick={manageSignOut}
        >
          <FiLogOut className="nav-item-icon h-3.75 w-3.75 shrink-0" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default UserNavProfile;
