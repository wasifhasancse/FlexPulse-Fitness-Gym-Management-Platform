"use server";

import { serverMutation } from "../core/serverActions";


export const addSubscription = async (subscriptionInfo) => {
  return serverMutation("/api/subscription", subscriptionInfo);
};
