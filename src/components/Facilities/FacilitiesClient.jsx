"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FiCheckCircle,
  FiClock,
  FiCompass,
  FiFeather,
  FiMapPin,
  FiShield,
  FiWifi,
  FiZap,
} from "react-icons/fi";
import { FaDumbbell, FaHotjar, FaHeartbeat } from "react-icons/fa";

const ZONES = [
  {
    id: "weights",
    name: "Olympic Free Weights Arena",
    category: "Strength & Power",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200",
    description: "Designed for powerlifters, bodybuilders, and athletes striving for heavy mechanical tension and progressive overload.",
    specs: [
      "12 Rogue Monster squat racks with safety spotter arms",
      "Calibrated Eleiko competition bumper & cast iron plates",
      "Custom dumbbell rack ranging from 5 lbs to 150 lbs",
      "6 Sound-dampening Olympic deadlift drop platforms",
      "Hammer Strength ISO-lateral plate-loaded chest & back stations",
    ],
  },
  {
    id: "cardio",
    name: "Cardio High-Performance Suite",
    category: "Endurance & Heart Rate",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1200",
    description: "Elevate your VO2 max and burn calories on industry-leading cardiovascular equipment equipped with telemetry heart rate monitors.",
    specs: [
      "18 Technogym Skillmill curved manual treadmills",
      "Concept2 RowErgs and SkiErgs with PM5 performance monitors",
      "Assault AirBikes and Echo Bikes for explosive anaerobic sprints",
      "StairMaster 10-series Gauntlets with integrated virtual mountain trails",
      "Live MyZone heart-rate projection screens across the deck",
    ],
  },
  {
    id: "crossfit",
    name: "CrossFit & Functional Sprint Turf",
    category: "Athleticism & Agility",
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200",
    description: "40 meters of high-density padded sprint turf built for dynamic sled drives, plyometrics, kettlebell swings, and functional conditioning.",
    specs: [
      "40-meter indoor shock-absorbent sprint track",
      "Heavy steel push/pull prowler sleds with Olympic weight pegs",
      "Gymnastic ring stations and custom monkey bars",
      "Competition kettlebells (8kg to 48kg pairs)",
      "Slam balls, sandbags (20kg-70kg), and soft-landing plyo boxes",
    ],
  },
  {
    id: "zen",
    name: "Mind & Body Zen Pavilion",
    category: "Yoga & Flexibility",
    image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=1200",
    description: "An acoustic-insulated sanctuary with heated bamboo flooring, gentle ambient backlighting, and therapeutic mindfulness acoustics.",
    specs: [
      "Heated infrared radiant ceiling panels (up to 105°F / 40°C)",
      "Balanced Body Allegro 2 Reformer Pilates towers",
      "Organic natural cork yoga mats, blocks, straps, and bolsters",
      "Tibetan sound bowl stations for post-workout nervous system reset",
      "Air filtration system cycling HEPA-purified mountain air every 8 mins",
    ],
  },
  {
    id: "spa",
    name: "Cryo & Hydro-Thermal Recovery Spa",
    category: "Active Recovery",
    image: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=1200",
    description: "Accelerate muscle protein synthesis and flush out lactic acid with alternating hot-and-cold thermal recovery therapy.",
    specs: [
      "Handcrafted Finnish cedar dry sauna (up to 95°C / 203°F)",
      "Eucalyptus-infused marble steam chamber with aroma dispensers",
      "Twin stainless steel cold plunge baths maintained at 3°C (37°F)",
      "Normatec pneumatic dynamic compression boots lounge",
      "Hyperice Percussive therapy bars and heated massage rollers",
    ],
  },
];

