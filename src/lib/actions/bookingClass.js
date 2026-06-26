"use server";

import { serverMutation } from "../core/serverActions";


export const bookingClass = async (data) => {
  return serverMutation("/api/bookClass", data);
};
