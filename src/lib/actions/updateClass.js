"use server";

import { revalidatePath } from "next/cache";
import { serverMutation } from "../core/server";

export const updateClass = async (id, data) => {
  const result = serverMutation(`/api/all-classes/${id}`, data, "PATCH");
  revalidatePath("");
  return result;
};
