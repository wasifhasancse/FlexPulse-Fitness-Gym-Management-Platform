"use server";

import { serverMutation } from "../core/serverActions";


export const AddSubscription = async (subscriptionInfo) => {
  return serverMutation("/api/subscription", subscriptionInfo);
};
