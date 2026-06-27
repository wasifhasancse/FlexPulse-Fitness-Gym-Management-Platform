"use client";

import { DeleteClassModal } from "@/components/Dashboard/trainer/DeleteClassModal";
import UpdateModal from "@/components/Dashboard/trainer/UpdateModal";
import { getClassStudents, getMyClasses } from "@/lib/api/getClasses";
import { authClient } from "@/lib/auth-client";
import { toast } from "@heroui/react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FaCalendarAlt,
  FaClock,
  FaEye,
  FaPlus,
  FaSpinner,
  FaTimes,
  FaUsers,
} from "react-icons/fa";
import { TfiMoney } from "react-icons/tfi";

export const metadata = {
  title: "Trainer - My Classes",
  description:
    "Manage your fitness classes on the FlexPulse platform. View details, update information, and track student enrollments.",
};

export default function MyClassesPage() {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const trainerId = user?.id;

  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedClass, setSelectedClass] = useState(null);
  const [students, setStudents] = useState([]);
  const [studentsLoading, setStudentsLoading] = useState(false);
  const [isStudentsModalOpen, setIsStudentsModalOpen] = useState(false);

  const [refresh, setRefresh] = useState(0);
  useEffect(() => {
    if (!trainerId) return;

    const loadClasses = async () => {
      try {
        const data = await getMyClasses(trainerId);
        setClasses(data);
      } catch (err) {
        setError(err.message || "Failed to load classes");
      } finally {
        setLoading(false);
      }
    };

    loadClasses();
  }, [trainerId, refresh]);

  const activeClasses = classes.filter(
    (cls) => cls.status === "active" || cls.status === "approved",
  ).length;

  // Calculate total enrollments across all classes
  const totalEnrollments = classes.reduce(
    (sum, cls) => sum + (cls.bookedCount || 0),
    0,
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
      case "approved":
        return "bg-[#A68B6E] text-white";
      case "pending":
        return "bg-[#D4A050] text-white";
      case "rejected":
        return "bg-[#C47A6A] text-white";
      case "inactive":
        return "bg-[#6B655A] text-white";
      default:
        return "bg-[#6B655A] text-white";
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "active":
      case "approved":
        return "ACTIVE";
      case "pending":
        return "PENDING";
      case "rejected":
        return "REJECTED";
      case "inactive":
        return "INACTIVE";
      default:
        return status.toUpperCase();
    }
  };

  const handleViewStudents = async (cls) => {
    setSelectedClass(cls);
    setIsStudentsModalOpen(true);
    setStudentsLoading(true);
    try {
      const { data: tokenData } = await authClient.token();
      if (tokenData?.token) {
        const data = await getClassStudents(cls._id, tokenData.token);
        setStudents(data || []);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load students list");
    } finally {
      setStudentsLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <FaSpinner className="w-8 h-8 text-active animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="font-['Inter'] text-rose-500">
          Error loading classes: {error}
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-6xl mx-auto space-y-6 px-4 sm:px-0"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-['Outfit'] text-3xl md:text-4xl font-bold text-foreground">
            My Managed Classes
          </h1>
          <p className="font-['Inter'] text-[#535C91] dark:text-[#9290C3] mt-1">
            {activeClasses} Active Sessions · {totalEnrollments} Total
            Enrollments · Updated just now
          </p>
        </div>
        <Link
          href="/dashboard/trainer/add-class"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-btn-bg text-btn-text font-['Inter'] font-semibold rounded-xl hover:opacity-90 transition-colors shadow-sm hover:shadow-md whitespace-nowrap border border-brand-500/20"
        >
          <FaPlus className="w-4 h-4" />
          Create New Class
        </Link>
      </div>

      {/* Table */}
      {classes.length === 0 ? (
        <div className="bg-white dark:bg-brand-800/20 rounded-2xl p-12 text-center shadow-card border border-brand-500/15 dark:border-brand-500/20">
          <p className="font-['Inter'] text-[#535C91] dark:text-[#9290C3] mb-4">
            You haven&apos;t created any classes yet.
          </p>
          <Link
            href="/dashboard/trainer/add-class"
            className="inline-block px-5 py-2.5 bg-btn-bg text-btn-text font-['Inter'] font-semibold rounded-xl hover:opacity-90 transition-colors shadow-sm"
          >
            Create Your First Class
          </Link>
        </div>
      ) : (
        <div className="bg-white dark:bg-brand-800/20 rounded-2xl shadow-card border border-brand-500/15 dark:border-brand-500/20 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left font-['Inter'] text-sm">
              <thead className="bg-brand-500/10 text-[#535C91] dark:text-[#9290C3]">
                <tr>
                  <th className="py-3.5 px-6 font-semibold">Image</th>
                  <th className="py-3.5 px-6 font-semibold">Class Name</th>
                  <th className="py-3.5 px-6 font-semibold">Date & Time</th>
                  <th className="py-3.5 px-6 font-semibold">Price</th>
                  <th className="py-3.5 px-6 font-semibold">Bookings</th>
                  <th className="py-3.5 px-6 font-semibold">Status</th>
                  <th className="py-3.5 px-6 font-semibold text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {classes.map((cls) => (
                  <tr
                    key={cls._id}
                    className="border-b border-brand-500/10 dark:border-brand-800/40 hover:bg-brand-500/5 transition-colors"
                  >
                    {/* Image */}
                    <td className="py-3 px-6">
                      {cls.classImage ? (
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-brand-500/5 border border-brand-500/10">
                          <Image
                            src={cls.classImage}
                            alt={cls.className}
                            fill
                            unoptimized
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-lg bg-brand-500/5 border border-brand-500/10 flex items-center justify-center text-[#535C91] dark:text-[#9290C3] text-xs">
                          No img
                        </div>
                      )}
                    </td>

                    {/* Class Name */}
                    <td className="py-4 px-6">
                      <p className="font-bold text-foreground">
                        {cls.className}
                      </p>
                      <p className="text-xs text-[#535C91] dark:text-[#9290C3] mt-0.5">
                        {cls.category} · {cls.difficultyLevel}
                      </p>
                    </td>

                    {/* Date & Time */}
                    <td className="py-4 px-6 text-foreground">
                      <div className="flex flex-col gap-0.5">
                        <span className="flex items-center gap-1.5 font-medium">
                          <FaCalendarAlt className="w-3 h-3 text-active" />
                          {cls.classSchedule}
                        </span>
                        <span className="flex items-center gap-1.5 text-xs text-[#535C91] dark:text-[#9290C3]">
                          <FaClock className="w-3 h-3 text-active" />
                          {cls.time} · {cls.duration} min
                        </span>
                      </div>
                    </td>

                    {/* Price */}
                    <td className="py-4 px-6 text-foreground font-bold">
                      <span className="flex items-center gap-1">
                        <TfiMoney className="w-3.5 h-3.5 text-active" />$
                        {cls.price}
                      </span>
                    </td>

                    {/* Bookings */}
                    <td className="py-4 px-6 text-foreground font-bold">
                      <span>{cls.bookedCount || 0}</span>
                      <span className="text-[#535C91] dark:text-[#9290C3] font-normal">
                        /{cls.slot}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="py-4 px-6">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                          cls.status,
                        )}`}
                      >
                        {getStatusLabel(cls.status)}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/all-classes/${cls._id}`}
                          className="p-1.5 text-[#535C91] dark:text-[#9290C3] hover:text-active transition-colors"
                          title="View Details"
                        >
                          <FaEye className="w-4 h-4" />
                        </Link>
                        <UpdateModal
                          classes={cls}
                          onUpdated={() => setRefresh((r) => r + 1)}
                        />

                        <DeleteClassModal
                          onDelete={() => setRefresh((r) => r + 1)}
                          classes={cls}
                        />
                        <button
                          onClick={() => handleViewStudents(cls)}
                          className="p-1.5 text-[#535C91] dark:text-[#9290C3] hover:text-active transition-colors cursor-pointer"
                          title="View Students"
                        >
                          <FaUsers className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Attendees Modal */}
      {isStudentsModalOpen && selectedClass && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="bg-background rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-brand-500/20 max-h-[85vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-['Outfit'] text-2xl font-bold text-foreground">
                Enrolled Students
              </h2>
              <button
                onClick={() => {
                  setIsStudentsModalOpen(false);
                  setStudents([]);
                }}
                className="text-[#535C91] dark:text-[#9290C3] hover:text-active transition-colors cursor-pointer"
              >
                <FaTimes size={20} />
              </button>
            </div>

            <p className="font-['Inter'] text-sm text-[#535C91] dark:text-[#9290C3] mb-4">
              Class:{" "}
              <span className="font-bold text-foreground">
                {selectedClass.className}
              </span>
            </p>

            {studentsLoading ? (
              <div className="flex flex-col items-center justify-center py-10">
                <FaSpinner className="w-8 h-8 text-active animate-spin mb-2" />
                <p className="text-xs text-[#535C91] dark:text-[#9290C3]">
                  Fetching student list...
                </p>
              </div>
            ) : students.length === 0 ? (
              <div className="bg-brand-500/5 p-8 rounded-xl text-center border border-brand-500/10">
                <p className="text-[#535C91] dark:text-[#9290C3] font-['Inter'] text-sm">
                  No students have booked this class yet.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="bg-brand-500/10 p-2.5 rounded-xl text-xs font-bold text-[#535C91] dark:text-[#9290C3] grid grid-cols-2">
                  <span>NAME</span>
                  <span>EMAIL</span>
                </div>
                <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                  {students.map((student, index) => (
                    <div
                      key={index}
                      className="p-3 bg-white dark:bg-brand-800/20 border border-brand-500/10 rounded-xl grid grid-cols-2 text-sm text-foreground hover:bg-brand-500/5 transition-colors"
                    >
                      <span className="font-semibold truncate">
                        {student.name}
                      </span>
                      <span className="truncate text-[#535C91] dark:text-[#9290C3]">
                        {student.email}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => {
                  setIsStudentsModalOpen(false);
                  setStudents([]);
                }}
                className="px-5 py-2.5 bg-btn-bg text-btn-text hover:opacity-90 font-['Inter'] font-semibold rounded-xl transition-all cursor-pointer shadow-sm text-sm"
              >
                Close list
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
