"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";

// ─── Global scroll direction tracker ───────────────────────────────────────
// One singleton listener shared across all ScrollAnimate instances.
let _lastScrollY = 0;
let _currentDir = "down";
const _dirListeners = new Set();

if (typeof window !== "undefined") {
  window.addEventListener(
    "scroll",
    () => {
      const y = window.scrollY;
      if (Math.abs(y - _lastScrollY) > 4) {
        const dir = y > _lastScrollY ? "down" : "up";
        if (dir !== _currentDir) {
          _currentDir = dir;
          _dirListeners.forEach((fn) => fn(dir));
        }
        _lastScrollY = y;
      }
    },
    { passive: true }
  );
}

// ─── Framer Motion variants ─────────────────────────────────────────────────
//
//  DOWN scroll → element descends from slightly above the viewport
//  UP scroll   → element rises from slightly below with a buoyant spring pop

const variantsDown = {
  hidden: { opacity: 0, y: -36, scale: 0.97, filter: "blur(3px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 160,
      damping: 22,
      mass: 0.8,
    },
  },
};

const variantsUp = {
  hidden: { opacity: 0, y: 44, scale: 0.97, filter: "blur(3px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 140,  // softer spring = buoyant, elastic feel
      damping: 18,
      mass: 0.9,
      velocity: 2,    // initial velocity = "pops" into place
    },
  },
};

/**
 * ScrollAnimate
 *
 * Wraps children in a Framer Motion element that fires spring animations
 * on IntersectionObserver entry, direction-matched to scroll direction.
 *
 * Props
 * ─────
 *  as        – HTML tag to render (default "div")
 *  className – forwarded class string
 *  threshold – IntersectionObserver threshold (default 0.12)
 *  once      – only animate on first entry (default false)
 *  delay     – extra transition delay in seconds (default 0)
 */
export default function ScrollAnimate({
  children,
  className = "",
  as: Tag = "div",
  threshold = 0.12,
  once = false,
  delay = 0,
  // Legacy animate.css props accepted but ignored (backward compat)
  downAnimation,
  upAnimation,
  exitUpAnimation,
  speed,
  enableExit,
  ...props
}) {
  const ref = useRef(null);
  const controls = useAnimation();
  const [dir, setDir] = useState(_currentDir);
  const hasAnimatedRef = useRef(false);

  // Subscribe to global scroll direction updates
  useEffect(() => {
    const listener = (d) => setDir(d);
    _dirListeners.add(listener);
    return () => _dirListeners.delete(listener);
  }, []);

  // IntersectionObserver triggers animation
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (once && hasAnimatedRef.current) return;
          controls.start("visible");
          hasAnimatedRef.current = true;
        } else {
          if (!once) {
            controls.start("hidden");
          }
        }
      },
      { threshold, rootMargin: "0px 0px -20px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [controls, threshold, once]);

  // Direction-matched variants, with optional delay
  const base = dir === "down" ? variantsDown : variantsUp;
  const variants =
    delay > 0
      ? {
        ...base,
        visible: {
          ...base.visible,
          transition: { ...base.visible.transition, delay },
        },
      }
      : base;

  // Build the motion component dynamically
  const MotionTag = motion[Tag] ?? motion.div;

  return (
    <MotionTag
      ref={ref}
      className={className}
      variants={variants}
      initial="hidden"
      animate={controls}
      {...props}
    >
      {children}
    </MotionTag>
  );
}
