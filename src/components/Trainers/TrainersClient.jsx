"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FiAward,
  FiCheckCircle,
  FiFilter,
  FiMail,
  FiSearch,
  FiStar,
  FiUserPlus,
  FiUsers,
  FiZap,
} from "react-icons/fi";
import { FaInstagram, FaLinkedinIn, FaDumbbell } from "react-icons/fa";

const SAMPLE_TRAINERS = [
  {
    _id: "sample-1",
    name: "Marcus Vance",
    email: "marcus.vance@flexpulse.com",
    role: "trainer",
    image: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?q=80&w=800",
    specialty: "Strength & Bodybuilding",
    experience: "8+ Years",
    bio: "Former Olympic weightlifting coach specializing in progressive overload, biomechanics, and raw power development.",
    classesCount: 4,
    studentsCount: 340,
    rating: "4.9",
    skills: ["Powerlifting", "Hypertrophy", "Mobility", "Dietary Periodization"],
  },
  {
    _id: "sample-2",
    name: "Elena Rostova",
    email: "elena.r@flexpulse.com",
    role: "trainer",
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800",
    specialty: "HIIT & Functional CrossFit",
    experience: "6+ Years",
    bio: "Certified CrossFit Level 3 coach focusing on metabolic conditioning, explosive anaerobic power, and cardiovascular grit.",
    classesCount: 5,
    studentsCount: 420,
    rating: "5.0",
    skills: ["HIIT", "Kettlebell", "Olympic Rings", "Endurance"],
  },
  {
    _id: "sample-3",
    name: "Alana Serrano",
    email: "alana@gmail.com",
    role: "trainer",
    image: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?q=80&w=800",
    specialty: "Stretching & Yoga Flow",
    experience: "5+ Years",
    bio: "Passionate yoga and mobility instructor dedicated to mind-muscle connection, posture recovery, and athletic flexibility.",
    classesCount: 3,
    studentsCount: 290,
    rating: "4.8",
    skills: ["Vinyasa Flow", "Deep Stretch", "Core Stabilization", "Mindfulness"],
  },
  {
    _id: "sample-4",
    name: "Darius King",
    email: "darius.k@flexpulse.com",
    role: "trainer",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800",
    specialty: "Boxing & Combat Conditioning",
    experience: "7+ Years",
    bio: "Golden Gloves competitor with a track record of developing lightning-fast footwork, hand speed, and rotational core power.",
    classesCount: 3,
    studentsCount: 310,
    rating: "4.9",
    skills: ["Boxing", "Footwork", "Agility", "High-Cardio Conditioning"],
  },
];

