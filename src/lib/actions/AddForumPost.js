import { serverMutation } from "../core/server";

export const addForumPost = (data) => {
  return serverMutation("/api/forumPost", data);
};
