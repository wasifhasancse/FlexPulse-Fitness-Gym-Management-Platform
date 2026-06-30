"use client";

import { useSession } from "@/lib/auth-client";
import { toast } from "@heroui/react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { getForumsPostById } from "@/lib/api/getForumPosts";
import {
    FaArrowLeft,
    FaBookmark,
    FaComment,
    FaEdit,
    FaHeart,
    FaQuoteLeft,
    FaReply,
    FaShareAlt,
    FaThumbsDown,
    FaThumbsUp,
    FaUserCircle,
} from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";

export default function ForumPostDetailsPage() {
  const params = useParams();
  const postId = params?.id;
  const { data: session } = useSession();
  const user = session?.user;
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isDisliked, setIsDisliked] = useState(false);
  const [dislikeCount, setDislikeCount] = useState(0);
  const [isSaved, setIsSaved] = useState(false);
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [editingComment, setEditingComment] = useState(null);
  const [editingText, setEditingText] = useState("");

  useEffect(() => {
    if (!postId) return;
    const fetchPost = async () => {
      try {
        const data = await getForumsPostById(postId);
        setPost(data);
        setComments(data.comments || []);
        setLikeCount(data.likes?.length || 0);
        setDislikeCount(data.dislikes?.length || 0);
        if (user?.id && data.likes?.includes(user.id)) {
          setIsLiked(true);
        }
        if (user?.id && data.dislikes?.includes(user.id)) {
          setIsDisliked(true);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [postId, user]);

  useEffect(() => {
    if (!postId) return;
    const fetchRelated = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/forumPost?limit=5`);
        const data = await res.json();
        const items = data?.items || [];
        setRelatedArticles(items.filter(item => item._id !== postId).slice(0, 3));
      } catch (err) {
        console.error("Failed to load related articles", err);
      }
    };
    fetchRelated();
  }, [postId]);

  useEffect(() => {
    if (post?.title) {
      document.title = `${post.title} | FlexPulse`;
    } else {
      document.title = "Forum Post Details | FlexPulse";
    }
  }, [post]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const timeAgo = (dateString) => {
    return formatDate(dateString);
  };

  const handleLike = async () => {
    if (!user) return toast.danger("To like this post, please login first!");
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/forum/like`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ postId, userId: user.id }),
        },
      );
      const data = await res.json();
      if (!res.ok) {
        return toast.danger(data?.message || "Like action failed");
      }
      if (data.liked === true) {
        toast.success("Thank you for liking this post!");
        setIsDisliked(false);
      } else {
        toast.danger("Removed your like from this post.");
      }
      setIsLiked(data.liked);
      setLikeCount(data.likeCount);
      if (data.dislikeCount !== undefined) {
        setDislikeCount(data.dislikeCount);
      }
    } catch (err) {
      console.error("Failed to like post:", err);
    }
  };

  const handleDislike = async () => {
    if (!user) return toast.danger("To dislike this post, please login first!");
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/forum/dislike`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ postId, userId: user.id }),
        },
      );
      const data = await res.json();
      if (!res.ok) {
        return toast.danger(data?.message || "Dislike action failed");
      }

      setIsDisliked(data.disliked);
      setDislikeCount(data.dislikeCount);
      if (data.disliked) {
        setIsLiked(false);
      }
      if (data.likeCount !== undefined) {
        setLikeCount(data.likeCount);
      }
    } catch (err) {
      console.error("Failed to dislike post:", err);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!user)
      return toast.danger("To comment on this post, please login first!");
    if (!newComment.trim()) return;
    setSubmitting(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/forum/comment`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            postId,
            userId: user.id,
            userName: user.name,
            userImage: user.image || null,
            userRole: user.role || "member",
            content: newComment,
          }),
        },
      );
      const data = await res.json();
      if (!res.ok) {
        return toast.danger(data?.message || "Comment failed");
      }
      if (data.success) {
        toast.success("You commented successfully on this post!");
        setComments([data.comment, ...comments]);
        setNewComment("");
      }
    } catch (err) {
      console.error("Failed to submit comment:", err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleCommentEdit = async (commentId) => {
    if (!editingText.trim()) return;
    setSubmitting(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/forum/comment/${postId}/${commentId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: editingText, userId: user.id }),
        },
      );
      const data = await res.json();
      if (data.success) {
        setComments(
          comments.map((c) =>
            c._id === commentId
              ? { ...c, content: editingText, edited: true }
              : c,
          ),
        );
        setEditingComment(null);
        setEditingText("");
        toast.success("Successfully updated comment!");
      }
    } catch (err) {
      console.error("Failed to update comment:", err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleCommentDelete = async (commentId) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/forum/comment/${postId}/${commentId}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user.id }),
        },
      );
      const data = await res.json();
      if (data.success) {
        setComments(comments.filter((comment) => comment._id !== commentId));
        toast.success("Comment deleted successfully!");
      }
    } catch (err) {
      console.error("Failed to delete comment:", err);
    }
  };

  const handleCommentLike = async (commentId, currentLikes) => {
    if (!user) return toast.danger("Please login first!");
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/forum/comment/like`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ postId, commentId, userId: user.id }),
        },
      );
      const data = await res.json();
      if (!res.ok) {
        return toast.danger(data?.message || "Like action failed");
      }
      // UI update
      setComments(
        comments.map((comment) =>
          comment._id === commentId
            ? {
                ...comment,
                likes: data.liked
                  ? [...(comment.likes || []), user.id]
                  : (comment.likes || []).filter((id) => id !== user.id),
              }
            : comment,
        ),
      );
    } catch (err) {
      console.error("Failed to like comment:", err);
    }
  };

  const handleCommentDislike = async (commentId) => {
    if (!user) return toast.danger("Please login first!");
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/forum/comment/dislike`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ postId, commentId, userId: user.id }),
        },
      );

      const data = await res.json();
      if (!res.ok) {
        return toast.danger(data?.message || "Dislike action failed");
      }

      setComments(
        comments.map((comment) =>
          comment._id === commentId
            ? {
                ...comment,
                dislikes: data.disliked
                  ? [...(comment.dislikes || []), user.id]
                  : (comment.dislikes || []).filter((id) => id !== user.id),
              }
            : comment,
        ),
      );
    } catch (err) {
      console.error("Failed to dislike comment:", err);
    }
  };

  // Reply Submit
  const handleReplySubmit = async (e, commentId) => {
    e.preventDefault();
    if (!user) return toast.danger("To reply to this comment, please login first!");
    if (!replyText.trim()) return;
    setSubmitting(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/forum/reply`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            postId,
            commentId,
            userId: user.id,
            userName: user.name,
            userImage: user.image || null,
            userRole: user.role || "member",
            content: replyText,
          }),
        },
      );
      const data = await res.json();
      if (!res.ok) {
        return toast.danger(data?.message || "Reply failed");
      }
      if (data.success) {
        // UI update
        setComments(
          comments.map((comment) =>
            comment._id === commentId
              ? {
                  ...comment,
                  replies: [...(comment.replies || []), data.reply],
                }
              : comment,
          ),
        );
        setReplyText("");
        setReplyingTo(null);
      }
    } catch (err) {
      console.error("Failed to submit reply:", err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-active border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="font-['Inter'] text-rose-500">
          {error || "Post not found"}
        </p>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Back button */}
        <div className="mb-6">
          <Link
            href="/forum"
            className="inline-flex items-center gap-2 text-[#535C91] dark:text-[#9290C3] hover:text-active transition-colors font-['Inter'] text-sm"
          >
            <FaArrowLeft className="w-4 h-4" />
            Back to Forum
          </Link>
        </div>

        {/* Two‑column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column – Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-[#1b1a55]/20 rounded-2xl shadow-card border border-brand-500/15 dark:border-brand-500/30 overflow-hidden"
            >
              {/* Post Image */}
              {post.image && (
                <div className="relative w-full h-64 md:h-80 bg-brand-800/10">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                    priority
                    unoptimized
                  />
                </div>
              )}

              {/* Content */}
              <div className="p-6 md:p-8">
                {/* Title */}
                <h1 className="font-['Outfit'] text-3xl md:text-4xl font-bold text-foreground leading-tight">
                  {post.title}
                </h1>

                {/* Author Byline */}
                <div className="flex items-center gap-3 mt-4">
                  {post.userImage ? (
                    <Image
                      src={post.userImage}
                      alt={post.userName}
                      width={100}
                      height={100}
                      className="w-10 h-10 rounded-full object-cover border-2 border-brand-300"
                    />
                  ) : (
                    <FaUserCircle className="w-10 h-10 text-active" />
                  )}
                  <div>
                    <p className="font-['Inter'] font-semibold text-foreground">
                      {post.userName || "Anonymous"}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-[#535C91] dark:text-[#9290C3]">
                      {post.userRole && (
                        <span className="font-['Inter'] font-medium text-active bg-[#535C91]/10 dark:bg-[#1B1A55]/60 px-2 py-0.5 rounded-full text-xs">
                          {post.userRole.charAt(0).toUpperCase() + post.userRole.slice(1)}
                        </span>
                      )}
                      <span>•</span>
                      <span className="font-['Inter']">
                        {formatDate(post.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="mt-6">
                  <p className="font-['Inter'] text-foreground leading-relaxed text-base">
                    {post.description}
                  </p>
                </div>

                {/* Quote Block */}
                <div className="mt-8 p-6 bg-[#535C91]/5 dark:bg-[#1b1a55]/40 rounded-xl border-l-4 border-active">
                  <FaQuoteLeft className="text-active w-5 h-5 mb-2 opacity-60" />
                  <p className="font-['Inter'] italic text-[#535C91] dark:text-[#9290C3] leading-relaxed">
                    &quot;Success in fitness is not about random effort; it&apos;s about the consistency and building healthy daily habits with dedicated guidance.&quot;
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-4 mt-6 pt-4 border-t border-brand-500/10 dark:border-brand-800/40">
                  <button
                    onClick={handleLike}
                    className={`flex items-center gap-2 px-4 py-1.5 rounded-full font-['Inter'] text-sm font-medium transition-all cursor-pointer ${
                      isLiked
                        ? "bg-active text-btn-text"
                        : "bg-[#535C91]/10 dark:bg-[#1b1a55]/60 text-foreground hover:bg-[#535C91]/20 dark:hover:bg-[#1b1a55]/80"
                    }`}
                  >
                    <FaHeart
                      className={`w-4 h-4 ${isLiked ? "text-btn-text" : "text-active"}`}
                    />
                    {isLiked ? "Liked" : "Like"} ({likeCount})
                  </button>
                  <button
                    onClick={handleDislike}
                    className={`flex items-center gap-2 px-4 py-1.5 rounded-full font-['Inter'] text-sm font-medium transition-all cursor-pointer ${
                      isDisliked
                        ? "bg-rose-500 text-white"
                        : "bg-[#535C91]/10 dark:bg-[#1b1a55]/60 text-foreground hover:bg-[#535C91]/20 dark:hover:bg-[#1b1a55]/80"
                    }`}
                  >
                    <FaThumbsDown
                      className={`w-4 h-4 ${isDisliked ? "text-white" : "text-rose-500"}`}
                    />
                    {isDisliked ? "Disliked" : "Dislike"} ({dislikeCount})
                  </button>
                  <button className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#535C91]/10 dark:bg-[#1b1a55]/60 text-foreground hover:bg-[#535C91]/20 dark:hover:bg-[#1b1a55]/80 transition-colors font-['Inter'] text-sm font-medium cursor-pointer">
                    <FaComment className="w-4 h-4 text-active" />
                    Comment ({comments.length})
                  </button>
                  <button
                    onClick={() => setIsSaved(!isSaved)}
                    className={`flex items-center gap-2 px-4 py-1.5 rounded-full font-['Inter'] text-sm font-medium transition-all cursor-pointer ${
                      isSaved
                        ? "bg-active text-btn-text"
                        : "bg-[#535C91]/10 dark:bg-[#1b1a55]/60 text-foreground hover:bg-[#535C91]/20 dark:hover:bg-[#1b1a55]/80"
                    }`}
                  >
                    <FaBookmark
                      className={`w-4 h-4 ${isSaved ? "text-btn-text" : "text-active"}`}
                    />
                    {isSaved ? "Saved" : "Save"}
                  </button>
                  <button className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#535C91]/10 dark:bg-[#1b1a55]/60 text-foreground hover:bg-[#535C91]/20 dark:hover:bg-[#1b1a55]/80 transition-colors font-['Inter'] text-sm font-medium ml-auto cursor-pointer">
                    <FaShareAlt className="w-4 h-4 text-active" />
                    Share
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Comments Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white dark:bg-[#1b1a55]/20 rounded-2xl shadow-card border border-brand-500/15 dark:border-brand-500/30 p-6 md:p-8"
            >
              <h3 className="font-['Inter'] text-sm font-semibold uppercase tracking-wider text-[#535C91] dark:text-[#9290C3] mb-6">
                Community Discussion ({comments.length})
              </h3>

              {/* Comments List */}
              <div className="space-y-6">
                {comments.length === 0 ? (
                  <p className="font-['Inter'] text-sm text-[#535C91] dark:text-[#9290C3]">
                    No comments yet. Be the first to share your thoughts!
                  </p>
                ) : (
                  comments.map((comment) => (
                    <div
                      key={comment._id}
                      className="border-b border-brand-500/10 dark:border-brand-800/40 pb-4 last:border-0"
                    >
                      <div className="flex items-start gap-3">
                        {comment.userImage ? (
                          <Image
                            src={comment.userImage}
                            alt={comment.userName}
                            width={40}
                            height={40}
                            className="w-10 h-10 rounded-full object-cover border-2 border-brand-300 shrink-0"
                          />
                        ) : (
                          <FaUserCircle className="w-10 h-10 text-active shrink-0" />
                        )}
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <p className="font-['Inter'] font-semibold text-foreground text-sm">
                                {comment.userName}
                              </p>
                              <span className="text-xs text-[#535C91] dark:text-[#9290C3]">
                                {timeAgo(comment.createdAt)}
                              </span>
                              {comment.edited && (
                                <span className="text-xs text-[#535C91] dark:text-[#9290C3] italic">
                                  (edited)
                                </span>
                              )}
                            </div>

                            {user?.id === comment.userId && (
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => {
                                    setEditingComment(comment._id);
                                    setEditingText(comment.content);
                                  }}
                                  className="text-xs text-[#535C91] dark:text-[#9290C3] hover:text-active transition-colors px-2 py-1 rounded hover:bg-[#535C91]/10 dark:hover:bg-[#1b1a55]/60 cursor-pointer"
                                >
                                  <FaEdit />
                                </button>
                                <button
                                  onClick={() =>
                                    handleCommentDelete(comment._id)
                                  }
                                  className="text-xs text-[#535C91] dark:text-[#9290C3] hover:text-rose-500 transition-colors px-2 py-1 rounded hover:bg-rose-500/10 cursor-pointer"
                                >
                                  <RiDeleteBin5Line />
                                </button>
                              </div>
                            )}
                          </div>

                          {editingComment === comment._id ? (
                            <div className="mt-2">
                              <textarea
                                value={editingText}
                                onChange={(e) => setEditingText(e.target.value)}
                                rows="2"
                                className="w-full px-3 py-2 bg-[#535C91]/5 dark:bg-[#1b1a55]/40 border border-active rounded-lg text-sm text-foreground focus:outline-none resize-none"
                              />
                              <div className="flex gap-2 mt-2">
                                <button
                                  onClick={() => handleCommentEdit(comment._id)}
                                  disabled={submitting || !editingText.trim()}
                                  className="px-4 py-1.5 bg-btn-bg text-btn-text text-xs font-medium rounded-lg hover:opacity-90 disabled:opacity-50 cursor-pointer"
                                >
                                  {submitting ? "Saving..." : "Save"}
                                </button>
                                <button
                                  onClick={() => {
                                    setEditingComment(null);
                                    setEditingText("");
                                  }}
                                  className="px-4 py-1.5 bg-[#535C91]/10 dark:bg-[#1b1a55]/60 text-foreground text-xs font-medium rounded-lg cursor-pointer"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          ) : (
                            <p className="font-['Inter'] text-sm text-foreground mt-1">
                              {comment.content}
                            </p>
                          )}

                          <div className="flex items-center gap-4 mt-2">
                            <button
                                onClick={() =>
                                  handleCommentLike(comment._id, comment.likes)
                                }
                                className={`flex items-center gap-1 text-xs transition-colors cursor-pointer ${
                                  comment.likes?.includes(user?.id)
                                    ? "text-active"
                                    : "text-[#535C91] dark:text-[#9290C3] hover:text-active"
                                }`}
                              >
                              <FaThumbsUp className="w-3 h-3" />
                              <span>{comment.likes?.length || 0}</span>
                            </button>
                            <button
                              onClick={() => handleCommentDislike(comment._id)}
                              className={`flex items-center gap-1 text-xs transition-colors cursor-pointer ${
                                comment.dislikes?.includes(user?.id)
                                  ? "text-rose-500"
                                  : "text-[#535C91] dark:text-[#9290C3] hover:text-rose-500"
                              }`}
                            >
                              <FaThumbsDown className="w-3 h-3" />
                              <span>{comment.dislikes?.length || 0}</span>
                            </button>
                            <button
                              onClick={() =>
                                setReplyingTo(
                                  replyingTo === comment._id
                                    ? null
                                    : comment._id,
                                )
                              }
                              className="flex items-center gap-1 text-xs text-[#535C91] dark:text-[#9290C3] hover:text-active transition-colors cursor-pointer"
                            >
                              <FaReply className="w-3 h-3" /> Reply
                            </button>
                          </div>

                          {replyingTo === comment._id && (
                            <form
                              onSubmit={(e) =>
                                handleReplySubmit(e, comment._id)
                              }
                              className="mt-3"
                            >
                              <textarea
                                value={replyText}
                                onChange={(e) => setReplyText(e.target.value)}
                                placeholder="Write a reply..."
                                rows="2"
                                className="w-full px-3 py-2 bg-[#535C91]/5 dark:bg-[#1b1a55]/40 border border-brand-500/20 dark:border-brand-500/30 rounded-lg text-sm text-foreground placeholder-[#535C91]/50 dark:placeholder-[#9290C3]/50 focus:outline-none focus:border-active resize-none"
                              />
                              <div className="flex gap-2 mt-2">
                                <button
                                  type="submit"
                                  disabled={submitting || !replyText.trim()}
                                  className="px-4 py-1.5 bg-btn-bg text-btn-text text-xs font-medium rounded-lg hover:opacity-90 disabled:opacity-50 cursor-pointer"
                                >
                                  {submitting ? "Posting..." : "Post Reply"}
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setReplyingTo(null);
                                    setReplyText("");
                                  }}
                                  className="px-4 py-1.5 bg-[#535C91]/10 dark:bg-[#1b1a55]/60 text-foreground text-xs font-medium rounded-lg cursor-pointer"
                                >
                                  Cancel
                                </button>
                              </div>
                            </form>
                          )}

                          {comment.replies?.length > 0 && (
                            <div className="mt-3 ml-4 space-y-3 border-l-2 border-brand-500/20 dark:border-brand-800/40 pl-4">
                              {comment.replies.map((reply) => (
                                <div
                                  key={reply._id}
                                  className="flex items-start gap-2"
                                >
                                  {reply.userImage ? (
                                    <Image
                                      src={reply.userImage}
                                      alt={reply.userName}
                                      width={28}
                                      height={28}
                                      className="w-7 h-7 rounded-full object-cover border border-brand-300 shrink-0"
                                    />
                                  ) : (
                                    <FaUserCircle className="w-7 h-7 text-active shrink-0" />
                                  )}
                                  <div>
                                    <div className="flex items-center gap-2">
                                      <p className="font-['Inter'] font-semibold text-foreground text-xs">
                                        {reply.userName}
                                      </p>
                                      <span className="text-xs text-[#535C91] dark:text-[#9290C3]">
                                        {timeAgo(reply.createdAt)}
                                      </span>
                                    </div>
                                    <p className="font-['Inter'] text-xs text-foreground mt-0.5">
                                      {reply.content}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="mt-8 pt-6 border-t border-brand-500/10 dark:border-brand-800/40">
                <h4 className="font-['Inter'] font-semibold text-foreground mb-4">
                  Join the Conversation
                </h4>
                {user ? (
                  <form onSubmit={handleCommentSubmit}>
                    <textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Write your comment..."
                      rows="3"
                      className="w-full px-4 py-2.5 bg-[#535C91]/5 dark:bg-[#1b1a55]/40 border border-brand-500/20 dark:border-brand-500/30 rounded-lg text-foreground placeholder-[#535C91]/50 dark:placeholder-[#9290C3]/50 focus:outline-none focus:border-active focus:ring-2 focus:ring-active/20 font-['Inter'] text-sm resize-none"
                      required
                    />
                    <div className="flex justify-end mt-3">
                      <button
                        type="submit"
                        disabled={submitting || !newComment.trim()}
                        className={`px-6 py-2 font-['Inter'] font-medium rounded-lg transition-all cursor-pointer ${
                          newComment.trim() && !submitting
                            ? "bg-btn-bg text-btn-text hover:opacity-90 shadow-md"
                            : "bg-[#535C91]/10 dark:bg-[#1b1a55]/60 text-[#535C91]/50 dark:text-[#9290C3]/50 cursor-not-allowed"
                        }`}
                      >
                        {submitting ? "Posting..." : "Post Comment"}
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="text-center py-6 bg-[#535C91]/5 dark:bg-[#1b1a55]/40 rounded-xl">
                    <p className="font-['Inter'] text-sm text-[#535C91] dark:text-[#9290C3] mb-3">
                      Please login to join the conversation
                    </p>
                    <Link
                      href="/signin"
                      className="px-6 py-2 bg-btn-bg text-btn-text font-['Inter'] font-medium rounded-lg hover:opacity-90 transition-colors"
                    >
                      Login
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Right Column – Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            {/* Author Bio */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white dark:bg-[#1b1a55]/20 rounded-2xl shadow-card border border-brand-500/15 dark:border-brand-500/30 p-6"
            >
              <h3 className="font-['Inter'] text-sm font-semibold uppercase tracking-wider text-[#535C91] dark:text-[#9290C3] mb-4">
                About this Author
              </h3>
              <div className="flex flex-col items-start">
                {post.userImage ? (
                  <Image
                    src={post.userImage}
                    alt={post.userName}
                    width={800}
                    height={400}
                    className="w-16 h-16 rounded-full object-cover border-2 border-brand-300"
                  />
                ) : (
                  <FaUserCircle className="w-16 h-16 text-active" />
                )}
                <p className="font-['Outfit'] font-semibold text-foreground text-lg mt-3">
                  {post.userName || "Anonymous"}
                </p>
                <p className="font-['Inter'] text-sm text-active">
                  {post.userRole
                    ? post.userRole.charAt(0).toUpperCase() + post.userRole.slice(1)
                    : "Member"}
                </p>
                <p className="font-['Inter'] text-sm text-[#535C91] dark:text-[#9290C3] mt-2 leading-relaxed">
                  {post.userRole === "admin"
                    ? "FlexPulse Platform Administrator dedicated to sharing community guidelines, updates, and general wellness insights for all members."
                    : "Certified FlexPulse fitness instructor focused on supporting client goals, teaching classes, and sharing modern bodyweight training insights."}
                </p>
              </div>
            </motion.div>

            {/* Related Articles */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="bg-white dark:bg-[#1b1a55]/20 rounded-2xl shadow-card border border-brand-500/15 dark:border-brand-500/30 p-6"
            >
              <h3 className="font-['Inter'] text-sm font-semibold uppercase tracking-wider text-[#535C91] dark:text-[#9290C3] mb-4">
                Related Articles
              </h3>
              <div className="space-y-3">
                {relatedArticles.length === 0 ? (
                  <p className="font-['Inter'] text-xs text-[#535C91] dark:text-[#9290C3]">
                    No other posts found.
                  </p>
                ) : (
                  relatedArticles.map((article) => (
                    <Link
                      key={article._id}
                      href={`/forum/${article._id}`}
                      className="group flex items-center gap-3 p-3 bg-[#535C91]/5 dark:bg-[#1b1a55]/40 rounded-xl hover:bg-[#535C91]/10 dark:hover:bg-[#1b1a55]/60 transition-colors"
                    >
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0">
                        <Image
                          src={article.image || "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=400"}
                          alt={article.title}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                      <p className="font-['Inter'] text-sm font-medium text-foreground group-hover:text-active transition-colors line-clamp-2">
                        {article.title}
                      </p>
                    </Link>
                  ))
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
