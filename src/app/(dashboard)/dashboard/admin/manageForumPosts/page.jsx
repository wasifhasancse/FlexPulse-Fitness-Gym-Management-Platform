"use client";

import ForumPostModal from "@/components/Dashboard/common/ForumPostModal";
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
  FaEdit,
  FaExternalLinkAlt,
  FaFileAlt,
  FaFilter,
  FaPlus,
  FaSearch,
  FaSpinner,
  FaTag,
  FaTimes,
  FaTrash,
  FaUser,
} from "react-icons/fa";

const ManageForumPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(null);
  const [searchFilter, setSearchFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [postToEdit, setPostToEdit] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    document.title = "Forum Posts Moderation | FlexPulse";
  }, []);

  useEffect(() => {
    let ignore = false;
    const fetchPosts = async () => {
      try {
        const data = await getForumPosts({ includeAll: true, limit: 0 });
        if (!ignore) {
          setPosts(Array.isArray(data) ? data : data?.items || []);
        }
      } catch (err) {
        if (!ignore) {
          setError(err.message || "Failed to load posts");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    fetchPosts();
    return () => {
      ignore = true;
    };
  }, [refreshKey]);

  const loadPosts = () => {
    setRefreshKey((prev) => prev + 1);
  };

  const handleDelete = async (postId) => {
    if (!window.confirm("Are you sure you want to delete this community article?")) {
      return;
    }

    const { data: token } = await authClient.token();
    if (!token?.token) {
      toast.danger("Authentication required");
      return;
    }

    setActionLoading(postId);
    try {
      await deleteForumPost(postId, token.token);
      setPosts((prev) => prev.filter((p) => p._id !== postId));
      toast.success("Post deleted successfully!");
    } catch (err) {
      toast.danger("Failed to delete post: " + (err.message || "Unknown error"));
    } finally {
      setActionLoading(null);
    }
  };

  const handleStatusUpdate = async (postId, status) => {
    const { data: token } = await authClient.token();
    if (!token?.token) {
      toast.danger("Authentication required");
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
      toast.danger("Failed to update post status");
    } finally {
      setActionLoading(null);
    }
  };

  const handleEdit = (post) => {
    setPostToEdit(post);
    setModalOpen(true);
  };

  const handleCreateNew = () => {
    setPostToEdit(null);
    setModalOpen(true);
  };

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title?.toLowerCase().includes(searchFilter.toLowerCase()) ||
      post.userName?.toLowerCase().includes(searchFilter.toLowerCase()) ||
      post.category?.toLowerCase().includes(searchFilter.toLowerCase());

    const matchesStatus =
      statusFilter === "all"
        ? true
        : statusFilter === "pending"
        ? !post.status || post.status === "pending"
        : post.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

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
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-3">
        <FaSpinner className="w-8 h-8 text-active animate-spin" />
        <p className="font-['Inter'] text-xs text-[#535C91] dark:text-[#9290C3]">
          Loading community forum articles...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-rose-500 font-['Inter']">{error}</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6 pb-12"
    >
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white dark:bg-[#070F2B] p-5 sm:p-6 rounded-2xl border border-brand-500/15 shadow-xs">
        <div>
          <h1 className="font-['Outfit'] text-2xl sm:text-3xl font-black text-foreground tracking-tight flex items-center gap-2.5">
            <FaFileAlt className="text-active w-6 h-6" />
            <span>Forum Moderation & Articles</span>
          </h1>
          <p className="font-['Inter'] text-xs text-[#535C91] dark:text-[#9290C3] mt-1">
            {posts.length} {posts.length === 1 ? "article" : "articles"} registered
            across members, trainers, and administrators
          </p>
        </div>

        <button
          onClick={handleCreateNew}
          className="relative overflow-hidden inline-flex items-center gap-2 px-5 py-2.5 bg-btn-bg text-btn-text text-xs font-['Outfit'] font-extrabold rounded-xl shadow-xs hover:shadow-md hover:brightness-105 active:scale-95 transition-all duration-200 border border-white/20 group cursor-pointer"
        >
          <span className="absolute inset-0 w-1/2 h-full bg-linear-to-r from-transparent via-white/20 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-[250%] transition-transform duration-700 pointer-events-none" />
          <FaPlus className="w-3.5 h-3.5 text-btn-text" />
          <span>New Community Post</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-white dark:bg-[#070F2B] p-4 rounded-2xl border border-brand-500/15 shadow-xs">
        <div className="relative flex-1 max-w-sm">
          <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#535C91] dark:text-[#9290C3]" />
          <input
            type="text"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder="Search by title, author, or category..."
            className="w-full pl-9 pr-4 py-2 bg-black/5 dark:bg-white/5 border border-brand-500/15 focus:border-active rounded-xl text-foreground font-['Inter'] text-xs focus:outline-none"
          />
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 bg-black/5 dark:bg-white/5 p-1 rounded-xl border border-brand-500/15">
          {["all", "pending", "approved", "rejected"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-['Outfit'] font-bold capitalize transition-all cursor-pointer ${
                statusFilter === st
                  ? "bg-active text-white shadow-xs"
                  : "text-[#535C91] dark:text-[#9290C3] hover:text-foreground"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Posts Table */}
      {filteredPosts.length === 0 ? (
        <div className="bg-white dark:bg-[#070F2B] rounded-2xl p-12 text-center border border-brand-500/15 shadow-xs">
          <p className="text-[#535C91] dark:text-[#9290C3] font-['Inter'] text-xs">
            No community posts match the selected criteria.
          </p>
        </div>
      ) : (
        <div className="bg-white dark:bg-[#070F2B] rounded-2xl border border-brand-500/15 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left font-['Inter'] text-xs">
              <thead className="bg-black/5 dark:bg-white/5 text-[#535C91] dark:text-[#9290C3] uppercase tracking-wider font-['Outfit'] text-[10px]">
                <tr>
                  <th className="py-3.5 px-6 font-extrabold">Cover</th>
                  <th className="py-3.5 px-6 font-extrabold">Article & Topic</th>
                  <th className="py-3.5 px-6 font-extrabold">Author Role</th>
                  <th className="py-3.5 px-6 font-extrabold">Category</th>
                  <th className="py-3.5 px-6 font-extrabold">Status</th>
                  <th className="py-3.5 px-6 font-extrabold">Date</th>
                  <th className="py-3.5 px-6 font-extrabold text-right">Moderation & Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-500/10">
                {filteredPosts.map((post) => (
                  <tr
                    key={post._id}
                    className="hover:bg-brand-500/5 transition-colors"
                  >
                    <td className="py-3.5 px-6">
                      {post.image ? (
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-brand-500/5 border border-brand-500/15 shrink-0">
                          <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            unoptimized
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-xl bg-black/5 dark:bg-white/5 border border-brand-500/15 flex items-center justify-center text-[#535C91] dark:text-[#9290C3] text-[10px] font-['Outfit'] font-bold">
                          NO IMG
                        </div>
                      )}
                    </td>

                    <td className="py-3.5 px-6 max-w-xs">
                      <Link
                        href={`/forum/${post._id}`}
                        className="font-bold text-foreground hover:text-active transition-colors line-clamp-1 flex items-center gap-1.5"
                      >
                        <span>{post.title}</span>
                        <FaExternalLinkAlt className="w-2.5 h-2.5 opacity-50 shrink-0" />
                      </Link>
                      <p className="text-[11px] text-[#535C91] dark:text-[#9290C3] line-clamp-1 mt-0.5">
                        {post.description}
                      </p>
                    </td>

                    <td className="py-3.5 px-6">
                      <div className="flex items-center gap-2">
                        {post.userImage ? (
                          <Image
                            src={post.userImage}
                            alt={post.userName || "Author"}
                            width={24}
                            height={24}
                            className="w-6 h-6 rounded-full object-cover border border-active/30"
                          />
                        ) : (
                          <div className="w-6 h-6 rounded-full bg-active/10 flex items-center justify-center text-active text-[10px]">
                            <FaUser className="w-3 h-3" />
                          </div>
                        )}
                        <div>
                          <p className="font-bold text-foreground truncate max-w-[120px]">
                            {post.userName || "Athlete"}
                          </p>
                          <span
                            className={`inline-block px-1.5 py-0.2 rounded text-[9px] font-['Outfit'] font-black uppercase ${
                              post.userRole === "admin"
                                ? "text-active"
                                : post.userRole === "trainer"
                                ? "text-blue-500"
                                : "text-emerald-500"
                            }`}
                          >
                            {post.userRole || "member"}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-6">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-active/10 text-active rounded-full text-[10px] font-bold">
                        <FaTag className="w-2.5 h-2.5" />
                        {post.category || "Fitness"}
                      </span>
                    </td>

                    <td className="py-3.5 px-6">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-['Outfit'] font-extrabold uppercase tracking-wider ${
                          post.status === "approved"
                            ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                            : post.status === "rejected"
                            ? "bg-rose-500/10 text-rose-500 border border-rose-500/20"
                            : "bg-amber-500/10 text-amber-500 border border-amber-500/20"
                        }`}
                      >
                        {post.status || "pending"}
                      </span>
                    </td>

                    <td className="py-3.5 px-6 text-[#535C91] dark:text-[#9290C3] whitespace-nowrap">
                      {formatDate(post.createdAt)}
                    </td>

                    <td className="py-3.5 px-6 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-1.5">
                        {/* Approve */}
                        {post.status !== "approved" && (
                          <button
                            onClick={() => handleStatusUpdate(post._id, "approved")}
                            disabled={actionLoading === post._id}
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-emerald-500/10 hover:bg-emerald-500 text-emerald-500 hover:text-white border border-emerald-500/20 rounded-lg text-xs font-['Outfit'] font-bold transition-all cursor-pointer disabled:opacity-50"
                            title="Approve & Publish to Forum"
                          >
                            {actionLoading === post._id ? (
                              <FaSpinner className="w-3 h-3 animate-spin" />
                            ) : (
                              <FaCheck className="w-3 h-3" />
                            )}
                            <span>Approve</span>
                          </button>
                        )}

                        {/* Reject */}
                        {post.status !== "rejected" && (
                          <button
                            onClick={() => handleStatusUpdate(post._id, "rejected")}
                            disabled={actionLoading === post._id}
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-amber-500/10 hover:bg-amber-500 text-amber-500 hover:text-white border border-amber-500/20 rounded-lg text-xs font-['Outfit'] font-bold transition-all cursor-pointer disabled:opacity-50"
                            title="Reject Submission"
                          >
                            {actionLoading === post._id ? (
                              <FaSpinner className="w-3 h-3 animate-spin" />
                            ) : (
                              <FaTimes className="w-3 h-3" />
                            )}
                            <span>Reject</span>
                          </button>
                        )}

                        {/* Edit Button */}
                        <button
                          onClick={() => handleEdit(post)}
                          className="p-1.5 rounded-lg bg-black/5 dark:bg-white/5 border border-brand-500/15 text-[#535C91] dark:text-[#9290C3] hover:text-active hover:border-active/40 transition-colors cursor-pointer"
                          title="Edit Post"
                        >
                          <FaEdit className="w-3.5 h-3.5" />
                        </button>

                        {/* Delete Button */}
                        <button
                          onClick={() => handleDelete(post._id)}
                          disabled={actionLoading === post._id}
                          className="p-1.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-500 hover:bg-rose-500 hover:text-white transition-colors cursor-pointer disabled:opacity-50"
                          title="Delete Post"
                        >
                          {actionLoading === post._id ? (
                            <FaSpinner className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <FaTrash className="w-3.5 h-3.5" />
                          )}
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

      {/* Forum Post Modal for Create & Edit */}
      <ForumPostModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setPostToEdit(null);
        }}
        postToEdit={postToEdit}
        onSuccess={loadPosts}
      />
    </motion.div>
  );
};

export default ManageForumPosts;

