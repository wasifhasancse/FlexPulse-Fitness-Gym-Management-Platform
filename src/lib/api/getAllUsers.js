import { serverFetch, serverMutation } from "../core/serverActions";

export const getAllUsers = () => {
  return serverFetch("/api/all-users");
};

export const setUserRole = (userId, role, token) => {
  return serverMutation(`/api/users/${userId}/role`, { role }, token, "PATCH");
};
