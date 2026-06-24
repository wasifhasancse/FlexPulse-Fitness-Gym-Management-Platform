import { serverFetch } from "../core/serverActions";

export const getMyBookingsClasses = (userId) => {
  return serverFetch(`/api/getbookings?userId=${userId}`);
};
