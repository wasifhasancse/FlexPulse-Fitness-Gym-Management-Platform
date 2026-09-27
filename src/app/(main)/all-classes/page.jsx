import ClassCard from "@/components/AllClasses/ClassCard";
import SearchingClasses from "@/components/AllClasses/SearchingClasses";
import { getAllClasses } from "@/lib/api/getClasses";
import Link from "next/link";
import {
  FiChevronLeft,
  FiChevronRight,
  FiActivity,
  FiAward,
  FiZap,
  FiShield,
  FiArrowRight,
  FiRefreshCw,
  FiCheckCircle,
} from "react-icons/fi";
import { FaFire } from "react-icons/fa";

export const metadata = {
  title: "All Classes & Training Curriculum - FlexPulse",
  description:
    "Explore our high-performance athletic training classes led by certified master coaches. Filter by discipline, difficulty level, and schedule.",
};

export default async function AllClassesPage({ searchParams }) {
  const params = await searchParams;
  const search = params?.search || "";
  const category = params?.category || "";
  const difficulty = params?.difficulty || "";
  const sort = params?.sort || "newest";
  const page = Math.max(1, Number(params?.page || 1));
  const limit = 6;

  let classesResponse = null;
  try {
    classesResponse = await getAllClasses(
      search,
      category,
      page,
      limit,
      false,
      sort,
      difficulty
    );
  } catch (err) {
    console.error("Failed to fetch classes for all-classes page:", err);
  }

  const classesData = classesResponse?.items || [];
  const total = classesResponse?.total || 0;
  const totalPages = Math.max(1, classesResponse?.totalPages || 1);

  const buildPageLink = (targetPage) => {
    const query = new URLSearchParams();
    if (search) query.set("search", search);
    if (category && category !== "All Categories" && category !== "All")
      query.set("category", category);
    if (difficulty && difficulty !== "All" && difficulty !== "All Levels")
      query.set("difficulty", difficulty);
    if (sort && sort !== "newest") query.set("sort", sort);
    if (Number(targetPage) > 1) query.set("page", String(targetPage));
    const qs = query.toString();
    return qs ? `/all-classes?${qs}#classes-catalog` : "/all-classes#classes-catalog";
  };

  const hasFilters = Boolean(
    search ||
      (category && category !== "All Categories" && category !== "All") ||
      (difficulty && difficulty !== "All" && difficulty !== "All Levels") ||
      (sort && sort !== "newest")
  );

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300 pb-20">
      {/* Hero Header Section - Clean, compact & well-proportioned */}
      <section className="relative overflow-hidden pt-10 pb-8 sm:pt-12 sm:pb-10 border-b border-slate-200/80 dark:border-white/[0.06] bg-gradient-to-b from-slate-100/40 via-background to-background dark:from-[#110e24]/50 dark:via-background dark:to-background">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-64 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-active/10 via-rose-600/5 to-transparent blur-3xl pointer-events-none -z-10" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-3.5">
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-active/10 dark:bg-active/15 border border-active/30 text-active text-xs font-bold tracking-wider uppercase shadow-xs">
            <FiZap className="w-3.5 h-3.5 text-active" />
            <span>Curated Performance Curriculum</span>
          </div>

          {/* Headline */}
          <h1 className="font-['Outfit'] text-3xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight leading-tight">
            Master Every Discipline.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-active via-rose-500 to-amber-500">
              Redefine Your Limit.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="font-['Inter'] text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto leading-relaxed">
            Scientifically calibrated athletic training sessions led by certified master coaches. Filter by discipline, difficulty level, and schedule.
          </p>
        </div>
      </section>

      {/* Main Catalog Area */}
      <main id="classes-catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 scroll-mt-24">
        {/* Dynamic Search & Filter Hub */}
        <SearchingClasses totalClasses={total} />

        {/* Classes Grid or Empty State */}
        {classesData.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-6 my-8 text-center rounded-3xl bg-white/60 dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/10 max-w-2xl mx-auto shadow-sm backdrop-blur-sm">
            <div className="w-16 h-16 rounded-2xl bg-active/10 border border-active/20 flex items-center justify-center mb-5 text-active shadow-inner">
              <FiActivity className="w-8 h-8" />
            </div>

            <h3 className="font-['Outfit'] text-2xl font-black text-foreground mb-2">
              No Matching Classes Found
            </h3>

            <p className="font-['Inter'] text-sm text-slate-500 dark:text-slate-400 max-w-md mb-6 leading-relaxed">
              We couldn&apos;t find any sessions matching your current search query or filter combination.
              Try adjusting your keywords or clearing selected filters.
            </p>

            {hasFilters && (
              <Link
                href="/all-classes"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-active text-white text-xs font-bold uppercase tracking-wider hover:bg-rose-600 transition-colors shadow-md shadow-active/30"
              >
                <FiRefreshCw className="w-4 h-4" />
                <span>Reset All Filters</span>
              </Link>
            )}

            {/* Quick Suggestions */}
            <div className="mt-8 pt-6 border-t border-slate-200 dark:border-white/10 w-full max-w-sm">
              <span className="text-xs font-semibold text-slate-400 block mb-3">
                Try browsing by popular category:
              </span>
              <div className="flex flex-wrap justify-center gap-2">
                {["Weights", "HIIT", "Cardio", "Stretching"].map((cat) => (
                  <Link
                    key={cat}
                    href={`/all-classes?category=${cat}`}
                    className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-white/[0.05] text-xs font-semibold hover:text-active hover:border-active/40 border border-slate-200 dark:border-white/10 transition-colors"
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {classesData.map((cls) => (
              <ClassCard key={cls._id} cls={cls} />
            ))}
          </div>
        )}

        {/* Premium Segmented Pagination Bar */}
        {totalPages > 1 && (
          <div className="flex flex-col items-center gap-4 mt-16 pt-8 border-t border-slate-200/80 dark:border-white/[0.08]">
            <nav
              role="navigation"
              aria-label="Pagination Navigation"
              className="inline-flex items-center gap-2 p-1.5 rounded-2xl bg-white/80 dark:bg-white/[0.03] border border-slate-200/90 dark:border-white/10 backdrop-blur-md shadow-sm"
            >
              {/* Previous Button */}
              {page > 1 ? (
                <Link
                  href={buildPageLink(page - 1)}
                  aria-label="Previous Page"
                  className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <FiChevronLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Previous</span>
                </Link>
              ) : (
                <span
                  aria-disabled="true"
                  className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-300 dark:text-slate-600 cursor-not-allowed"
                >
                  <FiChevronLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Previous</span>
                </span>
              )}

              {/* Numbered Page Buttons */}
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNo) => {
                  const isActive = pageNo === page;
                  return (
                    <Link
                      key={pageNo}
                      href={buildPageLink(pageNo)}
                      aria-current={isActive ? "page" : undefined}
                      className={`inline-flex items-center justify-center w-9 h-9 rounded-xl font-['Inter'] text-xs font-bold transition-all duration-200 cursor-pointer ${
                        isActive
                          ? "bg-active text-white shadow-md shadow-active/30 scale-105"
                          : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 hover:text-foreground"
                      }`}
                    >
                      {pageNo}
                    </Link>
                  );
                })}
              </div>

              {/* Next Button */}
              {page < totalPages ? (
                <Link
                  href={buildPageLink(page + 1)}
                  aria-label="Next Page"
                  className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <span className="hidden sm:inline">Next</span>
                  <FiChevronRight className="w-4 h-4" />
                </Link>
              ) : (
                <span
                  aria-disabled="true"
                  className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-300 dark:text-slate-600 cursor-not-allowed"
                >
                  <span className="hidden sm:inline">Next</span>
                  <FiChevronRight className="w-4 h-4" />
                </span>
              )}
            </nav>

            <span className="text-xs font-semibold text-slate-400 dark:text-slate-400">
              Page <strong className="text-foreground">{page}</strong> of{" "}
              <strong className="text-foreground">{totalPages}</strong> •{" "}
              {total} total classes
            </span>
          </div>
        )}

        {/* Feature Badges Reassurance Section */}
        <section className="mt-24 pt-12 border-t border-slate-200/80 dark:border-white/[0.08]">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-extrabold uppercase tracking-wider text-active">
              The FlexPulse Standard
            </span>
            <h2 className="font-['Outfit'] text-2xl sm:text-3xl font-extrabold text-foreground mt-1">
              Engineered for Real Physical Adaptations
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/10 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-active/10 text-active flex items-center justify-center mb-4">
                <FiZap className="w-5 h-5" />
              </div>
              <h4 className="font-['Outfit'] font-bold text-base text-foreground mb-1">
                Telemetry Heart Tracking
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Real-time zone feedback displayed on overhead displays to keep you in the optimal aerobic zone.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/10 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-4">
                <FiAward className="w-5 h-5" />
              </div>
              <h4 className="font-['Outfit'] font-bold text-base text-foreground mb-1">
                Collegiate & CSCS Coaches
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Direct cueing on bar paths, spinal hygiene, and kinetic chain mechanics from credentialed masters.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/10 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-500 flex items-center justify-center mb-4">
                <FiShield className="w-5 h-5" />
              </div>
              <h4 className="font-['Outfit'] font-bold text-base text-foreground mb-1">
                Recovery Suite Access
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Every class pass grants post-workout access to cold plunge hydrotherapy tubs and Finnish dry saunas.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/10 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center mb-4">
                <FiCheckCircle className="w-5 h-5" />
              </div>
              <h4 className="font-['Outfit'] font-bold text-base text-foreground mb-1">
                Zero Cancellation Hassle
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Reschedule up to 2 hours prior to class commencement directly from your athlete dashboard.
              </p>
            </div>
          </div>
        </section>

        {/* Bottom VIP Pass CTA Banner */}
        <div className="mt-16 rounded-3xl bg-gradient-to-r from-slate-900 via-[#17152f] to-slate-950 p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl border border-white/10">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-active/20 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="max-w-xl text-center md:text-left">
              <span className="text-xs font-extrabold uppercase tracking-widest text-active">
                Begin Your Progression
              </span>
              <h3 className="font-['Outfit'] text-2xl sm:text-3xl font-black mt-1 mb-2">
                Claim a Complimentary 1-Day VIP Pass
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Experience any group masterclass, access recovery suites, and receive a complete biomechanical intake scan with no financial commitment.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <Link
                href="/calculator#trial-pass"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-active hover:bg-rose-600 text-white font-['Outfit'] text-sm font-bold shadow-lg shadow-active/30 transition-all duration-300 hover:scale-105"
              >
                <span>Claim VIP Pass</span>
                <FiArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/15 text-sm font-bold transition-all duration-300"
              >
                <span>Talk to Advisor</span>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
