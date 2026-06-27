"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaSpinner,
  FaEye,
  FaCheck,
  FaTimes,
  FaUserCircle,
  FaCalendarAlt,
  FaTag,
  FaClock,
} from "react-icons/fa";
import { authClient } from "@/lib/auth-client";
import {
  getAllTrainerApplication,
  approveTrainerApplication,
  rejectTrainerApplication,
  cancelTrainerApplication,
} from "@/lib/api/getTrainerApplication";
import { toast } from "@heroui/react";

const ManageTrainerApplication = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedApp, setSelectedApp] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [actionLoading, setActionLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [token, setToken] = useState(null);

  const pendingApplications = applications.filter(
    (app) => app.status?.toLowerCase() === "pending",
  );
  const pendingCount = pendingApplications.length;

  // Set page title
  useEffect(() => {
    document.title = "Trainer Applications | FlexPulse";
  }, []);

  useEffect(() => {
    const loadApps = async () => {
      try {
        const { data: tokenData } = await authClient.token();
        if (!tokenData?.token) {
          throw new Error("Unable to authenticate admin");
        }
        setToken(tokenData.token);

        const data = await getAllTrainerApplication(tokenData.token);
        setApplications(data || []);
      } catch (err) {
        setError(err.message || "Failed to load applications");
      } finally {
        setLoading(false);
      }
    };
    loadApps();
  }, []);

  const openModal = (app) => {
    setSelectedApp(app);
    setFeedback(app.feedback || "");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedApp(null);
    setFeedback("");
  };

  const handleAction = async (action) => {
    if (!selectedApp || !token) return;
    setActionLoading(true);
    try {
      if (action === "approve") {
        await approveTrainerApplication(selectedApp._id, feedback, token);
        setApplications((prev) =>
          prev.map((app) =>
            app._id === selectedApp._id
              ? { ...app, status: "approved", feedback }
              : app,
          ),
        );
        toast.success("Trainer application approved successfully!");
      } else if (action === "reject") {
        await rejectTrainerApplication(selectedApp._id, feedback, token);
        setApplications((prev) =>
          prev.map((app) =>
            app._id === selectedApp._id
              ? { ...app, status: "rejected", feedback }
              : app,
          ),
        );
        toast.success("Trainer application rejected.");
      } else if (action === "cancel") {
        await cancelTrainerApplication(selectedApp._id, token);
        setApplications((prev) =>
          prev.filter((app) => app._id !== selectedApp._id),
        );
        toast.success("Trainer application cancelled.");
      }
      closeModal();
    } catch (err) {
      toast.error(`Failed to ${action}: ${err.message}`);
    } finally {
      setActionLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
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

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-6 px-4 sm:px-0"
      >
        {/* Header */}
        <div>
          <h1 className="font-['Outfit'] text-3xl md:text-4xl font-bold text-foreground tracking-wide">
            Applied Trainers
          </h1>
          <p className="font-sans text-[#535C91] dark:text-[#9290C3] mt-1">
            {pendingCount} pending {pendingCount === 1 ? "application" : "applications"}
          </p>
        </div>

        {pendingCount === 0 ? (
          <div className="bg-white dark:bg-brand-800/20 rounded-2xl p-12 text-center shadow-card border border-brand-500/15 dark:border-brand-500/20">
            <p className="text-[#535C91] dark:text-[#9290C3] font-sans">
              No pending trainer applications.
            </p>
          </div>
        ) : (
          <div className="bg-white dark:bg-brand-800/20 rounded-2xl shadow-card border border-brand-500/15 dark:border-brand-500/20 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left font-sans text-sm">
                <thead className="bg-brand-500/10 text-[#535C91] dark:text-[#9290C3]">
                  <tr>
                    <th className="py-3.5 px-6 font-semibold">Applicant</th>
                    <th className="py-3.5 px-6 font-semibold">Specialty</th>
                    <th className="py-3.5 px-6 font-semibold">Experience</th>
                    <th className="py-3.5 px-6 font-semibold">Applied At</th>
                    <th className="py-3.5 px-6 font-semibold text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingApplications.map((app) => (
                    <tr
                      key={app._id}
                      className="border-b border-brand-500/10 hover:bg-brand-500/5 transition-colors"
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          {app.userImage ? (
                            <Image
                              width={36}
                              height={36}
                              src={app.userImage}
                              alt={app.userName}
                              className="w-9 h-9 rounded-full object-cover border border-brand-500/10"
                            />
                          ) : (
                            <FaUserCircle className="w-9 h-9 text-active shrink-0" />
                          )}
                          <div>
                            <p className="font-bold text-foreground">
                              {app.userName}
                            </p>
                            <p className="text-xs text-[#535C91] dark:text-[#9290C3] mt-0.5">
                              {app.userEmail}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-foreground font-medium">
                        {app.specialty}
                      </td>
                      <td className="py-4 px-6 text-foreground font-semibold">
                        {app.experience} years
                      </td>
                      <td className="py-4 px-6 text-foreground text-xs font-medium">
                        {formatDate(app.appliedAt || app.time)}
                      </td>
                      <td className="py-4 px-6 text-right">
                        <button
                          onClick={() => openModal(app)}
                          className="inline-flex items-center gap-1.5 px-4 py-2 bg-btn-bg text-btn-text rounded-xl text-xs font-bold hover:opacity-90 transition-all shadow-sm cursor-pointer"
                        >
                          <FaEye className="w-3.5 h-3.5" />
                          Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </motion.div>

      {/* Details Modal */}
      {isModalOpen && selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="bg-background rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-brand-500/20 max-h-[90vh] overflow-y-auto"
          >
            <h2 className="font-['Outfit'] text-2xl font-bold text-foreground mb-4">
              Application Details
            </h2>

            <div className="space-y-5">
              {/* Applicant info */}
              <div className="flex items-center gap-3 bg-brand-500/5 p-4 rounded-xl border border-brand-500/10">
                {selectedApp.userImage ? (
                  <Image
                    width={48}
                    height={48}
                    src={selectedApp.userImage}
                    alt={selectedApp.userName}
                    className="w-12 h-12 rounded-full object-cover border border-brand-500/10"
                  />
                ) : (
                  <FaUserCircle className="w-12 h-12 text-active shrink-0" />
                )}
                <div>
                  <p className="font-sans font-bold text-foreground">
                    {selectedApp.userName}
                  </p>
                  <p className="text-sm text-[#535C91] dark:text-[#9290C3] mt-0.5">
                    {selectedApp.userEmail}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-brand-500/5 p-3 rounded-xl border border-brand-500/10">
                  <p className="text-[#535C91] dark:text-[#9290C3] text-xs flex items-center gap-1.5 font-bold uppercase tracking-wider mb-1">
                    <FaTag className="w-3.5 h-3.5 text-active" />
                    Specialty
                  </p>
                  <p className="font-bold text-foreground">
                    {selectedApp.specialty}
                  </p>
                </div>
                <div className="bg-brand-500/5 p-3 rounded-xl border border-brand-500/10">
                  <p className="text-[#535C91] dark:text-[#9290C3] text-xs flex items-center gap-1.5 font-bold uppercase tracking-wider mb-1">
                    <FaCalendarAlt className="w-3.5 h-3.5 text-active" />
                    Experience
                  </p>
                  <p className="font-bold text-foreground">
                    {selectedApp.experience} years
                  </p>
                </div>
              </div>

              <div className="bg-brand-500/5 p-3.5 rounded-xl border border-brand-500/10 text-sm">
                <p className="text-[#535C91] dark:text-[#9290C3] text-xs flex items-center gap-1.5 font-bold uppercase tracking-wider mb-1">
                  <FaClock className="w-3.5 h-3.5 text-active" />
                  Applied At
                </p>
                <p className="font-bold text-foreground">
                  {formatDate(selectedApp.appliedAt || selectedApp.time)}
                </p>
              </div>

              {/* Bio */}
              <div className="bg-brand-500/5 p-4 rounded-xl border border-brand-500/10 text-sm">
                <p className="text-[#535C91] dark:text-[#9290C3] text-xs flex items-center gap-1.5 font-bold uppercase tracking-wider mb-1.5">
                  <FaTag className="w-3.5 h-3.5 text-active" />
                  Professional Bio
                </p>
                <p className="text-foreground leading-relaxed font-sans">
                  {selectedApp.bio || "No bio description provided."}
                </p>
              </div>

              {/* Feedback Input */}
              <div>
                <label
                  htmlFor="feedback"
                  className="block font-sans text-sm font-bold text-foreground mb-2"
                >
                  Feedback Message
                </label>
                <textarea
                  id="feedback"
                  rows="3"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Provide feedback for the applicant (mandatory if rejecting)..."
                  className="w-full px-4 py-3 bg-brand-50/5 dark:bg-brand-800/40 border border-brand-500/20 dark:border-brand-500/30 rounded-xl text-foreground placeholder-[#535C91]/50 dark:placeholder-[#9290C3]/50 focus:outline-none focus:border-active focus:ring-1 focus:ring-active transition-all font-sans text-sm resize-none shadow-inner"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2 pt-2">
                <div className="flex gap-2">
                  <button
                    onClick={() => handleAction("approve")}
                    disabled={actionLoading}
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-emerald-500 text-white font-sans font-bold rounded-xl hover:bg-emerald-600 transition-colors disabled:opacity-50 cursor-pointer shadow-md text-sm"
                  >
                    {actionLoading ? (
                      <FaSpinner className="animate-spin" />
                    ) : (
                      <FaCheck />
                    )}
                    Approve
                  </button>
                  <button
                    onClick={() => handleAction("reject")}
                    disabled={actionLoading}
                    className="flex-1 flex items-center justify-center gap-2 py-3 border border-rose-500/35 text-rose-500 font-sans font-bold rounded-xl hover:bg-rose-500 hover:text-white transition-colors disabled:opacity-50 cursor-pointer shadow-md text-sm"
                  >
                    {actionLoading ? (
                      <FaSpinner className="animate-spin" />
                    ) : (
                      <FaTimes />
                    )}
                    Reject
                  </button>
                </div>
                <button
                  onClick={() => handleAction("cancel")}
                  disabled={actionLoading}
                  className="w-full flex items-center justify-center gap-2 py-3 border border-brand-500/30 text-[#535C91] dark:text-[#9290C3] hover:bg-brand-500/10 font-sans font-bold rounded-xl transition-colors disabled:opacity-50 cursor-pointer text-xs"
                >
                  {actionLoading ? (
                    <FaSpinner className="animate-spin" />
                  ) : (
                    <FaTimes />
                  )}
                  Cancel Application Record
                </button>
                <button
                  onClick={closeModal}
                  className="w-full py-2.5 px-4 text-[#535C91] dark:text-[#9290C3] font-sans font-bold text-sm hover:text-foreground transition-colors cursor-pointer text-center"
                  disabled={actionLoading}
                >
                  Close Detail Modal
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default ManageTrainerApplication;
