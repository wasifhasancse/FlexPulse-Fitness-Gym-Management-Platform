import { GetIdeasAction, GetMyIdeas } from "@/lib/Action/CrudAction";
import { auth } from "@/lib/auth";
import { format } from "date-fns";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import {
  FiCalendar,
  FiChevronRight,
  FiEdit3,
  FiMessageSquare,
  FiShield,
  FiThumbsUp,
  FiZap,
} from "react-icons/fi";
import {
  MdOutlineExplore,
  MdOutlineInterests,
  MdOutlineTipsAndUpdates,
} from "react-icons/md";
import { RiLightbulbFlashFill } from "react-icons/ri";

export const metadata = {
  title: "Profile",
  description:
    "Manage your IdeaVault profile, view your stats, and access your ideas.",
};

const Profile = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session.user;
  const memberSinceDate = session?.session?.createdAt || user?.createdAt;
  const memberSince = memberSinceDate
    ? format(new Date(memberSinceDate), "MMMM yyyy")
    : "Recently joined";

  const profileImage =
    user.image || "https://img.icons8.com/color/1200/user.jpg";
  const myIdeas = await GetMyIdeas(session?.session?.userId);
  const allExistingIdeas = await GetIdeasAction();
  const myCommentedIdeas = allExistingIdeas.filter((idea) =>
    idea.comments?.some(
      (comment) => comment.userInfo?.email === session?.user?.email,
    ),
  );
  const myUpvotedIdeas = [];

  const stats = [
    {
      label: "Ideas Shared",
      value: myIdeas.length,
      icon: FiZap,
      tip: "Share your first idea",
    },
    {
      label: "Interactions",
      value: myCommentedIdeas.length,
      icon: FiMessageSquare,
      tip: "Vote, comment & discuss",
    },
    {
      label: "Upvotes Received",
      value: myUpvotedIdeas.length,
      icon: FiThumbsUp,
      tip: "Earn recognition",
    },
  ];

  const featureCards = [
    {
      href: "/add-idea",
      icon: MdOutlineTipsAndUpdates,
      label: "Share an Idea",
      desc: "Post your startup concept and get feedback from the community.",
      primary: true,
    },
    {
      href: "/ideas",
      icon: MdOutlineExplore,
      label: "Discover Ideas",
      desc: "Browse and upvote innovative startup ideas from other innovators.",
      primary: false,
    },
    {
      href: "/my-ideas",
      icon: FiZap,
      label: "My Ideas",
      desc: "Review, edit, and manage all the ideas you've submitted.",
      primary: false,
    },
    {
      href: "/my-interactions",
      icon: MdOutlineInterests,
      label: "My Interactions",
      desc: "See everything you've upvoted, commented on, or bookmarked.",
      primary: false,
    },
  ];

  return (
    <section className="relative min-h-screen overflow-hidden bg-linear-to-br from-white via-[#5e41de]/5 to-[#a78bfa]/10 py-10 dark:from-zinc-950 dark:via-[#5e41de]/10 dark:to-[#a78bfa]/5 md:py-14 lg:py-16">
      {/* Background blobs — same as Hero section */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-[#5e41de]/10 blur-3xl dark:bg-[#5e41de]/20" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-[#a78bfa]/10 blur-3xl dark:bg-[#a78bfa]/20" />
        <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#5e41de]/5 blur-2xl dark:bg-[#5e41de]/10" />
      </div>

      <div className="relative mx-auto max-w-11/12">
        {/* Top accent line */}
        <div className="mb-8 h-px w-full bg-linear-to-r from-transparent via-[#5e41de]/50 to-transparent" />

        <div className="grid gap-5 lg:grid-cols-[400px_1fr] lg:gap-7">
          {/* ── Sidebar ── */}
          <aside className="flex flex-col items-center gap-5 rounded-3xl border border-white/70 bg-white/70 p-6 shadow-xl shadow-[#5e41de]/8 dark:border-white/5 dark:bg-zinc-900/60 dark:shadow-[#5e41de]/15 lg:sticky lg:top-20 lg:self-start">
            {/* Avatar */}
            <div className="relative">
              <div className="h-24 w-24 overflow-hidden rounded-full ring-4 ring-[#5e41de]/40 ring-offset-2 ring-offset-white sm:h-28 sm:w-28 dark:ring-[#a78bfa]/40 dark:ring-offset-zinc-900">
                <Image
                  src={profileImage}
                  alt={`${user.name || "User"} avatar`}
                  className="h-full w-full object-cover"
                  height={500}
                  width={500}
                />
              </div>
              <span className="absolute bottom-0.5 right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-400 ring-2 ring-white dark:ring-zinc-900">
                <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-white" />
              </span>
            </div>

            {/* Role badge */}
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#5e41de]/25 bg-[#5e41de]/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#5e41de] dark:border-[#5e41de]/35 dark:text-[#a78bfa]">
              <RiLightbulbFlashFill className="animate-pulse" /> Innovator
            </span>

            {/* Name & email */}
            <div className="text-center">
              <h1 className="wrap-break-word text-xl font-extrabold text-zinc-800 sm:text-2xl dark:text-zinc-100">
                {user.name || "IdeaVault Member"}
              </h1>
              <p className="mt-0.5 break-all text-sm text-zinc-400 dark:text-zinc-500">
                {user.email}
              </p>
            </div>

            {/* Divider */}
            <div className="h-px w-full bg-[#5e41de]/10 dark:bg-[#5e41de]/20" />

            {/* Meta chips */}
            <div className="w-full space-y-2.5">
              <div className="flex items-center gap-2.5 rounded-xl border border-[#5e41de]/12 bg-[#5e41de]/6 px-3 py-2.5 dark:border-[#5e41de]/20 dark:bg-[#5e41de]/10">
                <FiCalendar
                  size={13}
                  className="shrink-0 text-[#5e41de] dark:text-[#a78bfa]"
                />
                <span className="text-xs text-zinc-600 dark:text-zinc-300">
                  <span className="font-semibold">Joined</span> {memberSince}
                </span>
              </div>
              <div className="flex items-center gap-2.5 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2.5 dark:border-emerald-500/20 dark:bg-emerald-500/10">
                <FiShield size={13} className="shrink-0 text-emerald-500" />
                <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                  Account Active
                </span>
              </div>
            </div>

            {/* Edit Profile */}
            <Link
              href="/profile/edit"
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#5e41de]/25 bg-transparent px-4 py-2.5 text-sm font-semibold text-[#5e41de] transition-all duration-200 hover:border-[#5e41de]/50 hover:bg-[#5e41de]/8 hover:shadow-sm dark:border-[#5e41de]/35 dark:text-[#a78bfa] dark:hover:bg-[#5e41de]/15"
            >
              <FiEdit3 size={14} />
              Edit Profile
            </Link>
          </aside>

          {/* ── Main content ── */}
          <div className="flex flex-col gap-5">
            {/* Welcome + Stats card */}
            <div className="relative overflow-hidden rounded-3xl border border-white/70 bg-white/70 p-6 shadow-lg shadow-[#5e41de]/8 backdrop-blur-sm dark:border-white/5 dark:bg-zinc-900/60 sm:p-7">
              {/* Card inner blob */}
              <div className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-[#5e41de]/8 blur-2xl" />

              {/* Badge */}
              <span className="inline-flex items-center gap-2 rounded-full border border-[#5e41de]/25 bg-[#5e41de]/10 px-3.5 py-1.5 text-xs font-semibold text-[#5e41de] dark:border-[#5e41de]/30 dark:text-[#a78bfa]">
                <RiLightbulbFlashFill className="animate-pulse" /> IdeaVault
                Dashboard
              </span>

              {/* Heading */}
              <h2 className="mt-3 text-2xl font-extrabold leading-tight text-zinc-800 sm:text-3xl lg:text-4xl dark:text-zinc-100">
                Welcome back,{" "}
                <span className="bg-linear-to-r from-[#5e41de] to-[#a78bfa] bg-clip-text text-transparent">
                  {user.name?.split(" ")[0] || "Innovator"}
                </span>
              </h2>
              <p className="mt-1.5 text-sm leading-relaxed text-zinc-500 sm:text-base dark:text-zinc-400">
                Manage your startup ideas, track interactions, and connect with
                fellow innovators on IdeaVault.
              </p>

              {/* Stats row — embedded inside welcome card */}
              <div className="mt-5 grid grid-cols-1 gap-4 border-t border-[#5e41de]/10 pt-5 sm:grid-cols-3 dark:border-[#5e41de]/15">
                {stats.map(({ label, value, icon: Icon, tip }) => (
                  <div key={label} className="flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#5e41de]/10 dark:bg-[#5e41de]/20">
                      <Icon
                        size={17}
                        className="text-[#5e41de] dark:text-[#a78bfa]"
                      />
                    </span>
                    <div>
                      <p className="text-2xl font-extrabold leading-none text-[#5e41de] dark:text-[#a78bfa]">
                        {value}
                      </p>
                      <p className="mt-0.5 text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
                        {label}
                      </p>
                      <p className="text-[10px] text-zinc-400 dark:text-zinc-500">
                        {tip}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick actions */}
            <div>
              <p className="mb-3 px-1 text-[10px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                Quick Actions
              </p>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {featureCards.map(
                  ({ href, icon: Icon, label, desc, primary }) => (
                    <Link
                      key={href}
                      href={href}
                      className={`group flex items-center gap-4 rounded-2xl border p-4 backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg sm:p-5 ${
                        primary
                          ? "border-[#5e41de]/30 bg-linear-to-br from-[#5e41de]/10 to-[#a78bfa]/10 hover:border-[#5e41de]/50 hover:shadow-[#5e41de]/15 dark:border-[#5e41de]/35 dark:from-[#5e41de]/15 dark:to-[#a78bfa]/10"
                          : "border-white/70 bg-white/70 hover:border-[#5e41de]/20 hover:shadow-[#5e41de]/8 dark:border-white/5 dark:bg-zinc-900/60 dark:hover:border-[#5e41de]/25"
                      }`}
                    >
                      <span
                        className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-110 ${
                          primary
                            ? "bg-[#5e41de] text-white shadow-md shadow-[#5e41de]/30"
                            : "bg-[#5e41de]/10 text-[#5e41de] dark:bg-[#5e41de]/20 dark:text-[#a78bfa]"
                        }`}
                      >
                        <Icon size={18} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p
                          className={`font-bold ${
                            primary
                              ? "text-[#5e41de] dark:text-[#a78bfa]"
                              : "text-zinc-700 dark:text-zinc-200"
                          }`}
                        >
                          {label}
                        </p>
                        <p className="mt-0.5 text-xs leading-relaxed text-zinc-400 dark:text-zinc-500">
                          {desc}
                        </p>
                      </div>
                      <FiChevronRight
                        size={16}
                        className="mt-0.5 shrink-0 text-zinc-300 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-[#5e41de] dark:text-zinc-600 dark:group-hover:text-[#a78bfa]"
                      />
                    </Link>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
