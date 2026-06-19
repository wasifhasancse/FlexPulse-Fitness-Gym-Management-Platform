"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const Hamburger = ({ navLinks }) => {
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
      <div className="ham-trigger">
        <input
          type="checkbox"
          id="ham-cb"
          className="ham-checkbox"
          checked={menuOpen}
          onChange={() => setMenuOpen((prev) => !prev)}
        />
        <label htmlFor="ham-cb" className="ham-toggle" aria-label="Toggle menu">
          <span className="ham-bar ham-bar-top" />
          <span className="ham-bar ham-bar-mid" />
          <span className="ham-bar ham-bar-btm" />
        </label>
      </div>

      <div
        className={`ham-panel min-w-56 border border-[#5e41de]/15 bg-white shadow-xl shadow-[#5e41de]/12 dark:border-[#5e41de]/25 dark:bg-zinc-900 dark:shadow-[#5e41de]/25 ${menuOpen ? "open" : ""}`}
        role="menu"
      >
        <div className="flex flex-col p-1.5">
          {navLinks.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="nav-menu-item"
              style={{
                color: pathname === item.href ? "#5e41de" : undefined,
                background:
                  pathname === item.href ? "rgba(94,65,222,0.08)" : undefined,
              }}
              onClick={() => setMenuOpen(false)}
              role="menuitem"
            >
              <item.icon className="nav-item-icon h-3.75 w-3.75 shrink-0" />
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hamburger;
