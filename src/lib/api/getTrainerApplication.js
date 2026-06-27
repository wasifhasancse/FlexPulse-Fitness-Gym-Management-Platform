import { serverFetch, serverMutation } from "../core/serverActions";

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export const getTrainerApplication = async (userId) => {
  return serverFetch(`/api/trainer-application?userId=${userId}`);
};

export const getAllTrainerApplication = async (token) => {
  return serverFetch(`/api/admin/trainer-applications`, token);
};

export const approveTrainerApplication = async (id, feedback, token) => {
  return serverMutation(
    `/api/admin/trainer-applications/approve/${id}`,
    { feedback },
    token,
    "PATCH"
  );
};

export const rejectTrainerApplication = async (id, feedback, token) => {
  return serverMutation(
    `/api/admin/trainer-applications/reject/${id}`,
    { feedback },
    token,
    "PATCH"
  );
};

export const cancelTrainerApplication = async (id, token) => {
  const res = await fetch(`${baseUrl}/api/admin/trainer-applications/${id}`, {
    method: "DELETE",
    headers: {
      ...(token && { authorization: `Bearer ${token}` }),
    },
  });
  return res.json();
};

export const getAllTrainer = async (token) => {
  return serverFetch(`/api/admin/trainers`, token);
};
