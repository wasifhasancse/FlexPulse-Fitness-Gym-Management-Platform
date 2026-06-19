"use client";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FiChevronDown, FiGrid, FiLogOut, FiUser } from "react-icons/fi";

const UserNavProfile = ({ dashboardHref = "/dashboard" }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const { data: userData, isPending } = authClient.useSession();
  const user = userData?.user;
  const isSignedIn = Boolean(user);

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
    authClient.signOut();
    setOpen(false);
  };

  if (isPending) {
    return (
      <span className="h-9 w-9 animate-spin rounded-full border-2 border-[#30475E]/20 border-t-[#F05454] dark:border-[#DDDDDD]/15 dark:border-t-[#F05454]" />
    );
  }

  if (!isSignedIn) {
    return null;
  }

  const isValidUrl = (str) => {
    try {
      return Boolean(new URL(str));
    } catch {
      return false;
    }
  };

  const hasValidImage = user?.image && isValidUrl(user.image);
  const firstName = user?.name?.split(" ")?.[0] || "Athlete";
  const imageSource = hasValidImage
    ? user.image
    : "https://img.icons8.com/color/1200/user.jpg";

  return (
    <div className="relative" ref={ref}>
      <button
        className="inline-flex items-center gap-2.5 rounded-xl border border-[#30475E]/15 bg-white/70 px-2 py-1.5 text-[#222831] transition hover:-translate-y-0.5 hover:border-[#F05454]/35 dark:border-white/10 dark:bg-[#30475E]/35 dark:text-zinc-100 dark:hover:border-[#F05454]/35"
        onClick={() => setOpen((opn) => !opn)}
        aria-haspopup="true"
        aria-expanded={open}
      >
        <span className="flex h-8 w-8 shrink-0 items-center overflow-hidden justify-center rounded-full border border-[#30475E]/15 bg-[#DDDDDD] dark:border-white/10 dark:bg-[#222831] text-white">
          <Image
            src={imageSource}
            alt={user?.name || "User Avatar"}
            className="h-full w-full object-cover"
            height={200}
            width={200}
          />
        </span>
        <span className="hidden max-w-24 overflow-hidden text-ellipsis whitespace-nowrap text-sm font-semibold text-[#222831] dark:text-zinc-100 md:flex">
          {firstName}
        </span>
        <FiChevronDown
          size={16}
          className="shrink-0 text-[#30475E] dark:text-zinc-300 transition-transform duration-200"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>

      <div
        className={`absolute right-0 top-13 min-w-64 rounded-2xl border border-[#30475E]/12 bg-[#DDDDDD]/95 p-2.5 text-[#222831] shadow-2xl shadow-[#222831]/10 backdrop-blur-md transition-all duration-200 dark:border-white/10 dark:bg-[#222831]/96 dark:text-zinc-100 dark:shadow-black/45 ${
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0"
        }`}
        role="menu"
      >
        <div className="mb-2 flex items-center gap-3 rounded-xl border border-[#30475E]/10 bg-white/60 px-3 py-3 dark:border-white/10 dark:bg-white/5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#30475E]/10 bg-[#DDDDDD] dark:border-white/10 dark:bg-[#30475E] text-sm font-bold text-white">
            <Image
              src={imageSource}
              alt={user?.name || "User Avatar"}
              className="h-full w-full object-cover"
              height={200}
              width={200}
            />
          </div>
          <div className="min-w-0">
            <p className="truncate text-[13px] font-bold text-[#222831] dark:text-zinc-100">
              {user?.name || "User"}
            </p>
            <p className="truncate text-[11px] text-[#30475E] dark:text-zinc-400">
              {user?.email || "user@example.com"}
            </p>
          </div>
        </div>

        <Link
          href="/profile"
          className="inline-flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold text-[#30475E] transition hover:translate-x-1 hover:bg-white/65 hover:text-[#F05454] dark:text-zinc-200 dark:hover:bg-white/5 dark:hover:text-[#F05454]"
          onClick={() => setOpen(false)}
          role="menuitem"
        >
          <FiUser className="h-4 w-4" />
          Profile
        </Link>

        <Link
          href={dashboardHref}
          className="inline-flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold text-[#30475E] transition hover:translate-x-1 hover:bg-white/65 hover:text-[#F05454] dark:text-zinc-200 dark:hover:bg-white/5 dark:hover:text-[#F05454]"
          onClick={() => setOpen(false)}
          role="menuitem"
        >
          <FiGrid className="h-4 w-4" />
          Dashboard
        </Link>

        <div className="mx-1.5 my-1.5 h-px bg-[#30475E]/10 dark:bg-white/10" />

        <button
          className="inline-flex w-full items-center gap-2 rounded-xl border border-rose-300/30 bg-rose-400/10 dark:border-rose-400/40 px-3 py-2.5 text-left text-sm font-semibold text-rose-600 dark:text-rose-300 transition hover:bg-rose-400/20 dark:hover:bg-rose-400/20"
          role="menuitem"
          onClick={manageSignOut}
        >
          <FiLogOut className="h-4 w-4 shrink-0" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default UserNavProfile;
