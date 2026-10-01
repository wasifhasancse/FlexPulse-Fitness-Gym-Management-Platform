"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { FiChevronDown, FiHelpCircle } from "react-icons/fi";

const TRANSITION_EASE = [0.16, 1, 0.3, 1];

const FAQS = [
  {
    q: "Are luxury locker rooms and towel services included in standard membership?",
    a: "Yes! All active FlexPulse memberships and paid day-pass holders receive full access to our executive locker suites, rain showers, Malin+Goetz grooming amenities, and complimentary steamed eucalyptus towel service.",
  },
  {
    q: "How does the Cryo & Cold Plunge Spa access work?",
    a: "Contrast therapy (cold plunge baths and Finnish sauna) is open during all club operating hours. Standard members can drop in anytime without reservations, while VIP members can reserve private Normatec compression boot sessions via our mobile app.",
  },
  {
    q: "Can I bring a guest or workout partner to try out the facilities?",
    a: "Pro and VIP members receive 2 complimentary guest passes each month. First-time visitors can also book a free VIP facility walkthrough and trial session by using the 'Schedule VIP Walkthrough' button on this page.",
  },
  {
    q: "Is dedicated parking and EV charging available on site?",
    a: "We provide two subterranean parking decks with 180 reserved spaces for members, including 12 complimentary 50kW Level-2 EV charging bays with a 2-hour workout grace period.",
  },
];

const faqContainerVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1.05,
      ease: TRANSITION_EASE,
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const faqHeaderBadgeVariants = {
  hidden: { opacity: 0, y: -16, scale: 0.88 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 240, damping: 20 },
  },
};

const faqTitleVariants = {
  hidden: { opacity: 0, y: 22, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.95, ease: TRANSITION_EASE },
  },
};

const faqDescVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: "easeOut" },
  },
};

const faqListVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.15,
    },
  },
};

const faqItemVariants = {
  hidden: { opacity: 0, y: 22, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 220, damping: 20 },
  },
};

export default function FacilitiesFaq() {
  const [openIndex, setOpenIndex] = useState(null);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.12 });

  return (
    <motion.div
      ref={containerRef}
      variants={faqContainerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="rounded-3xl bg-brand-900/40 dark:bg-[#121026]/75 border border-brand-500/20 backdrop-blur-xl p-6 sm:p-8 space-y-6 shadow-xs"
    >
      <div className="text-center space-y-1.5 max-w-2xl mx-auto">
        <motion.div variants={faqHeaderBadgeVariants}>
          <span className="text-[11px] font-bold uppercase tracking-wider text-active inline-flex items-center justify-center gap-1.5 font-['Inter'] px-3 py-1 rounded-full bg-active/10 border border-active/20">
            <FiHelpCircle className="w-3.5 h-3.5" />
            <span>Frequently Asked Questions</span>
          </span>
        </motion.div>

        <motion.h3 variants={faqTitleVariants} className="font-['Outfit'] text-2xl sm:text-3xl font-black text-foreground">
          Facility Access & Policies
        </motion.h3>

        <motion.p variants={faqDescVariants} className="font-['Inter'] text-xs sm:text-sm text-secondary">
          Essential guidelines covering lockers, recovery hydro-spas, guest passes, and parking amenities.
        </motion.p>
      </div>

      {/* Full-width Questions and Answers Deck */}
      <motion.div variants={faqListVariants} className="w-full space-y-3 font-['Inter']">
        {FAQS.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <motion.div
              key={index}
              variants={faqItemVariants}
              className="rounded-2xl border border-brand-500/15 bg-card-bg/80 dark:bg-[#121026]/60 overflow-hidden hover:border-active/40 transition-colors shadow-2xs"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full py-4 px-5 text-left flex items-center justify-between gap-3 text-xs sm:text-sm font-bold text-foreground hover:text-active transition-colors cursor-pointer"
              >
                <span>{faq.q}</span>
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: TRANSITION_EASE }}
                  className="shrink-0 text-active"
                >
                  <FiChevronDown className="w-4 h-4" />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: TRANSITION_EASE }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-4 text-xs text-secondary leading-relaxed border-t border-brand-500/10 pt-3">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
}
