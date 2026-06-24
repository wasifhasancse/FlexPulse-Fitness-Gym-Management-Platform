"use client";

import { getMyclasses } from "@/lib/api/getClasses";
import { getMyForumPost } from "@/lib/api/getForumPosts";
import { authClient } from "@/lib/auth-client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaEdit, FaList, FaPlus, FaSpinner, FaUser } from "react-icons/fa";

// Dummy API functions – replace with real calls
const fetchTrainerStats = async (trainerId) => {
  return {
    totalClasses: 5,
    totalStudents: 2,
    forumPosts: 3,
  };
};

export default function TrainerDashboardPage() {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const trainerId = user?.id;

  const [classes, setClasses] = useState({});
  const [forunPosts, setForumPosts] = useState({});

  const [stats, setStats] = useState({
    totalClasses: 0,
    totalStudents: 0,
    forumPosts: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!trainerId) return;
    const loadData = async () => {
      try {
        const myclasses = await getMyclasses(trainerId);
        const myForumPosts = await getMyForumPost(trainerId);
        setForumPosts(myForumPosts);
        setClasses(myclasses);
      } catch (err) {
        setError(err.message || "Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [trainerId]);

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "bg-[#00FF66]/10 text-[#00FF66] border border-[#00FF66]/20";
      case "pending":
        return "bg-[#F59E0B]/10 text-[#F59E0B] border border-[#F59E0B]/20";
      case "rejected":
        return "bg-[#FF3366]/10 text-[#FF3366] border border-[#FF3366]/20";
      default:
        return "bg-[#94A3B8]/10 text-[#94A3B8] border border-[#94A3B8]/20";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <FaSpinner className="w-8 h-8 text-[#CCFF00] animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="font-['Inter'] text-[#FF3366]">
          Error loading dashboard: {error}
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
      {/* Welcome */}
      <div>
        <h1 className="font-['Outfit'] text-3xl md:text-4xl font-bold text-white tracking-wide">
          Trainer Dashboard
        </h1>
        <p className="font-['Inter'] text-[#94A3B8] mt-1">
          Welcome back, {user?.name?.split(" ")[0] || "Trainer"}!
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#131826] rounded-xl p-4 shadow-sm border border-[#1E293B] text-center">
          <p className="font-['Inter'] text-3xl font-bold text-[#CCFF00]">
            {classes.length}
          </p>
          <p className="font-['Inter'] text-sm text-[#94A3B8]">
            Total Classes Created
          </p>
        </div>
        <div className="bg-[#131826] rounded-xl p-4 shadow-sm border border-[#1E293B] text-center">
          <p className="font-['Inter'] text-3xl font-bold text-[#CCFF00]">
            {stats.totalStudents}
          </p>
          <p className="font-['Inter'] text-sm text-[#94A3B8]">
            Total Students Enrolled
          </p>
        </div>
        <div className="bg-[#131826] rounded-xl p-4 shadow-sm border border-[#1E293B] text-center">
          <p className="font-['Inter'] text-3xl font-bold text-[#CCFF00]">
            {forunPosts.length}
          </p>
          <p className="font-['Inter'] text-sm text-[#94A3B8]">Forum Posts</p>
        </div>
      </div>

      {/* Profile & Quick Actions */}
      <div className="bg-[#131826] rounded-xl p-4 shadow-sm border border-[#1E293B] flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          {user?.image ? (
            <Image
              src={user.image}
              alt={user.name}
              width={48}
              height={48}
              className="w-12 h-12 rounded-full object-cover border-2 border-[#3B82F6]"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-[#1E293B] flex items-center justify-center text-[#CCFF00]">
              <FaUser className="w-6 h-6" />
            </div>
          )}
          <div>
            <p className="font-['Inter'] font-semibold text-white">
              {user?.name || "Trainer"}
            </p>
            <p className="font-['Inter'] text-sm text-[#94A3B8]">
              {user?.email || "trainer@example.com"}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 ml-auto">
          <span className="px-3 py-1 bg-transparent border border-[#3B82F6] text-[#3B82F6] text-xs font-semibold rounded-full uppercase tracking-wider">
            Trainer
          </span>
        </div>
      </div>

      {/* Quick Action Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Link
          href="/dashboard/trainer/add-class"
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#CCFF00] text-[#0B0F19] font-['Inter'] font-medium rounded-lg hover:bg-[#B2E600] transition-colors shadow-sm"
        >
          <FaPlus className="w-4 h-4" /> Add New Class
        </Link>
        <Link
          href="/dashboard/trainer/my-classes"
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#131826] border border-[#1E293B] text-[#94A3B8] font-['Inter'] font-medium rounded-lg hover:border-[#CCFF00] hover:text-[#CCFF00] transition-colors shadow-sm"
        >
          <FaList className="w-4 h-4" /> My Classes
        </Link>
        <Link
          href="/dashboard/trainer/forum-posts"
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#131826] border border-[#1E293B] text-[#94A3B8] font-['Inter'] font-medium rounded-lg hover:border-[#CCFF00] hover:text-[#CCFF00] transition-colors shadow-sm"
        >
          <FaPlus className="w-4 h-4" /> Add Forum Post
        </Link>
        <Link
          href="/dashboard/trainer/my-posts"
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#131826] border border-[#1E293B] text-[#94A3B8] font-['Inter'] font-medium rounded-lg hover:border-[#CCFF00] hover:text-[#CCFF00] transition-colors shadow-sm"
        >
          <FaEdit className="w-4 h-4" /> My Posts
        </Link>
      </div>

      {/* Recent Classes */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-['Inter'] text-lg font-semibold text-white">
            Recent Classes
          </h2>
          <Link
            href="/dashboard/trainer/my-classes"
            className="font-['Inter'] text-sm text-[#CCFF00] hover:text-[#B2E600] transition-colors"
          >
            View all {classes.length} classes →
          </Link>
        </div>
        {classes.length === 0 ? (
          <div className="bg-[#131826] rounded-xl p-6 text-center shadow-sm border border-[#1E293B]">
            <p className="font-['Inter'] text-[#94A3B8]">
              No classes created yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...classes]
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .slice(0, 3)
              .map((cls) => (
                <div
                  key={cls._id}
                  className="bg-[#131826] rounded-xl shadow-sm border border-[#1E293B] overflow-hidden hover:shadow-md hover:border-[#CCFF00]/30 transition-all"
                >
                  {cls.classImage && (
                    <div className="relative w-full h-40 bg-[#1E293B]">
                      <Image
                        src={cls.classImage}
                        alt={cls.className}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-['Inter'] font-semibold text-white">
                          {cls.className}
                        </h3>
                        <p className="font-['Inter'] text-sm text-[#94A3B8]">
                          {cls.category} · {cls.difficultyLevel}
                        </p>
                      </div>
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                          cls.status,
                        )}`}
                      >
                        {cls.status.charAt(0).toUpperCase() +
                          cls.status.slice(1)}
                      </span>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="font-['Inter'] text-sm font-medium text-[#CCFF00]">
                        ${cls.price}
                      </span>
                      <span className="font-['Inter'] text-xs text-[#94A3B8]">
                        {cls.classSchedule}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
