"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import AnimatedSectionTitle from "@/components/common/AnimatedSectionTitle";
import {
  FiCalendar,
  FiClock,
  FiSearch,
  FiGrid,
  FiList,
  FiMapPin,
  FiUser,
  FiZap,
  FiX,
  FiPrinter,
  FiChevronLeft,
  FiChevronRight,
  FiColumns,
} from "react-icons/fi";
import { FaFireAlt, FaDumbbell } from "react-icons/fa";
import ScrollAnimate from "@/components/common/ScrollAnimate";

const DAYS_OF_WEEK = [
  { full: "Monday", short: "Mon" },
  { full: "Tuesday", short: "Tue" },
  { full: "Wednesday", short: "Wed" },
  { full: "Thursday", short: "Thu" },
  { full: "Friday", short: "Fri" },
  { full: "Saturday", short: "Sat" },
  { full: "Sunday", short: "Sun" },
];

const ROOM_ASSIGNMENTS = {
  Weights: "Studio A • Iron Arena",
  HIIT: "CrossFit Box • Turf",
  Cardio: "Studio B • Cardio Dome",
  Stretching: "Studio C • Zen Pavilion",
  Pilates: "Pilates Suite • Studio D",
  Combat: "Combat Ring • Zone 4",
};

const CALORIE_ESTIMATES = {
  Weights: "550-680 kcal",
  HIIT: "720-850 kcal",
  Cardio: "600-750 kcal",
  Stretching: "320-400 kcal",
  Pilates: "380-480 kcal",
  Combat: "750-890 kcal",
};

const ITEMS_PER_PAGE = 6;

