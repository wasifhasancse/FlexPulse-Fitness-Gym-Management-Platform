"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FiUsers,
  FiSearch,
  FiStar,
  FiMail,
  FiUserPlus,
  FiX,
  FiCheckCircle,
  FiArrowRight,
  FiChevronLeft,
  FiChevronRight,
  FiFilter,
  FiGrid,
  FiList,
  FiRefreshCw,
  FiCalendar,
  FiAward,
} from "react-icons/fi";
import { FaDumbbell } from "react-icons/fa";

// Curated authentic roster of coaches across all fitness specialties
const CURATED_COACHES = [
  {
    _id: "coach-1",
    name: "Marcus Vance",
    email: "marcus.vance@flexpulse.com",
    role: "trainer",
    image: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?q=80&w=800",
    specialty: "Weights",
    experience: "8+ Years",
    rating: "5.0",
    reviewsCount: 148,
    bio: "Certified strength and conditioning specialist focusing on barbell mechanics, progressive overload, and hypertrophy protocols.",
    classesCount: 4,
    skills: ["Powerlifting", "Hypertrophy", "Biomechanics"],
    classes: [
      { className: "Strength Training", category: "Weights", price: 80 },
      { className: "BoxFit", category: "Weights", price: 30 },
      { className: "Body Sculpt", category: "Weights", price: 70 },
      { className: "Barbell Foundations", category: "Weights", price: 65 },
    ],
  },
  {
    _id: "coach-2",
    name: "Elena Rostova",
    email: "elena.r@flexpulse.com",
    role: "trainer",
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800",
    specialty: "HIIT",
    experience: "6+ Years",
    rating: "4.9",
    reviewsCount: 132,
    bio: "High-intensity interval conditioning coach dedicated to metabolic acceleration, sprint endurance, and explosive athleticism.",
    classesCount: 3,
    skills: ["Metabolic Intervals", "Kettlebell", "Cardio Grit"],
    classes: [
      { className: "HIIT Blast", category: "HIIT", price: 100 },
      { className: "Bootcamp Challenge", category: "HIIT", price: 10 },
      { className: "Cardio Burn", category: "Cardio", price: 100 },
    ],
  },
  {
    _id: "coach-3",
    name: "Alana Serrano",
    email: "alana.s@flexpulse.com",
    role: "trainer",
    image: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?q=80&w=800",
    specialty: "Stretching",
    experience: "7+ Years",
    rating: "5.0",
    reviewsCount: 114,
    bio: "Holistic flexibility and mobility coach specializing in joint decompression, deep myofascial release, and athletic recovery.",
    classesCount: 3,
    skills: ["Deep Stretch", "Vinyasa Yoga", "Joint Mobility"],
    classes: [
      { className: "Yoga Flow", category: "Cardio", price: 20 },
      { className: "Mobility & Stretch", category: "Stretching", price: 30 },
      { className: "Pilates Core", category: "Stretching", price: 50 },
    ],
  },
  {
    _id: "coach-4",
    name: "Darius King",
    email: "darius.k@flexpulse.com",
    role: "trainer",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800",
    specialty: "Combat",
    experience: "9+ Years",
    rating: "4.9",
    reviewsCount: 125,
    bio: "Former competitive boxer developing rotational core power, lightning footwork, and functional fight conditioning.",
    classesCount: 3,
    skills: ["Boxing Mittwork", "Footwork", "Speed Cardio"],
    classes: [
      { className: "Kickboxing Fitness", category: "Pilates", price: 60 },
      { className: "BoxFit Pro", category: "Weights", price: 30 },
      { className: "Agility Ladder Drills", category: "HIIT", price: 45 },
    ],
  },
  {
    _id: "coach-5",
    name: "Chloe Dubois",
    email: "chloe.d@flexpulse.com",
    role: "trainer",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800",
    specialty: "Pilates",
    experience: "5+ Years",
    rating: "4.8",
    reviewsCount: 98,
    bio: "Classical and athletic Pilates instructor focusing on postural alignment, transverse abdominis control, and core stabilization.",
    classesCount: 2,
    skills: ["Reformer Pilates", "Postural Recovery", "Core Strength"],
    classes: [
      { className: "Pilates Core Foundation", category: "Stretching", price: 50 },
      { className: "Cross Training Core", category: "Stretching", price: 30 },
    ],
  },
  {
    _id: "coach-6",
    name: "Jaxson Reed",
    email: "jaxson.r@flexpulse.com",
    role: "trainer",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=800",
    specialty: "Cardio",
    experience: "8+ Years",
    rating: "4.9",
    reviewsCount: 109,
    bio: "Endurance cycling and cardio master dedicated to aerobic threshold building, rhythm rides, and lactate clearance.",
    classesCount: 3,
    skills: ["Spin Cycling", "Aerobic Conditioning", "Rhythm Cardio"],
    classes: [
      { className: "Spin Cycling", category: "Stretching", price: 60 },
      { className: "Zumba Dance", category: "Cardio", price: 80 },
      { className: "Cardio Burn Sprint", category: "Cardio", price: 90 },
    ],
  },
  {
    _id: "coach-7",
    name: "Sofia Mendez",
    email: "sofia.m@flexpulse.com",
    role: "trainer",
    image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=800",
    specialty: "Weights",
    experience: "6+ Years",
    rating: "4.9",
    reviewsCount: 88,
    bio: "Athletic body shaping specialist combining compound kettlebell work, functional resistance bands, and core sculpting.",
    classesCount: 2,
    skills: ["Body Sculpting", "Glute Activation", "Kettlebells"],
    classes: [
      { className: "Body Sculpt Extreme", category: "Weights", price: 70 },
      { className: "Bootcamp Challenge", category: "HIIT", price: 10 },
    ],
  },
  {
    _id: "coach-8",
    name: "Kai Tanaka",
    email: "kai.t@flexpulse.com",
    role: "trainer",
    image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=800",
    specialty: "CrossFit",
    experience: "10+ Years",
    rating: "5.0",
    reviewsCount: 160,
    bio: "Cross-training veteran specializing in gymnastic rings, Olympic cleans, bar complexes, and high-cadence WOD execution.",
    classesCount: 3,
    skills: ["Olympic Lifts", "Gymnastics", "WOD Programming"],
    classes: [
      { className: "Cross Training Pro", category: "Stretching", price: 30 },
      { className: "Strength Training Elite", category: "Weights", price: 80 },
      { className: "HIIT Blast Nitro", category: "HIIT", price: 100 },
    ],
  },
];

