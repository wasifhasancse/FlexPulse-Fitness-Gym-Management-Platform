"use client";

import { useState, useEffect } from "react";
import { FiArrowUp } from "react-icons/fi";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

      setScrollProgress(progress);
      setIsVisible(scrollTop > 280);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // SVG circular progress calculation
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <div
      className={`fixed bottom-7 right-7 z-50 transition-all duration-300 ${
        isVisible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-6 pointer-events-none"
      }`}
    >
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Scroll back to top"
        className="group relative w-12 h-12 rounded-full flex items-center justify-center bg-white/90 dark:bg-[#070F2B]/95 backdrop-blur-md border border-brand-500/30 hover:border-active text-foreground hover:text-white shadow-xl shadow-black/15 hover:shadow-active/30 transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer"
      >
        {/* Subtle Ambient Pulse Ring */}
        <span className="absolute inset-0 rounded-full bg-active/20 opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-500 -z-10" />

        {/* Circular SVG Scroll Progress Indicator */}
        <svg
          className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none p-0.5"
          viewBox="0 0 48 48"
        >
          {/* Track Circle */}
          <circle
            cx="24"
            cy="24"
            r={radius}
            className="stroke-[#535C91]/20 dark:stroke-[#9290C3]/15"
            strokeWidth="2.5"
            fill="transparent"
          />
          {/* Active Progress Circle */}
          <circle
            cx="24"
            cy="24"
            r={radius}
            className="stroke-active transition-all duration-150 ease-out"
            strokeWidth="2.5"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
          />
        </svg>

        {/* Center Icon & Hover Fill */}
        <div className="relative z-10 w-8 h-8 rounded-full flex items-center justify-center group-hover:bg-active transition-colors duration-300">
          <FiArrowUp className="w-4 h-4 text-foreground group-hover:text-white group-hover:-translate-y-0.5 transition-all duration-200" />
        </div>

        {/* Floating Tooltip */}
        <span className="absolute right-full mr-3 px-2.5 py-1 rounded-lg bg-foreground text-background text-[11px] font-bold font-['Outfit'] whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 shadow-md">
          Back to Top
        </span>
      </button>
    </div>
  );
}
