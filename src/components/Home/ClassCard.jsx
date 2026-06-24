import Image from "next/image";
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";

export default function ClassCard({ cls }) {
  const { className, price, author, duration, slot, classImage, category, level, description } = cls;

  return (
    <div className="group bg-[#ffffff] dark:bg-[#1B1A55]/40 border border-brand-500/20 rounded-[24px] overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col h-125">

      {/* Top Image portion */}
      <div className="h-52 w-full relative overflow-hidden bg-brand-800">
        <Image
          src={classImage || "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop"}
          alt={className}
          fill
          unoptimized
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
        />

        {/* Category Pill Tag */}
        <span className="absolute top-4 left-4 z-10 bg-red-500/10 dark:bg-red-500/20 text-red-500 dark:text-red-400 text-xs font-bold px-3 py-1 rounded-md backdrop-blur-md">
          {category || "Cardio"}
        </span>

        {/* Price Tag Overlay */}
        <span className="absolute top-4 right-4 z-10 bg-active text-btn-text text-xs font-extrabold px-2.5 py-1.5 rounded-lg shadow-md border border-brand-500/10">
          ${price}
        </span>
      </div>

      {/* Bottom Details portion */}
      <div className="p-6 flex flex-col flex-1 min-h-0">
        <h3 className="font-['Outfit'] text-xl font-bold text-foreground leading-tight line-clamp-1 group-hover:text-active transition-colors">
          {className}
        </h3>

        {/* Trainer Info */}
        <p className="font-['Inter'] text-sm text-[#535C91] dark:text-[#9290C3] mt-1 flex items-center gap-1">
          <span>by</span> <span className="font-semibold text-foreground">{author || "Trainer"}</span>
        </p>

        {/* Specs Row */}
        <div className="flex items-center gap-4 mt-3">
          <span className="bg-teal-500/10 dark:bg-teal-500/20 text-teal-600 dark:text-teal-400 text-[11px] font-bold px-2 py-0.5 rounded">
            {level || "Beginner"}
          </span>
          <div className="flex items-center gap-1 text-xs text-[#535C91] dark:text-[#9290C3]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{duration || 60}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-[#535C91] dark:text-[#9290C3]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span>{slot || 0}</span>
          </div>
        </div>

        {/* Description */}
        <p className="font-['Inter'] text-sm text-[#535C91] dark:text-[#9290C3] line-clamp-2 mt-4 flex-1">
          {description || "A custom fitness session designed to test your limits, improve body wellness, and build strength."}
        </p>

        {/* Divider */}
        <div className="border-t border-[#535C91]/15 dark:border-brand-800/40 my-4"></div>

        {/* Bottom CTA & Price Row */}
        <div className="flex items-center justify-between mt-auto">
          <div>
            <span className="font-['Outfit'] text-2xl font-black text-active">${price}</span>
            <span className="text-[11px] text-[#535C91] dark:text-[#9290C3] ml-1">/session</span>
          </div>
          <Link href={`/all-classes/${cls._id}`}>
            <button className="bg-transparent hover:bg-btn-bg text-[#535C91] dark:text-[#9290C3] hover:text-btn-text border border-brand-500/30 dark:border-brand-500/50 rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-300 cursor-pointer">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
