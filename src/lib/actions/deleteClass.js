"use server";

import { serverMutationById } from "../core/serverActions";


export const deleteClassById = async (id) => {
  return serverMutationById("/api/my-class", id, "DELETE");
}

export const deletePostById = async (id) => {
  return serverMutationById("/api/my-post", id, "DELETE");
};
