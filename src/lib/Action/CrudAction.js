"use server";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { auth } from "../auth";

export const GetIdeasAction = async (searchQuery, categoryQuery) => {
  const getData = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/ideas?search=${searchQuery || ""}&category=${categoryQuery || ""}`,
  );
  const data = await getData.json();
  return data;
};
export const GetTrendingIdeasAction = async () => {
  const getData = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/trending-ideas`,
  );
  const data = await getData.json();
  return data;
};

export const GetIdeasById = async (id) => {
  const { token } = await auth.api.getToken({ headers: await headers() });
  const getData = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/ideas/${id}`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  );
  const data = await getData.json();
  return data;
};

export const AddIdeasPostAction = async (prevState, formData) => {
  // ── Server-side validation ──
  const title = formData.get("title")?.trim();
  const shortDescription = formData.get("shortDescription")?.trim();
  const category = formData.get("category");
  const tags = formData.getAll("tags");
  const imageUrl = formData.get("imageUrl")?.trim();
  const estimatedBudget = formData.get("estimatedBudget")?.trim();
  const targetAudience = formData.getAll("targetAudience");
  const detailedDescription = formData.get("detailedDescription")?.trim();
  const problemStatement = formData.get("problemStatement")?.trim();
  const proposedSolution = formData.get("proposedSolution")?.trim();

  const errors = {};
  if (!title) errors.title = "Idea title is required.";
  if (!shortDescription)
    errors.shortDescription = "Short description is required.";
  if (!category) errors.category = "Please select a category.";
  if (tags.length === 0) errors.tags = "Please select at least one tag.";
  if (!imageUrl) errors.imageUrl = "Image URL is required.";
  if (!estimatedBudget)
    errors.estimatedBudget = "Estimated budget is required.";
  if (targetAudience.length === 0)
    errors.targetAudience = "Please select at least one target audience.";
  if (!detailedDescription)
    errors.detailedDescription = "Detailed description is required.";
  if (!problemStatement)
    errors.problemStatement = "Problem statement is required.";
  if (!proposedSolution)
    errors.proposedSolution = "Proposed solution is required.";

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  const { token } = await auth.api.getToken({ headers: await headers() });
  const session = await auth.api.getSession({ headers: await headers() });
  const ideasData = Object.fromEntries(formData.entries());
  ideasData.tags = tags;
  ideasData.targetAudience = targetAudience;
  ideasData.createTime = new Date().toLocaleString("us-EN", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  ideasData.userInfo = session.user;
  ideasData.likes = 0;
  ideasData.comments = [];

  const postData = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/ideas`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(ideasData),
  });
  const data = await postData.json();
  if (data.insertedId) {
    return { success: true, message: "Idea submitted successfully!" };
  } else {
    return { success: false, message: "Failed to submit Idea!" };
  }
};

