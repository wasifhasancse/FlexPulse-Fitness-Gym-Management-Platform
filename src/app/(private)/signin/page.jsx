import { getUserSession } from "@/lib/core/getSession";
import { Spinner } from "@heroui/react";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import SignInForm from "./SignInForm";

export const metadata = {
  title: "Sign In",
};

const SignInPage = async () => {
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
      <SignInForm />
    </Suspense>
  );
};

export default SignInPage;
