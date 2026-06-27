"use client";

import { updateClass } from "@/lib/actions/updateClass";
import { authClient } from "@/lib/auth-client";
import { imageUpload } from "@/lib/imageUpload";
import { Button, Modal, Surface, toast } from "@heroui/react";
import Image from "next/image";
import { useState } from "react";
import {
  FaCalendarAlt,
  FaClock,
  FaDollarSign,
  FaDumbbell,
  FaEdit,
  FaFileAlt,
  FaImage,
  FaLevelUpAlt,
  FaTag,
  FaTimes,
  FaUsers,
} from "react-icons/fa";

const UpdateModal = ({ classes, onUpdated }) => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const [className, setClassName] = useState(classes?.className || "");
  const [classImage, setClassImage] = useState(classes?.classImage || "");
  const [category, setCategory] = useState(classes?.category || "HIIT");
  const [difficultyLevel, setDifficultyLevel] = useState(
    classes?.difficultyLevel || "Advanced",
  );
  const [duration, setDuration] = useState(classes?.duration || 45);
  const [price, setPrice] = useState(classes?.price || 0);
  const [slot, setSlot] = useState(classes?.slot || 20);
  const [description, setDescription] = useState(classes?.description || "");
  const [time, setTime] = useState(
    classes?.time?.replace(" AM", "").replace(" PM", "") || "08:00",
  );
  const [selectedDays, setSelectedDays] = useState(
    classes?.classSchedule ? classes.classSchedule.split(", ") : [],
  );
  const [uploading, setUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleDay = (day) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day],
    );
  };

  const handleImageRemove = () => setClassImage("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const updatedData = {
      className,
      classImage,
      category,
      difficultyLevel,
      duration: Number(duration),
      price: Number(price),
      slot: Number(slot),
      description,
      classSchedule: selectedDays.join(", "),
      time: time + " AM",
      authorId: user?.id,
    };

    try {
      const data = await updateClass(classes._id, updatedData);

      if (data.modifiedCount > 0) {
        toast.success("Class updated successfully!");
        onUpdated?.();
      } else {
        toast.error("No changes made!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update class!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal>
      <Button
        className="bg-transparent p-1.5 text-[#535C91] dark:text-[#9290C3] hover:text-active transition-colors cursor-pointer"
        title="Edit"
      >
        <FaEdit className="w-4 h-4" />
      </Button>

      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-4xl bg-background border border-brand-500/20 rounded-2xl shadow-xl overflow-hidden">
            <Modal.CloseTrigger />
            <Modal.Header className="px-6 pt-6 pb-4 border-b border-brand-500/10">
              <Modal.Heading className="text-xl font-bold text-foreground font-sans">Edit Class</Modal.Heading>
              <p className="mt-1 text-sm text-[#535C91] dark:text-[#9290C3] font-sans">
                Update the class details below.
              </p>
            </Modal.Header>

            <Modal.Body className="p-6">
              <Surface variant="default" className="bg-transparent">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left Column */}
                    <div className="space-y-5">
                      {/* Class Name */}
                      <div>
                        <label className="font-sans text-sm font-bold text-foreground mb-2 flex items-center gap-2">
                          <FaDumbbell className="text-active w-4 h-4" />
                          CLASS NAME
                        </label>
                        <input
                          type="text"
                          value={className}
                          onChange={(e) => setClassName(e.target.value)}
                          placeholder="Fitness Class"
                          className="w-full px-4 py-2.5 bg-brand-50/5 dark:bg-brand-800/40 border border-brand-500/20 dark:border-brand-500/30 rounded-xl text-foreground placeholder-brand-500/50 focus:outline-none focus:border-active focus:ring-1 focus:ring-active transition-all font-sans text-sm shadow-inner"
                        />
                      </div>

                      {/* Class Image */}
                      <div>
                        <label className="font-sans text-sm font-bold text-foreground mb-2 flex items-center gap-2">
                          <FaImage className="text-active w-4 h-4" />
                          CLASS IMAGE
                        </label>
                        {uploading ? (
                          <div className="w-full h-48 flex items-center justify-center border border-brand-500/20 rounded-xl bg-brand-500/5">
                            <div className="animate-spin rounded-full h-10 w-10 border-4 border-brand-500/10 border-t-active" />
                          </div>
                        ) : classImage ? (
                          <div className="relative w-full h-48 rounded-xl overflow-hidden border border-brand-500/20 shadow-sm bg-brand-500/5">
                            <Image
                              src={classImage}
                              alt="Class preview"
                              fill
                              className="object-cover"
                              unoptimized
                            />
                            <button
                              type="button"
                              onClick={handleImageRemove}
                              className="absolute top-2.5 right-2.5 p-1.5 bg-black/75 text-white rounded-full hover:bg-rose-600 transition shadow-md cursor-pointer"
                            >
                              <FaTimes className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ) : (
                          <div className="relative">
                            <div className="w-full h-48 bg-brand-50/5 dark:bg-brand-800/40 border-2 border-dashed border-brand-500/25 dark:border-brand-500/35 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-active/60 transition-colors">
                              <FaImage className="w-8 h-8 text-[#535C91] dark:text-[#9290C3] mb-2" />
                              <p className="font-sans text-sm text-[#535C91] dark:text-[#9290C3]">
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
                                  const imgData = await imageUpload(file);
                                  setClassImage(imgData.url);
                                } catch (err) {
                                  console.error(err);
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
                        <label className="font-sans text-sm font-bold text-foreground mb-2 flex items-center gap-2">
                          <FaTag className="text-active w-4 h-4" />
                          CATEGORY
                        </label>
                        <div className="relative">
                          <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full px-4 py-2.5 bg-brand-50/5 dark:bg-brand-800/40 border border-brand-500/20 dark:border-brand-500/30 rounded-xl text-foreground focus:outline-none focus:border-active focus:ring-1 focus:ring-active transition-all font-sans text-sm appearance-none shadow-inner"
                          >
                            {[
                              "Yoga",
                              "HIIT",
                              "Weights",
                              "Pilates",
                              "Cardio",
                              "Stretching",
                            ].map((c) => (
                              <option key={c} value={c} className="bg-background text-foreground">
                                {c}
                              </option>
                            ))}
                          </select>
                          <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-[#535C91] dark:text-[#9290C3]">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-5">
                      {/* Duration */}
                      <div>
                        <label className="font-sans text-sm font-bold text-foreground mb-2 flex items-center gap-2">
                          <FaClock className="text-active w-4 h-4" />
                          DURATION
                        </label>
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            min="1"
                            value={duration}
                            onChange={(e) =>
                              setDuration(parseInt(e.target.value) || 0)
                            }
                            className="w-28 px-4 py-2.5 bg-brand-50/5 dark:bg-brand-800/40 border border-brand-500/20 dark:border-brand-500/30 rounded-xl text-foreground focus:outline-none focus:border-active focus:ring-1 focus:ring-active transition-all font-sans text-sm shadow-inner"
                          />
                          <span className="font-sans text-sm text-[#535C91] dark:text-[#9290C3]">
                            mins
                          </span>
                        </div>
                      </div>

                      {/* Schedule Days */}
                      <div>
                        <label className="font-sans text-sm font-bold text-foreground mb-2 flex items-center gap-2">
                          <FaCalendarAlt className="text-active w-4 h-4" />
                          CLASS SCHEDULE DAYS
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {days.map((day) => (
                            <button
                              key={day}
                              type="button"
                              onClick={() => toggleDay(day)}
                              className={`px-3 py-1.5 rounded-lg font-sans text-sm font-semibold transition-all cursor-pointer ${
                                selectedDays.includes(day)
                                  ? "bg-btn-bg text-btn-text shadow-sm"
                                  : "bg-brand-500/5 dark:bg-brand-800/40 text-[#535C91] dark:text-[#9290C3] hover:bg-brand-500/10"
                              }`}
                            >
                              {day}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Time */}
                      <div>
                        <label className="font-sans text-sm font-bold text-foreground mb-2 flex items-center gap-2">
                          <FaClock className="text-active w-4 h-4" />
                          TIME
                        </label>
                        <input
                          type="time"
                          value={time}
                          onChange={(e) => setTime(e.target.value)}
                          className="w-full px-4 py-2.5 bg-brand-50/5 dark:bg-brand-800/40 border border-brand-500/20 dark:border-brand-500/30 rounded-xl text-foreground focus:outline-none focus:border-active focus:ring-1 focus:ring-active transition-all font-sans text-sm shadow-inner"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Full width fields */}
                  <div className="space-y-5">
                    {/* Description */}
                    <div>
                      <label className="font-sans text-sm font-bold text-foreground mb-2 flex items-center gap-2">
                        <FaFileAlt className="text-active w-4 h-4" />
                        DESCRIPTION
                      </label>
                      <textarea
                        rows="4"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Describe the class..."
                        className="w-full px-4 py-2.5 bg-brand-50/5 dark:bg-brand-800/40 border border-brand-500/20 dark:border-brand-500/30 rounded-xl text-foreground placeholder-[#535C91]/50 dark:placeholder-[#9290C3]/50 focus:outline-none focus:border-active focus:ring-1 focus:ring-active transition-all font-sans text-sm resize-none shadow-inner"
                      />
                    </div>

                    {/* Difficulty, Price, Slot */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                      <div>
                        <label className="font-sans text-sm font-bold text-foreground mb-2 flex items-center gap-2">
                          <FaLevelUpAlt className="text-active w-4 h-4" />
                          DIFFICULTY
                        </label>
                        <div className="relative">
                          <select
                            value={difficultyLevel}
                            onChange={(e) => setDifficultyLevel(e.target.value)}
                            className="w-full px-4 py-2.5 bg-brand-50/5 dark:bg-brand-800/40 border border-brand-500/20 dark:border-brand-500/30 rounded-xl text-foreground focus:outline-none focus:border-active focus:ring-1 focus:ring-active transition-all font-sans text-sm appearance-none shadow-inner"
                          >
                            {["Beginner", "Intermediate", "Advanced"].map((d) => (
                              <option key={d} value={d} className="bg-background text-foreground">
                                {d}
                              </option>
                            ))}
                          </select>
                          <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-[#535C91] dark:text-[#9290C3]">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="font-sans text-sm font-bold text-foreground mb-2 flex items-center gap-2">
                          <FaDollarSign className="text-active w-4 h-4" />
                          PRICE ($)
                        </label>
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={price}
                          onChange={(e) =>
                            setPrice(parseFloat(e.target.value) || 0)
                          }
                          className="w-full px-4 py-2.5 bg-brand-50/5 dark:bg-brand-800/40 border border-brand-500/20 dark:border-brand-500/30 rounded-xl text-foreground focus:outline-none focus:border-active focus:ring-1 focus:ring-active transition-all font-sans text-sm shadow-inner"
                        />
                      </div>

                      <div>
                        <label className="font-sans text-sm font-bold text-foreground mb-2 flex items-center gap-2">
                          <FaUsers className="text-active w-4 h-4" />
                          SLOT
                        </label>
                        <input
                          type="number"
                          min="1"
                          value={slot}
                          onChange={(e) =>
                            setSlot(parseInt(e.target.value) || 0)
                          }
                          className="w-full px-4 py-2.5 bg-brand-50/5 dark:bg-brand-800/40 border border-brand-500/20 dark:border-brand-500/30 rounded-xl text-foreground focus:outline-none focus:border-active focus:ring-1 focus:ring-active transition-all font-sans text-sm shadow-inner"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Submit */}
                  <div className="flex justify-end pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`px-8 py-3 font-sans font-bold rounded-xl shadow-md transition-all flex items-center gap-2 text-sm cursor-pointer ${
                        isSubmitting
                          ? "bg-brand-500/10 text-muted cursor-not-allowed opacity-60"
                          : "bg-btn-bg text-btn-text hover:opacity-95"
                      }`}
                    >
                      {isSubmitting ? "Updating..." : "Update Class"}
                    </button>
                  </div>
                </form>
              </Surface>
            </Modal.Body>

            <Modal.Footer className="px-6 py-4 border-t border-brand-500/10 flex justify-end">
              <Button
                slot="close"
                className="bg-transparent border border-brand-500/20 text-[#535C91] dark:text-[#9290C3] hover:bg-brand-500/10 px-6 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer"
              >
                Cancel
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};

export default UpdateModal;
