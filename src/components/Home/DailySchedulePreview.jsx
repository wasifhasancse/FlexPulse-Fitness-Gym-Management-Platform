"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence, LayoutGroup, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  FiCalendar,
  FiMapPin,
  FiArrowRight,
} from "react-icons/fi";
import { FaFire } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const SCHEDULE_DATA = [
  {
    id: "s1",
    day: "Monday",
    time: "06:30 AM",
    duration: "45 Mins",
    period: "morning",
    title: "Sunrise HIIT & Metabolic Sprint",
    discipline: "Cardio & Stamina",
    coach: "Sophia Martinez",
    coachRole: "MetCon Lead Coach",
    coachAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop",
    studio: "Main Turf Arena • Studio 1",
    enrolled: 18,
    capacity: 20,
    calories: "650 kcal",
    status: "Filling Fast"
  },
  {
    id: "s2",
    day: "Monday",
    time: "08:00 AM",
    duration: "60 Mins",
    period: "morning",
    title: "Olympic Barbell & Kinematic Force",
    discipline: "Muscle & Power",
    coach: "Alex Rivers",
    coachRole: "CSCS Head Coach",
    coachAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop",
    studio: "Eleiko Barbell Lab",
    enrolled: 12,
    capacity: 12,
    calories: "520 kcal",
    status: "Waitlist Only"
  },
  {
    id: "s3",
    day: "Monday",
    time: "12:15 PM",
    duration: "45 Mins",
    period: "midday",
    title: "Express Prowler Sled & Core Blast",
    discipline: "Functional Fitness",
    coach: "Marcus Vance",
    coachRole: "Strength Specialist",
    coachAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop",
    studio: "Sprint Track B",
    enrolled: 10,
    capacity: 16,
    calories: "480 kcal",
    status: "Slots Open"
  },
  {
    id: "s4",
    day: "Monday",
    time: "05:30 PM",
    duration: "50 Mins",
    period: "evening",
    title: "Combat Boxing & Velocity Striking",
    discipline: "Martial Athletics",
    coach: "Tariq Al-Mansoor",
    coachRole: "USA Boxing Certified",
    coachAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop",
    studio: "Combat Dojo • Ring 2",
    enrolled: 14,
    capacity: 16,
    calories: "720 kcal",
    status: "Filling Fast"
  },
  {
    id: "s5",
    day: "Monday",
    time: "07:00 PM",
    duration: "60 Mins",
    period: "evening",
    title: "Decompression Vinyasa & Fascial Flow",
    discipline: "Flexibility & Balance",
    coach: "Elena Moreau",
    coachRole: "E-RYT 500 Yoga Master",
    coachAvatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop",
    studio: "Zenith Mind & Body Suite",
    enrolled: 15,
    capacity: 22,
    calories: "320 kcal",
    status: "Slots Open"
  },
  // Tuesday
  {
    id: "s6",
    day: "Tuesday",
    time: "07:00 AM",
    duration: "50 Mins",
    period: "morning",
    title: "Cardio Kickboxing & Plyometric Torque",
    discipline: "Martial Athletics",
    coach: "Tariq Al-Mansoor",
    coachRole: "USA Boxing Certified",
    coachAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop",
    studio: "Combat Dojo",
    enrolled: 11,
    capacity: 16,
    calories: "620 kcal",
    status: "Slots Open"
  },
  {
    id: "s7",
    day: "Tuesday",
    time: "10:30 AM",
    duration: "60 Mins",
    period: "morning",
    title: "Hypertrophy Bench & Upper Kinetic Pull",
    discipline: "Muscle & Power",
    coach: "Alex Rivers",
    coachRole: "CSCS Head Coach",
    coachAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop",
    studio: "Eleiko Barbell Lab",
    enrolled: 12,
    capacity: 14,
    calories: "540 kcal",
    status: "Filling Fast"
  },
  {
    id: "s8",
    day: "Tuesday",
    time: "06:15 PM",
    duration: "50 Mins",
    period: "evening",
    title: "CrossFit Team Challenge & Row Ergs",
    discipline: "Functional Fitness",
    coach: "Marcus Vance",
    coachRole: "Strength Specialist",
    coachAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop",
    studio: "CrossFit Box 1",
    enrolled: 18,
    capacity: 18,
    calories: "780 kcal",
    status: "Waitlist Only"
  },
  // Wednesday
  {
    id: "s9",
    day: "Wednesday",
    time: "06:30 AM",
    duration: "45 Mins",
    period: "morning",
    title: "Lactate Threshold SkiErg & Curve Run",
    discipline: "Cardio & Stamina",
    coach: "Sophia Martinez",
    coachRole: "MetCon Lead Coach",
    coachAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop",
    studio: "Main Turf Arena",
    enrolled: 16,
    capacity: 20,
    calories: "680 kcal",
    status: "Slots Open"
  },
  {
    id: "s10",
    day: "Wednesday",
    time: "06:00 PM",
    duration: "60 Mins",
    period: "evening",
    title: "Heavy Squat & Glute Ham Developer",
    discipline: "Muscle & Power",
    coach: "Alex Rivers",
    coachRole: "CSCS Head Coach",
    coachAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop",
    studio: "Eleiko Barbell Lab",
    enrolled: 13,
    capacity: 14,
    calories: "560 kcal",
    status: "Filling Fast"
  },
  // Thursday
  {
    id: "s11",
    day: "Thursday",
    time: "07:00 AM",
    duration: "50 Mins",
    period: "morning",
    title: "Aqua Bag Combatives & Core Rotations",
    discipline: "Martial Athletics",
    coach: "Tariq Al-Mansoor",
    coachRole: "USA Boxing Certified",
    coachAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop",
    studio: "Combat Dojo",
    enrolled: 14,
    capacity: 16,
    calories: "710 kcal",
    status: "Slots Open"
  },
  {
    id: "s12",
    day: "Thursday",
    time: "07:00 PM",
    duration: "55 Mins",
    period: "evening",
    title: "Yin Mobility, Fascia & Infrared Sauna",
    discipline: "Flexibility & Balance",
    coach: "Elena Moreau",
    coachRole: "E-RYT 500 Yoga Master",
    coachAvatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop",
    studio: "Zenith Mind & Body Suite",
    enrolled: 19,
    capacity: 20,
    calories: "290 kcal",
    status: "Filling Fast"
  },
  // Friday
  {
    id: "s13",
    day: "Friday",
    time: "06:30 AM",
    duration: "50 Mins",
    period: "morning",
    title: "Friday Finish: Max Calorie MetCon Circuit",
    discipline: "Cardio & Stamina",
    coach: "Sophia Martinez",
    coachRole: "MetCon Lead Coach",
    coachAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop",
    studio: "Main Turf Arena",
    enrolled: 20,
    capacity: 20,
    calories: "820 kcal",
    status: "Waitlist Only"
  },
  {
    id: "s14",
    day: "Friday",
    time: "05:00 PM",
    duration: "60 Mins",
    period: "evening",
    title: "Deadlift Party & Barbell Kinematics",
    discipline: "Muscle & Power",
    coach: "Alex Rivers",
    coachRole: "CSCS Head Coach",
    coachAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop",
    studio: "Eleiko Barbell Lab",
    enrolled: 14,
    capacity: 14,
    calories: "600 kcal",
    status: "Waitlist Only"
  },
  // Saturday
  {
    id: "s15",
    day: "Saturday",
    time: "08:30 AM",
    duration: "60 Mins",
    period: "morning",
    title: "Weekend Warrior: Functional Turf Gauntlet",
    discipline: "Functional Fitness",
    coach: "Marcus Vance",
    coachRole: "Strength Specialist",
    coachAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop",
    studio: "Turf Track A & B",
    enrolled: 22,
    capacity: 24,
    calories: "850 kcal",
    status: "Filling Fast"
  },
  {
    id: "s16",
    day: "Saturday",
    time: "10:30 AM",
    duration: "55 Mins",
    period: "morning",
    title: "Dynamic Vinyasa Flow & Sound Healing",
    discipline: "Flexibility & Balance",
    coach: "Elena Moreau",
    coachRole: "E-RYT 500 Yoga Master",
    coachAvatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop",
    studio: "Zenith Studio",
    enrolled: 18,
    capacity: 20,
    calories: "340 kcal",
    status: "Slots Open"
  },
  // Sunday
  {
    id: "s17",
    day: "Sunday",
    time: "09:00 AM",
    duration: "60 Mins",
    period: "morning",
    title: "Sunday Long-Duration Aerobic Base",
    discipline: "Cardio & Stamina",
    coach: "Sophia Martinez",
    coachRole: "MetCon Lead Coach",
    coachAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop",
    studio: "Main Turf Arena",
    enrolled: 14,
    capacity: 20,
    calories: "620 kcal",
    status: "Slots Open"
  },
  {
    id: "s18",
    day: "Sunday",
    time: "04:30 PM",
    duration: "75 Mins",
    period: "evening",
    title: "Restorative Contrast Bath & Myofascial Lab",
    discipline: "Flexibility & Balance",
    coach: "Elena Moreau",
    coachRole: "E-RYT 500 Yoga Master",
    coachAvatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop",
    studio: "Hydro & Recovery Suite",
    enrolled: 12,
    capacity: 12,
    calories: "250 kcal",
    status: "Waitlist Only"
  }
];

