"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import AnimatedSectionTitle from "@/components/common/AnimatedSectionTitle";
import {
  FiCheckCircle,
  FiClock,
  FiCompass,
  FiMapPin,
  FiShield,
  FiWifi,
  FiZap,
  FiX,
  FiMaximize2,
  FiArrowRight,
  FiAward,
  FiCheck,
  FiSearch,
  FiGrid,
  FiList,
  FiCalendar,
  FiUsers,
  FiActivity,
  FiPhone,
  FiCoffee,
  FiChevronDown,
  FiChevronUp,
  FiLayers,
  FiEye,
  FiSliders,
  FiVolume2,
  FiWind,
} from "react-icons/fi";
import {
  FaDumbbell,
  FaFire,
  FaHeartbeat,
  FaWater,
  FaSpa,
  FaShieldAlt,
  FaTemperatureHigh,
  FaTemperatureLow,
  FaCheckCircle,
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

// Highlight Ticker Items for the Top Marquee (Calm velocity, crystal clear typography)
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

// Official Commercial Brand Partners (Marquee Lane 1: Heavy Hardware)
const BRAND_PARTNERS_LANE1 = [
  {
    name: "ROGUE FITNESS",
    flag: "🇺🇸",
    origin: "USA",
    category: "Monster Rigs & Barbells",
    badge: "Official Strength Rig",
    monogram: "RG",
    color: "#ff1844",
  },
  {
    name: "ELEIKO",
    flag: "🇸🇪",
    origin: "SWEDEN",
    category: "IWF Certified Plates & Bars",
    badge: "Olympic Standard",
    monogram: "EL",
    color: "#0284c7",
  },
  {
    name: "TECHNOGYM",
    flag: "🇮🇹",
    origin: "ITALY",
    category: "Skillmill Curved Cardio",
    badge: "Biomechanics Lab",
    monogram: "TG",
    color: "#f59e0b",
  },
  {
    name: "CONCEPT2",
    flag: "🇺🇸",
    origin: "USA",
    category: "RowErg & SkiErg PM5",
    badge: "Ergometer Fleet",
    monogram: "C2",
    color: "#10b981",
  },
  {
    name: "BALANCED BODY",
    flag: "🇺🇸",
    origin: "USA",
    category: "Allegro 2 Reformers",
    badge: "Pilates Apparatus",
    monogram: "BB",
    color: "#8b5cf6",
  },
];

// Official Commercial Brand Partners (Marquee Lane 2: Recovery & Technology)
const BRAND_PARTNERS_LANE2 = [
  {
    name: "NORMATEC",
    flag: "🇺🇸",
    origin: "USA",
    category: "Pneumatic Compression Boots",
    badge: "Active Recovery",
    monogram: "NT",
    color: "#ec4899",
  },
  {
    name: "EVERLAST PRO",
    flag: "🇺🇸",
    origin: "USA",
    category: "Championship Boxing Rings",
    badge: "Combat Arena",
    monogram: "EV",
    color: "#ef4444",
  },
  {
    name: "DYSON PRO",
    flag: "🇬🇧",
    origin: "UK",
    category: "Supersonic Grooming Suites",
    badge: "Luxury Amenity",
    monogram: "DY",
    color: "#a855f7",
  },
  {
    name: "MYZONE",
    flag: "🇬🇧",
    origin: "UK",
    category: "Live Telemetry Projections",
    badge: "Biometric Heart Sync",
    monogram: "MZ",
    color: "#f97316",
  },
  {
    name: "TORQUE FITNESS",
    flag: "🇺🇸",
    origin: "USA",
    category: "Tank Magnetic Prowler Sleds",
    badge: "Conditioning Turf",
    monogram: "TF",
    color: "#14b8a6",
  },
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

const PEAK_HOURS = [
  { time: "5:00 AM – 7:00 AM", label: "Early Dawn", density: "Moderate (40%)", bar: "w-2/5 bg-emerald-500", note: "Serene & focused" },
  { time: "7:00 AM – 9:00 AM", label: "Morning Peak", density: "High Traffic (85%)", bar: "w-4/5 bg-active", note: "Fast-paced business flow" },
  { time: "9:00 AM – 12:00 PM", label: "Midday Window", density: "Optimal Open Floor (30%)", bar: "w-1/3 bg-emerald-500", note: "Plentiful squat racks" },
  { time: "12:00 PM – 2:00 PM", label: "Lunch Rush", density: "Moderate Activity (55%)", bar: "w-7/12 bg-amber-500", note: "Quick HIIT & steam" },
  { time: "2:00 PM – 5:00 PM", label: "Afternoon Serene", density: "Low Density (25%)", bar: "w-1/4 bg-emerald-500", note: "Ultra quiet & open" },
  { time: "5:00 PM – 8:00 PM", label: "Evening Rush", density: "Peak Session (90%)", bar: "w-11/12 bg-active", note: "High energy music & buzz" },
  { time: "8:00 PM – 11:00 PM", label: "Night Focus", density: "Quiet Hours (35%)", bar: "w-1/3 bg-emerald-500", note: "Optimal cold plunge flow" },
];

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
    a: "Pro and VIP members receive 2 complimentary guest passes each month. First-time visitors can also book a free VIP facility walkthrough and trial session by using the 'Book Club Tour' button on this page.",
  },
  {
    q: "Is dedicated parking and EV charging available on site?",
    a: "We provide two subterranean parking decks with 180 reserved spaces for members, including 12 complimentary 50kW Level-2 EV charging bays with a 2-hour workout grace period.",
  },
];

