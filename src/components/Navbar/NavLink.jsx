"use client";
import { usePathname } from "next/navigation";
import PrimaryButton from "../Button/PrimaryButton";

const NavLink = ({ navItems, onClick }) => {
  const pathname = usePathname();
  const isActive = navItems.href === pathname;

  return (
    <li className="relative">
      <PrimaryButton
        href={navItems.href}
        onClick={onClick}
        label={navItems.label}
        icon={navItems.icon}
      />

      {isActive && (
        <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-1.5 rounded-full bg-[#5e41de]" />
      )}
    </li>
  );
};

export default NavLink;
