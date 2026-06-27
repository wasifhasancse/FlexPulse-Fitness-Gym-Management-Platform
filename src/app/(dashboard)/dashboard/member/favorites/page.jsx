import FavoriteCard from "@/components/Dashboard/member/FavoriteCard";
import { getFavoriteClass } from "@/lib/api/getFavoriteClasses";
import { getUserSession } from "@/lib/core/getSession";
import Link from "next/link";

export const metadata = {
  title: "Member - My Favorites",
  description:
    "View and manage your favorite fitness classes. Access class details and quick booking options.",
};

export default async function FavoritesPage() {
  const user = await getUserSession();

  const favorites = (await getFavoriteClass(user.id)) || [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-['Outfit'] text-3xl md:text-4xl font-bold text-foreground tracking-wide">
          My Favorites
        </h1>
        <p className="font-sans text-[#535C91] dark:text-[#9290C3] mt-1">
          Your saved fitness classes for quick booking access.
        </p>
      </div>

      {favorites.length === 0 ? (
        <div className="bg-white dark:bg-brand-800/20 rounded-2xl p-12 text-center shadow-card border border-brand-500/15 dark:border-brand-500/20 max-w-2xl">
          <p className="font-sans text-[#535C91] dark:text-[#9290C3] mb-4">
            You haven&apos;t added any classes to your favorites yet.
          </p>
          <Link
            href="/all-classes"
            className="inline-block px-5 py-2.5 bg-btn-bg text-btn-text font-sans font-semibold rounded-xl hover:opacity-90 transition-colors shadow-sm"
          >
            Explore Classes
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
