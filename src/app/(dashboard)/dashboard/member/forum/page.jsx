"use client";

import ForumPostModal from "@/components/Dashboard/common/ForumPostModal";
import { deleteForumPost, getMyForumPost } from "@/lib/api/getForumPosts";
import { authClient } from "@/lib/auth-client";
import { toast } from "@heroui/react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FaCheckCircle,
  FaClock,
  FaComment,
  FaEdit,
  FaExternalLinkAlt,
  FaFileAlt,
  FaHeart,
  FaHourglassHalf,
  FaPlus,
  FaSpinner,
  FaTag,
  FaTimesCircle,
  FaTrash,
} from "react-icons/fa";

export default function MemberForumPage() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [postToEdit, setPostToEdit] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    document.title = "My Community Articles | FlexPulse";
  }, []);

  useEffect(() => {
    if (!user?.id) return;
    let ignore = false;
    const fetchMemberPosts = async () => {
      try {
        const data = await getMyForumPost(user.id);
        if (!ignore) {
          setPosts(Array.isArray(data) ? data : data?.items || []);
        }
      } catch (err) {
        if (!ignore) {
          console.error("Failed to load member posts:", err);
          toast.danger("Could not load your community posts");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    fetchMemberPosts();
    return () => {
      ignore = true;
    };
  }, [user?.id, refreshKey]);

  const loadMyPosts = () => {
    setRefreshKey((prev) => prev + 1);
  };

  const handleDelete = async (postId) => {
    if (!window.confirm("Are you sure you want to delete this community article?")) {
      return;
    }

    setDeletingId(postId);
    try {
      const { data: tokenData } = await authClient.token();
      const token = tokenData?.token;
      const res = await deleteForumPost(postId, token);
      if (res?.success || res?.acknowledged) {
        toast.success("Article deleted successfully.");
        setPosts((prev) => prev.filter((p) => p._id !== postId));
      } else {
        toast.danger(res?.message || "Failed to delete article.");
      }
    } catch (err) {
      console.error(err);
      toast.danger("An error occurred while deleting.");
    } finally {
      setDeletingId(null);
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

  const approvedCount = posts.filter((p) => p.status === "approved").length;
  const pendingCount = posts.filter(
    (p) => !p.status || p.status === "pending"
  ).length;

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white dark:bg-[#070F2B] p-5 sm:p-6 rounded-2xl border border-brand-500/15 shadow-xs">
        <div>
          <h1 className="font-['Outfit'] text-2xl sm:text-3xl font-black text-foreground tracking-tight flex items-center gap-2.5">
            <FaFileAlt className="text-active w-6 h-6" />
            <span>Community Forum Submissions</span>
          </h1>
          <p className="font-['Inter'] text-xs text-[#535C91] dark:text-[#9290C3] mt-1">
            Publish workout protocols and connect with certified coaches
          </p>
        </div>

        <button
          onClick={handleCreate}
          className="relative overflow-hidden inline-flex items-center gap-2 px-5 py-2.5 bg-btn-bg text-btn-text text-xs font-['Outfit'] font-extrabold rounded-xl shadow-xs hover:shadow-md hover:brightness-105 active:scale-95 transition-all duration-200 border border-white/20 group cursor-pointer"
        >
          <span className="absolute inset-0 w-1/2 h-full bg-linear-to-r from-transparent via-white/20 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-[250%] transition-transform duration-700 pointer-events-none" />
          <FaPlus className="w-3.5 h-3.5 text-btn-text" />
          <span>New Community Post</span>
        </button>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white dark:bg-[#070F2B] rounded-2xl p-5 border border-brand-500/15 shadow-xs flex items-center justify-between">
          <div>
            <p className="font-['Inter'] text-xs text-[#535C91] dark:text-[#9290C3]">
              Total Submitted
            </p>
            <p className="font-['Outfit'] text-2xl sm:text-3xl font-black text-foreground mt-0.5">
              {posts.length}
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-active/10 border border-active/20 flex items-center justify-center text-active">
            <FaFileAlt className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white dark:bg-[#070F2B] rounded-2xl p-5 border border-brand-500/15 shadow-xs flex items-center justify-between">
          <div>
            <p className="font-['Inter'] text-xs text-[#535C91] dark:text-[#9290C3]">
              Approved & Live
            </p>
            <p className="font-['Outfit'] text-2xl sm:text-3xl font-black text-emerald-500 mt-0.5">
              {approvedCount}
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500">
            <FaCheckCircle className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white dark:bg-[#070F2B] rounded-2xl p-5 border border-brand-500/15 shadow-xs flex items-center justify-between">
          <div>
            <p className="font-['Inter'] text-xs text-[#535C91] dark:text-[#9290C3]">
              Pending Coach Review
            </p>
            <p className="font-['Outfit'] text-2xl sm:text-3xl font-black text-amber-500 mt-0.5">
              {pendingCount}
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500">
            <FaHourglassHalf className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Post List */}
      {loading ? (
        <div className="flex flex-col items-center justify-center h-48 gap-3">
          <FaSpinner className="w-7 h-7 text-active animate-spin" />
          <p className="text-xs font-['Inter'] text-[#535C91] dark:text-[#9290C3]">
            Loading your articles...
          </p>
        </div>
      ) : posts.length === 0 ? (
        <div className="bg-white dark:bg-[#070F2B] rounded-2xl p-12 text-center border border-brand-500/15 shadow-xs">
          <FaFileAlt className="w-10 h-10 text-[#535C91]/50 dark:text-[#9290C3]/50 mx-auto mb-3" />
          <h3 className="font-['Outfit'] text-lg font-bold text-foreground">
            No Community Articles Yet
          </h3>
          <p className="font-['Inter'] text-xs text-[#535C91] dark:text-[#9290C3] mt-1 max-w-md mx-auto">
            You haven&apos;t shared any workout protocols or fitness questions yet.
            Submit your first article to discuss with our coaches.
          </p>
          <button
            onClick={handleCreate}
            className="mt-4 px-4 py-2 bg-btn-bg text-btn-text text-xs font-['Outfit'] font-bold rounded-xl shadow-xs"
          >
            Create Your First Post
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {posts.map((post) => (
            <motion.div
              key={post._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-[#070F2B] rounded-2xl border border-brand-500/15 shadow-xs overflow-hidden flex flex-col justify-between"
            >
              <div>
                {/* Cover Image */}
                {post.image && (
                  <div className="relative w-full h-44 bg-black/10">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                    <div className="absolute top-3 right-3">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-['Outfit'] font-bold uppercase tracking-wider shadow-sm ${
                          post.status === "approved"
                            ? "bg-emerald-500 text-white"
                            : post.status === "rejected"
                            ? "bg-rose-500 text-white"
                            : "bg-amber-500 text-white"
                        }`}
                      >
                        {post.status === "approved" && <FaCheckCircle className="w-3 h-3" />}
                        {post.status === "rejected" && <FaTimesCircle className="w-3 h-3" />}
                        {(!post.status || post.status === "pending") && (
                          <FaHourglassHalf className="w-3 h-3" />
                        )}
                        {post.status || "Pending Approval"}
                      </span>
                    </div>
                  </div>
                )}

                <div className="p-5 space-y-3">
                  {!post.image && (
                    <div className="flex items-center justify-between">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-['Outfit'] font-bold uppercase tracking-wider ${
                          post.status === "approved"
                            ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                            : post.status === "rejected"
                            ? "bg-rose-500/10 text-rose-500 border border-rose-500/20"
                            : "bg-amber-500/10 text-amber-500 border border-amber-500/20"
                        }`}
                      >
                        {post.status || "Pending Approval"}
                      </span>
                      <span className="text-[11px] font-['Inter'] text-[#535C91] dark:text-[#9290C3]">
                        {post.createdAt
                          ? new Date(post.createdAt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })
                          : ""}
                      </span>
                    </div>
                  )}

                  <div>
                    <h3 className="font-['Outfit'] text-base font-bold text-foreground line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="font-['Inter'] text-xs text-[#535C91] dark:text-[#9290C3] line-clamp-3 mt-1.5 leading-relaxed">
                      {post.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 pt-2 text-[11px] font-['Inter'] text-[#535C91] dark:text-[#9290C3]">
                    {post.category && (
                      <span className="flex items-center gap-1">
                        <FaTag className="w-3 h-3 text-active" />
                        {post.category}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <FaHeart className="w-3 h-3 text-rose-500" />
                      {post.likes?.length || 0}
                    </span>
                    <span className="flex items-center gap-1">
                      <FaComment className="w-3 h-3 text-active" />
                      {post.comments?.length || 0}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-4 border-t border-brand-500/10 flex items-center justify-between bg-black/2 dark:bg-white/2">
                <div>
                  {post.status === "approved" ? (
                    <Link
                      href={`/forum/${post._id}`}
                      className="inline-flex items-center gap-1 text-xs font-['Outfit'] font-bold text-active hover:underline"
                    >
                      <span>View Live Post</span>
                      <FaExternalLinkAlt className="w-2.5 h-2.5" />
                    </Link>
                  ) : (
                    <span className="text-[11px] font-['Inter'] text-amber-500 font-medium">
                      Awaiting trainer verification
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEdit(post)}
                    className="p-2 rounded-lg bg-black/5 dark:bg-white/5 border border-brand-500/15 text-[#535C91] dark:text-[#9290C3] hover:text-active hover:border-active/40 transition-colors cursor-pointer"
                    title="Edit Post"
                  >
                    <FaEdit className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => handleDelete(post._id)}
                    disabled={deletingId === post._id}
                    className="p-2 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-500 hover:bg-rose-500 hover:text-white transition-colors cursor-pointer disabled:opacity-50"
                    title="Delete Post"
                  >
                    {deletingId === post._id ? (
                      <FaSpinner className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <FaTrash className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
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
        onSuccess={loadMyPosts}
      />
    </div>
  );
}
