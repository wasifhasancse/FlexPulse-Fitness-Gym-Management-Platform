"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiCheck, FiCalendar, FiUser, FiMail, FiPhone, FiCompass, FiClock } from "react-icons/fi";

const TRANSITION_EASE = [0.16, 1, 0.3, 1];

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.35, ease: TRANSITION_EASE } },
  exit: { opacity: 0, transition: { duration: 0.25, ease: "easeIn" } },
};

const modalContainerVariants = {
  hidden: { opacity: 0, scale: 0.94, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: TRANSITION_EASE,
      staggerChildren: 0.06,
      delayChildren: 0.08,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    transition: { duration: 0.25, ease: "easeIn" },
  },
};

const modalCloseBtnVariants = {
  hidden: { opacity: 0, scale: 0, rotate: -90 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { type: "spring", stiffness: 320, damping: 18, delay: 0.12 },
  },
};

const formHeaderVariants = {
  hidden: { opacity: 0, y: -16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 220, damping: 20 },
  },
};

const formFieldVariants = {
  hidden: { opacity: 0, y: 14, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 240, damping: 22 },
  },
};

const formSubmitBtnVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 260, damping: 20 },
  },
};

export default function FacilityTourModal({
  showTourModal,
  onClose,
  tourSubmitted,
  tourForm,
  setTourForm,
  handleTourSubmit,
  facilityZones = [],
}) {
  if (!showTourModal) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6 overflow-hidden">
        {/* Animated Dark Frosted Glass Backdrop */}
        <motion.div
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
        />

        {/* Modal Window Container */}
        <motion.div
          variants={modalContainerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="relative bg-white dark:bg-[#0c0a1d] border border-slate-200/80 dark:border-brand-500/25 rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto custom-scrollbar shadow-2xl z-10 p-6 sm:p-7 space-y-5 text-slate-900 dark:text-foreground"
        >
          {/* High-Visibility Floating Close Button */}
          <motion.button
            variants={modalCloseBtnVariants}
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 z-30 w-9 h-9 rounded-full bg-black/70 hover:bg-active text-white hover:text-btn-text backdrop-blur-md border border-white/20 hover:border-active flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-xs cursor-pointer"
            aria-label="Close Tour Modal"
          >
            <FiX size={18} />
          </motion.button>

          {tourSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45, ease: TRANSITION_EASE }}
              className="text-center py-6 space-y-4 font-['Inter']"
            >
              <div className="w-16 h-16 rounded-3xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-500 flex items-center justify-center mx-auto text-2xl font-bold shadow-2xs">
                <FiCheck />
              </div>
              <div className="space-y-1">
                <h3 className="font-['Outfit'] text-2xl font-black text-foreground">
                  Tour Walkthrough Confirmed!
                </h3>
                <p className="text-xs sm:text-sm text-secondary max-w-sm mx-auto leading-relaxed">
                  Thank you, <strong className="text-foreground">{tourForm.name || "Athlete"}</strong>. Your VIP facility walkthrough for <strong>{tourForm.focusZone}</strong> is reserved for <strong>{tourForm.preferredDate} ({tourForm.preferredTime})</strong>.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-brand-500/5 border border-brand-500/15 text-left text-xs space-y-2 text-secondary">
                <div className="flex justify-between">
                  <span>Confirmation Code:</span>
                  <span className="font-mono font-bold text-active">FP-TOUR-7842</span>
                </div>
                <div className="flex justify-between">
                  <span>Guest Pass Access:</span>
                  <span className="font-bold text-emerald-500">Complimentary 1-Day Trial Included</span>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-full py-3 rounded-2xl bg-btn-bg text-btn-text font-black text-xs shadow-xs hover:shadow-md transition-all cursor-pointer hover:scale-102"
              >
                Return to Campus Arenas
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleTourSubmit} className="space-y-4 font-['Inter']">
              <motion.div variants={formHeaderVariants} className="space-y-1 pr-8">
                <span className="text-[11px] font-bold uppercase tracking-wider text-active inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-active/10 border border-active/20">
                  <FiCompass className="w-3.5 h-3.5" />
                  <span>VIP Facility Walkthrough</span>
                </span>
                <h3 className="font-['Outfit'] text-xl sm:text-2xl font-black text-foreground">
                  Book a Private Club Tour
                </h3>
                <p className="text-xs text-secondary">
                  Meet with a Master Trainer for a customized tour and trial session.
                </p>
              </motion.div>

              <div className="space-y-3 text-xs">
                <motion.div variants={formFieldVariants}>
                  <label className="block font-semibold text-slate-800 dark:text-foreground mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alexander Cole"
                    value={tourForm.name}
                    onChange={(e) => setTourForm({ ...tourForm, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-2xl border border-slate-200/90 dark:border-brand-500/25 bg-slate-50 dark:bg-searchbox-bg text-slate-900 dark:text-foreground placeholder:text-slate-400 dark:placeholder:text-secondary/70 focus:outline-none focus:border-active transition-colors"
                  />
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <motion.div variants={formFieldVariants}>
                    <label className="block font-semibold text-slate-800 dark:text-foreground mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="alex@example.com"
                      value={tourForm.email}
                      onChange={(e) => setTourForm({ ...tourForm, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-2xl border border-slate-200/90 dark:border-brand-500/25 bg-slate-50 dark:bg-searchbox-bg text-slate-900 dark:text-foreground placeholder:text-slate-400 dark:placeholder:text-secondary/70 focus:outline-none focus:border-active transition-colors"
                    />
                  </motion.div>
                  <motion.div variants={formFieldVariants}>
                    <label className="block font-semibold text-slate-800 dark:text-foreground mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+1 (555) 000-0000"
                      value={tourForm.phone}
                      onChange={(e) => setTourForm({ ...tourForm, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-2xl border border-slate-200/90 dark:border-brand-500/25 bg-slate-50 dark:bg-searchbox-bg text-slate-900 dark:text-foreground placeholder:text-slate-400 dark:placeholder:text-secondary/70 focus:outline-none focus:border-active transition-colors"
                    />
                  </motion.div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <motion.div variants={formFieldVariants}>
                    <label className="block font-semibold text-slate-800 dark:text-foreground mb-1">
                      Preferred Date
                    </label>
                    <select
                      value={tourForm.preferredDate}
                      onChange={(e) => setTourForm({ ...tourForm, preferredDate: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-2xl border border-slate-200/90 dark:border-brand-500/25 bg-slate-50 dark:bg-searchbox-bg text-slate-900 dark:text-foreground focus:outline-none focus:border-active cursor-pointer transition-colors"
                    >
                      <option value="Tomorrow" className="bg-white dark:bg-[#121026] text-slate-900 dark:text-foreground">Tomorrow</option>
                      <option value="This Wednesday" className="bg-white dark:bg-[#121026] text-slate-900 dark:text-foreground">This Wednesday</option>
                      <option value="This Friday" className="bg-white dark:bg-[#121026] text-slate-900 dark:text-foreground">This Friday</option>
                      <option value="This Weekend (Saturday)" className="bg-white dark:bg-[#121026] text-slate-900 dark:text-foreground">This Weekend (Saturday)</option>
                      <option value="Next Week" className="bg-white dark:bg-[#121026] text-slate-900 dark:text-foreground">Next Week</option>
                    </select>
                  </motion.div>

                  <motion.div variants={formFieldVariants}>
                    <label className="block font-semibold text-slate-800 dark:text-foreground mb-1">
                      Time Window
                    </label>
                    <select
                      value={tourForm.preferredTime}
                      onChange={(e) => setTourForm({ ...tourForm, preferredTime: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-2xl border border-slate-200/90 dark:border-brand-500/25 bg-slate-50 dark:bg-searchbox-bg text-slate-900 dark:text-foreground focus:outline-none focus:border-active cursor-pointer transition-colors"
                    >
                      <option value="Morning (8:00 AM - 11:00 AM)" className="bg-white dark:bg-[#121026] text-slate-900 dark:text-foreground">Morning (8:00 AM - 11:00 AM)</option>
                      <option value="Midday (12:00 PM - 3:00 PM)" className="bg-white dark:bg-[#121026] text-slate-900 dark:text-foreground">Midday (12:00 PM - 3:00 PM)</option>
                      <option value="Evening (4:00 PM - 7:00 PM)" className="bg-white dark:bg-[#121026] text-slate-900 dark:text-foreground">Evening (4:00 PM - 7:00 PM)</option>
                    </select>
                  </motion.div>
                </div>

                <motion.div variants={formFieldVariants}>
                  <label className="block font-semibold text-slate-800 dark:text-foreground mb-1">
                    Primary Facility Interest
                  </label>
                  <select
                    value={tourForm.focusZone}
                    onChange={(e) => setTourForm({ ...tourForm, focusZone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-2xl border border-slate-200/90 dark:border-brand-500/25 bg-slate-50 dark:bg-searchbox-bg text-slate-900 dark:text-foreground focus:outline-none focus:border-active cursor-pointer transition-colors"
                  >
                    <option value="Full Club Infrastructure Walkthrough" className="bg-white dark:bg-[#121026] text-slate-900 dark:text-foreground">
                      Full Club Infrastructure Walkthrough
                    </option>
                    {facilityZones.map((z) => (
                      <option key={z.id} value={z.name} className="bg-white dark:bg-[#121026] text-slate-900 dark:text-foreground">
                        {z.name}
                      </option>
                    ))}
                  </select>
                </motion.div>
              </div>

              <motion.div variants={formSubmitBtnVariants} className="pt-2">
                <button
                  type="submit"
                  className="w-full relative inline-flex items-center justify-center gap-2 py-3 rounded-2xl bg-btn-bg text-btn-text font-black text-xs shadow-xs hover:shadow-md transition-all duration-300 overflow-hidden group hover:scale-102 cursor-pointer"
                >
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />
                  <FiCalendar className="w-4 h-4 text-btn-text relative z-10" />
                  <span className="relative z-10">Confirm Walkthrough Request</span>
                </button>
                <p className="text-[10px] text-secondary text-center mt-2">
                  Complimentary 1-day pass included for all booked tour guests. No credit card required.
                </p>
              </motion.div>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