export default function FacilitiesClient() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("split"); // 'split' | 'grid' | 'blueprint'
  const [activeModalZone, setActiveModalZone] = useState(null);
  const [showTourModal, setShowTourModal] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  
  // Active photo angle index per zone ID for multi-angle thumbnail preview
  const [activeGalleryIndices, setActiveGalleryIndices] = useState({});

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

  // Handle Tour Submit
  const handleTourSubmit = (e) => {
    e.preventDefault();
    setTourSubmitted(true);
  };

  const handleThumbnailSelect = (zoneId, index, e) => {
    e.stopPropagation();
    setActiveGalleryIndices((prev) => ({
      ...prev,
      [zoneId]: index,
    }));
  };

  return (
    <div className="min-h-screen bg-background text-foreground pt-3 pb-12 sm:pt-4 sm:pb-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-8 sm:space-y-12">
        
        {/* ============================================================== */}
        {/* 1. TOP LIVE TICKER MARQUEE (CALM VELOCITY, HIGH CONTRAST)      */}
        {/* ============================================================== */}
        <div className="relative overflow-hidden rounded-xl border border-slate-200/90 dark:border-brand-500/25 bg-slate-50/90 dark:bg-[#121026]/90 backdrop-blur-md shadow-xs py-2.5 px-2 mask-marquee">
          <div className="animate-marquee-ticker flex items-center gap-7 whitespace-nowrap">
            {[...TICKER_HIGHLIGHTS, ...TICKER_HIGHLIGHTS, ...TICKER_HIGHLIGHTS].map((item, idx) => (
              <div
                key={`ticker-${idx}`}
                className="inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-secondary hover:text-foreground transition-colors cursor-default"
              >
                <span className="w-6 h-6 rounded-md bg-white dark:bg-white/10 border border-slate-200/90 dark:border-white/10 flex items-center justify-center text-xs shadow-2xs shrink-0">
                  {item.icon}
                </span>
                <span className="text-slate-900 dark:text-foreground font-black tracking-tight">{item.text}</span>
                <span className="px-2 py-0.5 rounded-full bg-active/10 dark:bg-active/20 border border-active/30 text-active text-[10px] font-extrabold tracking-wide">
                  {item.metric}
                </span>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-active/40 mx-2" />
              </div>
            ))}
          </div>
        </div>

        {/* ============================================================== */}
        {/* 2. HERO HEADER WITH EXIT ANIMATION                             */}
        {/* ============================================================== */}
        <div className="text-center space-y-3.5 max-w-2xl mx-auto relative pt-1 sm:pt-2">
          <AnimatedSectionTitle
            kicker="FLEXPULSE ATHLETIC CAMPUS • 25,000 SQ FT"
            title="Built for Elite Performance"
            highlightText="Performance"
            subtitle="Competition-grade powerlifting decks, curved metabolic turf, infrared hot studios, and contrast hydrotherapy recovery spas engineered for serious athletes."
            align="center"
            className="mb-1"
          />

          {/* Quick Action Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 pt-1">
            <button
              onClick={() => {
                setTourSubmitted(false);
                setShowTourModal(true);
              }}
              className="px-4 py-2 rounded-xl bg-active text-btn-text text-xs sm:text-sm font-bold shadow-sm hover:opacity-90 transition-all flex items-center gap-2 cursor-pointer"
            >
              <FiCalendar size={14} /> Schedule VIP Walkthrough
            </button>
            <Link
              href="/all-classes"
              className="px-4 py-2 rounded-xl border border-slate-300 dark:border-brand-500/25 bg-white dark:bg-background hover:bg-slate-100 dark:hover:bg-brand-500/10 text-xs sm:text-sm font-semibold text-foreground transition-all flex items-center gap-1.5"
            >
              <span>Explore Studio Classes</span>
              <FiArrowRight size={13} />
            </Link>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 3. INFRASTRUCTURE STATS BAR                                   */}
        {/* ============================================================== */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto">
          <div className="p-4 rounded-2xl bg-white dark:bg-[#121026]/60 border border-slate-200 dark:border-brand-500/20 text-center backdrop-blur-md shadow-xs hover:border-active/40 transition-colors">
            <span className="font-['Outfit'] text-2xl sm:text-3xl font-black text-foreground block">
              25,000+
            </span>
            <span className="text-[11px] font-semibold text-secondary uppercase tracking-wider block mt-0.5">
              Square Feet Arena
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-[#121026]/60 border border-slate-200 dark:border-brand-500/20 text-center backdrop-blur-md shadow-xs hover:border-active/40 transition-colors">
            <span className="font-['Outfit'] text-2xl sm:text-3xl font-black text-active block">
              12 Racks
            </span>
            <span className="text-[11px] font-semibold text-secondary uppercase tracking-wider block mt-0.5">
              Rogue Monster Decks
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-[#121026]/60 border border-slate-200 dark:border-brand-500/20 text-center backdrop-blur-md shadow-xs hover:border-active/40 transition-colors">
            <span className="font-['Outfit'] text-2xl sm:text-3xl font-black text-foreground block">
              38°F / 195°F
            </span>
            <span className="text-[11px] font-semibold text-secondary uppercase tracking-wider block mt-0.5">
              Contrast Thermal Spa
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-[#121026]/60 border border-slate-200 dark:border-brand-500/20 text-center backdrop-blur-md shadow-xs hover:border-active/40 transition-colors">
            <span className="font-['Outfit'] text-2xl sm:text-3xl font-black text-emerald-500 block">
              24/7 Access
            </span>
            <span className="text-[11px] font-semibold text-secondary uppercase tracking-wider block mt-0.5">
              RFID Keyless Entry
            </span>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 4. INTERACTIVE CONTROL DECK: SEARCH, LEVEL & VIEW MODE         */}
        {/* ============================================================== */}
        <div className="space-y-3.5 max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {/* Real-time Search Input */}
            <div className="relative flex-1">
              <FiSearch
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-secondary pointer-events-none"
              />
              <input
                type="text"
                placeholder="Search equipment or arena (e.g., Eleiko, Cold Plunge, Turf, Sauna, Rogue)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 dark:border-brand-500/20 bg-white dark:bg-[#121026]/60 text-xs sm:text-sm text-foreground placeholder:text-secondary/70 focus:outline-none focus:border-active transition-colors shadow-xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary hover:text-foreground text-xs cursor-pointer"
                >
                  <FiX size={14} />
                </button>
              )}
            </div>

            {/* View Mode Toggle with Layout Animation */}
            <LayoutGroup id="facilitiesViewModeGroup">
              <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100 dark:bg-[#121026]/70 border border-slate-200 dark:border-brand-500/20 self-end sm:self-auto shrink-0">
                {[
                  { id: "split", label: "Showcase (Left/Right)", icon: FiLayers, title: "Alternating Left / Right Showcase" },
                  { id: "grid", label: "Cards", icon: FiGrid, title: "Card Grid View" },
                  { id: "blueprint", label: "Specs Ledger", icon: FiList, title: "Blueprint Spec Ledger View" },
                ].map((item) => {
                  const Icon = item.icon;
                  const isActive = viewMode === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setViewMode(item.id)}
                      className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                        isActive ? "text-btn-text" : "text-secondary hover:text-foreground"
                      }`}
                      title={item.title}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="activeFacilitiesViewModePill"
                          className="absolute inset-0 rounded-lg bg-active shadow-xs"
                          transition={{ type: "spring", stiffness: 450, damping: 35 }}
                        />
                      )}
                      <Icon size={13} className="relative z-10" />
                      <span className="relative z-10">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </LayoutGroup>
          </div>

          {/* Level Filter Pills with Layout Animation */}
          <LayoutGroup id="facilitiesLevelGroup">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
              <span className="text-secondary font-bold text-[11px] uppercase tracking-wider mr-1 shrink-0 flex items-center gap-1">
                <FiMapPin size={12} /> Campus Level:
              </span>
              {FLOOR_LEVELS.map((lvl) => {
                const isSelected = selectedLevel === lvl.id;
                return (
                  <button
                    key={lvl.id}
                    onClick={() => setSelectedLevel(lvl.id)}
                    className={`relative px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                      isSelected
                        ? "text-white font-bold"
                        : "bg-white dark:bg-[#121026]/50 border border-slate-200/90 dark:border-brand-500/15 text-slate-700 dark:text-secondary hover:text-foreground"
                    }`}
                  >
                    {isSelected && (
                      <motion.span
                        layoutId="activeFacilitiesLevelPill"
                        className="absolute inset-0 rounded-lg bg-active shadow-xs"
                        transition={{ type: "spring", stiffness: 450, damping: 35 }}
                      />
                    )}
                    <span className="relative z-10">{lvl.label} ({lvl.count})</span>
                  </button>
                );
              })}
            </div>
          </LayoutGroup>

          {/* Arena Category Tabs Bar with Layout Animation */}
          <LayoutGroup id="facilitiesCategoryGroup">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {CATEGORY_TABS.map((tab) => {
                const Icon = tab.icon;
                const isSelected = selectedCategory === tab.id;
                const count =
                  tab.id === "all"
                    ? FACILITY_ZONES.length
                    : FACILITY_ZONES.filter((z) => z.categoryKey === tab.id).length;

                return (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedCategory(tab.id)}
                    className={`relative flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                      isSelected
                        ? "text-btn-text font-bold"
                        : "bg-white dark:bg-[#121026]/70 border border-slate-200 dark:border-brand-500/20 text-slate-700 dark:text-secondary hover:text-foreground hover:bg-slate-100/80 dark:hover:bg-brand-500/10"
                    }`}
                  >
                    {isSelected && (
                      <motion.span
                        layoutId="activeFacilitiesCategoryPill"
                        className="absolute inset-0 rounded-xl bg-active shadow-sm"
                        transition={{ type: "spring", stiffness: 450, damping: 35 }}
                      />
                    )}
                    <Icon size={13} className={`relative z-10 ${isSelected ? "text-white" : "text-active"}`} />
                    <span className="relative z-10">{tab.label}</span>
                    <span
                      className={`relative z-10 px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                        isSelected
                          ? "bg-black/20 text-white"
                          : "bg-slate-100 dark:bg-brand-500/15 text-secondary"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </LayoutGroup>
        </div>

        {/* ============================================================== */}
        {/* 5. FACILITY ZONES DISPLAY: ALTERNATING LEFT/RIGHT SHOWCASE     */}
        {/* ============================================================== */}
        {filteredZones.length === 0 ? (
          <div className="text-center py-16 px-4 bg-white dark:bg-[#121026]/40 rounded-2xl border border-slate-200 dark:border-brand-500/20 space-y-3">
            <FiSearch size={32} className="mx-auto text-secondary opacity-60" />
            <h3 className="font-['Outfit'] text-lg font-bold text-foreground">
              No matching facility zones found
            </h3>
            <p className="text-xs text-secondary max-w-sm mx-auto">
              We couldn&apos;t find any arena matching &quot;{searchQuery}&quot;. Try adjusting your search query or reset filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
                setSelectedLevel("all");
              }}
              className="px-4 py-2 rounded-xl bg-active text-btn-text text-xs font-bold shadow-sm cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : viewMode === "split" ? (
          /* ============================================================ */
          /* ALTERNATING LEFT/RIGHT LUXURY EDITORIAL ROWS                 */
          /* ============================================================ */
          <div className="space-y-8 sm:space-y-12">
            {filteredZones.map((zone, index) => {
              const isImageLeft = index % 2 === 0;
              const occupancyPct = Math.round(
                (zone.currentOccupancy / zone.maxCapacity) * 100
              );
              const activeGalleryIdx = activeGalleryIndices[zone.id] || 0;
              const currentImageUrl = zone.gallery[activeGalleryIdx]?.url || zone.image;

              return (
                <div
                  key={zone.id}
                  className="rounded-3xl border border-slate-200/90 dark:border-brand-500/20 hover:border-active/40 bg-white dark:bg-[#121026]/75 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <div
                    className={`flex flex-col ${
                      isImageLeft ? "lg:flex-row" : "lg:flex-row-reverse"
                    } items-stretch`}
                  >
                    {/* ---------------- IMAGE CONTAINER ---------------- */}
                    <div className="lg:w-1/2 relative min-h-[320px] sm:min-h-[380px] lg:min-h-[460px] overflow-hidden group">
                      <Image
                        src={currentImageUrl}
                        alt={zone.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                      {/* Artistic overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/20" />

                      {/* Top floating badges */}
                      <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2">
                        <span className="px-3 py-1 rounded-full bg-active text-btn-text text-[11px] font-black uppercase tracking-wider shadow-md">
                          {zone.tag}
                        </span>
                        <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-white text-[11px] font-bold">
                          {zone.temp}
                        </span>
                      </div>

                      {/* Photo angle thumbnail selector tabs */}
                      <div className="absolute top-4 right-4 flex items-center gap-1.5 z-10">
                        {zone.gallery.map((view, vIdx) => (
                          <button
                            key={vIdx}
                            onClick={(e) => handleThumbnailSelect(zone.id, vIdx, e)}
                            className={`px-2 py-1 rounded-lg text-[10px] font-bold backdrop-blur-md transition-all cursor-pointer ${
                              activeGalleryIdx === vIdx
                                ? "bg-active text-white border border-active shadow"
                                : "bg-black/60 text-white/80 border border-white/10 hover:bg-black/80 hover:text-white"
                            }`}
                          >
                            {view.label}
                          </button>
                        ))}
                      </div>

                      {/* Bottom floating location & dimension badges */}
                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                        <div className="flex items-center gap-2 text-xs font-semibold bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10">
                          <FiMapPin size={13} className="text-active" />
                          <span>{zone.floor}</span>
                        </div>
                        <div className="text-xs font-bold font-mono bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10">
                          {zone.footage} • {zone.ceilingHeight}
                        </div>
                      </div>

                      {/* Hover action button overlay */}
                      <button
                        onClick={() => setActiveModalZone(zone)}
                        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-2xs cursor-pointer"
                      >
                        <span className="px-4 py-2 rounded-xl bg-white/90 text-black font-bold text-xs shadow-lg flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                          <FiEye size={14} /> View Arena Specifications
                        </span>
                      </button>
                    </div>

                    {/* ---------------- CONTENT CONTAINER ---------------- */}
                    <div className="lg:w-1/2 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6">
                      <div className="space-y-4">
                        {/* Category & Occupancy Header */}
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-black uppercase tracking-wider text-active">
                            {zone.category}
                          </span>

                          <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-brand-500/10 border border-slate-200 dark:border-brand-500/20 text-[11px] font-semibold text-secondary">
                            <span
                              className={`w-2 h-2 rounded-full ${
                                occupancyPct > 75
                                  ? "bg-active"
                                  : occupancyPct > 45
                                  ? "bg-amber-500"
                                  : "bg-emerald-500"
                              } animate-pulse`}
                            />
                            <span>
                              {zone.currentOccupancy}/{zone.maxCapacity} ({occupancyPct}%)
                            </span>
                          </div>
                        </div>

                        {/* Arena Name */}
                        <h2 className="font-['Outfit'] text-2xl sm:text-3xl font-black text-slate-900 dark:text-foreground tracking-tight leading-snug">
                          {zone.name}
                        </h2>

                        {/* Description */}
                        <p className="text-xs sm:text-sm text-secondary leading-relaxed">
                          {zone.description}
                        </p>

                        {/* Live Capacity Bar */}
                        <div className="space-y-1 pt-1">
                          <div className="flex items-center justify-between text-[11px] text-secondary">
                            <span className="font-semibold text-slate-800 dark:text-foreground">
                              Arena Capacity Telemetry
                            </span>
                            <span>{zone.occupancyStatus}</span>
                          </div>
                          <div className="w-full h-2 bg-slate-200 dark:bg-brand-500/20 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all duration-500 ${
                                occupancyPct > 75
                                  ? "bg-active"
                                  : occupancyPct > 45
                                  ? "bg-amber-500"
                                  : "bg-emerald-500"
                              }`}
                              style={{ width: `${occupancyPct}%` }}
                            />
                          </div>
                        </div>

                        {/* Certified Hardware Specs Highlights (4 items) */}
                        <div className="space-y-2 pt-2">
                          <span className="text-[11px] font-bold text-slate-800 dark:text-foreground uppercase tracking-wider block">
                            Key Certified Hardware Roster
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-foreground">
                            {zone.specs.slice(0, 4).map((spec, idx) => (
                              <div
                                key={idx}
                                className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-[#121026]/50 border border-slate-200/80 dark:border-brand-500/15"
                              >
                                <FiCheckCircle
                                  size={13}
                                  className="text-active shrink-0 mt-0.5"
                                />
                                <span className="line-clamp-2 leading-snug text-slate-700 dark:text-slate-200">
                                  {spec}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Engineering Highlight */}
                        {zone.engineering && zone.engineering[0] && (
                          <div className="text-[11px] text-secondary flex items-center gap-1.5 p-2 rounded-lg bg-slate-100/70 dark:bg-brand-500/5 border border-slate-200/80 dark:border-brand-500/15">
                            <FiWind size={12} className="text-active shrink-0" />
                            <span className="truncate">
                              <strong>Engineering:</strong> {zone.engineering[0]}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Action Bar */}
                      <div className="pt-4 border-t border-slate-200 dark:border-brand-500/15 flex flex-wrap items-center gap-3">
                        <button
                          onClick={() => setActiveModalZone(zone)}
                          className="px-4 py-2.5 rounded-xl bg-active text-btn-text text-xs font-bold hover:opacity-90 shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
                        >
                          <FiMaximize2 size={13} /> Full Technical Specs
                        </button>

                        <button
                          onClick={() => {
                            setTourForm((prev) => ({
                              ...prev,
                              focusZone: zone.name,
                            }));
                            setTourSubmitted(false);
                            setShowTourModal(true);
                          }}
                          className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-brand-500/25 bg-white dark:bg-[#121026]/50 hover:border-active text-xs font-bold text-foreground transition-all flex items-center gap-1.5 cursor-pointer"
                        >
                          <FiCalendar size={13} className="text-active" /> Book Arena Tour
                        </button>

                        <Link
                          href="/all-classes"
                          className="px-3.5 py-2.5 rounded-xl text-xs font-semibold text-secondary hover:text-foreground transition-colors ml-auto flex items-center gap-1"
                        >
                          <span>Classes</span>
                          <FiArrowRight size={12} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : viewMode === "grid" ? (
          /* ============================================================ */
          /* COMPACT 3-COLUMN CARD GRID VIEW                              */
          /* ============================================================ */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {filteredZones.map((zone) => {
              const occupancyPct = Math.round(
                (zone.currentOccupancy / zone.maxCapacity) * 100
              );

              return (
                <div
                  key={zone.id}
                  className="group bg-white dark:bg-[#121026]/75 border border-slate-200 dark:border-brand-500/20 hover:border-active/50 rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  {/* Image Banner */}
                  <div className="relative h-60 w-full overflow-hidden bg-brand-800/30">
                    <Image
                      src={zone.gallery[0]?.url || zone.image}
                      alt={zone.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      <span className="px-2.5 py-1 rounded-full bg-active text-btn-text text-[10px] font-black uppercase tracking-wider shadow">
                        {zone.tag}
                      </span>
                    </div>

                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-white text-[10px] font-bold">
                      {zone.temp}
                    </div>

                    {/* Name & Floor on top of image */}
                    <div className="absolute bottom-3 left-3.5 right-3.5 text-white">
                      <div className="flex items-center justify-between text-[11px] font-bold text-active uppercase tracking-wider mb-0.5">
                        <span>{zone.category}</span>
                        <span className="text-white/80 font-medium normal-case">
                          {zone.footage}
                        </span>
                      </div>
                      <h3 className="font-['Outfit'] text-lg sm:text-xl font-bold tracking-tight drop-shadow line-clamp-1">
                        {zone.name}
                      </h3>
                      <p className="text-[11px] text-white/70 flex items-center gap-1 mt-0.5">
                        <FiMapPin size={11} className="text-active" /> {zone.floor}
                      </p>
                    </div>
                  </div>

                  {/* Card Details */}
                  <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-3.5">
                      <p className="text-xs text-secondary leading-relaxed line-clamp-2">
                        {zone.description}
                      </p>

                      {/* Live Capacity Meter */}
                      <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#121026]/50 border border-slate-200/80 dark:border-brand-500/15 space-y-1.5">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="font-bold text-slate-800 dark:text-foreground flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            Live Capacity
                          </span>
                          <span className="text-secondary font-medium">
                            {zone.currentOccupancy} / {zone.maxCapacity} ({occupancyPct}%)
                          </span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-200 dark:bg-brand-500/20 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              occupancyPct > 75
                                ? "bg-active"
                                : occupancyPct > 45
                                ? "bg-amber-500"
                                : "bg-emerald-500"
                            }`}
                            style={{ width: `${occupancyPct}%` }}
                          />
                        </div>
                        <div className="text-[10px] text-secondary font-medium text-right">
                          {zone.occupancyStatus}
                        </div>
                      </div>

                      {/* Equipment Highlights (first 3) */}
                      <div className="space-y-1.5">
                        <span className="text-[10px] font-bold text-slate-800 dark:text-secondary uppercase tracking-wider block">
                          Featured Certified Equipment
                        </span>
                        <ul className="space-y-1 text-xs text-slate-700 dark:text-foreground">
                          {zone.specs.slice(0, 3).map((spec, idx) => (
                            <li key={idx} className="flex items-center gap-2 truncate">
                              <FiCheck className="text-active shrink-0" size={13} />
                              <span className="truncate">{spec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Action Bar */}
                    <div className="pt-3.5 border-t border-slate-200 dark:border-brand-500/15 flex items-center justify-between gap-2.5">
                      <button
                        onClick={() => setActiveModalZone(zone)}
                        className="flex-1 py-2.5 rounded-xl bg-active text-btn-text text-xs font-bold hover:opacity-90 shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <FiMaximize2 size={13} /> Full Specs & Rules
                      </button>

                      <Link
                        href="/all-classes"
                        className="px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-brand-500/25 bg-white dark:bg-background hover:bg-slate-100 dark:hover:bg-brand-500/10 text-xs font-semibold text-foreground transition-colors shrink-0"
                      >
                        Classes
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* ============================================================ */
          /* BLUEPRINT SPEC LEDGER TABLE VIEW                             */
          /* ============================================================ */
          <div className="rounded-2xl border border-slate-200 dark:border-brand-500/20 bg-white dark:bg-[#121026]/75 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-brand-500/20 bg-slate-50 dark:bg-[#121026]/90 text-[11px] font-bold uppercase tracking-wider text-secondary">
                    <th className="py-3.5 px-4">Arena Name & Zone</th>
                    <th className="py-3.5 px-4">Floor Level</th>
                    <th className="py-3.5 px-4">Floor Area</th>
                    <th className="py-3.5 px-4">Climate Control</th>
                    <th className="py-3.5 px-4">Live Occupancy</th>
                    <th className="py-3.5 px-4">Top Equipment</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-brand-500/15 text-foreground">
                  {filteredZones.map((zone) => {
                    const pct = Math.round(
                      (zone.currentOccupancy / zone.maxCapacity) * 100
                    );
                    return (
                      <tr
                        key={zone.id}
                        className="hover:bg-slate-50 dark:hover:bg-brand-500/5 transition-colors"
                      >
                        <td className="py-4 px-4">
                          <div className="font-bold text-sm text-foreground">
                            {zone.name}
                          </div>
                          <span className="text-[10px] font-semibold text-active uppercase tracking-wider">
                            {zone.category}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-secondary whitespace-nowrap">
                          {zone.floor}
                        </td>
                        <td className="py-4 px-4 font-mono font-semibold whitespace-nowrap">
                          {zone.footage}
                        </td>
                        <td className="py-4 px-4 text-secondary whitespace-nowrap">
                          {zone.temp}
                        </td>
                        <td className="py-4 px-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-2 bg-slate-200 dark:bg-brand-500/20 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full ${
                                  pct > 75
                                    ? "bg-active"
                                    : pct > 45
                                    ? "bg-amber-500"
                                    : "bg-emerald-500"
                                }`}
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                            <span className="font-medium text-[11px] text-secondary">
                              {zone.currentOccupancy}/{zone.maxCapacity}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-secondary max-w-xs truncate">
                          {zone.specs[0]}
                        </td>
                        <td className="py-4 px-4 text-right whitespace-nowrap">
                          <button
                            onClick={() => setActiveModalZone(zone)}
                            className="px-3 py-1.5 rounded-lg bg-active text-btn-text font-bold text-xs hover:opacity-90 transition-opacity cursor-pointer inline-flex items-center gap-1"
                          >
                            <FiMaximize2 size={12} /> Specs
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* 6. OFFICIAL COMMERCIAL PARTNERSHIPS DUAL-LANE MARQUEE          */}
        {/* ============================================================== */}
        <div className="space-y-5 pt-2">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-active/30 bg-active/10 text-active text-[11px] font-bold uppercase tracking-wider">
              <FiAward size={14} />
              <span>Certified Equipment Heritage</span>
            </div>
            <h2 className="font-['Outfit'] text-2xl sm:text-3xl font-black text-foreground tracking-tight">
              Official Commercial Partnerships
            </h2>
            <p className="text-xs sm:text-sm text-secondary leading-relaxed">
              We exclusively commission competition-sanctioned hardware engineered by the globe&apos;s most prestigious athletic and biomedical manufacturers.
            </p>
          </div>

          <div className="space-y-3.5">
            {/* Lane 1: Heavy Hardware (Forward Scrolling Left) */}
            <div className="relative overflow-hidden rounded-2xl border border-slate-200 dark:border-brand-500/20 bg-white dark:bg-[#121026]/60 backdrop-blur-md p-3.5 mask-marquee shadow-xs">
              <div className="animate-marquee-slow flex items-center gap-5 whitespace-nowrap">
                {[...BRAND_PARTNERS_LANE1, ...BRAND_PARTNERS_LANE1, ...BRAND_PARTNERS_LANE1].map((brand, idx) => (
                  <div
                    key={`partner-lane1-${idx}`}
                    className="inline-flex items-center gap-4 px-5 py-3 rounded-2xl border border-slate-200/90 dark:border-brand-500/20 bg-slate-50 dark:bg-[#121026]/90 hover:border-active/60 transition-all duration-300 shadow-2xs group cursor-default"
                  >
                    {/* Brand Monogram Badge */}
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm tracking-wider shadow-inner text-white shrink-0 group-hover:scale-105 transition-transform"
                      style={{ backgroundColor: brand.color }}
                    >
                      {brand.monogram}
                    </div>

                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-['Outfit'] font-black text-sm text-foreground group-hover:text-active transition-colors">
                          {brand.name}
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-slate-200/80 dark:bg-brand-500/15 text-slate-700 dark:text-secondary text-[10px] font-bold">
                          {brand.flag} {brand.origin}
                        </span>
                      </div>
                      <div className="text-[11px] text-secondary font-medium">
                        {brand.category}
                      </div>
                      <div className="text-[10px] text-active font-semibold flex items-center gap-1">
                        <FaCheckCircle size={10} /> {brand.badge}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Lane 2: Recovery & Technology (Reverse Scrolling Right) */}
            <div className="relative overflow-hidden rounded-2xl border border-slate-200 dark:border-brand-500/20 bg-white dark:bg-[#121026]/60 backdrop-blur-md p-3.5 mask-marquee shadow-xs">
              <div className="animate-marquee-reverse-slow flex items-center gap-5 whitespace-nowrap">
                {[...BRAND_PARTNERS_LANE2, ...BRAND_PARTNERS_LANE2, ...BRAND_PARTNERS_LANE2].map((brand, idx) => (
                  <div
                    key={`partner-lane2-${idx}`}
                    className="inline-flex items-center gap-4 px-5 py-3 rounded-2xl border border-slate-200/90 dark:border-brand-500/20 bg-slate-50 dark:bg-[#121026]/90 hover:border-active/60 transition-all duration-300 shadow-2xs group cursor-default"
                  >
                    {/* Brand Monogram Badge */}
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm tracking-wider shadow-inner text-white shrink-0 group-hover:scale-105 transition-transform"
                      style={{ backgroundColor: brand.color }}
                    >
                      {brand.monogram}
                    </div>

                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-['Outfit'] font-black text-sm text-foreground group-hover:text-active transition-colors">
                          {brand.name}
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-slate-200/80 dark:bg-brand-500/15 text-slate-700 dark:text-secondary text-[10px] font-bold">
                          {brand.flag} {brand.origin}
                        </span>
                      </div>
                      <div className="text-[11px] text-secondary font-medium">
                        {brand.category}
                      </div>
                      <div className="text-[10px] text-active font-semibold flex items-center gap-1">
                        <FaCheckCircle size={10} /> {brand.badge}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 7. LIVE TRAFFIC & PEAK HOURS DENSITY GUIDE                     */}
        {/* ============================================================== */}
        <div className="rounded-3xl bg-white dark:bg-[#121026]/70 border border-slate-200 dark:border-brand-500/20 p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-active flex items-center gap-1.5">
                <FiActivity size={14} /> Real-Time Traffic Telemetry
              </span>
              <h2 className="font-['Outfit'] text-xl sm:text-2xl font-bold text-foreground">
                Club Crowd Density & Peak Hours
              </h2>
              <p className="text-xs text-secondary">
                Plan your workouts to match your preferred energy level: quiet & open or peak buzz.
              </p>
            </div>

            <div className="flex items-center gap-3 text-xs text-secondary self-start sm:self-auto">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span>Low / Calm</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <span>Moderate</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-active" />
                <span>Peak Rush</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3">
            {PEAK_HOURS.map((slot, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#121026]/90 border border-slate-200/80 dark:border-brand-500/15 space-y-2 text-center"
              >
                <span className="text-[11px] font-bold text-foreground block">
                  {slot.time}
                </span>
                <span className="text-[10px] font-semibold text-secondary uppercase tracking-wider block">
                  {slot.label}
                </span>
                <div className="w-full h-1.5 bg-slate-200 dark:bg-brand-500/20 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${slot.bar}`} />
                </div>
                <span className="text-[10px] text-secondary font-medium block">
                  {slot.density}
                </span>
                <span className="text-[9px] text-secondary/70 block italic">
                  {slot.note}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ============================================================== */}
        {/* 8. OPERATING HOURS & STANDARDS                                 */}
        {/* ============================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-[#121026]/70 border border-slate-200 dark:border-brand-500/20 space-y-3 backdrop-blur-md shadow-xs">
            <div className="flex items-center gap-2 text-active font-bold text-sm">
              <FiClock size={16} /> Club Operating Hours
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between pb-1.5 border-b border-slate-100 dark:border-brand-500/15">
                <span className="text-secondary font-medium">Monday – Friday</span>
                <span className="font-bold text-foreground">05:00 AM – 11:00 PM</span>
              </div>
              <div className="flex justify-between pb-1.5 border-b border-slate-100 dark:border-brand-500/15">
                <span className="text-secondary font-medium">Saturday & Sunday</span>
                <span className="font-bold text-foreground">07:00 AM – 09:00 PM</span>
              </div>
              <div className="flex justify-between pt-0.5">
                <span className="text-secondary font-medium">Pro & VIP Members</span>
                <span className="font-bold text-active">24/7 Keycard Access</span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-[#121026]/70 border border-slate-200 dark:border-brand-500/20 space-y-3 backdrop-blur-md shadow-xs">
            <div className="flex items-center gap-2 text-active font-bold text-sm">
              <FiShield size={16} /> Hygiene & Sanitization
            </div>
            <p className="text-xs text-secondary leading-relaxed">
              Medical-grade UV-C sterilization runs hourly in locker suites. Touchless disinfectant stations, antibacterial wipes, and chalk-cleaner spray are stationed every 10 meters on the gym floor.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-[#121026]/70 border border-slate-200 dark:border-brand-500/20 space-y-3 backdrop-blur-md shadow-xs">
            <div className="flex items-center gap-2 text-active font-bold text-sm">
              <FiAward size={16} /> Mechanical Calibration
            </div>
            <p className="text-xs text-secondary leading-relaxed">
              Every barbell, cable pulley station, and Concept2 ergometer undergoes bi-weekly mechanical calibration by certified equipment technicians to guarantee peak performance and lifting safety.
            </p>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 9. FACILITY FAQS ACCORDION                                     */}
        {/* ============================================================== */}
        <div className="rounded-3xl bg-white dark:bg-[#121026]/70 border border-slate-200 dark:border-brand-500/20 p-6 sm:p-8 space-y-5 shadow-xs">
          <div className="text-center space-y-1 max-w-xl mx-auto">
            <span className="text-[11px] font-bold uppercase tracking-wider text-active">
              Frequently Asked Questions
            </span>
            <h3 className="font-['Outfit'] text-xl sm:text-2xl font-bold text-foreground">
              Facility Access & Policies
            </h3>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {FAQS.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-slate-200 dark:border-brand-500/15 bg-slate-50 dark:bg-[#121026]/60 overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full py-3.5 px-4 text-left flex items-center justify-between gap-3 text-xs sm:text-sm font-bold text-foreground hover:text-active transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <FiChevronUp size={16} className="text-active shrink-0" />
                    ) : (
                      <FiChevronDown size={16} className="text-secondary shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-3.5 text-xs text-secondary leading-relaxed border-t border-slate-200 dark:border-brand-500/10 pt-2.5">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ============================================================== */}
        {/* 10. TOUR & MEMBERSHIP CTA BANNER                               */}
        {/* ============================================================== */}
        <div className="rounded-3xl bg-white dark:bg-[#121026]/60 border border-slate-200 dark:border-brand-500/20 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-5 shadow-sm">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-[11px] font-bold uppercase tracking-wider text-active">
              Tour & Guest Passes
            </span>
            <h2 className="font-['Outfit'] text-xl sm:text-2xl font-bold text-foreground">
              Experience FlexPulse in Person
            </h2>
            <p className="text-xs sm:text-sm text-secondary max-w-xl">
              Book a complimentary facility walk-through and trial workout session with one of our master trainers today.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <Link
              href="/pricing"
              className="px-5 py-2.5 rounded-xl bg-active text-btn-text font-bold text-xs sm:text-sm shadow-sm hover:opacity-90 transition-all"
            >
              View Memberships
            </Link>
            <button
              onClick={() => {
                setTourSubmitted(false);
                setShowTourModal(true);
              }}
              className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-brand-500/25 bg-white dark:bg-background text-foreground font-bold text-xs sm:text-sm hover:border-active transition-all cursor-pointer"
            >
              Book Club Tour
            </button>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 11. INTERACTIVE ZONE SPECIFICATIONS MODAL                      */}
      {/* ============================================================== */}
      {activeModalZone && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div
            className="fixed inset-0"
            onClick={() => setActiveModalZone(null)}
          />

          <div className="relative bg-background border border-brand-500/25 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl z-10 p-6 sm:p-8 space-y-6">
            {/* Modal Close Button */}
            <button
              onClick={() => setActiveModalZone(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-secondary hover:text-foreground hover:bg-brand-500/10 transition-colors cursor-pointer"
            >
              <FiX size={18} />
            </button>

            {/* Modal Image Header */}
            <div className="relative h-64 w-full rounded-2xl overflow-hidden border border-brand-500/20 bg-brand-800/30">
              <Image
                src={activeModalZone.gallery[0]?.url || activeModalZone.image}
                alt={activeModalZone.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded-full bg-active text-btn-text text-[10px] font-black uppercase tracking-wider shadow">
                    {activeModalZone.category}
                  </span>
                  <span className="text-white/80 text-xs font-semibold">
                    {activeModalZone.footage} • {activeModalZone.floor}
                  </span>
                </div>
                <h3 className="font-['Outfit'] text-2xl font-black tracking-tight">
                  {activeModalZone.name}
                </h3>
              </div>
            </div>

            {/* Overview */}
            <div className="space-y-1.5">
              <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">
                Arena Architecture & Environment
              </h4>
              <p className="text-xs sm:text-sm text-secondary leading-relaxed">
                {activeModalZone.description}
              </p>
            </div>

            {/* Equipment Specs */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-1.5">
                <FaDumbbell className="text-active" /> Certified Equipment Roster
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-foreground">
                {activeModalZone.specs.map((spec, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-[#121026]/50 border border-slate-200/80 dark:border-brand-500/15"
                  >
                    <FiCheckCircle className="text-active shrink-0 mt-0.5" size={14} />
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Engineering & Acoustics */}
            {activeModalZone.engineering && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-1.5">
                  <FiSliders className="text-active" /> Architectural & Engineering Specs
                </h4>
                <ul className="space-y-1 text-xs text-secondary">
                  {activeModalZone.engineering.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Arena Rules */}
            {activeModalZone.rules && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-1.5">
                  <FiShield className="text-active" /> Etiquette & Safety Protocols
                </h4>
                <ul className="space-y-1 text-xs text-secondary">
                  {activeModalZone.rules.map((rule, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-active shrink-0" />
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Associated Classes */}
            {activeModalZone.classesAssociated && (
              <div className="p-3.5 rounded-xl bg-brand-500/5 border border-brand-500/15 text-xs text-secondary flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span>
                  Classes Hosted in Arena:{" "}
                  <strong className="text-foreground">
                    {activeModalZone.classesAssociated}
                  </strong>
                </span>
                <Link
                  href="/all-classes"
                  className="text-active font-bold hover:underline shrink-0"
                >
                  Browse Schedule &rarr;
                </Link>
              </div>
            )}

            {/* Modal Bottom Actions */}
            <div className="pt-3 border-t border-brand-500/15 flex items-center justify-end gap-2.5">
              <button
                onClick={() => {
                  setActiveModalZone(null);
                  setTourForm((prev) => ({
                    ...prev,
                    focusZone: activeModalZone.name,
                  }));
                  setTourSubmitted(false);
                  setShowTourModal(true);
                }}
                className="px-4 py-2 rounded-xl bg-active text-btn-text text-xs font-bold shadow-sm hover:opacity-90 transition-opacity cursor-pointer"
              >
                Schedule Arena Tour
              </button>
              <Link
                href="/pricing"
                className="px-4 py-2 rounded-xl border border-brand-500/25 text-xs font-semibold text-foreground hover:border-active transition-colors"
              >
                Membership Plans
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 12. INTERACTIVE VIP TOUR BOOKING MODAL                         */}
      {/* ============================================================== */}
      {showTourModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div
            className="fixed inset-0"
            onClick={() => setShowTourModal(false)}
          />

          <div className="relative bg-background border border-brand-500/25 rounded-3xl max-w-lg w-full shadow-2xl z-10 p-6 sm:p-7 space-y-5">
            <button
              onClick={() => setShowTourModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-secondary hover:text-foreground hover:bg-brand-500/10 transition-colors cursor-pointer"
            >
              <FiX size={18} />
            </button>

            {tourSubmitted ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-500/15 text-emerald-500 flex items-center justify-center mx-auto text-2xl font-bold">
                  <FiCheck />
                </div>
                <div className="space-y-1">
                  <h3 className="font-['Outfit'] text-2xl font-bold text-foreground">
                    Tour Appointment Confirmed!
                  </h3>
                  <p className="text-xs sm:text-sm text-secondary max-w-sm mx-auto">
                    Thank you, <strong className="text-foreground">{tourForm.name || "Athlete"}</strong>. Your VIP facility walkthrough for <strong>{tourForm.focusZone}</strong> is reserved for <strong>{tourForm.preferredDate} ({tourForm.preferredTime})</strong>.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#121026]/60 border border-slate-200 dark:border-brand-500/15 text-left text-xs space-y-1 text-secondary">
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
                  onClick={() => setShowTourModal(false)}
                  className="w-full py-2.5 rounded-xl bg-active text-btn-text text-xs font-bold hover:opacity-90 shadow-sm cursor-pointer"
                >
                  Return to Facilities
                </button>
              </div>
            ) : (
              <form onSubmit={handleTourSubmit} className="space-y-4">
                <div className="space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-active">
                    VIP Facility Walkthrough
                  </span>
                  <h3 className="font-['Outfit'] text-xl font-bold text-foreground">
                    Book a Private Club Tour
                  </h3>
                  <p className="text-xs text-secondary">
                    Meet with a Master Trainer for a customized tour and trial session.
                  </p>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block font-semibold text-foreground mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alexander Cole"
                      value={tourForm.name}
                      onChange={(e) =>
                        setTourForm({ ...tourForm, name: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-brand-500/20 bg-slate-50 dark:bg-[#121026]/60 text-foreground focus:outline-none focus:border-active"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-foreground mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="alex@example.com"
                        value={tourForm.email}
                        onChange={(e) =>
                          setTourForm({ ...tourForm, email: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-brand-500/20 bg-slate-50 dark:bg-[#121026]/60 text-foreground focus:outline-none focus:border-active"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-foreground mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+1 (555) 000-0000"
                        value={tourForm.phone}
                        onChange={(e) =>
                          setTourForm({ ...tourForm, phone: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-brand-500/20 bg-slate-50 dark:bg-[#121026]/60 text-foreground focus:outline-none focus:border-active"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-foreground mb-1">
                        Preferred Date
                      </label>
                      <select
                        value={tourForm.preferredDate}
                        onChange={(e) =>
                          setTourForm({ ...tourForm, preferredDate: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-brand-500/20 bg-slate-50 dark:bg-[#121026]/60 text-foreground focus:outline-none focus:border-active"
                      >
                        <option value="Tomorrow">Tomorrow</option>
                        <option value="This Wednesday">This Wednesday</option>
                        <option value="This Friday">This Friday</option>
                        <option value="This Weekend (Saturday)">This Weekend (Saturday)</option>
                        <option value="Next Week">Next Week</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-semibold text-foreground mb-1">
                        Time Window
                      </label>
                      <select
                        value={tourForm.preferredTime}
                        onChange={(e) =>
                          setTourForm({ ...tourForm, preferredTime: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-brand-500/20 bg-slate-50 dark:bg-[#121026]/60 text-foreground focus:outline-none focus:border-active"
                      >
                        <option value="Morning (8:00 AM - 11:00 AM)">Morning (8:00 AM - 11:00 AM)</option>
                        <option value="Midday (12:00 PM - 3:00 PM)">Midday (12:00 PM - 3:00 PM)</option>
                        <option value="Evening (4:00 PM - 7:00 PM)">Evening (4:00 PM - 7:00 PM)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-foreground mb-1">
                      Primary Facility Interest
                    </label>
                    <select
                      value={tourForm.focusZone}
                      onChange={(e) =>
                        setTourForm({ ...tourForm, focusZone: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-brand-500/20 bg-slate-50 dark:bg-[#121026]/60 text-foreground focus:outline-none focus:border-active"
                    >
                      <option value="Full Club Infrastructure Walkthrough">
                        Full Club Infrastructure Walkthrough
                      </option>
                      {FACILITY_ZONES.map((z) => (
                        <option key={z.id} value={z.name}>
                          {z.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-active text-btn-text text-xs font-bold hover:opacity-90 shadow-sm transition-opacity cursor-pointer"
                  >
                    Confirm Walkthrough Request
                  </button>
                  <p className="text-[10px] text-secondary text-center mt-2">
                    Complimentary 1-day pass included for all booked tour guests. No credit card required.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
