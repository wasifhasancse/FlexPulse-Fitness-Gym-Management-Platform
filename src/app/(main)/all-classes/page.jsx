import ClassCard from "@/components/AllClasses/ClassCard";
import SearchingClasses from "@/components/AllClasses/SearchingClasses";
import { getAllClasses } from "@/lib/api/getClasses";

export const metadata = {
  title: "All Classes",
};

export default async function AllClassesPage({ searchParams }) {
  const params = await searchParams;
  const search = params.search || "";
  const category = params.category || "";
  const page = Number(params.page || 1);
  const limit = 6;
  const classesResponse = await getAllClasses(search, category, page, limit);

  const classesData = classesResponse?.items || [];
  const total = classesResponse?.total || 0;
  const totalPages = classesResponse?.totalPages || 1;

  const buildPageLink = (targetPage) => {
    const query = new URLSearchParams();
    if (search) query.set("search", search);
    if (category) query.set("category", category);
    query.set("page", String(targetPage));
    return `/all-classes?${query.toString()}`;
  };

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
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                />
              </svg>
              Explore All Classes
            </div>
          </div>
          <h1 className="font-['Outfit'] text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground leading-[1.1] tracking-tight mb-4">
            Find Your{" "}
            <span className="text-active drop-shadow-[0_0_15px_var(--active-color)/0.1]">
              Perfect Class
            </span>
          </h1>
          <p className="font-['Inter'] text-base sm:text-lg text-[#535C91] dark:text-[#9290C3] max-w-2xl mx-auto leading-relaxed">
            Browse our curated fitness classes led by expert trainers. Filter by
            category and discover the right fit for your goals.
          </p>
        </div>

        {/* Search & Filter Component */}
        <SearchingClasses totalClasses={total} />

        {/* Grid of class cards or Empty State */}
        {classesData.length === 0 ? (
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
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="font-['Outfit'] text-2xl font-bold text-foreground mb-2">
              No Classes Found
            </h3>
            <p className="font-['Inter'] text-[#535C91] dark:text-[#9290C3] max-w-sm mb-6 text-sm">
              We couldn&apos;t find any classes matching your search criteria or
              category filter. Try clearing filters or try a different search.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {classesData.map((classData) => (
              <ClassCard key={classData._id} cls={classData} />
            ))}
          </div>
        )}

        {/* Pagination Section styled to match the theme */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-16 font-['Inter'] text-sm text-[#535C91] dark:text-[#9290C3]">
            <a
              href={buildPageLink(Math.max(1, page - 1))}
              className="px-3.5 py-1.5 rounded-lg border border-brand-500/10 hover:bg-[#535C91]/10 dark:hover:bg-[#1B1A55]/60 hover:text-foreground transition-colors cursor-pointer"
            >
              &lt;
            </a>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (pageNo) => (
                <a
                  key={pageNo}
                  href={buildPageLink(pageNo)}
                  className={`px-3.5 py-1.5 rounded-lg border font-bold transition-colors cursor-pointer ${
                    pageNo === page
                      ? "bg-btn-bg text-btn-text border-brand-500/20"
                      : "border-brand-500/10 hover:bg-[#535C91]/10 dark:hover:bg-[#1B1A55]/60 hover:text-foreground"
                  }`}
                >
                  {pageNo}
                </a>
              ),
            )}
            <a
              href={buildPageLink(Math.min(totalPages, page + 1))}
              className="px-3.5 py-1.5 rounded-lg border border-brand-500/10 hover:bg-[#535C91]/10 dark:hover:bg-[#1B1A55]/60 hover:text-foreground transition-colors cursor-pointer"
            >
              &gt;
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
