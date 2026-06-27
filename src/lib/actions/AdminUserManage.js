"use server";
import { headers } from "next/headers";
import { auth } from "../auth";
import { revalidatePath } from "next/cache";

export const updateUserRole = async (userId, role = "admin") => {
  console.log(role);
  // const data = await auth.api.setRole({
  //   body: {
  //     userId: userId,
  //     role: role,
  //   },
  //   headers: await headers(),
  // });
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/admin/users/${userId}/role`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userRole: role }),
    },
  );
  const data = await res.json();
  revalidatePath("/dashboard/admin/manageUsers");
  return data;
};

// export const updateUserRole = async (userId, role = "admin") => {
//   try {
//     // Use auth.admin instead of auth.api if your library supports it
//     const data = await auth.admin.setRole({
//       body: {
//         userId: userId,
//         role: role,
//       },
//       // Some libraries don't need user headers when run from the admin scope
//       headers: await headers(),
//     });

//     revalidatePath("/dashboard/admin/manageUsers");
//     return data;
//   } catch (error) {
//     console.error("Failed to update user role:", error);
//     throw new Error(error.body?.message || "Authorization failed.");
//   }
// };


export const blockUser = async (userId) => {
  const data = await auth.api.banUser({
    body: {
      userId,
    },
    headers: await headers(),
  });
  revalidatePath("/dashboard/admin/manageUsers");
  return data;
};

export const unblockUser = async (userId) => {
  const data = await auth.api.unbanUser({
    body: {
      userId,
    },
    headers: await headers(),
  });
  revalidatePath("/dashboard/admin/manageUsers");
  return data;
};
