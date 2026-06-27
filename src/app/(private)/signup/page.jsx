import { getUserSession } from "@/lib/core/getSession";
import { Spinner } from "@heroui/react";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import SignUpForm from "./SignUpForm";

export const metadata = {
  title: "Sign Up - FlexPulse",
  description:
    "Create a FlexPulse account to access personalized fitness classes, track your progress, and engage with the community. Join us in your fitness journey.",
};

const SignUpPage = async () => {
  const user = await getUserSession();
  if (user) {
    redirect(`/dashboard/${user.role || "member"}`);
  }

  return (
    <Suspense
      fallback={
        <div className="flex flex-col items-center gap-2">
          <Spinner size="lg" />
          <span className="text-xs text-muted">Large</span>
        </div>
      }
    >
      <SignUpForm />
    </Suspense>
  );
};

export default SignUpPage;
