import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Link from "next/link";
import { FiCompass, FiHome, FiLogIn } from "react-icons/fi";

export const metadata = {
  title: "Page Not Found",
};

const NotFound = () => {
  return (
    <section className="relative flex min-h-[80vh] items-center py-20 justify-center overflow-hidden bg-linear-to-br from-white via-[#5e41de]/5 to-[#a78bfa]/10 px-4 dark:from-zinc-950 dark:via-[#5e41de]/10 dark:to-[#a78bfa]/5">
      {/* Background blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-[#5e41de]/10 blur-3xl dark:bg-[#5e41de]/20" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-[#a78bfa]/10 blur-3xl dark:bg-[#a78bfa]/20" />
      </div>

      <div className="relative z-10 flex w-full max-w-xl flex-col items-center gap-6 text-center">
        {/* 404 badge */}
        <div className="flex items-center gap-2 rounded-full border border-[#5e41de]/25 bg-[#5e41de]/10 px-5 py-2 dark:border-[#5e41de]/30 dark:bg-[#5e41de]/20">
          <FiCompass size={14} className="text-[#5e41de] dark:text-[#a78bfa]" />
          <span className="text-xs font-bold uppercase tracking-widest text-[#5e41de] dark:text-[#a78bfa]">
            404 — Page Not Found
          </span>
        </div>

        {/* Lottie */}
        <div className="w-full max-w-lg lg:max-w-xl">
          <DotLottieReact
            src="https://lottie.host/e54ff801-75d7-427f-b50d-67901db86877/SsWcllQCND.lottie"
            loop
            autoplay
          />
        </div>

        {/* Text */}
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl">
            Oops! This page{" "}
            <span className="text-[#5e41de] dark:text-[#a78bfa]">
              doesn&apos;t exist
            </span>
          </h1>
          <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
            The page you&apos;re looking for may have been moved, deleted, or
            never existed. Let&apos;s get you back on track.
          </p>
        </div>

        {/* CTA buttons */}
        <div className="flex w-full flex-col gap-3 sm:flex-row">
          <Link
            href="/"
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#5e41de] px-6 py-3 text-sm font-bold text-white shadow-md shadow-[#5e41de]/30 transition-all duration-200 hover:bg-[#4930b8] hover:shadow-lg hover:shadow-[#5e41de]/30"
          >
            <FiHome size={15} />
            Back to Home
          </Link>
          <Link
            href="/signin"
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-[#5e41de]/25 bg-transparent px-6 py-3 text-sm font-semibold text-[#5e41de] transition-all duration-200 hover:border-[#5e41de]/50 hover:bg-[#5e41de]/8 dark:border-[#5e41de]/35 dark:text-[#a78bfa] dark:hover:bg-[#5e41de]/15"
          >
            <FiLogIn size={15} />
            Sign In
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
