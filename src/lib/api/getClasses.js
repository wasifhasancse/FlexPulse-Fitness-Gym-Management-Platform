import { serverFetch } from "../core/serverActions";

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export const getAllClasses = async (
  search = "",
  category = "",
  page = 1,
  limit = 6,
) => {
  const params = new URLSearchParams();

  if (search) params.set("search", search);
  if (category && category !== "All Categories")
    params.set("category", category);
  if (page > 1) params.set("page", String(page));
  if (limit) params.set("limit", String(limit));

  const requestUrl = `${baseUrl}/api/all-class?${params.toString()}`;
  const res = await fetch(requestUrl);
  if (!res.ok) {
    throw new Error(`Failed to fetch classes: ${res.status}`);
  }
  return res.json();
};

export const getClassesById = async (id, token) => {
  const res = await fetch(`${baseUrl}/api/all-classes/${id}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  return data;
};

export const getFeaturedClass = async () => {
  return serverFetch(`/api/featured-classes`);
};

export const getMyClasses = async (trainerId, token) => {
  return serverFetch(`/api/getmyclasses?trainerId=${trainerId}`, token);
};
export const getMyBookedClasses = async (trainerId, token) => {
  return serverFetch(`/api/trainer/classes/bookings/${trainerId}`, token);
};
export const getClassStudents = async (classId, token) => {
  return serverFetch(`/api/trainer/classes/${classId}/students`, token);
};
export const getTrainerTotalBookings = async (trainerId) => {
  return serverFetch(`/trainer/total-bookings/${trainerId}`);
};
export const getTotalBookings = async () => {
  return serverFetch(`/admin/total-bookings`);
};

export const getAdminAllClasses = async () => {
  return serverFetch(`/admin/all-classesByAdmin`);
};

export const approveClassByAdmin = (classId, token) => {
  return serverMutation(
    `/api/admin/classes/${classId}`,
    { status: "approved" },
    token,
    "PATCH",
  );
};

export const rejectClassByAdmin = (classId, token) => {
  return serverMutation(
    `/api/admin/classes/${classId}`,
    { status: "rejected" },
    token,
    "PATCH",
  );
};

export const deleteClassByAdmin = (classId, token) => {
  return serverMutation(`/api/admin/classes/${classId}`, {}, token, "DELETE");
};
