import HeroSection from "@/components/Home/HeroSection";
import ProgramsGrid from "@/components/Home/ProgramsGrid";
import FeaturedClasses from "@/components/Home/FeaturedClasses";
import HomeBmiQuickCalc from "@/components/Home/HomeBmiQuickCalc";
import WhyChooseUs from "@/components/Home/WhyChooseUs";
import TrainersSpotlight from "@/components/Home/TrainersSpotlight";
import HomePricingPreview from "@/components/Home/HomePricingPreview";
import TrialPassBanner from "@/components/Home/TrialPassBanner";
import LatestForumPosts from "@/components/Home/LatestForumPosts";
import Testimonials from "@/components/Home/Testimonials";
import CommunityStats from "@/components/Home/CommunityStats";
import { getFeaturedClass } from "@/lib/api/getClasses";

export const metadata = {
  title: "FlexPulse - Elite Gym, Fitness Classes & Community",
  description:
    "Join FlexPulse for state-of-the-art gym facilities, certified elite trainers, interactive class schedules, BMI & macro calculators, and vibrant fitness community.",
};

export default async function Home() {
  let featuredClasses = [];
  let latestPosts = [];

  try {
    const classData = await getFeaturedClass();
    featuredClasses = Array.isArray(classData) ? classData : [];
  } catch (err) {
    console.error("Failed to load featured classes for homepage", err);
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/featured-forumPost`,
      { cache: "no-store" }
    );
    if (response.ok) {
      const postData = await response.json();
      latestPosts = Array.isArray(postData) ? postData : [];
    }
  } catch (err) {
    console.error("Failed to load latest forum posts for homepage", err);
  }

  return (
    <div className="space-y-0 overflow-hidden">
      <HeroSection />
      <ProgramsGrid />
      <FeaturedClasses classes={featuredClasses} />
      <HomeBmiQuickCalc />
      <WhyChooseUs />
      <TrainersSpotlight />
      <HomePricingPreview />
      <TrialPassBanner />
      <LatestForumPosts posts={latestPosts} />
      <Testimonials />
      <CommunityStats />
    </div>
  );
}
