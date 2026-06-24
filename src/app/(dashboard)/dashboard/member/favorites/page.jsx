import FavoriteCard from "@/components/Dashboard/member/FavoriteCard";
import { getFavoriteClass } from "@/lib/api/getFavoriteClasses";
import { getUserSession } from "@/lib/core/getSession";

export default async function FavoritesPage() {
  const user = await getUserSession();

  const favorites = await getFavoriteClass(user.id);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {favorites.map((fav) => (
        <FavoriteCard key={fav._id} fav={fav} userId={user.id} />
      ))}
    </div>
  );
}
