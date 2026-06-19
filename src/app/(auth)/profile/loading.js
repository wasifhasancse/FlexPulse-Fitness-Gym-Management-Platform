import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const loading = () => {
  return (
    <div className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center gap-4 bg-white dark:bg-zinc-950">
      <div className="w-48 sm:w-56">
        <DotLottieReact
          src="https://lottie.host/9a1af7d4-17b9-4adc-9ba6-9db3891a8415/nAGVhLu83f.lottie"
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
