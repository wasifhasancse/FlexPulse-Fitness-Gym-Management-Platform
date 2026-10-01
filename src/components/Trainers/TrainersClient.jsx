"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import TrainersHeroHeader from "./TrainersHeroHeader";
import TrainersFilterDeck from "./TrainersFilterDeck";
import TrainersGrid from "./TrainersGrid";
import TrainersPagination from "./TrainersPagination";
import TrainersRecruitmentBanner from "./TrainersRecruitmentBanner";
import {
  FiX,
  FiCheckCircle,
  FiMail,
  FiCalendar,
  FiAward,
  FiArrowRight,
  FiStar,
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

  const catalogTopRef = useRef(null);

  // Close modal with ESC key
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
      const specialty = t.specialty || assignedClasses[0]?.category || "Weights";

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
      const spec = t.specialty || "Weights";
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
      if (catalogTopRef.current) {
        catalogTopRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
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
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300 pb-20">
      {/* ── 1. Hero Header with Athletic Telemetry HUD Cockpit (Strict w-11/12 mx-auto) ── */}
      <TrainersHeroHeader totalCoaches={allTrainers.length} />

      {/* ── 2. Main Directory Catalog Area (Strict w-11/12 mx-auto matching Nav and Footer) ── */}
      <main
        ref={catalogTopRef}
        id="coaches-catalog"
        className="w-11/12 mx-auto relative z-10 pt-10 sm:pt-12 scroll-mt-24"
      >
        {/* Interactive Filter Deck with Dedicated Triggered Transitions & Athletic Hover */}
        <TrainersFilterDeck
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedSpecialty={selectedSpecialty}
          setSelectedSpecialty={setSelectedSpecialty}
          sortBy={sortBy}
          setSortBy={setSortBy}
          viewMode={viewMode}
          setViewMode={setViewMode}
          specialtyStats={specialtyStats}
          totalItems={totalItems}
          startIndex={startIndex}
          endIndex={endIndex}
          resetAllFilters={resetAllFilters}
          hasActiveFilters={hasActiveFilters}
        />

        {/* Coaches Grid with High Demand Sessions Staged Viewport Delay & Re-Animation */}
        <TrainersGrid
          trainers={paginatedTrainers}
          viewMode={viewMode}
          onOpenModal={(coach) => setSelectedCoachModal(coach)}
          resetAllFilters={resetAllFilters}
        />

        {/* Floating Athletic Pagination Dock with Triggered Transitions */}
        <TrainersPagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          onPageChange={handlePageChange}
        />

        {/* Career Opportunities / Recruitment Reassurance Banner */}
        <TrainersRecruitmentBanner />
      </main>

      {/* ── Coach Dossier Details Modal ── */}
      <AnimatePresence>
        {selectedCoachModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0"
              onClick={() => setSelectedCoachModal(null)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative bg-card-bg border border-brand-500/25 rounded-3xl max-w-lg w-full max-h-[85vh] overflow-y-auto shadow-md z-10 p-6 sm:p-7 space-y-5"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedCoachModal(null)}
                className="absolute top-4 right-4 p-2 rounded-xl text-secondary hover:text-foreground hover:bg-brand-500/10 transition-colors cursor-pointer"
              >
                <FiX size={18} />
              </button>

              {/* Coach Header */}
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-2xl overflow-hidden shrink-0 border border-brand-500/25 bg-brand-800/30">
                  <Image
                    src={selectedCoachModal.image}
                    alt={selectedCoachModal.name}
                    fill
                    className="object-cover object-top"
                  />
                </div>

                <div>
                  <h3 className="font-['Outfit'] text-xl sm:text-2xl font-black text-foreground flex items-center gap-1.5">
                    {selectedCoachModal.name}
                    <FiCheckCircle className="text-active" size={17} />
                  </h3>
                  <p className="text-xs font-bold text-active uppercase tracking-wide font-['Outfit'] mt-0.5">
                    {selectedCoachModal.specialty} Master Coach • {selectedCoachModal.experience}
                  </p>
                  <p className="text-[11px] text-secondary flex items-center gap-1 mt-1 font-['Inter']">
                    <FiMail size={12} /> {selectedCoachModal.email}
                  </p>
                </div>
              </div>

              {/* Bio */}
              <div className="space-y-1.5 pt-1 border-t border-brand-500/15">
                <h4 className="text-xs font-bold text-foreground uppercase tracking-wider font-['Outfit']">
                  Biographical Dossier
                </h4>
                <p className="text-xs sm:text-sm text-secondary font-['Inter'] leading-relaxed">
                  {selectedCoachModal.bio}
                </p>
              </div>

              {/* Assigned Classes */}
              {selectedCoachModal.classes && selectedCoachModal.classes.length > 0 && (
                <div className="space-y-2 pt-1 border-t border-brand-500/15">
                  <h4 className="text-xs font-bold text-foreground uppercase tracking-wider font-['Outfit']">
                    Curriculum Classes Taught ({selectedCoachModal.classes.length})
                  </h4>
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                    {selectedCoachModal.classes.map((cls, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-2xl bg-brand-500/5 dark:bg-[#1B1A55]/30 border border-brand-500/15 flex items-center justify-between text-xs"
                      >
                        <div>
                          <strong className="text-foreground block font-bold font-['Outfit'] text-sm">
                            {cls.className}
                          </strong>
                          <span className="text-[10px] text-secondary font-['Inter']">
                            {cls.category || "Fitness"} Discipline
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          {cls.price && (
                            <span className="text-sm font-black text-active font-['Outfit']">
                              ${cls.price}/session
                            </span>
                          )}
                          <Link
                            href={
                              cls._id
                                ? `/all-classes/${cls._id}`
                                : `/all-classes?search=${encodeURIComponent(cls.className)}`
                            }
                            className="px-3 py-1.5 rounded-xl bg-btn-bg text-btn-text text-xs font-bold shadow-xs hover:brightness-105 transition-all"
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
              <div className="pt-4 border-t border-brand-500/15 flex items-center justify-end gap-2.5">
                <Link
                  href={`/all-classes?search=${encodeURIComponent(selectedCoachModal.name)}`}
                  className="px-4 py-2.5 rounded-2xl bg-searchbox-bg hover:bg-searchbox-hover border border-brand-500/25 hover:border-active/60 text-xs font-bold text-foreground transition-all"
                >
                  All Classes by Coach
                </Link>
                <Link
                  href={`/contact?coach=${encodeURIComponent(selectedCoachModal.name)}`}
                  className="px-5 py-2.5 rounded-2xl bg-btn-bg text-btn-text text-xs font-extrabold shadow-sm hover:shadow-md hover:brightness-105 transition-all flex items-center gap-1.5 border border-white/20"
                >
                  <FiMail size={13} /> Message Coach
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
