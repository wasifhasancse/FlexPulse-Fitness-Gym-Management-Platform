"use client";

import { useState, useMemo, useEffect } from "react";
import FacilitiesHeroHeader from "./FacilitiesHeroHeader";
import FacilitiesFilterDeck from "./FacilitiesFilterDeck";
import FacilitiesGrid from "./FacilitiesGrid";
import FacilitiesBrandMarquee from "./FacilitiesBrandMarquee";
import FacilitiesPeakHours from "./FacilitiesPeakHours";
import FacilitiesOperatingHours from "./FacilitiesOperatingHours";
import FacilitiesFaq from "./FacilitiesFaq";
import FacilitiesVipBanner from "./FacilitiesVipBanner";
import FacilitySpecsModal from "./FacilitySpecsModal";
import FacilityTourModal from "./FacilityTourModal";

import {
  FiCompass,
  FiZap,
  FiCoffee,
} from "react-icons/fi";
import {
  FaDumbbell,
  FaFire,
  FaSpa,
  FaWater,
  FaHeartbeat,
} from "react-icons/fa";

// 8 Complete, authentic zones with multi-angle photography and detailed specs
const FACILITY_ZONES = [
  {
    id: "olympic-strength",
    name: "Olympic Free Weights & Strength Arena",
    category: "Strength & Power",
    categoryKey: "strength",
    floor: "Level 1 • Main Floor",
    levelKey: "level-1",
    footage: "6,500 sq ft",
    ceilingHeight: "18 Feet Clear Span",
    tag: "Competition Grade",
    temp: "68°F • Climate-Controlled",
    currentOccupancy: 38,
    maxCapacity: 70,
    occupancyStatus: "Moderate Activity",
    gallery: [
      { label: "Power Racks", url: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop" },
      { label: "Dumbbell Deck", url: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1200&auto=format&fit=crop" },
      { label: "Deadlift Decks", url: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200&auto=format&fit=crop" },
    ],
    description:
      "Purpose-built for powerlifters, bodybuilders, and strength athletes striving for progressive mechanical tension. Features certified competition barbells, calibrated cast iron plates, and acoustic-dampened drop decks engineered to absorb heavy deadlift impacts.",
    specs: [
      "12 Rogue Monster squat racks with safety spotter arms & band pegs",
      "Calibrated Eleiko competition bumper & cast iron Olympic plates (5,000+ kg)",
      "Urethane dumbbell pairs ranging from 5 lbs up to 150 lbs in 5-lb increments",
      "6 Sound-dampening deadlift platforms with magnesium chalk stations",
      "Hammer Strength ISO-lateral chest, back, and 45° leg press stations",
      "Specialty bars: Safety Squat Bar, Swiss Football Bar, Open Trap Bars",
    ],
    engineering: [
      "1.5-inch dense recycled vulcanized rubber flooring for zero floor bounce",
      "Directional acoustic baffling panels reducing barbell clatter by 68%",
      "Dual continuous magnesium chalk dust filtration extractors",
    ],
    rules: [
      "Chalk permitted only on dedicated rubberized deadlift drop platforms",
      "Strictly re-rack all weight plates and return dumbbells to rack sleeves",
      "Collars/clips mandatory on all barbell lifts over 60kg",
    ],
    classesAssociated: "Strength Training, Body Sculpt, CrossFit Pro",
  },
  {
    id: "cardio-suite",
    name: "Cardio & VO2 Max Performance Suite",
    category: "Cardio & Endurance",
    categoryKey: "cardio",
    floor: "Level 1 • South Wing",
    levelKey: "level-1",
    footage: "4,800 sq ft",
    ceilingHeight: "16 Feet Aerated",
    tag: "Biometric Heart Sync",
    temp: "66°F • High Airflow Velocity",
    currentOccupancy: 22,
    maxCapacity: 60,
    occupancyStatus: "Optimal Training Flow",
    gallery: [
      { label: "Skillmills", url: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1200&auto=format&fit=crop" },
      { label: "Concept2 Fleet", url: "https://images.unsplash.com/photo-1576678927484-cc907957088c?q=80&w=1200&auto=format&fit=crop" },
      { label: "Interval Arena", url: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?q=80&w=1200&auto=format&fit=crop" },
    ],
    description:
      "Engineered to test cardiovascular thresholds and optimize lactate clearance. Fitted with motorless curved treadmills, dual ergometers, and overhead MyZone telemetry screens reflecting heart rate effort and calorie burn in real time.",
    specs: [
      "16 Technogym Skillmill curved motorless treadmills with magnetic resistance",
      "10 Concept2 RowErgs and SkiErgs equipped with PM5 performance monitors",
      "8 Assault AirBikes and Rogue Echo Bikes for explosive anaerobic intervals",
      "6 StairMaster 10-series Gauntlets with integrated virtual altitude trails",
      "Live MyZone heart-rate projection wall across the entire cardio bay",
      "Precor adaptive motion trainers with stride length auto-calibration",
    ],
    engineering: [
      "Negative-ion fresh airflow jets directed at each cardio station console",
      "Dual wireless telemetry receiver antennas supporting ANT+ and BLE 5.0",
      "Individual touchless device holders with integrated inductive wireless charging",
    ],
    rules: [
      "Wipe down console screens and grab handles immediately after each session",
      "30-minute machine limit during peak evening hours (5:00 PM – 7:30 PM)",
      "Bluetooth audio sync recommended with overhead telemetry channels",
    ],
    classesAssociated: "Cardio Burn, Spin Cycling, HIIT Blast",
  },
  {
    id: "functional-turf",
    name: "CrossFit & Sprint Turf Track",
    category: "Agility & Functional",
    categoryKey: "functional",
    floor: "Ground Level • East Bay",
    levelKey: "ground",
    footage: "5,200 sq ft",
    ceilingHeight: "20 Feet Vaulted",
    tag: "Athletic Conditioning",
    temp: "68°F • Continuous Air Circulation",
    currentOccupancy: 28,
    maxCapacity: 55,
    occupancyStatus: "Active Group Energy",
    gallery: [
      { label: "Sprint Track", url: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200&auto=format&fit=crop" },
      { label: "Kettlebell Bay", url: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?q=80&w=1200&auto=format&fit=crop" },
      { label: "Prowler Sleds", url: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=1200&auto=format&fit=crop" },
    ],
    description:
      "40 meters of high-density padded indoor sprint turf built for dynamic prowler sled drives, plyometrics, kettlebell complexes, and multi-directional speed work. Surrounded by full acoustic dampening panels.",
    specs: [
      "40-meter indoor shock-absorbent sprint & sled track with 5-meter markings",
      "4 Heavy steel Torque Tank push/pull prowler sleds with Olympic pegs",
      "Ceiling-mounted gymnastic ring stations and custom monkey bars",
      "Competition kettlebells from 8kg to 48kg pairs in competition colors",
      "Slam balls (10-50 lbs), sandbags, and high-density soft landing plyo boxes",
      "Battle ropes and agility ladder timing gates for explosive acceleration",
    ],
    engineering: [
      "Under-turf 12mm foam pad protecting knee joints during heavy sprint decelerations",
      "Heavy load-bearing ceiling anchor grid tested to 2,500 kg tensile pull",
      "Industrial velocity wall fans maintaining cross-ventilation during peak WODs",
    ],
    rules: [
      "Only clean athletic trainers or turf shoes allowed (no outdoor cleats)",
      "Keep sled track clear of stray kettlebells and medicine balls",
      "Ensure drop zones are clear before initiating overhead ring swings",
    ],
    classesAssociated: "Bootcamp Challenge, Cross Training, BoxFit",
  },
  {
    id: "zen-pavilion",
    name: "Mind & Body Zen Pavilion",
    category: "Yoga & Pilates",
    categoryKey: "yoga",
    floor: "Level 2 • Penthouse Studio",
    levelKey: "level-2",
    footage: "3,200 sq ft",
    ceilingHeight: "14 Feet Wood Panel",
    tag: "Infrared Radiant Heat",
    temp: "85°F - 105°F • Therapeutic Heat",
    currentOccupancy: 12,
    maxCapacity: 35,
    occupancyStatus: "Quiet & Serene",
    gallery: [
      { label: "Bamboo Studio", url: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=1200&auto=format&fit=crop" },
      { label: "Pilates Towers", url: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1200&auto=format&fit=crop" },
      { label: "Meditation Mats", url: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1200&auto=format&fit=crop" },
    ],
    description:
      "An acoustically treated sanctuary with heated bamboo flooring, dimmable circadian backlighting, and medical-grade HEPA air purifiers cycling fresh air every 6 minutes for deep mindfulness, mobility, and core sculpting.",
    specs: [
      "Heated infrared radiant ceiling panels (adjustable up to 105°F / 40°C)",
      "12 Balanced Body Allegro 2 Reformer Pilates towers with jumpboards",
      "Organic natural cork yoga mats, blocks, bolsters, and cotton straps",
      "Acoustic noise-dampening walls and multi-zone ambient Bose soundscape",
      "Air filtration system cycling HEPA-purified air every 6 minutes",
      "Spacious mirrored walls with laser-etched posture alignment markings",
    ],
    engineering: [
      "Far-infrared ceiling emitters warming the body directly without oxygen depletion",
      "Dual sound-isolated double glass entryway blocking all external gym noise",
      "Biodynamic lighting that mimics natural solar sunrise and sunset color temperatures",
    ],
    rules: [
      "Silent zone policy: strictly no mobile phone calls or audible notifications",
      "Footwear removed at studio threshold; grip socks mandatory for Pilates",
      "Arrive 5 minutes prior to class start; late entries restricted during meditation",
    ],
    classesAssociated: "Yoga Flow, Mobility & Stretch, Pilates Core",
  },
  {
    id: "hydro-spa",
    name: "Cryo & Hydro-Thermal Recovery Spa",
    category: "Active Recovery",
    categoryKey: "recovery",
    floor: "Lower Level • Oasis Lounge",
    levelKey: "lower",
    footage: "4,000 sq ft",
    ceilingHeight: "12 Feet Acoustic Stone",
    tag: "Contrast Therapy",
    temp: "Plunge 38°F • Sauna 195°F",
    currentOccupancy: 14,
    maxCapacity: 30,
    occupancyStatus: "Calm & Restorative",
    gallery: [
      { label: "Cedar Sauna", url: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=1200&auto=format&fit=crop" },
      { label: "Cold Plunges", url: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1200&auto=format&fit=crop" },
      { label: "Steam Chamber", url: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?q=80&w=1200&auto=format&fit=crop" },
    ],
    description:
      "Accelerate muscle protein synthesis and eliminate delayed onset muscle soreness with alternating hot-and-cold thermal recovery protocols inspired by Scandinavian bathhouse traditions and modern sports medicine.",
    specs: [
      "Twin stainless steel cold plunge baths maintained at continuous 38°F (3°C)",
      "Handcrafted Finnish cedar dry sauna operating at 195°F (90°C)",
      "Eucalyptus-infused marble steam chamber with automatic aroma misting",
      "8 Normatec pneumatic dynamic compression boots in semi-private lounge",
      "Hyperice Percussive therapy bar with heated vibration rollers",
      "Rainfall contrast showers with vitamin C infused water filtration",
    ],
    engineering: [
      "Commercial ozone and micro-filtration system cycling 100% of plunge water every 12 mins",
      "Non-slip thermally treated natural quartzite flooring with floor radiant warming",
      "Independent negative air pressure exhaust evacuating all steam and humidity",
    ],
    rules: [
      "Mandatory rinse shower required before entering cold plunge or sauna",
      "Swimwear or dry athletic shorts mandatory across all thermal hydro zones",
      "Maximum recommended single plunge duration: 3 to 5 minutes",
    ],
    classesAssociated: "Available to all active members & class pass holders",
  },
  {
    id: "combat-ring",
    name: "Combat Athletics & Boxing Arena",
    category: "Combat & Boxing",
    categoryKey: "combat",
    floor: "Level 2 • Mezzanine",
    levelKey: "level-2",
    footage: "2,800 sq ft",
    ceilingHeight: "16 Feet Reinforced",
    tag: "High Impact Ring",
    temp: "68°F • Climate-Controlled",
    currentOccupancy: 16,
    maxCapacity: 32,
    occupancyStatus: "Moderate Activity",
    gallery: [
      { label: "Elevated Ring", url: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=1200&auto=format&fit=crop" },
      { label: "Heavy Bag Line", url: "https://images.unsplash.com/photo-1517438322307-e67111335449?q=80&w=1200&auto=format&fit=crop" },
      { label: "Speed Bag Bay", url: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200&auto=format&fit=crop" },
    ],
    description:
      "An authentic boxing ring environment built for combat conditioning, speed bag rhythm, heavy bag impact training, and precision footwork drills under certified fight instructors and professional conditioning coaches.",
    specs: [
      "Full-size 18-foot elevated boxing ring with high-density canvas matting",
      "12 Heavy leather punch bags (100 lbs - 150 lbs) on hydraulic shock rails",
      "Everlast double-end reflex bags and adjustable speed ball stations",
      "Wall-mounted tear-drop bags for uppercut and knee strike training",
      "Custom jump rope conditioning zone with high-rebound rubberized flooring",
      "Pro fight glove and hand wrap sanitizing UV chambers",
    ],
    engineering: [
      "Hydraulic rail shock-absorbers eliminating structural vibrations into upper floors",
      "Professional competition canvas floor with 2.5-inch closed-cell EVA foam underlayment",
      "High-output UV glove sterilizer cabinets eliminating 99.9% of bacteria in 8 minutes",
    ],
    rules: [
      "Hand wraps required under all boxing gloves on heavy bag stations",
      "Sparring inside elevated ring permitted only under certified coach supervision",
      "Wipe down punch bags with disinfectant spray post-round",
    ],
    classesAssociated: "Kickboxing Fitness, BoxFit Pro, Agility Drills",
  },
  {
    id: "locker-suites",
    name: "Executive Locker Suites & Grooming Lounge",
    category: "Locker & Grooming",
    categoryKey: "amenities",
    floor: "Lower Level • East & West",
    levelKey: "lower",
    footage: "3,500 sq ft",
    ceilingHeight: "12 Feet Polished",
    tag: "Luxury Hospitality",
    temp: "72°F • Regulated Comfort",
    currentOccupancy: 18,
    maxCapacity: 80,
    occupancyStatus: "Plentiful Space",
    gallery: [
      { label: "Rain Showers", url: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1200&auto=format&fit=crop" },
      { label: "Dyson Grooming", url: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?q=80&w=1200&auto=format&fit=crop" },
      { label: "Smart Lockers", url: "https://images.unsplash.com/photo-1590402494587-44b71d7772f6?q=80&w=1200&auto=format&fit=crop" },
    ],
    description:
      "Designed to transition seamlessly from intense athletic conditioning to executive boardrooms. Fitted with digital RFID smart lockers, private rainforest showers, and complete salon-grade grooming suites.",
    specs: [
      "160 Keyless RFID digital pin smart lockers with internal USB-C fast charging",
      "Private rainfall shower suites with Malin+Goetz botanical wash & shampoo",
      "Dyson Supersonic hair styling bars and illuminated vanity mirrors",
      "Complimentary steamed eucalyptus towel service & chilled towel coolers",
      "Centrifugal wet gear spinner dryers for rapid swimwear de-watering",
      "Full vanity kit: organic deodorant, shaving cream, combs, and hair ties",
    ],
    engineering: [
      "Continuous ozone-treated air cycling maintaining humidity below 45%",
      "Touchless sensor-activated fixtures for maximum hygiene assurance",
      "Acoustic white noise sound masking in private shower vestibules",
    ],
    rules: [
      "Lockers auto-reset at midnight; no overnight permanent gear storage",
      "Limit shower duration to 10 minutes during peak morning transition",
      "Respect member privacy: photography strictly prohibited in locker areas",
    ],
    classesAssociated: "Complimentary access for all members and daily day-pass guests",
  },
  {
    id: "fuel-bar",
    name: "Metabolic Nutrition & Fuel Bar",
    category: "Fuel & Recovery",
    categoryKey: "amenities",
    floor: "Ground Level • Main Atrium",
    levelKey: "ground",
    footage: "1,500 sq ft",
    ceilingHeight: "16 Feet Open Atrium",
    tag: "Clean Nutrition",
    temp: "70°F • Social Lounge",
    currentOccupancy: 24,
    maxCapacity: 45,
    occupancyStatus: "Vibrant Social Hub",
    gallery: [
      { label: "Protein Shakes", url: "https://images.unsplash.com/photo-1577416412292-747c6607f055?q=80&w=1200&auto=format&fit=crop" },
      { label: "Specialty Coffee", url: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?q=80&w=1200&auto=format&fit=crop" },
      { label: "Athlete Lounge", url: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1200&auto=format&fit=crop" },
    ],
    description:
      "Refuel within the metabolic anabolic window. Offering freshly blended organic smoothies, cold-pressed raw tonics, and chef-curated macro-balanced meals packaged for on-the-go athletes and remote work.",
    specs: [
      "Organic plant & 100% grass-fed whey isolate shake custom formulation bar",
      "Cold-pressed raw juice taps: celery greens, ginger-turmeric, beet endurance",
      "Artisanal specialty coffee & adaptogenic mushroom lattes (Lion's Mane, Reishi)",
      "Grab-and-go high-protein chef meal prep boxes with complete macro breakdowns",
      "Electrolyte mocktail station infused with magnesium and Himalayan pink salt",
      "High-speed fiber Wi-Fi lounge with laptop banquette seating and power outlets",
    ],
    engineering: [
      "Commercial reverse-osmosis water remineralizer producing 9.5 pH alkaline hydration",
      "Integrated fast wireless Qi chargers embedded in every quartz dining table",
      "Grab-and-go digital kiosks synced to member wristbands for frictionless billing",
    ],
    rules: [
      "Member account card charging or contactless mobile payments accepted",
      "Outside open hot food containers not permitted in active training studios",
      "Pre-order your post-workout shake at reception before your class starts",
    ],
    classesAssociated: "Open to members, athletes, and visiting public guests",
  },
];

// Highlight Ticker Items for the Top Marquee
const TICKER_HIGHLIGHTS = [
  { text: "25,000+ SQ FT ATHLETIC DECK", icon: "⚡", metric: "Olympic Standard" },
  { text: "12 ROGUE MONSTER POWER RIGS", icon: "🏋️", metric: "Heavy Lifting" },
  { text: "38°F DUAL STAINLESS STEEL COLD PLUNGE", icon: "❄️", metric: "Sub-Zero Recovery" },
  { text: "195°F FINNISH CEDAR DRY SAUNA", icon: "🔥", metric: "Hyper-Thermal" },
  { text: "16 TECHNOGYM SKILLMILL TREADMILLS", icon: "🏃", metric: "VO2 Max Suite" },
  { text: "18-FOOT ELEVATED BOXING RING", icon: "🥊", metric: "Pro Canvas" },
  { text: "105°F INFRARED REFORMER PILATES", icon: "🧘", metric: "Detox Radiant" },
  { text: "24/7 KEYLESS RFID VIP ACCESS", icon: "🔑", metric: "Unrestricted" },
  { text: "REVERSE OSMOSIS ELECTROLYTE BAR", icon: "💧", metric: "Alkaline 9.5pH" },
  { text: "DYSON SUPERSONIC GROOMING SUITES", icon: "✨", metric: "Executive Care" },
  { text: "HEPA MEDICAL AIR CYCLED EVERY 6 MIN", icon: "🍃", metric: "Clean Mountain Air" },
];

const CATEGORY_TABS = [
  { id: "all", label: "All Arenas", icon: FiCompass },
  { id: "strength", label: "Olympic Strength", icon: FaDumbbell },
  { id: "cardio", label: "Cardio Suite", icon: FaFire },
  { id: "functional", label: "Functional Turf", icon: FiZap },
  { id: "yoga", label: "Mind & Body", icon: FaSpa },
  { id: "recovery", label: "Recovery Spa", icon: FaWater },
  { id: "combat", label: "Combat Arena", icon: FaHeartbeat },
  { id: "amenities", label: "Locker & Fuel", icon: FiCoffee },
];

const FLOOR_LEVELS = [
  { id: "all", label: "All Levels", count: 8 },
  { id: "ground", label: "Ground Floor", count: 2 },
  { id: "level-1", label: "Level 1 (Main)", count: 2 },
  { id: "level-2", label: "Level 2 (Upper)", count: 2 },
  { id: "lower", label: "Lower Level (Spa & Lockers)", count: 2 },
];

export default function FacilitiesClient() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("split"); // 'split' | 'grid' | 'blueprint'
  const [activeModalZone, setActiveModalZone] = useState(null);
  const [showTourModal, setShowTourModal] = useState(false);

  // Tour Booking Form State
  const [tourForm, setTourForm] = useState({
    name: "",
    email: "",
    phone: "",
    preferredDate: "Tomorrow",
    preferredTime: "Morning (8:00 AM - 11:00 AM)",
    focusZone: "Full Club Infrastructure Walkthrough",
  });
  const [tourSubmitted, setTourSubmitted] = useState(false);

  // Close modals on ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setActiveModalZone(null);
        setShowTourModal(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Filtered Zones based on Category, Level, and Search
  const filteredZones = useMemo(() => {
    return FACILITY_ZONES.filter((zone) => {
      const matchesCategory =
        selectedCategory === "all" || zone.categoryKey === selectedCategory;

      const matchesLevel =
        selectedLevel === "all" || zone.levelKey === selectedLevel;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        zone.name.toLowerCase().includes(q) ||
        zone.category.toLowerCase().includes(q) ||
        zone.description.toLowerCase().includes(q) ||
        zone.specs.some((spec) => spec.toLowerCase().includes(q));

      return matchesCategory && matchesLevel && matchesSearch;
    });
  }, [selectedCategory, selectedLevel, searchQuery]);

  const handleTourSubmit = (e) => {
    e.preventDefault();
    setTourSubmitted(true);
  };

  const resetAllFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedLevel("all");
  };

  const handleOpenTourWithZone = (zone) => {
    if (zone && zone.name) {
      setTourForm((prev) => ({
        ...prev,
        focusZone: zone.name,
      }));
    }
    setTourSubmitted(false);
    setShowTourModal(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground py-8 sm:py-12 transition-colors duration-300">
      {/* ============================================================== */}
      {/* UNIVERSAL CONTAINER WIDTH: Strict w-11/12 mx-auto matching Nav/Footer */}
      {/* ============================================================== */}
      <div className="w-11/12 mx-auto relative z-10 space-y-8 sm:space-y-12">
        {/* 1. TOP LIVE TICKER MARQUEE */}
        <div className="relative overflow-hidden rounded-2xl border border-brand-500/20 bg-brand-900/40 dark:bg-[#121026]/75 backdrop-blur-xl shadow-xs py-2.5 px-2 mask-marquee">
          <div className="animate-marquee-ticker flex items-center gap-7 whitespace-nowrap">
            {[...TICKER_HIGHLIGHTS, ...TICKER_HIGHLIGHTS, ...TICKER_HIGHLIGHTS].map((item, idx) => (
              <div
                key={`ticker-${idx}`}
                className="inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-secondary hover:text-foreground transition-colors cursor-default"
              >
                <span className="w-6 h-6 rounded-lg bg-card-bg dark:bg-white/10 border border-brand-500/15 flex items-center justify-center text-xs shadow-2xs shrink-0">
                  {item.icon}
                </span>
                <span className="text-foreground font-black tracking-tight">{item.text}</span>
                <span className="px-2 py-0.5 rounded-full bg-active/10 border border-active/30 text-active text-[10px] font-black tracking-wide">
                  {item.metric}
                </span>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-active/40 mx-2" />
              </div>
            ))}
          </div>
        </div>

        {/* 2. HERO HEADER (GSAP ScrollTrigger Entrance & Clean Background) */}
        <FacilitiesHeroHeader
          onOpenTourModal={() => {
            setTourSubmitted(false);
            setShowTourModal(true);
          }}
        />

        {/* 3. INTERACTIVE CONTROL DECK (Search, Levels & Category Tabs) */}
        <FacilitiesFilterDeck
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedLevel={selectedLevel}
          setSelectedLevel={setSelectedLevel}
          viewMode={viewMode}
          setViewMode={setViewMode}
          categoryTabs={CATEGORY_TABS}
          floorLevels={FLOOR_LEVELS}
          totalZones={FACILITY_ZONES.length}
          filteredCount={filteredZones.length}
          facilityZones={FACILITY_ZONES}
          resetAllFilters={resetAllFilters}
        />

        {/* 4. FACILITY ZONES DISPLAY (Showcase / Cards / Blueprint Ledger) */}
        <FacilitiesGrid
          viewMode={viewMode}
          filteredZones={filteredZones}
          searchQuery={searchQuery}
          resetAllFilters={resetAllFilters}
          onOpenSpecsModal={(zone) => setActiveModalZone(zone)}
          onOpenTourModal={handleOpenTourWithZone}
        />

        {/* 5. OFFICIAL COMMERCIAL PARTNERSHIPS DUAL-LANE MARQUEE */}
        <FacilitiesBrandMarquee />

        {/* 6. REAL-TIME TRAFFIC & PEAK HOURS DENSITY GUIDE */}
        <FacilitiesPeakHours />

        {/* 7. CLUB OPERATING HOURS & HYGIENE STANDARDS */}
        <FacilitiesOperatingHours />

        {/* 8. FACILITY FAQS ACCORDION */}
        <FacilitiesFaq />

        {/* 9. VIP TOUR & MEMBERSHIP CTA BANNER */}
        <FacilitiesVipBanner
          onOpenTourModal={() => {
            setTourSubmitted(false);
            setShowTourModal(true);
          }}
        />
      </div>

      {/* ============================================================== */}
      {/* 10. INTERACTIVE ZONE SPECIFICATIONS MODAL                      */}
      {/* ============================================================== */}
      <FacilitySpecsModal
        activeZone={activeModalZone}
        onClose={() => setActiveModalZone(null)}
        onOpenTourFromSpecs={(zone) => {
          setActiveModalZone(null);
          handleOpenTourWithZone(zone);
        }}
      />

      {/* ============================================================== */}
      {/* 11. INTERACTIVE VIP TOUR BOOKING MODAL                         */}
      {/* ============================================================== */}
      <FacilityTourModal
        showTourModal={showTourModal}
        onClose={() => setShowTourModal(false)}
        tourSubmitted={tourSubmitted}
        tourForm={tourForm}
        setTourForm={setTourForm}
        handleTourSubmit={handleTourSubmit}
        facilityZones={FACILITY_ZONES}
      />
    </div>
  );
}
