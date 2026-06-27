import { getUserSession } from "@/lib/core/getSession";
import { Spinner } from "@heroui/react";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import SignUpForm from "./SignUpForm";

export const metadata = {
  title: "Sign Up",
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
