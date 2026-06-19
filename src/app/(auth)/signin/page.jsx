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
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FiArrowRight, FiLock, FiMail } from "react-icons/fi";
import { GiCentaurHeart } from "react-icons/gi";

function SignInForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";

  const demoRoles = ["Admin", "Trainer", "User"];
  const highlights = [
    "500+ Expert-Curated Workouts",
    "Real-Time Progress Analytics",
    "Elite Trainer Community",
  ];

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
    setIsGoogleLoading(false);
  };

  return (
    <section className="mx-auto w-full max-w-10/12 py-8 md:py-12 lg:py-14">
      <div className="overflow-hidden rounded-[2rem] border border-[#30475E]/18 bg-[#111827] shadow-[0_28px_80px_-40px_rgba(0,0,0,0.7)]">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr]">
          <div className="relative overflow-hidden bg-linear-to-br from-[#233b09] via-[#183507] to-[#102507] p-8 text-white md:p-10 lg:p-12">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(208,255,44,0.18),transparent_35%)]" />
            <div className="relative flex h-full flex-col">
              <div className="inline-flex items-center gap-4">
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#D7FF32] text-[#222831] shadow-[0_16px_30px_-18px_rgba(215,255,50,0.9)]">
                  <GiCentaurHeart size={26} />
                </span>
                <span className="text-3xl font-black tracking-tight text-white">
                  Flex<span className="text-[#D7FF32]">Pulse</span>
                </span>
              </div>

              <div className="mt-12 max-w-lg">
                <h1 className="text-4xl font-black leading-tight text-white md:text-5xl">
                  Welcome back
                </h1>
                <p className="mt-5 text-lg leading-8 text-zinc-300">
                  Join thousands of athletes who train smarter, track harder,
                  and push further every single day.
                </p>
              </div>

              <div className="mt-10 space-y-4">
                {highlights.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-[#D7FF32]/18 bg-[#D7FF32]/8 px-5 py-4 text-base font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
                  >
                    {item}
                  </div>
                ))}
              </div>

              <p className="mt-auto pt-10 text-sm text-zinc-400">
                © 2026 FlexPulse. All rights reserved.
              </p>
            </div>
          </div>

          <div className="bg-[#151E2E] p-8 md:p-10 lg:p-12">
            <div className="max-w-xl">
              <h2 className="text-4xl font-black tracking-tight text-white">
                Welcome back
              </h2>
              <p className="mt-3 text-lg text-zinc-400">
                Don&apos;t have an account?{" "}
                <Link
                  href="/signup"
                  className="font-bold text-[#D7FF32] transition hover:text-white"
                >
                  Sign up free
                </Link>
              </p>

              <div className="mt-10">
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#7E8AA3]">
                  Quick Demo Login
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {demoRoles.map((role) => (
                    <button
                      key={role}
                      type="button"
                      className="rounded-xl border border-[#30475E]/40 bg-[#101723] px-4 py-2 text-sm font-semibold text-[#AAB2C5] transition hover:border-[#D7FF32]/40 hover:text-[#D7FF32]"
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>

              <Form
                className="mt-9 flex w-full flex-col gap-6"
                onSubmit={onSubmit}
              >
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
                  <Label className="mb-2 block text-sm font-bold text-white">
                    Email address
                  </Label>
                  <div className="relative">
                    <FiMail className="pointer-events-none absolute left-4 top-1/2 z-10 h-5 w-5 -translate-y-1/2 text-[#7E8AA3]" />
                    <Input
                      placeholder="you@example.com"
                      className="w-full rounded-2xl border border-[#30475E]/45 bg-[#0E1420] px-4 py-3 pl-11 text-sm text-white dark:border-[#30475E]/45 dark:bg-[#0E1420]"
                    />
                  </div>
                  <FieldError className="mt-1 text-xs text-red-500" />
                </TextField>

                <TextField
                  isRequired
                  name="password"
                  type="password"
                  className="w-full"
                >
                  <Label className="mb-2 block text-sm font-bold text-white">
                    Password
                  </Label>
                  <div className="relative">
                    <FiLock className="pointer-events-none absolute left-4 top-1/2 z-10 h-5 w-5 -translate-y-1/2 text-[#7E8AA3]" />
                    <Input
                      placeholder="••••••••"
                      className="w-full rounded-2xl border border-[#30475E]/45 bg-[#0E1420] px-4 py-3 pl-11 text-sm text-white dark:border-[#30475E]/45 dark:bg-[#0E1420]"
                    />
                  </div>
                  <FieldError className="mt-1 text-xs text-red-500" />
                </TextField>

                <Link
                  href="/forget-password"
                  className="-mt-1 self-end text-sm font-semibold text-[#D7FF32] transition hover:text-white"
                >
                  Forgot password?
                </Link>

                <button
                  type="submit"
                  disabled={isSubmitting || isGoogleLoading}
                  className="inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-[#D7FF32] px-5 py-4 text-lg font-black text-[#151E2E] transition hover:bg-[#e5ff6d] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <ButtonLoader text="Signing in..." />
                  ) : (
                    <>
                      <span>Sign In</span>
                      <FiArrowRight className="h-5 w-5" />
                    </>
                  )}
                </button>

                <div className="flex items-center gap-4 pt-1">
                  <div className="h-px flex-1 bg-[#30475E]/50" />
                  <span className="text-sm font-bold text-[#7E8AA3]">OR</span>
                  <div className="h-px flex-1 bg-[#30475E]/50" />
                </div>

                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={isGoogleLoading || isSubmitting}
                  className="inline-flex w-full items-center justify-center gap-3 rounded-2xl border border-[#30475E]/45 bg-[#0E1420] px-5 py-4 text-base font-bold text-white transition hover:border-[#D7FF32]/35 hover:text-[#D7FF32] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isGoogleLoading ? (
                    <ButtonLoader text="Connecting..." />
                  ) : (
                    <>
                      <FcGoogle className="h-6 w-6" />
                      <span>Continue with Google</span>
                    </>
                  )}
                </button>
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