export default function FacilitiesClient() {
  const [selectedZone, setSelectedZone] = useState(ZONES[0]);

  return (
    <div className="min-h-screen bg-background py-14 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-active/30 bg-active/10 text-active text-xs font-extrabold uppercase tracking-widest">
            <FiCompass size={13} />
            World-Class Athletic Infrastructure
          </div>
          <h1 className="font-['Outfit'] text-4xl sm:text-5xl lg:text-6xl font-black text-foreground tracking-tight">
            Explore Our <span className="text-active">Gym Arenas</span>
          </h1>
          <p className="font-['Inter'] text-sm sm:text-base text-secondary max-w-2xl mx-auto leading-relaxed">
            Spanning over 25,000 square feet of competition-grade equipment, functional turf, and luxury recovery spas engineered for high-performance athletes.
          </p>
        </div>

        {/* Interactive Zone Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Zone Selector Column */}
          <div className="lg:col-span-4 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-secondary px-1">
              Select Gym Area
            </span>
            <div className="space-y-2">
              {ZONES.map((zone) => {
                const isActive = selectedZone.id === zone.id;
                return (
                  <button
                    key={zone.id}
                    onClick={() => setSelectedZone(zone)}
                    className={`w-full p-4 rounded-2xl text-left border transition-all cursor-pointer flex items-center justify-between ${
                      isActive
                        ? "bg-active text-btn-text border-active shadow-lg scale-[1.02]"
                        : "bg-brand-900/40 dark:bg-[#121026]/70 border-brand-500/20 text-foreground hover:border-active/40"
                    }`}
                  >
                    <div>
                      <span className="text-xs uppercase font-extrabold tracking-wider opacity-80 block">
                        {zone.category}
                      </span>
                      <span className="font-['Outfit'] text-base font-bold block">
                        {zone.name}
                      </span>
                    </div>
                    <FiZap size={16} className={isActive ? "text-btn-text" : "text-active"} />
                  </button>
                );
              })}
            </div>

            {/* Hours Card */}
            <div className="p-6 rounded-3xl bg-brand-900/40 dark:bg-[#121026]/70 border border-brand-500/20 space-y-4 shadow-md">
              <div className="flex items-center gap-2 text-active font-bold text-sm">
                <FiClock size={16} /> Operating Hours
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between pb-1.5 border-b border-brand-500/10">
                  <span className="text-secondary font-medium">Monday – Friday</span>
                  <span className="font-bold text-foreground">05:00 AM – 11:00 PM</span>
                </div>
                <div className="flex justify-between pb-1.5 border-b border-brand-500/10">
                  <span className="text-secondary font-medium">Saturday & Sunday</span>
                  <span className="font-bold text-foreground">07:00 AM – 09:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary font-medium">Pro & VIP Members</span>
                  <span className="font-bold text-active">24/7 Keycard Access</span>
                </div>
              </div>
            </div>
          </div>

          {/* Active Zone Detail Showcase */}
          <div className="lg:col-span-8 bg-brand-900/40 dark:bg-[#121026]/70 border border-brand-500/20 rounded-3xl overflow-hidden shadow-2xl space-y-6">
            <div className="relative h-80 sm:h-96 w-full">
              <Image
                src={selectedZone.image}
                alt={selectedZone.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <span className="px-3 py-1 rounded-full bg-active text-btn-text text-xs font-black uppercase tracking-wider shadow">
                  {selectedZone.category}
                </span>
                <h2 className="font-['Outfit'] text-3xl sm:text-4xl font-black tracking-tight drop-shadow">
                  {selectedZone.name}
                </h2>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              <p className="text-sm sm:text-base text-foreground leading-relaxed">
                {selectedZone.description}
              </p>

              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-secondary flex items-center gap-1.5">
                  <FaDumbbell className="text-active" /> Equipment Specifications & Features
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-foreground">
                  {selectedZone.specs.map((spec) => (
                    <li key={spec} className="flex items-start gap-2.5 p-3 rounded-xl bg-background/50 border border-brand-500/15">
                      <FiCheckCircle className="text-active shrink-0 mt-0.5" size={15} />
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-brand-500/15 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4 text-xs text-secondary">
                  <span className="flex items-center gap-1.5"><FiShield className="text-active" /> Sanitized Hourly</span>
                  <span className="flex items-center gap-1.5"><FiWifi className="text-active" /> High-Speed Wi-Fi</span>
                  <span className="flex items-center gap-1.5"><FiFeather className="text-active" /> Climate Controlled</span>
                </div>
                <Link
                  href="/pricing"
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-active text-btn-text text-xs sm:text-sm font-bold shadow-lg hover:opacity-90 transition-all text-center"
                >
                  Get Access With Membership
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Global Amenities Grid */}
        <div className="space-y-6 pt-6">
          <div className="text-center space-y-2">
            <h3 className="font-['Outfit'] text-2xl sm:text-3xl font-extrabold text-foreground">
              Premium Club Amenities
            </h3>
            <p className="text-xs sm:text-sm text-secondary">
              Everything built around the needs of busy, ambitious athletes.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { title: "24/7 RFID Access", desc: "For Pro & VIP tiers", icon: "🔑" },
              { title: "Digital Lockers", desc: "Keyless pin security", icon: "🔒" },
              { title: "Filtered Water", desc: "Chilled alkaline bar", icon: "💧" },
              { title: "Dyson Grooming", desc: "Luxury locker suites", icon: "✨" },
              { title: "Smoothie Bar", desc: "Organic recovery shakes", icon: "🥤" },
              { title: "Free Parking", desc: "Reserved member spots", icon: "🚗" },
            ].map((amenity) => (
              <div
                key={amenity.title}
                className="p-5 rounded-2xl bg-brand-900/40 dark:bg-[#121026]/70 border border-brand-500/20 text-center space-y-2 hover:border-active/50 transition-colors"
              >
                <div className="text-3xl">{amenity.icon}</div>
                <h4 className="font-bold text-xs text-foreground">{amenity.title}</h4>
                <p className="text-[10px] text-secondary">{amenity.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
