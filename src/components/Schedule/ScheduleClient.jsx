"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FiCalendar,
  FiClock,
  FiFilter,
  FiGrid,
  FiList,
  FiMapPin,
  FiSearch,
  FiUser,
  FiZap,
} from "react-icons/fi";
import { FaFireAlt, FaDumbbell } from "react-icons/fa";

const DAYS = [
  "All Days",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const DEFAULT_SCHEDULE = [
  {
    day: "Monday",
    time: "06:30 AM - 07:30 AM",
    room: "Studio A • Iron Arena",
    level: "High Intensity",
    calories: "720 kcal",
  },
  {
    day: "Monday",
    time: "09:00 AM - 10:00 AM",
    room: "Studio C • Zen Pavilion",
    level: "All Levels",
    calories: "380 kcal",
  },
  {
    day: "Monday",
    time: "05:30 PM - 06:30 PM",
    room: "Studio B • Cardio Dome",
    level: "Intermediate",
    calories: "650 kcal",
  },
  {
    day: "Tuesday",
    time: "07:00 AM - 08:00 AM",
    room: "CrossFit Box • Turf",
    level: "Pro Athlete",
    calories: "800 kcal",
  },
  {
    day: "Tuesday",
    time: "10:30 AM - 11:30 AM",
    room: "Studio A • Iron Arena",
    level: "Intermediate",
    calories: "550 kcal",
  },
  {
    day: "Tuesday",
    time: "06:00 PM - 07:00 PM",
    room: "Combat Ring • Zone 4",
    level: "High Intensity",
    calories: "780 kcal",
  },
  {
    day: "Wednesday",
    time: "06:30 AM - 07:30 AM",
    room: "Studio B • Cardio Dome",
    level: "High Intensity",
    calories: "690 kcal",
  },
  {
    day: "Wednesday",
    time: "01:00 PM - 02:00 PM",
    room: "Studio C • Zen Pavilion",
    level: "Beginner Friendly",
    calories: "320 kcal",
  },
  {
    day: "Wednesday",
    time: "07:00 PM - 08:00 PM",
    room: "Studio A • Iron Arena",
    level: "All Levels",
    calories: "580 kcal",
  },
  {
    day: "Thursday",
    time: "07:30 AM - 08:30 AM",
    room: "CrossFit Box • Turf",
    level: "Intermediate",
    calories: "710 kcal",
  },
  {
    day: "Thursday",
    time: "05:00 PM - 06:00 PM",
    room: "Combat Ring • Zone 4",
    level: "Pro Athlete",
    calories: "820 kcal",
  },
  {
    day: "Friday",
    time: "07:00 AM - 08:00 AM",
    room: "Studio A • Iron Arena",
    level: "High Intensity",
    calories: "750 kcal",
  },
  {
    day: "Friday",
    time: "06:30 PM - 07:30 PM",
    room: "Studio B • Cardio Dome",
    level: "All Levels",
    calories: "600 kcal",
  },
  {
    day: "Saturday",
    time: "08:30 AM - 10:00 AM",
    room: "CrossFit Box & Turf",
    level: "Pro Athlete",
    calories: "920 kcal",
  },
  {
    day: "Saturday",
    time: "11:00 AM - 12:15 PM",
    room: "Studio C • Zen Pavilion",
    level: "All Levels",
    calories: "410 kcal",
  },
  {
    day: "Sunday",
    time: "09:00 AM - 10:30 AM",
    room: "Outdoor Arena / Studio A",
    level: "All Levels",
    calories: "650 kcal",
  },
];

export default function ScheduleClient({ initialClasses = [] }) {
  const [selectedDay, setSelectedDay] = useState("All Days");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid"); // 'grid' | 'table'

  // Map real database classes to weekly slots
  const scheduledSessions = useMemo(() => {
    if (!initialClasses || initialClasses.length === 0) {
      return DEFAULT_SCHEDULE.map((item, idx) => ({
        _id: `fallback-${idx}`,
        className: idx % 2 === 0 ? "Heavy Strength Conditioning" : "HIIT Cardio Surge",
        category: idx % 2 === 0 ? "Weights" : "HIIT",
        authorName: idx % 3 === 0 ? "Coach Marcus" : "Elena Rostova",
        price: "25",
        image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800",
        ...item,
      }));
    }

    return DEFAULT_SCHEDULE.map((slot, index) => {
      const cls = initialClasses[index % initialClasses.length];
      return {
        _id: cls._id,
        className: cls.className,
        category: cls.category || "Fitness",
        authorName: cls.authorName || "Certified Coach",
        price: cls.price || "25",
        image: cls.image || "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800",
        day: slot.day,
        time: slot.time,
        room: slot.room,
        level: slot.level,
        calories: slot.calories,
      };
    });
  }, [initialClasses]);

  const categories = useMemo(() => {
    const set = new Set();
    scheduledSessions.forEach((s) => set.add(s.category));
    return ["All", ...Array.from(set)];
  }, [scheduledSessions]);

  const filteredSessions = useMemo(() => {
    return scheduledSessions.filter((session) => {
      const matchesDay = selectedDay === "All Days" || session.day === selectedDay;
      const matchesCategory =
        selectedCategory === "All" ||
        session.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchesSearch =
        !searchQuery ||
        session.className.toLowerCase().includes(searchQuery.toLowerCase()) ||
        session.authorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        session.room.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesDay && matchesCategory && matchesSearch;
    });
  }, [scheduledSessions, selectedDay, selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-background py-14 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header Banner */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-active/30 bg-active/10 text-active text-xs font-extrabold uppercase tracking-widest">
            <FiCalendar size={13} />
            Weekly Class Schedule
          </div>
          <h1 className="font-['Outfit'] text-4xl sm:text-5xl lg:text-6xl font-black text-foreground tracking-tight">
            Plan Your <span className="text-active">Workout Routine</span>
          </h1>
          <p className="font-['Inter'] text-sm sm:text-base text-secondary max-w-2xl mx-auto leading-relaxed">
            From high-energy dawn HIIT to evening zen recovery, choose from our weekly curated sessions led by certified elite coaches. Filter by day, category, or intensity.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-brand-900/40 dark:bg-[#121026]/60 border border-brand-500/20 rounded-2xl p-4 sm:p-6 backdrop-blur-xl shadow-lg space-y-4">
          {/* Day Selector Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {DAYS.map((day) => {
              const isSelected = selectedDay === day;
              return (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? "bg-active text-btn-text shadow-md scale-[1.02]"
                      : "bg-brand-800/20 text-foreground hover:bg-brand-800/40 border border-brand-500/10"
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-brand-500/15">
            {/* Category Pills & Search */}
            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-secondary" size={14} />
                <input
                  type="text"
                  placeholder="Search class, trainer or room..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-background/60 border border-brand-500/20 rounded-xl text-foreground placeholder:text-secondary focus:outline-none focus:border-active"
                />
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto">
                {categories.slice(0, 5).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                      selectedCategory === cat
                        ? "bg-active/20 text-active border border-active/40"
                        : "text-secondary hover:text-foreground border border-transparent"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
              <span className="text-xs text-secondary font-medium">
                {filteredSessions.length} {filteredSessions.length === 1 ? "Session" : "Sessions"}
              </span>
              <div className="flex items-center bg-background/80 border border-brand-500/20 rounded-xl p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  title="Grid View"
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                    viewMode === "grid" ? "bg-active text-btn-text" : "text-secondary hover:text-foreground"
                  }`}
                >
                  <FiGrid size={15} />
                </button>
                <button
                  onClick={() => setViewMode("table")}
                  title="Table View"
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                    viewMode === "table" ? "bg-active text-btn-text" : "text-secondary hover:text-foreground"
                  }`}
                >
                  <FiList size={15} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Content Display */}
        {filteredSessions.length === 0 ? (
          <div className="text-center py-20 bg-brand-900/20 rounded-3xl border border-brand-500/20 max-w-lg mx-auto p-8 space-y-4">
            <FaDumbbell className="mx-auto text-4xl text-secondary animate-bounce" />
            <h3 className="font-['Outfit'] text-xl font-bold text-foreground">No sessions scheduled</h3>
            <p className="text-xs sm:text-sm text-secondary">
              No fitness classes match your current filters. Try selecting &quot;All Days&quot; or resetting your search.
            </p>
            <button
              onClick={() => {
                setSelectedDay("All Days");
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="px-4 py-2 rounded-xl bg-active text-btn-text text-xs font-bold hover:opacity-90 transition-all cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : viewMode === "grid" ? (
          /* Grid View */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSessions.map((session, index) => (
              <div
                key={`${session._id}-${index}`}
                className="group relative bg-brand-900/40 dark:bg-[#121026]/70 border border-brand-500/20 hover:border-active/60 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
              >
                {/* Top image banner with time & category pill */}
                <div className="relative h-44 w-full overflow-hidden">
                  <Image
                    src={session.image}
                    alt={session.className}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-full bg-active text-btn-text text-[11px] font-extrabold uppercase tracking-wider shadow">
                      {session.day}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold border border-white/10">
                      {session.category}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                    <span className="flex items-center gap-1 font-semibold text-amber-300 drop-shadow">
                      <FaFireAlt size={12} />
                      {session.calories}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-white/20 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider">
                      {session.level}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="font-['Outfit'] text-xl font-bold text-foreground group-hover:text-active transition-colors line-clamp-1">
                      {session.className}
                    </h3>

                    <div className="space-y-1.5 text-xs text-secondary">
                      <div className="flex items-center gap-2">
                        <FiClock className="text-active shrink-0" size={13} />
                        <span className="font-medium text-foreground">{session.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FiMapPin className="text-active shrink-0" size={13} />
                        <span>{session.room}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FiUser className="text-active shrink-0" size={13} />
                        <span>Led by <strong className="text-foreground">{session.authorName}</strong></span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Action & Price */}
                  <div className="pt-3 border-t border-brand-500/15 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-secondary block">Price</span>
                      <span className="font-['Outfit'] text-lg font-black text-foreground">
                        ${session.price}
                      </span>
                    </div>

                    <Link
                      href={`/all-classes/${session._id}`}
                      className="px-4 py-2 rounded-xl bg-active text-btn-text text-xs font-bold hover:opacity-90 shadow-md transition-all flex items-center gap-1.5"
                    >
                      <FiZap size={13} />
                      Book Class
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Table View */
          <div className="overflow-x-auto rounded-2xl border border-brand-500/20 bg-brand-900/40 dark:bg-[#121026]/60 backdrop-blur-xl shadow-lg">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="border-b border-brand-500/20 bg-brand-800/20 text-secondary uppercase font-bold tracking-wider text-[11px]">
                <tr>
                  <th className="py-3.5 px-4 sm:px-6">Day & Time</th>
                  <th className="py-3.5 px-4 sm:px-6">Class & Category</th>
                  <th className="py-3.5 px-4 sm:px-6 hidden md:table-cell">Studio Room</th>
                  <th className="py-3.5 px-4 sm:px-6">Coach</th>
                  <th className="py-3.5 px-4 sm:px-6 hidden sm:table-cell">Intensity</th>
                  <th className="py-3.5 px-4 sm:px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-500/10">
                {filteredSessions.map((session, idx) => (
                  <tr
                    key={`tbl-${session._id}-${idx}`}
                    className="hover:bg-brand-500/5 transition-colors group"
                  >
                    <td className="py-4 px-4 sm:px-6 whitespace-nowrap">
                      <span className="font-bold text-foreground block">{session.day}</span>
                      <span className="text-xs text-secondary flex items-center gap-1">
                        <FiClock size={11} className="text-active" />
                        {session.time}
                      </span>
                    </td>
                    <td className="py-4 px-4 sm:px-6">
                      <span className="font-bold text-foreground group-hover:text-active transition-colors block">
                        {session.className}
                      </span>
                      <span className="text-[11px] px-2 py-0.5 rounded bg-brand-500/10 text-active font-semibold">
                        {session.category}
                      </span>
                    </td>
                    <td className="py-4 px-4 sm:px-6 hidden md:table-cell text-secondary">
                      {session.room}
                    </td>
                    <td className="py-4 px-4 sm:px-6 font-medium text-foreground whitespace-nowrap">
                      {session.authorName}
                    </td>
                    <td className="py-4 px-4 sm:px-6 hidden sm:table-cell">
                      <span className="text-xs text-amber-500 font-semibold flex items-center gap-1">
                        <FaFireAlt size={11} /> {session.calories}
                      </span>
                      <span className="text-[10px] text-secondary uppercase font-medium block">
                        {session.level}
                      </span>
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-right whitespace-nowrap">
                      <Link
                        href={`/all-classes/${session._id}`}
                        className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-lg bg-active text-btn-text text-xs font-bold hover:opacity-90 shadow transition-all"
                      >
                        Book
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Quick CTA Box */}
        <div className="relative rounded-3xl bg-linear-to-r from-active/20 via-brand-500/15 to-transparent border border-active/30 p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl overflow-hidden">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-extrabold uppercase tracking-widest text-active">
              Personalized Coaching
            </span>
            <h2 className="font-['Outfit'] text-2xl sm:text-3xl font-extrabold text-foreground">
              Need a Custom Workout Plan or Personal Session?
            </h2>
            <p className="text-xs sm:text-sm text-secondary max-w-xl">
              Meet our certified trainers for 1-on-1 athletic evaluations, posture correction, and custom nutrition guides.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/trainers"
              className="px-5 py-3 rounded-xl bg-active text-btn-text font-bold text-xs sm:text-sm shadow-lg hover:opacity-90 transition-all"
            >
              Meet All Trainers
            </Link>
            <Link
              href="/calculator"
              className="px-5 py-3 rounded-xl border border-brand-500/30 bg-background/60 text-foreground font-bold text-xs sm:text-sm hover:border-active transition-all"
            >
              Calculate BMI
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
