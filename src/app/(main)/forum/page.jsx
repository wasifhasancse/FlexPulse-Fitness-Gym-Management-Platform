import ForumFeedClient from "@/components/ForumPage/ForumFeedClient";
import ForumHero from "@/components/ForumPage/ForumHero";
import ForumSidebar from "@/components/ForumPage/ForumSidebar";
import { getForumPosts } from "@/lib/api/getForumPosts";
import Image from "next/image";
import Link from "next/link";
import {
  FaArrowRight,
  FaCheckCircle,
  FaComment,
  FaHeart,
  FaStar,
} from "react-icons/fa";

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
    <div className="min-h-screen bg-background py-10 sm:py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* 1. Athletic Forum Hero */}
        <ForumHero totalPosts={total} />

        {/* 2. Pinned Magazine Spotlight: Protocol of the Week */}
        {!search && page === 1 && (
          <div className="relative mb-12 overflow-hidden rounded-3xl border border-brand-500/25 bg-[#070F2B] text-white shadow-xl">
            <div className="relative h-64 sm:h-80 w-full overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1400&q=80"
                alt="Carb Cycling & Macro Timing"
                fill
                priority
                unoptimized
                className="object-cover object-center opacity-40 hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070F2B] via-[#070F2B]/70 to-transparent" />

              <div className="absolute inset-0 p-6 sm:p-10 flex flex-col justify-end">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-active text-btn-text text-xs font-extrabold uppercase tracking-wider shadow-md">
                    <FaStar className="w-3 h-3" />
                    <span>Featured Protocol of the Week</span>
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-white/10 backdrop-blur-md text-white/90 text-xs font-semibold">
                    Nutrition &amp; Fuel
                  </span>
                </div>

                <h2 className="font-['Outfit'] text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight text-white mb-2 max-w-3xl">
                  <Link
                    href="/forum/6a42a1019dfe3eee48bf7002"
                    className="hover:text-active transition-colors"
                  >
                    Carb Cycling &amp; Macro Timing: Optimizing Insulin Sensitivity for Hypertrophy
                  </Link>
                </h2>

                <p className="font-['Inter'] text-xs sm:text-sm text-white/80 line-clamp-2 max-w-2xl mb-4 leading-relaxed">
                  Strategic carbohydrate timing allows athletes to replenish muscle glycogen without unwanted visceral adipose gain. Learn how to structure peri-workout starch intake and the leucine threshold.
                </p>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10 text-xs">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Image
                        src="https://lh3.googleusercontent.com/a/ACg8ocKzbEXd0N7V406ocsmdiEQkxCVV1BIJpiTn--O3W0TqjLiNy6e3=s96-c"
                        alt="Wasif Hasan"
                        width={32}
                        height={32}
                        className="w-8 h-8 rounded-full object-cover border border-active"
                      />
                      <span className="absolute -bottom-0.5 -right-0.5 p-0.5 bg-slate-900 rounded-full">
                        <FaCheckCircle className="w-2.5 h-2.5 text-active" />
                      </span>
                    </div>
                    <div>
                      <span className="font-bold text-white">Wasif Hasan</span>
                      <span className="text-white/60 ml-2">Powerlifting &amp; Nutrition</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-5">
                    <span className="flex items-center gap-1.5 text-rose-400 font-semibold">
                      <FaHeart className="w-3.5 h-3.5" /> 3 likes
                    </span>
                    <span className="flex items-center gap-1.5 text-active font-semibold">
                      <FaComment className="w-3.5 h-3.5" /> 1 discussion
                    </span>
                    <Link
                      href="/forum/6a42a1019dfe3eee48bf7002"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-btn-bg text-btn-text font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-all shadow-md"
                    >
                      <span>Read Blueprint</span>
                      <FaArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

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
