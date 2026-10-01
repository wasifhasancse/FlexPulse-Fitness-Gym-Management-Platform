"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import ScheduleHeroHeader from "./ScheduleHeroHeader";
import ScheduleFilterDeck from "./ScheduleFilterDeck";
import ScheduleGrid from "./ScheduleGrid";
import SchedulePagination from "./SchedulePagination";
import ScheduleVipBanner from "./ScheduleVipBanner";

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
  const [viewMode, setViewMode] = useState("grid"); // 'grid' | 'weekly' | 'table'
  const [currentPage, setCurrentPage] = useState(1);
  const [printDate, setPrintDate] = useState("");

  const scheduleGridRef = useRef(null);

  useEffect(() => {
    setPrintDate(
      new Date().toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    );
  }, []);

  // Map database classes to their scheduled weekly time slots
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
    <div className="min-h-screen bg-background text-foreground py-8 sm:py-12 transition-colors duration-300">
      {/* ========================================================================= */}
      {/* PRINT-ONLY OFFICIAL MASTER TIMETABLE                                      */}
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
            <p>
              Filter: {selectedDay} • {selectedCategory} Categories
            </p>
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
                <td className="py-2 px-3 border border-gray-300 font-semibold">
                  {s.time} ({s.duration})
                </td>
                <td className="py-2 px-3 border border-gray-300 font-bold">{s.className}</td>
                <td className="py-2 px-3 border border-gray-300">{s.category}</td>
                <td className="py-2 px-3 border border-gray-300">{s.room}</td>
                <td className="py-2 px-3 border border-gray-300 font-semibold">
                  {s.authorName}
                </td>
                <td className="py-2 px-3 border border-gray-300">{s.level}</td>
                <td className="py-2 px-3 border border-gray-300 text-right font-bold">
                  ${s.price}/mo
                </td>
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
      {/* SCREEN UI: Strict w-11/12 mx-auto container matching Navbar/Footer        */}
      {/* ========================================================================= */}
      <div className="w-11/12 mx-auto relative z-10 space-y-8 sm:space-y-10 print:hidden">
        {/* 1. Hero Header */}
        <ScheduleHeroHeader />

        {/* 2. Schedule Filter Deck with Animated Tabs & Controls */}
        <div ref={scheduleGridRef}>
          <ScheduleFilterDeck
            daysOfWeek={DAYS_OF_WEEK}
            dayCounts={dayCounts}
            selectedDay={selectedDay}
            setSelectedDay={setSelectedDay}
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            viewMode={viewMode}
            setViewMode={setViewMode}
            handlePrint={handlePrint}
            resetAllFilters={resetAllFilters}
            hasActiveFilters={hasActiveFilters}
            totalItems={totalItems}
            startIndex={startIndex}
            endIndex={endIndex}
            scheduleGridRef={scheduleGridRef}
          />
        </div>

        {/* 3. Staged Grid / Timetable / Table Ledger */}
        <ScheduleGrid
          viewMode={viewMode}
          paginatedSessions={paginatedSessions}
          filteredSessions={filteredSessions}
          weeklyGroupedSessions={weeklyGroupedSessions}
          daysOfWeek={DAYS_OF_WEEK}
          selectedDay={selectedDay}
          totalItems={totalItems}
          resetAllFilters={resetAllFilters}
        />

        {/* 4. Floating Glassmorphic Pagination (for Grid and Table views) */}
        {viewMode !== "weekly" && (
          <SchedulePagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            onPageChange={handlePageChange}
          />
        )}

        {/* 5. Personalized Coaching VIP Banner */}
        <ScheduleVipBanner />
      </div>
    </div>
  );
}
