import { Poppins } from "next/font/google";
import "./globals.css";
import HeroUiThemeProvider from "@/components/providers/HeroUiThemeProvider";
import { Toast } from "@heroui/react";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: {
    default: "FlexPulse - Premium Fitness & Gym Platform",
    template: "%s | FlexPulse",
  },
  description: "Certified elite trainers, customized training programs, and a dedicated fitness community.",
};

export default function RootLayout({ children }) {
  return (
    <html
      suppressHydrationWarning
      lang="en"
      className={`${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <HeroUiThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <Navbar/>
          <main className="flex-1">{children}</main>
          <Footer/>
        </HeroUiThemeProvider>
        <Toast.Provider />
      </body>
    </html>
  );
}
