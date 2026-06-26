import { serverFetch } from "../core/serverActions";

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export const getAllClasses = async (search = "", category = "") => {
  const params = new URLSearchParams();
  if (search) params.set("search", search);
  if (category && category !== "All Categories") {
    params.set("category", category);
  }
  const res = await fetch(`${baseUrl}/api/all-class?${params.toString()}`);
  return await res.json();
};

export const getClassById = async (id) => {
  return serverFetch(`/api/all-classes/${id}`);
};

export const getMyClasses = async (trainerId) => {
  return serverFetch(`/api/getmyclasses?trainerId=${trainerId}`);
};
