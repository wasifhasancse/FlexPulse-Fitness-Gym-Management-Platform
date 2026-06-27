"use client";

import { createClasses } from "@/lib/actions/addClass";
import { authClient } from "@/lib/auth-client";
import { imageUpload } from "@/lib/imageUpload";
import { toast } from "@heroui/react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import {
    FaCalendarAlt,
    FaClock,
    FaDollarSign,
    FaDumbbell,
    FaFileAlt,
    FaImage,
    FaLevelUpAlt,
    FaTag,
    FaTimes,
    FaUsers,
} from "react-icons/fa";

export default function AddClassPage() {
  // Form state
  const [className, setClassName] = useState("");
  const [classImage, setClassImage] = useState("");
  const [category, setCategory] = useState("HIIT");
  const [difficultyLevel, setDifficultyLevel] = useState("Advanced");
  const [duration, setDuration] = useState(45);
  const [price, setPrice] = useState(30);
  const [slot, setSlot] = useState(20);
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("08:00");
  const [selectedDays, setSelectedDays] = useState([]);

  const [uploading, setUploading] = useState(false);
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const toggleDay = (day) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day],
    );
  };

  const handleImageRemove = () => setClassImage("");

  const resetForm = () => {
    (setClassName(""),
      setClassImage(""),
      setCategory("HIIT"),
      setDifficultyLevel("Advanced"));
    setDuration(45);
    setPrice(30);
    setSlot(20);
    setDescription("");
    setTime("08:00");
    setSelectedDays([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      className,
      classImage,
      category,
      difficultyLevel,
      duration,
      price,
      slot,
      description,
      classSchedule: selectedDays.join(", "),
      time: time + " AM",
      author: user.role,
      authorId: user.id,
      authorName: user.name,
      authorImage: user.image,
      authorEmail: user.email,
      status: "panding",
    };
    try {
      const addClass = await createClasses(formData);
      if (addClass.insertedId) {
        toast.success("Class added successfully!");
        resetForm();
      }
    } catch (error) {
      console.error(error);
      toast.error("Faild to add class");
    }
  };

  return (
    <div className="w-full bg-white dark:bg-brand-800/20 h-full p-6 md:p-8 rounded-2xl border border-brand-500/10 dark:border-brand-500/20 shadow-card">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Header */}
        <div className="mb-8 font-sans">
          <h1 className="font-['Outfit'] text-3xl font-bold text-foreground">
            Trainer Dashboard
          </h1>
          <p className="text-[#535C91] dark:text-[#9290C3] font-medium mt-1">
            Welcome back, Trainer!
          </p>
          <h2 className="text-xl font-bold text-active mt-4">
            Add New Class
          </h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6 font-sans">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left column */}
            <div className="space-y-5">
              {/* Class Name */}
              <div>
                <label
                  htmlFor="className"
                  className="text-sm font-semibold text-foreground mb-1.5 flex items-center gap-2"
                >
                  <FaDumbbell className="text-active w-4 h-4" />
                  CLASS NAME
                </label>
                <input
                  id="className"
                  type="text"
                  value={className}
                  onChange={(e) => setClassName(e.target.value)}
                  placeholder="Fitness Class"
                  className="w-full px-4 py-2.5 bg-[#535C91]/5 dark:bg-[#1b1a55]/40 border border-brand-500/20 dark:border-brand-500/30 rounded-lg text-foreground placeholder-[#535C91]/50 dark:placeholder-[#9290C3]/50 focus:outline-none focus:border-active focus:ring-2 focus:ring-active/20 transition-all text-sm"
                />
              </div>

              {/* Class Image */}
              <div>
                <label className="text-sm font-semibold text-foreground mb-1.5 flex items-center gap-2">
                  <FaImage className="text-active w-4 h-4" />
                  CLASS IMAGE
                </label>
                {uploading ? (
                  <div className="w-full h-48 flex items-center justify-center border border-brand-500/20 rounded-lg bg-[#535C91]/5 dark:bg-[#1b1a55]/40">
                    <div className="animate-spin rounded-full h-10 w-10 border-4 border-brand-500/25 border-t-active" />
                  </div>
                ) : classImage ? (
                  <div className="relative w-full h-48 rounded-lg overflow-hidden border border-brand-500/15 dark:border-brand-500/30 bg-[#535C91]/5 dark:bg-[#1b1a55]/40">
                    <Image
                      width={500}
                      height={500}
                      src={classImage}
                      alt="Class preview"
                      unoptimized
                      className="w-full h-full object-cover"
                    />

                    <button
                      type="button"
                      onClick={handleImageRemove}
                      className="absolute top-2 right-2 p-1.5 bg-black/70 text-white rounded-full cursor-pointer hover:bg-black/95 transition-colors"
                    >
                      <FaTimes className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="relative">
                    <div className="w-full h-48 bg-[#535C91]/5 dark:bg-[#1b1a55]/40 border-2 border-dashed border-brand-500/20 dark:border-brand-500/30 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-active transition-colors">
                      <FaImage className="w-8 h-8 text-[#535C91] dark:text-[#9290C3] mb-2" />
                      <p className="text-sm text-[#535C91] dark:text-[#9290C3]">
                        Click to upload or drag & drop
                      </p>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];

                        if (!file) return;
                        try {
                          setUploading(true);
                          const image = await imageUpload(file);

                          setClassImage(image.url);
                        } catch (error) {
                          console.error(error);
                        } finally {
                          setUploading(false);
                        }
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Category */}
              <div>
                <label
                  htmlFor="category"
                  className="text-sm font-semibold text-foreground mb-1.5 flex items-center gap-2"
                >
                  <FaTag className="text-active w-4 h-4" />
                  CATEGORY
                </label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white dark:bg-brand-800/40 border border-brand-500/20 rounded-lg text-foreground focus:outline-none focus:border-active focus:ring-2 focus:ring-active/20 transition-all text-sm appearance-none"
                >
                  <option value="Yoga">Yoga</option>
                  <option value="HIIT">HIIT</option>
                  <option value="Weights">Weights</option>
                  <option value="Pilates">Pilates</option>
                  <option value="Cardio">Cardio</option>
                  <option value="Stretching">Stretching</option>
                </select>
              </div>
            </div>

            {/* Right column */}
            <div className="space-y-5">
              {/* Duration */}
              <div>
                <label
                  htmlFor="duration"
                  className="text-sm font-semibold text-foreground mb-1.5 flex items-center gap-2"
                >
                  <FaClock className="text-active w-4 h-4" />
                  DURATION
                </label>
                <div className="flex items-center gap-2">
                  <input
                    id="duration"
                    type="number"
                    min="1"
                    value={duration}
                    onChange={(e) => setDuration(parseInt(e.target.value) || 0)}
                    className="w-24 px-4 py-2.5 bg-[#535C91]/5 dark:bg-[#1b1a55]/40 border border-brand-500/20 dark:border-brand-500/30 rounded-lg text-foreground focus:outline-none focus:border-active focus:ring-2 focus:ring-active/20 transition-all text-sm"
                  />
                  <span className="text-sm text-[#535C91] dark:text-[#9290C3] font-semibold">
                    mins
                  </span>
                </div>
              </div>

              {/* Class Schedule Days */}
              <div>
                <label className="text-sm font-semibold text-foreground mb-1.5 flex items-center gap-2">
                  <FaCalendarAlt className="text-active w-4 h-4" />
                  CLASS SCHEDULE DAYS
                </label>
                <div className="flex flex-wrap gap-2">
                  {days.map((day) => (
                    <button
                      key={day}
                      type="button"
                      onClick={() => toggleDay(day)}
                      className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                        selectedDays.includes(day)
                          ? "bg-active text-btn-text shadow-sm"
                          : "bg-[#535C91]/10 dark:bg-[#1b1a55]/60 text-foreground hover:bg-[#535C91]/20 dark:hover:bg-[#1b1a55]/80"
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time */}
              <div>
                <label
                  htmlFor="time"
                  className="text-sm font-semibold text-foreground mb-1.5 flex items-center gap-2"
                >
                  <FaClock className="text-active w-4 h-4" />
                  TIME
                </label>
                <input
                  id="time"
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#535C91]/5 dark:bg-[#1b1a55]/40 border border-brand-500/20 dark:border-brand-500/30 rounded-lg text-foreground focus:outline-none focus:border-active focus:ring-2 focus:ring-active/20 transition-all text-sm"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5">
            <div>
              <label
                htmlFor="description"
                className="text-sm font-semibold text-foreground mb-1.5 flex items-center gap-2"
              >
                <FaFileAlt className="text-active w-4 h-4" />
                DESCRIPTION
              </label>
              <textarea
                id="description"
                rows="4"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the class ..."
                className="w-full px-4 py-2.5 bg-[#535C91]/5 dark:bg-[#1b1a55]/40 border border-brand-500/20 dark:border-brand-500/30 rounded-lg text-foreground placeholder-[#535C91]/50 dark:placeholder-[#9290C3]/50 focus:outline-none focus:border-active focus:ring-2 focus:ring-active/20 transition-all text-sm resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div>
                <label
                  htmlFor="difficultyLevel"
                  className="text-sm font-semibold text-foreground mb-1.5 flex items-center gap-2"
                >
                  <FaLevelUpAlt className="text-active w-4 h-4" />
                  DIFFICULTY LEVEL
                </label>
                <select
                  id="difficultyLevel"
                  value={difficultyLevel}
                  onChange={(e) => setDifficultyLevel(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white dark:bg-brand-800/40 border border-brand-500/20 rounded-lg text-foreground focus:outline-none focus:border-active focus:ring-2 focus:ring-active/20 transition-all text-sm appearance-none"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="price"
                  className="text-sm font-semibold text-foreground mb-1.5 flex items-center gap-2"
                >
                  <FaDollarSign className="text-active w-4 h-4" />
                  PRICE ($)
                </label>
                <input
                  id="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={price}
                  onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-2.5 bg-[#535C91]/5 dark:bg-[#1b1a55]/40 border border-brand-500/20 dark:border-brand-500/30 rounded-lg text-foreground focus:outline-none focus:border-active focus:ring-2 focus:ring-active/20 transition-all text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="slot"
                  className="text-sm font-semibold text-foreground mb-1.5 flex items-center gap-2"
                >
                  <FaUsers className="text-active w-4 h-4" />
                  SLOT (capacity)
                </label>
                <input
                  id="slot"
                  type="number"
                  min="1"
                  value={slot}
                  onChange={(e) => setSlot(parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-2.5 bg-[#535C91]/5 dark:bg-[#1b1a55]/40 border border-brand-500/20 dark:border-brand-500/30 rounded-lg text-foreground focus:outline-none focus:border-active focus:ring-2 focus:ring-active/20 transition-all text-sm"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="px-8 py-3 bg-btn-bg text-btn-text font-semibold rounded-xl hover:opacity-90 transition-all shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer border border-brand-500/20"
            >
              Add Class
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
