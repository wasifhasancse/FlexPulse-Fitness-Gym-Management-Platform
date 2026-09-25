"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiAward, FiStar, FiUsers } from "react-icons/fi";
import { FaInstagram, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";

const SPOTLIGHT_TRAINERS = [
  {
    name: "Marcus Vance",
    role: "Head Strength & Olympic Coach",
    experience: "10+ Years",
    rating: "4.9",
    specialty: "Olympic Weightlifting & Hypertrophy",
    image: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?q=80&w=800&auto=format&fit=crop",
    bio: "Former national weightlifting contender specializing in biomechanics and maximum athletic output."
  },
  {
    name: "Elena Rostova",
    role: "HIIT & Conditioning Director",
    experience: "8+ Years",
    rating: "5.0",
    specialty: "Metabolic Conditioning & VO2 Max",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=800&auto=format&fit=crop",
    bio: "Ex-heptathlete passionate about high-octane metabolic burn, agility drills, and cardiovascular longevity."
  },
  {
    name: "Darius Sterling",
    role: "Combat Athletics & Boxing Coach",
    experience: "12+ Years",
    rating: "4.9",
    specialty: "Striking Dynamics & Core Speed",
    image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=800&auto=format&fit=crop",
    bio: "Certified pugilist trainer blending real ring footwork with explosive functional hypertrophy."
  },
  {
    name: "Maya Lin",
    role: "Vinyasa & Kinetic Mobility Lead",
    experience: "7+ Years",
    rating: "4.8",
    specialty: "Myofascial Release & Alignment",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop",
    bio: "International 500-hr RYT yoga mentor empowering athletes with joint mobility and mental clarity."
  }
];

export default function TrainersSpotlight() {
  return (
    <section className="py-24 bg-background border-t border-brand-500/15 relative overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-800/20 border border-brand-500/30 text-active text-xs font-bold tracking-wider uppercase mb-3">
              <span className="flex h-2 w-2 rounded-full bg-active animate-pulse" />
              World-Class Mentorship
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-['Outfit'] tracking-tight">
              Meet Our <span className="text-active">Master Coaches</span>
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <p className="text-sm text-[#535C91] dark:text-[#9290C3] max-w-sm font-['Inter']">
              Every trainer is nationally accredited with deep expertise in exercise science and form correction.
            </p>
            <Link
              href="/trainers"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#535C91]/10 dark:bg-[#1B1A55]/60 border border-brand-500/20 hover:border-active text-sm font-bold text-foreground transition-all shrink-0"
            >
              View Roster <FiArrowRight className="w-4 h-4 text-active" />
            </Link>
          </div>
        </div>

        {/* Coaches Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SPOTLIGHT_TRAINERS.map((coach, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="group rounded-3xl bg-[#535C91]/5 dark:bg-[#070F2B] border border-brand-500/20 hover:border-active overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col"
            >
              {/* Photo */}
              <div className="relative h-72 overflow-hidden bg-brand-800/10">
                <Image
                  src={coach.image}
                  alt={coach.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#070F2B] via-transparent to-transparent opacity-80" />

                {/* Rating Badge */}
                <div className="absolute top-3.5 right-3.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center gap-1.5 text-xs text-amber-400 font-bold">
                  <FiStar className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{coach.rating}</span>
                </div>

                {/* Specialty Pill */}
                <div className="absolute bottom-3.5 left-3.5 right-3.5">
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-active text-white uppercase tracking-wider inline-block">
                    {coach.specialty}
                  </span>
                </div>
              </div>

              {/* Info Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-xl font-bold font-['Outfit'] text-foreground group-hover:text-active transition-colors">
                    {coach.name}
                  </h3>
                  <p className="text-xs font-semibold text-[#535C91] dark:text-[#9290C3] font-['Inter'] mt-0.5">
                    {coach.role}
                  </p>
                  <p className="text-xs text-[#535C91]/80 dark:text-[#9290C3]/70 font-['Inter'] mt-2.5 line-clamp-2 leading-relaxed">
                    {coach.bio}
                  </p>
                </div>

                <div className="pt-3 border-t border-brand-500/10 flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#535C91] dark:text-[#9290C3] flex items-center gap-1">
                    <FiAward className="w-3.5 h-3.5 text-active" /> {coach.experience}
                  </span>
                  
                  {/* Social Handles */}
                  <div className="flex items-center gap-2 text-foreground/70">
                    <span className="p-1.5 rounded-lg hover:text-active transition-colors cursor-pointer">
                      <FaInstagram size={13} />
                    </span>
                    <span className="p-1.5 rounded-lg hover:text-active transition-colors cursor-pointer">
                      <FaXTwitter size={13} />
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
