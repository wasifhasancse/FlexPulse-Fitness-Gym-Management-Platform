import FavoriteCard from "@/components/Dashboard/member/FavoriteCard";
import DashboardPageHeader from "@/components/Dashboard/common/DashboardPageHeader";
import { getFavoriteClass } from "@/lib/api/getFavoriteClasses";
import { getUserSession } from "@/lib/core/getSession";
import Link from "next/link";
import { FaHeart, FaDumbbell } from "react-icons/fa";

export default async function FavoritesPage() {
  const user = await getUserSession();
  const favorites = (await getFavoriteClass(user.id)) || [];

  return (
    <div className="w-full space-y-6 pb-12 text-left">
      <DashboardPageHeader
        icon={FaHeart}
        title="My Favorites"
        subtitle="Your saved fitness classes for fast booking access and personalized workout plans."
        badges={[
          <span key="badge" className="text-active font-semibold">
            {favorites.length} Saved {favorites.length === 1 ? "Class" : "Classes"}
          </span>,
        ]}
        actions={
          <Link
            href="/all-classes"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-btn-bg text-btn-text text-xs font-['Outfit'] font-extrabold rounded-xl shadow-xs hover:shadow-md hover:brightness-105 active:scale-95 transition-all"
          >
            <FaDumbbell className="w-3.5 h-3.5" />
            <span>Explore Classes</span>
          </Link>
        }
      />

      {favorites.length === 0 ? (
        <div className="bg-white dark:bg-[#070F2B] rounded-2xl p-12 text-center shadow-xs border border-brand-500/15 w-full flex flex-col items-center justify-center">
          <div className="w-16 h-16 rounded-2xl bg-active/10 border border-active/20 flex items-center justify-center text-active mb-4">
            <FaHeart className="w-7 h-7" />
          </div>
          <h3 className="font-['Outfit'] font-bold text-lg text-foreground mb-1">
            No Favorite Classes Saved
          </h3>
          <p className="font-['Inter'] text-xs text-[#535C91] dark:text-[#9290C3] mb-6 max-w-sm">
            Save classes you love while browsing to easily monitor schedule openings and book spots.
          </p>
          <Link
            href="/all-classes"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-btn-bg text-btn-text font-['Inter'] text-xs font-bold rounded-xl hover:opacity-90 transition-all shadow-xs"
          >
            Browse All Classes
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((fav) => (
            <FavoriteCard key={fav._id} fav={fav} userId={user.id} />
          ))}
        </div>
      )}
    </div>
  );
}
