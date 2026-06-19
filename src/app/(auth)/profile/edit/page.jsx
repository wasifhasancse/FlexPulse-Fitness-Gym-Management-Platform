"use client";
import PrimaryButton from "@/components/Button/PrimaryButton";
import { authClient } from "@/lib/auth-client";
import { toast } from "@heroui/react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiArrowLeft, FiEdit3, FiImage, FiUser } from "react-icons/fi";
import { GrUpdate } from "react-icons/gr";
import { RiLightbulbFlashFill } from "react-icons/ri";
import { RxReset } from "react-icons/rx";

const DotLottieReact = dynamic(
  () => import("@lottiefiles/dotlottie-react").then((m) => m.DotLottieReact),
  { ssr: false },
);

const UpdateProfile = () => {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imgError, setImgError] = useState(false);
  const { data: session, isPending } = authClient.useSession();

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsSaving(true);

    const updateInfo = {};
    if (name) {
      updateInfo.name = name;
    }
    if (imageUrl) {
      updateInfo.image = imageUrl;
    }

    try {
      await authClient.updateUser(updateInfo);
      toast.success("Profile updated successfully");
      router.push("/profile");
    } catch {
      toast.error("Failed to update profile. Please try again.");
      setIsSaving(false);
    }
  };

  const handleImageChange = (e) => {
    setImageUrl(e.target.value);
    setImgError(false);
  };

  return (
    <section className="relative min-h-[calc(100vh-64px)] overflow-hidden bg-linear-to-br from-white via-[#5e41de]/5 to-[#a78bfa]/10 py-10 dark:from-zinc-950 dark:via-[#5e41de]/10 dark:to-[#a78bfa]/5 md:py-14 lg:py-16">
      {/* Background blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-[#5e41de]/10 blur-3xl dark:bg-[#5e41de]/20" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-[#a78bfa]/10 blur-3xl dark:bg-[#a78bfa]/20" />
        <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#5e41de]/5 blur-2xl dark:bg-[#5e41de]/10" />
      </div>

      <div className="relative mx-auto max-w-11/12">
        {/* Top accent line */}
        <div className="mb-8 h-px w-full bg-linear-to-r from-transparent via-[#5e41de]/50 to-transparent" />

        <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
          {/* ── Left: context + animation ── */}
          <div className="flex flex-col gap-6">
            {/* Back link */}
            <Link
              href="/profile"
              className="inline-flex w-fit items-center gap-1.5 text-sm font-medium text-[#5e41de] transition-opacity hover:opacity-70 dark:text-[#a78bfa]"
            >
              <FiArrowLeft size={15} />
              Back to Profile
            </Link>

            {/* Badge + heading */}
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#5e41de]/25 bg-[#5e41de]/10 px-3.5 py-1.5 text-xs font-semibold text-[#5e41de] dark:border-[#5e41de]/30 dark:text-[#a78bfa]">
                <RiLightbulbFlashFill className="animate-pulse" /> Profile
                Settings
              </span>
              {/* Lottie animation */}
              <div className="mx-auto w-full max-w-xs md:max-w-md lg:mx-0 lg:max-w-lg">
                <DotLottieReact
                  src="https://lottie.host/b9a210e5-cb52-4daf-aefb-01df1f9024ab/248RdexoE7.lottie"
                  loop
                  autoplay
                />
              </div>
              <h1 className="mt-4 text-3xl font-extrabold leading-tight text-zinc-800 sm:text-4xl dark:text-zinc-100">
                Update Your{" "}
                <span className="bg-linear-to-r from-[#5e41de] to-[#a78bfa] bg-clip-text text-transparent">
                  Profile
                </span>
              </h1>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                Keep your identity fresh on IdeaVault. A great name and photo
                help the community connect with the innovator behind every idea.
              </p>
            </div>

            {/* Tips card */}
            <div className="rounded-2xl border border-[#5e41de]/15 bg-[#5e41de]/5 p-4 dark:border-[#5e41de]/25 dark:bg-[#5e41de]/10">
              <p className="mb-2.5 text-[10px] font-bold uppercase tracking-widest text-[#5e41de] dark:text-[#a78bfa]">
                Tips
              </p>
              <ul className="space-y-2 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 shrink-0 text-[#5e41de] dark:text-[#a78bfa]">
                    •
                  </span>
                  Use your real name so collaborators can recognise you
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 shrink-0 text-[#5e41de] dark:text-[#a78bfa]">
                    •
                  </span>
                  Profile image must be a publicly accessible URL (jpg, png,
                  webp)
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 shrink-0 text-[#5e41de] dark:text-[#a78bfa]">
                    •
                  </span>
                  Changes apply instantly across all your ideas and comments
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 shrink-0 text-[#5e41de] dark:text-[#a78bfa]">
                    •
                  </span>
                  Leave a field blank to keep the current value unchanged
                </li>
              </ul>
            </div>
          </div>

          {/* ── Right: Form card ── */}
          <div className="rounded-3xl border border-white/70 bg-white/70 p-6 shadow-xl shadow-[#5e41de]/8 backdrop-blur-sm dark:border-white/5 dark:bg-zinc-900/60 sm:p-8">
            {/* Card header */}
            <div className="mb-6 flex items-center gap-3 border-b border-[#5e41de]/10 pb-5 dark:border-[#5e41de]/15">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#5e41de]/10 dark:bg-[#5e41de]/20">
                <FiEdit3
                  size={18}
                  className="text-[#5e41de] dark:text-[#a78bfa]"
                />
              </span>
              <div>
                <h2 className="font-bold text-zinc-800 dark:text-zinc-100">
                  Edit Details
                </h2>
                <p className="text-xs text-zinc-400 dark:text-zinc-500">
                  Fields left blank will not be changed
                </p>
              </div>
            </div>

            {/* Live avatar preview */}
            {imageUrl && !imgError && (
              <div className="mb-5 flex items-center gap-3 rounded-2xl border border-[#5e41de]/15 bg-[#5e41de]/5 p-3 dark:border-[#5e41de]/20 dark:bg-[#5e41de]/10">
                <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full ring-2 ring-[#5e41de]/30">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imageUrl}
                    alt="Avatar preview"
                    className="h-full w-full object-cover"
                    onError={() => setImgError(true)}
                  />
                </div>
                <div>
                  <p className="text-xs font-semibold text-zinc-600 dark:text-zinc-300">
                    Avatar Preview
                  </p>
                  <p className="text-[11px] text-zinc-400 dark:text-zinc-500">
                    This is how your photo will appear
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={onSubmit} className="flex flex-col gap-5">
              {/* Full Name */}
              <div className="flex flex-col gap-1.5">
                <label className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                  <FiUser
                    size={11}
                    className="text-[#5e41de] dark:text-[#a78bfa]"
                  />
                  Full Name
                </label>
                <input
                  name="name"
                  type="text"
                  defaultValue={session?.user?.name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Wasif Hasan"
                  className="w-full rounded-xl border border-[#5e41de]/20 bg-white/80 px-4 py-3 text-sm text-zinc-700 placeholder-zinc-400 outline-none transition-all duration-200 focus:border-[#5e41de]/50 focus:ring-2 focus:ring-[#5e41de]/15 dark:border-[#5e41de]/25 dark:bg-zinc-800/60 dark:text-zinc-200 dark:placeholder-zinc-500 dark:focus:border-[#5e41de]/50"
                />
              </div>

              {/* Profile Image URL */}
              <div className="flex flex-col gap-1.5">
                <label className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                  <FiImage
                    size={11}
                    className="text-[#5e41de] dark:text-[#a78bfa]"
                  />
                  Profile Image URL
                </label>
                <input
                  name="image"
                  type="url"
                  defaultValue={session?.user?.image}
                  onChange={handleImageChange}
                  placeholder="https://example.com/your-photo.jpg"
                  className="w-full rounded-xl border border-[#5e41de]/20 bg-white/80 px-4 py-3 text-sm text-zinc-700 placeholder-zinc-400 outline-none transition-all duration-200 focus:border-[#5e41de]/50 focus:ring-2 focus:ring-[#5e41de]/15 dark:border-[#5e41de]/25 dark:bg-zinc-800/60 dark:text-zinc-200 dark:placeholder-zinc-500 dark:focus:border-[#5e41de]/50"
                />
                <p className="text-[11px] text-zinc-400 dark:text-zinc-500">
                  Paste a direct link to a publicly hosted image
                </p>
              </div>

              {/* Divider */}
              <div className="h-px w-full bg-[#5e41de]/8 dark:bg-[#5e41de]/15" />

              {/* Buttons */}
              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <span
                  onClick={() => {
                    setName("");
                    setImageUrl("");
                    setImgError(false);
                  }}
                >
                  <PrimaryButton
                    type="reset"
                    label="Reset"
                    savingText="Resetting..."
                    icon={RxReset}
                  />
                </span>
                <PrimaryButton
                  type="submit"
                  isSaving={isSaving}
                  label="Save Changes"
                  savingText="Saving..."
                  icon={GrUpdate}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpdateProfile;
