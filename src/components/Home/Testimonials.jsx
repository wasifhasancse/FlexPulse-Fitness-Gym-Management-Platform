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
    <section className="py-24 bg-background transition-colors duration-300 relative overflow-hidden">
      {/* Premium Ambient Glow Background Layers */}
      <div className="absolute right-[-5%] bottom-[15%] w-96 h-96 bg-active/5 dark:bg-active/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute left-[-5%] top-[20%] w-80 h-80 bg-brand-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 sm:px-8 relative z-10">

        {/* Editorial Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-500/10 dark:bg-brand-500/20 border border-brand-500/20 dark:border-white/5 text-active text-xs font-black tracking-widest uppercase mb-5 shadow-xs">
            <span className="flex h-2 w-2 rounded-full bg-active animate-pulse" />
            Member Voices
          </div>
          <h2 className="font-['Outfit'] text-4xl sm:text-6xl font-black text-foreground tracking-tight mb-5 leading-[0.95]">
            What Our Members <span className="text-active">Say</span>
          </h2>
          <p className="font-['Inter'] text-base md:text-lg text-[#535C91] dark:text-[#9290C3] leading-relaxed font-medium tracking-tight max-w-2xl mx-auto">
            Real feedback from individuals who have successfully initiated their holistic fitness transformation journeys.
          </p>
        </div>

        {/* Testimonials Response Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {reviews?.map((rev, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="bg-white/70 dark:bg-brand-900/40 backdrop-blur-xl border border-black/5 dark:border-white/5 p-8 rounded-3xl shadow-2xl relative flex flex-col h-full group hover:border-active/20 dark:hover:border-active/20 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Contextual Accent Quote Graphic */}
              <FaQuoteLeft className="text-active/5 dark:text-active/10 w-14 h-14 absolute top-6 right-6 pointer-events-none group-hover:scale-110 transition-transform duration-300" />

              {/* Theme-Controlled Dynamic Rating Layout */}
              <div className="flex gap-1 text-active mb-6">
                {[...Array(Number(rev.rating || 5))].map((_, i) => (
                  <FaStar
                    key={i}
                    className="w-4 h-4 fill-current filter drop-shadow-[0_0_4px_var(--color-active,rgba(var(--active),0.4))]"
                  />
                ))}
              </div>

              {/* Main Review Quote Text Area */}
              <p className="font-['Inter'] text-sm md:text-base text-[#535C91] dark:text-[#9290C3] leading-relaxed mb-8 flex-1 font-medium italic tracking-tight">
                {rev.quote}
              </p>

              {/* User Bio Footer Panel */}
              <div className="flex items-center gap-4 mt-auto pt-6 border-t border-black/5 dark:border-white/5">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border border-black/10 dark:border-white/10 shrink-0 bg-black/5 dark:bg-white/5">
                  <Image
                    src={rev.image || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"}
                    alt={rev.name}
                    fill
                    unoptimized
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div>
                  <h4 className="font-['Outfit'] text-base font-black text-foreground tracking-tight">
                    {rev.name}
                  </h4>
                  <p className="font-['Inter'] text-xs font-bold uppercase tracking-wider text-brand-400 mt-0.5">
                    {rev.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
