"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = ({ navItems, onClick }) => {
  const pathname = usePathname();
  const isActive = pathname === navItems.href;

  return (
    <li>
      <Link
        href={navItems.href}
        onClick={onClick}
        className={`group relative inline-flex items-center gap-2 px-3 py-2 text-base font-semibold transition-colors duration-200 ${
          isActive
            ? "text-[#4382DF] dark:text-[#AACCD6]"
            : "text-[#112E81] dark:text-zinc-300 hover:text-[#4382DF] dark:hover:text-[#AACCD6]"
        }`}
      >
        {navItems.icon ? <navItems.icon className="h-4 w-4" /> : null}
        <span>{navItems.label}</span>
        <span
          className={`absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-[#4382DF] dark:bg-[#AACCD6] transition-transform duration-200 ${
            isActive ? "scale-100" : "scale-0 group-hover:scale-100"
          }`}
        />
      </Link>
    </li>
  );
};

export default NavLink;