// Schedule Row Motion Variants (Deliberate Slow-Motion & Tag-by-Tag Triggered Architecture)
const scheduleListContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.18, // Slow, stately stagger between cards
      delayChildren: 0.1,
    },
  },
};

const scheduleRowVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1.6, // Slow cinematic transition
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const timeBlockVariants = {
  hidden: { opacity: 0, x: -25 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 120, damping: 20 },
  },
};

const timeDurationVariants = {
  hidden: { opacity: 0, y: 6 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, ease: "easeOut" },
  },
};

const disciplineVariants = {
  hidden: { opacity: 0, y: -14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] },
  },
};

const scheduleTitleVariants = {
  hidden: { opacity: 0, y: 16, filter: "blur(3px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const studioMetaVariants = {
  hidden: { opacity: 0, x: -12 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] },
  },
};

const coachAvatarVariants = {
  hidden: { opacity: 0, scale: 0.7, rotate: -10 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { type: "spring", stiffness: 130, damping: 20 },
  },
};

const coachInfoVariants = {
  hidden: { opacity: 0, x: 15 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] },
  },
};

const capacityBarVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1] },
  },
};

const capacityFillVariants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] },
  },
};

const statusBadgeVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 160, damping: 20 },
  },
};

const actionBtnVariants = {
  hidden: { opacity: 0, x: 15, y: 15, scale: 0.9 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 120, damping: 20 },
  },
};

