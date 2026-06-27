"use client";

import {
  deleteForumPost,
  getForumPosts,
  updateForumPostStatus,
} from "@/lib/api/getForumPosts";
import { authClient } from "@/lib/auth-client";
import { toast } from "@heroui/react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FaCheck,
  FaPlus,
  FaSpinner,
  FaTag,
  FaTimes,
  FaTrash,
  FaUser
} from "react-icons/fa";

const ManageForumPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(null);

  // Set page title
  useEffect(() => {
    document.title = "Manage Forum Posts | FlexPulse";
  }, []);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await getForumPosts({ includeAll: true, limit: 0 });
        setPosts(Array.isArray(data) ? data : data?.items || []);
      } catch (err) {
        setError(err.message || "Failed to load posts");
      } finally {
        setLoading(false);
      }
    };
    loadPosts();
  }, []);

  const handleDelete = async (postId) => {
    const { data: token } = await authClient.token();
    if (!token?.token) {
      toast.error("Authentication required");
      return;
    }

    setActionLoading(postId);
    try {
      await deleteForumPost(postId, token.token);
      setPosts((prev) => prev.filter((p) => p._id !== postId));
      toast.success("Post deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete post: " + (err.message || "Unknown error"));
    } finally {
      setActionLoading(null);
    }
  };

  const handleStatusUpdate = async (postId, status) => {
    const { data: token } = await authClient.token();
    if (!token?.token) {
      toast.error("Authentication required");
      return;
    }

    setActionLoading(postId);
    try {
      await updateForumPostStatus(postId, status, token.token);
      setPosts((prev) =>
        prev.map((item) => (item._id === postId ? { ...item, status } : item)),
      );
      toast.success(`Post ${status} successfully!`);
    } catch (err) {
      toast.error("Failed to update post status");
    } finally {
      setActionLoading(null);
    }
  };

  const formatDate = (dateString) => {
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
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6 px-4 sm:px-0"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-['Outfit'] text-3xl md:text-4xl font-bold text-foreground tracking-wide">
            Forum Posts Moderation
          </h1>
          <p className="font-sans text-[#535C91] dark:text-[#9290C3] mt-1">
            {posts.length} {posts.length === 1 ? "post" : "posts"} registered on
            the platform
          </p>
        </div>
        <Link
          href="/dashboard/admin/addForumPost"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-btn-bg text-btn-text font-sans font-semibold rounded-xl hover:opacity-90 transition-all shadow-md hover:shadow-lg whitespace-nowrap border border-brand-500/20"
        >
          <FaPlus className="w-4 h-4" />
          Create New Post
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="bg-white dark:bg-brand-800/20 rounded-2xl p-12 text-center shadow-card border border-brand-500/15 dark:border-brand-500/20">
          <p className="text-[#535C91] dark:text-[#9290C3] font-sans">
            No posts found.
          </p>
        </div>
      ) : (
        <div className="bg-white dark:bg-brand-800/20 rounded-2xl shadow-card border border-brand-500/15 dark:border-brand-500/20 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left font-sans text-sm">
              <thead className="bg-brand-500/10 text-[#535C91] dark:text-[#9290C3]">
                <tr>
                  <th className="py-3.5 px-6 font-semibold">Image</th>
                  <th className="py-3.5 px-6 font-semibold">Title</th>
                  <th className="py-3.5 px-6 font-semibold">Author</th>
                  <th className="py-3.5 px-6 font-semibold">Category</th>
                  <th className="py-3.5 px-6 font-semibold">Status</th>
                  <th className="py-3.5 px-6 font-semibold">Date</th>
                  <th className="py-3.5 px-6 font-semibold text-right">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr
                    key={post._id}
                    className="border-b border-brand-500/10 hover:bg-brand-500/5 transition-colors"
                  >
                    <td className="py-3.5 px-6">
                      {post.image ? (
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-brand-500/5 border border-brand-500/10 shrink-0">
                          <Image
                            src={post.image}
                            alt={post.title}
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
                    <td className="py-4 px-6 font-bold text-foreground">
                      <Link
                        href={`/forum/${post._id}`}
                        className="hover:text-active transition-colors line-clamp-1"
                      >
                        {post.title}
                      </Link>
                    </td>
                    <td className="py-4 px-6 text-foreground">
                      <div className="flex items-center gap-2">
                        {post.userImage ? (
                          <Image
                            src={post.userImage}
                            alt={post.userName}
                            width={24}
                            height={24}
                            className="w-6 h-6 rounded-full object-cover border border-brand-500/10"
                          />
                        ) : (
                          <FaUser className="w-4 h-4 text-active" />
                        )}
                        <span className="font-medium text-foreground">
                          {post.userName || "Anonymous"}
                        </span>
                        <span className="text-xs text-[#535C91] dark:text-[#9290C3]">
                          ({post.userRole || "Member"})
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      {post.category ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-active/10 rounded-full text-xs font-semibold text-active">
                          <FaTag className="w-3 h-3" />
                          {post.category}
                        </span>
                      ) : (
                        <span className="text-[#535C91] dark:text-[#9290C3] text-xs">
                          —
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-xs font-bold uppercase">
                      <span
                        className={`px-2.5 py-1 rounded-full ${
                          post.status === "approved"
                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                            : post.status === "rejected"
                              ? "bg-rose-500/10 text-rose-500"
                              : "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                        }`}
                      >
                        {post.status || "pending"}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-foreground text-xs font-medium">
                      {formatDate(post.createdAt)}
                    </td>

                    <td className="py-4 px-6 text-right">
                      <div className="inline-flex items-center gap-2">
                        {post.status !== "approved" && (
                          <button
                            onClick={() =>
                              handleStatusUpdate(post._id, "approved")
                            }
                            disabled={actionLoading === post._id}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 rounded-lg text-xs font-bold hover:bg-emerald-500 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                          >
                            {actionLoading === post._id ? (
                              <FaSpinner className="w-3.5 h-3.5 animate-spin" />
                            ) : (
                              <FaCheck className="w-3.5 h-3.5" />
                            )}
                            Approve
                          </button>
                        )}
                        {post.status !== "rejected" && (
                          <button
                            onClick={() =>
                              handleStatusUpdate(post._id, "rejected")
                            }
                            disabled={actionLoading === post._id}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-amber-500/30 text-amber-600 dark:text-amber-400 rounded-lg text-xs font-bold hover:bg-amber-500 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                          >
                            {actionLoading === post._id ? (
                              <FaSpinner className="w-3.5 h-3.5 animate-spin" />
                            ) : (
                              <FaTimes className="w-3.5 h-3.5" />
                            )}
                            Reject
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(post._id)}
                          disabled={actionLoading === post._id}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-rose-500/30 text-rose-500 rounded-lg text-xs font-bold hover:bg-rose-500 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                        >
                          {actionLoading === post._id ? (
                            <FaSpinner className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <FaTrash className="w-3.5 h-3.5" />
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

export default ManageForumPosts;
