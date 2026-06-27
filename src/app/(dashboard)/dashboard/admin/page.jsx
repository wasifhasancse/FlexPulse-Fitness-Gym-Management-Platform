"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaUsers,
  FaCheckCircle,
  FaUserCircle,
  FaChartPie,
} from "react-icons/fa";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import { getAllClasses } from "@/lib/api/getClasses";
import { getAllUsers } from "@/lib/api/getAllUsers";

const COLORS = ["#9FA1FF", "#535C91", "#3B82F6", "#FF3366"];

export default function AdminDashboardPage() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [users, setUsers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Set page title
  useEffect(() => {
    document.title = "Admin Dashboard | FlexPulse";
  }, []);

  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      try {
        const data = await getAllUsers();
        const classesData = await getAllClasses();
        setClasses(classesData || []);
        setUsers(data || []);
      } catch (err) {
        console.error("Failed to fetch admin stats:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  const adminCount = users.filter((u) => u.role === "admin").length;
  const trainerCount = users.filter((u) => u.role === "trainer").length;
  const memberCount = users.filter((u) => u.role === "member").length;
  const totalUsers = users.length;
  const totalClasses = classes.length;

  const roleData = [
    { name: "Admin", value: adminCount },
    { name: "Trainer", value: trainerCount },
    { name: "Member", value: memberCount },
  ];

  const categoryData = [
    { name: "Cardio", value: 45 },
    { name: "Weights", value: 30 },
    { name: "Combat", value: 25 },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="w-10 h-10 border-4 border-active border-t-transparent rounded-full animate-spin" />
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
          Admin Overview
        </h1>
        <p className="font-['Inter'] text-[#535C91] dark:text-[#9290C3] mt-1">
          Welcome back, {user?.name?.split(" ")[0] || "Admin"}!
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[
          { label: "Total Users", value: totalUsers, icon: FaUsers },
          { label: "Total Classes", value: totalClasses, icon: FaUserCircle },
          {
            label: "Total Booked Classes",
            value: trainerCount, // Keep the original metric representation
            icon: FaCheckCircle,
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-white dark:bg-brand-800/20 rounded-2xl p-6 shadow-card border border-brand-500/15 dark:border-brand-500/20 flex items-center gap-4 hover:-translate-y-0.5 transition-all duration-300"
          >
            <div className="p-3.5 bg-btn-bg/10 rounded-xl">
              <stat.icon className="w-6 h-6 text-btn-bg dark:text-active" />
            </div>
            <div>
              <p className="font-['Inter'] text-sm text-[#535C91] dark:text-[#9290C3]">
                {stat.label}
              </p>
              <p className="font-['Inter'] text-2xl font-extrabold text-foreground mt-0.5">
                {stat.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Profile + Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="bg-white dark:bg-brand-800/20 rounded-2xl p-6 shadow-card border border-brand-500/15 dark:border-brand-500/20 flex flex-col items-center text-center">
          {user?.image ? (
            <Image
              src={user.image}
              alt={user.name}
              width={80}
              height={80}
              className="w-20 h-20 rounded-full object-cover border-2 border-active/40"
            />
          ) : (
            <FaUserCircle className="w-20 h-20 text-active" />
          )}
          <h3 className="font-['Inter'] text-xl font-bold text-foreground mt-4">
            {user?.name || "Admin"}
          </h3>
          <p className="font-['Inter'] text-sm text-[#535C91] dark:text-[#9290C3]">
            {user?.email}
          </p>
          <span className="mt-2.5 px-4 py-1.5 bg-transparent border border-active text-active font-['Inter'] text-xs font-bold rounded-full uppercase tracking-wider">
            Administrator
          </span>

          <div className="mt-6 w-full space-y-3 pt-4 border-t border-brand-500/10">
            {[
              { label: "Admins", value: adminCount, color: "bg-[#FF3366]" },
              { label: "Trainers", value: trainerCount, color: "bg-[#3B82F6]" },
              { label: "Members", value: memberCount, color: "bg-[#9FA1FF]" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between px-2"
              >
                <div className="flex items-center gap-2.5">
                  <div className={`w-2.5 h-2.5 rounded-full ${item.color}`} />
                  <span className="font-['Inter'] text-xs text-[#535C91] dark:text-[#9290C3]">
                    {item.label}
                  </span>
                </div>
                <span className="font-['Inter'] text-xs font-bold text-foreground">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Category Chart */}
        <div className="bg-white dark:bg-brand-800/20 rounded-2xl p-6 shadow-card border border-brand-500/15 dark:border-brand-500/20">
          <h3 className="font-['Inter'] font-bold text-foreground text-sm mb-4 flex items-center gap-2">
            <FaChartPie className="text-active" />
            Classes by Category
          </h3>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {categoryData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(v) => `${v} classes`}
                  contentStyle={{
                    backgroundColor: "var(--bg-color)",
                    borderColor: "var(--primary-color)",
                    color: "var(--text-color)",
                    borderRadius: "12px",
                  }}
                />
                <Legend verticalAlign="bottom" iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* User Distribution Chart */}
        <div className="bg-white dark:bg-brand-800/20 rounded-2xl p-6 shadow-card border border-brand-500/15 dark:border-brand-500/20">
          <h3 className="font-['Inter'] font-bold text-foreground text-sm mb-4 flex items-center gap-2">
            <FaChartPie className="text-active" />
            User Role Distribution
          </h3>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={roleData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {roleData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name) => [`${value} users`, name]}
                  contentStyle={{
                    backgroundColor: "var(--bg-color)",
                    borderColor: "var(--primary-color)",
                    color: "var(--text-color)",
                    borderRadius: "12px",
                  }}
                />
                <Legend verticalAlign="bottom" iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
