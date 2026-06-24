import { serverFetch } from "../core/serverActions";

export const getFavoriteClass = (userId) => {
  return serverFetch(`/api/favorites?userId=${userId}`);
};
