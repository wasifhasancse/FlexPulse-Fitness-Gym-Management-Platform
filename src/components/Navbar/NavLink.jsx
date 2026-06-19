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
        className={`group inline-flex items-center gap-2 px-2 py-2 text-sm font-semibold transition-all duration-200 ${
          isActive
            ? "translate-x-1 text-[#F05454]"
            : "text-[#30475E] hover:translate-x-1 hover:text-[#F05454] dark:text-zinc-400 dark:hover:text-[#F05454]"
        }`}
      >
        <span
          className={`h-1 w-1 shrink-0 rounded-full transition-all duration-200 ${
            isActive
              ? "w-2 bg-[#F05454]"
              : "bg-[#F05454]/40 group-hover:w-2 group-hover:bg-[#F05454]"
          }`}
        />
        <span>{navItems.label}</span>
      </Link>
    </li>
  );
};

export default NavLink;
