import ForumFeaturedSpotlight from "@/components/ForumPage/ForumFeaturedSpotlight";
import ForumFeedClient from "@/components/ForumPage/ForumFeedClient";
import ForumHero from "@/components/ForumPage/ForumHero";
import ForumSidebar from "@/components/ForumPage/ForumSidebar";
import { getForumPosts } from "@/lib/api/getForumPosts";

export const metadata = {
  title: "FlexPulse Athletic Community & Training Forum",
  description:
    "Connect with certified trainers, exchange evidence-based workout routines, request movement form critiques, and share your fitness journey in the FlexPulse Community Forum.",
};

export default async function ForumPage({ searchParams }) {
  const params = await searchParams;
  const search = params?.search || "";
  const page = Number(params?.page || 1);
  const limit = 6;

  const postsResponse = await getForumPosts({ search, page, limit });
  const posts =
    postsResponse?.items || (Array.isArray(postsResponse) ? postsResponse : []);
  const total = postsResponse?.total ?? posts.length;
  const totalPages =
    postsResponse?.totalPages ?? Math.max(1, Math.ceil(total / limit));

  return (
    <div className="min-h-screen bg-background py-10 sm:py-16 transition-colors duration-300 relative overflow-hidden">
      {/* Universal 11/12 Container Width */}
      <div className="w-11/12 mx-auto relative z-10">
        {/* 1. Athletic Forum Hero */}
        <ForumHero totalPosts={total} />

        {/* 2. Pinned Magazine Spotlight: Protocol of the Week */}
        {!search && page === 1 && <ForumFeaturedSpotlight />}

        {/* 3. Main Content: Dual-Column Responsive Architecture */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Feed: 8 Columns on lg */}
          <main className="lg:col-span-8 flex flex-col">
            <ForumFeedClient
              initialPosts={posts}
              total={total}
              totalPages={totalPages}
              currentPage={page}
              currentSearch={search}
            />
          </main>

          {/* Athletic Sidebar: 4 Columns on lg */}
          <div className="lg:col-span-4 sticky top-24">
            <ForumSidebar />
          </div>
        </div>
      </div>
    </div>
  );
}
