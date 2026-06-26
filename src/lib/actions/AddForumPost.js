import { serverMutation } from "../core/serverActions";


export const addForumPost = (data) => {
  return serverMutation("/api/forumPost", data);
};
