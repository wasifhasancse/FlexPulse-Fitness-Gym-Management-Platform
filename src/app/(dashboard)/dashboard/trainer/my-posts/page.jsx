import MyForumPostCard from "@/components/Dashboard/trainer/MyForumPostCard";
import { getMyForumPost } from "@/lib/api/getForumPosts";
import { getUserSession } from "@/lib/core/getSession";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";

export default async function MyPostsPage() {
  const user = await getUserSession();
  const trainerId = user?.id;
  const myForumPosts = (await getMyForumPost(trainerId)) || [];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 md:py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="font-['Outfit'] text-2xl sm:text-3xl font-bold text-foreground">
            My Posts
          </h1>
          <p className="text-[#535C91] dark:text-[#9290C3] font-['Inter'] text-sm">
            {myForumPosts.length} {myForumPosts.length === 1 ? "post" : "posts"}{" "}
            published
          </p>
        </div>
        <Link
          href="/dashboard/trainer/forum-post"
          className="inline-flex items-center gap-2 bg-btn-bg text-btn-text px-4 py-2 rounded-xl font-['Inter'] text-sm font-semibold hover:opacity-90 transition-colors shadow-sm whitespace-nowrap border border-brand-500/20"
        >
          <FaPlus className="w-4 h-4" />
          New Post
        </Link>
      </div>

      {/* Posts Grid */}
      {myForumPosts.length === 0 ? (
        <div className="bg-white dark:bg-brand-800/20 rounded-2xl p-12 text-center border border-brand-500/15 dark:border-brand-500/20">
          <p className="text-[#535C91] dark:text-[#9290C3] font-['Inter'] mb-4">
            You haven&apos;t created any posts yet.
          </p>
          <Link
            href="/dashboard/trainer/forum-post"
            className="inline-block px-5 py-2.5 bg-btn-bg text-btn-text rounded-xl font-['Inter'] font-semibold hover:opacity-90 transition-colors shadow-sm"
          >
            Write Your First Post
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {myForumPosts.map((post) => (
            <MyForumPostCard key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
