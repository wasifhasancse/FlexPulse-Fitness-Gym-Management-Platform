"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "@heroui/react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  FiClock,
  FiCalendar,
  FiMapPin,
  FiUsers,
  FiZap,
  FiAward,
  FiShare2,
  FiCheckCircle,
  FiArrowLeft,
  FiArrowRight,
  FiShield,
  FiActivity,
  FiCheck,
  FiMaximize2,
  FiX,
  FiChevronDown,
  FiChevronUp,
  FiPlay,
  FiRepeat,
} from "react-icons/fi";
import {
  FaStar,
  FaHeart as FaHeartSolid,
  FaRegHeart,
  FaDumbbell,
  FaFire,
  FaHeartbeat,
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex,
  FaApplePay,
  FaGooglePay,
  FaCcDiscover,
} from "react-icons/fa";
import { SiStripe } from "react-icons/si";

const TRANSITION_EASE = [0.16, 1, 0.3, 1];

// Category-specific high-resolution image galleries
const GALLERY_PRESETS = {
  Weights: [
    {
      label: "Olympic Barbell Complex",
      tag: "Main Action",
      url: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1600&auto=format&fit=crop",
      desc: "Competition-grade Eleiko platforms and calibrated Olympic plates.",
    },
    {
      label: "Free Weights & Dumbbell Arena",
      tag: "Floor Setup",
      url: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1600&auto=format&fit=crop",
      desc: "Custom urethane dumbbells from 5kg to 65kg with ergonomic benches.",
    },
    {
      label: "Precision Form Cueing",
      tag: "Coach Guidance",
      url: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=1600&auto=format&fit=crop",
      desc: "Direct hands-on biomechanical feedback from certified CSCS masters.",
    },
    {
      label: "Hydro & Contrast Recovery",
      tag: "Post-Workout",
      url: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1600&auto=format&fit=crop",
      desc: "Submerge in 48°F cold tubs and 195°F Finnish sauna post-training.",
    },
  ],
  HIIT: [
    {
      label: "Anaerobic Turf Sleds",
      tag: "Main Action",
      url: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1600&auto=format&fit=crop",
      desc: "Heavy sled drives and battle rope intervals on high-traction indoor turf.",
    },
    {
      label: "Woodway Curved Sprints",
      tag: "Equipment",
      url: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1600&auto=format&fit=crop",
      desc: "Self-powered curved treadmills maximizing natural kinetic running mechanics.",
    },
    {
      label: "Team Dynamic Energy",
      tag: "Live Cohort",
      url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1600&auto=format&fit=crop",
      desc: "Synchronized high-output team intervals with overhead telemetry screens.",
    },
    {
      label: "Cold Contrast Bath",
      tag: "Recovery",
      url: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=1600&auto=format&fit=crop",
      desc: "Rapid lactate clearance in filtered chilled recovery basins.",
    },
  ],
  Combat: [
    {
      label: "Heavy Aqua-Bag Striking",
      tag: "Main Action",
      url: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=1600&auto=format&fit=crop",
      desc: "Shock-absorbing water-filled heavy bags protecting wrists and knuckles.",
    },
    {
      label: "Championship Boxing Ring",
      tag: "Arena Floor",
      url: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1600&auto=format&fit=crop",
      desc: "Professional competition canvas with padded lateral ring ropes.",
    },
    {
      label: "Velocity Pad Drills",
      tag: "Coach Focus",
      url: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=1600&auto=format&fit=crop",
      desc: "Precision combinations, slip line defense, and footwork conditioning.",
    },
    {
      label: "Recovery & Hydration Suite",
      tag: "Recovery",
      url: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1600&auto=format&fit=crop",
      desc: "Electrolyte tap bar and deep tissue thermal therapy suites.",
    },
  ],
  Stretching: [
    {
      label: "Guided Spinal & Hip Mobility",
      tag: "Main Action",
      url: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1600&auto=format&fit=crop",
      desc: "Fascial release, hamstring flossing, and active loaded shoulder opening.",
    },
    {
      label: "Mindfulness Ambient Studio",
      tag: "Studio Space",
      url: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=1600&auto=format&fit=crop",
      desc: "Acoustically tuned studio with natural bamboo floors and dimmable warmth.",
    },
    {
      label: "Assisted PNF Stretching",
      tag: "Instructor Cues",
      url: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1600&auto=format&fit=crop",
      desc: "Proprioceptive Neuromuscular Facilitation to safely increase range of motion.",
    },
    {
      label: "Finnish Cedar Sauna",
      tag: "Thermotherapy",
      url: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?q=80&w=1600&auto=format&fit=crop",
      desc: "195°F authentic Nordic cedar chamber for cardiovascular flush.",
    },
  ],
  Cardio: [
    {
      label: "High-Cadence Aerobic Drive",
      tag: "Main Action",
      url: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?q=80&w=1600&auto=format&fit=crop",
      desc: "Lactate threshold intervals designed to elevate functional VO2 peak output.",
    },
    {
      label: "Cardio Theatre & SkiErgs",
      tag: "Equipment Floor",
      url: "https://images.unsplash.com/photo-1534367507873-d2d7e24c797f?q=80&w=1600&auto=format&fit=crop",
      desc: "Concept2 rowers, SkiErgs, and air bikes synced to personal telemetry.",
    },
    {
      label: "Heart Zone Pacing Cues",
      tag: "Coach Guidance",
      url: "https://images.unsplash.com/photo-1434596922112-19c563067271?q=80&w=1600&auto=format&fit=crop",
      desc: "Live heart zone monitoring ensuring athletes stay in target anaerobic windows.",
    },
    {
      label: "Electrolyte Lounge",
      tag: "Recovery",
      url: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1600&auto=format&fit=crop",
      desc: "Alkaline water, essential minerals, and cold contrast plunge tubs.",
    },
  ],
};

