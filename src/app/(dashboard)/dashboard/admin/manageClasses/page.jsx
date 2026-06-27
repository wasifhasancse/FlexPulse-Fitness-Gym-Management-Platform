"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  FaSpinner,
  FaCheck,
  FaTimes,
  FaTrash,
  FaUser,
  FaDollarSign,
  FaTag,
} from "react-icons/fa";
import {
  getAdminAllClasses,
  approveClassByAdmin,
  rejectClassByAdmin,
  deleteClassByAdmin,
} from "@/lib/api/getClasses";
import { authClient } from "@/lib/auth-client";
import { toast } from "@heroui/react";

const approveClass = async (classId) => {
  const { data: token } = await authClient.token();
  if (!token) throw new Error("Authentication required");
  return approveClassByAdmin(classId, token.token);
};

const rejectClass = async (classId) => {
  const { data: token } = await authClient.token();
  if (!token) throw new Error("Authentication required");
  return rejectClassByAdmin(classId, token.token);
};

const deleteClass = async (classId) => {
  const { data: token } = await authClient.token();
  if (!token) throw new Error("Authentication required");
  return deleteClassByAdmin(classId, token.token);
};

const ManageClasses = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(null);

  // Set page title
  useEffect(() => {
    document.title = "Manage Classes | FlexPulse";
  }, []);

  useEffect(() => {
    const loadClasses = async () => {
      try {
        const data = await getAdminAllClasses();
        setClasses(data || []);
      } catch (err) {
        setError(err.message || "Failed to load classes");
      } finally {
        setLoading(false);
      }
    };
    loadClasses();
  }, []);

  const handleApprove = async (classId) => {
    setActionLoading(classId);
    try {
      await approveClass(classId);
      setClasses((prev) =>
        prev.map((cls) =>
          cls._id === classId ? { ...cls, status: "approved" } : cls,
        ),
      );
      toast.success("Class approved successfully.");
    } catch (err) {
      toast.error("Failed to approve class: " + err.message);
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (classId) => {
    setActionLoading(classId);
    try {
      await rejectClass(classId);
      setClasses((prev) =>
        prev.map((cls) =>
          cls._id === classId ? { ...cls, status: "rejected" } : cls,
        ),
      );
      toast.success("Class rejected successfully.");
    } catch (err) {
      toast.error("Failed to reject class: " + err.message);
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (classId) => {
    setActionLoading(classId);
    try {
      await deleteClass(classId);
      toast.success("Class deleted successfully.");
      setClasses((prev) => prev.filter((cls) => cls._id !== classId));
    } catch (err) {
      toast.error("Failed to delete class: " + err.message);
    } finally {
      setActionLoading(null);
    }
  };

  const getStatusBadge = (status = "") => {
    switch (status.toLowerCase()) {
      case "approved":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <FaCheck className="w-3 h-3" /> APPROVED
          </span>
        );
      case "pending":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
            <FaTimes className="w-3 h-3 animate-pulse" /> PENDING
          </span>
        );
      case "rejected":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
            <FaTimes className="w-3 h-3" /> REJECTED
          </span>
        );
      default:
        return (
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-slate-500/10 text-slate-600 dark:text-slate-400 border border-slate-500/20">
            {status.toUpperCase()}
          </span>
        );
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
        <p className="text-rose-500 font-sans">{error}</p>
      </div>
    );
  }

  const pendingCount = classes.filter((cls) => cls.status?.toLowerCase() === "pending").length;
  const approvedCount = classes.filter((cls) => cls.status?.toLowerCase() === "approved").length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6 px-4 sm:px-0"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-['Outfit'] text-3xl md:text-4xl font-bold text-foreground tracking-wide">
            Manage Classes
          </h1>
          <p className="font-sans text-[#535C91] dark:text-[#9290C3] mt-1">
            {classes.length} total classes · {pendingCount} pending · {approvedCount} approved
          </p>
        </div>
      </div>

      {classes.length === 0 ? (
        <div className="bg-white dark:bg-brand-800/20 rounded-2xl p-12 text-center shadow-card border border-brand-500/15 dark:border-brand-500/20">
          <p className="text-[#535C91] dark:text-[#9290C3] font-sans">
            No classes found.
          </p>
        </div>
      ) : (
        <div className="bg-white dark:bg-brand-800/20 rounded-2xl shadow-card border border-brand-500/15 dark:border-brand-500/20 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left font-sans text-sm">
              <thead className="bg-brand-500/10 text-[#535C91] dark:text-[#9290C3]">
                <tr>
                  <th className="py-3.5 px-6 font-semibold">Image</th>
                  <th className="py-3.5 px-6 font-semibold">Class Name</th>
                  <th className="py-3.5 px-6 font-semibold">Trainer</th>
                  <th className="py-3.5 px-6 font-semibold">Category</th>
                  <th className="py-3.5 px-6 font-semibold">Price</th>
                  <th className="py-3.5 px-6 font-semibold">Status</th>
                  <th className="py-3.5 px-6 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {classes.map((cls) => (
                  <tr
                    key={cls._id}
                    className="border-b border-brand-500/10 hover:bg-brand-500/5 transition-colors"
                  >
                    <td className="py-3.5 px-6">
                      {cls.classImage ? (
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-brand-500/5 border border-brand-500/10 shrink-0">
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
                    <td className="py-4 px-6">
                      <p className="font-bold text-foreground">
                        {cls.className}
                      </p>
                      <p className="text-xs text-[#535C91] dark:text-[#9290C3] mt-0.5">
                        {cls.classSchedule} · {cls.time}
                      </p>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        {cls.authorImage ? (
                          <Image
                            src={cls.authorImage}
                            alt={cls.authorName}
                            width={24}
                            height={24}
                            className="rounded-full object-cover border border-brand-500/10"
                          />
                        ) : (
                          <FaUser className="w-4 h-4 text-active" />
                        )}
                        <span className="font-medium text-foreground">
                          {cls.authorName || "Anonymous"}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-active/10 rounded-full text-xs font-semibold text-active">
                        <FaTag className="w-3.5 h-3.5" />
                        {cls.category}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-foreground font-bold">
                      <span className="flex items-center gap-0.5">
                        ${cls.price}
                      </span>
                    </td>
                    <td className="py-4 px-6">{getStatusBadge(cls.status)}</td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2 flex-wrap">
                        {cls.status?.toLowerCase() !== "approved" && (
                          <button
                            onClick={() => handleApprove(cls._id)}
                            disabled={actionLoading === cls._id}
                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-500 text-white rounded-lg text-xs font-bold hover:bg-emerald-600 transition-colors disabled:opacity-50 cursor-pointer shadow-sm"
                          >
                            {actionLoading === cls._id ? (
                              <FaSpinner className="w-3 h-3 animate-spin" />
                            ) : (
                              <FaCheck className="w-3 h-3" />
                            )}
                            Approve
                          </button>
                        )}
                        {cls.status?.toLowerCase() !== "rejected" && (
                          <button
                            onClick={() => handleReject(cls._id)}
                            disabled={actionLoading === cls._id}
                            className="inline-flex items-center gap-1 px-3 py-1.5 border border-amber-500 text-amber-600 dark:text-amber-400 rounded-lg text-xs font-bold hover:bg-amber-500 hover:text-white transition-colors disabled:opacity-50 cursor-pointer shadow-sm"
                          >
                            {actionLoading === cls._id ? (
                              <FaSpinner className="w-3 h-3 animate-spin" />
                            ) : (
                              <FaTimes className="w-3 h-3" />
                            )}
                            Reject
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(cls._id)}
                          disabled={actionLoading === cls._id}
                          className="inline-flex items-center gap-1 px-3 py-1.5 border border-rose-500 text-rose-500 rounded-lg text-xs font-bold hover:bg-rose-500 hover:text-white transition-colors disabled:opacity-50 cursor-pointer shadow-sm"
                        >
                          {actionLoading === cls._id ? (
                            <FaSpinner className="w-3 h-3 animate-spin" />
                          ) : (
                            <FaTrash className="w-3 h-3" />
                          )}
                          Delete
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
    </motion.div>
  );
};

export default ManageClasses;
