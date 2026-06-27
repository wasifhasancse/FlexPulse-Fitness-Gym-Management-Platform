import { serverMutation } from "../core/serverActions";


export const addForumPost = (data, token) => {
  return serverMutation("/api/forumPost", data, token, "POST");
};
