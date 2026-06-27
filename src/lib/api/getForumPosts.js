import { serverFetch, serverMutation } from "../core/serverActions";

export const getForumPosts = async ({
  search = "",
  page = 1,
  limit = 6,
  includeAll = false,
  userId = "",
} = {}) => {
  const params = new URLSearchParams();
  if (search) params.set("search", search);
  if (page > 0) params.set("page", String(page));
  if (limit) params.set("limit", String(limit));
  if (includeAll) params.set("includeAll", "true");
  if (userId) params.set("userId", userId);

  const queryString = params.toString();
  return serverFetch(`/api/forumPost${queryString ? `?${queryString}` : ""}`);
};

export const getForumsPostById = async (id) => {
  return serverFetch(`/api/forumPost/${id}`);
};

export const getMyForumPost = async (userId) => {
  return serverFetch(`/api/my-forumPost?userId=${userId}`);
};

export const deleteForumPost = async (id, token) => {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  const res = await fetch(`${baseUrl}/api/my-post/${id}`, {
    method: "DELETE",
    headers: {
      ...(token && { authorization: `Bearer ${token}` }),
    },
  });
  return res.json();
};

export const updateForumPostStatus = async (id, status, token) => {
  return serverMutation(
    `/api/admin/forum-posts/${id}`,
    { status },
    token,
    "PATCH",
  );
};
