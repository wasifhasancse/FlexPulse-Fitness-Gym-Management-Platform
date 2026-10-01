"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { toast } from "@heroui/react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  FiCheckCircle,
  FiPrinter,
  FiShield,
  FiArrowRight,
  FiCopy,
  FiCheck,
  FiCalendar,
  FiClock,
  FiRepeat,
  FiXCircle,
  FiAlertCircle,
  FiCreditCard,
  FiRefreshCw,
  FiStar,
  FiZap,
} from "react-icons/fi";
import {
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex,
  FaApplePay,
  FaGooglePay,
  FaCcDiscover,
} from "react-icons/fa";
import { SiStripe } from "react-icons/si";

/* ─────────────────────────────────────────────
   Animation Variants
───────────────────────────────────────────── */
const EASE = [0.16, 1, 0.3, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 28, filter: "blur(4px)" },
  visible: (d = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.65, delay: d, ease: EASE },
  }),
};

const fadeLeft = {
  hidden: { opacity: 0, x: -24 },
  visible: (d = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, delay: d, ease: EASE },
  }),
};

const fadeRight = {
  hidden: { opacity: 0, x: 24 },
  visible: (d = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, delay: d, ease: EASE },
  }),
};

const scalePop = {
  hidden: { opacity: 0, scale: 0.82 },
  visible: (d = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 260, damping: 22, delay: d },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const childFadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE },
  },
};

