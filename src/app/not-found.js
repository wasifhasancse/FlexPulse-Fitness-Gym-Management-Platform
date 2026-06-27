import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Link from "next/link";
import { FiCompass, FiHome, FiLogIn } from "react-icons/fi";

export const metadata = {
  title: "404 - Page Not Found - FlexPulse",
  description:
    "Oops! The page you are looking for does not exist. Explore our fitness classes, community forum, and more on FlexPulse. Get back on track with your fitness journey.",
};

const NotFound = () => {
  return (
    <section className="relative flex min-h-[80vh] items-center py-20 justify-center overflow-hidden bg-background px-4">
      {/* Background blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-brand-500/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-active/10 blur-3xl" />
      </div>

      <div className="relative z-10 flex w-full max-w-xl flex-col items-center gap-6 text-center">
        {/* 404 badge */}
        <div className="flex items-center gap-2 rounded-full border border-brand-500/25 bg-brand-500/10 px-5 py-2">
          <FiCompass size={14} className="text-active" />
          <span className="text-xs font-bold uppercase tracking-widest text-active">
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
          <h1 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
            Oops! This page{" "}
            <span className="text-active">
              doesn&apos;t exist
            </span>
          </h1>
          <p className="text-sm leading-relaxed text-[#535C91] dark:text-[#9290C3]">
            The page you&apos;re looking for may have been moved, deleted, or
            never existed. Let&apos;s get you back on track.
          </p>
        </div>

        {/* CTA buttons */}
        <div className="flex w-full flex-col gap-3 sm:flex-row">
          <Link
            href="/"
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-btn-bg px-6 py-3 text-sm font-bold text-btn-text shadow-md hover:opacity-90 transition-all duration-200"
          >
            <FiHome size={15} />
            Back to Home
          </Link>
          <Link
            href="/signin"
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-brand-500/25 bg-transparent px-6 py-3 text-sm font-semibold text-active hover:bg-brand-500/10 transition-all duration-200"
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
