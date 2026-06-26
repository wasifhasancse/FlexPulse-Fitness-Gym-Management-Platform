const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export const serverFetch = async (path) => {
  const res = await fetch(`${baseUrl}${path}`);
  const data = await res.json();
  return data;
};

export const serverMutation = async (path, data, method = "POST") => {
  const res = await fetch(`${baseUrl}${path}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const response = await res.json();
  return response;
};


export const serverMutationById = async (path, id, method = "GET") => {
  const res = await fetch(`${baseUrl}${path}/${id}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },

  });
  const response = await res.json();
  return response;
};
