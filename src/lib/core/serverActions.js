const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export const serverFetch = async (path, token = null) => {
  const res = await fetch(`${baseUrl}${path}`, {
    headers: {
      ...(token && { authorization: `Bearer ${token}` }),
    },
  });
  const data = await res.json();
  return data;
};

export const serverMutation = async (path, data, token = null, method = "POST") => {
  const res = await fetch(`${baseUrl}${path}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      ...(token && { authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify(data),
  });
  const response = await res.json();
  return response;
};


export const serverMutationById = async (path, id, token = null, method = "GET") => {
  const res = await fetch(`${baseUrl}${path}/${id}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      ...(token && { authorization: `Bearer ${token}` }),
    },

  });
  const response = await res.json();
  return response;
};
