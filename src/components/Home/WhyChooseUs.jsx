"use client";

import { motion } from "framer-motion";
import { FaDumbbell, FaUserShield, FaClock, FaTrophy } from "react-icons/fa";

export default function WhyChooseUs() {
  const features = [
    {
      icon: FaDumbbell,
      title: "State-of-the-Art Gym Equipment",
      description: "Train with the industry's top quality and modern training machines and weight sections.",
    },
    {
      icon: FaUserShield,
      title: "Certified Personal Elite Trainers",
      description: "Get personalized guidance from qualified fitness coaches committed to your success.",
    },
    {
      icon: FaClock,
      title: "Flexible Training Schedules",
      description: "Classes run from early morning to late night, making it easy to fit fitness into your busy life.",
    },
    {
      icon: FaTrophy,
      title: "Trackable Fitness Progress",
      description: "Easy dashboard tools to track your booked classes, favorites, and athletic training progress.",
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
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };

  return (
    <section className="py-20 bg-background transition-colors duration-300 relative overflow-hidden">
      <div className="container mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Text details */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-800/20 border border-brand-500/30 text-active text-xs font-bold tracking-wider uppercase mb-4">
              <span className="flex h-2 w-2 rounded-full bg-active animate-pulse"></span>
              Why Choose FlexPulse
            </div>
            <h2 className="font-['Outfit'] text-4xl sm:text-5xl font-extrabold text-foreground tracking-tight mb-6 leading-tight">
              We Push You to <br />
              <span className="text-active">Exceed Your Goals</span>
            </h2>
            <p className="font-['Inter'] text-base text-[#535C91] dark:text-[#9290C3] leading-relaxed mb-6">
              At FlexPulse, we don't just offer classes — we offer a lifestyle transformation. Our structured schedules, expert support team, and clean environment ensure you have everything needed to build consistency and strength.
            </p>
            <div className="flex gap-8 border-t border-brand-500/10 dark:border-brand-800/40 pt-6">
              <div>
                <p className="text-4xl font-extrabold text-active font-['Outfit']">98%</p>
                <p className="text-xs text-[#535C91] dark:text-[#9290C3] font-semibold mt-1">Retention Rate</p>
              </div>
              <div>
                <p className="text-4xl font-extrabold text-active font-['Outfit']">20+</p>
                <p className="text-xs text-[#535C91] dark:text-[#9290C3] font-semibold mt-1">Custom Programs</p>
              </div>
              <div>
                <p className="text-4xl font-extrabold text-active font-['Outfit']">24/7</p>
                <p className="text-xs text-[#535C91] dark:text-[#9290C3] font-semibold mt-1">Community Support</p>
              </div>
            </div>
          </div>

          {/* Right Features Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="p-6 bg-white dark:bg-brand-800/10 border border-brand-500/15 dark:border-brand-500/30 rounded-3xl shadow-sm hover:border-active/40 hover:-translate-y-1 transition-all duration-300 flex flex-col"
                >
                  <div className="w-12 h-12 rounded-2xl bg-btn-bg/10 dark:bg-active/10 flex items-center justify-center text-active mb-5 shadow-inner">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-['Outfit'] text-lg font-bold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="font-['Inter'] text-sm text-[#535C91] dark:text-[#9290C3] leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
