"use client";

import {
    blockUser,
    unblockUser,
    updateUserRole,
} from "@/lib/actions/adminUserManage";
import { getAllUsers } from "@/lib/api/getAllUsers";
import { authClient } from "@/lib/auth-client";
import { toast } from "@heroui/react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
    FaCheck,
    FaSearch,
    FaSpinner,
    FaTimes,
    FaUserCircle,
} from "react-icons/fa";

export default function ManageUsersPage() {
  const { data: session } = authClient.useSession();
  const currentUser = session?.user;

  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await getAllUsers();
        setUsers(data);
      } catch (err) {
        toast.error("Failed to load users");
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, []);

  const query = searchQuery.toLowerCase().trim();
  const filteredUsers = !query
    ? users
    : users.filter(
        (u) =>
          u.name.toLowerCase().includes(query) ||
          u.email.toLowerCase().includes(query),
      );

  const handleBlockToggle = async (userId, currentStatus) => {
    setActionLoading(userId);
    try {
      if (currentStatus === "active") {
        await blockUser(userId);
        setUsers((prev) =>
          prev.map((u) => (u._id === userId ? { ...u, status: "blocked" } : u)),
        );
        toast.success("User blocked!");
      } else {
        await unblockUser(userId);
        setUsers((prev) =>
          prev.map((u) => (u._id === userId ? { ...u, status: "active" } : u)),
        );
        toast.success("User unblocked!");
      }
    } catch (err) {
      toast.error("Action failed!");
    } finally {
      setActionLoading(null);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    setActionLoading(userId);
    try {
      await updateUserRole(userId, newRole);
      setUsers((prev) =>
        prev.map((u) => (u._id === userId ? { ...u, role: newRole } : u)),
      );
      toast.success(`Role updated to ${newRole}!`);
    } catch (err) {
      toast.error("Failed to update role!");
    } finally {
      setActionLoading(null);
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-64">
        <FaSpinner className="w-8 h-8 text-[#CCFF00] animate-spin" />
      </div>
    );

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6 px-4 sm:px-0"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-['Outfit'] text-3xl md:text-4xl font-bold text-white tracking-wide">
            Manage Users
          </h1>
          <p className="font-['Inter'] text-[#94A3B8] mt-1">
            {filteredUsers.length}{" "}
            {filteredUsers.length === 1 ? "user" : "users"} found
          </p>
        </div>
        <div className="relative max-w-sm w-full sm:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="h-4 w-4 text-[#94A3B8]" />
          </div>
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-[#131826] border border-[#1E293B] rounded-lg text-[#E2E8F0] placeholder-[#64748B] focus:outline-none focus:border-[#CCFF00] focus:ring-1 focus:ring-[#CCFF00] font-['Inter'] text-sm"
          />
        </div>
      </div>

      {/* Table */}
      {filteredUsers.length === 0 ? (
        <div className="bg-[#131826] rounded-xl p-12 text-center shadow-sm border border-[#1E293B]">
          <p className="text-[#94A3B8] font-['Inter']">No users found.</p>
        </div>
      ) : (
        <div className="bg-[#131826] rounded-xl shadow-sm border border-[#1E293B] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left font-['Inter'] text-sm">
              <thead className="bg-[#1E293B] text-[#94A3B8]">
                <tr>
                  <th className="py-3 px-4 font-semibold">User</th>
                  <th className="py-3 px-4 font-semibold">Email</th>
                  <th className="py-3 px-4 font-semibold">Role</th>
                  <th className="py-3 px-4 font-semibold">Status</th>
                  <th className="py-3 px-4 font-semibold text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr
                    key={user._id}
                    className="border-b border-[#1E293B] hover:bg-[#1E293B]/50 transition-colors"
                  >
                    {/* User */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        {user.image ? (
                          <Image
                            src={user.image}
                            alt={user.name}
                            width={36}
                            height={36}
                            className="w-9 h-9 rounded-full object-cover border-2 border-[#1E293B]"
                          />
                        ) : (
                          <FaUserCircle className="w-9 h-9 text-[#CCFF00]" />
                        )}
                        <span className="font-medium text-white">
                          {user.name}
                        </span>
                      </div>
                    </td>

                    {/* Email */}
                    <td className="py-4 px-4 text-[#94A3B8]">{user.email}</td>

                    {/* Role Badge */}
                    <td className="py-4 px-4">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium border border-transparent ${
                          user.role === "admin"
                            ? "bg-[#FF3366]/10 text-[#FF3366] border-[#FF3366]/20"
                            : user.role === "trainer"
                              ? "bg-[#3B82F6]/10 text-[#3B82F6] border-[#3B82F6]/20"
                              : "bg-[#CCFF00]/10 text-[#CCFF00] border-[#CCFF00]/20"
                        }`}
                      >
                        {user.role?.charAt(0).toUpperCase() +
                          user.role?.slice(1)}
                      </span>
                    </td>

                    {/* Status Badge */}
                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
                          user.status === "active"
                            ? "bg-[#00FF66]/10 text-[#00FF66]"
                            : "bg-[#FF3366]/10 text-[#FF3366]"
                        }`}
                      >
                        {user.status === "active" ? (
                          <>
                            <FaCheck className="w-3 h-3" /> Active
                          </>
                        ) : (
                          <>
                            <FaTimes className="w-3 h-3" /> Blocked
                          </>
                        )}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-4 text-right">
                      {user._id !== currentUser?.id && (
                        <div className="flex items-center justify-end gap-2">
                          {/* Role Dropdown */}
                          <select
                            value={user.role}
                            onChange={(e) =>
                              handleRoleChange(user._id, e.target.value)
                            }
                            disabled={actionLoading === user._id}
                            className="px-2 py-1.5 bg-[#1E293B] border border-[#334155] rounded-lg text-xs text-[#E2E8F0] focus:outline-none focus:border-[#CCFF00] disabled:opacity-50"
                          >
                            <option value="member">Member</option>
                            <option value="trainer">Trainer</option>
                            <option value="admin">Admin</option>
                          </select>

                          {/* Block/Unblock */}
                          <button
                            onClick={() =>
                              handleBlockToggle(user._id, user.status)
                            }
                            disabled={actionLoading === user._id}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors disabled:opacity-50 ${
                              user.status === "active"
                                ? "border border-[#FF3366] text-[#FF3366] hover:bg-[#FF3366]/10"
                                : "border border-[#00FF66] text-[#00FF66] hover:bg-[#00FF66]/10"
                            }`}
                          >
                            {actionLoading === user._id ? (
                              <FaSpinner className="w-3 h-3 animate-spin mx-2" />
                            ) : user.status === "active" ? (
                              "Block"
                            ) : (
                              "Unblock"
                            )}
                          </button>
                        </div>
                      )}
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
}
