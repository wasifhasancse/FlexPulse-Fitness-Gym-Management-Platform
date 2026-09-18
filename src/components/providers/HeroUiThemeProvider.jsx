"use client";
import { ThemeProvider } from "next-themes";

// Suppress harmless unmount AbortError from @lottiefiles/dotlottie in dev overlay
if (typeof window !== "undefined") {
  const originalError = console.error;
  console.error = (...args) => {
    if (
      typeof args[0] === "string" &&
      args[0].includes("Failed to load animation data from URL") &&
      args[0].includes("AbortError")
    ) {
      return;
    }
    originalError.apply(console, args);
  };
}

const HeroUiThemeProvider = ({ children }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      {children}
    </ThemeProvider>
  );
};

export default HeroUiThemeProvider;
