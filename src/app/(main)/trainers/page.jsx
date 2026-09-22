import TrainersClient from "@/components/Trainers/TrainersClient";
import { getPublicTrainers } from "@/lib/api/getClasses";

export const metadata = {
  title: "Elite Coaches & Trainers - FlexPulse",
  description:
    "Meet our team of world-class certified fitness coaches and personal trainers. Specialized in strength, HIIT, bodybuilding, yoga, and athletic transformation.",
};

export default async function TrainersPage() {
  const trainers = await getPublicTrainers();

  return <TrainersClient initialTrainers={trainers} />;
}