export default function TrainersClient({ initialTrainers = [] }) {
  const [selectedSpecialty, setSelectedSpecialty] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const allTrainers = useMemo(() => {
    if (!initialTrainers || initialTrainers.length === 0) {
      return SAMPLE_TRAINERS;
    }

    // Merge database trainers with full profile details
    return initialTrainers.map((t, idx) => {
      const fallback = SAMPLE_TRAINERS[idx % SAMPLE_TRAINERS.length];
      return {
        _id: t._id,
        name: t.name || fallback.name,
        email: t.email || fallback.email,
        role: "trainer",
        image: t.image || fallback.image,
        specialty: t.specialty || fallback.specialty,
        experience: t.experience ? `${t.experience} Years` : fallback.experience,
        bio: t.bio || fallback.bio,
        classesCount: t.classesCount || fallback.classesCount,
        studentsCount: (t.classesCount || 2) * 85 + 40,
        rating: "4.9",
        skills: fallback.skills,
        classes: t.classes || [],
      };
    });
  }, [initialTrainers]);

  const specialties = useMemo(() => {
    const set = new Set();
    allTrainers.forEach((t) => set.add(t.specialty));
    return ["All", ...Array.from(set)];
  }, [allTrainers]);

  const filteredTrainers = useMemo(() => {
    return allTrainers.filter((trainer) => {
      const matchesSpecialty =
        selectedSpecialty === "All" ||
        trainer.specialty.toLowerCase() === selectedSpecialty.toLowerCase();
      const matchesSearch =
        !searchQuery ||
        trainer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trainer.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trainer.bio.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSpecialty && matchesSearch;
    });
  }, [allTrainers, selectedSpecialty, searchQuery]);

  return (
    <div className="min-h-screen bg-background py-14 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-active/30 bg-active/10 text-active text-xs font-extrabold uppercase tracking-widest">
            <FiUsers size={13} />
            Certified Athletic Staff
          </div>
          <h1 className="font-['Outfit'] text-4xl sm:text-5xl lg:text-6xl font-black text-foreground tracking-tight">
            Meet Our <span className="text-active">Elite Coaches</span>
          </h1>
          <p className="font-['Inter'] text-sm sm:text-base text-secondary max-w-2xl mx-auto leading-relaxed">
            World-class trainers who push your limits, refine your technique, and engineer custom programs to help you shatter your fitness plateaus.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="bg-brand-900/40 dark:bg-[#121026]/60 border border-brand-500/20 rounded-2xl p-4 sm:p-5 backdrop-blur-xl shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-72">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-secondary" size={14} />
            <input
              type="text"
              placeholder="Search by coach name or specialty..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-background/60 border border-brand-500/20 rounded-xl text-foreground placeholder:text-secondary focus:outline-none focus:border-active"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
            {specialties.map((spec) => (
              <button
                key={spec}
                onClick={() => setSelectedSpecialty(spec)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedSpecialty === spec
                    ? "bg-active text-btn-text shadow-md"
                    : "bg-brand-800/20 text-secondary hover:text-foreground border border-brand-500/10"
                }`}
              >
                {spec}
              </button>
            ))}
          </div>
        </div>

        {/* Trainers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredTrainers.map((trainer) => (
            <div
              key={trainer._id}
              className="group relative bg-brand-900/40 dark:bg-[#121026]/70 border border-brand-500/20 hover:border-active/60 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
            >
              {/* Photo Banner with Gradient Overlay */}
              <div className="relative h-64 w-full overflow-hidden bg-brand-800/30">
                <Image
                  src={trainer.image}
                  alt={trainer.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent" />

                {/* Rating Badge */}
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-amber-400 text-xs font-bold flex items-center gap-1">
                  <FiStar className="fill-amber-400" size={11} /> {trainer.rating}
                </div>

                {/* Experience Badge */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-active text-btn-text text-[11px] font-extrabold uppercase tracking-wider shadow">
                  {trainer.experience}
                </div>

                {/* Name & Specialty Over Image */}
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <h3 className="font-['Outfit'] text-xl font-black tracking-tight group-hover:text-active transition-colors">
                    {trainer.name}
                  </h3>
                  <span className="text-xs text-white/80 font-medium">
                    {trainer.specialty}
                  </span>
                </div>
              </div>

              {/* Bio & Details */}
              <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <p className="text-xs text-secondary leading-relaxed line-clamp-3">
                    {trainer.bio}
                  </p>

                  {/* Skills Pills */}
                  <div className="flex flex-wrap gap-1.5">
                    {trainer.skills?.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 rounded-md bg-brand-500/10 text-[10px] font-semibold text-active border border-brand-500/20"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Stats Bar */}
                  <div className="pt-3 border-t border-brand-500/15 flex items-center justify-between text-xs text-secondary">
                    <span>
                      <strong className="text-foreground">{trainer.classesCount}</strong> Classes Active
                    </span>
                    <span>
                      <strong className="text-foreground">{trainer.studentsCount}+</strong> Athletes
                    </span>
                  </div>
                </div>

                {/* CTA Action */}
                <div className="pt-4 border-t border-brand-500/15 flex items-center gap-2">
                  <Link
                    href={`/all-classes`}
                    className="flex-1 py-2.5 rounded-xl bg-active text-btn-text text-xs font-bold text-center hover:opacity-90 shadow-md transition-all flex items-center justify-center gap-1.5"
                  >
                    <FaDumbbell size={11} /> View Classes
                  </Link>
                  <Link
                    href="/contact"
                    title="Book Consultation"
                    className="p-2.5 rounded-xl border border-brand-500/30 bg-background/60 text-secondary hover:text-foreground hover:border-active transition-colors"
                  >
                    <FiMail size={15} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Join Coaching Team CTA */}
        <div className="rounded-3xl bg-linear-to-r from-active/20 via-brand-500/10 to-transparent border border-active/30 p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-extrabold uppercase tracking-widest text-active">
              Career & Coaching Opportunities
            </span>
            <h2 className="font-['Outfit'] text-2xl sm:text-3xl font-extrabold text-foreground">
              Are You an Elite Fitness Coach?
            </h2>
            <p className="text-xs sm:text-sm text-secondary max-w-xl">
              We are constantly seeking certified athletic trainers, bodybuilding specialists, and yoga masters to join our premier coaching roster.
            </p>
          </div>
          <Link
            href="/dashboard/member/apply-trainer"
            className="px-6 py-3.5 rounded-xl bg-active text-btn-text font-bold text-xs sm:text-sm shadow-lg hover:opacity-90 transition-all flex items-center gap-2 shrink-0"
          >
            <FiUserPlus size={15} /> Apply as a Trainer
          </Link>
        </div>
      </div>
    </div>
  );
}