// Filter Tabs Staggered Variants (Slowed & Staged)
const filterContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.6,
    },
  },
};

const filterItemVariants = {
  hidden: { opacity: 0, y: 18, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 160,
      damping: 22,
    },
  },
};

// Bottom Callout Banner Motion Variants (Cinematic Slow)
const calloutContainerVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const calloutIconVariants = {
  hidden: { opacity: 0, scale: 0, rotate: 15 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { type: "spring", stiffness: 140, damping: 20 },
  },
};

const calloutTextVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const calloutBtnVariants = {
  hidden: { opacity: 0, x: 25 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function DailySchedulePreview() {
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [selectedPeriod, setSelectedPeriod] = useState("all");
  const [cardsTriggered, setCardsTriggered] = useState(false);
  const sectionRef = useRef(null);
  const scheduleListRef = useRef(null);
  const isScheduleInView = useInView(scheduleListRef, { once: true, amount: 0.15 });

  useEffect(() => {
    if (isScheduleInView) {
      const timer = setTimeout(() => {
        setCardsTriggered(true);
      }, 1250);
      return () => clearTimeout(timer);
    }
  }, [isScheduleInView]);

  // Counter Value Refs for dynamic 0 -> Target number count animation
  const scheduleClassesValRef = useRef(null);
  const scheduleCoachValRef = useRef(null);

  const dayClasses = useMemo(() => {
    return SCHEDULE_DATA.filter((item) => {
      const matchesDay = item.day === selectedDay;
      const matchesPeriod = selectedPeriod === "all" || item.period === selectedPeriod;
      return matchesDay && matchesPeriod;
    });
  }, [selectedDay, selectedPeriod]);

  // GSAP Viewport-Triggered Timeline for Section Header & Telemetry Counters
  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          once: true,
        },
        defaults: { ease: "power3.out" },
      });

      // 1. Kicker Badge: Dignified downward entrance (Slowed to 1.6s)
      tl.fromTo(
        ".schedule-kicker",
        { y: -30, opacity: 0, filter: "blur(6px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.6, ease: "power2.out" }
      ).addLabel("kickerEnd");

      // 2. Main Title: Majestic upward rising sweep with de-blur (Slowed to 2.2s)
      tl.fromTo(
        ".schedule-title",
        { y: 45, opacity: 0, filter: "blur(8px)", scale: 0.96 },
        { y: 0, opacity: 1, filter: "blur(0px)", scale: 1, duration: 2.2, ease: "power3.out" },
        "kickerEnd-=0.4"
      ).addLabel("titleEnd");

      // 3. Section Description: Contrasting downward drop from above under title (Slowed to 1.8s)
      tl.fromTo(
        ".schedule-desc",
        { y: -30, opacity: 0, filter: "blur(5px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.8, ease: "power2.out" },
        "titleEnd-=0.3"
      );

      // 4. Quick Schedule Telemetry Box: Horizontal slide & pop from the right (Slowed to 1.8s)
      tl.fromTo(
        ".schedule-telemetry-box",
        { x: 45, opacity: 0, scale: 0.94 },
        { x: 0, opacity: 1, scale: 1, duration: 1.8, ease: "back.out(1.2)" },
        "titleEnd-=0.4"
      );

      // 5. Telemetry Number Counters: Mandatory 0 -> Target Count Animation (Slowed to 3.2s)
      const counterObj = { classes: 0, coachPct: 0 };
      tl.fromTo(
        counterObj,
        { classes: 0, coachPct: 0 },
        {
          classes: 45,
          coachPct: 100,
          duration: 3.2,
          ease: "power1.out",
          onStart: () => {
            if (scheduleClassesValRef.current) scheduleClassesValRef.current.textContent = "0+";
            if (scheduleCoachValRef.current) scheduleCoachValRef.current.textContent = "0%";
          },
          onUpdate: () => {
            if (scheduleClassesValRef.current) {
              scheduleClassesValRef.current.textContent = Math.round(counterObj.classes) + "+";
            }
            if (scheduleCoachValRef.current) {
              scheduleCoachValRef.current.textContent = Math.round(counterObj.coachPct) + "%";
            }
          },
        },
        "titleEnd"
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="py-20 lg:py-28 bg-background border-t border-brand-500/15 relative overflow-hidden transition-colors duration-300"
    >
      {/* Ambient Lighting Meshes */}
      <div className="absolute top-1/3 left-0 w-96 sm:w-140 h-96 sm:h-140 bg-brand-500/8 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-0 w-80 sm:w-120 h-80 sm:h-120 bg-active/6 rounded-full blur-[130px] pointer-events-none -z-10" />

      <div className="w-11/12 mx-auto relative z-10">

        {/* Section Header with Independent Element-by-Element Triggered Transitions */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 sm:mb-16 gap-6 border-b border-brand-500/15 pb-8">
          <div className="max-w-2xl">
            {/* Kicker Badge: Triggered downward arrival */}
            <div className="schedule-kicker inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-active/30 bg-active/5 dark:bg-active/10 mb-4 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-active animate-pulse"></span>
              <span className="text-[11px] font-black uppercase tracking-wider text-active">
                Live Timetable
              </span>
              <span className="text-[11px] text-secondary/60 font-bold">•</span>
              <span className="text-[11px] font-bold text-secondary">
                Real-Time Class Availability
              </span>
            </div>

            {/* Section Headline: Triggered upward sweep */}
            <h2 className="schedule-title text-4xl sm:text-5xl lg:text-6xl font-black font-['Outfit'] tracking-tight text-foreground leading-[1.08] mb-4">
              Weekly Live{" "}
              <span className="text-active inline-block">Schedule</span>
            </h2>

            {/* Description: Contrasting downward drop from above under the title edge */}
            <p className="schedule-desc text-sm sm:text-base text-secondary font-['Inter'] leading-relaxed max-w-xl">
              From dawn metabolic conditioning at 06:30 AM to evening Olympic lifting and decompression flow. Filter by day and time to plan your weekly athletic regimen.
            </p>
          </div>

          {/* Quick Schedule Telemetry Box: Triggered slide-in & Counter animation from 0 */}
          <div className="schedule-telemetry-box flex items-center gap-4 sm:gap-6 bg-searchbox-bg p-4 sm:p-5 rounded-2xl border border-brand-500/20 shrink-0 font-['Outfit'] self-start lg:self-end shadow-xs">
            <div>
              <p
                ref={scheduleClassesValRef}
                className="text-2xl sm:text-3xl font-black text-active tracking-tight font-['Outfit']"
              >
                45+
              </p>
              <p className="text-[10px] sm:text-xs text-secondary font-bold uppercase tracking-wider">
                Weekly Classes
              </p>
            </div>
            <div className="h-9 w-px bg-brand-500/20" />
            <div>
              <p className="text-2xl sm:text-3xl font-black text-active tracking-tight font-['Outfit']">
                06:00
              </p>
              <p className="text-[10px] sm:text-xs text-secondary font-bold uppercase tracking-wider">
                Earliest Start
              </p>
            </div>
            <div className="h-9 w-px bg-brand-500/20" />
            <div>
              <p
                ref={scheduleCoachValRef}
                className="text-2xl sm:text-3xl font-black text-active tracking-tight font-['Outfit']"
              >
                100%
              </p>
              <p className="text-[10px] sm:text-xs text-secondary font-bold uppercase tracking-wider">
                Coach Led
              </p>
            </div>
          </div>
        </div>

        {/* Day Selector & Time Filter Pills with Triggered Staggered Animations */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 mb-6 select-none border-b border-brand-500/15">
          {/* Day Selector Tabs */}
          <LayoutGroup id="schedulePreviewDaysGroup">
            <motion.div
              variants={filterContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 md:pb-0"
            >
              {DAYS.map((day) => {
                const isActive = selectedDay === day;
                return (
                  <motion.button
                    key={day}
                    type="button"
                    variants={filterItemVariants}
                    whileHover={{ y: -2, scale: 1.02 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => setSelectedDay(day)}
                    className="relative px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-tight whitespace-nowrap cursor-pointer shrink-0 transition-colors duration-200"
                  >
                    {isActive && (
                      <motion.span
                        layoutId="activeScheduleDayPill"
                        className="absolute inset-0 bg-active rounded-xl shadow-xs"
                        transition={{ type: "spring", stiffness: 450, damping: 35 }}
                      />
                    )}
                    <span
                      className={`relative z-10 ${
                        isActive
                          ? "text-white"
                          : "text-secondary hover:text-foreground"
                      }`}
                    >
                      {day}
                    </span>
                  </motion.button>
                );
              })}
            </motion.div>
          </LayoutGroup>

          {/* Time Filter Pills */}
          <LayoutGroup id="schedulePreviewTimeGroup">
            <motion.div
              variants={filterContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="flex items-center gap-1.5 shrink-0 bg-searchbox-bg p-1 rounded-xl border border-brand-500/20 text-xs font-['Inter'] self-start md:self-auto shadow-2xs"
            >
              {[
                { id: "all", label: "All Slots" },
                { id: "morning", label: "Morning" },
                { id: "midday", label: "Midday" },
                { id: "evening", label: "Evening" }
              ].map((p) => {
                const isActive = selectedPeriod === p.id;
                return (
                  <motion.button
                    key={p.id}
                    type="button"
                    variants={filterItemVariants}
                    whileHover={{ y: -1, scale: 1.02 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => setSelectedPeriod(p.id)}
                    className="relative px-3 py-1.5 rounded-lg font-bold cursor-pointer transition-colors duration-200"
                  >
                    {isActive && (
                      <motion.span
                        layoutId="activeSchedulePeriodPill"
                        className="absolute inset-0 bg-active rounded-lg shadow-xs"
                        transition={{ type: "spring", stiffness: 450, damping: 35 }}
                      />
                    )}
                    <span
                      className={`relative z-10 ${
                        isActive
                          ? "text-white"
                          : "text-secondary hover:text-foreground"
                      }`}
                    >
                      {p.label}
                    </span>
                  </motion.button>
                );
              })}
            </motion.div>
          </LayoutGroup>
        </div>

        {/* Class Rows Container with Staged Delay & Tag-by-Tag Slow Transitions */}
        <motion.div
          ref={scheduleListRef}
          layout
          variants={scheduleListContainerVariants}
          initial="hidden"
          animate={cardsTriggered ? "visible" : "hidden"}
          className="space-y-4 mb-12 sm:mb-16"
        >
          <AnimatePresence mode="popLayout">
            {dayClasses.length === 0 ? (
              <motion.div
                key="empty-schedule-filter"
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                className="p-12 text-center rounded-3xl bg-white dark:bg-[#070F2B] border border-brand-500/20 text-secondary shadow-xs"
              >
                <FiCalendar className="w-10 h-10 mx-auto mb-3 text-active/60" />
                <p className="font-bold text-base text-foreground font-['Outfit']">
                  No classes scheduled for this filter
                </p>
                <p className="text-xs mt-1 font-['Inter']">
                  Try switching to all slots or selecting another day.
                </p>
              </motion.div>
            ) : (
              dayClasses.map((item) => {
                const occupancy = Math.round((item.enrolled / item.capacity) * 100);
                const isWaitlist = item.status === "Waitlist Only";
                const isFillingFast = item.status === "Filling Fast";

                return (
                  <motion.div
                    key={`${selectedDay}-${selectedPeriod}-${item.id}`}
                    layout
                    variants={scheduleRowVariants}
                    initial="hidden"
                    animate={cardsTriggered ? "visible" : "hidden"}
                    exit={{ opacity: 0, scale: 0.94, y: 16, transition: { duration: 0.3 } }}
                    className="group relative rounded-2xl sm:rounded-3xl p-5 sm:p-6 bg-white dark:bg-[#070F2B] border border-brand-500/20 hover:border-active/60 transition-all duration-300 ease-out hover:-translate-y-1 flex flex-col lg:flex-row lg:items-center justify-between gap-5 sm:gap-6 shadow-xs hover:shadow-md"
                  >
                    {/* Left Column: Time & Discipline / Class Info */}
                    <div className="flex-1 min-w-0 flex items-start sm:items-center gap-4 sm:gap-6 pr-0 lg:pr-4">
                      {/* Time Block: Spring pop from left */}
                      <motion.div
                        variants={timeBlockVariants}
                        className="p-3 sm:p-3.5 rounded-2xl bg-searchbox-bg border border-brand-500/20 text-center shrink-0 w-22 sm:w-24 shadow-2xs"
                      >
                        <span className="block text-base sm:text-lg font-black font-['Outfit'] text-foreground group-hover:text-active transition-colors leading-tight">
                          {item.time}
                        </span>
                        <motion.span
                          variants={timeDurationVariants}
                          className="block text-[11px] font-bold text-secondary mt-0.5"
                        >
                          {item.duration}
                        </motion.span>
                      </motion.div>

                      <div className="space-y-1 min-w-0">
                        {/* Discipline Tag: Slide down from top */}
                        <motion.span
                          variants={disciplineVariants}
                          className="inline-block text-[10px] font-extrabold uppercase tracking-wider text-active"
                        >
                          {item.discipline}
                        </motion.span>
                        {/* Class Title: Upward sweep with de-blur */}
                        <motion.h3
                          variants={scheduleTitleVariants}
                          className="font-['Outfit'] text-base sm:text-lg font-bold text-foreground group-hover:text-active transition-colors leading-snug line-clamp-1"
                        >
                          {item.title}
                        </motion.h3>
                        {/* Studio & Calorie Strip: Fade and stretch */}
                        <motion.div
                          variants={studioMetaVariants}
                          className="flex items-center gap-2 text-xs text-secondary font-['Inter']"
                        >
                          <span className="flex items-center gap-1">
                            <FiMapPin className="w-3.5 h-3.5 text-active" />
                            {item.studio}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1 font-semibold text-foreground/80">
                            <FaFire className="w-3 h-3 text-active" />
                            {item.calories}
                          </span>
                        </motion.div>
                      </div>
                    </div>

                    {/* Middle Column: Instructor Profile (Fixed Width for Perfect Column Alignment) */}
                    <div className="w-full sm:w-48 lg:w-48 xl:w-52 shrink-0 flex items-center gap-3">
                      {/* Coach Avatar: Spring scale pop with slight rotation */}
                      <motion.div
                        variants={coachAvatarVariants}
                        className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-brand-500/20 shrink-0 shadow-2xs"
                      >
                        <Image
                          src={item.coachAvatar}
                          alt={item.coach}
                          fill
                          sizes="40px"
                          className="object-cover"
                        />
                      </motion.div>
                      {/* Coach Info: Gentle slide from right */}
                      <motion.div variants={coachInfoVariants} className="min-w-0">
                        <p className="font-['Outfit'] text-xs sm:text-sm font-bold text-foreground leading-tight truncate">
                          {item.coach}
                        </p>
                        <p className="font-['Inter'] text-[11px] text-secondary truncate">
                          {item.coachRole}
                        </p>
                      </motion.div>
                    </div>

                    {/* Right Column: Capacity Meter & Action CTA */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between lg:justify-end gap-4 sm:gap-6 shrink-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-brand-500/15">
                      {/* Capacity Meter (Fixed Width with Guaranteed Single-Line Status Badge) */}
                      <motion.div variants={capacityBarVariants} className="space-y-1.5 w-full sm:w-44 lg:w-48 shrink-0">
                        <div className="flex items-center justify-between text-xs font-['Inter'] gap-2">
                          <span className="font-semibold text-secondary whitespace-nowrap text-[11px]">
                            {item.enrolled}/{item.capacity} Spots
                          </span>
                          <motion.span
                            variants={statusBadgeVariants}
                            className={`font-black text-[9.5px] uppercase tracking-wider px-2 py-0.5 rounded-md whitespace-nowrap shrink-0 shadow-2xs ${
                              isWaitlist
                                ? "bg-rose-500/10 text-rose-500 border border-rose-500/25"
                                : isFillingFast
                                ? "bg-amber-500/10 text-amber-500 border border-amber-500/25"
                                : "bg-emerald-500/10 text-emerald-500 border border-emerald-500/25"
                            }`}
                          >
                            {item.status}
                          </motion.span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-brand-500/15 dark:bg-[#1B1A55] overflow-hidden">
                          <motion.div
                            variants={capacityFillVariants}
                            className={`h-full rounded-full transition-colors duration-500 ${
                              isWaitlist ? "bg-rose-500" : isFillingFast ? "bg-amber-400" : "bg-active"
                            }`}
                            style={{ width: `${occupancy}%`, originX: 0 }}
                          />
                        </div>
                      </motion.div>

                      {/* Action CTA Button: Uniform Width & Height */}
                      <motion.div variants={actionBtnVariants} className="shrink-0 w-full sm:w-auto">
                        <Link
                          href="/schedule"
                          className={`inline-flex items-center justify-center gap-1.5 w-full sm:w-36 h-10 px-4 rounded-xl font-extrabold text-xs sm:text-sm transition-all duration-300 cursor-pointer shadow-xs hover:shadow-md whitespace-nowrap active:scale-95 group/btn ${
                            isWaitlist
                              ? "bg-searchbox-bg hover:bg-searchbox-hover text-foreground border border-brand-500/20 hover:border-active/40"
                              : "bg-btn-bg text-btn-text hover:brightness-105 border border-white/20"
                          }`}
                        >
                          <span>{isWaitlist ? "Join Waitlist" : "Reserve Slot"}</span>
                          <FiArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                        </Link>
                      </motion.div>
                    </div>

                  </motion.div>
                );
              })
            )}
          </AnimatePresence>
        </motion.div>

        {/* Bottom Full Schedule Navigation Banner with Directional Triggered Transitions */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={calloutContainerVariants}
          className="rounded-3xl p-6 sm:p-8 bg-linear-to-r from-brand-800/30 via-background to-brand-800/30 border border-brand-500/25 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs"
        >
          <div className="flex items-center gap-4">
            <motion.div
              variants={calloutIconVariants}
              className="w-12 h-12 rounded-2xl bg-active/20 flex items-center justify-center text-active shrink-0 border border-brand-500/30 shadow-xs"
            >
              <FiCalendar className="w-6 h-6 text-active" />
            </motion.div>
            <motion.div variants={calloutTextVariants}>
              <h4 className="font-['Outfit'] text-lg sm:text-xl font-extrabold text-foreground">
                Looking for the Complete Master Timetable?
              </h4>
              <p className="font-['Inter'] text-xs sm:text-sm text-secondary mt-0.5">
                Explore all 45+ weekly sessions across 4 dedicated athletic hubs with live instructor bios.
              </p>
            </motion.div>
          </div>

          <motion.div variants={calloutBtnVariants} className="shrink-0 font-['Inter']">
            <Link
              href="/schedule"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-btn-bg text-btn-text font-bold text-xs sm:text-sm whitespace-nowrap shadow-sm hover:shadow-md hover:brightness-105 transition-all cursor-pointer active:scale-95"
            >
              <span>View Full Weekly Schedule</span>
              <FiArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
