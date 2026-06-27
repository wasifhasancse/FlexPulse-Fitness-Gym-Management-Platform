"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

export default function Testimonials() {
  const reviews = [
    {
      name: "Marcus Vance",
      role: "Calisthenics Member",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
      quote: "FlexPulse transformed how I plan my workouts. Being able to find and book calisthenics classes instantly has kept me highly consistent.",
      rating: 5,
    },
    {
      name: "Sophia Martinez",
      role: "Yoga Practitioner",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
      quote: "The trainer quality here is incomparable. I love the community forum too; it feels like we are all growing and building together.",
      rating: 5,
    },
    {
      name: "David Chen",
      role: "Powerlifting Enthusiast",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      quote: "Highly structured dashboards, expert coaches, and incredibly easy transaction handling. This is by far the most premium fitness platform out there.",
      rating: 5,
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="py-20 bg-brand-900/10 dark:bg-[#1B1A55]/10 border-t border-brand-500/10 transition-colors duration-300 relative overflow-hidden">
      {/* Glow background */}
      <div className="absolute right-0 bottom-1/4 w-80 h-80 bg-active/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-800/20 border border-brand-500/30 text-active text-xs font-bold tracking-wider uppercase mb-4">
            <span className="flex h-2 w-2 rounded-full bg-active animate-pulse"></span>
            Member Voices
          </div>
          <h2 className="font-['Outfit'] text-4xl sm:text-5xl font-extrabold text-foreground tracking-tight mb-4">
            What Our Members <span className="text-active">Say</span>
          </h2>
          <p className="font-['Inter'] text-base text-[#535C91] dark:text-[#9290C3] leading-relaxed">
            Real feedback from individuals who have successfully started their fitness transformation journeys.
          </p>
        </div>

        {/* Grid cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {reviews.map((rev, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="bg-white dark:bg-brand-800/20 border border-brand-500/15 dark:border-brand-500/30 p-8 rounded-3xl shadow-card relative flex flex-col h-full"
            >
              <FaQuoteLeft className="text-active/10 w-12 h-12 absolute top-6 right-6 pointer-events-none" />

              <div className="flex gap-1 text-[#CFFF04] mb-6">
                {[...Array(rev.rating)].map((_, i) => (
                  <FaStar key={i} className="w-4 h-4 fill-current drop-shadow-[0_0_3px_rgba(207,255,4,0.4)]" />
                ))}
              </div>

              <p className="font-['Inter'] text-sm text-[#535C91] dark:text-[#9290C3] leading-relaxed mb-8 flex-1 italic">
                "{rev.quote}"
              </p>

              <div className="flex items-center gap-4 mt-auto">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border border-brand-500/20 shrink-0">
                  <Image
                    src={rev.image}
                    alt={rev.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-['Outfit'] text-base font-bold text-foreground">{rev.name}</h4>
                  <p className="font-['Inter'] text-xs text-[#535C91] dark:text-[#9290C3] mt-0.5">{rev.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
