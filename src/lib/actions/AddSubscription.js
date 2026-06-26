"use server";

import { serverMutation } from "../core/serverActions";


export const CreateSubscriptions = async (subscriptionInfo) => {
  return serverMutation("/api/subscription", subscriptionInfo);
};
