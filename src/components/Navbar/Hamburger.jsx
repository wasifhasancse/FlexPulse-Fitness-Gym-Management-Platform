"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FiLogIn, FiLogOut, FiUserPlus } from "react-icons/fi";

const Hamburger = ({ navLinks, isAuthenticated, onLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const pathname = usePathname();

  return (
    <div className="relative lg:hidden" ref={ref}>
      <button
        type="button"
        className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#4382DF]/30 bg-[#4382DF]/10 text-[#112E81] dark:border-[#4647AE]/40 dark:bg-[#4647AE]/15 dark:text-[#AACCD6] transition hover:border-[#4382DF]/60 dark:hover:border-[#AACCD6]/60"
        aria-label="Toggle navigation menu"
        onClick={() => setMenuOpen((prev) => !prev)}
      >
        <span className="sr-only">Toggle menu</span>
        <div className="space-y-1.5">
          <span
            className={`block h-0.5 w-5 rounded bg-current transition-transform ${menuOpen ? "translate-y-2 rotate-45" : ""}`}
          />
          <span
            className={`block h-0.5 w-5 rounded bg-current transition-opacity ${menuOpen ? "opacity-0" : "opacity-100"}`}
          />
          <span
            className={`block h-0.5 w-5 rounded bg-current transition-transform ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </div>
      </button>

      <div
        className={`absolute right-0 top-13 min-w-72 overflow-hidden rounded-2xl border border-[#4382DF]/25 bg-white/90 dark:border-[#4647AE]/30 dark:bg-[#112E81]/95 p-2 text-[#112E81] dark:text-zinc-100 shadow-2xl shadow-[#4382DF]/20 dark:shadow-[#000814]/55 backdrop-blur-md transition-all duration-200 ${
          menuOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0"
        }`}
        role="menu"
      >
        <div className="flex flex-col gap-1">
          {navLinks.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={`inline-flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
                pathname === item.href
                  ? "bg-[#4382DF] text-white dark:bg-[#AACCD6] dark:text-[#112E81]"
                  : "text-[#112E81] dark:text-zinc-200 hover:bg-[#4382DF]/10 dark:hover:bg-white/8"
              }`}
              onClick={() => setMenuOpen(false)}
              role="menuitem"
            >
              <span>{item.label}</span>
              {item.icon ? <item.icon className="h-4 w-4" /> : null}
            </Link>
          ))}

          <div className="my-1 h-px bg-[#4382DF]/20 dark:bg-white/10" />

          {isAuthenticated ? (
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-rose-300/30 bg-rose-400/10 dark:border-rose-400/40 px-3 py-2.5 text-sm font-semibold text-rose-600 dark:text-rose-300 transition hover:bg-rose-400/20 dark:hover:bg-rose-400/20"
              onClick={() => {
                setMenuOpen(false);
                onLogout?.();
              }}
              role="menuitem"
            >
              <FiLogOut className="h-4 w-4" />
              Logout
            </button>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              <Link
                href="/signin"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#4382DF]/40 bg-[#4382DF]/8 dark:border-[#4647AE]/50 dark:bg-[#4647AE]/15 px-3 py-2.5 text-sm font-semibold text-[#112E81] dark:text-[#AACCD6] transition hover:border-[#4382DF]/60 dark:hover:border-[#AACCD6]/60"
                onClick={() => setMenuOpen(false)}
                role="menuitem"
              >
                <FiLogIn className="h-4 w-4" />
                Login
              </Link>
              <Link
                href="/signup"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#4382DF] dark:bg-[#AACCD6] px-3 py-2.5 text-sm font-bold text-white dark:text-[#112E81] transition hover:bg-[#4647AE] dark:hover:bg-white"
                onClick={() => setMenuOpen(false)}
                role="menuitem"
              >
                <FiUserPlus className="h-4 w-4" />
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hamburger;
