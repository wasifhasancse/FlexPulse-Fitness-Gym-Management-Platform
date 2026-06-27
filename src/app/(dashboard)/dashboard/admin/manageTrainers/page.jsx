"use client";

import { AlertDialog, Button } from "@heroui/react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaSpinner,
  FaUserCircle,
  FaChalkboardTeacher,
  FaUser,
} from "react-icons/fa";
import { getAllTrainer } from "@/lib/api/getTrainerApplication";
import { authClient } from "@/lib/auth-client";
import { setUserRole } from "@/lib/api/getAllUsers";
import { toast } from "@heroui/react";
import Image from "next/image";

const demoteTrainer = async (trainerId, token) => {
  return setUserRole(trainerId, "member", token);
};

const ManageTrainers = () => {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(null);

  // Set page title
  useEffect(() => {
    document.title = "Manage Trainers | FlexPulse";
  }, []);

  useEffect(() => {
    const loadTrainers = async () => {
      const { data: token } = await authClient.token();

      if (!token) {
        toast.error("Authentication failed. Please login again.");
        setLoading(false);
        return;
      }
      try {
        const data = await getAllTrainer(token.token);
        setTrainers(data || []);
      } catch (err) {
        setError(err.message || "Failed to load trainers");
      } finally {
        setLoading(false);
      }
    };
    loadTrainers();
  }, []);

  const handleDemote = async (trainer) => {
    const { data: token } = await authClient.token();
    if (!token) {
      toast.error("Authentication failed. Please login again.");
      return;
    }

    setActionLoading(trainer._id);
    try {
      await demoteTrainer(trainer._id, token.token);
      setTrainers((prev) => prev.filter((t) => t._id !== trainer._id));
      toast.success(`${trainer.name} was demoted to User.`);
    } catch (err) {
      toast.error("Failed to demote trainer: " + err.message);
    } finally {
      setActionLoading(null);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
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
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6 px-4 sm:px-0"
    >
      {/* Header */}
      <div>
        <h1 className="font-['Outfit'] text-3xl md:text-4xl font-bold text-foreground tracking-wide">
          Manage Trainers
        </h1>
        <p className="font-sans text-[#535C91] dark:text-[#9290C3] mt-1">
          {trainers.length} Active {trainers.length === 1 ? "Trainer" : "Trainers"} on the platform
        </p>
      </div>

      {trainers.length === 0 ? (
        <div className="bg-white dark:bg-brand-800/20 rounded-2xl p-14 text-center shadow-card border border-brand-500/15 dark:border-brand-500/20">
          <FaChalkboardTeacher className="mx-auto text-5xl text-active mb-4" />
          <h3 className="text-foreground font-bold text-lg">
            No Trainers Found
          </h3>
          <p className="text-[#535C91] dark:text-[#9290C3] mt-2 text-sm">
            There are currently no active trainers.
          </p>
        </div>
      ) : (
        <div className="bg-white dark:bg-brand-800/20 rounded-2xl shadow-card border border-brand-500/15 dark:border-brand-500/20 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left font-sans text-sm">
              <thead className="bg-brand-500/10 text-[#535C91] dark:text-[#9290C3]">
                <tr>
                  <th className="px-6 py-4 font-semibold">Trainer</th>
                  <th className="px-6 py-4 font-semibold">Email</th>
                  <th className="px-6 py-4 font-semibold">Specialty</th>
                  <th className="px-6 py-4 font-semibold">Classes</th>
                  <th className="px-6 py-4 font-semibold">Joined</th>
                  <th className="px-6 py-4 text-right font-semibold">Action</th>
                </tr>
              </thead>

              <tbody>
                {trainers.map((trainer) => (
                  <tr
                    key={trainer._id}
                    className="border-b border-brand-500/10 hover:bg-brand-500/5 transition-colors"
                  >
                    {/* Trainer */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        {trainer.image ? (
                          <Image
                            src={trainer.image}
                            alt={trainer.name}
                            width={44}
                            height={44}
                            className="rounded-full border-2 border-active/40 object-cover"
                          />
                        ) : (
                          <FaUserCircle className="w-11 h-11 text-active" />
                        )}

                        <div>
                          <p className="text-foreground font-bold">
                            {trainer.name}
                          </p>
                          <p className="text-xs text-[#535C91] dark:text-[#9290C3] mt-0.5">
                            Trainer Account
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Email */}
                    <td className="px-6 py-5 text-foreground font-medium">
                      {trainer.email}
                    </td>

                    {/* Specialty */}
                    <td className="px-6 py-5">
                      <span className="px-3 py-1 rounded-full bg-active/10 text-active text-xs font-semibold">
                        {trainer.specialty || "Fitness"}
                      </span>
                    </td>

                    {/* Classes */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 text-foreground font-medium">
                        <FaChalkboardTeacher className="text-active w-4 h-4" />
                        {trainer.classesCount || 0}
                      </div>
                    </td>

                    {/* Joined */}
                    <td className="px-6 py-5 text-[#535C91] dark:text-[#9290C3]">
                      {formatDate(trainer.joinedAt || trainer.createdAt)}
                    </td>

                    {/* Action */}
                    <td className="px-6 py-5 text-right">
                      <AlertDialog>
                        <Button
                          disabled={actionLoading === trainer._id}
                          className="bg-transparent border border-rose-500/35 text-rose-500 hover:bg-rose-500 hover:text-white transition-all rounded-lg text-xs font-bold px-3 py-1.5 cursor-pointer"
                        >
                          {actionLoading === trainer._id ? (
                            <FaSpinner className="animate-spin" />
                          ) : (
                            <FaUser className="w-3.5 h-3.5" />
                          )}
                          Demote
                        </Button>

                        <AlertDialog.Backdrop>
                          <AlertDialog.Container>
                            <AlertDialog.Dialog className="bg-background border border-brand-500/20 text-foreground rounded-2xl shadow-xl overflow-hidden p-6 max-w-md">
                              <AlertDialog.CloseTrigger />

                              <AlertDialog.Header className="pb-4 border-b border-brand-500/10">
                                <AlertDialog.Icon status="danger" />
                                <AlertDialog.Heading className="text-lg font-bold font-sans">
                                  Demote Trainer
                                </AlertDialog.Heading>
                              </AlertDialog.Header>

                              <AlertDialog.Body className="py-4">
                                <p className="text-[#535C91] dark:text-[#9290C3] font-sans text-sm">
                                  Are you sure you want to demote
                                  <span className="text-foreground font-bold">
                                    {" "}
                                    {trainer.name}
                                  </span>{" "}
                                  to a regular user?
                                </p>
                              </AlertDialog.Body>

                              <AlertDialog.Footer className="pt-4 border-t border-brand-500/10 flex justify-end gap-2">
                                <Button
                                  slot="close"
                                  className="bg-transparent border border-brand-500/20 text-[#535C91] dark:text-[#9290C3] hover:bg-brand-500/10 px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer"
                                >
                                  Cancel
                                </Button>
                                <Button
                                  slot="close"
                                  className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer"
                                  onClick={() => handleDemote(trainer)}
                                >
                                  Demote
                                </Button>
                              </AlertDialog.Footer>
                            </AlertDialog.Dialog>
                          </AlertDialog.Container>
                        </AlertDialog.Backdrop>
                      </AlertDialog>
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

export default ManageTrainers;
