"use client";
import ButtonLoader from "@/components/Loader/ButtonLoader";
import { authClient } from "@/lib/auth-client";
import {
  FieldError,
  Form,
  Input,
  Label,
  TextField,
  toast,
} from "@heroui/react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { ImPower } from "react-icons/im";
import { IoMdLogIn } from "react-icons/io";
import { RiLightbulbFlashFill } from "react-icons/ri";

function SignInForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      const formData = new FormData(event.target);
      const email = formData.get("email");
      const password = formData.get("password");
      const { data, error } = await authClient.signIn.email({
        email,
        password,
        callbackURL: redirectTo,
      });
      if (data?.token) {
        toast.success("Signed in successfully!");
      }
      if (error) {
        toast.danger("Failed to sign in. " + error.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    const { data, error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: redirectTo,
    });
    if (data) {
      toast.success("Signing in with Google successful!");
    }
    if (error) {
      toast.danger("Failed to Sign in with Google. " + error.message);
    }
  };

  return (
    <section className="mx-auto w-full max-w-10/12 py-8 md:py-12 lg:py-14">
      <div className="relative overflow-hidden rounded-3xl border border-[#5e41de]/20 bg-white/90 shadow-2xl shadow-[#5e41de]/15 dark:border-[#5e41de]/25 dark:bg-zinc-950/90 dark:shadow-[#5e41de]/20">
        <div className="absolute inset-0 -z-10 bg-linear-to-br from-white via-[#5e41de]/5 to-[#a78bfa]/10 dark:from-zinc-950 dark:via-[#5e41de]/10 dark:to-[#a78bfa]/5" />
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#5e41de]/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[#a78bfa]/10 blur-3xl" />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr]">
          {/* Left Panel */}
          <div className="relative border-b border-[#5e41de]/15 p-6 md:p-8 lg:border-b-0 lg:border-r lg:border-[#5e41de]/15 lg:p-10">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#5e41de]/25 bg-[#5e41de]/10 px-4 py-1.5 text-xs font-semibold text-[#5e41de] dark:border-[#5e41de]/30 dark:text-[#a78bfa]">
              <RiLightbulbFlashFill className="animate-pulse" /> IdeaVault
            </span>

            <h1 className="mt-4 text-3xl font-extrabold leading-tight text-zinc-900 dark:text-zinc-50 md:text-4xl lg:text-5xl">
              Welcome Back,{" "}
              <span className="text-[#5e41de] dark:text-[#a78bfa]">
                Innovator
              </span>
            </h1>

            <p className="mt-3 max-w-sm text-sm leading-relaxed text-zinc-500 dark:text-zinc-400 md:text-base">
              Sign in to discover, share, and validate startup ideas with
              thousands of innovators around the globe.
            </p>

            <div className="my-6 flex justify-center lg:my-8">
              <DotLottieReact
                src="https://lottie.host/e7516749-47b5-44f3-b3e2-a6de7b31b0a8/d4OktnL71s.lottie"
                loop
                autoplay
                style={{ width: "210px", height: "210px" }}
              />
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-[#5e41de]/20 bg-[#5e41de]/5 px-4 py-3 shadow-sm shadow-[#5e41de]/10 dark:bg-[#5e41de]/10">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#5e41de] dark:text-[#a78bfa] inline-flex items-center gap-1">
                  <RiLightbulbFlashFill /> My Ideas
                </p>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                  Manage and track your submitted startup concepts
                </p>
              </div>
              <div className="rounded-2xl border border-[#5e41de]/20 bg-[#5e41de]/5 px-4 py-3 shadow-sm shadow-[#5e41de]/10 dark:bg-[#5e41de]/10">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#5e41de] dark:text-[#a78bfa] inline-flex items-center gap-1">
                  <ImPower /> Interactions
                </p>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                  Track votes, comments, and feedback on ideas
                </p>
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <div className="p-6 md:p-8 lg:p-10">
            <div className="mb-6 flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#5e41de]/10 shadow-sm shadow-[#5e41de]/20 dark:bg-[#5e41de]/20">
                <RiLightbulbFlashFill className="h-6 w-6 text-[#5e41de] dark:text-[#a78bfa]" />
              </div>
              <div>
                <h2 className="text-2xl font-extrabold leading-tight text-zinc-900 dark:text-zinc-50 md:text-3xl">
                  Sign in
                </h2>
                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                  Enter your credentials to access your account
                </p>
              </div>
            </div>

            <div className="signin-form w-full">
              <Form className="flex w-full flex-col gap-5" onSubmit={onSubmit}>
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={isGoogleLoading || isSubmitting}
                  className="google-btn"
                >
                  {isGoogleLoading ? (
                    <ButtonLoader text="Connecting..." />
                  ) : (
                    <>
                      <FcGoogle className="google-icon" />
                      <span className="google-label">Continue with Google</span>
                    </>
                  )}
                </button>

                <div className="flex items-center gap-3">
                  <div className="h-px w-full bg-[#5e41de]/15" />
                  <span className="shrink-0 text-xs font-semibold uppercase tracking-widest text-zinc-400">
                    or
                  </span>
                  <div className="h-px w-full bg-[#5e41de]/15" />
                </div>

                <TextField
                  isRequired
                  name="email"
                  type="email"
                  className="w-full"
                  validate={(value) => {
                    if (
                      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
                    ) {
                      return "Please enter a valid email address";
                    }
                    return null;
                  }}
                >
                  <Label className="mb-1.5 block text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                    Email address
                  </Label>
                  <Input
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-[#5e41de]/20 bg-[#5e41de]/5 px-4 py-2.5 text-sm dark:border-[#5e41de]/25 dark:bg-[#5e41de]/10"
                  />
                  <FieldError className="mt-1 text-xs text-red-500" />
                </TextField>

                <TextField
                  isRequired
                  name="password"
                  type="password"
                  className="w-full"
                >
                  <Label className="mb-1.5 block text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                    Password
                  </Label>
                  <Input
                    placeholder="Enter your password"
                    className="w-full rounded-xl border border-[#5e41de]/20 bg-[#5e41de]/5 px-4 py-2.5 text-sm dark:border-[#5e41de]/25 dark:bg-[#5e41de]/10"
                  />
                  <FieldError className="mt-1 text-xs text-red-500" />
                </TextField>

                <Link
                  href="/forget-password"
                  className="-mt-2 self-start text-xs font-semibold text-[#5e41de] underline-offset-4 transition hover:underline hover:text-[#4930b8] dark:text-[#a78bfa]"
                >
                  Forgot Password?
                </Link>

                <button
                  type="submit"
                  disabled={isSubmitting || isGoogleLoading}
                  className="submit-btn"
                >
                  {isSubmitting ? (
                    <ButtonLoader text="Signing in..." />
                  ) : (
                    <>
                      <IoMdLogIn className="submit-icon" />
                      <span className="submit-label">Sign In to IdeaVault</span>
                    </>
                  )}
                </button>

                <p className="text-center text-sm text-zinc-500 dark:text-zinc-400 mt-2.5">
                  Haven&apos;t created an account yet?{" "}
                  <Link
                    href="/signup"
                    className="font-bold text-[#5e41de] underline decoration-[#5e41de]/30 underline-offset-4 transition hover:text-[#4930b8] dark:text-[#a78bfa]"
                  >
                    Create account
                  </Link>
                </p>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function SignIn() {
  return (
    <Suspense>
      <SignInForm />
    </Suspense>
  );
}
