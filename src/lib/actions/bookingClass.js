"use server";

import { serverMutation } from "../core/server";

export const bookingClass = async (data) => {
  return serverMutation("/api/bookClass", data);
};
