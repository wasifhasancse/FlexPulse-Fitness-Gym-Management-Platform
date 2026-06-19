import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const loading = () => {
  return (
    <div className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center gap-4 bg-white dark:bg-zinc-950">
      <div className="w-20 md:w-40">
        <DotLottieReact
          src="https://lottie.host/996c7db2-7e48-4d1d-992a-74bb965f760e/M0Mpsl83np.lottie"
          loop
          autoplay
        />
      </div>
      <p className="animate-pulse text-sm font-medium text-zinc-400 dark:text-zinc-500">
        Loading…
      </p>
    </div>
  );
};

export default loading;
