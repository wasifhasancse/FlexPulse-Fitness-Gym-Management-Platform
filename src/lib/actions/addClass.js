"use server";

import { serverMutation } from "../core/serverActions";

export const createClasses = async (data) => {
  return serverMutation("/api/add-class", data);
};

export const trainerApplication = async (data) => {
  return serverMutation("/api/trainer-application", data);
};
