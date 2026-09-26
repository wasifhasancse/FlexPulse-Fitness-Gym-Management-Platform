import { Suspense } from "react";
import FitnessCalculatorClient from "@/components/Calculator/FitnessCalculatorClient";

export const metadata = {
  title: "Fitness & BMI Calculator - FlexPulse",
  description:
    "Calculate your Body Mass Index (BMI), Basal Metabolic Rate (BMR), Total Daily Energy Expenditure (TDEE), and daily protein, carb, and fat targets to optimize your fitness progress.",
};

export default function CalculatorPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <FitnessCalculatorClient />
    </Suspense>
  );
}
