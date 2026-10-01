import AllClassesGrid from "@/components/AllClasses/AllClassesGrid";
import SearchingClasses from "@/components/AllClasses/SearchingClasses";
import AllClassesHeroHeader from "@/components/AllClasses/AllClassesHeroHeader";
import AllClassesFeatures from "@/components/AllClasses/AllClassesFeatures";
import AllClassesVipBanner from "@/components/AllClasses/AllClassesVipBanner";
import AllClassesPagination from "@/components/AllClasses/AllClassesPagination";
import { getAllClasses } from "@/lib/api/getClasses";

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

  const hasFilters = Boolean(
    search ||
      (category && category !== "All Categories" && category !== "All") ||
      (difficulty && difficulty !== "All" && difficulty !== "All Levels") ||
      (sort && sort !== "newest")
  );

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300 pb-20">
      {/* ── 1. Hero Header Section with Triggered Animations & Telemetry (w-11/12 mx-auto) ── */}
      <AllClassesHeroHeader totalClasses={total} />

      {/* ── 2. Main Catalog Area (Strict w-11/12 mx-auto matching Nav and Footer) ── */}
      <main id="classes-catalog" className="w-11/12 mx-auto relative z-10 pt-10 sm:pt-12 scroll-mt-24">
        
        {/* Dynamic Search & Filter Hub with Triggered Transitions */}
        <SearchingClasses totalClasses={total} />

        {/* Classes Grid with High Demand Sessions Staged Viewport Delay & Layout Animation */}
        <AllClassesGrid classes={classesData} hasFilters={hasFilters} />

        {/* ── 3. Premium Segmented Pagination Dock with Triggered Transitions ── */}
        <AllClassesPagination
          page={page}
          totalPages={totalPages}
          total={total}
        />

        {/* ── 4. The FlexPulse Standard Feature Badges Reassurance Section ── */}
        <AllClassesFeatures />

        {/* ── 5. Bottom VIP Pass CTA Banner (w-11/12 relative z-10) ── */}
        <AllClassesVipBanner />

      </main>
    </div>
  );
}
