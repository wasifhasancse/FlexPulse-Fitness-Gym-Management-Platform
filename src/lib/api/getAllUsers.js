import { serverFetch } from "../core/serverActions";

export const getAllUsers = () => {
  return serverFetch("/api/all-users");
};
