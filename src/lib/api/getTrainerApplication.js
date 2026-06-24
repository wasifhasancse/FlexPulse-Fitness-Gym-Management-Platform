import { serverFetch } from "../core/serverActions";

export const getTrainerApplication = async (userId) => {
  return serverFetch(`/api/trainerApplication?userId=${userId}`);
};
