"use client";

import { addForumPost } from "@/lib/actions/addForumPost";
import { authClient } from "@/lib/auth-client";
import { imageUpload } from "@/lib/imageUpload";
import { toast } from "@heroui/react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaArrowLeft, FaImage, FaPencilAlt, FaTimes } from "react-icons/fa";

export default function CreateForumPostPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  const isFormValid = title.trim() !== "" && description.trim() !== "";

  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleRemoveImage = () => {
    setImage(null);
    const fileInput = document.getElementById("imageInput");
    if (fileInput) fileInput.value = "";
  };

  const resetForm = () => {
    (setTitle(""), setDescription(""), setImage(null));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    const formData = {
      title,
      description,
      image,
      userName: user?.name,
      userImage: user?.image,
      userRole: user?.role,
      userId: user?.id,
    };
    try {
      const result = await addForumPost(formData);
      if (result.insertedId) {
        toast.success("Class added successfully!");
        resetForm();
        router.push("/dashboard/trainer/my-posts");
      }
    } catch (error) {
      console.error(error);
      toast.error("Faild to add class");
    }
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl bg-white dark:bg-brand-800/20 rounded-2xl shadow-card border border-brand-500/15 dark:border-brand-500/30 p-6 md:p-8"
      >
        {/* Back button */}
        <div className="mb-6">
          <Link
            href="/forum"
            className="inline-flex items-center gap-2 text-[#535C91] dark:text-[#9290C3] hover:text-active transition-colors font-['Inter'] text-sm"
          >
            <FaArrowLeft className="w-4 h-4" />
            Back to Forum
          </Link>
        </div>

        {/* Header */}
        <div className="mb-6">
          <h1 className="font-['Outfit'] text-3xl font-bold text-foreground">
            Create New Post
          </h1>
          <p className="font-['Inter'] text-[#535C91] dark:text-[#9290C3] mt-1">
            Share your fitness insights, tips, or success story with the
            community.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Post Title */}
          <div>
            <label
              htmlFor="title"
              className="font-['Inter'] text-sm font-semibold text-foreground block mb-1"
            >
              Post Title <span className="text-rose-500">*</span>
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter a compelling title..."
              className="w-full px-4 py-2.5 bg-[#535C91]/5 dark:bg-[#1b1a55]/40 border border-brand-500/20 dark:border-brand-500/30 rounded-lg text-foreground placeholder-[#535C91]/50 dark:placeholder-[#9290C3]/50 focus:outline-none focus:border-active focus:ring-2 focus:ring-active/20 transition-all font-['Inter'] text-sm"
              required
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="font-['Inter'] text-sm font-semibold text-foreground block mb-1">
              Post Image{" "}
              <span className="text-[#535C91] dark:text-[#9290C3] text-xs font-normal">
                (optional)
              </span>
            </label>
            {uploading ? (
              <div className="w-full h-48 flex items-center justify-center border border-brand-500/20 rounded-lg bg-[#535C91]/5 dark:bg-[#1b1a55]/40">
                <div className="animate-spin rounded-full h-10 w-10 border-4 border-brand-500/25 border-t-active" />
              </div>
            ) : image ? (
              <div className="relative w-full h-56 rounded-lg overflow-hidden border border-brand-500/15 dark:border-brand-500/30 bg-[#535C91]/5 dark:bg-[#1b1a55]/40">
                <Image
                  width={400}
                  height={200}
                  src={image}
                  alt="image preview"
                  unoptimized
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-2 right-2 p-1.5 bg-black/70 text-white rounded-full hover:bg-black/90 transition-colors cursor-pointer"
                >
                  <FaTimes className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="relative">
                <div className="w-full h-56 bg-[#535C91]/5 dark:bg-[#1b1a55]/40 border-2 border-dashed border-brand-500/20 dark:border-brand-500/30 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-active transition-colors">
                  <FaImage className="w-8 h-8 text-[#535C91] dark:text-[#9290C3] mb-2" />
                  <p className="font-['Inter'] text-sm text-[#535C91] dark:text-[#9290C3]">
                    Click to upload an image
                  </p>
                  <p className="font-['Inter'] text-xs text-[#535C91]/70 dark:text-[#9290C3]/70 mt-1">
                    PNG, JPG, GIF up to 5MB
                  </p>
                </div>

                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    try {
                      setUploading(true);
                      const image = await imageUpload(file);
                      setImage(image.url);
                    } catch (error) {
                      console.error(error);
                    } finally {
                      setUploading(false);
                    }
                  }}
                />
              </div>
            )}
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="font-['Inter'] text-sm font-semibold text-foreground block mb-1"
            >
              Description <span className="text-rose-500">*</span>
            </label>
            <textarea
              id="description"
              rows="6"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write your post content here..."
              className="w-full px-4 py-2.5 bg-[#535C91]/5 dark:bg-[#1b1a55]/40 border border-brand-500/20 dark:border-brand-500/30 rounded-lg text-foreground placeholder-[#535C91]/50 dark:placeholder-[#9290C3]/50 focus:outline-none focus:border-active focus:ring-2 focus:ring-active/20 transition-all font-['Inter'] text-sm resize-none"
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="submit"
              disabled={!isFormValid}
              className={`flex-1 py-2.5 font-['Inter'] font-semibold rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
                isFormValid
                  ? "bg-btn-bg text-btn-text hover:opacity-90"
                  : "bg-[#535C91]/10 dark:bg-[#1b1a55]/60 text-[#535C91]/50 dark:text-[#9290C3]/50 cursor-not-allowed"
              }`}
            >
              <FaPencilAlt className="w-4 h-4" />
              Publish Post
            </button>
            <Link
              href="/forum"
              className="flex-1 py-2.5 border-2 border-brand-500/20 text-[#535C91] dark:text-[#9290C3] font-['Inter'] font-semibold rounded-lg hover:border-active hover:text-active transition-colors text-center"
            >
              Cancel
            </Link>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