export const UpdateIdeasAction = async (formData, ideasId) => {
  const { token } = await auth.api.getToken({ headers: await headers() });
  const session = await auth.api.getSession({ headers: await headers() });
  const ideasData = Object.fromEntries(formData.entries());
  ideasData.tags = formData.getAll("tags");
  ideasData.targetAudience = formData.getAll("targetAudience");
  ideasData.createTime = new Date().toLocaleString("us-EN", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  ideasData.userInfo = session.user;

  const updateData = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/ideas/${ideasId}`,
    {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(ideasData),
    },
  );
  const data = await updateData.json();
  if (data.modifiedCount > 0) {
    return { success: true, message: "Idea updated successfully!" };
  } else {
    return { success: false, message: "Failed to update Idea!" };
  }
};

// Comments action:
// export const CommentIdeasAction = async (formData, ideasId) => {
//   const { token } = await auth.api.getToken({ headers: await headers() });
//   const session = await auth.api.getSession({ headers: await headers() });

//   const { comment } = Object.fromEntries(formData.entries());

//   const commentData = {
//     comment,
//     userInfo: session.user,
//     commentedAt: new Date().toLocaleString("us-EN", {
//       month: "long",
//       day: "numeric",
//       year: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     }),
//   };

//   const existingRes = await fetch(
//     `${process.env.NEXT_PUBLIC_SERVER_URL}/ideas/${ideasId}`,
//     { headers: { authorization: `Bearer ${token}` } },
//   );
//   const ideasData = await existingRes.json();
//   ideasData.comments = [...(ideasData.comments || []), commentData];

//   const updateData = await fetch(
//     `${process.env.NEXT_PUBLIC_SERVER_URL}/ideas/${ideasId}`,
//     {
//       method: "PATCH",
//       headers: {
//         "content-type": "application/json",
//         authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify(ideasData),
//     },
//   );
//   const data = await updateData.json();
// };
export const CommentIdeasAction = async (formData, ideasId) => {
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const { comment } = Object.fromEntries(formData.entries());

  if (!comment?.trim()) return;

  // get existing idea
  const existingRes = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/ideas/${ideasId}`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  );

  const ideasData = await existingRes.json();

  // IMPORTANT FIX
  delete ideasData._id;

  const commentData = {
    comment,
    userInfo: {
      name: session?.user?.name,
      email: session?.user?.email,
      image: session?.user?.image,
    },
    commentedAt: new Date().toLocaleString("us-EN", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }),
  };

  ideasData.comments = [...(ideasData.comments || []), commentData];

  const updateData = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/ideas/${ideasId}`,
    {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(ideasData),
    },
  );

  const data = await updateData.json();
   revalidatePath(`/ideas/${ideasId}`);
  if (data.modifiedCount > 0) {
    return { success: true, message: "Your comment posted successfully!" };
  } else {
    return { success: false, message: "Failed to post comment!" };
  }
};

export const DeleteIdeasAction = async (ideasId) => {
  "use server";
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/ideas/${ideasId}`,
    {
      method: "DELETE",
    },
  );
  const data = await res.json();

  if (data.deletedCount > 0) {
    return { success: true, message: "Idea deleted successfully!" };
  } else {
    return { success: false, message: "Failed to delete Idea!" };
  }
};

export const DeleteCommentAction = async (ideasId, commentIndex) => {
  const { token } = await auth.api.getToken({ headers: await headers() });
  const session = await auth.api.getSession({ headers: await headers() });

  const existingRes = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/ideas/${ideasId}`,
    { headers: { authorization: `Bearer ${token}` } },
  );
  const ideasData = await existingRes.json();
  delete ideasData._id;

  const comment = ideasData.comments?.[commentIndex];
  if (!comment || comment.userInfo?.email !== session?.user?.email) {
    return { success: false, message: "Unauthorized" };
  }

  ideasData.comments = ideasData.comments.filter((_, i) => i !== commentIndex);

  const updateData = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/ideas/${ideasId}`,
    {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(ideasData),
    },
  );
  const data = await updateData.json();
  revalidatePath(`/ideas/${ideasId}`);
  if (data.modifiedCount > 0) {
    return { success: true, message: "Comment deleted successfully!" };
  } else {
    return { success: false, message: "Failed to delete comment!" };
  }
};

export const EditCommentAction = async (ideasId, commentIndex, newText) => {
  const { token } = await auth.api.getToken({ headers: await headers() });
  const session = await auth.api.getSession({ headers: await headers() });

  if (!newText?.trim()) return { success: false, message: "Comment is empty" };

  const existingRes = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/ideas/${ideasId}`,
    { headers: { authorization: `Bearer ${token}` } },
  );
  const ideasData = await existingRes.json();
  delete ideasData._id;

  const comment = ideasData.comments?.[commentIndex];
  if (!comment || comment.userInfo?.email !== session?.user?.email) {
    return { success: false, message: "Unauthorized" };
  }

  ideasData.comments[commentIndex] = {
    ...comment,
    comment: newText.trim(),
    editedAt: new Date().toLocaleString("us-EN", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }),
  };

  const updateData = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/ideas/${ideasId}`,
    {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(ideasData),
    },
  );
  const data = await updateData.json();
  revalidatePath(`/ideas/${ideasId}`);
  if (data.modifiedCount > 0) {
    return { success: true, message: "Comment updated successfully!" };
  } else {
    return { success: false, message: "Failed to update comment!" };
  }
};

export const GetMyIdeas = async (id) => {
  const { token } = await auth.api.getToken({ headers: await headers() });
  const session = await auth.api.getSession({ headers: await headers() });
  const getData = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/my-ideas/${id}`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  );
  const data = await getData.json();
  return data;
};