export default function ClassDetailsPageLayout({
  classData: propClassData,
  isBooked: initialIsBooked = false,
  isFavorite: initialFavorite = false,
  userId,
  userName,
  userEmail,
  bookingCountData,
  user,
}) {
  const data = propClassData || {};
  const [isFavorite, setIsFavorite] = useState(initialFavorite);
  const [favLoading, setFavLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [copied, setCopied] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);
  const [isProcessingStripe, setIsProcessingStripe] = useState(false);
  const [autoRenew, setAutoRenew] = useState(true);

  // Staged Viewport Gating Refs & States
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const bookingRef = useRef(null);

  const isHeroInView = useInView(heroRef, { once: true, amount: 0.1 });
  const isContentInView = useInView(contentRef, { once: true, amount: 0.08 });
  const isBookingInView = useInView(bookingRef, { once: true, amount: 0.08 });

  const [heroTriggered, setHeroTriggered] = useState(false);
  const [contentTriggered, setContentTriggered] = useState(false);
  const [bookingTriggered, setBookingTriggered] = useState(false);

  useEffect(() => {
    if (isHeroInView) {
      const t = setTimeout(() => setHeroTriggered(true), 150);
      return () => clearTimeout(t);
    }
  }, [isHeroInView]);

  useEffect(() => {
    if (isContentInView) {
      const t = setTimeout(() => setContentTriggered(true), 200);
      return () => clearTimeout(t);
    }
  }, [isContentInView]);

  useEffect(() => {
    if (isBookingInView) {
      const t = setTimeout(() => setBookingTriggered(true), 250);
      return () => clearTimeout(t);
    }
  }, [isBookingInView]);

  // Determine category key for curated photo preset
  const catKey =
    Object.keys(GALLERY_PRESETS).find((k) =>
      (data.category || "").toLowerCase().includes(k.toLowerCase())
    ) || "Weights";

  const galleryPresets = GALLERY_PRESETS[catKey] || GALLERY_PRESETS.Weights;

  // Build 4-photo gallery with the class's original image as slot 0
  const galleryImages = [
    {
      label: data.className || galleryPresets[0].label,
      tag: "Primary View",
      url: data.classImage || galleryPresets[0].url,
      desc: data.description || galleryPresets[0].desc,
    },
    galleryPresets[1],
    galleryPresets[2],
    galleryPresets[3],
  ];

  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const currentHeroImage = galleryImages[selectedImageIdx];

  // Deterministic ratings and reviews
  const seed = data._id
    ? data._id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
    : 42;
  const rating = (4.7 + (seed % 4) * 0.1).toFixed(1);
  const reviewCount = 48 + (seed % 92);

  const getEquipment = (category = "") => {
    const cat = (category || "").toLowerCase();
    if (cat.includes("yoga") || cat.includes("stretch"))
      return ["High-Density Mat", "Yoga Blocks", "Mobility Straps", "Foam Roller"];
    if (cat.includes("cardio") || cat.includes("hiit"))
      return ["Curved Treadmills", "Assault AirBike", "Plyo Boxes", "Agility Cones"];
    if (cat.includes("weight") || cat.includes("strength"))
      return ["Olympic Barbells", "Bumper Plates", "Urethane Dumbbells", "Lifting Chalk"];
    if (cat.includes("combat") || cat.includes("box"))
      return ["Aqua Heavy Bags", "16oz Sparring Gloves", "Speed Ropes", "Hand Wraps"];
    return ["Pro Olympic Barbells", "Dumbbells", "Turf Sleds", "Hydro Towel"];
  };

  const equipmentList = getEquipment(data.category);

  const getIntensityInfo = (level = "") => {
    const lvl = (level || "").toLowerCase();
    if (lvl.includes("advanced") || lvl.includes("high"))
      return {
        bars: 5,
        label: "Max MetCon (Zone 4 - 5)",
        hr: "85% - 95% HRmax (165-185 BPM)",
        cals: "650 - 850 kcal",
      };
    if (lvl.includes("intermediate") || lvl.includes("medium"))
      return {
        bars: 4,
        label: "Anaerobic Engine (Zone 3 - 4)",
        hr: "75% - 85% HRmax (145-165 BPM)",
        cals: "500 - 700 kcal",
      };
    return {
      bars: 3,
      label: "Foundation & Flow (Zone 2 - 3)",
      hr: "65% - 75% HRmax (125-145 BPM)",
      cals: "400 - 550 kcal",
    };
  };

  const intensityInfo = getIntensityInfo(data.difficultyLevel || data.level);

  const getStudio = (category = "") => {
    const cat = (category || "").toLowerCase();
    if (cat.includes("yoga") || cat.includes("stretch")) return "Mindfulness & Flow Studio";
    if (cat.includes("cardio") || cat.includes("hiit")) return "High-Altitude Cardio Arena";
    if (cat.includes("combat")) return "Kinetic Combat & Ring Pavilion";
    return "Olympic Platform & Iron Arena";
  };

  const studio = getStudio(data.category);
  const coachName =
    data.authorName ||
    (data.author && data.author !== "trainer" ? data.author : "Coach Marcus Vance");

  const totalSlots = Number(data.slot) || 20;
  const bookedCount = Number(bookingCountData?.bookingCount || data.bookingCount || 0);
  const availableSlots = Math.max(0, totalSlots - bookedCount);
  const percentFilled = Math.min(100, Math.round((bookedCount / totalSlots) * 100));

  const handleFavoriteToggle = async () => {
    if (!userId) {
      toast.warning("Please sign in to bookmark this class!");
      return;
    }
    setFavLoading(true);
    try {
      const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";
      const res = await fetch(`${serverUrl}/api/favorites`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          userName,
          userEmail,
          classId: data._id,
          className: data.className,
          classImage: data.classImage,
          category: data.category,
          price: data.price,
          duration: data.duration,
          author: data.author,
        }),
      });

      const result = await res.json();
      setIsFavorite(result.isFavorite);
      toast.success(
        result.message || (result.isFavorite ? "Saved to favorites!" : "Removed from favorites")
      );
    } catch (err) {
      console.error("Favorite error:", err);
      toast.error("Failed to update bookmark.");
    } finally {
      setFavLoading(false);
    }
  };

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      toast.success("Class link copied to clipboard!");
      setTimeout(() => setCopied(false), 2500);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isReceiptModalOpen && !isProcessingStripe) {
        setIsReceiptModalOpen(false);
        setIsProcessingStripe(false);
      }
    };
    if (isReceiptModalOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isReceiptModalOpen, isProcessingStripe]);

  const handleContinueToStripe = async (e) => {
    if (e) e.preventDefault();
    if (isProcessingStripe) return;
    setIsProcessingStripe(true);

    try {
      const formData = new FormData();
      formData.append("price", String(data.price || 35));
      formData.append("status", user?.status || "active");
      formData.append("trainer", data.author || "");
      formData.append("classId", data._id || "");
      formData.append("className", data.className || "");
      formData.append("duration", String(data.duration || 60));
      formData.append("image", data.classImage || "");
      formData.append("autoRenew", String(autoRenew));

      const res = await fetch("/api/payment", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        credentials: "include",
        body: formData,
      });

      const result = await res.json();
      if (res.ok && result?.url) {
        window.location.href = result.url;
      } else {
        if (res.status === 401) {
          toast.warning("Please sign in to proceed with booking.");
          window.location.href = `/signin?redirect=/all-classes/${data._id}`;
          return;
        }
        toast.error(
          result?.error || "Failed to initialize Stripe checkout. Please try again."
        );
        setIsProcessingStripe(false);
      }
    } catch (err) {
      console.error("Stripe Checkout Error:", err);
      toast.error(
        "Unable to connect to Stripe. Please check your network and try again."
      );
      setIsProcessingStripe(false);
    }
  };

  const FAQS = [
    {
      q: "What should I bring to my first session?",
      a: "Wear supportive training shoes and athletic apparel. We provide freshly sanitized sweat towels, chilled electrolyte water, and secure digital lockers. If attending Combat, sparring gloves are available on-site.",
    },
    {
      q: "What if I can't perform certain movements or have a prior injury?",
      a: "Every FlexPulse coach conducts an initial intake before class begins. Progressive regressions and biomechanical variations will be provided to ensure full stimulus without aggravating injuries.",
    },
    {
      q: "How does the post-workout recovery suite access work?",
      a: "Your class registration includes 30 minutes of complimentary access to our 48°F contrast cold plunge tubs and 195°F Finnish dry cedar sauna directly following your training session.",
    },
    {
      q: "Can I cancel or reschedule if my schedule changes?",
      a: "Yes! Full flexible cancellation applies up to 12 hours prior to class commencement. You can reschedule to any upcoming date with a single tap in your athlete dashboard.",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300 pb-24">
      {/* Lightbox Modal for Full-Resolution Image Inspection */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-4 sm:p-8"
          >
            <motion.button
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ type: "spring", stiffness: 220 }}
              onClick={() => setLightboxOpen(false)}
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-active text-white flex items-center justify-center transition-all cursor-pointer z-50 shadow-xs"
              title="Close viewer"
            >
              <FiX className="w-6 h-6" />
            </motion.button>

            <motion.div
              initial={{ scale: 0.92, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 20 }}
              transition={{ duration: 0.4, ease: TRANSITION_EASE }}
              className="relative w-full max-w-5xl h-[70vh] rounded-3xl overflow-hidden border border-brand-500/20 shadow-md"
            >
              <Image
                src={currentHeroImage.url}
                alt={currentHeroImage.label}
                fill
                unoptimized
                className="object-contain"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 text-center max-w-xl text-white"
            >
              <span className="text-xs font-bold uppercase tracking-widest text-active block mb-1">
                {currentHeroImage.tag} • High Resolution Studio Capture
              </span>
              <h3 className="font-['Outfit'] text-xl font-bold">{currentHeroImage.label}</h3>
              <p className="text-xs text-white/70 mt-1">{currentHeroImage.desc}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ============================================================ */}
      {/* SECTION 1: Top Breadcrumb & Quick Action Navigation Bar      */}
      {/* ============================================================ */}
      <div className="border-b border-brand-500/20 bg-brand-500/[0.02]">
        <div className="w-11/12 mx-auto relative z-10 py-3.5 flex items-center justify-between gap-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: TRANSITION_EASE }}
            className="flex items-center gap-2 text-xs sm:text-sm text-[#535C91] dark:text-[#9290C3]"
          >
            <Link
              href="/all-classes"
              className="inline-flex items-center gap-1.5 font-bold text-foreground hover:text-active transition-colors cursor-pointer"
            >
              <FiArrowLeft className="w-4 h-4" />
              <span>All Classes</span>
            </Link>
            <span className="text-brand-500/30">/</span>
            <span className="truncate max-w-[150px] sm:max-w-xs">{data.category}</span>
            <span className="text-brand-500/30">/</span>
            <span className="text-foreground font-semibold truncate max-w-[200px] sm:max-w-sm">
              {data.className}
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: TRANSITION_EASE, delay: 0.1 }}
            className="flex items-center gap-2"
          >
            <button
              type="button"
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-searchbox-bg hover:bg-searchbox-hover border border-brand-500/20 hover:border-active/50 text-xs font-semibold text-foreground transition-all cursor-pointer shadow-2xs active:scale-95"
              title="Share class link"
            >
              <FiShare2 className="w-3.5 h-3.5" />
              <span>{copied ? "Copied Link!" : "Share"}</span>
            </button>

            <button
              type="button"
              onClick={handleFavoriteToggle}
              disabled={favLoading}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer shadow-2xs active:scale-95 ${
                isFavorite
                  ? "bg-rose-500/10 text-rose-500 border-rose-500/30"
                  : "bg-searchbox-bg hover:bg-searchbox-hover border-brand-500/20 text-foreground hover:border-active/50"
              }`}
            >
              {isFavorite ? (
                <FaHeartSolid className="w-3.5 h-3.5 text-rose-500" />
              ) : (
                <FaRegHeart className="w-3.5 h-3.5" />
              )}
              <span>{isFavorite ? "Bookmarked" : "Bookmark"}</span>
            </button>
          </motion.div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* SECTION 2: Hero Visual Gallery Stage                         */}
      {/* ============================================================ */}
      <section
        ref={heroRef}
        className="relative overflow-hidden pt-6 pb-8 sm:pb-12 bg-gradient-to-b from-brand-500/5 via-background to-background"
      >
        <div className="w-11/12 mx-auto relative z-10">
          {/* Main Hero Media Stage */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 24 }}
            animate={
              heroTriggered
                ? { opacity: 1, scale: 1, y: 0 }
                : { opacity: 0, scale: 0.97, y: 24 }
            }
            transition={{ duration: 0.85, ease: TRANSITION_EASE }}
            className="relative w-full h-[360px] sm:h-[480px] md:h-[540px] rounded-3xl overflow-hidden shadow-md border border-brand-500/20 group"
          >
            {/* Background Ambient Glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-active/20 to-purple-600/20 blur-2xl opacity-40 pointer-events-none -z-10" />

            <Image
              src={currentHeroImage.url}
              alt={currentHeroImage.label}
              fill
              unoptimized
              priority
              className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-104"
            />

            {/* Dark Scrim Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-black/25" />

            {/* Top Overlay Badges */}
            <div className="absolute top-6 inset-x-6 flex items-center justify-between z-10 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <motion.span
                  initial={{ opacity: 0, y: -16, x: -12 }}
                  animate={
                    heroTriggered
                      ? { opacity: 1, y: 0, x: 0 }
                      : { opacity: 0, y: -16, x: -12 }
                  }
                  transition={{ duration: 0.5, delay: 0.15 }}
                  className="px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider backdrop-blur-md bg-black/70 text-white border border-white/20 shadow-2xs"
                >
                  {data.category || "Fitness"}
                </motion.span>

                <motion.span
                  initial={{ opacity: 0, y: -18 }}
                  animate={
                    heroTriggered ? { opacity: 1, y: 0 } : { opacity: 0, y: -18 }
                  }
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md bg-active text-btn-text border border-white/20 shadow-2xs flex items-center gap-1.5"
                >
                  <FiZap className="w-3.5 h-3.5" />
                  <span>{data.difficultyLevel || data.level || "Intermediate"}</span>
                </motion.span>

                <motion.span
                  initial={{ opacity: 0, y: -18 }}
                  animate={
                    heroTriggered ? { opacity: 1, y: 0 } : { opacity: 0, y: -18 }
                  }
                  transition={{ duration: 0.5, delay: 0.25 }}
                  className="px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md bg-black/60 text-white/90 border border-white/15 hidden md:inline-flex items-center gap-1.5 shadow-2xs"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{currentHeroImage.tag}</span>
                </motion.span>
              </div>

              {/* Fullscreen Expand Action */}
              <motion.div
                initial={{ opacity: 0, x: 16, y: -16 }}
                animate={
                  heroTriggered
                    ? { opacity: 1, x: 0, y: 0 }
                    : { opacity: 0, x: 16, y: -16 }
                }
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex items-center gap-2"
              >
                <button
                  type="button"
                  onClick={() => setLightboxOpen(true)}
                  className="px-3.5 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md bg-black/60 hover:bg-active text-white border border-white/20 transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs active:scale-95"
                  title="Expand to Fullscreen View"
                >
                  <FiMaximize2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Inspect 4K View</span>
                </button>
              </motion.div>
            </div>

            {/* Bottom Title & Session Overview Overlay */}
            <div className="absolute bottom-6 sm:bottom-8 inset-x-6 sm:inset-x-8 z-10">
              <div className="max-w-4xl">
                <motion.h1
                  initial={{ opacity: 0, y: 28, filter: "blur(4px)" }}
                  animate={
                    heroTriggered
                      ? { opacity: 1, y: 0, filter: "blur(0px)" }
                      : { opacity: 0, y: 28, filter: "blur(4px)" }
                  }
                  transition={{ duration: 0.65, delay: 0.3, ease: TRANSITION_EASE }}
                  className="font-['Outfit'] text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.08] mb-3 drop-shadow-sm"
                >
                  {data.className}
                </motion.h1>

                {/* Subtitle / Image caption description */}
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={
                    heroTriggered ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }
                  }
                  transition={{ duration: 0.55, delay: 0.38, ease: TRANSITION_EASE }}
                  className="text-xs sm:text-sm text-white/80 line-clamp-1 max-w-2xl mb-4 font-['Inter']"
                >
                  {currentHeroImage.desc}
                </motion.p>

                {/* Coach & Meta Ribbon */}
                <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-white/90 text-xs sm:text-sm">
                  <motion.div
                    initial={{ opacity: 0, x: -16 }}
                    animate={
                      heroTriggered ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }
                    }
                    transition={{ duration: 0.5, delay: 0.44 }}
                    className="flex items-center gap-2"
                  >
                    <motion.div
                      initial={{ scale: 0.7, rotate: -10 }}
                      animate={
                        heroTriggered
                          ? { scale: 1, rotate: 0 }
                          : { scale: 0.7, rotate: -10 }
                      }
                      transition={{ type: "spring", stiffness: 220, delay: 0.46 }}
                      className="w-8 h-8 rounded-full overflow-hidden bg-active/20 border border-active/50 flex items-center justify-center font-bold text-active relative shadow-2xs"
                    >
                      {data.authorImage ? (
                        <Image
                          src={data.authorImage}
                          alt={coachName}
                          fill
                          unoptimized
                          className="object-cover"
                        />
                      ) : (
                        coachName.charAt(0)
                      )}
                    </motion.div>
                    <div>
                      <span className="font-bold text-white block leading-tight">{coachName}</span>
                      <span className="text-[10px] text-white/70">Master CSCS Coach</span>
                    </div>
                  </motion.div>

                  <div className="h-4 w-px bg-white/20 hidden sm:block" />

                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={
                      heroTriggered ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }
                    }
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3 py-1 rounded-xl border border-white/10 shadow-2xs"
                  >
                    <FaStar className="w-3.5 h-3.5 text-amber-400" />
                    <span className="font-bold text-white">{rating}</span>
                    <span className="text-white/60 text-xs">({reviewCount} reviews)</span>
                  </motion.div>

                  <div className="h-4 w-px bg-white/20 hidden sm:block" />

                  <motion.div
                    initial={{ opacity: 0, x: 12 }}
                    animate={
                      heroTriggered ? { opacity: 1, x: 0 } : { opacity: 0, x: 12 }
                    }
                    transition={{ duration: 0.5, delay: 0.54 }}
                    className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3 py-1 rounded-xl border border-white/10 shadow-2xs"
                  >
                    <FiClock className="w-3.5 h-3.5 text-active" />
                    <span className="font-semibold text-white">{data.duration || 60} Mins</span>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 16 }}
                    animate={
                      heroTriggered ? { opacity: 1, x: 0 } : { opacity: 0, x: 16 }
                    }
                    transition={{ duration: 0.5, delay: 0.58 }}
                    className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3 py-1 rounded-xl border border-white/10 shadow-2xs"
                  >
                    <FiMapPin className="w-3.5 h-3.5 text-active" />
                    <span className="font-semibold text-white">{studio}</span>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Interactive Multi-Angle Gallery Selector Deck */}
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {galleryImages.map((img, idx) => {
              const isSelected = selectedImageIdx === idx;
              return (
                <motion.button
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9, y: 16 }}
                  animate={
                    heroTriggered
                      ? { opacity: 1, scale: 1, y: 0 }
                      : { opacity: 0, scale: 0.9, y: 16 }
                  }
                  transition={{ duration: 0.5, delay: 0.35 + idx * 0.08 }}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedImageIdx(idx)}
                  className={`group/thumb relative h-20 sm:h-24 rounded-2xl overflow-hidden border transition-all duration-300 text-left cursor-pointer ${
                    isSelected
                      ? "border-active ring-2 ring-active/40 scale-[1.02] shadow-xs"
                      : "border-brand-500/20 opacity-75 hover:opacity-100 hover:border-active/40 shadow-2xs"
                  }`}
                >
                  <Image
                    src={img.url}
                    alt={img.label}
                    fill
                    unoptimized
                    className="object-cover group-hover/thumb:scale-108 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                  <div className="absolute bottom-2 inset-x-2.5 z-10">
                    <span className="text-[10px] font-black uppercase text-active block tracking-wider">
                      {img.tag}
                    </span>
                    <span className="font-['Outfit'] text-xs font-bold text-white line-clamp-1">
                      {img.label}
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 3: Main Content Workspace Layout                     */}
      {/* ============================================================ */}
      <main ref={contentRef} className="w-11/12 mx-auto relative z-10 pt-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column (Content, Tabs, Curriculum) */}
          <div className="lg:col-span-8 space-y-8">
            {/* Interactive Tab Navigation Rail */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={
                contentTriggered ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }
              }
              transition={{ duration: 0.55, ease: TRANSITION_EASE }}
              className="border-b border-brand-500/20 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none"
            >
              {[
                { id: "overview", label: "Overview & Stimulus" },
                { id: "telemetry", label: "Biometrics & Zones" },
                { id: "timeline", label: "Session Anatomy" },
                { id: "coach", label: "Master Coach" },
                { id: "amenities", label: "Recovery Perks" },
                { id: "faqs", label: "Athlete FAQs" },
                { id: "reviews", label: `Reviews (${rating}★)` },
              ].map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative px-4 py-3 font-['Inter'] text-sm font-bold whitespace-nowrap transition-colors cursor-pointer rounded-xl ${
                      isActive
                        ? "text-active"
                        : "text-[#535C91] dark:text-[#9290C3] hover:text-foreground"
                    }`}
                  >
                    <span>{tab.label}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeClassDetailsTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-active rounded-full"
                        transition={{ duration: 0.3, ease: TRANSITION_EASE }}
                      />
                    )}
                  </button>
                );
              })}
            </motion.div>

            {/* TAB PANELS WITH ANIMATEPRESENCE */}
            <AnimatePresence mode="wait">
              {/* TAB 1: OVERVIEW & OBJECTIVES */}
              {activeTab === "overview" && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.45, ease: TRANSITION_EASE }}
                  className="space-y-8"
                >
                  <div>
                    <motion.h2
                      initial={{ opacity: 0, y: 14, filter: "blur(3px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      transition={{ duration: 0.5 }}
                      className="font-['Outfit'] text-2xl font-black text-foreground mb-3"
                    >
                      Curriculum Overview
                    </motion.h2>
                    <motion.p
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.08 }}
                      className="font-['Inter'] text-base text-[#535C91] dark:text-[#9290C3] leading-relaxed font-normal"
                    >
                      {data.description ||
                        "Engineered for high-output athletes looking to optimize functional power, core integrity, and metabolic endurance through progressive overload and certified form guidance."}
                    </motion.p>
                  </div>

                  {/* 4 Core Physiological Adaptations */}
                  <div>
                    <h3 className="font-['Outfit'] text-xl font-bold text-foreground mb-4">
                      Target Physiological Stimulus
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="p-5 rounded-2xl bg-white dark:bg-[#070F2B] border border-brand-500/20 shadow-xs hover:border-active/40 transition-all"
                      >
                        <div className="w-9 h-9 rounded-xl bg-active/10 text-active flex items-center justify-center font-bold mb-3 shadow-2xs">
                          <FaDumbbell className="w-4 h-4" />
                        </div>
                        <h4 className="font-['Outfit'] font-bold text-base text-foreground mb-1">
                          Hypertrophy & Kinetic Power
                        </h4>
                        <p className="text-xs text-[#535C91] dark:text-[#9290C3] leading-relaxed">
                          Stimulate high-threshold motor units using multi-joint compound movement patterns and controlled tempo eccentrics.
                        </p>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.16 }}
                        className="p-5 rounded-2xl bg-white dark:bg-[#070F2B] border border-brand-500/20 shadow-xs hover:border-active/40 transition-all"
                      >
                        <div className="w-9 h-9 rounded-xl bg-cyan-500/10 text-cyan-500 flex items-center justify-center font-bold mb-3 shadow-2xs">
                          <FaFire className="w-4 h-4" />
                        </div>
                        <h4 className="font-['Outfit'] font-bold text-base text-foreground mb-1">
                          Anaerobic Threshold & VO2 Peak
                        </h4>
                        <p className="text-xs text-[#535C91] dark:text-[#9290C3] leading-relaxed">
                          Sustain power outputs near the lactate turn-point to expand cardiovascular engine volume and recovery speed.
                        </p>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.22 }}
                        className="p-5 rounded-2xl bg-white dark:bg-[#070F2B] border border-brand-500/20 shadow-xs hover:border-active/40 transition-all"
                      >
                        <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold mb-3 shadow-2xs">
                          <FiActivity className="w-4 h-4" />
                        </div>
                        <h4 className="font-['Outfit'] font-bold text-base text-foreground mb-1">
                          Neuromuscular Coordination
                        </h4>
                        <p className="text-xs text-[#535C91] dark:text-[#9290C3] leading-relaxed">
                          Improve bar velocity, rotational balance, and bilateral symmetry through real-time coach cueing and optical tracking.
                        </p>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.28 }}
                        className="p-5 rounded-2xl bg-white dark:bg-[#070F2B] border border-brand-500/20 shadow-xs hover:border-active/40 transition-all"
                      >
                        <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center font-bold mb-3 shadow-2xs">
                          <FiShield className="w-4 h-4" />
                        </div>
                        <h4 className="font-['Outfit'] font-bold text-base text-foreground mb-1">
                          Joint Resilience & Longevity
                        </h4>
                        <p className="text-xs text-[#535C91] dark:text-[#9290C3] leading-relaxed">
                          Loaded mobility protocols protecting spinal integrity, knee patellofemoral tracking, and shoulder capsules.
                        </p>
                      </motion.div>
                    </div>
                  </div>

                  {/* Athlete Requirements & Prerequisites */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.97, y: 16 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.55, delay: 0.32 }}
                    className="p-6 rounded-2xl bg-brand-500/5 dark:bg-[#1B1A55]/15 border border-brand-500/20 shadow-2xs"
                  >
                    <h4 className="font-['Outfit'] font-bold text-base text-foreground mb-3">
                      Athlete Preparation & Prerequisites
                    </h4>
                    <ul className="space-y-3 text-xs sm:text-sm text-[#535C91] dark:text-[#9290C3]">
                      <li className="flex items-start gap-2.5">
                        <FiCheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>Comfortable with baseline cardiovascular endurance and compound bodyweight squats and lunges.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <FiCheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>Arrive 10 minutes early for digital heart telemetry syncing and shoe verification.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <FiCheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>Coaches adapt regressions and progressions to match individual injury histories and experience levels.</span>
                      </li>
                    </ul>
                  </motion.div>
                </motion.div>
              )}

              {/* TAB 2: TELEMETRY & BIOMETRICS */}
              {activeTab === "telemetry" && (
                <motion.div
                  key="telemetry"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.45, ease: TRANSITION_EASE }}
                  className="space-y-8"
                >
                  <div>
                    <h2 className="font-['Outfit'] text-2xl font-black text-foreground mb-2">
                      Biometric Profile & Live Telemetry
                    </h2>
                    <p className="text-xs sm:text-sm text-[#535C91] dark:text-[#9290C3]">
                      Real-time metabolic readouts calibrated by our sports science coaching team.
                    </p>
                  </div>

                  {/* Intensity Meter & Gauge */}
                  <div className="p-6 rounded-3xl bg-white dark:bg-[#070F2B] border border-brand-500/20 shadow-xs space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-[#535C91] dark:text-[#9290C3]">
                          Metabolic Demand Index
                        </span>
                        <h3 className="font-['Outfit'] text-xl font-bold text-foreground mt-0.5">
                          {intensityInfo.label}
                        </h3>
                      </div>

                      {/* Visual 5-Bar Intensity Meter */}
                      <div className="flex items-center gap-1.5">
                        {[1, 2, 3, 4, 5].map((bar) => (
                          <div
                            key={bar}
                            className={`w-6 sm:w-7 h-3 rounded-md transition-all duration-500 ${
                              bar <= intensityInfo.bars
                                ? "bg-active shadow-2xs"
                                : "bg-brand-500/10 dark:bg-white/10"
                            }`}
                          />
                        ))}
                        <span className="text-xs font-bold text-active ml-2">
                          Level {intensityInfo.bars}/5
                        </span>
                      </div>
                    </div>

                    {/* 3 Telemetry Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                      <motion.div
                        initial={{ opacity: 0, x: -18 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.45 }}
                        className="p-4 rounded-2xl bg-brand-500/5 dark:bg-[#090814]/80 border border-brand-500/20 shadow-2xs"
                      >
                        <div className="flex items-center gap-2 text-active mb-1.5">
                          <FaHeartbeat className="w-4 h-4 animate-pulse" />
                          <span className="text-[11px] font-bold uppercase tracking-wider">
                            Target Heart Zone
                          </span>
                        </div>
                        <span className="font-['Outfit'] text-lg font-black text-foreground block">
                          {intensityInfo.hr}
                        </span>
                        <span className="text-[11px] text-[#535C91] dark:text-[#9290C3]">Live telemetry display</span>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45, delay: 0.08 }}
                        className="p-4 rounded-2xl bg-brand-500/5 dark:bg-[#090814]/80 border border-brand-500/20 shadow-2xs"
                      >
                        <div className="flex items-center gap-2 text-amber-500 mb-1.5">
                          <FaFire className="w-4 h-4" />
                          <span className="text-[11px] font-bold uppercase tracking-wider">
                            Est. Energy Burn
                          </span>
                        </div>
                        <span className="font-['Outfit'] text-lg font-black text-foreground block">
                          {intensityInfo.cals}
                        </span>
                        <span className="text-[11px] text-[#535C91] dark:text-[#9290C3]">Based on 75kg athlete</span>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, x: 18 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.45, delay: 0.16 }}
                        className="p-4 rounded-2xl bg-brand-500/5 dark:bg-[#090814]/80 border border-brand-500/20 shadow-2xs"
                      >
                        <div className="flex items-center gap-2 text-emerald-500 mb-1.5">
                          <FiUsers className="w-4 h-4" />
                          <span className="text-[11px] font-bold uppercase tracking-wider">
                            Supervision Ratio
                          </span>
                        </div>
                        <span className="font-['Outfit'] text-lg font-black text-foreground block">
                          1 : {totalSlots} Max
                        </span>
                        <span className="text-[11px] text-[#535C91] dark:text-[#9290C3]">Direct coach cueing</span>
                      </motion.div>
                    </div>
                  </div>

                  {/* Technical Equipment Provided */}
                  <div className="p-6 rounded-2xl bg-white dark:bg-[#070F2B] border border-brand-500/20 shadow-xs">
                    <h4 className="font-['Outfit'] font-bold text-base text-foreground mb-3">
                      Studio Equipment Provided & Verified
                    </h4>
                    <div className="flex flex-wrap gap-2.5">
                      {equipmentList.map((item, idx) => (
                        <motion.span
                          key={item}
                          initial={{ opacity: 0, scale: 0.85 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.4, delay: idx * 0.05 }}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-searchbox-bg border border-brand-500/20 text-xs font-semibold text-foreground shadow-2xs"
                        >
                          <FiCheck className="w-4 h-4 text-emerald-500" />
                          <span>{item}</span>
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* TAB 3: SESSION TIMELINE */}
              {activeTab === "timeline" && (
                <motion.div
                  key="timeline"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.45, ease: TRANSITION_EASE }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="font-['Outfit'] text-2xl font-black text-foreground mb-2">
                      How This {data.duration || 60}-Minute Protocol Unfolds
                    </h2>
                    <p className="text-xs sm:text-sm text-[#535C91] dark:text-[#9290C3]">
                      Minute-by-minute athletic progression to balance maximal stimulus with neuromuscular safety.
                    </p>
                  </div>

                  <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-2 sm:before:left-3 before:top-3 before:bottom-3 before:w-0.5 before:bg-active/30">
                    {[
                      {
                        step: 1,
                        time: "00:00 - 00:10 • Dynamic Primer",
                        title: "CNS Activation & Loaded Mobility",
                        desc: "Band-resisted hip mobilization, thoracic extension flossing, and progressive heart rate acceleration into Zone 2.",
                      },
                      {
                        step: 2,
                        time: "00:10 - 00:35 • Calibrated Core Engine",
                        title: "Primary Working Complexes & Overload",
                        desc: "Main athletic complexes targeting technical movement excellence, velocity tracking, and progressive resistance working sets.",
                      },
                      {
                        step: 3,
                        time: "00:35 - 00:45 • Metabolic Finisher",
                        title: "High-Cadence Anaerobic Output",
                        desc: "High-density team intervals utilizing sleds, aqua bags, or assault bikes pushing VO2 max output.",
                      },
                      {
                        step: 4,
                        time: "00:45 - 00:50 • Parasympathetic Shift",
                        title: "Box Breathing & Cold Plunge Transition",
                        desc: "Controlled box breathing, spinal decompression, and direct guidance to the Cold Plunge suite for immediate recovery.",
                        highlight: true,
                      },
                    ].map((phase, idx) => (
                      <motion.div
                        key={phase.step}
                        initial={{ opacity: 0, x: -24 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                        className="relative"
                      >
                        <div
                          className={`absolute -left-6 sm:-left-8 top-1 w-5 h-5 rounded-full text-white text-[10px] font-black flex items-center justify-center ring-4 ring-background shadow-2xs ${
                            phase.highlight ? "bg-emerald-500" : "bg-active"
                          }`}
                        >
                          {phase.step}
                        </div>
                        <div className="p-5 rounded-2xl bg-white dark:bg-[#070F2B] border border-brand-500/20 shadow-xs">
                          <span
                            className={`text-xs font-black uppercase tracking-wider block mb-1 ${
                              phase.highlight ? "text-emerald-500" : "text-active"
                            }`}
                          >
                            {phase.time}
                          </span>
                          <h4 className="font-['Outfit'] font-bold text-base text-foreground mb-1">
                            {phase.title}
                          </h4>
                          <p className="text-xs text-[#535C91] dark:text-[#9290C3] leading-relaxed">
                            {phase.desc}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* TAB 4: MASTER COACH */}
              {activeTab === "coach" && (
                <motion.div
                  key="coach"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.45, ease: TRANSITION_EASE }}
                  className="space-y-6"
                >
                  <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#070F2B] border border-brand-500/20 shadow-xs flex flex-col sm:flex-row items-center sm:items-start gap-6">
                    <motion.div
                      initial={{ scale: 0.8, rotate: -8 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 220 }}
                      className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden bg-active/20 border-2 border-active shrink-0 shadow-sm"
                    >
                      {data.authorImage ? (
                        <Image
                          src={data.authorImage}
                          alt={coachName}
                          fill
                          unoptimized
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center font-['Outfit'] text-3xl font-black text-active">
                          {coachName.charAt(0)}
                        </div>
                      )}
                    </motion.div>

                    <div className="text-center sm:text-left space-y-2 flex-1">
                      <div className="flex items-center justify-center sm:justify-start gap-2">
                        <h3 className="font-['Outfit'] text-2xl font-black text-foreground">
                          {coachName}
                        </h3>
                        <FiCheckCircle className="w-5 h-5 text-active" title="Certified CSCS Coach" />
                      </div>

                      <p className="text-xs font-bold uppercase tracking-wider text-active">
                        Senior Strength & Conditioning Specialist (CSCS)
                      </p>

                      <p className="text-xs sm:text-sm text-[#535C91] dark:text-[#9290C3] leading-relaxed pt-1 font-['Inter']">
                        Over 8+ years coaching collegiate athletes and competitive fitness athletes. Specializes in biomechanical bar path efficiency, kinetic chain power transfer, and injury mitigation.
                      </p>

                      <div className="pt-3 flex flex-wrap items-center justify-center sm:justify-start gap-2">
                        {["USAW Level 2", "FMS Certified", "Precision Nutrition L1"].map((cert, i) => (
                          <motion.span
                            key={cert}
                            initial={{ opacity: 0, scale: 0.85 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.15 + i * 0.06 }}
                            className="text-[11px] font-semibold px-2.5 py-1 rounded-md bg-brand-500/5 dark:bg-white/10 text-foreground border border-brand-500/15 shadow-2xs"
                          >
                            {cert}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* TAB 5: INCLUDED AMENITIES */}
              {activeTab === "amenities" && (
                <motion.div
                  key="amenities"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.45, ease: TRANSITION_EASE }}
                  className="space-y-6"
                >
                  <h2 className="font-['Outfit'] text-2xl font-black text-foreground">
                    Complimentary Recovery Suite Privileges
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      {
                        emoji: "❄️",
                        title: "Contrast Cold Plunge (48°F)",
                        desc: "Medical-grade chilled tubs immediately post-workout to attenuate inflammation and trigger norepinephrine release.",
                        bg: "bg-cyan-500/10",
                      },
                      {
                        emoji: "🧖",
                        title: "Finnish Cedar Sauna (195°F)",
                        desc: "Elevate heat-shock proteins and flush metabolic byproducts in our authentic Finnish cedar sauna chambers.",
                        bg: "bg-amber-500/10",
                      },
                      {
                        emoji: "🥤",
                        title: "Hydration & Electrolyte Tap",
                        desc: "Unlimited chilled Himalayan mineral water, BCAA infusions, and filtered alkaline hydration dispensers.",
                        bg: "bg-active/10",
                      },
                      {
                        emoji: "🚿",
                        title: "Luxury Locker Suites & Dyson Amenities",
                        desc: "Rainfall showers, keyless RFID locks, organic Malin+Goetz grooming essentials, and plush towels.",
                        bg: "bg-purple-500/10",
                      },
                    ].map((amenity, idx) => (
                      <motion.div
                        key={amenity.title}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45, delay: idx * 0.08 }}
                        className="p-5 rounded-2xl bg-white dark:bg-[#070F2B] border border-brand-500/20 shadow-xs flex items-start gap-4"
                      >
                        <span className={`text-2xl p-2.5 rounded-xl ${amenity.bg} shrink-0 shadow-2xs`}>
                          {amenity.emoji}
                        </span>
                        <div>
                          <h4 className="font-['Outfit'] font-bold text-sm text-foreground mb-1">
                            {amenity.title}
                          </h4>
                          <p className="text-xs text-[#535C91] dark:text-[#9290C3] leading-relaxed">
                            {amenity.desc}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* TAB 6: FAQS */}
              {activeTab === "faqs" && (
                <motion.div
                  key="faqs"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.45, ease: TRANSITION_EASE }}
                  className="space-y-4"
                >
                  <h2 className="font-['Outfit'] text-2xl font-black text-foreground mb-4">
                    Frequently Asked Questions
                  </h2>

                  {FAQS.map((faq, idx) => {
                    const isOpen = openFaq === idx;
                    return (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: idx * 0.06 }}
                        className="rounded-2xl border border-brand-500/20 bg-white dark:bg-[#070F2B] overflow-hidden transition-all shadow-2xs"
                      >
                        <button
                          type="button"
                          onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                          className="w-full p-5 text-left flex items-center justify-between gap-4 font-['Outfit'] font-bold text-base text-foreground cursor-pointer hover:text-active transition-colors"
                        >
                          <span>{faq.q}</span>
                          <motion.div
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            transition={{ duration: 0.25 }}
                            className="shrink-0"
                          >
                            <FiChevronDown className="w-5 h-5 text-active" />
                          </motion.div>
                        </button>

                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3, ease: TRANSITION_EASE }}
                              className="px-5 pb-5 text-xs sm:text-sm text-[#535C91] dark:text-[#9290C3] leading-relaxed border-t border-brand-500/10 pt-3"
                            >
                              {faq.a}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}
                </motion.div>
              )}

              {/* TAB 7: REVIEWS */}
              {activeTab === "reviews" && (
                <motion.div
                  key="reviews"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.45, ease: TRANSITION_EASE }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between">
                    <h2 className="font-['Outfit'] text-2xl font-black text-foreground">
                      Athlete Feedback ({reviewCount})
                    </h2>
                    <div className="flex items-center gap-1.5 font-bold text-foreground">
                      <FaStar className="w-4 h-4 text-amber-400" />
                      <span>{rating} / 5.0 Overall</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {[
                      {
                        name: "Tariqul Islam",
                        badge: "Club Member • 8 Months",
                        rating: 5,
                        date: "3 days ago",
                        comment:
                          "The pacing of this class is insane. The coach watched my deadlift bar path and corrected my hip hinge immediately. Hit a PR on the turf sleds afterwards!",
                      },
                      {
                        name: "Elena Rostova",
                        badge: "VIP Athlete",
                        rating: 5,
                        date: "1 week ago",
                        comment:
                          "Best high-intensity class in Dhaka. The telemetry screens kept me from slacking during the 3rd interval. Cold plunge access afterwards makes it a 10/10.",
                      },
                      {
                        name: "Zubair Ahmed",
                        badge: "Member",
                        rating: 5,
                        date: "2 weeks ago",
                        comment:
                          "Structured, disciplined, and genuinely friendly community. You leave drenched in sweat with zero wasted minutes.",
                      },
                    ].map((rev, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -18 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.45, delay: i * 0.08 }}
                        className="p-5 rounded-2xl bg-white dark:bg-[#070F2B] border border-brand-500/20 shadow-xs"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <span className="font-bold text-foreground text-sm block">
                              {rev.name}
                            </span>
                            <span className="text-[11px] text-active font-semibold">
                              {rev.badge}
                            </span>
                          </div>
                          <span className="text-xs text-[#535C91] dark:text-[#9290C3]">{rev.date}</span>
                        </div>
                        <div className="flex items-center gap-1 text-amber-400 mb-2">
                          {Array.from({ length: rev.rating }).map((_, idx) => (
                            <FaStar key={idx} className="w-3 h-3 fill-current" />
                          ))}
                        </div>
                        <p className="text-xs sm:text-sm text-[#535C91] dark:text-[#9290C3] leading-relaxed">
                          &quot;{rev.comment}&quot;
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ============================================================ */}
          {/* SECTION 4: Right Column (Sticky Booking Console)             */}
          {/* ============================================================ */}
          <div ref={bookingRef} className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, x: 32, y: 16 }}
              animate={
                bookingTriggered
                  ? { opacity: 1, x: 0, y: 0 }
                  : { opacity: 0, x: 32, y: 16 }
              }
              transition={{ duration: 0.85, ease: TRANSITION_EASE }}
              className="sticky top-28 rounded-3xl bg-white dark:bg-[#070F2B] backdrop-blur-xl border border-brand-500/20 shadow-md p-6 sm:p-7 space-y-6"
            >
              {/* Price Banner */}
              <motion.div
                initial={{ opacity: 0, scale: 0.94 }}
                animate={
                  bookingTriggered
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.94 }
                }
                transition={{ duration: 0.5, delay: 0.15 }}
                className="p-4 rounded-2xl bg-brand-500/5 dark:bg-[#1B1A55]/20 border border-brand-500/15 text-center relative overflow-hidden shadow-2xs"
              >
                <div className="flex items-baseline justify-center gap-1">
                  <span className="font-['Outfit'] text-4xl font-black text-foreground">
                    ${data.price || 35}
                  </span>
                  <span className="text-xs font-semibold text-[#535C91] dark:text-[#9290C3]">
                    / month
                  </span>
                </div>
                <span className="text-[11px] font-bold text-emerald-500 uppercase tracking-wider block mt-1">
                  ✓ Monthly Membership • Unlimited Access
                </span>
              </motion.div>

              {/* Live Seat Availability */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={
                  bookingTriggered ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }
                }
                transition={{ duration: 0.5, delay: 0.22 }}
              >
                <div className="flex items-center justify-between text-xs font-bold mb-2">
                  <span className="text-[#535C91] dark:text-[#9290C3] flex items-center gap-1.5">
                    <FiUsers className="w-3.5 h-3.5 text-active" />
                    <span>Seat Capacity</span>
                  </span>
                  <span className="text-foreground">
                    {bookedCount} / {totalSlots} Claimed
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full h-2 rounded-full bg-brand-500/10 dark:bg-white/10 overflow-hidden">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={
                      bookingTriggered
                        ? { scaleX: percentFilled / 100 }
                        : { scaleX: 0 }
                    }
                    transition={{ duration: 1.1, ease: TRANSITION_EASE, delay: 0.28 }}
                    style={{ originX: 0 }}
                    className={`h-full rounded-full transition-all duration-500 ${
                      availableSlots <= 3 ? "bg-rose-500" : "bg-emerald-500"
                    }`}
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] font-bold text-[#535C91] dark:text-[#9290C3] mt-2">
                  <span
                    className={
                      availableSlots <= 3
                        ? "text-rose-500 font-extrabold"
                        : "text-emerald-500"
                    }
                  >
                    {availableSlots > 0
                      ? `⚡ ${availableSlots} seats available`
                      : "Class Waitlist Only"}
                  </span>
                  <span>{percentFilled}% full</span>
                </div>
              </motion.div>

              {/* Schedule Parameters Card */}
              <div className="space-y-3.5 pt-2 border-t border-brand-500/15 text-xs">
                <motion.div
                  initial={{ opacity: 0, x: -14 }}
                  animate={
                    bookingTriggered ? { opacity: 1, x: 0 } : { opacity: 0, x: -14 }
                  }
                  transition={{ duration: 0.45, delay: 0.3 }}
                  className="flex items-start gap-3"
                >
                  <FiCalendar className="w-4 h-4 text-active shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-foreground block">Session Days</span>
                    <span className="text-[#535C91] dark:text-[#9290C3] font-medium">
                      {data.classSchedule || "Mon, Wed, Fri"}
                    </span>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -14 }}
                  animate={
                    bookingTriggered ? { opacity: 1, x: 0 } : { opacity: 0, x: -14 }
                  }
                  transition={{ duration: 0.45, delay: 0.36 }}
                  className="flex items-start gap-3"
                >
                  <FiClock className="w-4 h-4 text-active shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-foreground block">Commencement & Duration</span>
                    <span className="text-[#535C91] dark:text-[#9290C3] font-medium">
                      {data.time || "08:00 AM"} • {data.duration || 60} Minutes
                    </span>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -14 }}
                  animate={
                    bookingTriggered ? { opacity: 1, x: 0 } : { opacity: 0, x: -14 }
                  }
                  transition={{ duration: 0.45, delay: 0.42 }}
                  className="flex items-start gap-3"
                >
                  <FiMapPin className="w-4 h-4 text-active shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-foreground block">Studio Venue</span>
                    <span className="text-[#535C91] dark:text-[#9290C3] font-medium">
                      {studio}, FlexPulse HQ
                    </span>
                  </div>
                </motion.div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 space-y-3">
                {!user ? (
                  <Link
                    href={`/signin?redirect=/all-classes/${data._id}`}
                    className="w-full inline-flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-btn-bg text-btn-text font-['Outfit'] font-black text-sm uppercase tracking-wider transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer hover:-translate-y-0.5 active:scale-95 border border-white/20 relative overflow-hidden group"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <span>Sign In to Book Class</span>
                      <FiArrowRight className="w-4 h-4" />
                    </span>
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
                  </Link>
                ) : user.status === "banned" ? (
                  <button
                    disabled
                    className="w-full py-4 px-6 rounded-2xl bg-rose-500/20 text-rose-500 font-['Outfit'] font-black text-sm uppercase tracking-wider cursor-not-allowed border border-rose-500/30"
                  >
                    Action Restricted by Admin
                  </button>
                ) : initialIsBooked ? (
                  <div className="w-full py-4 px-6 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-500 text-center font-['Outfit'] font-black text-sm flex items-center justify-center gap-2 shadow-2xs">
                    <FiCheckCircle className="w-4 h-4" />
                    <span>You Are Registered!</span>
                  </div>
                ) : availableSlots === 0 ? (
                  <button
                    disabled
                    className="w-full py-4 px-6 rounded-2xl bg-brand-500/10 text-[#535C91] dark:text-[#9290C3] font-['Outfit'] font-black text-sm uppercase tracking-wider cursor-not-allowed border border-brand-500/15"
                  >
                    Class Fully Booked (Waitlist)
                  </button>
                ) : (
                  <motion.button
                    type="button"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => {
                      setIsProcessingStripe(false);
                      setIsReceiptModalOpen(true);
                    }}
                    className="w-full py-4 px-6 rounded-2xl bg-btn-bg text-btn-text font-['Outfit'] font-black text-sm uppercase tracking-wider transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer flex items-center justify-center gap-2 border border-white/20 relative overflow-hidden group"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <span>Confirm Registration</span>
                      <FiArrowRight className="w-4 h-4" />
                    </span>
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
                  </motion.button>
                )}

                {/* Bookmark Button (Type 2 Secondary Glass CTA) */}
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={bookingTriggered ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{ duration: 0.45, delay: 0.5 }}
                  type="button"
                  onClick={handleFavoriteToggle}
                  disabled={favLoading}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full py-3 px-4 rounded-xl border text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-95 ${
                    isFavorite
                      ? "bg-rose-500/10 text-rose-500 border-rose-500/30"
                      : "bg-searchbox-bg hover:bg-searchbox-hover text-foreground border-brand-500/20 hover:border-active/50"
                  }`}
                >
                  {favLoading ? (
                    <span>Updating...</span>
                  ) : isFavorite ? (
                    <>
                      <FaHeartSolid className="w-3.5 h-3.5 text-rose-500" />
                      <span>Remove from Saved</span>
                    </>
                  ) : (
                    <>
                      <FaRegHeart className="w-3.5 h-3.5" />
                      <span>Save for Later</span>
                    </>
                  )}
                </motion.button>
              </div>

              {/* Guarantees */}
              <div className="pt-4 border-t border-brand-500/15 space-y-2 text-[11px] text-[#535C91] dark:text-[#9290C3]">
                {[
                  "Free cancellation up to 12 hours prior",
                  "Digital RFID turnstile entry on mobile",
                  "Sauna & Cold Plunge pass included",
                ].map((item, gIdx) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -12 }}
                    animate={bookingTriggered ? { opacity: 1, x: 0 } : { opacity: 0, x: -12 }}
                    transition={{ duration: 0.4, delay: 0.54 + gIdx * 0.06 }}
                    className="flex items-center gap-2"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={bookingTriggered ? { scale: 1 } : { scale: 0 }}
                      transition={{ type: "spring", stiffness: 220, delay: 0.56 + gIdx * 0.06 }}
                    >
                      <FiCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    </motion.div>
                    <span>{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      {/* ============================================================ */}
      {/* SECTION 5: Decorated Pre-Checkout Payment Receipt Modal      */}
      {/* ============================================================ */}
      <AnimatePresence>
        {isReceiptModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => {
              if (e.target === e.currentTarget && !isProcessingStripe) {
                setIsReceiptModalOpen(false);
                setIsProcessingStripe(false);
              }
            }}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 md:p-6 cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.9, y: 24 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 24 }}
              transition={{ duration: 0.4, ease: TRANSITION_EASE }}
              onClick={(e) => e.stopPropagation()}
              className="cursor-default relative w-full max-w-xl max-h-[92vh] flex flex-col rounded-3xl bg-white dark:bg-[#070F2B] border border-brand-500/20 shadow-md overflow-hidden my-auto"
            >
              {/* 1. FIXED MODAL HEADER */}
              <div className="p-4 sm:p-5 border-b border-brand-500/15 flex items-center justify-between shrink-0 bg-brand-500/5 dark:bg-[#090814]/50">
                <div className="flex items-center gap-3">
                  <motion.div
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
                    className="w-10 h-10 rounded-2xl bg-active/10 text-active flex items-center justify-center font-bold text-lg shrink-0 border border-active/20 shadow-2xs"
                  >
                    <FiShield className="w-5 h-5" />
                  </motion.div>
                  <div>
                    <motion.span
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.12 }}
                      className="text-[10px] font-black uppercase tracking-widest text-active block"
                    >
                      Official Registration Invoice &amp; Receipt
                    </motion.span>
                    <motion.h3
                      initial={{ opacity: 0, y: 14, filter: "blur(3px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      transition={{ duration: 0.5, delay: 0.16 }}
                      className="font-['Outfit'] text-lg sm:text-xl font-black text-foreground"
                    >
                      Review Payment Receipt
                    </motion.h3>
                  </div>
                </div>

                {/* Close Button */}
                <motion.button
                  initial={{ opacity: 0, scale: 0.7, rotate: 90 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ duration: 0.4, delay: 0.18 }}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  type="button"
                  onClick={() => {
                    setIsReceiptModalOpen(false);
                    setIsProcessingStripe(false);
                  }}
                  disabled={isProcessingStripe}
                  className="w-8 h-8 rounded-full bg-brand-500/10 hover:bg-active hover:text-white flex items-center justify-center text-foreground transition-colors cursor-pointer disabled:opacity-40 shadow-2xs"
                  title="Close receipt preview"
                >
                  <FiX className="w-4 h-4" />
                </motion.button>
              </div>

              {/* 2. SCROLLABLE RECEIPT BODY */}
              <div className="p-4 sm:p-5 overflow-y-auto space-y-4 flex-1 overscroll-contain">
                {/* Declared Payment Gateway: Stripe */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 14 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2, ease: TRANSITION_EASE }}
                  className="p-4 rounded-2xl bg-[#635BFF]/5 dark:bg-[#635BFF]/10 border border-[#635BFF]/20 space-y-3 shadow-2xs"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <motion.div
                        initial={{ scale: 0.6 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 240, damping: 20, delay: 0.24 }}
                        className="w-9 h-9 rounded-xl bg-[#635BFF] text-white flex items-center justify-center font-bold text-lg shadow-2xs"
                      >
                        <SiStripe className="w-5 h-5" />
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, x: -14 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.45, delay: 0.26 }}
                      >
                        <span className="font-['Outfit'] font-black text-sm text-foreground block">
                          Stripe™ Certified Payment Gateway
                        </span>
                        <span className="text-[11px] text-[#535C91] dark:text-[#9290C3]">
                          256-Bit Encrypted Secure Checkout
                        </span>
                      </motion.div>
                    </div>

                    <motion.span
                      initial={{ opacity: 0, scale: 0.8, y: -8 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ type: "spring", stiffness: 220, delay: 0.28 }}
                      className="px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-500 text-[10px] font-bold uppercase tracking-wider border border-emerald-500/20 shadow-2xs"
                    >
                      PCI-DSS Level 1
                    </motion.span>
                  </div>

                  {/* Supported Payment Methods Grid */}
                  <div className="pt-2.5 border-t border-[#635BFF]/15 space-y-1.5">
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 }}
                      className="text-[10px] font-bold uppercase tracking-wider text-[#535C91] dark:text-[#9290C3] block"
                    >
                      Supported Payment Networks &amp; Wallets:
                    </motion.span>
                    <div className="flex items-center gap-2 flex-wrap">
                      {[
                        { name: "Visa", icon: FaCcVisa, color: "text-[#1A1F71] dark:text-white" },
                        { name: "Mastercard", icon: FaCcMastercard, color: "text-[#EB001B] dark:text-white" },
                        { name: "Apple Pay", icon: FaApplePay, color: "text-foreground" },
                        { name: "Amex", icon: FaCcAmex, color: "text-[#006FCF] dark:text-white" },
                        { name: "Google Pay", icon: FaGooglePay, color: "text-amber-500" },
                        { name: "Discover", icon: FaCcDiscover, color: "text-[#FF6600]" },
                      ].map((card, cIdx) => {
                        const Icon = card.icon;
                        return (
                          <motion.span
                            key={card.name}
                            initial={{ opacity: 0, scale: 0.8, y: 6 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ duration: 0.35, delay: 0.32 + cIdx * 0.04 }}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-searchbox-bg border border-brand-500/20 text-xs font-semibold text-foreground shadow-2xs"
                          >
                            <Icon className={`w-3.5 h-3.5 ${card.color}`} /> {card.name}
                          </motion.span>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>

                {/* Athlete & Class Details Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <motion.div
                    initial={{ opacity: 0, x: -20, y: 8 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.38, ease: TRANSITION_EASE }}
                    className="p-3.5 rounded-xl bg-brand-500/5 dark:bg-[#090814]/50 border border-brand-500/15 space-y-1 shadow-2xs"
                  >
                    <motion.span
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: 0.4 }}
                      className="text-[10px] font-bold uppercase text-[#535C91] dark:text-[#9290C3] block"
                    >
                      Registered Athlete
                    </motion.span>
                    <motion.p
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.42 }}
                      className="font-bold text-foreground text-sm truncate"
                    >
                      {userName || user?.name || "Athlete"}
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.44 }}
                      className="text-[#535C91] dark:text-[#9290C3] truncate"
                    >
                      {userEmail || user?.email}
                    </motion.p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20, y: 8 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.42, ease: TRANSITION_EASE }}
                    className="p-3.5 rounded-xl bg-brand-500/5 dark:bg-[#090814]/50 border border-brand-500/15 space-y-1 shadow-2xs"
                  >
                    <motion.span
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: 0.44 }}
                      className="text-[10px] font-bold uppercase text-[#535C91] dark:text-[#9290C3] block"
                    >
                      Scheduled Session
                    </motion.span>
                    <motion.p
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.46 }}
                      className="font-bold text-foreground text-sm truncate"
                    >
                      {data.className}
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.48 }}
                      className="text-[#535C91] dark:text-[#9290C3]"
                    >
                      {data.classSchedule || "Mon, Wed, Fri"} • {data.time || "08:00 AM"}
                    </motion.p>
                  </motion.div>
                </div>

                {/* Interactive Auto-Renewal Preference Selector */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.96, y: 16 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.46, ease: TRANSITION_EASE }}
                  className="p-4 rounded-2xl bg-brand-500/5 dark:bg-[#090814]/50 border border-brand-500/15 space-y-2.5 shadow-2xs"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <motion.div
                        initial={{ scale: 0.7, rotate: -30 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 220, delay: 0.5 }}
                        className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-base shrink-0 transition-all ${
                          autoRenew
                            ? "bg-emerald-500/15 text-emerald-500 border border-emerald-500/30"
                            : "bg-brand-500/10 text-muted-foreground border border-brand-500/20"
                        }`}
                      >
                        <FiRepeat className={`w-4 h-4 ${autoRenew ? "animate-spin duration-3000" : ""}`} />
                      </motion.div>
                      <div>
                        <div className="flex items-center gap-2">
                          <motion.span
                            initial={{ opacity: 0, x: -12 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: 0.52 }}
                            className="font-['Outfit'] font-black text-sm text-foreground"
                          >
                            Monthly Auto-Renewal
                          </motion.span>
                          <motion.span
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ type: "spring", stiffness: 200, delay: 0.54 }}
                            className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full ${
                              autoRenew
                                ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                                : "bg-brand-500/10 text-muted-foreground"
                            }`}
                          >
                            {autoRenew ? "Enabled" : "Disabled"}
                          </motion.span>
                        </div>
                        <motion.span
                          initial={{ opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: 0.56 }}
                          className="text-[11px] text-[#535C91] dark:text-[#9290C3] block"
                        >
                          {autoRenew
                            ? "Renews every 30 days automatically. Cancel anytime with zero fees."
                            : "One-time 30-day class pass. Will NOT renew automatically."}
                        </motion.span>
                      </div>
                    </div>

                    {/* Toggle Switch */}
                    <motion.button
                      initial={{ scale: 0.85, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 220, delay: 0.58 }}
                      whileTap={{ scale: 0.92 }}
                      type="button"
                      onClick={() => setAutoRenew(!autoRenew)}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        autoRenew ? "bg-active" : "bg-brand-500/20"
                      }`}
                      role="switch"
                      aria-checked={autoRenew}
                      title="Toggle auto-renewal preference"
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-2xs ring-0 transition duration-200 ease-in-out ${
                          autoRenew ? "translate-x-5" : "translate-x-0"
                        }`}
                      />
                    </motion.button>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.6 }}
                    className="flex items-center justify-between text-[10px] pt-2 border-t border-brand-500/10 text-[#535C91] dark:text-[#9290C3]"
                  >
                    <span>Billing Mode: {autoRenew ? "Recurring Monthly Subscription" : "Single 30-Day Pass"}</span>
                    <span className={autoRenew ? "text-emerald-500 font-semibold" : "text-amber-500 font-semibold"}>
                      {autoRenew ? "✓ Cancel anytime with 1 click" : "✓ No renewal obligation"}
                    </span>
                  </motion.div>
                </motion.div>

                {/* Itemized Billing Ledger */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.54, ease: TRANSITION_EASE }}
                  className="rounded-2xl border border-brand-500/20 overflow-hidden text-xs shadow-2xs"
                >
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.56 }}
                    className="bg-brand-500/5 dark:bg-[#090814]/50 px-4 py-2 font-bold uppercase text-[10px] text-[#535C91] dark:text-[#9290C3] border-b border-brand-500/15 flex justify-between"
                  >
                    <span>Description</span>
                    <span>Amount</span>
                  </motion.div>
                  <div className="p-3.5 space-y-2 divide-y divide-brand-500/10">
                    {[
                      {
                        title: `${data.className} (Monthly Membership Pass)`,
                        sub: `Led by ${coachName} • Unlimited monthly sessions`,
                        amt: `$${data.price || 35}.00 / mo`,
                        highlight: false,
                        mono: true,
                      },
                      {
                        title: "Sauna & Cold Plunge Pass",
                        sub: "Post-workout hydrotherapy",
                        amt: "Included ($0.00)",
                        highlight: true,
                        mono: false,
                      },
                      {
                        title: "Sanitized Towel & Digital Locker",
                        sub: "Full facility amenity access",
                        amt: "Included ($0.00)",
                        highlight: true,
                        mono: false,
                      },
                      {
                        title: "Stripe Processing & Turnstile Gate",
                        sub: "Instant turnstile confirmation",
                        amt: "FREE ($0.00)",
                        highlight: true,
                        mono: false,
                      },
                    ].map((item, rowIdx) => (
                      <motion.div
                        key={item.title}
                        initial={{ opacity: 0, x: -14 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.58 + rowIdx * 0.05 }}
                        className="flex justify-between pt-1.5"
                      >
                        <div>
                          <strong className="text-foreground block font-['Outfit'] font-bold">
                            {item.title}
                          </strong>
                          <span className="text-[11px] text-[#535C91] dark:text-[#9290C3]">
                            {item.sub}
                          </span>
                        </div>
                        <span
                          className={`font-mono ${
                            item.highlight
                              ? "text-emerald-500 font-semibold"
                              : "font-bold text-foreground"
                          }`}
                        >
                          {item.amt}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Total Row */}
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.45, delay: 0.78 }}
                    className="bg-brand-500/5 dark:bg-[#090814]/70 p-3.5 border-t border-brand-500/15 flex items-center justify-between"
                  >
                    <div>
                      <span className="font-['Outfit'] font-bold text-sm text-foreground block">
                        {autoRenew ? "Total Amount Due (Month 1)" : "Total Amount Due (Single Pass)"}
                      </span>
                      <span className="text-[11px] text-[#535C91] dark:text-[#9290C3]">
                        {autoRenew
                          ? "Billed monthly • Automatic Stripe renewal, cancel anytime"
                          : "One-time payment • Valid for 30 days, no auto-renewal"}
                      </span>
                    </div>
                    <span className="font-['Outfit'] text-2xl font-black text-active font-mono">
                      ${data.price || 35}.00 USD {autoRenew ? <span className="text-sm font-normal text-[#535C91] dark:text-[#9290C3]">/ mo</span> : <span className="text-xs font-normal text-[#535C91] dark:text-[#9290C3]">(once)</span>}
                    </span>
                  </motion.div>
                </motion.div>
              </div>

              {/* 3. FIXED MODAL ACTION FOOTER */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.62 }}
                className="p-4 sm:p-5 border-t border-brand-500/15 bg-brand-500/5 dark:bg-[#090814] shrink-0 space-y-2.5"
              >
                <div className="flex flex-col-reverse sm:flex-row items-center gap-3">
                  {/* Back Button */}
                  <motion.button
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.45, delay: 0.66 }}
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.96 }}
                    type="button"
                    onClick={() => {
                      setIsReceiptModalOpen(false);
                      setIsProcessingStripe(false);
                    }}
                    disabled={isProcessingStripe}
                    className="w-full sm:w-auto h-[50px] px-6 rounded-2xl border border-brand-500/20 bg-searchbox-bg hover:bg-searchbox-hover text-foreground font-['Outfit'] font-bold text-sm transition-all duration-200 cursor-pointer shrink-0 flex items-center justify-center gap-2 shadow-xs hover:border-active/40 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FiArrowLeft className="w-4 h-4 text-[#535C91] dark:text-[#9290C3]" />
                    <span>Back</span>
                  </motion.button>

                  {/* Primary Stripe Checkout Button */}
                  <motion.button
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 220, delay: 0.7 }}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.96 }}
                    type="button"
                    onClick={handleContinueToStripe}
                    disabled={isProcessingStripe}
                    className="w-full sm:flex-1 h-[50px] px-6 rounded-2xl bg-btn-bg text-btn-text font-['Outfit'] font-black text-sm uppercase tracking-wider transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer flex items-center justify-center gap-2.5 hover:-translate-y-0.5 active:scale-95 disabled:opacity-85 disabled:cursor-wait border border-white/20 relative overflow-hidden group"
                  >
                    <span className="relative z-10 flex items-center gap-2.5">
                      {isProcessingStripe ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                          <span>Connecting to Stripe...</span>
                        </>
                      ) : (
                        <>
                          <SiStripe className="w-4 h-4 text-white" />
                          <span>Continue to Stripe</span>
                          <FiArrowRight className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform" />
                        </>
                      )}
                    </span>
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
                  </motion.button>
                </div>

                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.74 }}
                  className="text-[10px] text-center text-[#535C91] dark:text-[#9290C3] pt-0.5 flex items-center justify-center gap-1.5"
                >
                  <span>🔒 Protected by Stripe 256-bit encryption</span>
                  <span>•</span>
                  <span>Monthly recurring pass • Cancel anytime</span>
                </motion.p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