export default function ScheduleClient({ initialClasses = [] }) {
  const [selectedDay, setSelectedDay] = useState("All Days");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid"); // 'grid' | 'table' | 'weekly'
  const [currentPage, setCurrentPage] = useState(1);
  const [printDate, setPrintDate] = useState("");

  const scheduleGridRef = useRef(null);

  useEffect(() => {
    setPrintDate(new Date().toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }));
  }, []);

  // Map real database classes to their scheduled weekly time slots
  const scheduledSessions = useMemo(() => {
    if (!initialClasses || initialClasses.length === 0) {
      return [];
    }

    const sessions = [];

    initialClasses.forEach((cls) => {
      const scheduleString = cls.classSchedule || "Mon, Wed, Fri";
      const scheduleDays = scheduleString
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      const category = cls.category || "Weights";
      const room = ROOM_ASSIGNMENTS[category] || "Main Training Studio";
      const calories = CALORIE_ESTIMATES[category] || "500-650 kcal";
      const level = cls.difficultyLevel || "All Levels";
      const time = cls.time || "08:00 AM";

      scheduleDays.forEach((dayAbbr) => {
        const matchedDay = DAYS_OF_WEEK.find(
          (d) =>
            d.full.toLowerCase().startsWith(dayAbbr.toLowerCase()) ||
            d.short.toLowerCase() === dayAbbr.toLowerCase()
        );

        const dayName = matchedDay ? matchedDay.full : dayAbbr;

        sessions.push({
          _id: cls._id,
          className: cls.className,
          category: category,
          authorName: cls.authorName || "Certified Master Coach",
          authorImage:
            cls.authorImage ||
            "https://images.unsplash.com/photo-1567013127542-490d757e51fc?q=80&w=800",
          price: cls.price || 30,
          duration: cls.duration ? `${cls.duration} mins` : "50 mins",
          image:
            cls.classImage ||
            cls.image ||
            "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800",
          day: dayName,
          time: time,
          room: room,
          level: level,
          calories: calories,
          slot: cls.slot || 20,
        });
      });
    });

    // Chronological day order
    const dayOrder = {
      Monday: 1,
      Tuesday: 2,
      Wednesday: 3,
      Thursday: 4,
      Friday: 5,
      Saturday: 6,
      Sunday: 7,
    };

    sessions.sort((a, b) => {
      const orderDiff = (dayOrder[a.day] || 99) - (dayOrder[b.day] || 99);
      if (orderDiff !== 0) return orderDiff;
      return a.time.localeCompare(b.time);
    });

    return sessions;
  }, [initialClasses]);

  // Extract unique categories
  const categories = useMemo(() => {
    const set = new Set();
    scheduledSessions.forEach((s) => set.add(s.category));
    return ["All", ...Array.from(set)];
  }, [scheduledSessions]);

  // Count sessions per day
  const dayCounts = useMemo(() => {
    const counts = { "All Days": scheduledSessions.length };
    DAYS_OF_WEEK.forEach((d) => {
      counts[d.full] = scheduledSessions.filter((s) => s.day === d.full).length;
    });
    return counts;
  }, [scheduledSessions]);

  // Filter sessions
  const filteredSessions = useMemo(() => {
    return scheduledSessions.filter((session) => {
      const matchesDay = selectedDay === "All Days" || session.day === selectedDay;
      const matchesCategory =
        selectedCategory === "All" ||
        session.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchesDifficulty =
        selectedDifficulty === "All" ||
        session.level.toLowerCase() === selectedDifficulty.toLowerCase();

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        session.className.toLowerCase().includes(q) ||
        session.authorName.toLowerCase().includes(q) ||
        session.room.toLowerCase().includes(q) ||
        session.category.toLowerCase().includes(q);

      return matchesDay && matchesCategory && matchesDifficulty && matchesSearch;
    });
  }, [scheduledSessions, selectedDay, selectedCategory, selectedDifficulty, searchQuery]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedDay, selectedCategory, selectedDifficulty, searchQuery]);

  // Pagination calculation
  const totalItems = filteredSessions.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalItems);
  const paginatedSessions = useMemo(() => {
    return filteredSessions.slice(startIndex, endIndex);
  }, [filteredSessions, startIndex, endIndex]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages && newPage !== currentPage) {
      setCurrentPage(newPage);
      if (scheduleGridRef.current) {
        scheduleGridRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  // Group sessions by day for weekly timeline view
  const weeklyGroupedSessions = useMemo(() => {
    const map = {};
    DAYS_OF_WEEK.forEach((d) => {
      map[d.full] = [];
    });

    filteredSessions.forEach((s) => {
      if (map[s.day]) {
        map[s.day].push(s);
      }
    });

    return map;
  }, [filteredSessions]);

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const resetAllFilters = () => {
    setSelectedDay("All Days");
    setSelectedCategory("All");
    setSelectedDifficulty("All");
    setSearchQuery("");
    setCurrentPage(1);
  };

  const hasActiveFilters =
    selectedDay !== "All Days" ||
    selectedCategory !== "All" ||
    selectedDifficulty !== "All" ||
    searchQuery.trim().length > 0;

  return (
    <div className="min-h-screen bg-background text-foreground py-10 sm:py-14 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      
      {/* ========================================================================= */}
      {/* PRINT-ONLY OFFICIAL TIMETABLE (Hidden on screen, Beautiful on Print)     */}
      {/* ========================================================================= */}
      <div className="hidden print:block print:w-full print:text-black print:bg-white p-6 space-y-6">
        <div className="border-b-2 border-black pb-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black uppercase tracking-wider text-black">
              FLEXPULSE ATHLETIC CLUB
            </h1>
            <p className="text-xs text-gray-700 font-semibold tracking-wide">
              Official Master Training Timetable • Weekly Schedule
            </p>
          </div>
          <div className="text-right text-xs text-gray-600">
            <p className="font-bold text-black">Generated: {printDate}</p>
            <p>Filter: {selectedDay} • {selectedCategory} Categories</p>
            <p>Total Scheduled Sessions: {filteredSessions.length}</p>
          </div>
        </div>

        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b-2 border-black bg-gray-100 text-black uppercase font-bold text-[10px]">
              <th className="py-2.5 px-3 border border-gray-300">Day</th>
              <th className="py-2.5 px-3 border border-gray-300">Time</th>
              <th className="py-2.5 px-3 border border-gray-300">Class Name</th>
              <th className="py-2.5 px-3 border border-gray-300">Discipline</th>
              <th className="py-2.5 px-3 border border-gray-300">Studio Location</th>
              <th className="py-2.5 px-3 border border-gray-300">Master Coach</th>
              <th className="py-2.5 px-3 border border-gray-300">Intensity</th>
              <th className="py-2.5 px-3 border border-gray-300 text-right">Pass Rate</th>
            </tr>
          </thead>
          <tbody>
            {filteredSessions.map((s, idx) => (
              <tr key={`print-${s._id}-${idx}`} className="border-b border-gray-200">
                <td className="py-2 px-3 border border-gray-300 font-bold">{s.day}</td>
                <td className="py-2 px-3 border border-gray-300 font-semibold">{s.time} ({s.duration})</td>
                <td className="py-2 px-3 border border-gray-300 font-bold">{s.className}</td>
                <td className="py-2 px-3 border border-gray-300">{s.category}</td>
                <td className="py-2 px-3 border border-gray-300">{s.room}</td>
                <td className="py-2 px-3 border border-gray-300 font-semibold">{s.authorName}</td>
                <td className="py-2 px-3 border border-gray-300">{s.level}</td>
                <td className="py-2 px-3 border border-gray-300 text-right font-bold">${s.price}/mo</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pt-4 border-t border-gray-300 flex items-center justify-between text-[10px] text-gray-500">
          <span>FlexPulse Athletic Center • High-Performance Athletic Training</span>
          <span>Inquiries & Reservations: www.flexpulse.com • support@flexpulse.com</span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SCREEN UI (Hidden when printing)                                         */}
      {/* ========================================================================= */}
      <div className="max-w-7xl mx-auto space-y-8 sm:space-y-10 print:hidden">
        
        {/* Header with Exit Animation */}
        <AnimatedSectionTitle
          kicker="Weekly Class Timetable"
          title="Plan Your Weekly Routine"
          highlightText="Weekly Routine"
          subtitle="From high-energy strength complexes to evening recovery flows, browse our weekly class schedule led by certified coaches."
          align="center"
          className="mb-6 sm:mb-8"
        />

        {/* Schedule Controls Deck */}
        <div
          ref={scheduleGridRef}
          className="bg-brand-900/50 dark:bg-[#121026]/75 border border-brand-500/20 rounded-2xl p-4 sm:p-5 backdrop-blur-md shadow-sm space-y-4"
        >
          {/* Day of Week Selector Pills with Layout Animation */}
          <LayoutGroup id="scheduleDaySelectorGroup">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              <button
                onClick={() => setSelectedDay("All Days")}
                className={`relative px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer flex items-center gap-1.5 ${
                  selectedDay === "All Days"
                    ? "text-btn-text"
                    : "bg-background border border-brand-500/15 text-secondary hover:text-foreground hover:bg-brand-500/10"
                }`}
              >
                {selectedDay === "All Days" && (
                  <motion.span
                    layoutId="activeScheduleDaySelectorPill"
                    className="absolute inset-0 rounded-xl bg-active shadow-sm"
                    transition={{ type: "spring", stiffness: 450, damping: 35 }}
                  />
                )}
                <span className="relative z-10">All Days</span>
                <span
                  className={`relative z-10 px-1.5 py-0.2 rounded-full text-[10px] font-extrabold ${
                    selectedDay === "All Days"
                      ? "bg-white/20 text-white"
                      : "bg-brand-500/10 text-secondary"
                  }`}
                >
                  {dayCounts["All Days"] || 0}
                </span>
              </button>

              {DAYS_OF_WEEK.map((day) => {
                const isSelected = selectedDay === day.full;
                const count = dayCounts[day.full] || 0;
                return (
                  <button
                    key={day.full}
                    onClick={() => setSelectedDay(day.full)}
                    className={`relative px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer flex items-center gap-1.5 ${
                      isSelected
                        ? "text-btn-text"
                        : "bg-background border border-brand-500/15 text-secondary hover:text-foreground hover:bg-brand-500/10"
                    }`}
                  >
                    {isSelected && (
                      <motion.span
                        layoutId="activeScheduleDaySelectorPill"
                        className="absolute inset-0 rounded-xl bg-active shadow-sm"
                        transition={{ type: "spring", stiffness: 450, damping: 35 }}
                      />
                    )}
                    <span className="relative z-10 hidden sm:inline">{day.full}</span>
                    <span className="relative z-10 sm:hidden">{day.short}</span>
                    <span
                      className={`relative z-10 px-1.5 py-0.2 rounded-full text-[10px] font-extrabold ${
                        isSelected
                          ? "bg-white/20 text-white"
                          : "bg-brand-500/10 text-secondary"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </LayoutGroup>

          {/* Search, Category & View Switcher Row */}
          <div className="pt-3 border-t border-brand-500/15 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 sm:gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <FiSearch
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-secondary"
                size={15}
              />
              <input
                type="text"
                placeholder="Search class, coach, or studio room..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-9 py-2 text-xs sm:text-sm bg-background border border-brand-500/20 rounded-xl text-foreground placeholder:text-secondary focus:outline-none focus:border-active transition-colors shadow-xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary hover:text-foreground"
                >
                  <FiX size={14} />
                </button>
              )}
            </div>

            {/* Category Filter Pills with Layout Animation */}
            <LayoutGroup id="scheduleCategorySelectorGroup">
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
                {categories.map((cat) => {
                  const isSelected = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`relative px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                        isSelected
                          ? "text-btn-text font-bold"
                          : "bg-background border border-brand-500/15 text-secondary hover:text-foreground"
                      }`}
                    >
                      {isSelected && (
                        <motion.span
                          layoutId="activeScheduleCategorySelectorPill"
                          className="absolute inset-0 rounded-xl bg-active shadow-xs"
                          transition={{ type: "spring", stiffness: 450, damping: 35 }}
                        />
                      )}
                      <span className="relative z-10">{cat}</span>
                    </button>
                  );
                })}
              </div>
            </LayoutGroup>

            {/* Right Tools: View Mode & Print */}
            <div className="flex items-center justify-between md:justify-end gap-2 shrink-0">
              {/* Print Timetable Button */}
              <button
                onClick={handlePrint}
                title="Print Official Weekly Timetable"
                className="px-3 py-2 rounded-xl border border-brand-500/25 bg-background hover:bg-brand-500/10 text-secondary hover:text-foreground transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
              >
                <FiPrinter size={15} className="text-active" />
                <span>Print Timetable</span>
              </button>

              {/* View Mode Toggle with Layout Animation */}
              <LayoutGroup id="scheduleViewModeGroup">
                <div className="flex items-center bg-background p-1 rounded-xl border border-brand-500/20">
                  {[
                    { id: "grid", title: "Card Grid View", icon: FiGrid },
                    { id: "weekly", title: "Day-by-Day Timetable", icon: FiColumns },
                    { id: "table", title: "Table Ledger View", icon: FiList },
                  ].map((mode) => {
                    const Icon = mode.icon;
                    const isActive = viewMode === mode.id;
                    return (
                      <button
                        key={mode.id}
                        onClick={() => setViewMode(mode.id)}
                        title={mode.title}
                        className={`relative p-1.5 rounded-lg transition-colors cursor-pointer ${
                          isActive ? "text-btn-text" : "text-secondary hover:text-foreground"
                        }`}
                      >
                        {isActive && (
                          <motion.span
                            layoutId="activeScheduleViewModePill"
                            className="absolute inset-0 rounded-lg bg-active shadow-xs"
                            transition={{ type: "spring", stiffness: 450, damping: 35 }}
                          />
                        )}
                        <Icon size={15} className="relative z-10" />
                      </button>
                    );
                  })}
                </div>
              </LayoutGroup>
            </div>
          </div>

          {/* Active Filter Chips & Live Count */}
          <div className="pt-2 border-t border-brand-500/15 flex flex-wrap items-center justify-between gap-2 text-xs text-secondary">
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>
                Showing{" "}
                <strong className="text-foreground font-bold">
                  {viewMode === "weekly"
                    ? totalItems
                    : `${totalItems > 0 ? startIndex + 1 : 0}–${endIndex}`}
                </strong>{" "}
                of <strong className="text-foreground font-bold">{totalItems}</strong> scheduled sessions
                {selectedDay !== "All Days" && (
                  <span>
                    {" "}
                    on <strong>{selectedDay}</strong>
                  </span>
                )}
                {selectedCategory !== "All" && (
                  <span>
                    {" "}
                    in <strong>{selectedCategory}</strong>
                  </span>
                )}
              </span>
            </div>

            {hasActiveFilters && (
              <button
                onClick={resetAllFilters}
                className="text-active font-bold hover:underline cursor-pointer"
              >
                Reset Filters
              </button>
            )}
          </div>
        </div>

        {/* Empty State */}
        {totalItems === 0 ? (
          <div className="text-center py-16 bg-brand-900/30 dark:bg-[#121026]/40 border border-brand-500/20 rounded-3xl p-8 space-y-3">
            <FiCalendar size={32} className="mx-auto text-secondary opacity-60" />
            <h3 className="font-['Outfit'] text-xl font-bold text-foreground">
              No Sessions Scheduled
            </h3>
            <p className="text-xs text-secondary max-w-sm mx-auto">
              No workout sessions match your selected day or category filters. Try switching to &quot;All Days&quot; or resetting your search.
            </p>
            <button
              onClick={resetAllFilters}
              className="px-4 py-2 rounded-xl bg-active text-btn-text text-xs font-bold shadow-sm hover:opacity-90 cursor-pointer"
            >
              Show All Sessions
            </button>
          </div>
        ) : viewMode === "grid" ? (
          /* View 1: Card Grid View with Pagination */
          <div className="space-y-8">
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {paginatedSessions.map((session, index) => (
                  <ScrollAnimate key={`${session._id}-${session.day}-${index}`} className="h-full" speed="animate__faster">
                    <motion.div
                      layout
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="group bg-brand-900/40 dark:bg-[#121026]/75 border border-brand-500/20 hover:border-active/50 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full"
                    >
                  {/* Image & Top Badges */}
                  <div className="relative h-44 w-full overflow-hidden bg-brand-800/30">
                    <Image
                      src={session.image}
                      alt={session.className}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                    {/* Day & Category Badges */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      <span className="px-2.5 py-1 rounded-full bg-active text-btn-text text-[10px] font-black uppercase tracking-wider shadow group-hover:animate__animated group-hover:animate__pulse">
                        {session.day}
                      </span>
                      <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-bold border border-white/10">
                        {session.category}
                      </span>
                    </div>

                    {/* Bottom Image Info */}
                    <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white text-xs">
                      <span className="flex items-center gap-1 font-bold text-amber-300 drop-shadow">
                        <FaFireAlt size={11} className="group-hover:animate__animated group-hover:animate__bounce" /> {session.calories}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-white/20 backdrop-blur-md text-[10px] font-bold uppercase">
                        {session.level}
                      </span>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-4 sm:p-5 space-y-3.5 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <h3 className="font-['Outfit'] text-lg font-bold text-foreground group-hover:text-active transition-colors line-clamp-1 group-hover:animate__animated group-hover:animate__headShake">
                        {session.className}
                      </h3>

                      <div className="space-y-1.5 text-xs text-secondary">
                        <div className="flex items-center gap-2">
                          <FiClock className="text-active shrink-0" size={13} />
                          <span className="font-semibold text-foreground">{session.time}</span>
                          <span>•</span>
                          <span>{session.duration}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FiMapPin className="text-active shrink-0" size={13} />
                          <span className="truncate">{session.room}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FiUser className="text-active shrink-0" size={13} />
                          <span className="truncate">
                            Coach <strong className="text-foreground">{session.authorName}</strong>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Action Bar */}
                    <div className="pt-3 border-t border-brand-500/15 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-secondary block">
                          Monthly Pass
                        </span>
                        <span className="font-['Outfit'] text-base font-black text-foreground">
                          ${session.price}/mo
                        </span>
                      </div>

                      <Link
                        href={`/all-classes/${session._id}`}
                        className="px-4 py-2 rounded-xl bg-active text-btn-text text-xs font-bold hover:opacity-90 shadow-sm transition-all flex items-center gap-1.5 hover:animate__animated hover:animate__pulse"
                      >
                        <FiZap size={13} /> Book Class
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </ScrollAnimate>
            ))}
          </AnimatePresence>
        </motion.div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex flex-col items-center gap-3 pt-6 border-t border-brand-500/15">
                <nav
                  role="navigation"
                  aria-label="Schedule Pagination"
                  className="inline-flex items-center gap-1.5 p-1.5 rounded-2xl bg-brand-900/50 dark:bg-[#121026]/70 border border-brand-500/20 backdrop-blur-md shadow-sm"
                >
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    aria-label="Previous Page"
                    className={`inline-flex items-center justify-center gap-1 px-3 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                      currentPage === 1
                        ? "text-secondary/40 cursor-not-allowed"
                        : "text-foreground hover:bg-brand-500/10"
                    }`}
                  >
                    <FiChevronLeft size={16} />
                    <span className="hidden sm:inline">Previous</span>
                  </button>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNo) => {
                      const isActive = pageNo === currentPage;
                      return (
                        <button
                          key={pageNo}
                          onClick={() => handlePageChange(pageNo)}
                          aria-current={isActive ? "page" : undefined}
                          className={`inline-flex items-center justify-center w-9 h-9 rounded-xl font-['Inter'] text-xs font-bold transition-all duration-200 cursor-pointer ${
                            isActive
                              ? "bg-active text-btn-text shadow-md shadow-active/30 scale-105"
                              : "text-secondary hover:text-foreground hover:bg-brand-500/10"
                          }`}
                        >
                          {pageNo}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    aria-label="Next Page"
                    className={`inline-flex items-center justify-center gap-1 px-3 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                      currentPage === totalPages
                        ? "text-secondary/40 cursor-not-allowed"
                        : "text-foreground hover:bg-brand-500/10"
                    }`}
                  >
                    <span className="hidden sm:inline">Next</span>
                    <FiChevronRight size={16} />
                  </button>
                </nav>

                <span className="text-[11px] text-secondary">
                  Page {currentPage} of {totalPages} • {totalItems} total sessions
                </span>
              </div>
            )}
          </div>
        ) : viewMode === "weekly" ? (
          /* View 2: Weekly Day-by-Day Columns View */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
            {DAYS_OF_WEEK.map((day) => {
              const daySessions = weeklyGroupedSessions[day.full] || [];
              const isTodayFilter = selectedDay === day.full;
              return (
                <div
                  key={day.full}
                  className={`rounded-2xl border p-3 flex flex-col space-y-3 transition-colors ${
                    isTodayFilter
                      ? "bg-active/5 border-active/40"
                      : "bg-brand-900/30 dark:bg-[#121026]/50 border-brand-500/15"
                  }`}
                >
                  <div className="pb-2 border-b border-brand-500/15 flex items-center justify-between">
                    <strong className="font-['Outfit'] text-sm font-bold text-foreground">
                      {day.full}
                    </strong>
                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-brand-500/10 text-secondary">
                      {daySessions.length}
                    </span>
                  </div>

                  {daySessions.length === 0 ? (
                    <div className="py-8 text-center text-xs text-secondary opacity-60">
                      No classes
                    </div>
                  ) : (
                    <div className="space-y-2.5">
                      {daySessions.map((session, idx) => (
                        <Link
                          key={idx}
                          href={`/all-classes/${session._id}`}
                          className="block p-2.5 rounded-xl bg-background border border-brand-500/15 hover:border-active/50 hover:shadow-xs transition-all space-y-1.5 group"
                        >
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="font-bold text-active flex items-center gap-1">
                              <FiClock size={10} /> {session.time}
                            </span>
                            <span className="text-[9px] px-1 rounded bg-brand-500/10 text-secondary font-semibold">
                              {session.category}
                            </span>
                          </div>
                          <h4 className="text-xs font-bold text-foreground group-hover:text-active transition-colors line-clamp-1">
                            {session.className}
                          </h4>
                          <div className="text-[10px] text-secondary flex items-center justify-between">
                            <span>{session.authorName.split(" ")[0]}</span>
                            <span className="font-bold text-foreground">${session.price}/mo</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          /* View 3: Table Ledger View with Pagination */
          <div className="space-y-6">
            <div className="overflow-x-auto rounded-2xl border border-brand-500/20 bg-brand-900/40 dark:bg-[#121026]/60 backdrop-blur-md shadow-sm">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="border-b border-brand-500/20 bg-brand-800/15 text-secondary uppercase font-bold tracking-wider text-[11px]">
                  <tr>
                    <th className="py-3 px-4 sm:px-6">Day & Time</th>
                    <th className="py-3 px-4 sm:px-6">Class Session</th>
                    <th className="py-3 px-4 sm:px-6 hidden md:table-cell">Studio Room</th>
                    <th className="py-3 px-4 sm:px-6">Coach</th>
                    <th className="py-3 px-4 sm:px-6 hidden sm:table-cell">Intensity & Burn</th>
                    <th className="py-3 px-4 sm:px-6 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-500/10">
                  {paginatedSessions.map((session, idx) => (
                    <tr
                      key={`tbl-${session._id}-${session.day}-${idx}`}
                      className="hover:bg-brand-500/5 transition-colors group"
                    >
                      <td className="py-3.5 px-4 sm:px-6 whitespace-nowrap">
                        <span className="font-bold text-foreground block">{session.day}</span>
                        <span className="text-xs text-secondary flex items-center gap-1 mt-0.5">
                          <FiClock size={11} className="text-active" />
                          {session.time}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 sm:px-6">
                        <span className="font-bold text-foreground group-hover:text-active transition-colors block">
                          {session.className}
                        </span>
                        <span className="text-[11px] px-2 py-0.5 rounded bg-brand-500/10 text-active font-semibold inline-block mt-0.5">
                          {session.category}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 sm:px-6 hidden md:table-cell text-secondary">
                        {session.room}
                      </td>
                      <td className="py-3.5 px-4 sm:px-6 font-medium text-foreground whitespace-nowrap">
                        {session.authorName}
                      </td>
                      <td className="py-3.5 px-4 sm:px-6 hidden sm:table-cell">
                        <span className="text-xs text-amber-500 font-semibold flex items-center gap-1">
                          <FaFireAlt size={11} /> {session.calories}
                        </span>
                        <span className="text-[10px] text-secondary uppercase font-medium block">
                          {session.level}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 sm:px-6 text-right whitespace-nowrap">
                        <Link
                          href={`/all-classes/${session._id}`}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-active text-btn-text text-xs font-bold hover:opacity-90 shadow-sm transition-all"
                        >
                          Book (${session.price}/mo)
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Table Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex flex-col items-center gap-3 pt-4 border-t border-brand-500/15">
                <nav
                  role="navigation"
                  aria-label="Table Pagination"
                  className="inline-flex items-center gap-1.5 p-1.5 rounded-2xl bg-brand-900/50 dark:bg-[#121026]/70 border border-brand-500/20 backdrop-blur-md shadow-sm"
                >
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    aria-label="Previous Page"
                    className={`inline-flex items-center justify-center gap-1 px-3 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                      currentPage === 1
                        ? "text-secondary/40 cursor-not-allowed"
                        : "text-foreground hover:bg-brand-500/10"
                    }`}
                  >
                    <FiChevronLeft size={16} />
                    <span className="hidden sm:inline">Previous</span>
                  </button>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNo) => {
                      const isActive = pageNo === currentPage;
                      return (
                        <button
                          key={pageNo}
                          onClick={() => handlePageChange(pageNo)}
                          aria-current={isActive ? "page" : undefined}
                          className={`inline-flex items-center justify-center w-9 h-9 rounded-xl font-['Inter'] text-xs font-bold transition-all duration-200 cursor-pointer ${
                            isActive
                              ? "bg-active text-btn-text shadow-md shadow-active/30 scale-105"
                              : "text-secondary hover:text-foreground hover:bg-brand-500/10"
                          }`}
                        >
                          {pageNo}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    aria-label="Next Page"
                    className={`inline-flex items-center justify-center gap-1 px-3 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                      currentPage === totalPages
                        ? "text-secondary/40 cursor-not-allowed"
                        : "text-foreground hover:bg-brand-500/10"
                    }`}
                  >
                    <span className="hidden sm:inline">Next</span>
                    <FiChevronRight size={16} />
                  </button>
                </nav>

                <span className="text-[11px] text-secondary">
                  Page {currentPage} of {totalPages} • {totalItems} total sessions
                </span>
              </div>
            )}
          </div>
        )}

        {/* Quick CTA Box */}
        <div className="rounded-2xl bg-brand-900/40 dark:bg-[#121026]/60 border border-brand-500/20 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-5 shadow-sm">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-[11px] font-bold uppercase tracking-wider text-active">
              Personalized Coaching
            </span>
            <h2 className="font-['Outfit'] text-xl sm:text-2xl font-bold text-foreground">
              Need a Custom Workout Plan or Personal Session?
            </h2>
            <p className="text-xs sm:text-sm text-secondary max-w-xl">
              Meet our certified trainers for 1-on-1 athletic evaluations, posture correction, and custom training routines.
            </p>
          </div>
          <div className="flex items-center gap-2.5 shrink-0">
            <Link
              href="/trainers"
              className="px-4 py-2.5 rounded-xl bg-active text-btn-text font-bold text-xs sm:text-sm shadow-sm hover:opacity-90 transition-all"
            >
              Meet All Trainers
            </Link>
            <Link
              href="/calculator"
              className="px-4 py-2.5 rounded-xl border border-brand-500/25 bg-background text-foreground font-bold text-xs sm:text-sm hover:border-active transition-all"
            >
              Calculate BMI
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
