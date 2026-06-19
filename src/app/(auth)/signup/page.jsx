"use client";
import ButtonLoader from "@/components/Loader/ButtonLoader";
import { authClient } from "@/lib/auth-client";
import {
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
  toast,
} from "@heroui/react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Link from "next/link";
import { redirect, useSearchParams } from "next/navigation";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FiUserPlus } from "react-icons/fi";
import { RiLightbulbFlashFill } from "react-icons/ri";

export default function SignUp() {
   const searchParams = useSearchParams();
    const redirectTo = searchParams.get("redirect") || "/";
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const formData = new FormData(e.target);
      const name = formData.get("name");
      const image = formData.get("image");
      const email = formData.get("email");
      const password = formData.get("password");

      const { data, error } = await authClient.signUp.email({
        name,
        email,
        password,
        image,
        autoSignIn: false,
      });

      if (data) {
        toast.success(
          "Account created successfully! Please Sign In with your Email and Password.",
        );
        await authClient.signOut();
        redirect("/signin");
      }
      if (error) {
        toast.danger("Failed to create account. " + error.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    const { data, error } = await authClient.signIn.social({ provider: "google", callbackURL: redirectTo });
    if (data) {
        toast.success(
          "Signing in with Google successful!",
        );
      }
      if (error) {
        toast.danger("Failed to create account. " + error.message);
      }
  };

  return (
    <section className="mx-auto w-full max-w-10/12 py-8 md:py-12 lg:py-14">
      <div className="relative overflow-hidden rounded-3xl border border-[#5e41de]/20 bg-white/90 shadow-2xl shadow-[#5e41de]/15 dark:border-[#5e41de]/25 dark:bg-zinc-950/90 dark:shadow-[#5e41de]/20">
        <div className="absolute inset-0 -z-10 bg-linear-to-br from-white via-[#5e41de]/5 to-[#a78bfa]/10 dark:from-zinc-950 dark:via-[#5e41de]/10 dark:to-[#a78bfa]/5" />
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#5e41de]/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[#a78bfa]/10 blur-3xl" />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.15fr]">
          {/* Left Panel */}
          <div className="relative border-b border-[#5e41de]/15 p-6 md:p-8 lg:border-b-0 lg:border-r lg:border-[#5e41de]/15 lg:p-10">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#5e41de]/25 bg-[#5e41de]/10 px-4 py-1.5 text-xs font-semibold text-[#5e41de] dark:border-[#5e41de]/30 dark:text-[#a78bfa]">
              <RiLightbulbFlashFill className="animate-pulse" /> IdeaVault
            </span>

            <h1 className="mt-4 text-3xl font-extrabold leading-tight text-zinc-900 dark:text-zinc-50 md:text-4xl lg:text-5xl">
              Join the{" "}
              <span className="text-[#5e41de] dark:text-[#a78bfa]">
                Innovation Hub
              </span>
            </h1>

            <p className="mt-3 max-w-sm text-sm leading-relaxed text-zinc-500 dark:text-zinc-400 md:text-base">
              Create your account and start sharing, discovering, and validating
              startup ideas with a global community of innovators.
            </p>

            <div className="my-6 flex justify-center lg:my-8">
              <DotLottieReact
                src="https://lottie.host/cc3811b0-927e-4f53-9caf-05404b593f95/STwiLpOPG4.lottie"
                loop
                autoplay
                style={{ width: "210px", height: "210px" }}
              />
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-[#5e41de]/20 bg-[#5e41de]/5 px-4 py-3 shadow-sm shadow-[#5e41de]/10 dark:bg-[#5e41de]/10">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#5e41de] dark:text-[#a78bfa]">
                  🚀 Share Ideas
                </p>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                  Pitch your startup concepts to the world
                </p>
              </div>
              <div className="rounded-2xl border border-[#5e41de]/20 bg-[#5e41de]/5 px-4 py-3 shadow-sm shadow-[#5e41de]/10 dark:bg-[#5e41de]/10">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#5e41de] dark:text-[#a78bfa]">
                  🌍 Global Reach
                </p>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                  Connect with founders and innovators worldwide
                </p>
              </div>
              <div className="rounded-2xl border border-[#5e41de]/20 bg-[#5e41de]/5 px-4 py-3 shadow-sm shadow-[#5e41de]/10 dark:bg-[#5e41de]/10 sm:col-span-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#5e41de] dark:text-[#a78bfa]">
                  🎯 Get Validated
                </p>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                  Receive votes, comments, and real feedback from the community
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
                  Create Account
                </h2>
                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                  Fill in your details to get started
                </p>
              </div>
            </div>

            <div className="signin-form w-full">
              <Form className="flex w-full flex-col gap-4" onSubmit={onSubmit}>
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
                  name="name"
                  type="text"
                  className="w-full"
                >
                  <Label className="mb-1.5 block text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                    Full Name
                  </Label>
                  <Input
                    placeholder="Enter your full name"
                    className="w-full rounded-xl border border-[#5e41de]/20 bg-[#5e41de]/5 px-4 py-2.5 text-sm dark:border-[#5e41de]/25 dark:bg-[#5e41de]/10"
                  />
                  <FieldError className="mt-1 text-xs text-red-500" />
                </TextField>

                <TextField
                  isRequired
                  name="image"
                  type="text"
                  className="w-full"
                >
                  <Label className="mb-1.5 block text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                    Profile Image URL
                  </Label>
                  <Input
                    placeholder="https://example.com/avatar.jpg"
                    className="w-full rounded-xl border border-[#5e41de]/20 bg-[#5e41de]/5 px-4 py-2.5 text-sm dark:border-[#5e41de]/25 dark:bg-[#5e41de]/10"
                  />
                  <FieldError className="mt-1 text-xs text-red-500" />
                </TextField>

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
                  minLength={6}
                  name="password"
                  type="password"
                  className="w-full"
                  validate={(value) => {
                    if (value.length < 6)
                      return "Password must be at least 6 characters";
                    if (!/[A-Z]/.test(value))
                      return "Must contain at least one uppercase letter";
                    if (!/[a-z]/.test(value))
                      return "Must contain at least one lowercase letter";
                    if (!/[0-9]/.test(value))
                      return "Must contain at least one number";
                    return null;
                  }}
                >
                  <Label className="mb-1.5 block text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                    Password
                  </Label>
                  <Input
                    placeholder="Create a secure password"
                    className="w-full rounded-xl border border-[#5e41de]/20 bg-[#5e41de]/5 px-4 py-2.5 text-sm dark:border-[#5e41de]/25 dark:bg-[#5e41de]/10"
                  />
                  <Description className="mt-1 text-xs text-zinc-400 dark:text-zinc-500">
                    Min. 6 characters with 1 uppercase, 1 lowercase and 1 number
                  </Description>
                  <FieldError className="mt-1 text-xs text-red-500" />
                </TextField>

                <div className="mt-1">
                  <button
                    type="submit"
                    disabled={isSubmitting || isGoogleLoading}
                    className="submit-btn"
                  >
                    {isSubmitting ? (
                      <ButtonLoader text="Creating account..." />
                    ) : (
                      <>
                        <FiUserPlus className="submit-icon" />
                        <span className="submit-label">Join IdeaVault</span>
                      </>
                    )}
                  </button>
                </div>

                <p className="text-center text-sm text-zinc-500 dark:text-zinc-400">
                  Already an innovator?{" "}
                  <Link
                    href="/signin"
                    className="font-bold text-[#5e41de] underline decoration-[#5e41de]/30 underline-offset-4 transition hover:text-[#4930b8] dark:text-[#a78bfa]"
                  >
                    Sign In
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
