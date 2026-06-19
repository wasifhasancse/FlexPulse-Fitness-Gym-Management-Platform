import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Link from "next/link";
import { FiHome, FiLock, FiLogIn } from "react-icons/fi";

export const metadata = {
  title: "Access Restricted",
};

const ProtectedRoute = async ({ searchParams }) => {
  const { redirect } = await searchParams;
  const signInHref = redirect
    ? `/signin?redirect=${encodeURIComponent(redirect)}`
    : "/signin";

  return (
    <section className="relative flex min-h-[80vh] py-20 items-center justify-center overflow-hidden bg-linear-to-br from-white via-[#5e41de]/5 to-[#a78bfa]/10 px-4 dark:from-zinc-950 dark:via-[#5e41de]/10 dark:to-[#a78bfa]/5">
      {/* Background blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-[#5e41de]/10 blur-3xl dark:bg-[#5e41de]/20" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-[#a78bfa]/10 blur-3xl dark:bg-[#a78bfa]/20" />
      </div>

      <div className="relative z-10 flex w-full max-w-lg flex-col items-center gap-6 text-center">
        {/* Icon badge */}
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[#5e41de]/25 bg-[#5e41de]/10 shadow-lg shadow-[#5e41de]/15 dark:border-[#5e41de]/30 dark:bg-[#5e41de]/20">
          <FiLock size={28} className="text-[#5e41de] dark:text-[#a78bfa]" />
        </div>

        {/* Lottie */}
        <div className="w-full max-w-lg lg:max-w-xl">
          <DotLottieReact
            src="https://lottie.host/44f2bb75-6a1e-49f0-8fea-318abfabfcf0/3Wmx52w3OG.lottie"
            loop
            autoplay
          />
        </div>

        {/* Text */}
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl">
            Access{" "}
            <span className="text-[#5e41de] dark:text-[#a78bfa]">
              Restricted!
            </span>
          </h1>
          <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
            You need to be signed in to view this page. Please sign in to
            continue, or go back to the home page.
          </p>
        </div>

        {/* CTA buttons */}
        <div className="flex w-full flex-col gap-3 sm:flex-row">
          <Link
            href={signInHref}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#5e41de] px-6 py-3 text-sm font-bold text-white shadow-md shadow-[#5e41de]/30 transition-all duration-200 hover:bg-[#4930b8] hover:shadow-lg hover:shadow-[#5e41de]/30"
          >
            <FiLogIn size={15} />
            Sign In
          </Link>
          <Link
            href="/"
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-[#5e41de]/25 bg-transparent px-6 py-3 text-sm font-semibold text-[#5e41de] transition-all duration-200 hover:border-[#5e41de]/50 hover:bg-[#5e41de]/8 dark:border-[#5e41de]/35 dark:text-[#a78bfa] dark:hover:bg-[#5e41de]/15"
          >
            <FiHome size={15} />
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProtectedRoute;
