"use server";
import { headers } from "next/headers";
import { auth } from "../auth";
import { revalidatePath } from "next/cache";

export const updateUserRole = async (userId, role = "admin") => {
  const data = await auth.api.setRole({
    body: {
      userId: userId,
      role: role,
    },
    headers: await headers(),
  });
  revalidatePath("/dashboard/admin/manageUsers");
  return data;
};
