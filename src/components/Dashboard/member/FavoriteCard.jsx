"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FaHeart, FaTrash } from "react-icons/fa";
import { toast } from "@heroui/react";

import { deleteFavorite } from "@/lib/actions/deleteFavorite";

export default function FavoriteCard({ fav, userId }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleDelete = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      await deleteFavorite(userId, fav.classId);
      toast.success("Removed from favorites");

      startTransition(() => {
        router.refresh();
      });
    } catch (error) {
      toast.danger("Failed to remove favorite");
    }
  };

  return (
    <Link
      href={`/all-classes/${fav.classId}`}
      className="bg-white dark:bg-brand-800/20 rounded-2xl shadow-card border border-brand-500/15 dark:border-brand-500/20 overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
    >
      {/* Image */}
      <div className="relative h-48 w-full bg-brand-500/10">
        <Image
          src={fav.classImage}
          alt={fav.className}
          fill
          className="object-cover"
          unoptimized
        />

        <button
          onClick={handleDelete}
          disabled={isPending}
          className="absolute top-3 left-3 bg-rose-500 text-white p-2 rounded-full hover:bg-rose-600 transition shadow-md cursor-pointer"
        >
          <FaTrash size={14} />
        </button>

        <div className="absolute top-3 right-3 bg-white/80 dark:bg-black/50 p-2 rounded-full backdrop-blur-md">
          <FaHeart className="w-4 h-4 text-rose-500" />
        </div>
      </div>

      {/* Info */}
      <div className="p-5 space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-active bg-active/10 px-2.5 py-0.5 rounded-full">
          {fav.category}
        </span>

        <h3 className="font-sans text-lg font-bold text-foreground line-clamp-1 mt-2">
          {fav.className}
        </h3>

        <p className="text-sm text-[#535C91] dark:text-[#9290C3]">
          by {fav.author}
        </p>

        <div className="flex items-center justify-between pt-3 border-t border-brand-500/10 mt-2">
          <span className="font-extrabold text-active text-lg">${fav.price}</span>

          <span className="text-xs text-[#535C91] dark:text-[#9290C3]">
            {fav.duration} min
          </span>
        </div>
      </div>
    </Link>
  );
}
