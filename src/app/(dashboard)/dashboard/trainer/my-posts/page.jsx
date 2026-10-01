"use client";

import ForumPostModal from "@/components/Dashboard/common/ForumPostModal";
import {
  deleteForumPost,
  getForumPosts,
  getMyForumPost,
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
  FaCheckCircle,
  FaComment,
  FaEdit,
  FaExternalLinkAlt,
  FaFileAlt,
  FaHeart,
  FaHourglassHalf,
  FaPlus,
  FaShieldAlt,
  FaSpinner,
  FaTag,
  FaTimes,
  FaTrash,
  FaUser,
} from "react-icons/fa";

export default function TrainerPostsManagementPage() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [activeTab, setActiveTab] = useState("community"); // 'community' | 'my-posts'
  const [allPosts, setAllPosts] = useState([]);
  const [myPosts, setMyPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [postToEdit, setPostToEdit] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    document.title = "Trainer Forum Hub & Moderation | FlexPulse";
  }, []);

  useEffect(() => {
    if (!user?.id) return;
    let ignore = false;
    const fetchTrainerForumData = async () => {
      try {
        const [allData, myData] = await Promise.all([
          getForumPosts({ includeAll: true, limit: 0 }),
          getMyForumPost(user.id),
        ]);
        if (!ignore) {
          setAllPosts(Array.isArray(allData) ? allData : allData?.items || []);
          setMyPosts(Array.isArray(myData) ? myData : myData?.items || []);
        }
      } catch (err) {
        if (!ignore) {
          console.error("Failed to load forum posts:", err);
          toast.danger("Could not load community forum data");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    fetchTrainerForumData();
    return () => {
      ignore = true;
    };
  }, [user?.id, refreshKey]);

  const loadAllData = () => {
    setRefreshKey((prev) => prev + 1);
  };

  // Trainer can approve or reject member submissions
  const handleStatusUpdate = async (postId, status) => {
    const { data: token } = await authClient.token();
    if (!token?.token) {
      toast.danger("Authentication required");
      return;
    }

    setActionLoading(postId);
    try {
      await updateForumPostStatus(postId, status, token.token);
      setAllPosts((prev) =>
        prev.map((item) => (item._id === postId ? { ...item, status } : item)),
      );
      toast.success(`Post ${status} successfully!`);
    } catch (err) {
      toast.danger("Failed to update post status");
    } finally {
      setActionLoading(null);
    }
  };

  // Trainer can delete any member post or their own post
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
      const res = await deleteForumPost(postId, token.token);
      if (res?.success || res?.acknowledged) {
        toast.success("Post deleted successfully.");
        setAllPosts((prev) => prev.filter((p) => p._id !== postId));
        setMyPosts((prev) => prev.filter((p) => p._id !== postId));
      } else {
        toast.danger(res?.message || "Failed to delete post");
      }
    } catch (err) {
      console.error(err);
      toast.danger("An error occurred while deleting.");
    } finally {
      setActionLoading(null);
    }
  };

  const handleEdit = (post) => {
    setPostToEdit(post);
    setModalOpen(true);
  };

  const handleCreate = () => {
    setPostToEdit(null);
    setModalOpen(true);
  };

  // Filter member submissions that trainers can moderate
  const memberPosts = allPosts.filter(
    (p) => p.userRole === "member" || !p.userRole
  );
  const pendingMemberPosts = memberPosts.filter(
    (p) => !p.status || p.status === "pending"
  );

  const displayedPosts = activeTab === "community" ? memberPosts : myPosts;

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white dark:bg-[#070F2B] p-5 sm:p-6 rounded-2xl border border-brand-500/15 shadow-xs">
        <div>
          <h1 className="font-['Outfit'] text-2xl sm:text-3xl font-black text-foreground tracking-tight flex items-center gap-2.5">
            <FaShieldAlt className="text-active w-6 h-6" />
            <span>Trainer Community Hub & Moderation</span>
          </h1>
          <p className="font-['Inter'] text-xs text-[#535C91] dark:text-[#9290C3] mt-1">
            Review and approve member questions, edit articles, and publish coaching insights
          </p>
        </div>

        <button
          onClick={handleCreate}
          className="relative overflow-hidden inline-flex items-center gap-2 px-5 py-2.5 bg-btn-bg text-btn-text text-xs font-['Outfit'] font-extrabold rounded-xl shadow-xs hover:shadow-md hover:brightness-105 active:scale-95 transition-all duration-200 border border-white/20 group cursor-pointer"
        >
          <span className="absolute inset-0 w-1/2 h-full bg-linear-to-r from-transparent via-white/20 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-[250%] transition-transform duration-700 pointer-events-none" />
          <FaPlus className="w-3.5 h-3.5 text-btn-text" />
          <span>New Coach Article</span>
        </button>
      </div>

      {/* Tabs Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-white dark:bg-[#070F2B] p-4 rounded-2xl border border-brand-500/15 shadow-xs">
        <div className="flex items-center gap-2 bg-black/5 dark:bg-white/5 p-1 rounded-xl border border-brand-500/15">
          <button
            onClick={() => setActiveTab("community")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-['Outfit'] font-bold transition-all cursor-pointer ${
              activeTab === "community"
                ? "bg-active text-white shadow-xs"
                : "text-[#535C91] dark:text-[#9290C3] hover:text-foreground"
            }`}
          >
            <span>Member Submissions to Moderate</span>
            {pendingMemberPosts.length > 0 && (
              <span className="px-1.5 py-0.5 bg-white text-active text-[10px] font-black rounded-full">
                {pendingMemberPosts.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("my-posts")}
            className={`px-4 py-2 rounded-lg text-xs font-['Outfit'] font-bold transition-all cursor-pointer ${
              activeTab === "my-posts"
                ? "bg-active text-white shadow-xs"
                : "text-[#535C91] dark:text-[#9290C3] hover:text-foreground"
            }`}
          >
            My Coaching Articles ({myPosts.length})
          </button>
        </div>

        <p className="text-[11px] font-['Inter'] text-[#535C91] dark:text-[#9290C3]">
          {activeTab === "community"
            ? "Trainers have permission to approve, edit, and remove member articles"
            : "Articles published under your coach profile"}
        </p>
      </div>

      {/* Content Table / Cards */}
      {loading ? (
        <div className="flex flex-col items-center justify-center h-48 gap-3">
          <FaSpinner className="w-7 h-7 text-active animate-spin" />
          <p className="text-xs font-['Inter'] text-[#535C91] dark:text-[#9290C3]">
            Loading forum articles...
          </p>
        </div>
      ) : displayedPosts.length === 0 ? (
        <div className="bg-white dark:bg-[#070F2B] rounded-2xl p-12 text-center border border-brand-500/15 shadow-xs">
          <p className="text-[#535C91] dark:text-[#9290C3] font-['Inter'] text-xs">
            {activeTab === "community"
              ? "No member submissions found to moderate."
              : "You haven't published any coaching articles yet."}
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
                  <th className="py-3.5 px-6 font-extrabold">Author</th>
                  <th className="py-3.5 px-6 font-extrabold">Category</th>
                  <th className="py-3.5 px-6 font-extrabold">Status</th>
                  <th className="py-3.5 px-6 font-extrabold">Date</th>
                  <th className="py-3.5 px-6 font-extrabold text-right">Moderation & Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-500/10">
                {displayedPosts.map((post) => (
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
                          <span className="text-[9px] font-['Outfit'] font-bold text-[#535C91] dark:text-[#9290C3] uppercase">
                            {post.userRole || "member"}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-6">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-active/10 text-active rounded-full text-[10px] font-bold">
                        <FaTag className="w-2.5 h-2.5" />
                        {post.category || "General"}
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
                        {/* Approve for trainers on community posts */}
                        {activeTab === "community" && post.status !== "approved" && (
                          <button
                            onClick={() => handleStatusUpdate(post._id, "approved")}
                            disabled={actionLoading === post._id}
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-emerald-500/10 hover:bg-emerald-500 text-emerald-500 hover:text-white border border-emerald-500/20 rounded-lg text-xs font-['Outfit'] font-bold transition-all cursor-pointer disabled:opacity-50"
                            title="Approve post to appear live"
                          >
                            {actionLoading === post._id ? (
                              <FaSpinner className="w-3 h-3 animate-spin" />
                            ) : (
                              <FaCheck className="w-3 h-3" />
                            )}
                            <span>Approve</span>
                          </button>
                        )}

                        {activeTab === "community" && post.status !== "rejected" && (
                          <button
                            onClick={() => handleStatusUpdate(post._id, "rejected")}
                            disabled={actionLoading === post._id}
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-amber-500/10 hover:bg-amber-500 text-amber-500 hover:text-white border border-amber-500/20 rounded-lg text-xs font-['Outfit'] font-bold transition-all cursor-pointer disabled:opacity-50"
                            title="Reject post"
                          >
                            {actionLoading === post._id ? (
                              <FaSpinner className="w-3 h-3 animate-spin" />
                            ) : (
                              <FaTimes className="w-3 h-3" />
                            )}
                            <span>Reject</span>
                          </button>
                        )}

                        {/* Trainer can edit any member post or own post */}
                        <button
                          onClick={() => handleEdit(post)}
                          className="p-1.5 rounded-lg bg-black/5 dark:bg-white/5 border border-brand-500/15 text-[#535C91] dark:text-[#9290C3] hover:text-active hover:border-active/40 transition-colors cursor-pointer"
                          title="Edit Post"
                        >
                          <FaEdit className="w-3.5 h-3.5" />
                        </button>

                        {/* Trainer can delete any member post or own post */}
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

      {/* Forum Post Modal */}
      <ForumPostModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setPostToEdit(null);
        }}
        postToEdit={postToEdit}
        onSuccess={loadAllData}
      />
    </div>
  );
}
