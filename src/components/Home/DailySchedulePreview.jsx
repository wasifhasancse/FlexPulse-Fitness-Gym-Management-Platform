"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  FiClock, 
  FiCalendar, 
  FiUsers, 
  FiMapPin, 
  FiArrowRight, 
  FiCheckCircle,
  FiZap,
  FiActivity
} from "react-icons/fi";
import { FaFire } from "react-icons/fa";

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

export default function DailySchedulePreview() {
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [selectedPeriod, setSelectedPeriod] = useState("all");

  const dayClasses = useMemo(() => {
    return SCHEDULE_DATA.filter((item) => {
      const matchesDay = item.day === selectedDay;
      const matchesPeriod = selectedPeriod === "all" || item.period === selectedPeriod;
      return matchesDay && matchesPeriod;
    });
  }, [selectedDay, selectedPeriod]);

  return (
    <section className="py-20 lg:py-28 bg-background border-t border-brand-500/15 relative overflow-hidden transition-colors duration-300">
      {/* Ambient Lighting Meshes */}
      <div className="absolute top-1/3 left-0 w-96 sm:w-140 h-96 sm:h-140 bg-brand-500/8 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-0 w-80 sm:w-120 h-80 sm:h-120 bg-active/6 rounded-full blur-[130px] pointer-events-none -z-10" />

      <div className="w-11/12 mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 sm:mb-16 gap-6 border-b border-brand-500/15 pb-8">
          
          <div className="max-w-2xl space-y-3">
            {/* Kicker Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-800/25 dark:bg-[#1B1A55]/70 border border-brand-500/25 text-xs font-bold tracking-wide shadow-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-active opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-active"></span>
              </span>
              <span className="text-active uppercase tracking-wider font-extrabold text-[11px]">
                Live Timetable
              </span>
              <span className="text-[#535C91] dark:text-[#9290C3]">
                • Real-Time Class Availability
              </span>
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-['Outfit'] tracking-tight text-foreground leading-[1.12]">
              Weekly Live <span className="text-active">Schedule</span>
            </h2>

            <p className="text-sm sm:text-base text-[#535C91] dark:text-[#9290C3] font-['Inter'] leading-relaxed pt-1">
              From dawn metabolic conditioning at 06:30 AM to evening Olympic lifting and decompression flow. Filter by day and time to plan your weekly athletic regimen.
            </p>
          </div>

          {/* Quick Schedule Telemetry */}
          <div className="flex items-center gap-4 sm:gap-6 bg-[#535C91]/5 dark:bg-[#1B1A55]/50 p-4 rounded-2xl border border-brand-500/20 shrink-0 font-['Outfit'] self-start lg:self-end">
            <div>
              <p className="text-2xl font-black text-active tracking-tight">45+</p>
              <p className="text-[10px] sm:text-xs text-[#535C91] dark:text-[#9290C3] font-bold uppercase tracking-wider">
                Weekly Classes
              </p>
            </div>
            <div className="h-8 w-px bg-brand-500/20" />
            <div>
              <p className="text-2xl font-black text-active tracking-tight">06:00</p>
              <p className="text-[10px] sm:text-xs text-[#535C91] dark:text-[#9290C3] font-bold uppercase tracking-wider">
                Earliest Start
              </p>
            </div>
            <div className="h-8 w-px bg-brand-500/20" />
            <div>
              <p className="text-2xl font-black text-active tracking-tight">100%</p>
              <p className="text-[10px] sm:text-xs text-[#535C91] dark:text-[#9290C3] font-bold uppercase tracking-wider">
                Coach Led
              </p>
            </div>
          </div>

        </div>

        {/* Day Selector (Single Line Tabs) */}
        <div className="flex items-center justify-between gap-4 overflow-x-auto pb-4 mb-6 no-scrollbar select-none border-b border-brand-500/15">
          <div className="flex items-center gap-2">
            {DAYS.map((day) => {
              const isActive = selectedDay === day;
              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => setSelectedDay(day)}
                  className={`relative px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-tight transition-all duration-200 whitespace-nowrap cursor-pointer shrink-0 ${
                    isActive
                      ? "bg-active text-white shadow-md shadow-active/20"
                      : "bg-[#535C91]/8 dark:bg-[#1B1A55]/60 hover:bg-[#535C91]/15 text-[#535C91] dark:text-[#9290C3] border border-brand-500/15"
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>

          {/* Time Filter Pills */}
          <div className="hidden sm:flex items-center gap-1.5 shrink-0 bg-[#535C91]/5 dark:bg-[#1B1A55]/50 p-1 rounded-xl border border-brand-500/15 text-xs font-['Inter']">
            {[
              { id: "all", label: "All Slots" },
              { id: "morning", label: "Morning" },
              { id: "midday", label: "Midday" },
              { id: "evening", label: "Evening" }
            ].map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setSelectedPeriod(p.id)}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                  selectedPeriod === p.id 
                    ? "bg-active text-white shadow-xs" 
                    : "text-[#535C91] dark:text-[#9290C3] hover:text-foreground"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Class Rows Container */}
        <div className="space-y-4 mb-12 sm:mb-16">
          {dayClasses.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-white dark:bg-[#070F2B] border border-brand-500/20 text-[#535C91] dark:text-[#9290C3]">
              <FiCalendar className="w-10 h-10 mx-auto mb-3 text-active/60" />
              <p className="font-bold text-base text-foreground font-['Outfit']">No classes scheduled for this filter</p>
              <p className="text-xs mt-1 font-['Inter']">Try switching to all slots or selecting another day.</p>
            </div>
          ) : (
            dayClasses.map((item) => {
              const occupancy = Math.round((item.enrolled / item.capacity) * 100);
              const isWaitlist = item.status === "Waitlist Only";
              const isFillingFast = item.status === "Filling Fast";

              return (
                <div
                  key={item.id}
                  className="group relative rounded-2xl sm:rounded-3xl p-5 sm:p-6 bg-white dark:bg-[#070F2B] border border-brand-500/20 hover:border-active/60 transition-all duration-300 ease-out hover:-translate-y-1 flex flex-col lg:flex-row lg:items-center justify-between gap-5 shadow-sm hover:shadow-xl"
                >
                  {/* Left Column: Time & Discipline */}
                  <div className="flex items-start sm:items-center gap-4 sm:gap-6 min-w-64">
                    <div className="p-3.5 rounded-2xl bg-[#535C91]/10 dark:bg-[#1B1A55]/80 border border-brand-500/20 text-center shrink-0 w-24">
                      <span className="block text-base sm:text-lg font-black font-['Outfit'] text-foreground group-hover:text-active transition-colors leading-tight">
                        {item.time}
                      </span>
                      <span className="block text-[11px] font-bold text-[#535C91] dark:text-[#9290C3] mt-0.5">
                        {item.duration}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-active">
                        {item.discipline}
                      </span>
                      <h3 className="font-['Outfit'] text-base sm:text-lg font-bold text-foreground group-hover:text-active transition-colors leading-snug">
                        {item.title}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-[#535C91] dark:text-[#9290C3] font-['Inter']">
                        <span className="flex items-center gap-1">
                          <FiMapPin className="w-3.5 h-3.5 text-active" />
                          {item.studio}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1 font-semibold text-foreground/80">
                          <FaFire className="w-3 h-3 text-active" />
                          {item.calories}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Middle Column: Instructor Profile */}
                  <div className="flex items-center gap-3 min-w-52">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-brand-500/20 shrink-0">
                      <Image
                        src={item.coachAvatar}
                        alt={item.coach}
                        fill
                        unoptimized
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-['Outfit'] text-xs sm:text-sm font-bold text-foreground leading-tight">
                        {item.coach}
                      </p>
                      <p className="font-['Inter'] text-[11px] text-[#535C91] dark:text-[#9290C3]">
                        {item.coachRole}
                      </p>
                    </div>
                  </div>

                  {/* Right Column: Capacity Meter & Action CTA */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between lg:justify-end gap-4 min-w-64 pt-3 sm:pt-0 border-t sm:border-t-0 border-brand-500/15">
                    
                    {/* Capacity Meter */}
                    <div className="space-y-1.5 w-full sm:w-36">
                      <div className="flex items-center justify-between text-[11px] font-['Inter']">
                        <span className="font-semibold text-[#535C91] dark:text-[#9290C3]">
                          {item.enrolled}/{item.capacity} Spots
                        </span>
                        <span className={`font-bold text-[10px] uppercase px-1.5 py-0.5 rounded ${
                          isWaitlist 
                            ? "bg-rose-500/10 text-rose-500" 
                            : isFillingFast 
                            ? "bg-amber-500/10 text-amber-500" 
                            : "bg-emerald-500/10 text-emerald-500"
                        }`}>
                          {item.status}
                        </span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-[#535C91]/15 dark:bg-[#1B1A55] overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            isWaitlist ? "bg-rose-500" : isFillingFast ? "bg-amber-400" : "bg-active"
                          }`}
                          style={{ width: `${occupancy}%` }}
                        />
                      </div>
                    </div>

                    {/* Book CTA */}
                    <Link
                      href="/schedule"
                      className={`inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 cursor-pointer shadow-xs whitespace-nowrap active:scale-95 ${
                        isWaitlist
                          ? "bg-[#535C91]/15 dark:bg-[#1B1A55]/80 hover:bg-[#535C91]/25 text-foreground border border-brand-500/20"
                          : "bg-btn-bg text-btn-text hover:opacity-90 shadow-active/20"
                      }`}
                    >
                      <span>{isWaitlist ? "Join Waitlist" : "Reserve Slot"}</span>
                      <FiArrowRight className="w-3.5 h-3.5" />
                    </Link>

                  </div>

                </div>
              );
            })
          )}
        </div>

        {/* Bottom Full Schedule Navigation Banner */}
        <div className="rounded-3xl p-6 sm:p-8 bg-linear-to-r from-brand-800/30 via-[#1B1A55]/40 to-brand-800/30 border border-brand-500/25 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-active/20 flex items-center justify-center text-active shrink-0 border border-brand-500/30">
              <FiCalendar className="w-6 h-6 text-active" />
            </div>
            <div>
              <h4 className="font-['Outfit'] text-lg sm:text-xl font-extrabold text-foreground">
                Looking for the Complete Master Timetable?
              </h4>
              <p className="font-['Inter'] text-xs sm:text-sm text-[#535C91] dark:text-[#9290C3] mt-0.5">
                Explore all 45+ weekly sessions across 4 dedicated athletic hubs with live instructor bios.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 font-['Inter']">
            <Link
              href="/schedule"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-btn-bg text-btn-text font-bold text-xs sm:text-sm whitespace-nowrap shadow-md hover:opacity-90 transition-all cursor-pointer"
            >
              <span>View Full Weekly Schedule</span>
              <FiArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
