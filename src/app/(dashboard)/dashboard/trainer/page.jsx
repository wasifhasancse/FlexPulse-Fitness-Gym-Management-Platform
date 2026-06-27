"use client";

import { getMyClasses } from "@/lib/api/getClasses";
import { getMyForumPost } from "@/lib/api/getForumPosts";
import { authClient } from "@/lib/auth-client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaEdit, FaList, FaPlus, FaSpinner, FaUser } from "react-icons/fa";

export const metadata = {
  title: "Trainer - Dashboard",
  description:
    "Manage your fitness classes and forum posts on the FlexPulse platform. Track your classes, engage with students, and share your expertise with the community.",
};

export default function TrainerDashboardPage() {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const trainerId = user?.id;

  const [classes, setClasses] = useState([]);
  const [forumPosts, setForumPosts] = useState([]);
  const [stats, setStats] = useState({
    totalClasses: 0,
    totalStudents: 0,
    forumPosts: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Set page title
  useEffect(() => {
    document.title = "Trainer Dashboard | FlexPulse";
  }, []);

  useEffect(() => {
    if (!trainerId) return;
    const loadData = async () => {
      try {
        const [myclasses, myForumPosts, statsRes] = await Promise.all([
          getMyClasses(trainerId),
          getMyForumPost(trainerId),
          fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/trainer/stats?trainerId=${trainerId}`),
        ]);
        const statsData = await statsRes.json();
        setStats({
          totalClasses: statsData.totalClasses || 0,
          totalStudents: statsData.totalStudents || 0,
          forumPosts: myForumPosts?.length || 0,
        });
        setForumPosts(myForumPosts || []);
        setClasses(myclasses || []);
      } catch (err) {
        setError(err.message || "Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [trainerId]);

  const getStatusColor = (status = "") => {
    switch (status.toLowerCase()) {
      case "approved":
        return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20";
      case "pending":
        return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20";
      case "rejected":
        return "bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20";
      default:
        return "bg-slate-500/10 text-slate-600 dark:text-slate-400 border border-slate-500/20";
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
        <h1 className="font-['Outfit'] text-3xl md:text-4xl font-bold text-foreground tracking-wide">
          Trainer Dashboard
        </h1>
        <p className="font-['Inter'] text-[#535C91] dark:text-[#9290C3] mt-1">
          Welcome back, {user?.name?.split(" ")[0] || "Trainer"}!
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-brand-800/20 rounded-2xl p-6 shadow-card border border-brand-500/15 dark:border-brand-500/20 text-center hover:-translate-y-0.5 transition-all duration-300">
          <p className="font-['Inter'] text-3xl font-extrabold text-active">
            {classes.length}
          </p>
          <p className="font-['Inter'] text-sm text-[#535C91] dark:text-[#9290C3] mt-1">
            Total Classes Created
          </p>
        </div>
        <div className="bg-white dark:bg-brand-800/20 rounded-2xl p-6 shadow-card border border-brand-500/15 dark:border-brand-500/20 text-center hover:-translate-y-0.5 transition-all duration-300">
          <p className="font-['Inter'] text-3xl font-extrabold text-active">
            {stats.totalStudents}
          </p>
          <p className="font-['Inter'] text-sm text-[#535C91] dark:text-[#9290C3] mt-1">
            Total Students Enrolled
          </p>
        </div>
        <div className="bg-white dark:bg-brand-800/20 rounded-2xl p-6 shadow-card border border-brand-500/15 dark:border-brand-500/20 text-center hover:-translate-y-0.5 transition-all duration-300">
          <p className="font-['Inter'] text-3xl font-extrabold text-active">
            {forumPosts.length}
          </p>
          <p className="font-['Inter'] text-sm text-[#535C91] dark:text-[#9290C3] mt-1">
            Forum Posts Created
          </p>
        </div>
      </div>

      {/* Profile & Quick Actions */}
      <div className="bg-white dark:bg-brand-800/20 rounded-2xl p-6 shadow-card border border-brand-500/15 dark:border-brand-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {user?.image ? (
            <Image
              src={user.image}
              alt={user.name}
              width={48}
              height={48}
              className="w-12 h-12 rounded-full object-cover border-2 border-active/40"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-brand-500/10 flex items-center justify-center text-active">
              <FaUser className="w-6 h-6" />
            </div>
          )}
          <div>
            <p className="font-['Inter'] font-bold text-foreground">
              {user?.name || "Trainer"}
            </p>
            <p className="font-['Inter'] text-sm text-[#535C91] dark:text-[#9290C3]">
              {user?.email || "trainer@example.com"}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="px-3.5 py-0.5 bg-transparent border border-active text-active text-xs font-semibold rounded-full uppercase tracking-wider">
            Trainer Role
          </span>
        </div>
      </div>

      {/* Quick Action Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Link
          href="/dashboard/trainer/add-class"
          className="flex items-center justify-center gap-2 px-4 py-3 bg-btn-bg text-btn-text font-['Inter'] font-semibold rounded-xl hover:opacity-90 transition-all shadow-md text-sm border border-brand-500/20"
        >
          <FaPlus className="w-4 h-4" /> Add New Class
        </Link>
        <Link
          href="/dashboard/trainer/my-classes"
          className="flex items-center justify-center gap-2 px-4 py-3 bg-white dark:bg-brand-800/20 border border-brand-500/15 dark:border-brand-500/30 text-[#535C91] dark:text-[#9290C3] hover:text-active hover:border-active/40 font-['Inter'] font-semibold rounded-xl transition-all shadow-sm text-sm"
        >
          <FaList className="w-4 h-4" /> My Classes
        </Link>
        <Link
          href="/dashboard/trainer/forum-post"
          className="flex items-center justify-center gap-2 px-4 py-3 bg-white dark:bg-brand-800/20 border border-brand-500/15 dark:border-brand-500/30 text-[#535C91] dark:text-[#9290C3] hover:text-active hover:border-active/40 font-['Inter'] font-semibold rounded-xl transition-all shadow-sm text-sm"
        >
          <FaPlus className="w-4 h-4" /> Add Forum Post
        </Link>
        <Link
          href="/dashboard/trainer/my-posts"
          className="flex items-center justify-center gap-2 px-4 py-3 bg-white dark:bg-brand-800/20 border border-brand-500/15 dark:border-brand-500/30 text-[#535C91] dark:text-[#9290C3] hover:text-active hover:border-active/40 font-['Inter'] font-semibold rounded-xl transition-all shadow-sm text-sm"
        >
          <FaEdit className="w-4 h-4" /> My Posts
        </Link>
      </div>

      {/* Recent Classes */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-['Inter'] text-lg font-bold text-foreground">
            Recent Classes
          </h2>
          <Link
            href="/dashboard/trainer/my-classes"
            className="font-['Inter'] text-sm text-active hover:underline transition-colors"
          >
            View all {classes.length} classes →
          </Link>
        </div>
        {classes.length === 0 ? (
          <div className="bg-white dark:bg-brand-800/20 rounded-2xl p-8 text-center shadow-card border border-brand-500/15 dark:border-brand-500/20">
            <p className="font-['Inter'] text-[#535C91] dark:text-[#9290C3]">
              No classes created yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...classes]
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .slice(0, 3)
              .map((cls) => (
                <div
                  key={cls._id}
                  className="bg-white dark:bg-brand-800/20 rounded-2xl shadow-card border border-brand-500/15 dark:border-brand-500/20 overflow-hidden hover:shadow-lg hover:border-active/30 transition-all duration-300"
                >
                  {cls.classImage && (
                    <div className="relative w-full h-40 bg-brand-500/10">
                      <Image
                        src={cls.classImage}
                        alt={cls.className}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  )}
                  <div className="p-5 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-['Inter'] font-bold text-foreground line-clamp-1">
                          {cls.className}
                        </h3>
                        <p className="font-['Inter'] text-xs text-[#535C91] dark:text-[#9290C3] mt-0.5">
                          {cls.category} · {cls.difficultyLevel}
                        </p>
                      </div>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider shrink-0 ${getStatusColor(
                          cls.status,
                        )}`}
                      >
                        {cls.status}
                      </span>
                    </div>
                    <div className="mt-2 pt-3 border-t border-brand-500/10 flex items-center justify-between">
                      <span className="font-['Inter'] text-base font-extrabold text-active">
                        ${cls.price}
                      </span>
                      <span className="font-['Inter'] text-xs text-[#535C91] dark:text-[#9290C3]">
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
