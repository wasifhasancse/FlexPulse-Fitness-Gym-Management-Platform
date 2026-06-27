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
import { setUserRole } from "@/lib/api/user";
import toast from "react-hot-toast";
import Image from "next/image";

const demoteTrainer = async (trainerId, token) => {
  return setUserRole(trainerId, "member", token);
};


const manageTrainiers = () => {
   const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(null);

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
        setTrainers(data);
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
        <FaSpinner className="w-8 h-8 text-[#D4845A] animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-[#C47A6A] font-['Inter']">{error}</p>
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
      <h1 className="font-['Outfit'] text-3xl md:text-4xl font-bold text-white">
        Manage Trainers
      </h1>

      <p className="font-['Inter'] text-[#94A3B8] mt-1">
        {trainers.length} Active{" "}
        {trainers.length === 1 ? "Trainer" : "Trainers"}
      </p>
    </div>

    {trainers.length === 0 ? (
      <div className="bg-[#131826] border border-[#1E293B] rounded-xl p-14 text-center">
        <FaChalkboardTeacher className="mx-auto text-5xl text-[#CCFF00] mb-4" />

        <h3 className="text-white font-semibold text-lg">
          No Trainers Found
        </h3>

        <p className="text-[#94A3B8] mt-2">
          There are currently no active trainers.
        </p>
      </div>
    ) : (
      <div className="bg-[#131826] border border-[#1E293B] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#0F172A] border-b border-[#1E293B]">
              <tr className="text-left">
                <th className="px-6 py-4 text-xs uppercase tracking-wider text-[#94A3B8]">
                  Trainer
                </th>

                <th className="px-6 py-4 text-xs uppercase tracking-wider text-[#94A3B8]">
                  Email
                </th>

                <th className="px-6 py-4 text-xs uppercase tracking-wider text-[#94A3B8]">
                  Specialty
                </th>

                <th className="px-6 py-4 text-xs uppercase tracking-wider text-[#94A3B8]">
                  Classes
                </th>

                <th className="px-6 py-4 text-xs uppercase tracking-wider text-[#94A3B8]">
                  Joined
                </th>

                <th className="px-6 py-4 text-right text-xs uppercase tracking-wider text-[#94A3B8]">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {trainers.map((trainer) => (
                <tr
                  key={trainer._id}
                  className="border-b border-[#1E293B] hover:bg-[#182132] transition"
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
                          className="rounded-full border-2 border-[#CCFF00] object-cover"
                        />
                      ) : (
                        <FaUserCircle className="w-11 h-11 text-[#CCFF00]" />
                      )}

                      <div>
                        <p className="text-white font-semibold">
                          {trainer.name}
                        </p>

                        <p className="text-xs text-[#94A3B8]">
                          Trainer Account
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Email */}

                  <td className="px-6 py-5 text-[#CBD5E1]">
                    {trainer.email}
                  </td>

                  {/* Specialty */}

                  <td className="px-6 py-5">
                    <span className="px-3 py-1 rounded-full bg-[#CCFF00]/10 text-[#CCFF00] text-xs font-medium">
                      {trainer.specialty}
                    </span>
                  </td>

                  {/* Classes */}

                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2 text-white">
                      <FaChalkboardTeacher className="text-[#3B82F6]" />

                      {trainer.classesCount}
                    </div>
                  </td>

                  {/* Joined */}

                  <td className="px-6 py-5 text-[#94A3B8]">
                    {formatDate(trainer.joinedAt)}
                  </td>

                  {/* Action */}

                  <td className="px-6 py-5 text-right">
                    <AlertDialog>
                      <Button
                        disabled={actionLoading === trainer._id}
                        className="
                        bg-transparent
                        border
                        border-[#FF3366]
                        text-[#FF3366]
                        hover:bg-[#FF3366]
                        hover:text-white
                        transition
                        rounded-lg
                        "
                      >
                        {actionLoading === trainer._id ? (
                          <FaSpinner className="animate-spin" />
                        ) : (
                          <FaUser />
                        )}

                        Demote
                      </Button>

                      <AlertDialog.Backdrop>
                        <AlertDialog.Container>
                          <AlertDialog.Dialog className="bg-[#131826] border border-[#1E293B] text-white">
                            <AlertDialog.CloseTrigger />

                            <AlertDialog.Header>
                              <AlertDialog.Icon status="danger" />

                              <AlertDialog.Heading>
                                Demote Trainer
                              </AlertDialog.Heading>
                            </AlertDialog.Header>

                            <AlertDialog.Body>
                              <p className="text-[#94A3B8]">
                                Are you sure you want to demote
                                <span className="text-white font-semibold">
                                  {" "}
                                  {trainer.name}
                                </span>{" "}
                                to a regular user?
                              </p>
                            </AlertDialog.Body>

                            <AlertDialog.Footer>
                              <Button
                                slot="close"
                                variant="secondary"
                              >
                                Cancel
                              </Button>

                              <Button
                                slot="close"
                                variant="danger"
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

export default manageTrainiers;
