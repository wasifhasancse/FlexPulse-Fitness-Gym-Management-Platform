import NotFoundClient from "@/components/NotFound/NotFoundClient";

export const metadata = {
  title: "404 - Page Not Found - FlexPulse",
  description:
    "Oops! The page you are looking for does not exist. Explore our fitness classes, community forum, and more on FlexPulse. Get back on track with your fitness journey.",
};

const NotFound = () => {
  return <NotFoundClient />;
};

export default NotFound;
