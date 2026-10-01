export const getPublicTestimonials = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/testimonials`, {
      cache: "no-store",
    });
    if (!res.ok) return { items: [] };
    const data = await res.json();
    return data?.items || [];
  } catch (error) {
    console.error("Error fetching public testimonials:", error);
    return [];
  }
};

export const getAllTestimonialsAdminOrTrainer = async (token, { status, search } = {}) => {
  try {
    const params = new URLSearchParams();
    if (status && status !== "all") params.append("status", status);
    if (search) params.append("search", search);

    const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/testimonials/manage${
      params.toString() ? `?${params.toString()}` : ""
    }`;

    const res = await fetch(url, {
      headers: {
        authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });
    const data = await res.json();
    return data?.items || [];
  } catch (error) {
    console.error("Error fetching moderation testimonials:", error);
    return [];
  }
};

export const getMyTestimonials = async (token) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/my-testimonials`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });
    const data = await res.json();
    return data?.items || [];
  } catch (error) {
    console.error("Error fetching my testimonials:", error);
    return [];
  }
};

export const createTestimonial = async (payload, token) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/testimonials`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  return res.json();
};

export const updateTestimonial = async (id, payload, token) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/testimonials/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  return res.json();
};

export const updateTestimonialStatus = async (id, status, token) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/testimonials/${id}/status`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    }
  );
  return res.json();
};

export const deleteTestimonial = async (id, token) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/testimonials/${id}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  return res.json();
};
