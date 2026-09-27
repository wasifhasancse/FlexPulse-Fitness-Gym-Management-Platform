"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "@heroui/react";
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

  // Determine category key for curated photo preset
  const catKey = Object.keys(GALLERY_PRESETS).find(
    (k) => (data.category || "").toLowerCase().includes(k.toLowerCase())
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
    data.authorName || (data.author && data.author !== "trainer" ? data.author : "Coach Marcus Vance");

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
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-4 sm:p-8 animate-fadeIn">
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-active text-white flex items-center justify-center transition-all cursor-pointer z-50"
            title="Close viewer"
          >
            <FiX className="w-6 h-6" />
          </button>

          <div className="relative w-full max-w-5xl h-[70vh] rounded-3xl overflow-hidden border border-white/15 shadow-2xl">
            <Image
              src={currentHeroImage.url}
              alt={currentHeroImage.label}
              fill
              unoptimized
              className="object-contain"
            />
          </div>

          <div className="mt-6 text-center max-w-xl text-white">
            <span className="text-xs font-bold uppercase tracking-widest text-active block mb-1">
              {currentHeroImage.tag} • High Resolution Studio Capture
            </span>
            <h3 className="font-['Outfit'] text-xl font-bold">{currentHeroImage.label}</h3>
            <p className="text-xs text-white/70 mt-1">{currentHeroImage.desc}</p>
          </div>
        </div>
      )}

      {/* Top Breadcrumb & Quick Action Navigation */}
      <div className="border-b border-slate-200/80 dark:border-white/[0.08] bg-slate-50/50 dark:bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            <Link
              href="/all-classes"
              className="inline-flex items-center gap-1.5 font-bold text-foreground hover:text-active transition-colors cursor-pointer"
            >
              <FiArrowLeft className="w-4 h-4" />
              <span>All Classes</span>
            </Link>
            <span className="text-slate-300 dark:text-slate-600">/</span>
            <span className="text-slate-400 truncate max-w-[150px] sm:max-w-xs">{data.category}</span>
            <span className="text-slate-300 dark:text-slate-600">/</span>
            <span className="text-foreground font-semibold truncate max-w-[200px] sm:max-w-sm">
              {data.className}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-white/[0.05] border border-slate-200 dark:border-white/10 hover:border-active/40 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-foreground transition-all cursor-pointer shadow-xs"
              title="Share class link"
            >
              <FiShare2 className="w-3.5 h-3.5" />
              <span>{copied ? "Copied Link!" : "Share"}</span>
            </button>

            <button
              type="button"
              onClick={handleFavoriteToggle}
              disabled={favLoading}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer shadow-xs ${
                isFavorite
                  ? "bg-rose-500/10 text-rose-500 border-rose-500/30"
                  : "bg-white dark:bg-white/[0.05] border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:text-foreground"
              }`}
            >
              {isFavorite ? (
                <FaHeartSolid className="w-3.5 h-3.5 text-rose-500" />
              ) : (
                <FaRegHeart className="w-3.5 h-3.5" />
              )}
              <span>{isFavorite ? "Bookmarked" : "Bookmark"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Hero Visual Gallery Stage */}
      <section className="relative overflow-hidden pt-6 pb-12 sm:pb-16 bg-gradient-to-b from-slate-100/60 via-background to-background dark:from-[#131126]/70 dark:via-background dark:to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Main Hero Media Stage */}
          <div className="relative w-full h-[360px] sm:h-[480px] md:h-[540px] rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 dark:border-white/10 group">
            
            {/* Background Glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-active/30 to-purple-600/30 blur-2xl opacity-40 pointer-events-none -z-10" />

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
                <span className="px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider backdrop-blur-md bg-black/60 text-white border border-white/20 shadow-md">
                  {data.category || "Fitness"}
                </span>

                <span className="px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md bg-active text-white border border-white/20 shadow-md shadow-active/30 flex items-center gap-1.5">
                  <FiZap className="w-3.5 h-3.5" />
                  <span>{data.difficultyLevel || data.level || "Intermediate"}</span>
                </span>

                <span className="px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md bg-black/50 text-white/90 border border-white/15 hidden md:inline-flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>{currentHeroImage.tag}</span>
                </span>
              </div>

              {/* Fullscreen Expand Action */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setLightboxOpen(true)}
                  className="px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md bg-black/60 hover:bg-active text-white border border-white/20 transition-all cursor-pointer flex items-center gap-1.5 shadow-md"
                  title="Expand to Fullscreen View"
                >
                  <FiMaximize2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Inspect 4K View</span>
                </button>
              </div>
            </div>

            {/* Bottom Title & Session Overview Overlay */}
            <div className="absolute bottom-6 sm:bottom-8 inset-x-6 sm:inset-x-8 z-10">
              <div className="max-w-4xl">
                <h1 className="font-['Outfit'] text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.08] mb-3 drop-shadow-md">
                  {data.className}
                </h1>

                {/* Subtitle / Image caption description */}
                <p className="text-xs sm:text-sm text-white/80 line-clamp-1 max-w-2xl mb-4">
                  {currentHeroImage.desc}
                </p>

                {/* Coach & Meta Ribbon */}
                <div className="flex flex-wrap items-center gap-3 sm:gap-5 text-white/90 text-xs sm:text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-active/20 border border-active/50 flex items-center justify-center font-bold text-active relative">
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
                    </div>
                    <div>
                      <span className="font-bold text-white block leading-tight">{coachName}</span>
                      <span className="text-[10px] text-white/70">Master CSCS Coach</span>
                    </div>
                  </div>

                  <div className="h-4 w-px bg-white/20 hidden sm:block" />

                  <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3 py-1 rounded-xl border border-white/10">
                    <FaStar className="w-3.5 h-3.5 text-amber-400" />
                    <span className="font-bold text-white">{rating}</span>
                    <span className="text-white/60 text-xs">({reviewCount} reviews)</span>
                  </div>

                  <div className="h-4 w-px bg-white/20 hidden sm:block" />

                  <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3 py-1 rounded-xl border border-white/10">
                    <FiClock className="w-3.5 h-3.5 text-active" />
                    <span className="font-semibold text-white">{data.duration || 60} Mins</span>
                  </div>

                  <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3 py-1 rounded-xl border border-white/10">
                    <FiMapPin className="w-3.5 h-3.5 text-active" />
                    <span className="font-semibold text-white">{studio}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Multi-Angle Gallery Selector Deck */}
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {galleryImages.map((img, idx) => {
              const isSelected = selectedImageIdx === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIdx(idx)}
                  className={`group/thumb relative h-20 sm:h-24 rounded-2xl overflow-hidden border transition-all duration-300 text-left cursor-pointer ${
                    isSelected
                      ? "border-active ring-2 ring-active/40 scale-[1.02] shadow-lg shadow-active/20"
                      : "border-slate-200/80 dark:border-white/10 opacity-75 hover:opacity-100 hover:border-active/40"
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
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Content Workspace Layout */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column (Content, Tabs, Curriculum) */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* Interactive Tab Navigation */}
            <div className="border-b border-slate-200/80 dark:border-white/[0.08] flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {[
                { id: "overview", label: "Overview & Adaptations" },
                { id: "telemetry", label: "Biometrics & Heart Zone" },
                { id: "timeline", label: "Session Anatomy" },
                { id: "coach", label: "Master Coach" },
                { id: "amenities", label: "Recovery Suite Perks" },
                { id: "faqs", label: "Athlete FAQs" },
                { id: "reviews", label: `Athlete Reviews (${rating}★)` },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-3 font-['Inter'] text-sm font-bold whitespace-nowrap border-b-2 transition-all cursor-pointer ${
                    activeTab === tab.id
                      ? "border-active text-active"
                      : "border-transparent text-slate-500 dark:text-slate-400 hover:text-foreground hover:border-slate-300 dark:hover:border-white/20"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* TAB 1: OVERVIEW & OBJECTIVES */}
            {activeTab === "overview" && (
              <div className="space-y-8 animate-fadeIn">
                <div>
                  <h2 className="font-['Outfit'] text-2xl font-black text-foreground mb-3">
                    Curriculum Overview
                  </h2>
                  <p className="font-['Inter'] text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                    {data.description ||
                      "Engineered for high-output athletes looking to optimize functional power, core integrity, and metabolic endurance through progressive overload and certified form guidance."}
                  </p>
                </div>

                {/* 4 Core Physiological Adaptations */}
                <div>
                  <h3 className="font-['Outfit'] text-xl font-bold text-foreground mb-4">
                    Target Physiological Stimulus
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-5 rounded-2xl bg-white dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/10 shadow-xs hover:border-active/30 transition-all">
                      <div className="w-9 h-9 rounded-xl bg-active/10 text-active flex items-center justify-center font-bold mb-3">
                        <FaDumbbell className="w-4 h-4" />
                      </div>
                      <h4 className="font-['Outfit'] font-bold text-base text-foreground mb-1">
                        Hypertrophy & Kinetic Power
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                        Stimulate high-threshold motor units using multi-joint compound movement patterns and controlled tempo eccentrics.
                      </p>
                    </div>

                    <div className="p-5 rounded-2xl bg-white dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/10 shadow-xs hover:border-active/30 transition-all">
                      <div className="w-9 h-9 rounded-xl bg-cyan-500/10 text-cyan-500 flex items-center justify-center font-bold mb-3">
                        <FaFire className="w-4 h-4" />
                      </div>
                      <h4 className="font-['Outfit'] font-bold text-base text-foreground mb-1">
                        Anaerobic Threshold & VO2 Peak
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                        Sustain power outputs near the lactate turn-point to expand cardiovascular engine volume and recovery speed.
                      </p>
                    </div>

                    <div className="p-5 rounded-2xl bg-white dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/10 shadow-xs hover:border-active/30 transition-all">
                      <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold mb-3">
                        <FiActivity className="w-4 h-4" />
                      </div>
                      <h4 className="font-['Outfit'] font-bold text-base text-foreground mb-1">
                        Neuromuscular Coordination
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                        Improve bar velocity, rotational balance, and bilateral symmetry through real-time coach cueing and optical tracking.
                      </p>
                    </div>

                    <div className="p-5 rounded-2xl bg-white dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/10 shadow-xs hover:border-active/30 transition-all">
                      <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center font-bold mb-3">
                        <FiShield className="w-4 h-4" />
                      </div>
                      <h4 className="font-['Outfit'] font-bold text-base text-foreground mb-1">
                        Joint Resilience & Longevity
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                        Loaded mobility protocols protecting spinal integrity, knee patellofemoral tracking, and shoulder capsules.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Athlete Requirements & Prerequisites */}
                <div className="p-6 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/10">
                  <h4 className="font-['Outfit'] font-bold text-base text-foreground mb-3">
                    Athlete Preparation & Prerequisites
                  </h4>
                  <ul className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
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
                </div>
              </div>
            )}

            {/* TAB 2: TELEMETRY & BIOMETRICS */}
            {activeTab === "telemetry" && (
              <div className="space-y-8 animate-fadeIn">
                <div>
                  <h2 className="font-['Outfit'] text-2xl font-black text-foreground mb-2">
                    Biometric Profile & Live Telemetry
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                    Real-time metabolic readouts calibrated by our sports science coaching team.
                  </p>
                </div>

                {/* Intensity Meter & Gauge */}
                <div className="p-6 rounded-3xl bg-white dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/10 shadow-sm space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
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
                              ? "bg-active shadow-sm shadow-active/40"
                              : "bg-slate-200 dark:bg-white/10"
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
                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.04] border border-slate-100 dark:border-white/5">
                      <div className="flex items-center gap-2 text-active mb-1.5">
                        <FaHeartbeat className="w-4 h-4 animate-pulse" />
                        <span className="text-[11px] font-bold uppercase tracking-wider">
                          Target Heart Zone
                        </span>
                      </div>
                      <span className="font-['Outfit'] text-lg font-black text-foreground block">
                        {intensityInfo.hr}
                      </span>
                      <span className="text-[11px] text-slate-400">Live telemetry display</span>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.04] border border-slate-100 dark:border-white/5">
                      <div className="flex items-center gap-2 text-amber-500 mb-1.5">
                        <FaFire className="w-4 h-4" />
                        <span className="text-[11px] font-bold uppercase tracking-wider">
                          Est. Energy Burn
                        </span>
                      </div>
                      <span className="font-['Outfit'] text-lg font-black text-foreground block">
                        {intensityInfo.cals}
                      </span>
                      <span className="text-[11px] text-slate-400">Based on 75kg athlete</span>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.04] border border-slate-100 dark:border-white/5">
                      <div className="flex items-center gap-2 text-emerald-500 mb-1.5">
                        <FiUsers className="w-4 h-4" />
                        <span className="text-[11px] font-bold uppercase tracking-wider">
                          Supervision Ratio
                        </span>
                      </div>
                      <span className="font-['Outfit'] text-lg font-black text-foreground block">
                        1 : {totalSlots} Max
                      </span>
                      <span className="text-[11px] text-slate-400">Direct coach cueing</span>
                    </div>
                  </div>
                </div>

                {/* Technical Equipment Provided */}
                <div className="p-6 rounded-2xl bg-white dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/10">
                  <h4 className="font-['Outfit'] font-bold text-base text-foreground mb-3">
                    Studio Equipment Provided & Verified
                  </h4>
                  <div className="flex flex-wrap gap-2.5">
                    {equipmentList.map((item) => (
                      <span
                        key={item}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 dark:bg-white/[0.05] border border-slate-200 dark:border-white/10 text-xs font-semibold text-foreground shadow-xs"
                      >
                        <FiCheck className="w-4 h-4 text-emerald-500" />
                        <span>{item}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: SESSION TIMELINE */}
            {activeTab === "timeline" && (
              <div className="space-y-6 animate-fadeIn">
                <div>
                  <h2 className="font-['Outfit'] text-2xl font-black text-foreground mb-2">
                    How This {data.duration || 60}-Minute Protocol Unfolds
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                    Minute-by-minute athletic progression to balance maximal stimulus with neuromuscular safety.
                  </p>
                </div>

                <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-2 sm:before:left-3 before:top-3 before:bottom-3 before:w-0.5 before:bg-active/30">
                  <div className="relative">
                    <div className="absolute -left-6 sm:-left-8 top-1 w-5 h-5 rounded-full bg-active text-white text-[10px] font-black flex items-center justify-center ring-4 ring-background">
                      1
                    </div>
                    <div className="p-5 rounded-2xl bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 shadow-xs">
                      <span className="text-xs font-black text-active uppercase tracking-wider block mb-1">
                        00:00 - 00:10 • Dynamic Primer
                      </span>
                      <h4 className="font-['Outfit'] font-bold text-base text-foreground mb-1">
                        CNS Activation & Loaded Mobility
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                        Band-resisted hip mobilization, thoracic extension flossing, and progressive heart rate acceleration into Zone 2.
                      </p>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-6 sm:-left-8 top-1 w-5 h-5 rounded-full bg-active text-white text-[10px] font-black flex items-center justify-center ring-4 ring-background">
                      2
                    </div>
                    <div className="p-5 rounded-2xl bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 shadow-xs">
                      <span className="text-xs font-black text-active uppercase tracking-wider block mb-1">
                        00:10 - 00:35 • Calibrated Core Engine
                      </span>
                      <h4 className="font-['Outfit'] font-bold text-base text-foreground mb-1">
                        Primary Working Complexes & Overload
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                        Main athletic complexes targeting technical movement excellence, velocity tracking, and progressive resistance working sets.
                      </p>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-6 sm:-left-8 top-1 w-5 h-5 rounded-full bg-active text-white text-[10px] font-black flex items-center justify-center ring-4 ring-background">
                      3
                    </div>
                    <div className="p-5 rounded-2xl bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 shadow-xs">
                      <span className="text-xs font-black text-active uppercase tracking-wider block mb-1">
                        00:35 - 00:45 • Metabolic Finisher
                      </span>
                      <h4 className="font-['Outfit'] font-bold text-base text-foreground mb-1">
                        High-Cadence Anaerobic Output
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                        High-density team intervals utilizing sleds, aqua bags, or assault bikes pushing VO2 max output.
                      </p>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-6 sm:-left-8 top-1 w-5 h-5 rounded-full bg-emerald-500 text-white text-[10px] font-black flex items-center justify-center ring-4 ring-background">
                      4
                    </div>
                    <div className="p-5 rounded-2xl bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 shadow-xs">
                      <span className="text-xs font-black text-emerald-500 uppercase tracking-wider block mb-1">
                        00:45 - 00:50 • Parasympathetic Shift
                      </span>
                      <h4 className="font-['Outfit'] font-bold text-base text-foreground mb-1">
                        Box Breathing & Cold Plunge Transition
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                        Controlled box breathing, spinal decompression, and direct guidance to the Cold Plunge suite for immediate recovery.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: MASTER COACH */}
            {activeTab === "coach" && (
              <div className="space-y-6 animate-fadeIn">
                <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 shadow-sm flex flex-col sm:flex-row items-center sm:items-start gap-6">
                  <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden bg-active/20 border-2 border-active shrink-0 shadow-lg">
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
                  </div>

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

                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed pt-1">
                      Over 8+ years coaching collegiate athletes and competitive fitness athletes. Specializes in biomechanical bar path efficiency, kinetic chain power transfer, and injury mitigation.
                    </p>

                    <div className="pt-3 flex flex-wrap items-center justify-center sm:justify-start gap-2">
                      <span className="text-[11px] font-semibold px-2.5 py-1 rounded-md bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-300">
                        USAW Level 2
                      </span>
                      <span className="text-[11px] font-semibold px-2.5 py-1 rounded-md bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-300">
                        FMS Certified
                      </span>
                      <span className="text-[11px] font-semibold px-2.5 py-1 rounded-md bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-300">
                        Precision Nutrition L1
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 5: INCLUDED AMENITIES */}
            {activeTab === "amenities" && (
              <div className="space-y-6 animate-fadeIn">
                <h2 className="font-['Outfit'] text-2xl font-black text-foreground">
                  Complimentary Recovery Suite Privileges
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-5 rounded-2xl bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 flex items-start gap-4">
                    <span className="text-2xl p-2.5 rounded-xl bg-cyan-500/10 shrink-0">❄️</span>
                    <div>
                      <h4 className="font-['Outfit'] font-bold text-sm text-foreground mb-1">
                        Contrast Cold Plunge (48°F)
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                        Medical-grade chilled tubs immediately post-workout to attenuate inflammation and trigger norepinephrine release.
                      </p>
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 flex items-start gap-4">
                    <span className="text-2xl p-2.5 rounded-xl bg-amber-500/10 shrink-0">🧖</span>
                    <div>
                      <h4 className="font-['Outfit'] font-bold text-sm text-foreground mb-1">
                        Finnish Cedar Sauna (195°F)
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                        Elevate heat-shock proteins and flush metabolic byproducts in our authentic Finnish cedar sauna chambers.
                      </p>
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 flex items-start gap-4">
                    <span className="text-2xl p-2.5 rounded-xl bg-active/10 shrink-0">🥤</span>
                    <div>
                      <h4 className="font-['Outfit'] font-bold text-sm text-foreground mb-1">
                        Hydration & Electrolyte Tap
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                        Unlimited chilled Himalayan mineral water, BCAA infusions, and filtered alkaline hydration dispensers.
                      </p>
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 flex items-start gap-4">
                    <span className="text-2xl p-2.5 rounded-xl bg-purple-500/10 shrink-0">🚿</span>
                    <div>
                      <h4 className="font-['Outfit'] font-bold text-sm text-foreground mb-1">
                        Luxury Locker Suites & Dyson Amenities
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                        Rainfall showers, keyless RFID locks, organic Malin+Goetz grooming essentials, and plush towels.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 6: FAQS */}
            {activeTab === "faqs" && (
              <div className="space-y-4 animate-fadeIn">
                <h2 className="font-['Outfit'] text-2xl font-black text-foreground mb-4">
                  Frequently Asked Questions
                </h2>

                {FAQS.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div
                      key={idx}
                      className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.03] overflow-hidden transition-all"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                        className="w-full p-5 text-left flex items-center justify-between gap-4 font-['Outfit'] font-bold text-base text-foreground cursor-pointer hover:text-active transition-colors"
                      >
                        <span>{faq.q}</span>
                        {isOpen ? (
                          <FiChevronUp className="w-5 h-5 text-active shrink-0" />
                        ) : (
                          <FiChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                        )}
                      </button>

                      {isOpen && (
                        <div className="px-5 pb-5 text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-white/5 pt-3">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* TAB 7: REVIEWS */}
            {activeTab === "reviews" && (
              <div className="space-y-6 animate-fadeIn">
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
                    <div
                      key={i}
                      className="p-5 rounded-2xl bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10"
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
                        <span className="text-xs text-slate-400">{rev.date}</span>
                      </div>
                      <div className="flex items-center gap-1 text-amber-400 mb-2">
                        {Array.from({ length: rev.rating }).map((_, idx) => (
                          <FaStar key={idx} className="w-3 h-3 fill-current" />
                        ))}
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        &quot;{rev.comment}&quot;
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column (Sticky Booking Console) */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 rounded-3xl bg-white/90 dark:bg-[#121124]/90 backdrop-blur-xl border border-slate-200/90 dark:border-white/10 shadow-2xl p-6 sm:p-7 space-y-6">
              
              {/* Price Banner */}
              <div className="p-4 rounded-2xl bg-slate-100/70 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 text-center relative overflow-hidden">
                <div className="flex items-baseline justify-center gap-1">
                  <span className="font-['Outfit'] text-4xl font-black text-foreground">
                    ${data.price || 35}
                  </span>
                  <span className="text-xs font-semibold text-slate-400">
                    / month
                  </span>
                </div>
                <span className="text-[11px] font-bold text-emerald-500 uppercase tracking-wider block mt-1">
                  ✓ Monthly Membership • Unlimited Access
                </span>
              </div>

              {/* Live Seat Availability */}
              <div>
                <div className="flex items-center justify-between text-xs font-bold mb-2">
                  <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                    <FiUsers className="w-3.5 h-3.5 text-active" />
                    <span>Seat Capacity</span>
                  </span>
                  <span className="text-foreground">
                    {bookedCount} / {totalSlots} Claimed
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-white/10 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      availableSlots <= 3 ? "bg-rose-500" : "bg-emerald-500"
                    }`}
                    style={{ width: `${percentFilled}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 mt-2">
                  <span className={availableSlots <= 3 ? "text-rose-500 font-extrabold" : "text-emerald-500"}>
                    {availableSlots > 0 ? `⚡ ${availableSlots} seats available` : "Class Waitlist Only"}
                  </span>
                  <span>{percentFilled}% full</span>
                </div>
              </div>

              {/* Schedule Parameters Card */}
              <div className="space-y-3.5 pt-2 border-t border-slate-100 dark:border-white/[0.08] text-xs">
                <div className="flex items-start gap-3">
                  <FiCalendar className="w-4 h-4 text-active shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-foreground block">Session Days</span>
                    <span className="text-slate-500 dark:text-slate-400 font-medium">
                      {data.classSchedule || "Mon, Wed, Fri"}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FiClock className="w-4 h-4 text-active shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-foreground block">Commencement & Duration</span>
                    <span className="text-slate-500 dark:text-slate-400 font-medium">
                      {data.time || "08:00 AM"} • {data.duration || 60} Minutes
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FiMapPin className="w-4 h-4 text-active shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-foreground block">Studio Venue</span>
                    <span className="text-slate-500 dark:text-slate-400 font-medium">
                      {studio}, FlexPulse Main Athletic Hub
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 space-y-3">
                {!user ? (
                  <Link
                    href={`/signin?redirect=/all-classes/${data._id}`}
                    className="w-full inline-flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-active hover:bg-rose-600 text-white font-['Outfit'] font-black text-sm uppercase tracking-wider transition-all duration-300 shadow-lg shadow-active/30 cursor-pointer"
                  >
                    <span>Sign In to Book Class</span>
                    <FiArrowRight className="w-4 h-4" />
                  </Link>
                ) : user.status === "banned" ? (
                  <button
                    disabled
                    className="w-full py-4 px-6 rounded-2xl bg-rose-500/20 text-rose-500 font-['Outfit'] font-black text-sm uppercase tracking-wider cursor-not-allowed border border-rose-500/30"
                  >
                    Action Restricted by Admin
                  </button>
                ) : initialIsBooked ? (
                  <div className="w-full py-4 px-6 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-500 text-center font-['Outfit'] font-black text-sm flex items-center justify-center gap-2">
                    <FiCheckCircle className="w-4 h-4" />
                    <span>You Are Registered!</span>
                  </div>
                ) : availableSlots === 0 ? (
                  <button
                    disabled
                    className="w-full py-4 px-6 rounded-2xl bg-slate-300 dark:bg-white/10 text-slate-500 font-['Outfit'] font-black text-sm uppercase tracking-wider cursor-not-allowed"
                  >
                    Class Fully Booked (Waitlist)
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setIsProcessingStripe(false);
                      setIsReceiptModalOpen(true);
                    }}
                    className="w-full py-4 px-6 rounded-2xl bg-active hover:bg-rose-600 text-white font-['Outfit'] font-black text-sm uppercase tracking-wider transition-all duration-300 shadow-xl shadow-active/30 cursor-pointer flex items-center justify-center gap-2 hover:scale-[1.02]"
                  >
                    <span>Confirm Registration</span>
                    <FiArrowRight className="w-4 h-4" />
                  </button>
                )}

                {/* Bookmark Button */}
                <button
                  type="button"
                  onClick={handleFavoriteToggle}
                  disabled={favLoading}
                  className={`w-full py-3 px-4 rounded-xl border text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    isFavorite
                      ? "bg-rose-500/10 text-rose-500 border-rose-500/30"
                      : "bg-slate-100/80 dark:bg-white/[0.04] text-foreground border-slate-200 dark:border-white/10 hover:border-active/40"
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
                </button>
              </div>

              {/* Guarantees */}
              <div className="pt-4 border-t border-slate-100 dark:border-white/[0.08] space-y-2 text-[11px] text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <FiCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Free cancellation up to 12 hours prior</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Digital RFID turnstile entry on mobile</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Sauna & Cold Plunge pass included</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Decorated Pre-Checkout Payment Receipt & Stripe Gateway Modal */}
      {isReceiptModalOpen && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget && !isProcessingStripe) {
              setIsReceiptModalOpen(false);
              setIsProcessingStripe(false);
            }
          }}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 md:p-6 cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="cursor-default relative w-full max-w-xl max-h-[92vh] flex flex-col rounded-3xl bg-white dark:bg-[#121124] border border-slate-200/90 dark:border-white/10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)] overflow-hidden my-auto animate-fadeIn"
          >
            
            {/* 1. FIXED MODAL HEADER (Never cut off) */}
            <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-white/10 flex items-center justify-between shrink-0 bg-slate-50/70 dark:bg-white/[0.02]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-active/10 text-active flex items-center justify-center font-bold text-lg shrink-0 border border-active/20">
                  <FiShield className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-active block">
                    Official Registration Invoice & Receipt
                  </span>
                  <h3 className="font-['Outfit'] text-lg sm:text-xl font-black text-foreground">
                    Review Payment Receipt
                  </h3>
                </div>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => {
                  setIsReceiptModalOpen(false);
                  setIsProcessingStripe(false);
                }}
                disabled={isProcessingStripe}
                className="w-8 h-8 rounded-full bg-slate-200/70 dark:bg-white/10 hover:bg-active hover:text-white flex items-center justify-center text-slate-500 transition-colors cursor-pointer disabled:opacity-40"
                title="Close receipt preview"
              >
                <FiX className="w-4 h-4" />
              </button>
            </div>

            {/* 2. SCROLLABLE RECEIPT BODY */}
            <div className="p-4 sm:p-5 overflow-y-auto space-y-4 flex-1 overscroll-contain">
              {/* Declared Payment Gateway: Stripe */}
              <div className="p-4 rounded-2xl bg-[#635BFF]/5 dark:bg-[#635BFF]/10 border border-[#635BFF]/20 space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-[#635BFF] text-white flex items-center justify-center font-bold text-lg shadow-sm">
                      <SiStripe className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="font-['Outfit'] font-black text-sm text-foreground block">
                        Stripe™ Certified Payment Gateway
                      </span>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400">
                        256-Bit Encrypted Secure Checkout
                      </span>
                    </div>
                  </div>

                  <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-500 text-[10px] font-bold uppercase tracking-wider border border-emerald-500/20">
                    PCI-DSS Level 1
                  </span>
                </div>

                {/* Supported Payment Methods Grid */}
                <div className="pt-2.5 border-t border-[#635BFF]/15 space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Supported Payment Networks & Wallets:
                  </span>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white dark:bg-white/10 border border-slate-200 dark:border-white/10 text-xs font-semibold text-[#1A1F71] dark:text-white shadow-2xs">
                      <FaCcVisa className="w-3.5 h-3.5 text-[#1A1F71] dark:text-white" /> Visa
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white dark:bg-white/10 border border-slate-200 dark:border-white/10 text-xs font-semibold text-[#EB001B] dark:text-white shadow-2xs">
                      <FaCcMastercard className="w-3.5 h-3.5 text-[#EB001B]" /> Mastercard
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white dark:bg-white/10 border border-slate-200 dark:border-white/10 text-xs font-semibold text-foreground shadow-2xs">
                      <FaApplePay className="w-4 h-4" /> Apple Pay
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white dark:bg-white/10 border border-slate-200 dark:border-white/10 text-xs font-semibold text-[#006FCF] dark:text-white shadow-2xs">
                      <FaCcAmex className="w-3.5 h-3.5 text-[#006FCF]" /> Amex
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white dark:bg-white/10 border border-slate-200 dark:border-white/10 text-xs font-semibold text-foreground shadow-2xs">
                      <FaGooglePay className="w-4 h-4 text-amber-500" /> Google Pay
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white dark:bg-white/10 border border-slate-200 dark:border-white/10 text-xs font-semibold text-[#FF6600] shadow-2xs">
                      <FaCcDiscover className="w-3.5 h-3.5 text-[#FF6600]" /> Discover
                    </span>
                  </div>
                </div>
              </div>

              {/* Athlete & Class Details Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-100 dark:border-white/5 space-y-1">
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">
                    Registered Athlete
                  </span>
                  <p className="font-bold text-foreground text-sm truncate">
                    {userName || user?.name || "Athlete"}
                  </p>
                  <p className="text-slate-500 dark:text-slate-400 truncate">
                    {userEmail || user?.email}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-100 dark:border-white/5 space-y-1">
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">
                    Scheduled Session
                  </span>
                  <p className="font-bold text-foreground text-sm truncate">
                    {data.className}
                  </p>
                  <p className="text-slate-500 dark:text-slate-400">
                    {data.classSchedule || "Mon, Wed, Fri"} • {data.time || "08:00 AM"}
                  </p>
                </div>
              </div>

              {/* Interactive Auto-Renewal Preference Selector */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/90 dark:border-white/10 space-y-2.5">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-base shrink-0 transition-all ${
                        autoRenew
                          ? "bg-emerald-500/15 text-emerald-600 border border-emerald-500/30"
                          : "bg-slate-200 dark:bg-white/10 text-slate-500 border border-slate-300 dark:border-white/15"
                      }`}
                    >
                      <FiRepeat className={`w-4 h-4 ${autoRenew ? "animate-spin duration-3000" : ""}`} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-['Outfit'] font-black text-sm text-foreground">
                          Monthly Auto-Renewal
                        </span>
                        <span
                          className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full ${
                            autoRenew
                              ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20"
                              : "bg-slate-200 dark:bg-white/10 text-slate-500"
                          }`}
                        >
                          {autoRenew ? "Enabled" : "Disabled"}
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 block">
                        {autoRenew
                          ? "Renews every 30 days automatically. Cancel anytime with zero fees."
                          : "One-time 30-day class pass. Will NOT renew automatically."}
                      </span>
                    </div>
                  </div>

                  {/* Toggle Switch */}
                  <button
                    type="button"
                    onClick={() => setAutoRenew(!autoRenew)}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      autoRenew ? "bg-active" : "bg-slate-300 dark:bg-white/20"
                    }`}
                    role="switch"
                    aria-checked={autoRenew}
                    title="Toggle auto-renewal preference"
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                        autoRenew ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between text-[10px] pt-2 border-t border-slate-200/70 dark:border-white/5 text-slate-400">
                  <span>Billing Mode: {autoRenew ? "Recurring Monthly Subscription" : "Single 30-Day Pass"}</span>
                  <span className={autoRenew ? "text-emerald-500 font-semibold" : "text-amber-500 font-semibold"}>
                    {autoRenew ? "✓ Cancel anytime with 1 click" : "✓ No renewal obligation"}
                  </span>
                </div>
              </div>

              {/* Itemized Billing Ledger */}
              <div className="rounded-2xl border border-slate-200 dark:border-white/10 overflow-hidden text-xs">
                <div className="bg-slate-50 dark:bg-white/[0.03] px-4 py-2 font-bold uppercase text-[10px] text-slate-400 border-b border-slate-200 dark:border-white/10 flex justify-between">
                  <span>Description</span>
                  <span>Amount</span>
                </div>
                <div className="p-3.5 space-y-2 divide-y divide-slate-100 dark:divide-white/5">
                  <div className="flex justify-between pt-1">
                    <div>
                      <strong className="text-foreground block font-['Outfit'] font-bold">
                        {data.className} (Monthly Membership Pass)
                      </strong>
                      <span className="text-[11px] text-slate-400">
                        Led by {coachName} • Unlimited monthly sessions
                      </span>
                    </div>
                    <span className="font-mono font-bold text-foreground">
                      ${data.price || 35}.00 / mo
                    </span>
                  </div>

                  <div className="flex justify-between pt-2">
                    <div>
                      <span className="text-foreground block">Sauna & Cold Plunge Pass</span>
                      <span className="text-[11px] text-slate-400">Post-workout hydrotherapy</span>
                    </div>
                    <span className="font-mono text-emerald-500 font-semibold">
                      Included ($0.00)
                    </span>
                  </div>

                  <div className="flex justify-between pt-2">
                    <div>
                      <span className="text-foreground block">Sanitized Towel & Digital Locker</span>
                      <span className="text-[11px] text-slate-400">Full facility amenity access</span>
                    </div>
                    <span className="font-mono text-emerald-500 font-semibold">
                      Included ($0.00)
                    </span>
                  </div>

                  <div className="flex justify-between pt-2">
                    <div>
                      <span className="text-foreground block">Stripe Processing & Turnstile Gate</span>
                      <span className="text-[11px] text-slate-400">Instant turnstile confirmation</span>
                    </div>
                    <span className="font-mono text-emerald-500 font-semibold">
                      FREE ($0.00)
                    </span>
                  </div>
                </div>

                {/* Total Row */}
                <div className="bg-slate-50 dark:bg-white/[0.04] p-3.5 border-t border-slate-200 dark:border-white/10 flex items-center justify-between">
                  <div>
                    <span className="font-['Outfit'] font-bold text-sm text-foreground block">
                      {autoRenew ? "Total Amount Due (Month 1)" : "Total Amount Due (Single Pass)"}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {autoRenew
                        ? "Billed monthly • Automatic Stripe renewal, cancel anytime"
                        : "One-time payment • Valid for 30 days, no auto-renewal"}
                    </span>
                  </div>
                  <span className="font-['Outfit'] text-2xl font-black text-active font-mono">
                    ${data.price || 35}.00 USD {autoRenew ? <span className="text-sm font-normal text-slate-400">/ mo</span> : <span className="text-xs font-normal text-slate-400">(once)</span>}
                  </span>
                </div>
              </div>
            </div>

            {/* 3. FIXED MODAL ACTION FOOTER (Always visible and clickable) */}
            <div className="p-4 sm:p-5 border-t border-slate-100 dark:border-white/10 bg-slate-50/90 dark:bg-[#151329] shrink-0 space-y-2.5">
              <div className="flex flex-col-reverse sm:flex-row items-center gap-3">
                {/* Back Button */}
                <button
                  type="button"
                  onClick={() => {
                    setIsReceiptModalOpen(false);
                    setIsProcessingStripe(false);
                  }}
                  disabled={isProcessingStripe}
                  className="group/back w-full sm:w-auto h-[50px] px-6 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.04] hover:bg-slate-100 dark:hover:bg-white/[0.08] text-foreground font-['Outfit'] font-bold text-sm transition-all duration-200 cursor-pointer shrink-0 flex items-center justify-center gap-2 shadow-xs hover:border-slate-300 dark:hover:border-white/20 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FiArrowLeft className="w-4 h-4 text-slate-400 group-hover/back:-translate-x-0.5 transition-transform" />
                  <span>Back</span>
                </button>

                {/* Primary Stripe Checkout Button */}
                <button
                  type="button"
                  onClick={handleContinueToStripe}
                  disabled={isProcessingStripe}
                  className="group/pay w-full sm:flex-1 h-[50px] px-6 rounded-2xl bg-gradient-to-r from-active via-rose-600 to-red-600 hover:from-rose-600 hover:to-active text-white font-['Outfit'] font-black text-sm uppercase tracking-wider transition-all duration-300 shadow-xl shadow-active/35 hover:shadow-active/50 cursor-pointer flex items-center justify-center gap-2.5 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-85 disabled:cursor-wait"
                >
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
                      <FiArrowRight className="w-4 h-4 text-white group-hover/pay:translate-x-0.5 transition-transform" />
                    </>
                  )}
                </button>
              </div>

              <p className="text-[10px] text-center text-slate-400 pt-0.5 flex items-center justify-center gap-1.5">
                <span>🔒 Protected by Stripe 256-bit encryption</span>
                <span>•</span>
                <span>Monthly recurring pass • Cancel anytime</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
