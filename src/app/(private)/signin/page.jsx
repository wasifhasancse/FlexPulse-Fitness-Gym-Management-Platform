import { Spinner } from "@heroui/react";
import { Suspense } from "react";
const SignInPage = () => {
  return (
    <Suspense
          fallback={
            <div className="flex flex-col items-center gap-2">
              <Spinner size="lg" />
              <span className="text-xs text-muted">Large</span>
            </div>
          }
        >



        </Suspense>
  );
};

export default SignInPage;
