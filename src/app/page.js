import HeroSection from "@/components/Home/HeroSection";
import FeaturedClasses from "@/components/Home/FeaturedClasses";
import LatestForumPosts from "@/components/Home/LatestForumPosts";
import WhyChooseUs from "@/components/Home/WhyChooseUs";
import Testimonials from "@/components/Home/Testimonials";
import { getFeaturedClass } from "@/lib/api/getClasses";
import { getForumPosts } from "@/lib/api/getForumPosts";

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
    const postData = await getForumPosts({ limit: 3 });
    latestPosts = postData?.items || [];
  } catch (err) {
    console.error("Failed to load latest forum posts for homepage", err);
  }

  return (
    <div className="space-y-0">
      <HeroSection />
      <FeaturedClasses classes={featuredClasses} />
      <WhyChooseUs />
      <LatestForumPosts posts={latestPosts} />
      <Testimonials />
    </div>
  );
}

