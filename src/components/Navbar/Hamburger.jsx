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
        className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#30475E]/15 bg-white/70 text-[#222831] transition hover:-translate-y-0.5 hover:border-[#F05454]/35 hover:text-[#F05454] dark:border-white/10 dark:bg-[#30475E]/35 dark:text-[#DDDDDD] dark:hover:border-[#F05454]/35 dark:hover:text-[#F05454]"
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
        className={`absolute left-0 top-15 min-w-72 overflow-hidden rounded-2xl border border-[#30475E]/12 bg-[#DDDDDD]/95 p-2 text-[#222831] shadow-2xl shadow-[#222831]/10 backdrop-blur-md transition-all duration-200 dark:border-white/10 dark:bg-[#222831]/96 dark:text-zinc-100 dark:shadow-black/45 ${
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
              className={`inline-flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-semibold transition-all duration-200 ${
                pathname === item.href
                  ? "bg-[#F05454] text-white"
                  : "text-[#30475E] hover:translate-x-1 hover:bg-white/70 hover:text-[#F05454] dark:text-zinc-200 dark:hover:bg-white/5 dark:hover:text-[#F05454]"
              }`}
              onClick={() => setMenuOpen(false)}
              role="menuitem"
            >
              <span>{item.label}</span>
              {item.icon ? <item.icon className="h-4 w-4" /> : null}
            </Link>
          ))}

          <div className="my-1 h-px bg-[#30475E]/10 dark:bg-white/10" />

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
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#30475E]/15 bg-white/70 px-3 py-2.5 text-sm font-semibold text-[#30475E] transition hover:border-[#F05454]/35 hover:text-[#F05454] dark:border-white/10 dark:bg-[#30475E]/35 dark:text-[#DDDDDD] dark:hover:border-[#F05454]/35 dark:hover:text-[#F05454]"
                onClick={() => setMenuOpen(false)}
                role="menuitem"
              >
                <FiLogIn className="h-4 w-4" />
                Login
              </Link>
              <Link
                href="/signup"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#F05454] px-3 py-2.5 text-sm font-bold text-white transition hover:bg-[#222831] dark:hover:bg-[#30475E]"
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