/* ─────────────────────────────────────────────
   Animated Row helper
───────────────────────────────────────────── */
function AnimRow({ children, delay = 0, direction = "up", className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" });
  const variant = direction === "left" ? fadeLeft : direction === "right" ? fadeRight : fadeUp;
  return (
    <motion.div
      ref={ref}
      variants={variant}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      custom={delay}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function SuccessReceiptClient({ receiptData }) {
  const {
    sessionId = "cs_test_sample",
    subscriptionId = null,
    customerEmail = "athlete@flexpulse.com",
    className = "High Performance Masterclass",
    trainer = "Coach Marcus Vance",
    price = 35,
    duration = 45,
    classId = "",
    userName = "FlexPulse Athlete",
    userId = "",
    billingCycle = "monthly",
    autoRenew = true,
    paymentMethod = {
      brand: "visa",
      last4: "4242",
      type: "card",
      funding: "credit",
      wallet: null,
    },
    dateFormatted = new Date().toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }),
  } = receiptData;

  const [copied, setCopied] = useState(false);
  const [isAutoRenew, setIsAutoRenew] = useState(receiptData.autoRenew !== false);
  const [isUpdatingRenew, setIsUpdatingRenew] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);

  const renewalDate = new Date();
  renewalDate.setMonth(renewalDate.getMonth() + 1);
  const renewalDateFormatted = renewalDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const receiptNumber = `FP-REC-${(sessionId || "FLEX").slice(-8).toUpperCase()}`;
  const checkinPin = Math.abs(
    (sessionId || "4892").split("").reduce((acc, c) => acc + c.charCodeAt(0), 1000) % 9000 + 1000
  );

  /* ── refs for each section ── */
  const headerRef = useRef(null);
  const mastheadRef = useRef(null);
  const gatewayRef = useRef(null);
  const metaRef = useRef(null);
  const tableRef = useRef(null);
  const policyRef = useRef(null);
  const accessRef = useRef(null);
  const footerRef = useRef(null);
  const renewCardRef = useRef(null);
  const actionsRef = useRef(null);

  const headerIn = useInView(headerRef, { once: true, margin: "0px 0px -40px 0px" });
  const mastheadIn = useInView(mastheadRef, { once: true, margin: "0px 0px -40px 0px" });
  const gatewayIn = useInView(gatewayRef, { once: true, margin: "0px 0px -40px 0px" });
  const metaIn = useInView(metaRef, { once: true, margin: "0px 0px -40px 0px" });
  const tableIn = useInView(tableRef, { once: true, margin: "0px 0px -40px 0px" });
  const policyIn = useInView(policyRef, { once: true, margin: "0px 0px -40px 0px" });
  const accessIn = useInView(accessRef, { once: true, margin: "0px 0px -40px 0px" });
  const footerIn = useInView(footerRef, { once: true, margin: "0px 0px -40px 0px" });
  const renewCardIn = useInView(renewCardRef, { once: true, margin: "0px 0px -40px 0px" });
  const actionsIn = useInView(actionsRef, { once: true, margin: "0px 0px -40px 0px" });

  const handlePrint = () => {
    if (typeof window !== "undefined") window.print();
  };

  const handleCopyReceipt = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(receiptNumber);
      setCopied(true);
      toast.success("Receipt ID copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleToggleAutoRenew = async () => {
    setIsUpdatingRenew(true);
    const newAutoRenewState = !isAutoRenew;
    try {
      const res = await fetch("/api/subscription/toggle-renew", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subscriptionId, sessionId, autoRenew: newAutoRenewState, classId, userId }),
      });
      const data = await res.json();
      if (res.ok) {
        setIsAutoRenew(newAutoRenewState);
        setShowCancelModal(false);
        if (newAutoRenewState) {
          toast.success("Auto-renewal reactivated! Your membership will renew automatically on " + renewalDateFormatted);
        } else {
          toast.info("Auto-renewal cancelled. You will not be charged again. Access remains active until " + renewalDateFormatted);
        }
      } else {
        toast.error(data.error || "Failed to update auto-renewal preference.");
      }
    } catch (err) {
      console.error("Auto renew toggle error:", err);
      toast.error("Failed to update auto-renewal settings. Please try again.");
    } finally {
      setIsUpdatingRenew(false);
    }
  };

  const renderPaymentMethodBadge = () => {
    const brand = (paymentMethod?.brand || "visa").toLowerCase();
    const last4 = paymentMethod?.last4 || "4242";
    const wallet = paymentMethod?.wallet;
    if (wallet === "apple_pay") return (
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-white/10 text-foreground border border-slate-200 dark:border-white/10 font-bold text-xs">
        <FaApplePay className="w-5 h-5" /><span>Apple Pay (ending in •••• {last4})</span>
      </div>
    );
    if (wallet === "google_pay") return (
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-white/10 text-foreground border border-slate-200 dark:border-white/10 font-bold text-xs">
        <FaGooglePay className="w-5 h-5 text-amber-500" /><span>Google Pay (ending in •••• {last4})</span>
      </div>
    );
    if (brand.includes("master")) return (
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-rose-50 dark:bg-rose-500/10 text-[#EB001B] border border-rose-200 dark:border-rose-500/20 font-bold text-xs">
        <FaCcMastercard className="w-4 h-4 text-[#EB001B]" /><span>Mastercard •••• {last4} ({paymentMethod?.funding || "Credit"})</span>
      </div>
    );
    if (brand.includes("amex")) return (
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-500/10 text-[#006FCF] border border-blue-200 dark:border-blue-500/20 font-bold text-xs">
        <FaCcAmex className="w-4 h-4 text-[#006FCF]" /><span>American Express •••• {last4}</span>
      </div>
    );
    if (brand.includes("discover")) return (
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-orange-50 dark:bg-orange-500/10 text-[#FF6600] border border-orange-200 dark:border-orange-500/20 font-bold text-xs">
        <FaCcDiscover className="w-4 h-4 text-[#FF6600]" /><span>Discover •••• {last4}</span>
      </div>
    );
    return (
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-[#1A1F71]/20 text-[#1A1F71] dark:text-blue-300 border border-blue-200 dark:border-blue-500/20 font-bold text-xs">
        <FaCcVisa className="w-4 h-4 text-[#1A1F71] dark:text-blue-400" /><span>Visa Card •••• {last4} ({paymentMethod?.funding || "Credit"})</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background py-8 sm:py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300 relative overflow-hidden">
      {/* Ambient glow meshes */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-active/6 rounded-full blur-[120px] animate-pulse duration-[6000ms]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-brand-500/8 rounded-full blur-[120px] animate-pulse duration-[8000ms]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-500/5 rounded-full blur-[100px]" />
      </div>

      {/* Print styles */}
      <style>{`
        @page { size: A4 portrait; margin: 10mm 12mm; }
        @media print {
          html, body { margin: 0 !important; padding: 0 !important; background: #ffffff !important; color: #0f172a !important; font-size: 11.5px !important; line-height: 1.45 !important; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          header, footer, nav, .no-print, [data-theme-toggle] { display: none !important; }
          .min-h-screen { min-height: 0 !important; padding: 0 !important; background: transparent !important; }
          .max-w-3xl { max-width: 100% !important; margin: 0 !important; padding: 0 !important; }
          .print-area { box-shadow: none !important; border: 1.5px solid #cbd5e1 !important; border-radius: 12px !important; margin: 0 auto !important; padding: 22px 24px !important; width: 100% !important; max-width: 100% !important; background: #ffffff !important; color: #0f172a !important; page-break-inside: avoid !important; break-inside: avoid !important; }
          .print-clean-border { border: 1px solid #e2e8f0 !important; }
          .print-bg-card { background-color: #f8fafc !important; }
          .print-bg-dark { background-color: #0f172a !important; color: #ffffff !important; }
        }
      `}</style>

      <div className="w-11/12 mx-auto max-w-3xl space-y-6 sm:space-y-8">

        {/* ── 0. Top success hero header ── */}
        <div ref={headerRef} className="text-center space-y-3 no-print">
          {/* Icon badge */}
          <motion.div
            variants={scalePop}
            initial="hidden"
            animate={headerIn ? "visible" : "hidden"}
            custom={0}
            className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-500 shadow-md mb-1 mx-auto"
          >
            <FiCheckCircle className="w-8 h-8 sm:w-10 sm:h-10" />
          </motion.div>

          {/* Kicker */}
          <motion.span
            variants={fadeUp}
            initial="hidden"
            animate={headerIn ? "visible" : "hidden"}
            custom={0.08}
            className="text-xs font-black uppercase tracking-widest text-emerald-500 block"
          >
            Official Invoice &amp; Booking Confirmation
          </motion.span>

          {/* H1 */}
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate={headerIn ? "visible" : "hidden"}
            custom={0.16}
            className="font-['Outfit'] text-2xl sm:text-4xl font-black text-foreground tracking-tight"
          >
            Official Payment Receipt
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate={headerIn ? "visible" : "hidden"}
            custom={0.24}
            className="font-['Inter'] text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto"
          >
            Your monthly class membership is confirmed. A copy has been dispatched to{" "}
            <strong className="text-foreground">{customerEmail}</strong>.
          </motion.p>

          {/* Trust pills row */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={headerIn ? "visible" : "hidden"}
            className="flex flex-wrap justify-center gap-2 pt-1"
          >
            {[
              { icon: <FiShield className="w-3 h-3" />, label: "256-Bit SSL" },
              { icon: <FiZap className="w-3 h-3" />, label: "Instant Settlement" },
              { icon: <FiStar className="w-3 h-3" />, label: "PCI-DSS Level 1" },
            ].map(({ icon, label }) => (
              <motion.span
                key={label}
                variants={childFadeUp}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] font-bold uppercase tracking-wider"
              >
                {icon}{label}
              </motion.span>
            ))}
          </motion.div>
        </div>

        {/* ── PRINTABLE RECEIPT AREA ── */}
        <motion.div
          ref={mastheadRef}
          variants={fadeUp}
          initial="hidden"
          animate={mastheadIn ? "visible" : "hidden"}
          custom={0}
          className="print-area relative rounded-3xl bg-white dark:bg-[#070F2B] border border-slate-200 dark:border-white/10 shadow-md overflow-hidden p-6 sm:p-10 space-y-6 print:space-y-4 print:p-5 print:border-slate-300 print:text-slate-900"
        >
          {/* Top accent line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-active/70 to-transparent" />

          {/* 1. Masthead */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-200 dark:border-white/10 print:pb-3.5 print:border-slate-200">
            <AnimRow delay={0.06} direction="left">
              <div className="space-y-1">
                <div className="flex items-center gap-2.5">
                  <span className="font-['Outfit'] text-2xl sm:text-3xl font-black tracking-tight text-foreground print:text-slate-900">
                    FLEX<span className="text-active">PULSE</span>
                  </span>
                  <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-300 print:bg-slate-100 print:text-slate-700 border border-slate-200/80 dark:border-white/10">
                    Athletic Club
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 print:text-slate-600">
                  128 Pulse Blvd, Cyber District, Dhaka • concierge@flexpulse.com
                </p>
              </div>
            </AnimRow>

            <AnimRow delay={0.12} direction="right" className="sm:text-right space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-500 text-xs font-bold uppercase tracking-wider print:border-emerald-600 print:text-emerald-700">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Paid &amp; Verified (Monthly)</span>
              </div>
              <div className="flex items-center sm:justify-end gap-1.5 text-xs text-slate-500 dark:text-slate-400 print:text-slate-700 pt-0.5">
                <span>Receipt No:</span>
                <strong className="font-mono text-foreground print:text-slate-900">{receiptNumber}</strong>
                <button type="button" onClick={handleCopyReceipt} className="hover:text-active ml-1 no-print cursor-pointer transition-colors duration-200" title="Copy receipt number">
                  {copied ? <FiCheck className="w-3.5 h-3.5 text-emerald-500" /> : <FiCopy className="w-3.5 h-3.5" />}
                </button>
              </div>
              <p className="text-[11px] text-slate-400 print:text-slate-600">{dateFormatted}</p>
            </AnimRow>
          </div>

          {/* 2. Payment Gateway */}
          <motion.div
            ref={gatewayRef}
            variants={fadeUp}
            initial="hidden"
            animate={gatewayIn ? "visible" : "hidden"}
            custom={0}
            className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/90 dark:border-white/10 space-y-3.5 print:p-3.5 print:space-y-2.5 print:bg-slate-50 print:border-slate-200"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <AnimRow delay={0} direction="left" className="flex items-center gap-3">
                <motion.div
                  whileHover={{ scale: 1.08, rotate: 6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="w-10 h-10 rounded-xl bg-[#635BFF] text-white flex items-center justify-center font-bold text-xl shrink-0 shadow-sm print:w-8 print:h-8 print:text-base"
                >
                  <SiStripe className="w-5 h-5 print:w-4 print:h-4" />
                </motion.div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-['Outfit'] font-black text-foreground text-base print:text-slate-900">Stripe™ Certified Payment Gateway</span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                      <FiShield className="w-3 h-3" />256-Bit SSL
                    </span>
                  </div>
                  <span className="text-xs text-slate-500 dark:text-slate-400 print:text-slate-600 block">PCI-DSS Level 1 End-to-End Encrypted Settlement</span>
                </div>
              </AnimRow>

              <AnimRow delay={0.08} direction="right" className="text-left sm:text-right">
                <span className="text-[11px] text-slate-400 print:text-slate-500 block">Settlement Status</span>
                <span className="text-xs font-bold text-emerald-600 print:text-emerald-700 flex items-center gap-1.5 sm:justify-end">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Instant Merchant Capture
                </span>
              </AnimRow>
            </div>

            <AnimRow delay={0.12} className="pt-3 border-t border-slate-200/80 dark:border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs print:pt-2 print:border-slate-200">
              <div className="flex items-center gap-2">
                <span className="font-bold uppercase tracking-wider text-slate-400 print:text-slate-600 text-[10px]">Payment Method Used:</span>
                {renderPaymentMethodBadge()}
              </div>
              <div className="flex items-center gap-2 text-slate-400 print:text-slate-500 text-[11px]">
                <span className="text-[10px] uppercase font-semibold">Accepted:</span>
                <div className="flex items-center gap-1.5">
                  {[
                    <FaCcVisa key="visa" className="w-4 h-4 text-[#1A1F71] dark:text-white" title="Visa" />,
                    <FaCcMastercard key="mc" className="w-4 h-4 text-[#EB001B]" title="Mastercard" />,
                    <FaApplePay key="apple" className="w-4 h-4 text-foreground" title="Apple Pay" />,
                    <FaCcAmex key="amex" className="w-4 h-4 text-[#006FCF]" title="Amex" />,
                    <FaGooglePay key="gpay" className="w-4 h-4 text-amber-500" title="Google Pay" />,
                    <FaCcDiscover key="disc" className="w-4 h-4 text-[#FF6600]" title="Discover" />,
                  ].map((icon, i) => (
                    <motion.span key={i} whileHover={{ scale: 1.2, y: -2 }} transition={{ type: "spring", stiffness: 300 }}>{icon}</motion.span>
                  ))}
                </div>
              </div>
            </AnimRow>
          </motion.div>

          {/* 3. Athlete & Session Meta */}
          <motion.div
            ref={metaRef}
            variants={staggerContainer}
            initial="hidden"
            animate={metaIn ? "visible" : "hidden"}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs print:grid-cols-2 print:gap-3.5"
          >
            {[
              {
                label: "Registered Athlete",
                title: userName,
                sub: customerEmail,
                detail: `Athlete ID: ${userId || "ATH-7821"}`,
                dir: "left",
              },
              {
                label: "Class Subscription Assignment",
                title: className,
                sub: `Coach: ${trainer} • ${duration} Minutes Intensive`,
                extra: (
                  <div className="flex items-center gap-2 text-xs text-emerald-600 font-bold pt-1">
                    <span>Cycle: Monthly Recurring</span><span>•</span>
                    <span>Next Renews: {renewalDateFormatted}</span>
                  </div>
                ),
                dir: "right",
              },
            ].map(({ label, title, sub, detail, extra, dir }) => (
              <motion.div
                key={label}
                variants={dir === "left" ? fadeLeft : fadeRight}
                className="space-y-1.5 p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5 hover:border-brand-500/30 dark:hover:border-brand-500/30 hover:shadow-sm transition-all duration-300 print:p-3 print:bg-slate-50 print:border-slate-200"
              >
                <span className="font-bold uppercase tracking-wider text-slate-400 print:text-slate-600 block text-[10px]">{label}</span>
                <p className="font-bold text-base text-foreground print:text-slate-900 truncate">{title}</p>
                <p className="text-slate-500 dark:text-slate-400 print:text-slate-600 truncate text-xs">{sub}</p>
                {detail && <p className="text-[11px] text-slate-400 print:text-slate-500 font-mono pt-1">{detail}</p>}
                {extra}
              </motion.div>
            ))}
          </motion.div>

          {/* 4. Itemized Table */}
          <motion.div
            ref={tableRef}
            variants={fadeUp}
            initial="hidden"
            animate={tableIn ? "visible" : "hidden"}
            custom={0}
            className="space-y-2.5 print:space-y-2"
          >
            <AnimRow delay={0.04}>
              <h3 className="font-['Outfit'] font-bold text-xs text-foreground print:text-slate-900 uppercase tracking-wider">Itemized Ledger Breakdown</h3>
            </AnimRow>

            <AnimRow delay={0.1} className="overflow-x-auto rounded-xl border border-slate-200 dark:border-white/10 hover:border-brand-500/20 transition-colors duration-300 print:border-slate-300">
              <table className="w-full text-left text-xs print:text-[11px]">
                <thead>
                  <tr className="bg-slate-50/80 dark:bg-white/[0.02] border-b border-slate-200 dark:border-white/10 print:border-slate-300 text-slate-400 print:text-slate-600 font-semibold uppercase text-[10px]">
                    <th className="py-2.5 px-3 print:py-2 print:px-2.5">Item Description</th>
                    <th className="py-2.5 px-3 print:py-2 print:px-2.5 text-center">Billing Plan</th>
                    <th className="py-2.5 px-3 print:py-2 print:px-2.5 text-right">Rate / Month</th>
                    <th className="py-2.5 px-3 print:py-2 print:px-2.5 text-right">Amount Paid</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-white/5 print:divide-slate-200 text-slate-600 dark:text-slate-300 print:text-slate-800">
                  {[
                    { desc: `${className} (Monthly Class Membership)`, sub: `Unlimited monthly session access • Led by ${trainer}`, plan: "Monthly Pass", planClass: "text-active", rate: `$${price}.00 / mo`, amt: `$${price}.00`, amtClass: "font-bold text-foreground print:text-slate-900" },
                    { desc: "Cold Plunge & Finnish Sauna Recovery Pass", sub: "Complimentary 30-min access post-workout (48°F tub & 195°F sauna)", plan: "Monthly Perk", planClass: "text-slate-400", rate: "$0.00", amt: "Included ($0.00)", amtClass: "font-semibold text-emerald-500 print:text-emerald-700" },
                    { desc: "Biometric Sanitized Towel & Digital Locker", sub: "Full facility amenity access each session", plan: "Amenity", planClass: "text-slate-400", rate: "$0.00", amt: "Included ($0.00)", amtClass: "font-semibold text-emerald-500 print:text-emerald-700" },
                    { desc: "Stripe Platform Clearing & Turnstile Gate", sub: "Instant merchant settlement & encrypted QR verification", plan: "Gateway", planClass: "text-slate-400", rate: "$0.00", amt: "FREE ($0.00)", amtClass: "font-semibold text-emerald-500 print:text-emerald-700" },
                  ].map((row, i) => (
                    <motion.tr
                      key={i}
                      initial={{ opacity: 0, x: -12 }}
                      animate={tableIn ? { opacity: 1, x: 0 } : { opacity: 0, x: -12 }}
                      transition={{ delay: 0.18 + i * 0.07, duration: 0.45, ease: EASE }}
                      className="hover:bg-slate-50/60 dark:hover:bg-white/[0.02] transition-colors duration-200"
                    >
                      <td className="py-3 px-3 print:py-2 print:px-2.5">
                        <strong className="text-foreground print:text-slate-900 block font-['Outfit'] font-bold text-xs">{row.desc}</strong>
                        <span className="text-[11px] text-slate-400 print:text-slate-500">{row.sub}</span>
                      </td>
                      <td className={`py-3 px-3 print:py-2 print:px-2.5 text-center font-semibold text-xs print:text-rose-600 ${row.planClass}`}>{row.plan}</td>
                      <td className="py-3 px-3 print:py-2 print:px-2.5 text-right font-mono">{row.rate}</td>
                      <td className={`py-3 px-3 print:py-2 print:px-2.5 text-right font-mono ${row.amtClass}`}>{row.amt}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </AnimRow>

            {/* Financial summary */}
            <AnimRow delay={0.3} direction="right" className="pt-3 space-y-1.5 max-w-sm ml-auto text-xs print:pt-2">
              <div className="flex justify-between text-slate-500 dark:text-slate-400 print:text-slate-600">
                <span>Subtotal (First Month)</span>
                <span className="font-mono text-foreground print:text-slate-900">${price}.00</span>
              </div>
              <div className="flex justify-between text-slate-500 dark:text-slate-400 print:text-slate-600">
                <span>Auto-Renewal Status</span>
                <span className={`font-semibold ${isAutoRenew ? "text-emerald-600 print:text-emerald-700" : "text-amber-600"}`}>
                  {isAutoRenew ? "Active (Renews Monthly)" : "Cancelled (Ends at Period)"}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-200 dark:border-white/10 print:border-slate-300 text-sm font-bold text-foreground print:text-slate-900">
                <span className="font-['Outfit'] text-base">Grand Total Paid</span>
                <span className="font-['Outfit'] text-xl font-black text-active print:text-rose-600 font-mono">
                  ${price}.00 USD <span className="text-xs font-normal text-slate-400 print:text-slate-600">/ mo</span>
                </span>
              </div>
            </AnimRow>
          </motion.div>

          {/* 5. Policy Terms */}
          <AnimRow ref={policyRef} delay={0} className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/90 dark:border-white/5 hover:border-brand-500/25 dark:hover:border-brand-500/25 transition-all duration-300 space-y-1.5 text-xs print:p-2.5 print:bg-slate-50 print:border-slate-200">
            <div className="flex items-center justify-between">
              <span className="font-['Outfit'] font-bold text-xs uppercase tracking-wider text-foreground print:text-slate-900 flex items-center gap-1.5">
                <FiRepeat className="w-3.5 h-3.5 text-active" />
                Monthly Auto-Renewal Policy &amp; Terms
              </span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${isAutoRenew ? "bg-emerald-500/10 text-emerald-600" : "bg-amber-500/10 text-amber-600"}`}>
                {isAutoRenew ? "Auto-Renew Active" : "Auto-Renew Cancelled"}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 print:text-slate-600 leading-relaxed">
              This membership renews automatically on the same day each month at ${price}.00 USD. You hold full control to cancel auto-renewal anytime with zero penalty. Cancelling auto-renewal retains full access through the end of the paid month ({renewalDateFormatted}).
            </p>
          </AnimRow>

          {/* 6. Turnstile Access Pass */}
          <motion.div
            ref={accessRef}
            variants={scalePop}
            initial="hidden"
            animate={accessIn ? "visible" : "hidden"}
            custom={0}
            className="p-4 sm:p-5 rounded-2xl bg-slate-900 text-white space-y-2 relative overflow-hidden print:p-3 print:bg-slate-900 print:text-white print:rounded-xl"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-active/10 via-transparent to-brand-500/10 pointer-events-none" />
            <div className="flex items-center justify-between gap-4 relative z-10">
              <div>
                <AnimRow delay={0.08}>
                  <span className="text-[10px] font-black uppercase tracking-widest text-active block">Club Turnstile Access Pass</span>
                </AnimRow>
                <AnimRow delay={0.14}>
                  <h4 className="font-['Outfit'] text-lg sm:text-xl font-bold">
                    Express Check-In PIN: <span className="font-mono text-active tracking-wider">{checkinPin}</span>
                  </h4>
                </AnimRow>
                <AnimRow delay={0.2}>
                  <p className="text-xs text-slate-300">Present this receipt or state your 4-digit PIN at turnstiles 10 mins prior to class.</p>
                </AnimRow>
              </div>

              {/* Barcode */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={accessIn ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.28, duration: 0.5, ease: EASE }}
                className="p-2 rounded-xl bg-white text-slate-900 flex flex-col items-center shrink-0"
              >
                <div className="flex items-center gap-0.5 h-8 sm:h-10 w-32 sm:w-36">
                  {[3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5, 8, 9, 7, 9, 3, 2, 3, 8, 4, 6].map((w, i) => (
                    <div key={i} className="h-full bg-slate-900" style={{ width: `${w * 1.5}px` }} />
                  ))}
                </div>
                <span className="font-mono text-[9px] font-bold tracking-wider mt-1 text-slate-600">{receiptNumber}</span>
              </motion.div>
            </div>
          </motion.div>

          {/* 7. Receipt footer */}
          <AnimRow ref={footerRef} delay={0} className="text-center pt-3 border-t border-slate-200/80 dark:border-white/[0.08] print:border-slate-200 text-xs text-slate-400 print:text-slate-600 space-y-1 print:pt-2">
            <p>Official Tax &amp; Monthly Subscription Invoice • FlexPulse Athletic Club &amp; Recovery Lab</p>
            <p className="text-[11px]">
              Manage or cancel anytime from your athlete dashboard. Support:{" "}
              <a href="mailto:support@flexpulse.com" className="text-active hover:underline transition-colors duration-200">support@flexpulse.com</a>
              {" "}• +880 1712-345678
            </p>
          </AnimRow>
        </motion.div>

        {/* ── 8. Auto-Renewal Management Card ── */}
        <motion.div
          ref={renewCardRef}
          variants={fadeUp}
          initial="hidden"
          animate={renewCardIn ? "visible" : "hidden"}
          custom={0}
          className="no-print p-6 rounded-3xl bg-white dark:bg-[#070F2B] border border-slate-200 dark:border-white/10 hover:border-brand-500/30 dark:hover:border-brand-500/30 shadow-sm hover:shadow-md transition-all duration-300 space-y-4"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <AnimRow delay={0.04} direction="left" className="space-y-1">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${isAutoRenew ? "bg-emerald-500 animate-pulse" : "bg-amber-500"}`} />
                <h3 className="font-['Outfit'] font-black text-lg text-foreground">Monthly Subscription &amp; Auto-Renew Settings</h3>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {isAutoRenew ? (
                  <>Auto-renewal is currently <strong className="text-emerald-500">ACTIVE</strong>. Your next automatic charge of <strong>${price}.00 USD</strong> will occur on <strong>{renewalDateFormatted}</strong>.</>
                ) : (
                  <>Auto-renewal is currently <strong className="text-amber-500">DISABLED</strong>. You will not be charged again. Your class access will conclude on <strong>{renewalDateFormatted}</strong>.</>
                )}
              </p>
            </AnimRow>

            <AnimRow delay={0.1} direction="right" className="shrink-0">
              {isAutoRenew ? (
                <motion.button
                  type="button"
                  onClick={() => setShowCancelModal(true)}
                  disabled={isUpdatingRenew}
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.96 }}
                  className="px-5 py-2.5 rounded-xl border border-rose-500/30 bg-rose-500/10 hover:bg-rose-500 text-rose-500 hover:text-white font-['Outfit'] font-bold text-xs uppercase tracking-wider transition-all duration-200 flex items-center gap-2 cursor-pointer shadow-sm active:scale-95"
                >
                  <FiXCircle className="w-4 h-4" />
                  <span>Cancel Auto-Renewal</span>
                </motion.button>
              ) : (
                <motion.button
                  type="button"
                  onClick={handleToggleAutoRenew}
                  disabled={isUpdatingRenew}
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.96 }}
                  className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-['Outfit'] font-bold text-xs uppercase tracking-wider transition-all duration-200 flex items-center gap-2 cursor-pointer shadow-sm active:scale-95"
                >
                  <FiRefreshCw className={`w-4 h-4 ${isUpdatingRenew ? "animate-spin" : ""}`} />
                  <span>{isUpdatingRenew ? "Updating..." : "Reactivate Auto-Renewal"}</span>
                </motion.button>
              )}
            </AnimRow>
          </div>

          <AnimRow delay={0.16} className="pt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <FiShield className="w-3.5 h-3.5 text-active" />
              100% Flexible Subscription Guarantee • Zero Cancellation Penalties
            </span>
            <span>Billing Provider: Stripe™</span>
          </AnimRow>
        </motion.div>

        {/* ── 9. Action buttons ── */}
        <motion.div
          ref={actionsRef}
          variants={staggerContainer}
          initial="hidden"
          animate={actionsIn ? "visible" : "hidden"}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 no-print pt-2"
        >
          {/* Print */}
          <motion.button
            variants={childFadeUp}
            type="button"
            onClick={handlePrint}
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white dark:bg-[#070F2B] hover:bg-slate-50 dark:hover:bg-white/[0.06] text-foreground border border-slate-200 dark:border-white/10 hover:border-brand-500/30 text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-sm cursor-pointer"
          >
            <FiPrinter className="w-4 h-4 text-active" />
            <span>Print Official Receipt</span>
          </motion.button>

          {/* View bookings - Type 1 primary */}
          <motion.div variants={childFadeUp}>
            <Link
              href="/dashboard/member/bookings"
              className="group relative overflow-hidden w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl bg-btn-bg text-btn-text font-['Outfit'] font-black text-xs uppercase tracking-wider transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:scale-95 cursor-pointer border border-white/25 hover:border-white/40"
            >
              <span className="absolute inset-0 w-1/2 h-full bg-linear-to-r from-transparent via-white/20 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-[250%] transition-transform duration-700 ease-out pointer-events-none" />
              <span>View My Bookings</span>
              <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </motion.div>

          {/* Browse classes - Type 2 secondary */}
          <motion.div variants={childFadeUp}>
            <Link
              href="/all-classes"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-searchbox-bg hover:bg-searchbox-hover text-foreground border border-brand-500/25 hover:border-active/60 text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-xs hover:shadow-md hover:-translate-y-0.5 active:scale-95 cursor-pointer"
            >
              <span>Browse More Classes</span>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Cancel auto-renew modal */}
      <AnimatePresence mode="wait">
        {showCancelModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 no-print"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.88, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.88, y: 24 }}
              transition={{ type: "spring", stiffness: 280, damping: 22 }}
              className="w-full max-w-md rounded-3xl bg-white dark:bg-[#070F2B] border border-slate-200 dark:border-white/10 p-6 space-y-5 shadow-md relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-500/70 to-transparent" />

              <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1, ease: EASE }} className="flex items-start gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0 border border-amber-500/20">
                  <FiAlertCircle className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-['Outfit'] font-black text-lg text-foreground">Cancel Monthly Auto-Renewal?</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Your card will NOT be billed on <strong>{renewalDateFormatted}</strong>. You will retain complete, unrestricted access to your class through the end of this billing cycle.
                  </p>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16, ease: EASE }} className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-100 dark:border-white/5 text-xs space-y-1 text-slate-500 dark:text-slate-400">
                <div className="flex justify-between"><span>Class:</span><strong className="text-foreground">{className}</strong></div>
                <div className="flex justify-between"><span>Current Pass Expires:</span><strong className="text-foreground">{renewalDateFormatted}</strong></div>
                <div className="flex justify-between"><span>Future Charges:</span><strong className="text-emerald-500">$0.00 (Cancelled)</strong></div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.22, ease: EASE }} className="flex items-center gap-3 pt-2">
                <motion.button type="button" onClick={() => setShowCancelModal(false)} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} className="flex-1 py-3 px-4 rounded-xl border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/5 text-xs font-bold text-foreground transition-colors cursor-pointer">
                  Keep Auto-Renewal
                </motion.button>
                <motion.button type="button" onClick={handleToggleAutoRenew} disabled={isUpdatingRenew} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} className="flex-1 py-3 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-all shadow-sm cursor-pointer disabled:opacity-50">
                  {isUpdatingRenew ? "Processing..." : "Confirm Cancellation"}
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
