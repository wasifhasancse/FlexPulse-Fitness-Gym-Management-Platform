const Loading = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background px-4 transition-colors duration-300">
      <div className="relative flex items-center justify-center">
        {/* Outer glowing spinning ring */}
        <div className="h-20 w-20 rounded-full border-4 border-brand-500/20 border-t-active animate-spin" />
        {/* Inner pulsing icon / brand badge */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-10 w-10 rounded-full bg-brand-500/10 flex items-center justify-center animate-pulse">
            <svg
              className="h-5 w-5 text-active"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-1.5 text-center">
        <p className="font-['Outfit'] text-lg font-bold tracking-tight text-foreground">
          Flex<span className="text-active">Pulse</span>
        </p>
        <p className="animate-pulse text-xs font-medium text-[#535C91] dark:text-[#9290C3]">
          Loading…
        </p>
      </div>
    </div>
  );
};

export default Loading;
