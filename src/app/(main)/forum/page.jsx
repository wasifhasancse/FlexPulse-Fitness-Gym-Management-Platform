import ForumPostCard from "@/components/ForumPage/ForumPostCard";
import SearchingForum from "@/components/ForumPage/SearchingForum";
import { getForumPosts } from "@/lib/api/getForumPosts";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";

export default async function ForumPage({ searchParams }) {
  const params = await searchParams;
  const search = (await params.search) || "";
  let posts = await getForumPosts();

  // Filter posts based on search input
  if (search.trim()) {
    const query = search.toLowerCase();
    posts = posts.filter(
      (post) =>
        post.title?.toLowerCase().includes(query) ||
        post.description?.toLowerCase().includes(query) ||
        post.userName?.toLowerCase().includes(query) ||
        post.userRole?.toLowerCase().includes(query),
    );
  }

  return (
    <div className="min-h-screen bg-background py-16 px-6 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#535C91]/10 dark:bg-[#1B1A55]/60 border border-brand-500/20 text-active text-xs font-extrabold tracking-wider uppercase">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                />
              </svg>
              FlexPulse Community
            </div>
          </div>
          <h1 className="font-['Outfit'] text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground leading-[1.1] tracking-tight mb-4">
            Community{" "}
            <span className="text-active drop-shadow-[0_0_15px_var(--active-color)/0.1]">
              Forum
            </span>
          </h1>
          <p className="font-['Inter'] text-base sm:text-lg text-[#535C91] dark:text-[#9290C3] max-w-2xl mx-auto leading-relaxed">
            Connect with trainers, share your fitness journey, and learn from
            the FlexPulse community.
          </p>
        </div>

        {/* Action Header: Search & Create Post */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 max-w-3xl mx-auto">
          <div className="flex-1">
            <SearchingForum totalPosts={posts.length} />
          </div>
          <div className="flex justify-center shrink-0">
            <Link
              href="/forum/create"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-btn-bg text-btn-text font-bold rounded-2xl shadow-md border border-brand-500/20 hover:opacity-90 transition-all text-sm whitespace-nowrap cursor-pointer"
            >
              <FaPlus className="w-4 h-4" />
              Add Post
            </Link>
          </div>
        </div>

        {/* Posts Grid or Decorated Empty State */}
        {posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center bg-brand-900/10 dark:bg-[#1B1A55]/20 rounded-3xl border border-brand-500/25 max-w-2xl mx-auto px-6 shadow-inner mt-8">
            <div className="w-16 h-16 rounded-full bg-brand-800/10 dark:bg-brand-800/30 flex items-center justify-center mb-4 text-[#535C91] dark:text-[#9290C3]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-active"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
            <h3 className="font-['Outfit'] text-2xl font-bold text-foreground mb-2">
              No Posts Found
            </h3>
            <p className="font-['Inter'] text-[#535C91] dark:text-[#9290C3] max-w-sm mb-6 text-sm">
              We couldn&apos;t find any posts matching your search criteria. Try
              typing a different keyword or clearing filters.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {posts.map((post) => (
              <ForumPostCard key={post._id} post={post} />
            ))}
          </div>
        )}

        {/* View More Button */}
        {posts.length > 0 && (
          <div className="mt-16 text-center">
            <button className="px-8 py-3.5 border border-brand-500/30 dark:border-brand-500/50 hover:bg-btn-bg text-[#535C91] dark:text-[#9290C3] hover:text-btn-text font-bold rounded-xl transition-all shadow-sm hover:shadow-md cursor-pointer text-sm">
              View More
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
