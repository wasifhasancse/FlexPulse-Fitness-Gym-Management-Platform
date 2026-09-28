"use client";

import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";

/**
 * AnimatedSectionTitle
 * Powered by motion.dev & animate.style (Animate.css)
 *
 * Implements:
 * 1. Scroll-direction spring animations:
 *    - Down scroll: element descends from above (slideInDown physics)
 *    - Up scroll:   element rises from below with a buoyant spring pop
 * 2. animate__headShake on highlight text when entering viewport / on hover
 * 3. AnimatePresence exit animations for smooth transitions
 * 4. Layout animations (layout prop) for responsive reflows
 */
export default function AnimatedSectionTitle({
  badge,
  badgeIcon: BadgeIcon,
  badgeDetail,
  title,
  highlightText,
  highlightFirst = false,
  titleSuffix = "",
  subtitle,
  align = "left", // 'left' | 'center'
  titleKey,
  className = "",
  actions,
  animateOnScroll = true,
}) {
  const isCenter = align === "center";
  const uniqueKey = titleKey || `${title}-${highlightText}`;
  const containerRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const [scrollDir, setScrollDir] = useState("down");
  const lastScrollY = useRef(0);
  const controls = useAnimation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (Math.abs(currentScrollY - lastScrollY.current) > 5) {
        setScrollDir(currentScrollY > lastScrollY.current ? "down" : "up");
        lastScrollY.current = currentScrollY;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    const el = containerRef.current;
    if (!el) return () => window.removeEventListener("scroll", handleScroll);

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
        if (entry.isIntersecting) {
          controls.start("visible");
        } else {
          controls.start("hidden");
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, [controls]);

  // Physics-matched spring variants
  const titleVariants = {
    hidden:
      scrollDir === "down"
        ? { opacity: 0, y: -32, filter: "blur(4px)" }
        : { opacity: 0, y: 38, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition:
        scrollDir === "down"
          ? { type: "spring", stiffness: 160, damping: 22, mass: 0.8 }
          : { type: "spring", stiffness: 140, damping: 18, mass: 0.9, velocity: 2 },
    },
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${isCenter ? "text-center mx-auto" : ""} ${className}`}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={uniqueKey}
          layout="position"
          variants={titleVariants}
          initial="hidden"
          animate={controls}
          exit={{ opacity: 0, y: scrollDir === "down" ? -16 : 20, filter: "blur(4px)", transition: { duration: 0.22, ease: "easeIn" } }}
          className={`space-y-3 ${isCenter ? "flex flex-col items-center" : ""}`}
        >
          {/* Badge / Kicker with Exit & Layout Animation */}
          {badge && (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-800/25 dark:bg-[#1B1A55]/70 border border-brand-500/25 text-xs font-bold tracking-wide shadow-xs animate__animated animate__fadeInDown animate__faster ${isCenter ? "mx-auto" : ""
                }`}
            >
              {BadgeIcon ? (
                <BadgeIcon className="w-3.5 h-3.5 text-active animate__animated animate__bounceIn" />
              ) : (
                <span className="relative flex h-2 w-2 animate__animated animate__pulse animate__infinite">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-active opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-active"></span>
                </span>
              )}
              <span className="text-active uppercase tracking-wider font-extrabold text-[11px]">
                {badge}
              </span>
              {badgeDetail && (
                <span className="text-[#535C91] dark:text-[#9290C3]">
                  • {badgeDetail}
                </span>
              )}
            </motion.div>
          )}

          {/* Heading with Exit, Layout & animate__headShake text Animation */}
          <motion.h2
            layout
            className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-extrabold font-['Outfit'] tracking-tight text-foreground leading-[1.15]"
          >
            {highlightFirst && highlightText && (
              <>
                <span
                  className={`text-active inline-block transition-transform cursor-default ${isInView ? "animate__animated animate__headShake" : ""
                    } hover:animate__animated hover:animate__headShake`}
                >
                  {highlightText}
                </span>{" "}
              </>
            )}
            {title}
            {!highlightFirst && highlightText && (
              <>
                {" "}
                <span
                  className={`text-active inline-block transition-transform cursor-default ${isInView ? "animate__animated animate__headShake" : ""
                    } hover:animate__animated hover:animate__headShake`}
                >
                  {highlightText}
                </span>
              </>
            )}
            {titleSuffix}
          </motion.h2>

          {/* Subtitle / Description with Exit & Layout Animation */}
          {subtitle && (
            <motion.p
              layout
              className={`text-xs sm:text-sm lg:text-base text-[#535C91] dark:text-[#9290C3] font-['Inter'] leading-relaxed pt-0.5 ${isCenter ? "max-w-2xl mx-auto" : "max-w-2xl"
                }`}
            >
              {subtitle}
            </motion.p>
          )}

          {/* Optional actions/buttons inside header */}
          {actions && (
            <motion.div
              layout
              className={`pt-2 ${isCenter ? "flex justify-center" : ""}`}
            >
              {actions}
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