const ITEMS_PER_PAGE = 6;

export default function TrainersClient({ initialTrainers = [] }) {
  const [selectedSpecialty, setSelectedSpecialty] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("classes-desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState("grid"); // "grid" | "list"
  const [selectedCoachModal, setSelectedCoachModal] = useState(null);

  const gridTopRef = useRef(null);

  // Close modal with ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setSelectedCoachModal(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Merge database trainers seamlessly with curated athletic directory
  const allTrainers = useMemo(() => {
    if (!initialTrainers || initialTrainers.length === 0) {
      return CURATED_COACHES;
    }

    const fallbackPhotos = [
      "https://images.unsplash.com/photo-1567013127542-490d757e51fc?q=80&w=800",
      "https://images.unsplash.com/photo-1548690312-e3b507d8c110?q=80&w=800",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800",
    ];

    const dbTrainers = initialTrainers.map((t, idx) => {
      const hasValidImage =
        t.image &&
        !t.image.includes("avatar.png") &&
        !t.image.includes("prio.co.in") &&
        t.image.startsWith("http");

      const assignedClasses = t.classes || [];
      const specialty = t.specialty || (assignedClasses[0]?.category) || "Weights";

      return {
        _id: t._id,
        name: t.name || `Coach ${idx + 1}`,
        email: t.email || "trainer@flexpulse.com",
        role: "trainer",
        image: hasValidImage ? t.image : fallbackPhotos[idx % fallbackPhotos.length],
        specialty: specialty,
        experience: t.experience ? `${t.experience} Years` : "5+ Years",
        rating: "4.9",
        reviewsCount: 120 + idx * 15,
        bio:
          t.bio && !t.bio.startsWith("I want")
            ? t.bio
            : `Certified ${specialty} coach dedicated to individualized athletic programming, technique refinement, and sustainable strength.`,
        classesCount: t.classesCount || assignedClasses.length || 2,
        skills: [specialty, "Biomechanics", "Athletic Conditioning"],
        classes: assignedClasses,
      };
    });

    // Merge curated coaches with database trainers (prevent email collision)
    const existingEmails = new Set(dbTrainers.map((t) => t.email.toLowerCase()));
    const additional = CURATED_COACHES.filter(
      (c) => !existingEmails.has(c.email.toLowerCase())
    );

    return [...dbTrainers, ...additional];
  }, [initialTrainers]);

  // Extract unique specialties along with coach count for each
  const specialtyStats = useMemo(() => {
    const counts = { All: allTrainers.length };
    allTrainers.forEach((t) => {
      const spec = t.specialty || "Fitness";
      counts[spec] = (counts[spec] || 0) + 1;
    });

    const list = Object.keys(counts).filter((s) => s !== "All");
    return {
      keys: ["All", ...list],
      counts,
    };
  }, [allTrainers]);

  // Filtered and sorted trainers
  const filteredTrainers = useMemo(() => {
    let result = allTrainers.filter((trainer) => {
      const matchesSpecialty =
        selectedSpecialty === "All" ||
        trainer.specialty.toLowerCase() === selectedSpecialty.toLowerCase();

      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        trainer.name.toLowerCase().includes(query) ||
        trainer.specialty.toLowerCase().includes(query) ||
        trainer.bio.toLowerCase().includes(query) ||
        trainer.classes?.some((c) => c.className?.toLowerCase().includes(query));

      return matchesSpecialty && matchesSearch;
    });

    // Sorting
    result.sort((a, b) => {
      if (sortBy === "classes-desc") return (b.classesCount || 0) - (a.classesCount || 0);
      if (sortBy === "rating-desc") return Number(b.rating) - Number(a.rating);
      if (sortBy === "experience-desc") {
        const expA = parseInt(a.experience, 10) || 0;
        const expB = parseInt(b.experience, 10) || 0;
        return expB - expA;
      }
      if (sortBy === "name-asc") return a.name.localeCompare(b.name);
      return 0;
    });

    return result;
  }, [allTrainers, selectedSpecialty, searchQuery, sortBy]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedSpecialty, searchQuery, sortBy]);

  // Pagination calculation
  const totalItems = filteredTrainers.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalItems);
  const paginatedTrainers = useMemo(() => {
    return filteredTrainers.slice(startIndex, endIndex);
  }, [filteredTrainers, startIndex, endIndex]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages && newPage !== currentPage) {
      setCurrentPage(newPage);
      if (gridTopRef.current) {
        gridTopRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  const resetAllFilters = () => {
    setSelectedSpecialty("All");
    setSearchQuery("");
    setSortBy("classes-desc");
    setCurrentPage(1);
  };

  const hasActiveFilters = selectedSpecialty !== "All" || searchQuery.length > 0;

  return (
    <div className="min-h-screen bg-background text-foreground py-10 sm:py-14 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-8 sm:space-y-10">
        {/* Header Section */}
        <div className="text-center space-y-3.5 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-active/30 bg-active/10 text-active text-xs font-bold uppercase tracking-wider shadow-xs">
            <FiUsers size={14} />
            Certified Athletic Staff
          </div>

          <h1 className="font-['Outfit'] text-3xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight">
            Meet Our <span className="text-active">Elite Coaches</span>
          </h1>

          <p className="font-['Inter'] text-xs sm:text-sm text-secondary max-w-xl mx-auto leading-relaxed">
            Work with certified coaches dedicated to refining your technique, building functional strength, and achieving verified results.
          </p>
        </div>

        {/* Filter, Search & Sorting Controls Hub */}
        <div
          ref={gridTopRef}
          className="bg-brand-900/60 dark:bg-[#121026]/75 border border-brand-500/20 rounded-2xl p-4 sm:p-5 backdrop-blur-md shadow-sm space-y-4"
        >
          {/* Top Row: Search Input & Tools */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 sm:gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <FiSearch
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-secondary"
                size={16}
              />
              <input
                type="text"
                placeholder="Search coach by name, specialty, or class..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-9 py-2.5 text-xs sm:text-sm bg-background border border-brand-500/20 rounded-xl text-foreground placeholder:text-secondary focus:outline-none focus:border-active transition-colors shadow-xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary hover:text-foreground p-0.5"
                >
                  <FiX size={15} />
                </button>
              )}
            </div>

            {/* Right Tools: Sort & View Mode */}
            <div className="flex items-center justify-between md:justify-end gap-3">
              {/* Sort By Dropdown */}
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-bold text-secondary uppercase tracking-wider hidden sm:inline">
                  Sort:
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-background border border-brand-500/20 rounded-xl px-3 py-2 text-xs font-bold text-foreground focus:outline-none focus:border-active cursor-pointer shadow-xs"
                >
                  <option value="classes-desc">Most Active Classes</option>
                  <option value="rating-desc">Top Rated (⭐ 5.0)</option>
                  <option value="experience-desc">Most Experienced</option>
                  <option value="name-asc">Name (A - Z)</option>
                </select>
              </div>

              {/* View Switcher */}
              <div className="flex items-center bg-background/80 p-1 rounded-xl border border-brand-500/20">
                <button
                  onClick={() => setViewMode("grid")}
                  title="Grid View"
                  className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                    viewMode === "grid"
                      ? "bg-active text-btn-text shadow-xs"
                      : "text-secondary hover:text-foreground"
                  }`}
                >
                  <FiGrid size={15} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  title="Detailed Studio View"
                  className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                    viewMode === "list"
                      ? "bg-active text-btn-text shadow-xs"
                      : "text-secondary hover:text-foreground"
                  }`}
                >
                  <FiList size={15} />
                </button>
              </div>
            </div>
          </div>

          {/* Specialty Category Pills with Counts */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none border-t border-brand-500/15 pt-3">
            {specialtyStats.keys.map((spec) => {
              const isSelected = selectedSpecialty === spec;
              const count = specialtyStats.counts[spec] || 0;
              return (
                <button
                  key={spec}
                  onClick={() => setSelectedSpecialty(spec)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? "bg-active text-btn-text shadow-sm ring-1 ring-active"
                      : "bg-background/80 hover:bg-background text-secondary hover:text-foreground border border-brand-500/15"
                  }`}
                >
                  <span>{spec}</span>
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] font-extrabold ${
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

          {/* Active Filters Summary Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-brand-500/15 text-xs text-secondary">
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>
                Showing <strong className="text-foreground">{totalItems > 0 ? startIndex + 1 : 0}–{endIndex}</strong> of{" "}
                <strong className="text-foreground">{totalItems}</strong> coaches
              </span>
            </div>

            {hasActiveFilters && (
              <div className="flex items-center gap-2">
                <button
                  onClick={resetAllFilters}
                  className="text-xs font-bold text-active hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <FiRefreshCw size={12} />
                  <span>Reset All Filters</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Coaches Grid or Empty State */}
        {totalItems === 0 ? (
          <div className="text-center py-16 bg-brand-900/30 dark:bg-[#121026]/40 border border-brand-500/20 rounded-3xl p-8 space-y-3">
            <FiSearch size={32} className="mx-auto text-secondary opacity-60" />
            <h3 className="font-['Outfit'] text-xl font-bold text-foreground">
              No Coaches Match Your Search
            </h3>
            <p className="text-xs text-secondary max-w-sm mx-auto">
              We couldn&apos;t find any coaching staff matching your selected criteria. Try adjusting your search query or reset filters.
            </p>
            <button
              onClick={resetAllFilters}
              className="px-4 py-2 rounded-xl bg-active text-btn-text text-xs font-bold shadow-sm hover:opacity-90 cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : viewMode === "grid" ? (
          /* Grid View Mode */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {paginatedTrainers.map((trainer) => (
              <div
                key={trainer._id}
                className="group bg-brand-900/40 dark:bg-[#121026]/75 border border-brand-500/20 hover:border-active/50 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                {/* Image Section */}
                <div className="relative h-64 w-full overflow-hidden bg-brand-800/30">
                  <Image
                    src={trainer.image}
                    alt={trainer.name}
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-active text-btn-text text-[10px] font-extrabold uppercase tracking-wider shadow">
                    {trainer.experience}
                  </div>

                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/65 backdrop-blur-md border border-white/10 text-amber-400 text-xs font-bold flex items-center gap-1 shadow">
                    <FiStar className="fill-amber-400" size={11} /> {trainer.rating}
                    <span className="text-white/60 text-[10px] font-normal">({trainer.reviewsCount})</span>
                  </div>

                  {/* Name & Specialty Over Image */}
                  <div className="absolute bottom-3 left-3.5 right-3.5 text-white">
                    <h3 className="font-['Outfit'] text-xl font-black tracking-tight group-hover:text-active transition-colors flex items-center gap-1.5">
                      {trainer.name}
                      <FiCheckCircle className="text-active shrink-0" size={15} />
                    </h3>
                    <p className="text-xs text-white/80 font-medium">
                      {trainer.specialty} Coach
                    </p>
                  </div>
                </div>

                {/* Details Section */}
                <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    {/* Bio */}
                    <p className="text-xs text-secondary leading-relaxed line-clamp-2">
                      {trainer.bio}
                    </p>

                    {/* Classes Preview Pills */}
                    {trainer.classes && trainer.classes.length > 0 && (
                      <div className="space-y-1.5 pt-1">
                        <span className="text-[10px] font-bold text-secondary uppercase tracking-wider block">
                          Assigned Classes ({trainer.classes.length})
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {trainer.classes.slice(0, 2).map((cls, idx) => (
                            <Link
                              key={idx}
                              href={`/all-classes?search=${encodeURIComponent(cls.className)}`}
                              className="px-2.5 py-1 rounded-lg bg-brand-500/10 hover:bg-brand-500/20 border border-brand-500/15 text-[11px] font-medium text-foreground hover:text-active transition-colors flex items-center gap-1"
                              title={`Search ${cls.className}`}
                            >
                              <FaDumbbell size={9} className="text-active" />
                              <span className="truncate max-w-[130px]">{cls.className}</span>
                            </Link>
                          ))}
                          {trainer.classes.length > 2 && (
                            <button
                              onClick={() => setSelectedCoachModal(trainer)}
                              className="px-2 py-1 rounded-lg bg-background text-[11px] font-bold text-secondary hover:text-foreground border border-brand-500/15 cursor-pointer"
                            >
                              +{trainer.classes.length - 2} more
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Actions Bar */}
                  <div className="pt-3.5 border-t border-brand-500/15 flex items-center gap-2">
                    <Link
                      href={`/all-classes?search=${encodeURIComponent(trainer.name)}`}
                      className="flex-1 py-2.5 rounded-xl bg-active text-btn-text text-xs font-bold text-center hover:opacity-90 shadow-sm transition-all flex items-center justify-center gap-1.5"
                    >
                      <FaDumbbell size={11} /> Classes
                    </Link>

                    <button
                      onClick={() => setSelectedCoachModal(trainer)}
                      title="View Coach Dossier"
                      className="px-3 py-2.5 rounded-xl border border-brand-500/25 bg-background hover:bg-brand-500/10 text-foreground text-xs font-bold transition-colors cursor-pointer"
                    >
                      Details
                    </button>

                    <Link
                      href={`/contact?coach=${encodeURIComponent(trainer.name)}`}
                      title="Contact Coach"
                      className="p-2.5 rounded-xl border border-brand-500/25 bg-background hover:border-active text-secondary hover:text-active transition-colors"
                    >
                      <FiMail size={15} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Detailed List View Mode */
          <div className="space-y-4">
            {paginatedTrainers.map((trainer) => (
              <div
                key={trainer._id}
                className="bg-brand-900/40 dark:bg-[#121026]/75 border border-brand-500/20 hover:border-active/50 rounded-2xl p-5 sm:p-6 backdrop-blur-md shadow-sm transition-all flex flex-col md:flex-row items-stretch gap-6"
              >
                {/* Photo */}
                <div className="relative h-56 md:h-auto md:w-56 rounded-xl overflow-hidden shrink-0 bg-brand-800/30">
                  <Image
                    src={trainer.image}
                    alt={trainer.name}
                    fill
                    className="object-cover object-top"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-active text-btn-text text-[10px] font-extrabold uppercase">
                    {trainer.experience}
                  </div>
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/65 backdrop-blur-md text-amber-400 text-xs font-bold flex items-center gap-1">
                    <FiStar className="fill-amber-400" size={11} /> {trainer.rating}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <h3 className="font-['Outfit'] text-2xl font-black text-foreground flex items-center gap-2">
                          {trainer.name}
                          <FiCheckCircle className="text-active" size={17} />
                        </h3>
                        <p className="text-xs font-bold text-active uppercase tracking-wide">
                          {trainer.specialty} Coach
                        </p>
                      </div>
                      <span className="text-xs text-secondary font-medium">
                        {trainer.classesCount} Classes Active
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-secondary leading-relaxed">
                      {trainer.bio}
                    </p>

                    {/* Classes Tags */}
                    {trainer.classes && trainer.classes.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {trainer.classes.map((cls, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 rounded-lg bg-brand-500/10 border border-brand-500/20 text-xs font-medium text-foreground flex items-center gap-1"
                          >
                            <FaDumbbell size={9} className="text-active" />
                            {cls.className} (${cls.price}/mo)
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="pt-3 border-t border-brand-500/15 flex items-center justify-end gap-2">
                    <Link
                      href={`/all-classes?search=${encodeURIComponent(trainer.name)}`}
                      className="px-4 py-2 rounded-xl bg-active text-btn-text text-xs font-bold hover:opacity-90 transition-opacity"
                    >
                      View Classes
                    </Link>
                    <button
                      onClick={() => setSelectedCoachModal(trainer)}
                      className="px-4 py-2 rounded-xl border border-brand-500/25 text-xs font-bold text-foreground hover:border-active transition-colors cursor-pointer"
                    >
                      Details
                    </button>
                    <Link
                      href={`/contact?coach=${encodeURIComponent(trainer.name)}`}
                      className="px-3.5 py-2 rounded-xl border border-brand-500/25 text-xs font-bold text-secondary hover:text-active transition-colors"
                    >
                      Contact
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Premium Segmented Pagination Bar */}
        {totalPages > 1 && (
          <div className="flex flex-col items-center gap-3 pt-6 border-t border-brand-500/15">
            <nav
              role="navigation"
              aria-label="Coaches Directory Pagination"
              className="inline-flex items-center gap-1.5 p-1.5 rounded-2xl bg-brand-900/50 dark:bg-[#121026]/70 border border-brand-500/20 backdrop-blur-md shadow-sm"
            >
              {/* Previous Button */}
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

              {/* Numbered Page Buttons */}
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

              {/* Next Button */}
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
              Page {currentPage} of {totalPages}
            </span>
          </div>
        )}

        {/* Career Opportunities Banner */}
        <div className="rounded-2xl bg-brand-900/40 dark:bg-[#121026]/60 border border-brand-500/20 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-5 shadow-sm">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-[11px] font-bold uppercase tracking-wider text-active">
              Coaching Staff Recruitment
            </span>
            <h2 className="font-['Outfit'] text-xl sm:text-2xl font-bold text-foreground">
              Are You an Elite Fitness Coach?
            </h2>
            <p className="text-xs sm:text-sm text-secondary max-w-xl">
              We provide world-class facilities, integrated booking telemetry, and guaranteed client flow. Join the FlexPulse coaching roster.
            </p>
          </div>

          <Link
            href="/dashboard/member/apply-trainer"
            className="px-5 py-2.5 rounded-xl bg-active text-btn-text font-bold text-xs sm:text-sm shadow-sm hover:opacity-90 transition-all flex items-center gap-2 shrink-0"
          >
            <FiUserPlus size={15} /> Apply as a Trainer
          </Link>
        </div>
      </div>

      {/* Clean Coach Details Modal */}
      {selectedCoachModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div
            className="fixed inset-0"
            onClick={() => setSelectedCoachModal(null)}
          />

          <div className="relative bg-background border border-brand-500/25 rounded-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto shadow-2xl z-10 p-6 space-y-5">
            {/* Modal Close Button */}
            <button
              onClick={() => setSelectedCoachModal(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-secondary hover:text-foreground hover:bg-brand-500/10 transition-colors cursor-pointer"
            >
              <FiX size={18} />
            </button>

            {/* Coach Header */}
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-brand-500/20 bg-brand-800/30">
                <Image
                  src={selectedCoachModal.image}
                  alt={selectedCoachModal.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div>
                <h3 className="font-['Outfit'] text-xl font-bold text-foreground flex items-center gap-1.5">
                  {selectedCoachModal.name}
                  <FiCheckCircle className="text-active" size={16} />
                </h3>
                <p className="text-xs text-active font-semibold">
                  {selectedCoachModal.specialty} Coach • {selectedCoachModal.experience}
                </p>
                <p className="text-[11px] text-secondary flex items-center gap-1 mt-0.5">
                  <FiMail size={12} /> {selectedCoachModal.email}
                </p>
              </div>
            </div>

            {/* Bio */}
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">
                About Coach
              </h4>
              <p className="text-xs text-secondary leading-relaxed">
                {selectedCoachModal.bio}
              </p>
            </div>

            {/* Assigned Classes List */}
            {selectedCoachModal.classes && selectedCoachModal.classes.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">
                  Classes Taught ({selectedCoachModal.classes.length})
                </h4>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {selectedCoachModal.classes.map((cls, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-brand-900/30 dark:bg-[#121026]/50 border border-brand-500/15 flex items-center justify-between text-xs"
                    >
                      <div>
                        <strong className="text-foreground block">{cls.className}</strong>
                        <span className="text-[10px] text-secondary">{cls.category || "Fitness"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {cls.price && (
                          <span className="text-xs font-bold text-active font-['Outfit']">
                            ${cls.price}/mo
                          </span>
                        )}
                        <Link
                          href={cls._id ? `/all-classes/${cls._id}` : `/all-classes?search=${encodeURIComponent(cls.className)}`}
                          className="px-2.5 py-1 rounded-lg bg-active text-btn-text text-[11px] font-bold hover:opacity-90 transition-opacity"
                        >
                          Book
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Modal Actions */}
            <div className="pt-3 border-t border-brand-500/15 flex items-center justify-end gap-2">
              <Link
                href={`/all-classes?search=${encodeURIComponent(selectedCoachModal.name)}`}
                className="px-3.5 py-2 rounded-xl border border-brand-500/25 text-xs font-bold text-foreground hover:border-active transition-colors"
              >
                All Classes by Coach
              </Link>
              <Link
                href={`/contact?coach=${encodeURIComponent(selectedCoachModal.name)}`}
                className="px-4 py-2 rounded-xl bg-active text-btn-text text-xs font-bold shadow-sm hover:opacity-90 transition-opacity flex items-center gap-1.5"
              >
                <FiMail size={13} /> Message Coach
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
