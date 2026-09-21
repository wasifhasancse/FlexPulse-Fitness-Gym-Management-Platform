import ScheduleClient from "@/components/Schedule/ScheduleClient";
import { getAllClasses } from "@/lib/api/getClasses";

export const metadata = {
  title: "Class Schedule & Timetable - FlexPulse",
  description:
    "Explore our complete weekly workout schedule. Find HIIT, Strength, Yoga, Boxing, and CrossFit classes across all skill levels with certified elite trainers.",
};

export default async function SchedulePage() {
  let classes = [];
  try {
    const res = await getAllClasses("", "", 1, 50, false);
    classes = res?.items || (Array.isArray(res) ? res : []);
  } catch (err) {
    console.error("Failed to load classes for schedule:", err);
  }

  return <ScheduleClient initialClasses={classes} />;
}
